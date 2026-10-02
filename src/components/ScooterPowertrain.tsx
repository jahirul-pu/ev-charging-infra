import React, { useState } from 'react';
import { VOLTAGE_ANALYSIS, BATTERY_CHEMISTRY_COMPARISON } from '../data/constants';
import { Thermometer, ShieldCheck } from 'lucide-react';

export const ScooterPowertrain: React.FC = () => {
  const [selectedVoltage, setSelectedVoltage] = useState<number>(144);
  const [chemistryTab, setChemistryTab] = useState<'lfp' | 'nmc'>('lfp');

  const activeVoltageSpec = VOLTAGE_ANALYSIS.find(v => v.voltage === selectedVoltage) || VOLTAGE_ANALYSIS[3];

  return (
    <section id="powertrain" className="py-16 sm:py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 scroll-mt-24">
      
      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto mb-12">
        <span className="text-xs font-mono uppercase tracking-widest text-teal-700 font-bold bg-teal-50 px-3 py-1 rounded-full border border-teal-200">
          Scooter Architecture & Energy Storage
        </span>
        <h2 className="text-3xl sm:text-4xl font-display font-black text-slate-900 mt-2">
          144V High-Voltage Powertrain & Cell Chemistry
        </h2>
        <p className="mt-3 text-slate-600 text-base leading-relaxed">
          The scooter's long-distance capability isn't achieved by packing more cells. It is unlocked by our 
          <strong className="text-teal-700 font-bold"> 144V low-current architecture</strong> and 
          <strong className="text-emerald-700 font-bold"> high-C tropical LFP electrochemistry</strong>.
        </p>
      </div>

      {/* 1. The High Voltage Math Engine */}
      <div className="p-6 sm:p-8 rounded-3xl mb-12 border border-slate-200/90 bg-white shadow-xs">
        
        <div className="flex flex-wrap items-center justify-between gap-4 mb-6 pb-4 border-b border-slate-100">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded text-[10px] font-mono font-bold uppercase bg-teal-50 text-teal-800 border border-teal-200 mb-1">
              Vehicle Engineering Insight #1
            </div>
            <h3 className="text-xl font-bold text-slate-900">
              Why Conventional 72V Architecture Fails at 20 kW DC Fast Charging
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
                    ? 'bg-teal-50 border-teal-500 shadow-sm ring-2 ring-teal-500/20'
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
            <span className="text-xs font-mono font-bold uppercase text-slate-500">Selected Scooter Architecture</span>
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
                  <span>Onboard Wiring Thermal Stress Index</span>
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

      {/* 2. Battery Chemistry: LFP vs NMC Table */}
      <div className="p-6 sm:p-8 rounded-3xl border border-slate-200/90 bg-white shadow-xs mb-12">
        
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
          <ShieldCheck className="w-5 h-5 text-emerald-700 shrink-0 mt-0.5" />
          <p>
            <strong className="text-slate-900">Why LFP is the Definitive Winner for Bangladesh: </strong>
            Ambient summer temperatures along the Dhaka-Chattogram corridor regularly exceed 38°C–42°C. LFP's high 270°C thermal runaway barrier provides an unmatched safety margin. Furthermore, 3,000+ fast-charge cycles translates to <strong>450,000 km of scooter lifespan</strong>—lowering battery depreciation per km to near zero.
          </p>
        </div>

      </div>

      {/* 3. Scooter Empirical Testing Protocol */}
      <div className="p-6 sm:p-8 rounded-3xl border border-teal-200 bg-gradient-to-r from-teal-50/80 via-emerald-50/60 to-white shadow-xs">
        <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
          <div>
            <span className="text-xs font-mono uppercase tracking-widest text-teal-700 font-bold bg-teal-100/80 px-2.5 py-0.5 rounded">
              Empirical Milestone 1
            </span>
            <h3 className="text-xl font-bold text-slate-900 mt-1">
              Field Testing Matrix on Existing 2.5 kWh Scooter
            </h3>
          </div>
          <span className="text-xs font-mono text-slate-600 font-medium">
            Goal: Validate exact Wh/km before prototyping
          </span>
        </div>

        <p className="text-xs sm:text-sm text-slate-700 leading-relaxed max-w-4xl mb-6">
          Before finalizing pack dimensions and structural moulds for the Pulse 150 chassis, the engineering team executes empirical dynamometer and highway asphalt runs at fixed steady-state velocities using data-logging telemetry:
        </p>

        <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 text-center text-xs font-mono">
          <div className="bg-white p-3.5 rounded-xl border border-slate-200 shadow-2xs">
            <span className="text-slate-500 block text-[10px]">Test 1</span>
            <strong className="text-slate-900 block text-base font-bold my-0.5">40 km/h</strong>
            <span className="text-teal-700 block text-[11px]">~23 Wh/km</span>
            <span className="text-[10px] text-slate-400">City cruising</span>
          </div>
          <div className="bg-white p-3.5 rounded-xl border border-slate-200 shadow-2xs">
            <span className="text-slate-500 block text-[10px]">Test 2</span>
            <strong className="text-slate-900 block text-base font-bold my-0.5">60 km/h</strong>
            <span className="text-teal-700 block text-[11px]">~31 Wh/km</span>
            <span className="text-[10px] text-emerald-600 font-bold">Current Baseline</span>
          </div>
          <div className="bg-white p-3.5 rounded-xl border border-slate-200 shadow-2xs">
            <span className="text-slate-500 block text-[10px]">Test 3</span>
            <strong className="text-slate-900 block text-base font-bold my-0.5">70 km/h</strong>
            <span className="text-teal-700 block text-[11px]">~36 Wh/km</span>
            <span className="text-[10px] text-slate-400">Target highway</span>
          </div>
          <div className="bg-white p-3.5 rounded-xl border border-slate-200 shadow-2xs">
            <span className="text-slate-500 block text-[10px]">Test 4</span>
            <strong className="text-slate-900 block text-base font-bold my-0.5">80 km/h</strong>
            <span className="text-teal-700 block text-[11px]">~42 Wh/km</span>
            <span className="text-[10px] text-amber-600 font-bold">Fast express</span>
          </div>
          <div className="bg-white p-3.5 rounded-xl border border-slate-200 shadow-2xs">
            <span className="text-slate-500 block text-[10px]">Test 5</span>
            <strong className="text-slate-900 block text-base font-bold my-0.5">90 km/h</strong>
            <span className="text-rose-700 block text-[11px]">~51 Wh/km</span>
            <span className="text-[10px] text-rose-600 font-bold">Peak aero drag</span>
          </div>
        </div>

      </div>

    </section>
  );
};
