import React, { useState } from 'react';
import { 
  X, 
  Printer, 
  FileCheck 
} from 'lucide-react';
import type { CalculationInputs, CalculationResults, Currency } from '../types/calculator';
import { formatCurrency, formatHoursMinutes } from '../utils/calculator';

interface QuoteExportModalProps {
  isOpen: boolean;
  onClose: () => void;
  inputs: CalculationInputs;
  results: CalculationResults;
  currency: Currency;
}

export const QuoteExportModal: React.FC<QuoteExportModalProps> = ({
  isOpen,
  onClose,
  inputs,
  results,
  currency,
}) => {
  const [showInternalCosts, setShowInternalCosts] = useState(false);
  const [quoteNumber] = useState(() => `#3D-${Date.now().toString().slice(-6)}`);
  const [today] = useState(() => {
    return new Date().toLocaleDateString('tr-TR', {
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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-sm animate-fadeIn">
      <div className="bg-white text-slate-900 rounded-2xl w-full max-w-2xl shadow-2xl overflow-hidden flex flex-col max-h-[92vh]">
        {/* Modal Controls (Hidden in Print) */}
        <div className="no-print flex items-center justify-between px-6 py-4 bg-slate-900 text-white border-b border-slate-800">
          <div className="flex items-center gap-2">
            <FileCheck className="w-5 h-5 text-emerald-400" />
            <h2 className="text-sm font-bold">3D Baskı Fiyat Teklifi / Proje Özeti</h2>
          </div>

          <div className="flex items-center gap-3">
            <label className="flex items-center gap-1.5 text-xs text-slate-300 cursor-pointer">
              <input
                type="checkbox"
                checked={showInternalCosts}
                onChange={(e) => setShowInternalCosts(e.target.checked)}
                className="rounded text-indigo-600 focus:ring-indigo-500"
              />
              <span>İç Maliyetleri Göster</span>
            </label>

            <button
              type="button"
              onClick={handlePrint}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold rounded-lg transition shadow-sm cursor-pointer"
            >
              <Printer className="w-4 h-4" />
              <span>Yazdır / PDF</span>
            </button>

            <button
              onClick={onClose}
              className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Printable Document Area */}
        <div className="p-8 sm:p-10 overflow-y-auto print-card space-y-6 text-slate-800">
          {/* Header */}
          <div className="flex justify-between items-start border-b border-slate-200 pb-6">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <div className="w-8 h-8 rounded-lg bg-indigo-600 text-white flex items-center justify-center font-black text-sm">
                  3D
                </div>
                <span className="text-xl font-bold tracking-tight text-slate-900">
                  3D BASKI FİYAT TEKLİFİ
                </span>
              </div>
              <p className="text-xs text-slate-500">Hızlı & Hassas Üretim Çözümleri</p>
            </div>

            <div className="text-right text-xs text-slate-600 space-y-1">
              <div><strong className="text-slate-800">Tarih:</strong> {today}</div>
              <div><strong className="text-slate-800">Teklif No:</strong> {quoteNumber}</div>
            </div>
          </div>

          {/* Project & Client Info */}
          <div className="grid grid-cols-2 gap-4 bg-slate-50 p-4 rounded-xl border border-slate-200/80 text-xs">
            <div>
              <span className="text-slate-500 block uppercase text-[10px] font-bold tracking-wider mb-1">
                Proje Bilgileri
              </span>
              <div className="font-semibold text-sm text-slate-900">{inputs.projectName || '3D Model Baskı İşi'}</div>
              <div className="text-slate-600 mt-1">Yazıcı: {inputs.printerName || 'Endüstriyel FDM'}</div>
              <div className="text-slate-600">Malzeme: {inputs.filamentType}</div>
            </div>

            <div>
              <span className="text-slate-500 block uppercase text-[10px] font-bold tracking-wider mb-1">
                Müşteri / Alıcı
              </span>
              <div className="font-semibold text-sm text-slate-900">{inputs.clientName || 'Sayın Yetkili'}</div>
              <div className="text-slate-600 mt-1">Süreç: Hızlı Prototipleme / Nihai Parça</div>
            </div>
          </div>

          {/* Specs Table */}
          <div>
            <table className="w-full text-xs text-left border-collapse">
              <thead>
                <tr className="border-b-2 border-slate-300 text-slate-700 font-bold uppercase text-[11px]">
                  <th className="py-2.5">Açıklama</th>
                  <th className="py-2.5 text-center">Miktar / Değer</th>
                  <th className="py-2.5 text-right">Birim</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 text-slate-600">
                <tr>
                  <td className="py-2.5 font-medium text-slate-900">Malzeme / Filament Tipi</td>
                  <td className="py-2.5 text-center font-mono">{inputs.filamentType}</td>
                  <td className="py-2.5 text-right font-mono">{inputs.printWeight} gr</td>
                </tr>
                <tr>
                  <td className="py-2.5 font-medium text-slate-900">Tahmini Baskı Süresi</td>
                  <td className="py-2.5 text-center font-mono">{formatHoursMinutes(inputs.printHours, inputs.printMinutes)}</td>
                  <td className="py-2.5 text-right font-mono">{results.totalPrintTimeHours.toFixed(2)} saat</td>
                </tr>
                <tr>
                  <td className="py-2.5 font-medium text-slate-900">İşçilik & Son İşlemler (Post-Process)</td>
                  <td className="py-2.5 text-center font-mono">{inputs.laborMinutes} dk</td>
                  <td className="py-2.5 text-right font-mono">Destek sökümü & Kalite kontrol</td>
                </tr>
                {inputs.notes && (
                  <tr>
                    <td className="py-2.5 font-medium text-slate-900">Teknik Notlar</td>
                    <td colSpan={2} className="py-2.5 text-slate-600 italic">{inputs.notes}</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Internal Breakdown (Optional in Print) */}
          {showInternalCosts && (
            <div className="bg-amber-50/70 border border-amber-200 rounded-xl p-4 text-xs space-y-1.5">
              <div className="font-bold text-amber-900 mb-1">Maliyet Dökümü (Yalnızca Şirket İçi)</div>
              <div className="flex justify-between text-slate-700">
                <span>Filament Maliyeti:</span>
                <span className="font-mono">{formatCurrency(results.filamentCost, currency)}</span>
              </div>
              <div className="flex justify-between text-slate-700">
                <span>Elektrik Maliyeti:</span>
                <span className="font-mono">{formatCurrency(results.electricityCost, currency)}</span>
              </div>
              <div className="flex justify-between text-slate-700">
                <span>Yazıcı Amortismanı:</span>
                <span className="font-mono">{formatCurrency(results.depreciationCost, currency)}</span>
              </div>
              <div className="flex justify-between text-slate-700">
                <span>İşçilik Maliyeti:</span>
                <span className="font-mono">{formatCurrency(results.laborCost, currency)}</span>
              </div>
              <div className="flex justify-between text-slate-700">
                <span>Fire / Risk Payı (%{inputs.failureRatePercent}):</span>
                <span className="font-mono">+{formatCurrency(results.riskAmount, currency)}</span>
              </div>
              <div className="flex justify-between text-emerald-800 font-bold border-t border-amber-200/80 pt-1">
                <span>Hedef Net Kar (%{inputs.profitMarginPercent}):</span>
                <span className="font-mono">+{formatCurrency(results.profitAmount, currency)}</span>
              </div>
            </div>
          )}

          {/* Total Box */}
          <div className="bg-slate-900 text-white rounded-xl p-5 flex items-center justify-between">
            <div>
              <span className="text-xs text-slate-400 uppercase tracking-wider font-semibold block">
                Toplam Teklif Tutarı
              </span>
              <span className="text-[11px] text-slate-400">Vergiler ve teslimat hariçtir</span>
            </div>
            <div className="text-right">
              <span className="text-2xl sm:text-3xl font-black font-mono text-emerald-400">
                {formatCurrency(results.finalPrice, currency)}
              </span>
            </div>
          </div>

          {/* Footer Note */}
          <div className="text-[10px] text-slate-500 text-center border-t border-slate-200 pt-4">
            Bu teklif belgesi 15 gün süreyle geçerlidir. 3D baskı parçaları özel üretim olup sipariş onayı sonrası imalata başlanacaktır.
          </div>
        </div>
      </div>
    </div>
  );
};
