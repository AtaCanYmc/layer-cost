import { useState, useEffect, useMemo } from 'react';
import { 
  Header 
} from './components/Header';
import { 
  PrinterSection 
} from './components/PrinterSection';
import { 
  FilamentSection 
} from './components/FilamentSection';
import { 
  LaborSection 
} from './components/LaborSection';
import { 
  PricingRiskSection 
} from './components/PricingRiskSection';
import { 
  ResultsOverview 
} from './components/ResultsOverview';
import { 
  SavedProfilesModal 
} from './components/SavedProfilesModal';
import { 
  QuoteExportModal 
} from './components/QuoteExportModal';

import type { CalculationInputs, InputValue, SavedProfile, Language, Theme, Currency } from './types/calculator';
import { DEFAULT_INPUTS, type PrinterPreset, type FilamentPreset } from './data/presets';
import { calculateCost } from './utils/calculator';
import { 
  getCachedExchangeRates, 
  fetchLiveExchangeRates, 
  convertAllMonetaryInputs,
  type ExchangeRates 
} from './utils/currency';
import { useTranslation } from './i18n/translations';
import { 
  Wifi, 
  WifiOff, 
  CheckCircle2, 
  Layers, 
  SlidersHorizontal
} from 'lucide-react';

interface BeforeInstallPromptEvent extends Event {
  readonly platforms: string[];
  readonly userChoice: Promise<{
    outcome: 'accepted' | 'dismissed';
    platform: string;
  }>;
  prompt(): Promise<void>;
}

const STORAGE_KEY_INPUTS = 'layercost_inputs_v1';
const STORAGE_KEY_PROFILES = 'layercost_profiles_v1';
const STORAGE_KEY_THEME = 'layercost_theme_v1';
const STORAGE_KEY_LANG = 'layercost_lang_v1';

export function App() {
  // Theme State
  const [theme, setTheme] = useState<Theme>(() => {
    try {
      const savedTheme = localStorage.getItem(STORAGE_KEY_THEME) as Theme;
      if (savedTheme === 'dark' || savedTheme === 'light') return savedTheme;
      if (typeof window !== 'undefined' && window.matchMedia('(prefers-color-scheme: light)').matches) {
        return 'light';
      }
    } catch {
      // fallback
    }
    return 'dark';
  });

  // Language State
  const [lang, setLang] = useState<Language>(() => {
    try {
      const savedLang = localStorage.getItem(STORAGE_KEY_LANG) as Language;
      if (savedLang === 'tr' || savedLang === 'en') return savedLang;
      if (typeof navigator !== 'undefined' && !navigator.language.startsWith('tr')) {
        return 'en';
      }
    } catch {
      // fallback
    }
    return 'tr';
  });

  const { t } = useTranslation(lang);

  // Sync theme with <html> class
  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
      root.classList.remove('light');
    } else {
      root.classList.add('light');
      root.classList.remove('dark');
    }
    try {
      localStorage.setItem(STORAGE_KEY_THEME, theme);
    } catch {
      // ignore
    }
  }, [theme]);

  const handleToggleTheme = () => {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
  };

  const handleLanguageChange = (newLang: Language) => {
    setLang(newLang);
    try {
      localStorage.setItem(STORAGE_KEY_LANG, newLang);
    } catch {
      // ignore
    }
  };

  // 1. Initial State from LocalStorage
  const [inputs, setInputs] = useState<CalculationInputs>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_INPUTS);
      if (saved) {
        return { ...DEFAULT_INPUTS, ...JSON.parse(saved) };
      }
    } catch (e) {
      console.warn('LocalStorage inputs parse warning:', e);
    }
    return DEFAULT_INPUTS;
  });

  const [savedProfiles, setSavedProfiles] = useState<SavedProfile[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_PROFILES);
      if (saved) {
        return JSON.parse(saved);
      }
    } catch (e) {
      console.warn('LocalStorage profiles parse warning:', e);
    }
    return [
      {
        id: 'default-bambu-p1s',
        name: 'Bambu Lab P1S (Standart PLA)',
        type: 'full',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        data: DEFAULT_INPUTS,
        isDefault: true,
      },
    ];
  });

  // Exchange Rates State
  const [exchangeRates, setExchangeRates] = useState<ExchangeRates>(getCachedExchangeRates);
  const [isRatesLive, setIsRatesLive] = useState(false);

  // Modal States
  const [isProfilesOpen, setIsProfilesOpen] = useState(false);
  const [isQuoteOpen, setIsQuoteOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Network status for PWA offline indicator
  const [isOnline, setIsOnline] = useState(navigator.onLine);

  // PWA Install Prompt
  const [installPrompt, setInstallPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [isStandalone] = useState(() => {
    if (typeof window !== 'undefined') {
      return window.matchMedia('(display-mode: standalone)').matches;
    }
    return false;
  });

  // Fetch live exchange rates on mount
  useEffect(() => {
    fetchLiveExchangeRates().then(({ rates, isLive }) => {
      setExchangeRates(rates);
      setIsRatesLive(isLive);
    });
  }, []);

  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    // PWA install prompt handler
    const handleBeforeInstall = (e: Event) => {
      e.preventDefault();
      setInstallPrompt(e as BeforeInstallPromptEvent);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstall);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
      window.removeEventListener('beforeinstallprompt', handleBeforeInstall);
    };
  }, []);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3000);
  };

  // Currency Conversion Handler (Converts monetary inputs with live exchange rates)
  const handleCurrencyChange = (newCurrency: Currency) => {
    if (newCurrency === inputs.currency) return;
    const oldCurrency = inputs.currency;
    const converted = convertAllMonetaryInputs(inputs, newCurrency, exchangeRates);
    setInputs(converted);
    try {
      localStorage.setItem(STORAGE_KEY_INPUTS, JSON.stringify(converted));
    } catch (e) {
      console.warn('Storage error on currency change:', e);
    }
    showToast(`${oldCurrency} → ${newCurrency}: ${t('currencyConvertedToast')}`);
  };

  // Save current inputs to LocalStorage
  const handleSaveToLocalStorage = () => {
    try {
      localStorage.setItem(STORAGE_KEY_INPUTS, JSON.stringify(inputs));
      showToast(t('savedToast'));
    } catch (e) {
      console.error('Save error:', e);
    }
  };

  // Real-time calculation
  const results = useMemo(() => {
    return calculateCost(inputs);
  }, [inputs]);

  // Form input update handler
  const handleInputChange = (field: keyof CalculationInputs, value: InputValue) => {
    setInputs((prev) => {
      const updated = { ...prev, [field]: value };
      // Autosave lightweight changes
      try {
        localStorage.setItem(STORAGE_KEY_INPUTS, JSON.stringify(updated));
      } catch (e) {
        console.warn('Autosave warning:', e);
      }
      return updated;
    });
  };

  // Preset Handlers
  const handleApplyPrinterPreset = (preset: PrinterPreset) => {
    setInputs((prev) => ({
      ...prev,
      printerName: preset.name,
      printerPower: preset.powerWatt,
      printerPrice: preset.price,
      printerLifespanHours: preset.lifespanHours,
    }));
    showToast(`"${preset.name}" ${t('profileLoadedToast')}`);
  };

  const handleApplyFilamentPreset = (preset: FilamentPreset) => {
    setInputs((prev) => ({
      ...prev,
      filamentType: preset.type,
      spoolPrice: preset.spoolPrice,
      spoolWeight: preset.spoolWeight,
    }));
    showToast(`"${preset.name}" ${t('profileLoadedToast')}`);
  };

  // Reset to default
  const handleReset = () => {
    if (window.confirm(t('resetConfirm'))) {
      setInputs(DEFAULT_INPUTS);
      try {
        localStorage.setItem(STORAGE_KEY_INPUTS, JSON.stringify(DEFAULT_INPUTS));
      } catch (e) {
        console.warn('Reset storage warning:', e);
      }
      showToast(t('resetToast'));
    }
  };

  // Profile Management
  const handleSaveNewProfile = (name: string) => {
    const newProfile: SavedProfile = {
      id: 'profile_' + Date.now(),
      name,
      type: 'full',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      data: { ...inputs },
    };

    const updated = [newProfile, ...savedProfiles];
    setSavedProfiles(updated);
    try {
      localStorage.setItem(STORAGE_KEY_PROFILES, JSON.stringify(updated));
    } catch (e) {
      console.warn('Save profile storage warning:', e);
    }
    showToast(`"${name}" ${t('profileSavedToast')}`);
  };

  const handleLoadProfile = (profile: SavedProfile) => {
    setInputs((prev) => ({
      ...prev,
      ...profile.data,
    }));
    showToast(`"${profile.name}" ${t('profileLoadedToast')}`);
  };

  const handleDeleteProfile = (id: string) => {
    const updated = savedProfiles.filter((p) => p.id !== id);
    setSavedProfiles(updated);
    try {
      localStorage.setItem(STORAGE_KEY_PROFILES, JSON.stringify(updated));
    } catch (e) {
      console.warn('Delete profile storage warning:', e);
    }
    showToast(t('profileDeletedToast'));
  };

  const handleExportProfiles = () => {
    const dataStr = JSON.stringify({
      version: '1.0',
      exportedAt: new Date().toISOString(),
      currentInputs: inputs,
      profiles: savedProfiles,
    }, null, 2);

    const blob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `layercost-backup-${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleImportProfiles = (jsonStr: string) => {
    const parsed = JSON.parse(jsonStr);
    if (parsed.profiles && Array.isArray(parsed.profiles)) {
      setSavedProfiles(parsed.profiles);
      localStorage.setItem(STORAGE_KEY_PROFILES, JSON.stringify(parsed.profiles));
      if (parsed.currentInputs) {
        setInputs(parsed.currentInputs);
        localStorage.setItem(STORAGE_KEY_INPUTS, JSON.stringify(parsed.currentInputs));
      }
      showToast(t('importSuccessToast'));
    } else {
      throw new Error(t('invalidJson'));
    }
  };

  // PWA Install
  const handleInstallApp = async () => {
    if (!installPrompt) return;
    await installPrompt.prompt();
    const { outcome } = await installPrompt.userChoice;
    if (outcome === 'accepted') {
      setInstallPrompt(null);
    }
  };

  return (
    <div className="min-h-screen bg-[#f0f4f9] dark:bg-[#070b14] text-slate-900 dark:text-slate-100 flex flex-col font-sans selection:bg-indigo-500 selection:text-white transition-colors duration-300">
      {/* Tactile Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-5 right-5 z-50 flex items-center gap-2.5 clay-card px-5 py-3.5 text-slate-900 dark:text-white text-xs font-bold shadow-2xl animate-bounce">
          <CheckCircle2 className="w-4 h-4 text-emerald-500 dark:text-emerald-400 shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Main Header */}
      <Header
        currency={inputs.currency}
        onCurrencyChange={handleCurrencyChange}
        lang={lang}
        onLanguageChange={handleLanguageChange}
        theme={theme}
        onToggleTheme={handleToggleTheme}
        onReset={handleReset}
        onOpenProfiles={() => setIsProfilesOpen(true)}
        onOpenQuote={() => setIsQuoteOpen(true)}
        installPrompt={installPrompt}
        onInstallApp={handleInstallApp}
        isStandalone={isStandalone}
        isRatesLive={isRatesLive}
      />

      {/* Main Content Layout */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
          
          {/* Left Column: Input Categories (7 cols on lg) */}
          <div className="lg:col-span-7 space-y-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <SlidersHorizontal className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
                <h2 className="text-xs font-extrabold uppercase tracking-wider text-slate-700 dark:text-slate-300">
                  {t('calcParamsTitle')}
                </h2>
              </div>
              <span className="text-xs text-slate-500 font-medium">
                {t('instantCalc')}
              </span>
            </div>

            {/* 1. Yazıcı & Elektrik */}
            <PrinterSection
              inputs={inputs}
              onChange={handleInputChange}
              onApplyPreset={handleApplyPrinterPreset}
              lang={lang}
            />

            {/* 2. Filament & Malzeme */}
            <FilamentSection
              inputs={inputs}
              onChange={handleInputChange}
              onApplyPreset={handleApplyFilamentPreset}
              lang={lang}
            />

            {/* 3. İşçilik & Ekstralar */}
            <LaborSection
              inputs={inputs}
              onChange={handleInputChange}
              lang={lang}
            />

            {/* 4. Risk, Kar Marjı & Proje */}
            <PricingRiskSection
              inputs={inputs}
              onChange={handleInputChange}
              lang={lang}
            />
          </div>

          {/* Right Column: Sticky Results & Breakdown (5 cols on lg) */}
          <div className="lg:col-span-5 lg:sticky lg:top-20 space-y-6">
            <ResultsOverview
              inputs={inputs}
              results={results}
              currency={inputs.currency}
              lang={lang}
              onSaveProfile={handleSaveToLocalStorage}
              onOpenQuote={() => setIsQuoteOpen(true)}
            />
          </div>

        </div>
      </main>

      {/* Modals */}
      <SavedProfilesModal
        isOpen={isProfilesOpen}
        onClose={() => setIsProfilesOpen(false)}
        savedProfiles={savedProfiles}
        onLoadProfile={handleLoadProfile}
        onSaveNewProfile={handleSaveNewProfile}
        onDeleteProfile={handleDeleteProfile}
        onExportProfiles={handleExportProfiles}
        onImportProfiles={handleImportProfiles}
        lang={lang}
      />

      <QuoteExportModal
        isOpen={isQuoteOpen}
        onClose={() => setIsQuoteOpen(false)}
        inputs={inputs}
        results={results}
        currency={inputs.currency}
        lang={lang}
      />

      {/* Modern Clay Footer */}
      <footer className="border-t border-slate-200 dark:border-slate-900 bg-slate-100/80 dark:bg-[#070b14]/90 mt-12 py-6 text-xs text-slate-500 no-print transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <Layers className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
            <span className="font-bold text-slate-800 dark:text-slate-300">LayerCost</span>
            <span>— {t('footerText')}</span>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 clay-inset px-3 py-1 rounded-full">
              {isOnline ? (
                <>
                  <Wifi className="w-3.5 h-3.5 text-emerald-500 dark:text-emerald-400" />
                  <span className="text-emerald-600 dark:text-emerald-400 font-bold text-[11px]">{t('online')}</span>
                </>
              ) : (
                <>
                  <WifiOff className="w-3.5 h-3.5 text-amber-500 dark:text-amber-400" />
                  <span className="text-amber-600 dark:text-amber-400 font-bold text-[11px]">{t('offline')}</span>
                </>
              )}
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
