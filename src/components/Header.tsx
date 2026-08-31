import React from 'react';
import { 
  RotateCcw, 
  Bookmark, 
  FileText, 
  Download, 
  Layers
} from 'lucide-react';
import type { Currency } from '../types/calculator';

interface HeaderProps {
  currency: Currency;
  onCurrencyChange: (currency: Currency) => void;
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
  onReset,
  onOpenProfiles,
  onOpenQuote,
  installPrompt,
  onInstallApp,
  isStandalone,
}) => {
  return (
    <header className="sticky top-0 z-30 backdrop-blur-md bg-[#0b101d]/90 border-b border-slate-800/80 shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex flex-wrap items-center justify-between gap-3">
        {/* Brand with 3D Clay Icon */}
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-indigo-500 via-indigo-600 to-purple-600 p-0.5 shadow-[4px_5px_12px_rgba(79,70,229,0.4),inset_2px_2px_3px_rgba(255,255,255,0.35),inset_-2px_-3px_5px_rgba(0,0,0,0.4)] flex items-center justify-center">
            <Layers className="w-5 h-5 text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.3)]" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-lg sm:text-xl font-black tracking-tight text-white">
                Layer<span className="text-indigo-400">Cost</span>
              </h1>
              <span className="text-[10px] uppercase tracking-wider font-extrabold px-2.5 py-0.5 rounded-full clay-inset text-indigo-300 font-mono">
                CLAY 3D
              </span>
            </div>
            <p className="text-[11px] text-slate-400 font-medium hidden sm:block">
              3D Baskı Maliyet & Fiyatlandırma Sistemi
            </p>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex items-center flex-wrap gap-2.5">
          {/* Tactile Currency Switcher */}
          <div className="clay-inset p-1 rounded-xl flex items-center gap-1">
            {(['TRY', 'USD', 'EUR', 'GBP'] as Currency[]).map((curr) => (
              <button
                key={curr}
                type="button"
                onClick={() => onCurrencyChange(curr)}
                className={`px-3 py-1 text-xs font-bold rounded-lg transition-all cursor-pointer ${
                  currency === curr
                    ? 'clay-pill-active font-mono'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/40'
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
            className="clay-btn-secondary inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-bold text-slate-200 cursor-pointer"
            title="Kayıtlı Profiller"
          >
            <Bookmark className="w-3.5 h-3.5 text-purple-400" />
            <span className="hidden sm:inline">Profiller</span>
          </button>

          {/* Quote Button */}
          <button
            type="button"
            onClick={onOpenQuote}
            className="clay-btn-secondary inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-bold text-slate-200 cursor-pointer"
            title="Teklif / Fiş Çıktısı"
          >
            <FileText className="w-3.5 h-3.5 text-emerald-400" />
            <span className="hidden sm:inline">Teklif Özeti</span>
          </button>

          {/* Reset Button */}
          <button
            type="button"
            onClick={onReset}
            className="clay-stepper-btn p-2 text-slate-400 hover:text-slate-200 cursor-pointer"
            title="Varsayılan Değerlere Sıfırla"
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
              <span>Yükle</span>
            </button>
          )}
        </div>
      </div>
    </header>
  );
};
