import React, { useState } from 'react';
import { CAR_MODELS } from '../../data/models';
import { CarModel } from '../../types/automotive';
import { ArrowUpRight, Gauge, Zap, Flame, Compass } from 'lucide-react';

interface ModelShowcaseSectionProps {
  onSelectModel: (modelId: string) => void;
  onOpenConfiguratorForModel: (modelId: string) => void;
}

export const ModelShowcaseSection: React.FC<ModelShowcaseSectionProps> = ({
  onSelectModel,
  onOpenConfiguratorForModel,
}) => {
  const [hoveredCardId, setHoveredCardId] = useState<string | null>(null);
  const [tiltMap, setTiltMap] = useState<Record<string, { rx: number; ry: number }>>({});

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>, id: string) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const rx = ((y - rect.height / 2) / (rect.height / 2)) * -10;
    const ry = ((x - rect.width / 2) / (rect.width / 2)) * 10;
    setTiltMap((prev) => ({ ...prev, [id]: { rx, ry } }));
  };

  const handleMouseLeave = (id: string) => {
    setTiltMap((prev) => ({ ...prev, [id]: { rx: 0, ry: 0 } }));
    setHoveredCardId(null);
  };

  return (
    <section id="models" className="relative py-28 bg-[#040406] text-white border-t border-white/10">
      <div className="max-w-7xl mx-auto px-6 sm:px-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div>
            <div className="inline-flex items-center gap-2 mb-3">
              <span className="w-1.5 h-1.5 bg-[#E5A823]" />
              <span className="text-xs font-mono tracking-[0.25em] text-[#E5A823] uppercase">
                The Sant'Agata Bolognese Lineage
              </span>
            </div>
            <h2 className="text-4xl sm:text-6xl font-display font-extrabold tracking-tight text-white leading-none">
              MODEL PORTFOLIO
            </h2>
          </div>
          <p className="text-xs font-mono text-zinc-400 max-w-sm">
            Each creation represents an uncompromising interpretation of aerodynamic sculpture and extreme combustion mechanics.
          </p>
        </div>

        {/* 3D Tilt Cards Grid (Prompt requirement: REVUELTO, TEMERARIO, URUS, URUS SE, HURACÁN) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {CAR_MODELS.map((model) => {
            const tilt = tiltMap[model.id] || { rx: 0, ry: 0 };
            const isHovered = hoveredCardId === model.id;

            return (
              <div
                key={model.id}
                onMouseEnter={() => setHoveredCardId(model.id)}
                onMouseMove={(e) => handleMouseMove(e, model.id)}
                onMouseLeave={() => handleMouseLeave(model.id)}
                style={{
                  transform: `perspective(1000px) rotateX(${tilt.rx}deg) rotateY(${tilt.ry}deg) translateZ(${
                    isHovered ? '12px' : '0px'
                  })`,
                  transition: 'transform 0.15s ease-out, border-color 0.3s ease',
                }}
                className="group relative bg-[#09090d] border border-white/10 hover:border-[#E5A823]/80 p-8 flex flex-col justify-between overflow-hidden shadow-2xl cursor-pointer"
                onClick={() => onSelectModel(model.id)}
              >
                {/* Accent top color beam */}
                <div
                  className="absolute top-0 left-0 right-0 h-[2px] opacity-70 group-hover:opacity-100 transition-opacity"
                  style={{ backgroundColor: model.accentColor }}
                />

                {/* Subtle Ambient Glow */}
                <div
                  className="absolute -top-20 -right-20 w-44 h-44 rounded-full blur-[80px] pointer-events-none opacity-20 group-hover:opacity-40 transition-opacity"
                  style={{ backgroundColor: model.accentColor }}
                />

                {/* Card Top: Category & Name */}
                <div>
                  <div className="flex items-center justify-between pb-4">
                    <span className="text-[10px] font-mono tracking-widest text-[#E5A823] uppercase">
                      {model.category}
                    </span>
                    <ArrowUpRight className="w-5 h-5 text-zinc-500 group-hover:text-white transition-colors" />
                  </div>

                  <h3 className="text-3xl font-display font-black text-white group-hover:text-[#E5A823] transition-colors tracking-tight">
                    {model.name}
                  </h3>

                  <p className="mt-2 text-xs text-zinc-400 font-sans line-clamp-2 leading-relaxed">
                    {model.tagline}
                  </p>
                </div>

                {/* Stylized Vehicle Silhouette Representation */}
                <div className="my-8 py-6 border-y border-white/5 flex items-center justify-center">
                  <div className="w-full h-24 flex items-center justify-center">
                    <svg viewBox="0 0 320 80" className="w-full h-full max-w-[260px]" fill="none">
                      <path
                        d="M 10,65 L 45,60 L 95,50 L 140,32 L 180,32 L 235,50 L 290,60 L 310,65 Z"
                        fill="#18181f"
                        stroke={isHovered ? model.accentColor : 'rgba(255,255,255,0.2)'}
                        strokeWidth="1.5"
                      />
                      <circle cx="65" cy="65" r="14" fill="#09090b" stroke="#3f3f46" strokeWidth="2" />
                      <circle cx="255" cy="65" r="14" fill="#09090b" stroke="#3f3f46" strokeWidth="2" />
                      <path
                        d="M 120,38 L 145,34 L 175,34 L 195,48 L 120,48 Z"
                        fill="rgba(6,182,212,0.3)"
                      />
                      <line x1="280" y1="46" x2="310" y2="46" stroke={model.accentColor} strokeWidth="2" />
                    </svg>
                  </div>
                </div>

                {/* Metrics Breakdown (Prompt requirements: power, top speed, acceleration) */}
                <div>
                  <div className="grid grid-cols-3 gap-2 pb-6 text-center">
                    <div className="p-2 bg-black/40 border border-white/5">
                      <span className="text-[9px] font-mono text-zinc-500 uppercase block">Power</span>
                      <span className="text-sm sm:text-base font-bold text-white font-mono-num">
                        {model.powerCV} CV
                      </span>
                    </div>

                    <div className="p-2 bg-black/40 border border-white/5">
                      <span className="text-[9px] font-mono text-zinc-500 uppercase block">0–100 km/h</span>
                      <span className="text-sm sm:text-base font-bold text-[#E5A823] font-mono-num">
                        {model.acceleration0To100}s
                      </span>
                    </div>

                    <div className="p-2 bg-black/40 border border-white/5">
                      <span className="text-[9px] font-mono text-zinc-500 uppercase block">Top Speed</span>
                      <span className="text-sm sm:text-base font-bold text-white font-mono-num">
                        {model.topSpeedKmH} km/h
                      </span>
                    </div>
                  </div>

                  {/* Actions inside card */}
                  <div className="flex items-center gap-2 pt-2 border-t border-white/10">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onSelectModel(model.id);
                      }}
                      className="flex-1 py-2 text-center text-[11px] font-mono font-bold tracking-wider uppercase text-white hover:text-[#E5A823] bg-white/5 hover:bg-white/10 transition-colors"
                    >
                      Dossier
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onOpenConfiguratorForModel(model.id);
                      }}
                      className="flex-1 py-2 text-center text-[11px] font-mono font-bold tracking-wider uppercase text-black bg-[#E5A823] hover:bg-white transition-colors"
                    >
                      Configure
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
