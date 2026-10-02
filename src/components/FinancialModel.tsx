import React, { useState, useMemo } from 'react';
import { STATION_CAPEX_MODELS } from '../data/constants';
import { Calculator, Scale } from 'lucide-react';

export const FinancialModel: React.FC = () => {
  const [stationType, setStationType] = useState<'ac_cluster' | 'dc_fast' | 'battery_buffered'>('ac_cluster');
  const [scooterSessionsPerDay, setScooterSessionsPerDay] = useState<number>(24);
  const [carSessionsPerDay, setCarSessionsPerDay] = useState<number>(8);
  const [retailPricePerKwh, setRetailPricePerKwh] = useState<number>(35);
  const [hostSharePercent, setHostSharePercent] = useState<number>(12);

  const gridTariffPerKwh = 15;
  const scooterKwhPerSession = 5.0;
  const carKwhPerSession = 32.0;

  const currentStation = STATION_CAPEX_MODELS[stationType];
  const avgCapexBdt = ((currentStation.capexMin + currentStation.capexMax) / 2) * 100000;

  const metrics = useMemo(() => {
    const dailyScooterKwh = scooterSessionsPerDay * scooterKwhPerSession;
    const dailyCarKwh = carSessionsPerDay * carKwhPerSession;
    const totalDailyKwh = dailyScooterKwh + dailyCarKwh;
    const monthlyKwh = totalDailyKwh * 30;
    const monthlyGrossRevenue = monthlyKwh * retailPricePerKwh;

    const gridEfficiency = 0.90;
    const monthlyGridKwh = monthlyKwh / gridEfficiency;
    const monthlyElectricityCost = monthlyGridKwh * gridTariffPerKwh;

    const grossEnergySpread = monthlyGrossRevenue - monthlyElectricityCost;
    const spreadPer100Kwh = (100 * retailPricePerKwh) - ((100 / gridEfficiency) * gridTariffPerKwh);

    const monthlyHostShare = (monthlyGrossRevenue * hostSharePercent) / 100;
    const monthlyOpex = stationType === 'ac_cluster' ? 12000 : stationType === 'dc_fast' ? 22000 : 35000;
    const monthlyNetProfit = grossEnergySpread - monthlyHostShare - monthlyOpex;
    const annualNetProfit = monthlyNetProfit * 12;

    const paybackMonths = monthlyNetProfit > 0 ? Math.round((avgCapexBdt / monthlyNetProfit) * 10) / 10 : 999;
    const annualRoiPercent = Math.round((annualNetProfit / avgCapexBdt) * 100);

    return {
      totalDailyKwh: Math.round(totalDailyKwh),
      totalSessions: scooterSessionsPerDay + carSessionsPerDay,
      monthlyKwh: Math.round(monthlyKwh),
      monthlyGrossRevenue: Math.round(monthlyGrossRevenue),
      monthlyElectricityCost: Math.round(monthlyElectricityCost),
      grossEnergySpread: Math.round(grossEnergySpread),
      spreadPer100Kwh: Math.round(spreadPer100Kwh),
      monthlyHostShare: Math.round(monthlyHostShare),
      monthlyOpex,
      monthlyNetProfit: Math.round(monthlyNetProfit),
      annualNetProfit: Math.round(annualNetProfit),
      paybackMonths,
      annualRoiPercent
    };
  }, [
    scooterSessionsPerDay,
    carSessionsPerDay,
    retailPricePerKwh,
    gridTariffPerKwh,
    hostSharePercent,
    avgCapexBdt,
    stationType
  ]);

  return (
    <section id="economics" className="py-16 sm:py-20 bg-slate-50/70 border-y border-slate-200/80 scroll-mt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="text-xs font-mono uppercase tracking-widest text-teal-700 font-bold bg-teal-50 px-3 py-1 rounded-full border border-teal-200">
            Unit Economics & Investor Model
          </span>
          <h2 className="text-3xl sm:text-4xl font-display font-black text-slate-900 mt-2">
            Highway Station Financial Engine
          </h2>
          <p className="mt-3 text-slate-600 text-base leading-relaxed">
            The core financial principle: <strong className="text-slate-900 font-bold">Utilization &gt; Charger kW</strong>. 
            A modest 20–36 kW system running continuously with 32 sessions/day generates 
            <strong className="text-emerald-700 font-bold"> ৳1,835 gross energy spread per 100 kWh</strong> and achieves full capital payback in months.
          </p>
        </div>

        {/* Station Architecture Toggle */}
        <div className="flex justify-center mb-8">
          <div className="inline-flex flex-wrap justify-center p-1.5 bg-white rounded-2xl border border-slate-200 shadow-xs text-xs font-medium gap-1">
            <button
              onClick={() => setStationType('ac_cluster')}
              className={`px-4 py-2 rounded-xl transition-all ${
                stationType === 'ac_cluster'
                  ? 'bg-teal-600 text-white font-bold shadow-xs'
                  : 'text-slate-700 hover:text-slate-900 hover:bg-slate-50'
              }`}
            >
              Phase 1: 5x 7.2 kW AC Cluster (CAPEX ~৳5L)
            </button>
            <button
              onClick={() => setStationType('dc_fast')}
              className={`px-4 py-2 rounded-xl transition-all ${
                stationType === 'dc_fast'
                  ? 'bg-teal-600 text-white font-bold shadow-xs'
                  : 'text-slate-700 hover:text-slate-900 hover:bg-slate-50'
              }`}
            >
              Phase 2: 25 kW Dual-Gun DC (CAPEX ~৳18L)
            </button>
            <button
              onClick={() => setStationType('battery_buffered')}
              className={`px-4 py-2 rounded-xl transition-all ${
                stationType === 'battery_buffered'
                  ? 'bg-teal-600 text-white font-bold shadow-xs'
                  : 'text-slate-700 hover:text-slate-900 hover:bg-slate-50'
              }`}
            >
              Phase 3: 50 kW BESS Micro-Hub (CAPEX ~৳34L)
            </button>
          </div>
        </div>

        {/* Main Financial Simulator Layout */}
        <div className="grid lg:grid-cols-12 gap-8 items-start">
          
          {/* Controls Panel */}
          <div className="lg:col-span-5 glass-panel p-6 sm:p-7 rounded-3xl space-y-6 bg-white shadow-xs border border-slate-200/90">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="font-bold text-slate-900 text-base flex items-center gap-2">
                <Calculator className="w-4 h-4 text-teal-600" />
                <span>Station Traffic & Tariff Inputs</span>
              </h3>
              <span className="text-xs font-mono font-bold text-teal-700 bg-teal-50 px-2 py-0.5 rounded border border-teal-200">
                Live ROI
              </span>
            </div>

            {/* Scooter Sessions Slider */}
            <div>
              <div className="flex justify-between items-center text-xs mb-2">
                <span className="text-slate-700 font-semibold">Daily 2W Scooter Charges (5 kWh avg)</span>
                <span className="font-mono font-bold text-teal-700 text-sm">{scooterSessionsPerDay} sessions/day</span>
              </div>
              <input
                type="range"
                min="5"
                max="60"
                step="1"
                value={scooterSessionsPerDay}
                onChange={(e) => setScooterSessionsPerDay(Number(e.target.value))}
                className="w-full accent-teal-600 h-2 bg-slate-200 rounded-lg cursor-pointer"
              />
              <div className="flex justify-between text-[11px] text-slate-500 font-mono mt-1">
                <span>5 / day</span>
                <span>24 / day (Baseline)</span>
                <span>60 / day</span>
              </div>
            </div>

            {/* Car Sessions Slider */}
            <div>
              <div className="flex justify-between items-center text-xs mb-2">
                <span className="text-slate-700 font-semibold">Daily 4W EV Car Charges (32 kWh avg)</span>
                <span className="font-mono font-bold text-emerald-700 text-sm">{carSessionsPerDay} sessions/day</span>
              </div>
              <input
                type="range"
                min="0"
                max="25"
                step="1"
                value={carSessionsPerDay}
                onChange={(e) => setCarSessionsPerDay(Number(e.target.value))}
                className="w-full accent-emerald-600 h-2 bg-slate-200 rounded-lg cursor-pointer"
              />
              <div className="flex justify-between text-[11px] text-slate-500 font-mono mt-1">
                <span>0 cars</span>
                <span>8 cars (Corridor mix)</span>
                <span>25 cars</span>
              </div>
            </div>

            {/* Retail Tariff Slider */}
            <div>
              <div className="flex justify-between items-center text-xs mb-2">
                <span className="text-slate-700 font-semibold">Retail Tariff Dispensed</span>
                <span className="font-mono font-bold text-amber-700 text-sm">৳ {retailPricePerKwh} / kWh</span>
              </div>
              <input
                type="range"
                min="28"
                max="45"
                step="1"
                value={retailPricePerKwh}
                onChange={(e) => setRetailPricePerKwh(Number(e.target.value))}
                className="w-full accent-amber-600 h-2 bg-slate-200 rounded-lg cursor-pointer"
              />
              <div className="flex justify-between text-[11px] text-slate-500 font-mono mt-1">
                <span>৳ 28 / kWh</span>
                <span>৳ 35 / kWh (Target)</span>
                <span>৳ 45 / kWh</span>
              </div>
            </div>

            {/* Host Revenue Share Slider */}
            <div>
              <div className="flex justify-between items-center text-xs mb-2">
                <span className="text-slate-700 font-semibold">Host Landowner Rev Share</span>
                <span className="font-mono font-bold text-purple-700 text-sm">{hostSharePercent}% of Gross</span>
              </div>
              <input
                type="range"
                min="8"
                max="20"
                step="1"
                value={hostSharePercent}
                onChange={(e) => setHostSharePercent(Number(e.target.value))}
                className="w-full accent-purple-600 h-2 bg-slate-200 rounded-lg cursor-pointer"
              />
              <span className="text-[11px] text-slate-500 mt-1.5 block font-medium">
                Host payout: <strong>৳ {metrics.monthlyHostShare.toLocaleString()} / month</strong> (Zero host investment)
              </span>
            </div>

            {/* Grid Tariff Assumption */}
            <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 text-xs">
              <div className="flex justify-between items-center">
                <span className="text-slate-500">Commercial Grid Tariff:</span>
                <span className="font-mono font-bold text-slate-900">৳ {gridTariffPerKwh} / kWh (BREB/BPDB)</span>
              </div>
              <div className="flex justify-between items-center mt-1">
                <span className="text-slate-500">Total Station CAPEX:</span>
                <span className="font-mono font-bold text-teal-700">৳ {(avgCapexBdt / 100000).toFixed(1)} Lakh</span>
              </div>
            </div>

          </div>

          {/* Results & Financial Dashboard */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Top Financial ROI Scorecards */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              
              <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs border-t-4 border-t-emerald-500">
                <span className="text-[10px] font-mono font-bold uppercase text-slate-500">Net Monthly Profit</span>
                <div className="text-2xl sm:text-3xl font-display font-black text-emerald-700 mt-1">
                  ৳ {metrics.monthlyNetProfit.toLocaleString()}
                </div>
                <p className="text-[11px] text-slate-500 mt-0.5 font-medium">
                  After power, host share & OPEX
                </p>
              </div>

              <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs border-t-4 border-t-teal-500">
                <span className="text-[10px] font-mono font-bold uppercase text-slate-500">Capital Payback</span>
                <div className="text-2xl sm:text-3xl font-display font-black text-teal-700 mt-1">
                  {metrics.paybackMonths} <span className="text-sm font-sans font-bold text-slate-600">Mos</span>
                </div>
                <p className="text-[11px] text-slate-500 mt-0.5 font-medium">
                  Full CAPEX recovery period
                </p>
              </div>

              <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs border-t-4 border-t-amber-500 col-span-2 sm:col-span-1">
                <span className="text-[10px] font-mono font-bold uppercase text-slate-500">Annual Return (ROI)</span>
                <div className="text-2xl sm:text-3xl font-display font-black text-amber-700 mt-1">
                  {metrics.annualRoiPercent}%
                </div>
                <p className="text-[11px] text-slate-500 mt-0.5 font-medium">
                  Cash-on-Cash annual return
                </p>
              </div>

            </div>

            {/* Detailed P&L Waterfall Table */}
            <div className="glass-panel p-6 rounded-3xl border border-slate-200/90 bg-white shadow-xs">
              <h4 className="text-sm font-bold text-slate-900 mb-4 flex items-center justify-between">
                <span>Monthly Cash Flow & Unit Economics Waterfall</span>
                <span className="text-xs font-mono font-bold text-teal-700 bg-teal-50 px-2.5 py-0.5 rounded border border-teal-200">
                  {metrics.totalDailyKwh} kWh/day ({metrics.totalSessions} sessions)
                </span>
              </h4>

              <div className="space-y-2 text-xs font-mono">
                <div className="flex justify-between py-2 border-b border-slate-100">
                  <span className="text-slate-600">Delivered Energy (Monthly):</span>
                  <span className="text-slate-900 font-bold">{metrics.monthlyKwh.toLocaleString()} kWh</span>
                </div>

                <div className="flex justify-between py-2 border-b border-slate-100">
                  <span className="text-slate-700 font-semibold">(+) Gross Revenue (@ ৳{retailPricePerKwh}/kWh):</span>
                  <span className="text-emerald-700 font-extrabold">+ ৳ {metrics.monthlyGrossRevenue.toLocaleString()}</span>
                </div>

                <div className="flex justify-between py-2 border-b border-slate-100 text-slate-500">
                  <span>(-) Electricity Cost (Grid @ ৳15/kWh, 90% eff):</span>
                  <span className="text-rose-600 font-bold">- ৳ {metrics.monthlyElectricityCost.toLocaleString()}</span>
                </div>

                <div className="flex justify-between py-2 border-b border-slate-100 bg-teal-50/50 px-2 rounded-lg">
                  <span className="text-teal-900 font-bold">(=) Gross Energy Spread (৳{metrics.spreadPer100Kwh}/100kWh):</span>
                  <span className="text-teal-900 font-black">৳ {metrics.grossEnergySpread.toLocaleString()}</span>
                </div>

                <div className="flex justify-between py-2 border-b border-slate-100 text-slate-500">
                  <span>(-) Host Site Partner Share ({hostSharePercent}%):</span>
                  <span className="text-rose-600 font-bold">- ৳ {metrics.monthlyHostShare.toLocaleString()}</span>
                </div>

                <div className="flex justify-between py-2 border-b border-slate-100 text-slate-500">
                  <span>(-) Station Maintenance, Cloud Billing & Insurance:</span>
                  <span className="text-rose-600 font-bold">- ৳ {metrics.monthlyOpex.toLocaleString()}</span>
                </div>

                <div className="flex justify-between py-3 bg-emerald-50 border border-emerald-300 px-3.5 rounded-xl text-sm font-bold">
                  <span className="text-emerald-950 font-black">(=) Net Station Operating Cash Flow (EBITDA):</span>
                  <span className="text-emerald-800 font-black">৳ {metrics.monthlyNetProfit.toLocaleString()} / mo</span>
                </div>
              </div>
            </div>

            {/* The "Utilization > Charger kW" Core Insight */}
            <div className="p-5 rounded-2xl bg-amber-50/70 border border-amber-300/80">
              <div className="flex items-start gap-3">
                <Scale className="w-5 h-5 text-amber-700 shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-sm font-bold text-amber-950">
                    The Financial Rule: "High Traffic Does Not Justify Infinite CAPEX"
                  </h4>
                  <p className="text-xs text-slate-700 mt-1 leading-relaxed font-normal">
                    A common mistake in EV networks is buying an expensive ৳1 Crore 150 kW DC charger that sits idle 90% of the day. 
                    Its fixed depreciation destroys returns. 
                    In contrast, deploying <strong>5x 7.2 kW AC posts (৳5 Lakh CAPEX)</strong> at a busy highway diner recovers its entire investment in 
                    <strong className="text-emerald-700 font-bold"> ~{metrics.paybackMonths} months</strong> because customer dwell time matches meal and rest schedules.
                  </p>
                </div>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
