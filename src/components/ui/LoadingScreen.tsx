import React, { useEffect, useRef, useState, useCallback } from 'react';

// Local high-resolution assets to preload
import bgImage from '../../assets/homepagebg.png';
import vintageCarLocal from '../../assets/vintagecar.png';
import contactBg from '../../assets/contact_bg.jpg';
import tsLogo from '../../assets/TSlogo.png';
import homeDownDesign from '../../assets/homepagedowndegine.png';
import godfatherTheme from '../../assets/music/TheGodfatherTheme.mp3';

const REMOTE_ASSETS = [
  'https://images.unsplash.com/photo-1618044733300-9472054094ee?q=80&w=800&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1555664424-778a1e5e1b48?q=80&w=800&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1541888050669-8d7658c1db16?q=80&w=800&auto=format&fit=crop',
];

interface LoadingScreenProps {
  onComplete?: () => void;
  minDuration?: number; // minimum aesthetic pacing in ms
}

export const LoadingScreen: React.FC<LoadingScreenProps> = ({
  onComplete,
  minDuration = 2200,
}) => {
  const [progress, setProgress] = useState(0);
  const [isReadyToEnter, setIsReadyToEnter] = useState(false);
  const [isFadingOut, setIsFadingOut] = useState(false);
  const [isDone, setIsDone] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const targetProgressRef = useRef(0);
  const hasTriggeredAudioRef = useRef(false);

  // Trigger audio playback safely across all browsers
  const triggerAudioAndEnter = useCallback(() => {
    if (hasTriggeredAudioRef.current) return;
    hasTriggeredAudioRef.current = true;

    // Dispatch global play event to GodfatherMusic
    window.dispatchEvent(new CustomEvent('godfather-play'));

    // Trigger smooth fade-out
    setIsFadingOut(true);
    setTimeout(() => {
      setIsDone(true);
      onComplete?.();
    }, 900);
  }, [onComplete]);

  // 1. Real Asset Preloading & Synchronization
  useEffect(() => {
    const assetsToLoad = [
      bgImage,
      vintageCarLocal,
      contactBg,
      tsLogo,
      homeDownDesign,
      ...REMOTE_ASSETS,
    ];

    const totalCount = assetsToLoad.length + 2; // +1 for fonts, +1 for audio buffer
    let loadedCount = 0;

    const incrementLoad = () => {
      loadedCount++;
      const currentRatio = loadedCount / totalCount;
      targetProgressRef.current = Math.min(Math.round(currentRatio * 100), 100);
    };

    // Preload & decode images into GPU memory
    assetsToLoad.forEach((src) => {
      const img = new Image();
      img.src = src;
      img.onload = () => {
        if ('decode' in img) {
          img.decode().then(incrementLoad).catch(incrementLoad);
        } else {
          incrementLoad();
        }
      };
      img.onerror = incrementLoad; // don't freeze on broken network
    });

    // Preload audio buffer
    const audio = new Audio();
    audio.src = godfatherTheme;
    audio.preload = 'auto';
    audio.oncanplaythrough = incrementLoad;
    audio.onerror = incrementLoad;
    setTimeout(incrementLoad, 3000); // safety fallback

    // Wait for web fonts (Cinzel, Cormorant Garamond, Montserrat)
    if (document.fonts && document.fonts.ready) {
      document.fonts.ready.then(incrementLoad).catch(incrementLoad);
    } else {
      incrementLoad();
    }
  }, []);

  // 2. Smooth Interpolated Progress Animation Loop
  useEffect(() => {
    const startTime = performance.now();
    let currentVal = 0;
    let animId: number;

    const tick = (now: number) => {
      const elapsed = now - startTime;
      const timeRatio = Math.min(elapsed / minDuration, 1);

      // Calculate ceiling based on both elapsed time and real asset progress
      const allowedCeiling = timeRatio * 100;
      const target = Math.min(targetProgressRef.current, allowedCeiling);

      // Smooth interpolation toward target
      if (currentVal < target) {
        currentVal += Math.max(0.6, (target - currentVal) * 0.12);
        if (currentVal > target) currentVal = target;
      }

      const display = Math.min(Math.round(currentVal), 100);
      setProgress(display);

      const isAssetsLoaded = targetProgressRef.current >= 100;
      const isTimeElapsed = elapsed >= minDuration;

      if (display >= 100 && isAssetsLoaded && isTimeElapsed) {
        setIsReadyToEnter(true);

        // Attempt automatic audio playback & transition
        window.dispatchEvent(new CustomEvent('godfather-play'));

        // If audio playback or user already initiated, auto fade-out after brief hold
        const autoTimer = setTimeout(() => {
          triggerAudioAndEnter();
        }, 450);

        return () => clearTimeout(autoTimer);
      } else {
        animId = requestAnimationFrame(tick);
      }
    };

    animId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(animId);
  }, [minDuration, triggerAudioAndEnter]);

  // 3. Golden Smoke & Ember Dust Canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    const smokePuffs = Array.from({ length: 9 }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      radius: Math.random() * 320 + 200,
      vx: (Math.random() - 0.5) * 0.28,
      vy: (Math.random() - 0.5) * 0.22,
      opacity: Math.random() * 0.08 + 0.04,
      hueOffset: Math.random() * 8,
    }));

    const embers = Array.from({ length: 70 }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      size: Math.random() * 2.4 + 0.7,
      vx: (Math.random() - 0.4) * 0.35,
      vy: -Math.random() * 0.55 - 0.15,
      opacity: Math.random() * 0.75 + 0.25,
      flickerSpeed: Math.random() * 0.03 + 0.01,
      angle: Math.random() * Math.PI * 2,
    }));

    let time = 0;

    const render = () => {
      time += 0.015;
      ctx.clearRect(0, 0, width, height);

      // Deep dark vignette base
      const bgGradient = ctx.createRadialGradient(
        width / 2,
        height / 2,
        100,
        width / 2,
        height / 2,
        Math.max(width, height) * 0.7
      );
      bgGradient.addColorStop(0, 'rgba(16, 14, 11, 0.45)');
      bgGradient.addColorStop(0.7, 'rgba(9, 9, 8, 0.88)');
      bgGradient.addColorStop(1, 'rgba(5, 5, 5, 0.99)');
      ctx.fillStyle = bgGradient;
      ctx.fillRect(0, 0, width, height);

      // Render drifting golden smoke clouds
      smokePuffs.forEach((puff) => {
        puff.x += puff.vx;
        puff.y += puff.vy;

        if (puff.x < -puff.radius) puff.x = width + puff.radius;
        if (puff.x > width + puff.radius) puff.x = -puff.radius;
        if (puff.y < -puff.radius) puff.y = height + puff.radius;
        if (puff.y > height + puff.radius) puff.y = -puff.radius;

        const pulse = Math.sin(time + puff.hueOffset) * 0.015;
        const currentOpacity = Math.max(0.01, puff.opacity + pulse);

        const radial = ctx.createRadialGradient(
          puff.x,
          puff.y,
          0,
          puff.x,
          puff.y,
          puff.radius
        );
        radial.addColorStop(0, `rgba(215, 175, 95, ${currentOpacity * 1.5})`);
        radial.addColorStop(0.45, `rgba(180, 135, 60, ${currentOpacity})`);
        radial.addColorStop(1, 'rgba(0, 0, 0, 0)');

        ctx.fillStyle = radial;
        ctx.beginPath();
        ctx.arc(puff.x, puff.y, puff.radius, 0, Math.PI * 2);
        ctx.fill();
      });

      // Render floating amber ember particles
      embers.forEach((ember) => {
        ember.y += ember.vy;
        ember.x += ember.vx + Math.sin(time + ember.angle) * 0.25;

        if (ember.y < -10) {
          ember.y = height + 10;
          ember.x = Math.random() * width;
        }
        if (ember.x < -10) ember.x = width + 10;
        if (ember.x > width + 10) ember.x = -10;

        const flicker = (Math.sin(time * ember.flickerSpeed * 60) + 1) * 0.5;
        const alpha = ember.opacity * (0.5 + flicker * 0.5);

        ctx.fillStyle = `rgba(255, 235, 185, ${alpha})`;
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
          glow.addColorStop(0, `rgba(225, 185, 100, ${alpha * 0.5})`);
          glow.addColorStop(1, 'rgba(203, 168, 100, 0)');
          ctx.fillStyle = glow;
          ctx.beginPath();
          ctx.arc(ember.x, ember.y, ember.size * 3.5, 0, Math.PI * 2);
          ctx.fill();
        }
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  if (isDone) return null;

  return (
    <div
      onClick={triggerAudioAndEnter}
      className={`fixed inset-0 z-[99999] bg-[#060606] flex items-center justify-center select-none cursor-pointer transition-opacity duration-1000 ease-in-out ${isFadingOut ? 'opacity-0 pointer-events-none' : 'opacity-100'
        }`}
      aria-label="Loading screen"
    >
      {/* Background Interactive Ambient Canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full pointer-events-none z-0"
      />

      {/* Outer Delicate Golden Border Frame */}
      <div className="absolute inset-4 sm:inset-7 md:inset-10 border border-[#cba864]/20 pointer-events-none z-10" />
      <div className="absolute inset-5 sm:inset-8 md:inset-11 border border-[#cba864]/10 pointer-events-none z-10" />

      {/* Ornate Corner Accents */}
      <svg
        className="absolute top-4 sm:top-7 md:top-10 left-4 sm:left-7 md:left-10 w-6 h-6 sm:w-8 sm:h-8 text-[#cba864]/50 pointer-events-none z-10"
        viewBox="0 0 32 32"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.2"
      >
        <path d="M 2 14 V 2 H 14" />
        <path d="M 6 6 L 12 12" />
        <circle cx="6" cy="6" r="1.5" fill="#cba864" />
        <circle cx="2" cy="18" r="1" fill="#cba864" />
        <circle cx="18" cy="2" r="1" fill="#cba864" />
      </svg>

      <svg
        className="absolute top-4 sm:top-7 md:top-10 right-4 sm:right-7 md:right-10 w-6 h-6 sm:w-8 sm:h-8 text-[#cba864]/50 pointer-events-none z-10 scale-x-[-1]"
        viewBox="0 0 32 32"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.2"
      >
        <path d="M 2 14 V 2 H 14" />
        <path d="M 6 6 L 12 12" />
        <circle cx="6" cy="6" r="1.5" fill="#cba864" />
        <circle cx="2" cy="18" r="1" fill="#cba864" />
        <circle cx="18" cy="2" r="1" fill="#cba864" />
      </svg>

      <svg
        className="absolute bottom-4 sm:bottom-7 md:bottom-10 left-4 sm:left-7 md:left-10 w-6 h-6 sm:w-8 sm:h-8 text-[#cba864]/50 pointer-events-none z-10 scale-y-[-1]"
        viewBox="0 0 32 32"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.2"
      >
        <path d="M 2 14 V 2 H 14" />
        <path d="M 6 6 L 12 12" />
        <circle cx="6" cy="6" r="1.5" fill="#cba864" />
        <circle cx="2" cy="18" r="1" fill="#cba864" />
        <circle cx="18" cy="2" r="1" fill="#cba864" />
      </svg>

      <svg
        className="absolute bottom-4 sm:bottom-7 md:bottom-10 right-4 sm:right-7 md:right-10 w-6 h-6 sm:w-8 sm:h-8 text-[#cba864]/50 pointer-events-none z-10 scale-[-1]"
        viewBox="0 0 32 32"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.2"
      >
        <path d="M 2 14 V 2 H 14" />
        <path d="M 6 6 L 12 12" />
        <circle cx="6" cy="6" r="1.5" fill="#cba864" />
        <circle cx="2" cy="18" r="1" fill="#cba864" />
        <circle cx="18" cy="2" r="1" fill="#cba864" />
      </svg>

      {/* Top Left Label: '06. CINEMATIC SMOKE' */}
      <div className="absolute top-7 sm:top-10 md:top-14 left-7 sm:left-10 md:left-14 z-20">
        <span className="font-sans text-[9px] sm:text-[11px] md:text-xs uppercase tracking-[0.28em] text-[#a98f5a]/80 font-medium">

        </span>
      </div>

      {/* Central Content Box */}
      <div className="relative z-20 flex flex-col items-center justify-center text-center px-6 max-w-xl w-full">

        {/* Vintage Filigree Ornament (Godfather Flourish) */}
        <div className="flex items-center justify-center mb-6 sm:mb-8 text-[#cba864]/75 w-full max-w-[280px] sm:max-w-[340px]">
          <span className="h-[1px] flex-1 bg-gradient-to-r from-transparent to-[#cba864]/60" />
          <svg
            className="w-8 h-8 sm:w-10 sm:h-10 mx-3 text-[#cba864] drop-shadow-[0_0_10px_rgba(203,168,100,0.4)]"
            viewBox="0 0 40 40"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.2"
          >
            <path
              d="M 20 8 L 24 16 L 32 20 L 24 24 L 20 32 L 16 24 L 8 20 L 16 16 Z"
              fill="rgba(203, 168, 100, 0.15)"
              stroke="#cba864"
            />
            <circle cx="20" cy="20" r="2.5" fill="#e8cf96" />
            <path d="M 6 20 C 10 17 14 17 17 20" stroke="#a98f5a" strokeLinecap="round" />
            <path d="M 34 20 C 30 17 26 17 23 20" stroke="#a98f5a" strokeLinecap="round" />
            <path d="M 6 20 C 10 23 14 23 17 20" stroke="#a98f5a" strokeLinecap="round" />
            <path d="M 34 20 C 30 23 26 23 23 20" stroke="#a98f5a" strokeLinecap="round" />
          </svg>
          <span className="h-[1px] flex-1 bg-gradient-to-l from-transparent to-[#cba864]/60" />
        </div>

        {/* Headline: 'Hello there.' */}
        <h1 className="font-quote text-4xl sm:text-6xl md:text-7xl font-normal leading-tight text-transparent bg-clip-text bg-gradient-to-b from-[#fcedcf] via-[#d5b372] to-[#8d6f35] drop-shadow-[0_2px_22px_rgba(203,168,100,0.38)] tracking-[0.02em]">
          Hello there.
        </h1>

        {/* Subtitle: 'Loading the site for you...' */}
        <p className="font-quote italic text-base sm:text-xl md:text-2xl text-[#c7af85] font-normal tracking-wide mt-1.5 sm:mt-2.5 drop-shadow-[0_1px_8px_rgba(0,0,0,0.9)] opacity-95">
          Loading the site for you...
        </p>

        {/* Progress Bar Container */}
        <div className="w-full max-w-sm sm:max-w-md md:max-w-lg mt-12 sm:mt-16 flex flex-col items-center">

          {/* Progress Track */}
          <div className="relative w-full h-[2px] sm:h-[2.5px] bg-[#17140f] rounded-full overflow-visible border border-[#3d3322]/60 shadow-[inset_0_1px_2px_rgba(0,0,0,0.9)]">
            <div
              className="absolute left-0 top-0 bottom-0 bg-gradient-to-r from-[#6b4e1f] via-[#cba864] to-[#fae6b2] rounded-full transition-all duration-150 ease-out"
              style={{ width: `${progress}%` }}
            >
              {progress > 0 && (
                <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 z-30 pointer-events-none flex items-center justify-center">
                  <span className="absolute w-12 sm:w-16 h-[1.5px] bg-gradient-to-r from-transparent via-[#fff5d9] to-transparent shadow-[0_0_10px_#fae19c]" />
                  <span className="absolute h-8 sm:h-12 w-[1px] bg-gradient-to-b from-transparent via-[#fff5d9] to-transparent shadow-[0_0_10px_#fae19c]" />
                  <span className="absolute w-7 h-[1px] rotate-45 bg-gradient-to-r from-transparent via-[#ffd580] to-transparent" />
                  <span className="absolute w-7 h-[1px] -rotate-45 bg-gradient-to-r from-transparent via-[#ffd580] to-transparent" />
                  <span className="relative w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-[#ffffff] shadow-[0_0_12px_#fff0c2,0_0_22px_#e5bb65,0_0_35px_#cba864]" />
                </div>
              )}
            </div>
          </div>

          {/* Percentage Counter or Enter Button */}
          {isReadyToEnter ? (
            <div className="mt-4 flex flex-col items-center animate-fade-in">
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  triggerAudioAndEnter();
                }}
                className="px-6 py-2 border border-[#cba864]/80 text-[#edd89f] font-serif text-xs sm:text-sm tracking-[0.25em] uppercase hover:bg-[#cba864]/10 transition-all duration-300 shadow-[0_0_20px_rgba(203,168,100,0.25)] flex items-center gap-2"
              >
                <span>ENTER EXPERIENCE</span>
                <span className="text-[10px]">▶</span>
              </button>
              <span className="text-[10px] text-[#9e8864] mt-2 font-sans tracking-[0.15em] uppercase">
                (Click anywhere to enter with audio)
              </span>
            </div>
          ) : (
            <span className="font-quote text-sm sm:text-base tracking-[0.12em] text-[#d6b779] font-normal mt-3.5 sm:mt-4 drop-shadow-[0_1px_8px_rgba(203,168,100,0.35)]">
              {progress}%
            </span>
          )}
        </div>

      </div>
    </div>
  );
};
