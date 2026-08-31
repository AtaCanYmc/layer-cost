import React from 'react';
import { UserCheck, PackagePlus, Timer, Wrench } from 'lucide-react';
import type { CalculationInputs, InputValue, Language } from '../types/calculator';
import { formatCurrency } from '../utils/calculator';
import { useTranslation } from '../i18n/translations';

interface LaborSectionProps {
  inputs: CalculationInputs;
  onChange: (field: keyof CalculationInputs, value: InputValue) => void;
  lang: Language;
}

export const LaborSection: React.FC<LaborSectionProps> = ({
  inputs,
  onChange,
  lang,
}) => {
  const { t } = useTranslation(lang);
  const laborCostTotal = (inputs.laborMinutes / 60) * inputs.hourlyLaborRate;

  return (
    <div className="clay-card p-6 relative overflow-hidden transition-all duration-300">
      {/* Header */}
      <div className="flex items-center justify-between gap-3 mb-6 pb-4 border-b border-slate-200 dark:border-slate-800/80">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-amber-500 to-orange-600 shadow-[3px_4px_10px_rgba(245,158,11,0.35),inset_2px_2px_3px_rgba(255,255,255,0.3),inset_-2px_-3px_5px_rgba(0,0,0,0.4)] flex items-center justify-center">
            <Wrench className="w-5 h-5 text-white" />
          </div>
          <div>
            <h2 className="text-base font-extrabold text-slate-900 dark:text-white tracking-tight">
              {t('laborTitle')}
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">{t('laborSubtitle')}</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* İşçilik Süresi */}
        <div>
          <label className="flex items-center justify-between text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5 uppercase tracking-wider text-[11px]">
            <span className="flex items-center gap-1.5">
              <Timer className="w-3.5 h-3.5 text-amber-500 dark:text-amber-400" />
              {t('laborDuration')}
            </span>
            <span className="text-[10px] text-slate-500 dark:text-slate-400 font-mono font-semibold">{t('minutes')}</span>
          </label>
          <div className="relative">
            <input
              type="number"
              min="0"
              step="5"
              value={inputs.laborMinutes || 0}
              onChange={(e) => onChange('laborMinutes', Math.max(0, parseFloat(e.target.value) || 0))}
              className="clay-input w-full px-4 py-2.5 text-sm text-slate-900 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-500 font-mono font-bold"
            />
            <span className="absolute right-3.5 top-2.5 text-xs text-slate-500 dark:text-slate-400 font-bold">{lang === 'en' ? 'min' : 'dk'}</span>
          </div>

          {/* Quick Minute Clay Pills */}
          <div className="flex gap-1.5 mt-2 flex-wrap">
            {[10, 20, 30, 45, 60].map((mins) => (
              <button
                key={mins}
                type="button"
                onClick={() => onChange('laborMinutes', mins)}
                className={`text-xs px-2.5 py-1 rounded-lg font-bold transition-all cursor-pointer ${
                  inputs.laborMinutes === mins
                    ? 'clay-pill-active text-amber-600 dark:text-amber-300 border-amber-500/40 shadow-inner'
                    : 'clay-pill-inactive text-slate-500 dark:text-slate-400'
                }`}
              >
                {mins} {lang === 'en' ? 'min' : 'dk'}
              </button>
            ))}
          </div>
        </div>

        {/* Saatlik İşçilik Ücreti */}
        <div>
          <label className="flex items-center justify-between text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5 uppercase tracking-wider text-[11px]">
            <span className="flex items-center gap-1.5">
              <UserCheck className="w-3.5 h-3.5 text-emerald-500 dark:text-emerald-400" />
              {t('hourlyRate')}
            </span>
            <span className="text-[10px] text-slate-500 dark:text-slate-400 font-mono font-semibold">{inputs.currency}/{lang === 'en' ? 'hr' : 'saat'}</span>
          </label>
          <div className="relative">
            <input
              type="number"
              min="0"
              step="25"
              value={inputs.hourlyLaborRate || 0}
              onChange={(e) => onChange('hourlyLaborRate', Math.max(0, parseFloat(e.target.value) || 0))}
              className="clay-input w-full px-4 py-2.5 text-sm text-slate-900 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-500 font-mono font-bold"
            />
            <span className="absolute right-3.5 top-2.5 text-xs text-slate-500 dark:text-slate-400 font-bold">
              {inputs.currency}
            </span>
          </div>
          <span className="text-[10px] text-amber-600 dark:text-amber-400 font-bold font-mono mt-1 block">
            {t('totalLaborAmount')}: ~{formatCurrency(laborCostTotal, inputs.currency, lang)}
          </span>
        </div>

        {/* Ekstra Sarf / Donanım */}
        <div className="md:col-span-2">
          <label className="flex items-center justify-between text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5 uppercase tracking-wider text-[11px]">
            <span className="flex items-center gap-1.5">
              <PackagePlus className="w-3.5 h-3.5 text-purple-500 dark:text-purple-400" />
              {t('additionalCosts')}
            </span>
            <span className="text-[10px] text-slate-500 dark:text-slate-400 font-mono font-semibold">{t('fixedAmount')} ({inputs.currency})</span>
          </label>
          <div className="relative">
            <input
              type="number"
              min="0"
              step="5"
              value={inputs.additionalCosts || 0}
              onChange={(e) => onChange('additionalCosts', Math.max(0, parseFloat(e.target.value) || 0))}
              placeholder={t('additionalCostsPlaceholder')}
              className="clay-input w-full px-4 py-2.5 text-sm text-slate-900 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-500 font-mono font-bold"
            />
            <span className="absolute right-3.5 top-2.5 text-xs text-slate-500 dark:text-slate-400 font-bold">
              {inputs.currency}
            </span>
          </div>
          <span className="text-[10px] text-slate-500 font-medium mt-1 block">
            {t('additionalCostsHint')}
          </span>
        </div>
      </div>
    </div>
  );
};
