import React from 'react';
import type { AudienceRole, ActiveDomain } from '../types';
import { 
  Zap, 
  Gauge, 
  BatteryCharging, 
  ArrowRight, 
  ShieldCheck, 
  Flame, 
  Scale, 
  TrendingUp, 
  Sparkles, 
  Navigation,
  CheckCircle2,
  XCircle,
  Presentation,
  Handshake,
  FileText
} from 'lucide-react';

interface HeroProps {
  currentRole: AudienceRole;
  activeDomain: ActiveDomain;
  onNavigate: (targetId: string, domain?: ActiveDomain) => void;
  onOpenPitchDeck: () => void;
  onOpenInvestorMemo?: () => void;
  onOpenContact: () => void;
}

export const Hero: React.FC<HeroProps> = ({ 
  currentRole, 
  activeDomain, 
  onNavigate, 
  onOpenPitchDeck,
  onOpenInvestorMemo,
  onOpenContact
}) => {
  return (
    <section className="relative overflow-hidden pt-8 pb-14 lg:pt-12 lg:pb-18">
      
      {/* Friendly, vibrant background glow */}
      <div className="absolute top-10 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-gradient-to-tr from-teal-200/40 via-cyan-200/40 to-sky-200/30 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Dynamic Lens Badge */}
        <div className="flex justify-center mb-4">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white border border-teal-200 text-xs font-mono text-slate-700 shadow-xs">
            <Sparkles className="w-3.5 h-3.5 text-teal-600 animate-pulse" />
            <span className="font-semibold text-slate-500">Active View:</span>
            <span className="font-bold text-teal-700 capitalize bg-teal-50 px-2 py-0.5 rounded border border-teal-200">
              {currentRole === 'investor' && 'Investor & Scalability Lens'}
              {currentRole === 'engineer' && 'Powertrain & Fast-Charge Engineering'}
              {currentRole === 'partner' && 'Highway Landowner & Host Economics'}
            </span>
          </div>
        </div>

        {/* Primary Headline */}
        <div className="text-center max-w-4xl mx-auto">
          <h1 className="font-display text-4xl sm:text-6xl lg:text-7xl font-black tracking-tight text-slate-900 leading-[1.12]">
            Long-Distance EV Mobility:
            <span className="block mt-2 bg-gradient-to-r from-teal-600 via-cyan-600 to-blue-700 bg-clip-text text-transparent">
              Hyper-Efficiency, Not Giant Batteries.
            </span>
          </h1>

          <p className="mt-4 text-lg sm:text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed font-normal">
            Why carry 150 kg of dead battery weight when an agile <strong className="text-slate-900 font-semibold">~150 km real-world scooter (5–6 kWh)</strong> paired with a <strong className="text-teal-700 font-semibold">strategic highway charging network</strong> eliminates range anxiety at 1/4th the capital cost?
          </p>

          {/* Role specific callout message */}
          <div className="mt-5 inline-block text-xs sm:text-sm px-5 py-3 rounded-2xl bg-white border border-slate-200 shadow-xs text-slate-700 max-w-2xl text-left sm:text-center">
            {currentRole === 'investor' && (
              <span className="flex items-center gap-2.5">
                <TrendingUp className="w-4 h-4 text-emerald-600 shrink-0" />
                <span><strong className="text-slate-900">The Business Flywheel:</strong> Scooter retail creates guaranteed anchor demand; open corridor stations monetize third-party EV cars, bikes, and 3-wheelers.</span>
              </span>
            )}
            {currentRole === 'engineer' && (
              <span className="flex items-center gap-2.5">
                <Gauge className="w-4 h-4 text-teal-600 shrink-0" />
                <span><strong className="text-slate-900">Engineering Baseline:</strong> 2.5 kWh @ 80 km yields <strong className="text-teal-700">~31 Wh/km</strong>. At 70–80 km/h highway speeds, aero drag dictates 36–42 Wh/km—making 5.4 kWh optimal.</span>
              </span>
            )}
            {currentRole === 'partner' && (
              <span className="flex items-center gap-2.5">
                <ShieldCheck className="w-4 h-4 text-amber-600 shrink-0" />
                <span><strong className="text-slate-900">Host Partner Opportunity:</strong> Highway hotels and petrol pumps turn 25-minute dwell times into restaurant F&B revenue + 12-15% charging rev share with zero host CAPEX.</span>
              </span>
            )}
          </div>

          {/* Immediate Action Buttons (All clickable, instant reaction) */}
          <div className="mt-7 flex flex-wrap items-center justify-center gap-3">
            <button
              type="button"
              onClick={() => onNavigate('scooter-section', 'scooter')}
              className="flex items-center gap-2 px-5 py-3 rounded-xl font-bold text-xs sm:text-sm text-white bg-teal-600 hover:bg-teal-700 shadow-md shadow-teal-600/25 transition-all hover:scale-105 active:scale-95 cursor-pointer"
            >
              <span>🛵</span>
              <span>Explore Scooter Specs</span>
            </button>

            <button
              type="button"
              onClick={() => onNavigate('network-section', 'network')}
              className="flex items-center gap-2 px-5 py-3 rounded-xl font-bold text-xs sm:text-sm text-white bg-emerald-600 hover:bg-emerald-700 shadow-md shadow-emerald-600/25 transition-all hover:scale-105 active:scale-95 cursor-pointer"
            >
              <span>⚡</span>
              <span>Simulate Highway Corridor</span>
            </button>

            <button
              type="button"
              onClick={onOpenPitchDeck}
              className="flex items-center gap-2 px-4 py-3 rounded-xl font-bold text-xs sm:text-sm text-slate-800 bg-white hover:bg-slate-50 border border-slate-200 transition-all shadow-2xs hover:border-teal-400 cursor-pointer"
            >
              <Presentation className="w-4 h-4 text-teal-600" />
              <span>Slide Deck</span>
            </button>

            {onOpenInvestorMemo && (
              <button
                type="button"
                onClick={onOpenInvestorMemo}
                className="flex items-center gap-2 px-4 py-3 rounded-xl font-bold text-xs sm:text-sm text-teal-900 bg-teal-50 hover:bg-teal-100 border border-teal-200 transition-all shadow-2xs cursor-pointer"
              >
                <FileText className="w-4 h-4 text-teal-700" />
                <span>1-Page Memo</span>
              </button>
            )}

            <button
              type="button"
              onClick={onOpenContact}
              className="flex items-center gap-2 px-4 py-3 rounded-xl font-bold text-xs sm:text-sm text-slate-700 bg-slate-100 hover:bg-slate-200 border border-slate-200 transition-all cursor-pointer"
            >
              <Handshake className="w-4 h-4 text-slate-600" />
              <span>Partner Inquiries</span>
            </button>
          </div>
        </div>

        {/* 🌟 TWO SEPARATE PILLARS: INTERACTIVE CARDS 🌟 */}
        <div className="mt-12 max-w-5xl mx-auto">
          <div className="text-center mb-4">
            <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-slate-500 bg-slate-100 px-3 py-1 rounded-full border border-slate-200">
              Two Separated Pillars of the Ecosystem
            </span>
          </div>

          <div className="grid md:grid-cols-2 gap-5">
            
            {/* Pillar 1: The Scooter Card */}
            <div 
              onClick={() => onNavigate('scooter-section', 'scooter')}
              className={`p-6 sm:p-7 rounded-3xl border cursor-pointer transition-all relative overflow-hidden flex flex-col justify-between ${
                activeDomain === 'scooter'
                  ? 'bg-teal-50/90 border-teal-500 ring-4 ring-teal-500/20 shadow-lg scale-[1.01]'
                  : 'bg-white border-slate-200 hover:border-teal-300 hover:shadow-md'
              }`}
            >
              <div className="absolute top-0 right-0 px-3.5 py-1 bg-teal-600 text-white text-[11px] font-bold uppercase tracking-wider rounded-bl-2xl font-mono">
                Pillar 1: Vehicle
              </div>

              <div>
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-12 h-12 rounded-2xl bg-teal-100 border border-teal-300 flex items-center justify-center text-teal-800 text-2xl shadow-xs">
                    🛵
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-slate-900">
                      The PULSE 150 Scooter
                    </h3>
                    <p className="text-xs text-teal-700 font-semibold font-mono">
                      Hardware & Powertrain Engineering
                    </p>
                  </div>
                </div>

                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-4">
                  Dedicated vehicle engineering: 5.4 kWh pack, 144V low-current architecture, drag physics math (P_aero ∝ v³), and tropical LFP cell chemistry.
                </p>

                <div className="grid grid-cols-2 gap-2 text-xs font-mono mb-5">
                  <div className="bg-white/80 p-2.5 rounded-xl border border-slate-200">
                    <span className="text-slate-400 block text-[10px]">Real Highway Range:</span>
                    <strong className="text-slate-900 text-sm font-bold">~150 km</strong>
                  </div>
                  <div className="bg-white/80 p-2.5 rounded-xl border border-slate-200">
                    <span className="text-slate-400 block text-[10px]">Curb Battery Weight:</span>
                    <strong className="text-teal-700 text-sm font-bold">~38 kg (5.4 kWh)</strong>
                  </div>
                  <div className="bg-white/80 p-2.5 rounded-xl border border-slate-200">
                    <span className="text-slate-400 block text-[10px]">Electrical Voltage:</span>
                    <strong className="text-slate-900 text-sm font-bold">144V Nominal</strong>
                  </div>
                  <div className="bg-white/80 p-2.5 rounded-xl border border-slate-200">
                    <span className="text-slate-400 block text-[10px]">Cruise Efficiency:</span>
                    <strong className="text-emerald-700 text-sm font-bold">~36 Wh/km</strong>
                  </div>
                </div>
              </div>

              <div className="pt-2">
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    onNavigate('scooter-section', 'scooter');
                  }}
                  className={`w-full py-3 rounded-xl font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all cursor-pointer ${
                    activeDomain === 'scooter'
                      ? 'bg-teal-600 text-white shadow-md'
                      : 'bg-teal-50 hover:bg-teal-100 text-teal-800 border border-teal-200'
                  }`}
                >
                  <span>{activeDomain === 'scooter' ? '✓ Currently Viewing Scooter' : 'Explore Scooter Specs & Physics'}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Pillar 2: The Charging Network Card */}
            <div 
              onClick={() => onNavigate('network-section', 'network')}
              className={`p-6 sm:p-7 rounded-3xl border cursor-pointer transition-all relative overflow-hidden flex flex-col justify-between ${
                activeDomain === 'network'
                  ? 'bg-emerald-50/90 border-emerald-500 ring-4 ring-emerald-500/20 shadow-lg scale-[1.01]'
                  : 'bg-white border-slate-200 hover:border-emerald-300 hover:shadow-md'
              }`}
            >
              <div className="absolute top-0 right-0 px-3.5 py-1 bg-emerald-600 text-white text-[11px] font-bold uppercase tracking-wider rounded-bl-2xl font-mono">
                Pillar 2: Infrastructure
              </div>

              <div>
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-12 h-12 rounded-2xl bg-emerald-100 border border-emerald-300 flex items-center justify-center text-emerald-800 text-2xl shadow-xs">
                    ⚡
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-slate-900">
                      The Highway Charging Network
                    </h3>
                    <p className="text-xs text-emerald-700 font-semibold font-mono">
                      Corridor Infrastructure & Financial Model
                    </p>
                  </div>
                </div>

                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-4">
                  Dedicated infrastructure & business: 245 km Dhaka-Ctg corridor simulator, 4-tier charging speeds, ৳1,835 unit spread, and zero-CAPEX host partner models.
                </p>

                <div className="grid grid-cols-2 gap-2 text-xs font-mono mb-5">
                  <div className="bg-white/80 p-2.5 rounded-xl border border-slate-200">
                    <span className="text-slate-400 block text-[10px]">Pilot Corridor:</span>
                    <strong className="text-slate-900 text-sm font-bold">245 km (Dhaka↔Ctg)</strong>
                  </div>
                  <div className="bg-white/80 p-2.5 rounded-xl border border-slate-200">
                    <span className="text-slate-400 block text-[10px]">Charging Dwell Stop:</span>
                    <strong className="text-emerald-700 text-sm font-bold">25 min (Cumilla Hub)</strong>
                  </div>
                  <div className="bg-white/80 p-2.5 rounded-xl border border-slate-200">
                    <span className="text-slate-400 block text-[10px]">Retail Energy Spread:</span>
                    <strong className="text-slate-900 text-sm font-bold">৳20 / kWh (Gross)</strong>
                  </div>
                  <div className="bg-white/80 p-2.5 rounded-xl border border-slate-200">
                    <span className="text-slate-400 block text-[10px]">Station Payback:</span>
                    <strong className="text-amber-800 text-sm font-bold">4 – 12 Months</strong>
                  </div>
                </div>
              </div>

              <div className="pt-2">
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    onNavigate('network-section', 'network');
                  }}
                  className={`w-full py-3 rounded-xl font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all cursor-pointer ${
                    activeDomain === 'network'
                      ? 'bg-emerald-600 text-white shadow-md'
                      : 'bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-200'
                  }`}
                >
                  <span>{activeDomain === 'network' ? '✓ Currently Viewing Network' : 'Explore Highway Corridor & ROI'}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>

          </div>

          {/* Quick Segmented Toggle for All */}
          <div className="mt-4 flex items-center justify-center gap-2">
            <span className="text-xs text-slate-500 font-mono">Or view both simultaneously:</span>
            <button
              type="button"
              onClick={() => onNavigate('domain-tabs', 'all')}
              className={`px-3 py-1 rounded-xl text-xs font-mono font-bold transition-all border cursor-pointer ${
                activeDomain === 'all'
                  ? 'bg-slate-900 text-white border-slate-900 shadow-xs'
                  : 'bg-white hover:bg-slate-100 text-slate-700 border-slate-300'
              }`}
            >
              <span>🌐 Show Full Integrated Ecosystem</span>
            </button>
          </div>
        </div>

        {/* Quick KPI Spec Bar */}
        <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-5xl mx-auto">
          
          <div 
            onClick={() => onNavigate('vehicle', 'scooter')}
            className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs hover:shadow-md transition-all border-t-4 border-t-teal-500 cursor-pointer group"
          >
            <div className="flex items-center justify-between text-slate-500 text-xs font-mono font-bold mb-1">
              <span>🛵 SCOOTER RANGE</span>
              <Gauge className="w-4 h-4 text-teal-600 group-hover:scale-110 transition-transform" />
            </div>
            <div className="text-3xl font-display font-black text-slate-900">~150 km</div>
            <p className="text-xs text-slate-500 mt-1 font-medium">Real highway condition @ 75 km/h</p>
          </div>

          <div 
            onClick={() => onNavigate('powertrain', 'scooter')}
            className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs hover:shadow-md transition-all border-t-4 border-t-teal-600 cursor-pointer group"
          >
            <div className="flex items-center justify-between text-slate-500 text-xs font-mono font-bold mb-1">
              <span>🛵 SCOOTER PACK</span>
              <BatteryCharging className="w-4 h-4 text-teal-600 group-hover:scale-110 transition-transform" />
            </div>
            <div className="text-3xl font-display font-black text-slate-900">5.4 kWh</div>
            <p className="text-xs text-slate-500 mt-1 font-medium">High-C LFP (No redundant deadweight)</p>
          </div>

          <div 
            onClick={() => onNavigate('charging-tiers', 'network')}
            className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs hover:shadow-md transition-all border-t-4 border-t-emerald-500 cursor-pointer group"
          >
            <div className="flex items-center justify-between text-slate-500 text-xs font-mono font-bold mb-1">
              <span>⚡ CHARGE WINDOW</span>
              <Zap className="w-4 h-4 text-emerald-600 group-hover:scale-110 transition-transform" />
            </div>
            <div className="text-3xl font-display font-black text-slate-900">25 min</div>
            <p className="text-xs text-slate-500 mt-1 font-medium">20%→80% (Cumilla Diner Stop)</p>
          </div>

          <div 
            onClick={() => onNavigate('corridor', 'network')}
            className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs hover:shadow-md transition-all border-t-4 border-t-emerald-600 cursor-pointer group"
          >
            <div className="flex items-center justify-between text-slate-500 text-xs font-mono font-bold mb-1">
              <span>⚡ PILOT CORRIDOR</span>
              <Navigation className="w-4 h-4 text-emerald-600 group-hover:scale-110 transition-transform" />
            </div>
            <div className="text-3xl font-display font-black text-slate-900">245 km</div>
            <p className="text-xs text-slate-500 mt-1 font-medium">Dhaka ↔ Chattogram (2–3 Hubs)</p>
          </div>

        </div>

        {/* Paradigm Comparison */}
        <div id="thesis" className="mt-16 scroll-mt-24">
          <div className="text-center mb-8">
            <span className="text-xs font-mono uppercase tracking-widest text-teal-600 font-bold bg-teal-50 px-3 py-1 rounded-full border border-teal-200">
              The Fundamental Philosophy
            </span>
            <h2 className="text-2xl sm:text-3xl font-display font-bold text-slate-900 mt-2">
              Why Heavy Batteries Fail — And Why Network Co-Design Wins
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
            
            {/* The Old Flawed Approach */}
            <div className="p-7 rounded-3xl bg-rose-50/70 border border-rose-200 relative overflow-hidden shadow-xs">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-2xl bg-rose-100 border border-rose-300 flex items-center justify-center text-rose-700">
                  <Flame className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-rose-900 text-lg">The Brute-Force Fallacy</h3>
                  <p className="text-xs text-rose-700 font-medium">Huge battery → huge range → rarely charge</p>
                </div>
              </div>

              <ul className="space-y-3 text-sm text-slate-700">
                <li className="flex items-start gap-2.5">
                  <XCircle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
                  <span><strong className="text-slate-900">Massive Weight Penalty:</strong> 20–25 kWh battery weighs 120–150 kg on a 2-wheeler, ruining handling, braking distance, and tire life.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <XCircle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
                  <span><strong className="text-slate-900">Prohibitive Cost:</strong> Battery accounts for &gt;60% of MSRP; price tag escalates past ৳6,00,000+ BDT, killing mass adoption.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <XCircle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
                  <span><strong className="text-slate-900">Hours to Charge:</strong> When an enormous battery finally runs dry, standard AC outlets take 6–8 agonizing hours to replenish.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <XCircle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
                  <span><strong className="text-slate-900">Dead Ballast:</strong> 85% of days, the rider only travels 30 km, dragging 150 kg of expensive dead battery capacity through city traffic.</span>
                </li>
              </ul>
            </div>

            {/* The Pulse 150 Approach */}
            <div className="p-7 rounded-3xl bg-teal-50/80 border border-teal-300/80 relative overflow-hidden shadow-xs">
              <div className="absolute top-0 right-0 px-3.5 py-1 bg-teal-600 text-white text-[11px] font-bold uppercase tracking-wider rounded-bl-2xl font-mono">
                Optimal Efficiency
              </div>

              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-2xl bg-teal-100 border border-teal-300 flex items-center justify-center text-teal-800">
                  <Scale className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-teal-950 text-lg">The Pulse 150 Ecosystem</h3>
                  <p className="text-xs text-teal-700 font-medium">Moderate battery + high efficiency + highway sync</p>
                </div>
              </div>

              <ul className="space-y-3 text-sm text-slate-700">
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-teal-600 shrink-0 mt-0.5" />
                  <span><strong className="text-slate-900">Agile Lightweight Chassis:</strong> 5.4 kWh pack weighs just ~38 kg (LFP), preserving sharp scooter dynamics and low rolling resistance.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-teal-600 shrink-0 mt-0.5" />
                  <span><strong className="text-slate-900">Accessible Pricing:</strong> Fraction of the pack cost means a competitive retail price with sustainable ~30% gross hardware margins.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-teal-600 shrink-0 mt-0.5" />
                  <span><strong className="text-slate-900">Natural Lifestyle Sync:</strong> 25-minute 20%→80% recharge time overlaps with a highway lunch or tea break (zero net wait time).</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-teal-600 shrink-0 mt-0.5" />
                  <span><strong className="text-slate-900">Open Network Flywheel:</strong> The highway chargers welcome compatible 3rd party EVs, creating high-margin recurring energy revenue.</span>
                </li>
              </ul>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
};
