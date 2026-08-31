import React from 'react';
import { UserCheck, PackagePlus, Timer, Wrench } from 'lucide-react';
import type { CalculationInputs, InputValue, Language } from '../types/calculator';
import { formatCurrency } from '../utils/calculator';
import { useTranslation } from '../i18n/translations';
import { ClayCard } from './ui/ClayCard';
import { ClayHeader } from './ui/ClayHeader';
import { ClayInputField } from './ui/ClayInputField';
import { ClayStepperField } from './ui/ClayStepperField';

interface LaborSectionProps {
  inputs: CalculationInputs;
  onChange: (field: keyof CalculationInputs, value: InputValue) => void;
  lang: Language;
}

export const LaborSection: React.FC<LaborSectionProps> = ({
  inputs,
  onChange,
  lang,
}) => {
  const { t } = useTranslation(lang);
  const laborCostTotal = (inputs.laborMinutes / 60) * inputs.hourlyLaborRate;

  return (
    <ClayCard>
      <ClayHeader
        icon={<Wrench className="w-5 h-5 text-white" />}
        iconBgGradient="bg-gradient-to-br from-amber-500 to-orange-600"
        iconShadow="shadow-[3px_4px_10px_rgba(245,158,11,0.35),inset_2px_2px_3px_rgba(255,255,255,0.3),inset_-2px_-3px_5px_rgba(0,0,0,0.4)]"
        title={t('laborTitle')}
        subtitle={t('laborSubtitle')}
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 sm:gap-4">
        {/* İşçilik Süresi */}
        <div>
          <label className="flex items-center justify-between text-[11px] font-extrabold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1.5">
            <span className="flex items-center gap-1.5">
              <Timer className="w-3.5 h-3.5 text-amber-500" />
              {t('laborDuration')}
            </span>
            <span className="text-[10px] text-slate-500 font-mono">{t('minutes')}</span>
          </label>

          <ClayStepperField
            value={inputs.laborMinutes}
            unit={t('minutes')}
            onChange={(val) => onChange('laborMinutes', val)}
            onStep={(delta) => onChange('laborMinutes', Math.max(0, inputs.laborMinutes + delta))}
            min={0}
            stepAmounts={[15, 30, 45]}
          />
        </div>

        {/* Saatlik İşçilik Ücreti */}
        <div>
          <ClayInputField
            label={t('hourlyRate')}
            labelIcon={<UserCheck className="w-3.5 h-3.5 text-emerald-500" />}
            topRightBadge={`${inputs.currency}/${t('hours')}`}
            type="number"
            value={inputs.hourlyLaborRate}
            onChange={(val) => onChange('hourlyLaborRate', Math.max(0, parseFloat(val) || 0))}
            unit={inputs.currency}
            min={0}
            step={25}
            hint={`${t('totalLaborAmount')}: ~${formatCurrency(laborCostTotal, inputs.currency, lang)}`}
          />
        </div>

        {/* Ekstra Sarf / Donanım */}
        <div className="sm:col-span-2">
          <ClayInputField
            label={t('additionalCosts')}
            labelIcon={<PackagePlus className="w-3.5 h-3.5 text-purple-500" />}
            topRightBadge={`${t('fixedAmount')} (${inputs.currency})`}
            type="number"
            value={inputs.additionalCosts}
            onChange={(val) => onChange('additionalCosts', Math.max(0, parseFloat(val) || 0))}
            placeholder={t('additionalCostsPlaceholder')}
            unit={inputs.currency}
            min={0}
            step={5}
            hint={t('additionalCostsHint')}
          />
        </div>
      </div>
    </ClayCard>
  );
};
