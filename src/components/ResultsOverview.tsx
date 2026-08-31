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
    <div className="space-y-5">
      {/* Main Final Price Card */}
      <div className="bg-gradient-to-br from-indigo-950/80 via-slate-900/90 to-purple-950/80 border border-indigo-500/30 rounded-3xl p-6 sm:p-7 shadow-2xl relative overflow-hidden">
        {/* Glow effect */}
        <div className="absolute top-0 right-0 -mr-16 -mt-16 w-56 h-56 bg-indigo-500/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 -ml-16 -mb-16 w-56 h-56 bg-purple-500/20 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-semibold uppercase tracking-wider mb-2">
              <TrendingUp className="w-3.5 h-3.5" />
              <span>Önerilen Nihai Satış Fiyatı</span>
            </div>
            <div className="text-4xl sm:text-5xl font-black tracking-tight text-white font-mono flex items-baseline gap-2">
              <span>{formatCurrency(results.finalPrice, currency)}</span>
            </div>
            <p className="text-xs text-slate-400 mt-1">
              Fire payı (%{inputs.failureRatePercent}) ve Kar marjı (%{inputs.profitMarginPercent}) dahil tavsiye edilen fiyat
            </p>
          </div>

          {/* Action Quick Buttons */}
          <div className="flex flex-wrap md:flex-col gap-2 shrink-0">
            <button
              type="button"
              onClick={onSaveProfile}
              className="flex-1 md:flex-initial inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-indigo-600 hover:bg-indigo-500 active:scale-95 text-white text-xs font-bold rounded-xl shadow-lg shadow-indigo-600/30 transition cursor-pointer"
            >
              <BookmarkCheck className="w-4 h-4" />
              <span>Ayarları Kaydet</span>
            </button>

            <button
              type="button"
              onClick={handleCopySummary}
              className="flex-1 md:flex-initial inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-slate-800/90 hover:bg-slate-700 active:scale-95 text-slate-200 border border-slate-700/80 text-xs font-semibold rounded-xl shadow-sm transition cursor-pointer"
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

        {/* 4 Stat Mini Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 mt-6 pt-5 border-t border-slate-800/80">
          <div className="bg-slate-950/50 rounded-xl p-3 border border-slate-800/60">
            <span className="text-[11px] text-slate-400 block mb-0.5">Temel Maliyet</span>
            <span className="text-base font-bold text-slate-200 font-mono">
              {formatCurrency(results.baseCost, currency)}
            </span>
          </div>

          <div className="bg-slate-950/50 rounded-xl p-3 border border-slate-800/60">
            <span className="text-[11px] text-rose-400 block mb-0.5">Riskli Maliyet</span>
            <span className="text-base font-bold text-rose-300 font-mono">
              {formatCurrency(results.riskCost, currency)}
            </span>
          </div>

          <div className="bg-slate-950/50 rounded-xl p-3 border border-slate-800/60">
            <span className="text-[11px] text-emerald-400 block mb-0.5">Net Kar</span>
            <span className="text-base font-bold text-emerald-300 font-mono">
              {formatCurrency(results.profitAmount, currency)}
            </span>
          </div>

          <div className="bg-slate-950/50 rounded-xl p-3 border border-slate-800/60">
            <span className="text-[11px] text-sky-400 block mb-0.5">Saatlik Maliyet</span>
            <span className="text-base font-bold text-sky-300 font-mono">
              {formatCurrency(results.costPerHour, currency)}/sa
            </span>
          </div>
        </div>
      </div>

      {/* Breakdown Visualizer */}
      <CostBreakdownChart results={results} currency={currency} />

      {/* Accordion: Formül ve Detaylı Döküm Tablosu */}
      <div className="bg-slate-900/70 border border-slate-800/80 rounded-2xl overflow-hidden">
        <button
          type="button"
          onClick={() => setShowFormulaDetails(!showFormulaDetails)}
          className="w-full px-5 py-3.5 flex items-center justify-between text-xs font-semibold text-slate-300 hover:bg-slate-850/50 transition cursor-pointer"
        >
          <div className="flex items-center gap-2">
            <Info className="w-4 h-4 text-indigo-400" />
            <span>Detaylı Maliyet Dökümü ve Matematiksel Formüller</span>
          </div>
          {showFormulaDetails ? (
            <ChevronUp className="w-4 h-4 text-slate-400" />
          ) : (
            <ChevronDown className="w-4 h-4 text-slate-400" />
          )}
        </button>

        {showFormulaDetails && (
          <div className="p-5 border-t border-slate-800/60 space-y-4 text-xs">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-slate-800 text-[11px] text-slate-400 uppercase">
                    <th className="pb-2 font-medium">Kalem</th>
                    <th className="pb-2 font-medium">Hesaplama Formülü</th>
                    <th className="pb-2 font-medium text-right">Tutar</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60 font-mono">
                  <tr>
                    <td className="py-2.5 text-pink-400 font-sans font-medium">Filament</td>
                    <td className="py-2.5 text-slate-400 text-[11px]">
                      ({inputs.spoolPrice} ₺ / {inputs.spoolWeight}g) × {inputs.printWeight}g
                    </td>
                    <td className="py-2.5 text-right font-bold text-slate-200">
                      {formatCurrency(results.filamentCost, currency)}
                    </td>
                  </tr>
                  <tr>
                    <td className="py-2.5 text-sky-400 font-sans font-medium">Elektrik</td>
                    <td className="py-2.5 text-slate-400 text-[11px]">
                      ({inputs.printerPower}W / 1000) × {results.totalPrintTimeHours.toFixed(2)} sa × {inputs.electricityPrice} ₺
                    </td>
                    <td className="py-2.5 text-right font-bold text-slate-200">
                      {formatCurrency(results.electricityCost, currency)}
                    </td>
                  </tr>
                  <tr>
                    <td className="py-2.5 text-indigo-400 font-sans font-medium">Amortisman</td>
                    <td className="py-2.5 text-slate-400 text-[11px]">
                      ({inputs.printerPrice} ₺ / {inputs.printerLifespanHours} sa) × {results.totalPrintTimeHours.toFixed(2)} sa
                    </td>
                    <td className="py-2.5 text-right font-bold text-slate-200">
                      {formatCurrency(results.depreciationCost, currency)}
                    </td>
                  </tr>
                  <tr>
                    <td className="py-2.5 text-amber-400 font-sans font-medium">İşçilik</td>
                    <td className="py-2.5 text-slate-400 text-[11px]">
                      ({inputs.laborMinutes} dk / 60) × {inputs.hourlyLaborRate} ₺
                    </td>
                    <td className="py-2.5 text-right font-bold text-slate-200">
                      {formatCurrency(results.laborCost, currency)}
                    </td>
                  </tr>
                  {results.additionalCosts > 0 && (
                    <tr>
                      <td className="py-2.5 text-purple-400 font-sans font-medium">Ekstralar</td>
                      <td className="py-2.5 text-slate-400 text-[11px]">Paketleme / Donanım</td>
                      <td className="py-2.5 text-right font-bold text-slate-200">
                        {formatCurrency(results.additionalCosts, currency)}
                      </td>
                    </tr>
                  )}
                  <tr className="bg-slate-950/40">
                    <td className="py-2.5 text-slate-300 font-sans font-bold">Toplam Temel Maliyet</td>
                    <td className="py-2.5 text-slate-400 text-[11px]">Filament + Elektrik + Amortisman + İşçilik + Ekstralar</td>
                    <td className="py-2.5 text-right font-bold text-slate-100">
                      {formatCurrency(results.baseCost, currency)}
                    </td>
                  </tr>
                  <tr>
                    <td className="py-2.5 text-rose-400 font-sans font-medium">Fire Payı (%{inputs.failureRatePercent})</td>
                    <td className="py-2.5 text-slate-400 text-[11px]">
                      {formatCurrency(results.baseCost, currency)} × %{inputs.failureRatePercent}
                    </td>
                    <td className="py-2.5 text-right font-bold text-rose-400">
                      +{formatCurrency(results.riskAmount, currency)}
                    </td>
                  </tr>
                  <tr className="bg-slate-950/40">
                    <td className="py-2.5 text-rose-300 font-sans font-bold">Riskli Maliyet</td>
                    <td className="py-2.5 text-slate-400 text-[11px]">Temel Maliyet × (1 + %{inputs.failureRatePercent})</td>
                    <td className="py-2.5 text-right font-bold text-rose-300">
                      {formatCurrency(results.riskCost, currency)}
                    </td>
                  </tr>
                  <tr>
                    <td className="py-2.5 text-emerald-400 font-sans font-medium">Net Kar (%{inputs.profitMarginPercent})</td>
                    <td className="py-2.5 text-slate-400 text-[11px]">
                      {formatCurrency(results.riskCost, currency)} × %{inputs.profitMarginPercent}
                    </td>
                    <td className="py-2.5 text-right font-bold text-emerald-400">
                      +{formatCurrency(results.profitAmount, currency)}
                    </td>
                  </tr>
                  <tr className="bg-indigo-950/40 text-sm">
                    <td className="py-3 text-indigo-300 font-sans font-extrabold">Nihai Satış Fiyatı</td>
                    <td className="py-3 text-indigo-200/70 text-[11px]">Riskli Maliyet × (1 + %{inputs.profitMarginPercent})</td>
                    <td className="py-3 text-right font-extrabold text-indigo-300 font-mono">
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
