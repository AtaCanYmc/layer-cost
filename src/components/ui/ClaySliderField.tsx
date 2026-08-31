import React from 'react';

interface ClaySliderFieldProps {
  label: string;
  icon?: React.ReactNode;
  value: number;
  onChange: (val: number) => void;
  min: number;
  max: number;
  step?: number;
  unit?: string;
  quickPercentages?: number[];
  colorClass?: string;
}

export const ClaySliderField: React.FC<ClaySliderFieldProps> = ({
  label,
  icon,
  value,
  onChange,
  min,
  max,
  step = 1,
  unit = '%',
  quickPercentages,
}) => {
  return (
    <div className="clay-inset p-3.5 sm:p-4 rounded-2xl">
      <div className="flex items-center justify-between mb-2">
        <label className="flex items-center gap-1.5 text-xs font-extrabold text-slate-800 dark:text-slate-200">
          {icon}
          <span>{label}</span>
        </label>
        <span className="text-xs sm:text-sm font-black font-mono clay-pill-active px-2.5 py-0.5 rounded-full">
          {unit === '%' ? `%${value}` : `${value} ${unit}`}
        </span>
      </div>

      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(parseFloat(e.target.value))}
        className="clay-slider w-full cursor-pointer touch-manipulation my-2"
      />

      {quickPercentages && quickPercentages.length > 0 && (
        <div className="flex flex-wrap items-center gap-1.5 mt-2">
          {quickPercentages.map((pct) => (
            <button
              key={pct}
              type="button"
              onClick={() => onChange(pct)}
              className={`px-2.5 py-1 text-[11px] font-extrabold rounded-lg transition-all cursor-pointer ${
                value === pct
                  ? 'clay-pill-active'
                  : 'clay-pill-inactive'
              }`}
            >
              %{pct}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};
