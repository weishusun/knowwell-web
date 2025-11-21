'use client';

import { useEffect, useState } from 'react';

export type CookieSettingsState = {
  strictlyNecessary: boolean;
  performance: boolean;
  functional: boolean;
  targeting: boolean;
};

interface CookieSettingsDialogProps {
  open: boolean;
  onClose: () => void;
  onSave?: (settings: CookieSettingsState) => void;
  initialSettings?: CookieSettingsState;
}

const defaultSettings: CookieSettingsState = {
  strictlyNecessary: true,
  performance: true,
  functional: true,
  targeting: false
};

const cookieOptions: { key: keyof CookieSettingsState; title: string; description: string }[] = [
  {
    key: 'strictlyNecessary',
    title: 'Strictly Necessary',
    description: 'Required for basic site functionality and security.'
  },
  {
    key: 'performance',
    title: 'Performance Cookies',
    description: 'Help us improve site performance and understand usage.'
  },
  {
    key: 'functional',
    title: 'Functional Cookies',
    description: 'Remember preferences to personalize your experience.'
  },
  {
    key: 'targeting',
    title: 'Targeting Cookies',
    description: 'Used for tailored recommendations and relevant content.'
  }
];

export function CookieSettingsDialog({ open, onClose, onSave, initialSettings }: CookieSettingsDialogProps) {
  const [settings, setSettings] = useState<CookieSettingsState>(initialSettings ?? defaultSettings);

  useEffect(() => {
    if (open) {
      setSettings(initialSettings ?? defaultSettings);
    }
  }, [initialSettings, open]);

  const updateSetting = (key: keyof CookieSettingsState, value: boolean) => {
    setSettings((prev) => ({ ...prev, [key]: value }));
  };

  const handleRejectAll = () => {
    const nextSettings = {
      strictlyNecessary: false,
      performance: false,
      functional: false,
      targeting: false
    };
    setSettings(nextSettings);
    onSave?.(nextSettings);
    onClose();
  };

  const handleAcceptAll = () => {
    const nextSettings = {
      strictlyNecessary: true,
      performance: true,
      functional: true,
      targeting: true
    };
    setSettings(nextSettings);
    onSave?.(nextSettings);
    onClose();
  };

  if (!open) return null;

  const toggleSwitch = (key: keyof CookieSettingsState) => updateSetting(key, !settings[key]);

  const handleBackdropClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if (event.target === event.currentTarget) {
      onClose();
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 px-4 py-10 backdrop-blur"
      role="dialog"
      aria-modal
      onClick={handleBackdropClick}
    >
      <div className="w-full max-w-2xl rounded-3xl border border-white/10 bg-slate-950 px-8 py-7 text-white shadow-[0_32px_80px_rgba(0,0,0,0.45)]">
        <div className="flex items-start justify-between gap-4">
          <div className="space-y-1">
            <h2 className="text-2xl font-semibold tracking-tight">Cookie Settings</h2>
            <p className="text-sm text-slate-300">
              Manage how KnowWell uses cookies to personalize your experience. You can tailor which cookies are enabled below.
            </p>
          </div>
          <button
            type="button"
            aria-label="Close cookie settings"
            className="rounded-full bg-white/10 px-3 py-1.5 text-sm text-gray-200 transition hover:bg-white/20"
            onClick={onClose}
          >
            ×
          </button>
        </div>

        <div className="mt-6 space-y-4 rounded-2xl border border-white/5 bg-white/5 p-4">
          {cookieOptions.map((option) => (
            <div key={option.key} className="flex items-center justify-between gap-4 rounded-xl px-3 py-2 transition hover:bg-white/5">
              <div className="space-y-1">
                <p className="text-sm font-semibold text-white">{option.title}</p>
                <p className="text-xs text-slate-300">{option.description}</p>
              </div>
              <button
                type="button"
                role="switch"
                aria-checked={settings[option.key]}
                onClick={() => toggleSwitch(option.key)}
                className={`relative inline-flex h-7 w-12 items-center rounded-full border border-white/15 transition ${
                  settings[option.key]
                    ? 'bg-gradient-to-r from-purple-500 to-purple-600 shadow-[0_8px_20px_rgba(109,40,217,0.35)]'
                    : 'bg-white/10'
                }`}
              >
                <span
                  className={`inline-block h-5 w-5 rounded-full bg-white transition-transform ${
                    settings[option.key] ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>
          ))}
        </div>

        <div className="mt-8 flex flex-wrap items-center justify-end gap-3 text-sm font-semibold">
          <button
            type="button"
            className="rounded-full border border-white/40 px-5 py-2.5 text-white transition hover:border-white/60 hover:bg-white/10"
            onClick={handleRejectAll}
          >
            REJECT ALL
          </button>
          <button
            type="button"
            className="rounded-full bg-gradient-to-r from-purple-500 via-purple-600 to-purple-500 px-6 py-2.5 text-white shadow-lg transition hover:brightness-110"
            onClick={handleAcceptAll}
          >
            ACCEPT ALL COOKIES
          </button>
          <button
            type="button"
            className="px-4 py-2 text-slate-200 transition hover:text-white"
            onClick={onClose}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
