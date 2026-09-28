import React, { useState, useEffect } from 'react';
import { Volume2, Gauge, Flame, Cpu, ArrowRight } from 'lucide-react';
import { audioEngine } from '../../utils/audioEngine';

interface EngineSectionProps {
  onExploreFullVehicle: () => void;
}

export const EngineSection: React.FC<EngineSectionProps> = ({ onExploreFullVehicle }) => {
  const [activeCylinder, setActiveCylinder] = useState(0);
  const [isRevving, setIsRevving] = useState(false);
  const [currentRpm, setCurrentRpm] = useState(900);

  // Cylinder firing order animation (1-6-5-10-2-7-3-8-4-9)
  const firingOrder = [1, 6, 5, 10, 2, 7, 3, 8, 4, 9];

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveCylinder((prev) => (prev + 1) % 10);
    }, isRevving ? 50 : 200);

    return () => clearInterval(interval);
  }, [isRevving]);

  const handleRevEngine = () => {
    if (isRevving) return;
    setIsRevving(true);
    audioEngine.start();
    audioEngine.setRpm(2500);
    setCurrentRpm(3200);

    setTimeout(() => {
      audioEngine.setRpm(6800);
      setCurrentRpm(7400);
    }, 400);

    setTimeout(() => {
      audioEngine.setRpm(8500);
      setCurrentRpm(8500);
    }, 900);

    setTimeout(() => {
      audioEngine.setRpm(2200);
      setCurrentRpm(2200);
    }, 1600);

    setTimeout(() => {
      audioEngine.stop();
      setIsRevving(false);
      setCurrentRpm(900);
    }, 2400);
  };

  return (
    <section id="engine" className="relative py-28 bg-[#040406] text-white border-t border-white/10 overflow-hidden">
      {/* Background Ambience */}
      <div className="absolute inset-0 carbon-pattern opacity-40 pointer-events-none" />
      <div className="absolute -bottom-40 right-10 w-[500px] h-[500px] bg-[#E5A823]/10 rounded-full blur-[160px] pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-6 sm:px-10">
        {/* Section Header */}
        <div className="max-w-3xl mb-16">
          <div className="inline-flex items-center gap-2 mb-3">
            <span className="w-1.5 h-1.5 bg-[#E5A823]" />
            <span className="text-xs font-mono tracking-[0.25em] text-[#E5A823] uppercase">
              Mechanical Masterpiece
            </span>
          </div>

          <h2 className="text-4xl sm:text-6xl lg:text-7xl font-display font-extrabold tracking-tight text-white leading-none">
            THE HEART OF THE BEAST
          </h2>
          <p className="mt-4 text-base sm:text-lg text-zinc-400 font-sans leading-relaxed">
            The legendary 5.2-liter naturally aspirated V10: an orchestral instrument engineered in Sant'Agata
            Bolognese without turbochargers or artificial delays. Pure combustion emotion.
          </p>
        </div>

        {/* Engine Composition & Interactive Firing Chamber */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Mechanical Visualization Graphic */}
          <div className="lg:col-span-7 bg-[#08080c] border border-white/15 p-6 sm:p-10 shadow-2xl relative">
            <div className="flex items-center justify-between pb-6 border-b border-white/10">
              <div>
                <span className="text-[10px] font-mono tracking-widest text-[#E5A823] uppercase block">
                  90° Cylinder Bank Architecture
                </span>
                <h4 className="text-xl font-bold font-display text-white">5.2L NATURALLY ASPIRATED V10</h4>
              </div>

              <button
                onClick={handleRevEngine}
                disabled={isRevving}
                className="flex items-center gap-2 px-4 py-2 bg-[#E5A823] hover:bg-white text-black font-mono font-bold text-xs tracking-wider uppercase transition-colors"
              >
                <Volume2 className="w-4 h-4" />
                <span>{isRevving ? 'REV TO 8,500 RPM...' : 'REV ENGINE'}</span>
              </button>
            </div>

            {/* Dynamic 10-Cylinder Firing Diagram */}
            <div className="py-10">
              <div className="text-center mb-6">
                <span className="text-xs font-mono text-zinc-400">
                  FIRING ORDER SEQUENCE: <strong className="text-white font-mono-num">1 - 6 - 5 - 10 - 2 - 7 - 3 - 8 - 4 - 9</strong>
                </span>
              </div>

              {/* Bank A & Bank B Cylinders */}
              <div className="grid grid-cols-2 gap-8 max-w-lg mx-auto">
                {/* Bank 1 (Left Cylinders 1 to 5) */}
                <div className="space-y-3">
                  <span className="text-[10px] font-mono text-zinc-400 uppercase tracking-widest block text-center">
                    Left Bank (1-5)
                  </span>
                  {[1, 2, 3, 4, 5].map((cyl) => {
                    const isFiring = firingOrder[activeCylinder] === cyl;
                    return (
                      <div
                        key={cyl}
                        className={`p-3 border transition-all duration-150 flex items-center justify-between ${
                          isFiring
                            ? 'bg-[#E5A823]/25 border-[#E5A823] shadow-[0_0_15px_rgba(229,168,35,0.7)]'
                            : 'bg-black/60 border-white/10'
                        }`}
                      >
                        <span className="text-xs font-mono text-zinc-400">Cyl #{cyl}</span>
                        <div className="flex items-center gap-2">
                          <span
                            className={`w-2 h-2 rounded-full ${
                              isFiring ? 'bg-[#E5A823] animate-ping' : 'bg-zinc-700'
                            }`}
                          />
                          <span className={`text-xs font-mono font-bold ${isFiring ? 'text-[#E5A823]' : 'text-zinc-500'}`}>
                            {isFiring ? 'COMBUSTION' : 'COMPRESSION'}
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Bank 2 (Right Cylinders 6 to 10) */}
                <div className="space-y-3">
                  <span className="text-[10px] font-mono text-zinc-400 uppercase tracking-widest block text-center">
                    Right Bank (6-10)
                  </span>
                  {[6, 7, 8, 9, 10].map((cyl) => {
                    const isFiring = firingOrder[activeCylinder] === cyl;
                    return (
                      <div
                        key={cyl}
                        className={`p-3 border transition-all duration-150 flex items-center justify-between ${
                          isFiring
                            ? 'bg-[#FF6600]/25 border-[#FF6600] shadow-[0_0_15px_rgba(255,102,0,0.7)]'
                            : 'bg-black/60 border-white/10'
                        }`}
                      >
                        <span className="text-xs font-mono text-zinc-400">Cyl #{cyl}</span>
                        <div className="flex items-center gap-2">
                          <span
                            className={`w-2 h-2 rounded-full ${
                              isFiring ? 'bg-[#FF6600] animate-ping' : 'bg-zinc-700'
                            }`}
                          />
                          <span className={`text-xs font-mono font-bold ${isFiring ? 'text-[#FF6600]' : 'text-zinc-500'}`}>
                            {isFiring ? 'COMBUSTION' : 'COMPRESSION'}
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Live RPM Gauge bar */}
            <div className="pt-6 border-t border-white/10 flex items-center justify-between text-xs font-mono">
              <span className="text-zinc-400">CURRENT ENGINE TACHOMETER:</span>
              <span className={`font-mono-num font-bold text-lg ${currentRpm > 7500 ? 'text-red-500 animate-pulse' : 'text-white'}`}>
                {currentRpm.toLocaleString()} RPM
              </span>
            </div>
            <div className="w-full h-1.5 bg-zinc-800 mt-2 rounded-full overflow-hidden">
              <div
                className={`h-full transition-all duration-150 ${currentRpm > 7500 ? 'bg-red-500' : 'bg-[#E5A823]'}`}
                style={{ width: `${(currentRpm / 8500) * 100}%` }}
              />
            </div>
          </div>

          {/* Technical Specifications Breakdown (Prompt requirements: V10, 5.2L, 630 CV, 740 Nm, naturally aspirated) */}
          <div className="lg:col-span-5 space-y-5">
            <div className="p-6 bg-[#09090d] border border-white/10">
              <span className="text-[10px] font-mono tracking-widest text-[#E5A823] uppercase block mb-1">
                Architecture
              </span>
              <h3 className="text-3xl font-display font-extrabold text-white">V10 · 5.2 LITERS</h3>
              <p className="text-xs text-zinc-400 mt-2 font-sans leading-relaxed">
                Constructed from lightened aluminum-silicon alloy with plasma-coated cylinder bores and dry sump lubrication capable of resisting lateral g-forces beyond 1.5g.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="p-5 bg-[#09090d] border border-white/10">
                <span className="text-[10px] font-mono tracking-widest text-zinc-400 uppercase block">Max Power</span>
                <span className="text-2xl font-display font-bold text-[#E5A823] font-mono-num">630 CV</span>
                <span className="text-[11px] text-zinc-400 block mt-1">@ 8,000 RPM</span>
              </div>

              <div className="p-5 bg-[#09090d] border border-white/10">
                <span className="text-[10px] font-mono tracking-widest text-zinc-400 uppercase block">Max Torque</span>
                <span className="text-2xl font-display font-bold text-white font-mono-num">740 NM</span>
                <span className="text-[11px] text-zinc-400 block mt-1">@ 6,500 RPM</span>
              </div>
            </div>

            <div className="p-6 bg-[#09090d] border border-white/10">
              <span className="text-[10px] font-mono tracking-widest text-[#E5A823] uppercase block mb-1">
                Induction Type
              </span>
              <h4 className="text-xl font-bold font-display text-white">NATURALLY ASPIRATED</h4>
              <p className="text-xs text-zinc-400 mt-2 font-sans leading-relaxed">
                Zero turbo lag. Dual Iniezione Diretta Stratificata (IDS) combines multipoint indirect injection at low loads with 200-bar direct cylinder injection at maximum throttle.
              </p>
            </div>

            <button
              onClick={onExploreFullVehicle}
              className="w-full py-3.5 bg-white/10 hover:bg-[#E5A823] hover:text-black border border-white/20 text-xs font-mono font-bold tracking-widest uppercase transition-all flex items-center justify-center gap-2 group"
            >
              <span>Transition to Full Vehicle Aerodynamics</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
