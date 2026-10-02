import React, { useState } from 'react';
import { 
  Layers, 
  Zap, 
  Shield, 
  Cpu, 
  Gauge, 
  Wind, 
  CheckCircle2, 
  ChevronRight, 
  Compass, 
  Maximize2, 
  Eye, 
  Sliders, 
  Sparkles, 
  Activity,
  Box,
  Flame,
  Radio
} from 'lucide-react';

interface BlueprintHotspot {
  id: string;
  number: number;
  partNo: string;
  name: string;
  category: 'Powertrain' | 'Battery' | 'Chassis & Aero' | 'Electronics';
  xPercent: number; // SVG X coordinate %
  yPercent: number; // SVG Y coordinate %
  specHighlight: string;
  summary: string;
  material: string;
  weightKg: string;
  thermalSpec: string;
  engineeringDetails: string[];
  bangladeshContext: string;
  voltageCurrent: string;
}

const HOTSPOTS: BlueprintHotspot[] = [
  {
    id: 'battery-pack',
    number: 1,
    partNo: 'PLS-144V-LFP-54',
    name: 'Floorboard 45S LFP Structural Battery Tray',
    category: 'Battery',
    xPercent: 47,
    yPercent: 71,
    specHighlight: '5.4 kWh • 144V Nominal • 37.5 Ah • 45S1P Prismatic',
    summary: 'Skateboard low-CG architecture cradled inside high-tensile steel frame with extruded 6061-T6 aluminum casing and finned bottom heatsink.',
    material: 'Extruded 6061-T6 Hard-Anodized Aluminum + Phase Change Thermal Compound',
    weightKg: '38.2 kg (with BMS, contactors & casing)',
    thermalSpec: '-10°C to +55°C operating • Phase Change Material (PCM) pad',
    engineeringDetails: [
      'Cell Configuration: 45S1P Grade-A Automotive Prismatic LiFePO4 cells (3.2V nominal per cell, 144V pack nominal)',
      'Structural Monocoque: Aluminum floorboard pan increases frame torsional stiffness by 28%',
      'Integrated BMS: 45-channel active cell balancing with digital CAN bus isolated telemetry',
      'Automotive Safety: Dual mechanical pyro-fuses and contactors with HVIL (High-Voltage Interlock Loop)'
    ],
    bangladeshContext: 'IP67 hermetically sealed silicone gasket engineered to ford through 300mm standing monsoon floodwaters in Dhaka and Chattogram without moisture ingress.',
    voltageCurrent: '144V Nominal (115V cutoff - 164V max) | 139A peak discharge'
  },
  {
    id: 'mid-drive-motor',
    number: 2,
    partNo: 'PLS-PMSM-14K',
    name: '144V High-Torque PMSM Mid-Drive & SiC Inverter',
    category: 'Powertrain',
    xPercent: 62,
    yPercent: 63,
    specHighlight: '8 kW Nominal • 14 kW Peak • 185 Nm Wheel Torque • 93.4% Efficiency',
    summary: 'Frame-mounted Permanent Magnet Synchronous Motor paired with a 144V Silicon Carbide (SiC) Field-Oriented Controller.',
    material: 'AlSi10Mg Die-Cast Aluminum Stator Housing • Neodymium NdFeB N45SH Magnets',
    weightKg: '8.4 kg (Motor) + 2.1 kg (Inverter)',
    thermalSpec: 'Liquid-assisted passive heatsink tunnel • Overheat derating at 115°C',
    engineeringDetails: [
      'Unsprung Mass Reduction: Frame mounting reduces rear unsprung mass by 9 kg compared to traditional hub motors',
      'SiC MOSFET Inverter: 40 kHz switching frequency delivers ultra-smooth vector torque without acoustic whine',
      'Regenerative Capture: Seamless bi-directional power stage recovers up to 3.5 kW on deceleration',
      'Peak Wheel Torque: 185 Nm off-the-line launch (0-60 km/h in 3.9 seconds)'
    ],
    bangladeshContext: 'Isolated from pothole impacts and road shock on Dhaka-Chittagong highway, avoiding shattered magnets common in budget hub motors.',
    voltageCurrent: '144V 3-Phase AC Vector Drive | 98A continuous / 160A peak phase current'
  },
  {
    id: 'dual-charging-port',
    number: 3,
    partNo: 'PLS-CHG-DUAL-V2',
    name: 'Dual-Protocol Charge Port (7.2 kW AC + 20 kW DC)',
    category: 'Powertrain',
    xPercent: 32,
    yPercent: 44,
    specHighlight: '7.2 kW AC Onboard Charger • 20 kW DC Direct Bus Ingress',
    summary: 'Weatherproof motorized flap housing both Type 2 Mennekes AC inlet and high-current 144V DC direct bus pins.',
    material: 'UV-Stabilized Polycarbonate/PBT Shell • Silver-Plated Tellurium Copper Terminals',
    weightKg: '4.8 kg (including 7.2 kW OBC unit)',
    thermalSpec: 'Monitored temperature sensors at contact pins (auto-derate at 75°C)',
    engineeringDetails: [
      '7.2 kW Bi-directional Onboard Charger (OBC): Replenishes 5.4 kWh pack in ~42 min from industrial 230V 32A single phase',
      '20 kW DC Fast-Charge Bypass: Bypasses OBC directly into battery contactors for 10-15 min rapid charge',
      'ISO 15118 & OCPP 2.0.1: Encrypted handshake protocol enabling automatic plug-and-charge billing',
      'Magnetic Latch: Automated locking solenoid prevents cable disconnection during active power delivery'
    ],
    bangladeshContext: 'Universal compatibility: Plug into any 32A socket at highway diners or high-amperage DC charging stalls at partner petrol pumps.',
    voltageCurrent: 'AC: 230V 32A Single-Phase | DC: 144V up to 139A direct bus'
  },
  {
    id: 'aero-fairing',
    number: 4,
    partNo: 'PLS-AERO-CFD-01',
    name: 'CFD Sculpted Aerodynamic Fairing & Windscreen',
    category: 'Chassis & Aero',
    xPercent: 22,
    yPercent: 27,
    specHighlight: 'Cd = 0.74 • Frontal Area = 0.65 m² • CdA = 0.48 m²',
    summary: 'Wind-tunnel optimized front cowl that deflects high-velocity boundary layer over rider torso, dropping 80 km/h aero drag by 26%.',
    material: 'Virgin Polycarbonate Optical Screen • Impact-Resistant ABS/Polycarbonate Fairing',
    weightKg: '3.6 kg (Fairing assembly)',
    thermalSpec: 'UV400 Solar Coating • Internal ram-air ducting cooling VCU and battery top plate',
    engineeringDetails: [
      'Aero Drag Optimization: Reduces 80 km/h power consumption from 58 Wh/km down to 42 Wh/km',
      'Integrated Ram-Air Tunnel: Channels 40+ km/h ambient airflow across the battery heatsink fins',
      'Optical Windscreen: Double-bubble profile stabilizes airflow over rider helmet, minimizing neck buffeting',
      'Flush Turn Signals: Integrated aerodynamic LED daytime running lights (DRL) with zero drag penalty'
    ],
    bangladeshContext: 'Provides aerodynamic stability against violent crosswinds when crossing the 1.4 km Meghna River and Gomti River bridges.',
    voltageCurrent: 'Passive Aerodynamic Structure • Zero Parasitic Power Draw'
  },
  {
    id: 'connected-cockpit',
    number: 5,
    partNo: 'PLS-VCU-TFT-7',
    name: '7" Automotive Sunlight TFT & Telematics VCU Gateway',
    category: 'Electronics',
    xPercent: 29,
    yPercent: 19,
    specHighlight: '1000 nits High-Brightness • 4G LTE IoT • GNSS RTK • BLE 5.2',
    summary: 'Ruggedized automotive vehicle computer providing real-time highway corridor station occupancy, battery SoC, and tire pressure.',
    material: 'Gorilla Glass Optical Bonding • IP66 CNC Aluminum Housing',
    weightKg: '0.85 kg',
    thermalSpec: '-20°C to +70°C operational range with anti-glare anti-reflective coating',
    engineeringDetails: [
      'Automotive VCU: Dual-core ARM Cortex processor controlling motor throttle maps, regen levels, and BMS telemetry',
      'Corridor Route Planner: Computes remaining SoC to Cumilla and Feni stations taking live wind and payload into account',
      'One-Touch Bay Reservation: Communicates with upcoming highway charging stations to reserve stalls 20 min in advance',
      'Over-The-Air (OTA): Secure cryptographic firmware updates for inverter torque curves and battery charge algorithms'
    ],
    bangladeshContext: 'High-contrast 1000-nit panel remains crystal clear under blazing 42°C noon summer sun on the Dhaka-Chattogram expressway.',
    voltageCurrent: '12V Isolated Auxiliary Bus (stepped down from 144V via 350W synchronous buck converter)'
  },
  {
    id: 'regen-braking',
    number: 6,
    partNo: 'PLS-BRK-BOSCH-ABS',
    name: 'Dual-Channel ABS & Progressive Regenerative Braking',
    category: 'Chassis & Aero',
    xPercent: 78,
    yPercent: 74,
    specHighlight: 'Recuperates up to 12% Energy • Bosch Dual-Channel ABS • 260mm Floating Disc',
    summary: 'Electronic brake-by-wire regeneration seamlessly blended with hydraulic disc calipers for maximum stopping safety on wet highways.',
    material: 'High-Carbon Stainless Steel Floating Rotors • Forged Aluminum Caliper Housings',
    weightKg: '4.2 kg (Full dual-wheel braking system)',
    thermalSpec: 'Cross-drilled rotor ventilation dissipates up to 350°C fade-free braking heat',
    engineeringDetails: [
      'Brake Energy Recovery: Throttle roll-off generates variable reverse torque, feeding up to 3.5 kW back into 144V battery',
      'Bridge Descent Regen: Automatically harvests 4.4% cumulative SoC descending Meghna & Gomti highway bridges',
      'Bosch ABS Modulator: 100 Hz wheel-speed sensor polling prevents wheel lockup on wet gravel or monsoon puddles',
      'Extended Pad Life: 70% of deceleration handled electrically by motor regen, tripling friction pad life'
    ],
    bangladeshContext: 'Essential emergency stopping capability when avoiding unexpected cattle, slow farm vehicles, or diesel-slick highway curves.',
    voltageCurrent: 'Up to 3.5 kW reverse kinetic capture into 144V high-voltage bus'
  },
  {
    id: 'belt-drive',
    number: 7,
    partNo: 'PLS-GATES-CARBON',
    name: 'Gates Carbon Drive Poly Chain GT & Billet Sprockets',
    category: 'Powertrain',
    xPercent: 57,
    yPercent: 69,
    specHighlight: 'Carbon Tensile Cord • Zero Oil / Lube • 98% Drive Efficiency',
    summary: 'Oil-free polyurethane synchronous timing belt reinforced with carbon fiber tensile cords for silent, stretch-free power delivery.',
    material: 'Polyurethane Elastomer with High-Modulus Carbon Tensile Cords • 7075-T6 Billet Aluminum Pulley',
    weightKg: '0.38 kg (Belt) + 1.2 kg (Rear Sprocket)',
    thermalSpec: '-40°C to +85°C rated • Impervious to dust, sand, and monsoon rain',
    engineeringDetails: [
      'Zero Maintenance: Completely eliminates chain cleaning, messy oiling, and monthly chain tightening rituals',
      'Acoustic Silence: Operates under 55 dB, allowing the silent electric motor whisper without metal clatter',
      'Tensile Strength: Carbon cords withstand 25 kN tensile stress—zero stretch over 50,000 km lifecycle',
      'Eccentric Tensioner: Swingarm pivot houses an eccentric cam for micro-millimeter precision belt preload'
    ],
    bangladeshContext: 'Conventional motorcycle chains rust rapidly from coastal salt air and monsoon road splash; carbon belts remain completely rust-free.',
    voltageCurrent: 'Mechanical Power Transmission • Zero Electrical Draw'
  },
  {
    id: 'usd-suspension',
    number: 8,
    partNo: 'PLS-SUSP-USD-37',
    name: '37mm Inverted (USD) Front Fork & Trellis Headtube',
    category: 'Chassis & Aero',
    xPercent: 26,
    yPercent: 49,
    specHighlight: '37mm Inner Tube • 115mm Travel • 25° Rake Angle',
    summary: 'Upside-down telescopic front fork clamped into forged CNC triple trees for precise steering rigidity and road isolation.',
    material: 'Hard-Chrome Plated Inner Tubes • Forged 6061-T6 Aluminum Upper Stanchions',
    weightKg: '6.8 kg (Fork pair & Triple trees)',
    thermalSpec: 'Synthetic low-viscosity fork oil with dual nitrogen-charged damping valves',
    engineeringDetails: [
      'Structural Rigidity: USD inverted design places larger outer tubes at the triple clamp, reducing flex during heavy braking by 35%',
      'Progressive Spring Rates: Dual-stage springs absorb micro-vibrations while preventing bottoming out over potholes',
      'Headtube Geometry: 25° rake angle and 95mm trail engineered for rock-solid stability at 90 km/h cruising',
      'Trellis Integration: Seamlessly welded into twin-spar tubular steel main chassis'
    ],
    bangladeshContext: 'Absorbs brutal expansion joints on Dhaka elevated expressway and rough asphalt patches on regional highway segments.',
    voltageCurrent: 'Hydraulic Damping System'
  }
];

type RenderMode = 'blueprint' | 'thermal' | 'aero';
type ViewAngle = 'side' | 'top';

export const VehicleBlueprint: React.FC = () => {
  const [activeHotspotId, setActiveHotspotId] = useState<string>('battery-pack');
  const [renderMode, setRenderMode] = useState<RenderMode>('blueprint');
  const [viewAngle, setViewAngle] = useState<ViewAngle>('side');
  const [skinOpacity, setSkinOpacity] = useState<number>(35); // 0% (pure skeleton) to 100% (solid body)
  const [showDimensions, setShowDimensions] = useState<boolean>(true);
  const [activeFilter, setActiveFilter] = useState<'All' | 'Battery' | 'Powertrain' | 'Chassis & Aero' | 'Electronics'>('All');

  const selectedHotspot = HOTSPOTS.find((h) => h.id === activeHotspotId) || HOTSPOTS[0];

  const filteredHotspots = activeFilter === 'All' 
    ? HOTSPOTS 
    : HOTSPOTS.filter(h => h.category === activeFilter);

  return (
    <section id="vehicle-blueprint" className="py-16 sm:py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 scroll-mt-24">
      
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-8">
        <span className="text-xs font-mono uppercase tracking-widest text-teal-800 font-extrabold bg-teal-100/90 px-3 py-1 rounded-full border border-teal-300">
          Precision CAD Architecture
        </span>
        <h2 className="text-3xl sm:text-4xl font-display font-black text-slate-900 mt-2">
          PULSE 150 Engineering Cutaway Blueprint
        </h2>
        <p className="mt-3 text-slate-600 text-base leading-relaxed">
          Interactive aerospace & automotive CAD schematic. Switch render modes, adjust bodywork skin opacity, inspect high-voltage 144V buslines, and click numbered engineering nodes to examine components.
        </p>
      </div>

      {/* CAD Toolbar: Render Modes, Views & Skin Opacity */}
      <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-xs mb-6 flex flex-wrap items-center justify-between gap-4">
        
        {/* Render Mode Switcher */}
        <div className="flex items-center gap-2">
          <span className="text-xs font-mono font-bold uppercase text-slate-500 hidden sm:inline">
            CAD Mode:
          </span>
          <div className="flex p-1 rounded-xl bg-slate-100 border border-slate-200 text-xs font-mono font-bold">
            <button
              type="button"
              onClick={() => setRenderMode('blueprint')}
              className={`px-3 py-1.5 rounded-lg flex items-center gap-1.5 transition-all cursor-pointer ${
                renderMode === 'blueprint'
                  ? 'bg-slate-900 text-cyan-400 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Compass className="w-3.5 h-3.5 text-cyan-400" />
              <span>Blueprint CAD</span>
            </button>
            <button
              type="button"
              onClick={() => setRenderMode('thermal')}
              className={`px-3 py-1.5 rounded-lg flex items-center gap-1.5 transition-all cursor-pointer ${
                renderMode === 'thermal'
                  ? 'bg-slate-900 text-amber-400 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Zap className="w-3.5 h-3.5 text-amber-400" />
              <span>144V X-Ray</span>
            </button>
            <button
              type="button"
              onClick={() => setRenderMode('aero')}
              className={`px-3 py-1.5 rounded-lg flex items-center gap-1.5 transition-all cursor-pointer ${
                renderMode === 'aero'
                  ? 'bg-slate-900 text-teal-400 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Wind className="w-3.5 h-3.5 text-teal-400" />
              <span>CFD Wind Tunnel</span>
            </button>
          </div>
        </div>

        {/* View Angle: Side Cutaway vs Top-Down */}
        <div className="flex items-center gap-2">
          <span className="text-xs font-mono font-bold uppercase text-slate-500 hidden md:inline">
            Projection:
          </span>
          <div className="flex p-1 rounded-xl bg-slate-100 border border-slate-200 text-xs font-mono font-bold">
            <button
              type="button"
              onClick={() => setViewAngle('side')}
              className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
                viewAngle === 'side'
                  ? 'bg-teal-600 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Side Cutaway
            </button>
            <button
              type="button"
              onClick={() => setViewAngle('top')}
              className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
                viewAngle === 'top'
                  ? 'bg-teal-600 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Dorsal / Top Chassis
            </button>
          </div>
        </div>

        {/* Bodywork Skin Opacity Slider */}
        <div className="flex items-center gap-3">
          <span className="text-xs font-mono font-bold text-slate-600 flex items-center gap-1">
            <Eye className="w-3.5 h-3.5 text-teal-600" />
            <span>Skin:</span>
          </span>
          <div className="flex items-center gap-2">
            <input
              type="range"
              min="0"
              max="100"
              step="5"
              value={skinOpacity}
              onChange={(e) => setSkinOpacity(Number(e.target.value))}
              className="w-24 accent-teal-600 cursor-pointer h-1.5 bg-slate-200 rounded-lg"
              title="Adjust outer bodywork transparency"
            />
            <span className="text-xs font-mono font-bold text-teal-800 w-9 text-right">
              {skinOpacity}%
            </span>
          </div>
          
          {/* Dimension toggle */}
          <button
            type="button"
            onClick={() => setShowDimensions(!showDimensions)}
            className={`px-2.5 py-1 rounded-lg text-xs font-mono font-bold border transition-all cursor-pointer ${
              showDimensions
                ? 'bg-teal-50 border-teal-300 text-teal-800'
                : 'bg-slate-50 border-slate-200 text-slate-500'
            }`}
          >
            {showDimensions ? 'Dims: ON' : 'Dims: OFF'}
          </button>
        </div>

      </div>

      {/* Main Grid: Interactive Viewport + Technical Spec Sheet */}
      <div className="grid lg:grid-cols-12 gap-8 items-start">
        
        {/* Left: Interactive CAD Viewport (7 Cols) */}
        <div className="lg:col-span-7 bg-white rounded-3xl border border-slate-200 shadow-sm p-6 sm:p-7 flex flex-col justify-between">
          
          <div className="flex items-center justify-between border-b border-slate-100 pb-3 mb-4">
            <div className="flex items-center gap-2">
              <div className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-ping" />
              <span className="font-mono text-xs font-bold uppercase tracking-wider text-slate-800">
                PULSE-150-CAD-V5.0 // {renderMode.toUpperCase()} // {viewAngle === 'side' ? 'ELEVATION' : 'PLAN'}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-mono text-cyan-800 font-bold bg-cyan-50 px-2 py-0.5 rounded border border-cyan-200">
                SCALE: 1:10 • TOLERANCE: ±0.05mm
              </span>
            </div>
          </div>

          {/* SVG Vehicle Cutaway Diagram Viewport */}
          <div className="relative w-full aspect-16/10 bg-slate-950 rounded-2xl overflow-hidden border border-slate-800 flex items-center justify-center p-2 select-none shadow-2xl">
            
            {/* Background CAD Grid */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#0f172a_1px,transparent_1px),linear-gradient(to_bottom,#0f172a_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none opacity-80" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(14,165,233,0.06)_0,transparent_70%)] pointer-events-none" />

            {/* Corner CAD Technical Markings */}
            <div className="absolute top-3 left-4 text-[9px] font-mono text-cyan-400/80 flex items-center gap-3 pointer-events-none">
              <span>PROJECT: PULSE 150</span>
              <span>•</span>
              <span>CHASSIS: TWIN-SPAR TRELLIS</span>
              <span>•</span>
              <span>PACK: 45S LFP</span>
            </div>

            <div className="absolute bottom-3 left-4 text-[9px] font-mono text-slate-500 pointer-events-none hidden sm:block">
              SYSTEM VOLTAGE: 144V NOMINAL • MOTOR: PMSM 14kW PEAK • RANGE: ~150 KM
            </div>

            {/* SVG Illustration Container */}
            <svg 
              viewBox="0 0 900 560" 
              className="w-full h-full object-contain filter drop-shadow-[0_15px_30px_rgba(0,0,0,0.8)]"
            >
              <defs>
                {/* Advanced Gradients & Shaders */}
                <linearGradient id="cadTireGrad" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%" stopColor="#1e293b" />
                  <stop offset="50%" stopColor="#0f172a" />
                  <stop offset="100%" stopColor="#020617" />
                </linearGradient>

                <linearGradient id="cadRimGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#64748b" />
                  <stop offset="100%" stopColor="#334155" />
                </linearGradient>

                <linearGradient id="cadGoldFork" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%" stopColor="#d97706" />
                  <stop offset="50%" stopColor="#fbbf24" />
                  <stop offset="100%" stopColor="#b45309" />
                </linearGradient>

                <linearGradient id="cadLfpCell" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%" stopColor="#059669" />
                  <stop offset="50%" stopColor="#10b981" />
                  <stop offset="100%" stopColor="#047857" />
                </linearGradient>

                <linearGradient id="cadMotorStator" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%" stopColor="#0284c7" />
                  <stop offset="50%" stopColor="#38bdf8" />
                  <stop offset="100%" stopColor="#0369a1" />
                </linearGradient>

                <linearGradient id="aeroFlowGrad" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.8" />
                  <stop offset="50%" stopColor="#2dd4bf" stopOpacity="0.5" />
                  <stop offset="100%" stopColor="#10b981" stopOpacity="0.1" />
                </linearGradient>

                <filter id="cadGlow" x="-30%" y="-30%" width="160%" height="160%">
                  <feGaussianBlur stdDeviation="5" result="blur" />
                  <feComposite in="SourceGraphic" in2="blur" operator="over" />
                </filter>
                
                <filter id="softGlow" x="-20%" y="-20%" width="140%" height="140%">
                  <feGaussianBlur stdDeviation="2.5" result="blur" />
                  <feComposite in="SourceGraphic" in2="blur" operator="over" />
                </filter>
              </defs>

              {/* ----------------------------------------------------
                  VIEW ANGLE 1: SIDE CUTAWAY (DEFAULT)
              ---------------------------------------------------- */}
              {viewAngle === 'side' && (
                <g>
                  {/* Ground Datum Line with Center Marks */}
                  <line x1="50" y1="490" x2="850" y2="490" stroke="#334155" strokeWidth="1.5" strokeDasharray="8 6" />
                  <text x="70" y="505" fill="#64748b" fontSize="10" fontFamily="monospace">GROUND DATUM 0.00mm</text>

                  {/* CFD Wind Tunnel Streamlines Layer (Render Mode: aero) */}
                  {renderMode === 'aero' && (
                    <g className="animate-pulse" opacity="0.85">
                      <path d="M 40 160 C 140 160, 200 130, 260 110 C 350 80, 480 85, 600 120 C 720 150, 800 170, 860 170" fill="none" stroke="url(#aeroFlowGrad)" strokeWidth="3.5" strokeDasharray="12 6" />
                      <path d="M 40 220 C 130 220, 180 200, 230 180 C 320 150, 450 160, 580 190 C 700 230, 780 260, 860 260" fill="none" stroke="url(#aeroFlowGrad)" strokeWidth="3" strokeDasharray="10 5" />
                      <path d="M 40 280 C 120 280, 180 270, 260 270 C 360 270, 480 280, 600 290 C 720 300, 800 320, 860 320" fill="none" stroke="url(#aeroFlowGrad)" strokeWidth="2.5" strokeDasharray="8 4" />
                      <path d="M 40 370 C 160 370, 280 380, 400 385 C 550 390, 700 400, 860 410" fill="none" stroke="url(#aeroFlowGrad)" strokeWidth="2" strokeDasharray="6 3" />
                      {/* Turbulent Wake Area behind rear */}
                      <circle cx="780" cy="270" r="45" fill="#f43f5e" fillOpacity="0.08" stroke="#f43f5e" strokeWidth="1" strokeDasharray="4 4" />
                      <text x="780" y="275" textAnchor="middle" fill="#fda4af" fontSize="9" fontFamily="monospace">LOW-PRESSURE WAKE</text>
                    </g>
                  )}

                  {/* 1. FRONT WHEEL ASSEMBLY (Center at X: 220, Y: 410, R: 75) */}
                  <g>
                    {/* Outer Tire Tread */}
                    <circle cx="220" cy="410" r="75" fill="url(#cadTireGrad)" stroke="#475569" strokeWidth="8" />
                    {/* Tire Tread Siping Grooves */}
                    <circle cx="220" cy="410" r="62" fill="none" stroke="#64748b" strokeWidth="1.5" strokeDasharray="8 6" />
                    {/* 14-inch Alloy Wheel Rim */}
                    <circle cx="220" cy="410" r="50" fill="#0f172a" stroke="#94a3b8" strokeWidth="4" />
                    {/* 5-Spoke Lightweight Wheel Geometry */}
                    {[0, 72, 144, 216, 288].map((angle, i) => (
                      <line
                        key={i}
                        x1="220"
                        y1="410"
                        x2={220 + 44 * Math.cos((angle * Math.PI) / 180)}
                        y2={410 + 44 * Math.sin((angle * Math.PI) / 180)}
                        stroke="#64748b"
                        strokeWidth="5"
                        strokeLinecap="round"
                      />
                    ))}
                    {/* 260mm Ventilated Brake Rotor */}
                    <circle cx="220" cy="410" r="40" fill="none" stroke="#e2e8f0" strokeWidth="3" strokeDasharray="6 3" />
                    {/* ABS Tone Ring (Wheel Speed Sensor) */}
                    <circle cx="220" cy="410" r="22" fill="none" stroke="#38bdf8" strokeWidth="2" strokeDasharray="2 2" />
                    {/* Center Wheel Hub Bearing */}
                    <circle cx="220" cy="410" r="14" fill="#1e293b" stroke="#f8fafc" strokeWidth="3" />
                    {/* Red Dual-Piston Brake Caliper */}
                    <path d="M 235 380 L 252 385 L 246 418 L 230 412 Z" fill="#ef4444" stroke="#fca5a5" strokeWidth="1.5" />
                    <circle cx="240" cy="395" r="3" fill="#ffffff" />
                    <circle cx="237" cy="406" r="3" fill="#ffffff" />
                  </g>

                  {/* 2. REAR WHEEL ASSEMBLY (Center at X: 690, Y: 410, R: 75) */}
                  <g>
                    {/* Outer Tire Tread */}
                    <circle cx="690" cy="410" r="75" fill="url(#cadTireGrad)" stroke="#475569" strokeWidth="8" />
                    <circle cx="690" cy="410" r="62" fill="none" stroke="#64748b" strokeWidth="1.5" strokeDasharray="8 6" />
                    {/* 14-inch Rim */}
                    <circle cx="690" cy="410" r="50" fill="#0f172a" stroke="#94a3b8" strokeWidth="4" />
                    {/* Spokes */}
                    {[0, 72, 144, 216, 288].map((angle, i) => (
                      <line
                        key={i}
                        x1="690"
                        y1="410"
                        x2={690 + 44 * Math.cos((angle * Math.PI) / 180)}
                        y2={410 + 44 * Math.sin((angle * Math.PI) / 180)}
                        stroke="#64748b"
                        strokeWidth="5"
                        strokeLinecap="round"
                      />
                    ))}
                    {/* Rear Driven Belt Pulley (Large Sprocket) */}
                    <circle cx="690" cy="410" r="42" fill="none" stroke="#0ea5e9" strokeWidth="3.5" strokeDasharray="4 2" />
                    {/* 220mm Rear Brake Rotor */}
                    <circle cx="690" cy="410" r="34" fill="none" stroke="#e2e8f0" strokeWidth="2.5" strokeDasharray="5 3" />
                    <circle cx="690" cy="410" r="14" fill="#1e293b" stroke="#f8fafc" strokeWidth="3" />
                    {/* Rear Caliper */}
                    <rect x="660" y="380" width="16" height="26" rx="4" fill="#ef4444" stroke="#fca5a5" strokeWidth="1" />
                  </g>

                  {/* 3. INVERTED (USD) 37mm FRONT SUSPENSION FORK (Node 8) */}
                  <g onClick={() => setActiveHotspotId('usd-suspension')} className="cursor-pointer">
                    {/* Gold Anodized Outer Stanchions */}
                    <line x1="252" y1="165" x2="232" y2="340" stroke="url(#cadGoldFork)" strokeWidth="12" strokeLinecap="round" />
                    {/* Chrome Plated Inner Slider Tubes */}
                    <line x1="232" y1="330" x2="220" y2="410" stroke="#f1f5f9" strokeWidth="8" strokeLinecap="round" />
                    {/* Fork Dropouts & Axle Clamp */}
                    <circle cx="220" cy="410" r="8" fill="#475569" stroke="#94a3b8" strokeWidth="2" />
                    {/* Triple Trees Clamps (CNC machined billet) */}
                    <rect x="238" y="180" width="28" height="12" rx="3" fill="#334155" stroke="#38bdf8" strokeWidth="1.5" />
                    <rect x="246" y="215" width="28" height="12" rx="3" fill="#334155" stroke="#38bdf8" strokeWidth="1.5" />
                    {/* Headtube Steering Bearings (25° Rake Angle) */}
                    <line x1="260" y1="175" x2="270" y2="235" stroke="#0ea5e9" strokeWidth="6" strokeLinecap="round" />
                  </g>

                  {/* 4. HIGH-TENSILE STEEL TRELLIS TWIN-SPAR FRAME */}
                  <g opacity="0.95">
                    {/* Main Twin Spar Tubes (Headtube -> Floorboard cradle -> Swingarm pivot) */}
                    <path
                      d="M 268 225 L 320 330 L 400 375 L 535 375 L 585 340 L 610 395"
                      fill="none"
                      stroke="#0d9488"
                      strokeWidth="8"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    {/* Triangulated Cross Gussets */}
                    <path
                      d="M 320 330 L 535 330 L 585 340 L 440 270 L 320 330 Z"
                      fill="none"
                      stroke="#0f766e"
                      strokeWidth="4"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      opacity="0.8"
                    />
                    {/* Rear Subframe Tubes (Supporting two-up stepped seat & pillion) */}
                    <path
                      d="M 440 270 L 610 245 L 690 265 L 585 340"
                      fill="none"
                      stroke="#14b8a6"
                      strokeWidth="5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    {/* Gusset Reinforcement Webbing Plates */}
                    <circle cx="320" cy="330" r="6" fill="#14b8a6" />
                    <circle cx="535" cy="330" r="6" fill="#14b8a6" />
                    <circle cx="440" cy="270" r="6" fill="#14b8a6" />
                  </g>

                  {/* 5. REAR SWINGARM & NITROGEN MONOSHOCK */}
                  <g>
                    {/* Cast Aluminum Swingarm */}
                    <line x1="550" y1="375" x2="690" y2="410" stroke="#64748b" strokeWidth="12" strokeLinecap="round" />
                    <line x1="550" y1="375" x2="690" y2="410" stroke="#94a3b8" strokeWidth="6" strokeLinecap="round" />
                    {/* Swingarm Pivot Bearing */}
                    <circle cx="550" cy="375" r="9" fill="#1e293b" stroke="#38bdf8" strokeWidth="2.5" />
                    {/* Monoshock Absorber with Orange Progressive Coil Spring */}
                    <line x1="535" y1="310" x2="590" y2="385" stroke="#334155" strokeWidth="10" strokeLinecap="round" />
                    <line x1="540" y1="320" x2="585" y2="378" stroke="#f97316" strokeWidth="7" strokeDasharray="7 5" />
                    <circle cx="535" cy="310" r="5" fill="#f8fafc" />
                    <circle cx="590" cy="385" r="5" fill="#f8fafc" />
                  </g>

                  {/* 6. FLOORBOARD 45S LFP BATTERY PACK ENCLOSURE (Node 1) */}
                  <g 
                    onClick={() => setActiveHotspotId('battery-pack')} 
                    className="cursor-pointer transition-all hover:brightness-125"
                    filter={activeHotspotId === 'battery-pack' ? 'url(#cadGlow)' : undefined}
                  >
                    {/* Extruded Aluminum Tray Shell */}
                    <rect
                      x="330"
                      y="360"
                      width="190"
                      height="54"
                      rx="10"
                      fill="#042f2e"
                      stroke="#2dd4bf"
                      strokeWidth="2.5"
                    />
                    {/* Finned Bottom Plate Heatsink Extrusions */}
                    {[0, 16, 32, 48, 64, 80, 96, 112, 128, 144, 160, 174].map((offset, i) => (
                      <line
                        key={i}
                        x1={340 + offset}
                        y1="414"
                        x2={340 + offset}
                        y2="422"
                        stroke="#0d9488"
                        strokeWidth="2.5"
                      />
                    ))}
                    {/* Visible 45S Prismatic Cells Array (Cutaway inside) */}
                    {[0, 15, 30, 45, 60, 75, 90, 105, 120, 135, 150, 165].map((offset, i) => (
                      <rect
                        key={i}
                        x={338 + offset}
                        y="366"
                        width="11"
                        height="40"
                        rx="2"
                        fill="url(#cadLfpCell)"
                        stroke="#34d399"
                        strokeWidth="0.8"
                      />
                    ))}
                    {/* Master BMS Controller Board & Copper Busbars */}
                    <rect x="340" y="364" width="170" height="4" fill="#fbbf24" stroke="#f59e0b" strokeWidth="0.5" />
                    <text x="425" y="392" textAnchor="middle" fill="#ffffff" fontSize="11" fontWeight="bold" fontFamily="monospace" letterSpacing="1">
                      5.4 kWh LFP [144V]
                    </text>
                  </g>

                  {/* 7. 144V PMSM MID-DRIVE MOTOR & INVERTER (Node 2) */}
                  <g 
                    onClick={() => setActiveHotspotId('mid-drive-motor')} 
                    className="cursor-pointer transition-all hover:brightness-125"
                    filter={activeHotspotId === 'mid-drive-motor' ? 'url(#cadGlow)' : undefined}
                  >
                    {/* Aluminum Stator Finned Housing */}
                    <circle cx="545" cy="355" r="32" fill="url(#cadMotorStator)" stroke="#38bdf8" strokeWidth="2.5" />
                    {/* Radial Heatsink Cooling Ribs */}
                    {[0, 45, 90, 135, 180, 225, 270, 315].map((deg, i) => (
                      <line
                        key={i}
                        x1={545 + 26 * Math.cos((deg * Math.PI) / 180)}
                        y1={355 + 26 * Math.sin((deg * Math.PI) / 180)}
                        x2={545 + 34 * Math.cos((deg * Math.PI) / 180)}
                        y2={355 + 34 * Math.sin((deg * Math.PI) / 180)}
                        stroke="#7dd3fc"
                        strokeWidth="2.5"
                      />
                    ))}
                    {/* Central Rotor Shaft & Bearing */}
                    <circle cx="545" cy="355" r="14" fill="#0f172a" stroke="#ffffff" strokeWidth="2" />
                    {/* Front Drive Pulley */}
                    <circle cx="545" cy="355" r="20" fill="none" stroke="#38bdf8" strokeWidth="2" strokeDasharray="3 2" />
                    
                    {/* Inverter Box (SiC Module) above motor */}
                    <rect x="520" y="295" width="46" height="26" rx="5" fill="#0f172a" stroke="#38bdf8" strokeWidth="2" />
                    <text x="543" y="312" textAnchor="middle" fill="#38bdf8" fontSize="8" fontFamily="monospace" fontWeight="bold">SiC FOC</text>
                  </g>

                  {/* 8. GATES CARBON DRIVE TIMING BELT (Node 7) */}
                  <g onClick={() => setActiveHotspotId('belt-drive')} className="cursor-pointer">
                    {/* Top run */}
                    <line x1="545" y1="335" x2="690" y2="368" stroke="#38bdf8" strokeWidth="4" strokeDasharray="5 3" />
                    {/* Bottom run */}
                    <line x1="545" y1="375" x2="690" y2="452" stroke="#38bdf8" strokeWidth="4" strokeDasharray="5 3" />
                  </g>

                  {/* 9. HIGH-VOLTAGE 144V ORANGE WIRING HARNESS */}
                  <g className="pointer-events-none">
                    {/* DC Fast Charge direct bypass cable */}
                    <path
                      d="M 285 240 Q 320 300 350 362"
                      fill="none"
                      stroke="#f97316"
                      strokeWidth="4"
                      strokeDasharray={renderMode === 'thermal' ? '6 4' : 'none'}
                      filter={renderMode === 'thermal' ? 'url(#cadGlow)' : undefined}
                    />
                    {/* Motor phase 3-wire bus */}
                    <path
                      d="M 520 375 L 535 365"
                      fill="none"
                      stroke="#f97316"
                      strokeWidth="5"
                    />
                  </g>

                  {/* 10. CHARGE PORT INLET (Node 3) */}
                  <g 
                    onClick={() => setActiveHotspotId('dual-charging-port')} 
                    className="cursor-pointer transition-all hover:scale-110"
                    filter={activeHotspotId === 'dual-charging-port' ? 'url(#cadGlow)' : undefined}
                  >
                    <circle cx="285" cy="240" r="16" fill="#f59e0b" stroke="#fef3c7" strokeWidth="2.5" />
                    {/* Type 2 Socket pin holes */}
                    <circle cx="281" cy="235" r="2.5" fill="#0f172a" />
                    <circle cx="289" cy="235" r="2.5" fill="#0f172a" />
                    <circle cx="285" cy="241" r="3" fill="#0f172a" />
                    <circle cx="281" cy="247" r="2.5" fill="#0f172a" />
                    <circle cx="289" cy="247" r="2.5" fill="#0f172a" />
                  </g>

                  {/* 11. HANDLEBARS, 7" TFT COCKPIT & CONTROLS (Node 5) */}
                  <g onClick={() => setActiveHotspotId('connected-cockpit')} className="cursor-pointer">
                    {/* Handlebar Riser & Tapered Bar */}
                    <path d="M 268 180 L 260 140 L 290 135" fill="none" stroke="#94a3b8" strokeWidth="5" strokeLinecap="round" />
                    {/* 7-inch TFT Display screen */}
                    <rect
                      x="250"
                      y="110"
                      width="34"
                      height="22"
                      rx="4"
                      fill="#0284c7"
                      stroke="#7dd3fc"
                      strokeWidth="2"
                      filter={activeHotspotId === 'connected-cockpit' ? 'url(#cadGlow)' : undefined}
                    />
                    <rect x="253" y="113" width="28" height="16" fill="#0f172a" />
                    <text x="267" y="124" textAnchor="middle" fill="#38bdf8" fontSize="7" fontFamily="monospace" fontWeight="bold">100%</text>
                  </g>

                  {/* 12. BODYWORK FAIRINGS, WINDSCREEN & SEAT (Dynamic Opacity via slider) */}
                  <g opacity={skinOpacity / 100} className="transition-opacity duration-300">
                    {/* Aerodynamic Front Cowl & Fairing (Node 4) */}
                    <path
                      d="M 195 240 Q 180 150 220 85 L 265 90 Q 250 170 310 260 L 280 290 Z"
                      fill="#0d9488"
                      stroke="#2dd4bf"
                      strokeWidth="2.5"
                      className="cursor-pointer"
                      onClick={() => setActiveHotspotId('aero-fairing')}
                    />

                    {/* Polycarbonate Optical Windscreen */}
                    <path
                      d="M 220 85 Q 240 45 285 55 L 275 105 Z"
                      fill="#38bdf8"
                      fillOpacity="0.4"
                      stroke="#7dd3fc"
                      strokeWidth="2"
                    />

                    {/* Twin Projector LED Headlamp assembly */}
                    <path d="M 190 200 L 210 185 L 215 220 Z" fill="#ffffff" stroke="#38bdf8" strokeWidth="2" filter="url(#softGlow)" />

                    {/* Floorboard Footrest Step & Lower Body Skirt */}
                    <path
                      d="M 280 290 L 320 350 L 530 350 L 560 300 Z"
                      fill="#1e293b"
                      stroke="#475569"
                      strokeWidth="2"
                    />

                    {/* Two-Up Stepped Ergonomic Seat */}
                    <path
                      d="M 370 245 Q 460 230 550 220 Q 640 215 670 245 L 610 275 Z"
                      fill="#334155"
                      stroke="#64748b"
                      strokeWidth="2.5"
                    />
                    {/* Pillion Grab Rail */}
                    <path d="M 645 235 L 685 240 L 670 265" fill="none" stroke="#94a3b8" strokeWidth="4" strokeLinecap="round" />
                  </g>

                  {/* 13. CAD DIMENSION LEADER LINES (Toggleable) */}
                  {showDimensions && (
                    <g opacity="0.85" className="pointer-events-none">
                      {/* Wheelbase Dimension Line: 1,380 mm (Between axle centers 220 and 690) */}
                      <line x1="220" y1="520" x2="690" y2="520" stroke="#38bdf8" strokeWidth="1.5" />
                      <line x1="220" y1="485" x2="220" y2="530" stroke="#38bdf8" strokeWidth="1" />
                      <line x1="690" y1="485" x2="690" y2="530" stroke="#38bdf8" strokeWidth="1" />
                      <text x="455" y="515" textAnchor="middle" fill="#38bdf8" fontSize="11" fontFamily="monospace" fontWeight="bold">
                        ◄ WHEELBASE: 1,380 mm ►
                      </text>

                      {/* Ground Clearance Callout: 175 mm */}
                      <line x1="420" y1="424" x2="420" y2="490" stroke="#fbbf24" strokeWidth="1.5" />
                      <line x1="410" y1="424" x2="430" y2="424" stroke="#fbbf24" strokeWidth="1" />
                      <text x="435" y="460" fill="#fbbf24" fontSize="10" fontFamily="monospace" fontWeight="bold">
                        175 mm CLEARANCE
                      </text>

                      {/* Seat Height Callout: 785 mm */}
                      <line x1="710" y1="230" x2="710" y2="490" stroke="#a78bfa" strokeWidth="1.5" />
                      <line x1="660" y1="230" x2="720" y2="230" stroke="#a78bfa" strokeWidth="1" />
                      <text x="725" y="360" fill="#a78bfa" fontSize="10" fontFamily="monospace" fontWeight="bold">
                        SEAT: 785 mm
                      </text>
                    </g>
                  )}
                </g>
              )}

              {/* ----------------------------------------------------
                  VIEW ANGLE 2: DORSAL / TOP-DOWN CHASSIS ARCHITECTURE
              ---------------------------------------------------- */}
              {viewAngle === 'top' && (
                <g>
                  {/* Centerline Axis */}
                  <line x1="50" y1="280" x2="850" y2="280" stroke="#38bdf8" strokeWidth="1" strokeDasharray="10 5" />
                  <text x="70" y="270" fill="#38bdf8" fontSize="10" fontFamily="monospace">CENTERLINE CL 0.00</text>

                  {/* Front Tire (Top Profile) */}
                  <rect x="180" y="250" width="80" height="60" rx="8" fill="url(#cadTireGrad)" stroke="#64748b" strokeWidth="4" />
                  {/* Front Axle */}
                  <line x1="220" y1="210" x2="220" y2="350" stroke="#94a3b8" strokeWidth="6" />

                  {/* Handlebars */}
                  <line x1="260" y1="170" x2="260" y2="390" stroke="#94a3b8" strokeWidth="8" strokeLinecap="round" />
                  <circle cx="260" cy="280" r="14" fill="#0284c7" stroke="#7dd3fc" strokeWidth="2" />

                  {/* Twin Cradle Steel Frame Spars */}
                  <path d="M 260 280 L 330 220 L 540 220 L 620 250 L 680 250" fill="none" stroke="#0d9488" strokeWidth="8" />
                  <path d="M 260 280 L 330 340 L 540 340 L 620 310 L 680 310" fill="none" stroke="#0d9488" strokeWidth="8" />

                  {/* Floorboard Battery Pack (Top View: 45 Prismatic Cells in 3 rows) */}
                  <g onClick={() => setActiveHotspotId('battery-pack')} className="cursor-pointer">
                    <rect x="340" y="225" width="180" height="110" rx="10" fill="#042f2e" stroke="#2dd4bf" strokeWidth="3" />
                    {/* Cell Array Matrix */}
                    {[0, 20, 40, 60, 80, 100, 120, 140, 160].map((cx, i) => (
                      <g key={i}>
                        <rect x={348 + cx} y="233" width="14" height="30" rx="2" fill="url(#cadLfpCell)" stroke="#10b981" strokeWidth="0.5" />
                        <rect x={348 + cx} y="265" width="14" height="30" rx="2" fill="url(#cadLfpCell)" stroke="#10b981" strokeWidth="0.5" />
                        <rect x={348 + cx} y="297" width="14" height="30" rx="2" fill="url(#cadLfpCell)" stroke="#10b981" strokeWidth="0.5" />
                      </g>
                    ))}
                    <text x="430" y="284" textAnchor="middle" fill="#ffffff" fontSize="12" fontWeight="bold" fontFamily="monospace">
                      45S1P LFP CELL MATRIX
                    </text>
                  </g>

                  {/* Mid-Drive Motor (Transverse Mounting) */}
                  <rect x="535" y="245" width="55" height="70" rx="10" fill="url(#cadMotorStator)" stroke="#38bdf8" strokeWidth="3" />
                  <circle cx="562" cy="280" r="16" fill="#0f172a" stroke="#ffffff" strokeWidth="2" />

                  {/* Gates Belt Line (Left-side transmission) */}
                  <line x1="562" y1="240" x2="685" y2="240" stroke="#38bdf8" strokeWidth="5" strokeDasharray="6 3" />

                  {/* Rear Wheel (Top Profile) */}
                  <rect x="650" y="245" width="90" height="70" rx="10" fill="url(#cadTireGrad)" stroke="#64748b" strokeWidth="4" />
                  <line x1="685" y1="220" x2="685" y2="340" stroke="#94a3b8" strokeWidth="6" />

                  {/* Top-Down Width Callout: 680 mm Handlebar Width */}
                  <line x1="260" y1="160" x2="260" y2="140" stroke="#38bdf8" strokeWidth="1" />
                  <line x1="260" y1="400" x2="260" y2="420" stroke="#38bdf8" strokeWidth="1" />
                  <text x="280" y="145" fill="#38bdf8" fontSize="10" fontFamily="monospace">BAR WIDTH: 740 mm</text>
                  <text x="430" y="365" textAnchor="middle" fill="#2dd4bf" fontSize="10" fontFamily="monospace">PACK WIDTH: 320 mm</text>
                </g>
              )}

              {/* ----------------------------------------------------
                  HOTSPOT PINS (Numbered Interactive Targets)
              ---------------------------------------------------- */}
              {viewAngle === 'side' && filteredHotspots.map((node) => {
                const isSelected = node.id === activeHotspotId;
                const svgX = (node.xPercent / 100) * 900;
                const svgY = (node.yPercent / 100) * 560;

                return (
                  <g 
                    key={node.id} 
                    onClick={() => setActiveHotspotId(node.id)}
                    className="cursor-pointer transition-all duration-300"
                  >
                    {/* Ping Ring for Selected Node */}
                    {isSelected && (
                      <circle cx={svgX} cy={svgY} r="22" fill="none" stroke="#2dd4bf" strokeWidth="2" opacity="0.8" className="animate-ping" />
                    )}
                    {/* Node Base Circle */}
                    <circle
                      cx={svgX}
                      cy={svgY}
                      r={isSelected ? 16 : 13}
                      fill={isSelected ? '#0d9488' : '#0f172a'}
                      stroke={isSelected ? '#ffffff' : '#2dd4bf'}
                      strokeWidth={isSelected ? 2.5 : 1.5}
                      filter="url(#softGlow)"
                    />
                    {/* Node Number */}
                    <text
                      x={svgX}
                      y={svgY + 4}
                      textAnchor="middle"
                      fill="#ffffff"
                      fontSize={isSelected ? '12' : '10'}
                      fontWeight="bold"
                      fontFamily="monospace"
                    >
                      {node.number}
                    </text>
                  </g>
                );
              })}

            </svg>

          </div>

          {/* Hotspot Part Quick Strip */}
          <div className="grid grid-cols-4 sm:grid-cols-8 gap-2 mt-4 pt-3 border-t border-slate-100">
            {HOTSPOTS.map((h) => {
              const isSelected = h.id === activeHotspotId;
              return (
                <button
                  key={h.id}
                  type="button"
                  onClick={() => setActiveHotspotId(h.id)}
                  className={`p-2 rounded-xl text-left border transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-teal-50 border-teal-500 ring-2 ring-teal-400 text-teal-950 shadow-xs'
                      : 'bg-white hover:bg-slate-50 border-slate-200 text-slate-700'
                  }`}
                >
                  <span className="font-mono text-[9px] font-black block text-teal-800">
                    Node #{h.number}
                  </span>
                  <span className="text-[11px] font-bold line-clamp-1">
                    {h.name.split(' ')[0]}
                  </span>
                </button>
              );
            })}
          </div>

        </div>

        {/* Right: Detailed Engineering Part Spec Sheet (5 Cols) */}
        <div className="lg:col-span-5 bg-white rounded-3xl border border-slate-200 shadow-sm p-6 sm:p-8 flex flex-col justify-between space-y-6">
          
          <div>
            {/* Header Badge */}
            <div className="flex items-center justify-between gap-2 mb-2">
              <span className="text-[10px] font-mono uppercase tracking-widest font-extrabold text-teal-800 bg-teal-100/90 px-2.5 py-0.5 rounded">
                Node 0{selectedHotspot.number} // {selectedHotspot.category}
              </span>
              <span className="text-[11px] font-mono text-slate-500 font-bold">
                PART NO: {selectedHotspot.partNo}
              </span>
            </div>

            <h3 className="text-xl sm:text-2xl font-display font-black text-slate-900">
              {selectedHotspot.name}
            </h3>

            {/* Spec Highlight Pill */}
            <div className="mt-2.5 p-3 rounded-xl bg-teal-50 border border-teal-200 text-xs font-mono font-bold text-teal-900 flex items-center gap-2">
              <Zap className="w-4 h-4 text-teal-600 shrink-0" />
              <span>{selectedHotspot.specHighlight}</span>
            </div>

            <p className="mt-4 text-xs sm:text-sm text-slate-600 leading-relaxed">
              {selectedHotspot.summary}
            </p>

            {/* Material & Weight Telemetry Grid */}
            <div className="grid grid-cols-2 gap-2 mt-4 text-xs font-mono">
              <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200">
                <span className="text-slate-500 block text-[9px] uppercase font-bold">Materials & Alloys:</span>
                <span className="text-slate-800 font-semibold text-[11px] leading-tight block mt-0.5">
                  {selectedHotspot.material.split(' • ')[0]}
                </span>
              </div>
              <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200">
                <span className="text-slate-500 block text-[9px] uppercase font-bold">Subsystem Weight:</span>
                <span className="text-teal-800 font-bold text-[11px] leading-tight block mt-0.5">
                  {selectedHotspot.weightKg}
                </span>
              </div>
            </div>

            {/* Voltage & Thermal Characteristics */}
            <div className="mt-3 p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs font-mono space-y-1">
              <div>
                <span className="text-slate-500 block text-[9px] uppercase font-bold">
                  ⚡ Voltage & Electrical Flow:
                </span>
                <span className="text-slate-800 font-bold text-[11px]">
                  {selectedHotspot.voltageCurrent}
                </span>
              </div>
              <div className="pt-1 border-t border-slate-200/60">
                <span className="text-slate-500 block text-[9px] uppercase font-bold">
                  🌡️ Thermal Thresholds:
                </span>
                <span className="text-slate-700 text-[11px]">
                  {selectedHotspot.thermalSpec}
                </span>
              </div>
            </div>

            {/* Engineering Highlights Checklist */}
            <div className="mt-5 space-y-2">
              <span className="text-xs font-mono font-bold uppercase text-slate-900 block">
                Technical Architecture Highlights:
              </span>
              <ul className="space-y-2 text-xs text-slate-700">
                {selectedHotspot.engineeringDetails.map((detail, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-teal-600 shrink-0 mt-0.5" />
                    <span>{detail}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Bangladesh Road Environmental Hardening */}
            <div className="mt-5 p-4 rounded-2xl bg-amber-50/70 border border-amber-200 text-xs">
              <div className="flex items-center gap-1.5 text-amber-900 font-bold font-mono uppercase text-[11px] mb-1">
                <Shield className="w-4 h-4 text-amber-700" />
                <span>Bangladesh Operating Hardening:</span>
              </div>
              <p className="text-slate-700 leading-relaxed font-normal">
                {selectedHotspot.bangladeshContext}
              </p>
            </div>
          </div>

          {/* Bottom Hotspot Navigator */}
          <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs font-mono">
            <span className="text-slate-500">
              Inspecting node {selectedHotspot.number} of {HOTSPOTS.length}
            </span>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => {
                  const currIdx = HOTSPOTS.findIndex(h => h.id === activeHotspotId);
                  const prevIdx = (currIdx - 1 + HOTSPOTS.length) % HOTSPOTS.length;
                  setActiveHotspotId(HOTSPOTS[prevIdx].id);
                }}
                className="px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold transition-colors cursor-pointer"
              >
                Previous
              </button>
              <button
                type="button"
                onClick={() => {
                  const currIdx = HOTSPOTS.findIndex(h => h.id === activeHotspotId);
                  const nextIdx = (currIdx + 1) % HOTSPOTS.length;
                  setActiveHotspotId(HOTSPOTS[nextIdx].id);
                }}
                className="px-3 py-1.5 rounded-lg bg-teal-600 hover:bg-teal-700 text-white font-bold transition-colors cursor-pointer flex items-center gap-1"
              >
                <span>Next Node</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

        </div>

      </div>

    </section>
  );
};
