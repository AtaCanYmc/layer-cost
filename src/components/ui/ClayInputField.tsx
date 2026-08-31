import React from 'react';

interface ClayInputFieldProps {
  label: string;
  labelIcon?: React.ReactNode;
  topRightBadge?: React.ReactNode;
  value: string | number;
  onChange: (val: string) => void;
  type?: 'text' | 'number';
  placeholder?: string;
  unit?: string;
  hint?: string;
  min?: number;
  max?: number;
  step?: number | string;
  className?: string;
}

export const ClayInputField: React.FC<ClayInputFieldProps> = ({
  label,
  labelIcon,
  topRightBadge,
  value,
  onChange,
  type = 'text',
  placeholder,
  unit,
  hint,
  min,
  max,
  step,
  className = '',
}) => {
  return (
    <div className={`w-full ${className}`}>
      <div className="flex items-center justify-between gap-1 mb-1.5">
        <label className="flex items-center gap-1.5 text-[11px] font-extrabold uppercase tracking-wider text-slate-700 dark:text-slate-300 truncate">
          {labelIcon}
          <span>{label}</span>
        </label>
        {topRightBadge && (
          <span className="text-[10px] text-slate-500 dark:text-slate-400 font-mono font-bold shrink-0">
            {topRightBadge}
          </span>
        )}
      </div>

      <div className="relative flex items-center">
        <input
          type={type}
          min={min}
          max={max}
          step={step}
          value={value === 0 && type === 'number' ? '0' : (value ?? '')}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className={`clay-input w-full px-3.5 py-2.5 text-xs sm:text-sm text-slate-900 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-500 font-medium ${
            type === 'number' ? 'font-mono font-bold' : ''
          } ${unit ? 'pr-14' : ''}`}
        />
        {unit && (
          <span className="absolute right-3 text-xs text-slate-500 dark:text-slate-400 font-bold pointer-events-none shrink-0 truncate max-w-[70px]">
            {unit}
          </span>
        )}
      </div>

      {hint && (
        <span className="text-[10px] text-slate-500 dark:text-slate-400 font-medium mt-1 block leading-tight">
          {hint}
        </span>
      )}
    </div>
  );
};
