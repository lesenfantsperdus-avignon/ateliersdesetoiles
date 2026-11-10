import { useEffect, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ArrowUpRight } from "lucide-react";
import { Logo } from "./Logo";
import { NAV } from "@/lib/content";
import { useContent } from "@/context/ContentContext";

const MobileMenu = ({ onClose }) => {
  const { contact: CONTACT, t } = useContent();
  return (
  <motion.div
    initial={{ clipPath: "inset(0 0 100% 0)" }}
    animate={{ clipPath: "inset(0 0 0% 0)" }}
    exit={{ clipPath: "inset(0 0 100% 0)" }}
    transition={{ duration: 0.6, ease: [0.76, 0, 0.24, 1] }}
    className="fixed inset-0 z-[60] flex flex-col bg-night px-6 pb-8 pt-24 text-cream lg:hidden"
    data-testid="mobile-menu"
  >
    <nav className="flex flex-1 flex-col gap-2">
      {NAV.map((n, i) => (
        <motion.div key={n.to} initial={{ y: 40, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.25 + i * 0.06 }}>
          <NavLink to={n.to} onClick={onClose} data-testid={`mobile-nav-${n.id}`} className="flex items-baseline gap-4 border-b border-cream/15 py-3 font-display text-4xl">
            <span className="font-mono text-xs text-sky">0{i + 1}</span>{t(`nav.${n.id}`)}
          </NavLink>
        </motion.div>
      ))}
    </nav>
    <div className="space-y-1 text-sm text-cream/80">
      <a href={`mailto:${CONTACT.email}`} className="block">{CONTACT.email}</a>
      <p>{CONTACT.venue}, Avignon</p>
    </div>
  </motion.div>
  );
};

export const Nav = () => {
  const { t } = useContent();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { pathname } = useLocation();

  useEffect(() => { setOpen(false); }, [pathname]);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-[70] px-3 pt-3 sm:px-5 sm:pt-4" data-testid="site-header">
        <div className={`mx-auto flex max-w-[1400px] items-center justify-between rounded-full px-4 py-2.5 transition-[background-color,box-shadow] duration-500 sm:px-6 ${open ? "bg-transparent" : scrolled ? "bg-cream/85 shadow-[0_8px_30px_-12px_rgba(11,19,43,.35)] backdrop-blur-xl" : "bg-cream/70 backdrop-blur-md"}`}>
          <Link to="/" data-testid="nav-logo" aria-label="Les Enfants Perdus — accueil">
            <Logo tone={open ? "cream" : "ink"} />
          </Link>
          <nav className="hidden items-center gap-7 lg:flex" aria-label="Navigation principale">
            {NAV.map((n) => (
              <NavLink key={n.to} to={n.to} end={n.to === "/"} data-testid={`nav-link-${n.id}`}
                className={({ isActive }) => `relative text-[15px] text-ink transition-colors hover:text-sky-deep ${isActive ? "after:absolute after:-bottom-1.5 after:left-1/2 after:h-1.5 after:w-1.5 after:-translate-x-1/2 after:rounded-full after:bg-sky-deep" : ""}`}>
                {t(`nav.${n.id}`)}
              </NavLink>
            ))}
          </nav>
          <div className="flex items-center gap-2">
            <Link to="/ateliers#inscription" data-testid="nav-cta-inscription" className="btn btn-ink hidden !py-2.5 sm:inline-flex">
              {t("nav.cta")} <ArrowUpRight size={16} />
            </Link>
            <button onClick={() => setOpen((o) => !o)} aria-label={open ? "Fermer le menu" : "Ouvrir le menu"} aria-expanded={open}
              data-testid="mobile-menu-toggle" className={`grid h-11 w-11 place-items-center rounded-full lg:hidden ${open ? "bg-cream text-night" : "bg-night text-cream"}`}>
              {open ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </header>
      <AnimatePresence>{open && <MobileMenu onClose={() => setOpen(false)} />}</AnimatePresence>
    </>
  );
};
