/**
 * Automotive domain types for the Lamborghini flagship web experience
 */

export interface CarModel {
  id: string;
  name: string;
  tagline: string;
  category: 'V12 HPEV' | 'V8 TWIN-TURBO HYBRID' | 'SUPER SUV' | 'V10 NATURALLY ASPIRATED';
  powerCV: number;
  topSpeedKmH: number;
  acceleration0To100: number; // in seconds
  torqueNm: number;
  engineDisplacement: string;
  transmission: string;
  driveType: string;
  weightKg: number;
  dimensions: {
    lengthMm: number;
    widthMm: number;
    heightMm: number;
    wheelbaseMm: number;
  };
  startingPriceUSD: number;
  description: string;
  heroHeadline: string;
  designPhilosophy: string;
  aerodynamicsStory: string;
  interiorStory: string;
  galleryImages: {
    id: string;
    title: string;
    caption: string;
    tag: string;
    accentColor: string;
  }[];
  accentColor: string;
  defaultColorHex: string;
}

export type AeroMode = 'STRADA' | 'SPORT' | 'CORSA';

export interface AeroTelemetry {
  downforceKg: number;
  dragCoefficient: number;
  wingAngleDeg: number;
  coolingAirflowPercent: number;
  activeStatus: string;
  description: string;
}

export interface HotspotAnnotation {
  id: string;
  title: string;
  category: string;
  position: [number, number, number];
  headline: string;
  description: string;
  specs: { label: string; value: string }[];
}

export interface ExteriorColorOption {
  id: string;
  name: string;
  category: string;
  hex: string;
  roughness: number;
  metalness: number;
  clearcoat: number;
}

export interface WheelOption {
  id: string;
  name: string;
  finish: string;
  sizeInch: number;
  colorHex: string;
  priceDelta: number;
}

export interface InteriorOption {
  id: string;
  name: string;
  theme: string;
  primaryHex: string;
  stitchHex: string;
  material: string;
  priceDelta: number;
}

export interface CaliperOption {
  id: string;
  name: string;
  hex: string;
}

export interface AeroPackageOption {
  id: string;
  name: string;
  downforceMultiplier: number;
  description: string;
  priceDelta: number;
}

export interface ConfiguratorState {
  modelId: string;
  exteriorColor: ExteriorColorOption;
  wheels: WheelOption;
  interior: InteriorOption;
  calipers: CaliperOption;
  aeroPackage: AeroPackageOption;
}

export interface TechFeature {
  id: string;
  code: string;
  title: string;
  tagline: string;
  overview: string;
  deepDive: string;
  metrics: { label: string; value: string }[];
}
