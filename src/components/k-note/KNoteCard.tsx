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
  views?: number | null;
  likes?: number | null;
};

export default function KNoteCard({ knote }: { knote: KNoteCardData }) {
  const formattedDate = new Date(knote.createdAt).toLocaleDateString();
  const tags = Array.isArray(knote.tags) ? knote.tags : [];

  return (
    <Link href={`/k-note/${knote.id}`} className="group block h-full">
      <article className="card flex h-full flex-col overflow-hidden">
        <div className="relative aspect-[16/9] w-full overflow-hidden rounded-2xl bg-slate-100">
          {knote.coverImageUrl ? (
            <Image
              src={knote.coverImageUrl}
              alt={knote.title}
              fill
              className="object-cover transition duration-300 group-hover:scale-105"
              sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
            />
          ) : (
            <div className="absolute inset-0 bg-gradient-to-br from-brand-100 via-white to-slate-100" />
          )}
        </div>

        <div className="flex h-full flex-col space-y-4 pt-5">
          <div className="flex items-center justify-between text-xs text-muted-foreground">
            <span className="rounded-full bg-brand-50 px-3 py-1 text-[11px] font-semibold text-brand-700">
              {knote.category || 'General'}
            </span>
            <span className="text-xs text-slate-500">{formattedDate}</span>
          </div>

          <div className="space-y-2">
            <h3 className="text-xl font-semibold leading-tight text-slate-900 transition group-hover:text-brand-700 line-clamp-2">
              {knote.title}
            </h3>
            {knote.summary ? (
              <p className="text-sm text-muted-foreground line-clamp-2">{knote.summary}</p>
            ) : null}
          </div>

          {tags.length > 0 ? (
            <div className="flex flex-wrap gap-2 text-xs font-semibold text-slate-600">
              {tags.map((tag) => (
                <span key={tag} className="rounded-full bg-slate-100 px-3 py-1">
                  #{tag}
                </span>
              ))}
            </div>
          ) : null}

          <div className="mt-auto flex items-center justify-between pt-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-3">
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

            <div className="flex items-center gap-4 text-xs font-semibold text-slate-600">
              <span className="flex items-center gap-1">
                <span aria-hidden>👁️</span>
                {knote.views ?? 0}
              </span>
              <span className="flex items-center gap-1">
                <span aria-hidden>❤️</span>
                {knote.likes ?? 0}
              </span>
            </div>
          </div>
        </div>
      </article>
    </Link>
  );
}
