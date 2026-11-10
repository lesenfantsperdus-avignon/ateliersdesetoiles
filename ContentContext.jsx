import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import axios from "axios";
import { API } from "@/lib/api";
import { CONTACT, SETTINGS, WORKSHOPS, PROJECTS, FOUNDERS } from "@/lib/content";
import { TEXT_DEFAULTS } from "@/lib/texts";

const Ctx = createContext(null);
const arr = (v, d) => (Array.isArray(v) ? v : d);

const build = (remote) => {
  const settings = { ...SETTINGS, ...(remote?.settings || {}) };
  settings.images = { ...SETTINGS.images, ...(remote?.settings?.images || {}) };
  const texts = { ...TEXT_DEFAULTS, ...(remote?.texts || {}) };
  const t = (k) => texts[k] ?? "";
  return {
    settings,
    texts,
    t,
    workshops: arr(remote?.workshops, WORKSHOPS),
    projects: arr(remote?.projects, PROJECTS),
    founders: arr(remote?.founders, FOUNDERS),
    contact: { ...CONTACT, venue: t("addr.venue"), street: t("addr.street"), city: t("addr.city"), email: settings.email || CONTACT.email, phones: arr(settings.phones, CONTACT.phones) },
  };
};

export const ContentProvider = ({ children }) => {
  const [remote, setRemote] = useState(null);
  const reload = useCallback(async () => {
    if (!API) return;
    try {
      const r = await axios.get(`${API}/content`);
      setRemote(r.data?.content ?? null);
    } catch {
      setRemote(null);
    }
  }, []);
  useEffect(() => { reload(); }, [reload]);
  const value = useMemo(() => ({ ...build(remote), reload }), [remote, reload]);
  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
};

export const useContent = () => useContext(Ctx);
export const useT = () => useContext(Ctx).t;
