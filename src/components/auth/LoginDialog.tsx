'use client';

import { useEffect, useMemo, useState } from 'react';
import { signIn } from 'next-auth/react';

interface LoginDialogProps {
  open: boolean;
  onClose: () => void;
}

type TabKey = 'code' | 'email';

const tabs: { key: TabKey; label: string }[] = [
  { key: 'code', label: 'Verification code' },
  { key: 'email', label: 'Email address' }
];

export function LoginDialog({ open, onClose }: LoginDialogProps) {
  const [activeTab, setActiveTab] = useState<TabKey>('code');
  const [country, setCountry] = useState('');
  const [phone, setPhone] = useState('');
  const [code, setCode] = useState('');
  const [email, setEmail] = useState('');

  const tabCopy = useMemo(
    () => ({
      title: tabs.find((tab) => tab.key === activeTab)?.label ?? 'Verification code',
      description:
        activeTab === 'code'
          ? 'Log in with a one-time verification code sent to your phone number.'
          : 'Log in with your email address and we will email you a magic link.'
    }),
    [activeTab]
  );

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && open) {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose, open]);

  const handleBackdropClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if (event.target === event.currentTarget) {
      onClose();
    }
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (activeTab === 'code') {
      // TODO: Replace with the appropriate verification code sign-in flow.
      await signIn('credentials', { phone, code, redirect: false });
    } else {
      // TODO: Wire up email magic link authentication.
      await signIn('email', { email, redirect: false });
    }
  };

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60"
      onClick={handleBackdropClick}
      aria-modal
      role="dialog"
    >
      <div className="relative w-full max-w-xl overflow-hidden rounded-2xl border border-white/10 bg-black text-white shadow-[0_25px_70px_rgba(0,0,0,0.35)]">
        <button
          type="button"
          onClick={onClose}
          aria-label="Close login dialog"
          className="absolute right-4 top-4 rounded-full bg-white/10 px-2 py-1 text-sm text-gray-300 transition hover:bg-white/20 hover:text-white"
        >
          ×
        </button>

        <div className="flex flex-col items-center gap-2 px-8 pt-8 text-center">
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-purple-500 to-purple-700 text-xl font-bold shadow-lg">
            K
          </div>
          <p className="text-lg font-semibold">KnowWell</p>
          <p className="text-sm text-gray-400">Welcome back, explorer</p>
        </div>

        <div className="mt-8 flex items-center justify-center gap-3 px-8">
          {tabs.map((tab) => (
            <button
              key={tab.key}
              type="button"
              onClick={() => setActiveTab(tab.key)}
              className={`flex-1 rounded-xl border px-4 py-3 text-sm font-semibold transition ${
                activeTab === tab.key
                  ? 'border-purple-500/70 bg-white/10 text-white'
                  : 'border-white/5 bg-white/5 text-gray-400 hover:border-white/15 hover:text-white'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <form onSubmit={handleSubmit} className="mt-8 space-y-6 px-8 pb-10">
          <div className="flex items-start justify-between gap-4 text-sm text-gray-300">
            <div>
              <p className="font-semibold text-white">{tabCopy.title}</p>
              <p className="text-gray-400">{tabCopy.description}</p>
            </div>
            <button type="button" className="text-xs font-semibold text-purple-300 hover:text-purple-200">
              Help
            </button>
          </div>

          {activeTab === 'code' ? (
            <div className="space-y-4">
              <label className="block text-sm text-gray-300">
                <span className="mb-2 block text-xs uppercase tracking-[0.08em] text-gray-400">Please select your country</span>
                <select
                  value={country}
                  onChange={(event) => setCountry(event.target.value)}
                  className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none transition focus:border-purple-500/70"
                >
                  <option value="" disabled>
                    Choose a country/region
                  </option>
                  <option value="usa">United States (+1)</option>
                  <option value="china">China (+86)</option>
                  <option value="uk">United Kingdom (+44)</option>
                  <option value="australia">Australia (+61)</option>
                </select>
              </label>

              <div className="space-y-2">
                <label className="text-xs uppercase tracking-[0.08em] text-gray-400">Phone number</label>
                <input
                  type="tel"
                  value={phone}
                  onChange={(event) => setPhone(event.target.value)}
                  placeholder="Enter your phone number"
                  className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white placeholder:text-gray-500 outline-none transition focus:border-purple-500/70"
                />
              </div>

              <div className="space-y-2">
                <label className="text-xs uppercase tracking-[0.08em] text-gray-400">Verification code</label>
                <div className="flex gap-3">
                  <input
                    type="text"
                    value={code}
                    onChange={(event) => setCode(event.target.value)}
                    placeholder="Enter the code"
                    className="flex-1 rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white placeholder:text-gray-500 outline-none transition focus:border-purple-500/70"
                  />
                  <button
                    type="button"
                    className="rounded-xl border border-purple-500/50 bg-purple-600/70 px-4 py-3 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:bg-purple-600"
                  >
                    Send verification code
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              <label className="block text-sm text-gray-300">
                <span className="mb-2 block text-xs uppercase tracking-[0.08em] text-gray-400">Email address</span>
                <input
                  type="email"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  placeholder="you@example.com"
                  className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white placeholder:text-gray-500 outline-none transition focus:border-purple-500/70"
                />
              </label>
            </div>
          )}

          <div className="pt-2">
            <button
              type="submit"
              className="relative inline-flex w-full items-center justify-center overflow-hidden rounded-xl bg-gradient-to-r from-purple-500 via-purple-600 to-purple-500 px-6 py-3 text-sm font-semibold uppercase tracking-[0.12em] text-white shadow-lg transition hover:brightness-110"
            >
              <span className="absolute inset-0 bg-white/10 opacity-0 transition-opacity duration-300 hover:opacity-10" />
              <span className="relative">login</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
