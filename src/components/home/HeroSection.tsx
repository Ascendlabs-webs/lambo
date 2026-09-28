import React, { useEffect, useState, useRef } from 'react';
import { ArrowDown, ChevronRight, Gauge, Play, Sparkles, Volume2 } from 'lucide-react';
import { audioEngine } from '../../utils/audioEngine';

interface HeroSectionProps {
  onExploreClick: () => void;
  onConfiguratorClick: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onExploreClick, onConfiguratorClick }) => {
  const [mouseOffset, setMouseOffset] = useState({ x: 0, y: 0 });
  const [hudLoaded, setHudLoaded] = useState(false);
  const [isEngineSounding, setIsEngineSounding] = useState(false);
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Entrance animation delay
    const timer = setTimeout(() => {
      setHudLoaded(true);
    }, 250);

    const handleMouseMove = (e: MouseEvent) => {
      const { innerWidth, innerHeight } = window;
      const x = (e.clientX / innerWidth - 0.5) * 20;
      const y = (e.clientY / innerHeight - 0.5) * 15;
      setMouseOffset({ x, y });
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => {
      clearTimeout(timer);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  const triggerSound = () => {
    if (!isEngineSounding) {
      audioEngine.start();
      audioEngine.setRpm(3800);
      setIsEngineSounding(true);
      setTimeout(() => {
        audioEngine.setRpm(7800);
      }, 500);
      setTimeout(() => {
        audioEngine.setRpm(1200);
      }, 1600);
      setTimeout(() => {
        audioEngine.stop();
        setIsEngineSounding(false);
      }, 2400);
    }
  };

  return (
    <section
      ref={heroRef}
      className="relative min-h-screen w-full flex flex-col justify-between overflow-hidden bg-black text-white pt-24 pb-12 px-6 sm:px-12"
    >
      {/* Cinematic Dark Environment with Carbon Pattern */}
      <div className="absolute inset-0 carbon-pattern opacity-60 pointer-events-none" />

      {/* Atmospheric Volumetric Lighting / Ambient Glow */}
      <div
        className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-gradient-to-r from-[#E5A823]/15 via-[#FF4500]/10 to-transparent rounded-full blur-[140px] pointer-events-none transition-transform duration-700 ease-out"
        style={{
          transform: `translate(calc(-50% + ${mouseOffset.x * 1.5}px), ${mouseOffset.y * 1.2}px)`,
        }}
      />

      {/* Dynamic Floating Particles / Speed Streaks */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[...Array(18)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-[#E5A823]/30 blur-[0.5px] animate-pulse"
            style={{
              width: `${(i % 3) + 2}px`,
              height: `${(i % 3) + 2}px`,
              top: `${(i * 19) % 95}%`,
              left: `${(i * 23) % 92}%`,
              animationDuration: `${3 + (i % 4)}s`,
              animationDelay: `${i * 0.2}s`,
            }}
          />
        ))}
      </div>

      {/* Dominant Vehicle Visual with Mouse Parallax & Dynamic Lighting */}
      <div
        className="absolute inset-0 flex items-center justify-center pointer-events-none z-10 transition-transform duration-500 ease-out"
        style={{
          transform: `translate(${mouseOffset.x * -0.8}px, ${mouseOffset.y * -0.5}px) scale(1.02)`,
        }}
      >
        <div className="relative w-full max-w-6xl px-4 flex justify-center items-center">
          {/* Stylized High-Fidelity Silhouette Supercar Vector with Glowing Hexagonal LED Eyes */}
          <div className="relative w-full max-w-4xl h-80 sm:h-96 md:h-[460px] flex items-center justify-center">
            <svg
              viewBox="0 0 1000 480"
              className="w-full h-full drop-shadow-[0_25px_40px_rgba(0,0,0,0.9)]"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <defs>
                <linearGradient id="bodyGrad" x1="0%" y1="0%" x2="100%" y2="50%">
                  <stop offset="0%" stopColor="#141418" />
                  <stop offset="40%" stopColor="#25252d" />
                  <stop offset="70%" stopColor="#18181f" />
                  <stop offset="100%" stopColor="#0c0c0f" />
                </linearGradient>
                <linearGradient id="goldHighlight" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#E5A823" stopOpacity="0.8" />
                  <stop offset="50%" stopColor="#FFE599" stopOpacity="1" />
                  <stop offset="100%" stopColor="#E5A823" stopOpacity="0.8" />
                </linearGradient>
                <filter id="glow">
                  <feGaussianBlur stdDeviation="6" result="coloredBlur" />
                  <feMerge>
                    <feMergeNode in="coloredBlur" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
              </defs>

              {/* Shadow Base */}
              <ellipse cx="500" cy="410" rx="460" ry="24" fill="rgba(0, 0, 0, 0.95)" filter="blur(16px)" />

              {/* Wedge Silhouette Body */}
              <path
                d="M 60,380 L 140,360 L 260,330 L 370,260 L 460,200 L 590,200 L 730,280 L 850,340 L 940,370 L 960,390 L 870,390 L 800,340 L 720,385 L 300,385 L 200,340 L 110,390 Z"
                fill="url(#bodyGrad)"
                stroke="rgba(255,255,255,0.18)"
                strokeWidth="1.5"
              />

              {/* Cockpit Canopy / Stealth Glass */}
              <path
                d="M 375,260 L 460,205 L 585,205 L 720,280 L 670,285 L 565,225 L 435,225 L 360,285 Z"
                fill="#050508"
                stroke="rgba(6,182,212,0.4)"
                strokeWidth="1"
              />

              {/* Front Splitter Carbon Fiber Wing */}
              <path
                d="M 40,385 L 140,370 L 240,370 L 260,395 L 40,395 Z"
                fill="#121214"
                stroke="#E5A823"
                strokeWidth="1"
              />

              {/* Rear Aerodynamic Gurney Wing */}
              <path
                d="M 860,310 L 960,310 L 970,330 L 850,330 Z"
                fill="#121214"
                stroke="#E5A823"
                strokeWidth="1.5"
              />

              {/* Glowing Signature Y-Shaped Headlights (Left & Right) */}
              <g filter="url(#glow)">
                {/* Left Y-Light */}
                <path
                  d="M 170,345 L 235,340 M 235,340 L 275,325 M 235,340 L 270,355"
                  stroke="url(#goldHighlight)"
                  strokeWidth="3.5"
                  strokeLinecap="round"
                />
                {/* Front Intake Accent */}
                <line x1="120" y1="375" x2="240" y2="375" stroke="#FFE599" strokeWidth="2" strokeOpacity="0.8" />
              </g>

              {/* Massive Center-Lock Wheels & Calipers */}
              {/* Front Wheel */}
              <circle cx="210" cy="380" r="56" fill="#0a0a0d" stroke="#33333b" strokeWidth="4" />
              <circle cx="210" cy="380" r="38" fill="#141418" stroke="#52525b" strokeWidth="2" />
              <path d="M 230,350 L 245,365 L 235,385" stroke="#E5A823" strokeWidth="4" fill="none" />

              {/* Rear Wheel */}
              <circle cx="780" cy="380" r="58" fill="#0a0a0d" stroke="#33333b" strokeWidth="4" />
              <circle cx="780" cy="380" r="40" fill="#141418" stroke="#52525b" strokeWidth="2" />
              <path d="M 800,350 L 815,365 L 805,385" stroke="#E5A823" strokeWidth="4" fill="none" />

              {/* Dynamic Airflow Streaks */}
              <path
                d="M 20,380 Q 250,330 460,200 T 980,310"
                stroke="rgba(229, 168, 35, 0.2)"
                strokeDasharray="8 12"
                strokeWidth="1"
              />
            </svg>

            {/* Glowing Floor Horizon Flare */}
            <div className="absolute bottom-6 w-3/4 h-[2px] bg-gradient-to-r from-transparent via-[#E5A823]/70 to-transparent blur-[1px]" />
          </div>
        </div>
      </div>

      {/* Top Editorial Headline Hierarchy */}
      <div className="relative z-20 max-w-4xl pt-6 sm:pt-10">
        <div className="inline-flex items-center gap-2 px-3 py-1 mb-4 bg-white/5 border border-white/10 backdrop-blur-md">
          <span className="w-1.5 h-1.5 bg-[#E5A823] rotate-45" />
          <span className="text-[10px] sm:text-xs font-mono tracking-[0.2em] text-[#E5A823] uppercase">
            Sant'Agata Bolognese · Flagship Architecture
          </span>
        </div>

        <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-display font-extrabold tracking-tight leading-[0.95] text-white">
          UNLEASH THE <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-zinc-200 to-[#E5A823]">
            IMPOSSIBLE
          </span>
        </h1>

        <p className="mt-4 sm:mt-6 text-base sm:text-lg md:text-xl text-zinc-300 font-sans max-w-xl leading-relaxed">
          Engineering emotion at the limits of performance.
        </p>

        {/* Action Buttons */}
        <div className="mt-8 sm:mt-10 flex flex-wrap items-center gap-4">
          <button
            onClick={onExploreClick}
            className="group px-7 py-3.5 bg-[#E5A823] hover:bg-white text-black font-semibold text-xs tracking-[0.18em] uppercase transition-all duration-200 flex items-center gap-3 shadow-[0_0_30px_rgba(229,168,35,0.4)]"
          >
            <span>EXPLORE THE MACHINE</span>
            <ChevronRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </button>

          <button
            onClick={onConfiguratorClick}
            className="px-7 py-3.5 bg-black/60 hover:bg-white/10 text-white border border-white/20 hover:border-white/50 text-xs font-semibold tracking-[0.18em] uppercase backdrop-blur-md transition-all duration-200"
          >
            BUILD YOUR LAMBORGHINI
          </button>

          <button
            onClick={triggerSound}
            className="p-3.5 bg-white/5 hover:bg-white/15 border border-white/15 text-zinc-300 hover:text-[#E5A823] transition-colors"
            title="Acoustic Engine Roar"
            aria-label="Play V10 engine roar"
          >
            <Volume2 className={`w-4 h-4 ${isEngineSounding ? 'text-[#E5A823] animate-pulse' : ''}`} />
          </button>
        </div>
      </div>

      {/* Bottom Technical HUD Overlay (Prompt requirement: V10, 630 CV, 0-100 KM/H, TOP SPEED) */}
      <div className="relative z-20 pt-16 flex flex-col md:flex-row md:items-end justify-between gap-6 border-t border-white/10">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 sm:gap-10">
          <div className="space-y-1">
            <span className="text-[10px] font-mono tracking-widest text-zinc-400 uppercase block">Engine Architecture</span>
            <div className="text-2xl sm:text-3xl font-display font-extrabold text-white">
              {hudLoaded ? 'V10' : '---'}
            </div>
            <span className="text-[11px] text-zinc-400 font-sans block">90° Naturally Aspirated</span>
          </div>

          <div className="space-y-1">
            <span className="text-[10px] font-mono tracking-widest text-zinc-400 uppercase block">Power Output</span>
            <div className="text-2xl sm:text-3xl font-display font-extrabold text-[#E5A823] font-mono-num">
              {hudLoaded ? '630 CV' : '0 CV'}
            </div>
            <span className="text-[11px] text-zinc-400 font-sans block">470 kW @ 8,000 RPM</span>
          </div>

          <div className="space-y-1">
            <span className="text-[10px] font-mono tracking-widest text-zinc-400 uppercase block">0–100 KM/H</span>
            <div className="text-2xl sm:text-3xl font-display font-extrabold text-white font-mono-num">
              {hudLoaded ? '3.0 SEC' : '0.0 SEC'}
            </div>
            <span className="text-[11px] text-zinc-400 font-sans block">Launch Control Enabled</span>
          </div>

          <div className="space-y-1">
            <span className="text-[10px] font-mono tracking-widest text-zinc-400 uppercase block">Top Speed</span>
            <div className="text-2xl sm:text-3xl font-display font-extrabold text-white font-mono-num">
              {hudLoaded ? '325 KM/H' : '0 KM/H'}
            </div>
            <span className="text-[11px] text-zinc-400 font-sans block">202 MPH Aerodynamic</span>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="hidden md:flex items-center gap-3 text-xs font-mono text-zinc-400 tracking-widest uppercase">
          <span>Scroll to Inspect</span>
          <ArrowDown className="w-4 h-4 text-[#E5A823] animate-bounce" />
        </div>
      </div>
    </section>
  );
};
