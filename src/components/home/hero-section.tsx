import Image from 'next/image';
import Link from 'next/link';

const heroCards = [
  {
    title: 'Smartphones',
    image:
      'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=900&q=80',
    href: '/k-ranking'
  },
  {
    title: 'Cars',
    image: 'https://images.unsplash.com/photo-1511919884226-d4e1bc9e5845?auto=format&fit=crop&w=900&q=80',
    href: '/k-ranking'
  },
  {
    title: 'Computer/Tablet',
    image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=900&q=80',
    href: '/k-ranking'
  },
  {
    title: 'Beauty & Skincare',
    image: 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=900&q=80',
    href: '/k-ranking'
  }
];

export function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-[#f7f3ff] via-white to-white pb-16 pt-8">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(124,58,237,0.25),transparent_35%),radial-gradient(circle_at_70%_0%,rgba(56,189,248,0.2),transparent_25%)]" aria-hidden />
      <div className="relative mx-auto flex w-full max-w-6xl flex-col gap-10 px-4 lg:px-0">
        <div className="flex flex-col items-center gap-6 text-center">
          <span className="rounded-full bg-white/80 px-4 py-2 text-sm font-semibold text-purple-700 shadow-sm">
            Ranked by real voices
          </span>
          <h1 className="max-w-3xl text-4xl font-bold leading-tight text-slate-900 md:text-5xl">
            Discover Better Product
          </h1>
          <p className="max-w-2xl text-base text-slate-600 md:text-lg">
            More review, more trust, better decision.
          </p>
          <form className="flex w-full max-w-3xl flex-col gap-3 rounded-full bg-white/80 p-2 shadow-lg backdrop-blur md:flex-row">
            <div className="relative flex-1">
              <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M15 15L21 21"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <circle cx="10" cy="10" r="6" stroke="currentColor" strokeWidth="2" />
                </svg>
              </span>
              <input
                type="search"
                placeholder="What product are you looking for?"
                className="h-full w-full rounded-full border border-transparent bg-transparent px-12 py-3 text-sm text-slate-900 placeholder:text-slate-400 focus:border-purple-400 focus:ring-0"
              />
            </div>
            <button
              type="submit"
              className="inline-flex items-center justify-center rounded-full bg-purple-600 px-6 py-3 text-sm font-semibold text-white shadow-lg transition hover:bg-purple-700"
            >
              Search
            </button>
          </form>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {heroCards.map((card) => (
            <Link
              key={card.title}
              href={card.href}
              className="group relative overflow-hidden rounded-3xl bg-white shadow-xl ring-1 ring-slate-100 transition hover:-translate-y-1"
            >
              <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-transparent to-black/30" aria-hidden />
              <Image src={card.image} alt={card.title} width={400} height={360} className="h-64 w-full object-cover" />
              <div className="absolute inset-0 flex items-end justify-between px-5 pb-5 text-white">
                <div>
                  <p className="text-sm font-medium tracking-wide">Choose your style</p>
                  <h3 className="text-xl font-semibold">{card.title}</h3>
                </div>
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-white/90 text-slate-900 shadow-lg transition group-hover:translate-x-1">
                  →
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
