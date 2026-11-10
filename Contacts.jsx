import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import axios from "axios";
import { toast } from "sonner";
import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Instagram, ArrowRight, Loader2 } from "lucide-react";
import { PageHero } from "@/components/site/PageHero";
import { Pending, Reveal, Rich, richLines } from "@/components/site/Bits";
import { useContent } from "@/context/ContentContext";
import { useTitle } from "@/hooks/useTitle";

const API = process.env.REACT_APP_BACKEND_URL ? `${process.env.REACT_APP_BACKEND_URL}/api` : null;
const field = "w-full border-0 border-b border-ink/30 bg-transparent px-0 py-3 text-base text-ink placeholder:text-ink/50 focus:border-sky-deep focus:outline-none focus:ring-0";

const Prompt = ({ active, onClick, title, text, eyebrow, id }) => (
  <button type="button" onClick={onClick} data-testid={`enquiry-type-${id}`} aria-pressed={active}
    className={`group flex-1 rounded-sm border p-6 text-left transition-colors duration-500 ${active ? "border-night bg-night text-cream" : "border-ink/25 hover:border-ink"}`}>
    <span className={`eyebrow ${active ? "text-sky" : "text-sky-deep"}`}>{eyebrow}</span>
    <span className="mt-3 block font-display text-2xl">{title}</span>
    <span className={`mt-2 block text-sm ${active ? "text-cream/80" : "text-ink/75"}`}>{text}</span>
  </button>
);

const ContactForm = () => {
  const { contact: CONTACT, workshops: WORKSHOPS, t } = useContent();
  const [params] = useSearchParams();
  const [type, setType] = useState(params.get("type") === "collaboration" ? "collaboration" : "atelier");
  const [form, setForm] = useState({ name: "", email: "", phone: "", group: params.get("groupe") || "", organisation: "", message: "", website: "" });
  const [state, setState] = useState("idle");
  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));
  const subject = type === "atelier" ? t("c.f.subjectAtelier") : t("c.f.subjectCollab");
  const mailto = `mailto:${CONTACT.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(form.message)}`;

  const submit = async (e) => {
    e.preventDefault();
    if (!API) { window.location.href = mailto; return; }
    setState("sending");
    try {
      await axios.post(`${API}/contact`, { ...form, type, group: type === "atelier" ? form.group : "" });
      setState("sent");
      toast.success(t("c.f.toastOk"));
      setForm((f) => ({ ...f, message: "" }));
    } catch (err) {
      setState("idle");
      const d = err?.response?.data?.detail;
      toast.error(typeof d === "string" ? d : t("c.f.toastErr"));
    }
  };

  return (
    <div>
      <div className="flex flex-col gap-3 sm:flex-row">
        <Prompt id="atelier" active={type === "atelier"} onClick={() => setType("atelier")} eyebrow={t("c.p1.eyebrow")} title={t("c.p1.title")} text={t("c.p1.text")} />
        <Prompt id="collab" active={type === "collaboration"} onClick={() => setType("collaboration")} eyebrow={t("c.p2.eyebrow")} title={t("c.p2.title")} text={t("c.p2.text")} />
      </div>
      <form onSubmit={submit} className="mt-10 grid gap-6 sm:grid-cols-2" data-testid="contact-form">
        <input className={field} placeholder={t("c.f.name")} required minLength={2} value={form.name} onChange={set("name")} data-testid="contact-input-name" aria-label="Nom et prénom" />
        <input className={field} type="email" placeholder={t("c.f.email")} required value={form.email} onChange={set("email")} data-testid="contact-input-email" aria-label="Email" />
        <input className={field} type="tel" placeholder={t("c.f.phone")} value={form.phone} onChange={set("phone")} data-testid="contact-input-phone" aria-label="Téléphone" />
        {type === "atelier" ? (
          <select className={field} value={form.group} onChange={set("group")} data-testid="contact-select-group" aria-label="Atelier concerné">
            <option value="">{t("c.f.group")}</option>
            {WORKSHOPS.map((w) => <option key={w.id} value={w.id}>{w.public} — {w.age}</option>)}
          </select>
        ) : (
          <input className={field} placeholder={t("c.f.org")} value={form.organisation} onChange={set("organisation")} data-testid="contact-input-organisation" aria-label="Structure" />
        )}
        <textarea className={`${field} min-h-[150px] resize-y sm:col-span-2`} required minLength={5} value={form.message} onChange={set("message")}
          placeholder={type === "atelier" ? t("c.f.msgAtelier") : t("c.f.msgCollab")} data-testid="contact-input-message" aria-label="Message" />
        <input type="text" tabIndex={-1} autoComplete="off" className="hidden" value={form.website} onChange={set("website")} aria-hidden="true" />
        <div className="flex flex-wrap items-center gap-5 sm:col-span-2">
          <button type="submit" disabled={state === "sending"} className="btn btn-ink disabled:opacity-60" data-testid="contact-form-submit-button">
            {state === "sending" ? <Loader2 size={18} className="animate-spin" /> : null} {t("c.f.send")} <ArrowRight size={18} />
          </button>
          <a href={mailto} className="link-u text-sm text-sky-deep" data-testid="contact-mailto-link">{t("c.f.mailto")}</a>
        </div>
        {state === "sent" && (
          <motion.p initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="note -rotate-1 text-sky-deep sm:col-span-2" data-testid="contact-success">{t("c.f.success")}</motion.p>
        )}
        <p className="text-xs text-ink/70 sm:col-span-2">{t("c.f.privacy")}</p>
      </form>
    </div>
  );
};

export default function Contact() {
  useTitle("Contact", "Contacter Les Enfants Perdus : ateliers de théâtre et collaborations, Théâtre La Carreterie, Avignon.");
  const { contact: CONTACT, settings, t } = useContent();
  return (
    <div data-testid="page-contact">
      <PageHero tone="sky" label={t("c.hero.label")} testid="contact-hero"
        lines={richLines(t("c.hero.title"))}
        intro={<Rich text={t("c.hero.intro")} />} />
      <section className="bg-cream py-20 sm:py-28">
        <div className="wrap grid gap-16 lg:grid-cols-12">
          <div className="lg:col-span-7"><ContactForm /></div>
          <Reveal className="space-y-8 lg:col-span-4 lg:col-start-9" data-testid="contact-details">
            <div>
              <p className="eyebrow text-sky-deep">{t("c.d.email")}</p>
              <a href={`mailto:${CONTACT.email}`} className="mt-2 flex items-center gap-3 break-all font-display text-xl link-u w-fit" data-testid="contact-email-link"><Mail size={18} className="shrink-0" />{CONTACT.email}</a>
            </div>
            <div>
              <p className="eyebrow text-sky-deep">{t("c.d.phone")}</p>
              {CONTACT.phones.map((p) => <a key={p.id} href={`tel:${p.tel}`} className="mt-2 flex items-center gap-3 font-display text-xl link-u w-fit" data-testid={`contact-phone-${p.id}`}><Phone size={18} />{p.name} · {p.display}</a>)}
            </div>
            <div>
              <p className="eyebrow text-sky-deep">{t("c.d.place")}</p>
              <a href={CONTACT.mapsUrl} target="_blank" rel="noopener noreferrer" className="mt-2 flex gap-3 text-lg link-u w-fit" data-testid="contact-address-link"><MapPin size={18} className="mt-1 shrink-0" /><span>{CONTACT.venue}<br />{CONTACT.street}<br />{CONTACT.city}</span></a>
            </div>
            <div>
              <p className="eyebrow text-sky-deep">{t("c.d.social")}</p>
              {settings.instagram ? (
                <a href={settings.instagram} target="_blank" rel="noopener noreferrer" className="mt-2 flex w-fit items-center gap-3 text-lg link-u" data-testid="contact-instagram-link"><Instagram size={18} />Instagram</a>
              ) : (
                <p className="mt-2 flex items-center gap-3 text-lg"><Instagram size={18} />Instagram <Pending testid="contact-instagram-pending">lien à confirmer</Pending></p>
              )}
            </div>
            <p className="note -rotate-2 text-sky-deep">{t("c.d.note")}</p>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
