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
    <div className="clay-card p-6 relative overflow-hidden transition-all duration-300">
      {/* Header */}
      <div className="flex items-center justify-between gap-3 mb-6 pb-4 border-b border-slate-800/80">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-600 shadow-[3px_4px_10px_rgba(16,185,129,0.35),inset_2px_2px_3px_rgba(255,255,255,0.3),inset_-2px_-3px_5px_rgba(0,0,0,0.4)] flex items-center justify-center">
            <TrendingUp className="w-5 h-5 text-white" />
          </div>
          <div>
            <h2 className="text-base font-extrabold text-white tracking-tight">
              Risk, Kar & Proje Bilgisi
            </h2>
            <p className="text-xs text-slate-400 font-medium">Fire payı, kar marjı ve müşteri detayları</p>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        {/* Hata / Fire Payı (%) */}
        <div className="clay-inset p-4 rounded-2xl">
          <div className="flex items-center justify-between mb-2">
            <label className="flex items-center gap-1.5 text-xs font-bold text-slate-200">
              <AlertTriangle className="w-4 h-4 text-rose-400" />
              <span>Hata / Fire / Risk Payı</span>
            </label>
            <span className="text-xs font-extrabold text-rose-400 font-mono clay-pill-active px-2.5 py-0.5 rounded-full">
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
              className="clay-slider w-full cursor-pointer"
            />
            <input
              type="number"
              min="0"
              max="100"
              value={inputs.failureRatePercent || 0}
              onChange={(e) => onChange('failureRatePercent', Math.max(0, parseFloat(e.target.value) || 0))}
              className="clay-input w-16 px-2 py-1.5 text-xs text-center text-white font-mono font-bold"
            />
          </div>
          <p className="text-[10px] text-slate-500 font-medium mt-2">
            Baskı bozulmaları, nozül tıkanması ve test baskıları için güvenlik tamponu (Önerilen: %5 - %15)
          </p>
        </div>

        {/* Kar Marjı (%) */}
        <div className="clay-inset p-4 rounded-2xl">
          <div className="flex items-center justify-between mb-2">
            <label className="flex items-center gap-1.5 text-xs font-bold text-slate-200">
              <TrendingUp className="w-4 h-4 text-emerald-400" />
              <span>Hedef Kar Marjı</span>
            </label>
            <span className="text-xs font-extrabold text-emerald-400 font-mono clay-pill-active px-2.5 py-0.5 rounded-full">
              %{inputs.profitMarginPercent}
            </span>
          </div>

          <div className="flex items-center gap-3 mb-2">
            <input
              type="range"
              min="0"
              max="150"
              step="5"
              value={inputs.profitMarginPercent || 0}
              onChange={(e) => onChange('profitMarginPercent', parseFloat(e.target.value) || 0)}
              className="clay-slider w-full cursor-pointer"
            />
            <input
              type="number"
              min="0"
              max="500"
              value={inputs.profitMarginPercent || 0}
              onChange={(e) => onChange('profitMarginPercent', Math.max(0, parseFloat(e.target.value) || 0))}
              className="clay-input w-16 px-2 py-1.5 text-xs text-center text-white font-mono font-bold"
            />
          </div>

          {/* Quick Margin Pills */}
          <div className="flex gap-1.5 flex-wrap">
            {[20, 35, 50, 75, 100].map((margin) => (
              <button
                key={margin}
                type="button"
                onClick={() => onChange('profitMarginPercent', margin)}
                className={`text-xs px-2.5 py-1 rounded-lg font-bold transition-all cursor-pointer ${
                  inputs.profitMarginPercent === margin
                    ? 'clay-pill-active text-emerald-300 border-emerald-500/40 shadow-inner'
                    : 'clay-pill-inactive text-slate-400'
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
            <label className="flex items-center gap-1 text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-1.5">
              <FolderGit2 className="w-3.5 h-3.5 text-slate-400" />
              Proje / Model Adı
            </label>
            <input
              type="text"
              value={inputs.projectName}
              onChange={(e) => onChange('projectName', e.target.value)}
              placeholder="örn: Dron Gövdesi V2"
              className="clay-input w-full px-3.5 py-2 text-xs text-slate-100 placeholder-slate-500 font-medium"
            />
          </div>

          <div>
            <label className="flex items-center gap-1 text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-1.5">
              <User className="w-3.5 h-3.5 text-slate-400" />
              Müşteri Adı (Opsiyonel)
            </label>
            <input
              type="text"
              value={inputs.clientName}
              onChange={(e) => onChange('clientName', e.target.value)}
              placeholder="örn: Ahmet Yılmaz"
              className="clay-input w-full px-3.5 py-2 text-xs text-slate-100 placeholder-slate-500 font-medium"
            />
          </div>
        </div>
      </div>
    </div>
  );
};
