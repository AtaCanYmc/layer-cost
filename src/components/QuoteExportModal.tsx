import React, { useState } from 'react';
import { 
  X, 
  Printer, 
  FileCheck 
} from 'lucide-react';
import type { CalculationInputs, CalculationResults, Currency, Language } from '../types/calculator';
import { formatCurrency, formatHoursMinutes } from '../utils/calculator';
import { useTranslation } from '../i18n/translations';

interface QuoteExportModalProps {
  isOpen: boolean;
  onClose: () => void;
  inputs: CalculationInputs;
  results: CalculationResults;
  currency: Currency;
  lang: Language;
}

export const QuoteExportModal: React.FC<QuoteExportModalProps> = ({
  isOpen,
  onClose,
  inputs,
  results,
  currency,
  lang,
}) => {
  const { t } = useTranslation(lang);
  const [showInternalCosts, setShowInternalCosts] = useState(false);
  const [quoteNumber] = useState(() => `#3D-${Date.now().toString().slice(-6)}`);
  const [today] = useState(() => {
    return new Date().toLocaleDateString(lang === 'en' ? 'en-US' : 'tr-TR', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });
  });

  if (!isOpen) return null;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 dark:bg-[#070b14]/85 backdrop-blur-md animate-fadeIn">
      <div className="bg-white text-slate-900 rounded-3xl w-full max-w-2xl shadow-2xl overflow-hidden flex flex-col max-h-[92vh]">
        {/* Modal Controls (Hidden in Print) */}
        <div className="no-print flex flex-wrap sm:flex-nowrap items-center justify-between gap-2.5 px-4 sm:px-6 py-3 sm:py-4 bg-slate-900 text-white border-b border-slate-800">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0">
              <FileCheck className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            </div>
            <h2 className="text-xs sm:text-sm font-extrabold truncate">{t('quoteModalTitle')}</h2>
          </div>

          <div className="flex items-center gap-2 sm:gap-3 shrink-0 ml-auto">
            <label className="flex items-center gap-1.5 text-[11px] sm:text-xs text-slate-300 cursor-pointer font-medium">
              <input
                type="checkbox"
                checked={showInternalCosts}
                onChange={(e) => setShowInternalCosts(e.target.checked)}
                className="rounded text-indigo-600 focus:ring-indigo-500"
              />
              <span className="hidden xs:inline">{t('showInternalCosts')}</span>
            </label>

            <button
              type="button"
              onClick={handlePrint}
              className="clay-btn-primary inline-flex items-center gap-1.5 px-3 sm:px-4 py-1.5 sm:py-2 text-white text-xs font-extrabold cursor-pointer"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>{t('printPdfBtn')}</span>
            </button>

            <button
              onClick={onClose}
              className="clay-stepper-btn p-1.5 sm:p-2 text-slate-400 hover:text-white cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Printable Document Area */}
        <div className="p-5 sm:p-10 overflow-y-auto print-card space-y-6 text-slate-800">
          {/* Header */}
          <div className="flex justify-between items-start border-b border-slate-200 pb-6">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <div className="w-8 h-8 rounded-lg bg-indigo-600 text-white flex items-center justify-center font-black text-sm">
                  3D
                </div>
                <span className="text-xl font-black tracking-tight text-slate-900">
                  {t('quoteDocTitle')}
                </span>
              </div>
              <p className="text-xs text-slate-500 font-medium">{t('quoteDocSubtitle')}</p>
            </div>

            <div className="text-right text-xs text-slate-600 space-y-1 font-medium">
              <div><strong className="text-slate-900">{t('dateLabel')}:</strong> {today}</div>
              <div><strong className="text-slate-900">{t('quoteNoLabel')}:</strong> {quoteNumber}</div>
            </div>
          </div>

          {/* Project & Client Info */}
          <div className="grid grid-cols-2 gap-4 bg-slate-50 p-4 rounded-2xl border border-slate-200 text-xs">
            <div>
              <span className="text-slate-500 block uppercase text-[10px] font-extrabold tracking-wider mb-1">
                {t('projectInfoTitle')}
              </span>
              <div className="font-extrabold text-sm text-slate-900">{inputs.projectName || t('defaultProject')}</div>
              <div className="text-slate-600 mt-1">Yazıcı / Printer: {inputs.printerName || 'Endüstriyel FDM'}</div>
              <div className="text-slate-600">{t('filamentType')}: {inputs.filamentType}</div>
            </div>

            <div>
              <span className="text-slate-500 block uppercase text-[10px] font-extrabold tracking-wider mb-1">
                {t('clientInfoTitle')}
              </span>
              <div className="font-semibold text-sm text-slate-900">{inputs.clientName || t('defaultClient')}</div>
              <div className="text-slate-600 mt-1">{t('defaultProcess')}</div>
            </div>
          </div>

          {/* Specs Table */}
          <div>
            <table className="w-full text-xs text-left border-collapse">
              <thead>
                <tr className="border-b-2 border-slate-300 text-slate-800 font-bold uppercase text-[11px]">
                  <th className="py-2.5">{t('tableDesc')}</th>
                  <th className="py-2.5 text-center">{t('tableQtyVal')}</th>
                  <th className="py-2.5 text-right">{t('tableUnit')}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 text-slate-600">
                <tr>
                  <td className="py-2.5 font-medium text-slate-900">{t('filamentType')}</td>
                  <td className="py-2.5 text-center font-mono">{inputs.filamentType}</td>
                  <td className="py-2.5 text-right font-mono">{inputs.printWeight} gr</td>
                </tr>
                <tr>
                  <td className="py-2.5 font-medium text-slate-900">{t('printDuration')}</td>
                  <td className="py-2.5 text-center font-mono">{formatHoursMinutes(inputs.printHours, inputs.printMinutes, lang)}</td>
                  <td className="py-2.5 text-right font-mono">{results.totalPrintTimeHours.toFixed(2)} {lang === 'en' ? 'hrs' : 'saat'}</td>
                </tr>
                <tr>
                  <td className="py-2.5 font-medium text-slate-900">{t('laborTitle')}</td>
                  <td className="py-2.5 text-center font-mono">{inputs.laborMinutes} {lang === 'en' ? 'min' : 'dk'}</td>
                  <td className="py-2.5 text-right font-mono">{t('postProcessDesc')}</td>
                </tr>
                {inputs.notes && (
                  <tr>
                    <td className="py-2.5 font-medium text-slate-900">{t('techNotes')}</td>
                    <td colSpan={2} className="py-2.5 text-slate-600 italic">{inputs.notes}</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Internal Breakdown (Optional in Print) */}
          {showInternalCosts && (
            <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4 text-xs space-y-1.5 font-medium">
              <div className="font-extrabold text-amber-900 mb-1">{t('internalCostTitle')}</div>
              <div className="flex justify-between text-slate-700">
                <span>{t('filamentItem')}:</span>
                <span className="font-mono">{formatCurrency(results.filamentCost, currency, lang)}</span>
              </div>
              <div className="flex justify-between text-slate-700">
                <span>{t('electricityItem')}:</span>
                <span className="font-mono">{formatCurrency(results.electricityCost, currency, lang)}</span>
              </div>
              <div className="flex justify-between text-slate-700">
                <span>{t('depreciationItem')}:</span>
                <span className="font-mono">{formatCurrency(results.depreciationCost, currency, lang)}</span>
              </div>
              <div className="flex justify-between text-slate-700">
                <span>{t('laborItem')}:</span>
                <span className="font-mono">{formatCurrency(results.laborCost, currency, lang)}</span>
              </div>
              <div className="flex justify-between text-slate-700">
                <span>{t('failureItem')} (%{inputs.failureRatePercent}):</span>
                <span className="font-mono">+{formatCurrency(results.riskAmount, currency, lang)}</span>
              </div>
              <div className="flex justify-between text-emerald-800 font-bold border-t border-amber-200/80 pt-1">
                <span>{t('netProfit')} (%{inputs.profitMarginPercent}):</span>
                <span className="font-mono">+{formatCurrency(results.profitAmount, currency, lang)}</span>
              </div>
            </div>
          )}

          {/* Total Box */}
          <div className="bg-slate-950 text-white rounded-2xl p-5 flex items-center justify-between">
            <div>
              <span className="text-xs text-slate-400 uppercase tracking-wider font-extrabold block">
                {t('totalQuoteAmount')}
              </span>
              <span className="text-[11px] text-slate-400">{t('taxDisclaimer')}</span>
            </div>
            <div className="text-right">
              <span className="text-2xl sm:text-3xl font-black font-mono text-emerald-400">
                {formatCurrency(results.finalPrice, currency, lang)}
              </span>
            </div>
          </div>

          {/* Footer Note */}
          <div className="text-[10px] text-slate-500 text-center border-t border-slate-200 pt-4">
            {t('quoteFooterNotice')}
          </div>
        </div>
      </div>
    </div>
  );
};
