import { LogoMark } from "./Logo";

export const Marquee = ({ items, className = "bg-sky text-night" }) => {
  const row = (k) => (
    <div className="flex shrink-0 items-center" aria-hidden={k === 1}>
      {items.map((t, i) => (
        <span key={`${k}-${i}`} className="flex items-center">
          <span className={`px-6 font-display text-4xl sm:text-6xl lg:text-7xl ${i % 2 ? "italic-wonk" : ""}`}>{t}</span>
          <LogoMark className="h-8 w-8 sm:h-10 sm:w-10" star="#0B132B" moon="#0B132B" />
        </span>
      ))}
    </div>
  );
  return (
    <section className={`overflow-hidden py-6 sm:py-8 ${className}`} data-testid="editorial-marquee" aria-label="Notre langage théâtral">
      <div className="marquee-track flex w-max animate-marquee">{row(0)}{row(1)}</div>
    </section>
  );
};
