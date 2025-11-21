import type { ReactNode } from 'react';

import { HomeNavbar } from '@/components/home/home-navbar';
import { SiteFooter } from '@/components/home/site-footer';

export default function PublicLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col">
      <HomeNavbar />
      <main className="flex-1">{children}</main>
      <SiteFooter />
    </div>
  );
}
