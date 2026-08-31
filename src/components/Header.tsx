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
    <header className="sticky top-0 z-30 backdrop-blur-md bg-slate-950/85 border-b border-slate-800/80 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex flex-wrap items-center justify-between gap-3">
        {/* Brand */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 via-purple-600 to-pink-500 p-0.5 shadow-md shadow-indigo-500/20 flex items-center justify-center">
            <div className="w-full h-full bg-slate-950/60 rounded-[10px] flex items-center justify-center">
              <Layers className="w-5 h-5 text-indigo-400" />
            </div>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl font-bold bg-gradient-to-r from-white via-slate-100 to-indigo-300 bg-clip-text text-transparent">
                LayerCost
              </h1>
              <span className="text-[10px] uppercase tracking-wider font-semibold px-2 py-0.5 rounded-full bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
                PWA
              </span>
            </div>
            <p className="text-xs text-slate-400 hidden sm:block">
              3D Baskı Maliyet & Fiyatlandırma Hesaplayıcı
            </p>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex items-center flex-wrap gap-2">
          {/* Currency Switcher */}
          <div className="inline-flex bg-slate-900/90 border border-slate-800 rounded-lg p-1">
            {(['TRY', 'USD', 'EUR', 'GBP'] as Currency[]).map((curr) => (
              <button
                key={curr}
                type="button"
                onClick={() => onCurrencyChange(curr)}
                className={`px-2.5 py-1 text-xs font-semibold rounded-md transition-all cursor-pointer ${
                  currency === curr
                    ? 'bg-indigo-600 text-white shadow-sm'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
                }`}
              >
                {curr === 'TRY' ? '₺ TL' : curr === 'USD' ? '$ USD' : curr === 'EUR' ? '€ EUR' : '£ GBP'}
              </button>
            ))}
          </div>

          {/* Profiles Modal */}
          <button
            type="button"
            onClick={onOpenProfiles}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium bg-slate-900 hover:bg-slate-800 text-slate-200 border border-slate-800 rounded-lg transition shadow-sm hover:border-slate-700 active:scale-95 cursor-pointer"
            title="Kayıtlı Profiller"
          >
            <Bookmark className="w-3.5 h-3.5 text-purple-400" />
            <span className="hidden sm:inline">Profiller</span>
          </button>

          {/* Quote Button */}
          <button
            type="button"
            onClick={onOpenQuote}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium bg-slate-900 hover:bg-slate-800 text-slate-200 border border-slate-800 rounded-lg transition shadow-sm hover:border-slate-700 active:scale-95 cursor-pointer"
            title="Teklif / Fiş Çıktısı"
          >
            <FileText className="w-3.5 h-3.5 text-emerald-400" />
            <span className="hidden sm:inline">Teklif Özeti</span>
          </button>

          {/* Reset Button */}
          <button
            type="button"
            onClick={onReset}
            className="p-1.5 text-slate-400 hover:text-slate-200 hover:bg-slate-800/60 rounded-lg transition cursor-pointer"
            title="Varsayılan Değerlere Sıfırla"
          >
            <RotateCcw className="w-4 h-4" />
          </button>

          {/* PWA Install Button */}
          {installPrompt && !isStandalone && (
            <button
              type="button"
              onClick={onInstallApp}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white rounded-lg transition shadow-md shadow-indigo-600/20 active:scale-95 animate-pulse cursor-pointer"
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
