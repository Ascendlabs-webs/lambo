import React, { useState } from 'react';
import { CAR_MODELS } from '../../data/models';
import { CarModel } from '../../types/automotive';
import { CarVisualizer } from '../3d/CarVisualizer';
import {
  ArrowLeft,
  ChevronRight,
  Shield,
  Gauge,
  Zap,
  Wind,
  Layers,
  Sliders,
  CheckCircle2,
} from 'lucide-react';

interface ModelDetailPageProps {
  modelId: string;
  onBack: () => void;
  onOpenConfigurator: (id: string) => void;
  onRequestQuote: (summary: string) => void;
}

export const ModelDetailPage: React.FC<ModelDetailPageProps> = ({
  modelId,
  onBack,
  onOpenConfigurator,
  onRequestQuote,
}) => {
  const model = CAR_MODELS.find((m) => m.id === modelId) || CAR_MODELS[0];
  const [activeTab, setActiveTab] = useState<'overview' | 'aerodynamics' | 'powertrain' | 'interior'>('overview');

  return (
    <div className="min-h-screen bg-[#030305] text-white pt-24 pb-20">
      {/* 1. HERO SUBSECTION */}
      <section className="relative min-h-[85vh] flex flex-col justify-between px-6 sm:px-12 border-b border-white/10 overflow-hidden">
        {/* Ambient Glow */}
        <div
          className="absolute -top-24 left-1/2 -translate-x-1/2 w-[700px] h-[400px] rounded-full blur-[160px] pointer-events-none opacity-20"
          style={{ backgroundColor: model.accentColor }}
        />

        <div className="max-w-7xl mx-auto w-full pt-6">
          <button
            onClick={onBack}
            className="inline-flex items-center gap-2 text-xs font-mono tracking-widest uppercase text-zinc-400 hover:text-white mb-6 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Return to Portfolio</span>
          </button>

          <div className="max-w-3xl space-y-4">
            <span className="text-xs font-mono tracking-[0.25em] uppercase block text-[#E5A823]">
              {model.category} · Technical Dossier
            </span>
            <h1 className="text-5xl sm:text-7xl lg:text-8xl font-display font-extrabold tracking-tight text-white leading-none">
              {model.name}
            </h1>
            <p className="text-lg sm:text-xl text-zinc-300 font-sans leading-relaxed">
              {model.heroHeadline}
            </p>
          </div>
        </div>

        {/* 3D Vehicle Interactive Visualizer in Hero */}
        <div className="max-w-7xl mx-auto w-full h-[440px] sm:h-[500px] my-6 border border-white/10 shadow-2xl relative">
          <CarVisualizer colorHex={model.defaultColorHex} interactive={true} className="w-full h-full" />
        </div>

        {/* 2. PERFORMANCE QUICK HUD */}
        <div className="max-w-7xl mx-auto w-full py-6 border-t border-white/10 grid grid-cols-2 sm:grid-cols-4 gap-6 text-xs font-mono">
          <div>
            <span className="text-zinc-500 uppercase block">Power</span>
            <span className="text-2xl font-bold text-white font-mono-num">{model.powerCV} CV</span>
          </div>
          <div>
            <span className="text-zinc-500 uppercase block">0–100 km/h</span>
            <span className="text-2xl font-bold text-[#E5A823] font-mono-num">{model.acceleration0To100}s</span>
          </div>
          <div>
            <span className="text-zinc-500 uppercase block">Top Speed</span>
            <span className="text-2xl font-bold text-white font-mono-num">{model.topSpeedKmH} km/h</span>
          </div>
          <div>
            <span className="text-zinc-500 uppercase block">Max Torque</span>
            <span className="text-2xl font-bold text-white font-mono-num">{model.torqueNm} Nm</span>
          </div>
        </div>
      </section>

      {/* 3. DESIGN & PHILOSOPHY */}
      <section className="py-24 px-6 sm:px-12 max-w-7xl mx-auto border-b border-white/10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-6 space-y-6">
            <span className="text-xs font-mono tracking-widest text-[#E5A823] uppercase block">
              Aerospace Design DNA
            </span>
            <h2 className="text-3xl sm:text-5xl font-display font-extrabold text-white">
              BORN AT THE LIMITS OF FORM
            </h2>
            <p className="text-base text-zinc-300 font-sans leading-relaxed">
              {model.designPhilosophy}
            </p>
            <div className="space-y-3 pt-2 text-xs font-mono text-zinc-400">
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-[#E5A823]" />
                <span>Hexagonal aviation exhaust architecture with thermal titanium dissipation</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-[#E5A823]" />
                <span>Raked fighter-jet canopy for optimal high-g pilot visibility</span>
              </div>
            </div>
          </div>

          <div className="lg:col-span-6 bg-[#08080c] border border-white/10 p-8">
            <h4 className="text-xs font-mono tracking-widest text-[#E5A823] uppercase mb-4">
              Structural Geometry
            </h4>
            <div className="space-y-4 text-xs font-mono">
              <div className="flex justify-between py-2 border-b border-white/5">
                <span className="text-zinc-400">Chassis</span>
                <span className="text-white font-semibold">100% Forged Composite Monofuselage</span>
              </div>
              <div className="flex justify-between py-2 border-b border-white/5">
                <span className="text-zinc-400">Front Subframe</span>
                <span className="text-white font-semibold">Forged Composite with Extruded Aluminum</span>
              </div>
              <div className="flex justify-between py-2 border-b border-white/5">
                <span className="text-zinc-400">Rear Subframe</span>
                <span className="text-white font-semibold">High-Strength Hollow Cast Alloys</span>
              </div>
              <div className="flex justify-between py-2 border-b border-white/5">
                <span className="text-zinc-400">Torsional Rigidity</span>
                <span className="text-[#E5A823] font-bold font-mono-num">46,000 Nm/degree (+25%)</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. ENGINE & 5. AERODYNAMICS SPLIT */}
      <section className="py-24 px-6 sm:px-12 max-w-7xl mx-auto border-b border-white/10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          <div className="p-8 sm:p-10 bg-[#08080c] border border-white/10 space-y-4">
            <span className="text-xs font-mono tracking-widest text-[#E5A823] uppercase block">
              Powertrain Mechanics
            </span>
            <h3 className="text-2xl sm:text-3xl font-bold font-display text-white">
              {model.engineDisplacement}
            </h3>
            <p className="text-xs text-zinc-300 font-sans leading-relaxed">
              Engineered with inverted dry sump lubrication, high-lift titanium valvetrains, and dual injection. Seamlessly synchronized with three high-density axial flux electric traction units.
            </p>
            <div className="pt-4 border-t border-white/10 text-xs font-mono text-zinc-400">
              Transmission: <strong className="text-white">{model.transmission}</strong>
            </div>
          </div>

          <div className="p-8 sm:p-10 bg-[#08080c] border border-white/10 space-y-4">
            <span className="text-xs font-mono tracking-widest text-[#E5A823] uppercase block">
              Active Aerodynamics
            </span>
            <h3 className="text-2xl sm:text-3xl font-bold font-display text-white">
              ALA 2.0 AERO DYNAMICS
            </h3>
            <p className="text-xs text-zinc-300 font-sans leading-relaxed">
              {model.aerodynamicsStory}
            </p>
            <div className="pt-4 border-t border-white/10 text-xs font-mono text-zinc-400">
              Drive Configuration: <strong className="text-white">{model.driveType}</strong>
            </div>
          </div>
        </div>
      </section>

      {/* 6. INTERIOR & 7. TECHNOLOGY */}
      <section className="py-24 px-6 sm:px-12 max-w-7xl mx-auto border-b border-white/10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-6 order-2 lg:order-1 bg-[#08080c] border border-white/10 p-8 space-y-4">
            <span className="text-xs font-mono tracking-widest text-[#E5A823] uppercase block">
              Feel Like a Pilot Architecture
            </span>
            <h3 className="text-2xl sm:text-3xl font-bold font-display text-white">COCKPIT IMMERSION</h3>
            <p className="text-xs text-zinc-300 font-sans leading-relaxed">
              {model.interiorStory}
            </p>
            <ul className="text-xs font-mono space-y-2 text-zinc-400 pt-2">
              <li>· 12.3" Driver Instrument Cluster with Corsa telemetry</li>
              <li>· 8.4" Central Infotainment screen with gesture swipe</li>
              <li>· 9.1" Passenger Co-Pilot telemetry speed display</li>
            </ul>
          </div>

          <div className="lg:col-span-6 order-1 lg:order-2 space-y-4">
            <span className="text-xs font-mono tracking-widest text-[#E5A823] uppercase block">
              Integrated Telemetry
            </span>
            <h2 className="text-3xl sm:text-5xl font-display font-extrabold text-white">
              LDVI DYNAMIC REASONING
            </h2>
            <p className="text-sm text-zinc-300 font-sans leading-relaxed">
              The Lamborghini Dinamica Veicolo Integrata 2.0 brain anticipates tire traction, slip angle, and braking force before corner entry, synchronizing front e-axle vectoring with rear magnetorheological damping.
            </p>
          </div>
        </div>
      </section>

      {/* 8. GALLERY HIGHLIGHTS */}
      <section className="py-24 px-6 sm:px-12 max-w-7xl mx-auto border-b border-white/10">
        <span className="text-xs font-mono tracking-widest text-[#E5A823] uppercase block mb-2">
          Design Archive
        </span>
        <h2 className="text-3xl sm:text-5xl font-display font-extrabold text-white mb-8">
          ARCHITECTURAL PERSPECTIVES
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {model.galleryImages.map((img) => (
            <div key={img.id} className="bg-[#08080c] border border-white/10 p-6 space-y-3">
              <span className="text-[10px] font-mono text-[#E5A823] uppercase tracking-widest">{img.tag}</span>
              <h4 className="text-lg font-bold font-display text-white">{img.title}</h4>
              <p className="text-xs text-zinc-400 font-sans">{img.caption}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 9. SPECIFICATIONS TABLE & 10. CTA */}
      <section className="py-24 px-6 sm:px-12 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-7 bg-[#08080c] border border-white/10 p-8">
            <span className="text-xs font-mono tracking-widest text-[#E5A823] uppercase block mb-4">
              Comprehensive Specifications
            </span>
            <div className="space-y-3 text-xs font-mono">
              <div className="flex justify-between py-1.5 border-b border-white/5">
                <span className="text-zinc-400">Displacement & Valves</span>
                <span className="text-white">{model.engineDisplacement}</span>
              </div>
              <div className="flex justify-between py-1.5 border-b border-white/5">
                <span className="text-zinc-400">Total System Power</span>
                <span className="text-[#E5A823] font-bold font-mono-num">{model.powerCV} CV</span>
              </div>
              <div className="flex justify-between py-1.5 border-b border-white/5">
                <span className="text-zinc-400">Acceleration 0–100 km/h</span>
                <span className="text-white font-mono-num">{model.acceleration0To100} s</span>
              </div>
              <div className="flex justify-between py-1.5 border-b border-white/5">
                <span className="text-zinc-400">Top Speed</span>
                <span className="text-white font-mono-num">{model.topSpeedKmH} km/h</span>
              </div>
              <div className="flex justify-between py-1.5 border-b border-white/5">
                <span className="text-zinc-400">Kerb Weight</span>
                <span className="text-white font-mono-num">{model.weightKg} kg</span>
              </div>
              <div className="flex justify-between py-1.5 border-b border-white/5">
                <span className="text-zinc-400">Dimensions (L × W × H)</span>
                <span className="text-white font-mono-num">
                  {model.dimensions.lengthMm} × {model.dimensions.widthMm} × {model.dimensions.heightMm} mm
                </span>
              </div>
            </div>
          </div>

          <div className="lg:col-span-5 space-y-6">
            <span className="text-xs font-mono tracking-widest text-[#E5A823] uppercase block">
              Commission Your Machine
            </span>
            <h2 className="text-3xl sm:text-4xl font-display font-extrabold text-white">
              CLAIM AN ALLOCATION
            </h2>
            <p className="text-xs text-zinc-300 font-sans leading-relaxed">
              Begin by creating your personalized specification with custom paint, forged wheels, and aerodynamic packages, or submit an acquisition inquiry directly to the factory.
            </p>

            <div className="space-y-3 pt-2">
              <button
                onClick={() => onOpenConfigurator(model.id)}
                className="w-full py-4 bg-[#E5A823] hover:bg-white text-black font-semibold text-xs tracking-widest uppercase transition-colors"
              >
                Configure {model.name}
              </button>
              <button
                onClick={() => onRequestQuote(`Allocation Request for ${model.name}`)}
                className="w-full py-4 bg-white/5 hover:bg-white/15 text-white border border-white/20 text-xs font-mono font-bold tracking-widest uppercase transition-colors"
              >
                Request Concierge Dossier
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
