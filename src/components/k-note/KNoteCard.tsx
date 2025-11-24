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
    id: string;
    name: string | null;
    image?: string | null;
  } | null;
  createdAt: string | Date;
  isPublished?: boolean | null;
};

export function KNoteCard({ knote }: { knote: KNoteCardData }) {
  return (
    <Link href={`/k-note/${knote.id}`} className="group block overflow-hidden rounded-3xl bg-white shadow transition hover:-translate-y-1">
      {knote.coverImageUrl ? (
        <div className="relative h-56 w-full">
          <Image
            src={knote.coverImageUrl}
            alt={knote.title}
            fill
            className="object-cover transition duration-300 group-hover:scale-105"
            sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
          />
        </div>
      ) : null}
      <div className="space-y-3 p-5">
        <div className="flex flex-wrap gap-2 text-xs font-medium text-purple-700">
          {knote.category ? (
            <span className="rounded-full bg-purple-50 px-3 py-1">{knote.category}</span>
          ) : (
            <span className="rounded-full bg-gray-100 px-3 py-1 text-gray-700">General</span>
          )}
          {Array.isArray(knote.tags) &&
            knote.tags.map((tag) => (
              <span key={tag} className="rounded-full bg-gray-100 px-3 py-1 text-gray-700">
                #{tag}
              </span>
            ))}
        </div>
        <div className="space-y-1">
          <h3 className="text-lg font-semibold text-gray-900 group-hover:text-purple-700">{knote.title}</h3>
          {knote.summary ? <p className="text-sm text-gray-600">{knote.summary}</p> : null}
        </div>
        <div className="flex items-center gap-3 text-sm text-gray-600">
          {knote.author?.image ? (
            <Image src={knote.author.image} alt={knote.author?.name ?? 'Author'} width={36} height={36} className="h-9 w-9 rounded-full object-cover" />
          ) : null}
          <div className="flex flex-col">
            <span className="font-medium text-gray-900">{knote.author?.name ?? 'Unknown author'}</span>
            <span className="text-xs text-gray-500">{new Date(knote.createdAt).toLocaleDateString()}</span>
          </div>
        </div>
      </div>
    </Link>
  );
}

export default KNoteCard;
