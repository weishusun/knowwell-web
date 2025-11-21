import type { Metadata } from 'next';
import { Inter, Plus_Jakarta_Sans } from 'next/font/google';
import './globals.css';
import { Footer } from '@/components/footer';
import { CookieSettingsManager } from '@/components/cookie/CookieSettingsManager';
import { Providers } from '@/components/providers';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });
const plusJakarta = Plus_Jakarta_Sans({ subsets: ['latin'], variable: '--font-plus' });

export const metadata: Metadata = {
  title: 'KnowWell - K-Notes & Reviews',
  description: 'Share rich notes and trusted reviews with the KnowWell community.'
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${plusJakarta.variable}`}>
      <body className="min-h-screen bg-slate-50">
        <Providers>
          <main className="min-h-[70vh]">{children}</main>
          <Footer />
          <CookieSettingsManager />
        </Providers>
      </body>
    </html>
  );
}
