import React, { useEffect, useRef } from 'react';

const FLOURISH_IMG =
  'https://lh3.googleusercontent.com/aida-public/AB6AXuCUPq5dcLpZvum1KZVsEKYiOW-PJ4yF0DtP_IRheZnysMk3-eKG0WHt4cso2GPdBk3R596oJwehKmZJwU3d-py_t9YTnP1oorof3Px2fCvA2GaypAM8jd97y9im13Acvi0FltDfPv9ju0gzzsXb7Ki_c_-1wOWGAdzruITzUmg36tdkEwl659u7pT-K9pnTo_fXlwP5j37gUlASawtHHqT7KlXSeH30-no3m5_pCB55CKS9S6_1ALQ51uwH9VC94j5xPg';

const ANCHOR_IMG =
  'https://lh3.googleusercontent.com/aida-public/AB6AXuCdjQm309CQwP-7eV9S76pijtCGElxxkgs86ppzFeP85r-anfclImYekiKV4cQqFGws6Xo0Fx-xclLulN0OE15FyU9dwqiOstxztlEske8HQ-2VvAnAwiVyp7MiuZYQ8ZVcofUd_3-XH5EdiqhDi1bkQK0dT-l3isuEGyGXrc8WUKHMIgIYNatXlKwpYWG6DdEkS1xECuSJHSFMQvQgQXq0pLK7t193M71NC-uwpvocmuPElYvlCdqmFtd7Zl3p6BTDAA';

interface ExperienceEntry {
  archiveNo: string;
  dateShort: string;
  dateLong: string;
  role: string;
  company: string;
  division: string;
  description: string;
  tags: string[];
  badge: React.ReactNode;
}

const experiences: ExperienceEntry[] = [
  {
    archiveNo: 'ARCHIVE 01',
    dateShort: 'SEP MMXXIV – PRESENT',
    dateLong: 'September 2024 — Present',
    role: 'Associate Software Engineer',
    company: 'Tech Mahindra',
    division: 'Enterprise Engineering',
    description:
      'Architecting enterprise software solutions utilizing Java, Spring Framework, RESTful APIs, and cloud microservices. Actively driving modular application development, production deployments, and continuous system resilience.',
    tags: ['JAVA', 'SPRING FRAMEWORK', 'MICROSERVICES'],
    badge: (
      <div className="px-4 py-3 rounded-sm text-left md:text-right w-full md:w-auto">
        <span className="font-sans font-black tracking-tight text-xl sm:text-2xl text-stone-100 block leading-none">
          Tech
        </span>
        <span className="font-sans font-bold tracking-tight text-lg sm:text-xl text-[#dfb76c] block leading-tight mt-0.5">
          Mahindra
        </span>
        <span className="font-serif text-[8px] tracking-[0.25em] text-[#c5a059]/70 uppercase block mt-1 border-t border-[#c5a059]/20 pt-1">
          ENTERPRISE LABS
        </span>
      </div>
    ),
  },
  {
    archiveNo: 'ARCHIVE 02',
    dateShort: 'JUN MMXXIV – SEP MMXXIV',
    dateLong: 'June 2024 — September 2024',
    role: 'Test Engineer',
    company: 'Pinnacle Consulting LLC',
    division: 'Quality Assurance',
    description:
      'Orchestrated end-to-end software verification cycles, comprehensive test case formulation, defect lifecycle tracking, and rigorous quality governance across client release pipelines.',
    tags: ['QA GOVERNANCE', 'DEFECT AUDITING', 'REGRESSION'],
    badge: (
      <div className="px-4 py-3 rounded-sm flex items-center space-x-3 w-full md:w-auto">
        <svg
          className="w-6 h-6 text-[#dfb76c] flex-shrink-0"
          fill="none"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.75"
          viewBox="0 0 24 24"
        >
          <path d="M4 20L12 4L20 20" />
          <path d="M8 14h8" />
        </svg>
        <div className="leading-none text-left">
          <span className="font-serif font-bold text-sm tracking-widest block text-stone-100">
            PINNACLE
          </span>
          <span className="text-[8px] font-serif tracking-[0.22em] text-[#dfb76c]/80 uppercase block mt-0.5">
            Consulting LLC
          </span>
        </div>
      </div>
    ),
  },
  {
    archiveNo: 'ARCHIVE 03',
    dateShort: 'MAY MMXXIV – MAY MMXXIV',
    dateLong: 'May 2024',
    role: 'Software Development Engineer',
    company: 'QuotUS',
    division: 'Blockchain Practice',
    description:
      'Engineered decentralized ledger solutions and bespoke smart contracts. Spearheaded backend protocol integrations and automated distributed workflow architectures.',
    tags: ['SMART CONTRACTS', 'SOLIDITY / WEB3', 'BACKEND AUTOMATION'],
    badge: (
      <div className="px-4 py-3 rounded-sm text-center md:text-right w-full md:w-auto">
        <span className="font-serif font-bold tracking-[0.3em] text-base sm:text-lg text-[#fae3ad] block uppercase">
          QUOTUS
        </span>
        <span className="text-[8px] font-sans tracking-[0.25em] text-stone-400 uppercase block mt-0.5">
          SYSTEMS
        </span>
        <span className="font-serif text-[8px] tracking-[0.2em] text-[#c5a059]/70 uppercase block mt-1 border-t border-[#c5a059]/20 pt-1">
          DECENTRALIZED LABS
        </span>
      </div>
    ),
  },
  {
    archiveNo: 'ARCHIVE 04',
    dateShort: 'JUN MMXXII – AUG MMXXII',
    dateLong: 'June 2022 — August 2022',
    role: 'Web Development Intern',
    company: 'Cisco thingQbator',
    division: 'Innovation Incubator',
    description:
      'Engineered responsive client interfaces with React and integrated Web3 decentralized cryptographic capabilities via MetaMask authentication pipelines.',
    tags: ['REACT.JS', 'METAMASK / ETHEREUM', 'FRONTEND UI'],
    badge: (
      <div className="px-4 py-3 rounded-sm flex flex-col items-start md:items-end text-stone-300 w-full md:w-auto">
        <div className="flex items-end space-x-1 mb-1.5 h-4">
          <div className="w-0.5 h-1.5 bg-[#dfb76c]/90 rounded-sm" />
          <div className="w-0.5 h-3   bg-[#dfb76c]/90 rounded-sm" />
          <div className="w-0.5 h-4   bg-[#fae3ad]   rounded-sm" />
          <div className="w-0.5 h-3   bg-[#dfb76c]/90 rounded-sm" />
          <div className="w-0.5 h-1.5 bg-[#dfb76c]/90 rounded-sm" />
        </div>
        <span className="font-serif font-bold tracking-[0.24em] text-xs uppercase leading-none text-stone-100">
          CISCO
        </span>
        <span className="font-quote italic text-xs tracking-wider text-[#dfb76c] mt-0.5">
          thingQbator
        </span>
      </div>
    ),
  },
];

/* ── Signet seal timeline node ─────────────────────────────────── */
const SealNode: React.FC = () => (
  <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full border border-[#dfb76c]/80 bg-[#0a0908] flex items-center justify-center timeline-seal group-hover:scale-110 transition-transform duration-300">
    <span className="w-3.5 h-3.5 rounded-full bg-gradient-to-br from-[#fae3ad] via-[#dfb76c] to-[#7d6124] shadow-inner flex items-center justify-center">
      <span className="w-1 h-1 rotate-45 bg-[#0a0908]" />
    </span>
  </div>
);

/* ── Gilded corner filigree ────────────────────────────────────── */
const CornerAccents: React.FC = () => (
  <>
    <div className="absolute top-0 right-0 w-8 h-8 pointer-events-none border-t border-r border-[#dfb76c]/50" />
    <div className="absolute top-1 right-1 w-6 h-6 pointer-events-none border-t border-r border-[#c5a059]/20" />
    <div className="absolute bottom-0 left-0 w-8 h-8 pointer-events-none border-b border-l border-[#dfb76c]/50" />
    <div className="absolute bottom-1 left-1 w-6 h-6 pointer-events-none border-b border-l border-[#c5a059]/20" />
  </>
);

/* ── Main section component ────────────────────────────────────── */
export const ExperienceSection: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const targets = section.querySelectorAll<HTMLElement>('.reveal-item');
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // stagger each revealed element slightly
            const el = entry.target as HTMLElement;
            const delay = el.dataset.delay ?? '0';
            setTimeout(() => el.classList.add('scroll-visible'), Number(delay));
            observer.unobserve(el);
          }
        });
      },
      { threshold: 0.12 }
    );

    targets.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="experience"
      className="relative w-full bg-[#070605] overflow-hidden"
      data-purpose="experience-section"
      ref={sectionRef}
    >
      {/* Ambient radial glow */}
      <div aria-hidden className="absolute inset-0 ambient-vignette pointer-events-none" />

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-20">

        {/* ── Section header ─────────────────────────────────────── */}
        <div
          className="text-center mb-14 sm:mb-20 flex flex-col items-center reveal-item scroll-hidden"
          data-delay="0"
          data-purpose="section-header"
        >
          {/* Ornate eyebrow */}
          <div className="flex items-center justify-center space-x-3 sm:space-x-4 mb-3.5">
            <span className="w-8 sm:w-20 h-[1px] bg-gradient-to-r from-transparent via-[#dfb76c] to-[#edd89f]" />
            <span className="w-1.5 h-1.5 rotate-45 border border-[#dfb76c]/80 bg-[#070605] shadow-[0_0_6px_#dfb76c]" />
            <span className="font-serif text-[10px] sm:text-xs tracking-[0.35em] uppercase text-[#edd89f]/90 font-semibold">
              CURATED ARCHIVE · VOL. I
            </span>
            <span className="w-1.5 h-1.5 rotate-45 border border-[#dfb76c]/80 bg-[#070605] shadow-[0_0_6px_#dfb76c]" />
            <span className="w-8 sm:w-20 h-[1px] bg-gradient-to-l from-transparent via-[#dfb76c] to-[#edd89f]" />
          </div>

          {/* Title */}
          <h2 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-bold tracking-[0.32em] uppercase text-gold-leaf mb-3">
            EXPERIENCE
          </h2>

          {/* Subtitle */}
          <p className="font-quote italic text-lg sm:text-2xl text-[#fae3ad]/90 tracking-[0.2em] font-normal">
            Curated Career Archive — MMXVIII to Present
          </p>

          {/* Flourish ornament */}
          <div className="mt-4 flex items-center justify-center">
            <img
              alt="Ornate Gilded Filigree Flourish"
              className="h-10 sm:h-14 w-auto object-contain opacity-90 filter drop-shadow-[0_2px_12px_rgba(212,175,55,0.4)] pointer-events-none"
              src={FLOURISH_IMG}
            />
          </div>
        </div>

        {/* ── Timeline ───────────────────────────────────────────── */}
        <div className="relative pl-7 sm:pl-10 md:pl-14" data-purpose="experience-timeline">

          {/* Vertical antique spine */}
          <div
            aria-hidden
            className="absolute left-[13px] sm:left-[19px] md:left-[27px] top-6 bottom-10 w-[1px] bg-gradient-to-b from-[#dfb76c]/50 via-[#c5a059]/30 to-transparent"
          />

          <div className="space-y-6 sm:space-y-8">
            {experiences.map((exp, i) => (
              <article
                key={exp.archiveNo}
                className="relative transition-all duration-300 group reveal-item scroll-hidden"
                data-delay={String(i * 120)}
                data-purpose="experience-item"
              >
                {/* Seal node */}
                <div className="absolute -left-[27px] sm:-left-[33px] md:-left-[41px] top-6 sm:top-8 flex items-center justify-center z-10">
                  <SealNode />
                </div>

                {/* Archive card */}
                <div className="archive-card rounded-sm p-5 sm:p-8 relative overflow-hidden transition-all duration-300">
                  <CornerAccents />

                  <div className="grid grid-cols-1 md:grid-cols-12 gap-5 sm:gap-7 items-start">

                    {/* Date column */}
                    <div className="md:col-span-3 pt-0.5 space-y-1.5">
                      <div className="inline-flex items-center px-2 py-0.5 rounded-sm bg-[#070605] border border-[#c5a059]/20 text-[9px] font-serif tracking-[0.25em] text-[#edd89f]/80 uppercase">
                        {exp.archiveNo}
                      </div>
                      <div>
                        <span className="font-serif text-xs tracking-[0.22em] text-[#dfb76c] font-bold block uppercase">
                          {exp.dateShort}
                        </span>
                        <span className="font-quote italic text-stone-400 text-xs sm:text-sm tracking-wider block mt-0.5">
                          {exp.dateLong}
                        </span>
                      </div>
                    </div>

                    {/* Role & description column */}
                    <div className="md:col-span-6 space-y-2.5 pr-2">
                      <div>
                        <h3 className="font-quote text-2xl sm:text-[26px] font-bold tracking-wide text-stone-100 group-hover:text-[#fae3ad] transition-colors duration-200 leading-tight">
                          {exp.role}
                        </h3>
                        <p className="font-serif text-xs tracking-[0.2em] text-[#dfb76c]/90 font-medium uppercase mt-1">
                          {exp.company} · {exp.division}
                        </p>
                      </div>
                      <p className="text-xs sm:text-sm text-stone-300/90 leading-relaxed font-normal font-sans pt-0.5">
                        {exp.description}
                      </p>
                      <div className="pt-2 flex flex-wrap gap-2 text-[10px] font-serif tracking-[0.16em] text-[#dfb76c]/70">
                        {exp.tags.map((tag) => (
                          <span
                            key={tag}
                            className="px-2 py-0.5 bg-[#070605]/80 border border-[#c5a059]/15 rounded-sm"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Company badge column */}
                    <div className="md:col-span-3 flex md:justify-end items-center pt-2 md:pt-1">
                      {exp.badge}
                    </div>

                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>

        {/* ── Bottom anchor embellishment ────────────────────────── */}
        <div
          className="mt-14 sm:mt-20 flex flex-col items-center justify-center reveal-item scroll-hidden"
          data-delay="500"
        >
          <div className="flex items-center space-x-4 mb-3 w-full max-w-xs">
            <span className="flex-1 h-[1px] bg-gradient-to-r from-transparent to-[#c5a059]/40" />
            <span className="w-1.5 h-1.5 rotate-45 bg-[#dfb76c]/70" />
            <span className="flex-1 h-[1px] bg-gradient-to-l from-transparent to-[#c5a059]/40" />
          </div>
          <img
            alt="Gold Filigree Anchor Emblem"
            className="h-12 sm:h-16 w-auto object-contain opacity-75 filter drop-shadow-[0_2px_10px_rgba(212,175,55,0.25)]"
            src={ANCHOR_IMG}
          />
        </div>

      </div>
    </section>
  );
};

