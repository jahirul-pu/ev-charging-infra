import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { X, Send, CheckCircle2, Sparkles, Building2, Briefcase, Cpu } from 'lucide-react';

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ContactModal: React.FC<ContactModalProps> = ({ isOpen, onClose }) => {
  const [partnerType, setPartnerType] = useState<string>('investor');
  const [name, setName] = useState<string>('');
  const [organization, setOrganization] = useState<string>('');
  const [phoneOrEmail, setPhoneOrEmail] = useState<string>('');
  const [notes, setNotes] = useState<string>('');
  const [submitted, setSubmitted] = useState<boolean>(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);

    // Trigger celebratory confetti
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#0d9488', '#10b981', '#f59e0b', '#0284c7']
    });
  };

  const handleReset = () => {
    setSubmitted(false);
    setName('');
    setOrganization('');
    setPhoneOrEmail('');
    setNotes('');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-md p-4 animate-fadeIn">
      <div className="w-full max-w-xl rounded-3xl bg-white border border-slate-200/90 p-6 sm:p-8 relative shadow-2xl overflow-hidden">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-xl bg-slate-100 text-slate-500 hover:text-slate-900 hover:bg-slate-200 border border-slate-200 transition-colors"
          aria-label="Close dialog"
        >
          <X className="w-5 h-5" />
        </button>

        {submitted ? (
          <div className="text-center py-10 space-y-4">
            <div className="w-16 h-16 rounded-2xl bg-emerald-50 text-emerald-600 border border-emerald-200 flex items-center justify-center mx-auto shadow-sm">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h3 className="text-2xl font-display font-bold text-slate-900">
              Partnership Inquiry Received
            </h3>
            <p className="text-sm text-slate-600 max-w-md mx-auto leading-relaxed">
              Thank you, <strong className="text-slate-900">{name || 'Partner'}</strong>. Your expression of interest has been registered in the Pulse 150 Corridor Pipeline. Our founding team will reach out with the comprehensive technical dossier.
            </p>
            <div className="pt-4">
              <button
                onClick={handleReset}
                className="py-2.5 px-6 rounded-xl font-bold text-xs uppercase tracking-wider bg-teal-600 text-white hover:bg-teal-700 transition-all shadow-md"
              >
                Close Window
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <Sparkles className="w-4 h-4 text-teal-600" />
                <span className="text-xs font-mono uppercase tracking-wider text-teal-700 font-bold">
                  Collaborator & Investor Portal
                </span>
              </div>
              <h3 className="text-2xl font-display font-extrabold text-slate-900">
                Join the Pulse 150 Ecosystem
              </h3>
              <p className="text-xs sm:text-sm text-slate-600">
                Partner as an investor, host station landowner, or engineering collaborator.
              </p>
            </div>

            {/* Role Category Buttons */}
            <div>
              <label className="text-xs font-mono uppercase text-slate-600 font-semibold block mb-1.5">
                I am interested as:
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
                <button
                  type="button"
                  onClick={() => setPartnerType('investor')}
                  className={`p-2.5 rounded-xl border text-center transition-all ${
                    partnerType === 'investor'
                      ? 'bg-teal-50 border-teal-500 text-teal-800 font-bold shadow-sm ring-1 ring-teal-400/40'
                      : 'bg-slate-50 hover:bg-slate-100 border-slate-200 text-slate-600'
                  }`}
                >
                  <Briefcase className="w-4 h-4 mx-auto mb-1 text-teal-600" />
                  <span>Angel / VC</span>
                </button>

                <button
                  type="button"
                  onClick={() => setPartnerType('hotel')}
                  className={`p-2.5 rounded-xl border text-center transition-all ${
                    partnerType === 'hotel'
                      ? 'bg-emerald-50 border-emerald-500 text-emerald-800 font-bold shadow-sm ring-1 ring-emerald-400/40'
                      : 'bg-slate-50 hover:bg-slate-100 border-slate-200 text-slate-600'
                  }`}
                >
                  <Building2 className="w-4 h-4 mx-auto mb-1 text-emerald-600" />
                  <span>Highway Hotel</span>
                </button>

                <button
                  type="button"
                  onClick={() => setPartnerType('petrol')}
                  className={`p-2.5 rounded-xl border text-center transition-all ${
                    partnerType === 'petrol'
                      ? 'bg-amber-50 border-amber-500 text-amber-800 font-bold shadow-sm ring-1 ring-amber-400/40'
                      : 'bg-slate-50 hover:bg-slate-100 border-slate-200 text-slate-600'
                  }`}
                >
                  <Building2 className="w-4 h-4 mx-auto mb-1 text-amber-600" />
                  <span>Petrol Pump</span>
                </button>

                <button
                  type="button"
                  onClick={() => setPartnerType('engineering')}
                  className={`p-2.5 rounded-xl border text-center transition-all ${
                    partnerType === 'engineering'
                      ? 'bg-sky-50 border-sky-500 text-sky-800 font-bold shadow-sm ring-1 ring-sky-400/40'
                      : 'bg-slate-50 hover:bg-slate-100 border-slate-200 text-slate-600'
                  }`}
                >
                  <Cpu className="w-4 h-4 mx-auto mb-1 text-sky-600" />
                  <span>R&D Partner</span>
                </button>
              </div>
            </div>

            {/* Form Fields */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div>
                <label className="text-slate-700 font-medium block mb-1">Your Full Name *</label>
                <input
                  required
                  type="text"
                  placeholder="e.g. Rafiqul Islam"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full p-2.5 rounded-xl bg-slate-50 border border-slate-300 text-slate-900 placeholder-slate-400 focus:bg-white focus:border-teal-500 focus:ring-2 focus:ring-teal-100 outline-none transition-all"
                />
              </div>

              <div>
                <label className="text-slate-700 font-medium block mb-1">Company / Property Name</label>
                <input
                  type="text"
                  placeholder="e.g. Meghna Highway Oasis / Green Capital"
                  value={organization}
                  onChange={(e) => setOrganization(e.target.value)}
                  className="w-full p-2.5 rounded-xl bg-slate-50 border border-slate-300 text-slate-900 placeholder-slate-400 focus:bg-white focus:border-teal-500 focus:ring-2 focus:ring-teal-100 outline-none transition-all"
                />
              </div>
            </div>

            <div className="text-xs">
              <label className="text-slate-700 font-medium block mb-1">Email Address or Phone Number *</label>
              <input
                required
                type="text"
                placeholder="e.g. rafiq@example.com or +880 1711..."
                value={phoneOrEmail}
                onChange={(e) => setPhoneOrEmail(e.target.value)}
                className="w-full p-2.5 rounded-xl bg-slate-50 border border-slate-300 text-slate-900 placeholder-slate-400 focus:bg-white focus:border-teal-500 focus:ring-2 focus:ring-teal-100 outline-none transition-all"
              />
            </div>

            <div className="text-xs">
              <label className="text-slate-700 font-medium block mb-1">Message or Specific Highway Location</label>
              <textarea
                rows={3}
                placeholder="Share your location details, investment focus, or engineering specialization..."
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                className="w-full p-2.5 rounded-xl bg-slate-50 border border-slate-300 text-slate-900 placeholder-slate-400 focus:bg-white focus:border-teal-500 focus:ring-2 focus:ring-teal-100 outline-none transition-all"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3 rounded-xl font-bold text-xs uppercase tracking-wider text-white bg-gradient-to-r from-teal-600 via-emerald-600 to-teal-600 hover:from-teal-700 hover:to-emerald-700 transition-all shadow-lg shadow-teal-600/20 flex items-center justify-center gap-2"
            >
              <Send className="w-3.5 h-3.5" />
              <span>Submit Partnership Inquiry</span>
            </button>
          </form>
        )}

      </div>
    </div>
  );
};
