import Image from 'next/image';

export type LatestRankingItem = {
  title: string;
  description: string;
  image: string;
  tag: string;
  time?: string;
};

interface LatestRankingsProps {
  items: LatestRankingItem[];
  categoryLabel: string;
}

export function LatestRankings({ items, categoryLabel }: LatestRankingsProps) {
  return (
    <section className="mx-auto w-full max-w-6xl px-4 md:px-8">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-brand-600">Latest Rankings</p>
          <h3 className="text-2xl font-semibold text-slate-900">{categoryLabel}</h3>
        </div>
        <p className="hidden text-sm text-slate-500 md:block">KnowWell Ranking</p>
      </div>
      <div className="mt-6 space-y-6">
        {items.map((item, index) => (
          <article
            key={`${item.title}-${index}`}
            className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
          >
            <div className="grid gap-6 p-4 md:grid-cols-[340px,1fr] md:items-center md:p-6">
              <div className="relative h-56 w-full overflow-hidden rounded-2xl md:h-60">
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  className="object-cover transition duration-500"
                  sizes="(min-width: 1024px) 340px, 100vw"
                />
              </div>
              <div className="flex flex-col gap-3">
                <div className="flex items-center justify-between text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
                  <span>{item.tag}</span>
                  <span className="text-[11px] text-slate-400">{item.time ?? 'Updated now'}</span>
                </div>
                <h4 className="text-xl font-semibold text-slate-900">{item.title}</h4>
                <p className="text-sm text-slate-600">{item.description}</p>
                <button className="w-fit text-sm font-semibold text-brand-700 hover:text-brand-800">KnowWell Ranking</button>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
