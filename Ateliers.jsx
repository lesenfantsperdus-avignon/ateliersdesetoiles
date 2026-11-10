import { Link } from "react-router-dom";
import { ArrowRight, Phone, Check } from "lucide-react";
import { PageHero } from "@/components/site/PageHero";
import { Reveal, Photo, SectionLabel, Pending, MaskedLines, Rich, richLines } from "@/components/site/Bits";
import { useContent } from "@/context/ContentContext";
import { useTitle } from "@/hooks/useTitle";

const TONE = { sky: "bg-sky text-night", night: "bg-night text-cream", forest: "bg-forest text-cream" };

const Info = ({ k, children }) => (
  <div className="flex items-baseline justify-between gap-4 border-b border-current/20 py-3 text-[15px]" style={{ borderColor: "currentColor" }}>
    <dt className="eyebrow opacity-80">{k}</dt><dd className="text-right">{children}</dd>
  </div>
);

const Workshop = ({ w, i }) => {
  const { contact: CONTACT, t } = useContent();
  const light = w.tone === "sky";
  const pend = (v, k) => v || <Pending tone={light ? "dark" : "light"}>{t(k)}</Pending>;
  return (
    <section id={w.id} className={`grain relative scroll-mt-20 overflow-hidden py-20 sm:py-28 ${TONE[w.tone]}`} data-testid={`workshop-${w.id}`}>
      <div className="wrap relative z-[2]">
        <div className="flex flex-wrap items-baseline justify-between gap-4">
          <p className="eyebrow">0{i + 1} — {w.public}</p>
          <p className="font-mono text-sm">{w.age}</p>
        </div>
        <h2 className="mt-6 max-w-4xl font-display text-[2.6rem] font-light leading-[1] sm:text-6xl lg:text-7xl"><MaskedLines inView lines={[w.name]} /></h2>
        <p className="mt-6 max-w-2xl text-base leading-relaxed opacity-90 sm:text-lg">{w.tagline}</p>

        <div className="mt-14 grid gap-12 lg:grid-cols-12">
          <Reveal className="lg:col-span-5">
            <Photo src={w.img} pos={w.pos} alt={`${w.public} — image provisoire`} className="aspect-[4/5] w-full rounded-sm" hint={t("ws.hint")} />
          </Reveal>
          <div className="space-y-12 lg:col-span-7">
            <dl className="rounded-sm" data-testid={`workshop-info-${w.id}`}>
              <Info k={t("ws.public")}>{w.age}</Info>
              <Info k={t("ws.day")}>{w.day}</Info>
              <Info k={t("ws.time")}>{w.time}</Info>
              {w.start && <Info k={t("ws.start")}>{w.start}</Info>}
              <Info k={t("ws.place")}>{t("ws.placeValue")}</Info>
              <Info k={t("ws.price")}>{pend(w.price, "ws.pend.price")}</Info>
              <Info k={t("ws.membership")}>{pend(w.membership, "ws.pend.membership")}</Info>
              <Info k={t("ws.trial")}>{pend(w.trial, "ws.pend.trial")}</Info>
            </dl>
            <div className="grid gap-10 sm:grid-cols-2">
              <div>
                <h3 className="eyebrow">{t("ws.does")}</h3>
                <ul className="mt-4 space-y-3 text-[15px] leading-relaxed">
                  {w.does.map((d) => <li key={d} className="flex gap-3"><Check size={16} className="mt-1 shrink-0" />{d}</li>)}
                </ul>
              </div>
              <div>
                <h3 className="eyebrow">{t("ws.tools")}</h3>
                <div className="mt-4 flex flex-wrap gap-2">
                {w.tools.map((tool) => <span key={tool} className="rounded-full border border-current px-3 py-1 text-sm">{tool}</span>)}
                </div>
                <h3 className="eyebrow mt-8">{t("ws.creation")}</h3>
                <p className="mt-3 text-[15px] leading-relaxed">{w.creation}</p>
                <h3 className="eyebrow mt-8">{t("ws.show")}</h3>
                <p className="mt-3 text-[15px] leading-relaxed">{w.performance}</p>
              </div>
            </div>
            <div className="flex flex-wrap gap-3">
              <Link to={`/contact?type=atelier&groupe=${w.id}`} className={`btn ${light ? "btn-ink" : "btn-sky"}`} data-testid={`workshop-cta-trial-${w.id}`}>{t("ws.cta")} <ArrowRight size={18} /></Link>
              <a href={`tel:${CONTACT.phones[0].tel}`} className={`btn ${light ? "btn-line-dark" : "btn-line"}`} data-testid={`workshop-cta-call-${w.id}`}><Phone size={16} /> {t("ws.call")}</a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default function Ateliers() {
  useTitle("Les Ateliers des Étoiles", "Ateliers de théâtre à Avignon pour enfants (6–11 ans), adolescent·es (12–17 ans) et adultes, au Théâtre La Carreterie.");
  const { workshops: WORKSHOPS, contact: CONTACT, settings, t } = useContent();
  const pendingList = t("enrol.pendingList").split("\n").map((s) => s.trim()).filter(Boolean);
  return (
    <div data-testid="page-ateliers">
      <PageHero tone="night" label={t("at.hero.label")} testid="ateliers-hero"
        lines={richLines(t("at.hero.title"), "text-sky")}
        intro={<Rich text={t("at.hero.intro")} accent="text-sky" />}
        note={settings.season}>
        <div className="mt-14 grid gap-px overflow-hidden rounded-sm bg-cream/20 sm:grid-cols-3" data-testid="ateliers-schedule">
          {WORKSHOPS.map((w) => (
            <a key={w.id} href={`#${w.id}`} className="group bg-night p-6 transition-colors hover:bg-night-2" data-testid={`schedule-${w.id}`}>
              <p className="eyebrow text-sky">{w.public} · {w.age}</p>
              <p className="mt-3 font-display text-2xl">{w.day}</p>
              <p className="font-mono text-sm text-cream/85">{w.time}</p>
              {w.start && <p className="mt-2 text-sm text-star">{w.start}</p>}
            </a>
          ))}
        </div>
      </PageHero>

      <section className="bg-cream py-24 sm:py-32" data-testid="ateliers-method">
        <div className="wrap grid gap-14 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <SectionLabel n="—">{t("at.method.label")}</SectionLabel>
            <h2 className="mt-8 font-display text-4xl font-light leading-[1.05] sm:text-5xl"><Rich text={t("at.method.title")} accent="text-sky-deep" /></h2>
            <p className="mt-8 text-base leading-relaxed text-ink/85 sm:text-lg"><Rich text={t("at.method.text")} accent="text-sky-deep" /></p>
            <p className="note mt-6 -rotate-2 text-sky-deep">{t("at.method.note")}</p>
          </div>
          <ol className="grid gap-4 sm:grid-cols-2 lg:col-span-7">
            {[1, 2, 3, 4].map((n, i) => ({ n: `0${n}`, t: t(`step.${n}.title`), d: t(`step.${n}.text`) })).map((s, i) => (
              <Reveal as="li" key={s.n} delay={i * 0.08} className="rounded-sm border border-ink/15 bg-cream-3 p-7 transition-[transform,box-shadow] duration-500 hover:-translate-y-1 hover:shadow-[0_20px_40px_-24px_rgba(11,19,43,.4)]" data-testid={`method-step-${s.n}`}>
                <span className="font-mono text-sm text-sky-deep">{s.n}</span>
                <h3 className="mt-4 font-display text-2xl">{s.t}</h3>
                <p className="mt-2 text-[15px] leading-relaxed text-ink/80">{s.d}</p>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      {WORKSHOPS.map((w, i) => <Workshop key={w.id} w={w} i={i} />)}

      <section id="inscription" className="scroll-mt-20 bg-cream py-24 sm:py-32" data-testid="ateliers-enrolment">
        <div className="wrap grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-6">
            <SectionLabel n="—">{t("enrol.label")}</SectionLabel>
            <h2 className="mt-8 font-display text-4xl font-light leading-[1.05] sm:text-5xl"><Rich text={t("enrol.title")} accent="text-sky-deep" /></h2>
            <p className="mt-6 text-base leading-relaxed text-ink/85 sm:text-lg"><Rich text={t("enrol.text")} accent="text-sky-deep" /></p>
            <div className="mt-8 flex flex-wrap gap-3">
              {CONTACT.phones.map((p) => <a key={p.id} href={`tel:${p.tel}`} className="btn btn-ink" data-testid={`enrol-phone-${p.id}`}><Phone size={16} /> {p.name} · {p.display}</a>)}
              <Link to="/contact?type=atelier" className="btn btn-line-dark" data-testid="enrol-form-link">{t("enrol.form")} <ArrowRight size={16} /></Link>
            </div>
          </div>
          {t("enrol.pendingTitle") && (
          <div className="rounded-sm border border-dashed border-sky-deep/60 p-7 lg:col-span-5 lg:col-start-8" data-testid="enrol-pending-info">
            <p className="eyebrow text-sky-deep">{t("enrol.pendingTitle")}</p>
            <ul className="mt-5 space-y-3 text-[15px] text-ink/85">
              {pendingList.map((item) => (
                <li key={item} className="flex items-center justify-between gap-4 border-b border-ink/10 pb-3">{item}<Pending /></li>
              ))}
            </ul>
          </div>
          )}
        </div>
      </section>
    </div>
  );
}
