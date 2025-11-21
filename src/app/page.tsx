import { AboutKnowWellSection } from '@/components/home/about-knowwell-section';
import { CategoryIconsRow } from '@/components/home/category-icons-row';
import { HeroSection } from '@/components/home/hero-section';
import { HomeNavbar } from '@/components/home/home-navbar';
import { LatestReviewsList, type Note } from '@/components/home/latest-reviews-list';
import { PopularNotesSection } from '@/components/home/popular-notes-section';
import { SiteFooter } from '@/components/home/site-footer';
import { TrendingRankingSection } from '@/components/home/trending-ranking-section';
import { CookieSettingsLauncher } from '@/components/cookie/CookieSettingsLauncher';

async function getNotes(): Promise<Note[]> {
  try {
    const res = await fetch(`${process.env.NEXTAUTH_URL ?? ''}/api/notes`, { cache: 'no-store' });
    if (!res.ok) return [];
    return res.json();
  } catch (error) {
    console.error('Failed to load notes', error);
    return [];
  }
}

export default async function HomePage() {
  const notes = await getNotes();

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#f7f3ff] via-white to-white text-slate-900">
      <HomeNavbar />
      <main className="flex flex-col gap-16 lg:gap-20">
        <HeroSection />
        <CategoryIconsRow />
        <TrendingRankingSection />
        <LatestReviewsList notes={notes} />
        <PopularNotesSection notes={notes} />
        <AboutKnowWellSection />
      </main>
      <div className="container-page pb-12">
        <div className="flex flex-col gap-3 rounded-2xl border border-purple-100 bg-purple-50 px-6 py-5 text-purple-900 shadow-sm lg:flex-row lg:items-center lg:justify-between">
          <div>
            <p className="text-sm font-semibold">Need to update your cookie preferences?</p>
            <p className="text-xs text-purple-800">Open the Cookie Settings dialog anytime to manage your choices.</p>
          </div>
          <CookieSettingsLauncher />
        </div>
      </div>
      <SiteFooter />
    </div>
  );
}
