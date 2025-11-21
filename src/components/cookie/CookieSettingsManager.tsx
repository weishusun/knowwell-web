'use client';

import { useEffect, useState } from 'react';
import { CookieBanner } from '@/components/cookie-banner';
import { CookieSettingsDialog, type CookieSettingsState } from '@/components/cookie/CookieSettingsDialog';

const defaultPreferences: CookieSettingsState = {
  strictlyNecessary: true,
  performance: true,
  functional: true,
  targeting: false
};

export function CookieSettingsManager() {
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [preferences, setPreferences] = useState<CookieSettingsState>(defaultPreferences);

  useEffect(() => {
    const stored = localStorage.getItem('kw-cookie-preferences');
    if (stored) {
      try {
        const parsed = JSON.parse(stored) as CookieSettingsState;
        setPreferences({ ...defaultPreferences, ...parsed });
      } catch (error) {
        console.error('Failed to parse stored cookie preferences', error);
      }
    }

    const handleOpen = () => setSettingsOpen(true);
    window.addEventListener('kw-open-cookie-settings', handleOpen);
    return () => window.removeEventListener('kw-open-cookie-settings', handleOpen);
  }, []);

  const persistConsent = (nextPreferences: CookieSettingsState) => {
    setPreferences(nextPreferences);
    localStorage.setItem('kw-cookie-preferences', JSON.stringify(nextPreferences));

    const allEnabled = Object.values(nextPreferences).every(Boolean);
    const anyEnabled = Object.values(nextPreferences).some(Boolean);
    const consentStatus = allEnabled ? 'accepted' : anyEnabled ? 'custom' : 'rejected';

    localStorage.setItem('kw-cookie-consent', consentStatus);
    window.dispatchEvent(new Event('kw-cookie-consent-updated'));
  };

  const handleSave = (nextPreferences: CookieSettingsState) => {
    persistConsent(nextPreferences);
    setSettingsOpen(false);
  };

  return (
    <>
      <CookieBanner onOpenSettings={() => setSettingsOpen(true)} />
      <CookieSettingsDialog
        open={settingsOpen}
        onClose={() => setSettingsOpen(false)}
        onSave={handleSave}
        initialSettings={preferences}
      />
    </>
  );
}
