import Image from 'next/image';
import Link from 'next/link';
import type { Note } from './latest-reviews-list';

type PopularNotesSectionProps = {
  notes: Note[];
};

const placeholderNotes: Note[] = [
  {
    id: 'placeholder-1',
    title: 'Galaxy phone review',
    content: 'A concise walkthrough of the newest flagship.',
    coverUrl: 'https://images.unsplash.com/photo-1510554310709-f54e7c77edcd?auto=format&fit=crop&w=900&q=80'
  },
  {
    id: 'placeholder-2',
    title: 'Premium hi-fi set',
    content: 'Experience immersive sound in any room.',
    coverUrl: 'https://images.unsplash.com/photo-1421757385745-409d2876cdab?auto=format&fit=crop&w=900&q=80'
  },
  {
    id: 'placeholder-3',
    title: 'Cozy living essentials',
    content: 'Everything you need to refresh your space.',
    coverUrl: 'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=900&q=80'
  },
  {
    id: 'placeholder-4',
    title: 'Winter skincare picks',
    content: 'Hydrating and glow-boosting favorites.',
    coverUrl: 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=900&q=80'
  }
];

export function PopularNotesSection({ notes }: PopularNotesSectionProps) {
  const popularNotes = notes.length > 0 ? notes.slice(0, 4) : placeholderNotes;

  return (
    <section className="mx-auto w-full max-w-6xl px-4 lg:px-0">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-purple-700">Popular Note</p>
          <h2 className="text-3xl font-bold text-slate-900">Featured picks</h2>
          <p className="text-sm text-slate-500">Highlights everyone is saving.</p>
        </div>
        <Link
          href="/k-note"
          className="hidden rounded-full border border-purple-200 px-5 py-2 text-sm font-semibold text-purple-700 transition hover:bg-purple-50 lg:inline-flex"
        >
          See more
        </Link>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {popularNotes.map((note) => {
          const isPlaceholder = typeof note.id === 'string' && note.id.startsWith('placeholder');
          const href = isPlaceholder ? '/k-note' : `/notes/${note.id}`;

          return (
            <Link
              key={note.id}
              href={href}
              className="group relative overflow-hidden rounded-3xl bg-white shadow-lg ring-1 ring-slate-100 transition hover:-translate-y-1"
            >
              <div className="relative h-52 w-full overflow-hidden rounded-3xl">
                {note.coverUrl ? (
                  <Image
                    src={note.coverUrl}
                    alt={note.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 320px"
                  />
                ) : (
                  <div className="flex h-full items-center justify-center bg-gradient-to-br from-purple-50 to-pink-50 text-sm font-medium text-purple-600">
                    Cover coming soon
                  </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-transparent to-black/50" aria-hidden />
              </div>
              <div className="absolute inset-x-0 bottom-0 p-4 text-white">
                <h3 className="text-lg font-semibold">{note.title}</h3>
                {note.content && <p className="mt-1 line-clamp-2 text-xs text-slate-100">{note.content}</p>}
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
