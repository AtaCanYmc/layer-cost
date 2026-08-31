import React from 'react';
import { Sparkles } from 'lucide-react';

interface PresetOption {
  id: string;
  label: string;
}

interface ClayHeaderProps {
  icon: React.ReactNode;
  iconBgGradient: string;
  iconShadow: string;
  title: string;
  subtitle: string;
  presetPlaceholder?: string;
  presetOptions?: PresetOption[];
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
        <div className="flex items-center gap-1.5 w-full sm:w-auto">
          <Sparkles className="w-3.5 h-3.5 text-amber-500 dark:text-amber-400 hidden md:inline shrink-0" />
          <select
            className="clay-input text-xs text-slate-800 dark:text-slate-200 rounded-xl px-3 py-2 cursor-pointer font-bold w-full sm:w-auto truncate"
            onChange={(e) => {
              if (e.target.value) onSelectPreset(e.target.value);
            }}
            defaultValue=""
          >
            <option value="" disabled>
              {presetPlaceholder || '⚡ Preset Seç'}
            </option>
            {presetOptions.map((opt) => (
              <option key={opt.id} value={opt.id} className="bg-white dark:bg-slate-900 text-slate-900 dark:text-white">
                {opt.label}
              </option>
            ))}
          </select>
        </div>
      )}
    </div>
  );
};
