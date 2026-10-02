import React, { useState } from 'react';
import { CHARGING_TIERS } from '../data/constants';
import { Zap, Clock, ShieldCheck, CheckCircle2, AlertTriangle, Layers, Building2 } from 'lucide-react';

export const NetworkChargingTiers: React.FC = () => {
  const [selectedTierId, setSelectedTierId] = useState<string>('highway_ac');

  const selectedTier = CHARGING_TIERS.find(t => t.id === selectedTierId) || CHARGING_TIERS[1];

  return (
    <section id="charging-tiers" className="py-16 sm:py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 scroll-mt-24">
      
      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto mb-12">
        <span className="text-xs font-mono uppercase tracking-widest text-emerald-700 font-bold bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
          Highway Charging Infrastructure
        </span>
        <h2 className="text-3xl sm:text-4xl font-display font-black text-slate-900 mt-2">
          The 4-Tier Charging Evolution
        </h2>
        <p className="mt-3 text-slate-600 text-base leading-relaxed">
          From low-capex <strong className="text-teal-700 font-bold">7.2 kW AC hotel dining outlets</strong> to rapid 
          <strong className="text-emerald-700 font-bold"> 20 kW DC corridor superchargers</strong>, our modular infrastructure aligns charging downtime with natural driver stops.
        </p>
      </div>

      {/* Grid vs Power Concept Box */}
      <div className="p-6 sm:p-7 rounded-3xl bg-slate-50 border border-slate-200 mb-8 grid md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <span className="p-1.5 rounded-lg bg-teal-100 text-teal-800 font-bold text-xs font-mono">AC PARADIGM</span>
            <h4 className="font-bold text-slate-900 text-sm sm:text-base">7.2 kW AC: Capital-Efficient Dwell Charging</h4>
          </div>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
            The vehicle carries the onboard charger. The highway host provides standard commercial AC power drops. Five 7.2 kW AC bays cost a fraction of one DC station and perfectly match a 25–35 minute highway lunch.
          </p>
        </div>

        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <span className="p-1.5 rounded-lg bg-amber-100 text-amber-800 font-bold text-xs font-mono">DC PARADIGM</span>
            <h4 className="font-bold text-slate-900 text-sm sm:text-base">20–50 kW DC: Ultra-Rapid Turnaround</h4>
          </div>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
            Power electronics reside in the off-board kiosk, feeding direct high-voltage DC into the scooter battery. 20% to 80% charge takes just 10–12 minutes for riders wanting minimal rest.
          </p>
        </div>
      </div>

      {/* Tier Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {CHARGING_TIERS.map((tier) => {
          const isSelected = selectedTierId === tier.id;
          return (
            <div
              key={tier.id}
              onClick={() => setSelectedTierId(tier.id)}
              className={`p-6 rounded-2xl cursor-pointer relative flex flex-col justify-between bg-white border transition-all ${
                isSelected 
                  ? 'border-emerald-500 ring-2 ring-emerald-500/25 shadow-md -translate-y-1' 
                  : 'border-slate-200/90 hover:border-slate-300 shadow-2xs'
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold ${
                    tier.type === 'AC' ? 'bg-teal-50 text-teal-800 border border-teal-200' : 'bg-amber-50 text-amber-800 border border-amber-200'
                  }`}>
                    {tier.type} CHARGER
                  </span>
                  <span className="text-xs font-mono font-extrabold text-emerald-700">{tier.powerKw} kW</span>
                </div>

                <h4 className="font-bold text-slate-900 text-base mb-1">{tier.name}</h4>
                <p className="text-xs text-slate-500 mb-4 font-normal">{tier.targetLocation}</p>

                <div className="space-y-2 py-3 border-y border-slate-100 text-xs font-mono">
                  <div className="flex justify-between">
                    <span className="text-slate-500">20% → 80% Charge:</span>
                    <span className="text-emerald-700 font-black">{tier.time20to80Min} min</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">0% → 100% Full:</span>
                    <span className="text-slate-800 font-bold">{tier.time0to100Min} min</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Effective C-Rate:</span>
                    <span className="text-teal-700 font-bold">{tier.cRate5kWh} C</span>
                  </div>
                </div>
              </div>

              <div className="mt-4 pt-3 text-[11px] font-mono text-slate-500">
                Hardware & Install CAPEX: <strong className="text-slate-900 block mt-0.5">{tier.infrastructureCostBdt}</strong>
              </div>
            </div>
          );
        })}
      </div>

      {/* Selected Tier Deep-Dive Callout */}
      <div className="p-6 rounded-2xl bg-white border border-emerald-200 shadow-sm text-xs sm:text-sm">
        <div className="flex flex-wrap items-center justify-between gap-2 mb-4 pb-3 border-b border-slate-100">
          <div className="flex items-center gap-2">
            <Layers className="w-4 h-4 text-emerald-600" />
            <span className="font-bold text-slate-900 uppercase tracking-wider font-mono">
              Infrastructure Analysis: {selectedTier.name} ({selectedTier.powerKw} kW {selectedTier.type})
            </span>
          </div>
          <span className="text-slate-500 font-mono text-xs">
            Site Host Recommended Allocation
          </span>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <span className="text-emerald-800 font-bold flex items-center gap-1.5 text-xs font-mono uppercase">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>Key Operational Advantages:</span>
            </span>
            <ul className="space-y-1.5 text-slate-700">
              {selectedTier.pros.map((p, i) => (
                <li key={i} className="flex items-start gap-2">
                  <span className="text-emerald-600 font-bold shrink-0">✓</span>
                  <span>{p}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-2">
            <span className="text-amber-800 font-bold flex items-center gap-1.5 text-xs font-mono uppercase">
              <AlertTriangle className="w-4 h-4 text-amber-600" />
              <span>Deployment Considerations & Grid Load:</span>
            </span>
            <ul className="space-y-1.5 text-slate-700">
              {selectedTier.cons.map((c, i) => (
                <li key={i} className="flex items-start gap-2">
                  <span className="text-amber-600 font-bold shrink-0">⚠</span>
                  <span>{c}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

      </div>

    </section>
  );
};
