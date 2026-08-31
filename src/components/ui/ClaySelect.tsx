import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown, Check, Sparkles } from 'lucide-react';

export interface ClaySelectOption {
  id: string;
  label: string;
  badge?: string | number;
  icon?: React.ReactNode;
}

interface ClaySelectProps {
  placeholder?: string;
  options: ClaySelectOption[];
  value?: string;
  onChange: (id: string) => void;
  className?: string;
  icon?: React.ReactNode;
}

export const ClaySelect: React.FC<ClaySelectProps> = ({
  placeholder = 'Seçiniz...',
  options,
  value,
  onChange,
  className = '',
  icon = <Sparkles className="w-3.5 h-3.5 text-amber-500 dark:text-amber-400" />,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const selectedOption = options.find((o) => o.id === value);

  // Close when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('keydown', handleKeyDown);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen]);

  const handleSelect = (id: string) => {
    onChange(id);
    setIsOpen(false);
  };

  return (
    <div ref={dropdownRef} className={`relative w-full sm:w-auto ${className}`}>
      {/* Trigger Button */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="clay-inset w-full sm:w-auto px-3.5 py-2 rounded-xl flex items-center justify-between gap-2.5 text-xs font-bold text-slate-800 dark:text-slate-200 cursor-pointer hover:border-indigo-500/30 transition-all group"
      >
        <div className="flex items-center gap-2 min-w-0">
          {icon}
          <span className="truncate max-w-[170px] sm:max-w-[200px]">
            {selectedOption ? selectedOption.label : placeholder}
          </span>
        </div>

        <ChevronDown 
          className={`w-3.5 h-3.5 text-slate-500 dark:text-slate-400 transition-transform duration-200 shrink-0 ${
            isOpen ? 'rotate-180 text-indigo-600 dark:text-indigo-400' : ''
          }`} 
        />
      </button>

      {/* Floating 3D Clay Menu */}
      {isOpen && (
        <div className="absolute right-0 top-full mt-2 w-full sm:w-72 z-50 clay-card p-1.5 shadow-2xl border border-white/60 dark:border-white/10 rounded-2xl max-h-64 overflow-y-auto animate-fadeIn backdrop-blur-xl bg-white/95 dark:bg-[#131b2e]/95">
          <div className="space-y-1">
            {options.map((opt) => {
              const isSelected = opt.id === value;
              return (
                <button
                  key={opt.id}
                  type="button"
                  onClick={() => handleSelect(opt.id)}
                  className={`w-full px-3 py-2 rounded-xl text-left text-xs font-bold flex items-center justify-between gap-2 transition-all cursor-pointer ${
                    isSelected
                      ? 'clay-pill-active text-indigo-600 dark:text-indigo-300'
                      : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800/60'
                  }`}
                >
                  <div className="flex items-center gap-2 min-w-0">
                    {opt.icon}
                    <span className="truncate">{opt.label}</span>
                  </div>

                  <div className="flex items-center gap-1.5 shrink-0">
                    {opt.badge && (
                      <span className="text-[10px] font-mono font-extrabold px-2 py-0.5 rounded-md bg-slate-200/70 dark:bg-slate-800 text-slate-600 dark:text-slate-400">
                        {opt.badge}
                      </span>
                    )}
                    {isSelected && (
                      <Check className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400 shrink-0" />
                    )}
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};
