import React from 'react';
import { ArrowUpRight } from 'lucide-react';

interface ExperienceQuoteSectionProps {
  onExploreExperience: () => void;
}

export const ExperienceQuoteSection: React.FC<ExperienceQuoteSectionProps> = ({ onExploreExperience }) => {
  return (
    <section className="relative min-h-[85vh] w-full flex items-center justify-center overflow-hidden bg-black text-white border-t border-white/10 px-6 sm:px-12 py-24">
      {/* Immersive Stylized Architectural Backdrop */}
      <div className="absolute inset-0 bg-gradient-to-t from-black via-[#09090e] to-black opacity-90" />
      <div className="absolute inset-0 carbon-pattern opacity-40 pointer-events-none" />

      {/* Dramatic Golden Horizon Beam */}
      <div className="absolute top-1/2 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#E5A823]/60 to-transparent blur-[2px] pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[300px] bg-[#E5A823]/10 rounded-full blur-[160px] pointer-events-none" />

      <div className="relative z-10 max-w-5xl mx-auto text-center space-y-8">
        <span className="inline-block text-xs sm:text-sm font-mono tracking-[0.3em] text-[#E5A823] uppercase">
          Sant'Agata Bolognese · Design Manifest
        </span>

        {/* Huge Editorial Headline (Prompt requirement) */}
        <h2 className="text-4xl sm:text-6xl md:text-7xl lg:text-9xl font-display font-extrabold tracking-tight text-white leading-none">
          IT DOESN'T ARRIVE. <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#E5A823] via-white to-zinc-400">
            IT APPEARS.
          </span>
        </h2>

        <p className="max-w-2xl mx-auto text-base sm:text-lg text-zinc-300 font-sans leading-relaxed">
          Not merely a motorcar, but an emotional rupture in the fabric of ordinary physics.
          Forged in carbon fiber, tuned by acoustics, and commanded by visceral instinct.
        </p>

        <div className="pt-6">
          <button
            onClick={onExploreExperience}
            className="group inline-flex items-center gap-3 px-8 py-4 bg-[#E5A823] hover:bg-white text-black font-semibold text-xs tracking-[0.2em] uppercase transition-all duration-300 shadow-[0_0_35px_rgba(229,168,35,0.4)]"
          >
            <span>ENTER THE ESPERIENZA</span>
            <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
          </button>
        </div>
      </div>
    </section>
  );
};
