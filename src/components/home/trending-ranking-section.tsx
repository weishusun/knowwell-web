import Image from 'next/image';
import Link from 'next/link';

const trendingBanner = {
  title: 'The Tesla: Cybertruck',
  description:
    'Latest and hot news, Tesla has formally announced the Cybertruck price details as part of the new EVs rollout.',
  image: 'https://images.unsplash.com/photo-1503736334956-4c8f8e92946d?auto=format&fit=crop&w=1400&q=80'
};

const trendingCards = [
  {
    title: 'This is the latest mobile phone',
    category: 'Latest Ranking',
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=600&q=80'
  },
  {
    title: 'This is the latest mobile phone',
    category: 'Latest Ranking',
    image: 'https://images.unsplash.com/photo-1481277542470-605612bd2d61?auto=format&fit=crop&w=600&q=80'
  },
  {
    title: 'This is the latest mobile phone',
    category: 'Latest Ranking',
    image: 'https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?auto=format&fit=crop&w=600&q=80'
  },
  {
    title: 'This is the latest mobile phone',
    category: 'Latest Ranking',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=600&q=80'
  }
];

export function TrendingRankingSection() {
  return (
    <section className="mx-auto w-full max-w-6xl px-4 lg:px-0">
      <header className="mb-8 flex flex-col gap-2 text-center">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-purple-700">Trending Ranking</p>
        <h2 className="text-3xl font-bold text-slate-900">Ranked by Real Voices</h2>
        <p className="text-sm text-slate-500">Explore curated lists people talk about the most right now.</p>
      </header>

      <div className="grid gap-6 lg:grid-cols-[1.1fr,0.9fr]">
        <Link
          href="/k-ranking"
          className="group relative overflow-hidden rounded-3xl bg-slate-900 text-white shadow-2xl"
        >
          <Image
            src={trendingBanner.image}
            alt={trendingBanner.title}
            width={1000}
            height={700}
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" aria-hidden />
          <div className="absolute bottom-0 left-0 right-0 flex flex-col gap-3 p-6 md:p-8">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-purple-200">TRENDING RANKING</p>
            <h3 className="text-2xl font-semibold md:text-3xl">{trendingBanner.title}</h3>
            <p className="max-w-2xl text-sm text-slate-100">{trendingBanner.description}</p>
            <div className="mt-2 flex flex-wrap gap-3 text-xs text-slate-200">
              <span className="rounded-full bg-white/10 px-3 py-1">Exterior design</span>
              <span className="rounded-full bg-white/10 px-3 py-1">Performance</span>
              <span className="rounded-full bg-white/10 px-3 py-1">AP system</span>
              <span className="rounded-full bg-white/10 px-3 py-1">Hardware</span>
            </div>
          </div>
        </Link>

        <div className="flex flex-col gap-4">
          {trendingCards.map((card, index) => (
            <Link
              key={`${card.title}-${index}`}
              href="/k-ranking"
              className="group flex gap-4 rounded-3xl bg-white p-4 shadow-lg ring-1 ring-slate-100 transition hover:-translate-y-1"
            >
              <div className="relative h-28 w-28 overflow-hidden rounded-2xl bg-slate-100">
                <Image src={card.image} alt={card.title} fill className="object-cover" sizes="112px" />
              </div>
              <div className="flex flex-1 flex-col justify-between gap-2">
                <div className="space-y-1">
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-purple-600">{card.category}</p>
                  <h3 className="text-lg font-semibold text-slate-900">{card.title}</h3>
                  <p className="text-sm text-slate-500">The top products everyone is watching this week.</p>
                </div>
                <div className="flex items-center gap-3 text-xs text-slate-500">
                  <span className="rounded-full bg-purple-50 px-3 py-1 font-medium text-purple-700">Feature</span>
                  <span className="rounded-full bg-purple-50 px-3 py-1 font-medium text-purple-700">Latest</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
