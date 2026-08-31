import React from 'react';
import { Plus, Minus } from 'lucide-react';

interface ClayStepperFieldProps {
  label?: string;
  unit?: string;
  value: number;
  onChange: (val: number) => void;
  onStep: (delta: number) => void;
  stepAmounts?: number[];
  min?: number;
  max?: number;
  step?: number;
  className?: string;
}

export const ClayStepperField: React.FC<ClayStepperFieldProps> = ({
  label,
  unit,
  value,
  onChange,
  onStep,
  stepAmounts,
  min = 0,
  max,
  step = 1,
  className = '',
}) => {
  return (
    <div className={`w-full ${className}`}>
      {label && (
        <label className="block text-[11px] font-extrabold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1.5 truncate">
          {label}
        </label>
      )}

      <div className="flex items-center gap-1.5 sm:gap-2">
        <button
          type="button"
          onClick={() => onStep(-1 * (stepAmounts?.[0] || 1))}
          className="clay-stepper-btn min-w-[38px] min-h-[38px] sm:min-w-[42px] sm:min-h-[42px] flex items-center justify-center text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white cursor-pointer shrink-0"
          title={`-${stepAmounts?.[0] || 1}`}
        >
          <Minus className="w-4 h-4" />
        </button>

        <div className="relative flex-1 min-w-0">
          <input
            type="number"
            min={min}
            max={max}
            step={step}
            value={value}
            onChange={(e) => {
              const parsed = parseFloat(e.target.value);
              onChange(isNaN(parsed) ? 0 : Math.max(min, max !== undefined ? Math.min(max, parsed) : parsed));
            }}
            className={`clay-input w-full px-2.5 py-2 sm:py-2.5 text-xs sm:text-sm text-slate-900 dark:text-white font-mono font-bold text-center ${
              unit ? 'pr-10' : ''
            }`}
          />
          {unit && (
            <span className="absolute right-2.5 top-1/2 -translate-y-1/2 text-xs text-slate-500 dark:text-slate-400 font-bold pointer-events-none">
              {unit}
            </span>
          )}
        </div>

        <button
          type="button"
          onClick={() => onStep(stepAmounts?.[0] || 1)}
          className="clay-stepper-btn min-w-[38px] min-h-[38px] sm:min-w-[42px] sm:min-h-[42px] flex items-center justify-center text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white cursor-pointer shrink-0"
          title={`+${stepAmounts?.[0] || 1}`}
        >
          <Plus className="w-4 h-4" />
        </button>
      </div>

      {stepAmounts && stepAmounts.length > 1 && (
        <div className="flex flex-wrap gap-1.5 mt-2">
          {stepAmounts.map((amt) => (
            <button
              key={amt}
              type="button"
              onClick={() => onStep(amt)}
              className="clay-pill-inactive text-[11px] font-extrabold px-2.5 py-1 rounded-lg cursor-pointer transition-all hover:scale-105"
            >
              +{amt}{unit ? ` ${unit}` : ''}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};
