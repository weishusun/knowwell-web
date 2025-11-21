import Image from 'next/image';
import Link from 'next/link';

export type Note = {
  id: string | number;
  title: string;
  content?: string;
  coverUrl?: string;
  author?: { name?: string } | null;
  reviews?: Array<unknown> | null;
};

type LatestReviewsListProps = {
  notes: Note[];
};

export function LatestReviewsList({ notes }: LatestReviewsListProps) {
  return (
    <section className="mx-auto w-full max-w-6xl px-4 lg:px-0">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-purple-700">Latest Ranking</p>
          <h2 className="text-3xl font-bold text-slate-900">Ranked and reviewed</h2>
          <p className="text-sm text-slate-500">Fresh K-Notes from the community.</p>
        </div>
        <Link
          href="/k-ranking"
          className="hidden rounded-full border border-purple-200 px-5 py-2 text-sm font-semibold text-purple-700 transition hover:bg-purple-50 lg:inline-flex"
        >
          View all
        </Link>
      </div>

      <div className="space-y-4">
        {notes.length === 0 && (
          <div className="rounded-3xl bg-white p-8 text-center text-slate-500 shadow-lg ring-1 ring-slate-100">
            No K-Notes yet. Be the first to publish!
          </div>
        )}

        {notes.map((note) => (
          <Link
            key={note.id}
            href={`/notes/${note.id}`}
            className="group flex flex-col gap-4 rounded-3xl bg-white p-4 shadow-lg ring-1 ring-slate-100 transition hover:-translate-y-1 md:flex-row"
          >
            <div className="relative h-56 w-full overflow-hidden rounded-2xl bg-gradient-to-br from-purple-50 to-pink-50 md:h-36 md:w-40">
              {note.coverUrl ? (
                <Image src={note.coverUrl} alt={note.title} fill className="object-cover" sizes="(max-width: 768px) 100vw, 160px" />
              ) : (
                <div className="flex h-full items-center justify-center text-sm font-medium text-purple-600">Cover coming soon</div>
              )}
            </div>
            <div className="flex flex-1 flex-col justify-between gap-2">
              <div className="space-y-1">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-purple-600">Review & Ranking</p>
                <h3 className="text-xl font-semibold text-slate-900">{note.title}</h3>
                {note.content && <p className="line-clamp-2 text-sm text-slate-600">{note.content}</p>}
              </div>
              <div className="flex items-center justify-between text-xs text-slate-500">
                <span>by {note.author?.name ?? 'Anonymous'}</span>
                <span className="rounded-full bg-purple-50 px-3 py-1 font-semibold text-purple-700">
                  {note.reviews?.length ?? 0} reviews
                </span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
