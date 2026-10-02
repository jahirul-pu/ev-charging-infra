import React from 'react';
import { Zap, ArrowUp, Printer } from 'lucide-react';

interface FooterProps {
  onOpenPitchDeck: () => void;
  onOpenInvestorMemo?: () => void;
  onOpenContact: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenPitchDeck, onOpenInvestorMemo, onOpenContact }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <footer className="bg-white/85 backdrop-blur-md border-t border-slate-200/90 text-slate-600 text-xs py-14">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 pb-12 border-b border-slate-200">
          
          {/* Brand Info */}
          <div className="md:col-span-2 space-y-3">
            <div className="flex items-center gap-2">
              <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-gradient-to-br from-teal-500 to-emerald-600 shadow-sm">
                <Zap className="w-4 h-4 text-white fill-white" />
              </div>
              <span className="font-display font-black text-xl text-slate-900">
                PULSE<span className="text-teal-600">150</span>
              </span>
              <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-teal-50 text-teal-800 border border-teal-200/80 font-bold">
                Bangladesh EV Corridor
              </span>
            </div>
            <p className="text-xs sm:text-sm text-slate-600 max-w-sm leading-relaxed">
              Two co-designed pillars: The hyper-efficient 150 km electric scooter and the open highway supercharger network along the Dhaka–Chattogram corridor.
            </p>
            <div className="flex flex-wrap gap-2 pt-2">
              <button
                type="button"
                onClick={onOpenPitchDeck}
                className="px-3.5 py-1.5 rounded-lg bg-teal-50 hover:bg-teal-100 text-teal-800 border border-teal-200 text-xs font-mono font-bold transition-colors shadow-sm cursor-pointer"
              >
                Launch Slide Deck
              </button>
              {onOpenInvestorMemo && (
                <button
                  type="button"
                  onClick={onOpenInvestorMemo}
                  className="px-3.5 py-1.5 rounded-lg bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-200 text-xs font-mono font-bold transition-colors shadow-sm cursor-pointer"
                >
                  📄 1-Page Memo
                </button>
              )}
              <button
                type="button"
                onClick={handlePrint}
                className="px-3.5 py-1.5 rounded-lg bg-slate-50 hover:bg-slate-100 text-slate-700 border border-slate-200 text-xs font-mono flex items-center gap-1.5 transition-colors shadow-sm cursor-pointer"
                title="Print or Save as PDF"
              >
                <Printer className="w-3.5 h-3.5 text-slate-500" />
                <span>Print / Save Dossier</span>
              </button>
            </div>
          </div>

          {/* Pillar 1: Scooter Links */}
          <div>
            <div className="flex items-center gap-1.5 mb-3">
              <span className="text-base">🛵</span>
              <h4 className="font-mono text-xs uppercase tracking-wider text-slate-900 font-bold">
                Scooter Engineering
              </h4>
            </div>
            <ul className="space-y-2">
              <li><a href="#vehicle" className="hover:text-teal-700 font-medium transition-colors">Vehicle Specifications</a></li>
              <li><a href="#vehicle-blueprint" className="hover:text-teal-700 font-medium transition-colors">Interactive Cutaway Blueprint</a></li>
              <li><a href="#rider-tco" className="hover:text-teal-700 font-medium transition-colors">Rider TCO & Fuel Savings</a></li>
              <li><a href="#aerodynamics" className="hover:text-teal-700 font-medium transition-colors">Physics & Drag Calculator</a></li>
              <li><a href="#powertrain" className="hover:text-teal-700 font-medium transition-colors">144V Voltage & Cable Math</a></li>
              <li><a href="#powertrain" className="hover:text-teal-700 font-medium transition-colors">Tropical LFP Cell Chemistry</a></li>
            </ul>
          </div>

          {/* Pillar 2: Network Links */}
          <div>
            <div className="flex items-center gap-1.5 mb-3">
              <span className="text-base">⚡</span>
              <h4 className="font-mono text-xs uppercase tracking-wider text-slate-900 font-bold">
                Charging Network & ROI
              </h4>
            </div>
            <ul className="space-y-2">
              <li><a href="#corridor" className="hover:text-emerald-700 font-medium transition-colors">Dhaka–Ctg Highway Sim</a></li>
              <li><a href="#charging-tiers" className="hover:text-emerald-700 font-medium transition-colors">4-Tier Charging Speeds</a></li>
              <li><a href="#economics" className="hover:text-emerald-700 font-medium transition-colors">Station Unit ROI (৳1,835)</a></li>
              <li><a href="#partners" className="hover:text-emerald-700 font-medium transition-colors">Hotel & Petrol Pump Models</a></li>
              <li><a href="#roadmap" className="hover:text-emerald-700 font-medium transition-colors">Corridor Rollout Roadmap</a></li>
              <li>
                <button onClick={onOpenContact} className="text-emerald-700 font-bold hover:underline">
                  Apply As Strategic Partner →
                </button>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-slate-500 text-xs">
          <div>
            © {new Date().getFullYear()} Pulse 150 Mobility Consortium. Research & Feasibility Specification.
          </div>
          <button
            onClick={scrollToTop}
            className="flex items-center gap-1.5 text-xs text-slate-600 hover:text-slate-950 font-medium transition-colors"
          >
            <span>Back to top</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>

      </div>
    </footer>
  );
};
