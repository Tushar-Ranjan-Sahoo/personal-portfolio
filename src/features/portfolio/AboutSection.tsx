import React, { useState } from 'react';
import vintageCarLocal from '../../assets/vintagecar.png';

const MANSION_CAR_IMG = vintageCarLocal;

const FLOURISH_CREST_IMG = "https://lh3.googleusercontent.com/aida-public/AB6AXuBRDgG8iGlvMWu6Tw4bpvIgUSLhkHOcVv2fjpg88y4a49ykeahZgf0jKJyX0rKJ25y64w7ronAmvtr98aisLzLfzgyH3HIK08fNwjDjmB_ipbb_6p5tM1FTuU2GCdnVCmsaRKqSUngHoXY-KqWFnoxzdDM92_W2a40C0aEoOyewnx__amLc3sut0lLvzbw_XcHEq9SIkvUgb_nY5g85yc8JVABACSnHv3VPsON2W40Vwk01_p-96H75Wm_qrkptiv2s7w";

export const AboutSection: React.FC = () => {
  const [carImgSrc, setCarImgSrc] = useState(MANSION_CAR_IMG);

  return (
    <section className="flex-1 bg-[#070707] border-t border-[#1f1e1a]" data-purpose="about-and-quote" id="about">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-10 lg:gap-14 px-6 sm:px-10 lg:px-12 py-16 lg:py-24 items-center">
        {/* Left Column: Mansion & Vintage Car Image */}
        <div className="md:col-span-4 flex justify-center lg:justify-start" data-purpose="vintage-photo-container">
          <div className="relative p-1.5 bg-[#14120e] border border-[#262118] shadow-2xl max-w-[320px] transition-transform duration-500 hover:scale-[1.02]">
            {/* Border inner frame detail */}
            <div className="relative overflow-hidden border border-[#382f20]/60">
              <img
                alt="Vintage classic automobile parked outside historic grand neoclassical mansion estate"
                className="w-full h-auto object-cover filter sepia-[0.35] contrast-[1.1] brightness-[0.88] grayscale-[0.2]"
                src={carImgSrc}
                onError={() => setCarImgSrc(vintageCarLocal)}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20 pointer-events-none"></div>
            </div>
          </div>
        </div>

        {/* Center Column: About Me Bio & Statement */}
        <div className="md:col-span-4 flex flex-col justify-center text-left" data-purpose="about-narrative">
          {/* Small Tag */}
          <span className="text-[11px] font-medium tracking-[0.28em] uppercase text-[#a99775] block mb-4 font-sans">
            01. ABOUT ME
          </span>
          {/* Design Philosophy Headline */}
          <h2 className="font-serif text-lg sm:text-xl lg:text-[1.35rem] leading-[1.35] text-[#ded3bf] uppercase font-normal tracking-wide">
            DESIGN IS NOT JUST<br />WHAT IT LOOKS LIKE.<br />IT’S HOW IT WORKS.
          </h2>
          {/* Descriptive Bio Text */}
          <p className="mt-4 text-[11px] sm:text-xs leading-relaxed text-[#867d71] font-normal font-sans">
            I'm a digital designer & developer who believes in craftsmanship, clarity, and creating work that lasts. Every project is an opportunity to build something meaningful and make an impact.
          </p>
          {/* Link to Details */}
          <div className="mt-8">
            <a
              className="inline-flex items-center text-[11px] tracking-[0.26em] uppercase text-[#cfb682] hover:text-[#fff] transition-all group pb-1.5 border-b border-[#5e4d2d] hover:border-[#cfb682]"
              href="#about"
            >
              <span className="font-medium">MORE ABOUT ME</span>
              <span className="ml-2.5 transition-transform duration-300 group-hover:translate-x-1 font-normal">→</span>
            </a>
          </div>
        </div>

        {/* Right Column: Godfather Quote & Heraldic Crest Ornament */}
        <div className="md:col-span-4 flex flex-col justify-between h-full pt-8 md:pt-0 border-t md:border-t-0 border-[#1a1712] md:pl-8 lg:pl-12" data-purpose="quote-and-flourish">
          <div className="relative">
            {/* Large Stylized Golden Quotation Mark */}
            <div aria-hidden="true" className="text-[#846b40] font-quote text-5xl lg:text-6xl leading-none select-none -mb-2 opacity-80">
              “
            </div>
            {/* Quote Block */}
            <blockquote className="space-y-4">
              <p className="font-quote italic text-lg sm:text-xl lg:text-[1.4rem] text-[#ccbeaa] leading-[1.38] font-normal">
                Great men are not born great,<br />they grow great.
              </p>
              <cite className="block not-italic text-[10px] sm:text-[11px] tracking-[0.22em] uppercase text-[#7a6f5e] font-sans font-light">
                — The Godfather
              </cite>
            </blockquote>
          </div>
          {/* Bottom Flourish Ornament */}
          <div className="mt-12 flex justify-start md:justify-center items-center opacity-75 hover:opacity-100 transition-opacity duration-300" data-purpose="ornamental-flourish">
            <img
              alt="Decorative classic golden crest flourish"
              className="w-36 lg:w-44 h-auto object-contain filter drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)]"
              src={FLOURISH_CREST_IMG}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

