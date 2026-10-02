import React, { useState, useEffect } from 'react';
import { X, ChevronLeft, ChevronRight, Presentation, Zap } from 'lucide-react';

interface PitchDeckModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenContact: () => void;
}

export const PitchDeckModal: React.FC<PitchDeckModalProps> = ({ isOpen, onClose, onOpenContact }) => {
  const [currentSlide, setCurrentSlide] = useState<number>(0);
  const [showNotes, setShowNotes] = useState<boolean>(false);

  const slides = [
    {
      title: "PULSE 150 // Mobility Ecosystem",
      subtitle: "The High-Efficiency Intercity EV Scooter & Highway Supercharger Network",
      tag: "Executive Pitch",
      content: (
        <div className="space-y-6 text-center max-w-2xl mx-auto my-auto">
          <div className="inline-flex p-3.5 rounded-2xl bg-teal-50 text-teal-600 border border-teal-200/80 mb-2 shadow-sm">
            <Zap className="w-12 h-12 text-teal-600" />
          </div>
          <h2 className="text-3xl sm:text-5xl font-display font-black text-slate-900 leading-tight">
            Stop Carrying Heavy Batteries. Build Strategic Highway Corridors.
          </h2>
          <p className="text-base sm:text-lg text-slate-700 leading-relaxed font-normal">
            A capital-efficient mobility breakthrough combining an agile <strong className="text-teal-700 font-bold">~150 km scooter</strong> with a high-margin <strong className="text-emerald-700 font-bold">open highway charging network</strong> across Bangladesh.
          </p>
          <div className="grid grid-cols-3 gap-3 text-xs font-mono text-slate-600 pt-4 border-t border-slate-200">
            <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-200/70">
              <span className="text-slate-500 block text-[11px]">Range</span>
              <strong className="text-slate-900 block text-sm font-bold">150 km Highway</strong>
            </div>
            <div className="bg-teal-50/60 p-2.5 rounded-xl border border-teal-200/70">
              <span className="text-teal-700 block text-[11px]">Battery</span>
              <strong className="text-teal-800 block text-sm font-bold">5.4 kWh High-C</strong>
            </div>
            <div className="bg-emerald-50/60 p-2.5 rounded-xl border border-emerald-200/70">
              <span className="text-emerald-700 block text-[11px]">Corridor</span>
              <strong className="text-emerald-800 block text-sm font-bold">Dhaka ↔ Ctg</strong>
            </div>
          </div>
        </div>
      ),
      speakerNotes: "Open by contrasting the two schools of thought: hauling 150 kg of battery deadweight vs. building an agile 5.4 kWh vehicle that syncs charging with human meal habits along the highway."
    },
    {
      title: "The Core Paradigm Shift",
      subtitle: "Why Giant Batteries Destroy EV Economics",
      tag: "The Problem",
      content: (
        <div className="grid md:grid-cols-2 gap-6 my-auto">
          <div className="p-6 rounded-2xl bg-rose-50/90 border border-rose-200 shadow-sm">
            <span className="text-xs font-mono text-rose-700 font-bold block mb-2 tracking-wide uppercase">
              The Conventional Fallacy
            </span>
            <h3 className="text-xl font-bold text-slate-900 mb-3">Huge Battery → Rare Charging</h3>
            <ul className="space-y-2.5 text-xs sm:text-sm text-slate-700">
              <li className="flex items-start gap-2">
                <span className="text-rose-500 font-bold shrink-0">✕</span>
                <span>20–25 kWh battery weighs 130+ kg on a 2-wheeler</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-rose-500 font-bold shrink-0">✕</span>
                <span>MSRP shoots past ৳6,00,000, killing market volume</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-rose-500 font-bold shrink-0">✕</span>
                <span>Takes 6–8 hours to recharge on standard AC</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-rose-500 font-bold shrink-0">✕</span>
                <span>85% of days, rider hauls expensive dead capacity</span>
              </li>
            </ul>
          </div>
          <div className="p-6 rounded-2xl bg-teal-50/90 border border-teal-200 shadow-sm">
            <span className="text-xs font-mono text-teal-800 font-bold block mb-2 tracking-wide uppercase">
              The Pulse 150 Formula
            </span>
            <h3 className="text-xl font-bold text-slate-900 mb-3">Moderate Pack + Fast Turnaround</h3>
            <ul className="space-y-2.5 text-xs sm:text-sm text-slate-700">
              <li className="flex items-start gap-2">
                <span className="text-teal-600 font-bold shrink-0">✓</span>
                <span>5.4 kWh pack weighs only ~38 kg (LFP)</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-teal-600 font-bold shrink-0">✓</span>
                <span>Highly accessible retail MSRP with healthy hardware margin</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-teal-600 font-bold shrink-0">✓</span>
                <span>20% to 80% recharge takes only 25 minutes</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-teal-600 font-bold shrink-0">✓</span>
                <span>Charging happens naturally during highway meal/rest stop</span>
              </li>
            </ul>
          </div>
        </div>
      ),
      speakerNotes: "Walk the investors through the math: 5.4 kWh costs 75% less to manufacture and enables razor-sharp riding dynamics while solving 100% of intercity transit."
    },
    {
      title: "The Flagship Vehicle",
      subtitle: "Engineered Around 144V & Aerodynamic Efficiency",
      tag: "Vehicle Engineering",
      content: (
        <div className="grid md:grid-cols-3 gap-4 my-auto text-xs">
          <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200/80 shadow-sm">
            <span className="text-teal-700 font-mono font-bold block mb-1">AERODYNAMICS & DRAG</span>
            <div className="text-2xl font-bold text-slate-900 mb-2">~36 Wh/km</div>
            <p className="text-slate-600 leading-relaxed text-xs">
              Derived from 2.5 kWh / 80 km baseline. Aerodynamic fairing minimizes frontal CdA (0.48 m²), maintaining highway range at 70–80 km/h.
            </p>
          </div>
          <div className="p-5 rounded-2xl bg-teal-50/50 border border-teal-200/70 shadow-sm">
            <span className="text-emerald-700 font-mono font-bold block mb-1">144V ARCHITECTURE</span>
            <div className="text-2xl font-bold text-slate-900 mb-2">75% Less Heat</div>
            <p className="text-slate-600 leading-relaxed text-xs">
              Stepping from 72V to 144V cuts 20 kW charging current from 278A down to 139A. Lightweight cables, lower heat loss, zero connector welding risk.
            </p>
          </div>
          <div className="p-5 rounded-2xl bg-amber-50/40 border border-amber-200/70 shadow-sm">
            <span className="text-amber-800 font-mono font-bold block mb-1">HIGH-POWER LFP</span>
            <div className="text-2xl font-bold text-slate-900 mb-2">3,500+ Cycles</div>
            <p className="text-slate-600 leading-relaxed text-xs">
              270°C thermal runaway threshold gives maximum safety in Bangladesh summer heat (40°C+). Equivalent to 450,000 km lifespan.
            </p>
          </div>
        </div>
      ),
      speakerNotes: "Emphasize why 144V was chosen: It completely solves the high-current bottleneck that plagues low-voltage 72V scooters during rapid DC charging."
    },
    {
      title: "The Pilot Corridor",
      subtitle: "Dhaka ↔ Chattogram Express (245 km)",
      tag: "Infrastructure",
      content: (
        <div className="space-y-4 my-auto">
          <div className="p-5 rounded-2xl bg-teal-50/80 border border-teal-200/90 shadow-sm">
            <h4 className="font-bold text-slate-900 text-base mb-1">The Cumilla Oasis Strategy (~108 km from Dhaka)</h4>
            <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
              Positioning charging stations at 100–120 km intervals guarantees a massive safety margin for the 150 km scooter. 
              The flagship hub at Cumilla/Chauddagram sits at the exact midway point where 100% of intercity buses, cars, and bikers naturally stop for lunch.
            </p>
          </div>
          <div className="grid grid-cols-3 gap-3 text-center text-xs font-mono">
            <div className="p-3.5 rounded-xl bg-white border border-slate-200 shadow-sm">
              <span className="text-slate-500 block text-[11px]">Dhaka Departure</span>
              <strong className="text-teal-700 text-sm font-bold">100% SoC</strong>
            </div>
            <div className="p-3.5 rounded-xl bg-emerald-50 border border-emerald-300 shadow-sm">
              <span className="text-emerald-800 block font-bold text-[11px]">Cumilla (25 min stop)</span>
              <strong className="text-emerald-700 text-sm font-bold">24% → 82% SoC</strong>
            </div>
            <div className="p-3.5 rounded-xl bg-white border border-slate-200 shadow-sm">
              <span className="text-slate-500 block text-[11px]">Chattogram Arrival</span>
              <strong className="text-teal-700 text-sm font-bold">28% Buffer</strong>
            </div>
          </div>
        </div>
      ),
      speakerNotes: "Highlight the human reality: A rider doesn't wait for charging; they eat lunch while the scooter charges. Net delay added to their journey is zero."
    },
    {
      title: "The Open Network Flywheel",
      subtitle: "Two Engines Driving Exponential Value",
      tag: "Business Model",
      content: (
        <div className="space-y-4 my-auto text-xs sm:text-sm">
          <div className="p-5 rounded-2xl bg-gradient-to-r from-teal-50 to-white border border-teal-200 shadow-sm">
            <div className="flex items-center justify-between font-bold text-slate-900 text-base mb-2">
              <span>Engine 1: Scooter Retail</span>
              <span className="text-teal-700 text-xs font-mono bg-teal-100/80 px-2 py-0.5 rounded">Anchor Demand</span>
            </div>
            <p className="text-slate-700 leading-relaxed">
              Direct-to-consumer and fleet scooter sales generate upfront hardware margin (25–30%) while guaranteeing captive charging volume along our corridors.
            </p>
          </div>
          <div className="p-5 rounded-2xl bg-gradient-to-r from-emerald-50 to-white border border-emerald-200 shadow-sm">
            <div className="flex items-center justify-between font-bold text-slate-900 text-base mb-2">
              <span>Engine 2: Open Charging Network</span>
              <span className="text-emerald-700 text-xs font-mono bg-emerald-100/80 px-2 py-0.5 rounded">Monetizing ALL EVs</span>
            </div>
            <p className="text-slate-700 leading-relaxed">
              Stations welcome third-party EV cars, commercial delivery bikes, and electric 3-wheelers. High-margin recurring energy spread operates 24/7.
            </p>
          </div>
        </div>
      ),
      speakerNotes: "Remind investors this is not just a hardware business. The charging network is an independent cash generator with network effects."
    },
    {
      title: "Station Financial Engine",
      subtitle: "৳1,835 Energy Spread per 100 kWh Dispensed",
      tag: "Unit Economics",
      content: (
        <div className="grid md:grid-cols-3 gap-4 my-auto text-center">
          <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200/90 shadow-sm">
            <span className="text-[10px] font-mono text-slate-500 block uppercase font-semibold">Retail Spread</span>
            <div className="text-2xl font-bold text-teal-700 mt-1 font-display">৳ 20 / kWh</div>
            <p className="text-[11px] text-slate-600 mt-1">
              Buy at ৳15 (Grid) → Sell at ৳35 (Retail)
            </p>
          </div>
          <div className="p-5 rounded-2xl bg-emerald-50/50 border border-emerald-200 shadow-sm">
            <span className="text-[10px] font-mono text-slate-500 block uppercase font-semibold">Daily Throughput</span>
            <div className="text-2xl font-bold text-emerald-700 mt-1 font-display">400 kWh/day</div>
            <p className="text-[11px] text-slate-600 mt-1">
              Generated by just 32 sessions (24 scooters + 8 cars)
            </p>
          </div>
          <div className="p-5 rounded-2xl bg-amber-50/50 border border-amber-200 shadow-sm">
            <span className="text-[10px] font-mono text-slate-500 block uppercase font-semibold">Capital Payback</span>
            <div className="text-2xl font-bold text-amber-800 mt-1 font-display">4 – 12 Mos</div>
            <p className="text-[11px] text-slate-600 mt-1">
              Fast capital recovery funds the next station
            </p>
          </div>
        </div>
      ),
      speakerNotes: "Reinforce the KPI: 'kWh sold per day, not charger kW.' Utilization beats brute-force power."
    },
    {
      title: "Site Host Partnership Strategy",
      subtitle: "Securing Prime Land With Zero Host Capital",
      tag: "Host Acquisition",
      content: (
        <div className="space-y-4 my-auto text-xs sm:text-sm">
          <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm">
            <h4 className="font-bold text-slate-900 text-sm sm:text-base mb-1">The Landowner Bottleneck Solved</h4>
            <p className="text-slate-700 leading-relaxed">
              We don't buy expensive land or pay heavy fixed rents during early adoption. 
              We offer petrol pumps and highway diners a <strong>12–15% gross revenue share with ৳0 upfront host investment</strong>.
            </p>
          </div>
          <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 flex items-center justify-between">
            <div>
              <div className="font-bold text-slate-900 text-sm">The Restaurant F&B Multiplier</div>
              <div className="text-slate-600 text-xs">25-minute dwell time boosts dinner and drink sales by ৳30,000–60,000/mo</div>
            </div>
            <span className="font-mono font-bold text-emerald-700 text-sm px-2.5 py-1 bg-emerald-100 rounded-lg">Win-Win</span>
          </div>
        </div>
      ),
      speakerNotes: "Explain that host restaurants love this because EV drivers are high-spending customers who sit down and order food while waiting."
    },
    {
      title: "Seed Horizon & Next Steps",
      subtitle: "Milestone 1 Test → Vehicle Prototype → Corridor Pilot",
      tag: "Investment Horizon",
      content: (
        <div className="space-y-6 text-center max-w-xl mx-auto my-auto">
          <div className="p-5 rounded-2xl bg-teal-50/70 border border-teal-200 shadow-sm">
            <h4 className="font-bold text-slate-900 text-base mb-2">Immediate R&D Milestone</h4>
            <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
              Field-testing the existing scooter at 40, 50, 60, 70, 80, 90 km/h to finalize exact highway Wh/km empirical data and pack sizing.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row justify-center gap-3">
            <button
              onClick={() => { onClose(); onOpenContact(); }}
              className="py-3 px-6 rounded-xl font-bold text-xs uppercase tracking-wider text-white bg-gradient-to-r from-teal-600 to-emerald-600 hover:from-teal-700 hover:to-emerald-700 transition-all shadow-md hover:shadow-lg"
            >
              Express Partnership Interest
            </button>
            <button
              onClick={onClose}
              className="py-3 px-6 rounded-xl font-bold text-xs uppercase tracking-wider text-slate-700 bg-slate-100 hover:bg-slate-200 transition-all border border-slate-300"
            >
              Return To Web Dashboard
            </button>
          </div>
        </div>
      ),
      speakerNotes: "Close by summarizing the investment ask: low initial CAPEX for empirical validation and 2 pilot corridor hubs."
    }
  ];

  // Keyboard navigation
  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight' || e.key === ' ') {
        setCurrentSlide(prev => Math.min(slides.length - 1, prev + 1));
      } else if (e.key === 'ArrowLeft') {
        setCurrentSlide(prev => Math.max(0, prev - 1));
      } else if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, slides.length, onClose]);

  if (!isOpen) return null;

  const current = slides[currentSlide];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-md p-4 sm:p-6 animate-fadeIn">
      
      {/* Container */}
      <div className="w-full max-w-5xl h-[88vh] flex flex-col justify-between rounded-3xl bg-white border border-slate-200/90 p-6 sm:p-10 relative overflow-hidden shadow-2xl">
        
        {/* Top Control Bar */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-200">
          <div className="flex items-center gap-2">
            <Presentation className="w-4 h-4 text-teal-600" />
            <span className="text-xs font-mono font-bold text-slate-800 uppercase tracking-wider">
              Investor Pitch Presentation
            </span>
            <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-teal-50 text-teal-800 border border-teal-200 font-bold">
              Slide {currentSlide + 1} of {slides.length}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setShowNotes(!showNotes)}
              className={`px-3 py-1.5 rounded-lg text-xs font-mono font-semibold border transition-all ${
                showNotes ? 'bg-teal-600 text-white border-teal-600' : 'bg-slate-100 border-slate-200 text-slate-700 hover:bg-slate-200'
              }`}
            >
              {showNotes ? 'Hide Speaker Notes' : 'Speaker Notes'}
            </button>
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-600 hover:text-slate-900 border border-slate-200 transition-colors"
              aria-label="Close presentation"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Slide Header */}
        <div className="pt-4">
          <span className="text-xs font-mono uppercase tracking-widest text-teal-700 font-bold">
            {current.tag}
          </span>
          <h2 className="text-2xl sm:text-3xl font-display font-extrabold text-slate-900 mt-1">
            {current.title}
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 mt-0.5">{current.subtitle}</p>
        </div>

        {/* Slide Main Content */}
        <div className="flex-1 flex flex-col justify-center py-6">
          {current.content}
        </div>

        {/* Speaker Notes Drawer (Optional) */}
        {showNotes && (
          <div className="p-3.5 rounded-xl bg-amber-50 border border-amber-200 text-xs text-amber-900 font-mono mb-4 animate-fadeIn">
            <strong className="text-amber-950 block mb-0.5 font-bold">Presenter Talking Points:</strong>
            {current.speakerNotes}
          </div>
        )}

        {/* Bottom Nav / Controls */}
        <div className="flex items-center justify-between pt-4 border-t border-slate-200">
          
          {/* Progress dots */}
          <div className="flex items-center gap-1.5">
            {slides.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentSlide(i)}
                aria-label={`Go to slide ${i + 1}`}
                className={`h-2 rounded-full transition-all ${
                  i === currentSlide ? 'w-8 bg-teal-600' : 'w-2 bg-slate-200 hover:bg-slate-300'
                }`}
              />
            ))}
          </div>

          {/* Prev / Next Buttons */}
          <div className="flex items-center gap-2">
            <button
              disabled={currentSlide === 0}
              onClick={() => setCurrentSlide(prev => Math.max(0, prev - 1))}
              className="p-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 disabled:opacity-30 border border-slate-200 transition-colors"
              aria-label="Previous slide"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              disabled={currentSlide === slides.length - 1}
              onClick={() => setCurrentSlide(prev => Math.min(slides.length - 1, prev + 1))}
              className="p-2.5 rounded-xl bg-teal-600 hover:bg-teal-700 text-white font-bold disabled:opacity-30 transition-colors"
              aria-label="Next slide"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

        </div>

      </div>

    </div>
  );
};
