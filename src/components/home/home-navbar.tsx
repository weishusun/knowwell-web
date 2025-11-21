'use client';

import Link from 'next/link';
import { useCallback } from 'react';

const navItems = [
  { label: "What's New", href: '/whats-new' },
  { label: 'K-Ranking', href: '/k-ranking' },
  { label: 'K-Note', href: '/k-note' },
  { label: 'Smart Buy', href: '/smart-buy' },
  { label: 'Write a review', href: '/reviews' },
  { label: 'To Business', href: '/business' }
];

export function HomeNavbar() {
  const handleLoginClick = useCallback(() => {
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent('open-login-modal'));
    }
  }, []);

  return (
    <header className="sticky top-0 z-30 bg-white/80 backdrop-blur">
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-4 py-4 lg:px-2">
        <Link href="/" className="flex items-center gap-3 text-lg font-semibold text-slate-900">
          <span className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-purple-600 to-purple-400 text-lg font-bold text-white shadow-lg">
            K
          </span>
          <span className="text-xl font-bold">KnowWell</span>
        </Link>

        <nav className="hidden items-center gap-6 text-sm font-medium text-slate-700 lg:flex">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="rounded-full px-4 py-2 transition hover:bg-purple-50 hover:text-purple-700"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={handleLoginClick}
            className="inline-flex items-center justify-center gap-2 rounded-full bg-purple-600 px-5 py-2 text-sm font-semibold text-white shadow-lg transition hover:bg-purple-700"
          >
            Log in
          </button>
        </div>
      </div>
    </header>
  );
}
