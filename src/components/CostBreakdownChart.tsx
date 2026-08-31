import React from 'react';
import type { CalculationResults, Currency } from '../types/calculator';
import { formatCurrency } from '../utils/calculator';

interface CostBreakdownChartProps {
  results: CalculationResults;
  currency: Currency;
}

export const CostBreakdownChart: React.FC<CostBreakdownChartProps> = ({
  results,
  currency,
}) => {
  const items = [
    {
      label: 'Filament',
      cost: results.filamentCost,
      percent: results.percentages.filament,
      color: 'bg-pink-500',
      textColor: 'text-pink-400',
    },
    {
      label: 'Elektrik',
      cost: results.electricityCost,
      percent: results.percentages.electricity,
      color: 'bg-sky-500',
      textColor: 'text-sky-400',
    },
    {
      label: 'Amortisman',
      cost: results.depreciationCost,
      percent: results.percentages.depreciation,
      color: 'bg-indigo-500',
      textColor: 'text-indigo-400',
    },
    {
      label: 'İşçilik',
      cost: results.laborCost,
      percent: results.percentages.labor,
      color: 'bg-amber-500',
      textColor: 'text-amber-400',
    },
    ...(results.additionalCosts > 0
      ? [
          {
            label: 'Ekstralar',
            cost: results.additionalCosts,
            percent: results.percentages.additional,
            color: 'bg-purple-500',
            textColor: 'text-purple-400',
          },
        ]
      : []),
    {
      label: 'Fire Payı',
      cost: results.riskAmount,
      percent: results.percentages.risk,
      color: 'bg-rose-500',
      textColor: 'text-rose-400',
    },
    {
      label: 'Net Kar',
      cost: results.profitAmount,
      percent: results.percentages.profit,
      color: 'bg-emerald-500',
      textColor: 'text-emerald-400',
    },
  ];

  return (
    <div className="bg-slate-950/60 border border-slate-800/90 rounded-xl p-4">
      <div className="flex items-center justify-between text-xs font-semibold text-slate-300 mb-2.5">
        <span>Fiyat & Maliyet Dağılımı</span>
        <span className="text-slate-400 font-mono text-[11px]">Toplam: {formatCurrency(results.finalPrice, currency)}</span>
      </div>

      {/* Proportional Multi-Segment Bar */}
      <div className="w-full h-3.5 bg-slate-900 rounded-full overflow-hidden flex p-0.5 border border-slate-800 shadow-inner mb-4">
        {items.map((item, idx) => {
          if (item.percent <= 0) return null;
          return (
            <div
              key={idx}
              className={`${item.color} h-full transition-all duration-300 first:rounded-l-full last:rounded-r-full hover:opacity-90 relative group cursor-pointer`}
              style={{ width: `${Math.max(1.5, item.percent)}%` }}
              title={`${item.label}: ${formatCurrency(item.cost, currency)} (%${item.percent.toFixed(1)})`}
            />
          );
        })}
      </div>

      {/* Grid of legend items */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
        {items.map((item, idx) => (
          <div
            key={idx}
            className="flex items-center justify-between p-2 rounded-lg bg-slate-900/60 border border-slate-800/60 text-xs"
          >
            <div className="flex items-center gap-1.5 min-w-0">
              <span className={`w-2.5 h-2.5 rounded-full ${item.color} shrink-0`} />
              <span className="text-slate-300 truncate text-[11px]">{item.label}</span>
            </div>
            <div className="text-right shrink-0">
              <div className="font-semibold text-slate-200 font-mono text-[11px]">
                {formatCurrency(item.cost, currency)}
              </div>
              <div className={`text-[10px] ${item.textColor} font-mono`}>
                %{item.percent.toFixed(1)}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
