import Image from 'next/image';
import { notFound } from 'next/navigation';

type Review = {
  id: string;
  body: string;
  rating: number;
  createdAt?: string;
  author?: {
    name?: string | null;
    image?: string | null;
  } | null;
};

type Note = {
  id: string;
  title: string;
  content: string;
  coverUrl?: string | null;
  tags?: string[];
  createdAt?: string;
  author?: {
    name?: string | null;
    image?: string | null;
  } | null;
  reviews?: Review[];
};

const formatDate = (date?: string) => {
  if (!date) return '';
  return new Intl.DateTimeFormat('en', { month: 'short', day: 'numeric', year: 'numeric' }).format(new Date(date));
};

async function getNote(id: string) {
  const res = await fetch(`${process.env.NEXTAUTH_URL ?? ''}/api/notes/${id}`, { cache: 'no-store' });
  if (!res.ok) return null;
  return res.json();
}

const SidebarSection = ({ title, items, action }: { title: string; items: string[]; action?: string }) => (
  <div className="space-y-3 rounded-2xl border border-slate-100/70 bg-gradient-to-br from-white to-slate-50 p-4 shadow-sm">
    <div className="flex items-center justify-between text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
      <span>{title}</span>
      {action ? <a className="text-[11px] text-indigo-600 underline" href="#">{action}</a> : null}
    </div>
    <ul className="space-y-2 text-sm text-slate-700">
      {items.map((item) => (
        <li key={item} className="flex items-start gap-2">
          <span className="mt-1 h-2 w-2 rounded-full bg-indigo-500" />
          <a className="hover:text-indigo-700" href="#">
            {item}
          </a>
        </li>
      ))}
    </ul>
  </div>
);

const SentimentBar = ({ label, value, color }: { label: string; value: number; color: string }) => (
  <div className="space-y-2">
    <div className="flex items-center justify-between text-sm font-semibold text-slate-700">
      <span>{label}</span>
      <span>{value}%</span>
    </div>
    <div className="h-3 rounded-full bg-slate-100">
      <div className="h-full rounded-full" style={{ width: `${value}%`, backgroundColor: color }} />
    </div>
  </div>
);

const DonutChart = ({ label, value, accent }: { label: string; value: number; accent: string }) => (
  <div className="flex flex-col items-center gap-3 rounded-2xl border border-slate-100 bg-white p-4 shadow-sm">
    <div
      className="relative h-32 w-32 rounded-full"
      style={{
        background: `conic-gradient(${accent} 0 ${value}%, #ede9fe ${value}% 100%)`,
        boxShadow: 'inset 0 0 0 12px white',
      }}
    >
      <div className="absolute inset-1/4 rounded-full bg-white" />
      <div className="absolute inset-0 flex items-center justify-center text-lg font-bold text-slate-800">{value}%</div>
    </div>
    <p className="text-sm font-semibold text-slate-700">{label}</p>
  </div>
);

const AreaChart = () => (
  <div className="rounded-3xl border border-slate-100 bg-white p-4 shadow-sm">
    <div className="flex flex-wrap items-center gap-3 border-b border-slate-100 pb-4 text-sm font-semibold text-slate-700">
      <div className="rounded-full bg-indigo-100 px-3 py-1 text-indigo-700">All Market Segments</div>
      <div className="rounded-full border border-slate-200 px-3 py-1 text-slate-600">Time Period 6 Months</div>
      <div className="rounded-full border border-slate-200 px-3 py-1 text-slate-600">Total Sales by Vol.</div>
      <div className="rounded-full border border-slate-200 px-3 py-1 text-slate-600">Total Sales by Value</div>
    </div>
    <div className="mt-4 h-64 rounded-2xl bg-gradient-to-br from-indigo-50 via-white to-slate-50 p-4">
      <div className="flex h-full items-center justify-center rounded-xl border border-dashed border-slate-200 bg-white/70 text-sm text-slate-500">
        Area chart placeholder
      </div>
    </div>
  </div>
);

const RelatedProduct = ({ title, price }: { title: string; price: string }) => (
  <div className="flex items-center gap-3 rounded-xl border border-slate-100 bg-white p-3 shadow-sm">
    <div className="h-12 w-12 overflow-hidden rounded-lg bg-indigo-100">
      <Image src="https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=200&q=80" alt={title} width={48} height={48} className="h-full w-full object-cover" />
    </div>
    <div className="flex-1">
      <p className="text-sm font-semibold text-slate-800">{title}</p>
      <p className="text-xs text-slate-500">{price}</p>
    </div>
  </div>
);

export default async function NoteDetailPage({ params }: { params: { id: string } }) {
  const note: Note | null = await getNote(params.id);
  if (!note) return notFound();

  const sidebarReports = ['The Code Matrix', 'K-Report 2024', 'K-Leaders'];
  const sidebarInsights = ['Tech Trends 2024', 'Consumer Smart Device Trends Q3 2024', 'Sustainability: The Future of Everything'];
  const relatedProducts = [
    { title: 'Bronze Vector Mobile', price: '$499' },
    { title: 'White Marble Mobile', price: '$549' },
    { title: 'Blue Curved Mobile', price: '$599' },
    { title: 'Orange Ember Mobile', price: '$459' },
  ];

  const sentiments = [
    { label: 'Positive', value: 77, color: '#7c3aed' },
    { label: 'Negative', value: 14, color: '#f97316' },
    { label: 'Neutral', value: 8, color: '#a1a1aa' },
  ];

  const contentParagraphs = note.content?.split('\n').filter(Boolean).length
    ? note.content.split('\n').filter(Boolean)
    : [
        'The Vector mobile brings together elegance and performance in one sleek package. From its contoured edges to its vivid display, it embodies design-forward thinking tailored for everyday life.',
        'Powered by a next-generation processor, this device handles multitasking effortlessly while keeping battery life efficient. The intuitive interface and advanced camera system work together to deliver a premium experience.',
        'With seamless connectivity, robust security features, and thoughtful ergonomics, the Vector mobile sets a new standard for what a smartphone can be for modern professionals and trendsetters alike.',
      ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-indigo-50/40 to-white text-slate-900">
      <div className="mx-auto max-w-6xl px-4 py-10 lg:py-16">
        <h1 className="text-3xl font-extrabold uppercase tracking-[0.25em] text-slate-800 md:text-4xl">K-Note</h1>
        <p className="mt-2 text-sm text-slate-500">Published {formatDate(note.createdAt)}</p>
        <div className="mt-8 flex flex-col gap-6 lg:grid lg:grid-cols-[320px,1fr]">
          <aside className="space-y-5 rounded-3xl border border-slate-100 bg-white/80 p-5 shadow-[0_20px_80px_rgba(51,65,85,0.12)] backdrop-blur">
            <SidebarSection title="K-Report" items={sidebarReports} action="View Full Report >>" />
            <SidebarSection title="K-Insight" items={sidebarInsights} />
            <button className="w-full rounded-full bg-indigo-600 px-4 py-3 text-sm font-semibold uppercase tracking-wide text-white shadow-lg transition hover:bg-indigo-700">
              Write a Review
            </button>
            <div className="space-y-3 rounded-2xl border border-slate-100/70 bg-gradient-to-br from-indigo-50 to-white p-4 shadow-sm">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-600">Purchase</p>
              <div className="flex flex-wrap gap-3">
                <button className="flex-1 rounded-full bg-indigo-600 px-4 py-2 text-sm font-semibold text-white shadow hover:bg-indigo-700">
                  Vector Mobile 32GB
                </button>
                <button className="flex-1 rounded-full bg-indigo-600 px-4 py-2 text-sm font-semibold text-white shadow hover:bg-indigo-700">
                  Vector Mobile 16GB
                </button>
              </div>
            </div>
            <div className="space-y-4 rounded-2xl border border-slate-100 bg-white p-4 shadow-sm">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-600">Related Products</p>
              <div className="space-y-3">
                {relatedProducts.map((product) => (
                  <RelatedProduct key={product.title} title={product.title} price={product.price} />
                ))}
              </div>
            </div>
          </aside>

          <main className="space-y-6">
            <div className="overflow-hidden rounded-3xl border border-slate-100 bg-white shadow-[0_20px_80px_rgba(51,65,85,0.12)]">
              <div className="relative h-72 w-full bg-slate-100 md:h-96">
                {note.coverUrl ? (
                  <Image src={note.coverUrl} alt={note.title} fill className="object-cover" priority />
                ) : (
                  <Image
                    src="https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=1200&q=80"
                    alt="Vector Mobile"
                    fill
                    className="object-cover"
                    priority
                  />
                )}
              </div>
              <div className="space-y-4 p-6 md:p-8">
                <div className="space-y-2">
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">What&apos;s New</p>
                  <h2 className="text-2xl font-bold text-slate-900 md:text-3xl">{note.title}</h2>
                  <p className="text-sm text-slate-500">Zero G Everyday Wearable</p>
                </div>
                <div className="space-y-4 text-sm leading-relaxed text-slate-700 md:text-base">
                  {contentParagraphs.map((paragraph, index) => (
                    <p key={index}>{paragraph}</p>
                  ))}
                </div>
              </div>
            </div>

            <div className="space-y-4 rounded-3xl border border-slate-100 bg-white p-6 shadow-[0_20px_80px_rgba(51,65,85,0.1)] md:p-8">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">Analysis</p>
                  <h3 className="text-xl font-bold text-slate-900">Consumer Smart Device Trends: Q3 2024</h3>
                </div>
                <select className="rounded-full border border-slate-200 bg-white px-3 py-2 text-sm text-slate-700 shadow-sm">
                  <option>Time Period 6 Months</option>
                  <option>Last 3 Months</option>
                  <option>Last 12 Months</option>
                </select>
              </div>
              <div className="grid gap-6 lg:grid-cols-2 xl:grid-cols-[1.2fr,0.8fr]">
                <div className="space-y-4 rounded-2xl bg-indigo-50/60 p-4">
                  <p className="text-sm font-semibold uppercase tracking-[0.15em] text-indigo-800">Sentiment</p>
                  <div className="space-y-4">
                    {sentiments.map((item) => (
                      <SentimentBar key={item.label} label={item.label} value={item.value} color={item.color} />
                    ))}
                  </div>
                </div>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <DonutChart label="Positive Review" value={80} accent="#7c3aed" />
                  <DonutChart label="Negative Review" value={20} accent="#f97316" />
                </div>
              </div>
              <AreaChart />
            </div>

            <div className="space-y-4 rounded-3xl border border-slate-100 bg-white p-6 shadow-[0_20px_80px_rgba(51,65,85,0.12)] md:p-8">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">Shop</p>
                  <h3 className="text-xl font-bold text-slate-900">Shop Our Smartphones Collection</h3>
                </div>
                <a className="text-sm font-semibold text-indigo-600 hover:text-indigo-700" href="#">
                  View all
                </a>
              </div>
              <div className="grid gap-4 md:grid-cols-2">
                {[1, 2, 3, 4].map((item) => (
                  <div
                    key={item}
                    className="flex items-center gap-4 rounded-2xl border border-slate-100 bg-white p-4 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
                  >
                    <div className="relative h-20 w-20 overflow-hidden rounded-xl bg-indigo-100">
                      <Image
                        src={`https://images.unsplash.com/photo-1510557880182-3d4d3cba35a5?auto=format&fit=crop&w=300&q=80&sig=${item}`}
                        alt={`Smartphone ${item}`}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-semibold text-slate-800">Vector Mobile Variant {item}</p>
                      <p className="text-xs text-slate-500">Available now · Free shipping</p>
                    </div>
                    <span className="text-sm font-bold text-slate-900">${499 + item * 30}</span>
                  </div>
                ))}
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
