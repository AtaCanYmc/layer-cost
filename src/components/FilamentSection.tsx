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

  const adjustGrams = (delta: number) => {
    onChange('printWeight', Math.max(0, inputs.printWeight + delta));
  };

  return (
    <div className="clay-card p-6 relative overflow-hidden transition-all duration-300">
      {/* Header */}
      <div className="flex items-center justify-between gap-3 mb-6 pb-4 border-b border-slate-800/80">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-rose-500 to-pink-600 shadow-[3px_4px_10px_rgba(244,63,94,0.35),inset_2px_2px_3px_rgba(255,255,255,0.3),inset_-2px_-3px_5px_rgba(0,0,0,0.4)] flex items-center justify-center">
            <CircleDot className="w-5 h-5 text-white" />
          </div>
          <div>
            <h2 className="text-base font-extrabold text-white tracking-tight">
              Filament & Malzeme
            </h2>
            <p className="text-xs text-slate-400 font-medium">Makara fiyatı, gramaj ve sarfiyat</p>
          </div>
        </div>

        {/* Quick Filament Preset Selector */}
        <div className="flex items-center gap-1.5">
          <Sparkles className="w-3.5 h-3.5 text-amber-400 hidden sm:inline" />
          <select
            className="clay-input text-xs text-slate-200 rounded-xl px-3 py-2 cursor-pointer font-semibold"
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
              <option key={preset.id} value={preset.id} className="bg-slate-900 text-white">
                {preset.name} - {formatCurrency(preset.spoolPrice, inputs.currency)}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Filament Türü Seçimi (Dokunsal Haplar) */}
        <div className="md:col-span-2">
          <label className="flex items-center gap-1.5 text-xs font-bold text-slate-300 mb-2 uppercase tracking-wider text-[11px]">
            <Tag className="w-3.5 h-3.5 text-rose-400" />
            <span>Filament Türü</span>
          </label>
          <div className="flex gap-2 flex-wrap items-center">
            {['PLA', 'PLA+', 'PETG', 'ABS', 'TPU', 'ASA', 'Reçine'].map((type) => (
              <button
                key={type}
                type="button"
                onClick={() => onChange('filamentType', type)}
                className={`px-3.5 py-1.5 text-xs rounded-xl font-bold transition-all cursor-pointer ${
                  inputs.filamentType === type
                    ? 'clay-pill-active text-rose-300 border-rose-500/40 shadow-inner'
                    : 'clay-pill-inactive'
                }`}
              >
                {type}
              </button>
            ))}
            <input
              type="text"
              value={inputs.filamentType}
              onChange={(e) => onChange('filamentType', e.target.value)}
              placeholder="Özel..."
              className="clay-input px-3 py-1.5 text-xs text-slate-200 w-28 font-medium placeholder-slate-500"
            />
          </div>
        </div>

        {/* Makara Fiyatı */}
        <div>
          <label className="flex items-center justify-between text-xs font-bold text-slate-300 mb-1.5 uppercase tracking-wider text-[11px]">
            <span>Makara Satın Alma Fiyatı</span>
          </label>
          <div className="relative">
            <input
              type="number"
              min="0"
              step="10"
              value={inputs.spoolPrice || 0}
              onChange={(e) => onChange('spoolPrice', Math.max(0, parseFloat(e.target.value) || 0))}
              className="clay-input w-full px-4 py-2.5 text-sm text-slate-100 placeholder-slate-500 font-mono font-bold"
            />
            <span className="absolute right-3.5 top-2.5 text-xs text-slate-400 font-bold">
              {inputs.currency}
            </span>
          </div>
          <span className="text-[10px] text-rose-400 font-bold font-mono mt-1 block">
            Birim Gram Fiyatı: ~{formatCurrency(costPerGram, inputs.currency)}/gr
          </span>
        </div>

        {/* Makara Gramajı */}
        <div>
          <label className="flex items-center justify-between text-xs font-bold text-slate-300 mb-1.5 uppercase tracking-wider text-[11px]">
            <span>Makara Net Ağırlığı</span>
            <span className="text-[10px] text-slate-400 font-mono font-semibold">Gram</span>
          </label>
          <div className="relative">
            <input
              type="number"
              min="50"
              step="50"
              value={inputs.spoolWeight || 1000}
              onChange={(e) => onChange('spoolWeight', Math.max(1, parseFloat(e.target.value) || 1))}
              className="clay-input w-full px-4 py-2.5 text-sm text-slate-100 placeholder-slate-500 font-mono font-bold"
            />
            <span className="absolute right-3.5 top-2.5 text-xs text-slate-400 font-bold">gr</span>
          </div>
          <span className="text-[10px] text-slate-500 font-medium mt-1 block">
            Standart 1 makara = 1000 gr (1 kg)
          </span>
        </div>

        {/* Harcanan Gramaj (Kile gömülmüş özel panel & 3D tüp çubuğu) */}
        <div className="md:col-span-2 clay-inset p-4 rounded-2xl">
          <div className="flex items-center justify-between mb-2">
            <label className="flex items-center gap-1.5 text-xs font-bold text-slate-200">
              <Scale className="w-4 h-4 text-rose-400" />
              <span>Harcanan Malzeme (Model + Destek)</span>
            </label>
            <span className="text-xs font-extrabold text-rose-400 font-mono clay-pill-active px-2.5 py-0.5 rounded-full">
              {inputs.printWeight} gr (%{spoolUsagePercent.toFixed(1)} makara)
            </span>
          </div>

          <div className="flex items-center gap-2 mb-3">
            <div className="relative flex-1">
              <input
                type="number"
                min="0"
                step="1"
                value={inputs.printWeight || 0}
                onChange={(e) => onChange('printWeight', Math.max(0, parseFloat(e.target.value) || 0))}
                className="clay-input w-full px-4 py-2.5 text-sm text-white font-mono font-bold pr-14"
              />
              <span className="absolute right-3.5 top-2.5 text-xs text-slate-400 font-bold">Gram</span>
            </div>

            {/* Quick adjust step buttons */}
            <div className="flex items-center gap-1.5">
              <button
                type="button"
                onClick={() => adjustGrams(-10)}
                className="clay-stepper-btn px-2.5 py-2 text-xs font-bold text-slate-300 hover:text-white cursor-pointer"
                title="-10g"
              >
                -10g
              </button>
              <button
                type="button"
                onClick={() => adjustGrams(10)}
                className="clay-stepper-btn px-2.5 py-2 text-xs font-bold text-slate-300 hover:text-white cursor-pointer"
                title="+10g"
              >
                +10g
              </button>
              <button
                type="button"
                onClick={() => adjustGrams(50)}
                className="clay-stepper-btn px-2.5 py-2 text-xs font-bold text-slate-300 hover:text-white cursor-pointer"
                title="+50g"
              >
                +50g
              </button>
            </div>
          </div>

          {/* 3D Clay Tube Progress Bar */}
          <div className="w-full bg-[#070b14] h-3 rounded-full overflow-hidden p-0.5 shadow-inner border border-white/5">
            <div
              className="bg-gradient-to-r from-rose-500 via-pink-500 to-purple-500 h-full rounded-full transition-all duration-300 shadow-[inset_1px_1px_2px_rgba(255,255,255,0.4),inset_-1px_-1px_2px_rgba(0,0,0,0.3)]"
              style={{ width: `${Math.min(100, Math.max(2, spoolUsagePercent))}%` }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
