import Image from 'next/image';
import { notFound } from 'next/navigation';

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
  createdAt: string | Date;
  author?: {
    id: string;
    name: string | null;
    image?: string | null;
  } | null;
  likes?: number | null;
  views?: number | null;
}

async function fetchKNote(id: string): Promise<KNoteResponse | null> {
  const baseUrl = process.env.NEXTAUTH_URL || 'http://localhost:3000';
  const response = await fetch(`${baseUrl}/api/k-notes/${id}`, { cache: 'no-store' });

  if (response.status === 404) return null;
  if (!response.ok) throw new Error('Failed to fetch K-Note');

  return response.json();
}

export default async function KNoteDetailPage({ params }: KNoteDetailProps) {
  const kNote = await fetchKNote(params.id);

  if (!kNote) {
    notFound();
  }

  return (
    <article className="space-y-6 pb-16">
      {kNote.coverImageUrl ? (
        <div className="relative h-80 w-full overflow-hidden rounded-3xl">
          <Image src={kNote.coverImageUrl} alt={kNote.title} fill className="object-cover" priority />
        </div>
      ) : null}

      <div className="space-y-3">
        <div className="flex flex-wrap items-center gap-3 text-sm text-gray-600">
          <span className="rounded-full bg-purple-50 px-3 py-1 text-purple-700">{kNote.category ?? 'General'}</span>
          {Array.isArray(kNote.tags) &&
            kNote.tags.map((tag: string) => (
              <span key={tag} className="rounded-full bg-gray-100 px-3 py-1 text-gray-700">
                #{tag}
              </span>
            ))}
        </div>
        <h1 className="text-3xl font-bold text-gray-900 md:text-4xl">{kNote.title}</h1>
        {kNote.summary ? <p className="text-lg text-gray-700">{kNote.summary}</p> : null}
        <div className="flex items-center gap-4 text-sm text-gray-600">
          {kNote.author?.image ? (
            <Image src={kNote.author.image} alt={kNote.author?.name ?? 'Author'} width={40} height={40} className="h-10 w-10 rounded-full object-cover" />
          ) : null}
          <div className="flex flex-col">
            <span className="font-semibold text-gray-900">{kNote.author?.name ?? 'Unknown author'}</span>
            <span>{new Date(kNote.createdAt).toLocaleDateString()}</span>
          </div>
          <div className="ml-auto flex items-center gap-4 text-xs text-gray-500">
            <span>👁️ {kNote.views ?? 0}</span>
            <span>❤️ {kNote.likes ?? 0}</span>
          </div>
        </div>
      </div>

      <div className="rounded-3xl bg-white p-6 shadow">
        <pre className="whitespace-pre-wrap text-base leading-relaxed text-gray-800">{kNote.content ?? 'No content provided yet.'}</pre>
      </div>
    </article>
  );
}
