import React, { useState } from 'react';
import { X, Printer, Download, Check, Sparkles, Building2, ShieldCheck, TrendingUp, Zap, FileText } from 'lucide-react';

interface InvestorMemoModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenContact: () => void;
}

export const InvestorMemoModal: React.FC<InvestorMemoModalProps> = ({
  isOpen,
  onClose,
  onOpenContact,
}) => {
  const [copied, setCopied] = useState<boolean>(false);

  if (!isOpen) return null;

  const handlePrint = () => {
    window.print();
  };

  const handleCopyMemo = () => {
    const memoText = `PROJECT CHARGER & PULSE 150 — EXECUTIVE INVESTOR MEMO
Date: October 2026 | Target Raise: $1.5M USD (৳ 18 Crore BDT Seed Round)
Pillar 1: PULSE 150 Intercity Electric Scooter (144V LFP, 5.4 kWh, 150 km highway range)
Pillar 2: 245 km Dhaka-Chattogram Highway Charging Network (3 strategic hubs)
Unit Economics: ৳28L station capex, 16.4 mo payback, ৳35/kWh highway tariff.
Contact: founders@pulse-charger.bd`;

    navigator.clipboard.writeText(memoText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-950/70 backdrop-blur-md animate-fadeIn">
      
      {/* Outer Modal Container */}
      <div className="relative w-full max-w-4xl bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[92vh]">
        
        {/* Modal Top Control Bar (Hidden during print) */}
        <div className="print:hidden px-6 py-4 bg-slate-900 text-white flex items-center justify-between border-b border-slate-800">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-teal-500/20 text-teal-400 flex items-center justify-center text-base font-bold">
              📄
            </div>
            <div>
              <h3 className="font-bold text-sm tracking-wide">
                Executive Investor Memorandum
              </h3>
              <span className="text-[10px] font-mono text-slate-400">
                1-Page Summary • Confidential Seed Briefing
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleCopyMemo}
              className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs font-mono text-slate-200 transition-colors flex items-center gap-1.5 cursor-pointer"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <FileText className="w-3.5 h-3.5" />}
              <span>{copied ? 'Copied!' : 'Copy Summary'}</span>
            </button>

            <button
              type="button"
              onClick={handlePrint}
              className="px-3 py-1.5 rounded-lg bg-teal-600 hover:bg-teal-500 text-xs font-bold text-white transition-colors flex items-center gap-1.5 cursor-pointer shadow-xs"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print / Save as PDF</span>
            </button>

            <button
              type="button"
              onClick={onClose}
              className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors cursor-pointer ml-1"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Printable Document Body */}
        <div id="investor-memo-content" className="p-6 sm:p-10 overflow-y-auto space-y-6 text-slate-800 font-sans print:p-0 print:text-black">
          
          {/* Header Block */}
          <div className="border-b-2 border-slate-900 pb-5">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <span className="text-[10px] font-mono font-extrabold uppercase tracking-widest text-teal-800 bg-teal-100 px-2 py-0.5 rounded">
                  Investment Teaser // Series Seed
                </span>
                <h1 className="text-2xl sm:text-3xl font-display font-black text-slate-950 mt-1">
                  PROJECT CHARGER & PULSE 150
                </h1>
                <p className="text-xs sm:text-sm font-semibold text-slate-600">
                  Building Bangladesh's First Intercity Electric Two-Wheeler + Highway Fast-Charging Ecosystem
                </p>
              </div>

              <div className="text-right font-mono text-xs">
                <div className="font-black text-base text-slate-950">৳ 18 Crore BDT ($1.5M USD)</div>
                <div className="text-slate-500 text-[11px]">Seed Valuation / Equity Financing</div>
                <div className="text-teal-700 font-bold text-[10px]">Dhaka ↔ Chattogram Pilot Corridor</div>
              </div>
            </div>
          </div>

          {/* Section 1: The Core Thesis */}
          <div className="space-y-2">
            <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-900 flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-teal-600" />
              1. The Investment Thesis & Macro Window
            </h4>
            <p className="text-xs leading-relaxed text-slate-700">
              Bangladesh possesses over <strong>4.5 million registered two-wheelers</strong> consuming <strong>$1.8B+ USD in imported petrol</strong> annually. 
              The 245 km Dhaka-Chattogram corridor is the economic lifeline of the nation, carrying <strong>40,000+ vehicles daily</strong>. 
              Until today, electric two-wheelers have been confined to intra-city slow commutes due to fear of stranding. 
              Project CHARGER captures the high-yield intercity commute market by pioneering a <strong>vertically integrated dual-flywheel</strong>:
              a purpose-built 144V highway scooter plus 3 strategically partnered highway charging hubs at iconic diners.
            </p>
          </div>

          {/* Section 2: Dual Business Model */}
          <div className="grid sm:grid-cols-2 gap-4">
            
            <div className="p-4 rounded-2xl bg-teal-50/60 border border-teal-200">
              <span className="text-[10px] font-mono uppercase font-bold text-teal-900 block">
                Pillar 1: Vehicle Sales & Ecosystem Lock-in
              </span>
              <h5 className="font-bold text-slate-900 text-sm mt-0.5">PULSE 150 Scooter</h5>
              <ul className="mt-2 space-y-1 text-xs text-slate-700">
                <li>• <strong>5.4 kWh 144V LFP Battery:</strong> 150 km verified highway range</li>
                <li>• <strong>Dual-Port Ingress:</strong> 7.2 kW AC (diner stop) + 20 kW DC</li>
                <li>• <strong>Retail Target:</strong> ৳ 280,000 BDT ($2,350 USD)</li>
                <li>• <strong>Vehicle Gross Margin:</strong> 34% at 1,200 annual units</li>
              </ul>
            </div>

            <div className="p-4 rounded-2xl bg-emerald-50/60 border border-emerald-200">
              <span className="text-[10px] font-mono uppercase font-bold text-emerald-900 block">
                Pillar 2: Recurring Highway Charging Network
              </span>
              <h5 className="font-bold text-slate-900 text-sm mt-0.5">Open Corridor Energy Network</h5>
              <ul className="mt-2 space-y-1 text-xs text-slate-700">
                <li>• <strong>3 Hubs:</strong> Sonargaon (42 km), Cumilla (105 km), Mirsarai (195 km)</li>
                <li>• <strong>Open Architecture:</strong> Compatible with any EV 2W/3W</li>
                <li>• <strong>Retail Tariff:</strong> ৳ 35 / kWh (Grid COGS: ৳ 11.5 / kWh)</li>
                <li>• <strong>Host Model:</strong> 12% revenue-share to iconic highway hotels</li>
              </ul>
            </div>

          </div>

          {/* Section 3: Unit Economics Table */}
          <div className="space-y-2">
            <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-900 flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-600" />
              2. Hub Unit Economics & Financial Returns
            </h4>
            
            <div className="overflow-x-auto border border-slate-200 rounded-xl">
              <table className="w-full text-xs text-left">
                <thead className="bg-slate-100 font-mono text-[10px] uppercase text-slate-700 border-b border-slate-200">
                  <tr>
                    <th className="p-2.5">Station Configuration</th>
                    <th className="p-2.5">Capex / Station</th>
                    <th className="p-2.5">Daily Sessions (Yr 2)</th>
                    <th className="p-2.5">Annual EBITDA</th>
                    <th className="p-2.5">Payback Period</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 font-mono text-[11px]">
                  <tr>
                    <td className="p-2.5 font-bold text-slate-900">Cluster Hub (4x 7.2kW AC + 1x 20kW DC)</td>
                    <td className="p-2.5 text-teal-800 font-bold">৳ 28,00,000</td>
                    <td className="p-2.5">38 sessions / day</td>
                    <td className="p-2.5 text-emerald-800 font-bold">৳ 20,40,000</td>
                    <td className="p-2.5 font-bold text-emerald-700">16.4 Months</td>
                  </tr>
                  <tr>
                    <td className="p-2.5 font-bold text-slate-900">Express Petrol Pump Stalls (2x 20kW DC)</td>
                    <td className="p-2.5 text-teal-800 font-bold">৳ 38,00,000</td>
                    <td className="p-2.5">52 sessions / day</td>
                    <td className="p-2.5 text-emerald-800 font-bold">৳ 29,10,000</td>
                    <td className="p-2.5 font-bold text-emerald-700">15.6 Months</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Section 4: Use of Funds */}
          <div className="space-y-2">
            <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-900 flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-indigo-600" />
              3. Seed Use of Proceeds ($1.5M USD / ৳ 18 Crore BDT)
            </h4>
            
            <div className="grid grid-cols-4 gap-2 text-center text-xs font-mono">
              <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200">
                <span className="text-slate-500 block text-[10px]">CORRIDOR HUBS</span>
                <strong className="text-teal-800 text-sm">45%</strong>
                <span className="text-[10px] text-slate-600 block mt-0.5">5 Stations Deployed</span>
              </div>
              <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200">
                <span className="text-slate-500 block text-[10px]">VEHICLE PILOT</span>
                <strong className="text-teal-800 text-sm">30%</strong>
                <span className="text-[10px] text-slate-600 block mt-0.5">100 Fleet Scooters</span>
              </div>
              <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200">
                <span className="text-slate-500 block text-[10px]">CLOUD & VCU</span>
                <strong className="text-teal-800 text-sm">15%</strong>
                <span className="text-[10px] text-slate-600 block mt-0.5">IoT & Mobile OS</span>
              </div>
              <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200">
                <span className="text-slate-500 block text-[10px]">WORKING CAPITAL</span>
                <strong className="text-teal-800 text-sm">10%</strong>
                <span className="text-[10px] text-slate-600 block mt-0.5">Regulatory Reserve</span>
              </div>
            </div>
          </div>

          {/* Signoff & Call to Action (Hidden during print or shown as official footer) */}
          <div className="border-t border-slate-200 pt-4 flex flex-wrap items-center justify-between gap-4">
            <div className="text-xs text-slate-500">
              <span>Prepared for Angel & Institutional Seed Discussion.</span>
              <span className="block text-[10px] text-slate-400">Bangabandhu National Hi-Tech City & Gulshan-2 Office</span>
            </div>

            <button
              type="button"
              onClick={() => {
                onClose();
                onOpenContact();
              }}
              className="px-5 py-2.5 rounded-xl bg-teal-600 hover:bg-teal-700 text-white font-bold text-xs uppercase tracking-wider transition-colors cursor-pointer shadow-sm flex items-center gap-2 print:hidden"
            >
              <span>Schedule Founder Briefing</span>
              <span>→</span>
            </button>
          </div>

        </div>

      </div>

    </div>
  );
};
