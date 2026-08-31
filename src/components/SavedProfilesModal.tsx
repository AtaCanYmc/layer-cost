import React, { useState } from 'react';
import { 
  X, 
  Bookmark, 
  Trash2, 
  Upload, 
  Download, 
  Plus, 
  HardDrive
} from 'lucide-react';
import type { SavedProfile } from '../types/calculator';

interface SavedProfilesModalProps {
  isOpen: boolean;
  onClose: () => void;
  savedProfiles: SavedProfile[];
  onLoadProfile: (profile: SavedProfile) => void;
  onSaveNewProfile: (name: string) => void;
  onDeleteProfile: (id: string) => void;
  onExportProfiles: () => void;
  onImportProfiles: (jsonStr: string) => void;
}

export const SavedProfilesModal: React.FC<SavedProfilesModalProps> = ({
  isOpen,
  onClose,
  savedProfiles,
  onLoadProfile,
  onSaveNewProfile,
  onDeleteProfile,
  onExportProfiles,
  onImportProfiles,
}) => {
  const [newProfileName, setNewProfileName] = useState('');
  const [importError, setImportError] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newProfileName.trim()) return;
    onSaveNewProfile(newProfileName.trim());
    setNewProfileName('');
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const text = event.target?.result as string;
        onImportProfiles(text);
        setImportError(null);
      } catch {
        setImportError('Geçersiz profil JSON dosyası!');
      }
    };
    reader.readAsText(file);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-fadeIn">
      <div className="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800 bg-slate-950/50">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-purple-500/10 border border-purple-500/20 text-purple-400">
              <Bookmark className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-bold text-white">Kayıtlı Profiller</h2>
              <p className="text-xs text-slate-400">Yazıcı, malzeme ve maliyet şablonlarınızı yönetin</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Content */}
        <div className="p-6 overflow-y-auto space-y-6">
          {/* Save Current as New Profile Form */}
          <form onSubmit={handleSave} className="bg-slate-950/60 border border-slate-800/80 rounded-xl p-4">
            <label className="block text-xs font-semibold text-slate-300 mb-2">
              Mevcut Ayarları Yeni Profil Olarak Kaydet
            </label>
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="Profil adı (örn: Bambu P1S - Hızlı PLA)"
                value={newProfileName}
                onChange={(e) => setNewProfileName(e.target.value)}
                className="flex-1 bg-slate-900 border border-slate-700/80 rounded-xl px-3.5 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-purple-500"
              />
              <button
                type="submit"
                disabled={!newProfileName.trim()}
                className="inline-flex items-center gap-1.5 px-4 py-2 bg-purple-600 hover:bg-purple-500 disabled:opacity-50 text-white text-xs font-semibold rounded-xl transition cursor-pointer"
              >
                <Plus className="w-4 h-4" />
                <span>Kaydet</span>
              </button>
            </div>
          </form>

          {/* Saved Profiles List */}
          <div>
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3 flex items-center gap-1.5">
              <HardDrive className="w-3.5 h-3.5 text-slate-400" />
              <span>Kayıtlı Profiller ({savedProfiles.length})</span>
            </h3>

            {savedProfiles.length === 0 ? (
              <div className="text-center py-8 bg-slate-950/30 rounded-xl border border-dashed border-slate-800 text-slate-500 text-xs">
                Henüz özel bir profil kaydetmediniz. Yukarıdaki formu kullanarak mevcut ayarlarınızı kaydedebilirsiniz.
              </div>
            ) : (
              <div className="space-y-2.5">
                {savedProfiles.map((profile) => (
                  <div
                    key={profile.id}
                    className="flex items-center justify-between p-3.5 bg-slate-950/40 hover:bg-slate-950/80 border border-slate-800 rounded-xl transition group"
                  >
                    <div className="min-w-0 flex-1 pr-3">
                      <div className="flex items-center gap-2">
                        <span className="font-semibold text-slate-200 text-xs truncate">
                          {profile.name}
                        </span>
                        {profile.data.printerName && (
                          <span className="text-[10px] px-2 py-0.5 rounded-md bg-slate-800 text-slate-400">
                            {profile.data.printerName}
                          </span>
                        )}
                      </div>
                      <div className="text-[10px] text-slate-500 mt-1 flex items-center gap-3">
                        <span>Filament: {profile.data.filamentType || 'PLA'}</span>
                        <span>Kar: %{profile.data.profitMarginPercent ?? 40}</span>
                        <span>{new Date(profile.updatedAt).toLocaleDateString('tr-TR')}</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-1.5 shrink-0">
                      <button
                        type="button"
                        onClick={() => {
                          onLoadProfile(profile);
                          onClose();
                        }}
                        className="px-3 py-1.5 bg-indigo-600/20 hover:bg-indigo-600 text-indigo-300 hover:text-white text-xs font-semibold rounded-lg border border-indigo-500/30 transition cursor-pointer"
                      >
                        Yükle
                      </button>
                      <button
                        type="button"
                        onClick={() => onDeleteProfile(profile.id)}
                        className="p-1.5 text-slate-500 hover:text-rose-400 hover:bg-rose-500/10 rounded-lg transition cursor-pointer"
                        title="Profili Sil"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Import / Export JSON */}
          <div className="pt-3 border-t border-slate-800/80 flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={onExportProfiles}
                className="inline-flex items-center gap-1 px-3 py-1.5 text-xs text-slate-300 bg-slate-800 hover:bg-slate-700 rounded-lg transition cursor-pointer"
              >
                <Download className="w-3.5 h-3.5 text-slate-400" />
                <span>JSON Dışa Aktar</span>
              </button>

              <label className="inline-flex items-center gap-1 px-3 py-1.5 text-xs text-slate-300 bg-slate-800 hover:bg-slate-700 rounded-lg transition cursor-pointer">
                <Upload className="w-3.5 h-3.5 text-slate-400" />
                <span>JSON İçe Aktar</span>
                <input
                  type="file"
                  accept=".json"
                  onChange={handleFileUpload}
                  className="hidden"
                />
              </label>
            </div>

            {importError && (
              <span className="text-[11px] text-rose-400">{importError}</span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
