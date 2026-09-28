import React, { useState } from 'react';
import { CAR_MODELS } from '../../data/models';
import { CarModel } from '../../types/automotive';
import { Sliders, CheckCircle2, ChevronRight, Activity } from 'lucide-react';

export const SpecificationsSection: React.FC = () => {
  const [selectedModelId, setSelectedModelId] = useState<string>('revuelto');

  const model = CAR_MODELS.find((m) => m.id === selectedModelId) || CAR_MODELS[0];

  return (
    <section id="specifications" className="relative py-28 bg-[#040407] text-white border-t border-white/10">
      <div className="max-w-7xl mx-auto px-6 sm:px-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div>
            <div className="inline-flex items-center gap-2 mb-3">
              <span className="w-1.5 h-1.5 bg-[#E5A823]" />
              <span className="text-xs font-mono tracking-[0.25em] text-[#E5A823] uppercase">
                Technical Blueprint
              </span>
            </div>
            <h2 className="text-4xl sm:text-6xl font-display font-extrabold tracking-tight text-white leading-none">
              SPECIFICATION MATRIX
            </h2>
          </div>

          {/* Model Switcher Tabs */}
          <div className="flex items-center gap-1 p-1 bg-black/80 border border-white/15 overflow-x-auto max-w-full">
            {CAR_MODELS.map((m) => (
              <button
                key={m.id}
                onClick={() => setSelectedModelId(m.id)}
                className={`px-4 py-2 text-xs font-mono font-bold tracking-wider uppercase transition-colors whitespace-nowrap ${
                  selectedModelId === m.id
                    ? 'bg-[#E5A823] text-black shadow-md'
                    : 'text-zinc-400 hover:text-white hover:bg-white/5'
                }`}
              >
                {m.name}
              </button>
            ))}
          </div>
        </div>

        {/* Animated Data Dashboard (Prompt requirements: Engine, Power, Torque, Transmission, Drive, 0-100 km/h, Top Speed, Weight, Dimensions) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left: Key Metrics Showcase */}
          <div className="lg:col-span-8 bg-[#08080c] border border-white/10 p-6 sm:p-10 shadow-2xl">
            <div className="flex items-center justify-between pb-6 border-b border-white/10">
              <div>
                <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest">{model.category}</span>
                <h3 className="text-3xl font-display font-black text-white">{model.name}</h3>
              </div>
              <span className="text-sm font-mono text-[#E5A823] font-bold">
                From ${model.startingPriceUSD.toLocaleString()} USD
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-6">
              {/* Engine */}
              <div className="p-4 bg-black/40 border border-white/5 space-y-1">
                <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest block">
                  Engine Architecture
                </span>
                <span className="text-base font-bold text-white font-display">{model.engineDisplacement}</span>
              </div>

              {/* Power */}
              <div className="p-4 bg-black/40 border border-white/5 space-y-1">
                <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest block">Power Output</span>
                <span className="text-2xl font-bold text-[#E5A823] font-mono-num">{model.powerCV} CV</span>
                <span className="text-xs text-zinc-400 block font-mono">Total System HP</span>
              </div>

              {/* Torque */}
              <div className="p-4 bg-black/40 border border-white/5 space-y-1">
                <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest block">Max Torque</span>
                <span className="text-2xl font-bold text-white font-mono-num">{model.torqueNm} Nm</span>
                <span className="text-xs text-zinc-400 block font-mono">Combined ICE + E-Torque</span>
              </div>

              {/* Transmission */}
              <div className="p-4 bg-black/40 border border-white/5 space-y-1">
                <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest block">Transmission</span>
                <span className="text-sm font-bold text-white">{model.transmission}</span>
              </div>

              {/* Drive */}
              <div className="p-4 bg-black/40 border border-white/5 space-y-1">
                <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest block">Drivetrain</span>
                <span className="text-sm font-bold text-white">{model.driveType}</span>
              </div>

              {/* 0-100 & Top Speed */}
              <div className="p-4 bg-black/40 border border-white/5 grid grid-cols-2 gap-2">
                <div>
                  <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest block">0–100 KM/H</span>
                  <span className="text-2xl font-bold text-white font-mono-num">{model.acceleration0To100}s</span>
                </div>
                <div>
                  <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest block">Top Speed</span>
                  <span className="text-2xl font-bold text-white font-mono-num">{model.topSpeedKmH} km/h</span>
                </div>
              </div>
            </div>

            {/* Dry Weight Gauge */}
            <div className="mt-8 pt-6 border-t border-white/10">
              <div className="flex justify-between items-center text-xs font-mono mb-2">
                <span className="text-zinc-400 uppercase">Kerb Weight / Mass Ratio</span>
                <span className="text-white font-mono-num font-bold">
                  {model.weightKg} kg · {(model.weightKg / model.powerCV).toFixed(2)} kg/CV
                </span>
              </div>
              <div className="w-full h-2 bg-zinc-800 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-emerald-500 to-[#E5A823]"
                  style={{ width: `${Math.min(100, (model.weightKg / 2600) * 100)}%` }}
                />
              </div>
            </div>
          </div>

          {/* Right: Architectural Dimensions Blueprint */}
          <div className="lg:col-span-4 bg-[#08080c] border border-white/10 p-6 sm:p-8 space-y-6">
            <span className="text-[10px] font-mono tracking-widest text-[#E5A823] uppercase block">
              Dimensional Blueprint
            </span>

            {/* Visual Vector Wireframe */}
            <div className="py-4 border-y border-white/10 flex items-center justify-center">
              <svg viewBox="0 0 280 120" className="w-full max-w-[240px]" fill="none">
                <rect x="20" y="30" width="240" height="60" stroke="#3f3f46" strokeDasharray="3 3" />
                <path d="M 30,75 L 70,55 L 140,40 L 210,40 L 250,75 Z" stroke="#E5A823" strokeWidth="1.5" />
                <circle cx="70" cy="75" r="14" stroke="#71717a" strokeWidth="2" />
                <circle cx="210" cy="75" r="14" stroke="#71717a" strokeWidth="2" />
                <line x1="20" y1="100" x2="260" y2="100" stroke="#71717a" strokeWidth="1" />
                <text x="140" y="112" fill="#a1a1aa" fontSize="9" fontFamily="monospace" textAnchor="middle">
                  Length: {model.dimensions.lengthMm} mm
                </text>
              </svg>
            </div>

            <div className="space-y-3 text-xs font-mono">
              <div className="flex justify-between py-1.5 border-b border-white/5">
                <span className="text-zinc-500">Overall Length</span>
                <span className="font-bold text-white font-mono-num">{model.dimensions.lengthMm} mm</span>
              </div>
              <div className="flex justify-between py-1.5 border-b border-white/5">
                <span className="text-zinc-500">Overall Width (excl. mirrors)</span>
                <span className="font-bold text-white font-mono-num">{model.dimensions.widthMm} mm</span>
              </div>
              <div className="flex justify-between py-1.5 border-b border-white/5">
                <span className="text-zinc-500">Overall Height</span>
                <span className="font-bold text-white font-mono-num">{model.dimensions.heightMm} mm</span>
              </div>
              <div className="flex justify-between py-1.5 border-b border-white/5">
                <span className="text-zinc-500">Wheelbase</span>
                <span className="font-bold text-white font-mono-num">{model.dimensions.wheelbaseMm} mm</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
