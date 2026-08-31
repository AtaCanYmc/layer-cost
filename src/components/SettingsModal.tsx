import React from 'react';
import { 
  Settings, 
  X, 
  Sun, 
  Moon, 
  Globe, 
  Coins, 
  Download, 
  RotateCcw, 
  Check, 
  Info
} from 'lucide-react';
import type { Currency, Language, Theme } from '../types/calculator';
import { useTranslation } from '../i18n/translations';

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  theme: Theme;
  onToggleTheme: () => void;
  onSetTheme: (theme: Theme) => void;
  lang: Language;
  onLanguageChange: (lang: Language) => void;
  currency: Currency;
  onCurrencyChange: (currency: Currency) => void;
  isRatesLive?: boolean;
  onReset: () => void;
  installPrompt: Event | null;
  onInstallApp: () => void;
  isStandalone: boolean;
}

export const SettingsModal: React.FC<SettingsModalProps> = ({
  isOpen,
  onClose,
  theme,
  onSetTheme,
  lang,
  onLanguageChange,
  currency,
  onCurrencyChange,
  isRatesLive,
  onReset,
  installPrompt,
  onInstallApp,
  isStandalone,
}) => {
  const { t } = useTranslation(lang);

  if (!isOpen) return null;

  const currencies: { code: Currency; label: string; symbol: string }[] = [
    { code: 'TRY', label: 'Türk Lirası', symbol: '₺' },
    { code: 'USD', label: 'US Dollar', symbol: '$' },
    { code: 'EUR', label: 'Euro', symbol: '€' },
    { code: 'GBP', label: 'British Pound', symbol: '£' },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 dark:bg-[#070b14]/85 backdrop-blur-md animate-fadeIn">
      <div className="clay-card w-full max-w-lg shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200 dark:border-slate-800 bg-slate-100 dark:bg-[#0c1220]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 shadow-[2px_3px_8px_rgba(99,102,241,0.35),inset_1.5px_1.5px_2px_rgba(255,255,255,0.3)] flex items-center justify-center">
              <Settings className="w-5 h-5 text-white animate-spin-slow" />
            </div>
            <div>
              <h2 className="text-base font-black text-slate-900 dark:text-white">
                {t('settingsTitle')}
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">
                {t('settingsSubtitle')}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="clay-stepper-btn p-2 text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto space-y-6">
          {/* 1. Theme Selection */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <Sun className="w-4 h-4 text-amber-500" />
              <h3 className="text-xs font-extrabold uppercase tracking-wider text-slate-700 dark:text-slate-300">
                {t('themeSection')}
              </h3>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => onSetTheme('light')}
                className={`p-3.5 rounded-2xl flex items-center gap-3 transition-all cursor-pointer ${
                  theme === 'light'
                    ? 'clay-hero-card border-2 border-indigo-500 ring-2 ring-indigo-500/20'
                    : 'clay-inset hover:bg-slate-200/50 dark:hover:bg-slate-800/50'
                }`}
              >
                <div className="w-8 h-8 rounded-xl bg-amber-100 dark:bg-amber-950/40 text-amber-600 flex items-center justify-center shrink-0 shadow-sm">
                  <Sun className="w-4 h-4" />
                </div>
                <div className="text-left">
                  <span className="text-xs font-black block text-slate-900 dark:text-white">
                    {t('themeLight')}
                  </span>
                  <span className="text-[10px] text-slate-500">Porcelain Clay</span>
                </div>
                {theme === 'light' && (
                  <Check className="w-4 h-4 text-indigo-600 ml-auto shrink-0" />
                )}
              </button>

              <button
                type="button"
                onClick={() => onSetTheme('dark')}
                className={`p-3.5 rounded-2xl flex items-center gap-3 transition-all cursor-pointer ${
                  theme === 'dark'
                    ? 'clay-hero-card border-2 border-indigo-500 ring-2 ring-indigo-500/20'
                    : 'clay-inset hover:bg-slate-200/50 dark:hover:bg-slate-800/50'
                }`}
              >
                <div className="w-8 h-8 rounded-xl bg-indigo-950/60 text-indigo-400 flex items-center justify-center shrink-0 shadow-sm">
                  <Moon className="w-4 h-4" />
                </div>
                <div className="text-left">
                  <span className="text-xs font-black block text-slate-900 dark:text-white">
                    {t('themeDark')}
                  </span>
                  <span className="text-[10px] text-slate-500">Charcoal Clay</span>
                </div>
                {theme === 'dark' && (
                  <Check className="w-4 h-4 text-indigo-400 ml-auto shrink-0" />
                )}
              </button>
            </div>
          </div>

          {/* 2. Language Selection */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <Globe className="w-4 h-4 text-indigo-500" />
              <h3 className="text-xs font-extrabold uppercase tracking-wider text-slate-700 dark:text-slate-300">
                {t('langSection')}
              </h3>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => onLanguageChange('tr')}
                className={`p-3.5 rounded-2xl flex items-center gap-3 transition-all cursor-pointer ${
                  lang === 'tr'
                    ? 'clay-hero-card border-2 border-indigo-500 ring-2 ring-indigo-500/20'
                    : 'clay-inset hover:bg-slate-200/50 dark:hover:bg-slate-800/50'
                }`}
              >
                <span className="text-xl">🇹🇷</span>
                <div className="text-left">
                  <span className="text-xs font-black block text-slate-900 dark:text-white">
                    Türkçe
                  </span>
                  <span className="text-[10px] text-slate-500">TR</span>
                </div>
                {lang === 'tr' && (
                  <Check className="w-4 h-4 text-indigo-600 dark:text-indigo-400 ml-auto shrink-0" />
                )}
              </button>

              <button
                type="button"
                onClick={() => onLanguageChange('en')}
                className={`p-3.5 rounded-2xl flex items-center gap-3 transition-all cursor-pointer ${
                  lang === 'en'
                    ? 'clay-hero-card border-2 border-indigo-500 ring-2 ring-indigo-500/20'
                    : 'clay-inset hover:bg-slate-200/50 dark:hover:bg-slate-800/50'
                }`}
              >
                <span className="text-xl">🇬🇧</span>
                <div className="text-left">
                  <span className="text-xs font-black block text-slate-900 dark:text-white">
                    English
                  </span>
                  <span className="text-[10px] text-slate-500">EN</span>
                </div>
                {lang === 'en' && (
                  <Check className="w-4 h-4 text-indigo-600 dark:text-indigo-400 ml-auto shrink-0" />
                )}
              </button>
            </div>
          </div>

          {/* 3. Currency & Live Rates */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <Coins className="w-4 h-4 text-emerald-500" />
                <h3 className="text-xs font-extrabold uppercase tracking-wider text-slate-700 dark:text-slate-300">
                  {t('currencySection')}
                </h3>
              </div>
              {isRatesLive && (
                <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[10px] font-extrabold bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  {t('liveRates')}
                </span>
              )}
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
              {currencies.map((c) => (
                <button
                  key={c.code}
                  type="button"
                  onClick={() => onCurrencyChange(c.code)}
                  className={`p-3 rounded-2xl flex flex-col items-center justify-center transition-all cursor-pointer text-center ${
                    currency === c.code
                      ? 'clay-hero-card border-2 border-indigo-500 ring-2 ring-indigo-500/20'
                      : 'clay-inset hover:bg-slate-200/50 dark:hover:bg-slate-800/50'
                  }`}
                >
                  <span className="text-base font-black font-mono text-indigo-600 dark:text-indigo-400">
                    {c.symbol}
                  </span>
                  <span className="text-xs font-bold text-slate-900 dark:text-white mt-0.5">
                    {c.code}
                  </span>
                  <span className="text-[9px] text-slate-500 truncate max-w-full">
                    {c.label}
                  </span>
                </button>
              ))}
            </div>
            <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-2 leading-relaxed">
              {t('liveRatesDesc')}
            </p>
          </div>

          {/* 4. PWA Installation (If available) */}
          {installPrompt && !isStandalone && (
            <div className="clay-inset p-4 rounded-2xl flex items-center justify-between gap-3">
              <div>
                <span className="text-xs font-extrabold text-slate-900 dark:text-white block">
                  {t('installedPwa')}
                </span>
                <p className="text-[11px] text-slate-500 dark:text-slate-400">
                  {t('installAppDesc')}
                </p>
              </div>
              <button
                type="button"
                onClick={onInstallApp}
                className="clay-btn-primary px-3.5 py-2 text-white text-xs font-bold shrink-0 flex items-center gap-1.5 cursor-pointer"
              >
                <Download className="w-3.5 h-3.5" />
                <span>{t('install')}</span>
              </button>
            </div>
          )}

          {/* 5. Reset to Factory Defaults */}
          <div className="pt-2 border-t border-slate-200 dark:border-slate-800/80 flex items-center justify-between">
            <div className="flex items-center gap-2 text-slate-500">
              <Info className="w-4 h-4" />
              <span className="text-xs">{t('version')}: <strong className="font-mono text-slate-700 dark:text-slate-300">v1.0.0</strong></span>
            </div>
            <button
              type="button"
              onClick={() => {
                onReset();
                onClose();
              }}
              className="text-rose-500 hover:text-rose-600 dark:text-rose-400 dark:hover:text-rose-300 text-xs font-bold flex items-center gap-1.5 px-3 py-1.5 rounded-xl hover:bg-rose-500/10 transition-colors cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>{t('reset')}</span>
            </button>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="px-6 py-3.5 border-t border-slate-200 dark:border-slate-800 bg-slate-100 dark:bg-[#0c1220] flex justify-end">
          <button
            type="button"
            onClick={onClose}
            className="clay-btn-primary px-5 py-2 text-white text-xs font-extrabold cursor-pointer"
          >
            {t('close')}
          </button>
        </div>
      </div>
    </div>
  );
};
