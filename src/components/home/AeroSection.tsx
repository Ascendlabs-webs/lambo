import React, { useState } from 'react';
import { AeroMode, AeroTelemetry } from '../../types/automotive';
import { WindTunnelVisualizer } from '../3d/WindTunnelVisualizer';
import { Wind, Gauge, Shield, Zap, Sliders } from 'lucide-react';

export const AeroSection: React.FC = () => {
  const [activeMode, setActiveMode] = useState<AeroMode>('SPORT');

  // Telemetry map per mode
  const telemetryData: Record<AeroMode, AeroTelemetry> = {
    STRADA: {
      downforceKg: 180,
      dragCoefficient: 0.31,
      wingAngleDeg: 12,
      coolingAirflowPercent: 65,
      activeStatus: 'LAMINAR LOW DRAG',
      description: 'Rear wing retracted to cruising posture. Front flap channels sealed for smooth highway penetration, low acoustic disturbance, and minimal aerodynamic resistance.',
    },
    SPORT: {
      downforceKg: 295,
      dragCoefficient: 0.36,
      wingAngleDeg: 26,
      coolingAirflowPercent: 82,
      activeStatus: 'BALANCED LATERAL STABILITY',
      description: 'Wing rises to intermediate deployment. Active air channels redirect vortex currents around rear wheels to enhance high-speed turn-in agility and directional response.',
    },
    CORSA: {
      downforceKg: 415,
      dragCoefficient: 0.42,
      wingAngleDeg: 42,
      coolingAirflowPercent: 100,
      activeStatus: 'MAXIMUM DOWNFORCE ATTACK',
      description: 'ALA 2.0 aero-vectoring fully engaged. Wing provides maximum angle of attack creating 415 kg of vertical load while brake cooling conduits operate at peak volume.',
    },
  };

  const currentTelemetry = telemetryData[activeMode];

  return (
    <section id="aerodynamics" className="relative py-28 bg-[#030305] text-white border-t border-white/10 overflow-hidden">
      {/* Background Grid */}
      <div className="absolute inset-0 carbon-pattern opacity-30 pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-6 sm:px-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="inline-flex items-center gap-2 mb-3">
              <span className="w-1.5 h-1.5 bg-[#E5A823]" />
              <span className="text-xs font-mono tracking-[0.25em] text-[#E5A823] uppercase">
                Fluid Dynamics · ALA 2.0
              </span>
            </div>
            <h2 className="text-4xl sm:text-6xl font-display font-extrabold tracking-tight text-white leading-none">
              AERODYNAMICS IN MOTION
            </h2>
          </div>

          {/* Interactive Aero Mode Selector (Prompt requirement: STRADA, SPORT, CORSA) */}
          <div className="flex items-center gap-1.5 p-1.5 bg-black/80 border border-white/20">
            {(['STRADA', 'SPORT', 'CORSA'] as AeroMode[]).map((mode) => (
              <button
                key={mode}
                onClick={() => setActiveMode(mode)}
                className={`px-5 py-2 text-xs font-mono font-bold tracking-widest uppercase transition-all ${
                  activeMode === mode
                    ? mode === 'CORSA'
                      ? 'bg-red-600 text-white shadow-[0_0_20px_rgba(239,68,68,0.5)]'
                      : mode === 'SPORT'
                      ? 'bg-[#E5A823] text-black shadow-[0_0_20px_rgba(229,168,35,0.5)]'
                      : 'bg-cyan-500 text-black shadow-[0_0_20px_rgba(6,182,212,0.5)]'
                    : 'text-zinc-400 hover:text-white hover:bg-white/5'
                }`}
              >
                {mode}
              </button>
            ))}
          </div>
        </div>

        {/* Live Wind Tunnel Particle Flow Visualization */}
        <div className="mb-10">
          <WindTunnelVisualizer mode={activeMode} telemetry={currentTelemetry} className="w-full h-80 sm:h-96 md:h-[440px]" />
        </div>

        {/* 4 Core Pillars: Active Aero, Downforce, Cooling, Air Channels (Prompt requirements) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Active Aerodynamics */}
          <div className="p-6 bg-[#08080c] border border-white/10 relative">
            <div className="flex justify-between items-center text-xs font-mono text-zinc-400 mb-4">
              <span className="uppercase">ALA 2.0 Wing</span>
              <Wind className="w-4 h-4 text-[#E5A823]" />
            </div>
            <h4 className="text-xl font-bold font-display text-white">ACTIVE DYNAMICS</h4>
            <p className="text-xs text-zinc-400 mt-2 font-sans leading-relaxed">
              Actuator micro-motors pivot front and rear flaps in 0.2s, adapting to high speed straights or extreme braking.
            </p>
            <div className="mt-4 pt-3 border-t border-white/10 flex justify-between text-xs font-mono">
              <span className="text-zinc-500">Angle of Attack</span>
              <span className="font-mono-num font-bold text-white">{currentTelemetry.wingAngleDeg}°</span>
            </div>
          </div>

          {/* Downforce */}
          <div className="p-6 bg-[#08080c] border border-white/10 relative">
            <div className="flex justify-between items-center text-xs font-mono text-zinc-400 mb-4">
              <span className="uppercase">Vertical Load</span>
              <Gauge className="w-4 h-4 text-[#E5A823]" />
            </div>
            <h4 className="text-xl font-bold font-display text-white">DOWNFORCE</h4>
            <p className="text-xs text-zinc-400 mt-2 font-sans leading-relaxed">
              Generates immense pavement adhesion at speed, eliminating high-speed rear end lightness through sweeps.
            </p>
            <div className="mt-4 pt-3 border-t border-white/10 flex justify-between text-xs font-mono">
              <span className="text-zinc-500">Total Downforce</span>
              <span className="font-mono-num font-bold text-[#E5A823]">{currentTelemetry.downforceKg} kg</span>
            </div>
          </div>

          {/* Cooling */}
          <div className="p-6 bg-[#08080c] border border-white/10 relative">
            <div className="flex justify-between items-center text-xs font-mono text-zinc-400 mb-4">
              <span className="uppercase">Thermal Extraction</span>
              <Zap className="w-4 h-4 text-[#E5A823]" />
            </div>
            <h4 className="text-xl font-bold font-display text-white">COOLING VENTS</h4>
            <p className="text-xs text-zinc-400 mt-2 font-sans leading-relaxed">
              High-pressure side NACA ducts ingest ambient airflow directly to oil radiators and carbon-ceramic disc rotors.
            </p>
            <div className="mt-4 pt-3 border-t border-white/10 flex justify-between text-xs font-mono">
              <span className="text-zinc-500">Thermal Throughput</span>
              <span className="font-mono-num font-bold text-white">{currentTelemetry.coolingAirflowPercent}%</span>
            </div>
          </div>

          {/* Air Channels */}
          <div className="p-6 bg-[#08080c] border border-white/10 relative">
            <div className="flex justify-between items-center text-xs font-mono text-zinc-400 mb-4">
              <span className="uppercase">Vortex Generation</span>
              <Shield className="w-4 h-4 text-[#E5A823]" />
            </div>
            <h4 className="text-xl font-bold font-display text-white">AIR CHANNELS</h4>
            <p className="text-xs text-zinc-400 mt-2 font-sans leading-relaxed">
              Underbody venturi tunnels create ground effect suction, pulling the vehicle flat against the asphalt without drag penalties.
            </p>
            <div className="mt-4 pt-3 border-t border-white/10 flex justify-between text-xs font-mono">
              <span className="text-zinc-500">Drag Coeff (Cd)</span>
              <span className="font-mono-num font-bold text-white">{currentTelemetry.dragCoefficient.toFixed(2)}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
