import React from 'react';
import { CircleDot, Scale, Sparkles, Tag } from 'lucide-react';
import type { CalculationInputs, InputValue } from '../types/calculator';
import { FILAMENT_PRESETS, type FilamentPreset } from '../data/presets';
import { formatCurrency } from '../utils/calculator';

interface FilamentSectionProps {
  inputs: CalculationInputs;
  onChange: (field: keyof CalculationInputs, value: InputValue) => void;
  onApplyPreset: (preset: FilamentPreset) => void;
}

export const FilamentSection: React.FC<FilamentSectionProps> = ({
  inputs,
  onChange,
  onApplyPreset,
}) => {
  const spoolWeight = inputs.spoolWeight > 0 ? inputs.spoolWeight : 1000;
  const costPerGram = inputs.spoolPrice / spoolWeight;
  const spoolUsagePercent = Math.min(100, (inputs.printWeight / spoolWeight) * 100);

  return (
    <div className="bg-slate-900/70 border border-slate-800/80 rounded-2xl p-5 md:p-6 shadow-xl backdrop-blur-sm relative overflow-hidden group hover:border-slate-700/80 transition-all">
      {/* Decorative gradient highlight */}
      <div className="absolute top-0 right-0 -mt-8 -mr-8 w-32 h-32 bg-pink-500/10 rounded-full blur-2xl pointer-events-none" />

      <div className="flex items-center justify-between gap-3 mb-5 border-b border-slate-800/60 pb-3">
        <div className="flex items-center gap-2.5">
          <div className="p-2 rounded-xl bg-pink-500/10 border border-pink-500/20 text-pink-400">
            <CircleDot className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-base font-semibold text-white">Filament & Malzeme</h2>
            <p className="text-xs text-slate-400">Makara fiyatı, gramaj ve sarfiyat</p>
          </div>
        </div>

        {/* Quick Filament Preset Selector */}
        <div className="flex items-center gap-1.5">
          <Sparkles className="w-3.5 h-3.5 text-amber-400 hidden sm:inline" />
          <select
            className="text-xs bg-slate-950/80 border border-slate-700/80 text-slate-200 rounded-lg px-2.5 py-1.5 focus:outline-none focus:ring-1 focus:ring-pink-500 cursor-pointer"
            onChange={(e) => {
              const preset = FILAMENT_PRESETS.find((p) => p.id === e.target.value);
              if (preset) onApplyPreset(preset);
            }}
            value=""
          >
            <option value="" disabled>
              🧵 Hızlı Malzeme Seç
            </option>
            {FILAMENT_PRESETS.map((preset) => (
              <option key={preset.id} value={preset.id}>
                {preset.name} - {formatCurrency(preset.spoolPrice, inputs.currency)}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Filament Türü */}
        <div className="md:col-span-2">
          <label className="flex items-center gap-1.5 text-xs font-medium text-slate-300 mb-1.5">
            <Tag className="w-3.5 h-3.5 text-pink-400" />
            <span>Filament / Malzeme Türü</span>
          </label>
          <div className="flex gap-2 flex-wrap">
            {['PLA', 'PLA+', 'PETG', 'ABS', 'TPU', 'ASA', 'Reçine'].map((type) => (
              <button
                key={type}
                type="button"
                onClick={() => onChange('filamentType', type)}
                className={`px-3 py-1 text-xs rounded-lg font-medium border transition cursor-pointer ${
                  inputs.filamentType === type
                    ? 'bg-pink-500/20 text-pink-300 border-pink-500/50 shadow-sm'
                    : 'bg-slate-950/60 text-slate-400 border-slate-800 hover:border-slate-700 hover:text-slate-200'
                }`}
              >
                {type}
              </button>
            ))}
            <input
              type="text"
              value={inputs.filamentType}
              onChange={(e) => onChange('filamentType', e.target.value)}
              placeholder="Diğer..."
              className="px-3 py-1 text-xs bg-slate-950/60 border border-slate-800 rounded-lg text-slate-200 focus:outline-none focus:ring-1 focus:ring-pink-500 w-24"
            />
          </div>
        </div>

        {/* Makara Fiyatı */}
        <div>
          <label className="flex items-center justify-between text-xs font-medium text-slate-300 mb-1.5">
            <span>Makara Satın Alma Fiyatı</span>
          </label>
          <div className="relative">
            <input
              type="number"
              min="0"
              step="10"
              value={inputs.spoolPrice || 0}
              onChange={(e) => onChange('spoolPrice', Math.max(0, parseFloat(e.target.value) || 0))}
              className="w-full bg-slate-950/60 border border-slate-800 rounded-xl px-3.5 py-2.5 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-pink-500/50 focus:border-pink-500 font-mono transition"
            />
            <span className="absolute right-3 top-2.5 text-xs text-slate-400 font-medium">
              {inputs.currency}
            </span>
          </div>
          <span className="text-[10px] text-pink-400/90 mt-1 block">
            Birim Maliyet: ~{formatCurrency(costPerGram, inputs.currency)}/gr
          </span>
        </div>

        {/* Makara Gramajı */}
        <div>
          <label className="flex items-center justify-between text-xs font-medium text-slate-300 mb-1.5">
            <span>Makara Net Ağırlığı</span>
            <span className="text-[11px] text-slate-400">Gram</span>
          </label>
          <div className="relative">
            <input
              type="number"
              min="50"
              step="50"
              value={inputs.spoolWeight || 1000}
              onChange={(e) => onChange('spoolWeight', Math.max(1, parseFloat(e.target.value) || 1))}
              className="w-full bg-slate-950/60 border border-slate-800 rounded-xl px-3.5 py-2.5 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-pink-500/50 focus:border-pink-500 font-mono transition"
            />
            <span className="absolute right-3 top-2.5 text-xs text-slate-400 font-medium">gr</span>
          </div>
          <span className="text-[10px] text-slate-500 mt-1 block">
            Standart 1 kg makara = 1000 gr
          </span>
        </div>

        {/* Harcanan Gramaj */}
        <div className="md:col-span-2 bg-slate-950/40 border border-slate-800/80 rounded-xl p-3.5">
          <div className="flex items-center justify-between mb-2">
            <label className="flex items-center gap-1.5 text-xs font-medium text-slate-300">
              <Scale className="w-3.5 h-3.5 text-pink-400" />
              <span>Harcanan Filament (Model + Destek + Etek)</span>
            </label>
            <span className="text-xs font-semibold text-pink-400 font-mono">
              {inputs.printWeight} gr (~%{spoolUsagePercent.toFixed(1)} makara)
            </span>
          </div>

          <div className="relative mb-2">
            <input
              type="number"
              min="0"
              step="1"
              value={inputs.printWeight || 0}
              onChange={(e) => onChange('printWeight', Math.max(0, parseFloat(e.target.value) || 0))}
              className="w-full bg-slate-900 border border-slate-700/80 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:ring-1 focus:ring-pink-500 pr-12 font-mono"
            />
            <span className="absolute right-3 top-2.5 text-xs text-slate-400 font-medium">Gram</span>
          </div>

          {/* Progress bar of spool consumption */}
          <div className="w-full bg-slate-800/80 h-1.5 rounded-full overflow-hidden">
            <div
              className="bg-gradient-to-r from-pink-500 to-purple-500 h-full transition-all duration-300"
              style={{ width: `${Math.min(100, spoolUsagePercent)}%` }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
