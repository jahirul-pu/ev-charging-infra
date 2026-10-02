import React, { useState, useEffect, useRef } from 'react';
import { CORRIDOR_STOPS } from '../data/constants';
import type { CorridorStop } from '../types';
import { 
  Navigation, 
  Utensils, 
  Zap, 
  Play, 
  Pause,
  RotateCcw, 
  CheckCircle2, 
  AlertTriangle, 
  MapPin, 
  Coffee, 
  Building2,
  CloudRain,
  Sun,
  Flame,
  Wind
} from 'lucide-react';

type SimPhase = 'idle' | 'riding_leg1' | 'charging_cumilla' | 'riding_leg2' | 'charging_feni' | 'riding_leg3' | 'finished' | 'paused';
type WeatherMode = 'ideal' | 'heatwave' | 'monsoon';

export const CorridorSimulator: React.FC = () => {
  const [speedKmh, setSpeedKmh] = useState<number>(75);
  const [chargerChoice, setChargerChoice] = useState<'7.2_ac' | '20_dc'>('7.2_ac');
  const [cumillaDuration, setCumillaDuration] = useState<number>(25);
  const [stopAtCumilla, setStopAtCumilla] = useState<boolean>(true);
  const [stopAtFeni, setStopAtFeni] = useState<boolean>(false);
  const [feniDuration, setFeniDuration] = useState<number>(15);
  const [selectedStop, setSelectedStop] = useState<CorridorStop>(CORRIDOR_STOPS[2]);
  const [weather, setWeather] = useState<WeatherMode>('ideal');

  const [simPhase, setSimPhase] = useState<SimPhase>('idle');
  const [currentKm, setCurrentKm] = useState<number>(0);
  const [liveSoC, setLiveSoC] = useState<number>(100);
  const [pausedPhase, setPausedPhase] = useState<SimPhase>('riding_leg1');
  const [activeTopographyEvent, setActiveTopographyEvent] = useState<string | null>(null);

  const batteryCapacityKwh = 5.4;
  const totalCorridorDistance = 245;

  // Base Wh/km based on speed
  const getBaseWhKm = (speed: number) => {
    if (speed <= 60) return 31.5;
    if (speed <= 75) return 38.5;
    if (speed <= 85) return 46.0;
    return 56.0;
  };

  // Weather multiplier
  const weatherMultiplier = weather === 'ideal' ? 1.0 : weather === 'heatwave' ? 1.08 : 1.22;
  const currentWhKm = Math.round(getBaseWhKm(speedKmh) * weatherMultiplier * 10) / 10;

  const chargePowerKw = chargerChoice === '7.2_ac' ? 7.2 : 20.0;
  const chargeEfficiency = 0.90;

  // Bridge regen recovery (Meghna = 0.13 kWh ~ 2.4%, Gomti = 0.11 kWh ~ 2.0%)
  const totalBridgeRegenKwh = 0.24;

  // Leg 1: Dhaka (0) -> Cumilla (108 km)
  const distToCumilla = 108;
  const leg1Kwh = ((distToCumilla * currentWhKm) / 1000) - (0.13 + 0.11); // minus bridge regen
  const socBeforeCumilla = Math.max(0, Math.round(((batteryCapacityKwh - leg1Kwh) / batteryCapacityKwh) * 100));

  // Cumilla charging boost
  const cumillaEnergyAddedKwh = stopAtCumilla ? (chargePowerKw * (cumillaDuration / 60)) * chargeEfficiency : 0;
  const socAfterCumilla = Math.min(100, Math.round(socBeforeCumilla + (cumillaEnergyAddedKwh / batteryCapacityKwh) * 100));

  // Leg 2: Cumilla (108) -> Feni (168 km) = 60 km
  const distCumillaToFeni = 60;
  const leg2Kwh = (distCumillaToFeni * currentWhKm) / 1000;
  const batteryAtFeniStartKwh = (socAfterCumilla / 100) * batteryCapacityKwh;
  const socBeforeFeni = Math.max(0, Math.round(((batteryAtFeniStartKwh - leg2Kwh) / batteryCapacityKwh) * 100));

  // Feni charging boost
  const feniEnergyAddedKwh = stopAtFeni ? (chargePowerKw * (feniDuration / 60)) * chargeEfficiency : 0;
  const socAfterFeni = Math.min(100, Math.round(socBeforeFeni + (feniEnergyAddedKwh / batteryCapacityKwh) * 100));

  // Leg 3: Feni (168) -> Chattogram (245 km) = 77 km
  const distFeniToCtg = 77;
  const leg3Kwh = (distFeniToCtg * currentWhKm) / 1000;
  const batteryAtCtgLegStart = (socAfterFeni / 100) * batteryCapacityKwh;
  const finalArrivalSoC = Math.max(0, Math.round(((batteryAtCtgLegStart - leg3Kwh) / batteryCapacityKwh) * 100));

  // Time calculations
  const totalRidingMinutes = Math.round((totalCorridorDistance / speedKmh) * 60);
  const totalStopMinutes = (stopAtCumilla ? cumillaDuration : 0) + (stopAtFeni ? feniDuration : 0);
  const totalJourneyMinutes = totalRidingMinutes + totalStopMinutes;

  const isDangerousConfig = socBeforeCumilla <= 5 || (!stopAtCumilla && finalArrivalSoC <= 0) || finalArrivalSoC < 5;

  const simRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    if (simPhase === 'idle' || simPhase === 'finished' || simPhase === 'paused') {
      if (simRef.current) clearInterval(simRef.current);
      return;
    }

    simRef.current = setInterval(() => {
      if (simPhase === 'riding_leg1') {
        setCurrentKm((prev) => {
          const next = prev + 3;

          // Check bridge events
          if (next >= 27 && next <= 32) {
            setActiveTopographyEvent('🌉 Meghna Bridge Incline & Descent (Regen +2.4% SoC)');
          } else if (next >= 73 && next <= 78) {
            setActiveTopographyEvent('🌉 Gomti Bridge Descent (Regen +2.0% SoC)');
          } else {
            setActiveTopographyEvent(null);
          }

          // Calculate energy used accounting for bridge regen
          let energyUsed = (next * currentWhKm) / 1000;
          if (next > 32) energyUsed -= 0.13;
          if (next > 78) energyUsed -= 0.11;

          const remainingKwh = Math.max(0, batteryCapacityKwh - energyUsed);
          setLiveSoC(Math.max(0, Math.round((remainingKwh / batteryCapacityKwh) * 100)));

          if (next >= 108) {
            setActiveTopographyEvent(null);
            if (stopAtCumilla) {
              setSimPhase('charging_cumilla');
            } else {
              setSimPhase('riding_leg2');
            }
            return 108;
          }
          return next;
        });
      } else if (simPhase === 'charging_cumilla') {
        setLiveSoC((soc) => {
          if (soc >= socAfterCumilla) {
            setSimPhase('riding_leg2');
            return socAfterCumilla;
          }
          return Math.min(socAfterCumilla, soc + 3);
        });
      } else if (simPhase === 'riding_leg2') {
        setCurrentKm((prev) => {
          const next = prev + 3;
          const distFromCumilla = next - 108;
          const energyFromCumilla = (distFromCumilla * currentWhKm) / 1000;
          const startKwh = (socAfterCumilla / 100) * batteryCapacityKwh;
          const remainingKwh = Math.max(0, startKwh - energyFromCumilla);
          setLiveSoC(Math.max(0, Math.round((remainingKwh / batteryCapacityKwh) * 100)));

          if (next >= 168) {
            if (stopAtFeni) {
              setSimPhase('charging_feni');
            } else {
              setSimPhase('riding_leg3');
            }
            return 168;
          }
          return next;
        });
      } else if (simPhase === 'charging_feni') {
        setLiveSoC((soc) => {
          if (soc >= socAfterFeni) {
            setSimPhase('riding_leg3');
            return socAfterFeni;
          }
          return Math.min(socAfterFeni, soc + 3);
        });
      } else if (simPhase === 'riding_leg3') {
        setCurrentKm((prev) => {
          const next = prev + 3;
          const distFromFeni = next - 168;
          const energyFromFeni = (distFromFeni * currentWhKm) / 1000;
          const startKwh = (socAfterFeni / 100) * batteryCapacityKwh;
          const remainingKwh = Math.max(0, startKwh - energyFromFeni);
          setLiveSoC(Math.max(0, Math.round((remainingKwh / batteryCapacityKwh) * 100)));

          if (next >= totalCorridorDistance) {
            setSimPhase('finished');
            return totalCorridorDistance;
          }
          return next;
        });
      }
    }, 75);

    return () => {
      if (simRef.current) clearInterval(simRef.current);
    };
  }, [simPhase, currentWhKm, stopAtCumilla, stopAtFeni, socAfterCumilla, socAfterFeni]);

  const handleTogglePlay = () => {
    if (simPhase === 'idle' || simPhase === 'finished') {
      setCurrentKm(0);
      setLiveSoC(100);
      setActiveTopographyEvent(null);
      setSimPhase('riding_leg1');
    } else if (simPhase === 'paused') {
      setSimPhase(pausedPhase);
    } else {
      setPausedPhase(simPhase);
      setSimPhase('paused');
      if (simRef.current) clearInterval(simRef.current);
    }
  };

  const handleResetSim = () => {
    if (simRef.current) clearInterval(simRef.current);
    setSimPhase('idle');
    setPausedPhase('riding_leg1');
    setCurrentKm(0);
    setLiveSoC(100);
    setActiveTopographyEvent(null);
  };

  return (
    <section id="corridor" className="py-16 sm:py-20 bg-white/70 border-y border-slate-200/80 scroll-mt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="text-xs font-mono uppercase tracking-widest text-teal-700 font-bold bg-teal-50 px-3 py-1 rounded-full border border-teal-200">
            Interactive Highway Corridor Simulator
          </span>
          <h2 className="text-3xl sm:text-4xl font-display font-black text-slate-900 mt-2">
            Dhaka ↔ Chattogram Express (245 km)
          </h2>
          <p className="mt-3 text-slate-600 text-base leading-relaxed">
            Test how a moderate <strong className="text-teal-700 font-bold">5.4 kWh battery</strong> easily conquers Bangladesh's busiest highway corridor by pairing with a single natural <strong className="text-slate-900 font-bold">25-minute lunch break in Cumilla</strong>.
            Now with <strong className="text-slate-900 font-bold">Weather Stress-Testing</strong> and <strong className="text-emerald-700 font-bold">Bridge Regenerative Braking Topography</strong>.
          </p>
        </div>

        {/* Range Safety Alert */}
        {isDangerousConfig && (
          <div className="mb-8 p-4 rounded-2xl bg-amber-50 border border-amber-300 text-xs text-amber-900 flex items-start gap-3">
            <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
            <div>
              <strong className="text-slate-900 block font-mono uppercase tracking-wider font-bold">
                Highway Range Advisory
              </strong>
              <span className="font-normal text-amber-800">
                At high sustained speeds ({speedKmh} km/h, {currentWhKm} Wh/km with {weather} weather), energy drain accelerates. 
                {!stopAtCumilla 
                  ? ' Disabling the Cumilla stop will leave the scooter stranded before Chattogram.'
                  : socBeforeCumilla <= 5 
                  ? ` Arriving at Cumilla with only ${socBeforeCumilla}% SoC leaves too little safety reserve. Consider cruising at 75 km/h or choosing 20 kW DC.` 
                  : ' Final arrival reserve is critical (<5%). Enable the Feni top-up hub or select 20 kW DC charging.'}
              </span>
            </div>
          </div>
        )}

        {/* 1. Simulation Control Deck */}
        <div className="glass-panel p-6 sm:p-8 rounded-3xl mb-10 border border-slate-200/90 bg-white shadow-xs">
          
          {/* Top Row: Weather Stress Presets */}
          <div className="mb-6 pb-5 border-b border-slate-100 flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono font-bold uppercase text-slate-700">
                Environmental & Weather Condition:
              </span>
              <span className="text-[11px] font-mono text-slate-500 hidden sm:inline">
                (Simulates aero density, monsoon headwinds & battery heat dissipation)
              </span>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => { setWeather('ideal'); handleResetSim(); }}
                className={`px-3 py-1.5 rounded-xl text-xs font-mono font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
                  weather === 'ideal'
                    ? 'bg-teal-600 text-white shadow-xs'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                <Sun className="w-3.5 h-3.5" />
                <span>☀️ Ideal (28°C Calm)</span>
              </button>

              <button
                type="button"
                onClick={() => { setWeather('heatwave'); handleResetSim(); }}
                className={`px-3 py-1.5 rounded-xl text-xs font-mono font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
                  weather === 'heatwave'
                    ? 'bg-amber-600 text-white shadow-xs'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                <Flame className="w-3.5 h-3.5" />
                <span>🔥 Heatwave 42°C (+8%)</span>
              </button>

              <button
                type="button"
                onClick={() => { setWeather('monsoon'); handleResetSim(); }}
                className={`px-3 py-1.5 rounded-xl text-xs font-mono font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
                  weather === 'monsoon'
                    ? 'bg-blue-600 text-white shadow-xs'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                <CloudRain className="w-3.5 h-3.5" />
                <span>🌧️ Monsoon Headwind (+22%)</span>
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-5 items-end">
            
            {/* Speed Control */}
            <div>
              <div className="flex justify-between items-center text-xs mb-2">
                <span className="text-slate-500 font-mono font-bold uppercase">1. Cruising Speed</span>
                <span className="font-mono font-black text-teal-700 text-sm">{speedKmh} km/h</span>
              </div>
              <div className="grid grid-cols-4 gap-1.5">
                {[60, 75, 85, 95].map((s) => (
                  <button
                    key={s}
                    type="button"
                    onClick={() => { setSpeedKmh(s); handleResetSim(); }}
                    className={`py-2 px-1 rounded-xl text-xs font-mono font-bold border transition-all cursor-pointer ${
                      speedKmh === s
                        ? 'bg-teal-600 text-white border-teal-600 shadow-sm'
                        : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
                    }`}
                  >
                    {s}
                  </button>
                ))}
              </div>
              <span className="text-[11px] text-slate-500 mt-1.5 block font-mono">
                Total Load: <strong className="text-slate-800">{currentWhKm} Wh/km</strong>
              </span>
            </div>

            {/* Charger Type */}
            <div>
              <div className="flex justify-between items-center text-xs mb-2">
                <span className="text-slate-500 font-mono font-bold uppercase">2. Charger Interface</span>
                <span className="font-mono font-bold text-slate-700 text-xs">
                  {chargerChoice === '7.2_ac' ? '7.2 kW AC' : '20 kW DC'}
                </span>
              </div>
              <div className="grid grid-cols-2 gap-1.5">
                <button
                  type="button"
                  onClick={() => { setChargerChoice('7.2_ac'); handleResetSim(); }}
                  className={`py-2 px-2 rounded-xl text-xs font-mono font-bold border transition-all cursor-pointer ${
                    chargerChoice === '7.2_ac'
                      ? 'bg-teal-600 text-white border-teal-600 shadow-sm'
                      : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
                  }`}
                >
                  7.2 kW AC
                </button>
                <button
                  type="button"
                  onClick={() => { setChargerChoice('20_dc'); handleResetSim(); }}
                  className={`py-2 px-2 rounded-xl text-xs font-mono font-bold border transition-all cursor-pointer ${
                    chargerChoice === '20_dc'
                      ? 'bg-teal-600 text-white border-teal-600 shadow-sm'
                      : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
                  }`}
                >
                  20 kW DC
                </button>
              </div>
              <span className="text-[11px] text-slate-500 mt-1.5 block font-mono">
                {chargerChoice === '7.2_ac' ? 'Standard Diner post' : 'Rapid DC supercharger'}
              </span>
            </div>

            {/* Stop 1: Cumilla Lunch Break */}
            <div>
              <div className="flex justify-between items-center text-xs mb-2">
                <span className="text-slate-500 font-mono font-bold uppercase">3. Cumilla Meal (108km)</span>
                <label className="flex items-center gap-1 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={stopAtCumilla}
                    onChange={(e) => { setStopAtCumilla(e.target.checked); handleResetSim(); }}
                    className="accent-teal-600 rounded cursor-pointer"
                  />
                  <span className="text-[11px] text-teal-800 font-mono font-bold">Stop</span>
                </label>
              </div>
              <div className="grid grid-cols-3 gap-1.5">
                {[15, 25, 35].map((m) => (
                  <button
                    key={m}
                    type="button"
                    disabled={!stopAtCumilla}
                    onClick={() => { setCumillaDuration(m); handleResetSim(); }}
                    className={`py-2 px-1 rounded-xl text-xs font-mono font-bold border transition-all disabled:opacity-30 cursor-pointer ${
                      cumillaDuration === m && stopAtCumilla
                        ? 'bg-emerald-600 text-white border-emerald-600 shadow-sm'
                        : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
                    }`}
                  >
                    {m} min
                  </button>
                ))}
              </div>
              <span className="text-[11px] text-slate-500 mt-1.5 block font-mono">
                {stopAtCumilla ? `${cumillaDuration} min Lunch Break` : 'Skip Cumilla (Risky)'}
              </span>
            </div>

            {/* Stop 2: Feni Top-up Hub */}
            <div>
              <div className="flex justify-between items-center text-xs mb-2">
                <span className="text-slate-500 font-mono font-bold uppercase">4. Feni Hub (168km)</span>
                <label className="flex items-center gap-1 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={stopAtFeni}
                    onChange={(e) => { setStopAtFeni(e.target.checked); handleResetSim(); }}
                    className="accent-teal-600 rounded cursor-pointer"
                  />
                  <span className="text-[11px] text-teal-800 font-mono font-bold">{stopAtFeni ? 'Enabled' : 'Bypass'}</span>
                </label>
              </div>
              <div className="grid grid-cols-2 gap-1.5">
                {[10, 20].map((m) => (
                  <button
                    key={m}
                    type="button"
                    disabled={!stopAtFeni}
                    onClick={() => { setFeniDuration(m); handleResetSim(); }}
                    className={`py-2 px-1 rounded-xl text-xs font-mono font-bold border transition-all disabled:opacity-30 cursor-pointer ${
                      feniDuration === m && stopAtFeni
                        ? 'bg-purple-600 text-white border-purple-600 shadow-sm'
                        : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
                    }`}
                  >
                    {m} min
                  </button>
                ))}
              </div>
              <span className="text-[11px] text-slate-500 mt-1.5 block font-mono">
                {stopAtFeni ? `${feniDuration} min Tea buffer` : 'Direct cruise to Ctg'}
              </span>
            </div>

            {/* Simulation Action Controls */}
            <div>
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={handleTogglePlay}
                  className="flex-1 py-3 px-3 rounded-xl font-bold text-xs uppercase tracking-wider text-white bg-gradient-to-r from-teal-600 to-cyan-600 hover:from-teal-500 hover:to-cyan-500 shadow-md shadow-teal-600/20 flex items-center justify-center gap-1.5 transition-all cursor-pointer"
                >
                  {simPhase === 'idle' || simPhase === 'finished' || simPhase === 'paused' ? (
                    <Play className="w-3.5 h-3.5 fill-white" />
                  ) : (
                    <Pause className="w-3.5 h-3.5 fill-white" />
                  )}
                  <span>
                    {simPhase === 'idle'
                      ? 'Start Ride'
                      : simPhase === 'finished'
                      ? 'Re-run Ride'
                      : simPhase === 'paused'
                      ? 'Resume Ride'
                      : 'Pause Ride'}
                  </span>
                </button>
                <button
                  type="button"
                  onClick={handleResetSim}
                  className="p-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-200 transition-colors cursor-pointer"
                  title="Reset Journey"
                >
                  <RotateCcw className="w-4 h-4" />
                </button>
              </div>
              <div className="text-[11px] font-mono font-bold text-teal-700 mt-2 text-center truncate">
                {activeTopographyEvent ? (
                  <span className="text-emerald-700 animate-pulse">{activeTopographyEvent}</span>
                ) : (
                  <>
                    {simPhase === 'idle' && 'Ready at Dhaka Hub (100% SoC)'}
                    {simPhase === 'riding_leg1' && `Riding to Cumilla (${currentKm} km)`}
                    {simPhase === 'charging_cumilla' && `⚡ Dining & Charging at Cumilla Oasis!`}
                    {simPhase === 'riding_leg2' && `Cruising toward Feni (${currentKm} km)`}
                    {simPhase === 'charging_feni' && `⚡ Tea stop & charging at Feni Hub!`}
                    {simPhase === 'riding_leg3' && `Final leg to Chattogram (${currentKm} km)`}
                    {simPhase === 'finished' && `✓ Arrived in Chattogram with ${liveSoC}% reserve!`}
                  </>
                )}
              </div>
            </div>

          </div>
        </div>

        {/* 2. Visual Highway Map */}
        <div className="glass-panel p-6 sm:p-10 rounded-3xl mb-10 border border-slate-200/90 bg-white shadow-sm relative overflow-hidden">
          
          {/* Top Telemetry HUD Header */}
          <div className="flex flex-wrap items-center justify-between gap-4 mb-8 pb-4 border-b border-slate-100">
            
            <div className="flex items-center gap-3">
              <div className="relative flex items-center justify-center w-10 h-10 rounded-xl bg-teal-50 text-teal-700 border border-teal-200">
                <Navigation className="w-5 h-5" />
                {simPhase.startsWith('charging') && (
                  <div className="absolute -top-1 -right-1 w-3 h-3 bg-emerald-500 rounded-full animate-ping" />
                )}
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="font-bold text-slate-900 text-base">National Highway 1 (N1) Live Simulation</h3>
                  <span className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold uppercase ${
                    simPhase.startsWith('charging')
                      ? 'bg-emerald-50 text-emerald-800 border border-emerald-300 animate-pulse'
                      : simPhase === 'finished'
                      ? 'bg-teal-50 text-teal-800 border border-teal-300'
                      : 'bg-slate-100 text-slate-700 border border-slate-200'
                  }`}>
                    {simPhase === 'idle' ? 'Ready' : simPhase.startsWith('charging') ? 'Active Charging' : simPhase === 'finished' ? 'Terminus Reached' : 'Cruising'}
                  </span>
                </div>
                <p className="text-xs text-slate-500 font-medium">
                  Dhaka (0km) → Meghna Bridge (28km) → Daudkandi (42km) → Gomti Bridge (74km) → Cumilla (108km) → Feni (168km) → Chattogram (245km)
                </p>
              </div>
            </div>

            {/* Live Metrics Pill Group */}
            <div className="flex flex-wrap items-center gap-3">
              
              <div className="px-3.5 py-1.5 rounded-xl bg-slate-50 border border-slate-200 text-xs font-mono">
                <span className="text-slate-500 block text-[9px] font-bold">ODOMETER</span>
                <span className="font-extrabold text-slate-900 text-sm">{currentKm} / 245 km</span>
              </div>

              <div className="px-3.5 py-1.5 rounded-xl bg-slate-50 border border-slate-200 text-xs font-mono">
                <span className="text-slate-500 block text-[9px] font-bold">POWERTRAIN STATE</span>
                <span className={`font-extrabold text-sm ${simPhase.startsWith('charging') ? 'text-emerald-700 animate-pulse' : activeTopographyEvent ? 'text-emerald-600 font-black' : 'text-teal-700'}`}>
                  {simPhase.startsWith('charging') 
                    ? `+${chargePowerKw} kW Inflow` 
                    : activeTopographyEvent 
                    ? `+2.8 kW Regen Recapture` 
                    : `-${((currentWhKm * speedKmh) / 1000).toFixed(1)} kW Load`}
                </span>
              </div>

              {/* Battery SoC Gauge */}
              <div className="flex items-center gap-2.5 px-3.5 py-1.5 rounded-xl bg-slate-50 border border-slate-200">
                <div className="text-right font-mono">
                  <span className="text-slate-500 block text-[9px] font-bold uppercase">Battery</span>
                  <span className={`text-base font-extrabold ${liveSoC <= 15 ? 'text-rose-600' : liveSoC <= 30 ? 'text-amber-600' : 'text-emerald-700'}`}>
                    {liveSoC}% SoC
                  </span>
                </div>
                <div className="w-12 h-6 rounded-md border-2 border-slate-400 p-0.5 relative flex items-center bg-white">
                  <div
                    className={`h-full rounded-xs transition-all duration-300 ${
                      liveSoC <= 15 ? 'bg-rose-500' : liveSoC <= 30 ? 'bg-amber-500' : 'bg-emerald-500'
                    }`}
                    style={{ width: `${liveSoC}%` }}
                  />
                  {simPhase.startsWith('charging') && (
                    <Zap className="absolute inset-0 m-auto w-3.5 h-3.5 text-black fill-black animate-bounce" />
                  )}
                </div>
              </div>

            </div>

          </div>

          {/* Interactive Route Track Area */}
          <div className="relative my-8 sm:my-10 select-none">
            
            {/* 1. Track Bed */}
            <div className="relative h-14 w-full flex items-center">
              
              {/* Base Highway Roadbed */}
              <div 
                className="absolute h-3.5 bg-slate-200 rounded-full border border-slate-300 shadow-inner"
                style={{ left: '6%', right: '6%' }}
              />
              
              {/* Center dashed road stripe */}
              <div 
                className="absolute h-0.5 border-t border-dashed border-slate-400"
                style={{ left: '6%', right: '6%' }}
              />

              {/* Topography Bridge Markers on Roadbed */}
              {/* Meghna Bridge at km 28 */}
              <div 
                className="absolute -translate-x-1/2 z-10 flex flex-col items-center"
                style={{ left: `${6 + (28 / totalCorridorDistance) * 88}%` }}
                title="Meghna Bridge: Incline + Descent Regenerative Braking"
              >
                <div className="h-5 w-2 bg-indigo-500/80 rounded-xs border border-indigo-700" />
                <span className="text-[8px] font-mono font-bold text-indigo-700 whitespace-nowrap -mt-6">
                  🌉 Meghna
                </span>
              </div>

              {/* Gomti Bridge at km 74 */}
              <div 
                className="absolute -translate-x-1/2 z-10 flex flex-col items-center"
                style={{ left: `${6 + (74 / totalCorridorDistance) * 88}%` }}
                title="Gomti Bridge: Incline + Descent Regenerative Braking"
              >
                <div className="h-5 w-2 bg-indigo-500/80 rounded-xs border border-indigo-700" />
                <span className="text-[8px] font-mono font-bold text-indigo-700 whitespace-nowrap -mt-6">
                  🌉 Gomti
                </span>
              </div>

              {/* Dynamic Electric Progress Fill */}
              <div
                className="absolute h-3.5 bg-gradient-to-r from-teal-500 via-cyan-500 to-emerald-500 rounded-full shadow-md shadow-teal-500/30 transition-all duration-200"
                style={{ 
                  left: '6%', 
                  width: `${Math.max(0, ((6 + (currentKm / totalCorridorDistance) * 88) - 6))}%` 
                }}
              />

              {/* The 5 Clickable Hub Milestone Nodes */}
              {CORRIDOR_STOPS.map((stop) => {
                const isPassed = currentKm >= stop.distanceKm;
                const isSelected = selectedStop.id === stop.id;
                const isPrime = stop.recommendedStop;
                const willStopHere = (stop.id === 'cumilla' && stopAtCumilla) || (stop.id === 'feni' && stopAtFeni);
                const nodeLeft = 6 + (stop.distanceKm / totalCorridorDistance) * 88;

                return (
                  <div
                    key={stop.id}
                    onClick={() => setSelectedStop(stop)}
                    className="absolute -translate-x-1/2 cursor-pointer z-20 group"
                    style={{ left: `${nodeLeft}%` }}
                  >
                    {/* Node Icon Button */}
                    <div className="relative flex items-center justify-center">
                      <div className={`w-11 h-11 sm:w-12 sm:h-12 rounded-2xl border-2 flex items-center justify-center transition-all ${
                        isSelected 
                          ? 'ring-4 ring-teal-500/30 scale-110 shadow-md bg-white border-teal-600 text-teal-800' 
                          : 'group-hover:scale-105'
                      } ${
                        isPassed
                          ? 'bg-teal-600 border-teal-600 text-white shadow-md font-bold'
                          : willStopHere
                          ? 'bg-emerald-50 border-emerald-500 text-emerald-800'
                          : 'bg-white border-slate-300 text-slate-600 shadow-xs'
                      }`}>
                        {stop.type === 'origin' && <MapPin className="w-5 h-5" />}
                        {stop.type === 'destination' && <CheckCircle2 className="w-5 h-5" />}
                        {stop.type === 'hub' && (isPrime ? <Utensils className="w-5 h-5" /> : <Coffee className="w-5 h-5" />)}
                      </div>

                      {/* Special Badge above Node */}
                      {isPrime && (
                        <span className="absolute -top-3.5 px-2 py-0.5 rounded-full text-[8px] font-mono font-bold bg-emerald-600 text-white shadow-xs whitespace-nowrap">
                          LUNCH HUB
                        </span>
                      )}
                      {stop.type === 'origin' && (
                        <span className="absolute -top-3.5 px-2 py-0.5 rounded-full text-[8px] font-mono font-bold bg-slate-800 text-white whitespace-nowrap">
                          START
                        </span>
                      )}
                      {stop.type === 'destination' && (
                        <span className="absolute -top-3.5 px-2 py-0.5 rounded-full text-[8px] font-mono font-bold bg-slate-800 text-white whitespace-nowrap">
                          GOAL
                        </span>
                      )}
                    </div>
                  </div>
                );
              })}

              {/* Animated Moving Scooter Marker */}
              <div
                className="absolute -translate-x-1/2 z-30 pointer-events-none transition-all duration-200"
                style={{ left: `${6 + (currentKm / totalCorridorDistance) * 88}%` }}
              >
                <div className="relative flex items-center justify-center">
                  <div className={`w-11 h-11 sm:w-12 sm:h-12 rounded-full flex items-center justify-center font-bold text-xs shadow-xl transition-all ${
                    simPhase.startsWith('charging')
                      ? 'bg-emerald-500 text-white scale-125 ring-4 ring-emerald-300 animate-pulse'
                      : activeTopographyEvent
                      ? 'bg-indigo-600 text-white ring-4 ring-indigo-300 scale-110'
                      : 'bg-teal-600 text-white ring-4 ring-teal-200'
                  }`}>
                    {simPhase.startsWith('charging') ? (
                      <Zap className="w-5 h-5 fill-white animate-spin" />
                    ) : activeTopographyEvent ? (
                      '🌉'
                    ) : (
                      '⚡'
                    )}
                  </div>

                  <div className="absolute -top-9 whitespace-nowrap bg-slate-900 text-white text-[10px] font-mono font-bold px-2 py-0.5 rounded-md shadow-md border border-slate-700">
                    {currentKm} km • {liveSoC}% SoC
                  </div>
                </div>
              </div>

            </div>

            {/* 2. Distinct Labels Row */}
            <div className="relative mt-7 sm:mt-8 w-full h-16 sm:h-20">
              {CORRIDOR_STOPS.map((stop, idx) => {
                const isSelected = selectedStop.id === stop.id;
                const isPrime = stop.recommendedStop;
                const nodeLeft = 6 + (stop.distanceKm / totalCorridorDistance) * 88;

                const isFirst = idx === 0;
                const isLast = idx === CORRIDOR_STOPS.length - 1;
                
                const transformClass = isFirst 
                  ? '-translate-x-2 text-left' 
                  : isLast 
                  ? '-translate-x-[88%] text-right' 
                  : '-translate-x-1/2 text-center';

                return (
                  <div
                    key={stop.id}
                    onClick={() => setSelectedStop(stop)}
                    className={`absolute cursor-pointer w-24 sm:w-36 transition-all ${transformClass}`}
                    style={{ left: `${nodeLeft}%` }}
                  >
                    <div className={`text-xs font-bold leading-tight transition-colors ${
                      isSelected ? 'text-teal-700 font-extrabold underline' : isPrime ? 'text-emerald-700 font-bold' : 'text-slate-800'
                    }`}>
                      {stop.name.split(' (')[0]}
                    </div>
                    <div className="text-[11px] font-mono font-bold text-teal-700 mt-0.5">
                      {stop.distanceKm} km
                    </div>
                    <div className="text-[10px] text-slate-500 mt-0.5 truncate hidden sm:block font-medium">
                      {stop.partnerType.split(' ')[0]}
                    </div>
                  </div>
                );
              })}
            </div>

          </div>

          {/* Interactive Node Inspector Drawer */}
          <div className="mt-6 p-5 rounded-2xl bg-slate-50 border border-slate-200">
            <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-slate-200">
              <div className="flex items-center gap-2">
                <Building2 className="w-4 h-4 text-teal-600" />
                <span className="text-xs font-mono text-slate-500 uppercase font-bold">Selected Corridor Hub:</span>
                <span className="text-sm font-bold text-slate-900">{selectedStop.name}</span>
              </div>
              <span className="text-xs font-mono font-bold text-teal-800 bg-teal-50 px-2.5 py-1 rounded-lg border border-teal-200">
                {selectedStop.distanceKm} km from Dhaka
              </span>
            </div>

            <div className="grid md:grid-cols-3 gap-4 mt-3 text-xs">
              <div>
                <span className="text-slate-500 block text-[11px] font-bold mb-1">Station Description:</span>
                <p className="text-slate-700 leading-relaxed font-normal">{selectedStop.description}</p>
              </div>

              <div>
                <span className="text-slate-500 block text-[11px] font-bold mb-1">Host Partner Profile:</span>
                <strong className="text-slate-900 block font-semibold">{selectedStop.partnerType}</strong>
                <span className="text-slate-600 block mt-1">Recommended Rider Dwell: <strong className="text-slate-900">{selectedStop.avgDwellMinutes} min</strong></span>
              </div>

              <div>
                <span className="text-slate-500 block text-[11px] font-bold mb-1">Site Amenities & Charging Equipment:</span>
                <div className="flex flex-wrap gap-1.5 mt-1">
                  {selectedStop.amenities.map((amenity, i) => (
                    <span key={i} className="px-2.5 py-0.5 rounded-md bg-white text-slate-800 text-[10px] font-mono font-medium border border-slate-200 shadow-2xs">
                      {amenity}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Trip Summary & The Human Sync Card */}
          <div className="mt-6 p-6 rounded-2xl bg-teal-50/80 border border-teal-200/90 shadow-2xs">
            <div className="grid md:grid-cols-12 gap-6 items-center">
              
              <div className="md:col-span-8 space-y-2">
                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold uppercase bg-white text-teal-800 border border-teal-200">
                    The Lifestyle Sync Proof
                  </span>
                  <span className="text-xs text-slate-600 font-medium">Dhaka ↔ Chattogram Whole Journey Analysis</span>
                </div>

                <h4 className="text-lg font-bold text-slate-900">
                  "The Rider Eats Lunch While The Scooter Charges"
                </h4>

                <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-normal">
                  Cruising at <strong className="text-slate-900 font-mono font-bold">{speedKmh} km/h</strong> ({weather === 'monsoon' ? 'Monsoon headwind' : weather === 'heatwave' ? '42°C heatwave' : 'Ideal 28°C weather'}), 
                  the rider covers the 108 km to Cumilla in 
                  <strong className="text-teal-800 font-mono font-bold"> ~{Math.round((108 / speedKmh) * 60)} minutes</strong>, arriving with 
                  <strong className="text-amber-800 font-mono font-bold"> {socBeforeCumilla}% SoC</strong> (including +4.4% bridge descent regenerative energy). 
                  During the <strong className="text-slate-900 font-mono font-bold">{cumillaDuration} min</strong> lunch break, 
                  the {chargerChoice === '7.2_ac' ? '7.2 kW AC Diner post' : '20 kW DC Fast charger'} replenishes 
                  <strong className="text-emerald-700 font-mono font-bold"> +{Math.round((cumillaEnergyAddedKwh / batteryCapacityKwh) * 100)}%</strong>, 
                  launching toward Chattogram at <strong className="text-emerald-800 font-mono font-bold">{socAfterCumilla}% SoC</strong>.
                </p>

                <div className="flex flex-wrap gap-4 text-xs font-mono pt-2 text-slate-700">
                  <div className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-teal-600" />
                    <span>Net Waiting Penalty: <strong className="text-slate-900">0 Minutes</strong> (Coincides with lunch)</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-teal-600" />
                    <span>Terminus Arrival Reserve: <strong className="text-teal-800 font-bold">{finalArrivalSoC}%</strong></span>
                  </div>
                </div>
              </div>

              {/* Time Breakdown Card */}
              <div className="md:col-span-4 p-4 rounded-xl bg-white border border-slate-200 space-y-2.5 text-xs font-mono shadow-xs">
                <div className="flex justify-between items-center text-slate-500 font-medium">
                  <span>Total Distance:</span>
                  <span className="text-slate-900 font-bold">245 km</span>
                </div>
                <div className="flex justify-between items-center text-slate-500 font-medium">
                  <span>Highway Riding Time:</span>
                  <span className="text-slate-900 font-bold">{Math.floor(totalRidingMinutes / 60)}h {totalRidingMinutes % 60}m</span>
                </div>
                <div className="flex justify-between items-center text-slate-500 font-medium">
                  <span>Meal / Rest Stop Duration:</span>
                  <span className="text-emerald-700 font-bold">{totalStopMinutes} min</span>
                </div>
                <div className="flex justify-between items-center text-slate-500 font-medium">
                  <span>Energy Consumed:</span>
                  <span className="text-teal-700 font-bold">{((totalCorridorDistance * currentWhKm) / 1000).toFixed(1)} kWh</span>
                </div>
                <div className="pt-2 border-t border-slate-100 flex justify-between items-center text-sm font-bold">
                  <span className="text-slate-900">Total Travel Time:</span>
                  <span className="text-teal-700">{Math.floor(totalJourneyMinutes / 60)}h {totalJourneyMinutes % 60}m</span>
                </div>
              </div>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
