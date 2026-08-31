import React from 'react';
import { Printer, Zap, Clock, ShieldCheck } from 'lucide-react';
import type { CalculationInputs, InputValue, Language } from '../types/calculator';
import { PRINTER_PRESETS, type PrinterPreset } from '../data/presets';
import { formatCurrency } from '../utils/calculator';
import { useTranslation } from '../i18n/translations';
import { ClayCard } from './ui/ClayCard';
import { ClayHeader } from './ui/ClayHeader';
import { ClayInputField } from './ui/ClayInputField';
import { ClayStepperField } from './ui/ClayStepperField';

interface PrinterSectionProps {
  inputs: CalculationInputs;
  onChange: (field: keyof CalculationInputs, value: InputValue) => void;
  onApplyPreset: (preset: PrinterPreset) => void;
  lang: Language;
}

export const PrinterSection: React.FC<PrinterSectionProps> = ({
  inputs,
  onChange,
  onApplyPreset,
  lang,
}) => {
  const { t } = useTranslation(lang);

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

  const presetOptions = PRINTER_PRESETS.map((p) => ({
    id: p.id,
    label: p.name,
    badge: `${p.powerWatt}W`,
  }));

  return (
    <ClayCard>
      <ClayHeader
        icon={<Printer className="w-5 h-5 text-white" />}
        iconBgGradient="bg-gradient-to-br from-sky-500 to-indigo-600"
        iconShadow="shadow-[3px_4px_10px_rgba(14,165,233,0.35),inset_2px_2px_3px_rgba(255,255,255,0.3),inset_-2px_-3px_5px_rgba(0,0,0,0.4)]"
        title={t('printerTitle')}
        subtitle={t('printerSubtitle')}
        presetPlaceholder={t('quickPrinterSelect')}
        presetOptions={presetOptions}
        onSelectPreset={(id) => {
          const preset = PRINTER_PRESETS.find((p) => p.id === id);
          if (preset) onApplyPreset(preset);
        }}
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 sm:gap-4">
        {/* Yazıcı Modeli */}
        <div className="sm:col-span-2">
          <ClayInputField
            label={t('printerModel')}
            value={inputs.printerName}
            onChange={(val) => onChange('printerName', val)}
            placeholder={t('printerModelPlaceholder')}
          />
        </div>

        {/* Baskı Süresi */}
        <div className="sm:col-span-2 clay-inset p-3.5 sm:p-4 rounded-2xl">
          <div className="flex items-center justify-between mb-3">
            <label className="flex items-center gap-1.5 text-xs font-extrabold text-slate-800 dark:text-slate-200">
              <Clock className="w-4 h-4 text-sky-500 dark:text-sky-400" />
              <span>{t('printDuration')}</span>
            </label>
            <span className="text-[11px] font-extrabold text-sky-600 dark:text-sky-400 font-mono clay-pill-active px-2.5 py-0.5 rounded-full">
              {inputs.printHours} {lang === 'en' ? 'hrs' : 'sa'} {inputs.printMinutes} {lang === 'en' ? 'min' : 'dk'}
            </span>
          </div>

          <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-2 gap-3">
            <ClayStepperField
              label={t('hours')}
              value={inputs.printHours}
              unit={t('hours')}
              onChange={(val) => onChange('printHours', val)}
              onStep={adjustHours}
              min={0}
              stepAmounts={[1, 5]}
            />

            <ClayStepperField
              label={t('minutes')}
              value={inputs.printMinutes}
              unit={t('minutes')}
              onChange={(val) => onChange('printMinutes', Math.min(59, Math.max(0, val)))}
              onStep={adjustMinutes}
              min={0}
              max={59}
              stepAmounts={[15, 30]}
            />
          </div>
        </div>

        {/* Yazıcı Gücü */}
        <div>
          <ClayInputField
            label={t('powerConsumption')}
            labelIcon={<Zap className="w-3.5 h-3.5 text-amber-500" />}
            topRightBadge={t('powerUnit')}
            type="number"
            value={inputs.printerPower}
            onChange={(val) => onChange('printerPower', parseFloat(val) || 0)}
            unit="W"
            min={0}
            step={10}
            hint={t('powerHint')}
          />
        </div>

        {/* Elektrik Fiyatı */}
        <div>
          <ClayInputField
            label={t('electricityPrice')}
            topRightBadge={t('perKwh')}
            type="number"
            value={inputs.electricityPrice}
            onChange={(val) => onChange('electricityPrice', parseFloat(val) || 0)}
            unit={`${inputs.currency}/kWh`}
            min={0}
            step={0.1}
            hint={t('electricityHint')}
          />
        </div>

        {/* Yazıcı Alış Fiyatı */}
        <div>
          <ClayInputField
            label={t('printerPrice')}
            labelIcon={<ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />}
            type="number"
            value={inputs.printerPrice}
            onChange={(val) => onChange('printerPrice', parseFloat(val) || 0)}
            unit={inputs.currency}
            min={0}
            step={500}
          />
        </div>

        {/* Yazıcı Ömrü */}
        <div>
          <ClayInputField
            label={t('lifespan')}
            topRightBadge={t('hours')}
            type="number"
            value={inputs.printerLifespanHours}
            onChange={(val) => onChange('printerLifespanHours', Math.max(1, parseFloat(val) || 1))}
            unit={t('hours')}
            min={100}
            step={500}
            hint={`${t('depreciationRate')}: ~${formatCurrency(depreciationPerHour, inputs.currency, lang)}/${lang === 'en' ? 'hr' : 'saat'}`}
          />
        </div>
      </div>
    </ClayCard>
  );
};
