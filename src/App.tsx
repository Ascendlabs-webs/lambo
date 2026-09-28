/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { CustomCursor } from './components/common/CustomCursor';
import { QuoteModal } from './components/common/QuoteModal';

// Home Page Sections
import { HeroSection } from './components/home/HeroSection';
import { InteractiveCarSection } from './components/home/InteractiveCarSection';
import { PerformanceSection } from './components/home/PerformanceSection';
import { EngineSection } from './components/home/EngineSection';
import { AeroSection } from './components/home/AeroSection';
import { ExperienceQuoteSection } from './components/home/ExperienceQuoteSection';
import { ModelShowcaseSection } from './components/home/ModelShowcaseSection';
import { SoundExperienceSection } from './components/home/SoundExperienceSection';
import { TechnologySection } from './components/home/TechnologySection';
import { SpecificationsSection } from './components/home/SpecificationsSection';
import { GallerySection } from './components/home/GallerySection';

// Sub Pages
import { ConfiguratorStudio } from './components/configurator/ConfiguratorStudio';
import { ModelsPage } from './components/pages/ModelsPage';
import { ModelDetailPage } from './components/pages/ModelDetailPage';
import { TechnologyPage } from './components/pages/TechnologyPage';
import { ExperiencePage } from './components/pages/ExperiencePage';
import { ContactPage } from './components/pages/ContactPage';

export default function App() {
  const [currentPath, setCurrentPath] = useState<string>('/');
  const [activeModelDetailId, setActiveModelDetailId] = useState<string>('revuelto');
  const [configuratorModelId, setConfiguratorModelId] = useState<string>('revuelto');

  // Quote Modal state
  const [isQuoteModalOpen, setIsQuoteModalOpen] = useState(false);
  const [quoteSummary, setQuoteSummary] = useState<string | undefined>(undefined);

  // Sync browser back/forward buttons with custom routing
  useEffect(() => {
    const handlePopState = () => {
      const path = window.location.pathname || '/';
      if (path.startsWith('/models/')) {
        const id = path.replace('/models/', '');
        setActiveModelDetailId(id);
        setCurrentPath('/models/:id');
      } else {
        setCurrentPath(path);
      }
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const navigateTo = (path: string) => {
    if (path.startsWith('/models/')) {
      const id = path.replace('/models/', '');
      setActiveModelDetailId(id);
      setCurrentPath('/models/:id');
    } else {
      setCurrentPath(path);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOpenQuote = (summary?: string) => {
    setQuoteSummary(summary);
    setIsQuoteModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-black text-white relative selection:bg-[#E5A823] selection:text-black">
      {/* Desktop Luxury Magnetic Custom Cursor */}
      <CustomCursor />

      {/* Top Navigation Bar with 3-Zone Contract */}
      <Navbar
        currentPath={currentPath}
        onNavigate={navigateTo}
        onOpenQuote={() => handleOpenQuote()}
      />

      {/* Page Routing Views */}
      <main className="min-h-screen">
        {currentPath === '/' && (
          <>
            {/* 1. Cinematic Hero */}
            <HeroSection
              onExploreClick={() => {
                const el = document.getElementById('interactive-car');
                el?.scrollIntoView({ behavior: 'smooth' });
              }}
              onConfiguratorClick={() => navigateTo('/configurator')}
            />

            {/* 2. Interactive 3D Car Presentation */}
            <InteractiveCarSection
              onNavigateToConfigurator={() => navigateTo('/configurator')}
            />

            {/* 3. Performance Section */}
            <PerformanceSection />

            {/* 4. Engine Section */}
            <EngineSection
              onExploreFullVehicle={() => {
                const el = document.getElementById('aerodynamics');
                el?.scrollIntoView({ behavior: 'smooth' });
              }}
            />

            {/* 5. Aerodynamics Section */}
            <AeroSection />

            {/* 6. The Experience Section */}
            <ExperienceQuoteSection
              onExploreExperience={() => navigateTo('/experience')}
            />

            {/* 7. Model Showcase Section */}
            <ModelShowcaseSection
              onSelectModel={(id) => {
                setActiveModelDetailId(id);
                setCurrentPath('/models/:id');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              onOpenConfiguratorForModel={(id) => {
                setConfiguratorModelId(id);
                setCurrentPath('/configurator');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
            />

            {/* 8. Car Configurator Preview Section */}
            <section className="py-24 bg-[#050508] border-t border-white/10 px-6 sm:px-12 text-center">
              <div className="max-w-4xl mx-auto space-y-6">
                <span className="text-xs font-mono tracking-[0.25em] text-[#E5A823] uppercase block">
                  Virtual Atelier
                </span>
                <h2 className="text-4xl sm:text-6xl font-display font-extrabold text-white">
                  CONFIGURATORE DIGITALE
                </h2>
                <p className="text-base text-zinc-300 font-sans max-w-xl mx-auto">
                  Select bespoke Ad Personam exterior hues, carbon-blade forged wheels, and high-downforce
                  aerodynamic wings in our real-time 3D studio.
                </p>
                <div className="pt-4">
                  <button
                    onClick={() => navigateTo('/configurator')}
                    className="px-8 py-4 bg-[#E5A823] hover:bg-white text-black font-semibold text-xs tracking-widest uppercase transition-all shadow-[0_0_30px_rgba(229,168,35,0.4)]"
                  >
                    Launch Full 3D Configurator Studio
                  </button>
                </div>
              </div>
            </section>

            {/* 9. Sound Experience Section */}
            <SoundExperienceSection />

            {/* 10. Technology Section */}
            <TechnologySection
              onExploreTechnology={() => navigateTo('/technology')}
            />

            {/* 11. Specifications Section */}
            <SpecificationsSection />

            {/* 12. Photographic Gallery Section */}
            <GallerySection />
          </>
        )}

        {/* /models route */}
        {currentPath === '/models' && (
          <ModelsPage
            onSelectModel={(id) => {
              setActiveModelDetailId(id);
              setCurrentPath('/models/:id');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onOpenConfigurator={(id) => {
              setConfiguratorModelId(id);
              setCurrentPath('/configurator');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          />
        )}

        {/* /models/:id route */}
        {currentPath === '/models/:id' && (
          <ModelDetailPage
            modelId={activeModelDetailId}
            onBack={() => navigateTo('/models')}
            onOpenConfigurator={(id) => {
              setConfiguratorModelId(id);
              setCurrentPath('/configurator');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onRequestQuote={(summary) => handleOpenQuote(summary)}
          />
        )}

        {/* /configurator route */}
        {currentPath === '/configurator' && (
          <ConfiguratorStudio
            initialModelId={configuratorModelId}
            onRequestQuote={(summary) => handleOpenQuote(summary)}
          />
        )}

        {/* /technology route */}
        {currentPath === '/technology' && (
          <TechnologyPage
            onNavigateToConfigurator={() => navigateTo('/configurator')}
          />
        )}

        {/* /experience route */}
        {currentPath === '/experience' && (
          <ExperiencePage
            onOpenBooking={() => handleOpenQuote('Booking Request for Lamborghini Esperienza')}
          />
        )}

        {/* /contact route */}
        {currentPath === '/contact' && <ContactPage />}
      </main>

      {/* Global Luxury Footer */}
      <Footer onNavigate={navigateTo} />

      {/* VIP Concierge / Quote Modal */}
      <QuoteModal
        isOpen={isQuoteModalOpen}
        onClose={() => setIsQuoteModalOpen(false)}
        initialModelId={activeModelDetailId}
        configurationSummary={quoteSummary}
      />
    </div>
  );
}
