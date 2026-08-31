import React from 'react';
import { 
  Bookmark, 
  FileText, 
  Settings,
  Sun,
  Moon
} from 'lucide-react';
import type { Language, Theme } from '../types/calculator';
import { useTranslation } from '../i18n/translations';

interface HeaderProps {
  lang: Language;
  theme: Theme;
  onToggleTheme: () => void;
  onOpenProfiles: () => void;
  onOpenQuote: () => void;
  onOpenSettings: () => void;
  isRatesLive?: boolean;
}

export const Header: React.FC<HeaderProps> = ({
  lang,
  theme,
  onToggleTheme,
  onOpenProfiles,
  onOpenQuote,
  onOpenSettings,
  isRatesLive,
}) => {
  const { t } = useTranslation(lang);

  return (
    <header className="sticky top-0 z-30 backdrop-blur-md bg-slate-100/90 dark:bg-[#0b101d]/90 border-b border-slate-200 dark:border-slate-800/80 shadow-md transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center justify-between gap-3">
        {/* Brand with 3D Clay Logo */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-2xl overflow-hidden shadow-[4px_5px_12px_rgba(79,70,229,0.35),inset_2px_2px_3px_rgba(255,255,255,0.35),inset_-2px_-3px_5px_rgba(0,0,0,0.4)] flex items-center justify-center bg-[#23304c] p-0.5 shrink-0">
            <img src={`${import.meta.env.BASE_URL}logo.png`} alt="LayerCost Logo" className="w-full h-full object-cover rounded-[14px]" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-lg sm:text-xl font-black tracking-tight text-slate-900 dark:text-white">
                Layer<span className="text-indigo-600 dark:text-indigo-400">Cost</span>
              </h1>
              <span className="text-[10px] uppercase tracking-wider font-extrabold px-2 py-0.5 rounded-full clay-inset text-indigo-600 dark:text-indigo-300 font-mono">
                {t('pwaReady')}
              </span>
            </div>
            <p className="text-[11px] text-slate-500 dark:text-slate-400 font-medium hidden sm:block">
              {t('tagline')}
            </p>
          </div>
        </div>

        {/* Clean Action Controls */}
        <div className="flex items-center gap-2 sm:gap-2.5">
          {/* Quick Theme Toggle Button */}
          <button
            type="button"
            onClick={onToggleTheme}
            className="clay-stepper-btn p-2 sm:p-2.5 text-slate-600 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-white cursor-pointer transition-all"
            title={theme === 'dark' ? t('themeLight') : t('themeDark')}
          >
            {theme === 'dark' ? (
              <Sun className="w-4 h-4 text-amber-400" />
            ) : (
              <Moon className="w-4 h-4 text-indigo-600" />
            )}
          </button>

          {/* Profiles Button */}
          <button
            type="button"
            onClick={onOpenProfiles}
            className="clay-btn-secondary inline-flex items-center gap-1.5 px-3 sm:px-3.5 py-2 text-xs font-bold cursor-pointer transition-all"
            title={t('profiles')}
          >
            <Bookmark className="w-3.5 h-3.5 text-purple-500 dark:text-purple-400" />
            <span className="hidden sm:inline">{t('profiles')}</span>
          </button>

          {/* Quote Button */}
          <button
            type="button"
            onClick={onOpenQuote}
            className="clay-btn-secondary inline-flex items-center gap-1.5 px-3 sm:px-3.5 py-2 text-xs font-bold cursor-pointer transition-all"
            title={t('quoteSummary')}
          >
            <FileText className="w-3.5 h-3.5 text-emerald-500 dark:text-emerald-400" />
            <span className="hidden sm:inline">{t('quoteSummary')}</span>
          </button>

          {/* Settings Modal Trigger Button */}
          <button
            type="button"
            onClick={onOpenSettings}
            className="clay-stepper-btn p-2 sm:p-2.5 text-slate-600 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-white cursor-pointer relative group transition-all"
            title={t('settings')}
          >
            <Settings className="w-4 h-4 group-hover:rotate-45 transition-transform duration-300" />
            {isRatesLive && (
              <span 
                className="w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_6px_rgba(16,185,129,0.8)] absolute -top-0.5 -right-0.5" 
                title={t('liveRates')}
              />
            )}
          </button>
        </div>
      </div>
    </header>
  );
};
