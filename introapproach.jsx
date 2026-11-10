import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { Reveal, MaskedLines, Photo, SectionLabel, Pending, Scribble, Rich, richLines } from "@/components/site/Bits";
import { useContent } from "@/context/ContentContext";

export const Intro = () => {
  const { settings, t } = useContent();
  return (
  <section className="relative bg-cream py-24 sm:py-36" data-testid="home-intro">
    <div className="wrap grid gap-14 lg:grid-cols-12">
      <div className="lg:col-span-7">
        <SectionLabel n="01">{t("home.intro.label")}</SectionLabel>
        <h2 className="mt-8 font-display text-4xl font-light leading-[1.05] tracking-tight sm:text-5xl lg:text-[4.2rem]">
          <MaskedLines inView lines={richLines(t("home.intro.title"), "text-sky-deep")} />
        </h2>
        <Scribble className="mt-4 w-48 text-sky-deep" />
      </div>
      <Reveal className="space-y-6 text-base leading-relaxed text-ink/85 sm:text-lg lg:col-span-5 lg:pt-24">
        <p className="[&_strong]:text-ink"><Rich text={t("home.intro.p1")} accent="text-sky-deep" /></p>
        <p className="[&_strong]:text-ink"><Rich text={t("home.intro.p2")} accent="text-sky-deep" /></p>
        <dl className="grid grid-cols-2 gap-x-6 gap-y-5 border-t border-ink/20 pt-6 text-sm">
          <div><dt className="eyebrow text-ink/70">{t("home.intro.f1k")}</dt><dd className="mt-1">{t("home.intro.f1v")}</dd></div>
          <div><dt className="eyebrow text-ink/70">{t("home.intro.f2k")}</dt><dd className="mt-1">{settings.creationDate || <Pending>date à confirmer</Pending>}</dd></div>
          <div><dt className="eyebrow text-ink/70">{t("home.intro.f3k")}</dt><dd className="mt-1">{t("home.intro.f3v")}</dd></div>
          <div><dt className="eyebrow text-ink/70">{t("home.intro.f4k")}</dt><dd className="mt-1">{t("home.intro.f4v")}</dd></div>
        </dl>
        <Link to="/association" className="inline-flex items-center gap-2 font-medium text-sky-deep link-u" data-testid="intro-link-association">{t("home.intro.link")} <ArrowRight size={16} /></Link>
      </Reveal>
    </div>
  </section>
  );
};

export const Approach = () => {
  const { t, settings } = useContent();
  return (
  <section id="demarche" className="grain relative overflow-hidden bg-forest py-24 text-cream sm:py-36" data-testid="home-approach">
    <div className="wrap relative z-[2] grid gap-14 lg:grid-cols-12">
      <div className="lg:col-span-5">
        <div className="lg:sticky lg:top-32">
          <SectionLabel n="02" tone="light">{t("home.approach.label")}</SectionLabel>
          <h2 className="mt-8 font-display text-4xl font-light leading-[1.05] sm:text-5xl lg:text-6xl">
            <MaskedLines inView lines={richLines(t("home.approach.title"), "text-sky")} />
          </h2>
          <p className="mt-8 max-w-md text-base leading-relaxed text-cream/85 sm:text-lg"><Rich text={t("home.approach.text")} accent="text-sky" /></p>
          <Photo src={settings.images.approach.img} pos={settings.images.approach.pos} alt="Masques de théâtre posés sur une table — image provisoire" className="mt-10 aspect-[4/3] w-full max-w-md rounded-sm" hint={t("home.approach.hint")} testid="approach-photo" />
        </div>
      </div>
      <ol className="lg:col-span-6 lg:col-start-7">
        {[1, 2, 3, 4, 5, 6].map((n, i) => (
          <Reveal as="li" key={n} className="group border-t border-cream/20 py-8 last:border-b" data-testid={`approach-item-${i}`}>
            <div className="flex items-baseline gap-5">
              <span className="font-mono text-xs text-sky">{String(n).padStart(2, "0")}</span>
              <div>
                <h3 className="font-display text-2xl transition-transform duration-500 group-hover:translate-x-2 sm:text-3xl">{t(`approach.${n}.title`)}</h3>
                <p className="mt-3 max-w-lg text-[15px] leading-relaxed text-cream/80 sm:text-base"><Rich text={t(`approach.${n}.text`)} accent="text-sky" /></p>
              </div>
            </div>
          </Reveal>
        ))}
      </ol>
    </div>
  </section>
  );
};
