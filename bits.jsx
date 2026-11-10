import { motion } from "framer-motion";
import { Fragment, useRef } from "react";
import { resolveImg, isUploaded } from "@/lib/api";

const EASE = [0.22, 1, 0.36, 1];

const TOKEN = /(\*\*[^*]+\*\*|\*[^*]+\*)/g;
const inline = (s, accent, kp) => s.split(TOKEN).filter(Boolean).map((part, i) => {
  if (part.length > 4 && part.startsWith("**") && part.endsWith("**")) return <strong key={kp + i} className="font-medium">{part.slice(2, -2)}</strong>;
  if (part.length > 2 && part.startsWith("*") && part.endsWith("*")) return <span key={kp + i} className={`italic-wonk ${accent}`}>{part.slice(1, -1)}</span>;
  return <Fragment key={kp + i}>{part}</Fragment>;
});

export const Rich = ({ text, accent = "" }) => (
  <>{String(text ?? "").split("\n").map((l, i, a) => <Fragment key={i}>{inline(l, accent, `${i}-`)}{i < a.length - 1 && <br />}</Fragment>)}</>
);

export const richLines = (text, accent = "") =>
  String(text ?? "").split("\n").map((l, i) => <Fragment key={i}>{inline(l, accent, `${i}-`)}</Fragment>);

export const Reveal = ({ children, delay = 0, y = 28, className = "", as = "div", ...rest }) => {
  const M = motion[as];
  return (
    <M initial={{ opacity: 0, y }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.12 }}
      transition={{ duration: 0.9, ease: EASE, delay }} className={className} {...rest}>
      {children}
    </M>
  );
};

const lineV = {
  hidden: { y: "110%", rotate: 3 },
  show: (c) => ({ y: "0%", rotate: 0, transition: { duration: 1.1, ease: EASE, delay: c } }),
};

export const MaskedLines = ({ lines, className = "", delay = 0.2, stagger = 0.12, inView = false }) => (
  <motion.span className={`block ${className}`} initial="hidden"
    {...(inView ? { whileInView: "show", viewport: { once: true, amount: 0.1 } } : { animate: "show" })}>
    {lines.map((l, i) => (
      <span key={i} className="block overflow-hidden pb-[0.08em]">
        <motion.span className="block" variants={lineV} custom={(inView ? 0.05 : delay) + i * stagger}>{l}</motion.span>
      </span>
    ))}
  </motion.span>
);

export const Pending = ({ children = "à confirmer", tone = "dark", testid }) => (
  <span data-testid={testid} className={`pending align-middle ${tone === "light" ? "text-star" : "text-sky-deep"}`}>
    <span className="h-1.5 w-1.5 rounded-full bg-current" />{children}
  </span>
);

export const Photo = ({ src, alt, className = "", label = "Photo à remplacer", hint, testid, spot = true, imgClass = "", pos }) => {
  const ref = useRef(null);
  const move = (e) => {
    const r = ref.current.getBoundingClientRect();
    ref.current.style.setProperty("--sx", `${((e.clientX - r.left) / r.width) * 100}%`);
    ref.current.style.setProperty("--sy", `${((e.clientY - r.top) / r.height) * 100}%`);
  };
  return (
    <figure ref={ref} onMouseMove={spot ? move : undefined} data-testid={testid}
      className={`group relative overflow-hidden bg-night ${spot ? "spot" : ""} ${className}`}>
      <img src={resolveImg(src)} alt={alt} style={pos ? { objectPosition: pos } : undefined} loading="lazy" decoding="async"
        className={`h-full w-full object-cover grayscale-[35%] transition-transform duration-[1.4s] ease-out group-hover:scale-[1.04] ${imgClass}`} />
      {label && !isUploaded(src) && <span className="ph-tag"><span className="h-1.5 w-1.5 rounded-full bg-sky-deep" />{label}</span>}
      {hint && <figcaption className="absolute bottom-3 left-3 right-3 z-[3] font-hand text-xl leading-tight text-cream">{hint}</figcaption>}
    </figure>
  );
};

export const SectionLabel = ({ n, children, tone = "dark" }) => (
  <p className={`eyebrow flex items-center gap-3 ${tone === "light" ? "text-sky" : tone === "night" ? "text-night" : "text-sky-deep"}`}>
    {n && <span className="font-mono">{n}</span>}
    <span className="h-px w-10 bg-current" />
    {children}
  </p>
);

export const Stars = ({ count = 40, className = "" }) => {
  const pts = Array.from({ length: count }, (_, i) => ({
    x: (i * 73.13) % 100, y: (i * 37.7 + (i % 7) * 11) % 100, r: (i % 5) * 0.25 + 0.6, d: (i % 9) * 0.45,
  }));
  return (
    <svg className={`pointer-events-none absolute inset-0 h-full w-full ${className}`} aria-hidden="true">
      {pts.map((p, i) => (
        <circle key={i} cx={`${p.x}%`} cy={`${p.y}%`} r={p.r} fill="#F4EEE3" className="animate-twinkle" style={{ animationDelay: `${p.d}s` }} />
      ))}
    </svg>
  );
};

export const Scribble = ({ className = "", d = "M2 30 C 40 2, 80 2, 120 22 S 190 40, 230 8", color = "currentColor" }) => (
  <svg viewBox="0 0 232 40" className={className} fill="none" aria-hidden="true">
    <motion.path d={d} stroke={color} strokeWidth="2" strokeLinecap="round"
      initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }} viewport={{ once: true, amount: 0.1 }}
      transition={{ duration: 1.6, ease: EASE }} />
  </svg>
);
