import React, { useState, useCallback } from 'react';
import type { AudienceRole, ActiveDomain } from './types';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { PhilosophyFlywheel } from './components/PhilosophyFlywheel';
import { VehicleSpecs } from './components/VehicleSpecs';
import { VehicleBlueprint } from './components/VehicleBlueprint';
import { RiderTcoCalculator } from './components/RiderTcoCalculator';
import { AerodynamicsCalculator } from './components/AerodynamicsCalculator';
import { ScooterPowertrain } from './components/ScooterPowertrain';
import { CorridorSimulator } from './components/CorridorSimulator';
import { NetworkChargingTiers } from './components/NetworkChargingTiers';
import { FinancialModel } from './components/FinancialModel';
import { PartnerProgram } from './components/PartnerProgram';
import { RoadmapChecklist } from './components/RoadmapChecklist';
import { PitchDeckModal } from './components/PitchDeckModal';
import { InvestorMemoModal } from './components/InvestorMemoModal';
import { ContactModal } from './components/ContactModal';
import { Footer } from './components/Footer';
import { ArrowRight, Sparkles } from 'lucide-react';

export const App: React.FC = () => {
  const [currentRole, setCurrentRole] = useState<AudienceRole>('investor');
  const [activeDomain, setActiveDomain] = useState<ActiveDomain>('all');
  const [isPitchDeckOpen, setIsPitchDeckOpen] = useState<boolean>(false);
  const [isInvestorMemoOpen, setIsInvestorMemoOpen] = useState<boolean>(false);
  const [isContactOpen, setIsContactOpen] = useState<boolean>(false);

  // Bulletproof navigation that switches domain AND scrolls reliably
  const navigateToSection = useCallback((targetId: string, domain?: ActiveDomain) => {
    if (domain) {
      setActiveDomain(domain);
    }

    const performScroll = () => {
      const cleanId = targetId.replace('#', '');
      const el = document.getElementById(cleanId);
      if (el) {
        const yOffset = -80; // Offset for sticky navbar
        const y = el.getBoundingClientRect().top + window.pageYOffset + yOffset;
        window.scrollTo({ top: y, behavior: 'smooth' });
        return true;
      }
      return false;
    };

    if (!performScroll()) {
      // Retry in animation frames & ticks until React mounts the new branch
      requestAnimationFrame(() => {
        if (!performScroll()) {
          setTimeout(performScroll, 50);
          setTimeout(performScroll, 150);
          setTimeout(performScroll, 300);
        }
      });
    }
  }, []);

  return (
    <div className="min-h-screen bg-mesh-vibrant text-slate-800 flex flex-col font-sans selection:bg-teal-500 selection:text-white">
      
      {/* Sticky Top Navigation with Domain Switcher */}
      <Navbar
        currentRole={currentRole}
        setRole={setCurrentRole}
        activeDomain={activeDomain}
        setActiveDomain={setActiveDomain}
        onNavigate={navigateToSection}
        onOpenPitchDeck={() => setIsPitchDeckOpen(true)}
        onOpenInvestorMemo={() => setIsInvestorMemoOpen(true)}
        onOpenContact={() => setIsContactOpen(true)}
      />

      {/* Main Content Sections */}
      <main className="flex-1">
        
        {/* Hero Section with KPI Cards & Domain Pillar Selector */}
        <Hero
          currentRole={currentRole}
          activeDomain={activeDomain}
          onNavigate={navigateToSection}
          onOpenPitchDeck={() => setIsPitchDeckOpen(true)}
          onOpenInvestorMemo={() => setIsInvestorMemoOpen(true)}
          onOpenContact={() => setIsContactOpen(true)}
        />

        {/* ========================================================
            PERSISTENT DOMAIN TABS (Always visible, instant feedback)
        ======================================================== */}
        <div id="domain-tabs" className="sticky top-16 sm:top-18 z-40 bg-white/95 backdrop-blur-md border-y border-slate-200 py-3 shadow-xs scroll-mt-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-wrap items-center justify-between gap-3">
            
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono font-bold uppercase text-slate-500 hidden sm:inline">
                Active Pillar:
              </span>
              <div className="flex items-center p-1 rounded-2xl bg-slate-100 border border-slate-200 text-xs sm:text-sm font-bold font-mono">
                <button
                  type="button"
                  onClick={() => navigateToSection('scooter-section', 'scooter')}
                  className={`px-4 py-2 rounded-xl transition-all flex items-center gap-2 cursor-pointer ${
                    activeDomain === 'scooter'
                      ? 'bg-teal-600 text-white shadow-md'
                      : 'text-slate-700 hover:text-slate-900 hover:bg-white'
                  }`}
                >
                  <span className="text-base">🛵</span>
                  <span>PULSE 150 Scooter</span>
                  {activeDomain === 'scooter' && <span className="w-2 h-2 rounded-full bg-white animate-pulse" />}
                </button>

                <button
                  type="button"
                  onClick={() => navigateToSection('network-section', 'network')}
                  className={`px-4 py-2 rounded-xl transition-all flex items-center gap-2 cursor-pointer ${
                    activeDomain === 'network'
                      ? 'bg-emerald-600 text-white shadow-md'
                      : 'text-slate-700 hover:text-slate-900 hover:bg-white'
                  }`}
                >
                  <span className="text-base">⚡</span>
                  <span>Charging Network</span>
                  {activeDomain === 'network' && <span className="w-2 h-2 rounded-full bg-white animate-pulse" />}
                </button>

                <button
                  type="button"
                  onClick={() => navigateToSection('domain-tabs', 'all')}
                  className={`px-3.5 py-2 rounded-xl transition-all flex items-center gap-1.5 cursor-pointer ${
                    activeDomain === 'all'
                      ? 'bg-slate-900 text-white shadow-md'
                      : 'text-slate-700 hover:text-slate-900 hover:bg-white'
                  }`}
                >
                  <span>🌐</span>
                  <span>Full Ecosystem</span>
                  {activeDomain === 'all' && <span className="w-2 h-2 rounded-full bg-white animate-pulse" />}
                </button>
              </div>
            </div>

            {/* Quick helper indicator */}
            <div className="text-xs text-slate-500 font-mono hidden md:flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-teal-600" />
              <span>
                {activeDomain === 'scooter' && 'Active view: Vehicle Specs, Drag Physics, 144V Powertrain, LFP Battery'}
                {activeDomain === 'network' && 'Active view: 245km Corridor Map, 4-Tier Speeds, Station ROI, Host Models'}
                {activeDomain === 'all' && 'Active view: Complete Integrated Ecosystem (Scooter + Highway Network)'}
              </span>
            </div>

          </div>
        </div>

        {/* ========================================================
            MODE A: SCOOTER ONLY VIEW
        ======================================================== */}
        {activeDomain === 'scooter' && (
          <div className="animate-fadeIn">
            {/* Scooter Domain Header */}
            <div id="scooter-section" className="pt-8 pb-4 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 scroll-mt-24">
              <div className="p-6 sm:p-8 rounded-3xl bg-teal-500/10 border-2 border-teal-500/30 flex flex-wrap items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-2xl bg-teal-600 text-white flex items-center justify-center text-2xl shadow-sm shrink-0">
                    🛵
                  </div>
                  <div>
                    <span className="text-[10px] font-mono uppercase tracking-widest text-teal-800 font-extrabold bg-teal-100/90 px-2.5 py-0.5 rounded">
                      Pillar 1: Vehicle Engineering
                    </span>
                    <h2 className="text-2xl sm:text-3xl font-display font-black text-slate-900 mt-0.5">
                      PULSE 150 Scooter Specifications & Powertrain
                    </h2>
                    <p className="text-xs sm:text-sm text-slate-600">
                      Frontal drag physics (P_aero ∝ v³), 144V powertrain math, benchmark specs & tropical LFP cells.
                    </p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => navigateToSection('network-section', 'network')}
                  className="px-4 py-2 rounded-xl text-xs font-mono font-bold bg-white hover:bg-slate-50 text-slate-800 border border-slate-200 shadow-xs flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                  <span>Switch to Highway Charging Network</span>
                  <span>⚡ →</span>
                </button>
              </div>
            </div>

            {/* 1. Vehicle Specifications Benchmark */}
            <VehicleSpecs />

            {/* 2. Interactive Vehicle Cutaway CAD Blueprint */}
            <VehicleBlueprint />

            {/* 3. Rider Fuel & Maintenance Savings Calculator */}
            <RiderTcoCalculator />

            {/* 4. First-Principles Aerodynamics & Drag Physics Calculator */}
            <AerodynamicsCalculator />

            {/* 5. 144V High-Voltage Powertrain, LFP Chemistry & Empirical Testing */}
            <ScooterPowertrain />

            {/* Cross-Link Banner to Network */}
            <div className="my-16 max-w-4xl mx-auto px-4 text-center">
              <div className="p-8 rounded-3xl bg-gradient-to-r from-emerald-50 via-teal-50 to-white border border-emerald-200 shadow-sm">
                <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-800 flex items-center justify-center text-2xl mx-auto mb-3 shadow-xs">
                  ⚡
                </div>
                <h3 className="text-xl sm:text-2xl font-display font-bold text-slate-900">
                  Ready to see where this scooter charges?
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 max-w-xl mx-auto mt-2 mb-6 leading-relaxed">
                  The Pulse 150 is designed to stop at highway diners and petrol pumps along the 245 km Dhaka-Chattogram corridor while riders eat lunch.
                </p>
                <div className="flex flex-wrap items-center justify-center gap-3">
                  <button
                    type="button"
                    onClick={() => navigateToSection('network-section', 'network')}
                    className="px-6 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs uppercase tracking-wider shadow-md transition-all flex items-center gap-2 cursor-pointer"
                  >
                    <span>View Highway Charging Network & Simulator</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                  <button
                    type="button"
                    onClick={() => navigateToSection('domain-tabs', 'all')}
                    className="px-5 py-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs uppercase tracking-wider border border-slate-300 transition-all cursor-pointer"
                  >
                    Show Both Pillars
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ========================================================
            MODE B: CHARGING NETWORK ONLY VIEW
        ======================================================== */}
        {activeDomain === 'network' && (
          <div className="animate-fadeIn">
            {/* Network Domain Header */}
            <div id="network-section" className="pt-8 pb-4 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 scroll-mt-24">
              <div className="p-6 sm:p-8 rounded-3xl bg-emerald-500/10 border-2 border-emerald-500/30 flex flex-wrap items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-2xl bg-emerald-600 text-white flex items-center justify-center text-2xl shadow-sm shrink-0">
                    ⚡
                  </div>
                  <div>
                    <span className="text-[10px] font-mono uppercase tracking-widest text-emerald-800 font-extrabold bg-emerald-100/90 px-2.5 py-0.5 rounded">
                      Pillar 2: Infrastructure & Business
                    </span>
                    <h2 className="text-2xl sm:text-3xl font-display font-black text-slate-900 mt-0.5">
                      Highway Charging Network & Financial Model
                    </h2>
                    <p className="text-xs sm:text-sm text-slate-600">
                      Dhaka-Ctg interactive simulator, 4-tier charging speeds, station P&L waterfall & host partner revenue models.
                    </p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => navigateToSection('scooter-section', 'scooter')}
                  className="px-4 py-2 rounded-xl text-xs font-mono font-bold bg-white hover:bg-slate-50 text-slate-800 border border-slate-200 shadow-xs flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                  <span>Switch to Scooter View</span>
                  <span>🛵 →</span>
                </button>
              </div>
            </div>

            {/* 1. Interactive Dhaka ↔ Chattogram Highway Corridor Simulator */}
            <CorridorSimulator />

            {/* 2. 4-Tier Charging Evolution (AC vs DC speeds, grid load, capex) */}
            <NetworkChargingTiers />

            {/* 3. Station Unit Economics & Investor Financial Waterfall Model */}
            <FinancialModel />

            {/* 4. Site Host Partnership Models for Hotels & Petrol Pumps */}
            <PartnerProgram onOpenContact={() => setIsContactOpen(true)} />

            {/* 5. Phased Rollout Roadmap */}
            <RoadmapChecklist />

            {/* Cross-Link Banner to Scooter */}
            <div className="my-16 max-w-4xl mx-auto px-4 text-center">
              <div className="p-8 rounded-3xl bg-gradient-to-r from-teal-50 via-emerald-50 to-white border border-teal-200 shadow-sm">
                <div className="w-12 h-12 rounded-2xl bg-teal-100 text-teal-800 flex items-center justify-center text-2xl mx-auto mb-3 shadow-xs">
                  🛵
                </div>
                <h3 className="text-xl sm:text-2xl font-display font-bold text-slate-900">
                  Want to inspect the vehicle engineered for this corridor?
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 max-w-xl mx-auto mt-2 mb-6 leading-relaxed">
                  Inspect the 5.4 kWh LFP pack, 144V low-heat wiring, benchmark weight comparison, and first-principles aerodynamics drag equations.
                </p>
                <div className="flex flex-wrap items-center justify-center gap-3">
                  <button
                    type="button"
                    onClick={() => navigateToSection('scooter-section', 'scooter')}
                    className="px-6 py-3 rounded-xl bg-teal-600 hover:bg-teal-700 text-white font-bold text-xs uppercase tracking-wider shadow-md transition-all flex items-center gap-2 cursor-pointer"
                  >
                    <span>View Scooter Specifications & Aerodynamics</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                  <button
                    type="button"
                    onClick={() => navigateToSection('domain-tabs', 'all')}
                    className="px-5 py-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs uppercase tracking-wider border border-slate-300 transition-all cursor-pointer"
                  >
                    Show Both Pillars
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ========================================================
            MODE C: ALL / UNIFIED ECOSYSTEM VIEW (CLEARLY SEPARATED)
        ======================================================== */}
        {activeDomain === 'all' && (
          <div className="animate-fadeIn">
            
            {/* The Bridge: Business Flywheel */}
            <PhilosophyFlywheel />

            {/* ----------------------------------------------------
                PART 1: THE VEHICLE (SCOOTER)
            ---------------------------------------------------- */}
            <div id="scooter-section" className="pt-10 pb-4 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 scroll-mt-24">
              <div className="flex items-center gap-3 p-4 sm:p-5 rounded-2xl bg-teal-50 border border-teal-200">
                <div className="w-10 h-10 rounded-xl bg-teal-600 text-white flex items-center justify-center text-xl shrink-0 shadow-xs">
                  🛵
                </div>
                <div>
                  <span className="text-[10px] font-mono uppercase tracking-widest text-teal-800 font-extrabold bg-teal-100 px-2 py-0.5 rounded">
                    Part 1 of 2: The Vehicle
                  </span>
                  <h2 className="text-xl sm:text-2xl font-display font-black text-slate-900 mt-0.5">
                    PULSE 150 Scooter Architecture & Drag Physics
                  </h2>
                </div>
              </div>
            </div>

            {/* Vehicle Specs Benchmark */}
            <VehicleSpecs />

            {/* Interactive Cutaway CAD Blueprint */}
            <VehicleBlueprint />

            {/* Rider Fuel & Maintenance Savings Calculator */}
            <RiderTcoCalculator />

            {/* Aerodynamics Drag Engine */}
            <AerodynamicsCalculator />

            {/* 144V Voltage Math & LFP Chemistry */}
            <ScooterPowertrain />

            {/* ----------------------------------------------------
                PART 2: THE CHARGING NETWORK
            ---------------------------------------------------- */}
            <div id="network-section" className="pt-16 pb-4 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 scroll-mt-24">
              <div className="flex items-center gap-3 p-4 sm:p-5 rounded-2xl bg-emerald-50 border border-emerald-200">
                <div className="w-10 h-10 rounded-xl bg-emerald-600 text-white flex items-center justify-center text-xl shrink-0 shadow-xs">
                  ⚡
                </div>
                <div>
                  <span className="text-[10px] font-mono uppercase tracking-widest text-emerald-800 font-extrabold bg-emerald-100 px-2 py-0.5 rounded">
                    Part 2 of 2: The Infrastructure
                  </span>
                  <h2 className="text-xl sm:text-2xl font-display font-black text-slate-900 mt-0.5">
                    Highway Charging Network, Simulator & Station Economics
                  </h2>
                </div>
              </div>
            </div>

            {/* Highway Corridor Simulator */}
            <CorridorSimulator />

            {/* 4-Tier Charging Evolution */}
            <NetworkChargingTiers />

            {/* Financial Waterfall Model */}
            <FinancialModel />

            {/* Site Host Partnership Program */}
            <PartnerProgram onOpenContact={() => setIsContactOpen(true)} />

            {/* Phased Roadmap Checklist */}
            <RoadmapChecklist />

          </div>
        )}

      </main>

      {/* Footer */}
      <Footer
        onOpenPitchDeck={() => setIsPitchDeckOpen(true)}
        onOpenInvestorMemo={() => setIsInvestorMemoOpen(true)}
        onOpenContact={() => setIsContactOpen(true)}
      />

      {/* Fullscreen Boardroom Pitch Deck Modal */}
      <PitchDeckModal
        isOpen={isPitchDeckOpen}
        onClose={() => setIsPitchDeckOpen(false)}
        onOpenContact={() => setIsContactOpen(true)}
      />

      {/* Executive 1-Page Investor Memo Modal */}
      <InvestorMemoModal
        isOpen={isInvestorMemoOpen}
        onClose={() => setIsInvestorMemoOpen(false)}
        onOpenContact={() => setIsContactOpen(true)}
      />

      {/* Partnership & Investment Inquiry Modal */}
      <ContactModal
        isOpen={isContactOpen}
        onClose={() => setIsContactOpen(false)}
      />
    </div>
  );
};

export default App;
