import React from 'react';
import { AlertTriangle, TrendingUp, FolderGit2, User } from 'lucide-react';
import type { CalculationInputs, InputValue, Language } from '../types/calculator';
import { useTranslation } from '../i18n/translations';
import { ClayCard } from './ui/ClayCard';
import { ClayHeader } from './ui/ClayHeader';
import { ClayInputField } from './ui/ClayInputField';
import { ClaySliderField } from './ui/ClaySliderField';

interface PricingRiskSectionProps {
  inputs: CalculationInputs;
  onChange: (field: keyof CalculationInputs, value: InputValue) => void;
  lang: Language;
}

export const PricingRiskSection: React.FC<PricingRiskSectionProps> = ({
  inputs,
  onChange,
  lang,
}) => {
  const { t } = useTranslation(lang);

  return (
    <ClayCard>
      <ClayHeader
        icon={<TrendingUp className="w-5 h-5 text-white" />}
        iconBgGradient="bg-gradient-to-br from-emerald-500 to-teal-600"
        iconShadow="shadow-[3px_4px_10px_rgba(16,185,129,0.35),inset_2px_2px_3px_rgba(255,255,255,0.3),inset_-2px_-3px_5px_rgba(0,0,0,0.4)]"
        title={t('riskProfitTitle')}
        subtitle={t('riskProfitSubtitle')}
      />

      <div className="space-y-4">
        {/* Hata / Fire Payı */}
        <div>
          <ClaySliderField
            label={t('failureRate')}
            icon={<AlertTriangle className="w-4 h-4 text-rose-500" />}
            value={inputs.failureRatePercent || 0}
            onChange={(val) => onChange('failureRatePercent', val)}
            min={0}
            max={40}
            step={1}
            quickPercentages={[5, 10, 15, 20]}
          />
          <p className="text-[10px] text-slate-500 font-medium mt-1.5 px-1 leading-tight">
            {t('failureRateHint')}
          </p>
        </div>

        {/* Hedef Kar Marjı */}
        <div>
          <ClaySliderField
            label={t('targetProfitMargin')}
            icon={<TrendingUp className="w-4 h-4 text-emerald-500" />}
            value={inputs.profitMarginPercent || 0}
            onChange={(val) => onChange('profitMarginPercent', val)}
            min={0}
            max={150}
            step={5}
            quickPercentages={[20, 35, 50, 75, 100]}
          />
        </div>

        {/* Proje & Müşteri Alanları */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
          <ClayInputField
            label={t('projectName')}
            labelIcon={<FolderGit2 className="w-3.5 h-3.5 text-slate-400" />}
            value={inputs.projectName}
            onChange={(val) => onChange('projectName', val)}
            placeholder={t('projectNamePlaceholder')}
          />

          <ClayInputField
            label={t('clientName')}
            labelIcon={<User className="w-3.5 h-3.5 text-slate-400" />}
            value={inputs.clientName}
            onChange={(val) => onChange('clientName', val)}
            placeholder={t('clientNamePlaceholder')}
          />
        </div>
      </div>
    </ClayCard>
  );
};
