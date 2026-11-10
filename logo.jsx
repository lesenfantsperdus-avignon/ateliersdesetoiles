export const LogoMark = ({ className = "h-9 w-9", moon = "currentColor", star = "#7CC8F0" }) => (
  <svg viewBox="0 0 64 64" className={className} aria-hidden="true">
    <path d="M40 12a20 20 0 1 0 12 32A16 16 0 1 1 40 12z" fill={moon} />
    <path d="M44 8l2.4 6.6L53 17l-6.6 2.4L44 26l-2.4-6.6L35 17l6.6-2.4z" fill={star} />
    <path d="M8 56c8-3 14-9 18-16" stroke={moon} strokeWidth="1.4" fill="none" strokeDasharray="2 3" strokeLinecap="round" />
  </svg>
);

export const Logo = ({ tone = "ink" }) => (
  <span className={`flex items-center gap-2.5 ${tone === "ink" ? "text-ink" : "text-cream"}`}>
    <LogoMark className="h-8 w-8 sm:h-9 sm:w-9" star={tone === "ink" ? "#0B6A9E" : "#7CC8F0"} />
    <span className="leading-none">
      <span className="block font-display text-[19px] font-medium tracking-tight sm:text-[21px]">
        Les Enfants <span className="italic-wonk">Perdus</span>
      </span>
      <span className="mt-1 block font-mono text-[10.5px] uppercase tracking-[0.2em] opacity-80">Théâtre · Avignon</span>
    </span>
  </span>
);
