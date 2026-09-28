import React from 'react';
import { ArrowUp, Instagram, Youtube, Twitter, Disc as Discord } from 'lucide-react';

interface FooterProps {
  onNavigate: (path: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative bg-[#040406] text-white border-t border-white/10 overflow-hidden">
      {/* Subtle Carbon Pattern Backdrop */}
      <div className="absolute inset-0 carbon-pattern opacity-40 pointer-events-none" />

      {/* Atmospheric Ambient Glow */}
      <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-96 h-96 bg-[#E5A823]/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-6 sm:px-10 pt-20 pb-14">
        {/* Giant Editorial Statement */}
        <div className="border-b border-white/10 pb-16 flex flex-col lg:flex-row lg:items-end justify-between gap-8">
          <div>
            <span className="text-xs font-mono tracking-[0.25em] text-[#E5A823] uppercase block mb-3">
              Automobili Lamborghini S.p.A.
            </span>
            <h2 className="text-4xl sm:text-6xl lg:text-7xl font-display font-extrabold tracking-tight text-white leading-none">
              FEARLESS BY DESIGN.
            </h2>
          </div>

          <button
            onClick={scrollToTop}
            className="self-start lg:self-end flex items-center gap-2 px-5 py-3 border border-white/15 hover:border-[#E5A823] text-xs font-mono tracking-widest text-zinc-300 hover:text-[#E5A823] uppercase transition-colors"
          >
            <span>Top of Page</span>
            <ArrowUp className="w-4 h-4" />
          </button>
        </div>

        {/* Links Navigation Matrix */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10 py-16 border-b border-white/10 text-xs">
          <div>
            <h4 className="font-mono text-zinc-500 uppercase tracking-widest text-[11px] mb-4">Models</h4>
            <ul className="space-y-2.5">
              {['Revuelto', 'Temerario', 'Urus SE', 'Huracán Tecnica'].map((name) => (
                <li key={name}>
                  <button
                    onClick={() => {
                      onNavigate(`/models/${name.toLowerCase().split(' ')[0]}`);
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className="text-zinc-300 hover:text-white transition-colors"
                  >
                    {name}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-mono text-zinc-500 uppercase tracking-widest text-[11px] mb-4">Ecosystem</h4>
            <ul className="space-y-2.5">
              {[
                { name: '3D Configurator', path: '/configurator' },
                { name: 'Active Aerodynamics', path: '/technology' },
                { name: 'LDVI Vehicle Dynamics', path: '/technology' },
                { name: 'Forged Composites', path: '/technology' },
              ].map((item) => (
                <li key={item.name}>
                  <button
                    onClick={() => {
                      onNavigate(item.path);
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className="text-zinc-300 hover:text-white transition-colors"
                  >
                    {item.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-mono text-zinc-500 uppercase tracking-widest text-[11px] mb-4">Experience</h4>
            <ul className="space-y-2.5">
              {[
                { name: 'Esperienza Corsa', path: '/experience' },
                { name: 'Accademia Driving', path: '/experience' },
                { name: 'Sant’Agata Factory Tour', path: '/experience' },
                { name: 'Museum MUDETEC', path: '/experience' },
              ].map((item) => (
                <li key={item.name}>
                  <button
                    onClick={() => {
                      onNavigate(item.path);
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className="text-zinc-300 hover:text-white transition-colors"
                  >
                    {item.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-mono text-zinc-500 uppercase tracking-widest text-[11px] mb-4">Concierge & Legal</h4>
            <ul className="space-y-2.5">
              {[
                { name: 'Private Client Concierge', path: '/contact' },
                { name: 'Dealer Locator', path: '/contact' },
                { name: 'Privacy Statement', path: '/contact' },
                { name: 'Compliance & Legal', path: '/contact' },
              ].map((item) => (
                <li key={item.name}>
                  <button
                    onClick={() => {
                      onNavigate(item.path);
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className="text-zinc-300 hover:text-white transition-colors"
                  >
                    {item.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Credits & Copyright */}
        <div className="pt-10 flex flex-col sm:flex-row items-center justify-between gap-6 text-xs text-zinc-500 font-mono">
          <div className="flex items-center gap-6">
            <span className="font-display font-bold text-white tracking-[0.2em]">LAMBORGHINI</span>
            <span>© {new Date().getFullYear()} Automobili Lamborghini S.p.A. All rights reserved.</span>
          </div>

          <div className="flex items-center gap-5 text-zinc-400">
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noreferrer"
              className="hover:text-white transition-colors"
              aria-label="Instagram"
            >
              <Instagram className="w-4 h-4" />
            </a>
            <a
              href="https://youtube.com"
              target="_blank"
              rel="noreferrer"
              className="hover:text-white transition-colors"
              aria-label="YouTube"
            >
              <Youtube className="w-4 h-4" />
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noreferrer"
              className="hover:text-white transition-colors"
              aria-label="Twitter"
            >
              <Twitter className="w-4 h-4" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
