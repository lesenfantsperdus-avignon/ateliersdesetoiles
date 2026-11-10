import { MaskedLines, Stars } from "./Bits";
import { motion } from "framer-motion";

const TONES = {
  night: "bg-night text-cream",
  forest: "bg-forest text-cream",
  sky: "bg-sky text-night",
  cream: "bg-cream text-ink",
};

export const PageHero = ({ tone = "night", label, lines, intro, note, children, testid }) => {
  const dark = tone === "night" || tone === "forest";
  return (
    <section className={`grain relative overflow-hidden pb-16 pt-36 sm:pb-24 sm:pt-44 ${TONES[tone]}`} data-testid={testid}>
      {dark && <Stars count={36} className="opacity-60" />}
      <div className="wrap relative z-[2]">
        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.1 }}
          className={`eyebrow ${dark ? "text-sky" : tone === "sky" ? "text-night" : "text-sky-deep"}`}>{label}</motion.p>
        <h1 className="mt-6 max-w-5xl font-display text-[2.9rem] font-light leading-[0.98] tracking-tight sm:text-7xl lg:text-[6.5rem]">
          <MaskedLines lines={lines} />
        </h1>
        <div className="mt-10 grid gap-8 md:grid-cols-12">
          {intro && (
            <motion.p initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.7, duration: 0.8 }}
              className={`text-base leading-relaxed sm:text-lg md:col-span-6 md:col-start-6 ${dark ? "text-cream/85" : "text-ink/85"}`}>{intro}</motion.p>
          )}
          {note && <p className={`note -rotate-3 md:col-span-4 md:col-start-1 md:row-start-1 ${dark ? "text-sky" : "text-sky-deep"}`}>{note}</p>}
        </div>
        {children}
      </div>
    </section>
  );
};
