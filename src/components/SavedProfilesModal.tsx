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
import type { Language, SavedProfile } from '../types/calculator';
import { useTranslation } from '../i18n/translations';

interface SavedProfilesModalProps {
  isOpen: boolean;
  onClose: () => void;
  savedProfiles: SavedProfile[];
  onLoadProfile: (profile: SavedProfile) => void;
  onSaveNewProfile: (name: string) => void;
  onDeleteProfile: (id: string) => void;
  onExportProfiles: () => void;
  onImportProfiles: (jsonStr: string) => void;
  lang: Language;
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
  lang,
}) => {
  const { t } = useTranslation(lang);
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
        setImportError(t('invalidJson'));
      }
    };
    reader.readAsText(file);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 dark:bg-[#070b14]/80 backdrop-blur-md animate-fadeIn">
      <div className="clay-card w-full max-w-xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200 dark:border-slate-800 bg-slate-100 dark:bg-[#0c1220]">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-purple-500 to-indigo-600 shadow-[2px_3px_8px_rgba(168,85,247,0.35),inset_1.5px_1.5px_2px_rgba(255,255,255,0.3)] flex items-center justify-center">
              <Bookmark className="w-4 h-4 text-white" />
            </div>
            <div>
              <h2 className="text-base font-extrabold text-slate-900 dark:text-white">{t('profilesTitle')}</h2>
              <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">{t('profilesSubtitle')}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="clay-stepper-btn p-2 text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Modal Content */}
        <div className="p-6 overflow-y-auto space-y-6">
          {/* Save Current as New Profile Form */}
          <form onSubmit={handleSave} className="clay-inset p-4 rounded-2xl">
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-200 mb-2 uppercase tracking-wider text-[11px]">
              {t('saveAsNewProfile')}
            </label>
            <div className="flex gap-2">
              <input
                type="text"
                placeholder={t('profileNamePlaceholder')}
                value={newProfileName}
                onChange={(e) => setNewProfileName(e.target.value)}
                className="clay-input flex-1 px-3.5 py-2 text-xs text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 font-medium"
              />
              <button
                type="submit"
                disabled={!newProfileName.trim()}
                className="clay-btn-primary px-4 py-2 disabled:opacity-50 text-white text-xs font-extrabold flex items-center gap-1.5 cursor-pointer"
              >
                <Plus className="w-4 h-4" />
                <span>{t('saveBtn')}</span>
              </button>
            </div>
          </form>

          {/* Saved Profiles List */}
          <div>
            <h3 className="text-xs font-extrabold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-3 flex items-center gap-2">
              <HardDrive className="w-3.5 h-3.5" />
              <span>{t('savedProfilesList')} ({savedProfiles.length})</span>
            </h3>

            {savedProfiles.length === 0 ? (
              <div className="text-center py-8 clay-inset rounded-2xl text-slate-500 text-xs font-medium">
                {t('noProfiles')}
              </div>
            ) : (
              <div className="space-y-2.5">
                {savedProfiles.map((profile) => (
                  <div
                    key={profile.id}
                    className="clay-stat-cushion p-3.5 flex items-center justify-between transition group"
                  >
                    <div className="min-w-0 flex-1 pr-3">
                      <div className="flex items-center gap-2">
                        <span className="font-extrabold text-slate-800 dark:text-slate-200 text-xs truncate">
                          {profile.name}
                        </span>
                        {profile.data.printerName && (
                          <span className="text-[10px] px-2 py-0.5 rounded-full clay-inset text-slate-600 dark:text-slate-400 font-mono">
                            {profile.data.printerName}
                          </span>
                        )}
                      </div>
                      <div className="text-[10px] text-slate-500 mt-1 flex items-center gap-3 font-medium">
                        <span>{t('filamentItem')}: {profile.data.filamentType || 'PLA'}</span>
                        <span>{t('netProfit')}: %{profile.data.profitMarginPercent ?? 40}</span>
                        <span>{new Date(profile.updatedAt).toLocaleDateString(lang === 'en' ? 'en-US' : 'tr-TR')}</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                      <button
                        type="button"
                        onClick={() => {
                          onLoadProfile(profile);
                          onClose();
                        }}
                        className="clay-btn-primary px-3.5 py-1.5 text-white text-xs font-extrabold cursor-pointer"
                      >
                        {t('loadBtn')}
                      </button>
                      <button
                        type="button"
                        onClick={() => onDeleteProfile(profile.id)}
                        className="clay-stepper-btn p-2 text-slate-400 hover:text-rose-500 cursor-pointer"
                        title={t('deleteBtn')}
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Import / Export JSON */}
          <div className="pt-3 border-t border-slate-200 dark:border-slate-800 flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={onExportProfiles}
                className="clay-btn-secondary inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold cursor-pointer"
              >
                <Download className="w-3.5 h-3.5 text-slate-500 dark:text-slate-400" />
                <span>{t('exportJson')}</span>
              </button>

              <label className="clay-btn-secondary inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold cursor-pointer">
                <Upload className="w-3.5 h-3.5 text-slate-500 dark:text-slate-400" />
                <span>{t('importJson')}</span>
                <input
                  type="file"
                  accept=".json"
                  onChange={handleFileUpload}
                  className="hidden"
                />
              </label>
            </div>

            {importError && (
              <span className="text-[11px] text-rose-500 dark:text-rose-400 font-bold">{importError}</span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
