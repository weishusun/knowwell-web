import Image from 'next/image';
import Link from 'next/link';

const categories = [
  {
    name: 'Smartphones',
    icon: 'https://images.unsplash.com/photo-1618354691373-d851c5c3a990?auto=format&fit=crop&w=200&q=80'
  },
  {
    name: 'Cars',
    icon: 'https://images.unsplash.com/photo-1503736334956-4c8f8e92946d?auto=format&fit=crop&w=200&q=80'
  },
  {
    name: 'Computer/Tablet',
    icon: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=200&q=80'
  },
  {
    name: 'Camera',
    icon: 'https://images.unsplash.com/photo-1505751172876-fa1923c5c528?auto=format&fit=crop&w=200&q=80'
  },
  {
    name: 'Beauty & Skincare',
    icon: 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=200&q=80'
  }
];

export function CategoryIconsRow() {
  return (
    <section className="mx-auto w-full max-w-6xl px-4 lg:px-0">
      <div className="flex flex-col gap-6">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-slate-900">What are you looking for?</h2>
          <p className="text-sm text-slate-500">Browse quick categories to start your research.</p>
        </div>
        <div className="grid gap-4 rounded-3xl bg-white p-4 shadow-lg ring-1 ring-slate-100 md:grid-cols-5">
          {categories.map((category) => (
            <Link
              key={category.name}
              href="/k-ranking"
              className="group flex items-center gap-3 rounded-2xl px-3 py-4 transition hover:bg-purple-50"
            >
              <div className="relative h-12 w-12 overflow-hidden rounded-full bg-slate-100">
                <Image src={category.icon} alt={category.name} fill className="object-cover" sizes="48px" />
              </div>
              <div>
                <p className="text-sm font-semibold text-slate-900">{category.name}</p>
                <p className="text-xs text-slate-500">See more</p>
              </div>
              <span className="ml-auto text-slate-400 transition group-hover:translate-x-1 group-hover:text-purple-600">→</span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
