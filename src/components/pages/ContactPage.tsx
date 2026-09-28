import React, { useState } from 'react';
import { CAR_MODELS } from '../../data/models';
import { MapPin, Phone, Mail, Clock, CheckCircle2, Shield } from 'lucide-react';

export const ContactPage: React.FC = () => {
  const [model, setModel] = useState('revuelto');
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [dealer, setDealer] = useState('SantAgata');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const dealerships = [
    {
      city: "Sant'Agata Bolognese (HQ)",
      address: 'Via Modena 12, 40019 Sant’Agata Bolognese (BO), Italy',
      phone: '+39 051 681 7611',
      email: 'factory.concierge@lamborghini.com',
    },
    {
      city: 'Milan',
      address: 'Via Senato 14, 20121 Milano MI, Italy',
      phone: '+39 02 7600 4821',
      email: 'milan.sales@lamborghini.com',
    },
    {
      city: 'London (Mayfair)',
      address: '27 Old Bond Street, London W1S 4QB, United Kingdom',
      phone: '+44 20 7499 5555',
      email: 'mayfair@lamborghini-london.com',
    },
    {
      city: 'New York (Manhattan)',
      address: '430 Park Avenue, New York, NY 10022, United States',
      phone: '+1 212 555 0199',
      email: 'manhattan@lamborghini-ny.com',
    },
    {
      city: 'Dubai',
      address: 'Sheikh Zayed Road, Al Quoz 1, Dubai, UAE',
      phone: '+971 4 298 4555',
      email: 'concierge@lamborghini-dubai.ae',
    },
    {
      city: 'Tokyo (Roppongi)',
      address: '5-18-20 Roppongi, Minato City, Tokyo 106-0032, Japan',
      phone: '+81 3 5555 8900',
      email: 'tokyo@lamborghini.jp',
    },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName.trim() || !email.trim() || !phone.trim()) {
      setErrorMsg('Please complete all mandatory contact credentials.');
      return;
    }
    if (!email.includes('@') || !email.includes('.')) {
      setErrorMsg('Please specify a valid email address.');
      return;
    }

    setErrorMsg('');
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
    }, 800);
  };

  return (
    <div className="min-h-screen bg-[#030305] text-white pt-28 pb-20 px-6 sm:px-12">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="border-b border-white/10 pb-12 mb-16">
          <span className="text-xs font-mono tracking-[0.25em] text-[#E5A823] uppercase block mb-3">
            Private Client Relations
          </span>
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-display font-extrabold tracking-tight text-white leading-none">
            VIP CONCIERGE & NETWORK
          </h1>
          <p className="mt-4 text-base sm:text-lg text-zinc-400 font-sans max-w-2xl leading-relaxed">
            Contact the Automobili Lamborghini Private Client Concierge to inquire regarding allocation slots,
            arrange private viewings, or schedule a customized test drive on closed circuit.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left: Contact Form */}
          <div className="lg:col-span-7 bg-[#08080c] border border-white/15 p-8 sm:p-12 shadow-2xl">
            {submitted ? (
              <div className="text-center py-12 space-y-4">
                <div className="w-16 h-16 mx-auto rounded-full bg-[#E5A823]/10 border border-[#E5A823] flex items-center justify-center text-[#E5A823]">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <span className="text-xs font-mono tracking-widest text-[#E5A823] uppercase block">
                  Concierge Transmission Successful
                </span>
                <h3 className="text-2xl font-display font-bold text-white">
                  WE HAVE RECEIVED YOUR COMMUNIQUE
                </h3>
                <p className="text-sm text-zinc-400 max-w-md mx-auto leading-relaxed">
                  A personal client director from Automobili Lamborghini will contact you directly within 24 hours.
                </p>
                <div className="pt-4">
                  <button
                    onClick={() => setSubmitted(false)}
                    className="px-6 py-2.5 bg-white/10 hover:bg-white text-white hover:text-black font-mono text-xs uppercase tracking-wider transition-colors"
                  >
                    Submit Another Inquiry
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <span className="text-xs font-mono tracking-widest text-[#E5A823] uppercase block mb-2">
                  Acquisition / Test Drive Request
                </span>

                {errorMsg && (
                  <div className="p-3 bg-red-950/60 border border-red-500/40 text-red-300 text-xs font-mono">
                    {errorMsg}
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[11px] font-mono text-zinc-400 uppercase tracking-wider mb-1.5">
                      Interested Model *
                    </label>
                    <select
                      value={model}
                      onChange={(e) => setModel(e.target.value)}
                      className="w-full bg-[#121218] border border-white/15 px-3 py-2.5 text-xs text-white focus:outline-none focus:border-[#E5A823]"
                    >
                      {CAR_MODELS.map((m) => (
                        <option key={m.id} value={m.id} className="bg-[#121218] text-white">
                          {m.name} ({m.category})
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-[11px] font-mono text-zinc-400 uppercase tracking-wider mb-1.5">
                      Preferred Dealership
                    </label>
                    <select
                      value={dealer}
                      onChange={(e) => setDealer(e.target.value)}
                      className="w-full bg-[#121218] border border-white/15 px-3 py-2.5 text-xs text-white focus:outline-none focus:border-[#E5A823]"
                    >
                      {dealerships.map((d, i) => (
                        <option key={i} value={d.city} className="bg-[#121218] text-white">
                          {d.city}
                        </option>
                      ))}
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
                    placeholder="e.g. Dr. Alessandro V."
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
                      placeholder="client@san-agata.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full bg-[#121218] border border-white/15 px-3 py-2.5 text-xs text-white focus:outline-none focus:border-[#E5A823]"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-mono text-zinc-400 uppercase tracking-wider mb-1.5">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="+39 051 681 7611"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full bg-[#121218] border border-white/15 px-3 py-2.5 text-xs text-white focus:outline-none focus:border-[#E5A823]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-mono text-zinc-400 uppercase tracking-wider mb-1.5">
                    Bespoke Inquiries / Notes
                  </label>
                  <textarea
                    rows={3}
                    placeholder="Provide bespoke color palette preferences or track day inquiries..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="w-full bg-[#121218] border border-white/15 p-3 text-xs text-white focus:outline-none focus:border-[#E5A823]"
                  />
                </div>

                <div className="flex items-center gap-2 pt-1 text-[11px] text-zinc-400">
                  <Shield className="w-3.5 h-3.5 text-[#E5A823] shrink-0" />
                  <span>Confidentiality guaranteed. Data managed according to Italian privacy law.</span>
                </div>

                <div className="pt-4">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-3.5 bg-[#E5A823] hover:bg-white text-black font-semibold text-xs tracking-widest uppercase transition-colors disabled:opacity-50"
                  >
                    {isSubmitting ? 'Transmitting Inquiries...' : 'Transmit Acquisition Dossier'}
                  </button>
                </div>
              </form>
            )}
          </div>

          {/* Right: Flagship Dealer Showrooms */}
          <div className="lg:col-span-5 space-y-4">
            <span className="text-xs font-mono tracking-widest text-[#E5A823] uppercase block mb-2">
              Global Flagship Showrooms
            </span>

            <div className="space-y-4">
              {dealerships.map((d, idx) => (
                <div key={idx} className="p-4 bg-[#08080c] border border-white/10 space-y-1.5 text-xs">
                  <div className="flex items-center justify-between">
                    <h4 className="font-bold font-display text-white text-sm">{d.city}</h4>
                    <span className="text-[10px] font-mono text-[#E5A823]">AUTHORIZED ATELIER</span>
                  </div>
                  <p className="text-zinc-400 font-sans">{d.address}</p>
                  <div className="pt-1 flex items-center justify-between text-zinc-400 font-mono text-[11px]">
                    <span>{d.phone}</span>
                    <span className="text-zinc-500">{d.email}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
