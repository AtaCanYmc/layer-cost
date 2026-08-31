import React from 'react';
import { AlertTriangle, TrendingUp, FolderGit2, User } from 'lucide-react';
import type { CalculationInputs, InputValue } from '../types/calculator';

interface PricingRiskSectionProps {
  inputs: CalculationInputs;
  onChange: (field: keyof CalculationInputs, value: InputValue) => void;
}

export const PricingRiskSection: React.FC<PricingRiskSectionProps> = ({
  inputs,
  onChange,
}) => {
  return (
    <div className="bg-slate-900/70 border border-slate-800/80 rounded-2xl p-5 md:p-6 shadow-xl backdrop-blur-sm relative overflow-hidden group hover:border-slate-700/80 transition-all">
      {/* Decorative gradient highlight */}
      <div className="absolute top-0 right-0 -mt-8 -mr-8 w-32 h-32 bg-emerald-500/10 rounded-full blur-2xl pointer-events-none" />

      <div className="flex items-center justify-between gap-3 mb-5 border-b border-slate-800/60 pb-3">
        <div className="flex items-center gap-2.5">
          <div className="p-2 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400">
            <TrendingUp className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-base font-semibold text-white">Risk, Kar & Proje</h2>
            <p className="text-xs text-slate-400">Fire payı, kar marjı ve proje bilgisi</p>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        {/* Hata / Fire Payı (%) */}
        <div className="bg-slate-950/40 border border-slate-800/80 rounded-xl p-3.5">
          <div className="flex items-center justify-between mb-2">
            <label className="flex items-center gap-1.5 text-xs font-medium text-slate-300">
              <AlertTriangle className="w-3.5 h-3.5 text-rose-400" />
              <span>Hata / Fire / Risk Payı</span>
            </label>
            <span className="text-xs font-bold text-rose-400 font-mono">
              %{inputs.failureRatePercent}
            </span>
          </div>

          <div className="flex items-center gap-3">
            <input
              type="range"
              min="0"
              max="40"
              step="1"
              value={inputs.failureRatePercent || 0}
              onChange={(e) => onChange('failureRatePercent', parseFloat(e.target.value) || 0)}
              className="w-full accent-rose-500 bg-slate-800 h-2 rounded-lg cursor-pointer"
            />
            <input
              type="number"
              min="0"
              max="100"
              value={inputs.failureRatePercent || 0}
              onChange={(e) => onChange('failureRatePercent', Math.max(0, parseFloat(e.target.value) || 0))}
              className="w-16 bg-slate-900 border border-slate-700 rounded-lg px-2 py-1 text-xs text-center text-white font-mono"
            />
          </div>
          <p className="text-[10px] text-slate-500 mt-1.5">
            Baskı bozulmaları, nozül tıkanması ve test baskıları için güvenlik tamponu (Önerilen: %5 - %15)
          </p>
        </div>

        {/* Kar Marjı (%) */}
        <div className="bg-slate-950/40 border border-slate-800/80 rounded-xl p-3.5">
          <div className="flex items-center justify-between mb-2">
            <label className="flex items-center gap-1.5 text-xs font-medium text-slate-300">
              <TrendingUp className="w-3.5 h-3.5 text-emerald-400" />
              <span>Hedef Kar Marjı</span>
            </label>
            <span className="text-xs font-bold text-emerald-400 font-mono">
              %{inputs.profitMarginPercent}
            </span>
          </div>

          <div className="flex items-center gap-3">
            <input
              type="range"
              min="0"
              max="150"
              step="5"
              value={inputs.profitMarginPercent || 0}
              onChange={(e) => onChange('profitMarginPercent', parseFloat(e.target.value) || 0)}
              className="w-full accent-emerald-500 bg-slate-800 h-2 rounded-lg cursor-pointer"
            />
            <input
              type="number"
              min="0"
              max="500"
              value={inputs.profitMarginPercent || 0}
              onChange={(e) => onChange('profitMarginPercent', Math.max(0, parseFloat(e.target.value) || 0))}
              className="w-16 bg-slate-900 border border-slate-700 rounded-lg px-2 py-1 text-xs text-center text-white font-mono"
            />
          </div>
          <div className="flex gap-1.5 mt-2">
            {[20, 35, 50, 75, 100].map((margin) => (
              <button
                key={margin}
                type="button"
                onClick={() => onChange('profitMarginPercent', margin)}
                className={`text-[11px] px-2 py-0.5 rounded-md border transition cursor-pointer ${
                  inputs.profitMarginPercent === margin
                    ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40'
                    : 'bg-slate-950/40 text-slate-400 border-slate-800 hover:border-slate-700 hover:text-slate-300'
                }`}
              >
                %{margin}
              </button>
            ))}
          </div>
        </div>

        {/* Proje & Müşteri Alanları */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
          <div>
            <label className="flex items-center gap-1 text-[11px] font-medium text-slate-400 mb-1">
              <FolderGit2 className="w-3 h-3 text-slate-400" />
              Proje / Model Adı
            </label>
            <input
              type="text"
              value={inputs.projectName}
              onChange={(e) => onChange('projectName', e.target.value)}
              placeholder="örn: Dron Gövdesi V2"
              className="w-full bg-slate-950/60 border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-100 placeholder-slate-600 focus:outline-none focus:ring-1 focus:ring-emerald-500"
            />
          </div>

          <div>
            <label className="flex items-center gap-1 text-[11px] font-medium text-slate-400 mb-1">
              <User className="w-3 h-3 text-slate-400" />
              Müşteri Adı (Opsiyonel)
            </label>
            <input
              type="text"
              value={inputs.clientName}
              onChange={(e) => onChange('clientName', e.target.value)}
              placeholder="örn: Ahmet Yılmaz"
              className="w-full bg-slate-950/60 border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-100 placeholder-slate-600 focus:outline-none focus:ring-1 focus:ring-emerald-500"
            />
          </div>
        </div>
      </div>
    </div>
  );
};
