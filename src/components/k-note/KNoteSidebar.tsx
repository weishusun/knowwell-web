'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ComponentProps } from 'react';

const mainLinks = [
  { href: '/k-note', label: 'Explore' },
  { href: '/k-note/create', label: 'Create Note' },
  { href: '/k-note/messages', label: 'Messages' },
  { href: '/k-note/me', label: 'Me' },
];

const secondaryLinks = [
  { href: '/k-note/manage', label: 'Note Manage' },
  { href: '/k-note/dashboard/overview', label: 'Overview' },
  { href: '/k-note/dashboard/content-analysis', label: 'Content Analysis' },
  { href: '/k-note/dashboard/data', label: 'Data' },
  { href: '/k-note/activity', label: 'Activity' },
];

export function KNoteSidebar(props: ComponentProps<'aside'>) {
  const pathname = usePathname();

  return (
    <aside
      {...props}
      className={`sticky top-24 flex h-[calc(100vh-6rem)] w-60 flex-col gap-6 rounded-2xl bg-white p-6 shadow ${props.className ?? ''}`}
    >
      <Link
        href="/k-note/create"
        className="inline-flex items-center justify-center rounded-full bg-purple-600 px-4 py-2 text-sm font-semibold text-white shadow hover:bg-purple-700"
      >
        Create Note
      </Link>

      <nav className="flex flex-col gap-2 text-sm font-medium text-gray-700">
        <div className="space-y-1">
          {mainLinks.map((link) => (
            <SidebarLink key={link.href} href={link.href} active={pathname === link.href}>
              {link.label}
            </SidebarLink>
          ))}
        </div>

        <div className="mt-4 space-y-1 border-t pt-4 text-xs uppercase tracking-wide text-gray-400">Dashboard</div>
        <div className="space-y-1">
          {secondaryLinks.map((link) => (
            <SidebarLink key={link.href} href={link.href} active={pathname === link.href}>
              {link.label}
            </SidebarLink>
          ))}
        </div>
      </nav>
    </aside>
  );
}

function SidebarLink({ active, href, children }: { active: boolean; href: string; children: React.ReactNode }) {
  return (
    <Link
      href={href}
      className={`flex items-center rounded-full px-4 py-2 transition hover:bg-purple-50 hover:text-purple-700 ${
        active ? 'bg-purple-600 text-white' : 'text-gray-700'
      }`}
    >
      {children}
    </Link>
  );
}
