import Image from 'next/image';
import type { Metadata } from 'next';

const categoryConfigs = {
  travel: {
    slug: 'travel',
    heroTitle: 'Travel',
    heroSubtitle: 'Destinations, Hotels, Attractions',
    heroImage: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1600&q=80'
  },
  technology: {
    slug: 'technology',
    heroTitle: 'Technology',
    heroSubtitle: 'Smartphones, Tablets, Gadgets',
    heroImage: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=1600&q=80'
  },
  fashion: {
    slug: 'fashion',
    heroTitle: 'Fashion',
    heroSubtitle: 'Clothing, Sneakers, Accessories',
    heroImage: 'https://images.unsplash.com/photo-1445205170230-053b83016050?auto=format&fit=crop&w=1600&q=80'
  },
  lifestyle: {
    slug: 'lifestyle',
    heroTitle: 'Lifestyle',
    heroSubtitle: 'Food, Fitness, Wellness',
    heroImage: 'https://images.unsplash.com/photo-1518611012118-696072aa579a?auto=format&fit=crop&w=1600&q=80'
  },
  'family-kids': {
    slug: 'family-kids',
    heroTitle: 'Family & Kids',
    heroSubtitle: 'Baby Products, Parenting, Education Tools',
    heroImage: 'https://images.unsplash.com/photo-1504151932400-72d4384f04b3?auto=format&fit=crop&w=1600&q=80'
  }
} as const;

type CategoryKey = keyof typeof categoryConfigs;

type RankingItem = {
  title: string;
  description: string;
  image: string;
  tag: string;
};

type SectionCopy = {
  latest: RankingItem[];
  popular: RankingItem[];
};

const rankingCopy: Record<CategoryKey, SectionCopy> = {
  travel: {
    latest: [
      {
        title: 'This is the latest mobile Travel',
        description: 'Explore trending destinations, hotels, and attractions ranked by real travelers.',
        image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80',
        tag: 'Travel'
      },
      {
        title: 'This is the latest mobile Travel',
        description: 'Hidden gems and bucket-list stops making waves this season.',
        image: 'https://images.unsplash.com/photo-1526057565006-20beab8f84bb?auto=format&fit=crop&w=1200&q=80',
        tag: 'Travel'
      },
      {
        title: 'This is the latest mobile Travel',
        description: 'Community-loved stays and experiences across the globe.',
        image: 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1200&q=80',
        tag: 'Travel'
      }
    ],
    popular: [
      {
        title: 'This is the latest mobile Travel',
        description: 'Top scenic drives and getaway spots perfect for the weekend.',
        image: 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=900&q=80',
        tag: 'Travel'
      },
      {
        title: 'This is the latest mobile Travel',
        description: 'Traveler-favorite city breaks that never disappoint.',
        image: 'https://images.unsplash.com/photo-1504439904031-93ded9f93e3c?auto=format&fit=crop&w=900&q=80',
        tag: 'Travel'
      },
      {
        title: 'This is the latest mobile Travel',
        description: 'Epic coastal routes and beach escapes loved by families.',
        image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=900&q=80',
        tag: 'Travel'
      }
    ]
  },
  technology: {
    latest: [
      {
        title: 'This is the latest mobile Technology',
        description: 'New drops and flagship devices everyone is talking about.',
        image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1200&q=80',
        tag: 'Technology'
      },
      {
        title: 'This is the latest mobile Technology',
        description: 'Tablets, laptops, and gadgets redefining productivity.',
        image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=1200&q=80',
        tag: 'Technology'
      },
      {
        title: 'This is the latest mobile Technology',
        description: 'Smart devices earning rave reviews from the community.',
        image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=1200&q=80',
        tag: 'Technology'
      }
    ],
    popular: [
      {
        title: 'This is the latest mobile Technology',
        description: 'Phones and accessories dominating the charts.',
        image: 'https://images.unsplash.com/photo-1481277542470-605612bd2d61?auto=format&fit=crop&w=900&q=80',
        tag: 'Technology'
      },
      {
        title: 'This is the latest mobile Technology',
        description: 'Community picks for the most reliable devices.',
        image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=900&q=80',
        tag: 'Technology'
      },
      {
        title: 'This is the latest mobile Technology',
        description: 'Portable gear that keeps up with hybrid work.',
        image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=900&q=80',
        tag: 'Technology'
      }
    ]
  },
  fashion: {
    latest: [
      {
        title: 'This is the latest mobile Fashion',
        description: 'Runway-inspired looks translating to everyday style.',
        image: 'https://images.unsplash.com/photo-1445205170230-053b83016050?auto=format&fit=crop&w=1200&q=80',
        tag: 'Fashion'
      },
      {
        title: 'This is the latest mobile Fashion',
        description: 'Sneaker drops and accessory edits the community loves.',
        image: 'https://images.unsplash.com/photo-1445205170230-053b83016050?auto=format&fit=crop&w=1200&q=80',
        tag: 'Fashion'
      },
      {
        title: 'This is the latest mobile Fashion',
        description: 'Timeless pieces and statement outfits ranked together.',
        image: 'https://images.unsplash.com/photo-1542293779-8b5631d929d0?auto=format&fit=crop&w=1200&q=80',
        tag: 'Fashion'
      }
    ],
    popular: [
      {
        title: 'This is the latest mobile Fashion',
        description: 'Streetwear staples setting trends worldwide.',
        image: 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=900&q=80',
        tag: 'Fashion'
      },
      {
        title: 'This is the latest mobile Fashion',
        description: 'Curated edits of accessories that complete the look.',
        image: 'https://images.unsplash.com/photo-1445205170230-053b83016050?auto=format&fit=crop&w=900&q=80',
        tag: 'Fashion'
      },
      {
        title: 'This is the latest mobile Fashion',
        description: 'Designer picks and emerging labels to watch.',
        image: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=900&q=80',
        tag: 'Fashion'
      }
    ]
  },
  lifestyle: {
    latest: [
      {
        title: 'This is the latest mobile Lifestyle',
        description: 'Fresh wellness routines and daily habits people love.',
        image: 'https://images.unsplash.com/photo-1518611012118-696072aa579a?auto=format&fit=crop&w=1200&q=80',
        tag: 'Lifestyle'
      },
      {
        title: 'This is the latest mobile Lifestyle',
        description: 'Healthy recipes, fitness picks, and mindful living tips.',
        image: 'https://images.unsplash.com/photo-1452626038306-9aae5e071dd3?auto=format&fit=crop&w=1200&q=80',
        tag: 'Lifestyle'
      },
      {
        title: 'This is the latest mobile Lifestyle',
        description: 'Everyday essentials the community keeps coming back to.',
        image: 'https://images.unsplash.com/photo-1542992015-4a0b729b1385?auto=format&fit=crop&w=1200&q=80',
        tag: 'Lifestyle'
      }
    ],
    popular: [
      {
        title: 'This is the latest mobile Lifestyle',
        description: 'Top fitness gadgets and wellness must-haves.',
        image: 'https://images.unsplash.com/photo-1518611012118-696072aa579a?auto=format&fit=crop&w=900&q=80',
        tag: 'Lifestyle'
      },
      {
        title: 'This is the latest mobile Lifestyle',
        description: 'Kitchen tools and flavors inspiring better meals.',
        image: 'https://images.unsplash.com/photo-1458642849426-cfb724f15ef7?auto=format&fit=crop&w=900&q=80',
        tag: 'Lifestyle'
      },
      {
        title: 'This is the latest mobile Lifestyle',
        description: 'Cozy essentials for a calm, curated home.',
        image: 'https://images.unsplash.com/photo-1519710164239-da123dc03ef4?auto=format&fit=crop&w=900&q=80',
        tag: 'Lifestyle'
      }
    ]
  },
  'family-kids': {
    latest: [
      {
        title: 'This is the latest mobile Family & Kids',
        description: 'Community-loved picks for babies, toddlers, and beyond.',
        image: 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1200&q=80',
        tag: 'Family & Kids'
      },
      {
        title: 'This is the latest mobile Family & Kids',
        description: 'Playtime favorites that spark learning and joy.',
        image: 'https://images.unsplash.com/photo-1458071103672-6e5b1f301f9c?auto=format&fit=crop&w=1200&q=80',
        tag: 'Family & Kids'
      },
      {
        title: 'This is the latest mobile Family & Kids',
        description: 'Travel and home essentials parents rely on.',
        image: 'https://images.unsplash.com/photo-1511895426328-dc8714191300?auto=format&fit=crop&w=1200&q=80',
        tag: 'Family & Kids'
      }
    ],
    popular: [
      {
        title: 'This is the latest mobile Family & Kids',
        description: 'Strollers, carriers, and gear praised by parents.',
        image: 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=900&q=80',
        tag: 'Family & Kids'
      },
      {
        title: 'This is the latest mobile Family & Kids',
        description: 'Educational toys and books that make learning fun.',
        image: 'https://images.unsplash.com/photo-1458071103672-6e5b1f301f9c?auto=format&fit=crop&w=900&q=80',
        tag: 'Family & Kids'
      },
      {
        title: 'This is the latest mobile Family & Kids',
        description: 'Kid-friendly gadgets and household helpers.',
        image: 'https://images.unsplash.com/photo-1521056787327-165dc2a32817?auto=format&fit=crop&w=900&q=80',
        tag: 'Family & Kids'
      }
    ]
  }
};

const allCategories = [
  { label: 'Education', image: 'https://images.unsplash.com/photo-1513258496099-48168024aec0?auto=format&fit=crop&w=300&q=80' },
  { label: 'Travel', image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=300&q=80', slug: 'travel' },
  { label: 'Technology', image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=300&q=80', slug: 'technology' },
  { label: 'Fashion', image: 'https://images.unsplash.com/photo-1445205170230-053b83016050?auto=format&fit=crop&w=300&q=80', slug: 'fashion' },
  { label: 'Lifestyle', image: 'https://images.unsplash.com/photo-1518611012118-696072aa579a?auto=format&fit=crop&w=300&q=80', slug: 'lifestyle' },
  { label: 'Beauty & Skincare', image: 'https://images.unsplash.com/photo-1506617420156-8e4536971650?auto=format&fit=crop&w=300&q=80' },
  { label: 'Automobile', image: 'https://images.unsplash.com/photo-1503736334956-4c8f8e92946d?auto=format&fit=crop&w=300&q=80' },
  { label: 'Family & Kids', image: 'https://images.unsplash.com/photo-1511895426328-dc8714191300?auto=format&fit=crop&w=300&q=80', slug: 'family-kids' }
];

export const metadata: Metadata = {
  title: 'K-Ranking Categories'
};

type PageProps = {
  params: { category: string };
};

export default function CategoryPage({ params }: PageProps) {
  const categoryKey = params.category.toLowerCase() as CategoryKey;
  const config = categoryConfigs[categoryKey];

  if (!config) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-50">
        <p className="text-lg font-semibold text-slate-700">Category not found.</p>
      </div>
    );
  }

  const { latest, popular } = rankingCopy[categoryKey];

  return (
    <div className="min-h-screen bg-white text-slate-900">
      <section className="relative isolate overflow-hidden bg-gradient-to-br from-brand-50 via-white to-brand-100">
        <div className="absolute inset-0">
          {config.heroImage ? (
            <Image
              src={config.heroImage}
              alt={`${config.heroTitle} background`}
              fill
              priority
              className="object-cover"
              sizes="100vw"
            />
          ) : (
            <div className="h-full w-full bg-gradient-to-br from-brand-100 via-white to-brand-50" />
          )}
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/40" />
        </div>
        <div className="relative mx-auto flex max-w-6xl flex-col items-center gap-3 px-4 py-20 text-center text-white md:px-8 md:py-28">
          <h1 className="text-3xl font-bold leading-tight md:text-4xl lg:text-5xl">{config.heroTitle}</h1>
          <p className="text-lg text-white/90">({config.heroSubtitle})</p>
        </div>
      </section>

      <section className="mx-auto w-full max-w-6xl px-4 py-10 md:px-8">
        <h2 className="text-lg font-semibold uppercase tracking-[0.2em] text-brand-600">All Rankings</h2>
        <div className="mt-4 flex gap-4 overflow-x-auto pb-2">
          {allCategories.map((item) => {
            const isActive = item.slug === config.slug;
            return (
              <div
                key={item.label}
                className={`flex w-40 min-w-[160px] flex-col gap-2 rounded-xl border bg-white p-3 shadow-sm transition ${
                  isActive ? 'border-brand-500 ring-2 ring-brand-200' : 'border-slate-100'
                }`}
              >
                <div className="relative h-24 w-full overflow-hidden rounded-lg bg-slate-100">
                  <Image
                    src={item.image}
                    alt={item.label}
                    fill
                    className="object-cover"
                    sizes="160px"
                  />
                </div>
                <p className={`text-sm font-semibold ${isActive ? 'text-brand-700' : 'text-slate-800'}`}>{item.label}</p>
              </div>
            );
          })}
        </div>
      </section>

      <section className="mx-auto w-full max-w-6xl px-4 md:px-8">
        <div className="flex items-center justify-between">
          <h3 className="text-2xl font-semibold">Latest Rankings</h3>
          <p className="text-sm text-slate-500">{config.heroTitle}</p>
        </div>
        <div className="mt-6 divide-y divide-slate-200">
          {latest.map((item, index) => (
            <div key={`${item.title}-${index}`} className="flex flex-col gap-4 py-6 md:flex-row md:items-center md:gap-6">
              <div className="relative h-32 w-full overflow-hidden rounded-2xl bg-slate-100 md:h-28 md:w-48">
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  className="object-cover"
                  sizes="(min-width: 768px) 200px, 100vw"
                />
              </div>
              <div className="flex flex-1 flex-col gap-2">
                <span className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">{item.tag}</span>
                <h4 className="text-lg font-semibold text-slate-900">{item.title}</h4>
                <p className="text-sm text-slate-600">{item.description}</p>
                <button className="w-fit text-sm font-semibold text-brand-600 hover:text-brand-700">More &gt;&gt;</button>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto w-full max-w-6xl px-4 pb-14 pt-10 md:px-8 md:pb-16">
        <div className="flex items-center justify-between">
          <h3 className="text-2xl font-semibold">Popular Ranking</h3>
          <p className="text-sm text-slate-500">{config.heroTitle}</p>
        </div>
        <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {popular.map((item, index) => (
            <div
              key={`${item.title}-${index}`}
              className="group overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
            >
              <div className="relative h-40 w-full overflow-hidden bg-slate-100">
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  className="object-cover transition duration-300 group-hover:scale-105"
                  sizes="(min-width: 1024px) 320px, (min-width: 640px) 50vw, 100vw"
                />
              </div>
              <div className="flex flex-col gap-2 px-4 py-4">
                <span className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">{item.tag}</span>
                <h4 className="text-base font-semibold text-slate-900">{item.title}</h4>
                <p className="text-sm text-slate-600">{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
