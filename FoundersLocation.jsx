import { Link } from "react-router-dom";
import { ArrowRight, ArrowUpRight, Mail, Phone, MapPin } from "lucide-react";
import { Reveal, MaskedLines, Photo, SectionLabel, Stars, Rich, richLines } from "@/components/site/Bits";
import { useContent } from "@/context/ContentContext";

export const Founders = () => {
  const { founders: FOUNDERS, t } = useContent();
  return (
  <section className="relative overflow-hidden bg-sky py-24 text-night sm:py-36" data-testid="home-founders">
    <div className="wrap grid gap-14 lg:grid-cols-12">
      <div className="lg:col-span-4">
        <SectionLabel n="05" tone="night">{t("home.found.label")}</SectionLabel>
        <h2 className="mt-8 font-display text-4xl font-light leading-[1.05] sm:text-5xl lg:text-6xl">
          <MaskedLines inView lines={richLines(t("home.found.title"))} />
        </h2>
        <p className="mt-8 max-w-sm text-base leading-relaxed sm:text-lg"><Rich text={t("home.found.text")} /></p>
      </div>
      <div className="grid gap-10 sm:grid-cols-2 lg:col-span-8">
        {FOUNDERS.map((f, i) => (
          <Reveal key={f.id} delay={i * 0.1} className={i === 1 ? "sm:mt-24" : ""}>
            <Link to={`/association#${f.id}`} className="group block" data-testid={`home-founder-${f.id}`}>
              <Photo src={f.img} pos={f.pos} alt={`Portrait provisoire — ${f.name}`} className="arch aspect-[3/4] w-full" label="Portrait à remplacer" />
              <div className="mt-6 flex items-start justify-between gap-4">
                <div>
                  <h3 className="font-display text-3xl">{f.name}</h3>
                  <p className="mt-1 text-sm">{f.role}</p>
                  <p className="mt-1 font-mono text-xs uppercase tracking-[0.14em]">{t("home.found.trained")}</p>
                </div>
                <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full border border-night transition-colors group-hover:bg-night group-hover:text-sky"><ArrowUpRight size={18} /></span>
              </div>
            </Link>
          </Reveal>
        ))}
      </div>
    </div>
  </section>
  );
};

export const Location = () => {
  const { contact: CONTACT, t } = useContent();
  return (
  <section className="bg-cream py-24 sm:py-36" data-testid="home-location">
    <div className="wrap grid gap-12 lg:grid-cols-12">
      <div className="lg:col-span-5">
        <SectionLabel n="06">{t("home.loc.label")}</SectionLabel>
        <h2 className="mt-8 font-display text-4xl font-light leading-[1.05] sm:text-5xl"><Rich text={t("home.loc.title")} accent="text-sky-deep" /></h2>
        <div className="mt-10 space-y-5 text-base sm:text-lg">
          <a href={CONTACT.mapsUrl} target="_blank" rel="noopener noreferrer" className="flex gap-4 link-u w-fit" data-testid="location-address"><MapPin className="mt-1 shrink-0 text-sky-deep" />{CONTACT.venue}<br />{CONTACT.street}, {CONTACT.city}</a>
          <a href={`mailto:${CONTACT.email}`} className="flex gap-4 break-all link-u w-fit" data-testid="location-email"><Mail className="mt-1 shrink-0 text-sky-deep" />{CONTACT.email}</a>
          {CONTACT.phones.map((p) => (
            <a key={p.id} href={`tel:${p.tel}`} className="flex gap-4 link-u w-fit" data-testid={`location-phone-${p.id}`}><Phone className="mt-1 shrink-0 text-sky-deep" />{p.name} · {p.display}</a>
          ))}
        </div>
      </div>
      <Reveal className="relative lg:col-span-7">
        <div className="relative aspect-[4/3] overflow-hidden rounded-sm border border-ink/15">
          <iframe title="Plan d'accès — Théâtre La Carreterie" src={CONTACT.mapsEmbed} loading="lazy" className="h-full w-full grayscale-[70%] contrast-[1.05]" referrerPolicy="no-referrer-when-downgrade" data-testid="location-map" />
        </div>
        <p className="note absolute -top-8 right-4 rotate-3 text-sky-deep">{t("home.loc.note")}</p>
      </Reveal>
    </div>
  </section>
  );
};

export const FinalCta = () => {
  const { t } = useContent();
  return (
  <section className="grain relative overflow-hidden bg-night py-24 text-cream sm:py-36" data-testid="home-final-cta">
    <Stars count={50} className="opacity-60" />
    <div className="wrap relative z-[2]">
      <h2 className="max-w-4xl font-display text-[2.6rem] font-light leading-[1] sm:text-7xl lg:text-8xl">
        <MaskedLines inView lines={richLines(t("home.final.title"), "text-sky")} />
      </h2>
      <div className="mt-14 grid gap-px overflow-hidden rounded-sm bg-cream/20 md:grid-cols-3">
        {[
          ["/ateliers", 1, "final-cta-ateliers"],
          ["/contact?type=atelier", 2, "final-cta-contact"],
          ["/contact?type=collaboration", 3, "final-cta-collab"],
        ].map(([to, n, id]) => [to, t(`home.final.${n}.title`), t(`home.final.${n}.sub`), id]).map(([to, t1, s, id]) => (
          <Link key={to} to={to} data-testid={id} className="group flex items-end justify-between gap-4 bg-night p-7 transition-colors duration-500 hover:bg-sky hover:text-night sm:p-9">
            <span><span className="block font-display text-2xl sm:text-3xl">{t1}</span><span className="mt-2 block text-sm opacity-80">{s}</span></span>
            <ArrowRight className="shrink-0 transition-transform duration-500 group-hover:translate-x-1" />
          </Link>
        ))}
      </div>
    </div>
  </section>
  );
};
