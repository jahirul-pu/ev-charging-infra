import React, { useState } from 'react';
import { PARTNERSHIP_MODELS } from '../data/constants';
import { Utensils, CheckCircle2 } from 'lucide-react';

interface PartnerProgramProps {
  onOpenContact: () => void;
}

export const PartnerProgram: React.FC<PartnerProgramProps> = ({ onOpenContact }) => {
  const [selectedModelId, setSelectedModelId] = useState<string>('model_revshare');
  const [hostDailyVehicles, setHostDailyVehicles] = useState<number>(30);
  const [hostType, setHostType] = useState<'hotel' | 'petrol'>('hotel');

  const dailyKwh = hostDailyVehicles * 12;
  const monthlyKwh = dailyKwh * 30;
  const retailPrice = 35;
  const monthlyGrossRevenue = monthlyKwh * retailPrice;

  const hostRevShareAmount = selectedModelId === 'model_revshare'
    ? Math.round(monthlyGrossRevenue * 0.12)
    : selectedModelId === 'model_hybrid'
    ? Math.round(15000 + monthlyGrossRevenue * 0.075)
    : 30000;

  const monthlyFnBProfit = hostType === 'hotel'
    ? Math.round(hostDailyVehicles * 30 * 0.70 * 180)
    : Math.round(hostDailyVehicles * 30 * 0.40 * 80);

  const totalMonthlyHostValue = hostRevShareAmount + monthlyFnBProfit;

  return (
    <section id="partners" className="py-16 sm:py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 scroll-mt-24">
      
      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto mb-12">
        <span className="text-xs font-mono uppercase tracking-widest text-teal-700 font-bold bg-teal-50 px-3 py-1 rounded-full border border-teal-200">
          Highway Host Partnership Program
        </span>
        <h2 className="text-3xl sm:text-4xl font-display font-black text-slate-900 mt-2">
          Turn Highway Footfall Into Recurring Profit
        </h2>
        <p className="mt-3 text-slate-600 text-base leading-relaxed">
          The biggest bottleneck in EV charging is not technology—it is securing prime highway locations. 
          We partner with petrol pumps and premier highway hotels with <strong className="text-emerald-700 font-bold">zero upfront host capital</strong> and guaranteed monthly income.
        </p>
      </div>

      {/* The Dwell Time Superpower */}
      <div className="glass-panel p-6 sm:p-8 rounded-3xl mb-12 border border-slate-200/90 bg-white shadow-xs">
        <div className="grid md:grid-cols-12 gap-8 items-center">
          
          <div className="md:col-span-7 space-y-4">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-bold bg-teal-50 text-teal-800 border border-teal-200">
              <Utensils className="w-3.5 h-3.5 text-teal-600" />
              <span>The 25-Minute Dwell Time Superpower</span>
            </div>

            <h3 className="text-2xl font-display font-extrabold text-slate-900">
              Why Highway Restaurants & Hotels Make 5x More Than Petrol Stations
            </h3>

            <p className="text-sm text-slate-600 leading-relaxed font-normal">
              When a petrol car stops, the driver leaves within 3 minutes and spends ৳0 in your restaurant. 
              When an EV scooter or car plugs in, the driver and passengers stay for <strong className="text-slate-900 font-bold">20 to 30 minutes</strong>. 
              They wash up, sit in your dining hall, order food, tea, or cold drinks, and buy snacks for the road.
            </p>

            <div className="grid grid-cols-2 gap-3 text-xs font-mono pt-2">
              <div className="p-3.5 rounded-2xl bg-rose-50/70 border border-rose-200">
                <span className="text-rose-800 font-bold block text-[10px]">PETROL CUSTOMER</span>
                <span className="text-rose-900 font-bold text-sm">3 min dwell time</span>
                <span className="text-[11px] text-rose-700 block mt-0.5">৳ 0 restaurant spend</span>
              </div>
              <div className="p-3.5 rounded-2xl bg-teal-50 border border-teal-300">
                <span className="text-teal-800 font-bold block text-[10px]">EV CHARGING CUSTOMER</span>
                <span className="text-teal-950 font-bold text-sm">25 min dwell time</span>
                <span className="text-[11px] text-teal-700 block mt-0.5 font-bold">High restaurant ticket</span>
              </div>
            </div>
          </div>

          {/* Host Interactive Revenue Simulator */}
          <div className="md:col-span-5 p-6 rounded-2xl bg-slate-50 border border-slate-200 space-y-4">
            <h4 className="text-sm font-bold text-slate-900 flex items-center justify-between">
              <span>Host Earnings Calculator</span>
              <span className="text-xs font-mono font-bold text-teal-700 bg-teal-50 px-2 py-0.5 rounded border border-teal-200">
                ৳0 Host Cost
              </span>
            </h4>

            {/* Host Type Selector */}
            <div className="grid grid-cols-2 gap-2 text-xs font-bold">
              <button
                onClick={() => setHostType('hotel')}
                className={`p-2.5 rounded-xl border transition-all ${
                  hostType === 'hotel' ? 'bg-teal-600 text-white border-teal-600 shadow-xs' : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-100'
                }`}
              >
                Highway Diner/Hotel
              </button>
              <button
                onClick={() => setHostType('petrol')}
                className={`p-2.5 rounded-xl border transition-all ${
                  hostType === 'petrol' ? 'bg-teal-600 text-white border-teal-600 shadow-xs' : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-100'
                }`}
              >
                Highway Petrol Pump
              </button>
            </div>

            {/* Daily EVs slider */}
            <div>
              <div className="flex justify-between items-center text-xs mb-1">
                <span className="text-slate-700 font-semibold">Daily Charging Vehicles:</span>
                <span className="font-mono font-bold text-teal-700">{hostDailyVehicles} vehicles/day</span>
              </div>
              <input
                type="range"
                min="10"
                max="60"
                step="5"
                value={hostDailyVehicles}
                onChange={(e) => setHostDailyVehicles(Number(e.target.value))}
                className="w-full accent-teal-600 h-2 bg-slate-200 rounded-lg cursor-pointer"
              />
            </div>

            {/* Total Monthly Payout */}
            <div className="p-4 rounded-xl bg-white border border-teal-200 text-center shadow-xs">
              <span className="text-[10px] font-mono uppercase tracking-wider text-slate-500 font-bold block">
                Total Estimated Monthly Host Return
              </span>
              <div className="text-3xl font-display font-black text-emerald-700 mt-1">
                ৳ {totalMonthlyHostValue.toLocaleString()}
              </div>
              <div className="flex justify-center gap-4 text-[11px] font-mono text-slate-600 mt-2 pt-2 border-t border-slate-100">
                <span>Charging Share: <strong className="text-slate-900">৳ {hostRevShareAmount.toLocaleString()}</strong></span>
                <span>F&B Boost: <strong className="text-slate-900">৳ {monthlyFnBProfit.toLocaleString()}</strong></span>
              </div>
            </div>

            <button
              onClick={onOpenContact}
              className="w-full py-3 rounded-xl font-bold text-xs uppercase tracking-wider text-white bg-gradient-to-r from-teal-600 to-cyan-600 hover:from-teal-500 hover:to-cyan-500 shadow-md shadow-teal-600/20 hover:scale-[1.02] transition-all"
            >
              Apply As Host Partner
            </button>
          </div>

        </div>
      </div>

      {/* The 3 Host Partnership Models */}
      <div className="mb-14">
        <h3 className="text-xl font-display font-bold text-slate-900 mb-6 text-center">
          Choose The Host Partnership Structure That Fits Your Property
        </h3>

        <div className="grid md:grid-cols-3 gap-6">
          {PARTNERSHIP_MODELS.map((model) => {
            const isSelected = selectedModelId === model.id;
            return (
              <div
                key={model.id}
                onClick={() => setSelectedModelId(model.id)}
                className={`glass-card-interactive p-6 rounded-3xl cursor-pointer flex flex-col justify-between relative bg-white border ${
                  isSelected ? 'border-teal-500 ring-2 ring-teal-500/20 shadow-md' : 'border-slate-200/90 shadow-xs'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-mono font-bold text-teal-700 bg-teal-50 px-2 py-0.5 rounded border border-teal-200">
                      {model.subtitle}
                    </span>
                    {isSelected && (
                      <span className="w-2.5 h-2.5 rounded-full bg-teal-600 animate-ping" />
                    )}
                  </div>

                  <h4 className="font-bold text-slate-900 text-lg mb-1 mt-2">{model.title}</h4>
                  
                  <div className="my-4 p-3 rounded-2xl bg-slate-50 border border-slate-200 text-center">
                    <span className="text-[10px] font-mono text-slate-500 uppercase font-bold block">Host Compensation</span>
                    <span className="text-lg font-mono font-black text-emerald-700">{model.sharePercent}</span>
                    {model.guaranteedFloor !== "৳ 0" && (
                      <span className="text-[11px] text-slate-600 block mt-0.5 font-mono font-medium">Floor: {model.guaranteedFloor}</span>
                    )}
                  </div>

                  <ul className="space-y-2 text-xs text-slate-600 mb-6 font-normal">
                    {model.pros.map((pro, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 text-teal-600 shrink-0 mt-0.5" />
                        <span>{pro}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="pt-4 border-t border-slate-100 text-xs">
                  <span className="text-slate-500 block text-[11px] font-medium">Best Suited For:</span>
                  <strong className="text-slate-900 font-bold">{model.idealFor}</strong>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Host Responsibility Matrix */}
      <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-slate-200/90 bg-white shadow-xs">
        <h4 className="text-base font-bold text-slate-900 mb-4">
          Clear Division of Responsibilities
        </h4>

        <div className="grid md:grid-cols-2 gap-6 text-xs">
          <div className="p-5 rounded-2xl bg-teal-50/70 border border-teal-200">
            <span className="font-bold text-teal-950 uppercase tracking-wider font-mono block mb-3">
              We Provide & Manage (Pulse 150 Consortium):
            </span>
            <ul className="space-y-2 text-slate-700 font-normal">
              <li className="flex items-center gap-2">
                <span className="text-teal-700 font-bold">✓</span>
                <span>All charging hardware, power electronics, and cabling</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="text-teal-700 font-bold">✓</span>
                <span>24/7 remote cloud monitoring, billing, and customer mobile app</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="text-teal-700 font-bold">✓</span>
                <span>Routine preventive maintenance, spare parts, and technician service</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="text-teal-700 font-bold">✓</span>
                <span>Corridor marketing, signage, and customer acquisition</span>
              </li>
            </ul>
          </div>

          <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200">
            <span className="font-bold text-slate-900 uppercase tracking-wider font-mono block mb-3">
              Host Site Provides:
            </span>
            <ul className="space-y-2 text-slate-700 font-normal">
              <li className="flex items-center gap-2">
                <span className="text-slate-900 font-bold">✓</span>
                <span>2 to 4 dedicated parking bays near highway frontage</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="text-slate-900 font-bold">✓</span>
                <span>Access to commercial 3-phase grid power transformer</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="text-slate-900 font-bold">✓</span>
                <span>Basic lighting, security, and restroom access for riders</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="text-slate-900 font-bold">✓</span>
                <span>Enforcement to prevent non-EV petrol cars from blocking the bays</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

    </section>
  );
};
