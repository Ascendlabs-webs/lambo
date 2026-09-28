import React, { useState } from 'react';
import { TECH_FEATURES } from '../../data/technologies';
import { TechFeature } from '../../types/automotive';
import { Cpu, Wind, Layers, Compass, Magnet, Zap, ArrowRight } from 'lucide-react';

interface TechnologySectionProps {
  onExploreTechnology: () => void;
}

export const TechnologySection: React.FC<TechnologySectionProps> = ({ onExploreTechnology }) => {
  const [selectedTech, setSelectedTech] = useState<TechFeature | null>(null);

  const getIcon = (id: string) => {
    switch (id) {
      case 'ldvi':
        return <Cpu className="w-5 h-5 text-[#E5A823]" />;
      case 'active-aero':
        return <Wind className="w-5 h-5 text-[#E5A823]" />;
      case 'carbon-monocoque':
        return <Layers className="w-5 h-5 text-[#E5A823]" />;
      case 'all-wheel-steering':
        return <Compass className="w-5 h-5 text-[#E5A823]" />;
      case 'adaptive-damping':
        return <Magnet className="w-5 h-5 text-[#E5A823]" />;
      case 'torque-vectoring':
        return <Zap className="w-5 h-5 text-[#E5A823]" />;
      default:
        return <Cpu className="w-5 h-5 text-[#E5A823]" />;
    }
  };

  return (
    <section id="technology" className="relative py-28 bg-[#030304] text-white border-t border-white/10">
      <div className="max-w-7xl mx-auto px-6 sm:px-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div>
            <div className="inline-flex items-center gap-2 mb-3">
              <span className="w-1.5 h-1.5 bg-[#E5A823]" />
              <span className="text-xs font-mono tracking-[0.25em] text-[#E5A823] uppercase">
                Aeronautical Innovation
              </span>
            </div>
            <h2 className="text-4xl sm:text-6xl font-display font-extrabold tracking-tight text-white leading-none">
              ENGINEERING SUPREMACY
            </h2>
          </div>

          <button
            onClick={onExploreTechnology}
            className="self-start md:self-end flex items-center gap-2 text-xs font-mono tracking-widest text-[#E5A823] hover:text-white uppercase transition-colors"
          >
            <span>Complete Engineering Dossier</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {/* 6 Technology Dashboard Animated Cards (Prompt requirement) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {TECH_FEATURES.map((tech) => (
            <div
              key={tech.id}
              onClick={() => setSelectedTech(selectedTech?.id === tech.id ? null : tech)}
              className="group relative p-8 bg-[#08080c] border border-white/10 hover:border-[#E5A823]/80 transition-all duration-300 flex flex-col justify-between cursor-pointer overflow-hidden"
            >
              {/* Top Accent Line */}
              <div className="absolute top-0 left-0 right-0 h-[2px] w-0 group-hover:w-full bg-[#E5A823] transition-all duration-500" />

              <div>
                <div className="flex items-center justify-between pb-6 border-b border-white/10">
                  <span className="text-xs font-mono tracking-widest text-[#E5A823] uppercase">{tech.code}</span>
                  {getIcon(tech.id)}
                </div>

                <h3 className="text-xl sm:text-2xl font-bold font-display text-white mt-4 group-hover:text-[#E5A823] transition-colors">
                  {tech.title}
                </h3>

                <p className="text-xs text-zinc-400 font-sans mt-2 leading-relaxed">
                  {tech.tagline}
                </p>

                {/* Hover Reveal Detailed Explanation (Prompt requirement) */}
                <div className="mt-4 pt-4 border-t border-white/5 opacity-80 group-hover:opacity-100 transition-opacity">
                  <p className="text-xs text-zinc-300 leading-relaxed font-sans">{tech.overview}</p>
                </div>
              </div>

              {/* Metrics preview */}
              <div className="mt-6 pt-4 border-t border-white/10 grid grid-cols-2 gap-2 text-xs font-mono">
                {tech.metrics.slice(0, 2).map((m, idx) => (
                  <div key={idx} className="bg-black/50 p-2 border border-white/5">
                    <span className="text-[9px] text-zinc-500 uppercase block">{m.label}</span>
                    <span className="text-white font-bold">{m.value}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Selected Deep-Dive Drawer Modal */}
        {selectedTech && (
          <div className="mt-10 p-8 bg-[#09090f] border-2 border-[#E5A823] animate-in fade-in duration-200">
            <div className="flex items-center justify-between pb-4 border-b border-white/10">
              <div>
                <span className="text-xs font-mono text-[#E5A823] uppercase tracking-widest">{selectedTech.code} Technical Whitepaper</span>
                <h3 className="text-2xl font-bold font-display text-white">{selectedTech.title}</h3>
              </div>
              <button
                onClick={() => setSelectedTech(null)}
                className="text-xs font-mono text-zinc-400 hover:text-white uppercase px-3 py-1 bg-white/10"
              >
                Close
              </button>
            </div>
            <p className="mt-4 text-sm text-zinc-300 leading-relaxed">{selectedTech.deepDive}</p>
          </div>
        )}
      </div>
    </section>
  );
};
