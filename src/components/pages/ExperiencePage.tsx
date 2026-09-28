import React from 'react';
import { Calendar, MapPin, Compass, ArrowUpRight, Award, Shield } from 'lucide-react';

interface ExperiencePageProps {
  onOpenBooking: () => void;
}

export const ExperiencePage: React.FC<ExperiencePageProps> = ({ onOpenBooking }) => {
  const experiences = [
    {
      title: 'Esperienza Corsa',
      subtitle: 'FIA Grade-1 Track Driving Programs',
      location: 'Autodromo Nazionale Monza · Spa-Francorchamps · Silverstone',
      description: 'Pilot the Revuelto and Huracán Super Trofeo at racing velocity under the personal telemetry guidance of Squadra Corse factory drivers.',
      highlight: 'Full telemetry debrief · 1-on-1 racing instructor · High-g lateral dynamics',
      tag: 'TRACK EXCLUSIVE',
    },
    {
      title: 'Accademia Neve',
      subtitle: 'Extreme Low-Friction Winter Dynamics',
      location: 'Livigno, Italian Alps',
      description: 'Master all-wheel drift angle control and dynamic torque vectoring on polished ice and compact snow under sub-zero Alpine conditions.',
      highlight: 'Ice skidpads · Dynamic drift circles · AWD vectoring mastery',
      tag: 'WINTER PROGRAM',
    },
    {
      title: 'Sant’Agata Factory Atelier',
      subtitle: 'The Birthplace of Super Sports Cars',
      location: 'Via Modena 12, Sant’Agata Bolognese, Italy',
      description: 'Walk the sacred V12 assembly line, witness manual leather trimming, inspect high-pressure carbon fiber autoclaves, and design in the Ad Personam studio.',
      highlight: 'VIP line access · Tailored color matching · Private heritage archive',
      tag: 'HERITAGE & CRAFT',
    },
    {
      title: 'MUDETEC Heritage Museum',
      subtitle: 'Museum of Technologies and Design',
      location: 'Sant’Agata Bolognese',
      description: 'An interactive historical journey honoring the vision of Ferruccio Lamborghini through legendary icons: 350 GT, Miura, Countach, Diablo, and concept prototypes.',
      highlight: 'Terzo Millennio concept · Sesto Elemento · Carbon history',
      tag: 'HISTORIC ARCHIVE',
    },
  ];

  return (
    <div className="min-h-screen bg-[#030305] text-white pt-28 pb-20 px-6 sm:px-12">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="border-b border-white/10 pb-12 mb-16">
          <span className="text-xs font-mono tracking-[0.25em] text-[#E5A823] uppercase block mb-3">
            Squadra Corse & Italian Heritage
          </span>
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-display font-extrabold tracking-tight text-white leading-none">
            THE LAMBORGHINI ESPERIENZA
          </h1>
          <p className="mt-4 text-base sm:text-lg text-zinc-400 font-sans max-w-2xl leading-relaxed">
            Exclusive driving academies on legendary racing circuits, winter dynamics on ice in the Alps,
            and private behind-the-scenes access to the factory in Sant’Agata Bolognese.
          </p>
        </div>

        {/* Experience Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {experiences.map((exp, idx) => (
            <div
              key={idx}
              className="group bg-[#08080c] border border-white/10 hover:border-[#E5A823]/80 p-8 sm:p-10 transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between pb-4 border-b border-white/10">
                  <span className="text-[10px] font-mono tracking-widest text-[#E5A823] uppercase">
                    {exp.tag}
                  </span>
                  <div className="flex items-center gap-1.5 text-xs font-mono text-zinc-400">
                    <MapPin className="w-3.5 h-3.5 text-[#E5A823]" />
                    <span>{exp.location.split('·')[0]}</span>
                  </div>
                </div>

                <h3 className="text-2xl sm:text-3xl font-display font-extrabold text-white mt-4 group-hover:text-[#E5A823] transition-colors">
                  {exp.title}
                </h3>
                <span className="text-xs font-mono text-zinc-400 block mt-1">{exp.subtitle}</span>

                <p className="text-sm text-zinc-300 font-sans mt-4 leading-relaxed">
                  {exp.description}
                </p>

                <div className="mt-6 p-3.5 bg-black/50 border border-white/5 text-xs font-mono text-zinc-400">
                  <span className="text-[#E5A823] block mb-1">Key Program Highlights:</span>
                  <span>{exp.highlight}</span>
                </div>
              </div>

              <div className="pt-8 flex justify-end">
                <button
                  onClick={onOpenBooking}
                  className="px-6 py-2.5 bg-white text-black font-semibold text-xs tracking-wider uppercase hover:bg-[#E5A823] transition-colors flex items-center gap-2"
                >
                  <span>Reserve Program</span>
                  <ArrowUpRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
