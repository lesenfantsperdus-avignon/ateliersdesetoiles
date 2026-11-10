import { useSearchParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { PageHero } from "@/components/site/PageHero";
import { Photo, Pending, Rich, richLines } from "@/components/site/Bits";
import { CATS } from "@/lib/content";
import { useContent, useT } from "@/context/ContentContext";
import { useTitle } from "@/hooks/useTitle";

const Card = ({ p, i }) => {
  const t = useT();
  const big = i % 5 === 0;
  return (
    <motion.article initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.1 }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      className={`group flex flex-col ${big ? "md:col-span-2" : ""}`} data-testid={`project-card-${p.id}`}>
      <Photo src={p.img} pos={p.pos} alt={`${p.title} — image provisoire`} className={`w-full rounded-sm ${big ? "aspect-[16/9]" : "aspect-[4/3]"}`} />
      <div className="mt-5 flex flex-wrap items-center gap-2">
        <span className={`rounded-full px-3 py-1 font-mono text-[11px] uppercase tracking-[0.14em] ${p.cat === "asso" ? "bg-sky text-night" : p.cat === "avenir" ? "bg-star text-night" : "bg-night text-cream"}`}>{t(`cat.${p.cat}`)}</span>
        <span className="font-mono text-xs text-ink/75">{p.status}</span>
      </div>
      <h3 className="mt-4 font-display text-2xl leading-tight sm:text-3xl">{p.title} {p.placeholder && <Pending>{t("pr.placeholder")}</Pending>}</h3>
      <p className="mt-1 text-sm text-ink/75">{p.kind} — {p.year}</p>
      <p className="mt-4 max-w-xl text-[15px] leading-relaxed text-ink/85">{p.desc}</p>
      <dl className="mt-5 space-y-1.5 border-t border-ink/15 pt-4 text-sm">
        {p.credits.map(([k, v]) => <div key={k} className="flex gap-3"><dt className="w-32 shrink-0 text-ink/70 sm:w-48">{k}</dt><dd>{v}</dd></div>)}
      </dl>
    </motion.article>
  );
};

export default function Projets() {
  useTitle("Projets & création", "Projets, créations, recherches et parcours des fondatrices de l'association Les Enfants Perdus.");
  const { projects: PROJECTS, t } = useContent();
  const FILTERS = [["tous", t("pr.filter.all")], ...Object.keys(CATS).map((k) => [k, t(`cat.${k}.short`)])];
  const [params, setParams] = useSearchParams();
  const f = params.get("filtre") || "tous";
  const list = f === "tous" ? PROJECTS : PROJECTS.filter((p) => p.cat === f);

  return (
    <div data-testid="page-projets">
      <PageHero tone="forest" label={t("pr.hero.label")} testid="projets-hero"
        lines={richLines(t("pr.hero.title"), "text-sky")}
        intro={<Rich text={t("pr.hero.intro")} accent="text-sky" />}
        note={t("pr.hero.note")} />

      <section className="bg-cream py-16 sm:py-24">
        <div className="wrap">
          <div className="sticky top-24 z-20 flex max-w-full gap-2 overflow-x-auto rounded-full bg-cream/90 p-1.5 shadow-[0_8px_30px_-16px_rgba(11,19,43,.4)] backdrop-blur-md sm:w-fit" role="tablist" aria-label="Filtrer les projets">
            {FILTERS.map(([k, l]) => (
              <button key={k} role="tab" aria-selected={f === k} onClick={() => setParams(k === "tous" ? {} : { filtre: k })} data-testid={`projects-filter-${k}`}
                className={`relative shrink-0 rounded-full border px-4 py-2 text-sm transition-colors ${f === k ? "border-night text-cream" : "border-ink/30 bg-cream/90 text-ink backdrop-blur hover:border-ink"}`}>
                {f === k && <motion.span layoutId="pfilter" className="absolute inset-0 rounded-full bg-night" transition={{ type: "spring", stiffness: 300, damping: 30 }} />}
                <span className="relative">{l}</span>
              </button>
            ))}
          </div>
          <div className="mt-10 grid gap-x-8 gap-y-16 md:grid-cols-2 lg:gap-x-12" data-testid="projects-grid">
            {list.map((p, i) => <Card key={p.id} p={p} i={i} />)}
          </div>
          {list.length === 0 && <p className="mt-10 text-ink/75" data-testid="projects-empty">{t("pr.empty")}</p>}

          {t("pr.guide.label") && (
          <div className="mt-24 grid gap-8 rounded-sm bg-night p-8 text-cream sm:p-12 lg:grid-cols-12" data-testid="projects-add-guide">
            <div className="lg:col-span-7">
              <p className="eyebrow text-sky">{t("pr.guide.label")}</p>
              <p className="mt-4 font-display text-2xl leading-snug sm:text-3xl"><Rich text={t("pr.guide.text")} accent="text-sky" /></p>
            </div>
            <div className="flex items-end lg:col-span-4 lg:col-start-9">
              <Link to="/contact?type=collaboration" className="btn btn-sky" data-testid="projects-cta-collab">{t("pr.guide.cta")} <ArrowRight size={18} /></Link>
            </div>
          </div>
          )}
        </div>
      </section>
    </div>
  );
}
