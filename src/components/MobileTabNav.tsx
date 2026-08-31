import React from 'react';
import { SlidersHorizontal, TrendingUp } from 'lucide-react';
import type { Currency, Language } from '../types/calculator';
import { formatCurrency } from '../utils/calculator';
import { useTranslation } from '../i18n/translations';

interface MobileTabNavProps {
  activeTab: 'inputs' | 'results';
  onTabChange: (tab: 'inputs' | 'results') => void;
  finalPrice: number;
  currency: Currency;
  lang: Language;
}

export const MobileTabNav: React.FC<MobileTabNavProps> = ({
  activeTab,
  onTabChange,
  finalPrice,
  currency,
  lang,
}) => {
  const { t } = useTranslation(lang);

  return (
    <div className="lg:hidden max-w-7xl mx-auto px-4 pt-3.5 w-full">
      <div className="clay-inset p-1.5 rounded-2xl grid grid-cols-2 gap-1.5 shadow-inner">
        <button
          type="button"
          onClick={() => onTabChange('inputs')}
          className={`py-2.5 px-3 rounded-xl text-xs font-extrabold flex items-center justify-center gap-2 transition-all cursor-pointer ${
            activeTab === 'inputs'
              ? 'clay-pill-active'
              : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
          }`}
        >
          <SlidersHorizontal className="w-4 h-4 text-indigo-500 dark:text-indigo-400" />
          <span>{t('mobileParams')}</span>
        </button>

        <button
          type="button"
          onClick={() => onTabChange('results')}
          className={`py-2.5 px-3 rounded-xl text-xs font-extrabold flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
            activeTab === 'results'
              ? 'clay-pill-active'
              : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
          }`}
        >
          <TrendingUp className="w-4 h-4 text-emerald-500 dark:text-emerald-400 shrink-0" />
          <span className="truncate">{t('mobileResults')}</span>
          <span className="font-mono text-[10px] sm:text-[11px] text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 px-1.5 py-0.5 rounded-md shrink-0">
            {formatCurrency(finalPrice, currency, lang)}
          </span>
        </button>
      </div>
    </div>
  );
};
