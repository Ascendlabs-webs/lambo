import React, { useState } from 'react';
import { CarVisualizer } from '../3d/CarVisualizer';
import { HotspotAnnotation } from '../../types/automotive';
import { VEHICLE_HOTSPOTS, EXTERIOR_COLORS } from '../../data/models';
import { Sparkles, Maximize2, ShieldCheck, Cpu, Sliders } from 'lucide-react';

interface InteractiveCarSectionProps {
  onNavigateToConfigurator: () => void;
}

export const InteractiveCarSection: React.FC<InteractiveCarSectionProps> = ({ onNavigateToConfigurator }) => {
  const [currentColorHex, setCurrentColorHex] = useState('#E5A823');
  const [activeHotspot, setActiveHotspot] = useState<HotspotAnnotation | null>(VEHICLE_HOTSPOTS[0]);

  return (
    <section id="interactive-car" className="relative py-24 bg-[#050508] text-white border-t border-white/10">
      <div className="max-w-7xl mx-auto px-6 sm:px-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="inline-flex items-center gap-2 mb-2">
              <span className="w-1.5 h-1.5 bg-[#E5A823]" />
              <span className="text-xs font-mono tracking-[0.2em] text-[#E5A823] uppercase">
                Interactive Vehicle Presentation
              </span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-display font-extrabold tracking-tight text-white">
              ANATOMY OF PURE SPEED
            </h2>
          </div>

          <div className="flex items-center gap-4">
            <span className="text-xs font-mono text-zinc-400 uppercase hidden sm:inline">Color preview:</span>
            <div className="flex items-center gap-2">
              {EXTERIOR_COLORS.slice(0, 5).map((col) => (
                <button
                  key={col.id}
                  onClick={() => setCurrentColorHex(col.hex)}
                  style={{ backgroundColor: col.hex }}
                  className={`w-6 h-6 rounded-full border transition-all ${
                    currentColorHex === col.hex
                      ? 'border-white scale-125 shadow-[0_0_12px_rgba(255,255,255,0.7)]'
                      : 'border-white/20 hover:scale-110'
                  }`}
                  title={col.name}
                  aria-label={`Select color ${col.name}`}
                />
              ))}
            </div>

            <button
              onClick={onNavigateToConfigurator}
              className="ml-2 px-4 py-2 bg-white/10 hover:bg-[#E5A823] hover:text-black border border-white/20 text-xs font-mono font-bold tracking-wider uppercase transition-colors"
            >
              Full Configurator
            </button>
          </div>
        </div>

        {/* 3D Car Viewport Canvas with interactive Hotspots */}
        <div className="relative w-full h-[540px] sm:h-[620px] border border-white/15 shadow-2xl overflow-hidden">
          <CarVisualizer
            colorHex={currentColorHex}
            activeHotspotId={activeHotspot?.id || null}
            onSelectHotspot={(spot) => setActiveHotspot(spot)}
            interactive={true}
            className="w-full h-full"
          />

          {/* Persistent Hotspot Bar at Bottom on Mobile / Tablet */}
          <div className="absolute top-4 left-4 z-20 flex flex-wrap gap-2 pointer-events-auto">
            {VEHICLE_HOTSPOTS.map((spot) => (
              <button
                key={spot.id}
                onClick={() => setActiveHotspot(spot)}
                className={`px-3 py-1.5 text-[11px] font-mono tracking-wider uppercase transition-all border ${
                  activeHotspot?.id === spot.id
                    ? 'bg-[#E5A823] text-black border-[#E5A823] font-bold shadow-md'
                    : 'bg-black/80 text-zinc-300 border-white/20 hover:border-white/60'
                }`}
              >
                {spot.title}
              </button>
            ))}
          </div>
        </div>

        {/* Detailed Inspection Showcase */}
        {activeHotspot && (
          <div className="mt-8 p-6 sm:p-8 bg-[#09090d] border border-white/10 grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
            <div className="md:col-span-8 space-y-2">
              <span className="text-[10px] font-mono tracking-[0.2em] text-[#E5A823] uppercase">
                {activeHotspot.category} · Sant'Agata Engineering
              </span>
              <h3 className="text-2xl sm:text-3xl font-bold font-display text-white">
                {activeHotspot.headline}
              </h3>
              <p className="text-sm text-zinc-300 leading-relaxed font-sans pt-1">
                {activeHotspot.description}
              </p>
            </div>

            <div className="md:col-span-4 border-t md:border-t-0 md:border-l border-white/10 pt-4 md:pt-0 md:pl-8 space-y-4">
              {activeHotspot.specs.map((item, idx) => (
                <div key={idx} className="flex justify-between items-center text-xs">
                  <span className="text-zinc-400 font-sans">{item.label}</span>
                  <span className="font-mono-num font-bold text-white tracking-wide">{item.value}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
