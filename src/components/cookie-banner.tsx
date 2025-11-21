'use client';

import { useEffect, useState } from 'react';

export function CookieBanner() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem('kw-cookie-consent');
    if (!consent) setOpen(true);
  }, []);

  const accept = () => {
    localStorage.setItem('kw-cookie-consent', 'accepted');
    setOpen(false);
  };

  if (!open) return null;

  return (
    <div className="fixed bottom-4 left-0 right-0 z-40 flex justify-center px-4">
      <div className="card max-w-3xl flex-col gap-3 border border-slate-200 bg-white/95 shadow-card">
        <div className="flex items-center justify-between gap-4">
          <div>
            <h3 className="text-base font-semibold text-slate-900">We use cookies</h3>
            <p className="text-sm text-slate-600">
              We rely on cookies to personalize your reading experience and to understand how our community shares knowledge.
            </p>
          </div>
          <button
            aria-label="Close cookie banner"
            className="text-slate-400 transition hover:text-slate-600"
            onClick={() => setOpen(false)}
          >
            ✕
          </button>
        </div>
        <div className="flex flex-wrap items-center justify-end gap-3">
          <button className="btn-secondary" onClick={() => setOpen(false)}>
            Maybe later
          </button>
          <button className="btn-primary" onClick={accept}>
            Accept cookies
          </button>
        </div>
      </div>
    </div>
  );
}
