import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { PageHero } from "@/components/site/PageHero";
import { Reveal, MaskedLines, Photo, SectionLabel, Pending, Rich, richLines } from "@/components/site/Bits";
import { useContent, useT } from "@/context/ContentContext";
import { useTitle } from "@/hooks/useTitle";

const FounderBio = ({ f, flip }) => {
  const t = useT();
  return (
  <article id={f.id} className="grid scroll-mt-28 gap-10 border-t border-ink/20 py-16 lg:grid-cols-12 lg:py-24" data-testid={`founder-bio-${f.id}`}>
    <Reveal className={`lg:col-span-5 ${flip ? "lg:order-2 lg:col-start-8" : ""}`}>
      <Photo src={f.img} pos={f.pos} alt={`Portrait provisoire — ${f.name}`} className="arch aspect-[4/5] w-full max-w-md" label="Portrait à remplacer" />
    </Reveal>
    <div className={`lg:col-span-6 ${flip ? "lg:order-1" : "lg:col-start-7"}`}>
      <p className="eyebrow text-sky-deep">{t("asso.bio.eyebrow")}</p>
      <h3 className="mt-4 font-display text-5xl font-light sm:text-6xl">{f.name}</h3>
      <p className="mt-3 text-lg text-ink/80">{f.role}</p>
      <dl className="mt-10 divide-y divide-ink/15 border-y border-ink/15 text-[15px]">
        <div className="grid gap-1 py-4 sm:grid-cols-3"><dt className="eyebrow text-ink/70">{t("asso.bio.origin")}</dt><dd className="sm:col-span-2">{f.origin}</dd></div>
        <div className="grid gap-1 py-4 sm:grid-cols-3"><dt className="eyebrow text-ink/70">{t("asso.bio.training")}</dt><dd className="space-y-1 sm:col-span-2">{f.training.map((t) => <span key={t} className="block">{t}</span>)}</dd></div>
        <div className="grid gap-1 py-4 sm:grid-cols-3"><dt className="eyebrow text-ink/70">{t("asso.bio.focus")}</dt><dd className="sm:col-span-2">{f.focus.join(" · ")}</dd></div>
      </dl>
      <div className="mt-8 space-y-4 text-base leading-relaxed text-ink/85 sm:text-[17px]" data-testid={`founder-bio-text-${f.id}`}>
        {f.bio.map((p, i) => <p key={i} className={i === 0 ? "first-letter:float-left first-letter:mr-2 first-letter:font-display first-letter:text-6xl first-letter:leading-[0.85] first-letter:text-sky-deep" : ""}>{p}</p>)}
      </div>
      <p className="note mt-6 -rotate-1 text-sky-deep">{t("asso.bio.note")}</p>
      <Link to="/projets?filtre=parcours" className="link-u text-sm font-medium text-sky-deep" data-testid={`founder-projects-link-${f.id}`}>{t("asso.bio.link")}</Link>
    </div>
  </article>
  );
};

export default function Association() {
  useTitle("L'association", "Origines, fondatrices, vision et expérience de l'association Les Enfants Perdus, à Avignon.");
  const { founders: FOUNDERS, settings, t } = useContent();
  return (
    <div data-testid="page-association">
      <PageHero tone="cream" label={t("asso.hero.label")} testid="association-hero"
        lines={richLines(t("asso.hero.title"), "text-sky-deep")}
        intro={<Rich text={t("asso.hero.intro")} accent="text-sky-deep" />} />

      <section className="bg-cream pb-24 sm:pb-32" data-testid="association-origins">
        <div className="wrap grid gap-12 lg:grid-cols-12">
          <Reveal className="lg:col-span-5"><Photo src={settings.images.origins.img} pos={settings.images.origins.pos} alt="Plateau vide et banc — image provisoire" className="aspect-[4/5] w-full rounded-sm" hint={t("asso.origins.hint")} /></Reveal>
          <div className="space-y-6 text-base leading-relaxed text-ink/85 sm:text-lg lg:col-span-6 lg:col-start-7 lg:pt-10">
            <SectionLabel n="01">{t("asso.origins.label")}</SectionLabel>
            <p className="font-display text-2xl leading-snug text-ink sm:text-3xl"><Rich text={t("asso.origins.lead")} accent="text-sky-deep" /></p>
            <p><Rich text={t("asso.origins.p1")} accent="text-sky-deep" /></p>
            <p><Rich text={t("asso.origins.p2")} accent="text-sky-deep" /></p>
            {t("asso.origins.note") && <p className="text-sm text-ink/75"><Rich text={t("asso.origins.note")} /></p>}
          </div>
        </div>
      </section>

      <section className="bg-cream-2 py-20 sm:py-28" data-testid="association-founders">
        <div className="wrap">
          <SectionLabel n="02">{t("asso.found.label")}</SectionLabel>
          <h2 className="mt-8 font-display text-4xl font-light sm:text-5xl lg:text-6xl"><MaskedLines inView lines={richLines(t("asso.found.title"), "text-sky-deep")} /></h2>
          {FOUNDERS.map((f, i) => <FounderBio key={f.id} f={f} flip={i % 2 === 1} />)}
        </div>
      </section>

      <section className="grain relative overflow-hidden bg-forest py-24 text-cream sm:py-36" data-testid="association-vision">
        <div className="wrap relative z-[2] grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <SectionLabel n="03" tone="light">{t("asso.vision.label")}</SectionLabel>
            <h2 className="mt-8 font-display text-4xl font-light leading-[1.05] sm:text-5xl lg:text-6xl"><MaskedLines inView lines={richLines(t("asso.vision.title"), "text-sky")} /></h2>
          </div>
          <div className="grid gap-10 sm:grid-cols-3 lg:col-span-7">
            {[1, 2, 3].map((n, i) => [t(`asso.vision.${n}.title`), t(`asso.vision.${n}.text`), n]).map(([tt, d, n], i) => (
              <Reveal key={n} delay={i * 0.1}>
                <span className="font-mono text-xs text-sky">0{n}</span>
                <h3 className="mt-3 font-display text-2xl sm:text-3xl">{tt}</h3>
                <p className="mt-3 text-[15px] leading-relaxed text-cream/85"><Rich text={d} accent="text-sky" /></p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-cream py-24 sm:py-32" data-testid="association-experience">
        <div className="wrap">
          <SectionLabel n="04">{t("asso.exp.label")}</SectionLabel>
          <div className="mt-8 grid gap-8 lg:grid-cols-12">
            <h2 className="font-display text-4xl font-light leading-[1.05] sm:text-5xl lg:col-span-6"><Rich text={t("asso.exp.title")} accent="text-sky-deep" /></h2>
            <p className="text-base leading-relaxed text-ink/80 sm:text-lg lg:col-span-5 lg:col-start-8"><Rich text={t("asso.exp.text")} accent="text-sky-deep" /></p>
          </div>
          <div className="mt-12 overflow-hidden rounded-sm border border-ink/20">
            {[1, 2, 3, 4, 5, 6, 7].map((n) => [t(`asso.exp.${n}.who`), t(`asso.exp.${n}.what`), t(`asso.exp.${n}.text`)]).filter(([w, x, d]) => w || x || d).map(([who, what, d], i) => (
              <Reveal key={i} y={12} className="grid gap-2 border-b border-ink/15 p-5 last:border-0 sm:grid-cols-12 sm:items-baseline sm:p-6" data-testid={`experience-row-${i}`}>
                <p className={`eyebrow sm:col-span-4 ${who.startsWith("Les Enfants") ? "text-sky-deep" : "text-ink/70"}`}>{who}</p>
                <p className="font-display text-xl sm:col-span-4">{what}</p>
                <p className="text-sm text-ink/80 sm:col-span-4"><Rich text={d} accent="text-sky-deep" /></p>
              </Reveal>
            ))}
          </div>
          <div className="mt-12 grid gap-6 rounded-sm bg-night p-8 text-cream sm:grid-cols-4 sm:p-10" data-testid="association-identity">
            <p className="eyebrow text-sky sm:col-span-4">{t("asso.id.title")}</p>
            <div><p className="text-xs text-cream/75">{t("asso.id.formK")}</p><p className="mt-1">{t("asso.id.formV")}</p></div>
            <div><p className="text-xs text-cream/75">{t("asso.id.seatK")}</p><p className="mt-1">{t("asso.id.seatV")}</p></div>
            <div><p className="text-xs text-cream/75">{t("asso.id.dateK")}</p><p className="mt-1">{settings.creationDate || <Pending tone="light" />}</p></div>
            <div><p className="text-xs text-cream/75">{t("asso.id.rnaK")}</p><p className="mt-1">{settings.rna || <Pending tone="light" />}</p></div>
          </div>
          <Link to="/contact?type=collaboration" className="btn btn-ink mt-12" data-testid="association-cta-collab">{t("asso.cta")} <ArrowRight size={18} /></Link>
        </div>
      </section>
    </div>
  );
}
