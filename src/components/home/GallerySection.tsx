import React, { useState, useEffect } from 'react';
import { Maximize2, X, ChevronLeft, ChevronRight, Eye, Camera } from 'lucide-react';

interface GalleryItem {
  id: string;
  title: string;
  subtitle: string;
  location: string;
  category: string;
  colorHex: string;
}

const GALLERY_COLLECTION: GalleryItem[] = [
  {
    id: 'gal-1',
    title: 'Monofuselage in Twilight',
    subtitle: 'High-speed aerodynamics meeting architectural stillness in Sant’Agata.',
    location: 'Emilia-Romagna, Italy',
    category: 'TRACK ARCHITECTURE',
    colorHex: '#FF6600',
  },
  {
    id: 'gal-2',
    title: 'V10 Exhaust Glow at Redline',
    subtitle: 'Titanium heat-tinting under sustained dynamometer validation test.',
    location: 'Squadra Corse Testing Cell',
    category: 'MECHANICS',
    colorHex: '#E5A823',
  },
  {
    id: 'gal-3',
    title: 'Carbon Weave Cockpit Geometry',
    subtitle: 'Driver-centric pilot console with forged composite toggles and telemetry display.',
    location: 'Ad Personam Studio',
    category: 'INTERIOR',
    colorHex: '#06B6D4',
  },
  {
    id: 'gal-4',
    title: 'Aerodynamic Apex Vectoring',
    subtitle: 'ALA 2.0 active flaps balancing vertical load at 280 km/h entry speed.',
    location: 'Autodromo Vallelunga',
    category: 'DYNAMICS',
    colorHex: '#84CC16',
  },
  {
    id: 'gal-5',
    title: 'Predator Y-Shape Headlight Matrix',
    subtitle: 'Minimalist laser-guided illumination cutting through dawn mist.',
    location: 'Passo dello Stelvio',
    category: 'DESIGN DNA',
    colorHex: '#EF4444',
  },
  {
    id: 'gal-6',
    title: 'High-Downforce Rear Diffuser',
    subtitle: 'Venturi tunnels channeling high velocity underbody airflow to eliminate drag.',
    location: 'Nürburgring Nordschleife',
    category: 'AERO',
    colorHex: '#A855F7',
  },
];

export const GallerySection: React.FC = () => {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  // Keyboard navigation for lightbox
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (lightboxIndex === null) return;
      if (e.key === 'Escape') setLightboxIndex(null);
      if (e.key === 'ArrowRight') {
        setLightboxIndex((prev) => (prev! + 1) % GALLERY_COLLECTION.length);
      }
      if (e.key === 'ArrowLeft') {
        setLightboxIndex((prev) => (prev! - 1 + GALLERY_COLLECTION.length) % GALLERY_COLLECTION.length);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [lightboxIndex]);

  return (
    <section id="gallery" className="relative py-28 bg-[#030304] text-white border-t border-white/10">
      <div className="max-w-7xl mx-auto px-6 sm:px-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div>
            <div className="inline-flex items-center gap-2 mb-3">
              <span className="w-1.5 h-1.5 bg-[#E5A823]" />
              <span className="text-xs font-mono tracking-[0.25em] text-[#E5A823] uppercase">
                Visual Archive
              </span>
            </div>
            <h2 className="text-4xl sm:text-6xl font-display font-extrabold tracking-tight text-white leading-none">
              PHOTOGRAPHIC GALLERY
            </h2>
          </div>
          <span className="text-xs font-mono text-zinc-400">
            Click any frame to launch the high-resolution lightbox with keyboard navigation.
          </span>
        </div>

        {/* Gallery Grid with Hover Zoom & Luxury Framing */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {GALLERY_COLLECTION.map((item, index) => (
            <div
              key={item.id}
              onClick={() => setLightboxIndex(index)}
              className="group relative h-80 sm:h-96 bg-[#08080c] border border-white/10 hover:border-[#E5A823]/80 transition-all duration-300 overflow-hidden cursor-pointer flex flex-col justify-end p-6"
            >
              {/* Dynamic Stylized Automotive Photography Frame */}
              <div className="absolute inset-0 transition-transform duration-700 ease-out group-hover:scale-105">
                <div
                  className="w-full h-full carbon-pattern opacity-80"
                  style={{
                    background: `radial-gradient(circle at 60% 40%, ${item.colorHex}22 0%, #050508 75%)`,
                  }}
                />

                {/* Abstract Stylized Vehicle Vector Artwork */}
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-40 group-hover:opacity-75 transition-opacity">
                  <svg viewBox="0 0 400 240" className="w-3/4 max-h-48 drop-shadow-2xl" fill="none">
                    <path
                      d="M 40,160 L 100,140 L 180,90 L 250,90 L 330,130 L 370,160 Z"
                      fill="#0d0d12"
                      stroke={item.colorHex}
                      strokeWidth="2"
                    />
                    <path d="M 120,140 L 180,95 L 245,95 L 290,130 Z" fill="rgba(6,182,212,0.3)" />
                    <circle cx="100" cy="160" r="28" stroke="#52525b" strokeWidth="3" fill="#09090c" />
                    <circle cx="310" cy="160" r="28" stroke="#52525b" strokeWidth="3" fill="#09090c" />
                    <path d="M 60,150 L 110,145 M 110,145 L 140,135 M 110,145 L 138,155" stroke="#FFE599" strokeWidth="2.5" />
                  </svg>
                </div>
              </div>

              {/* Scrim gradient for text legibility */}
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent pointer-events-none" />

              {/* Card Meta Overlay */}
              <div className="relative z-10 space-y-1">
                <div className="flex items-center justify-between text-[10px] font-mono tracking-widest text-[#E5A823] uppercase">
                  <span>{item.category}</span>
                  <span className="text-zinc-500 font-mono-num">0{index + 1} / 06</span>
                </div>
                <h3 className="text-lg font-bold font-display text-white group-hover:text-[#E5A823] transition-colors">
                  {item.title}
                </h3>
                <p className="text-xs text-zinc-400 font-sans line-clamp-1">{item.subtitle}</p>
              </div>

              {/* Corner Expand Icon */}
              <div className="absolute top-4 right-4 z-10 w-8 h-8 rounded-full bg-black/60 backdrop-blur-md border border-white/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <Maximize2 className="w-3.5 h-3.5 text-white" />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Fullscreen Modal Lightbox (Prompt requirement: fullscreen images, hover zoom, keyboard nav, thumbnails, image counter) */}
      {lightboxIndex !== null && (
        <div className="fixed inset-0 z-50 bg-black/95 backdrop-blur-2xl flex flex-col justify-between p-6 sm:p-10 animate-in fade-in duration-200">
          {/* Top Bar with Counter & Close */}
          <div className="flex items-center justify-between border-b border-white/10 pb-4">
            <div className="flex items-center gap-4 text-xs font-mono">
              <span className="text-[#E5A823] font-bold">
                IMAGE {lightboxIndex + 1} OF {GALLERY_COLLECTION.length}
              </span>
              <span className="text-zinc-500">Use ← → keys to navigate · ESC to close</span>
            </div>

            <button
              onClick={() => setLightboxIndex(null)}
              className="p-2 text-zinc-400 hover:text-white transition-colors"
              aria-label="Close Lightbox"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Main Visual Display */}
          <div className="relative flex-1 flex items-center justify-center my-4 overflow-hidden">
            {/* Prev Button */}
            <button
              onClick={() =>
                setLightboxIndex((prev) => (prev! - 1 + GALLERY_COLLECTION.length) % GALLERY_COLLECTION.length)
              }
              className="absolute left-2 sm:left-6 z-20 p-3 bg-black/60 hover:bg-[#E5A823] hover:text-black border border-white/20 text-white transition-colors"
              aria-label="Previous Image"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>

            {/* Active Display Panel */}
            <div className="relative max-w-5xl w-full h-[60vh] bg-[#07070b] border border-white/20 flex flex-col justify-between p-8 sm:p-12 shadow-2xl">
              <div className="flex justify-between items-start">
                <span className="text-xs font-mono tracking-widest text-[#E5A823] uppercase">
                  {GALLERY_COLLECTION[lightboxIndex].category} · {GALLERY_COLLECTION[lightboxIndex].location}
                </span>
                <span className="text-xs font-mono text-zinc-500 font-mono-num">
                  0{lightboxIndex + 1} / 0{GALLERY_COLLECTION.length}
                </span>
              </div>

              {/* Large Centered Visual Graphic */}
              <div className="my-auto flex items-center justify-center py-8">
                <div className="w-full max-w-2xl h-64 flex items-center justify-center relative">
                  <div
                    className="absolute inset-0 rounded-full blur-[100px] opacity-30"
                    style={{ backgroundColor: GALLERY_COLLECTION[lightboxIndex].colorHex }}
                  />
                  <svg viewBox="0 0 500 240" className="w-full h-full relative z-10" fill="none">
                    <path
                      d="M 30,170 L 100,150 L 220,90 L 320,90 L 420,140 L 470,170 Z"
                      fill="#0e0e14"
                      stroke={GALLERY_COLLECTION[lightboxIndex].colorHex}
                      strokeWidth="2.5"
                    />
                    <path d="M 140,150 L 220,95 L 315,95 L 370,140 Z" fill="rgba(6,182,212,0.3)" />
                    <circle cx="110" cy="170" r="32" stroke="#52525b" strokeWidth="4" fill="#050508" />
                    <circle cx="390" cy="170" r="32" stroke="#52525b" strokeWidth="4" fill="#050508" />
                    <path d="M 60,160 L 120,155 M 120,155 L 155,145 M 120,155 L 155,165" stroke="#FFE599" strokeWidth="3" />
                  </svg>
                </div>
              </div>

              <div className="border-t border-white/10 pt-4">
                <h3 className="text-2xl sm:text-3xl font-bold font-display text-white">
                  {GALLERY_COLLECTION[lightboxIndex].title}
                </h3>
                <p className="text-sm text-zinc-300 font-sans mt-1">
                  {GALLERY_COLLECTION[lightboxIndex].subtitle}
                </p>
              </div>
            </div>

            {/* Next Button */}
            <button
              onClick={() => setLightboxIndex((prev) => (prev! + 1) % GALLERY_COLLECTION.length)}
              className="absolute right-2 sm:right-6 z-20 p-3 bg-black/60 hover:bg-[#E5A823] hover:text-black border border-white/20 text-white transition-colors"
              aria-label="Next Image"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>

          {/* Bottom Thumbnails Strip */}
          <div className="flex items-center justify-center gap-3 overflow-x-auto py-2 border-t border-white/10">
            {GALLERY_COLLECTION.map((thumb, idx) => (
              <button
                key={thumb.id}
                onClick={() => setLightboxIndex(idx)}
                className={`w-16 h-10 border transition-all ${
                  lightboxIndex === idx
                    ? 'border-[#E5A823] scale-105 shadow-md'
                    : 'border-white/20 opacity-50 hover:opacity-100'
                }`}
                style={{ backgroundColor: '#09090e' }}
              >
                <div
                  className="w-full h-full flex items-center justify-center text-[9px] font-mono text-zinc-400"
                  style={{ borderLeft: `3px solid ${thumb.colorHex}` }}
                >
                  0{idx + 1}
                </div>
              </button>
            ))}
          </div>
        </div>
      )}
    </section>
  );
};
