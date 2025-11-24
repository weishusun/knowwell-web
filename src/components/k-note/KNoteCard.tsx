import Image from 'next/image';
import Link from 'next/link';

export type KNoteCardData = {
  id: string;
  title: string;
  summary?: string | null;
  coverImageUrl?: string | null;
  category?: string | null;
  tags?: string[] | null;
  author?: {
    id?: string;
    name?: string | null;
    image?: string | null;
  } | null;
  createdAt: string | Date;
  isPublished?: boolean | null;
};

export function KNoteCard({ knote }: { knote: KNoteCardData }) {
  const formattedDate = new Date(knote.createdAt).toLocaleDateString();

  return (
    <Link
      href={`/k-note/${knote.id}`}
      className="group block overflow-hidden rounded-3xl border border-slate-100 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-md"
    >
      {knote.coverImageUrl ? (
        <div className="relative h-48 w-full overflow-hidden bg-slate-100">
          <Image
            src={knote.coverImageUrl}
            alt={knote.title}
            fill
            className="object-cover transition duration-300 group-hover:scale-105"
            sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
            priority={false}
          />
        </div>
      ) : (
        <div className="h-2 w-full bg-gradient-to-r from-purple-200 via-blue-200 to-teal-200" />
      )}

      <div className="space-y-4 p-6">
        <div className="flex flex-wrap gap-2 text-xs font-semibold text-purple-700">
          <span className="rounded-full bg-purple-50 px-3 py-1">{knote.category || 'General'}</span>
          {Array.isArray(knote.tags) &&
            knote.tags.map((tag) => (
              <span key={tag} className="rounded-full bg-slate-100 px-3 py-1 text-slate-700">
                #{tag}
              </span>
            ))}
        </div>

        <div className="space-y-2">
          <h3 className="text-lg font-semibold text-slate-900 transition group-hover:text-purple-700">{knote.title}</h3>
          {knote.summary ? <p className="text-sm text-slate-600">{knote.summary}</p> : null}
        </div>

        <div className="flex items-center gap-3 text-sm text-slate-600">
          {knote.author?.image ? (
            <Image
              src={knote.author.image}
              alt={knote.author?.name || 'Author'}
              width={40}
              height={40}
              className="h-10 w-10 rounded-full object-cover"
            />
          ) : (
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-100 text-xs font-semibold text-slate-600">
              {knote.author?.name?.[0]?.toUpperCase() ?? 'K'}
            </div>
          )}
          <div className="flex flex-col">
            <span className="font-semibold text-slate-900">{knote.author?.name ?? 'Unknown author'}</span>
            <span className="text-xs text-slate-500">{formattedDate}</span>
          </div>
        </div>
      </div>
    </Link>
  );
}

export default KNoteCard;
