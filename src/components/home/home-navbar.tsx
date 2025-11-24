'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { signOut, useSession } from 'next-auth/react';
import { useCallback, useEffect, useMemo, useState } from 'react';
import AuthModal from '@/components/auth/AuthModal';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';

const primaryNav = [
  { label: 'K-Ranking', href: '/k-ranking' },
  { label: 'K-Note', href: '/k-note' },
  { label: 'Write a review', href: '/write-review' }
];

const secondaryNav = [
  { label: 'Brands', href: '/brands' },
  { label: 'About Us', href: '/about' },
  { label: 'To Business', href: '/business' }
];

type HomeNavbarProps = {
  activeHref?: string;
  activeLabel?: string;
};

export function HomeNavbar({ activeHref, activeLabel }: HomeNavbarProps) {
  const [loginOpen, setLoginOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const { data: session } = useSession();

  const activeKey = useMemo(() => {
    if (activeHref) return activeHref;
    const matchingItem = [...primaryNav, ...secondaryNav].find((item) => pathname?.startsWith(item.href));
    return matchingItem?.href ?? pathname;
  }, [activeHref, pathname]);

  const handleLoginClick = useCallback(() => {
    setLoginOpen(true);
  }, []);

  const toggleMobileMenu = useCallback(() => {
    setMobileOpen((open) => !open);
  }, []);

  const closeMobileMenu = useCallback(() => {
    setMobileOpen(false);
  }, []);

  const handleLogout = useCallback(async () => {
    setMobileOpen(false);
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
        <div className="relative mx-auto flex w-full max-w-6xl items-center justify-between gap-4 px-4 py-4 lg:px-2">
          <Link href="/" className="flex items-center gap-3 text-lg font-semibold text-slate-900">
            <span className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-purple-600 to-purple-400 text-lg font-bold text-white shadow-lg">
              K
            </span>
            <span className="text-xl font-bold">KnowWell</span>
          </Link>

          <nav className="hidden items-center gap-7 text-[13px] font-medium text-slate-700 lg:flex">
            {primaryNav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`rounded-full px-3.5 py-2 transition hover:bg-purple-50 hover:text-purple-700 ${
                  item.href === activeKey || item.label === activeLabel
                    ? 'bg-purple-600 text-white shadow-lg hover:bg-purple-600'
                    : ''
                }`}
              >
                {item.label}
              </Link>
            ))}

            <DropdownMenu>
              <DropdownMenuTrigger className="rounded-full px-3.5 py-2 text-[13px] font-semibold text-slate-800 transition hover:bg-purple-50 hover:text-purple-700">
                More
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start" className="mt-1">
                {secondaryNav.map((item) => (
                  <DropdownMenuItem key={item.href} asChild>
                    <Link
                      href={item.href}
                      className={`w-full rounded-md px-2 py-1.5 text-left ${
                        item.href === activeKey || item.label === activeLabel ? 'bg-purple-50 text-purple-700' : ''
                      }`}
                    >
                      {item.label}
                    </Link>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </nav>

          <div className="flex items-center gap-3">
            {session && (
              <Link
                href="/me"
                onClick={closeMobileMenu}
                className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-purple-100 text-sm font-semibold text-purple-700 transition hover:bg-purple-200 lg:hidden"
              >
                {initial}
              </Link>
            )}

            {!session && (
              <button
                type="button"
                onClick={handleLoginClick}
                className="inline-flex items-center justify-center gap-2 rounded-full bg-purple-600 px-4 py-2 text-sm font-semibold text-white shadow-lg transition hover:bg-purple-700 lg:hidden"
              >
                Log in
              </button>
            )}

            <button
              type="button"
              onClick={toggleMobileMenu}
              className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 text-slate-800 shadow-sm transition hover:bg-slate-50 lg:hidden"
              aria-label="Toggle navigation"
            >
              <span className="sr-only">Toggle navigation</span>
              <span className="block h-0.5 w-4 bg-slate-700" />
              <span className="mt-1 block h-0.5 w-4 bg-slate-700" />
              <span className="mt-1 block h-0.5 w-4 bg-slate-700" />
            </button>

            <div className="hidden items-center gap-3 lg:flex">
              {session ? (
                <div className="flex items-center gap-3 rounded-full border border-purple-100 bg-white px-3 py-2 shadow-sm">
                  <Link
                    href="/me"
                    className="flex items-center gap-3 rounded-full px-1 py-1 transition hover:bg-purple-50"
                  >
                    <div className="flex h-9 w-9 items-center justify-center rounded-full bg-purple-100 text-sm font-semibold text-purple-700">
                      {initial}
                    </div>
                    <span className="max-w-[140px] truncate text-sm font-semibold text-slate-800">{displayName}</span>
                  </Link>
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
        </div>

        {mobileOpen && (
          <div className="lg:hidden">
            <div className="mx-auto flex w-full max-w-6xl flex-col gap-3 border-t border-slate-100 bg-white px-4 pb-4">
              <div className="flex flex-wrap items-center gap-2 pt-3">
                {primaryNav.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={closeMobileMenu}
                    className={`rounded-full px-3 py-2 text-sm font-medium transition hover:bg-purple-50 hover:text-purple-700 ${
                      item.href === activeKey || item.label === activeLabel ? 'bg-purple-600 text-white hover:text-white' : 'text-slate-800'
                    }`}
                  >
                    {item.label}
                  </Link>
                ))}
                <DropdownMenu>
                  <DropdownMenuTrigger className="rounded-full px-3 py-2 text-sm font-semibold text-slate-800 transition hover:bg-purple-50 hover:text-purple-700">
                    More
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="start" className="mt-1">
                    {secondaryNav.map((item) => (
                      <DropdownMenuItem key={item.href} asChild>
                        <Link
                          href={item.href}
                          onClick={closeMobileMenu}
                          className={`w-full rounded-md px-2 py-1.5 text-left ${
                            item.href === activeKey || item.label === activeLabel ? 'bg-purple-50 text-purple-700' : ''
                          }`}
                        >
                          {item.label}
                        </Link>
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>

              {!session && (
                <button
                  type="button"
                  onClick={() => {
                    closeMobileMenu();
                    handleLoginClick();
                  }}
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-purple-600 px-4 py-2 text-sm font-semibold text-white shadow-lg transition hover:bg-purple-700"
                >
                  Log in
                </button>
              )}

              {session && (
                <div className="flex items-center gap-3 rounded-lg border border-slate-100 bg-white px-3 py-2 shadow-sm">
                  <div className="flex h-9 w-9 items-center justify-center rounded-full bg-purple-100 text-sm font-semibold text-purple-700">
                    {initial}
                  </div>
                  <div className="flex flex-col">
                    <span className="text-sm font-semibold text-slate-800">{displayName}</span>
                    <button
                      type="button"
                      onClick={handleLogout}
                      className="text-left text-xs font-semibold text-purple-700"
                    >
                      Logout
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </header>

      <AuthModal open={loginOpen} onClose={() => setLoginOpen(false)} />
    </>
  );
}
