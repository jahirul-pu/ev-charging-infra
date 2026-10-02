import React, { useState, useMemo } from 'react';
import { Gauge, Wind, Scale, Sparkles, PlayCircle, BarChart3 } from 'lucide-react';

export const AerodynamicsCalculator: React.FC = () => {
  const [speedKmh, setSpeedKmh] = useState<number>(75);
  const [riderWeightKg, setRiderWeightKg] = useState<number>(75);
  const [dragProfile, setDragProfile] = useState<'tucked' | 'standard' | 'upright'>('standard');
  const [headwindKmh, setHeadwindKmh] = useState<number>(0);
  const [batterySizeKwh, setBatterySizeKwh] = useState<number>(5.4);

  const vehicleWeightKg = 115;
  const rho = 1.20;
  const crr = 0.014;
  const g = 9.81;
  const powertrainEfficiency = 0.89;
  const auxPowerWatts = 55;

  const cdAValues = {
    tucked: 0.42,
    standard: 0.50,
    upright: 0.64
  };

  const currentCdA = cdAValues[dragProfile];

  const calculateConsumption = (speed: number, wind: number, cdA: number, riderWeight: number) => {
    const totalMass = vehicleWeightKg + riderWeight;
    const vVehicleMs = speed / 3.6;
    const vAirMs = Math.max(0, (speed + wind) / 3.6);

    const pAero = 0.5 * rho * cdA * Math.pow(vAirMs, 2) * vVehicleMs;
    const pRoll = crr * totalMass * g * vVehicleMs;
    const pMech = pAero + pRoll;
    const pElec = (pMech / powertrainEfficiency) + auxPowerWatts;
    const whKm = pElec / speed;

    return {
      whKm: Math.round(whKm * 10) / 10,
      pAero: Math.round(pAero),
      pRoll: Math.round(pRoll),
      pElec: Math.round(pElec),
      aeroPercent: Math.round((pAero / (pAero + pRoll)) * 100)
    };
  };

  const currentPhysics = useMemo(() => {
    return calculateConsumption(speedKmh, headwindKmh, currentCdA, riderWeightKg);
  }, [speedKmh, headwindKmh, currentCdA, riderWeightKg]);

  const estimatedRangeKm = Math.round((batterySizeKwh * 1000 * 0.95) / currentPhysics.whKm);

  const speedPoints = [40, 50, 60, 70, 80, 90, 100];
  const curveData = useMemo(() => {
    return speedPoints.map(s => {
      const data = calculateConsumption(s, headwindKmh, currentCdA, riderWeightKg);
      const range = Math.round((batterySizeKwh * 1000 * 0.95) / data.whKm);
      return { speed: s, ...data, range };
    });
  }, [headwindKmh, currentCdA, riderWeightKg, batterySizeKwh]);

  return (
    <section id="aerodynamics" className="py-16 sm:py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 scroll-mt-24">
      
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-12">
        <span className="text-xs font-mono uppercase tracking-widest text-teal-700 font-bold bg-teal-50 px-3 py-1 rounded-full border border-teal-200">
          First-Principles Aerodynamics & Powertrain Physics
        </span>
        <h2 className="text-3xl sm:text-4xl font-display font-black text-slate-900 mt-2">
          Why Speed Dictates Wh/km (And Range)
        </h2>
        <p className="mt-3 text-slate-600 text-base leading-relaxed">
          Your current scooter achieves <strong className="text-teal-700 font-bold">~31 Wh/km at 60 km/h</strong>. 
          Because aerodynamic drag scales with the <strong className="text-slate-900 font-bold">cube of velocity ($v^3$)</strong>, 
          highway cruising requires precise empirical sizing.
        </p>
      </div>

      {/* Physics Formulas Card (Clean, bright, high-contrast) */}
      <div className="glass-panel p-6 rounded-3xl mb-10 border border-slate-200/90 bg-white shadow-xs">
        <div className="flex flex-wrap items-center justify-between gap-4 mb-4 pb-3 border-b border-slate-100">
          <div className="flex items-center gap-2 text-sm font-bold text-slate-900">
            <Sparkles className="w-4 h-4 text-teal-600" />
            <span>Mathematical Resistance Model</span>
          </div>
          <span className="text-xs font-mono text-slate-500 font-medium">
            Calibrated to: 2.5 kWh ÷ 80 km = 31.25 Wh/km Baseline @ 60 km/h
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 font-mono text-xs">
          <div className="p-4 rounded-2xl bg-teal-50/50 border border-teal-200/80">
            <span className="text-teal-800 font-bold block mb-1">AERODYNAMIC DRAG POWER</span>
            <div className="text-slate-900 text-sm font-bold">
              P<sub>aero</sub> = ½ · ρ · C<sub>d</sub>A · v<sup>3</sup>
            </div>
            <p className="text-[11px] text-slate-600 mt-1.5 font-sans font-normal">
              Dominates at &gt;55 km/h. Cubed velocity power penalty.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-emerald-50/50 border border-emerald-200/80">
            <span className="text-emerald-800 font-bold block mb-1">ROLLING RESISTANCE POWER</span>
            <div className="text-slate-900 text-sm font-bold">
              P<sub>rolling</sub> = C<sub>rr</sub> · m<sub>total</sub> · g · v
            </div>
            <p className="text-[11px] text-slate-600 mt-1.5 font-sans font-normal">
              Linear with weight & speed. Low-friction tire compound.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-amber-50/50 border border-amber-200/80">
            <span className="text-amber-800 font-bold block mb-1">NET BATTERY DRAW (Wh/km)</span>
            <div className="text-slate-900 text-sm font-bold">
              E = (P<sub>mech</sub> / η<sub>pwt</sub> + P<sub>aux</sub>) / v
            </div>
            <p className="text-[11px] text-slate-600 mt-1.5 font-sans font-normal">
              89% PMSM powertrain efficiency + 55W telemetry/lighting.
            </p>
          </div>
        </div>
      </div>

      {/* Main Interactive Tool Grid */}
      <div className="grid lg:grid-cols-12 gap-8">
        
        {/* Controls Column */}
        <div className="lg:col-span-5 glass-panel p-6 sm:p-7 rounded-3xl space-y-6 bg-white shadow-xs border border-slate-200/90">
          <h3 className="text-lg font-bold text-slate-900 flex items-center justify-between">
            <span>Riding Conditions</span>
            <span className="text-xs font-mono font-bold text-teal-700 bg-teal-50 px-2.5 py-0.5 rounded-full border border-teal-200">
              Interactive Lab
            </span>
          </h3>

          {/* Speed Slider */}
          <div>
            <div className="flex items-center justify-between text-sm mb-2">
              <span className="text-slate-700 font-semibold flex items-center gap-1.5">
                <Gauge className="w-4 h-4 text-teal-600" />
                <span>Highway Cruising Speed</span>
              </span>
              <span className="font-mono font-black text-teal-700 text-base">{speedKmh} km/h</span>
            </div>
            <input
              type="range"
              min="40"
              max="95"
              step="5"
              value={speedKmh}
              onChange={(e) => setSpeedKmh(Number(e.target.value))}
              className="w-full accent-teal-600 h-2 bg-slate-200 rounded-lg cursor-pointer"
            />
            <div className="flex justify-between text-[11px] font-mono text-slate-500 mt-1">
              <span>40 km/h</span>
              <span>60 (Baseline)</span>
              <span>80 (Highway)</span>
              <span>95 km/h</span>
            </div>
          </div>

          {/* Aero Drag Profile Buttons */}
          <div>
            <label className="text-sm text-slate-700 font-semibold flex items-center gap-1.5 mb-2">
              <Wind className="w-4 h-4 text-cyan-600" />
              <span>Aero Stance & Fairing (C<sub>d</sub>A)</span>
            </label>
            <div className="grid grid-cols-3 gap-2 text-xs">
              <button
                onClick={() => setDragProfile('tucked')}
                className={`p-2.5 rounded-xl border text-center transition-all ${
                  dragProfile === 'tucked'
                    ? 'bg-teal-50 border-teal-500 text-teal-900 font-bold shadow-xs'
                    : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
                }`}
              >
                <div className="font-mono text-xs font-bold">0.42 m²</div>
                <div className="text-[10px] text-slate-500 mt-0.5">Tucked Stance</div>
              </button>
              <button
                onClick={() => setDragProfile('standard')}
                className={`p-2.5 rounded-xl border text-center transition-all ${
                  dragProfile === 'standard'
                    ? 'bg-teal-50 border-teal-500 text-teal-900 font-bold shadow-xs'
                    : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
                }`}
              >
                <div className="font-mono text-xs font-bold">0.50 m²</div>
                <div className="text-[10px] text-slate-500 mt-0.5">Commuter Standard</div>
              </button>
              <button
                onClick={() => setDragProfile('upright')}
                className={`p-2.5 rounded-xl border text-center transition-all ${
                  dragProfile === 'upright'
                    ? 'bg-teal-50 border-teal-500 text-teal-900 font-bold shadow-xs'
                    : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
                }`}
              >
                <div className="font-mono text-xs font-bold">0.64 m²</div>
                <div className="text-[10px] text-slate-500 mt-0.5">Upright Windshield</div>
              </button>
            </div>
          </div>

          {/* Rider Weight */}
          <div>
            <div className="flex items-center justify-between text-sm mb-2">
              <span className="text-slate-700 font-semibold flex items-center gap-1.5">
                <Scale className="w-4 h-4 text-emerald-600" />
                <span>Rider + Luggage Weight</span>
              </span>
              <span className="font-mono font-bold text-emerald-700">{riderWeightKg} kg</span>
            </div>
            <input
              type="range"
              min="55"
              max="125"
              step="5"
              value={riderWeightKg}
              onChange={(e) => setRiderWeightKg(Number(e.target.value))}
              className="w-full accent-emerald-600 h-2 bg-slate-200 rounded-lg cursor-pointer"
            />
          </div>

          {/* Headwind / Tailwind */}
          <div>
            <div className="flex items-center justify-between text-sm mb-2">
              <span className="text-slate-700 font-semibold flex items-center gap-1.5">
                <Wind className="w-4 h-4 text-purple-600" />
                <span>Highway Wind Condition</span>
              </span>
              <span className="font-mono font-bold text-purple-700">
                {headwindKmh > 0 ? `+${headwindKmh} km/h Headwind` : headwindKmh < 0 ? `${headwindKmh} km/h Tailwind` : 'Calm Air (0 km/h)'}
              </span>
            </div>
            <input
              type="range"
              min="-15"
              max="25"
              step="5"
              value={headwindKmh}
              onChange={(e) => setHeadwindKmh(Number(e.target.value))}
              className="w-full accent-purple-600 h-2 bg-slate-200 rounded-lg cursor-pointer"
            />
          </div>

          {/* Battery Pack Selection */}
          <div className="pt-2 border-t border-slate-100">
            <label className="text-xs text-slate-500 font-mono font-bold uppercase tracking-wider block mb-2">
              Compare Pack Capacity
            </label>
            <div className="grid grid-cols-3 gap-2">
              {[5.0, 5.4, 6.0].map((size) => (
                <button
                  key={size}
                  onClick={() => setBatterySizeKwh(size)}
                  className={`py-2 px-3 rounded-xl text-xs font-mono font-bold border transition-all ${
                    batterySizeKwh === size
                      ? 'bg-teal-600 text-white border-teal-600 shadow-sm'
                      : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
                  }`}
                >
                  {size} kWh
                </button>
              ))}
            </div>
          </div>

        </div>

        {/* Live Physics Output & Graph Column */}
        <div className="lg:col-span-7 space-y-6">
          
          {/* Key Output Metric Cards */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            
            <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs border-t-4 border-t-teal-500">
              <span className="text-[11px] font-mono font-bold text-slate-500 block uppercase">Calculated Consumption</span>
              <div className="text-3xl font-display font-black text-slate-900 mt-1">
                {currentPhysics.whKm} <span className="text-sm font-sans font-bold text-teal-700">Wh/km</span>
              </div>
              <p className="text-[11px] text-slate-500 mt-1 font-medium">
                {speedKmh === 60 ? 'Matches ~31 Wh/km baseline' : speedKmh > 60 ? `+${Math.round(((currentPhysics.whKm - 31.25) / 31.25) * 100)}% vs 60km/h` : 'Sub-baseline city load'}
              </p>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs border-t-4 border-t-emerald-500">
              <span className="text-[11px] font-mono font-bold text-slate-500 block uppercase">Real-World Range</span>
              <div className="text-3xl font-display font-black text-emerald-700 mt-1">
                {estimatedRangeKm} <span className="text-sm font-sans font-bold text-slate-700">km</span>
              </div>
              <p className="text-[11px] text-slate-500 mt-1 font-medium">
                From {batterySizeKwh} kWh pack @ {speedKmh} km/h
              </p>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs border-t-4 border-t-amber-500 col-span-2 sm:col-span-1">
              <span className="text-[11px] font-mono font-bold text-slate-500 block uppercase">Aerodynamic Drag Share</span>
              <div className="text-3xl font-display font-black text-amber-700 mt-1">
                {currentPhysics.aeroPercent}%
              </div>
              <p className="text-[11px] text-slate-500 mt-1 font-medium">
                P<sub>aero</sub> = {currentPhysics.pAero}W / {currentPhysics.pElec}W
              </p>
            </div>

          </div>

          {/* Visual SVG Speed vs Wh/km Curve */}
          <div className="bg-white p-6 rounded-3xl border border-slate-200/90 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h4 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                  <BarChart3 className="w-4 h-4 text-teal-600" />
                  <span>Empirical Consumption & Range Curve vs Cruising Speed</span>
                </h4>
                <p className="text-xs text-slate-500 mt-0.5">See how consumption climbs exponentially as aerodynamic resistance kicks in</p>
              </div>
            </div>

            {/* Custom SVG Graph (Clean light tech look) */}
            <div className="w-full h-56 relative bg-slate-50 rounded-2xl p-3 border border-slate-200">
              <svg viewBox="0 0 500 200" className="w-full h-full overflow-visible">
                {/* Horizontal Grid lines */}
                <line x1="40" y1="170" x2="480" y2="170" stroke="#e2e8f0" strokeDasharray="3 3" />
                <line x1="40" y1="120" x2="480" y2="120" stroke="#e2e8f0" strokeDasharray="3 3" />
                <line x1="40" y1="70" x2="480" y2="70" stroke="#e2e8f0" strokeDasharray="3 3" />
                <line x1="40" y1="20" x2="480" y2="20" stroke="#e2e8f0" strokeDasharray="3 3" />

                {/* Y Axis labels */}
                <text x="35" y="174" fill="#64748b" fontSize="10" textAnchor="end" fontFamily="monospace" fontWeight="bold">20 Wh</text>
                <text x="35" y="124" fill="#64748b" fontSize="10" textAnchor="end" fontFamily="monospace" fontWeight="bold">40 Wh</text>
                <text x="35" y="74" fill="#64748b" fontSize="10" textAnchor="end" fontFamily="monospace" fontWeight="bold">60 Wh</text>
                <text x="35" y="24" fill="#64748b" fontSize="10" textAnchor="end" fontFamily="monospace" fontWeight="bold">80 Wh</text>

                {/* 150 km range benchmark threshold line */}
                <line x1="40" y1="135" x2="480" y2="135" stroke="#0d9488" strokeWidth="1.5" strokeDasharray="4 4" />
                <text x="475" y="130" fill="#0d9488" fontSize="9" textAnchor="end" fontFamily="monospace" fontWeight="bold">Target Budget ~36 Wh/km (150 km Range)</text>

                {/* Draw Smooth Polyline */}
                {(() => {
                  const points = curveData.map((d) => {
                    const x = 50 + ((d.speed - 40) / 60) * 420;
                    const y = 170 - ((d.whKm - 20) / 60) * 150;
                    return `${x},${y}`;
                  }).join(' ');

                  const activeX = 50 + ((speedKmh - 40) / 60) * 420;
                  const activeY = 170 - ((currentPhysics.whKm - 20) / 60) * 150;

                  return (
                    <>
                      {/* Gradient area under curve */}
                      <path
                        d={`M 50 170 L ${points.split(' ').map(p => p).join(' L ')} L 470 170 Z`}
                        fill="url(#lightCurveGradient)"
                        opacity="0.35"
                      />
                      <defs>
                        <linearGradient id="lightCurveGradient" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0%" stopColor="#0d9488" stopOpacity="0.8" />
                          <stop offset="100%" stopColor="#0d9488" stopOpacity="0.0" />
                        </linearGradient>
                      </defs>

                      {/* Main curve line */}
                      <polyline
                        fill="none"
                        stroke="#0d9488"
                        strokeWidth="3.5"
                        points={points}
                      />

                      {/* Data Point Dots */}
                      {curveData.map((d) => {
                        const cx = 50 + ((d.speed - 40) / 60) * 420;
                        const cy = 170 - ((d.whKm - 20) / 60) * 150;
                        return (
                          <g key={d.speed}>
                            <circle cx={cx} cy={cy} r="4.5" fill="#ffffff" stroke="#0d9488" strokeWidth="2.5" />
                            <text x={cx} y="190" fill="#475569" fontSize="10" textAnchor="middle" fontFamily="monospace" fontWeight="bold">
                              {d.speed}
                            </text>
                          </g>
                        );
                      })}

                      {/* Active Cursor Indicator */}
                      <line x1={activeX} y1="20" x2={activeX} y2="170" stroke="#d97706" strokeWidth="2" strokeDasharray="3 3" />
                      <circle cx={activeX} cy={activeY} r="7.5" fill="#d97706" stroke="#ffffff" strokeWidth="2.5" />
                    </>
                  );
                })()}
              </svg>
            </div>

            <div className="flex items-center justify-between text-xs text-slate-600 mt-2.5 px-1 font-medium">
              <span>X-Axis: Cruising Speed in km/h</span>
              <span className="text-amber-800 font-mono font-bold bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
                Selected: {speedKmh} km/h → {currentPhysics.whKm} Wh/km → {estimatedRangeKm} km Range
              </span>
            </div>
          </div>

          {/* The Empirical Milestone 1 Protocol Box */}
          <div className="p-5 rounded-2xl bg-teal-50/70 border border-teal-200">
            <div className="flex items-start gap-3">
              <div className="w-9 h-9 rounded-xl bg-teal-600 text-white flex items-center justify-center shrink-0 mt-0.5 shadow-sm">
                <PlayCircle className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-teal-950">
                  Immediate R&D Action: The Existing Scooter Test Protocol
                </h4>
                <p className="text-xs text-slate-700 mt-1 leading-relaxed font-normal">
                  Before finalizing motor winding or pack dimensions, we take your existing 2.5 kWh scooter to an open highway section and log Wh/km at <strong>40, 50, 60, 70, 80, 90 km/h</strong>. 
                  This single empirical dataset will eliminate all guesswork and calibrate the production BMS and station spacing.
                </p>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
