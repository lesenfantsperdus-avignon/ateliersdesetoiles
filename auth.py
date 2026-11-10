import os
import uuid
from datetime import datetime, timezone, timedelta
from typing import Optional

import httpx
from fastapi import APIRouter, HTTPException, Request, Response, Header

SESSION_DATA_URL = "https://demobackend.emergentagent.com/auth/v1/env/oauth/session-data"
ADMIN_EMAILS = {e.strip().lower() for e in os.environ["ADMIN_EMAILS"].split(",") if e.strip()}

router = APIRouter(prefix="/auth")
_db = None


def bind_db(db):
    global _db
    _db = db


def _is_admin(email: str) -> bool:
    return (email or "").strip().lower() in ADMIN_EMAILS


@router.post("/session")
async def create_session(response: Response, x_session_id: str = Header(...)):
    async with httpx.AsyncClient(timeout=20) as client:
        r = await client.get(SESSION_DATA_URL, headers={"X-Session-ID": x_session_id})
    if r.status_code != 200:
        raise HTTPException(status_code=401, detail="Sessione non valida")
    data = r.json()
    if not _is_admin(data.get("email")):
        raise HTTPException(status_code=403, detail="Questo account Google non è autorizzato.")
    email = data["email"].lower()
    existing = await _db.users.find_one({"email": email}, {"_id": 0})
    user_id = existing["user_id"] if existing else f"user_{uuid.uuid4().hex[:12]}"
    await _db.users.update_one(
        {"email": email},
        {"$set": {"name": data.get("name", ""), "picture": data.get("picture", "")},
         "$setOnInsert": {"user_id": user_id, "email": email, "created_at": datetime.now(timezone.utc)}},
        upsert=True,
    )
    expires = datetime.now(timezone.utc) + timedelta(days=7)
    await _db.user_sessions.insert_one({
        "user_id": user_id, "session_token": data["session_token"],
        "expires_at": expires, "created_at": datetime.now(timezone.utc),
    })
    response.set_cookie("session_token", data["session_token"], httponly=True, secure=True,
                        samesite="none", path="/", max_age=7 * 24 * 3600)
    return {"user_id": user_id, "email": email, "name": data.get("name", ""), "picture": data.get("picture", "")}


async def require_admin(request: Request) -> dict:
    token = request.cookies.get("session_token")
    if not token:
        auth = request.headers.get("authorization", "")
        token = auth[7:] if auth.lower().startswith("bearer ") else None
    if not token:
        raise HTTPException(status_code=401, detail="Non autenticato")
    session = await _db.user_sessions.find_one({"session_token": token}, {"_id": 0})
    if not session:
        raise HTTPException(status_code=401, detail="Sessione non valida")
    expires_at = session["expires_at"]
    if isinstance(expires_at, str):
        expires_at = datetime.fromisoformat(expires_at)
    if expires_at.tzinfo is None:
        expires_at = expires_at.replace(tzinfo=timezone.utc)
    if expires_at < datetime.now(timezone.utc):
        raise HTTPException(status_code=401, detail="Sessione scaduta")
    user = await _db.users.find_one({"user_id": session["user_id"]}, {"_id": 0})
    if not user or not _is_admin(user.get("email")):
        raise HTTPException(status_code=403, detail="Accesso non autorizzato")
    return user


@router.get("/me")
async def me(request: Request):
    user = await require_admin(request)
    return {k: user.get(k) for k in ("user_id", "email", "name", "picture")}


@router.post("/logout")
async def logout(request: Request, response: Response):
    token = request.cookies.get("session_token")
    if token:
        await _db.user_sessions.delete_one({"session_token": token})
    response.delete_cookie("session_token", path="/", secure=True, samesite="none")
    return {"ok": True}
