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
import type { CalculationInputs, CalculationResults, Currency, Language } from '../types/calculator';
import { formatCurrency, formatHoursMinutes } from '../utils/calculator';
import { CostBreakdownChart } from './CostBreakdownChart';
import { useTranslation } from '../i18n/translations';

interface ResultsOverviewProps {
  inputs: CalculationInputs;
  results: CalculationResults;
  currency: Currency;
  lang: Language;
  onSaveProfile: () => void;
  onOpenQuote: () => void;
}

export const ResultsOverview: React.FC<ResultsOverviewProps> = ({
  inputs,
  results,
  currency,
  lang,
  onSaveProfile,
}) => {
  const { t } = useTranslation(lang);
  const [copied, setCopied] = useState(false);
  const [showFormulaDetails, setShowFormulaDetails] = useState(false);

  const handleCopySummary = () => {
    const summary = `🖨️ ${t('appTitle')} - ${inputs.projectName || t('defaultProject')}
------------------------------------------
• ${t('filamentItem')}: ${inputs.filamentType} (${inputs.printWeight}g) -> ${formatCurrency(results.filamentCost, currency, lang)}
• ${t('electricityItem')} (${formatHoursMinutes(inputs.printHours, inputs.printMinutes, lang)}): ${formatCurrency(results.electricityCost, currency, lang)}
• ${t('depreciationItem')}: ${formatCurrency(results.depreciationCost, currency, lang)}
• ${t('laborItem')} (${inputs.laborMinutes} ${lang === 'en' ? 'min' : 'dk'}): ${formatCurrency(results.laborCost, currency, lang)}
${results.additionalCosts > 0 ? `• ${t('extrasItem')}: ${formatCurrency(results.additionalCosts, currency, lang)}\n` : ''}------------------------------------------
• ${t('baseCost')}: ${formatCurrency(results.baseCost, currency, lang)}
• ${t('riskCost')} (+%${inputs.failureRatePercent} ${t('failureItem')}): ${formatCurrency(results.riskCost, currency, lang)}
• ${t('netProfit')} (+%${inputs.profitMarginPercent}): ${formatCurrency(results.profitAmount, currency, lang)}
==========================================
🎯 ${t('recommendedPrice')}: ${formatCurrency(results.finalPrice, currency, lang)}`;

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
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full clay-inset text-emerald-600 dark:text-emerald-400 text-xs font-extrabold uppercase tracking-wider mb-2">
              <TrendingUp className="w-3.5 h-3.5" />
              <span>{t('recommendedPrice')}</span>
            </div>
            <div className="text-4xl sm:text-5xl font-black tracking-tight text-slate-900 dark:text-white font-mono flex items-baseline gap-2 drop-shadow-md">
              <span>{formatCurrency(results.finalPrice, currency, lang)}</span>
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-400 font-medium mt-1.5">
              {t('priceDisclaimer')} (%{inputs.failureRatePercent} / %{inputs.profitMarginPercent})
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
              <span>{t('saveSettings')}</span>
            </button>

            <button
              type="button"
              onClick={handleCopySummary}
              className="clay-btn-secondary flex-1 md:flex-initial inline-flex items-center justify-center gap-2 px-5 py-3 text-xs font-bold cursor-pointer"
            >
              {copied ? (
                <>
                  <Check className="w-4 h-4 text-emerald-500 dark:text-emerald-400" />
                  <span className="text-emerald-600 dark:text-emerald-300">{t('copied')}</span>
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4 text-slate-500 dark:text-slate-400" />
                  <span>{t('copySummary')}</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* 4 Stat Clay Cushions */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-6 pt-5 border-t border-slate-300 dark:border-slate-800/80">
          <div className="clay-stat-cushion p-3">
            <span className="text-[10px] uppercase font-bold tracking-wider text-slate-500 dark:text-slate-400 block mb-1">
              {t('baseCost')}
            </span>
            <span className="text-base font-black text-slate-900 dark:text-slate-100 font-mono">
              {formatCurrency(results.baseCost, currency, lang)}
            </span>
          </div>

          <div className="clay-stat-cushion p-3">
            <span className="text-[10px] uppercase font-bold tracking-wider text-orange-600 dark:text-orange-400 block mb-1">
              {t('riskCost')}
            </span>
            <span className="text-base font-black text-orange-600 dark:text-orange-300 font-mono">
              {formatCurrency(results.riskCost, currency, lang)}
            </span>
          </div>

          <div className="clay-stat-cushion p-3">
            <span className="text-[10px] uppercase font-bold tracking-wider text-emerald-600 dark:text-emerald-400 block mb-1">
              {t('netProfit')}
            </span>
            <span className="text-base font-black text-emerald-600 dark:text-emerald-300 font-mono">
              {formatCurrency(results.profitAmount, currency, lang)}
            </span>
          </div>

          <div className="clay-stat-cushion p-3">
            <span className="text-[10px] uppercase font-bold tracking-wider text-sky-600 dark:text-sky-400 block mb-1">
              {t('costPerHour')}
            </span>
            <span className="text-base font-black text-sky-600 dark:text-sky-300 font-mono">
              {formatCurrency(results.costPerHour, currency, lang)}/{lang === 'en' ? 'hr' : 'sa'}
            </span>
          </div>
        </div>
      </div>

      {/* Breakdown Visualizer */}
      <CostBreakdownChart results={results} currency={currency} lang={lang} />

      {/* Accordion: Formül ve Detaylı Döküm Tablosu */}
      <div className="clay-card overflow-hidden">
        <button
          type="button"
          onClick={() => setShowFormulaDetails(!showFormulaDetails)}
          className="w-full px-6 py-4 flex items-center justify-between text-xs font-extrabold text-slate-800 dark:text-slate-200 hover:bg-slate-200/40 dark:hover:bg-slate-800/20 transition cursor-pointer"
        >
          <div className="flex items-center gap-2.5">
            <Info className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
            <span>{t('formulaToggle')}</span>
          </div>
          {showFormulaDetails ? (
            <ChevronUp className="w-4 h-4 text-slate-500 dark:text-slate-400" />
          ) : (
            <ChevronDown className="w-4 h-4 text-slate-500 dark:text-slate-400" />
          )}
        </button>

        {showFormulaDetails && (
          <div className="p-6 border-t border-slate-200 dark:border-slate-800/80 space-y-4 text-xs">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-slate-300 dark:border-slate-800 text-[10px] text-slate-500 dark:text-slate-400 uppercase font-bold tracking-wider">
                    <th className="pb-2.5">{t('tableItem')}</th>
                    <th className="pb-2.5">{t('tableFormula')}</th>
                    <th className="pb-2.5 text-right">{t('tableAmount')}</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200 dark:divide-slate-800/60 font-mono">
                  <tr>
                    <td className="py-2.5 text-rose-600 dark:text-rose-400 font-sans font-bold">{t('filamentItem')}</td>
                    <td className="py-2.5 text-slate-500 dark:text-slate-400 text-[11px]">
                      ({inputs.spoolPrice} / {inputs.spoolWeight}g) × {inputs.printWeight}g
                    </td>
                    <td className="py-2.5 text-right font-extrabold text-slate-900 dark:text-slate-200">
                      {formatCurrency(results.filamentCost, currency, lang)}
                    </td>
                  </tr>
                  <tr>
                    <td className="py-2.5 text-sky-600 dark:text-sky-400 font-sans font-bold">{t('electricityItem')}</td>
                    <td className="py-2.5 text-slate-500 dark:text-slate-400 text-[11px]">
                      ({inputs.printerPower}W / 1000) × {results.totalPrintTimeHours.toFixed(2)} {lang === 'en' ? 'hrs' : 'sa'} × {inputs.electricityPrice}
                    </td>
                    <td className="py-2.5 text-right font-extrabold text-slate-900 dark:text-slate-200">
                      {formatCurrency(results.electricityCost, currency, lang)}
                    </td>
                  </tr>
                  <tr>
                    <td className="py-2.5 text-indigo-600 dark:text-indigo-400 font-sans font-bold">{t('depreciationItem')}</td>
                    <td className="py-2.5 text-slate-500 dark:text-slate-400 text-[11px]">
                      ({inputs.printerPrice} / {inputs.printerLifespanHours} {lang === 'en' ? 'hrs' : 'sa'}) × {results.totalPrintTimeHours.toFixed(2)} {lang === 'en' ? 'hrs' : 'sa'}
                    </td>
                    <td className="py-2.5 text-right font-extrabold text-slate-900 dark:text-slate-200">
                      {formatCurrency(results.depreciationCost, currency, lang)}
                    </td>
                  </tr>
                  <tr>
                    <td className="py-2.5 text-amber-600 dark:text-amber-400 font-sans font-bold">{t('laborItem')}</td>
                    <td className="py-2.5 text-slate-500 dark:text-slate-400 text-[11px]">
                      ({inputs.laborMinutes} {lang === 'en' ? 'min' : 'dk'} / 60) × {inputs.hourlyLaborRate}
                    </td>
                    <td className="py-2.5 text-right font-extrabold text-slate-900 dark:text-slate-200">
                      {formatCurrency(results.laborCost, currency, lang)}
                    </td>
                  </tr>
                  {results.additionalCosts > 0 && (
                    <tr>
                      <td className="py-2.5 text-purple-600 dark:text-purple-400 font-sans font-bold">{t('extrasItem')}</td>
                      <td className="py-2.5 text-slate-500 dark:text-slate-400 text-[11px]">{t('additionalCosts')}</td>
                      <td className="py-2.5 text-right font-extrabold text-slate-900 dark:text-slate-200">
                        {formatCurrency(results.additionalCosts, currency, lang)}
                      </td>
                    </tr>
                  )}
                  <tr className="bg-slate-100 dark:bg-slate-900/60 font-sans">
                    <td className="py-2.5 text-slate-900 dark:text-slate-200 font-bold">{t('baseCostItem')}</td>
                    <td className="py-2.5 text-slate-500 dark:text-slate-400 text-[11px]">Filament + Elektrik + Amortisman + İşçilik + Ekstralar</td>
                    <td className="py-2.5 text-right font-black text-slate-900 dark:text-slate-100 font-mono">
                      {formatCurrency(results.baseCost, currency, lang)}
                    </td>
                  </tr>
                  <tr>
                    <td className="py-2.5 text-orange-600 dark:text-orange-400 font-sans font-bold">{t('failureItem')} (%{inputs.failureRatePercent})</td>
                    <td className="py-2.5 text-slate-500 dark:text-slate-400 text-[11px]">
                      {formatCurrency(results.baseCost, currency, lang)} × %{inputs.failureRatePercent}
                    </td>
                    <td className="py-2.5 text-right font-extrabold text-orange-600 dark:text-orange-400">
                      +{formatCurrency(results.riskAmount, currency, lang)}
                    </td>
                  </tr>
                  <tr className="bg-slate-100 dark:bg-slate-900/60 font-sans">
                    <td className="py-2.5 text-orange-700 dark:text-orange-300 font-bold">{t('riskCostItem')}</td>
                    <td className="py-2.5 text-slate-500 dark:text-slate-400 text-[11px]">{t('baseCostItem')} × (1 + %{inputs.failureRatePercent})</td>
                    <td className="py-2.5 text-right font-black text-orange-700 dark:text-orange-300 font-mono">
                      {formatCurrency(results.riskCost, currency, lang)}
                    </td>
                  </tr>
                  <tr>
                    <td className="py-2.5 text-emerald-600 dark:text-emerald-400 font-sans font-bold">{t('netProfitItem')} (%{inputs.profitMarginPercent})</td>
                    <td className="py-2.5 text-slate-500 dark:text-slate-400 text-[11px]">
                      {formatCurrency(results.riskCost, currency, lang)} × %{inputs.profitMarginPercent}
                    </td>
                    <td className="py-2.5 text-right font-extrabold text-emerald-600 dark:text-emerald-400">
                      +{formatCurrency(results.profitAmount, currency, lang)}
                    </td>
                  </tr>
                  <tr className="bg-indigo-50 dark:bg-indigo-950/60 text-sm font-sans">
                    <td className="py-3 text-indigo-900 dark:text-indigo-200 font-black">{t('finalPriceItem')}</td>
                    <td className="py-3 text-indigo-700 dark:text-indigo-300/70 text-[11px]">{t('riskCostItem')} × (1 + %{inputs.profitMarginPercent})</td>
                    <td className="py-3 text-right font-black text-indigo-700 dark:text-indigo-300 font-mono">
                      {formatCurrency(results.finalPrice, currency, lang)}
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
