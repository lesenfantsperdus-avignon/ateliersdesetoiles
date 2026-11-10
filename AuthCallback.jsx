import { useEffect, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { API } from "@/lib/api";

export const AuthCallback = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const done = useRef(false);

  useEffect(() => {
    if (done.current) return;
    done.current = true;
    const sessionId = new URLSearchParams(location.hash.slice(1)).get("session_id");
    const run = async () => {
      try {
        const r = await axios.post(`${API}/auth/session`, {}, { headers: { "X-Session-ID": sessionId }, withCredentials: true });
        navigate("/admin", { replace: true, state: { user: r.data } });
      } catch (e) {
        const d = e?.response?.data?.detail;
        navigate("/admin", { replace: true, state: { error: typeof d === "string" ? d : "Accesso non riuscito." } });
      }
    };
    run();
  }, [location.hash, navigate]);

  return <div className="min-h-screen bg-night" data-testid="auth-callback" />;
};
