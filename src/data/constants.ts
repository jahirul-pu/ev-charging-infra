import type { CorridorStop, ChargingTier, StationEconomics } from '../types';

export const VEHICLE_BASELINE = {
  name: "Current Prototype Baseline",
  batteryKwh: 2.5,
  rangeKm: 80,
  cruiseSpeedKmh: 60,
  efficiencyWhKm: 31.25,
  voltageNominal: 72,
  onboardChargerKw: 1.2,
  rechargeTimeHours: 2.5
};

export const VEHICLE_TARGET = {
  name: "PULSE 150 (Flagship Prototype)",
  batteryKwh: 5.4,
  realWorldRangeKm: 150,
  cruisingSpeedKmh: "60 – 90",
  peakSpeedKmh: 105,
  targetWhKm: 36, // realistic highway blend
  nominalVoltageV: 120, // 96V - 144V range
  fastAcPowerKw: 7.2,
  fastDcPowerKw: 20,
  curbWeightKg: 118,
  motorType: "High-Efficiency Interior PMSM (Liquid/Passive Cooled)",
  peakPowerKw: 12.5,
  continuousPowerKw: 7.0,
  chemistry: "High-Rate Prismatic LFP (LiFePO4)"
};

export const CORRIDOR_STOPS: CorridorStop[] = [
  {
    id: "dhaka",
    name: "Dhaka Hub (Jatrabari / Kanchpur)",
    distanceKm: 0,
    type: "origin",
    recommendedStop: false,
    amenities: ["Depot Chargers", "Fast Diagnostic", "Lounge"],
    partnerType: "Flagship Terminal",
    avgDwellMinutes: 0,
    coordinates: { x: 12, y: 25 },
    description: "Journey origin. Vehicles depart with 100% SoC (5.4 kWh)."
  },
  {
    id: "daudkandi",
    name: "Daudkandi Toll & Meghna Hub",
    distanceKm: 42,
    type: "hub",
    recommendedStop: false,
    amenities: ["Quick Tea / Snacks", "Tire Pressure", "2x 7.2 kW AC"],
    partnerType: "Highway Petrol Station",
    avgDwellMinutes: 10,
    coordinates: { x: 30, y: 38 },
    description: "Emergency buffer & quick top-up station right after the Meghna Bridge."
  },
  {
    id: "cumilla",
    name: "Cumilla / Chauddagram Oasis",
    distanceKm: 108,
    type: "hub",
    recommendedStop: true,
    amenities: ["Air-Conditioned Dining", "Restrooms", "Prayer Hall", "4x 7.2 kW AC + 2x 20 kW DC"],
    partnerType: "Premier Highway Hotel & Diner",
    avgDwellMinutes: 28,
    coordinates: { x: 55, y: 55 },
    description: "THE PRIME CHARGE & DINE HUB: Perfect lunch stop at ~108 km. 25-30 min meal equals full 20% to 80%+ charge."
  },
  {
    id: "feni",
    name: "Feni Bypass Oasis",
    distanceKm: 168,
    type: "hub",
    recommendedStop: false,
    amenities: ["Coffee Shop", "Convenience Store", "2x 7.2 kW AC + 1x 20 kW DC"],
    partnerType: "24/7 Mega Petrol Pump",
    avgDwellMinutes: 15,
    coordinates: { x: 74, y: 72 },
    description: "Redundancy and confidence hub. Ideal for riders cruising at 85+ km/h needing a 10-minute tea top-up."
  },
  {
    id: "chattogram",
    name: "Chattogram Terminal (Agrabad / City Gate)",
    distanceKm: 245,
    type: "destination",
    recommendedStop: false,
    amenities: ["Destination Overnight Chargers", "Battery Swap Ready", "Service Center"],
    partnerType: "Port City Hub",
    avgDwellMinutes: 0,
    coordinates: { x: 92, y: 88 },
    description: "Corridor terminus reached with healthy safety reserve."
  }
];

export const CHARGING_TIERS: ChargingTier[] = [
  {
    id: "home_ac",
    name: "Standard AC (Home/Overnight)",
    powerKw: 3.3,
    type: "AC",
    targetLocation: "Residential / Workplace / Depot",
    time0to100Min: 98,
    time20to80Min: 59,
    cRate5kWh: 0.66,
    infrastructureCostBdt: "৳ 15,000 – 35,000",
    pros: ["Zero grid upgrade required", "Gentle on battery longevity", "Lowest deployment CAPEX"],
    cons: ["Unusable for highway turnaround", "Rider idle time is prohibitive"]
  },
  {
    id: "highway_ac",
    name: "7.2 kW Fast AC (Highway Diner Standard)",
    powerKw: 7.2,
    type: "AC",
    targetLocation: "Highway Hotels, Restaurants & Petrol Pumps",
    time0to100Min: 45,
    time20to80Min: 25,
    cRate5kWh: 1.44,
    infrastructureCostBdt: "৳ 45,000 – 95,000 / point",
    pros: ["Extremely affordable host CAPEX", "Zero high-voltage DC converter cabinet needed on site", "Matches natural 25–35 min meal time perfectly"],
    cons: ["Requires 7.2 kW onboard charger on vehicle (~4–6 kg added)"]
  },
  {
    id: "rapid_dc_15",
    name: "15 kW DC Fast Charge",
    powerKw: 15.0,
    type: "DC",
    targetLocation: "Busy Highway Intersections & Petrol Hubs",
    time0to100Min: 22,
    time20to80Min: 12,
    cRate5kWh: 3.0,
    infrastructureCostBdt: "৳ 6.5 – 9.0 Lakh / unit",
    pros: ["True quick-stop (12 min for 60% battery)", "Vehicle does not carry heavy onboard charger", "Works for 2W, 3W, and small EVs"],
    cons: ["Requires high-voltage vehicle pack (96V–144V) and active thermal monitoring"]
  },
  {
    id: "ultra_dc_25",
    name: "20–25 kW DC Supercharge",
    powerKw: 22.0,
    type: "DC",
    targetLocation: "Flagship Highway Hubs (Cumilla / Feni)",
    time0to100Min: 15,
    time20to80Min: 8.5,
    cRate5kWh: 4.4,
    infrastructureCostBdt: "৳ 12.0 – 16.0 Lakh / unit",
    pros: ["Sub-10 minute turnaround", "Instant convenience store or restroom pitstop", "Highest throughput and revenue per bay"],
    cons: ["High C-rate requires premium high-power LFP cells and advanced thermal dissipation"]
  }
];

export const VOLTAGE_ANALYSIS = [
  {
    voltage: 72,
    currentAt20kW: 277.8,
    cableGauge: "50 mm² (Very Heavy & Stiff)",
    heatDissipationI2R: "100% (Baseline - Extreme thermal strain)",
    bmsComplexity: "High current MOSFETs / Contactor welding risk",
    feasibility: "Not Viable for 20kW DC Fast Charge"
  },
  {
    voltage: 96,
    currentAt20kW: 208.3,
    cableGauge: "35 mm² (Heavy)",
    heatDissipationI2R: "56% of 72V baseline",
    bmsComplexity: "Moderate, requires heavy copper busbars",
    feasibility: "Challenging but doable with liquid cooling"
  },
  {
    voltage: 120,
    currentAt20kW: 166.7,
    cableGauge: "25 mm² (Flexible & Ergonomic)",
    heatDissipationI2R: "36% of 72V baseline",
    bmsComplexity: "Standard automotive 2W architecture",
    feasibility: "Optimal Sweet Spot for Cost vs Packaging"
  },
  {
    voltage: 144,
    currentAt20kW: 138.9,
    cableGauge: "16–20 mm² (Lightweight & Compact)",
    heatDissipationI2R: "25% of 72V baseline (75% Heat Reduction!)",
    bmsComplexity: "High-voltage certified, compact connectors",
    feasibility: "Engineering Gold Standard for 15-25kW Rapid Charge"
  }
];

export const BATTERY_CHEMISTRY_COMPARISON = [
  {
    metric: "Nominal Cell Chemistry",
    lfp: "LFP (LiFePO4)",
    nmc: "NMC 811 / Ternary",
    significance: "Determines thermal runaway threshold and safety margin"
  },
  {
    metric: "Thermal Runaway Temp",
    lfp: "~270°C (Extremely Safe in Tropical Heat)",
    nmc: "~210°C (Requires aggressive active cooling)",
    significance: "Crucial for Bangladesh summer ambient temps (38°C–42°C)"
  },
  {
    metric: "Cycle Life @ 1.5C Fast Charge",
    lfp: "3,000 – 4,500 Cycles (>80% SOH)",
    nmc: "1,200 – 1,800 Cycles",
    significance: "Equivalent to 450,000 km lifespan on LFP vs 180,000 km on NMC"
  },
  {
    metric: "Pack Gravimetric Density",
    lfp: "135 – 155 Wh/kg (Pack level)",
    nmc: "190 – 220 Wh/kg (Pack level)",
    significance: "5.4 kWh pack weighs ~38 kg (LFP) vs ~27 kg (NMC). 11 kg difference easily offset by aero"
  },
  {
    metric: "Raw Pack Cost ($/kWh)",
    lfp: "$65 – $75 / kWh",
    nmc: "$95 – $115 / kWh",
    significance: "LFP enables 30–40% cheaper battery replacement and BOM"
  },
  {
    metric: "Fast-Charge Tolerance",
    lfp: "Modern blade/prismatic cells support 2C–3C sustained",
    nmc: "High energy cells suffer accelerated lithium plating under repeated 3C+",
    significance: "LFP provides bulletproof predictability for highway corridor duty"
  }
];

export const STATION_CAPEX_MODELS: Record<string, StationEconomics> = {
  ac_cluster: {
    stationType: "ac_cluster",
    name: "Phase 1: 5x 7.2 kW AC Highway Hub",
    capexMin: 3.5, // Lakh BDT
    capexMax: 6.5,
    installedKw: 36,
    gridDemandKw: 36,
    dailyCapacityKwh: 350
  },
  dc_fast: {
    stationType: "dc_fast",
    name: "Phase 2: 25 kW Dual-Gun DC Fast Station",
    capexMin: 14.0,
    capexMax: 22.0,
    installedKw: 50,
    gridDemandKw: 45,
    dailyCapacityKwh: 500
  },
  battery_buffered: {
    stationType: "battery_buffered",
    name: "Phase 3: 50 kW Peak / 75 kWh BESS Micro-Hub",
    capexMin: 26.0,
    capexMax: 42.0,
    installedKw: 60,
    gridDemandKw: 20, // grid peak shaving
    dailyCapacityKwh: 650
  }
};

export const PARTNERSHIP_MODELS = [
  {
    id: "model_revshare",
    title: "Model A: Pure Revenue Share",
    subtitle: "Recommended for Low-Risk Scaled Rollout",
    sharePercent: "12% – 15% of Gross Revenue",
    upfrontHostCost: "৳ 0 (Zero Capital from Host)",
    guaranteedFloor: "৳ 0",
    pros: [
      "No capital expenditure or electrical risk for the host",
      "Host benefits directly as EV corridor traffic expands",
      "Aligns host incentive to keep charging bays clear of parked petrol cars"
    ],
    hostEarningsEstimate: "৳ 18,000 – 45,000 / month per station as traffic grows",
    idealFor: "High-volume highway restaurants and food courts"
  },
  {
    id: "model_hybrid",
    title: "Model B: Guaranteed Base + Rev Share",
    subtitle: "Best for Prime Petrol Pump Forecourts",
    sharePercent: "7.5% of Gross Revenue",
    upfrontHostCost: "৳ 0",
    guaranteedFloor: "৳ 15,000 / month guaranteed",
    pros: [
      "Guaranteed monthly cash flow regardless of early EV adoption speed",
      "Upside participation when holiday & weekend traffic surges",
      "Covers parking slot opportunity cost immediately"
    ],
    hostEarningsEstimate: "৳ 25,000 – 50,000 / month predictable return",
    idealFor: "Major highway petrol stations on the N1 corridor"
  },
  {
    id: "model_fixed",
    title: "Model C: Fixed Bay Lease",
    subtitle: "Conventional Real Estate Lease",
    sharePercent: "0% Revenue Share",
    upfrontHostCost: "৳ 0",
    guaranteedFloor: "৳ 25,000 – 35,000 / month fixed rent",
    pros: [
      "100% predictable fixed rental income for the landowner",
      "Simpler accounting with no metering or revenue auditing required",
      "Fixed 3-5 year tenure with scheduled escalation"
    ],
    hostEarningsEstimate: "৳ 30,000 / month flat",
    idealFor: "Corporate petrol pump chains preferring standard ground leases"
  }
];

export const RD_VALIDATION_VECTORS = [
  {
    category: "Vehicle Powertrain",
    count: 10,
    items: [
      { q: "Empirical Wh/km vs Speed (40, 60, 70, 80, 90 km/h)", status: "Milestone 1 Test", priority: "CRITICAL" },
      { q: "Pack Voltage Selection (96V vs 120V vs 144V architecture)", status: "Architecture Defined", priority: "HIGH" },
      { q: "Motor Rating (Sustained highway cruising PMSM cooling)", status: "In Evaluation", priority: "HIGH" },
      { q: "Battery Cell Format (High-rate Prismatic vs Cylindrical 21700)", status: "Cell Supplier Sourcing", priority: "MEDIUM" },
      { q: "Passive vs Forced Air vs Liquid Thermal Management", status: "Simulation Phase", priority: "HIGH" }
    ]
  },
  {
    category: "Charging Architecture",
    count: 8,
    items: [
      { q: "Onboard 7.2 kW AC Charger weight & volume penalty", status: "BOM Sizing", priority: "CRITICAL" },
      { q: "Fast DC Connector standard (GB/T 20234.3 vs Type 2 combo / CHAdeMO)", status: "Standard Harmonization", priority: "HIGH" },
      { q: "BMS CAN-bus handshake & fast charge tapering curve", status: "Firmware Architecture", priority: "HIGH" },
      { q: "Grid Outage mitigation & automatic generator/solar failover", status: "Host Site Spec", priority: "MEDIUM" }
    ]
  },
  {
    category: "Highway Corridor Network",
    count: 8,
    items: [
      { q: "Exact location survey for Cumilla & Feni hub candidates", status: "Site Scouting", priority: "CRITICAL" },
      { q: "3-Phase 400V grid transformer capacity at host sites", status: "DESCO/BREB Audit", priority: "HIGH" },
      { q: "Host contract terms & parking bay ICEing enforcement", status: "Legal Template Ready", priority: "MEDIUM" },
      { q: "Current EV 2W/3W/4W highway traffic count benchmark", status: "Corridor Survey", priority: "HIGH" }
    ]
  },
  {
    category: "Unit Economics & Policy",
    count: 8,
    items: [
      { q: "Retail charging tariff regulatory legality in Bangladesh (BERC)", status: "Policy Review", priority: "HIGH" },
      { q: "Electricity cost per kWh under commercial EV charging tariff", status: "Tariff Analysis", priority: "HIGH" },
      { q: "Battery degradation cost per kWh cycled under 1.5C–3C charge", status: "Life-cycle Model", priority: "CRITICAL" },
      { q: "Vehicle BOM margin vs retail price tolerance", status: "Financial Plan", priority: "CRITICAL" }
    ]
  }
];
