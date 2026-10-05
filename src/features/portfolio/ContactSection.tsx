import React, { useEffect, useRef, useState } from 'react';
import resumePDF from '../../assets/Tushar_Ranjan_Sahoo.pdf';
import bgImage from '../../assets/contact_bg.jpg';

/* ── Social icons ──────────────────────────────────────────────── */
const GithubIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-[14px] h-[14px]">
    <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
  </svg>
);
const LinkedInIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-[14px] h-[14px]">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
  </svg>
);
const TwitterIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-[14px] h-[14px]">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.73-8.835L1.254 2.25H8.08l4.253 5.622zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);

/* ── Floating-label input ──────────────────────────────────────── */
const FloatInput: React.FC<{
  id: string; name: string; label: string; type?: string;
  value: string; onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}> = ({ id, name, label, type = 'text', value, onChange }) => (
  <div className="relative group">
    <input
      id={id} name={name} type={type} required
      value={value} onChange={onChange} placeholder=" "
      className="peer w-full bg-transparent border-0 border-b border-[#dfb76c]/20 text-stone-200 text-sm font-sans pt-5 pb-2 outline-none focus:border-[#dfb76c]/60 transition-colors duration-300 placeholder-transparent"
    />
    <label
      htmlFor={id}
      className="absolute left-0 top-1.5 text-[10px] font-serif tracking-[0.25em] uppercase text-[#dfb76c]/50 peer-focus:text-[#dfb76c]/80 peer-[:not(:placeholder-shown)]:text-[#dfb76c]/60 transition-colors duration-300 pointer-events-none"
    >
      {label}
    </label>
    <span className="absolute bottom-0 left-0 w-0 h-px bg-gradient-to-r from-[#dfb76c] to-[#edd89f] group-focus-within:w-full transition-all duration-500" />
  </div>
);

/* ── Floating-label textarea ───────────────────────────────────── */
const FloatTextarea: React.FC<{
  id: string; name: string; label: string; rows?: number;
  value: string; onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
}> = ({ id, name, label, rows = 4, value, onChange }) => (
  <div className="relative group">
    <textarea
      id={id} name={name} required rows={rows}
      value={value} onChange={onChange} placeholder=" "
      className="peer w-full bg-transparent border-0 border-b border-[#dfb76c]/20 text-stone-200 text-sm font-sans pt-5 pb-2 outline-none focus:border-[#dfb76c]/60 transition-colors duration-300 placeholder-transparent resize-none"
    />
    <label
      htmlFor={id}
      className="absolute left-0 top-1.5 text-[10px] font-serif tracking-[0.25em] uppercase text-[#dfb76c]/50 peer-focus:text-[#dfb76c]/80 peer-[:not(:placeholder-shown)]:text-[#dfb76c]/60 transition-colors duration-300 pointer-events-none"
    >
      {label}
    </label>
    <span className="absolute bottom-0 left-0 w-0 h-px bg-gradient-to-r from-[#dfb76c] to-[#edd89f] group-focus-within:w-full transition-all duration-500" />
  </div>
);

/* ────────────────────────────────────────────────────────────────── */
export const ContactSection: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [sent, setSent] = useState(false);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const items = el.querySelectorAll<HTMLElement>('.ci');
    const obs = new IntersectionObserver(
      (entries) => entries.forEach((e) => {
        if (e.isIntersecting) {
          const t = e.target as HTMLElement;
          setTimeout(() => t.classList.add('scroll-visible'), Number(t.dataset.delay ?? 0));
          obs.unobserve(t);
        }
      }),
      { threshold: 0.08 }
    );
    items.forEach((i) => obs.observe(i));
    return () => obs.disconnect();
  }, []);

  const change = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm((p) => ({ ...p, [e.target.name]: e.target.value }));

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
    setTimeout(() => setSent(false), 4500);
    setForm({ name: '', email: '', subject: '', message: '' });
  };

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="relative w-full overflow-hidden"
      style={{ minHeight: '100svh' }}
      data-purpose="contact-section"
    >
      {/* ── Background ─────────────────────────────────────────── */}
      <div className="absolute inset-0 z-0">
        <img src={bgImage} alt="" aria-hidden className="w-full h-full object-cover object-center" />
        {/* Warm dark overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#070605]/85 via-[#0a0806]/80 to-[#070605]/90" />
        {/* Gold radial halo at top */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_40%_at_50%_0%,rgba(197,160,89,0.11)_0%,transparent_70%)]" />
      </div>

      {/* ── Layout: two panels side-by-side on desktop ────────── */}
      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-8 lg:px-12 py-16 sm:py-24 flex flex-col lg:flex-row gap-0 lg:gap-16 xl:gap-24">

        {/* ══ LEFT PANEL — Resume ════════════════════════════════ */}
        <div className="w-full lg:w-[52%] flex flex-col gap-6 ci scroll-hidden" data-delay="0">

          {/* Label */}
          <div className="flex items-center gap-3">
            <span className="w-1 h-1 rotate-45 bg-[#dfb76c]/70 shadow-[0_0_5px_#dfb76c]" />
            <span className="font-serif text-[10px] tracking-[0.32em] uppercase text-[#edd89f]/70">
              ARCHIVAL DOSSIER
            </span>
            <span className="flex-1 h-px bg-gradient-to-r from-[#dfb76c]/30 to-transparent" />
          </div>

          {/* Resume title + download */}
          <div className="flex items-end justify-between">
            <div>
              <h2 className="font-serif text-2xl sm:text-3xl font-bold tracking-[0.22em] uppercase text-gold-leaf leading-none">
                Curriculum Vitae
              </h2>
              <p className="font-serif italic text-sm text-[#fae3ad]/60 tracking-wider mt-1">
                Tushar Ranjan Sahoo
              </p>
            </div>
            <a
              href={resumePDF}
              download="Tushar_Ranjan_Sahoo_Resume.pdf"
              className="group flex items-center gap-2 text-[10px] font-serif tracking-[0.2em] uppercase text-[#dfb76c] hover:text-[#fae3ad] transition-colors duration-300"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-3.5 h-3.5 group-hover:translate-y-0.5 transition-transform duration-300">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M7 10l5 5 5-5M12 15V3" />
              </svg>
              Download PDF
            </a>
          </div>

          {/* Thin gold rule */}
          <div className="h-px w-full bg-gradient-to-r from-[#dfb76c]/40 via-[#dfb76c]/15 to-transparent" />

          {/* PDF iframe — the star of the left column */}
          <div
            className="relative rounded-sm overflow-hidden"
            style={{
              height: 'clamp(440px, 64vh, 680px)',
              boxShadow: '0 20px 60px rgba(0,0,0,0.6), 0 0 0 1px rgba(223,183,108,0.12)',
            }}
          >
            {/* Subtle gold corner accents */}
            <span className="absolute top-0 left-0 w-6 h-6 border-t border-l border-[#dfb76c]/40 z-10 pointer-events-none" />
            <span className="absolute top-0 right-0 w-6 h-6 border-t border-r border-[#dfb76c]/40 z-10 pointer-events-none" />
            <span className="absolute bottom-0 left-0 w-6 h-6 border-b border-l border-[#dfb76c]/40 z-10 pointer-events-none" />
            <span className="absolute bottom-0 right-0 w-6 h-6 border-b border-r border-[#dfb76c]/40 z-10 pointer-events-none" />

            <iframe
              src={`${resumePDF}#view=FitH&toolbar=0&navpanes=0&scrollbar=0`}
              title="Tushar Ranjan Sahoo — Curriculum Vitae"
              className="w-full h-full border-0 bg-[#0d0c0a]"
              aria-label="Resume PDF Viewer"
            />
            {/* Fade bottom edge into background */}
            <div className="absolute bottom-0 inset-x-0 h-12 bg-gradient-to-t from-[#080705] to-transparent pointer-events-none" />
          </div>

          {/* Open in new tab */}
          <a
            href={resumePDF}
            target="_blank"
            rel="noopener noreferrer"
            className="self-start font-serif text-[10px] tracking-[0.2em] uppercase text-stone-500 hover:text-[#dfb76c]/70 transition-colors duration-300"
          >
            Open full document ↗
          </a>
        </div>

        {/* ══ RIGHT PANEL — Form + Details ══════════════════════ */}
        <div className="w-full lg:w-[48%] flex flex-col justify-between gap-10 lg:gap-0 mt-10 lg:mt-0">

          {/* Top: heading + form */}
          <div className="ci scroll-hidden" data-delay="120">

            {/* Section heading */}
            <div className="mb-8">
              <div className="flex items-center gap-3 mb-3">
                <span className="w-1 h-1 rotate-45 bg-[#dfb76c]/70 shadow-[0_0_5px_#dfb76c]" />
                <span className="font-serif text-[10px] tracking-[0.32em] uppercase text-[#edd89f]/70">
                  OPEN TO DIALOGUE
                </span>
              </div>
              <h2 className="font-serif text-3xl sm:text-4xl font-bold tracking-[0.18em] uppercase text-gold-leaf leading-none mb-2">
                CONTACT
              </h2>
              <p className="font-serif italic text-base text-[#fae3ad]/60 tracking-wider">
                Let's Build Something Great Together
              </p>
            </div>

            {/* Success notice */}
            {sent && (
              <div className="mb-6 flex items-center gap-3 py-2 border-b border-[#dfb76c]/25">
                <span className="w-1 h-1 rotate-45 bg-[#dfb76c]" />
                <span className="font-serif text-[11px] tracking-[0.2em] uppercase text-[#dfb76c]">
                  Message received — I shall respond forthwith.
                </span>
              </div>
            )}

            {/* Form */}
            <form onSubmit={submit} className="space-y-6" noValidate>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <FloatInput id="c-name"    name="name"    label="Your Name"  value={form.name}    onChange={change} />
                <FloatInput id="c-email"   name="email"   label="Email"      type="email" value={form.email}   onChange={change} />
              </div>
              <FloatInput   id="c-subject" name="subject" label="Subject"    value={form.subject} onChange={change} />
              <FloatTextarea id="c-msg"    name="message" label="Your Message" rows={5} value={form.message} onChange={change} />

              {/* Submit */}
              <button
                type="submit"
                id="contact-submit-btn"
                className="group mt-2 flex items-center gap-4 text-[11px] font-serif tracking-[0.3em] uppercase text-[#dfb76c] hover:text-[#fae3ad] transition-colors duration-300"
              >
                <span className="relative">
                  TRANSMIT DISPATCH
                  <span className="absolute -bottom-1 left-0 w-0 h-px bg-[#dfb76c] group-hover:w-full transition-all duration-500" />
                </span>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"
                  className="w-4 h-4 group-hover:translate-x-1.5 transition-transform duration-300">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </button>
            </form>
          </div>

          {/* Thin divider */}
          <div className="h-px w-full bg-gradient-to-r from-[#dfb76c]/20 via-[#dfb76c]/8 to-transparent ci scroll-hidden" data-delay="200" />

          {/* Bottom: contact details + socials */}
          <div className="ci scroll-hidden flex flex-col sm:flex-row lg:flex-col xl:flex-row gap-8 sm:gap-6" data-delay="260">

            {/* Contact details */}
            <div className="flex-1 space-y-4">
              {[
                { label: 'Email', value: 'tusharranjansahoo07@gmail.com', href: 'mailto:tusharranjansahoo07@gmail.com' },
                { label: 'Phone', value: '+91 7439 602 141', href: 'tel:+917439602141' },
                { label: 'Location', value: 'Bhubaneswar, Odisha — India', href: '#' },
              ].map((d) => (
                <div key={d.label}>
                  <span className="block font-serif text-[8px] tracking-[0.28em] uppercase text-[#edd89f]/45 mb-0.5">{d.label}</span>
                  <a href={d.href} className="text-xs text-stone-400 hover:text-[#dfb76c]/90 transition-colors duration-300 font-sans">{d.value}</a>
                </div>
              ))}
            </div>

            {/* Socials */}
            <div className="flex flex-col justify-end gap-3">
              <span className="font-serif text-[8px] tracking-[0.28em] uppercase text-[#edd89f]/45">Find Me</span>
              <div className="flex items-center gap-3">
                {[
                  { icon: <GithubIcon />, href: 'https://github.com/Tushar-Ranjan-Sahoo', label: 'GitHub' },
                  { icon: <LinkedInIcon />, href: 'https://linkedin.com/in/tushar-ranjan-sahoo', label: 'LinkedIn' },
                  { icon: <TwitterIcon />, href: 'https://twitter.com/', label: 'Twitter' },
                ].map((s) => (
                  <a
                    key={s.label}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={s.label}
                    className="w-8 h-8 border border-[#dfb76c]/20 flex items-center justify-center text-[#dfb76c]/60 hover:text-[#dfb76c] hover:border-[#dfb76c]/50 hover:shadow-[0_0_10px_-3px_rgba(223,183,108,0.35)] transition-all duration-300"
                  >
                    {s.icon}
                  </a>
                ))}
              </div>

              {/* Copyright */}
              <p className="font-serif text-[9px] tracking-[0.22em] uppercase text-stone-600 mt-2">
                © 2024 Tushar Ranjan Sahoo
              </p>
            </div>
          </div>

        </div>
      </div>

      {/* Bottom gold hairline */}
      <div className="relative z-10 h-px w-full bg-gradient-to-r from-transparent via-[#dfb76c]/20 to-transparent" />
    </section>
  );
};
