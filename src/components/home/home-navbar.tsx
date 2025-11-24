'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { signOut, useSession } from 'next-auth/react';
import { useCallback, useEffect, useMemo, useState } from 'react';
import AuthModal from '@/components/auth/AuthModal';

const navItems = [
  { label: "What's New", href: '/' },
  { label: 'K-Ranking', href: '/k-ranking' },
  { label: 'K-Note', href: '/k-note' },
  { label: 'Write a review', href: '/write-review' },
  { label: 'Brands', href: '/brands' },
  { label: 'About Us', href: '/about' }
];

type HomeNavbarProps = {
  activeHref?: string;
  activeLabel?: string;
};

export function HomeNavbar({ activeHref, activeLabel }: HomeNavbarProps) {
  const [loginOpen, setLoginOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const { data: session } = useSession();

  const activeKey = useMemo(() => {
    if (activeHref) return activeHref;
    const matchingItem = navItems.find((item) => pathname?.startsWith(item.href));
    return matchingItem?.href ?? pathname;
  }, [activeHref, pathname]);

  const handleLoginClick = useCallback(() => {
    setLoginOpen(true);
  }, []);

  const handleLogout = useCallback(async () => {
    await signOut({ redirect: false });
    router.refresh();
  }, [router]);

  const displayName = useMemo(
    () => session?.user?.name || session?.user?.email || 'User',
    [session?.user?.email, session?.user?.name]
  );

  const initial = useMemo(() => displayName.charAt(0).toUpperCase(), [displayName]);

  useEffect(() => {
    const listener = () => setLoginOpen(true);
    window.addEventListener('open-login-modal', listener);
    return () => window.removeEventListener('open-login-modal', listener);
  }, []);

  return (
    <>
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
                className={`rounded-full px-4 py-2 transition hover:bg-purple-50 hover:text-purple-700 ${
                  item.href === activeKey || item.label === activeLabel
                    ? 'bg-purple-600 text-white shadow-lg hover:bg-purple-600'
                    : ''
                }`}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <Link
              href="/business"
              className="hidden rounded-full border border-purple-200 px-5 py-2 text-sm font-semibold text-purple-700 transition hover:bg-purple-50 lg:inline-flex lg:items-center lg:justify-center"
            >
              To Business
            </Link>
            {session ? (
              <div className="flex items-center gap-3 rounded-full border border-purple-100 bg-white px-3 py-2 shadow-sm">
                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-purple-100 text-sm font-semibold text-purple-700">
                  {initial}
                </div>
                <span className="max-w-[140px] truncate text-sm font-semibold text-slate-800">{displayName}</span>
                <button
                  type="button"
                  onClick={handleLogout}
                  className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-700 transition hover:bg-slate-200"
                >
                  Logout
                </button>
              </div>
            ) : (
              <button
                type="button"
                onClick={handleLoginClick}
                className="inline-flex items-center justify-center gap-2 rounded-full bg-purple-600 px-5 py-2 text-sm font-semibold text-white shadow-lg transition hover:bg-purple-700"
              >
                Log in
              </button>
            )}
          </div>
        </div>
      </header>

      <AuthModal open={loginOpen} onClose={() => setLoginOpen(false)} />
    </>
  );
}
