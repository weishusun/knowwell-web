import Image from 'next/image';
import { notFound } from 'next/navigation';
import { headers } from 'next/headers';

interface KNoteDetailProps {
  params: { id: string };
}

interface KNoteResponse {
  id: string;
  title: string;
  summary?: string | null;
  content?: string | null;
  category?: string | null;
  tags?: string[] | null;
  coverImageUrl?: string | null;
  createdAt?: string | Date | null;
  author?: {
    id?: string;
    name?: string | null;
    image?: string | null;
  } | null;
  likes?: number | null;
  views?: number | null;
}

async function fetchKNote(baseUrl: string, id: string): Promise<KNoteResponse | null> {
  if (!baseUrl) return null;

  const response = await fetch(`${baseUrl}/api/k-notes/${id}`, { cache: 'no-store' });

  if (response.status === 404) return null;
  if (!response.ok) return null;

  const data = await response.json();
  return data?.data ?? data;
}

export default async function KNoteDetailPage({ params }: KNoteDetailProps) {
  const host = headers().get('host');
  const protocol = host?.includes('localhost') ? 'http' : 'https';
  const baseUrl = process.env.NEXTAUTH_URL || (host ? `${protocol}://${host}` : '');
  const kNote = await fetchKNote(baseUrl, params.id);

  if (!kNote) {
    notFound();
  }

  const createdAtDate = kNote.createdAt ? new Date(kNote.createdAt) : null;
  const formattedDate = createdAtDate && !Number.isNaN(createdAtDate.getTime())
    ? createdAtDate.toLocaleDateString('zh-CN')
    : null;
  const tags = Array.isArray(kNote.tags) ? kNote.tags : [];

  const authorInitial = kNote.author?.name?.[0]?.toUpperCase() ?? 'K';

  return (
    <article className="space-y-8 pb-16">
      {kNote.coverImageUrl ? (
        <div className="relative h-80 w-full overflow-hidden rounded-3xl bg-slate-100">
          <Image src={kNote.coverImageUrl} alt={kNote.title} fill className="object-cover" priority />
        </div>
      ) : null}

      <div className="space-y-4">
        <div className="flex flex-wrap items-center gap-3 text-sm text-gray-600">
          <span className="rounded-full bg-purple-50 px-3 py-1 text-purple-700">{kNote.category ?? 'General'}</span>
          {tags.map((tag: string) => (
              <span key={tag} className="rounded-full bg-gray-100 px-3 py-1 text-gray-700">
                #{tag}
              </span>
            ))}
        </div>
        <h1 className="text-3xl font-bold text-gray-900 md:text-4xl">{kNote.title}</h1>
        {kNote.summary ? <p className="text-lg text-gray-700">{kNote.summary}</p> : null}
        <div className="flex items-center gap-4 text-sm text-gray-600">
          {kNote.author?.image ? (
            <Image
              src={kNote.author.image}
              alt={kNote.author?.name ?? 'Author'}
              width={40}
              height={40}
              className="h-10 w-10 rounded-full object-cover"
            />
          ) : (
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-100 text-xs font-semibold text-slate-600">
              {authorInitial}
            </div>
          )}
          <div className="flex flex-col">
            <span className="font-semibold text-gray-900">{kNote.author?.name ?? 'Unknown author'}</span>
            {formattedDate ? <span>{formattedDate}</span> : null}
          </div>
          <div className="ml-auto flex items-center gap-4 text-xs text-gray-500">
            <span>👁️ {kNote.views ?? 0}</span>
            <span>❤️ {kNote.likes ?? 0}</span>
          </div>
        </div>
      </div>

      <div className="rounded-3xl bg-white p-6 shadow">
        {kNote.content ? (
          <pre className="whitespace-pre-wrap text-base leading-relaxed text-gray-800">{kNote.content}</pre>
        ) : (
          <p className="text-base leading-relaxed text-gray-600">No content provided yet.</p>
        )}
      </div>
    </article>
  );
}
