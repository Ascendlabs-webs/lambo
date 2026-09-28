import React, { useState } from 'react';
import { CAR_MODELS } from '../../data/models';
import { CarModel } from '../../types/automotive';
import { ArrowUpRight, Gauge, Zap, Flame, Shield, ChevronRight } from 'lucide-react';

interface ModelsPageProps {
  onSelectModel: (id: string) => void;
  onOpenConfigurator: (id: string) => void;
}

export const ModelsPage: React.FC<ModelsPageProps> = ({ onSelectModel, onOpenConfigurator }) => {
  const [filter, setFilter] = useState<'ALL' | 'HPEV' | 'HYBRID' | 'SUV' | 'V10'>('ALL');

  const filtered = CAR_MODELS.filter((m) => {
    if (filter === 'ALL') return true;
    if (filter === 'HPEV') return m.category.includes('HPEV');
    if (filter === 'HYBRID') return m.category.includes('HYBRID');
    if (filter === 'SUV') return m.category.includes('SUV');
    if (filter === 'V10') return m.category.includes('V10');
    return true;
  });

  return (
    <div className="min-h-screen bg-[#030305] text-white pt-28 pb-20 px-6 sm:px-12">
      <div className="max-w-7xl mx-auto">
        {/* Page Header */}
        <div className="border-b border-white/10 pb-10 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <span className="text-xs font-mono tracking-[0.25em] text-[#E5A823] uppercase block mb-2">
              Automobili Lamborghini Lineup
            </span>
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-display font-extrabold tracking-tight text-white leading-none">
              THE MACHINES
            </h1>
          </div>

          {/* Interactive filter tabs (per frontend-design constitution: functional buttons with click handlers) */}
          <div className="flex items-center gap-1.5 p-1 bg-white/5 border border-white/10">
            {(['ALL', 'HPEV', 'HYBRID', 'SUV', 'V10'] as const).map((cat) => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={`px-3 py-1.5 text-xs font-mono font-bold tracking-wider uppercase transition-colors ${
                  filter === cat ? 'bg-[#E5A823] text-black shadow-sm' : 'text-zinc-400 hover:text-white'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Models Editorial List (Large Editorial Layouts per prompt requirement) */}
        <div className="mt-12 space-y-12">
          {filtered.map((car, idx) => (
            <div
              key={car.id}
              className="group bg-[#08080c] border border-white/10 hover:border-[#E5A823]/80 p-8 sm:p-12 transition-all duration-300 relative overflow-hidden"
            >
              {/* Dynamic top accent */}
              <div
                className="absolute top-0 left-0 right-0 h-[2px] opacity-70 group-hover:opacity-100 transition-opacity"
                style={{ backgroundColor: car.accentColor }}
              />

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
                <div className="lg:col-span-7 space-y-4">
                  <div className="flex items-center gap-3">
                    <span className="text-[11px] font-mono tracking-widest text-[#E5A823] uppercase">
                      {car.category}
                    </span>
                    <span className="text-zinc-600">·</span>
                    <span className="text-xs font-mono text-zinc-400">
                      Starting from ${car.startingPriceUSD.toLocaleString()} USD
                    </span>
                  </div>

                  <h2 className="text-4xl sm:text-5xl lg:text-6xl font-display font-black text-white group-hover:text-[#E5A823] transition-colors tracking-tight">
                    {car.name}
                  </h2>

                  <p className="text-sm sm:text-base text-zinc-300 font-sans max-w-xl leading-relaxed">
                    {car.description}
                  </p>

                  {/* Specs Matrix */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-4 border-t border-white/10">
                    <div className="p-3 bg-black/50 border border-white/5">
                      <span className="text-[10px] font-mono text-zinc-500 uppercase block">Power</span>
                      <span className="text-lg font-bold text-white font-mono-num">{car.powerCV} CV</span>
                    </div>
                    <div className="p-3 bg-black/50 border border-white/5">
                      <span className="text-[10px] font-mono text-zinc-500 uppercase block">0–100 km/h</span>
                      <span className="text-lg font-bold text-[#E5A823] font-mono-num">{car.acceleration0To100}s</span>
                    </div>
                    <div className="p-3 bg-black/50 border border-white/5">
                      <span className="text-[10px] font-mono text-zinc-500 uppercase block">Top Speed</span>
                      <span className="text-lg font-bold text-white font-mono-num">{car.topSpeedKmH} km/h</span>
                    </div>
                    <div className="p-3 bg-black/50 border border-white/5">
                      <span className="text-[10px] font-mono text-zinc-500 uppercase block">Dry Mass</span>
                      <span className="text-lg font-bold text-white font-mono-num">{car.weightKg} kg</span>
                    </div>
                  </div>

                  <div className="pt-6 flex flex-wrap gap-4">
                    <button
                      onClick={() => onSelectModel(car.id)}
                      className="px-6 py-3 bg-white text-black font-semibold text-xs tracking-widest uppercase hover:bg-[#E5A823] transition-colors flex items-center gap-2"
                    >
                      <span>Explore Dossier</span>
                      <ChevronRight className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => onOpenConfigurator(car.id)}
                      className="px-6 py-3 bg-white/5 hover:bg-white/15 text-white border border-white/20 text-xs font-mono font-bold tracking-widest uppercase transition-colors"
                    >
                      Configure Vehicle
                    </button>
                  </div>
                </div>

                {/* Stylized Mechanical Artwork Canvas */}
                <div className="lg:col-span-5 flex items-center justify-center p-8 bg-black/60 border border-white/5 relative">
                  <div
                    className="absolute inset-0 rounded-full blur-[90px] opacity-20 pointer-events-none"
                    style={{ backgroundColor: car.accentColor }}
                  />
                  <svg viewBox="0 0 400 180" className="w-full max-h-56 relative z-10" fill="none">
                    <path
                      d="M 20,130 L 70,110 L 160,70 L 230,70 L 320,105 L 380,130 Z"
                      fill="#121218"
                      stroke={car.accentColor}
                      strokeWidth="2"
                    />
                    <path d="M 110,110 L 160,75 L 230,75 L 280,105 Z" fill="rgba(6,182,212,0.35)" />
                    <circle cx="85" cy="130" r="26" stroke="#52525b" strokeWidth="4" fill="#09090c" />
                    <circle cx="315" cy="130" r="26" stroke="#52525b" strokeWidth="4" fill="#09090c" />
                    <line x1="260" y1="95" x2="375" y2="95" stroke={car.accentColor} strokeWidth="2.5" />
                  </svg>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
