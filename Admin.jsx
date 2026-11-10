import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import axios from "axios";
import { toast } from "sonner";
import { LogOut, ExternalLink, Loader2, Save } from "lucide-react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Logo } from "@/components/site/Logo";
import { Stars } from "@/components/site/Bits";
import { SettingsTab, WorkshopsTab, ProjectsTab, FoundersTab } from "@/components/admin/Tabs";
import { TextsTab } from "@/components/admin/TextsTab";
import { PhotosTab } from "@/components/admin/PhotosTab";
import { TEXT_DEFAULTS } from "@/lib/texts";
import { useContent } from "@/context/ContentContext";
import { API } from "@/lib/api";
import { useTitle } from "@/hooks/useTitle";

const LINE_KEYS = ["does", "tools", "training", "focus", "bio"];
const cleanItem = (o) => Object.fromEntries(Object.entries(o).map(([k, v]) => {
  if (LINE_KEYS.includes(k) && Array.isArray(v)) return [k, v.map((x) => x.trim()).filter(Boolean)];
  if (k === "credits" && Array.isArray(v)) return [k, v.filter((p) => p[0]?.trim() || p[1]?.trim())];
  return [k, v];
}));
const clean = (d) => ({
  settings: d.settings, workshops: d.workshops.map(cleanItem), projects: d.projects.map(cleanItem), founders: d.founders.map(cleanItem),
  texts: Object.fromEntries(Object.entries(d.texts).filter(([k, v]) => v !== TEXT_DEFAULTS[k])),
});

const Login = ({ error }) => {
  const login = () => {
    // REMINDER: DO NOT HARDCODE THE URL, OR ADD ANY FALLBACKS OR REDIRECT URLS, THIS BREAKS THE AUTH
    const redirectUrl = window.location.origin + "/admin";
    window.location.href = `https://auth.emergentagent.com/?redirect=${encodeURIComponent(redirectUrl)}`;
  };
  return (
    <div className="grain relative grid min-h-screen place-items-center overflow-hidden bg-night px-5 text-cream" data-testid="admin-login">
      <Stars count={50} className="opacity-60" />
      <div className="relative z-[2] w-full max-w-md text-center">
        <div className="flex justify-center"><Logo tone="cream" /></div>
        <h1 className="mt-10 font-display text-4xl font-light sm:text-5xl">Area <span className="italic-wonk text-sky">riservata</span></h1>
        <p className="mt-4 text-cream/80">Pannello di modifica del sito. Accesso riservato all'account Google dell'associazione.</p>
        {error && <p className="mt-6 rounded-md bg-red-900/40 px-4 py-3 text-sm" data-testid="admin-login-error">{error}</p>}
        <button onClick={login} className="btn btn-sky mt-8" data-testid="admin-google-login">Accedi con Google</button>
        <p className="mt-8"><Link to="/" className="link-u text-sm text-cream/80">← Torna al sito</Link></p>
      </div>
    </div>
  );
};

const Editor = ({ user }) => {
  const content = useContent();
  const [draft, setDraft] = useState(null);
  const [dirty, setDirty] = useState(false);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (!dirty) setDraft(JSON.parse(JSON.stringify({ settings: content.settings, workshops: content.workshops, projects: content.projects, founders: content.founders, texts: content.texts })));
  }, [content, dirty]);

  const set = (d) => { setDraft(d); setDirty(true); };
  const save = async () => {
    setSaving(true);
    try {
      await axios.put(`${API}/content`, clean(draft), { withCredentials: true });
      setDirty(false);
      await content.reload();
      toast.success("Modifiche pubblicate sul sito.");
    } catch (e) {
      const d = e?.response?.data?.detail;
      toast.error(typeof d === "string" ? d : "Salvataggio non riuscito.");
    } finally {
      setSaving(false);
    }
  };
  const logout = async () => {
    await axios.post(`${API}/auth/logout`, {}, { withCredentials: true }).catch(() => null);
    window.location.href = "/admin";
  };
  if (!draft) return null;

  return (
    <div className="min-h-screen bg-cream" data-testid="admin-editor">
      <header className="sticky top-0 z-30 border-b border-ink/10 bg-cream/90 backdrop-blur-md">
        <div className="mx-auto flex max-w-5xl items-center justify-between gap-3 px-4 py-3 sm:px-6">
          <Link to="/" className="hidden sm:block"><Logo /></Link>
          <span className="truncate text-sm text-ink/75 sm:hidden">{user?.email}</span>
          <div className="flex items-center gap-2">
            {dirty && <span className="hidden text-sm text-sky-deep sm:inline" data-testid="admin-dirty">Modifiche non salvate</span>}
            <button onClick={save} disabled={!dirty || saving} className="btn btn-ink !py-2.5 disabled:opacity-50" data-testid="admin-save">
              {saving ? <Loader2 size={16} className="animate-spin" /> : <Save size={16} />} <span className="hidden sm:inline">Salva e pubblica</span><span className="sm:hidden">Salva</span>
            </button>
            <button onClick={logout} className="grid h-10 w-10 place-items-center rounded-full border border-ink/20 hover:bg-cream-2" aria-label="Esci" data-testid="admin-logout"><LogOut size={16} /></button>
          </div>
        </div>
      </header>
      <main className="mx-auto max-w-5xl px-4 py-8 sm:px-6 sm:py-12">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <h1 className="font-display text-4xl font-light sm:text-5xl">Modifica il sito</h1>
            <p className="mt-2 text-ink/75">Connessa come {user?.email}. Le modifiche sono visibili a tutti dopo « Salva e pubblica ».</p>
          </div>
          <Link to="/" target="_blank" className="inline-flex items-center gap-1.5 text-sm text-sky-deep link-u" data-testid="admin-view-site">Vedi il sito <ExternalLink size={14} /></Link>
        </div>
        <Tabs defaultValue="texts" className="mt-8">
          <TabsList className="flex h-auto w-full flex-wrap justify-start gap-1 bg-cream-2 p-1">
            <TabsTrigger value="texts" data-testid="admin-tab-texts">Tutti i testi</TabsTrigger>
            <TabsTrigger value="photos" data-testid="admin-tab-photos">Tutte le foto</TabsTrigger>
            <TabsTrigger value="settings" data-testid="admin-tab-settings">Contatti & info</TabsTrigger>
            <TabsTrigger value="workshops" data-testid="admin-tab-workshops">Atelier e orari</TabsTrigger>
            <TabsTrigger value="projects" data-testid="admin-tab-projects">Progetti</TabsTrigger>
            <TabsTrigger value="founders" data-testid="admin-tab-founders">Fondatrici</TabsTrigger>
          </TabsList>
          <TabsContent value="texts" className="mt-6"><TextsTab data={draft} set={set} /></TabsContent>
          <TabsContent value="photos" className="mt-6"><PhotosTab data={draft} set={set} /></TabsContent>
          <TabsContent value="settings" className="mt-6"><SettingsTab data={draft} set={set} /></TabsContent>
          <TabsContent value="workshops" className="mt-6"><WorkshopsTab data={draft} set={set} /></TabsContent>
          <TabsContent value="projects" className="mt-6"><ProjectsTab data={draft} set={set} /></TabsContent>
          <TabsContent value="founders" className="mt-6"><FoundersTab data={draft} set={set} /></TabsContent>
        </Tabs>
        <p className="mt-12 text-sm text-ink/65">Gli atelier, i progetti e le biografie si modificano nelle rispettive schede.</p>
      </main>
    </div>
  );
};

export default function Admin() {
  useTitle("Area riservata");
  const location = useLocation();
  const [user, setUser] = useState(location.state?.user ?? null);
  const [checked, setChecked] = useState(!!location.state?.user);

  useEffect(() => {
    const meta = document.createElement("meta");
    meta.name = "robots";
    meta.content = "noindex";
    document.head.appendChild(meta);
    return () => { meta.remove(); };
  }, []);

  useEffect(() => {
    if (location.state?.user) return;
    const check = async () => {
      try {
        const r = await axios.get(`${API}/auth/me`, { withCredentials: true });
        setUser(r.data);
      } catch {
        setUser(null);
      } finally {
        setChecked(true);
      }
    };
    check();
  }, [location.state]);

  if (!checked) return <div className="min-h-screen bg-night" />;
  return user ? <Editor user={user} /> : <Login error={location.state?.error} />;
}
