import React, { useState } from 'react';
import { 
  TrendingUp, 
  Check, 
  Copy, 
  BookmarkCheck, 
  ChevronDown, 
  ChevronUp, 
  Info
} from 'lucide-react';
import type { CalculationInputs, CalculationResults, Currency } from '../types/calculator';
import { formatCurrency, formatHoursMinutes } from '../utils/calculator';
import { CostBreakdownChart } from './CostBreakdownChart';

interface ResultsOverviewProps {
  inputs: CalculationInputs;
  results: CalculationResults;
  currency: Currency;
  onSaveProfile: () => void;
  onOpenQuote: () => void;
}

export const ResultsOverview: React.FC<ResultsOverviewProps> = ({
  inputs,
  results,
  currency,
  onSaveProfile,
}) => {
  const [copied, setCopied] = useState(false);
  const [showFormulaDetails, setShowFormulaDetails] = useState(false);

  const handleCopySummary = () => {
    const summary = `🖨️ 3D Baskı Maliyet Özeti (${inputs.projectName || 'İsimsiz Proje'})
------------------------------------------
• Malzeme: ${inputs.filamentType} (${inputs.printWeight}g) -> ${formatCurrency(results.filamentCost, currency)}
• Elektrik (${formatHoursMinutes(inputs.printHours, inputs.printMinutes)}): ${formatCurrency(results.electricityCost, currency)}
• Amortisman: ${formatCurrency(results.depreciationCost, currency)}
• İşçilik (${inputs.laborMinutes} dk): ${formatCurrency(results.laborCost, currency)}
${results.additionalCosts > 0 ? `• Ekstralar: ${formatCurrency(results.additionalCosts, currency)}\n` : ''}------------------------------------------
• Temel Maliyet: ${formatCurrency(results.baseCost, currency)}
• Riskli Maliyet (+%${inputs.failureRatePercent} Fire): ${formatCurrency(results.riskCost, currency)}
• Net Kar (+%${inputs.profitMarginPercent}): ${formatCurrency(results.profitAmount, currency)}
==========================================
🎯 ÖNERİLEN SATIŞ FİYATI: ${formatCurrency(results.finalPrice, currency)}`;

    navigator.clipboard.writeText(summary);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-6">
      {/* 3D Clay Hero Price Card */}
      <div className="clay-hero-card p-6 sm:p-7 relative overflow-hidden transition-all duration-300">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full clay-inset text-emerald-400 text-xs font-extrabold uppercase tracking-wider mb-2">
              <TrendingUp className="w-3.5 h-3.5" />
              <span>Önerilen Nihai Satış Fiyatı</span>
            </div>
            <div className="text-4xl sm:text-5xl font-black tracking-tight text-white font-mono flex items-baseline gap-2 drop-shadow-md">
              <span>{formatCurrency(results.finalPrice, currency)}</span>
            </div>
            <p className="text-xs text-slate-400 font-medium mt-1.5">
              Fire (%{inputs.failureRatePercent}) ve Kar (%{inputs.profitMarginPercent}) dahil tavsiye edilen nihai fiyat
            </p>
          </div>

          {/* Action Clay Buttons */}
          <div className="flex flex-wrap md:flex-col gap-2.5 shrink-0">
            <button
              type="button"
              onClick={onSaveProfile}
              className="clay-btn-primary flex-1 md:flex-initial inline-flex items-center justify-center gap-2 px-5 py-3 text-white text-xs font-extrabold cursor-pointer"
            >
              <BookmarkCheck className="w-4 h-4" />
              <span>Ayarları Kaydet</span>
            </button>

            <button
              type="button"
              onClick={handleCopySummary}
              className="clay-btn-secondary flex-1 md:flex-initial inline-flex items-center justify-center gap-2 px-5 py-3 text-slate-200 text-xs font-bold cursor-pointer"
            >
              {copied ? (
                <>
                  <Check className="w-4 h-4 text-emerald-400" />
                  <span className="text-emerald-300">Kopyalandı!</span>
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4 text-slate-400" />
                  <span>Özeti Kopyala</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* 4 Stat Clay Cushions */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-6 pt-5 border-t border-slate-800/80">
          <div className="clay-stat-cushion p-3">
            <span className="text-[10px] uppercase font-bold tracking-wider text-slate-400 block mb-1">
              Temel Maliyet
            </span>
            <span className="text-base font-black text-slate-100 font-mono">
              {formatCurrency(results.baseCost, currency)}
            </span>
          </div>

          <div className="clay-stat-cushion p-3">
            <span className="text-[10px] uppercase font-bold tracking-wider text-orange-400 block mb-1">
              Riskli Maliyet
            </span>
            <span className="text-base font-black text-orange-300 font-mono">
              {formatCurrency(results.riskCost, currency)}
            </span>
          </div>

          <div className="clay-stat-cushion p-3">
            <span className="text-[10px] uppercase font-bold tracking-wider text-emerald-400 block mb-1">
              Net Kar
            </span>
            <span className="text-base font-black text-emerald-300 font-mono">
              {formatCurrency(results.profitAmount, currency)}
            </span>
          </div>

          <div className="clay-stat-cushion p-3">
            <span className="text-[10px] uppercase font-bold tracking-wider text-sky-400 block mb-1">
              Saatlik Maliyet
            </span>
            <span className="text-base font-black text-sky-300 font-mono">
              {formatCurrency(results.costPerHour, currency)}/sa
            </span>
          </div>
        </div>
      </div>

      {/* Breakdown Visualizer */}
      <CostBreakdownChart results={results} currency={currency} />

      {/* Accordion: Formül ve Detaylı Döküm Tablosu */}
      <div className="clay-card overflow-hidden">
        <button
          type="button"
          onClick={() => setShowFormulaDetails(!showFormulaDetails)}
          className="w-full px-6 py-4 flex items-center justify-between text-xs font-extrabold text-slate-200 hover:bg-slate-800/20 transition cursor-pointer"
        >
          <div className="flex items-center gap-2.5">
            <Info className="w-4 h-4 text-indigo-400" />
            <span>Detaylı Maliyet Dökümü ve Formüller</span>
          </div>
          {showFormulaDetails ? (
            <ChevronUp className="w-4 h-4 text-slate-400" />
          ) : (
            <ChevronDown className="w-4 h-4 text-slate-400" />
          )}
        </button>

        {showFormulaDetails && (
          <div className="p-6 border-t border-slate-800/80 space-y-4 text-xs">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-slate-800 text-[10px] text-slate-400 uppercase font-bold tracking-wider">
                    <th className="pb-2.5">Kalem</th>
                    <th className="pb-2.5">Hesaplama Formülü</th>
                    <th className="pb-2.5 text-right">Tutar</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60 font-mono">
                  <tr>
                    <td className="py-2.5 text-rose-400 font-sans font-bold">Filament</td>
                    <td className="py-2.5 text-slate-400 text-[11px]">
                      ({inputs.spoolPrice} ₺ / {inputs.spoolWeight}g) × {inputs.printWeight}g
                    </td>
                    <td className="py-2.5 text-right font-extrabold text-slate-200">
                      {formatCurrency(results.filamentCost, currency)}
                    </td>
                  </tr>
                  <tr>
                    <td className="py-2.5 text-sky-400 font-sans font-bold">Elektrik</td>
                    <td className="py-2.5 text-slate-400 text-[11px]">
                      ({inputs.printerPower}W / 1000) × {results.totalPrintTimeHours.toFixed(2)} sa × {inputs.electricityPrice} ₺
                    </td>
                    <td className="py-2.5 text-right font-extrabold text-slate-200">
                      {formatCurrency(results.electricityCost, currency)}
                    </td>
                  </tr>
                  <tr>
                    <td className="py-2.5 text-indigo-400 font-sans font-bold">Amortisman</td>
                    <td className="py-2.5 text-slate-400 text-[11px]">
                      ({inputs.printerPrice} ₺ / {inputs.printerLifespanHours} sa) × {results.totalPrintTimeHours.toFixed(2)} sa
                    </td>
                    <td className="py-2.5 text-right font-extrabold text-slate-200">
                      {formatCurrency(results.depreciationCost, currency)}
                    </td>
                  </tr>
                  <tr>
                    <td className="py-2.5 text-amber-400 font-sans font-bold">İşçilik</td>
                    <td className="py-2.5 text-slate-400 text-[11px]">
                      ({inputs.laborMinutes} dk / 60) × {inputs.hourlyLaborRate} ₺
                    </td>
                    <td className="py-2.5 text-right font-extrabold text-slate-200">
                      {formatCurrency(results.laborCost, currency)}
                    </td>
                  </tr>
                  {results.additionalCosts > 0 && (
                    <tr>
                      <td className="py-2.5 text-purple-400 font-sans font-bold">Ekstralar</td>
                      <td className="py-2.5 text-slate-400 text-[11px]">Paketleme / Donanım</td>
                      <td className="py-2.5 text-right font-extrabold text-slate-200">
                        {formatCurrency(results.additionalCosts, currency)}
                      </td>
                    </tr>
                  )}
                  <tr className="bg-slate-900/60 font-sans">
                    <td className="py-2.5 text-slate-200 font-bold">Toplam Temel Maliyet</td>
                    <td className="py-2.5 text-slate-400 text-[11px]">Filament + Elektrik + Amortisman + İşçilik + Ekstralar</td>
                    <td className="py-2.5 text-right font-black text-slate-100 font-mono">
                      {formatCurrency(results.baseCost, currency)}
                    </td>
                  </tr>
                  <tr>
                    <td className="py-2.5 text-orange-400 font-sans font-bold">Fire Payı (%{inputs.failureRatePercent})</td>
                    <td className="py-2.5 text-slate-400 text-[11px]">
                      {formatCurrency(results.baseCost, currency)} × %{inputs.failureRatePercent}
                    </td>
                    <td className="py-2.5 text-right font-extrabold text-orange-400">
                      +{formatCurrency(results.riskAmount, currency)}
                    </td>
                  </tr>
                  <tr className="bg-slate-900/60 font-sans">
                    <td className="py-2.5 text-orange-300 font-bold">Riskli Maliyet</td>
                    <td className="py-2.5 text-slate-400 text-[11px]">Temel Maliyet × (1 + %{inputs.failureRatePercent})</td>
                    <td className="py-2.5 text-right font-black text-orange-300 font-mono">
                      {formatCurrency(results.riskCost, currency)}
                    </td>
                  </tr>
                  <tr>
                    <td className="py-2.5 text-emerald-400 font-sans font-bold">Net Kar (%{inputs.profitMarginPercent})</td>
                    <td className="py-2.5 text-slate-400 text-[11px]">
                      {formatCurrency(results.riskCost, currency)} × %{inputs.profitMarginPercent}
                    </td>
                    <td className="py-2.5 text-right font-extrabold text-emerald-400">
                      +{formatCurrency(results.profitAmount, currency)}
                    </td>
                  </tr>
                  <tr className="bg-indigo-950/60 text-sm font-sans">
                    <td className="py-3 text-indigo-200 font-black">Nihai Satış Fiyatı</td>
                    <td className="py-3 text-indigo-300/70 text-[11px]">Riskli Maliyet × (1 + %{inputs.profitMarginPercent})</td>
                    <td className="py-3 text-right font-black text-indigo-300 font-mono">
                      {formatCurrency(results.finalPrice, currency)}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
