import Link from 'next/link';

const smartphoneBrands = ['Apple', 'Samsung', 'Google', 'OnePlus', 'Xiaomi', 'Oppo'];
const carBrands = ['BMW', 'Mercedes-Benz', 'Audi', 'Tesla', 'Hyundai', 'Kia'];
const computerBrands = ['Microsoft', 'Lenovo', 'HP', 'ASUS', 'Acer', 'Dell'];
const beautyBrands = ['Estée Lauder', 'Dior', 'Lancôme', 'Chanel', 'SK-II', 'Innisfree'];

function BrandGrid({ title, brands }: { title: string; brands: string[] }) {
  return (
    <section className="rounded-3xl border border-slate-200 bg-white/70 p-6 shadow-sm backdrop-blur">
      <div className="flex items-center justify-between gap-4 border-b border-slate-100 pb-4">
        <h2 className="text-xl font-semibold text-slate-900">{title}</h2>
        <span className="text-xs font-medium uppercase tracking-[0.2em] text-purple-600">Featured</span>
      </div>
      <div className="mt-5 flex flex-wrap gap-4 md:gap-6">
        {brands.map((brand) => (
          <Link
            key={brand}
            href="#"
            className="group flex h-24 w-24 items-center justify-center rounded-2xl bg-gradient-to-br from-slate-50 to-purple-50 text-center text-sm font-semibold text-slate-800 shadow-inner ring-1 ring-slate-100 transition hover:-translate-y-1 hover:shadow-lg"
          >
            <span className="flex h-16 w-16 items-center justify-center rounded-xl bg-white text-center text-xs font-semibold text-slate-900 ring-1 ring-purple-100">
              {brand}
            </span>
          </Link>
        ))}
      </div>
    </section>
  );
}

export default function BrandsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#f4f0ff] via-white to-white text-slate-900">
      <main className="container-page flex flex-col gap-10 pb-16 pt-8 md:gap-12 md:pt-12">
        <header className="relative overflow-hidden rounded-3xl border border-purple-100 bg-gradient-to-r from-purple-600 via-purple-500 to-indigo-500 px-6 py-10 text-white shadow-xl md:px-12 md:py-14">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(255,255,255,0.18),_transparent_35%),_radial-gradient(circle_at_bottom_right,_rgba(255,255,255,0.18),_transparent_35%)]" />
          <div className="relative z-10 max-w-3xl">
            <p className="text-sm font-semibold uppercase tracking-[0.25em] text-white/80">Smart Buy</p>
            <h1 className="mt-3 text-3xl font-bold leading-tight md:text-4xl">Discover brands by category</h1>
            <p className="mt-4 max-w-2xl text-base text-white/90 md:text-lg">
              Browse through curated brand collections for every interest. Tap a brand to explore reviews, deals, and community
              favorites.
            </p>
            <div className="mt-6 inline-flex items-center gap-2 rounded-full bg-white/15 px-4 py-2 text-sm font-medium text-white backdrop-blur">
              <span className="inline-block h-2 w-2 rounded-full bg-emerald-300" aria-hidden />
              Updated weekly with top picks from KnowWell
            </div>
          </div>
        </header>

        <div className="grid grid-cols-1 gap-6 md:gap-8">
          <BrandGrid title="Smartphones" brands={smartphoneBrands} />
          <BrandGrid title="Cars" brands={carBrands} />
          <BrandGrid title="Computer / Tablet" brands={computerBrands} />
          <BrandGrid title="Beauty & Skincare" brands={beautyBrands} />
        </div>
      </main>
    </div>
  );
}
