import React, { useState, useEffect } from 'react';
import logoImage from '../../assets/TSlogo.png';

const EMBLEM_URL = logoImage;

interface NavLink {
  number: string;
  label: string;
  href: string;
  id: string;
}

const navLinks: NavLink[] = [
  { number: '01.', label: 'HOME', href: '#home', id: 'home' },
  { number: '02.', label: 'ABOUT', href: '#about', id: 'about' },
  { number: '03.', label: 'EXPERIENCE', href: '#experience', id: 'experience' },
  { number: '04.', label: 'WORK', href: '#work', id: 'work' },
  { number: '05.', label: 'CONTACT', href: '#contact', id: 'contact' },
];

export const Navbar: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [imgSrc, setImgSrc] = useState(logoImage || EMBLEM_URL);
  const [activeId, setActiveId] = useState('home');
  const [scrolled, setScrolled] = useState(false);

  /* track scroll position for glow intensity */
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  /* intersection observer – highlight active section */
  useEffect(() => {
    const ids = navLinks.map((l) => l.id);
    const observers: IntersectionObserver[] = [];

    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;
      const obs = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setActiveId(id); },
        { threshold: 0.35 }
      );
      obs.observe(el);
      observers.push(obs);
    });

    return () => observers.forEach((o) => o.disconnect());
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 w-full backdrop-blur-md border-b transition-all duration-500 ${scrolled
          ? 'bg-[#080808]/98 border-[#cba864]/20 shadow-[0_4px_32px_-4px_rgba(203,168,100,0.12)]'
          : 'bg-[#080808]/90 border-[#1f1e1a]'
        }`}
      data-purpose="site-header"
    >
      {/* Subtle top gold hairline glow when scrolled */}
      {scrolled && (
        <div
          aria-hidden
          className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#cba864]/40 to-transparent pointer-events-none"
        />
      )}

      <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-12 h-20 sm:h-24 flex items-center justify-between">

        {/* ── Brand Logo ───────────────────────────────────────── */}
        <a
          aria-label="MR. Brand Home"
          className="group flex items-center shrink-0"
          href="#home"
          onClick={() => setMobileMenuOpen(false)}
        >
          <div className="relative flex items-center justify-center transition-transform duration-500 group-hover:scale-105 w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28">
            <img
              alt="MR. Emblem Crest Logo"
              className="w-full h-full object-contain filter drop-shadow-[0_2px_12px_rgba(203,168,100,0.25)] group-hover:drop-shadow-[0_2px_18px_rgba(203,168,100,0.5)] transition-all duration-500"
              src={imgSrc}
              onError={() => setImgSrc(EMBLEM_URL)}
            />
          </div>
        </a>

        {/* ── Desktop Navigation ───────────────────────────────── */}
        <nav className="hidden md:flex items-center space-x-5 lg:space-x-7" data-purpose="header-nav">
          {navLinks.map((link) => {
            const isActive = activeId === link.id;
            return (
              <a
                key={link.label}
                href={link.href}
                className={`group relative flex flex-col items-center text-[10px] lg:text-[11px] uppercase tracking-[0.26em] font-medium transition-colors duration-300 py-2 ${isActive ? 'text-[#edd89f]' : 'text-[#7a7469] hover:text-[#d8be82]'
                  }`}
              >
                <span className="flex items-center gap-1.5">
                  {isActive && (
                    <span className="inline-block w-1 h-1 rotate-45 bg-[#dfb76c] shadow-[0_0_4px_#dfb76c]" />
                  )}
                  <span className="opacity-50 mr-0.5 font-mono">{link.number}</span>
                  {link.label}
                  {isActive && (
                    <span className="inline-block w-1 h-1 rotate-45 bg-[#dfb76c] shadow-[0_0_4px_#dfb76c]" />
                  )}
                </span>
                {/* Active underline with diamond centre */}
                {isActive && (
                  <span className="absolute -bottom-px left-0 right-0 flex items-center justify-center">
                    <span className="flex-1 h-[1px] bg-gradient-to-r from-transparent to-[#dfb76c]/70" />
                    <span className="w-1 h-1 rotate-45 bg-[#dfb76c]/70 mx-0.5 shadow-[0_0_5px_#dfb76c]" />
                    <span className="flex-1 h-[1px] bg-gradient-to-l from-transparent to-[#dfb76c]/70" />
                  </span>
                )}
              </a>
            );
          })}
        </nav>

        {/* ── Right side: motto + CTA + mobile toggle ──────────── */}
        <div className="flex items-center gap-3 sm:gap-4">
          {/* Motto (xl only) */}
          <div className="hidden xl:flex flex-col text-right">
            <span className="text-[9px] tracking-[0.25em] font-medium uppercase text-[#6f6558] leading-tight">
              BUILT ON VALUES.
            </span>
            <span className="text-[9px] tracking-[0.25em] font-medium uppercase text-[#6f6558] leading-tight">
              DRIVEN BY PURPOSE.
            </span>
          </div>

          {/* GET IN TOUCH CTA */}
          <a
            className="hidden sm:inline-flex text-[10px] sm:text-[11px] tracking-[0.24em] uppercase text-[#cfb682] hover:text-[#fff] px-3.5 py-1.5 border border-[#3e3422] hover:border-[#cba864] hover:shadow-[0_0_12px_-2px_rgba(203,168,100,0.3)] transition-all duration-300"
            href="#contact"
          >
            GET IN TOUCH
          </a>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-[#cfb682] hover:text-white focus:outline-none"
            aria-label="Toggle Menu"
          >
            <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
              {mobileMenuOpen ? (
                <path fillRule="evenodd" clipRule="evenodd" d="M18.278 16.864a1 1 0 01-1.414 1.414l-4.829-4.828-4.828 4.828a1 1 0 01-1.414-1.414l4.828-4.829-4.828-4.828a1 1 0 011.414-1.414l4.829 4.828 4.828-4.828a1 1 0 111.414 1.414l-4.828 4.829 4.828 4.828z" />
              ) : (
                <path fillRule="evenodd" d="M4 5h16a1 1 0 010 2H4a1 1 0 110-2zm0 6h16a1 1 0 010 2H4a1 1 0 010-2zm0 6h16a1 1 0 010 2H4a1 1 0 010-2z" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* ── Mobile Drawer ────────────────────────────────────────── */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#080808]/98 border-b border-[#1f1e1a] px-6 py-5 space-y-1">
          {navLinks.map((link) => {
            const isActive = activeId === link.id;
            return (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`flex items-center gap-3 text-[11px] uppercase tracking-[0.24em] font-medium py-2.5 transition-colors border-b border-[#1a1712]/60 last:border-0 ${isActive ? 'text-[#edd89f]' : 'text-[#7a7469] hover:text-[#d8be82]'
                  }`}
              >
                {isActive && (
                  <span className="w-1 h-1 rotate-45 bg-[#dfb76c] shadow-[0_0_5px_#dfb76c]" />
                )}
                <span className="text-[#5e5749] font-mono text-[10px]">{link.number}</span>
                {link.label}
              </a>
            );
          })}

          <a
            href="#contact"
            onClick={() => setMobileMenuOpen(false)}
            className="block mt-4 text-center text-[10px] tracking-[0.24em] uppercase text-[#cfb682] hover:text-[#fff] px-3.5 py-2 border border-[#3e3422] hover:border-[#cba864] transition-all duration-300"
          >
            GET IN TOUCH
          </a>
        </div>
      )}
    </header>
  );
};
