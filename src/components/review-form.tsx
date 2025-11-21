'use client';

import { FormEvent, useState } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export function ReviewForm({ noteId }: { noteId: string }) {
  const { data: session } = useSession();
  const router = useRouter();
  const [body, setBody] = useState('');
  const [rating, setRating] = useState(5);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  if (!session?.user) {
    return (
      <div className="rounded-2xl border border-slate-100 bg-slate-50 p-4 text-sm text-slate-600">
        Please{' '}
        <Link href="/login" className="text-brand-700">
          log in
        </Link>{' '}
        to share a review.
      </div>
    );
  }

  const onSubmit = async (event: FormEvent) => {
    event.preventDefault();
    setLoading(true);
    setError(null);

    const res = await fetch(`/api/notes/${noteId}/reviews`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ body, rating })
    });

    setLoading(false);

    if (!res.ok) {
      const data = await res.json();
      setError(data.error ?? 'Unable to submit review');
      return;
    }

    setBody('');
    setRating(5);
    router.refresh();
  };

  return (
    <form onSubmit={onSubmit} className="space-y-3 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
      <div className="flex items-center justify-between">
        <h3 className="text-base font-semibold text-slate-800">Write a review</h3>
        <select
          value={rating}
          onChange={(e) => setRating(Number(e.target.value))}
          className="w-24 rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm"
        >
          {[5, 4, 3, 2, 1].map((score) => (
            <option key={score} value={score}>
              {score} ★
            </option>
          ))}
        </select>
      </div>
      <textarea
        value={body}
        onChange={(e) => setBody(e.target.value)}
        rows={3}
        placeholder="How did this K-Note help you?"
        required
      />
      {error && <p className="text-sm text-red-600">{error}</p>}
      <button type="submit" className="btn-primary" disabled={loading}>
        {loading ? 'Sending...' : 'Submit review'}
      </button>
    </form>
  );
}
