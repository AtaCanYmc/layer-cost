import React from 'react';
import type { CalculationResults, Currency, Language } from '../types/calculator';
import { formatCurrency } from '../utils/calculator';
import { useTranslation } from '../i18n/translations';

interface CostBreakdownChartProps {
  results: CalculationResults;
  currency: Currency;
  lang: Language;
}

export const CostBreakdownChart: React.FC<CostBreakdownChartProps> = ({
  results,
  currency,
  lang,
}) => {
  const { t } = useTranslation(lang);

  const items = [
    {
      label: t('filamentItem'),
      cost: results.filamentCost,
      percent: results.percentages.filament,
      color: 'bg-rose-500',
      textColor: 'text-rose-600 dark:text-rose-400',
    },
    {
      label: t('electricityItem'),
      cost: results.electricityCost,
      percent: results.percentages.electricity,
      color: 'bg-sky-500',
      textColor: 'text-sky-600 dark:text-sky-400',
    },
    {
      label: t('depreciationItem'),
      cost: results.depreciationCost,
      percent: results.percentages.depreciation,
      color: 'bg-indigo-500',
      textColor: 'text-indigo-600 dark:text-indigo-400',
    },
    {
      label: t('laborItem'),
      cost: results.laborCost,
      percent: results.percentages.labor,
      color: 'bg-amber-500',
      textColor: 'text-amber-600 dark:text-amber-400',
    },
    ...(results.additionalCosts > 0
      ? [
          {
            label: t('extrasItem'),
            cost: results.additionalCosts,
            percent: results.percentages.additional,
            color: 'bg-purple-500',
            textColor: 'text-purple-600 dark:text-purple-400',
          },
        ]
      : []),
    {
      label: t('failureItem'),
      cost: results.riskAmount,
      percent: results.percentages.risk,
      color: 'bg-orange-500',
      textColor: 'text-orange-600 dark:text-orange-400',
    },
    {
      label: t('netProfitItem'),
      cost: results.profitAmount,
      percent: results.percentages.profit,
      color: 'bg-emerald-500',
      textColor: 'text-emerald-600 dark:text-emerald-400',
    },
  ];

  return (
    <div className="clay-card p-5">
      <div className="flex items-center justify-between text-xs font-bold text-slate-800 dark:text-slate-200 mb-3">
        <span className="uppercase tracking-wider text-[11px]">{t('breakdownTitle')}</span>
        <span className="text-slate-600 dark:text-slate-400 font-mono text-[11px] clay-pill-active px-2.5 py-0.5 rounded-full">
          {t('totalLabel')}: {formatCurrency(results.finalPrice, currency, lang)}
        </span>
      </div>

      {/* 3D Cylindrical Segmented Bar */}
      <div className="w-full h-4 bg-slate-200 dark:bg-[#070b14] rounded-full overflow-hidden flex p-0.5 shadow-inner border border-black/5 dark:border-white/5 mb-4">
        {items.map((item, idx) => {
          if (item.percent <= 0) return null;
          return (
            <div
              key={idx}
              className={`${item.color} h-full transition-all duration-300 first:rounded-l-full last:rounded-r-full shadow-[inset_1px_1px_2px_rgba(255,255,255,0.4),inset_-1px_-1px_2px_rgba(0,0,0,0.3)] hover:opacity-90 cursor-pointer`}
              style={{ width: `${Math.max(1.5, item.percent)}%` }}
              title={`${item.label}: ${formatCurrency(item.cost, currency, lang)} (%${item.percent.toFixed(1)})`}
            />
          );
        })}
      </div>

      {/* Grid of Clay Stat Cushions */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
        {items.map((item, idx) => (
          <div
            key={idx}
            className="clay-stat-cushion p-2.5 flex items-center justify-between text-xs transition-all hover:scale-[1.02]"
          >
            <div className="flex items-center gap-2 min-w-0">
              <span className={`w-2.5 h-2.5 rounded-full ${item.color} shadow-sm shrink-0`} />
              <span className="text-slate-700 dark:text-slate-300 font-medium truncate text-[11px]">{item.label}</span>
            </div>
            <div className="text-right shrink-0">
              <div className="font-extrabold text-slate-900 dark:text-slate-100 font-mono text-[11px]">
                {formatCurrency(item.cost, currency, lang)}
              </div>
              <div className={`text-[10px] ${item.textColor} font-mono font-bold`}>
                %{item.percent.toFixed(1)}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
