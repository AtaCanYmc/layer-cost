import React from 'react';
import { ClaySelect, type ClaySelectOption } from './ClaySelect';

interface ClayHeaderProps {
  icon: React.ReactNode;
  iconBgGradient: string;
  iconShadow: string;
  title: string;
  subtitle: string;
  presetPlaceholder?: string;
  presetOptions?: ClaySelectOption[];
  onSelectPreset?: (id: string) => void;
}

export const ClayHeader: React.FC<ClayHeaderProps> = ({
  icon,
  iconBgGradient,
  iconShadow,
  title,
  subtitle,
  presetPlaceholder,
  presetOptions,
  onSelectPreset,
}) => {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-5 sm:mb-6 pb-3 sm:pb-4 border-b border-slate-200 dark:border-slate-800/80">
      <div className="flex items-center gap-3 min-w-0">
        <div className={`w-10 h-10 rounded-2xl ${iconBgGradient} ${iconShadow} flex items-center justify-center shrink-0`}>
          {icon}
        </div>
        <div className="min-w-0 flex-1">
          <h2 className="text-sm sm:text-base font-black text-slate-900 dark:text-white tracking-tight truncate">
            {title}
          </h2>
          <p className="text-[11px] sm:text-xs text-slate-500 dark:text-slate-400 font-medium truncate">
            {subtitle}
          </p>
        </div>
      </div>

      {presetOptions && presetOptions.length > 0 && onSelectPreset && (
        <ClaySelect
          placeholder={presetPlaceholder}
          options={presetOptions}
          onChange={onSelectPreset}
          className="w-full sm:w-auto shrink-0"
        />
      )}
    </div>
  );
};
