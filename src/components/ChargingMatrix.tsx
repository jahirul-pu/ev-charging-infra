import React, { useState } from 'react';
import { CHARGING_TIERS, VOLTAGE_ANALYSIS, BATTERY_CHEMISTRY_COMPARISON } from '../data/constants';
import { ShieldAlert, Thermometer } from 'lucide-react';

export const ChargingMatrix: React.FC = () => {
  const [selectedVoltage, setSelectedVoltage] = useState<number>(144);
  const [selectedTierId, setSelectedTierId] = useState<string>('highway_ac');
  const [chemistryTab, setChemistryTab] = useState<'lfp' | 'nmc'>('lfp');

  const selectedTier = CHARGING_TIERS.find(t => t.id === selectedTierId) || CHARGING_TIERS[1];
  const activeVoltageSpec = VOLTAGE_ANALYSIS.find(v => v.voltage === selectedVoltage) || VOLTAGE_ANALYSIS[3];

  return (
    <section id="charging" className="py-16 sm:py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 scroll-mt-24">
      
      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto mb-12">
        <span className="text-xs font-mono uppercase tracking-widest text-teal-700 font-bold bg-teal-50 px-3 py-1 rounded-full border border-teal-200">
          High-Voltage Powertrain & Battery Architecture
        </span>
        <h2 className="text-3xl sm:text-4xl font-display font-black text-slate-900 mt-2">
          The Voltage Bottleneck & Charging Matrix
        </h2>
        <p className="mt-3 text-slate-600 text-base leading-relaxed">
          Fast charging isn't just about plugging into high power. It requires resolving 
          <strong className="text-teal-700 font-bold"> current limits ($I = P/V$)</strong>, 
          <strong className="text-amber-800 font-bold"> thermal dissipation ($I^2R$)</strong>, and 
          <strong className="text-emerald-700 font-bold"> tropical cell electrochemistry</strong>.
        </p>
      </div>

      {/* 1. The High Voltage Math Engine */}
      <div className="glass-panel p-6 sm:p-8 rounded-3xl mb-12 border border-slate-200/90 bg-white shadow-xs">
        
        <div className="flex flex-wrap items-center justify-between gap-4 mb-6 pb-4 border-b border-slate-100">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded text-[10px] font-mono font-bold uppercase bg-teal-50 text-teal-800 border border-teal-200 mb-1">
              Engineering Insight #1
            </div>
            <h3 className="text-xl font-bold text-slate-900">
              Why Conventional 72V Architecture Fails at 20 kW DC
            </h3>
          </div>
          <span className="text-xs font-mono text-slate-500 font-medium">
            Current: <strong className="text-teal-700">I = P ÷ V</strong> | Cable Heat: <strong className="text-amber-700">P<sub>loss</sub> = I² · R</strong>
          </span>
        </div>

        {/* Voltage Selector Tabs */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
          {VOLTAGE_ANALYSIS.map((v) => {
            const isSelected = selectedVoltage === v.voltage;
            return (
              <button
                key={v.voltage}
                onClick={() => setSelectedVoltage(v.voltage)}
                className={`p-4 rounded-2xl border text-left transition-all ${
                  isSelected
                    ? 'bg-teal-50 border-teal-500 shadow-sm'
                    : 'bg-slate-50 border-slate-200 hover:bg-slate-100'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className={`text-2xl font-mono font-black ${isSelected ? 'text-teal-800' : 'text-slate-800'}`}>
                    {v.voltage} V
                  </span>
                  <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded ${
                    v.voltage === 144 
                      ? 'bg-emerald-100 text-emerald-800 border border-emerald-300' 
                      : v.voltage === 72 
                      ? 'bg-rose-100 text-rose-800' 
                      : 'bg-slate-200 text-slate-700'
                  }`}>
                    {v.voltage === 144 ? 'Optimal' : v.voltage === 72 ? 'Bottleneck' : 'Transition'}
                  </span>
                </div>
                <div className="text-xs text-slate-600 mt-2 font-mono">
                  Current @ 20kW: <strong className="text-slate-900 font-bold">{Math.round(v.currentAt20kW)} A</strong>
                </div>
              </button>
            );
          })}
        </div>

        {/* Dynamic Voltage Comparison Card */}
        <div className="grid md:grid-cols-12 gap-6 items-center p-6 rounded-2xl bg-slate-50 border border-slate-200">
          
          <div className="md:col-span-5 space-y-3">
            <span className="text-xs font-mono font-bold uppercase text-slate-500">Selected Architecture</span>
            <div className="text-3xl font-display font-black text-slate-900">
              {activeVoltageSpec.voltage} Volts Nominal
            </div>
            <div className="space-y-1.5 text-xs font-mono">
              <div className="flex justify-between py-1 border-b border-slate-200">
                <span className="text-slate-500">Current required at 20 kW:</span>
                <span className="text-teal-800 font-bold">{activeVoltageSpec.currentAt20kW.toFixed(1)} Amperes</span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-200">
                <span className="text-slate-500">Cable Cross-Section:</span>
                <span className="text-slate-800 font-bold">{activeVoltageSpec.cableGauge}</span>
              </div>
              <div className="flex justify-between py-1">
                <span className="text-slate-500">Relative I²R Cable Heat:</span>
                <span className="text-amber-800 font-bold">{activeVoltageSpec.heatDissipationI2R}</span>
              </div>
            </div>
          </div>

          {/* Visual Heat Comparison Gauge */}
          <div className="md:col-span-7 space-y-3">
            <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-2xs">
              <div className="flex items-center justify-between text-xs mb-2">
                <span className="text-slate-700 font-semibold flex items-center gap-1.5">
                  <Thermometer className="w-4 h-4 text-amber-600" />
                  <span>Thermal Dissipation & Wiring Stress Index</span>
                </span>
                <span className="font-mono font-bold text-teal-800">
                  {selectedVoltage === 144 ? '75% Heat Reduction vs 72V' : selectedVoltage === 72 ? 'Extreme 100% Thermal Stress' : 'Moderate Stress'}
                </span>
              </div>

              <div className="h-4 bg-slate-100 rounded-full overflow-hidden p-0.5 border border-slate-200">
                <div
                  className={`h-full rounded-full transition-all duration-500 ${
                    selectedVoltage === 144
                      ? 'w-1/4 bg-emerald-500'
                      : selectedVoltage === 120
                      ? 'w-[36%] bg-teal-500'
                      : selectedVoltage === 96
                      ? 'w-[56%] bg-amber-500'
                      : 'w-full bg-rose-500'
                  }`}
                />
              </div>

              <p className="text-xs text-slate-600 mt-3 leading-relaxed font-normal">
                <strong className="text-slate-900">Engineering Assessment: </strong>
                {activeVoltageSpec.feasibility}. {selectedVoltage === 144 ? 'By stepping up to 144V (45S LFP), the vehicle carries thinner, lighter automotive cabling, experiences minimal resistive heating during 20kW charging, and motor windings deliver higher sustained highway torque.' : 'At low voltage, 278A requires firehose-thick copper wiring, bulky contactors, and suffers severe resistive heating.'}
              </p>
            </div>
          </div>

        </div>

      </div>

      {/* 2. AC Charging vs DC Fast Charging Matrix */}
      <div className="mb-14">
        <div className="flex items-center justify-between mb-6">
          <div>
            <span className="text-xs font-mono uppercase tracking-widest text-teal-700 font-bold bg-teal-50 px-3 py-1 rounded-full border border-teal-200">
              Deployment Strategy
            </span>
            <h3 className="text-2xl font-display font-bold text-slate-900 mt-2">
              The 4-Tier Charging Evolution
            </h3>
          </div>
          <span className="text-xs font-mono text-slate-500 hidden sm:block">
            Targeting 5.4 kWh Battery Pack
          </span>
        </div>

        {/* Tier Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {CHARGING_TIERS.map((tier) => {
            const isSelected = selectedTierId === tier.id;
            return (
              <div
                key={tier.id}
                onClick={() => setSelectedTierId(tier.id)}
                className={`glass-card-interactive p-6 rounded-2xl cursor-pointer relative flex flex-col justify-between bg-white border ${
                  isSelected ? 'border-teal-500 ring-2 ring-teal-500/20 shadow-md' : 'border-slate-200/90'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold ${
                      tier.type === 'AC' ? 'bg-teal-50 text-teal-800 border border-teal-200' : 'bg-amber-50 text-amber-800 border border-amber-200'
                    }`}>
                      {tier.type} CHARGER
                    </span>
                    <span className="text-xs font-mono font-extrabold text-teal-700">{tier.powerKw} kW</span>
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
                  Host Post CAPEX: <strong className="text-slate-900">{tier.infrastructureCostBdt}</strong>
                </div>
              </div>
            );
          })}
        </div>

        {/* Selected Tier Deep-Dive Callout */}
        <div className="mt-4 p-5 rounded-2xl bg-teal-50/70 border border-teal-200 text-xs">
          <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
            <span className="font-bold text-teal-900 uppercase tracking-wider font-mono">
              Deep-Dive on {selectedTier.name}
            </span>
            <span className="text-slate-600 font-medium">
              Host Deployment Recommendation
            </span>
          </div>
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <span className="text-emerald-800 font-bold block mb-1">Key Advantages:</span>
              <ul className="space-y-1 text-slate-700 font-normal">
                {selectedTier.pros.map((p, i) => (
                  <li key={i} className="flex items-center gap-1.5">
                    <span className="text-emerald-600 font-bold">✓</span> {p}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <span className="text-amber-900 font-bold block mb-1">Trade-offs & Sizing Factors:</span>
              <ul className="space-y-1 text-slate-700 font-normal">
                {selectedTier.cons.map((c, i) => (
                  <li key={i} className="flex items-center gap-1.5">
                    <span className="text-amber-600 font-bold">⚠</span> {c}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

      </div>

      {/* 3. Battery Chemistry: LFP vs NMC */}
      <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-slate-200/90 bg-white shadow-xs">
        
        <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
          <div>
            <span className="text-xs font-mono uppercase tracking-widest text-teal-700 font-bold bg-teal-50 px-3 py-1 rounded-full border border-teal-200">
              Cell Electrochemistry
            </span>
            <h3 className="text-2xl font-display font-bold text-slate-900 mt-2">
              LFP (Lithium Iron Phosphate) vs NMC (Ternary)
            </h3>
          </div>

          <div className="flex items-center gap-2 p-1 bg-slate-100 rounded-xl border border-slate-200 text-xs font-mono font-bold">
            <button
              onClick={() => setChemistryTab('lfp')}
              className={`px-3 py-1.5 rounded-lg transition-all ${
                chemistryTab === 'lfp' ? 'bg-teal-600 text-white shadow-xs' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              LFP (Selected Spec)
            </button>
            <button
              onClick={() => setChemistryTab('nmc')}
              className={`px-3 py-1.5 rounded-lg transition-all ${
                chemistryTab === 'nmc' ? 'bg-teal-600 text-white shadow-xs' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              NMC (Comparative)
            </button>
          </div>
        </div>

        {/* Comparison Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-slate-200 font-mono uppercase text-slate-500 text-[11px]">
                <th className="py-3 px-4">Evaluation Parameter</th>
                <th className="py-3 px-4 text-emerald-800 font-bold">LFP (LiFePO4) — Proposed</th>
                <th className="py-3 px-4 text-slate-700">NMC 811 / Ternary</th>
                <th className="py-3 px-4 text-slate-500">Highway Engineering Context</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-sans">
              {BATTERY_CHEMISTRY_COMPARISON.map((row, idx) => (
                <tr key={idx} className="hover:bg-slate-50/70">
                  <td className="py-3.5 px-4 font-bold text-slate-900">{row.metric}</td>
                  <td className="py-3.5 px-4 font-mono font-bold text-emerald-700">{row.lfp}</td>
                  <td className="py-3.5 px-4 font-mono text-slate-700">{row.nmc}</td>
                  <td className="py-3.5 px-4 text-slate-600 text-[11px] leading-relaxed">{row.significance}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="mt-6 p-4 rounded-2xl bg-emerald-50/70 border border-emerald-200 text-xs text-slate-700 flex items-start gap-3">
          <ShieldAlert className="w-5 h-5 text-emerald-700 shrink-0 mt-0.5" />
          <p>
            <strong className="text-slate-900">Why LFP is the Definitive Winner for Bangladesh: </strong>
            Ambient summer temperatures along the Dhaka-Chattogram corridor regularly exceed 38°C–42°C. LFP's high 270°C thermal runaway barrier provides an unmatched safety margin. Furthermore, 3,000+ fast-charge cycles translates to <strong>450,000 km of scooter lifespan</strong>—lowering battery depreciation per km to near zero.
          </p>
        </div>

      </div>

    </section>
  );
};
