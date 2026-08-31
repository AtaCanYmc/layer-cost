import React from 'react';
import { CircleDot, Scale, Tag } from 'lucide-react';
import type { CalculationInputs, InputValue, Language } from '../types/calculator';
import { FILAMENT_PRESETS, type FilamentPreset } from '../data/presets';
import { formatCurrency } from '../utils/calculator';
import { useTranslation } from '../i18n/translations';
import { ClayCard } from './ui/ClayCard';
import { ClayHeader } from './ui/ClayHeader';
import { ClayInputField } from './ui/ClayInputField';
import { ClayStepperField } from './ui/ClayStepperField';

interface FilamentSectionProps {
  inputs: CalculationInputs;
  onChange: (field: keyof CalculationInputs, value: InputValue) => void;
  onApplyPreset: (preset: FilamentPreset) => void;
  lang: Language;
}

export const FilamentSection: React.FC<FilamentSectionProps> = ({
  inputs,
  onChange,
  onApplyPreset,
  lang,
}) => {
  const { t } = useTranslation(lang);

  const spoolWeight = inputs.spoolWeight > 0 ? inputs.spoolWeight : 1000;
  const costPerGram = inputs.spoolPrice / spoolWeight;
  const spoolUsagePercent = Math.min(100, (inputs.printWeight / spoolWeight) * 100);

  const adjustGrams = (delta: number) => {
    onChange('printWeight', Math.max(0, inputs.printWeight + delta));
  };

  const presetOptions = FILAMENT_PRESETS.map((p) => ({
    id: p.id,
    label: p.name,
    badge: formatCurrency(p.spoolPrice, inputs.currency, lang),
  }));

  const resinLabel = lang === 'tr' ? 'Reçine' : lang === 'de' ? 'Harz' : lang === 'fr' ? 'Résine' : 'Resin';
  const filamentTypes = ['PLA', 'PLA+', 'PETG', 'ABS', 'TPU', 'ASA', resinLabel];

  return (
    <ClayCard>
      <ClayHeader
        icon={<CircleDot className="w-5 h-5 text-white" />}
        iconBgGradient="bg-gradient-to-br from-rose-500 to-pink-600"
        iconShadow="shadow-[3px_4px_10px_rgba(244,63,94,0.35),inset_2px_2px_3px_rgba(255,255,255,0.3),inset_-2px_-3px_5px_rgba(0,0,0,0.4)]"
        title={t('filamentTitle')}
        subtitle={t('filamentSubtitle')}
        presetPlaceholder={t('quickFilamentSelect')}
        presetOptions={presetOptions}
        onSelectPreset={(id) => {
          const preset = FILAMENT_PRESETS.find((p) => p.id === id);
          if (preset) onApplyPreset(preset);
        }}
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 sm:gap-4">
        {/* Filament Türü Seçimi */}
        <div className="sm:col-span-2">
          <label className="flex items-center gap-1.5 text-[11px] font-extrabold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-2">
            <Tag className="w-3.5 h-3.5 text-rose-500 dark:text-rose-400" />
            <span>{t('filamentType')}</span>
          </label>
          <div className="flex gap-1.5 flex-wrap items-center">
            {filamentTypes.map((type) => (
              <button
                key={type}
                type="button"
                onClick={() => onChange('filamentType', type)}
                className={`px-3 py-1.5 text-xs rounded-xl font-bold transition-all cursor-pointer ${
                  inputs.filamentType === type
                    ? 'clay-pill-active text-rose-600 dark:text-rose-300 border-rose-500/40 shadow-inner'
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
              placeholder={t('customTypePlaceholder')}
              className="clay-input px-3 py-1.5 text-xs text-slate-900 dark:text-slate-200 w-28 font-medium placeholder-slate-400 dark:placeholder-slate-500"
            />
          </div>
        </div>

        {/* Makara Fiyatı */}
        <div>
          <ClayInputField
            label={t('spoolPrice')}
            type="number"
            value={inputs.spoolPrice}
            onChange={(val) => onChange('spoolPrice', Math.max(0, parseFloat(val) || 0))}
            unit={inputs.currency}
            min={0}
            step={10}
            hint={`${t('unitGramCost')}: ~${formatCurrency(costPerGram, inputs.currency, lang)}/gr`}
          />
        </div>

        {/* Makara Gramajı */}
        <div>
          <ClayInputField
            label={t('spoolWeight')}
            topRightBadge={t('gramUnit')}
            type="number"
            value={inputs.spoolWeight}
            onChange={(val) => onChange('spoolWeight', Math.max(1, parseFloat(val) || 1))}
            unit="gr"
            min={50}
            step={50}
            hint={t('spoolWeightHint')}
          />
        </div>

        {/* Harcanan Gramaj (Spool Usage) */}
        <div className="sm:col-span-2 clay-inset p-3.5 sm:p-4 rounded-2xl">
          <div className="flex items-center justify-between gap-2 mb-2">
            <label className="flex items-center gap-1.5 text-xs font-extrabold text-slate-800 dark:text-slate-200 truncate">
              <Scale className="w-4 h-4 text-rose-500 dark:text-rose-400 shrink-0" />
              <span>{t('consumedMaterial')}</span>
            </label>
            <span className="text-[11px] font-extrabold text-rose-600 dark:text-rose-400 font-mono clay-pill-active px-2.5 py-0.5 rounded-full shrink-0">
              {inputs.printWeight} gr (%{spoolUsagePercent.toFixed(1)})
            </span>
          </div>

          <ClayStepperField
            value={inputs.printWeight}
            unit="gr"
            onChange={(val) => onChange('printWeight', val)}
            onStep={adjustGrams}
            min={0}
            stepAmounts={[10, 50, 100]}
          />

          {/* 3D Clay Tube Progress Bar */}
          <div className="w-full bg-slate-200 dark:bg-[#070b14] h-3 rounded-full overflow-hidden p-0.5 shadow-inner border border-black/5 dark:border-white/5 mt-3">
            <div
              className="bg-gradient-to-r from-rose-500 via-pink-500 to-purple-500 h-full rounded-full transition-all duration-300 shadow-[inset_1px_1px_2px_rgba(255,255,255,0.4),inset_-1px_-1px_2px_rgba(0,0,0,0.3)]"
              style={{ width: `${Math.min(100, Math.max(2, spoolUsagePercent))}%` }}
            />
          </div>
        </div>
      </div>
    </ClayCard>
  );
};
