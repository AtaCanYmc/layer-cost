import React, { useState } from 'react';
import { 
  TrendingUp, 
  Check, 
  Copy, 
  BookmarkCheck,
  FileText
} from 'lucide-react';
import type { CalculationInputs, CalculationResults, Currency, Language } from '../types/calculator';
import { formatCurrency, formatHoursMinutes } from '../utils/calculator';
import { CostBreakdownChart } from './CostBreakdownChart';
import { FormulaBreakdown } from './FormulaBreakdown';
import { useTranslation } from '../i18n/translations';
import { ClayCard } from './ui/ClayCard';

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
  onOpenQuote,
}) => {
  const { t } = useTranslation(lang);
  const [copied, setCopied] = useState(false);

  const handleCopySummary = () => {
    const summary = `🖨️ ${t('appTitle')} - ${inputs.projectName || t('defaultProject')}
------------------------------------------
• ${t('filamentItem')}: ${inputs.filamentType} (${inputs.printWeight}g) -> ${formatCurrency(results.filamentCost, currency, lang)}
• ${t('electricityItem')} (${formatHoursMinutes(inputs.printHours, inputs.printMinutes, lang)}): ${formatCurrency(results.electricityCost, currency, lang)}
• ${t('depreciationItem')}: ${formatCurrency(results.depreciationCost, currency, lang)}
• ${t('laborItem')} (${inputs.laborMinutes} ${lang === 'en' ? 'min' : 'dk'}): ${formatCurrency(results.laborCost, currency, lang)}
${inputs.additionalCosts > 0 ? `• ${t('extrasItem')}: ${formatCurrency(inputs.additionalCosts, currency, lang)}\n` : ''}------------------------------------------
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
    <div className="space-y-4 sm:space-y-6">
      {/* 3D Clay Hero Price Card */}
      <ClayCard className="clay-hero-card">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 sm:gap-6">
          <div className="min-w-0 flex-1">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full clay-inset text-emerald-600 dark:text-emerald-400 text-[11px] font-extrabold uppercase tracking-wider mb-2">
              <TrendingUp className="w-3.5 h-3.5" />
              <span>{t('recommendedPrice')}</span>
            </div>
            <div className="text-2xl xs:text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-slate-900 dark:text-white font-mono truncate drop-shadow-md">
              {formatCurrency(results.finalPrice, currency, lang)}
            </div>
            <p className="text-[11px] sm:text-xs text-slate-600 dark:text-slate-400 font-medium mt-1 truncate">
              {t('priceDisclaimer')} (%{inputs.failureRatePercent} / %{inputs.profitMarginPercent})
            </p>
          </div>

          {/* Action Clay Buttons */}
          <div className="grid grid-cols-2 sm:flex sm:flex-col gap-2 shrink-0">
            <button
              type="button"
              onClick={onSaveProfile}
              className="clay-btn-primary inline-flex items-center justify-center gap-1.5 px-3 sm:px-4 py-2.5 text-white text-xs font-extrabold cursor-pointer"
            >
              <BookmarkCheck className="w-4 h-4" />
              <span>{t('saveSettings')}</span>
            </button>

            <button
              type="button"
              onClick={handleCopySummary}
              className="clay-btn-secondary inline-flex items-center justify-center gap-1.5 px-3 sm:px-4 py-2.5 text-xs font-bold cursor-pointer"
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

            <button
              type="button"
              onClick={onOpenQuote}
              className="clay-btn-secondary col-span-2 inline-flex items-center justify-center gap-1.5 px-3 sm:px-4 py-2 text-xs font-bold text-emerald-600 dark:text-emerald-400 cursor-pointer"
            >
              <FileText className="w-4 h-4" />
              <span>{t('quoteSummary')}</span>
            </button>
          </div>
        </div>

        {/* 4 Stat Clay Cushions */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-3 mt-5 pt-4 border-t border-slate-300 dark:border-slate-800/80">
          <div className="clay-stat-cushion p-2.5 sm:p-3">
            <span className="text-[10px] uppercase font-extrabold tracking-wider text-slate-500 dark:text-slate-400 block mb-0.5 truncate">
              {t('baseCost')}
            </span>
            <span className="text-xs sm:text-sm font-black text-slate-900 dark:text-slate-100 font-mono truncate block">
              {formatCurrency(results.baseCost, currency, lang)}
            </span>
          </div>

          <div className="clay-stat-cushion p-2.5 sm:p-3">
            <span className="text-[10px] uppercase font-extrabold tracking-wider text-orange-600 dark:text-orange-400 block mb-0.5 truncate">
              {t('riskCost')}
            </span>
            <span className="text-xs sm:text-sm font-black text-orange-600 dark:text-orange-300 font-mono truncate block">
              {formatCurrency(results.riskCost, currency, lang)}
            </span>
          </div>

          <div className="clay-stat-cushion p-2.5 sm:p-3">
            <span className="text-[10px] uppercase font-extrabold tracking-wider text-emerald-600 dark:text-emerald-400 block mb-0.5 truncate">
              {t('netProfit')}
            </span>
            <span className="text-xs sm:text-sm font-black text-emerald-600 dark:text-emerald-300 font-mono truncate block">
              {formatCurrency(results.profitAmount, currency, lang)}
            </span>
          </div>

          <div className="clay-stat-cushion p-2.5 sm:p-3">
            <span className="text-[10px] uppercase font-extrabold tracking-wider text-sky-600 dark:text-sky-400 block mb-0.5 truncate">
              {t('costPerHour')}
            </span>
            <span className="text-xs sm:text-sm font-black text-sky-600 dark:text-sky-300 font-mono truncate block">
              {formatCurrency(results.costPerHour, currency, lang)}/{lang === 'en' ? 'hr' : 'sa'}
            </span>
          </div>
        </div>
      </ClayCard>

      {/* 3D Breakdown Chart Visualizer */}
      <CostBreakdownChart results={results} currency={currency} lang={lang} />

      {/* Transparent Step-by-Step Formula Breakdown */}
      <FormulaBreakdown inputs={inputs} results={results} currency={currency} lang={lang} />
    </div>
  );
};
