import React, { useState, useEffect } from 'react';
import type { AudienceRole, ActiveDomain } from '../types';
import { 
  Zap, 
  Presentation, 
  Briefcase, 
  Cpu, 
  Building2, 
  ChevronRight, 
  Menu, 
  X, 
  ChevronDown,
  Type,
  Check,
  FileText
} from 'lucide-react';

interface NavbarProps {
  currentRole: AudienceRole;
  setRole: (role: AudienceRole) => void;
  activeDomain: ActiveDomain;
  setActiveDomain: (domain: ActiveDomain) => void;
  onNavigate: (targetId: string, domain?: ActiveDomain) => void;
  onOpenPitchDeck: () => void;
  onOpenInvestorMemo?: () => void;
  onOpenContact: () => void;
}

const FONT_OPTIONS = [
  { 
    id: 'manrope', 
    name: 'Manrope & Space Grotesk', 
    tag: 'Automotive Precision (Default)', 
    desc: 'Crisp geometric-grotesque curves, modern EV feel' 
  },
  { 
    id: 'inter', 
    name: 'Inter Display & Text', 
    tag: 'Silicon Valley Clean Tech', 
    desc: 'High-contrast neo-grotesque, ultra-crisp at any size' 
  },
  { 
    id: 'figtree', 
    name: 'Figtree', 
    tag: 'Friendly Geometric', 
    desc: 'Warm, round and open letterforms, zero eye fatigue' 
  },
  { 
    id: 'lexend', 
    name: 'Lexend Reading', 
    tag: 'Maximum Eye Comfort', 
    desc: 'Scientifically spaced for effortless reading' 
  },
];

export const Navbar: React.FC<NavbarProps> = ({
  currentRole,
  setRole,
  activeDomain,
  onNavigate,
  onOpenPitchDeck,
  onOpenInvestorMemo,
  onOpenContact,
}) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);
  const [isRoleDropdownOpen, setIsRoleDropdownOpen] = useState<boolean>(false);
  const [isFontDropdownOpen, setIsFontDropdownOpen] = useState<boolean>(false);
  const [currentFont, setCurrentFont] = useState<string>('manrope');
  const [scrolled, setScrolled] = useState<boolean>(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    try {
      const saved = localStorage.getItem('pulse150-font') || 'manrope';
      document.documentElement.setAttribute('data-font', saved);
      setCurrentFont(saved);
    } catch {
      // fallback
    }
  }, []);

  const handleSelectFont = (fontId: string) => {
    document.documentElement.setAttribute('data-font', fontId);
    try {
      localStorage.setItem('pulse150-font', fontId);
    } catch {
      // ignore
    }
    setCurrentFont(fontId);
    setIsFontDropdownOpen(false);
  };

  // Dynamic nav items based on domain
  const navLinks = activeDomain === 'scooter'
    ? [
        { name: 'Specs', target: 'vehicle', domain: 'scooter' as ActiveDomain },
        { name: 'CAD Blueprint', target: 'vehicle-blueprint', domain: 'scooter' as ActiveDomain },
        { name: 'Rider Savings', target: 'rider-tco', domain: 'scooter' as ActiveDomain },
        { name: 'Drag Physics', target: 'aerodynamics', domain: 'scooter' as ActiveDomain },
        { name: '144V Powertrain', target: 'powertrain', domain: 'scooter' as ActiveDomain },
      ]
    : activeDomain === 'network'
    ? [
        { name: 'Corridor Sim', target: 'corridor', domain: 'network' as ActiveDomain },
        { name: '4-Tier Chargers', target: 'charging-tiers', domain: 'network' as ActiveDomain },
        { name: 'Station ROI', target: 'economics', domain: 'network' as ActiveDomain },
        { name: 'Host Models', target: 'partners', domain: 'network' as ActiveDomain },
        { name: 'Roadmap', target: 'roadmap', domain: 'network' as ActiveDomain },
      ]
    : [
        { name: 'Thesis', target: 'thesis', domain: 'all' as ActiveDomain },
        { name: 'Specs', target: 'vehicle', domain: 'all' as ActiveDomain },
        { name: 'CAD Blueprint', target: 'vehicle-blueprint', domain: 'all' as ActiveDomain },
        { name: 'Rider Savings', target: 'rider-tco', domain: 'all' as ActiveDomain },
        { name: 'Corridor Sim', target: 'corridor', domain: 'all' as ActiveDomain },
        { name: 'Charging Tiers', target: 'charging-tiers', domain: 'all' as ActiveDomain },
        { name: 'Station ROI', target: 'economics', domain: 'all' as ActiveDomain },
      ];

  const roleLabels: Record<AudienceRole, { label: string; icon: React.ElementType; color: string; badgeBg: string; desc: string }> = {
    investor: {
      label: 'Investor Lens',
      icon: Briefcase,
      color: 'text-emerald-700',
      badgeBg: 'bg-emerald-50 text-emerald-700 border-emerald-200',
      desc: 'Focus on ৳1,835/100kWh spread, station payback & flywheel'
    },
    engineer: {
      label: 'Engineering Lens',
      icon: Cpu,
      color: 'text-teal-700',
      badgeBg: 'bg-teal-50 text-teal-700 border-teal-200',
      desc: 'Focus on 144V architecture, aerodynamic drag math & LFP cells'
    },
    partner: {
      label: 'Host Partner Lens',
      icon: Building2,
      color: 'text-amber-700',
      badgeBg: 'bg-amber-50 text-amber-800 border-amber-200',
      desc: 'Focus on zero-cost host setup, 12-15% rev share & F&B boost'
    }
  };

  const CurrentRoleIcon = roleLabels[currentRole].icon;

  const handleLinkClick = (target: string, domain?: ActiveDomain) => {
    setIsMobileMenuOpen(false);
    setIsRoleDropdownOpen(false);
    setIsFontDropdownOpen(false);
    onNavigate(target, domain);
  };

  return (
    <header 
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled 
          ? 'bg-white/95 backdrop-blur-xl border-b border-slate-200/90 shadow-sm' 
          : 'bg-white/80 backdrop-blur-md border-b border-slate-200/60'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-18">
          
          {/* Brand Logo */}
          <button 
            type="button"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="flex items-center gap-2.5 group cursor-pointer shrink-0 text-left"
          >
            <div className="relative flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-br from-teal-500 via-cyan-500 to-blue-600 shadow-md shadow-teal-500/25 group-hover:scale-105 transition-transform">
              <Zap className="w-5 h-5 text-white fill-white" />
              <div className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-amber-400 rounded-full animate-ping" />
              <div className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-amber-400 rounded-full border-2 border-white" />
            </div>
            
            <div className="flex flex-col">
              <div className="flex items-center gap-1.5">
                <span className="font-display font-black text-xl tracking-wider text-slate-900">
                  PULSE<span className="text-teal-600">150</span>
                </span>
                <span className="hidden sm:inline-block px-1.5 py-0.5 rounded text-[10px] font-mono font-bold tracking-wider uppercase bg-teal-50 text-teal-700 border border-teal-200">
                  Dhaka↔Ctg
                </span>
              </div>
              <span className="text-[11px] text-slate-500 font-medium hidden 2xl:block -mt-0.5">
                Hyper-Efficient Intercity EV Corridor
              </span>
            </div>
          </button>

          {/* Primary Domain Switcher (Scooter vs Charging Network vs All) */}
          <div className="hidden lg:flex items-center p-1 rounded-2xl bg-slate-100 border border-slate-200/90 text-xs font-bold font-mono shadow-xs">
            <button
              type="button"
              onClick={() => handleLinkClick('scooter-section', 'scooter')}
              className={`px-3 py-1.5 rounded-xl transition-all flex items-center gap-1.5 cursor-pointer ${
                activeDomain === 'scooter'
                  ? 'bg-teal-600 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
              }`}
            >
              <span>🛵</span>
              <span>Scooter</span>
            </button>
            <button
              type="button"
              onClick={() => handleLinkClick('network-section', 'network')}
              className={`px-3 py-1.5 rounded-xl transition-all flex items-center gap-1.5 cursor-pointer ${
                activeDomain === 'network'
                  ? 'bg-emerald-600 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
              }`}
            >
              <span>⚡</span>
              <span>Charging Network</span>
            </button>
            <button
              type="button"
              onClick={() => handleLinkClick('domain-tabs', 'all')}
              className={`px-2.5 py-1.5 rounded-xl transition-all flex items-center gap-1 cursor-pointer ${
                activeDomain === 'all'
                  ? 'bg-slate-800 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
              }`}
            >
              <span>🌐</span>
              <span>All</span>
            </button>
          </div>

          {/* Dynamic Navigation Items */}
          <nav className="hidden xl:flex items-center gap-1 text-xs font-semibold text-slate-600">
            {navLinks.map((link) => (
              <button
                key={link.name}
                type="button"
                onClick={() => handleLinkClick(link.target, link.domain)}
                className="px-3 py-1.5 rounded-lg hover:text-teal-700 hover:bg-slate-100 transition-all cursor-pointer font-semibold"
              >
                {link.name}
              </button>
            ))}
          </nav>

          {/* Right Action Elements */}
          <div className="flex items-center gap-2 sm:gap-2.5">
            
            {/* Interactive Font Selector Dropdown */}
            <div className="relative">
              <button
                type="button"
                onClick={() => {
                  setIsFontDropdownOpen(!isFontDropdownOpen);
                  setIsRoleDropdownOpen(false);
                }}
                className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl border text-xs font-mono font-bold transition-all cursor-pointer ${
                  isFontDropdownOpen 
                    ? 'bg-teal-50 border-teal-400 text-teal-800 shadow-xs' 
                    : 'bg-slate-100 hover:bg-slate-200/80 border-slate-200 text-slate-700'
                }`}
                title="Change Typography Font"
              >
                <Type className="w-3.5 h-3.5 text-teal-600" />
                <span className="hidden sm:inline capitalize">{currentFont}</span>
              </button>

              {/* Font Dropdown Panel */}
              {isFontDropdownOpen && (
                <>
                  <div 
                    className="fixed inset-0 z-40" 
                    onClick={() => setIsFontDropdownOpen(false)} 
                  />
                  <div className="absolute right-0 mt-2 w-72 sm:w-80 p-2.5 rounded-2xl bg-white border border-slate-200 shadow-2xl z-50 space-y-1.5 animate-fadeIn">
                    <div className="px-3 py-1.5 text-[11px] font-mono text-slate-500 uppercase tracking-wider border-b border-slate-100 font-bold flex items-center justify-between">
                      <span>Typography Theme</span>
                      <span className="text-[10px] text-teal-600 lowercase">live swap</span>
                    </div>

                    {FONT_OPTIONS.map((f) => {
                      const isSelected = currentFont === f.id;
                      return (
                        <button
                          key={f.id}
                          type="button"
                          onClick={() => handleSelectFont(f.id)}
                          className={`w-full text-left p-2.5 rounded-xl transition-all cursor-pointer border ${
                            isSelected 
                              ? 'bg-teal-50 border-teal-300 text-slate-900 shadow-2xs' 
                              : 'bg-slate-50/60 hover:bg-slate-100 border-slate-200/60 text-slate-700'
                          }`}
                        >
                          <div className="flex items-center justify-between">
                            <span className="font-bold text-xs text-slate-900">{f.name}</span>
                            {isSelected && <Check className="w-3.5 h-3.5 text-teal-700" />}
                          </div>
                          <span className="text-[10px] font-mono text-teal-700 font-semibold block mt-0.5">
                            {f.tag}
                          </span>
                          <span className="text-[11px] text-slate-500 block mt-0.5 leading-snug">
                            {f.desc}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </>
              )}
            </div>

            {/* Perspective Lens Dropdown */}
            <div className="relative hidden md:block">
              <button
                type="button"
                onClick={() => {
                  setIsRoleDropdownOpen(!isRoleDropdownOpen);
                  setIsFontDropdownOpen(false);
                }}
                className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200/80 border border-slate-200 text-xs font-semibold text-slate-800 transition-all cursor-pointer"
                title="Switch Perspective Lens"
              >
                <CurrentRoleIcon className={`w-3.5 h-3.5 ${roleLabels[currentRole].color}`} />
                <span className="font-bold">{roleLabels[currentRole].label.split(' ')[0]}</span>
                <ChevronDown className={`w-3.5 h-3.5 text-slate-500 transition-transform ${isRoleDropdownOpen ? 'rotate-180' : ''}`} />
              </button>

              {/* Dropdown Menu */}
              {isRoleDropdownOpen && (
                <>
                  <div 
                    className="fixed inset-0 z-40" 
                    onClick={() => setIsRoleDropdownOpen(false)} 
                  />
                  <div className="absolute right-0 mt-2 w-72 p-2 rounded-2xl bg-white border border-slate-200 shadow-xl z-50 space-y-1">
                    <div className="px-3 py-2 text-[10px] font-mono text-slate-500 uppercase tracking-wider border-b border-slate-100">
                      Select Presentation Lens
                    </div>
                    
                    {(Object.keys(roleLabels) as AudienceRole[]).map((role) => {
                      const item = roleLabels[role];
                      const Icon = item.icon;
                      const isSelected = currentRole === role;
                      return (
                        <button
                          key={role}
                          type="button"
                          onClick={() => {
                            setRole(role);
                            setIsRoleDropdownOpen(false);
                          }}
                          className={`w-full text-left p-2.5 rounded-xl flex items-start gap-2.5 transition-all cursor-pointer ${
                            isSelected 
                              ? 'bg-teal-50/80 border border-teal-200 text-slate-900' 
                              : 'hover:bg-slate-50 text-slate-700'
                          }`}
                        >
                          <div className={`p-1.5 rounded-lg bg-white shadow-xs mt-0.5 ${item.color}`}>
                            <Icon className="w-4 h-4" />
                          </div>
                          <div>
                            <div className="text-xs font-bold flex items-center gap-1.5">
                              <span>{item.label}</span>
                              {isSelected && <span className="text-[10px] text-teal-600 font-mono">✓</span>}
                            </div>
                            <div className="text-[11px] text-slate-500 mt-0.5 leading-snug">
                              {item.desc}
                            </div>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </>
              )}
            </div>

            {/* 1-Page Investor Memo Button */}
            {onOpenInvestorMemo && (
              <button
                type="button"
                onClick={onOpenInvestorMemo}
                className="hidden lg:flex items-center gap-1.5 px-3 py-1.5 sm:px-3.5 sm:py-2 text-xs font-bold rounded-xl bg-teal-50 hover:bg-teal-100 text-teal-900 border border-teal-200 transition-all shadow-xs cursor-pointer"
                title="View 1-Page Executive Memo"
              >
                <FileText className="w-3.5 h-3.5 text-teal-700" />
                <span>1-Page Memo</span>
              </button>
            )}

            {/* Pitch Deck Button */}
            <button
              type="button"
              onClick={onOpenPitchDeck}
              className="flex items-center gap-1.5 px-3 py-1.5 sm:px-3.5 sm:py-2 text-xs font-bold rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 border border-slate-200 transition-all shadow-xs cursor-pointer"
              title="Launch Slide Deck Mode"
            >
              <Presentation className="w-3.5 h-3.5 text-teal-600" />
              <span className="hidden sm:inline">Pitch Deck</span>
            </button>

            {/* Connect / Collaborate CTA */}
            <button
              type="button"
              onClick={onOpenContact}
              className="flex items-center gap-1 px-3.5 py-1.5 sm:px-4 sm:py-2 text-xs font-bold rounded-xl bg-gradient-to-r from-teal-500 via-cyan-500 to-blue-600 hover:from-teal-600 hover:to-blue-700 text-white shadow-md shadow-teal-500/20 hover:shadow-teal-500/35 hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer"
            >
              <span>Connect</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>

            {/* Mobile Hamburger Menu Toggle */}
            <button
              type="button"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="xl:hidden p-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 hover:text-slate-900 border border-slate-200 transition-colors cursor-pointer"
              aria-label="Toggle Navigation Menu"
            >
              {isMobileMenuOpen ? (
                <X className="w-5 h-5 text-teal-600" />
              ) : (
                <Menu className="w-5 h-5" />
              )}
            </button>

          </div>

        </div>
      </div>

      {/* Mobile Menu Overlay / Drawer */}
      {isMobileMenuOpen && (
        <div className="xl:hidden border-t border-slate-200 bg-white/95 backdrop-blur-2xl px-4 pt-3 pb-6 shadow-xl animate-fadeIn">
          
          {/* Mobile Domain Selector */}
          <div className="mb-3 p-3 rounded-2xl bg-slate-50 border border-slate-200">
            <span className="text-[10px] font-mono font-bold uppercase text-slate-500 block mb-2">
              Select Information Domain:
            </span>
            <div className="grid grid-cols-3 gap-1.5 text-xs font-mono">
              <button
                type="button"
                onClick={() => handleLinkClick('scooter-section', 'scooter')}
                className={`py-2 px-1 rounded-lg text-center font-bold transition-all flex flex-col items-center gap-1 cursor-pointer ${
                  activeDomain === 'scooter'
                    ? 'bg-teal-600 text-white shadow-sm'
                    : 'bg-white text-slate-700 border border-slate-200'
                }`}
              >
                <span className="text-base">🛵</span>
                <span className="text-[11px]">Scooter</span>
              </button>

              <button
                type="button"
                onClick={() => handleLinkClick('network-section', 'network')}
                className={`py-2 px-1 rounded-lg text-center font-bold transition-all flex flex-col items-center gap-1 cursor-pointer ${
                  activeDomain === 'network'
                    ? 'bg-emerald-600 text-white shadow-sm'
                    : 'bg-white text-slate-700 border border-slate-200'
                }`}
              >
                <span className="text-base">⚡</span>
                <span className="text-[11px]">Network</span>
              </button>

              <button
                type="button"
                onClick={() => handleLinkClick('domain-tabs', 'all')}
                className={`py-2 px-1 rounded-lg text-center font-bold transition-all flex flex-col items-center gap-1 cursor-pointer ${
                  activeDomain === 'all'
                    ? 'bg-slate-800 text-white shadow-sm'
                    : 'bg-white text-slate-700 border border-slate-200'
                }`}
              >
                <span className="text-base">🌐</span>
                <span className="text-[11px]">Both</span>
              </button>
            </div>
          </div>

          {/* Mobile Font Selector */}
          <div className="mb-3 p-3 rounded-2xl bg-slate-50 border border-slate-200">
            <span className="text-[10px] font-mono font-bold uppercase text-slate-500 block mb-2">
              Font Family:
            </span>
            <div className="grid grid-cols-2 gap-1.5 text-xs font-mono">
              {FONT_OPTIONS.map((f) => (
                <button
                  key={f.id}
                  type="button"
                  onClick={() => handleSelectFont(f.id)}
                  className={`py-1.5 px-2 rounded-lg text-left truncate transition-all cursor-pointer ${
                    currentFont === f.id
                      ? 'bg-teal-600 text-white font-bold'
                      : 'bg-white text-slate-700 border border-slate-200'
                  }`}
                >
                  {f.name.split(' ')[0]}
                </button>
              ))}
            </div>
          </div>

          {/* Mobile Lens Selector */}
          <div className="mb-4 p-3 rounded-2xl bg-slate-50 border border-slate-200">
            <span className="text-[10px] font-mono font-bold uppercase text-slate-500 block mb-2">
              Viewing Perspective:
            </span>
            <div className="grid grid-cols-3 gap-1.5 text-xs font-mono">
              {(['investor', 'engineer', 'partner'] as AudienceRole[]).map((r) => (
                <button
                  key={r}
                  type="button"
                  onClick={() => setRole(r)}
                  className={`py-1.5 px-2 rounded-lg text-center font-bold capitalize transition-all cursor-pointer ${
                    currentRole === r
                      ? 'bg-teal-600 text-white font-extrabold shadow-sm'
                      : 'bg-white text-slate-700 hover:text-slate-900 border border-slate-200'
                  }`}
                >
                  {r}
                </button>
              ))}
            </div>
          </div>

          {/* Mobile Pitch Deck & Memo Actions */}
          <div className="mb-3 grid grid-cols-2 gap-2">
            {onOpenInvestorMemo && (
              <button
                type="button"
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  onOpenInvestorMemo();
                }}
                className="py-2.5 px-3 rounded-xl bg-teal-50 border border-teal-200 text-teal-800 text-xs font-bold flex items-center justify-center gap-1.5 cursor-pointer shadow-xs"
              >
                <FileText className="w-3.5 h-3.5 text-teal-600" />
                <span>1-Page Memo</span>
              </button>
            )}
            <button
              type="button"
              onClick={() => {
                setIsMobileMenuOpen(false);
                onOpenPitchDeck();
              }}
              className="py-2.5 px-3 rounded-xl bg-slate-100 border border-slate-200 text-slate-800 text-xs font-bold flex items-center justify-center gap-1.5 cursor-pointer shadow-xs"
            >
              <Presentation className="w-3.5 h-3.5 text-teal-600" />
              <span>Slide Deck</span>
            </button>
          </div>

          {/* Navigation Items list */}
          <div className="grid grid-cols-2 gap-2 text-xs font-semibold">
            {navLinks.map((link) => (
              <button
                key={link.name}
                type="button"
                onClick={() => handleLinkClick(link.target, link.domain)}
                className="p-2.5 rounded-xl bg-slate-50 hover:bg-slate-100 text-slate-700 hover:text-teal-700 border border-slate-200/80 transition-colors flex items-center justify-between cursor-pointer text-left"
              >
                <span>{link.name}</span>
                <ChevronRight className="w-3 h-3 text-slate-400" />
              </button>
            ))}
          </div>

        </div>
      )}
    </header>
  );
};
