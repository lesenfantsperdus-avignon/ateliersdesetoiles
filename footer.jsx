import { Link } from "react-router-dom";
import { Instagram, Mail, Phone, MapPin } from "lucide-react";
import { Logo } from "./Logo";
import { Pending, Rich } from "./Bits";
import { NAV } from "@/lib/content";
import { useContent } from "@/context/ContentContext";

export const Footer = () => {
  const { contact: CONTACT, settings, t } = useContent();
  return (
  <footer className="relative overflow-hidden bg-forest text-cream" data-testid="site-footer">
    <div className="wrap grid gap-12 py-16 md:grid-cols-12 md:py-24">
      <div className="md:col-span-5">
        <Logo tone="cream" />
        <p className="mt-6 max-w-sm font-display text-2xl leading-snug sm:text-3xl">
          <Rich text={t("footer.tagline")} accent="text-sky" />
        </p>
        <p className="mt-6 max-w-sm text-sm text-cream/80">
          <Rich text={t("footer.legal")} /> {settings.rna ? <span className="block">RNA / SIRET : {settings.rna}</span> : <Pending tone="light">n° RNA / SIRET à confirmer</Pending>}
        </p>
      </div>
      <div className="md:col-span-3">
        <p className="eyebrow text-sky">{t("footer.pages")}</p>
        <ul className="mt-5 space-y-2.5">
          {NAV.map((n) => (
            <li key={n.to}><Link to={n.to} className="link-u" data-testid={`footer-link-${n.id}`}>{t(`nav.${n.id}`)}</Link></li>
          ))}
        </ul>
      </div>
      <div className="space-y-4 text-sm md:col-span-4">
        <p className="eyebrow text-sky">{t("footer.find")}</p>
        <p className="flex gap-3"><MapPin size={18} className="mt-0.5 shrink-0 text-sky" />{CONTACT.venue}<br />{CONTACT.street}, {CONTACT.city}</p>
        <a href={`mailto:${CONTACT.email}`} className="flex gap-3 link-u w-fit" data-testid="footer-email"><Mail size={18} className="shrink-0 text-sky" />{CONTACT.email}</a>
        {CONTACT.phones.map((p) => (
          <a key={p.tel} href={`tel:${p.tel}`} className="flex gap-3 w-fit link-u" data-testid={`footer-phone-${p.id}`}><Phone size={18} className="shrink-0 text-sky" />{p.name} — {p.display}</a>
        ))}
        {settings.instagram ? (
          <a href={settings.instagram} target="_blank" rel="noopener noreferrer" className="flex w-fit gap-3 link-u" data-testid="footer-instagram"><Instagram size={18} className="text-sky" />Instagram</a>
        ) : (
          <p className="flex items-center gap-3"><Instagram size={18} className="text-sky" />Instagram <Pending tone="light">lien à confirmer</Pending></p>
        )}
      </div>
    </div>
    <div className="wrap flex flex-col gap-2 border-t border-cream/15 py-6 text-xs text-cream/75 sm:flex-row sm:justify-between">
      <p>© {new Date().getFullYear()} {t("footer.copy")}</p>
      <Link to="/admin" className="link-u w-fit" data-testid="footer-admin-link">{t("footer.team")}</Link>
    </div>
  </footer>
  );
};
