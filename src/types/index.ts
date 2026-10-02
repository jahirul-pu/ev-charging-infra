export type AudienceRole = 'investor' | 'engineer' | 'partner';

export type ActiveDomain = 'all' | 'scooter' | 'network';

export interface CorridorStop {
  id: string;
  name: string;
  distanceKm: number;
  type: 'origin' | 'hub' | 'destination';
  recommendedStop: boolean;
  amenities: string[];
  partnerType: string;
  avgDwellMinutes: number;
  coordinates: { x: number; y: number };
  description: string;
}

export interface ChargingTier {
  id: string;
  name: string;
  powerKw: number;
  type: 'AC' | 'DC';
  targetLocation: string;
  time0to100Min: number;
  time20to80Min: number;
  cRate5kWh: number;
  infrastructureCostBdt: string;
  pros: string[];
  cons: string[];
}

export interface StationEconomics {
  stationType: 'ac_cluster' | 'dc_fast' | 'battery_buffered';
  name: string;
  capexMin: number; // in Lakh BDT
  capexMax: number;
  installedKw: number;
  gridDemandKw: number;
  dailyCapacityKwh: number;
}
