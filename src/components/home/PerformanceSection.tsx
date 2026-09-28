import React, { useEffect, useState, useRef } from 'react';
import { Zap, Activity, Flame, ShieldAlert, ChevronRight } from 'lucide-react';

export const PerformanceSection: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);

  // Animated counters
  const [power, setPower] = useState(0);
  const [accel, setAccel] = useState(0.0);
  const [topSpeed, setTopSpeed] = useState(0);
  const [torque, setTorque] = useState(0);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
        }
      },
      { threshold: 0.25 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!inView) return;

    // Power counter 0 -> 630
    let startTimestamp: number | null = null;
    const duration = 1800; // ms

    const step = (timestamp: number) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      const easeProgress = 1 - Math.pow(1 - progress, 3); // cubic ease out

      setPower(Math.floor(easeProgress * 630));
      setAccel(parseFloat((easeProgress * 3.0).toFixed(1)));
      setTopSpeed(Math.floor(easeProgress * 325));
      setTorque(Math.floor(easeProgress * 740));

      if (progress < 1) {
        requestAnimationFrame(step);
      }
    };

    requestAnimationFrame(step);
  }, [inView]);

  return (
    <section
      ref={sectionRef}
      id="performance"
      className="relative py-28 bg-[#030304] text-white border-t border-white/10 overflow-hidden"
    >
      {/* Background Subtle Carbon Weave */}
      <div className="absolute inset-0 carbon-pattern opacity-50 pointer-events-none" />

      {/* Dramatic Horizontal Flow Lines */}
      <div className="absolute top-1/2 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-6 sm:px-10">
        {/* Massive Editorial Title */}
        <div className="mb-20">
          <div className="inline-flex items-center gap-2 mb-3">
            <span className="w-1.5 h-1.5 bg-[#E5A823]" />
            <span className="text-xs font-mono tracking-[0.25em] text-[#E5A823] uppercase">
              Benchmark Telemetry
            </span>
          </div>

          <h2 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-display font-extrabold tracking-tight text-white leading-none">
            BUILT TO DEFY LIMITS
          </h2>
          <p className="mt-4 text-base sm:text-lg text-zinc-400 font-sans max-w-2xl leading-relaxed">
            Every millimeter is sculptured for physical supremacy. Power delivered without delay,
            downforce calibrated in millibar increments, and throttle response measured in milliseconds.
          </p>
        </div>

        {/* Oversized Performance Metrics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* 630 CV */}
          <div className="p-8 bg-[#09090d] border border-white/10 hover:border-[#E5A823]/60 transition-all duration-300 relative group">
            <div className="flex justify-between items-center text-xs font-mono text-zinc-400 mb-6">
              <span className="tracking-widest uppercase">Power Rating</span>
              <Zap className="w-4 h-4 text-[#E5A823]" />
            </div>

            <div className="text-5xl sm:text-6xl lg:text-7xl font-display font-black text-white group-hover:text-[#E5A823] transition-colors font-mono-num">
              {power} <span className="text-2xl font-light text-zinc-400">CV</span>
            </div>

            <div className="mt-6 pt-4 border-t border-white/10 text-xs text-zinc-400 font-sans">
              470 kW peak at 8,000 RPM naturally aspirated with high-volume titanium exhaust runner.
            </div>

            {/* Accent bottom line */}
            <div className="absolute bottom-0 left-0 h-[2px] w-0 group-hover:w-full bg-[#E5A823] transition-all duration-500" />
          </div>

          {/* 0-100 KM/H in 3.0 SEC */}
          <div className="p-8 bg-[#09090d] border border-white/10 hover:border-[#E5A823]/60 transition-all duration-300 relative group">
            <div className="flex justify-between items-center text-xs font-mono text-zinc-400 mb-6">
              <span className="tracking-widest uppercase">Acceleration</span>
              <Activity className="w-4 h-4 text-[#E5A823]" />
            </div>

            <div className="text-5xl sm:text-6xl lg:text-7xl font-display font-black text-white group-hover:text-[#E5A823] transition-colors font-mono-num">
              {accel.toFixed(1)} <span className="text-2xl font-light text-zinc-400">SEC</span>
            </div>

            <div className="mt-6 pt-4 border-t border-white/10 text-xs text-zinc-400 font-sans">
              0–100 km/h sprint launch via dual-clutch transmission and electronic launch clutch lock.
            </div>

            <div className="absolute bottom-0 left-0 h-[2px] w-0 group-hover:w-full bg-[#E5A823] transition-all duration-500" />
          </div>

          {/* 325 KM/H TOP SPEED */}
          <div className="p-8 bg-[#09090d] border border-white/10 hover:border-[#E5A823]/60 transition-all duration-300 relative group">
            <div className="flex justify-between items-center text-xs font-mono text-zinc-400 mb-6">
              <span className="tracking-widest uppercase">Max Velocity</span>
              <Flame className="w-4 h-4 text-[#E5A823]" />
            </div>

            <div className="text-5xl sm:text-6xl lg:text-7xl font-display font-black text-white group-hover:text-[#E5A823] transition-colors font-mono-num">
              {topSpeed} <span className="text-2xl font-light text-zinc-400">KM/H</span>
            </div>

            <div className="mt-6 pt-4 border-t border-white/10 text-xs text-zinc-400 font-sans">
              Terminal velocity balanced with 415 kg of active aerodynamic ground effect downforce.
            </div>

            <div className="absolute bottom-0 left-0 h-[2px] w-0 group-hover:w-full bg-[#E5A823] transition-all duration-500" />
          </div>

          {/* 740 NM TORQUE */}
          <div className="p-8 bg-[#09090d] border border-white/10 hover:border-[#E5A823]/60 transition-all duration-300 relative group">
            <div className="flex justify-between items-center text-xs font-mono text-zinc-400 mb-6">
              <span className="tracking-widest uppercase">Max Torque</span>
              <ShieldAlert className="w-4 h-4 text-[#E5A823]" />
            </div>

            <div className="text-5xl sm:text-6xl lg:text-7xl font-display font-black text-white group-hover:text-[#E5A823] transition-colors font-mono-num">
              {torque} <span className="text-2xl font-light text-zinc-400">NM</span>
            </div>

            <div className="mt-6 pt-4 border-t border-white/10 text-xs text-zinc-400 font-sans">
              Instant torque distribution across all-wheel vectoring drive for explosive apex exit speed.
            </div>

            <div className="absolute bottom-0 left-0 h-[2px] w-0 group-hover:w-full bg-[#E5A823] transition-all duration-500" />
          </div>
        </div>

        {/* Dynamic Horizontal Runway Graphic */}
        <div className="mt-16 p-6 bg-gradient-to-r from-black via-white/[0.03] to-black border border-white/10 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <span className="px-3 py-1 bg-[#E5A823] text-black font-mono font-bold text-xs uppercase">
              STRADA / SPORT / CORSA
            </span>
            <span className="text-xs text-zinc-400 font-mono">Dynamic drive mode selector changes steering, damping, and throttle mapping</span>
          </div>

          <div className="flex items-center gap-6 text-xs font-mono text-zinc-400">
            <span>Lateral G-Force: <strong className="text-white font-mono-num">1.45 g</strong></span>
            <span>Braking 100-0: <strong className="text-white font-mono-num">31.5 m</strong></span>
          </div>
        </div>
      </div>
    </section>
  );
};
