import Link from 'next/link';
import Image from 'next/image';
import { kRankingCategories } from './categoryData';

interface CategoryNavProps {
  activeSlug?: string;
}

export function CategoryNav({ activeSlug }: CategoryNavProps) {
  return (
    <section className="mx-auto w-full max-w-6xl px-4 md:px-8">
      <h2 className="text-lg font-semibold uppercase tracking-[0.2em] text-slate-600">All Rankings</h2>
      <div className="mt-4 flex gap-4 overflow-x-auto pb-3">
        {kRankingCategories.map((category) => {
          const isActive = category.slug === activeSlug;
          return (
            <Link
              key={category.slug}
              href={category.path}
              className={`group flex w-36 min-w-[144px] flex-col items-center gap-2 rounded-2xl border bg-white p-4 text-center shadow-sm transition hover:-translate-y-1 hover:shadow-md ${
                isActive ? 'border-brand-500 ring-2 ring-brand-200' : 'border-slate-200'
              }`}
            >
              <div className="relative h-14 w-14 overflow-hidden rounded-full bg-slate-100">
                <Image src={category.image} alt={category.label} fill className="object-cover" sizes="56px" />
                <div className="absolute inset-0 flex items-center justify-center bg-black/40 text-xl text-white opacity-0 transition group-hover:opacity-100">
                  {category.icon}
                </div>
              </div>
              <div className="flex flex-col items-center gap-1">
                <span className="text-xl">{category.icon}</span>
                <p className={`text-sm font-semibold leading-snug ${isActive ? 'text-brand-700' : 'text-slate-800'}`}>
                  {category.label}
                </p>
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
