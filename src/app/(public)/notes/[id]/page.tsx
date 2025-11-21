import Image from 'next/image';
import { notFound } from 'next/navigation';
import { ReviewForm } from '@/components/review-form';

async function getNote(id: string) {
  const res = await fetch(`${process.env.NEXTAUTH_URL ?? ''}/api/notes/${id}`, { cache: 'no-store' });
  if (!res.ok) return null;
  return res.json();
}

export default async function NoteDetailPage({ params }: { params: { id: string } }) {
  const note = await getNote(params.id);
  if (!note) return notFound();

  return (
    <div className="container-page max-w-5xl">
      <div className="grid gap-8 lg:grid-cols-[1.2fr,0.8fr]">
        <article className="space-y-6">
          <div className="space-y-2">
            <p className="text-sm font-semibold uppercase tracking-[0.15em] text-brand-600">K-Note</p>
            <h1 className="text-3xl font-bold text-slate-900">{note.title}</h1>
            <p className="text-sm text-slate-500">by {note.author?.name ?? 'Anonymous'}</p>
          </div>

          {note.coverUrl && (
            <div className="relative h-80 overflow-hidden rounded-3xl bg-slate-100 shadow-card">
              <Image src={note.coverUrl} alt={note.title} fill className="object-cover" />
            </div>
          )}

          <div className="space-y-4 rounded-3xl bg-white p-6 shadow-card">
            <p className="text-base leading-7 text-slate-700 whitespace-pre-line">{note.content}</p>
            {note.tags?.length > 0 && (
              <div className="flex flex-wrap gap-2 text-xs font-medium text-brand-700">
                {note.tags.map((tag: string) => (
                  <span key={tag} className="rounded-full bg-brand-50 px-3 py-1">
                    #{tag}
                  </span>
                ))}
              </div>
            )}
          </div>
        </article>

        <aside className="space-y-4">
          <ReviewForm noteId={note.id} />
          <div className="space-y-3 rounded-3xl border border-slate-100 bg-white p-4 shadow-card">
            <h3 className="text-base font-semibold text-slate-800">What people are saying</h3>
            {note.reviews?.length === 0 && <p className="text-sm text-slate-500">No reviews yet.</p>}
            <div className="space-y-3">
              {note.reviews?.map((review: any) => (
                <div key={review.id} className="rounded-2xl border border-slate-100 bg-slate-50 p-3">
                  <div className="flex items-center justify-between text-xs text-slate-500">
                    <span>{review.author?.name ?? 'Reader'}</span>
                    <span>{'★'.repeat(review.rating)}</span>
                  </div>
                  <p className="text-sm text-slate-700">{review.body}</p>
                </div>
              ))}
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
