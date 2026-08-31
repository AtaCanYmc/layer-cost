import type { CalculationInputs } from '../types/calculator';

export interface PrinterPreset {
  id: string;
  name: string;
  brand: string;
  powerWatt: number;
  price: number;
  lifespanHours: number;
}

export interface FilamentPreset {
  id: string;
  name: string;
  type: string;
  spoolPrice: number;
  spoolWeight: number;
}

export const PRINTER_PRESETS: PrinterPreset[] = [
  {
    id: 'bambu-x1c',
    name: 'Bambu Lab X1-Carbon',
    brand: 'Bambu Lab',
    powerWatt: 350,
    price: 45000,
    lifespanHours: 5000,
  },
  {
    id: 'bambu-p1s',
    name: 'Bambu Lab P1S',
    brand: 'Bambu Lab',
    powerWatt: 280,
    price: 32000,
    lifespanHours: 5000,
  },
  {
    id: 'bambu-a1',
    name: 'Bambu Lab A1',
    brand: 'Bambu Lab',
    powerWatt: 220,
    price: 21000,
    lifespanHours: 4000,
  },
  {
    id: 'bambu-a1-mini',
    name: 'Bambu Lab A1 Mini',
    brand: 'Bambu Lab',
    powerWatt: 160,
    price: 13500,
    lifespanHours: 4000,
  },
  {
    id: 'creality-k1',
    name: 'Creality K1 / K1 Max',
    brand: 'Creality',
    powerWatt: 350,
    price: 25000,
    lifespanHours: 4000,
  },
  {
    id: 'creality-ender-3-v3',
    name: 'Creality Ender 3 V3 SE/KE',
    brand: 'Creality',
    powerWatt: 200,
    price: 9500,
    lifespanHours: 3500,
  },
  {
    id: 'prusa-mk4',
    name: 'Prusa MK4S',
    brand: 'Prusa',
    powerWatt: 200,
    price: 38000,
    lifespanHours: 6000,
  },
  {
    id: 'elegoo-neptune-4',
    name: 'Elegoo Neptune 4 Pro',
    brand: 'Elegoo',
    powerWatt: 250,
    price: 12000,
    lifespanHours: 3500,
  },
];

export const FILAMENT_PRESETS: FilamentPreset[] = [
  {
    id: 'pla-standard',
    name: 'Standart PLA (1kg)',
    type: 'PLA',
    spoolPrice: 450,
    spoolWeight: 1000,
  },
  {
    id: 'pla-plus',
    name: 'PLA+ / Tough PLA (1kg)',
    type: 'PLA+',
    spoolPrice: 550,
    spoolWeight: 1000,
  },
  {
    id: 'petg-standard',
    name: 'Standart PETG (1kg)',
    type: 'PETG',
    spoolPrice: 500,
    spoolWeight: 1000,
  },
  {
    id: 'abs-standard',
    name: 'Standart ABS (1kg)',
    type: 'ABS',
    spoolPrice: 480,
    spoolWeight: 1000,
  },
  {
    id: 'tpu-flexible',
    name: 'TPU Esnek Filament (1kg)',
    type: 'TPU',
    spoolPrice: 750,
    spoolWeight: 1000,
  },
  {
    id: 'asa-uv',
    name: 'ASA Dış Mekan (1kg)',
    type: 'ASA',
    spoolPrice: 680,
    spoolWeight: 1000,
  },
  {
    id: 'cf-pla',
    name: 'Karbon Fiber PLA (1kg)',
    type: 'PLA-CF',
    spoolPrice: 950,
    spoolWeight: 1000,
  },
  {
    id: 'resin-standard',
    name: 'Standart UV Reçine (1kg)',
    type: 'Reçine',
    spoolPrice: 850,
    spoolWeight: 1000,
  },
];

export const DEFAULT_INPUTS: CalculationInputs = {
  projectName: '3D Proje Baskısı',
  clientName: '',
  notes: '0.20mm katman kalınlığı, %20 doluluk',
  currency: 'TRY',

  // Filament
  filamentType: 'PLA',
  spoolPrice: 500,
  spoolWeight: 1000,
  printWeight: 120,

  // Yazıcı & Elektrik
  printerName: 'Bambu Lab P1S',
  printerPower: 280,
  printHours: 4,
  printMinutes: 30,
  electricityPrice: 2.85,
  printerPrice: 32000,
  printerLifespanHours: 5000,

  // İşçilik & Ekstralar
  laborMinutes: 20,
  hourlyLaborRate: 350,
  additionalCosts: 15,

  // Risk & Kar
  failureRatePercent: 10,
  profitMarginPercent: 40,
};
