import React, { useState } from 'react';
import { CAR_MODELS } from '../../data/models';
import { CheckCircle2, Shield, X } from 'lucide-react';

interface QuoteModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialModelId?: string;
  configurationSummary?: string;
}

export const QuoteModal: React.FC<QuoteModalProps> = ({
  isOpen,
  onClose,
  initialModelId = 'revuelto',
  configurationSummary,
}) => {
  const [selectedModel, setSelectedModel] = useState(initialModelId);
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [dealerCity, setDealerCity] = useState('Milan');
  const [timeline, setTimeline] = useState('immediate');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName.trim() || !email.trim() || !phone.trim()) {
      setErrorMsg('Please complete all required fields.');
      return;
    }
    if (!email.includes('@') || !email.includes('.')) {
      setErrorMsg('Please enter a valid email address.');
      return;
    }

    setErrorMsg('');
    setIsSubmitting(true);

    // Simulate luxury concierge API submission
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 900);
  };

  const currentModelData = CAR_MODELS.find((m) => m.id === selectedModel) || CAR_MODELS[0];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-xl animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl bg-[#09090d] border border-white/10 shadow-2xl p-6 sm:p-10 text-left">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-6 right-6 p-2 text-zinc-400 hover:text-white transition-colors"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {isSubmitted ? (
          <div className="text-center py-10 space-y-4">
            <div className="w-16 h-16 mx-auto rounded-full bg-[#E5A823]/10 border border-[#E5A823] flex items-center justify-center text-[#E5A823]">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <span className="text-xs font-mono tracking-widest text-[#E5A823] uppercase block">
              Concierge Request Confirmed
            </span>
            <h3 className="text-2xl sm:text-3xl font-bold font-display text-white">
              WELCOME TO THE HOUSE OF THE BULL
            </h3>
            <p className="text-sm text-zinc-400 max-w-md mx-auto leading-relaxed">
              Your inquiry for the <span className="text-white font-semibold">{currentModelData.name}</span> has been
              received by the Automobili Lamborghini VIP Private Client team at{' '}
              <span className="text-white">{dealerCity}</span>. A personal concierge will contact you within 24 hours.
            </p>
            <div className="pt-6">
              <button
                onClick={() => {
                  setIsSubmitted(false);
                  onClose();
                }}
                className="px-8 py-3 bg-[#E5A823] text-black font-semibold text-xs tracking-widest uppercase hover:bg-white transition-colors"
              >
                Return to Experience
              </button>
            </div>
          </div>
        ) : (
          <div>
            <div className="mb-6">
              <span className="text-xs font-mono tracking-widest text-[#E5A823] uppercase block mb-1">
                Automobili Lamborghini Concierge
              </span>
              <h3 className="text-2xl sm:text-3xl font-bold font-display text-white">
                REQUEST ACQUISITION & QUOTE
              </h3>
              <p className="text-xs text-zinc-400 mt-1">
                Reserve an allocation or receive a bespoke dossier prepared by Sant'Agata Bolognese.
              </p>
            </div>

            {configurationSummary && (
              <div className="mb-5 p-3.5 bg-black/60 border border-white/10 text-xs text-zinc-300 font-mono">
                <span className="text-[#E5A823] font-semibold">Configured Specification: </span>
                {configurationSummary}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              {errorMsg && (
                <div className="p-3 bg-red-950/60 border border-red-500/40 text-red-300 text-xs">{errorMsg}</div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[11px] font-mono text-zinc-400 uppercase tracking-wider mb-1.5">
                    Vehicle Model
                  </label>
                  <select
                    value={selectedModel}
                    onChange={(e) => setSelectedModel(e.target.value)}
                    className="w-full bg-[#121218] border border-white/15 px-3 py-2.5 text-xs text-white focus:outline-none focus:border-[#E5A823]"
                  >
                    {CAR_MODELS.map((model) => (
                      <option key={model.id} value={model.id} className="bg-[#121218] text-white">
                        {model.name} — from ${model.startingPriceUSD.toLocaleString()}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-[11px] font-mono text-zinc-400 uppercase tracking-wider mb-1.5">
                    Preferred Dealership
                  </label>
                  <select
                    value={dealerCity}
                    onChange={(e) => setDealerCity(e.target.value)}
                    className="w-full bg-[#121218] border border-white/15 px-3 py-2.5 text-xs text-white focus:outline-none focus:border-[#E5A823]"
                  >
                    <option value="Sant'Agata Bolognese (Factory)">Sant'Agata Bolognese (Factory)</option>
                    <option value="Milan">Milan</option>
                    <option value="London (Mayfair)">London (Mayfair)</option>
                    <option value="New York (Manhattan)">New York (Manhattan)</option>
                    <option value="Beverly Hills">Beverly Hills</option>
                    <option value="Dubai">Dubai</option>
                    <option value="Tokyo (Roppongi)">Tokyo (Roppongi)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-mono text-zinc-400 uppercase tracking-wider mb-1.5">
                  Full Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Matteo Rossini"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="w-full bg-[#121218] border border-white/15 px-3 py-2.5 text-xs text-white focus:outline-none focus:border-[#E5A823]"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[11px] font-mono text-zinc-400 uppercase tracking-wider mb-1.5">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="pilot@domain.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-[#121218] border border-white/15 px-3 py-2.5 text-xs text-white focus:outline-none focus:border-[#E5A823]"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-mono text-zinc-400 uppercase tracking-wider mb-1.5">
                    Telephone *
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="+1 (555) 019-2834"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full bg-[#121218] border border-white/15 px-3 py-2.5 text-xs text-white focus:outline-none focus:border-[#E5A823]"
                  />
                </div>
              </div>

              <div className="flex items-center gap-2 pt-2 text-[11px] text-zinc-400">
                <Shield className="w-3.5 h-3.5 text-[#E5A823] shrink-0" />
                <span>Confidentiality guaranteed. All client specifications remain strictly private.</span>
              </div>

              <div className="pt-4 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-5 py-2.5 text-xs font-semibold uppercase tracking-wider text-zinc-400 hover:text-white transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-7 py-2.5 bg-[#E5A823] text-black text-xs font-bold uppercase tracking-wider hover:bg-white transition-colors disabled:opacity-50"
                >
                  {isSubmitting ? 'Transmitting...' : 'Submit Acquisition Inquiry'}
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};
