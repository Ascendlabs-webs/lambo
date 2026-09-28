import React, { useState, useEffect } from 'react';
import { Search, Menu, X, ArrowUpRight, ChevronRight, Sliders, Volume2 } from 'lucide-react';
import { CAR_MODELS } from '../../data/models';

interface NavbarProps {
  currentPath: string;
  onNavigate: (path: string) => void;
  onOpenQuote: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ currentPath, onNavigate, onOpenQuote }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'MODELS', path: '/models' },
    { label: 'PERFORMANCE', path: '/#performance' },
    { label: 'TECHNOLOGY', path: '/technology' },
    { label: 'CONFIGURATOR', path: '/configurator' },
    { label: 'EXPERIENCE', path: '/experience' },
  ];

  const filteredModels = CAR_MODELS.filter(
    (m) =>
      m.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      m.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      m.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleLinkClick = (path: string) => {
    setIsMenuOpen(false);
    setIsSearchOpen(false);
    if (path.startsWith('/#')) {
      const id = path.replace('/#', '');
      if (currentPath === '/') {
        const el = document.getElementById(id);
        el?.scrollIntoView({ behavior: 'smooth' });
      } else {
        onNavigate('/');
        setTimeout(() => {
          const el = document.getElementById(id);
          el?.scrollIntoView({ behavior: 'smooth' });
        }, 150);
      }
    } else {
      onNavigate(path);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <>
      {/* Fixed Luxury Header (Strict 1-Row 3-Zone Contract) */}
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          isScrolled
            ? 'py-3.5 bg-black/85 backdrop-blur-xl border-b border-white/10 shadow-lg'
            : 'py-6 bg-gradient-to-b from-black/80 to-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 sm:px-10 flex items-center justify-between">
          {/* Zone 1: Single element wordmark */}
          <button
            onClick={() => handleLinkClick('/')}
            className="text-lg sm:text-xl font-display font-black tracking-[0.25em] text-white hover:text-[#E5A823] transition-colors whitespace-nowrap"
          >
            LAMBORGHINI
          </button>

          {/* Zone 2: 4-6 Clean Text Links */}
          <nav className="hidden md:flex items-center gap-7 lg:gap-9 text-xs font-semibold tracking-[0.16em] text-zinc-300">
            {navLinks.map((link) => (
              <button
                key={link.label}
                onClick={() => handleLinkClick(link.path)}
                className={`transition-colors relative py-1 hover:text-white whitespace-nowrap ${
                  currentPath === link.path ? 'text-[#E5A823]' : ''
                }`}
              >
                {link.label}
                {currentPath === link.path && (
                  <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#E5A823]" />
                )}
              </button>
            ))}
          </nav>

          {/* Zone 3: 1-2 Primary Actions */}
          <div className="flex items-center gap-3 sm:gap-4">
            <button
              onClick={() => setIsSearchOpen(true)}
              className="p-2 text-zinc-300 hover:text-white transition-colors"
              aria-label="Search models and specs"
            >
              <Search className="w-4 h-4" />
            </button>

            <button
              onClick={onOpenQuote}
              className="hidden lg:inline-flex items-center gap-1.5 px-3.5 py-1.5 text-[11px] font-bold tracking-widest uppercase bg-transparent hover:bg-[#E5A823] text-white hover:text-black border border-white/30 hover:border-[#E5A823] transition-all whitespace-nowrap"
            >
              Concierge
            </button>

            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-mono font-bold tracking-widest uppercase bg-white/10 hover:bg-white/20 text-white transition-colors"
              aria-label="Toggle Navigation Menu"
            >
              {isMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
              <span className="hidden sm:inline">{isMenuOpen ? 'CLOSE' : 'MENU'}</span>
            </button>
          </div>
        </div>
      </header>

      {/* Fullscreen Immersive Editorial Menu Overlay */}
      {isMenuOpen && (
        <div className="fixed inset-0 z-50 bg-[#050508]/98 backdrop-blur-2xl flex flex-col justify-between p-6 sm:p-12 animate-in fade-in duration-300">
          <div className="flex items-center justify-between border-b border-white/10 pb-6">
            <button
              onClick={() => handleLinkClick('/')}
              className="text-xl font-display font-black tracking-[0.25em] text-white"
            >
              LAMBORGHINI
            </button>
            <button
              onClick={() => setIsMenuOpen(false)}
              className="flex items-center gap-2 text-xs font-mono tracking-widest text-zinc-400 hover:text-white uppercase p-2"
            >
              <X className="w-5 h-5 text-[#E5A823]" />
              <span>Close Menu</span>
            </button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 my-auto py-8">
            {/* Left Primary Navigation Links with oversized editorial typography */}
            <div className="lg:col-span-7 space-y-4 sm:space-y-6">
              <span className="text-[11px] font-mono tracking-[0.25em] text-[#E5A823] uppercase block">
                Directory
              </span>
              <ul className="space-y-3 sm:space-y-4">
                {[
                  { label: 'HOME', path: '/', desc: 'Cinematic Experience & Flagship Hero' },
                  { label: 'MODELS LINEUP', path: '/models', desc: 'Revuelto, Temerario, Urus, Huracán' },
                  { label: '3D CONFIGURATOR', path: '/configurator', desc: 'Personalize colors, wheels & aero' },
                  { label: 'ADVANCED TECHNOLOGY', path: '/technology', desc: 'LDVI 2.0, Carbon Monofuselage & ALA' },
                  { label: 'EXPERIENCE & ACCADEMIA', path: '/experience', desc: 'Track days & Sant’Agata Bolognese' },
                  { label: 'VIP CONCIERGE', path: '/contact', desc: 'Acquisition & Global Dealer Network' },
                ].map((item, idx) => (
                  <li key={item.path}>
                    <button
                      onClick={() => handleLinkClick(item.path)}
                      className="group flex flex-col text-left transition-transform duration-200 hover:translate-x-2"
                    >
                      <span className="text-2xl sm:text-4xl lg:text-5xl font-display font-extrabold tracking-tight text-white group-hover:text-[#E5A823] transition-colors">
                        {item.label}
                      </span>
                      <span className="text-xs text-zinc-500 font-sans mt-0.5">{item.desc}</span>
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Right: Quick Model Direct Links */}
            <div className="lg:col-span-5 flex flex-col justify-center border-t lg:border-t-0 lg:border-l border-white/10 pt-6 lg:pt-0 lg:pl-10 space-y-6">
              <span className="text-[11px] font-mono tracking-[0.25em] text-[#E5A823] uppercase block">
                Flagship Machines
              </span>
              <div className="space-y-4">
                {CAR_MODELS.map((car) => (
                  <button
                    key={car.id}
                    onClick={() => handleLinkClick(`/models/${car.id}`)}
                    className="w-full text-left p-4 bg-white/[0.03] hover:bg-white/[0.08] border border-white/10 hover:border-[#E5A823]/60 transition-all group flex items-center justify-between"
                  >
                    <div>
                      <span className="text-[10px] font-mono text-zinc-400 uppercase">{car.category}</span>
                      <h4 className="text-lg font-bold font-display text-white group-hover:text-[#E5A823] transition-colors">
                        {car.name}
                      </h4>
                      <p className="text-xs text-zinc-400 font-mono-num">{car.powerCV} CV · 0-100 {car.acceleration0To100}s</p>
                    </div>
                    <ArrowUpRight className="w-5 h-5 text-zinc-500 group-hover:text-[#E5A823] transition-colors" />
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between text-xs text-zinc-500 font-mono">
            <span>Automobili Lamborghini S.p.A. · Sant'Agata Bolognese, Italy</span>
            <span>44.6582° N, 11.1275° E</span>
          </div>
        </div>
      )}

      {/* Instant Search Modal */}
      {isSearchOpen && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-xl flex items-start justify-center pt-24 px-4">
          <div className="w-full max-w-2xl bg-[#09090d] border border-white/15 p-6 shadow-2xl">
            <div className="flex items-center justify-between pb-4 border-b border-white/10">
              <div className="flex items-center gap-3 flex-1 mr-4">
                <Search className="w-5 h-5 text-[#E5A823]" />
                <input
                  type="text"
                  autoFocus
                  placeholder="Search models, engines, technologies..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-transparent text-white placeholder-zinc-500 text-sm focus:outline-none"
                />
              </div>
              <button
                onClick={() => setIsSearchOpen(false)}
                className="text-xs text-zinc-400 hover:text-white uppercase font-mono"
              >
                ESC
              </button>
            </div>

            <div className="mt-4 max-h-80 overflow-y-auto space-y-2">
              {filteredModels.length > 0 ? (
                filteredModels.map((model) => (
                  <button
                    key={model.id}
                    onClick={() => handleLinkClick(`/models/${model.id}`)}
                    className="w-full text-left p-3 hover:bg-white/5 border border-transparent hover:border-white/10 transition-colors flex items-center justify-between group"
                  >
                    <div>
                      <h5 className="text-sm font-bold text-white group-hover:text-[#E5A823] font-display">
                        {model.name}
                      </h5>
                      <p className="text-xs text-zinc-400 font-sans">{model.tagline}</p>
                    </div>
                    <span className="text-xs font-mono text-zinc-400 group-hover:text-white">
                      {model.powerCV} CV
                    </span>
                  </button>
                ))
              ) : (
                <div className="py-8 text-center text-xs text-zinc-500">
                  No matching models found. Try searching for "Revuelto", "V10", "Hybrid", or "Urus".
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};
