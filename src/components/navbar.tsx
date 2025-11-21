'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { signOut, useSession } from 'next-auth/react';
import { useMemo } from 'react';

const links = [
  { href: '/', label: 'Home' },
  { href: '/notes/new', label: 'Create K-Note' }
];

export function Navbar() {
  const pathname = usePathname();
  const { data: session } = useSession();

  const isActive = useMemo(
    () => (href: string) => (pathname === href ? 'text-brand-700' : 'text-slate-700'),
    [pathname]
  );

  return (
    <header className="sticky top-0 z-30 w-full border-b border-slate-100 bg-white/80 backdrop-blur">
      <div className="container-page flex flex-row items-center justify-between gap-4 py-4">
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-brand-600 text-lg font-semibold text-white shadow-card">
            K
          </div>
          <div className="flex flex-col">
            <Link href="/" className="text-lg font-semibold text-slate-900">
              KnowWell
            </Link>
            <p className="text-xs text-slate-500">Knowledge that feels personal.</p>
          </div>
        </div>

        <nav className="hidden items-center gap-6 text-sm font-medium md:flex">
          {links.map((link) => (
            <Link key={link.href} href={link.href} className={isActive(link.href)}>
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3 text-sm">
          {session?.user ? (
            <>
              <span className="hidden text-slate-600 sm:inline">Hi, {session.user.name ?? 'Explorer'}!</span>
              <button className="btn-secondary" onClick={() => signOut({ callbackUrl: '/' })}>
                Sign out
              </button>
            </>
          ) : (
            <>
              <Link href="/login" className="btn-secondary">
                Log in
              </Link>
              <Link href="/register" className="btn-primary">
                Sign up
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
