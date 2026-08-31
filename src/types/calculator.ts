export type Currency = 'TRY' | 'USD' | 'EUR' | 'GBP';
export type Language = 'tr' | 'en';
export type Theme = 'dark' | 'light';

export interface CalculationInputs {
  // Proje Bilgileri
  projectName: string;
  clientName: string;
  notes: string;
  currency: Currency;

  // Filament Bilgileri
  filamentType: string;
  spoolPrice: number;       // Makara Fiyatı
  spoolWeight: number;      // Makara Gramajı (gr) örn: 1000
  printWeight: number;      // Harcanan Gramaj (gr)

  // Yazıcı & Elektrik
  printerName: string;
  printerPower: number;     // Yazıcı Gücü (Watt)
  printHours: number;       // Baskı Süresi (Saat)
  printMinutes: number;     // Baskı Süresi (Dakika)
  electricityPrice: number; // kWh Elektrik Fiyatı
  printerPrice: number;     // Yazıcı Satın Alma Fiyatı
  printerLifespanHours: number; // Tahmini Yazıcı Ömrü (Saat) örn: 4000

  // İşçilik & Ekstralar
  laborMinutes: number;     // İşçilik Süresi (Dakika)
  hourlyLaborRate: number;  // Saatlik İşçilik Ücreti
  additionalCosts: number;  // Ekstra Malzeme / Sarf (Vida, Kutu, Alkol vb.)

  // Risk & Kar
  failureRatePercent: number; // Hata/Fire Payı (%) örn: 10
  profitMarginPercent: number;// Kar Marjı (%) örn: 40
}

export type InputValue = string | number | Currency;

export interface CalculationResults {
  filamentCost: number;
  electricityCost: number;
  depreciationCost: number;
  laborCost: number;
  additionalCosts: number;
  baseCost: number;        // Toplam Temel Maliyet
  riskAmount: number;      // Fire Payı Tutarı
  riskCost: number;        // Riskli Maliyet (Temel + Fire)
  profitAmount: number;    // Net Kar Tutarı
  finalPrice: number;      // Nihai Satış Fiyatı (Riskli + Kar)
  totalPrintTimeHours: number;
  totalLaborTimeHours: number;
  costPerGram: number;
  costPerHour: number;
  percentages: {
    filament: number;
    electricity: number;
    depreciation: number;
    labor: number;
    additional: number;
    risk: number;
    profit: number;
  };
}

export interface SavedProfile {
  id: string;
  name: string;
  type: 'printer' | 'filament' | 'full';
  createdAt: string;
  updatedAt: string;
  data: Partial<CalculationInputs>;
  isDefault?: boolean;
}
