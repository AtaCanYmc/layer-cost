import React, { useState } from 'react';
import { Calculator, ChevronDown, ChevronUp } from 'lucide-react';
import type { CalculationInputs, CalculationResults, Currency, Language } from '../types/calculator';
import { formatCurrency } from '../utils/calculator';
import { useTranslation } from '../i18n/translations';

interface FormulaBreakdownProps {
  inputs: CalculationInputs;
  results: CalculationResults;
  currency: Currency;
  lang: Language;
}

export const FormulaBreakdown: React.FC<FormulaBreakdownProps> = ({
  inputs,
  results,
  currency,
  lang,
}) => {
  const { t } = useTranslation(lang);
  const [isOpen, setIsOpen] = useState(false);

  const printTimeHours = inputs.printHours + (inputs.printMinutes / 60);

  const formulaRows = [
    {
      name: t('filamentItem'),
      formula: '(${price} / ${weight}) * ${used}',
      detail: `(${inputs.spoolPrice} / ${inputs.spoolWeight}g) * ${inputs.printWeight}g`,
      result: formatCurrency(results.filamentCost, currency, lang),
    },
    {
      name: t('electricityItem'),
      formula: '(${watt} / 1000) * ${hours} * ${rate}',
      detail: `(${inputs.printerPower}W / 1000) * ${printTimeHours.toFixed(2)}h * ${inputs.electricityPrice}`,
      result: formatCurrency(results.electricityCost, currency, lang),
    },
    {
      name: t('depreciationItem'),
      formula: '(${printerPrice} / ${lifespan}) * ${hours}',
      detail: `(${inputs.printerPrice} / ${inputs.printerLifespanHours}h) * ${printTimeHours.toFixed(2)}h`,
      result: formatCurrency(results.depreciationCost, currency, lang),
    },
    {
      name: t('laborItem'),
      formula: '(${minutes} / 60) * ${wage}',
      detail: `(${inputs.laborMinutes}m / 60) * ${inputs.hourlyLaborRate}`,
      result: formatCurrency(results.laborCost, currency, lang),
    },
    ...(results.additionalCosts > 0
      ? [
          {
            name: t('extrasItem'),
            formula: '${additionalCosts}',
            detail: `${inputs.additionalCosts}`,
            result: formatCurrency(results.additionalCosts, currency, lang),
          },
        ]
      : []),
    {
      name: t('baseCostItem'),
      formula: '${filament} + ${elec} + ${depr} + ${labor} + ${extras}',
      detail: `${results.filamentCost.toFixed(1)} + ${results.electricityCost.toFixed(1)} + ${results.depreciationCost.toFixed(1)} + ${results.laborCost.toFixed(1)} + ${inputs.additionalCosts}`,
      result: formatCurrency(results.baseCost, currency, lang),
    },
    {
      name: `${t('failureItem')} (%${inputs.failureRatePercent})`,
      formula: '${base} * (1 + %${risk})',
      detail: `${results.baseCost.toFixed(1)} * (1 + %${inputs.failureRatePercent})`,
      result: formatCurrency(results.riskCost, currency, lang),
    },
    {
      name: `${t('netProfitItem')} (%${inputs.profitMarginPercent})`,
      formula: '${riskCost} * (1 + %${margin})',
      detail: `${results.riskCost.toFixed(1)} * (1 + %${inputs.profitMarginPercent})`,
      result: formatCurrency(results.finalPrice, currency, lang),
    },
  ];

  return (
    <div className="clay-card overflow-hidden">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full p-4 sm:p-5 flex items-center justify-between text-left cursor-pointer hover:bg-slate-50/50 dark:hover:bg-slate-800/30 transition-colors"
      >
        <div className="flex items-center gap-2.5 min-w-0">
          <div className="w-8 h-8 rounded-xl bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 flex items-center justify-center shrink-0">
            <Calculator className="w-4 h-4" />
          </div>
          <div className="min-w-0">
            <h3 className="text-xs sm:text-sm font-extrabold text-slate-900 dark:text-white truncate">
              {t('formulaToggle')}
            </h3>
            <p className="text-[10px] sm:text-[11px] text-slate-500 truncate">
              {t('tableFormula')}
            </p>
          </div>
        </div>

        <div className="p-1 rounded-lg clay-stepper-btn shrink-0 ml-2">
          {isOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
        </div>
      </button>

      {isOpen && (
        <div className="p-3 sm:p-5 pt-0 border-t border-slate-200 dark:border-slate-800/80 animate-fadeIn">
          <div className="overflow-x-auto -mx-3 sm:mx-0">
            <table className="w-full text-left text-xs min-w-[300px]">
              <thead>
                <tr className="border-b border-slate-200 dark:border-slate-800 text-[10px] uppercase font-extrabold text-slate-500">
                  <th className="py-2 px-3">{t('tableItem')}</th>
                  <th className="py-2 px-3">{t('tableFormula')}</th>
                  <th className="py-2 px-3 text-right">{t('tableAmount')}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60 font-mono text-[11px]">
                {formulaRows.map((row, idx) => (
                  <tr key={idx} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/30">
                    <td className="py-2.5 px-3 font-sans font-extrabold text-slate-800 dark:text-slate-200">
                      {row.name}
                    </td>
                    <td className="py-2.5 px-3 text-slate-500 dark:text-slate-400">
                      <div>{row.formula}</div>
                      <div className="text-[10px] text-indigo-500 dark:text-indigo-400 font-semibold">{row.detail}</div>
                    </td>
                    <td className="py-2.5 px-3 text-right font-extrabold text-slate-900 dark:text-white">
                      {row.result}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};
