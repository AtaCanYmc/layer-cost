import React from 'react';
import { 
  RotateCcw, 
  Bookmark, 
  FileText, 
  Download, 
  Layers,
  Sun,
  Moon
} from 'lucide-react';
import type { Currency, Language, Theme } from '../types/calculator';
import { useTranslation } from '../i18n/translations';

interface HeaderProps {
  currency: Currency;
  onCurrencyChange: (currency: Currency) => void;
  lang: Language;
  onLanguageChange: (lang: Language) => void;
  theme: Theme;
  onToggleTheme: () => void;
  onReset: () => void;
  onOpenProfiles: () => void;
  onOpenQuote: () => void;
  installPrompt: Event | null;
  onInstallApp: () => void;
  isStandalone: boolean;
}

export const Header: React.FC<HeaderProps> = ({
  currency,
  onCurrencyChange,
  lang,
  onLanguageChange,
  theme,
  onToggleTheme,
  onReset,
  onOpenProfiles,
  onOpenQuote,
  installPrompt,
  onInstallApp,
  isStandalone,
}) => {
  const { t } = useTranslation(lang);

  return (
    <header className="sticky top-0 z-30 backdrop-blur-md bg-slate-100/90 dark:bg-[#0b101d]/90 border-b border-slate-200 dark:border-slate-800/80 shadow-md transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex flex-wrap items-center justify-between gap-3">
        {/* Brand with 3D Clay Icon */}
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-indigo-500 via-indigo-600 to-purple-600 shadow-[4px_5px_12px_rgba(79,70,229,0.4),inset_2px_2px_3px_rgba(255,255,255,0.35),inset_-2px_-3px_5px_rgba(0,0,0,0.4)] flex items-center justify-center">
            <Layers className="w-5 h-5 text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.3)]" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-lg sm:text-xl font-black tracking-tight text-slate-900 dark:text-white">
                Layer<span className="text-indigo-600 dark:text-indigo-400">Cost</span>
              </h1>
              <span className="text-[10px] uppercase tracking-wider font-extrabold px-2.5 py-0.5 rounded-full clay-inset text-indigo-600 dark:text-indigo-300 font-mono">
                {t('pwaReady')}
              </span>
            </div>
            <p className="text-[11px] text-slate-500 dark:text-slate-400 font-medium hidden sm:block">
              {t('tagline')}
            </p>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex items-center flex-wrap gap-2.5">
          {/* Language Switcher */}
          <div className="clay-inset p-1 rounded-xl flex items-center gap-1">
            <button
              type="button"
              onClick={() => onLanguageChange('tr')}
              className={`px-2.5 py-1 text-xs font-extrabold rounded-lg transition-all cursor-pointer flex items-center gap-1 ${
                lang === 'tr'
                  ? 'clay-pill-active'
                  : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
              }`}
            >
              <span>🇹🇷</span>
              <span>TR</span>
            </button>
            <button
              type="button"
              onClick={() => onLanguageChange('en')}
              className={`px-2.5 py-1 text-xs font-extrabold rounded-lg transition-all cursor-pointer flex items-center gap-1 ${
                lang === 'en'
                  ? 'clay-pill-active'
                  : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
              }`}
            >
              <span>🇬🇧</span>
              <span>EN</span>
            </button>
          </div>

          {/* Theme Switcher Button */}
          <button
            type="button"
            onClick={onToggleTheme}
            className="clay-stepper-btn p-2.5 text-slate-600 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-white cursor-pointer"
            title={theme === 'dark' ? t('themeLight') : t('themeDark')}
          >
            {theme === 'dark' ? (
              <Sun className="w-4 h-4 text-amber-400" />
            ) : (
              <Moon className="w-4 h-4 text-indigo-600" />
            )}
          </button>

          {/* Tactile Currency Switcher */}
          <div className="clay-inset p-1 rounded-xl flex items-center gap-1">
            {(['TRY', 'USD', 'EUR', 'GBP'] as Currency[]).map((curr) => (
              <button
                key={curr}
                type="button"
                onClick={() => onCurrencyChange(curr)}
                className={`px-2.5 py-1 text-xs font-bold rounded-lg transition-all cursor-pointer ${
                  currency === curr
                    ? 'clay-pill-active font-mono'
                    : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
                }`}
              >
                {curr === 'TRY' ? '₺ TL' : curr === 'USD' ? '$ USD' : curr === 'EUR' ? '€ EUR' : '£ GBP'}
              </button>
            ))}
          </div>

          {/* Profiles Button */}
          <button
            type="button"
            onClick={onOpenProfiles}
            className="clay-btn-secondary inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-bold cursor-pointer"
            title={t('profiles')}
          >
            <Bookmark className="w-3.5 h-3.5 text-purple-500 dark:text-purple-400" />
            <span className="hidden sm:inline">{t('profiles')}</span>
          </button>

          {/* Quote Button */}
          <button
            type="button"
            onClick={onOpenQuote}
            className="clay-btn-secondary inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-bold cursor-pointer"
            title={t('quoteSummary')}
          >
            <FileText className="w-3.5 h-3.5 text-emerald-500 dark:text-emerald-400" />
            <span className="hidden sm:inline">{t('quoteSummary')}</span>
          </button>

          {/* Reset Button */}
          <button
            type="button"
            onClick={onReset}
            className="clay-stepper-btn p-2 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200 cursor-pointer"
            title={t('reset')}
          >
            <RotateCcw className="w-4 h-4" />
          </button>

          {/* PWA Install Button */}
          {installPrompt && !isStandalone && (
            <button
              type="button"
              onClick={onInstallApp}
              className="clay-btn-primary inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-bold text-white cursor-pointer animate-pulse"
            >
              <Download className="w-3.5 h-3.5" />
              <span>{t('install')}</span>
            </button>
          )}
        </div>
      </div>
    </header>
  );
};
