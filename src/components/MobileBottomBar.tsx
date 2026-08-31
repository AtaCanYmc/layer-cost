import React from 'react';
import { TrendingUp, SlidersHorizontal, FileText } from 'lucide-react';
import type { Currency, Language } from '../types/calculator';
import { formatCurrency } from '../utils/calculator';
import { useTranslation } from '../i18n/translations';

interface MobileBottomBarProps {
  finalPrice: number;
  currency: Currency;
  lang: Language;
  mobileTab: 'inputs' | 'results';
  onToggleTab: (tab: 'inputs' | 'results') => void;
  onOpenQuote: () => void;
}

export const MobileBottomBar: React.FC<MobileBottomBarProps> = ({
  finalPrice,
  currency,
  lang,
  mobileTab,
  onToggleTab,
  onOpenQuote,
}) => {
  const { t } = useTranslation(lang);

  return (
    <div className="lg:hidden fixed bottom-3 left-3 right-3 z-30 animate-fadeIn">
      <div className="clay-hero-card p-3 px-4 flex items-center justify-between shadow-2xl backdrop-blur-xl border border-white/40 dark:border-white/10">
        <div className="min-w-0 pr-2">
          <span className="text-[10px] font-extrabold text-slate-500 dark:text-slate-400 uppercase tracking-wider block truncate">
            {t('recommendedPrice')}
          </span>
          <div className="text-lg sm:text-xl font-black font-mono text-slate-900 dark:text-white truncate">
            {formatCurrency(finalPrice, currency, lang)}
          </div>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          {mobileTab === 'inputs' ? (
            <button
              type="button"
              onClick={() => {
                onToggleTab('results');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="clay-btn-primary px-3.5 py-2 text-white text-xs font-extrabold flex items-center gap-1.5 cursor-pointer shadow-md"
            >
              <TrendingUp className="w-4 h-4" />
              <span>{t('mobileResults')}</span>
            </button>
          ) : (
            <button
              type="button"
              onClick={() => {
                onToggleTab('inputs');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="clay-btn-secondary px-3.5 py-2 text-xs font-bold flex items-center gap-1.5 cursor-pointer"
            >
              <SlidersHorizontal className="w-4 h-4 text-indigo-500" />
              <span>{t('mobileParams')}</span>
            </button>
          )}

          <button
            type="button"
            onClick={onOpenQuote}
            className="clay-btn-secondary p-2 text-emerald-600 dark:text-emerald-400 cursor-pointer"
            title={t('quoteSummary')}
          >
            <FileText className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
