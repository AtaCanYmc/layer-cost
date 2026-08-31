import type { CalculationInputs, CalculationResults, Currency, Language } from '../types/calculator';

export const calculateCost = (inputs: CalculationInputs): CalculationResults => {
  // 1. Baskı Süresi (Toplam Saat)
  const totalPrintTimeHours = Math.max(0, inputs.printHours + (inputs.printMinutes / 60));
  const totalLaborTimeHours = Math.max(0, inputs.laborMinutes / 60);

  // 2. Filament Maliyeti: (Makara Fiyatı / Makara Ağırlığı) * Harcanan Gram
  const spoolWeight = inputs.spoolWeight > 0 ? inputs.spoolWeight : 1000;
  const costPerGram = inputs.spoolPrice / spoolWeight;
  const filamentCost = Math.max(0, costPerGram * inputs.printWeight);

  // 3. Elektrik Maliyeti: (Yazıcı Gücü Watt / 1000) * Baskı Süresi (Saat) * Elektrik kWh Fiyatı
  const electricityCost = Math.max(
    0,
    (inputs.printerPower / 1000) * totalPrintTimeHours * inputs.electricityPrice
  );

  // 4. Amortisman (Yıpranma): (Yazıcı Fiyatı / Yazıcı Tahmini Ömrü Saat) * Baskı Süresi (Saat)
  const lifespanHours = inputs.printerLifespanHours > 0 ? inputs.printerLifespanHours : 4000;
  const depreciationPerHour = inputs.printerPrice / lifespanHours;
  const depreciationCost = Math.max(0, depreciationPerHour * totalPrintTimeHours);

  // 5. İşçilik Maliyeti: (İşçilik Süresi Dakika / 60) * Saatlik Ücret
  const laborCost = Math.max(0, totalLaborTimeHours * inputs.hourlyLaborRate);

  // 6. Ekstra Malzemeler (Paketleme, donanım vs.)
  const additionalCosts = Math.max(0, inputs.additionalCosts || 0);

  // 7. Toplam Temel Maliyet: Filament + Elektrik + Amortisman + İşçilik + Ekstralar
  const baseCost = filamentCost + electricityCost + depreciationCost + laborCost + additionalCosts;

  // 8. Riskli Maliyet: Toplam Temel Maliyet * (1 + Hata/Fire Payı Yüzdesi)
  const failureRateMultiplier = Math.max(0, inputs.failureRatePercent) / 100;
  const riskAmount = baseCost * failureRateMultiplier;
  const riskCost = baseCost * (1 + failureRateMultiplier);

  // 9. Nihai Satış Fiyatı: Riskli Maliyet * (1 + Kar Marjı Yüzdesi)
  const profitMarginMultiplier = Math.max(0, inputs.profitMarginPercent) / 100;
  const profitAmount = riskCost * profitMarginMultiplier;
  const finalPrice = riskCost * (1 + profitMarginMultiplier);

  // Saat başı maliyet ve yüzdeler
  const costPerHour = totalPrintTimeHours > 0 ? baseCost / totalPrintTimeHours : 0;

  const totalForPercentages = finalPrice > 0 ? finalPrice : 1;
  const percentages = {
    filament: (filamentCost / totalForPercentages) * 100,
    electricity: (electricityCost / totalForPercentages) * 100,
    depreciation: (depreciationCost / totalForPercentages) * 100,
    labor: (laborCost / totalForPercentages) * 100,
    additional: (additionalCosts / totalForPercentages) * 100,
    risk: (riskAmount / totalForPercentages) * 100,
    profit: (profitAmount / totalForPercentages) * 100,
  };

  return {
    filamentCost,
    electricityCost,
    depreciationCost,
    laborCost,
    additionalCosts,
    baseCost,
    riskAmount,
    riskCost,
    profitAmount,
    finalPrice,
    totalPrintTimeHours,
    totalLaborTimeHours,
    costPerGram,
    costPerHour,
    percentages,
  };
};

export const formatCurrency = (amount: number, currency: Currency = 'TRY', lang: Language = 'tr'): string => {
  const symbols: Record<Currency, string> = {
    TRY: '₺',
    USD: '$',
    EUR: '€',
    GBP: '£',
  };

  const locale = lang === 'en' ? 'en-US' : 'tr-TR';

  const formatted = new Intl.NumberFormat(locale, {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(isNaN(amount) ? 0 : amount);

  if (lang === 'en') {
    return `${symbols[currency] || '$'}${formatted}`;
  }
  return `${formatted} ${symbols[currency] || '₺'}`;
};

export const formatHoursMinutes = (hours: number, minutes: number, lang: Language = 'tr'): string => {
  const totalMins = Math.round(hours * 60 + minutes);
  const h = Math.floor(totalMins / 60);
  const m = totalMins % 60;
  
  if (lang === 'en') {
    if (h === 0) return `${m} min`;
    if (m === 0) return `${h} hrs`;
    return `${h} hrs ${m} min`;
  }

  if (h === 0) return `${m} dk`;
  if (m === 0) return `${h} sa`;
  return `${h} sa ${m} dk`;
};
