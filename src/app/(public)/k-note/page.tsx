import { Suspense } from 'react';
import { headers } from 'next/headers';
import CategoryFilterRow from '@/components/k-note/CategoryFilterRow';
import KNoteCard, { type KNoteCardData } from '@/components/k-note/KNoteCard';

interface KNotePageProps {
  searchParams?: { [key: string]: string | string[] | undefined };
}

async function fetchKNotes(baseUrl: string, category?: string): Promise<KNoteCardData[]> {
  const url = new URL('/api/k-notes', baseUrl);

  if (category && category !== 'All') {
    url.searchParams.set('category', category);
  }

  try {
    const response = await fetch(url.toString(), {
      cache: 'no-store'
    });

    if (!response.ok) {
      return [];
    }

    const data = await response.json();
    return Array.isArray(data) ? data : [];
  } catch (error) {
    console.error('Failed to fetch K-Notes', error);
    return [];
  }
}

function KNoteGridSkeleton() {
  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {Array.from({ length: 6 }).map((_, index) => (
        <div key={index} className="card h-full animate-pulse space-y-4">
          <div className="h-44 w-full rounded-2xl bg-slate-200" />
          <div className="flex items-center justify-between text-xs text-slate-400">
            <div className="h-6 w-20 rounded-full bg-slate-200" />
            <div className="h-4 w-16 rounded-full bg-slate-200" />
          </div>
          <div className="space-y-3">
            <div className="h-6 w-3/4 rounded-full bg-slate-200" />
            <div className="h-4 w-full rounded-full bg-slate-200" />
            <div className="h-4 w-5/6 rounded-full bg-slate-200" />
          </div>
          <div className="flex flex-wrap gap-2">
            <div className="h-6 w-16 rounded-full bg-slate-200" />
            <div className="h-6 w-14 rounded-full bg-slate-200" />
            <div className="h-6 w-12 rounded-full bg-slate-200" />
          </div>
          <div className="flex items-center justify-between pt-2">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-full bg-slate-200" />
              <div className="space-y-2">
                <div className="h-4 w-24 rounded-full bg-slate-200" />
                <div className="h-3 w-16 rounded-full bg-slate-200" />
              </div>
            </div>
            <div className="flex gap-4 text-xs text-slate-400">
              <div className="h-4 w-12 rounded-full bg-slate-200" />
              <div className="h-4 w-10 rounded-full bg-slate-200" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

async function KNotesGrid({
  baseUrl,
  category
}: {
  baseUrl: string;
  category?: string;
}) {
  const kNotes = await fetchKNotes(baseUrl, category);

  if (kNotes.length === 0) {
    return (
      <div className="card border-dashed border-slate-200 text-center">
        <p className="text-lg font-semibold text-slate-900">No K-Notes found</p>
        <p className="text-sm text-muted-foreground">
          Try switching categories or check back soon for more community notes.
        </p>
      </div>
    );
  }

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {kNotes.map((note) => (
        <KNoteCard key={note.id} knote={note} />
      ))}
    </div>
  );
}

export default async function KNotePage({ searchParams }: KNotePageProps) {
  const host = headers().get('host');
  const protocol = host?.includes('localhost') ? 'http' : 'https';
  const baseUrl = process.env.NEXTAUTH_URL || `${protocol}://${host}`;

  const categoryParam = typeof searchParams?.category === 'string' ? searchParams.category : undefined;

  return (
    <div className="min-h-screen bg-slate-50">
      <section className="container-page gap-12 pb-16">
        <div className="mx-auto max-w-3xl space-y-4 text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-brand-600">K-Notes</p>
          <h1 className="text-3xl font-bold leading-tight text-slate-900 md:text-4xl lg:text-5xl">
            Speak a little truth, leave a small trace.
          </h1>
          <p className="text-base text-muted-foreground md:text-lg">
            A share in this moment might be the light for someone else&apos;s decision. Browse real experiences by category and find
            insights that resonate.
          </p>
        </div>

        <div className="space-y-6">
          <CategoryFilterRow selectedCategory={categoryParam} />
          <Suspense fallback={<KNoteGridSkeleton />}>
            <KNotesGrid baseUrl={baseUrl} category={categoryParam} />
          </Suspense>
        </div>
      </section>
    </div>
  );
}
