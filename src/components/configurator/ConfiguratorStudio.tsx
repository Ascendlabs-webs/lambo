import React, { useState } from 'react';
import {
  CAR_MODELS,
  EXTERIOR_COLORS,
  WHEEL_OPTIONS,
  INTERIOR_OPTIONS,
  CALIPER_OPTIONS,
  AERO_PACKAGES,
} from '../../data/models';
import {
  ExteriorColorOption,
  WheelOption,
  InteriorOption,
  CaliperOption,
  AeroPackageOption,
} from '../../types/automotive';
import { CarVisualizer } from '../3d/CarVisualizer';
import {
  Palette,
  Disc,
  Armchair,
  Flame,
  Wind,
  Check,
  Download,
  Share2,
  ChevronRight,
  ShieldCheck,
  Layers,
} from 'lucide-react';

interface ConfiguratorStudioProps {
  initialModelId?: string;
  onRequestQuote: (summary: string) => void;
}

export const ConfiguratorStudio: React.FC<ConfiguratorStudioProps> = ({
  initialModelId = 'revuelto',
  onRequestQuote,
}) => {
  const [selectedModelId, setSelectedModelId] = useState(initialModelId);
  const [activeTab, setActiveTab] = useState<'paint' | 'wheels' | 'interior' | 'calipers' | 'aero'>('paint');

  const [exteriorColor, setExteriorColor] = useState<ExteriorColorOption>(EXTERIOR_COLORS[0]);
  const [wheel, setWheel] = useState<WheelOption>(WHEEL_OPTIONS[0]);
  const [interior, setInterior] = useState<InteriorOption>(INTERIOR_OPTIONS[0]);
  const [caliper, setCaliper] = useState<CaliperOption>(CALIPER_OPTIONS[0]);
  const [aeroPkg, setAeroPkg] = useState<AeroPackageOption>(AERO_PACKAGES[0]);

  const [cameraPreset, setCameraPreset] = useState<'front34' | 'side' | 'rear' | 'wheels'>('front34');
  const [saveSuccessMsg, setSaveSuccessMsg] = useState('');

  const currentModel = CAR_MODELS.find((m) => m.id === selectedModelId) || CAR_MODELS[0];

  // Dynamic price calculation
  const totalOptionsPrice = wheel.priceDelta + interior.priceDelta + aeroPkg.priceDelta;
  const estimatedPriceUSD = currentModel.startingPriceUSD + totalOptionsPrice;

  // Dynamic weight and aero impact
  const calculatedWeight =
    currentModel.weightKg + (aeroPkg.id === 'pkg-carbon' ? -18 : aeroPkg.id === 'pkg-perf' ? -6 : 0);
  const calculatedDownforce = Math.round(350 * aeroPkg.downforceMultiplier);

  const getFullSummary = () => {
    return `${currentModel.name} | Paint: ${exteriorColor.name} | Wheels: ${wheel.name} (${wheel.sizeInch}") | Calipers: ${caliper.name} | Interior: ${interior.name} | Aero: ${aeroPkg.name} | Total Estimated: $${estimatedPriceUSD.toLocaleString()} USD`;
  };

  const handleSaveConfiguration = () => {
    const summary = getFullSummary();
    try {
      localStorage.setItem('lambo_saved_config', JSON.stringify({
        modelId: selectedModelId,
        color: exteriorColor.id,
        wheel: wheel.id,
        interior: interior.id,
        caliper: caliper.id,
        aero: aeroPkg.id,
        timestamp: Date.now(),
      }));
    } catch {}

    setSaveSuccessMsg('Configuration specification preserved in local memory.');
    setTimeout(() => setSaveSuccessMsg(''), 3000);
  };

  return (
    <div className="relative min-h-screen bg-[#040407] text-white pt-24 pb-16 px-4 sm:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Studio Top Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-8 border-b border-white/10">
          <div>
            <span className="text-xs font-mono tracking-[0.25em] text-[#E5A823] uppercase block mb-1">
              Sant'Agata Bolognese Virtual Atelier
            </span>
            <h1 className="text-3xl sm:text-5xl font-display font-extrabold tracking-tight text-white">
              BUILD YOUR MACHINE
            </h1>
          </div>

          {/* Model Switcher */}
          <div className="flex items-center gap-1.5 p-1 bg-black/80 border border-white/15 overflow-x-auto max-w-full">
            {CAR_MODELS.map((m) => (
              <button
                key={m.id}
                onClick={() => setSelectedModelId(m.id)}
                className={`px-3 py-1.5 text-xs font-mono font-bold tracking-wider uppercase transition-colors whitespace-nowrap ${
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

        {/* Main Configurator Layout (3D Visualizer + Studio Control Dock) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mt-8 items-start">
          {/* Left: 3D Real-time Visualizer Canvas */}
          <div className="lg:col-span-8 flex flex-col gap-4">
            <div className="relative h-[480px] sm:h-[580px] border border-white/15 bg-black overflow-hidden shadow-2xl">
              <CarVisualizer
                colorHex={exteriorColor.hex}
                caliperHex={caliper.hex}
                wheelStyle={wheel.id}
                aeroPackage={aeroPkg.id}
                cameraPreset={cameraPreset}
                interactive={true}
                className="w-full h-full"
              />

              {/* Angle Preset Switchers */}
              <div className="absolute top-4 right-4 z-20 flex flex-wrap gap-1.5 p-1 bg-black/70 backdrop-blur-md border border-white/10">
                <button
                  onClick={() => setCameraPreset('front34')}
                  className={`px-2.5 py-1 text-[10px] font-mono uppercase tracking-wider ${
                    cameraPreset === 'front34' ? 'bg-[#E5A823] text-black font-bold' : 'text-zinc-400 hover:text-white'
                  }`}
                >
                  3/4 Angle
                </button>
                <button
                  onClick={() => setCameraPreset('side')}
                  className={`px-2.5 py-1 text-[10px] font-mono uppercase tracking-wider ${
                    cameraPreset === 'side' ? 'bg-[#E5A823] text-black font-bold' : 'text-zinc-400 hover:text-white'
                  }`}
                >
                  Profile
                </button>
                <button
                  onClick={() => setCameraPreset('rear')}
                  className={`px-2.5 py-1 text-[10px] font-mono uppercase tracking-wider ${
                    cameraPreset === 'rear' ? 'bg-[#E5A823] text-black font-bold' : 'text-zinc-400 hover:text-white'
                  }`}
                >
                  Diffuser
                </button>
                <button
                  onClick={() => setCameraPreset('wheels')}
                  className={`px-2.5 py-1 text-[10px] font-mono uppercase tracking-wider ${
                    cameraPreset === 'wheels' ? 'bg-[#E5A823] text-black font-bold' : 'text-zinc-400 hover:text-white'
                  }`}
                >
                  Rims
                </button>
              </div>

              {/* Dynamic Live Spec Banner Overlay */}
              <div className="absolute bottom-4 left-4 z-20 hidden sm:flex items-center gap-6 p-3 bg-black/85 backdrop-blur-md border border-white/10 text-xs font-mono">
                <div>
                  <span className="text-[9px] text-zinc-500 uppercase block">Active Spec</span>
                  <span className="text-white font-bold">{exteriorColor.name}</span>
                </div>
                <div className="w-[1px] h-6 bg-white/10" />
                <div>
                  <span className="text-[9px] text-zinc-500 uppercase block">Calculated Mass</span>
                  <span className="text-white font-mono-num font-bold">{calculatedWeight} kg</span>
                </div>
                <div className="w-[1px] h-6 bg-white/10" />
                <div>
                  <span className="text-[9px] text-zinc-500 uppercase block">Wing Downforce</span>
                  <span className="text-[#E5A823] font-mono-num font-bold">{calculatedDownforce} kg</span>
                </div>
              </div>
            </div>

            {/* Notification message */}
            {saveSuccessMsg && (
              <div className="p-3 bg-[#E5A823]/20 border border-[#E5A823] text-xs font-mono text-[#E5A823] flex items-center gap-2">
                <Check className="w-4 h-4" />
                <span>{saveSuccessMsg}</span>
              </div>
            )}
          </div>

          {/* Right: Studio Customization Suite & Options */}
          <div className="lg:col-span-4 bg-[#09090e] border border-white/10 p-6 sm:p-8 space-y-6">
            {/* Category Selector Tabs (Paint, Wheels, Interior, Calipers, Aero) */}
            <div className="flex border-b border-white/10 pb-2 gap-1 overflow-x-auto">
              {[
                { id: 'paint', label: 'EXTERIOR', icon: <Palette className="w-3.5 h-3.5" /> },
                { id: 'wheels', label: 'WHEELS', icon: <Disc className="w-3.5 h-3.5" /> },
                { id: 'interior', label: 'INTERIOR', icon: <Armchair className="w-3.5 h-3.5" /> },
                { id: 'calipers', label: 'CALIPERS', icon: <Flame className="w-3.5 h-3.5" /> },
                { id: 'aero', label: 'AERODYNAMICS', icon: <Wind className="w-3.5 h-3.5" /> },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`flex items-center gap-1.5 px-3 py-2 text-xs font-mono tracking-wider uppercase transition-colors whitespace-nowrap ${
                    activeTab === tab.id
                      ? 'text-[#E5A823] border-b-2 border-[#E5A823] font-bold'
                      : 'text-zinc-400 hover:text-white'
                  }`}
                >
                  {tab.icon}
                  <span>{tab.label}</span>
                </button>
              ))}
            </div>

            {/* Tab 1: EXTERIOR COLOR */}
            {activeTab === 'paint' && (
              <div className="space-y-4 animate-in fade-in duration-200">
                <div className="flex justify-between items-center text-xs font-mono">
                  <span className="text-zinc-400">Selected Shade:</span>
                  <span className="text-white font-bold">{exteriorColor.name}</span>
                </div>

                <div className="grid grid-cols-4 gap-3">
                  {EXTERIOR_COLORS.map((col) => (
                    <button
                      key={col.id}
                      onClick={() => setExteriorColor(col)}
                      className={`group relative p-2 bg-black/40 border transition-all flex flex-col items-center gap-2 ${
                        exteriorColor.id === col.id
                          ? 'border-[#E5A823] shadow-[0_0_15px_rgba(229,168,35,0.4)]'
                          : 'border-white/10 hover:border-white/40'
                      }`}
                    >
                      <span
                        className="w-8 h-8 rounded-full border border-white/20 shadow-inner"
                        style={{ backgroundColor: col.hex }}
                      />
                      <span className="text-[10px] font-sans text-center text-zinc-300 leading-tight">
                        {col.name.split(' ')[0]}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Tab 2: WHEELS */}
            {activeTab === 'wheels' && (
              <div className="space-y-4 animate-in fade-in duration-200">
                <span className="text-xs font-mono text-zinc-400 uppercase block">Rims & Wheel Finish</span>
                <div className="space-y-3">
                  {WHEEL_OPTIONS.map((w) => (
                    <button
                      key={w.id}
                      onClick={() => setWheel(w)}
                      className={`w-full p-4 border text-left transition-all flex items-center justify-between ${
                        wheel.id === w.id
                          ? 'bg-[#E5A823]/10 border-[#E5A823]'
                          : 'bg-black/40 border-white/10 hover:border-white/30'
                      }`}
                    >
                      <div>
                        <h4 className="text-xs font-bold text-white uppercase">{w.name}</h4>
                        <span className="text-[11px] text-zinc-400 font-sans block">{w.finish} · {w.sizeInch}"</span>
                      </div>
                      <span className="text-xs font-mono text-[#E5A823]">
                        {w.priceDelta === 0 ? 'Included' : `+$${w.priceDelta.toLocaleString()}`}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Tab 3: INTERIOR */}
            {activeTab === 'interior' && (
              <div className="space-y-4 animate-in fade-in duration-200">
                <span className="text-xs font-mono text-zinc-400 uppercase block">Cockpit Architecture & Upholstery</span>
                <div className="space-y-3">
                  {INTERIOR_OPTIONS.map((intr) => (
                    <button
                      key={intr.id}
                      onClick={() => setInterior(intr)}
                      className={`w-full p-4 border text-left transition-all flex items-center justify-between ${
                        interior.id === intr.id
                          ? 'bg-[#E5A823]/10 border-[#E5A823]'
                          : 'bg-black/40 border-white/10 hover:border-white/30'
                      }`}
                    >
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="w-3 h-3 rounded-full" style={{ backgroundColor: intr.primaryHex }} />
                          <h4 className="text-xs font-bold text-white uppercase">{intr.name}</h4>
                        </div>
                        <span className="text-[11px] text-zinc-400 font-sans block mt-0.5">{intr.material}</span>
                      </div>
                      <span className="text-xs font-mono text-[#E5A823]">
                        {intr.priceDelta === 0 ? 'Standard' : `+$${intr.priceDelta.toLocaleString()}`}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Tab 4: CALIPERS */}
            {activeTab === 'calipers' && (
              <div className="space-y-4 animate-in fade-in duration-200">
                <span className="text-xs font-mono text-zinc-400 uppercase block">Carbon Ceramic Caliper Anodizing</span>
                <div className="grid grid-cols-2 gap-3">
                  {CALIPER_OPTIONS.map((cal) => (
                    <button
                      key={cal.id}
                      onClick={() => setCaliper(cal)}
                      className={`p-3 border text-left flex items-center gap-3 transition-all ${
                        caliper.id === cal.id
                          ? 'bg-[#E5A823]/10 border-[#E5A823]'
                          : 'bg-black/40 border-white/10 hover:border-white/30'
                      }`}
                    >
                      <span className="w-4 h-4 rounded-full border border-white/20" style={{ backgroundColor: cal.hex }} />
                      <span className="text-xs font-sans text-white">{cal.name}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Tab 5: AERODYNAMICS */}
            {activeTab === 'aero' && (
              <div className="space-y-4 animate-in fade-in duration-200">
                <span className="text-xs font-mono text-zinc-400 uppercase block">Aerodynamic Load Packages</span>
                <div className="space-y-3">
                  {AERO_PACKAGES.map((pkg) => (
                    <button
                      key={pkg.id}
                      onClick={() => setAeroPkg(pkg)}
                      className={`w-full p-4 border text-left transition-all flex items-center justify-between ${
                        aeroPkg.id === pkg.id
                          ? 'bg-[#E5A823]/10 border-[#E5A823]'
                          : 'bg-black/40 border-white/10 hover:border-white/30'
                      }`}
                    >
                      <div>
                        <h4 className="text-xs font-bold text-white uppercase">{pkg.name}</h4>
                        <p className="text-[11px] text-zinc-400 font-sans mt-0.5 max-w-xs">{pkg.description}</p>
                      </div>
                      <span className="text-xs font-mono text-[#E5A823] whitespace-nowrap ml-2">
                        {pkg.priceDelta === 0 ? 'Standard' : `+$${pkg.priceDelta.toLocaleString()}`}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Pricing Summary Card */}
            <div className="pt-6 border-t border-white/10 space-y-3">
              <div className="flex justify-between items-center text-xs font-mono">
                <span className="text-zinc-400">Base Model Price</span>
                <span className="text-white font-mono-num">${currentModel.startingPriceUSD.toLocaleString()}</span>
              </div>
              <div className="flex justify-between items-center text-xs font-mono">
                <span className="text-zinc-400">Selected Atelier Options</span>
                <span className="text-[#E5A823] font-mono-num">+${totalOptionsPrice.toLocaleString()}</span>
              </div>
              <div className="flex justify-between items-center pt-2 border-t border-white/10">
                <span className="text-xs font-mono uppercase text-zinc-400">Estimated Total (MSRP)</span>
                <span className="text-2xl font-display font-extrabold text-white font-mono-num">
                  ${estimatedPriceUSD.toLocaleString()} <span className="text-xs font-mono text-zinc-400">USD</span>
                </span>
              </div>
            </div>

            {/* Action Buttons (Prompt requirements: SAVE CONFIGURATION, REQUEST A QUOTE) */}
            <div className="pt-2 space-y-3">
              <button
                onClick={() => onRequestQuote(getFullSummary())}
                className="w-full py-4 bg-[#E5A823] hover:bg-white text-black font-semibold text-xs tracking-[0.2em] uppercase transition-all shadow-[0_0_25px_rgba(229,168,35,0.4)] flex items-center justify-center gap-2"
              >
                <span>REQUEST A QUOTE</span>
                <ChevronRight className="w-4 h-4" />
              </button>

              <button
                onClick={handleSaveConfiguration}
                className="w-full py-3 bg-white/5 hover:bg-white/15 text-white border border-white/15 text-xs font-mono font-bold tracking-widest uppercase transition-colors"
              >
                SAVE CONFIGURATION
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
