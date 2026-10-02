import React, { useState } from 'react';
import { RefreshCw, Bike, Zap, DollarSign, Award, Shield, CheckCircle2, ChevronRight } from 'lucide-react';

export const PhilosophyFlywheel: React.FC = () => {
  const [activeStep, setActiveStep] = useState<number>(0);

  const flywheelSteps = [
    {
      title: "1. The Anchor Vehicle",
      subtitle: "Pulse 150 Scooter Launch",
      icon: Bike,
      color: "from-teal-500 to-cyan-600",
      description: "Our proprietary hyper-efficient scooter proves highway travel is practical without gigantic batteries. Every scooter on the road represents guaranteed captive charging demand on our corridor.",
      kpi: "Anchor Demand Driver"
    },
    {
      title: "2. Highway Corridor Deployment",
      subtitle: "Dhaka ↔ Chattogram Hubs",
      icon: Zap,
      color: "from-emerald-500 to-teal-600",
      description: "Partnering with prime highway diners and petrol pumps along the N1 corridor at 100–120 km intervals. Stations open to Pulse 150 owners AND all compatible third-party EVs (cars, scooters, delivery fleets).",
      kpi: "3 Strategic Pilot Hubs"
    },
    {
      title: "3. Highway EV Travel Confidence",
      subtitle: "Eliminating Range Anxiety",
      icon: Shield,
      color: "from-blue-500 to-indigo-600",
      description: "Visible, guaranteed, reliable charging with food & restroom facilities gives riders and drivers the psychological security to use electric vehicles between cities for the first time in Bangladesh.",
      kpi: "100% Intercity Viability"
    },
    {
      title: "4. Utilization & Energy Monetization",
      subtitle: "৳1,835 Gross Spread per 100 kWh",
      icon: DollarSign,
      color: "from-amber-500 to-orange-600",
      description: "High station throughput turns infrastructure into high-yield energy cash flow. Buying power at ৳15/kWh and dispensing at ৳35/kWh delivers healthy gross margins to recover station CAPEX in months.",
      kpi: "400+ kWh/Day Target"
    },
    {
      title: "5. Network Expansion & Flywheel Acceleration",
      subtitle: "Self-Funding Nationwide Scale",
      icon: RefreshCw,
      color: "from-purple-500 to-pink-600",
      description: "Station profits fund additional hubs along Dhaka-Sylhet, Dhaka-Bogura, and Chattogram-Cox's Bazar. A denser network makes the Pulse 150 scooter even more desirable, multiplying sales.",
      kpi: "Exponential Compounding"
    }
  ];

  return (
    <section className="py-16 sm:py-20 bg-white/60 border-y border-slate-200/80 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="text-xs font-mono uppercase tracking-widest text-teal-700 font-bold bg-teal-50 px-3 py-1 rounded-full border border-teal-200">
            Business Model Architecture
          </span>
          <h2 className="text-3xl sm:text-4xl font-display font-black text-slate-900 mt-2">
            The Two-Sided Mobility Flywheel
          </h2>
          <p className="mt-3 text-slate-600 text-base leading-relaxed">
            We are not just a scooter manufacturer, and not just a charging utility. 
            The vehicle creates the <strong className="text-teal-700 font-bold">anchor customer base</strong>, while the open network monetizes <strong className="text-emerald-700 font-bold">the entire EV ecosystem</strong>.
          </p>
        </div>

        {/* The 4 Connected Businesses */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-12">
          <div className="glass-card-interactive p-6 rounded-2xl border-t-4 border-t-teal-500 bg-white">
            <div className="w-10 h-10 rounded-xl bg-teal-50 flex items-center justify-center text-teal-700 mb-3 font-mono font-black text-sm border border-teal-100">
              01
            </div>
            <h3 className="font-bold text-slate-900 text-base">Vehicle Hardware</h3>
            <p className="text-xs text-slate-600 mt-1.5 leading-relaxed font-normal">
              Proprietary 150 km highway scooter with 96V–144V architecture and 7.2 kW fast AC capability. 25–30% hardware gross margin.
            </p>
          </div>

          <div className="glass-card-interactive p-6 rounded-2xl border-t-4 border-t-emerald-500 bg-white">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 flex items-center justify-center text-emerald-700 mb-3 font-mono font-black text-sm border border-emerald-100">
              02
            </div>
            <h3 className="font-bold text-slate-900 text-base">Charging Network</h3>
            <p className="text-xs text-slate-600 mt-1.5 leading-relaxed font-normal">
              Open corridor fast-charging network serving both our fleet and compatible 3rd-party 2W, 3W, and 4W electric vehicles.
            </p>
          </div>

          <div className="glass-card-interactive p-6 rounded-2xl border-t-4 border-t-amber-500 bg-white">
            <div className="w-10 h-10 rounded-xl bg-amber-50 flex items-center justify-center text-amber-700 mb-3 font-mono font-black text-sm border border-amber-100">
              03
            </div>
            <h3 className="font-bold text-slate-900 text-base">Energy Infrastructure</h3>
            <p className="text-xs text-slate-600 mt-1.5 leading-relaxed font-normal">
              Stationary battery storage (BESS) peak-shaving, solar canopies, and micro-grid energy management for host petrol stations.
            </p>
          </div>

          <div className="glass-card-interactive p-6 rounded-2xl border-t-4 border-t-purple-500 bg-white">
            <div className="w-10 h-10 rounded-xl bg-purple-50 flex items-center justify-center text-purple-700 mb-3 font-mono font-black text-sm border border-purple-100">
              04
            </div>
            <h3 className="font-bold text-slate-900 text-base">Software & Subscriptions</h3>
            <p className="text-xs text-slate-600 mt-1.5 leading-relaxed font-normal">
              Monthly rider memberships, automatic Plug & Charge authentication, battery health telemetry, and highway bay reservation.
            </p>
          </div>
        </div>

        {/* Interactive Flywheel Stepper */}
        <div className="glass-panel p-6 sm:p-10 rounded-3xl border border-slate-200/90 shadow-sm relative overflow-hidden bg-white/90">
          <div className="grid lg:grid-cols-12 gap-8 items-center">
            
            {/* Step Selector Buttons */}
            <div className="lg:col-span-5 space-y-2.5">
              <h4 className="text-xs font-mono text-teal-700 font-bold uppercase tracking-wider mb-2">
                Click Stages To Trace The Flywheel
              </h4>

              {flywheelSteps.map((step, idx) => {
                const Icon = step.icon;
                const isSelected = activeStep === idx;
                return (
                  <button
                    key={step.title}
                    onClick={() => setActiveStep(idx)}
                    className={`w-full text-left p-3.5 rounded-xl transition-all flex items-center justify-between border ${
                      isSelected
                        ? 'bg-teal-50 border-teal-400 text-slate-900 shadow-xs'
                        : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`w-8 h-8 rounded-lg flex items-center justify-center font-bold ${
                        isSelected ? 'bg-teal-600 text-white' : 'bg-slate-100 text-slate-500'
                      }`}>
                        <Icon className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="text-sm font-bold text-slate-900">{step.title}</div>
                        <div className="text-xs text-slate-500">{step.subtitle}</div>
                      </div>
                    </div>
                    <ChevronRight className={`w-4 h-4 transition-transform ${isSelected ? 'rotate-90 text-teal-600' : 'text-slate-400'}`} />
                  </button>
                );
              })}
            </div>

            {/* Active Step Deep-Dive Card */}
            <div className="lg:col-span-7">
              <div className="p-7 sm:p-8 rounded-2xl bg-white border border-slate-200 shadow-md relative">
                <div className="flex items-center justify-between mb-4">
                  <span className="px-3 py-1 rounded-full text-xs font-mono font-bold bg-teal-50 text-teal-800 border border-teal-200">
                    STAGE {activeStep + 1} OF 5
                  </span>
                  <span className="text-xs font-mono text-emerald-700 font-bold">
                    {flywheelSteps[activeStep].kpi}
                  </span>
                </div>

                <h3 className="text-2xl font-display font-extrabold text-slate-900">
                  {flywheelSteps[activeStep].title}
                </h3>
                <h4 className="text-teal-600 font-semibold text-sm mt-0.5 mb-3">
                  {flywheelSteps[activeStep].subtitle}
                </h4>

                <p className="text-slate-700 text-sm sm:text-base leading-relaxed mb-6 font-normal">
                  {flywheelSteps[activeStep].description}
                </p>

                {/* Preferential Treatment Callout */}
                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                  <div className="flex items-center gap-2 text-xs font-bold text-teal-800 mb-2 font-mono uppercase">
                    <Award className="w-4 h-4 text-teal-600" />
                    <span>Proprietary Ecosystem Advantage</span>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-700 font-medium">
                    <div className="flex items-center gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-teal-600 shrink-0" />
                      <span>Plug & Charge Instant Handshake</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-teal-600 shrink-0" />
                      <span>15% Discounted kWh Rate</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-teal-600 shrink-0" />
                      <span>Highway Bay Advance Reservation</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-teal-600 shrink-0" />
                      <span>Battery Health Preconditioning</span>
                    </div>
                  </div>
                </div>

                {/* Progress bar across stages */}
                <div className="mt-6 flex items-center gap-2">
                  {flywheelSteps.map((_, i) => (
                    <div
                      key={i}
                      onClick={() => setActiveStep(i)}
                      className={`h-2 rounded-full cursor-pointer transition-all ${
                        i === activeStep ? 'w-10 bg-teal-600' : 'w-3 bg-slate-200 hover:bg-slate-300'
                      }`}
                    />
                  ))}
                </div>

              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
};
