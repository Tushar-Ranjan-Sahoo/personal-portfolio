import React, { useState } from 'react';
import bgImage from '../../assets/homepagebg.png';
import vintageCarLocal from '../../assets/vintagecar.png';

const HERO_SUIT_IMG = bgImage;
const MANSION_CAR_IMG = vintageCarLocal;
const FLOURISH_CREST_IMG = "https://lh3.googleusercontent.com/aida-public/AB6AXuBRDgG8iGlvMWu6Tw4bpvIgUSLhkHOcVv2fjpg88y4a49ykeahZgf0jKJyX0rKJ25y64w7ronAmvtr98aisLzLfzgyH3HIK08fNwjDjmB_ipbb_6p5tM1FTuU2GCdnVCmsaRKqSUngHoXY-KqWFnoxzdDM92_W2a40C0aEoOyewnx__amLc3sut0lLvzbw_XcHEq9SIkvUgb_nY5g85yc8JVABACSnHv3VPsON2W40Vwk01_p-96H75Wm_qrkptiv2s7w";

export const HeroSection: React.FC = () => {
  const [heroImgSrc, setHeroImgSrc] = useState(HERO_SUIT_IMG);
  const [carImgSrc, setCarImgSrc] = useState(MANSION_CAR_IMG);

  return (
    <section className="relative overflow-hidden bg-[#070707] w-full" data-purpose="hero-and-about-frame" id="home">
      {/* Single Unified Frame Canvas */}
      <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-12 py-6 sm:py-12 lg:py-16 flex flex-col space-y-8 sm:space-y-12 lg:space-y-16">
        
        {/* =========================================================
            PART 1: HERO TOP BANNER (TEXT LEFT, IMAGE RIGHT ON ALL SCREENS)
        ========================================================= */}
        <div className="flex flex-row items-center justify-between gap-3 sm:gap-6 lg:gap-12 w-full">
          
          {/* Left Copy (Text on the left) */}
          <div className="w-[58%] sm:w-[55%] lg:flex-1 flex flex-col justify-center z-10 text-left">
            {/* Welcome Eyebrow & Decorative Line */}
            <div className="mb-3 sm:mb-6">
              <span className="text-[8px] sm:text-[11px] tracking-[0.22em] sm:tracking-[0.35em] uppercase text-[#a99775] font-semibold block font-sans">
                WELCOME.
              </span>
              {/* Decorative ornate rule */}
              <div className="flex items-center space-x-1.5 sm:space-x-2 mt-1 sm:mt-3 w-20 sm:w-40 opacity-70">
                <span className="h-[1px] flex-1 bg-gradient-to-r from-[#a99775] to-transparent"></span>
                <span className="w-1 sm:w-1.5 h-1 sm:h-1.5 rotate-45 border border-[#a99775]"></span>
                <span className="h-[1px] w-4 sm:w-8 bg-transparent"></span>
              </div>
            </div>

            {/* Main Serif Headline */}
            <h1 className="font-serif text-base sm:text-3xl lg:text-[2.75rem] xl:text-[3.25rem] leading-[1.15] tracking-[0.04em] text-[#dfd6c5] uppercase font-normal">
              <span className="block">DISCIPLINE.</span>
              <span className="block text-[#cfc2aa]">STRATEGY.</span>
              <span className="block text-[#bcaa8c]">LEGACY.</span>
            </h1>

            {/* Secondary Subheadline / Body */}
            <p className="mt-2 sm:mt-4 text-[9.5px] sm:text-xs leading-relaxed text-[#8f8576] font-normal max-w-md font-sans">
              I build digital experiences with timeless design, strategic thinking, and attention to detail.
            </p>

            {/* Call to action button/link */}
            <div className="mt-4 sm:mt-8">
              <a
                className="inline-flex items-center text-[8.5px] sm:text-xs tracking-[0.2em] sm:tracking-[0.28em] uppercase text-[#e1c58c] hover:text-[#fff0cf] transition-all duration-300 group pb-1 sm:pb-2 border-b border-[#735d37] hover:border-[#dfba73]"
                href="#work"
              >
                <span className="font-medium">VIEW MY WORK</span>
                <span className="ml-1.5 sm:ml-3 transition-transform duration-300 group-hover:translate-x-1 font-light text-xs sm:text-sm">
                  →
                </span>
              </a>
            </div>
          </div>

          {/* Right Hero Visual (Smooth borderless visual blending into background) */}
          <div className="w-[42%] sm:w-[45%] lg:w-[48%] relative flex items-center justify-center overflow-hidden h-[180px] sm:h-[320px] lg:h-[480px]">
            {/* Soft vignette overlay blending smoothly into #070707 backdrop */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#070707] via-transparent to-[#070707] z-10 pointer-events-none"></div>
            <div className="absolute inset-0 bg-gradient-to-r from-[#070707] via-transparent to-[#070707] z-10 pointer-events-none"></div>
            <img
              alt="Gentleman visual background"
              className="w-full h-full object-cover object-center filter contrast-[1.08] brightness-[0.92]"
              src={heroImgSrc}
              onError={() => setHeroImgSrc(bgImage)}
            />
          </div>
        </div>

        {/* =========================================================
            ELEGANT UNIFIED DIVIDER (SMOOTH FLOWING LINE)
        ========================================================= */}
        <div className="relative flex items-center justify-center w-full py-1">
          <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-[#cba864]/25 to-transparent"></div>
          <div className="absolute w-1.5 h-1.5 rotate-45 border border-[#cba864]/50 bg-[#070707]"></div>
        </div>

        {/* =========================================================
            PART 2: INTEGRATED ABOUT & GODFATHER QUOTE SECTION (TEXT LEFT, IMAGE RIGHT / SIDE-BY-SIDE ON MOBILE)
        ========================================================= */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 lg:gap-12 items-center" id="about">
          
          {/* Mobile Side-by-side Top Row: Text Left, Car Image Right on Mobile */}
          <div className="col-span-1 md:col-span-8 grid grid-cols-12 gap-3 sm:gap-6 items-center">
            
            {/* About Narrative (Text on Left) */}
            <div className="col-span-7 md:col-span-6 flex flex-col justify-center text-left" data-purpose="about-narrative">
              <span className="text-[9px] sm:text-[11px] font-medium tracking-[0.22em] sm:tracking-[0.28em] uppercase text-[#a99775] block mb-2 sm:mb-3 font-sans">
                01. ABOUT ME
              </span>
              <h2 className="font-serif text-xs sm:text-base lg:text-[1.35rem] leading-[1.3] text-[#ded3bf] uppercase font-normal tracking-wide">
                DESIGN IS NOT JUST<br />WHAT IT LOOKS LIKE.<br />IT’S HOW IT WORKS.
              </h2>
              <p className="mt-2 sm:mt-3 text-[9px] sm:text-xs leading-relaxed text-[#867d71] font-normal font-sans">
                I'm a digital designer & developer who believes in craftsmanship, clarity, and creating work that lasts.
              </p>
              <div className="mt-3 sm:mt-6">
                <a
                  className="inline-flex items-center text-[8.5px] sm:text-[11px] tracking-[0.2em] sm:tracking-[0.26em] uppercase text-[#cfb682] hover:text-[#fff] transition-all group pb-1 border-b border-[#5e4d2d] hover:border-[#cfb682]"
                  href="#work"
                >
                  <span className="font-medium">MORE ABOUT ME</span>
                  <span className="ml-1.5 sm:ml-2.5 transition-transform duration-300 group-hover:translate-x-1 font-normal">→</span>
                </a>
              </div>
            </div>

            {/* Vintage Car Image (Right, Smooth borderless blending) */}
            <div className="col-span-5 md:col-span-6 flex justify-center" data-purpose="vintage-photo-container">
              <div className="relative overflow-hidden w-full h-[150px] sm:h-[240px] lg:h-[300px]">
                <img
                  alt="Vintage classic automobile"
                  className="w-full h-full object-cover filter sepia-[0.35] contrast-[1.1] brightness-[0.88]"
                  src={carImgSrc}
                  onError={() => setCarImgSrc(vintageCarLocal)}
                />
                {/* Smooth borderless edge vignette overlays */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#070707] via-transparent to-[#070707] pointer-events-none"></div>
                <div className="absolute inset-0 bg-gradient-to-r from-[#070707] via-transparent to-[#070707] pointer-events-none"></div>
              </div>
            </div>

          </div>

          {/* Godfather Quote & Heraldic Crest Ornament */}
          <div className="col-span-1 md:col-span-4 flex flex-col justify-between h-full pt-4 md:pt-0 border-t md:border-t-0 border-[#1a1712]/60 md:pl-6 lg:pl-10" data-purpose="quote-and-flourish">
            <div className="relative">
              <div aria-hidden="true" className="text-[#846b40] font-quote text-3xl sm:text-5xl lg:text-6xl leading-none select-none -mb-1 opacity-80">
                “
              </div>
              <blockquote className="space-y-2 sm:space-y-4">
                <p className="font-quote italic text-xs sm:text-base lg:text-[1.35rem] text-[#ccbeaa] leading-[1.38] font-normal">
                  Great men are not born great,<br className="hidden sm:inline" />they grow great.
                </p>
                <cite className="block not-italic text-[9px] sm:text-[11px] tracking-[0.2em] uppercase text-[#7a6f5e] font-sans font-light">
                  — The Godfather
                </cite>
              </blockquote>
            </div>
            {/* Bottom Flourish Ornament */}
            <div className="mt-4 sm:mt-8 flex justify-start md:justify-center items-center opacity-75 hover:opacity-100 transition-opacity duration-300" data-purpose="ornamental-flourish">
              <img
                alt="Decorative classic golden crest flourish"
                className="w-24 sm:w-36 lg:w-44 h-auto object-contain filter drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)]"
                src={FLOURISH_CREST_IMG}
              />
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};