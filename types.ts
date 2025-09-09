
export interface PipeParams {
  length: number; // metros
  diameter: number; // milímetros
  roughness: number; // milímetros
}

export interface FluidParams {
  flowRate: number; // litros por segundo
  kinematicViscosity: number; // cSt (centiStokes)
  density: number; // kg/m^3
}

export interface CalculationResult {
  headLossMeters: number; // metros
  pressureDropPascal: number; // Pascales
  pressureDropBar: number; // Bar
  velocity: number; // m/s
  reynoldsNumber: number; // adimensional
  frictionFactor: number; // adimensional
  flowRegime: 'Laminar' | 'Transición' | 'Turbulento';
  pressureMapData: { distance: number; pressureLoss: number }[];
}

export interface Material {
    name: string;
    roughness: number; // en mm
}
