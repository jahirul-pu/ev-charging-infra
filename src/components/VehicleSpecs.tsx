import React from 'react';
import { Battery, Zap, Cpu } from 'lucide-react';

export const VehicleSpecs: React.FC = () => {
  return (
    <section id="vehicle" className="py-16 sm:py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 scroll-mt-24">
      
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-12">
        <span className="text-xs font-mono uppercase tracking-widest text-teal-700 font-bold bg-teal-50 px-3 py-1 rounded-full border border-teal-200">
          Hardware & Powertrain Architecture
        </span>
        <h2 className="text-3xl sm:text-4xl font-display font-black text-slate-900 mt-2">
          PULSE 150 Engineering Specifications
        </h2>
        <p className="mt-3 text-slate-600 text-base leading-relaxed">
          Engineered from scratch for continuous high-speed highway cruising without carrying excessive dead battery mass.
        </p>
      </div>

      {/* 3-Way Comparative Benchmark Table */}
      <div className="glass-panel p-6 sm:p-8 rounded-3xl mb-12 border border-slate-200/80 bg-white shadow-sm">
        <div className="flex items-center justify-between mb-6 pb-3 border-b border-slate-100">
          <div>
            <h3 className="font-bold text-slate-900 text-lg">Cross-Architecture Benchmark</h3>
            <p className="text-xs text-slate-500">Benchmarking current prototype baseline vs Pulse 150 vs heavy battery concept</p>
          </div>
          <span className="text-xs font-mono font-bold text-teal-700 bg-teal-50 px-2 py-0.5 rounded border border-teal-200">
            Automotive Spec
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs font-sans">
            <thead>
              <tr className="border-b border-slate-200 text-slate-500 font-mono uppercase text-[11px]">
                <th className="py-3 px-4">Parameter</th>
                <th className="py-3 px-4 text-slate-700">Current Scooter (Baseline)</th>
                <th className="py-3 px-4 text-teal-800 font-bold bg-teal-50/70 border-x border-teal-200">
                  ⚡ PULSE 150 (Our Target)
                </th>
                <th className="py-3 px-4 text-rose-700">Flawed "Monster Pack"</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-sans">
              <tr className="hover:bg-slate-50/60">
                <td className="py-3.5 px-4 font-bold text-slate-900">Battery Capacity</td>
                <td className="py-3.5 px-4 font-mono text-slate-600">2.5 kWh</td>
                <td className="py-3.5 px-4 font-mono text-teal-800 font-bold bg-teal-50/50 border-x border-teal-200">5.4 kWh (High-C LFP)</td>
                <td className="py-3.5 px-4 font-mono text-rose-600">20.0 – 25.0 kWh</td>
              </tr>
              <tr className="hover:bg-slate-50/60">
                <td className="py-3.5 px-4 font-bold text-slate-900">Real-World Range</td>
                <td className="py-3.5 px-4 font-mono text-slate-600">~80 km @ 60 km/h</td>
                <td className="py-3.5 px-4 font-mono text-emerald-700 font-bold bg-teal-50/50 border-x border-teal-200">~150 km Highway @ 75 km/h</td>
                <td className="py-3.5 px-4 font-mono text-slate-600">300 km (Nominal)</td>
              </tr>
              <tr className="hover:bg-slate-50/60">
                <td className="py-3.5 px-4 font-bold text-slate-900">Nominal Pack Voltage</td>
                <td className="py-3.5 px-4 font-mono text-slate-600">72 V</td>
                <td className="py-3.5 px-4 font-mono text-teal-800 font-bold bg-teal-50/50 border-x border-teal-200">120V – 144V High Voltage</td>
                <td className="py-3.5 px-4 font-mono text-slate-600">72V – 96V</td>
              </tr>
              <tr className="hover:bg-slate-50/60">
                <td className="py-3.5 px-4 font-bold text-slate-900">Battery Pack Weight</td>
                <td className="py-3.5 px-4 font-mono text-slate-600">~18 kg</td>
                <td className="py-3.5 px-4 font-mono text-teal-800 font-bold bg-teal-50/50 border-x border-teal-200">~38 kg (Balanced agile)</td>
                <td className="py-3.5 px-4 font-mono text-rose-600">140 – 160 kg (Lethargic)</td>
              </tr>
              <tr className="hover:bg-slate-50/60">
                <td className="py-3.5 px-4 font-bold text-slate-900">Highway Wh/km</td>
                <td className="py-3.5 px-4 font-mono text-slate-600">~31 Wh/km @ 60 km/h</td>
                <td className="py-3.5 px-4 font-mono text-teal-800 font-bold bg-teal-50/50 border-x border-teal-200">~36 Wh/km @ 75 km/h</td>
                <td className="py-3.5 px-4 font-mono text-rose-600">&gt;65 Wh/km (Heavy inertia)</td>
              </tr>
              <tr className="hover:bg-slate-50/60">
                <td className="py-3.5 px-4 font-bold text-slate-900">Charging Standard</td>
                <td className="py-3.5 px-4 font-mono text-slate-600">1.2 kW AC (Home slow)</td>
                <td className="py-3.5 px-4 font-mono text-emerald-700 font-bold bg-teal-50/50 border-x border-teal-200">7.2 kW AC + 20 kW DC</td>
                <td className="py-3.5 px-4 font-mono text-slate-600">3.3 kW AC (Slow)</td>
              </tr>
              <tr className="hover:bg-slate-50/60">
                <td className="py-3.5 px-4 font-bold text-slate-900">Highway Meal Stop Charge</td>
                <td className="py-3.5 px-4 font-mono text-slate-600">Unviable (2.5h wait)</td>
                <td className="py-3.5 px-4 font-mono text-emerald-700 font-bold bg-teal-50/50 border-x border-teal-200">20% → 80% in 25 min</td>
                <td className="py-3.5 px-4 font-mono text-rose-600">4.5 – 6 hours wait</td>
              </tr>
              <tr className="hover:bg-slate-50/60">
                <td className="py-3.5 px-4 font-bold text-slate-900">Estimated Vehicle MSRP</td>
                <td className="py-3.5 px-4 font-mono text-slate-600">৳ 1,60,000</td>
                <td className="py-3.5 px-4 font-mono text-teal-800 font-bold bg-teal-50/50 border-x border-teal-200">৳ 2,60,000 – 2,90,000</td>
                <td className="py-3.5 px-4 font-mono text-rose-600">৳ 6,50,000 – 8,00,000</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Tech Architecture Cards */}
      <div className="grid md:grid-cols-3 gap-6">
        
        <div className="p-6 rounded-3xl glass-card-interactive border-t-4 border-t-teal-500 bg-white shadow-xs">
          <div className="w-10 h-10 rounded-2xl bg-teal-50 flex items-center justify-center text-teal-700 mb-4 border border-teal-100">
            <Cpu className="w-5 h-5" />
          </div>
          <h4 className="font-bold text-slate-900 text-base mb-1.5">PMSM Interior Motor & FOC</h4>
          <p className="text-xs text-slate-600 leading-relaxed font-normal">
            High-efficiency Permanent Magnet Synchronous Motor tuned for continuous 7.0 kW highway output (12.5 kW peak). 
            Liquid/passive heat pipe cooling avoids thermal throttling during sustained 85 km/h rides.
          </p>
        </div>

        <div className="p-6 rounded-3xl glass-card-interactive border-t-4 border-t-emerald-500 bg-white shadow-xs">
          <div className="w-10 h-10 rounded-2xl bg-emerald-50 flex items-center justify-center text-emerald-700 mb-4 border border-emerald-100">
            <Battery className="w-5 h-5" />
          </div>
          <h4 className="font-bold text-slate-900 text-base mb-1.5">144V Prismatic LFP Pack</h4>
          <p className="text-xs text-slate-600 leading-relaxed font-normal">
            45-Series high-drain LFP cells deliver 144V nominal voltage. Integrated active cell balancing and isolated thermal partition 
            support repeated 1.5C–3C highway fast charging with 3,500+ cycle durability.
          </p>
        </div>

        <div className="p-6 rounded-3xl glass-card-interactive border-t-4 border-t-amber-500 bg-white shadow-xs">
          <div className="w-10 h-10 rounded-2xl bg-amber-50 flex items-center justify-center text-amber-700 mb-4 border border-amber-100">
            <Zap className="w-5 h-5" />
          </div>
          <h4 className="font-bold text-slate-900 text-base mb-1.5">Dual Charging Interface</h4>
          <p className="text-xs text-slate-600 leading-relaxed font-normal">
            Carries a high-efficiency 7.2 kW onboard AC charger for diner stops, alongside an isolated high-current DC port 
            ready for 20 kW superchargers at high-traffic expressway nodes.
          </p>
        </div>

      </div>

    </section>
  );
};
