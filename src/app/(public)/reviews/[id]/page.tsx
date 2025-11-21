import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Suspense } from 'react';
import { ReviewFormCard } from './review-form-card';

async function getNote(id: string) {
  const res = await fetch(`${process.env.NEXTAUTH_URL ?? ''}/api/notes/${id}`, { cache: 'no-store' });
  if (!res.ok) return null;
  return res.json();
}

export default async function ReviewPage({ params }: { params: { id: string } }) {
  const note = await getNote(params.id);
  if (!note) return notFound();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-purple-50 to-slate-100 py-12">
      <div className="container-page">
        <div className="mx-auto max-w-5xl space-y-6">
          <div className="flex flex-col gap-4 rounded-3xl bg-white/80 p-6 shadow-xl ring-1 ring-slate-100 backdrop-blur lg:flex-row lg:items-center lg:gap-6">
            <div className="relative h-28 w-full max-w-[140px] overflow-hidden rounded-2xl bg-slate-100 shadow-inner">
              {note.coverUrl ? (
                <Image src={note.coverUrl} alt={note.title} fill className="object-cover" sizes="160px" />
              ) : (
                <div className="flex h-full items-center justify-center text-sm text-slate-400">No image</div>
              )}
            </div>
            <div className="space-y-2">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-600">Product</p>
              <h1 className="text-2xl font-bold text-slate-900">{note.title}</h1>
              <p className="text-sm text-slate-600 line-clamp-2">{note.excerpt ?? 'Share your honest experience with this product.'}</p>
              <div className="flex gap-4 text-xs text-brand-700">
                <span className="rounded-full bg-brand-50 px-3 py-1">K-Note</span>
                <Link href={`/notes/${note.id}`} className="font-semibold hover:text-brand-800">
                  View note detail
                </Link>
              </div>
            </div>
          </div>

          <Suspense fallback={<div className="text-center text-slate-500">Loading form...</div>}>
            <ReviewFormCard noteId={note.id} />
          </Suspense>
        </div>
      </div>
    </div>
  );
}
