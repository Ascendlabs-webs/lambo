import React, { useState } from 'react';
import { TECH_FEATURES } from '../../data/technologies';
import { Cpu, Wind, Layers, Compass, Magnet, Zap, Shield, ChevronRight } from 'lucide-react';

interface TechnologyPageProps {
  onNavigateToConfigurator: () => void;
}

export const TechnologyPage: React.FC<TechnologyPageProps> = ({ onNavigateToConfigurator }) => {
  const [activeTechId, setActiveTechId] = useState(TECH_FEATURES[0].id);

  const activeTech = TECH_FEATURES.find((t) => t.id === activeTechId) || TECH_FEATURES[0];

  return (
    <div className="min-h-screen bg-[#030305] text-white pt-28 pb-20 px-6 sm:px-12">
      <div className="max-w-7xl mx-auto">
        {/* Page Header */}
        <div className="border-b border-white/10 pb-12 mb-16">
          <span className="text-xs font-mono tracking-[0.25em] text-[#E5A823] uppercase block mb-3">
            Sant'Agata Bolognese Research & Development
          </span>
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-display font-extrabold tracking-tight text-white leading-none">
            INNOVATION AT THE LIMIT
          </h1>
          <p className="mt-4 text-base sm:text-lg text-zinc-400 font-sans max-w-2xl leading-relaxed">
            From the pioneering forged carbon monocoque to patented ALA active aerodynamics and predictive 200 Hz LDVI dynamic logic: how Lamborghini rewrites the laws of vehicle physics.
          </p>
        </div>

        {/* Interactive Master Technology Dossier */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Left: Navigation List */}
          <div className="lg:col-span-4 space-y-3">
            <span className="text-xs font-mono text-zinc-500 uppercase tracking-widest block mb-2">
              Core Systems
            </span>
            {TECH_FEATURES.map((tech) => (
              <button
                key={tech.id}
                onClick={() => setActiveTechId(tech.id)}
                className={`w-full text-left p-4 border transition-all flex items-center justify-between ${
                  activeTechId === tech.id
                    ? 'bg-[#E5A823]/10 border-[#E5A823] text-white'
                    : 'bg-[#08080c] border-white/10 text-zinc-400 hover:text-white hover:border-white/30'
                }`}
              >
                <div>
                  <span className="text-[10px] font-mono text-[#E5A823] uppercase block">{tech.code}</span>
                  <h4 className="text-sm font-bold font-display uppercase">{tech.title.split(' ')[0]} {tech.title.split(' ')[1]}</h4>
                </div>
                <ChevronRight className={`w-4 h-4 transition-transform ${activeTechId === tech.id ? 'translate-x-1 text-[#E5A823]' : 'text-zinc-600'}`} />
              </button>
            ))}
          </div>

          {/* Right: Selected In-Depth Engineering Dossier */}
          <div className="lg:col-span-8 bg-[#08080d] border border-white/15 p-8 sm:p-12 shadow-2xl space-y-8">
            <div className="border-b border-white/10 pb-6">
              <span className="text-xs font-mono tracking-widest text-[#E5A823] uppercase block mb-1">
                {activeTech.code} · SYSTEM SPECIFICATION
              </span>
              <h2 className="text-3xl sm:text-4xl font-bold font-display text-white">
                {activeTech.title}
              </h2>
              <p className="text-sm text-zinc-400 font-sans mt-2">{activeTech.tagline}</p>
            </div>

            <div className="space-y-4">
              <h4 className="text-xs font-mono text-zinc-400 uppercase tracking-widest">
                Functional Overview
              </h4>
              <p className="text-base text-zinc-300 font-sans leading-relaxed">
                {activeTech.overview}
              </p>
            </div>

            <div className="space-y-4 p-6 bg-black/60 border border-white/5">
              <h4 className="text-xs font-mono text-[#E5A823] uppercase tracking-widest">
                Engineering Mechanics & Physics
              </h4>
              <p className="text-sm text-zinc-300 font-sans leading-relaxed">
                {activeTech.deepDive}
              </p>
            </div>

            {/* Metrics Breakdown */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t border-white/10">
              {activeTech.metrics.map((m, idx) => (
                <div key={idx} className="p-4 bg-white/[0.02] border border-white/10">
                  <span className="text-[10px] font-mono text-zinc-500 uppercase block">{m.label}</span>
                  <span className="text-lg font-bold text-white font-mono-num mt-1 block">{m.value}</span>
                </div>
              ))}
            </div>

            <div className="pt-4 flex justify-end">
              <button
                onClick={onNavigateToConfigurator}
                className="px-6 py-3 bg-[#E5A823] text-black font-mono font-bold text-xs tracking-widest uppercase hover:bg-white transition-colors"
              >
                Experience in 3D Configurator
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
