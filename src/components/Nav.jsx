import { Link, useLocation } from "react-router-dom";
import { LogoIcon } from "./LogoIcon";
import { useState, useEffect } from "react";

const NAV_LINKS = [
  { label: "Programs", href: "/#programs" },
  { label: "About", href: "/#about" },
  { label: "Schools", href: "/#schools" },
  { label: "FAQ", href: "/#faq" },
];

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { pathname } = useLocation();
  const isHome = pathname === "/";

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });

    setScrolled(window.scrollY > 20);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth > 768) setMenuOpen(false);
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  return (
    <>
      <header
        className={[
          "fixed top-0 left-0 right-0 z-50 h-18",
          "flex items-center justify-between px-6 md:px-10",
          "bg-[rgba(14,17,23,0.88)] backdrop-blur-2xl",
          "transition-[border-color] duration-400",
          scrolled
            ? "border-b border-slate-light"
            : "border-b border-transparent",
        ].join(" ")}
      >
        <Link to="/" aria-label="Skilimu home">
          <LogoIcon />
        </Link>

        {/* Desktop links */}
        <nav className="hidden md:flex items-center gap-9">
          {NAV_LINKS.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="font-mono text-[11px] tracking-[2px] uppercase text-white-dim hover:text-electric transition-colors duration-200"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Right actions */}
        <div className="flex items-center gap-2 md:gap-3">
          <a href="/#schools" className="hidden sm:block">
            <button className="px-4 py-2.5 text-sm font-medium text-stark-white border border-slate-light rounded-lg hover:border-electric hover:text-electric transition-all duration-200">
              For schools
            </button>
          </a>
          <a href="/#schools">
            <button className="px-4 py-2.5 text-sm font-semibold bg-electric text-deep-slate rounded-lg hover:shadow-[0_0_40px_rgba(0,229,160,0.4)] hover:-translate-y-0.5 transition-all duration-200">
              Enquire now
            </button>
          </a>
          {/* Hamburger */}
          <button
            className="md:hidden p-2 text-stark-white"
            onClick={() => setMenuOpen((m) => !m)}
            aria-label="Toggle menu"
          >
            <svg
              width="22"
              height="22"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            >
              {menuOpen ? (
                <>
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </>
              ) : (
                <>
                  <line x1="3" y1="7" x2="21" y2="7" />
                  <line x1="3" y1="12" x2="21" y2="12" />
                  <line x1="3" y1="17" x2="21" y2="17" />
                </>
              )}
            </svg>
          </button>
        </div>
      </header>

      {menuOpen && (
        <div className="fixed top-18 left-0 right-0 z-40 bg-[rgba(14,17,23,0.97)] backdrop-blur-2xl border-b border-slate-light px-6 py-8 flex flex-col gap-6 md:hidden">
          {NAV_LINKS.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className="font-mono text-[11px] tracking-[2px] uppercase text-white-dim hover:text-electric transition-colors"
            >
              {link.label}
            </a>
          ))}
          <div className="pt-4 border-t border-slate-light flex flex-col gap-3">
            {/* <a href="/#schools" onClick={() => setMenuOpen(false)}>
              <button className="w-full py-3 text-sm font-medium text-stark-white border border-slate-light rounded-lg">
                For schools
              </button>
            </a> */}
            <a href="#schools" onClick={() => setMenuOpen(false)}>
              <button className="w-full py-3 text-sm font-semibold bg-electric text-deep-slate rounded-lg">
                Enquire now
              </button>
            </a>
          </div>
        </div>
      )}
    </>
  );
}
