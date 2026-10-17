import React, { useEffect, useRef, useState, useCallback, useMemo } from 'react';
import godfatherTheme from '../../assets/music/TheGodfatherTheme.mp3';

/* =========================================================
   LAYER 1 — HORIZONTAL SCROLLING NOTES
   Classic right-to-left musical score flow
   ========================================================= */

interface NoteConfig {
  symbol: string;
  top: string;
  size: string;
  opacity: number;
  delay: string;
  duration: string;
  className: string;  // animation variant class
}

const SCROLLING_NOTES: NoteConfig[] = [
  { symbol: '♪', top: '5%',   size: '1.4rem',  opacity: 0.22, delay: '0s',    duration: '24s',  className: 'godfather-note' },
  { symbol: '𝄞', top: '14%',  size: '2.2rem',  opacity: 0.16, delay: '4s',    duration: '32s',  className: 'godfather-note' },
  { symbol: '♫', top: '22%',  size: '1.1rem',  opacity: 0.28, delay: '8s',    duration: '20s',  className: 'godfather-note' },
  { symbol: '♬', top: '31%',  size: '1.6rem',  opacity: 0.14, delay: '12s',   duration: '28s',  className: 'godfather-note' },
  { symbol: '♩', top: '40%',  size: '1.2rem',  opacity: 0.24, delay: '2s',    duration: '22s',  className: 'godfather-note' },
  { symbol: '♪', top: '48%',  size: '0.95rem', opacity: 0.18, delay: '16s',   duration: '30s',  className: 'godfather-note' },
  { symbol: '𝄞', top: '56%',  size: '1.9rem',  opacity: 0.12, delay: '6s',    duration: '36s',  className: 'godfather-note' },
  { symbol: '♫', top: '64%',  size: '1.0rem',  opacity: 0.26, delay: '10s',   duration: '18s',  className: 'godfather-note' },
  { symbol: '♬', top: '72%',  size: '1.5rem',  opacity: 0.16, delay: '14s',   duration: '26s',  className: 'godfather-note' },
  { symbol: '♩', top: '80%',  size: '1.1rem',  opacity: 0.20, delay: '3s',    duration: '25s',  className: 'godfather-note' },
  { symbol: '♪', top: '87%',  size: '1.7rem',  opacity: 0.14, delay: '18s',   duration: '34s',  className: 'godfather-note' },
  { symbol: '𝄞', top: '93%',  size: '1.3rem',  opacity: 0.10, delay: '7s',    duration: '38s',  className: 'godfather-note' },
];


/* =========================================================
   LAYER 2 — DRIFTING / FLOATING NOTES
   Notes that float upward with gentle rotation and fade
   ========================================================= */

interface DriftNote {
  symbol: string;
  left: string;
  size: string;
  opacity: number;
  delay: string;
  duration: string;
}

const DRIFTING_NOTES: DriftNote[] = [
  { symbol: '♪', left: '8%',   size: '1.8rem',  opacity: 0.12, delay: '0s',    duration: '16s' },
  { symbol: '♫', left: '18%',  size: '1.2rem',  opacity: 0.18, delay: '4s',    duration: '20s' },
  { symbol: '𝄞', left: '30%',  size: '2.4rem',  opacity: 0.08, delay: '8s',    duration: '24s' },
  { symbol: '♬', left: '45%',  size: '1.0rem',  opacity: 0.15, delay: '2s',    duration: '18s' },
  { symbol: '♩', left: '58%',  size: '1.5rem',  opacity: 0.10, delay: '10s',   duration: '22s' },
  { symbol: '♪', left: '70%',  size: '1.3rem',  opacity: 0.14, delay: '6s',    duration: '19s' },
  { symbol: '♫', left: '82%',  size: '0.9rem',  opacity: 0.16, delay: '12s',   duration: '21s' },
  { symbol: '𝄞', left: '92%',  size: '2.0rem',  opacity: 0.06, delay: '14s',   duration: '26s' },
  { symbol: '♬', left: '5%',   size: '1.1rem',  opacity: 0.12, delay: '7s',    duration: '17s' },
  { symbol: '♩', left: '38%',  size: '1.6rem',  opacity: 0.09, delay: '11s',   duration: '23s' },
  { symbol: '♪', left: '55%',  size: '1.4rem',  opacity: 0.11, delay: '15s',   duration: '25s' },
  { symbol: '♫', left: '75%',  size: '1.0rem',  opacity: 0.13, delay: '3s',    duration: '15s' },
];


/* =========================================================
   LAYER 3 — GOLDEN DUST PARTICLES
   Tiny shimmering particles floating upward
   ========================================================= */

interface Particle {
  left: string;
  size: number;      // px
  opacity: number;
  delay: string;
  duration: string;
}

const DUST_PARTICLES: Particle[] = Array.from({ length: 30 }, (_, i) => ({
  left: `${(i * 3.3 + Math.sin(i * 1.7) * 5 + 100) % 100}%`,
  size: 1.5 + (i % 4) * 0.8,
  opacity: 0.08 + (i % 5) * 0.04,
  delay: `${(i * 1.3) % 20}s`,
  duration: `${12 + (i % 8) * 3}s`,
}));


/* =========================================================
   LAYER 4 — MUSICAL STAFF LINES
   Faint horizontal lines that fade in/out like a music sheet
   ========================================================= */

const STAFF_LINES = [
  { top: '18%', delay: '0s' },
  { top: '20%', delay: '0.5s' },
  { top: '22%', delay: '1s' },
  { top: '24%', delay: '1.5s' },
  { top: '26%', delay: '2s' },
  { top: '52%', delay: '4s' },
  { top: '54%', delay: '4.5s' },
  { top: '56%', delay: '5s' },
  { top: '58%', delay: '5.5s' },
  { top: '60%', delay: '6s' },
  { top: '78%', delay: '8s' },
  { top: '80%', delay: '8.5s' },
  { top: '82%', delay: '9s' },
  { top: '84%', delay: '9.5s' },
  { top: '86%', delay: '10s' },
];


/* =========================================================
   COMPONENT
   ========================================================= */

export const GodfatherMusic: React.FC = () => {
  /* ----- State ----- */
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [audioReady, setAudioReady] = useState(false);
  const [audioIntensity, setAudioIntensity] = useState(0);
  const [bassIntensity, setBassIntensity] = useState(0);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  /* ----- Refs ----- */
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const audioCtxRef = useRef<AudioContext | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const sourceRef = useRef<MediaElementAudioSourceNode | null>(null);
  const animFrameRef = useRef<number>(0);
  const dataArrayRef = useRef<Uint8Array | null>(null);
  const smokeCanvasRef = useRef<HTMLCanvasElement | null>(null);

  /* ----- Reduced motion ----- */
  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mq.matches);
    const handler = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);

  /* ----- Web Audio API: Analyser setup ----- */
  const initAnalyser = useCallback(() => {
    if (audioCtxRef.current || !audioRef.current) return;

    try {
      const ctx = new AudioContext();
      const analyser = ctx.createAnalyser();
      analyser.fftSize = 512;
      analyser.smoothingTimeConstant = 0.82;

      const source = ctx.createMediaElementSource(audioRef.current);
      source.connect(analyser);
      analyser.connect(ctx.destination);

      audioCtxRef.current = ctx;
      analyserRef.current = analyser;
      sourceRef.current = source;
      dataArrayRef.current = new Uint8Array(analyser.frequencyBinCount);
    } catch (err) {
      console.warn('[GodfatherMusic] Web Audio API initialization failed:', err);
    }
  }, []);

  /* ----- Analyser tick ----- */
  const tickAnalyser = useCallback(() => {
    if (!analyserRef.current || !dataArrayRef.current) {
      animFrameRef.current = requestAnimationFrame(tickAnalyser);
      return;
    }

    analyserRef.current.getByteFrequencyData(dataArrayRef.current as any);
    const len = dataArrayRef.current.length;

    // Overall average amplitude (0-1)
    const sum = dataArrayRef.current.reduce((a, b) => a + b, 0);
    const avg = sum / len / 255;
    setAudioIntensity(avg);

    // Bass frequency emphasis (first 1/6 of bins)
    const bassSlice = Math.floor(len / 6);
    let bassSum = 0;
    for (let i = 0; i < bassSlice; i++) bassSum += dataArrayRef.current[i];
    setBassIntensity(bassSum / bassSlice / 255);

    animFrameRef.current = requestAnimationFrame(tickAnalyser);
  }, []);

  /* ----- Core Play Logic ----- */
  const startPlayback = useCallback(async () => {
    const audio = audioRef.current;
    if (!audio) return;

    try {
      initAnalyser();
      if (audioCtxRef.current?.state === 'suspended') {
        await audioCtxRef.current.resume();
      }
      await audio.play();
      setIsPlaying(true);
      if (!animFrameRef.current) {
        animFrameRef.current = requestAnimationFrame(tickAnalyser);
      }
    } catch (err) {
      // Browser autoplay restriction will be handled on first user interaction
    }
  }, [initAnalyser, tickAnalyser]);

  /* ----- Initialize Audio Element & Auto-play Handlers ----- */
  useEffect(() => {
    const audio = new Audio(godfatherTheme);
    audio.loop = true;
    audio.preload = 'auto';
    audio.volume = 0.45;
    audioRef.current = audio;

    const onCanPlay = () => {
      setAudioReady(true);
      // Attempt auto-playback as soon as audio is buffered
      startPlayback();
    };

    const onError = () => {
      console.warn('[GodfatherMusic] Audio failed to load:', godfatherTheme);
      setAudioReady(false);
    };

    audio.addEventListener('canplaythrough', onCanPlay);
    audio.addEventListener('error', onError);

    // Listen for custom trigger from LoadingScreen or global interactions
    const handleGodfatherPlay = () => {
      startPlayback();
    };
    window.addEventListener('godfather-play', handleGodfatherPlay);

    // Global first-interaction unlock (click, tap, key, scroll)
    const handleFirstGesture = () => {
      startPlayback();
      window.removeEventListener('click', handleFirstGesture);
      window.removeEventListener('keydown', handleFirstGesture);
      window.removeEventListener('touchstart', handleFirstGesture);
      window.removeEventListener('scroll', handleFirstGesture);
    };

    window.addEventListener('click', handleFirstGesture);
    window.addEventListener('keydown', handleFirstGesture);
    window.addEventListener('touchstart', handleFirstGesture);
    window.addEventListener('scroll', handleFirstGesture, { passive: true });

    return () => {
      audio.removeEventListener('canplaythrough', onCanPlay);
      audio.removeEventListener('error', onError);
      window.removeEventListener('godfather-play', handleGodfatherPlay);
      window.removeEventListener('click', handleFirstGesture);
      window.removeEventListener('keydown', handleFirstGesture);
      window.removeEventListener('touchstart', handleFirstGesture);
      window.removeEventListener('scroll', handleFirstGesture);
      audio.pause();
      audio.src = '';

      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
      if (audioCtxRef.current && audioCtxRef.current.state !== 'closed') {
        audioCtxRef.current.close().catch(() => {});
      }
    };
  }, [startPlayback]);

  /* ----- Continuous Golden Smoke & Ember Canvas ----- */
  useEffect(() => {
    const canvas = smokeCanvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    const smokeClouds = Array.from({ length: 8 }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      radius: Math.random() * 340 + 240,
      vx: (Math.random() - 0.5) * 0.26,
      vy: (Math.random() - 0.5) * 0.2,
      opacity: Math.random() * 0.08 + 0.05,
      offset: Math.random() * 10,
    }));

    const floatingEmbers = Array.from({ length: 55 }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      size: Math.random() * 2.6 + 0.8,
      vx: (Math.random() - 0.45) * 0.35,
      vy: -Math.random() * 0.55 - 0.15,
      opacity: Math.random() * 0.75 + 0.25,
      flicker: Math.random() * 0.025 + 0.01,
      angle: Math.random() * Math.PI * 2,
    }));

    let time = 0;

    const renderAtmosphere = () => {
      time += 0.012;
      ctx.clearRect(0, 0, width, height);

      // Render drifting golden smoke plumes
      smokeClouds.forEach((cloud) => {
        cloud.x += cloud.vx;
        cloud.y += cloud.vy;

        if (cloud.x < -cloud.radius) cloud.x = width + cloud.radius;
        if (cloud.x > width + cloud.radius) cloud.x = -cloud.radius;
        if (cloud.y < -cloud.radius) cloud.y = height + cloud.radius;
        if (cloud.y > height + cloud.radius) cloud.y = -cloud.radius;

        const pulse = Math.sin(time + cloud.offset) * 0.015;
        const currentAlpha = Math.max(0.02, cloud.opacity + pulse);

        const grad = ctx.createRadialGradient(
          cloud.x,
          cloud.y,
          0,
          cloud.x,
          cloud.y,
          cloud.radius
        );
        grad.addColorStop(0, `rgba(225, 185, 105, ${currentAlpha * 1.6})`);
        grad.addColorStop(0.45, `rgba(185, 140, 65, ${currentAlpha * 0.85})`);
        grad.addColorStop(1, 'rgba(0, 0, 0, 0)');

        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(cloud.x, cloud.y, cloud.radius, 0, Math.PI * 2);
        ctx.fill();
      });

      // Render floating amber ember particles with halo glow
      floatingEmbers.forEach((ember) => {
        ember.y += ember.vy;
        ember.x += ember.vx + Math.sin(time + ember.angle) * 0.25;

        if (ember.y < -10) {
          ember.y = height + 10;
          ember.x = Math.random() * width;
        }
        if (ember.x < -10) ember.x = width + 10;
        if (ember.x > width + 10) ember.x = -10;

        const flickerVal = (Math.sin(time * ember.flicker * 60) + 1) * 0.5;
        const alpha = ember.opacity * (0.45 + flickerVal * 0.55);

        ctx.fillStyle = `rgba(255, 235, 180, ${alpha})`;
        ctx.beginPath();
        ctx.arc(ember.x, ember.y, ember.size, 0, Math.PI * 2);
        ctx.fill();

        if (ember.size > 1.2) {
          const glow = ctx.createRadialGradient(
            ember.x,
            ember.y,
            0,
            ember.x,
            ember.y,
            ember.size * 3.5
          );
          glow.addColorStop(0, `rgba(230, 190, 105, ${alpha * 0.6})`);
          glow.addColorStop(1, 'rgba(203, 168, 100, 0)');
          ctx.fillStyle = glow;
          ctx.beginPath();
          ctx.arc(ember.x, ember.y, ember.size * 3.5, 0, Math.PI * 2);
          ctx.fill();
        }
      });

      animId = requestAnimationFrame(renderAtmosphere);
    };

    renderAtmosphere();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animId);
    };
  }, []);

  /* ----- Play / Pause Toggle ----- */
  const togglePlay = useCallback(async () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.pause();
      if (animFrameRef.current) {
        cancelAnimationFrame(animFrameRef.current);
        animFrameRef.current = 0;
      }
      setAudioIntensity(0);
      setBassIntensity(0);
      setIsPlaying(false);
    } else {
      await startPlayback();
    }
  }, [isPlaying, startPlayback]);

  /* ----- Mute / Unmute ----- */
  const toggleMute = useCallback(() => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.muted = !audio.muted;
    setIsMuted(!isMuted);
  }, [isMuted]);

  /* ----- Computed glow values ----- */
  const glowScale = useMemo(() => {
    if (!isPlaying) return 0;
    return Math.min(audioIntensity * 2.8, 1);
  }, [isPlaying, audioIntensity]);

  const bassScale = useMemo(() => {
    if (!isPlaying) return 0;
    return Math.min(bassIntensity * 3.0, 1);
  }, [isPlaying, bassIntensity]);

  const showAnimations = !prefersReducedMotion;

  /* =========================================================
     RENDER
     ========================================================= */

  return (
    <>
      {/* =======================================================
          FULL-PAGE ANIMATION OVERLAY
          Fixed position covering the entire viewport
          ======================================================= */}
      <div
        className="fixed inset-0 overflow-hidden pointer-events-none"
        style={{ zIndex: 4 }}
        aria-hidden="true"
        data-purpose="godfather-cinematic-overlay"
      >

        {/* ---------------------------------------------------
            LAYER 0 — PERSISTENT GOLDEN SMOKE & EMBER CANVAS
            Cinematic atmosphere that seamlessly continues across the site
            --------------------------------------------------- */}
        <canvas
          ref={smokeCanvasRef}
          className="absolute inset-0 w-full h-full pointer-events-none"
          style={{ opacity: isPlaying ? 0.85 : 0.65, transition: 'opacity 0.8s ease' }}
        />

        {/* ---------------------------------------------------
            LAYER 0.1 — AMBIENT GOLDEN VIGNETTE (Music-reactive)
            A warm radial glow that pulses with the bass
            --------------------------------------------------- */}
        <div
          className="absolute inset-0 godfather-ambient-vignette"
          style={{
            opacity: 0.4 + bassScale * 0.5,
            transition: 'opacity 0.5s ease',
          }}
        />

        {/* ---------------------------------------------------
            LAYER 0.5 — FILM GRAIN TEXTURE
            Subtle noise overlay for vintage cinema feel
            --------------------------------------------------- */}
        {showAnimations && (
          <div className="absolute inset-0 godfather-film-grain" />
        )}

        {/* ---------------------------------------------------
            LAYER 1 — HORIZONTAL SCROLLING NOTES
            Classic right-to-left musical score flow
            --------------------------------------------------- */}
        {showAnimations && SCROLLING_NOTES.map((note, i) => {
          const pulseGlow = glowScale > 0
            ? `0 0 ${10 + glowScale * 25}px rgba(203, 168, 100, ${0.3 + glowScale * 0.5}),
               0 0 ${5 + glowScale * 10}px rgba(223, 183, 108, ${0.2 + glowScale * 0.3})`
            : '0 0 8px rgba(203, 168, 100, 0.28)';

          const pulseScale = 1 + glowScale * 0.18;
          const drift = Math.sin((i * 0.8) + glowScale * 3) * 4;
          const noteOpacity = Math.min(Math.max(note.opacity * 1.8, 0.32) + glowScale * 0.22, 0.9);

          return (
            <span
              key={`scroll-${i}`}
              className={note.className}
              style={{
                top: note.top,
                fontSize: note.size,
                opacity: noteOpacity,
                animationDelay: note.delay,
                animationDuration: note.duration,
                textShadow: pulseGlow,
                transition: 'text-shadow 0.4s ease, opacity 0.4s ease',
              }}
            >
              <span
                style={{
                  display: 'inline-block',
                  transform: `scale(${pulseScale}) translateY(${drift}px)`,
                  transition: 'transform 0.4s ease',
                }}
              >
                {note.symbol}
              </span>
            </span>
          );
        })}

        {/* ---------------------------------------------------
            LAYER 2 — DRIFTING / FLOATING NOTES
            Rise upward with gentle rotation and fade
            --------------------------------------------------- */}
        {showAnimations && DRIFTING_NOTES.map((note, i) => {
          const floatGlow = glowScale > 0
            ? `0 0 ${12 + glowScale * 18}px rgba(203, 168, 100, ${0.25 + glowScale * 0.4})`
            : '0 0 6px rgba(203, 168, 100, 0.22)';
          const driftOpacity = Math.min(Math.max(note.opacity * 2.2, 0.28) + glowScale * 0.2, 0.85);

          return (
            <span
              key={`drift-${i}`}
              className="godfather-drift-note"
              style={{
                left: note.left,
                fontSize: note.size,
                opacity: driftOpacity,
                animationDelay: note.delay,
                animationDuration: note.duration,
                textShadow: floatGlow,
                transition: 'text-shadow 0.4s ease, opacity 0.4s ease',
              }}
            >
              {note.symbol}
            </span>
          );
        })}

        {/* ---------------------------------------------------
            LAYER 3 — GOLDEN DUST PARTICLES
            Tiny shimmering motes that float upward
            --------------------------------------------------- */}
        {showAnimations && DUST_PARTICLES.map((p, i) => (
          <span
            key={`dust-${i}`}
            className="godfather-dust"
            style={{
              left: p.left,
              width: `${p.size}px`,
              height: `${p.size}px`,
              opacity: p.opacity + glowScale * 0.06,
              animationDelay: p.delay,
              animationDuration: p.duration,
              boxShadow: glowScale > 0
                ? `0 0 ${4 + glowScale * 8}px rgba(203, 168, 100, ${0.3 + glowScale * 0.5})`
                : `0 0 3px rgba(203, 168, 100, 0.2)`,
              transition: 'box-shadow 0.5s ease, opacity 0.5s ease',
            }}
          />
        ))}

        {/* ---------------------------------------------------
            LAYER 4 — MUSICAL STAFF LINES
            Ghostly horizontal lines that breathe in/out
            --------------------------------------------------- */}
        {showAnimations && STAFF_LINES.map((line, i) => (
          <div
            key={`staff-${i}`}
            className="godfather-staff-line"
            style={{
              top: line.top,
              animationDelay: line.delay,
              opacity: isPlaying ? 0.08 + bassScale * 0.12 : 0.035,
              transition: 'opacity 0.6s ease',
            }}
          />
        ))}

        {/* ---------------------------------------------------
            LAYER 5 — AMBIENT LIGHT STREAKS
            Diagonal golden rays that slowly sweep
            --------------------------------------------------- */}
        {showAnimations && (
          <>
            <div
              className="godfather-light-streak godfather-light-streak-1"
              style={{
                opacity: isPlaying ? 0.03 + bassScale * 0.06 : 0.015,
                transition: 'opacity 0.8s ease',
              }}
            />
            <div
              className="godfather-light-streak godfather-light-streak-2"
              style={{
                opacity: isPlaying ? 0.025 + bassScale * 0.05 : 0.012,
                transition: 'opacity 0.8s ease',
              }}
            />
            <div
              className="godfather-light-streak godfather-light-streak-3"
              style={{
                opacity: isPlaying ? 0.02 + bassScale * 0.04 : 0.01,
                transition: 'opacity 0.8s ease',
              }}
            />
          </>
        )}

      </div>


      {/* =======================================================
          FLOATING MUSIC PLAYER — Bottom Right
          Cinematic, refined design with disc animation
          ======================================================= */}
      <div
        className="fixed bottom-5 right-5 z-50 flex items-center gap-3"
        role="region"
        aria-label="Music player controls"
        data-purpose="godfather-music-player"
      >
        {/* Now-playing label with waveform visualization */}
        {isPlaying && (
          <div className="godfather-now-playing hidden sm:flex items-center gap-2.5 mr-1">
            {/* Mini waveform bars */}
            <div className="flex items-end gap-[2px] h-3">
              {[0.6, 1, 0.4, 0.8, 0.5].map((baseH, i) => (
                <span
                  key={i}
                  className="godfather-waveform-bar"
                  style={{
                    height: `${(baseH + glowScale * 0.5) * 12}px`,
                    animationDelay: `${i * 0.12}s`,
                    transition: 'height 0.15s ease',
                  }}
                />
              ))}
            </div>
            <span className="text-[10px] tracking-[0.18em] uppercase text-[#a99775] select-none whitespace-nowrap font-sans">
              The Godfather
            </span>
          </div>
        )}

        {/* Mute / Unmute */}
        <button
          onClick={toggleMute}
          aria-label={isMuted ? 'Unmute soundtrack' : 'Mute soundtrack'}
          title={isMuted ? 'Unmute' : 'Mute'}
          className="godfather-player-btn"
        >
          {isMuted ? (
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
              <line x1="23" y1="9" x2="17" y2="15" />
              <line x1="17" y1="9" x2="23" y2="15" />
            </svg>
          ) : (
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
              <path d="M19.07 4.93a10 10 0 0 1 0 14.14" />
              <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
            </svg>
          )}
        </button>

        {/* Play / Pause — Larger primary button with disc ring */}
        <button
          onClick={togglePlay}
          disabled={!audioReady}
          aria-label={isPlaying ? 'Pause soundtrack' : 'Play soundtrack'}
          title={isPlaying ? 'Pause' : 'Play'}
          className={`godfather-player-btn godfather-player-btn--primary ${isPlaying ? 'is-playing' : ''}`}
        >
          {/* Spinning disc ring */}
          <span className={`godfather-disc-ring ${isPlaying ? 'is-spinning' : ''}`} />
          <span className="relative z-10">
            {isPlaying ? (
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <rect x="6" y="4" width="4" height="16" />
                <rect x="14" y="4" width="4" height="16" />
              </svg>
            ) : (
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <polygon points="6 3 20 12 6 21 6 3" />
              </svg>
            )}
          </span>
        </button>
      </div>
    </>
  );
};
