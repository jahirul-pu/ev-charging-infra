import React, { useState, useMemo } from 'react';
import { Fuel, Zap, Wallet, TrendingDown, CheckCircle2, ArrowRight, ShieldCheck, Sparkles } from 'lucide-react';

export const RiderTcoCalculator: React.FC = () => {
  const [monthlyKm, setMonthlyKm] = useState<number>(1500);
  const [petrolPrice, setPetrolPrice] = useState<number>(165);
  const [petrolMileage, setPetrolMileage] = useState<number>(35);
  const [homeChargePercent, setHomeChargePercent] = useState<number>(70); // 70% home, 30% highway

  // Constants
  const pulseWhKm = 36; // Wh/km on highway
  const homeElectricityPrice = 12.0; // BDT per kWh (Residential peak/commercial)
  const highwayElectricityPrice = 35.0; // BDT per kWh (Highway retail network)
  const petrolMaintenancePerKm = 0.65; // Mobil/oil change, filter, spark plugs per km
  const evMaintenancePerKm = 0.15; // Brake pads & tires only

  const economics = useMemo(() => {
    // 1. Petrol calculation
    const petrolLitersPerMonth = monthlyKm / petrolMileage;
    const petrolFuelCostMonthly = petrolLitersPerMonth * petrolPrice;
    const petrolMaintCostMonthly = monthlyKm * petrolMaintenancePerKm;
    const petrolTotalMonthly = petrolFuelCostMonthly + petrolMaintCostMonthly;

    // 2. Pulse 150 calculation
    const totalKwhMonthly = (monthlyKm * pulseWhKm) / 1000;
    const homeKwh = totalKwhMonthly * (homeChargePercent / 100);
    const highwayKwh = totalKwhMonthly * ((100 - homeChargePercent) / 100);
    const evElectricityCostMonthly = (homeKwh * homeElectricityPrice) + (highwayKwh * highwayElectricityPrice);
    const evMaintCostMonthly = monthlyKm * evMaintenancePerKm;
    const evTotalMonthly = evElectricityCostMonthly + evMaintCostMonthly;

    // 3. Savings
    const monthlySavings = petrolTotalMonthly - evTotalMonthly;
    const annualSavings = monthlySavings * 12;
    const threeYearSavings = monthlySavings * 36;

    // 4. Single 245 km Dhaka-Ctg Trip
    const tripKm = 245;
    const tripPetrolCost = (tripKm / petrolMileage) * petrolPrice;
    const tripEvKwh = (tripKm * pulseWhKm) / 1000; // ~8.82 kWh
    // For single highway trip, assume 50% home depart + 50% highway stop
    const tripEvCost = (tripEvKwh * 0.5 * homeElectricityPrice) + (tripEvKwh * 0.5 * highwayElectricityPrice);
    const tripSavings = tripPetrolCost - tripEvCost;

    return {
      petrolTotalMonthly: Math.round(petrolTotalMonthly),
      evTotalMonthly: Math.round(evTotalMonthly),
      monthlySavings: Math.round(monthlySavings),
      annualSavings: Math.round(annualSavings),
      threeYearSavings: Math.round(threeYearSavings),
      tripPetrolCost: Math.round(tripPetrolCost),
      tripEvCost: Math.round(tripEvCost),
      tripSavings: Math.round(tripSavings),
      savingsPercent: Math.round((monthlySavings / petrolTotalMonthly) * 100)
    };
  }, [monthlyKm, petrolPrice, petrolMileage, homeChargePercent]);

  return (
    <section id="rider-tco" className="py-16 sm:py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 scroll-mt-24">
      
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-12">
        <span className="text-xs font-mono uppercase tracking-widest text-teal-700 font-bold bg-teal-50 px-3 py-1 rounded-full border border-teal-200">
          Consumer Economics & Wallet Impact
        </span>
        <h2 className="text-3xl sm:text-4xl font-display font-black text-slate-900 mt-2">
          Rider Fuel & Maintenance Savings Calculator
        </h2>
        <p className="mt-3 text-slate-600 text-base leading-relaxed">
          Why riders switch: At the current <strong className="text-rose-700 font-bold">৳ 165 / Liter octane price</strong>, a standard 150cc petrol motorcycle burns over <strong className="text-rose-700 font-bold">৳ 8,000+ monthly in fuel & oil</strong>. 
          The Pulse 150 delivers the exact same travel for under <strong className="text-teal-700 font-bold">৳ 1,250 in electricity</strong>.
        </p>
      </div>

      {/* Main Calculator Grid */}
      <div className="p-6 sm:p-10 rounded-3xl bg-white border border-slate-200 shadow-sm grid lg:grid-cols-12 gap-8">
        
        {/* Controls Column (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          <div className="border-b border-slate-100 pb-3 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Wallet className="w-5 h-5 text-teal-600" />
              <h3 className="font-bold text-slate-900 text-base">Your Monthly Commute Parameters</h3>
            </div>
            <span className="text-[11px] font-mono text-slate-500">Live Simulation</span>
          </div>

          {/* Slider 1: Monthly Distance */}
          <div>
            <div className="flex justify-between items-center text-xs font-mono mb-2">
              <span className="text-slate-600 font-medium">Monthly Distance:</span>
              <span className="text-teal-800 font-bold text-sm bg-teal-50 px-2.5 py-0.5 rounded border border-teal-200">
                {monthlyKm.toLocaleString()} km / month
              </span>
            </div>
            <input
              type="range"
              min="500"
              max="3500"
              step="100"
              value={monthlyKm}
              onChange={(e) => setMonthlyKm(Number(e.target.value))}
              className="w-full accent-teal-600 cursor-pointer h-2 bg-slate-200 rounded-lg"
            />
            <div className="flex justify-between text-[10px] text-slate-400 font-mono mt-1">
              <span>500 km (City light)</span>
              <span>1,500 km (Average)</span>
              <span>3,500 km (Delivery / Commuter)</span>
            </div>
          </div>

          {/* Slider 2: Petrol Octane Price */}
          <div>
            <div className="flex justify-between items-center text-xs font-mono mb-2">
              <span className="text-slate-600 font-medium">Octane Price in Bangladesh:</span>
              <span className="text-rose-700 font-bold text-sm bg-rose-50 px-2.5 py-0.5 rounded border border-rose-200 font-mono">
                ৳ {petrolPrice} / Liter {petrolPrice === 165 ? '(Current Official)' : ''}
              </span>
            </div>
            <input
              type="range"
              min="130"
              max="210"
              step="1"
              value={petrolPrice}
              onChange={(e) => setPetrolPrice(Number(e.target.value))}
              className="w-full accent-rose-600 cursor-pointer h-2 bg-slate-200 rounded-lg"
            />
            <div className="flex justify-between text-[10px] text-slate-400 font-mono mt-1">
              <span>৳130 (Historical)</span>
              <span className="text-rose-700 font-bold">৳165 (Current Price)</span>
              <span>৳210 (Inflation Target)</span>
            </div>
          </div>

          {/* Slider 3: Petrol Bike Mileage */}
          <div>
            <div className="flex justify-between items-center text-xs font-mono mb-2">
              <span className="text-slate-600 font-medium">Petrol Bike Mileage:</span>
              <span className="text-slate-900 font-bold text-sm bg-slate-100 px-2.5 py-0.5 rounded border border-slate-200">
                {petrolMileage} km / Liter
              </span>
            </div>
            <input
              type="range"
              min="25"
              max="50"
              step="1"
              value={petrolMileage}
              onChange={(e) => setPetrolMileage(Number(e.target.value))}
              className="w-full accent-teal-600 cursor-pointer h-2 bg-slate-200 rounded-lg"
            />
            <div className="flex justify-between text-[10px] text-slate-400 font-mono mt-1">
              <span>28 km/L (Heavy traffic)</span>
              <span>35 km/L (150cc bike)</span>
              <span>45 km/L (100cc eco)</span>
            </div>
          </div>

          {/* Slider 4: Home vs Highway Charging Mix */}
          <div>
            <div className="flex justify-between items-center text-xs font-mono mb-2">
              <span className="text-slate-600 font-medium">Charging Location Mix:</span>
              <span className="text-emerald-700 font-bold text-xs bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                {homeChargePercent}% Home • {100 - homeChargePercent}% Highway
              </span>
            </div>
            <input
              type="range"
              min="20"
              max="100"
              step="5"
              value={homeChargePercent}
              onChange={(e) => setHomeChargePercent(Number(e.target.value))}
              className="w-full accent-emerald-600 cursor-pointer h-2 bg-slate-200 rounded-lg"
            />
            <div className="flex justify-between text-[10px] text-slate-400 font-mono mt-1">
              <span>More Highway Hubs</span>
              <span>Balanced</span>
              <span>Mostly Overnight Home</span>
            </div>
          </div>

          {/* Dhaka-Ctg Single Trip Spotlight */}
          <div className="p-4 rounded-2xl bg-teal-50/70 border border-teal-200 text-xs font-mono space-y-2">
            <span className="font-bold text-teal-900 block text-[11px] uppercase tracking-wide">
              ⚡ Dhaka ↔ Chattogram Single Trip (245 km)
            </span>
            <div className="grid grid-cols-2 gap-2 text-center pt-1">
              <div className="p-2.5 rounded-xl bg-white border border-slate-200">
                <span className="text-slate-500 block text-[10px]">Petrol 150cc (@ ৳{petrolPrice}/L):</span>
                <strong className="text-rose-700 text-sm font-bold">৳ {economics.tripPetrolCost}</strong>
              </div>
              <div className="p-2.5 rounded-xl bg-white border border-teal-200">
                <span className="text-teal-800 block text-[10px] font-bold">PULSE 150 (Electricity):</span>
                <strong className="text-emerald-700 text-sm font-bold">৳ {economics.tripEvCost}</strong>
              </div>
            </div>
            <p className="text-[11px] text-slate-600 font-sans pt-1">
              You save <strong className="text-emerald-700 font-bold">৳ {economics.tripSavings} BDT per one-way trip</strong> while resting at Cumilla!
            </p>
          </div>

        </div>

        {/* Results & Visual Waterfall Column (7 cols) */}
        <div className="lg:col-span-7 flex flex-col justify-between space-y-6">
          
          {/* Top Big Callout Card */}
          <div className="p-6 rounded-3xl bg-gradient-to-br from-emerald-50 via-teal-50 to-white border border-emerald-200 shadow-sm">
            <div className="flex items-center justify-between gap-2 mb-2">
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-emerald-800 bg-emerald-100/90 px-2.5 py-0.5 rounded">
                Net Annual Wallet Benefit
              </span>
              <span className="text-xs font-mono font-bold text-emerald-700">
                {economics.savingsPercent}% Operating Cost Cut
              </span>
            </div>

            <div className="text-4xl sm:text-5xl font-display font-black text-slate-900 my-2">
              ৳ {economics.annualSavings.toLocaleString()} <span className="text-lg font-normal text-slate-500 font-sans">/ year saved</span>
            </div>

            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
              Over 3 years of ownership, you save <strong className="text-slate-900 font-bold">৳ {economics.threeYearSavings.toLocaleString()} BDT</strong> in cash—completely covering the initial vehicle purchase price.
            </p>
          </div>

          {/* Monthly Comparison Bars */}
          <div className="space-y-4">
            <h4 className="font-bold text-slate-900 text-sm font-mono uppercase tracking-wider">
              Monthly Operational Cash Burn:
            </h4>

            {/* Petrol Bar */}
            <div className="space-y-1.5">
              <div className="flex justify-between text-xs font-mono">
                <span className="text-slate-700 font-semibold flex items-center gap-1.5">
                  <Fuel className="w-4 h-4 text-rose-600" />
                  <span>Petrol 150cc Motorcycle:</span>
                </span>
                <span className="text-rose-700 font-bold text-sm">৳ {economics.petrolTotalMonthly.toLocaleString()} / mo</span>
              </div>
              <div className="h-6 bg-slate-100 rounded-xl overflow-hidden p-0.5 border border-slate-200">
                <div className="h-full bg-rose-500 rounded-lg w-full flex items-center justify-end px-2 text-[10px] text-white font-mono font-bold">
                  Fuel + Engine Oil + Spark Plugs
                </div>
              </div>
            </div>

            {/* Pulse 150 Bar */}
            <div className="space-y-1.5">
              <div className="flex justify-between text-xs font-mono">
                <span className="text-slate-700 font-semibold flex items-center gap-1.5">
                  <Zap className="w-4 h-4 text-teal-600" />
                  <span>PULSE 150 Electric Scooter:</span>
                </span>
                <span className="text-emerald-700 font-bold text-sm">৳ {economics.evTotalMonthly.toLocaleString()} / mo</span>
              </div>
              <div className="h-6 bg-slate-100 rounded-xl overflow-hidden p-0.5 border border-slate-200">
                <div 
                  className="h-full bg-teal-600 rounded-lg flex items-center justify-end px-2 text-[10px] text-white font-mono font-bold transition-all duration-500"
                  style={{ width: `${Math.max(15, (economics.evTotalMonthly / economics.petrolTotalMonthly) * 100)}%` }}
                >
                  Electricity
                </div>
              </div>
            </div>

            {/* Savings Callout Pill */}
            <div className="flex items-center justify-between p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-xs font-mono text-emerald-900">
              <span className="font-bold flex items-center gap-1.5">
                <TrendingDown className="w-4 h-4 text-emerald-600" />
                <span>Monthly Cash Kept In Your Pocket:</span>
              </span>
              <strong className="text-base text-emerald-700 font-extrabold">+ ৳ {economics.monthlySavings.toLocaleString()} BDT / mo</strong>
            </div>
          </div>

          {/* Maintenance Advantage Checklist */}
          <div className="grid grid-cols-2 gap-3 text-xs">
            <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 space-y-1">
              <span className="font-mono text-[10px] font-bold text-slate-500 uppercase block">Eliminated Expenses</span>
              <ul className="space-y-1 text-slate-600 text-[11px]">
                <li className="flex items-center gap-1.5 text-rose-600">✕ No Engine Mobil oil (৳1,200/mo)</li>
                <li className="flex items-center gap-1.5 text-rose-600">✕ No Carburetor / Spark plug tuning</li>
                <li className="flex items-center gap-1.5 text-rose-600">✕ No Clutch plate replacements</li>
              </ul>
            </div>

            <div className="p-3.5 rounded-2xl bg-teal-50/50 border border-teal-200 space-y-1">
              <span className="font-mono text-[10px] font-bold text-teal-800 uppercase block">PULSE 150 Longevity</span>
              <ul className="space-y-1 text-slate-700 text-[11px]">
                <li className="flex items-center gap-1.5 text-emerald-700">✓ 3,500+ LFP Cycles (450,000 km)</li>
                <li className="flex items-center gap-1.5 text-emerald-700">✓ Brushless PMSM motor (Zero friction)</li>
                <li className="flex items-center gap-1.5 text-emerald-700">✓ Regenerative braking reduces brake wear</li>
              </ul>
            </div>
          </div>

        </div>

      </div>

    </section>
  );
};
