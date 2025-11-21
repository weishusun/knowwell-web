import Image from 'next/image';
import Link from 'next/link';

async function getNotes() {
  try {
    const res = await fetch(`${process.env.NEXTAUTH_URL ?? ''}/api/notes`, { cache: 'no-store' });
    if (!res.ok) return [];
    return res.json();
  } catch (error) {
    console.error('Failed to load notes', error);
    return [];
  }
}

export default async function HomePage() {
  const notes = await getNotes();

  const showcase = notes.slice(0, 3);

  return (
    <div className="container-page">
      <section className="grid gap-12 lg:grid-cols-[1.1fr,0.9fr] lg:items-center">
        <div className="flex flex-col gap-6">
          <div className="inline-flex max-w-max items-center gap-2 rounded-full bg-brand-50 px-4 py-2 text-sm font-medium text-brand-700">
            ✨ Fresh takes from trusted creators
          </div>
          <h1 className="text-4xl font-bold leading-tight text-slate-900 md:text-5xl">
            Share <span className="text-brand-600">K-Notes</span> and inspire better product decisions.
          </h1>
          <p className="max-w-2xl text-lg text-slate-600">
            KnowWell is the place where concise knowledge meets thoughtful feedback. Publish beautiful note cards and gather
            reviews from your peers in minutes.
          </p>
          <div className="flex flex-wrap items-center gap-4">
            <Link href="/notes/new" className="btn-primary text-base">
              Create a K-Note
            </Link>
            <Link href="/register" className="btn-secondary text-base">
              Join the community
            </Link>
          </div>
          <div className="mt-4 grid gap-4 md:grid-cols-3">
            {[1, 2, 3].map((item) => (
              <div key={item} className="card">
                <p className="text-sm font-semibold text-slate-800">Curated insights</p>
                <p className="text-sm text-slate-600">Beautiful note design that keeps readers engaged.</p>
              </div>
            ))}
          </div>
        </div>
        <div className="card shadow-card">
          <div className="relative h-80 overflow-hidden rounded-2xl bg-gradient-to-br from-brand-50 via-white to-slate-50">
            <Image
              src="https://images.unsplash.com/photo-1523475472560-d2df97ec485c"
              alt="Team collaborating"
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 40vw"
            />
          </div>
          <div className="mt-4 space-y-2">
            <h3 className="text-xl font-semibold text-slate-900">Designed for readability</h3>
            <p className="text-sm text-slate-600">
              Optimized layout built from the provided reference: hero, feature highlights, and content cards with clean spacing.
            </p>
          </div>
        </div>
      </section>

      <section className="flex flex-col gap-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-brand-600">Showcase</p>
            <h2 className="text-2xl font-bold text-slate-900">Latest K-Notes</h2>
            <p className="text-sm text-slate-600">Browse visual notes shared by the community.</p>
          </div>
          <Link href="/notes/new" className="btn-secondary">
            Write yours
          </Link>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {showcase.length === 0 && (
            <div className="col-span-full rounded-3xl border border-dashed border-slate-200 bg-white p-10 text-center text-slate-500">
              No K-Notes yet. Be the first to publish!
            </div>
          )}
          {showcase.map((note: any) => (
            <Link key={note.id} href={`/notes/${note.id}`} className="card flex h-full flex-col gap-3">
              {note.coverUrl ? (
                <div className="relative h-40 overflow-hidden rounded-2xl bg-slate-100">
                  <Image src={note.coverUrl} alt={note.title} fill className="object-cover" />
                </div>
              ) : (
                <div className="flex h-40 items-center justify-center rounded-2xl bg-brand-50 text-brand-700">
                  Cover coming soon
                </div>
              )}
              <div className="space-y-2">
                <h3 className="text-lg font-semibold text-slate-900">{note.title}</h3>
                <p className="line-clamp-3 text-sm text-slate-600">{note.content}</p>
              </div>
              <div className="flex items-center justify-between text-xs text-slate-500">
                <span>by {note.author?.name ?? 'Anonymous'}</span>
                <span>{note.reviews?.length ?? 0} reviews</span>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
