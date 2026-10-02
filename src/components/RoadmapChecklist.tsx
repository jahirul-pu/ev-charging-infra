import React, { useState } from 'react';
import { RD_VALIDATION_VECTORS } from '../data/constants';
import { XCircle } from 'lucide-react';

export const RoadmapChecklist: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [priorityFilter, setPriorityFilter] = useState<'ALL' | 'CRITICAL' | 'HIGH'>('ALL');

  const categories = ['All', 'Vehicle Powertrain', 'Charging Architecture', 'Highway Corridor Network', 'Unit Economics & Policy'];

  const allItems = RD_VALIDATION_VECTORS.flatMap(v => 
    v.items.map(item => ({ ...item, category: v.category }))
  );

  const filteredItems = allItems.filter(item => {
    const matchesCat = selectedCategory === 'All' || item.category === selectedCategory;
    const matchesPriority = priorityFilter === 'ALL' || item.priority === priorityFilter;
    return matchesCat && matchesPriority;
  });

  return (
    <section id="roadmap" className="py-16 sm:py-20 bg-white/70 border-t border-slate-200/80 scroll-mt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="text-xs font-mono uppercase tracking-widest text-teal-700 font-bold bg-teal-50 px-3 py-1 rounded-full border border-teal-200">
            Execution Roadmap & Validation Vectors
          </span>
          <h2 className="text-3xl sm:text-4xl font-display font-black text-slate-900 mt-2">
            Disciplined Phasing & The 34 Solved Vectors
          </h2>
          <p className="mt-3 text-slate-600 text-base leading-relaxed">
            We don't try to boil the ocean. We follow a strict progression: 
            <strong className="text-teal-700 font-bold"> One prototype → One corridor → Empirical validation → Capital-efficient expansion</strong>.
          </p>
        </div>

        {/* What We Will NOT Do (The Discipline Guardrails) */}
        <div className="mb-12 p-6 sm:p-8 rounded-3xl bg-rose-50/70 border border-rose-200">
          <div className="flex items-center gap-2 mb-4">
            <span className="px-3 py-0.5 rounded-full text-[10px] font-mono font-bold uppercase bg-rose-100 text-rose-800 border border-rose-300">
              Risk Mitigation Guardrails
            </span>
            <h3 className="text-base font-bold text-slate-900">
              What We Explicitly Will NOT Do Initially
            </h3>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-3 text-xs text-slate-700 font-medium">
            <div className="flex items-center gap-2 p-3 rounded-2xl bg-white border border-rose-200 shadow-2xs">
              <XCircle className="w-4 h-4 text-rose-600 shrink-0" />
              <span>No 300 km range battery monsters</span>
            </div>
            <div className="flex items-center gap-2 p-3 rounded-2xl bg-white border border-rose-200 shadow-2xs">
              <XCircle className="w-4 h-4 text-rose-600 shrink-0" />
              <span>No heavy 20–30 kWh packs</span>
            </div>
            <div className="flex items-center gap-2 p-3 rounded-2xl bg-white border border-rose-200 shadow-2xs">
              <XCircle className="w-4 h-4 text-rose-600 shrink-0" />
              <span>No 150 kW idle DC monuments</span>
            </div>
            <div className="flex items-center gap-2 p-3 rounded-2xl bg-white border border-rose-200 shadow-2xs">
              <XCircle className="w-4 h-4 text-rose-600 shrink-0" />
              <span>No premature nationwide rollout</span>
            </div>
            <div className="flex items-center gap-2 p-3 rounded-2xl bg-white border border-rose-200 shadow-2xs">
              <XCircle className="w-4 h-4 text-rose-600 shrink-0" />
              <span>No high fixed landlord rents</span>
            </div>
            <div className="flex items-center gap-2 p-3 rounded-2xl bg-white border border-rose-200 shadow-2xs">
              <XCircle className="w-4 h-4 text-rose-600 shrink-0" />
              <span>No buying chargers before sites</span>
            </div>
          </div>
        </div>

        {/* The 3-Phase Horizon Plan */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          
          <div className="glass-panel p-6 rounded-3xl border border-slate-200/90 border-t-4 border-t-teal-500 bg-white shadow-xs relative">
            <span className="text-[10px] font-mono font-bold uppercase text-teal-700 block mb-1">PHASE 1 (MONTHS 1 – 6)</span>
            <h4 className="text-lg font-bold text-slate-900 mb-2">Prototype & Corridor Pilot</h4>
            <p className="text-xs text-slate-600 leading-relaxed mb-4 font-normal">
              Empirical Wh/km logging across 40–90 km/h on existing scooter; build 144V / 5.4 kWh prototype; install 2x 7.2 kW AC pilot hubs at Cumilla & Feni diners.
            </p>
            <div className="text-xs font-mono font-bold text-teal-800 pt-3 border-t border-slate-100">
              Target CAPEX: ৳ 25 – 45 Lakh
            </div>
          </div>

          <div className="glass-panel p-6 rounded-3xl border border-slate-200/90 border-t-4 border-t-emerald-500 bg-white shadow-xs relative">
            <span className="text-[10px] font-mono font-bold uppercase text-emerald-700 block mb-1">PHASE 2 (MONTHS 7 – 14)</span>
            <h4 className="text-lg font-bold text-slate-900 mb-2">Fleet Batch & DC Fast Hubs</h4>
            <p className="text-xs text-slate-600 leading-relaxed mb-4 font-normal">
              Production batch of 100 Pulse 150 scooters; upgrade Cumilla oasis to 20 kW DC rapid charging; launch driver mobile app with automated Plug & Charge.
            </p>
            <div className="text-xs font-mono font-bold text-emerald-800 pt-3 border-t border-slate-100">
              Target CAPEX: ৳ 1.5 – 2.8 Crore
            </div>
          </div>

          <div className="glass-panel p-6 rounded-3xl border border-slate-200/90 border-t-4 border-t-amber-500 bg-white shadow-xs relative">
            <span className="text-[10px] font-mono font-bold uppercase text-amber-700 block mb-1">PHASE 3 (MONTHS 15 – 24)</span>
            <h4 className="text-lg font-bold text-slate-900 mb-2">Micro-Grid & Network Scale</h4>
            <p className="text-xs text-slate-600 leading-relaxed mb-4 font-normal">
              Stationary battery-buffered DC stations with solar canopies; expand corridor coverage to Dhaka-Sylhet and Dhaka-Bogura; third-party fleet roaming contracts.
            </p>
            <div className="text-xs font-mono font-bold text-amber-800 pt-3 border-t border-slate-100">
              Target CAPEX: Series A Scale
            </div>
          </div>

        </div>

        {/* The 34 Solved / Unsolved R&D Vectors Matrix */}
        <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-slate-200/90 bg-white shadow-xs">
          <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
            <div>
              <h3 className="text-xl font-bold text-slate-900">
                The 34 Technical & Business Vectors
              </h3>
              <p className="text-xs text-slate-500 mt-0.5 font-medium">
                Every dimension mapped before capital deployment
              </p>
            </div>

            {/* Filter buttons */}
            <div className="flex flex-wrap items-center gap-2">
              <div className="flex bg-slate-100 p-1 rounded-xl border border-slate-200 text-xs">
                {(['ALL', 'CRITICAL', 'HIGH'] as const).map(p => (
                  <button
                    key={p}
                    onClick={() => setPriorityFilter(p)}
                    className={`px-3 py-1 rounded-lg text-[11px] font-mono font-bold transition-all ${
                      priorityFilter === p ? 'bg-teal-600 text-white shadow-2xs' : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    {p}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Category Tabs */}
          <div className="flex flex-wrap gap-2 mb-6 border-b border-slate-100 pb-3">
            {categories.map((c) => (
              <button
                key={c}
                onClick={() => setSelectedCategory(c)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                  selectedCategory === c
                    ? 'bg-teal-50 text-teal-800 border border-teal-200'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                }`}
              >
                {c}
              </button>
            ))}
          </div>

          {/* List of items */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
            {filteredItems.map((item, idx) => (
              <div
                key={idx}
                className="p-3.5 rounded-2xl bg-slate-50/80 border border-slate-200 flex items-start justify-between gap-3 hover:border-slate-300 transition-colors"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className={`px-2 py-0.5 rounded text-[9px] font-mono font-bold ${
                      item.priority === 'CRITICAL'
                        ? 'bg-rose-100 text-rose-800 border border-rose-300'
                        : item.priority === 'HIGH'
                        ? 'bg-amber-100 text-amber-800 border border-amber-300'
                        : 'bg-slate-200 text-slate-700'
                    }`}>
                      {item.priority}
                    </span>
                    <span className="text-[10px] font-mono text-slate-500 uppercase">{item.category}</span>
                  </div>
                  <div className="font-semibold text-slate-800">{item.q}</div>
                </div>

                <span className="font-mono text-[10px] text-teal-800 px-2 py-0.5 rounded-lg bg-teal-50 border border-teal-200 font-bold shrink-0">
                  {item.status}
                </span>
              </div>
            ))}
          </div>

        </div>

      </div>
    </section>
  );
};
