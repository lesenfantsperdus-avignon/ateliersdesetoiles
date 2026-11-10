import { useRef } from "react";
import { Link } from "react-router-dom";
import { motion, useScroll, useTransform, useMotionValue, useSpring } from "framer-motion";
import { ArrowDownRight, ArrowRight } from "lucide-react";
import { MaskedLines, Stars, Rich, richLines } from "@/components/site/Bits";
import { LogoMark } from "@/components/site/Logo";
import { useContent } from "@/context/ContentContext";
import { resolveImg, isUploaded } from "@/lib/api";

const Compass = ({ rx, ry }) => (
  <motion.div style={{ rotateX: rx, rotateY: ry, transformPerspective: 900 }}
    className="relative aspect-square w-full max-w-[460px]" data-testid="hero-map">
    <svg viewBox="0 0 400 400" className="absolute inset-0 h-full w-full text-cream" fill="none" aria-hidden="true">
      <circle cx="200" cy="200" r="180" stroke="currentColor" strokeOpacity=".25" />
      <circle cx="200" cy="200" r="130" stroke="currentColor" strokeOpacity=".18" strokeDasharray="2 6" />
      <g className="origin-center animate-spin-slow" style={{ transformBox: "fill-box" }}>
        {Array.from({ length: 36 }).map((_, i) => (
          <line key={i} x1="200" y1="20" x2="200" y2={i % 9 === 0 ? 40 : 28} stroke="currentColor" strokeOpacity=".5" transform={`rotate(${i * 10} 200 200)`} />
        ))}
      </g>
      <path className="map-path" d="M70 300 C 120 250, 110 190, 170 180 S 250 120, 300 90" stroke="#7CC8F0" strokeWidth="1.6" />
      <circle cx="70" cy="300" r="4" fill="#E9B949" />
      <path d="M300 90 l6 -16 l6 16 l16 6 l-16 6 l-6 16 l-6 -16 l-16 -6z" fill="#7CC8F0" />
      <path d="M262 112 l3 -8 l3 8 l8 3 l-8 3 l-3 8 l-3 -8 l-8 -3z" fill="#F4EEE3" />
      <text x="58" y="326" fill="#F4EEE3" fontSize="11" fontFamily="IBM Plex Mono" letterSpacing="2">AVIGNON</text>
      <text x="314" y="76" fill="#7CC8F0" fontSize="11" fontFamily="IBM Plex Mono" letterSpacing="2">2e ÉTOILE</text>
    </svg>
    <div className="absolute inset-[30%] grid place-items-center" style={{ transform: "translateZ(60px)" }}>
      <LogoMark className="h-full w-full text-cream drop-shadow-[0_0_40px_rgba(124,200,240,.45)]" />
    </div>
  </motion.div>
);

export const Hero = () => {
  const { t, settings } = useContent();
  const heroImg = settings.images.hero;
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const imgY = useTransform(scrollYProgress, [0, 1], ["0%", "22%"]);
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "-18%"]);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const rx = useSpring(useTransform(my, [-0.5, 0.5], [14, -14]), { stiffness: 80, damping: 18 });
  const ry = useSpring(useTransform(mx, [-0.5, 0.5], [-18, 18]), { stiffness: 80, damping: 18 });
  const onMove = (e) => {
    const r = ref.current.getBoundingClientRect();
    mx.set((e.clientX - r.left) / r.width - 0.5);
    my.set((e.clientY - r.top) / r.height - 0.5);
  };

  return (
    <section ref={ref} onMouseMove={onMove} className="grain relative min-h-[100svh] overflow-hidden bg-night text-cream" data-testid="home-hero">
      <motion.div style={{ y: imgY }} className="absolute inset-0 -top-[6%] h-[115%]">
        <img src={resolveImg(heroImg.img)} alt="" style={{ objectPosition: heroImg.pos }} className="h-full w-full object-cover opacity-55" fetchpriority="high" />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(11,19,43,.55)_0%,rgba(11,19,43,.2)_45%,#0B132B_100%)]" />
      </motion.div>
      <Stars count={60} className="z-[1] opacity-70" />
      {!isUploaded(heroImg.img) && <span className="ph-tag !left-auto !right-4 !top-24 sm:!top-28">Image d'ambiance — à remplacer</span>}

      <motion.div style={{ y: textY }} className="wrap relative z-[2] grid min-h-[100svh] items-end gap-10 pb-14 pt-32 lg:grid-cols-12 lg:items-center lg:pb-20">
        <div className="lg:col-span-8">
          <motion.p initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1, duration: 0.8 }}
            className="eyebrow text-sky" data-testid="hero-positioning">{t("home.hero.eyebrow")}</motion.p>
          <h1 className="mt-6 font-display text-[3.1rem] font-light leading-[0.95] tracking-[-0.02em] sm:text-7xl lg:text-[7.4rem]" data-testid="hero-title">
            <MaskedLines delay={0.3} lines={richLines(t("home.hero.title"), "text-sky")} />
          </h1>
          <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.1, duration: 0.9 }} className="mt-8 max-w-xl">
            <p className="text-base leading-relaxed text-cream/85 sm:text-lg [&_strong]:text-cream">
              <Rich text={t("home.hero.intro")} accent="text-sky" />
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link to="/ateliers" className="btn btn-sky" data-testid="hero-cta-ateliers">{t("home.hero.cta1")} <ArrowRight size={18} /></Link>
              <Link to="/#demarche" className="btn btn-line text-cream" data-testid="hero-cta-demarche">{t("home.hero.cta2")} <ArrowDownRight size={18} /></Link>
            </div>
          </motion.div>
        </div>
        <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.6, duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
          className="relative hidden lg:col-span-4 lg:block">
          <Compass rx={rx} ry={ry} />
          <p className="note absolute -bottom-6 -left-10 max-w-[240px] -rotate-6 text-sky">{t("home.hero.note")}</p>
        </motion.div>
        <p className="note -mt-4 -rotate-2 text-sky lg:hidden">{t("home.hero.note")}</p>
      </motion.div>
      <div className="absolute bottom-5 left-0 right-0 z-[2] hidden justify-between px-12 font-mono text-[11px] uppercase tracking-[0.2em] text-cream/70 lg:flex">
        <span>{t("home.hero.bottomLeft")}</span><span>{t("home.hero.bottomRight")}</span>
      </div>
    </section>
  );
};
