import React from 'react';
import { Printer, Zap, Clock, ShieldCheck, Sparkles, Plus, Minus } from 'lucide-react';
import type { CalculationInputs, InputValue } from '../types/calculator';
import { PRINTER_PRESETS, type PrinterPreset } from '../data/presets';
import { formatCurrency } from '../utils/calculator';

interface PrinterSectionProps {
  inputs: CalculationInputs;
  onChange: (field: keyof CalculationInputs, value: InputValue) => void;
  onApplyPreset: (preset: PrinterPreset) => void;
}

export const PrinterSection: React.FC<PrinterSectionProps> = ({
  inputs,
  onChange,
  onApplyPreset,
}) => {
  const depreciationPerHour = inputs.printerLifespanHours > 0
    ? inputs.printerPrice / inputs.printerLifespanHours
    : 0;

  const adjustHours = (delta: number) => {
    onChange('printHours', Math.max(0, inputs.printHours + delta));
  };

  const adjustMinutes = (delta: number) => {
    let newMins = inputs.printMinutes + delta;
    if (newMins >= 60) {
      onChange('printHours', inputs.printHours + Math.floor(newMins / 60));
      newMins = newMins % 60;
    } else if (newMins < 0) {
      if (inputs.printHours > 0) {
        onChange('printHours', inputs.printHours - 1);
        newMins = 60 + newMins;
      } else {
        newMins = 0;
      }
    }
    onChange('printMinutes', Math.max(0, newMins));
  };

  return (
    <div className="clay-card p-6 relative overflow-hidden transition-all duration-300">
      {/* Header with 3D Badge & Preset Dropdown */}
      <div className="flex items-center justify-between gap-3 mb-6 pb-4 border-b border-slate-800/80">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-sky-500 to-indigo-600 shadow-[3px_4px_10px_rgba(14,165,233,0.35),inset_2px_2px_3px_rgba(255,255,255,0.3),inset_-2px_-3px_5px_rgba(0,0,0,0.4)] flex items-center justify-center">
            <Printer className="w-5 h-5 text-white" />
          </div>
          <div>
            <h2 className="text-base font-extrabold text-white tracking-tight">
              Yazıcı & Elektrik
            </h2>
            <p className="text-xs text-slate-400 font-medium">Güç tüketimi, baskı süresi ve yıpranma</p>
          </div>
        </div>

        {/* Clay Preset Selector */}
        <div className="flex items-center gap-1.5">
          <Sparkles className="w-3.5 h-3.5 text-amber-400 hidden sm:inline" />
          <select
            className="clay-input text-xs text-slate-200 rounded-xl px-3 py-2 cursor-pointer font-semibold"
            onChange={(e) => {
              const preset = PRINTER_PRESETS.find((p) => p.id === e.target.value);
              if (preset) onApplyPreset(preset);
            }}
            value=""
          >
            <option value="" disabled>
              ⚡ Hızlı Yazıcı Seç
            </option>
            {PRINTER_PRESETS.map((preset) => (
              <option key={preset.id} value={preset.id} className="bg-slate-900 text-white">
                {preset.name} ({preset.powerWatt}W)
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Yazıcı Adı */}
        <div className="md:col-span-2">
          <label className="block text-xs font-bold text-slate-300 mb-1.5 uppercase tracking-wider text-[11px]">
            Yazıcı Modeli / Adı
          </label>
          <input
            type="text"
            value={inputs.printerName}
            onChange={(e) => onChange('printerName', e.target.value)}
            placeholder="örn: Bambu Lab P1S"
            className="clay-input w-full px-4 py-2.5 text-sm text-slate-100 placeholder-slate-500 font-medium"
          />
        </div>

        {/* Baskı Süresi (Kile gömülmüş özel süre paneli) */}
        <div className="md:col-span-2 clay-inset p-4 rounded-2xl">
          <div className="flex items-center justify-between mb-3">
            <label className="flex items-center gap-1.5 text-xs font-bold text-slate-200">
              <Clock className="w-4 h-4 text-sky-400" />
              <span>Baskı Süresi (Dilimleyici / Slicer Tahmini)</span>
            </label>
            <span className="text-[11px] font-bold text-sky-400 font-mono clay-pill-active px-2.5 py-0.5 rounded-full">
              {inputs.printHours} sa {inputs.printMinutes} dk
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {/* Saat Kontrolü */}
            <div className="flex items-center gap-2">
              <div className="relative flex-1">
                <input
                  type="number"
                  min="0"
                  step="1"
                  value={inputs.printHours || 0}
                  onChange={(e) => onChange('printHours', Math.max(0, parseFloat(e.target.value) || 0))}
                  className="clay-input w-full px-3.5 py-2 text-sm text-white font-mono font-bold pr-12 text-center"
                />
                <span className="absolute right-3.5 top-2.5 text-xs text-slate-400 font-bold">Saat</span>
              </div>
              <button
                type="button"
                onClick={() => adjustHours(-1)}
                className="clay-stepper-btn p-2.5 text-slate-300 hover:text-white cursor-pointer"
                title="1 Saat Azalt"
              >
                <Minus className="w-3.5 h-3.5" />
              </button>
              <button
                type="button"
                onClick={() => adjustHours(1)}
                className="clay-stepper-btn p-2.5 text-slate-300 hover:text-white cursor-pointer"
                title="1 Saat Arttır"
              >
                <Plus className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Dakika Kontrolü */}
            <div className="flex items-center gap-2">
              <div className="relative flex-1">
                <input
                  type="number"
                  min="0"
                  max="59"
                  step="1"
                  value={inputs.printMinutes || 0}
                  onChange={(e) => {
                    const val = Math.max(0, parseInt(e.target.value, 10) || 0);
                    onChange('printMinutes', Math.min(59, val));
                  }}
                  className="clay-input w-full px-3.5 py-2 text-sm text-white font-mono font-bold pr-12 text-center"
                />
                <span className="absolute right-3.5 top-2.5 text-xs text-slate-400 font-bold">Dk</span>
              </div>
              <button
                type="button"
                onClick={() => adjustMinutes(-15)}
                className="clay-stepper-btn px-2.5 py-2 text-xs font-bold text-slate-300 hover:text-white cursor-pointer"
                title="15 Dk Azalt"
              >
                -15
              </button>
              <button
                type="button"
                onClick={() => adjustMinutes(15)}
                className="clay-stepper-btn px-2.5 py-2 text-xs font-bold text-slate-300 hover:text-white cursor-pointer"
                title="15 Dk Arttır"
              >
                +15
              </button>
            </div>
          </div>
        </div>

        {/* Yazıcı Gücü (Watt) */}
        <div>
          <label className="flex items-center justify-between text-xs font-bold text-slate-300 mb-1.5 uppercase tracking-wider text-[11px]">
            <span className="flex items-center gap-1.5">
              <Zap className="w-3.5 h-3.5 text-amber-400" />
              Güç Tüketimi
            </span>
            <span className="text-[10px] text-slate-400 font-mono font-semibold">Watt</span>
          </label>
          <div className="relative">
            <input
              type="number"
              min="0"
              step="10"
              value={inputs.printerPower || 0}
              onChange={(e) => onChange('printerPower', Math.max(0, parseFloat(e.target.value) || 0))}
              className="clay-input w-full px-4 py-2.5 text-sm text-slate-100 placeholder-slate-500 font-mono font-bold"
            />
            <span className="absolute right-3.5 top-2.5 text-xs text-slate-400 font-bold">W</span>
          </div>
          <span className="text-[10px] text-slate-500 font-medium mt-1 block">
            Örn: FDM ortalama ~150W - 350W
          </span>
        </div>

        {/* Elektrik kWh Fiyatı */}
        <div>
          <label className="flex items-center justify-between text-xs font-bold text-slate-300 mb-1.5 uppercase tracking-wider text-[11px]">
            <span>Elektrik Fiyatı</span>
            <span className="text-[10px] text-slate-400 font-mono font-semibold">kWh Başına</span>
          </label>
          <div className="relative">
            <input
              type="number"
              min="0"
              step="0.1"
              value={inputs.electricityPrice || 0}
              onChange={(e) => onChange('electricityPrice', Math.max(0, parseFloat(e.target.value) || 0))}
              className="clay-input w-full px-4 py-2.5 text-sm text-slate-100 placeholder-slate-500 font-mono font-bold"
            />
            <span className="absolute right-3.5 top-2.5 text-xs text-slate-400 font-bold">
              {inputs.currency}/kWh
            </span>
          </div>
          <span className="text-[10px] text-slate-500 font-medium mt-1 block">
            TR konut/ticari ~2.80 - 3.50 ₺
          </span>
        </div>

        {/* Yazıcı Fiyatı */}
        <div>
          <label className="flex items-center justify-between text-xs font-bold text-slate-300 mb-1.5 uppercase tracking-wider text-[11px]">
            <span className="flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              Yazıcı Alış Fiyatı
            </span>
          </label>
          <div className="relative">
            <input
              type="number"
              min="0"
              step="500"
              value={inputs.printerPrice || 0}
              onChange={(e) => onChange('printerPrice', Math.max(0, parseFloat(e.target.value) || 0))}
              className="clay-input w-full px-4 py-2.5 text-sm text-slate-100 placeholder-slate-500 font-mono font-bold"
            />
            <span className="absolute right-3.5 top-2.5 text-xs text-slate-400 font-bold">
              {inputs.currency}
            </span>
          </div>
        </div>

        {/* Yazıcı Tahmini Ömrü (Saat) */}
        <div>
          <label className="flex items-center justify-between text-xs font-bold text-slate-300 mb-1.5 uppercase tracking-wider text-[11px]">
            <span>Tahmini Ömür</span>
            <span className="text-[10px] text-slate-400 font-mono font-semibold">Saat</span>
          </label>
          <div className="relative">
            <input
              type="number"
              min="100"
              step="500"
              value={inputs.printerLifespanHours || 0}
              onChange={(e) => onChange('printerLifespanHours', Math.max(1, parseFloat(e.target.value) || 1))}
              className="clay-input w-full px-4 py-2.5 text-sm text-slate-100 placeholder-slate-500 font-mono font-bold"
            />
            <span className="absolute right-3.5 top-2.5 text-xs text-slate-400 font-bold">Saat</span>
          </div>
          <div className="mt-1.5 flex items-center justify-between">
            <span className="text-[10px] text-indigo-400 font-bold font-mono">
              Amortisman: ~{formatCurrency(depreciationPerHour, inputs.currency)}/saat
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
