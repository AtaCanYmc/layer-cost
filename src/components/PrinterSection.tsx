import React from 'react';
import { Printer, Zap, Clock, ShieldCheck, Sparkles } from 'lucide-react';
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

  return (
    <div className="bg-slate-900/70 border border-slate-800/80 rounded-2xl p-5 md:p-6 shadow-xl backdrop-blur-sm relative overflow-hidden group hover:border-slate-700/80 transition-all">
      {/* Decorative gradient highlight */}
      <div className="absolute top-0 right-0 -mt-8 -mr-8 w-32 h-32 bg-indigo-500/10 rounded-full blur-2xl pointer-events-none" />

      <div className="flex items-center justify-between gap-3 mb-5 border-b border-slate-800/60 pb-3">
        <div className="flex items-center gap-2.5">
          <div className="p-2 rounded-xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-400">
            <Printer className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-base font-semibold text-white">Yazıcı & Elektrik</h2>
            <p className="text-xs text-slate-400">Güç tüketimi, baskı süresi ve amortisman</p>
          </div>
        </div>

        {/* Quick Preset Selector */}
        <div className="flex items-center gap-1.5">
          <Sparkles className="w-3.5 h-3.5 text-amber-400 hidden sm:inline" />
          <select
            className="text-xs bg-slate-950/80 border border-slate-700/80 text-slate-200 rounded-lg px-2.5 py-1.5 focus:outline-none focus:ring-1 focus:ring-indigo-500 cursor-pointer"
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
              <option key={preset.id} value={preset.id}>
                {preset.name} ({preset.powerWatt}W)
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Yazıcı Adı */}
        <div className="md:col-span-2">
          <label className="block text-xs font-medium text-slate-300 mb-1.5">
            Yazıcı Modeli / Adı
          </label>
          <input
            type="text"
            value={inputs.printerName}
            onChange={(e) => onChange('printerName', e.target.value)}
            placeholder="örn: Bambu Lab P1S"
            className="w-full bg-slate-950/60 border border-slate-800 rounded-xl px-3.5 py-2.5 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 transition"
          />
        </div>

        {/* Baskı Süresi (Saat & Dakika) */}
        <div className="md:col-span-2 bg-slate-950/40 border border-slate-800/80 rounded-xl p-3.5">
          <div className="flex items-center justify-between mb-2">
            <label className="flex items-center gap-1.5 text-xs font-medium text-slate-300">
              <Clock className="w-3.5 h-3.5 text-sky-400" />
              <span>Baskı Süresi</span>
            </label>
            <span className="text-[11px] text-slate-400">
              Dilimleyici (Slicer) tahmini
            </span>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <div className="relative">
                <input
                  type="number"
                  min="0"
                  step="1"
                  value={inputs.printHours || 0}
                  onChange={(e) => onChange('printHours', Math.max(0, parseFloat(e.target.value) || 0))}
                  className="w-full bg-slate-900 border border-slate-700/80 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:ring-1 focus:ring-indigo-500 pr-12 font-mono"
                />
                <span className="absolute right-3 top-2.5 text-xs text-slate-400 font-medium">Saat</span>
              </div>
            </div>
            <div>
              <div className="relative">
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
                  className="w-full bg-slate-900 border border-slate-700/80 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:ring-1 focus:ring-indigo-500 pr-12 font-mono"
                />
                <span className="absolute right-3 top-2.5 text-xs text-slate-400 font-medium">Dk</span>
              </div>
            </div>
          </div>
        </div>

        {/* Yazıcı Gücü (Watt) */}
        <div>
          <label className="flex items-center justify-between text-xs font-medium text-slate-300 mb-1.5">
            <span className="flex items-center gap-1">
              <Zap className="w-3.5 h-3.5 text-amber-400" />
              Yazıcı Güç Tüketimi
            </span>
            <span className="text-[11px] text-slate-400">Watt</span>
          </label>
          <div className="relative">
            <input
              type="number"
              min="0"
              step="10"
              value={inputs.printerPower || 0}
              onChange={(e) => onChange('printerPower', Math.max(0, parseFloat(e.target.value) || 0))}
              className="w-full bg-slate-950/60 border border-slate-800 rounded-xl px-3.5 py-2.5 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 font-mono transition"
            />
            <span className="absolute right-3 top-2.5 text-xs text-slate-400 font-medium">W</span>
          </div>
          <span className="text-[10px] text-slate-500 mt-1 block">
            Örn: FDM ~150-350W, Yatak ısıtma dahil ortalama
          </span>
        </div>

        {/* Elektrik kWh Fiyatı */}
        <div>
          <label className="flex items-center justify-between text-xs font-medium text-slate-300 mb-1.5">
            <span>Elektrik Birim Fiyatı</span>
            <span className="text-[11px] text-slate-400">kWh</span>
          </label>
          <div className="relative">
            <input
              type="number"
              min="0"
              step="0.1"
              value={inputs.electricityPrice || 0}
              onChange={(e) => onChange('electricityPrice', Math.max(0, parseFloat(e.target.value) || 0))}
              className="w-full bg-slate-950/60 border border-slate-800 rounded-xl px-3.5 py-2.5 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 font-mono transition"
            />
            <span className="absolute right-3 top-2.5 text-xs text-slate-400 font-medium">
              {inputs.currency}/kWh
            </span>
          </div>
          <span className="text-[10px] text-slate-500 mt-1 block">
            TR Ortalama konut/işyeri ~2.80 - 3.50 ₺
          </span>
        </div>

        {/* Yazıcı Fiyatı */}
        <div>
          <label className="flex items-center justify-between text-xs font-medium text-slate-300 mb-1.5">
            <span className="flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              Yazıcı Satın Alma Fiyatı
            </span>
          </label>
          <div className="relative">
            <input
              type="number"
              min="0"
              step="500"
              value={inputs.printerPrice || 0}
              onChange={(e) => onChange('printerPrice', Math.max(0, parseFloat(e.target.value) || 0))}
              className="w-full bg-slate-950/60 border border-slate-800 rounded-xl px-3.5 py-2.5 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 font-mono transition"
            />
            <span className="absolute right-3 top-2.5 text-xs text-slate-400 font-medium">
              {inputs.currency}
            </span>
          </div>
        </div>

        {/* Yazıcı Tahmini Ömrü (Saat) */}
        <div>
          <label className="flex items-center justify-between text-xs font-medium text-slate-300 mb-1.5">
            <span>Tahmini Yazıcı Ömrü</span>
            <span className="text-[11px] text-slate-400">Saat</span>
          </label>
          <div className="relative">
            <input
              type="number"
              min="100"
              step="500"
              value={inputs.printerLifespanHours || 0}
              onChange={(e) => onChange('printerLifespanHours', Math.max(1, parseFloat(e.target.value) || 1))}
              className="w-full bg-slate-950/60 border border-slate-800 rounded-xl px-3.5 py-2.5 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 font-mono transition"
            />
            <span className="absolute right-3 top-2.5 text-xs text-slate-400 font-medium">Saat</span>
          </div>
          <span className="text-[10px] text-indigo-400/90 mt-1 block">
            Amortisman: ~{formatCurrency(depreciationPerHour, inputs.currency)}/saat
          </span>
        </div>
      </div>
    </div>
  );
};
