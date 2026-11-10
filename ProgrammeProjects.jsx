import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { Reveal, MaskedLines, Photo, SectionLabel, Rich, richLines } from "@/components/site/Bits";
import { useContent } from "@/context/ContentContext";

const TONE = { sky: "bg-sky text-night", night: "bg-night text-cream", forest: "bg-forest text-cream" };

export const Programme = () => {
  const { workshops: WORKSHOPS, t } = useContent();
  return (
  <section className="bg-cream py-24 sm:py-36" data-testid="home-programme">
    <div className="wrap">
      <div className="grid gap-8 lg:grid-cols-12 lg:items-end">
        <div className="lg:col-span-7">
          <SectionLabel n="03">{t("home.prog.label")}</SectionLabel>
          <h2 className="mt-8 font-display text-4xl font-light leading-[1.05] tracking-tight sm:text-5xl lg:text-[4.2rem]">
            <MaskedLines inView lines={richLines(t("home.prog.title"), "text-sky-deep")} />
          </h2>
        </div>
        <Reveal className="text-base leading-relaxed text-ink/85 sm:text-lg lg:col-span-5">
          <Rich text={t("home.prog.text")} accent="text-sky-deep" />
        </Reveal>
      </div>
      <div className="mt-16 grid gap-5 md:grid-cols-3">
        {WORKSHOPS.map((w, i) => (
          <Reveal key={w.id} delay={i * 0.08}>
            <Link to={`/ateliers#${w.id}`} data-testid={`home-workshop-${w.id}`}
              className={`group relative flex h-full flex-col overflow-hidden rounded-sm ${TONE[w.tone]} transition-transform duration-500 hover:-translate-y-2`}>
              <Photo src={w.img} pos={w.pos} alt={`${w.public} — image provisoire`} className="aspect-[5/4] w-full paper-edge order-2 mt-auto" spot={false} label="Photo à remplacer" />
              <div className="p-7 sm:p-8">
                <div className="flex items-center justify-between">
                  <span className="eyebrow">{w.public}</span>
                  <ArrowUpRight className="transition-transform duration-500 group-hover:rotate-45" />
                </div>
                <h3 className="mt-6 font-display text-3xl leading-tight">{w.name}</h3>
                <p className="mt-6 font-mono text-sm">{w.age}<br />{w.day} · {w.time}</p>
                {w.start && <p className="note mt-3 -rotate-2">{w.start}</p>}
              </div>
            </Link>
          </Reveal>
        ))}
      </div>
    </div>
  </section>
  );
};

export const ProjectsTeaser = () => {
  const { projects: PROJECTS, t } = useContent();
  const [tab, setTab] = useState("asso");
  const list = PROJECTS.filter((p) => (tab === "asso" ? p.cat === "asso" : p.cat === "parcours" || p.cat === "recherche")).slice(0, 3);
  return (
    <section className="grain relative overflow-hidden bg-night py-24 text-cream sm:py-36" data-testid="home-projects">
      <div className="wrap relative z-[2]">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <SectionLabel n="04" tone="light">{t("home.proj.label")}</SectionLabel>
            <h2 className="mt-8 font-display text-4xl font-light leading-[1.05] sm:text-5xl lg:text-6xl"><Rich text={t("home.proj.title")} accent="text-sky" /></h2>
          </div>
          <div className="flex w-fit rounded-full border border-cream/30 p-1" role="tablist">
            {[["asso", t("home.proj.tab1")], ["parcours", t("home.proj.tab2")]].map(([k, l]) => (
              <button key={k} role="tab" aria-selected={tab === k} onClick={() => setTab(k)} data-testid={`projects-tab-${k}`}
                className={`relative rounded-full px-4 py-2 text-sm transition-colors sm:px-5 ${tab === k ? "text-night" : "text-cream"}`}>
                {tab === k && <motion.span layoutId="ptab" className="absolute inset-0 rounded-full bg-sky" transition={{ type: "spring", stiffness: 300, damping: 30 }} />}
                <span className="relative">{l}</span>
              </button>
            ))}
          </div>
        </div>
        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {list.map((p, i) => (
            <motion.article key={p.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.08 }} className="group" data-testid={`home-project-${p.id}`}>
              <Photo src={p.img} pos={p.pos} alt={`${p.title} — image provisoire`} className="aspect-[4/5] w-full rounded-sm" />
              <p className="mt-5 font-mono text-xs uppercase tracking-[0.18em] text-sky">{t(`cat.${p.cat}`)}</p>
              <h3 className="mt-2 font-display text-2xl">{p.title}</h3>
              <p className="mt-1 text-sm text-cream/75">{p.year}</p>
            </motion.article>
          ))}
        </div>
        <Link to="/projets" className="btn btn-line mt-14 text-cream" data-testid="home-projects-all">{t("home.proj.all")} <ArrowRight size={18} /></Link>
      </div>
    </section>
  );
};
