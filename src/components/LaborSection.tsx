import React from 'react';
import { UserCheck, PackagePlus, Timer, Wrench } from 'lucide-react';
import type { CalculationInputs, InputValue } from '../types/calculator';
import { formatCurrency } from '../utils/calculator';

interface LaborSectionProps {
  inputs: CalculationInputs;
  onChange: (field: keyof CalculationInputs, value: InputValue) => void;
}

export const LaborSection: React.FC<LaborSectionProps> = ({
  inputs,
  onChange,
}) => {
  const laborCostTotal = (inputs.laborMinutes / 60) * inputs.hourlyLaborRate;

  return (
    <div className="bg-slate-900/70 border border-slate-800/80 rounded-2xl p-5 md:p-6 shadow-xl backdrop-blur-sm relative overflow-hidden group hover:border-slate-700/80 transition-all">
      {/* Decorative gradient highlight */}
      <div className="absolute top-0 right-0 -mt-8 -mr-8 w-32 h-32 bg-amber-500/10 rounded-full blur-2xl pointer-events-none" />

      <div className="flex items-center justify-between gap-3 mb-5 border-b border-slate-800/60 pb-3">
        <div className="flex items-center gap-2.5">
          <div className="p-2 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-400">
            <Wrench className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-base font-semibold text-white">İşçilik & Ekstralar</h2>
            <p className="text-xs text-slate-400">Hazırlık, son işlem ve sarf malzemeleri</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* İşçilik Süresi (Dakika) */}
        <div>
          <label className="flex items-center justify-between text-xs font-medium text-slate-300 mb-1.5">
            <span className="flex items-center gap-1">
              <Timer className="w-3.5 h-3.5 text-amber-400" />
              İşçilik Süresi
            </span>
            <span className="text-[11px] text-slate-400">Dakika</span>
          </label>
          <div className="relative">
            <input
              type="number"
              min="0"
              step="5"
              value={inputs.laborMinutes || 0}
              onChange={(e) => onChange('laborMinutes', Math.max(0, parseFloat(e.target.value) || 0))}
              className="w-full bg-slate-950/60 border border-slate-800 rounded-xl px-3.5 py-2.5 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-amber-500/50 focus:border-amber-500 font-mono transition"
            />
            <span className="absolute right-3 top-2.5 text-xs text-slate-400 font-medium">dk</span>
          </div>

          {/* Quick Add Minutes */}
          <div className="flex gap-1.5 mt-2">
            {[10, 20, 30, 60].map((mins) => (
              <button
                key={mins}
                type="button"
                onClick={() => onChange('laborMinutes', mins)}
                className={`text-[11px] px-2 py-0.5 rounded-md border transition cursor-pointer ${
                  inputs.laborMinutes === mins
                    ? 'bg-amber-500/20 text-amber-300 border-amber-500/40'
                    : 'bg-slate-950/40 text-slate-400 border-slate-800 hover:border-slate-700 hover:text-slate-300'
                }`}
              >
                {mins} dk
              </button>
            ))}
          </div>
        </div>

        {/* Saatlik İşçilik Ücreti */}
        <div>
          <label className="flex items-center justify-between text-xs font-medium text-slate-300 mb-1.5">
            <span className="flex items-center gap-1">
              <UserCheck className="w-3.5 h-3.5 text-emerald-400" />
              Saatlik İşçilik Ücreti
            </span>
            <span className="text-[11px] text-slate-400">{inputs.currency}/saat</span>
          </label>
          <div className="relative">
            <input
              type="number"
              min="0"
              step="25"
              value={inputs.hourlyLaborRate || 0}
              onChange={(e) => onChange('hourlyLaborRate', Math.max(0, parseFloat(e.target.value) || 0))}
              className="w-full bg-slate-950/60 border border-slate-800 rounded-xl px-3.5 py-2.5 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-amber-500/50 focus:border-amber-500 font-mono transition"
            />
            <span className="absolute right-3 top-2.5 text-xs text-slate-400 font-medium">
              {inputs.currency}
            </span>
          </div>
          <span className="text-[10px] text-amber-400/90 mt-1 block">
            Toplam İşçilik: ~{formatCurrency(laborCostTotal, inputs.currency)}
          </span>
        </div>

        {/* Ekstra Maliyetler (Paketleme, donanım vs.) */}
        <div className="md:col-span-2">
          <label className="flex items-center justify-between text-xs font-medium text-slate-300 mb-1.5">
            <span className="flex items-center gap-1">
              <PackagePlus className="w-3.5 h-3.5 text-purple-400" />
              Ekstra Sarf / Donanım Maliyeti
            </span>
            <span className="text-[11px] text-slate-400">Sabit Tutar ({inputs.currency})</span>
          </label>
          <div className="relative">
            <input
              type="number"
              min="0"
              step="5"
              value={inputs.additionalCosts || 0}
              onChange={(e) => onChange('additionalCosts', Math.max(0, parseFloat(e.target.value) || 0))}
              placeholder="0"
              className="w-full bg-slate-950/60 border border-slate-800 rounded-xl px-3.5 py-2.5 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-amber-500/50 focus:border-amber-500 font-mono transition"
            />
            <span className="absolute right-3 top-2.5 text-xs text-slate-400 font-medium">
              {inputs.currency}
            </span>
          </div>
          <span className="text-[10px] text-slate-500 mt-1 block">
            Örn: Kargo kutusu, baloncuklu naylon, vida, mıknatıs, pirinç somun, zımpara veya boya maliyeti
          </span>
        </div>
      </div>
    </div>
  );
};
