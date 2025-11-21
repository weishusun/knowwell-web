'use client';

import Image from 'next/image';
import { useMemo, useState } from 'react';

type RankingCategory = {
  name: string;
  description: string;
  image: string;
};

type RankingItem = {
  id: string;
  title: string;
  description: string;
  image: string;
  category: string;
};

const categories: RankingCategory[] = [
  {
    name: 'Education',
    description: 'Insights for lifelong learners and students.',
    image: 'https://images.unsplash.com/photo-1513258496099-48168024aec0?auto=format&fit=crop&w=900&q=80'
  },
  {
    name: 'Technology',
    description: 'Latest gadgets and innovations ranked by users.',
    image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=900&q=80'
  },
  {
    name: 'Fashion',
    description: 'Styles and brands defining the season.',
    image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=900&q=80'
  },
  {
    name: 'Lifestyle',
    description: 'Balance, wellness, and everyday inspiration.',
    image: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=900&q=80'
  },
  {
    name: 'Beauty & Skincare',
    description: 'Top routines and must-try products.',
    image: 'https://images.unsplash.com/photo-1506617420156-8e4536971650?auto=format&fit=crop&w=900&q=80'
  },
  {
    name: 'Family & Kids',
    description: 'Guides and picks for every stage of family life.',
    image: 'https://images.unsplash.com/photo-1511895426328-dc8714191300?auto=format&fit=crop&w=900&q=80'
  }
];

const latestRankings: RankingItem[] = [
  {
    id: '1',
    title: "2024's Most Beloved Learning Platforms",
    description: 'From micro-courses to full degrees, learners share where they thrive the most.',
    image: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=1600&q=80',
    category: 'Education'
  },
  {
    id: '2',
    title: 'AI Gadgets That Actually Make Life Easier',
    description: 'Community-tested devices that deliver real productivity boosts.',
    image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1600&q=80',
    category: 'Technology'
  },
  {
    id: '3',
    title: 'Clean Beauty Brands with Cult Followings',
    description: 'Products with transparent ingredients and rave reviews.',
    image: 'https://images.unsplash.com/photo-1506617420156-8e4536971650?auto=format&fit=crop&w=1600&q=80',
    category: 'Beauty & Skincare'
  },
  {
    id: '4',
    title: 'Family Travel Essentials for Stress-Free Trips',
    description: 'Packing lists and gear that parents swear by on the go.',
    image: 'https://images.unsplash.com/photo-1502904550040-7534597429ae?auto=format&fit=crop&w=1600&q=80',
    category: 'Family & Kids'
  }
];

const popularRankings: RankingItem[] = [
  {
    id: 'p1',
    title: 'Top Student-Friendly Laptops',
    description: 'Lightweight picks with long-lasting batteries and crystal displays.',
    image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=1200&q=80',
    category: 'Technology'
  },
  {
    id: 'p2',
    title: 'Weekend Self-Care Rituals',
    description: 'Little routines the community uses to reset and recharge.',
    image: 'https://images.unsplash.com/photo-1523419400524-fd0e4a58a6ca?auto=format&fit=crop&w=1200&q=80',
    category: 'Lifestyle'
  },
  {
    id: 'p3',
    title: 'Wardrobe Staples That Last',
    description: 'Timeless essentials paired with sustainable fabrics.',
    image: 'https://images.unsplash.com/photo-1445205170230-053b83016050?auto=format&fit=crop&w=1200&q=80',
    category: 'Fashion'
  }
];

const faqs = [
  {
    question: 'How are K-Ranking lists created?',
    answer:
      'Rankings come from verified community submissions and are regularly refreshed to reflect the most recent feedback.'
  },
  {
    question: 'Can I submit my own ranking?',
    answer: 'Yes. Sign in to share your list, and it will be reviewed before appearing on the page.'
  },
  {
    question: 'When will search be available?',
    answer: 'Search is coming soon. For now, explore categories or browse the latest and most popular rankings.'
  }
];

export default function KRankingPage() {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredRankings = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();
    if (!query) return latestRankings;
    return latestRankings.filter((item) => item.title.toLowerCase().includes(query));
  }, [searchQuery]);

  return (
    <div className="min-h-screen bg-slate-50">
      <section className="relative isolate overflow-hidden bg-slate-900 text-white">
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1489515217757-5fd1be406fef?auto=format&fit=crop&w=1920&q=80"
            alt="K-Ranking hero background"
            fill
            className="object-cover"
            priority
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/60 to-slate-950/80" />
        </div>
        <div className="container-page relative z-10 items-center text-center text-white">
          <div className="mx-auto flex max-w-3xl flex-col gap-5 py-16 md:py-24">
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-brand-200">K-Ranking</p>
            <h1 className="text-3xl font-bold leading-tight md:text-4xl lg:text-5xl">Ranked by Real Voices</h1>
            <p className="text-base text-slate-100 md:text-lg">
              Discover authentic rankings crafted by our community. Search across categories and see what people trust most.
            </p>
            <div className="mx-auto flex w-full max-w-2xl items-center gap-3 rounded-full bg-white/10 p-[6px] backdrop-blur">
              <input
                type="search"
                placeholder="Search rankings... (coming soon)"
                value={searchQuery}
                onChange={(event) => setSearchQuery(event.target.value)}
                className="w-full rounded-full border border-white/20 bg-white/10 px-4 py-3 text-sm text-white placeholder:text-slate-200 focus:border-brand-300 focus:bg-white/20 focus:outline-none"
              />
              <button className="btn-primary px-5 py-3 text-sm font-semibold">Search</button>
            </div>
          </div>
        </div>
      </section>

      <section className="container-page">
        <div className="flex items-center justify-between gap-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-brand-600">Categories</p>
            <h2 className="text-2xl font-bold text-slate-900">Browse by interest</h2>
          </div>
          <p className="hidden text-sm text-slate-500 md:block">Tap a category to see curated rankings from the community.</p>
        </div>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
          {categories.map((category) => (
            <div
              key={category.name}
              className="group relative overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-card transition hover:-translate-y-1 hover:shadow-xl"
            >
              <div className="relative h-36 w-full overflow-hidden">
                <Image
                  src={category.image}
                  alt={category.name}
                  fill
                  className="object-cover transition duration-500 group-hover:scale-105"
                  sizes="(min-width: 1280px) 200px, (min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
              </div>
              <div className="flex flex-col gap-2 px-4 py-4">
                <h3 className="text-lg font-semibold text-slate-900">{category.name}</h3>
                <p className="text-xs text-slate-600 line-clamp-2">{category.description}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="container-page">
        <div className="flex flex-col gap-2">
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-brand-600">Latest Rankings</p>
          <h2 className="text-2xl font-bold text-slate-900">Fresh from the community</h2>
          <p className="text-sm text-slate-600">Updated regularly with new perspectives and transparent feedback.</p>
        </div>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {filteredRankings.map((ranking) => (
            <article
              key={ranking.id}
              className="group overflow-hidden rounded-3xl border border-slate-100 bg-white shadow-card transition hover:-translate-y-1 hover:shadow-xl"
            >
              <div className="relative h-60 w-full overflow-hidden sm:h-72">
                <Image
                  src={ranking.image}
                  alt={ranking.title}
                  fill
                  className="object-cover transition duration-500 group-hover:scale-105"
                  sizes="(min-width: 1024px) 50vw, 100vw"
                />
              </div>
              <div className="space-y-3 p-6">
                <div className="inline-flex rounded-full bg-brand-50 px-3 py-1 text-xs font-semibold text-brand-700">
                  {ranking.category}
                </div>
                <h3 className="text-xl font-semibold text-slate-900">{ranking.title}</h3>
                <p className="text-sm text-slate-600">{ranking.description}</p>
                <div className="text-sm font-semibold text-brand-700">Read ranking &rarr;</div>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="container-page">
        <div className="flex items-center justify-between gap-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-brand-600">Popular Ranking</p>
            <h2 className="text-2xl font-bold text-slate-900">What people are loving</h2>
          </div>
          <p className="hidden text-sm text-slate-500 md:block">Handpicked highlights getting the most attention right now.</p>
        </div>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {popularRankings.map((ranking) => (
            <article
              key={ranking.id}
              className="flex flex-col overflow-hidden rounded-3xl border border-slate-100 bg-white shadow-card transition hover:-translate-y-1 hover:shadow-xl"
            >
              <div className="relative h-44 w-full overflow-hidden">
                <Image
                  src={ranking.image}
                  alt={ranking.title}
                  fill
                  className="object-cover transition duration-500 hover:scale-105"
                  sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
                />
              </div>
              <div className="flex flex-1 flex-col gap-3 p-6">
                <div className="inline-flex w-fit rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-700">
                  {ranking.category}
                </div>
                <h3 className="text-lg font-semibold text-slate-900">{ranking.title}</h3>
                <p className="text-sm text-slate-600">{ranking.description}</p>
                <div className="mt-auto text-sm font-semibold text-brand-700">Explore list &rarr;</div>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="container-page pb-16">
        <div className="max-w-3xl space-y-4">
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-brand-600">Frequently Asked Questions</p>
          <h2 className="text-2xl font-bold text-slate-900">FAQ</h2>
          <p className="text-sm text-slate-600">
            Answers to the most common questions about how K-Ranking works and how to join the conversation.
          </p>
        </div>
        <div className="divide-y divide-slate-200 rounded-3xl border border-slate-200 bg-white shadow-card">
          {faqs.map((faq) => (
            <details key={faq.question} className="group">
              <summary className="flex cursor-pointer items-center justify-between gap-2 px-6 py-5 text-left text-base font-semibold text-slate-900 hover:bg-slate-50">
                {faq.question}
                <span className="text-xl text-slate-400 transition group-open:rotate-45">+</span>
              </summary>
              <div className="px-6 pb-6 text-sm text-slate-600">{faq.answer}</div>
            </details>
          ))}
        </div>
      </section>
    </div>
  );
}
