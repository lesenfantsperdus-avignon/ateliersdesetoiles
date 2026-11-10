import asyncio
import time
from collections import defaultdict, deque
from contextlib import suppress
from fastapi import FastAPI, APIRouter, Request, HTTPException, Depends, UploadFile, File
from fastapi.responses import Response
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
from pymongo import ASCENDING, DESCENDING, IndexModel
import os
import logging
from pathlib import Path
from pydantic import BaseModel, Field, EmailStr
from typing import Literal, Optional, Any
import json
import re
import uuid
from datetime import datetime, timezone
from html import escape

from email_service import send_email

ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

import auth  # noqa: E402
import storage  # noqa: E402

mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]
auth.bind_db(db)
CONTACT_TO = os.environ['CONTACT_TO_EMAIL']
EMAIL_FROM_NAME = os.environ['EMAIL_FROM_NAME']

INDEXES: dict[str, list[IndexModel]] = {
    "contact_messages": [
        IndexModel([("id", ASCENDING)], name="id", unique=True),
        IndexModel([("created_at", DESCENDING)], name="created_desc"),
    ],
    "user_sessions": [IndexModel([("session_token", ASCENDING)], name="token", unique=True)],
    "users": [IndexModel([("email", ASCENDING)], name="email", unique=True)],
    "files": [IndexModel([("storage_path", ASCENDING)], name="path", unique=True)],
}

logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(name)s - %(levelname)s - %(message)s')
logger = logging.getLogger(__name__)


async def ensure_indexes() -> None:
    for collection, models in INDEXES.items():
        for model in models:
            try:
                await db[collection].create_indexes([model])
            except Exception as exc:
                logger.error("ensure_indexes(%s.%s): %s", collection, model.document["name"], exc)

app = FastAPI()
api_router = APIRouter(prefix="/api")

GROUP_LABELS = {
    "petites-etoiles": "Petites Étoiles (6–11 ans)",
    "etoiles": "Ateliers des Étoiles (12–17 ans)",
    "adultes": "Atelier adultes",
    "": "Non précisé",
}
TYPE_LABELS = {"atelier": "Ateliers / inscription", "collaboration": "Collaboration professionnelle"}


class ContactIn(BaseModel):
    type: Literal["atelier", "collaboration"]
    name: str = Field(min_length=2, max_length=120)
    email: EmailStr
    phone: Optional[str] = Field(default="", max_length=40)
    group: Literal["petites-etoiles", "etoiles", "adultes", ""] = ""
    organisation: Optional[str] = Field(default="", max_length=160)
    message: str = Field(min_length=5, max_length=4000)
    website: Optional[str] = ""  # honeypot


class ContactMessage(ContactIn):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    created_at: str = Field(default_factory=lambda: datetime.now(timezone.utc).isoformat())
    email_status: str = "pending"


_hits: dict[str, deque] = defaultdict(deque)


def _rate_limited(ip: str, limit: int = 5, window: int = 3600) -> bool:
    now = time.time()
    q = _hits[ip]
    while q and now - q[0] > window:
        q.popleft()
    if len(q) >= limit:
        return True
    q.append(now)
    return False


def _notification_html(m: ContactMessage) -> str:
    rows = [
        ("Type", TYPE_LABELS[m.type]),
        ("Nom", m.name),
        ("Email", m.email),
        ("Téléphone", m.phone or "—"),
    ]
    if m.type == "atelier":
        rows.append(("Atelier", GROUP_LABELS[m.group]))
    else:
        rows.append(("Structure", m.organisation or "—"))
    cells = "".join(
        f'<tr><td style="padding:6px 12px 6px 0;color:#57534E;font-size:13px">{escape(k)}</td>'
        f'<td style="padding:6px 0;font-size:14px;color:#1C1917">{escape(v)}</td></tr>' for k, v in rows
    )
    msg = escape(m.message).replace("\n", "<br>")
    return (
        '<table role="presentation" width="100%" style="background:#F4EEE3"><tr><td style="padding:28px;font-family:Arial,sans-serif">'
        f'<p style="font-size:18px;color:#0B132B;margin:0 0 16px">Nouveau message depuis le site</p>'
        f'<table role="presentation">{cells}</table>'
        f'<p style="margin:20px 0 6px;color:#57534E;font-size:13px">Message</p>'
        f'<p style="font-size:14px;line-height:1.6;color:#1C1917;margin:0">{msg}</p>'
        f'<p style="font-size:12px;color:#57534E;margin-top:24px">Envoyé automatiquement par le site {escape(EMAIL_FROM_NAME)}. '
        'Pour répondre, écrivez directement à l’adresse email indiquée ci-dessus.</p>'
        '</td></tr></table>'
    )


@api_router.get("/")
async def root():
    return {"message": "Les Enfants Perdus API"}


class SiteContent(BaseModel):
    settings: dict[str, Any]
    workshops: list[dict[str, Any]]
    projects: list[dict[str, Any]]
    founders: list[dict[str, Any]]
    texts: dict[str, str] = {}


_IMG_OK = re.compile(r"^(/img/[\w.-]+|/api/files/[\w./-]+)$")
_POS_OK = re.compile(r"^(center|top|bottom|left|right)( \d{1,3}%)?$")


def _check_urls(node: Any) -> None:
    if isinstance(node, dict):
        for k, v in node.items():
            if k == "img" and v and not (isinstance(v, str) and _IMG_OK.match(v)):
                raise HTTPException(status_code=422, detail="Immagine non valida")
            if k == "pos" and v and not (isinstance(v, str) and _POS_OK.match(v)):
                raise HTTPException(status_code=422, detail="Inquadratura non valida")
            if k == "instagram" and v and not (isinstance(v, str) and v.startswith("https://")):
                raise HTTPException(status_code=422, detail="Il link Instagram deve iniziare con https://")
            _check_urls(v)
    elif isinstance(node, list):
        for v in node:
            _check_urls(v)


@api_router.get("/content")
async def get_content():
    doc = await db.site_content.find_one({"key": "site"}, {"_id": 0})
    return {"content": doc["data"] if doc else None, "updated_at": doc["updated_at"] if doc else None}


@api_router.put("/content")
async def put_content(payload: SiteContent, user: dict = Depends(auth.require_admin)):
    data = payload.model_dump()
    if len(json.dumps(data)) > 400_000:
        raise HTTPException(status_code=413, detail="Contenuto troppo grande")
    _check_urls(data)
    now = datetime.now(timezone.utc).isoformat()
    await db.site_content.update_one(
        {"key": "site"}, {"$set": {"data": data, "updated_at": now, "updated_by": user["email"]}}, upsert=True)
    return {"ok": True, "updated_at": now}


ALLOWED_IMG = {"image/jpeg": "jpg", "image/png": "png", "image/webp": "webp"}


@api_router.post("/admin/upload")
async def upload_image(file: UploadFile = File(...), user: dict = Depends(auth.require_admin)):
    ext = ALLOWED_IMG.get(file.content_type or "")
    if not ext:
        raise HTTPException(status_code=415, detail="Formato non supportato (usa JPG, PNG o WEBP)")
    data = await file.read()
    if len(data) > 10 * 1024 * 1024:
        raise HTTPException(status_code=413, detail="Immagine troppo pesante (max 10 MB)")
    path = f"{storage.APP_NAME}/images/{uuid.uuid4()}.{ext}"
    try:
        result = await asyncio.to_thread(storage.put_object, path, data, file.content_type)
    except Exception as exc:
        logger.error("upload failed: %s", exc)
        raise HTTPException(status_code=502, detail="Caricamento non riuscito, riprova")
    await db.files.insert_one({
        "id": str(uuid.uuid4()), "storage_path": result["path"], "original_filename": file.filename,
        "content_type": file.content_type, "size": result.get("size", len(data)), "is_deleted": False,
        "uploaded_by": user["email"], "created_at": datetime.now(timezone.utc).isoformat(),
    })
    return {"url": f"/api/files/{result['path']}"}


@api_router.get("/files/{path:path}")
async def serve_file(path: str):
    record = await db.files.find_one({"storage_path": path, "is_deleted": False}, {"_id": 0})
    if not record:
        raise HTTPException(status_code=404, detail="File non trovato")
    data, ctype = await asyncio.to_thread(storage.get_object, path)
    return Response(content=data, media_type=record.get("content_type") or ctype,
                    headers={"Cache-Control": "public, max-age=31536000, immutable"})


@api_router.post("/contact")
async def create_contact(payload: ContactIn, request: Request):
    if payload.website:
        return {"ok": True}
    ip = request.headers.get("x-forwarded-for", request.client.host if request.client else "?").split(",")[0].strip()
    if _rate_limited(ip):
        raise HTTPException(status_code=429, detail="Trop de messages envoyés. Merci de réessayer plus tard.")
    m = ContactMessage(**payload.model_dump(exclude={"website"}))
    await db.contact_messages.insert_one(m.model_dump())
    subject = f"[Site] {TYPE_LABELS[m.type]} — {m.name}"
    try:
        await send_email(to=CONTACT_TO, subject=subject, html=_notification_html(m))
        status = "sent"
    except Exception as exc:
        logger.error("contact email failed: %s", exc)
        status = "failed"
    await db.contact_messages.update_one({"id": m.id}, {"$set": {"email_status": status}})
    return {"ok": True, "id": m.id, "email_status": status}


api_router.include_router(auth.router)
app.include_router(api_router)
app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=os.environ.get('CORS_ORIGINS', '*').split(','),
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.on_event("startup")
async def start_index_build():
    app.state.index_task = asyncio.create_task(ensure_indexes())
    try:
        await asyncio.to_thread(storage.init_storage)
    except Exception as exc:
        logger.error("Storage init failed: %s", exc)


@app.on_event("shutdown")
async def shutdown_db_client():
    app.state.index_task.cancel()
    with suppress(asyncio.CancelledError):
        await app.state.index_task
    client.close()
