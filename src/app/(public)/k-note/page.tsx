import CategoryFilterRow from '@/components/k-note/CategoryFilterRow';
import { KNoteCard, type KNoteCardData } from '@/components/k-note/KNoteCard';

interface KNotePageProps {
  searchParams?: { [key: string]: string | string[] | undefined };
}

async function fetchKNotes(category?: string): Promise<KNoteCardData[]> {
  const baseUrl = process.env.NEXTAUTH_URL || 'http://localhost:3000';
  const url = new URL(`${baseUrl}/api/k-notes`);

  if (category) {
    url.searchParams.set('category', category);
  }

  const response = await fetch(url.toString(), { cache: 'no-store' });

  if (!response.ok) {
    console.error('Failed to fetch K-Notes');
    return [];
  }

  return response.json();
}

export default async function KNotePage({ searchParams }: KNotePageProps) {
  const categoryParam = typeof searchParams?.category === 'string' ? searchParams.category : undefined;
  const kNotes = await fetchKNotes(categoryParam);

  return (
    <section className="space-y-10 pb-16">
      <div className="space-y-3 text-center">
        <p className="text-sm font-semibold uppercase tracking-wide text-purple-600">K-Notes</p>
        <h1 className="text-3xl font-bold text-gray-900 md:text-4xl">Speak a little truth, leave a small trace.</h1>
        <p className="text-sm text-gray-600">A share in this moment might be the light for someone else&apos;s decision.</p>
      </div>

      <div className="space-y-4">
        <CategoryFilterRow selectedCategory={categoryParam} />
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {kNotes.length > 0 ? (
            kNotes.map((note) => <KNoteCard key={note.id} knote={note} />)
          ) : (
            <div className="col-span-full rounded-2xl border border-dashed border-gray-200 bg-white p-10 text-center shadow-sm">
              <p className="text-lg font-semibold text-gray-900">No K-Notes yet</p>
              <p className="text-sm text-gray-600">Be the first to share your insight and guide the community.</p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
