import React, { useState, useEffect, useRef } from 'react';
import { Power, Volume2, VolumeX, Flame, Gauge, Zap } from 'lucide-react';
import { audioEngine } from '../../utils/audioEngine';

export const SoundExperienceSection: React.FC = () => {
  const [isRunning, setIsRunning] = useState(false);
  const [rpm, setRpm] = useState(900);
  const [isThrottling, setIsThrottling] = useState(false);
  const [shakeIntensity, setShakeIntensity] = useState(0);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animFrameRef = useRef<number | null>(null);

  // Engine start / stop
  const toggleEngine = () => {
    if (!isRunning) {
      const started = audioEngine.start();
      setIsRunning(true);
      setRpm(1200);
      audioEngine.setRpm(1200);
      setTimeout(() => {
        setRpm(900);
        audioEngine.setRpm(900);
      }, 500);
    } else {
      audioEngine.stop();
      setIsRunning(false);
      setRpm(0);
      setShakeIntensity(0);
    }
  };

  // Throttle hold / revving
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isRunning && isThrottling) {
      interval = setInterval(() => {
        setRpm((prev) => {
          const next = Math.min(8500, prev + 240);
          audioEngine.setRpm(next);
          setShakeIntensity(Math.min(10, ((next - 2000) / 6500) * 10));
          return next;
        });
      }, 30);
    } else if (isRunning && !isThrottling) {
      interval = setInterval(() => {
        setRpm((prev) => {
          if (prev <= 950) {
            setShakeIntensity(0);
            return 900;
          }
          const next = Math.max(900, prev - 380);
          audioEngine.setRpm(next);
          setShakeIntensity(Math.max(0, ((next - 2000) / 6500) * 10));
          return next;
        });
      }, 30);
    }

    return () => clearInterval(interval);
  }, [isRunning, isThrottling]);

  // Waveform visualization canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = (canvas.width = canvas.clientWidth);
    let height = (canvas.height = canvas.clientHeight);

    let phase = 0;
    const drawWave = () => {
      animFrameRef.current = requestAnimationFrame(drawWave);
      width = canvas.width = canvas.clientWidth;
      height = canvas.height = canvas.clientHeight;

      ctx.fillStyle = '#060609';
      ctx.fillRect(0, 0, width, height);

      // Center reference line
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.08)';
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(0, height / 2);
      ctx.lineTo(width, height / 2);
      ctx.stroke();

      if (!isRunning) {
        // Idle flat line
        ctx.strokeStyle = '#3f3f46';
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.moveTo(0, height / 2);
        ctx.lineTo(width, height / 2);
        ctx.stroke();
        return;
      }

      phase += 0.05 + (rpm / 8500) * 0.15;

      const numPoints = 120;
      const step = width / numPoints;
      const amp = ((rpm - 500) / 8000) * (height * 0.38) + 8;

      ctx.beginPath();
      for (let i = 0; i <= numPoints; i++) {
        const x = i * step;
        // V10 harmonic wave synthesis
        const f1 = Math.sin(i * 0.18 + phase);
        const f2 = Math.sin(i * 0.36 + phase * 2) * 0.5;
        const f3 = Math.sin(i * 0.09 - phase * 0.5) * 0.3;
        const noise = (Math.random() - 0.5) * (rpm > 6000 ? 12 : 3);
        const y = height / 2 + (f1 + f2 + f3) * amp + noise;

        if (i === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }

      ctx.strokeStyle = rpm > 7200 ? '#ef4444' : '#E5A823';
      ctx.lineWidth = 2.5;
      ctx.shadowColor = rpm > 7200 ? 'rgba(239, 68, 68, 0.8)' : 'rgba(229, 168, 35, 0.8)';
      ctx.shadowBlur = 15;
      ctx.stroke();
      ctx.shadowBlur = 0;
    };

    drawWave();

    return () => {
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    };
  }, [isRunning, rpm]);

  // Tachometer needle angle
  const needleAngle = -120 + ((isRunning ? rpm : 0) / 9000) * 240;

  return (
    <section
      id="sound"
      className="relative py-28 bg-[#050508] text-white border-t border-white/10 overflow-hidden"
      style={{
        transform: `translate(${(Math.random() - 0.5) * shakeIntensity}px, ${(Math.random() - 0.5) * shakeIntensity}px)`,
        transition: 'transform 0.05s linear',
      }}
    >
      <div className="absolute inset-0 carbon-pattern opacity-40 pointer-events-none" />

      {/* Atmospheric exhaust heat glow */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] rounded-full blur-[160px] pointer-events-none transition-opacity duration-300"
        style={{
          backgroundColor: rpm > 7000 ? 'rgba(239, 68, 68, 0.18)' : 'rgba(229, 168, 35, 0.12)',
        }}
      />

      <div className="relative max-w-7xl mx-auto px-6 sm:px-10">
        {/* Section Header (Prompt requirement: HEAR THE POWER) */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 mb-3">
            <span className="w-1.5 h-1.5 bg-[#E5A823]" />
            <span className="text-xs font-mono tracking-[0.25em] text-[#E5A823] uppercase">
              Acoustic Resonance Architecture
            </span>
          </div>

          <h2 className="text-4xl sm:text-6xl lg:text-7xl font-display font-extrabold tracking-tight text-white leading-none">
            HEAR THE POWER
          </h2>
          <p className="mt-4 text-sm sm:text-base text-zinc-400 font-sans leading-relaxed">
            Synthesized firing acoustics of the naturally aspirated Sant'Agata V10.
            Ignite the combustion chamber and engage the throttle.
          </p>
        </div>

        {/* Central Cockpit Cluster */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          {/* Left: Interactive Tachometer Gauge */}
          <div className="lg:col-span-5 flex flex-col items-center">
            <div className="relative w-72 h-72 sm:w-80 sm:h-80 rounded-full border-4 border-zinc-800 bg-[#08080d] shadow-2xl flex items-center justify-center p-6">
              {/* Dial markings */}
              <svg viewBox="0 0 200 200" className="w-full h-full absolute inset-0">
                {/* Dial ticks */}
                {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((val) => {
                  const deg = -120 + (val / 9) * 240;
                  const rad = (deg * Math.PI) / 180;
                  const x1 = 100 + Math.cos(rad) * 80;
                  const y1 = 100 + Math.sin(rad) * 80;
                  const x2 = 100 + Math.cos(rad) * 68;
                  const y2 = 100 + Math.sin(rad) * 68;
                  const isRedline = val >= 8;
                  return (
                    <g key={val}>
                      <line
                        x1={x1}
                        y1={y1}
                        x2={x2}
                        y2={y2}
                        stroke={isRedline ? '#ef4444' : '#a1a1aa'}
                        strokeWidth={isRedline ? 3 : 2}
                      />
                      <text
                        x={100 + Math.cos(rad) * 54}
                        y={104 + Math.sin(rad) * 54}
                        fill={isRedline ? '#ef4444' : '#e4e4e7'}
                        fontSize="9"
                        fontFamily="monospace"
                        fontWeight="bold"
                        textAnchor="middle"
                      >
                        {val}
                      </text>
                    </g>
                  );
                })}

                {/* Rotating Needle */}
                <line
                  x1="100"
                  y1="100"
                  x2={100 + Math.cos((needleAngle * Math.PI) / 180) * 75}
                  y2={100 + Math.sin((needleAngle * Math.PI) / 180) * 75}
                  stroke={rpm > 7500 ? '#ef4444' : '#E5A823'}
                  strokeWidth="3.5"
                  strokeLinecap="round"
                />
                <circle cx="100" cy="100" r="8" fill="#18181b" stroke="#E5A823" strokeWidth="2" />
              </svg>

              {/* Digital Readout Center */}
              <div className="relative z-10 text-center mt-16">
                <span className="text-[10px] font-mono tracking-widest text-zinc-500 uppercase block">
                  1/min x 1000
                </span>
                <span
                  className={`text-3xl font-display font-extrabold font-mono-num ${
                    rpm > 7500 ? 'text-red-500 animate-pulse' : 'text-white'
                  }`}
                >
                  {isRunning ? rpm.toLocaleString() : 'OFF'}
                </span>
                <span className="text-[10px] font-mono text-[#E5A823] block">
                  {isRunning ? (rpm > 7500 ? 'REDLINE LIMITER' : 'V10 ACTIVE') : 'STANDBY'}
                </span>
              </div>
            </div>

            {/* Hold to Throttle Button */}
            <div className="mt-8 w-full max-w-xs">
              <button
                disabled={!isRunning}
                onMouseDown={() => setIsThrottling(true)}
                onMouseUp={() => setIsThrottling(false)}
                onTouchStart={() => setIsThrottling(true)}
                onTouchEnd={() => setIsThrottling(false)}
                className={`w-full py-4 font-mono font-bold text-xs tracking-widest uppercase transition-all duration-150 border select-none ${
                  !isRunning
                    ? 'opacity-40 cursor-not-allowed bg-zinc-900 border-zinc-800 text-zinc-500'
                    : isThrottling
                    ? 'bg-red-600 border-red-500 text-white shadow-[0_0_30px_rgba(239,68,68,0.7)] scale-98'
                    : 'bg-[#E5A823] hover:bg-white text-black border-[#E5A823] hover:border-white shadow-[0_0_20px_rgba(229,168,35,0.4)]'
                }`}
              >
                {isThrottling ? 'THROTTLE WIDE OPEN (8,500 RPM)' : 'HOLD TO REV THROTTLE'}
              </button>
            </div>
          </div>

          {/* Right: Giant Circular START ENGINE Control & Waveform Display */}
          <div className="lg:col-span-7 space-y-6">
            {/* Waveform Realtime Visualizer */}
            <div className="p-6 bg-[#08080c] border border-white/10 shadow-xl">
              <div className="flex items-center justify-between pb-3 border-b border-white/10 text-xs font-mono">
                <span className="text-zinc-400">ACOUSTIC OSCILLOSCOPE SPECTRUM</span>
                <span className="text-[#E5A823]">{isRunning ? '44.1 kHz REAL-TIME SYNTHESIS' : 'SIGNAL DORMANT'}</span>
              </div>
              <div className="h-44 w-full mt-3">
                <canvas ref={canvasRef} className="w-full h-full block" />
              </div>
            </div>

            {/* Giant Circular Start Engine Button (Prompt requirement) */}
            <div className="p-8 bg-[#09090d] border border-white/10 flex flex-col sm:flex-row items-center justify-between gap-6">
              <div>
                <span className="text-[10px] font-mono tracking-widest text-[#E5A823] uppercase block mb-1">
                  Ignition Control
                </span>
                <h4 className="text-2xl font-display font-bold text-white">START / STOP ENGINE</h4>
                <p className="text-xs text-zinc-400 max-w-sm mt-1">
                  Toggle the ignition cover to awaken the naturally aspirated 10-cylinder firing bank.
                </p>
              </div>

              {/* Large Interactive Circular Control */}
              <button
                onClick={toggleEngine}
                className={`relative w-28 h-28 rounded-full border-4 flex flex-col items-center justify-center transition-all duration-300 shadow-2xl group ${
                  isRunning
                    ? 'bg-red-600/20 border-red-500 shadow-[0_0_35px_rgba(239,68,68,0.6)]'
                    : 'bg-[#E5A823]/10 border-[#E5A823] hover:bg-[#E5A823]/25 shadow-[0_0_35px_rgba(229,168,35,0.4)]'
                }`}
                aria-label="Toggle start engine"
              >
                <Power className={`w-8 h-8 mb-1 ${isRunning ? 'text-red-500 animate-pulse' : 'text-[#E5A823]'}`} />
                <span className="text-[9px] font-mono font-black tracking-widest uppercase text-white">
                  {isRunning ? 'STOP' : 'START'}
                </span>
                <span className="text-[8px] font-mono text-zinc-400 uppercase">ENGINE</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
