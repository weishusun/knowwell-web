import Image from 'next/image';

export type PopularRankingItem = {
  title: string;
  description: string;
  image: string;
  tag: string;
};

interface PopularRankingProps {
  items: PopularRankingItem[];
  categoryLabel: string;
}

export function PopularRanking({ items, categoryLabel }: PopularRankingProps) {
  return (
    <section className="mx-auto w-full max-w-6xl px-4 pb-14 pt-10 md:px-8 md:pb-16">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-brand-600">Poplure Ranking</p>
          <h3 className="text-2xl font-semibold text-slate-900">{categoryLabel}</h3>
        </div>
        <p className="hidden text-sm text-slate-500 md:block">KnowWell Ranking</p>
      </div>
      <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {items.map((item, index) => (
          <div
            key={`${item.title}-${index}`}
            className="group overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
          >
            <div className="relative h-40 w-full overflow-hidden bg-slate-100">
              <Image
                src={item.image}
                alt={item.title}
                fill
                className="object-cover transition duration-300 group-hover:scale-105"
                sizes="(min-width: 1024px) 280px, (min-width: 640px) 50vw, 100vw"
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
      <div className="mt-6 flex items-center justify-center gap-2">
        {items.map((_, index) => (
          <span
            key={index}
            className={`h-2.5 w-2.5 rounded-full ${index === 0 ? 'bg-brand-600' : 'bg-slate-300'}`}
          />
        ))}
      </div>
    </section>
  );
}
