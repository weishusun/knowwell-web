'use client';

import { FormEvent, useMemo, useState } from 'react';
import Link from 'next/link';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

const highlights = ['Value', 'Design', 'Display', 'Software', 'Camera', 'Performance', 'Battery'];
const painPoints = ['Camera', 'Battery', 'Software', 'Performance', 'Price', 'Support', 'Accessories'];
const channels = ['Google', 'Facebook', 'Twitter', 'Email'];

export function ReviewFormCard({ noteId }: { noteId: string }) {
  const { data: session } = useSession();
  const router = useRouter();

  const [rating, setRating] = useState(5);
  const [selectedHighlights, setSelectedHighlights] = useState<string[]>([]);
  const [selectedPainPoints, setSelectedPainPoints] = useState<string[]>([]);
  const [reviewText, setReviewText] = useState('');
  const [purchaseSource, setPurchaseSource] = useState<'purchased' | 'other'>('purchased');
  const [brandRating, setBrandRating] = useState(4);
  const [recommendation, setRecommendation] = useState<'yes' | 'no' | 'maybe'>('yes');
  const [updatesOptIn, setUpdatesOptIn] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const toggleHighlight = (label: string, list: string[], setter: (v: string[]) => void, limit?: number) => {
    setter((prev) => {
      if (prev.includes(label)) {
        return prev.filter((item) => item !== label);
      }
      if (limit && prev.length >= limit) return prev;
      return [...prev, label];
    });
  };

  const starScale = useMemo(() => [1, 2, 3, 4, 5], []);

  const handleSubmitReview = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null);
    setLoading(true);

    console.log({ rating, selectedHighlights, selectedPainPoints, reviewText, purchaseSource, brandRating, recommendation, updatesOptIn });

    const res = await fetch(`/api/notes/${noteId}/reviews`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ body: reviewText, rating })
    });

    setLoading(false);

    if (!res.ok) {
      const data = await res.json();
      setError(data.error ?? 'Unable to submit review');
      return;
    }

    setReviewText('');
    setRating(5);
    setSelectedHighlights([]);
    setSelectedPainPoints([]);
    setPurchaseSource('purchased');
    setBrandRating(4);
    setRecommendation('yes');
    setUpdatesOptIn(false);
    router.refresh();
  };

  if (!session?.user) {
    return (
      <div className="rounded-3xl bg-white p-8 shadow-2xl ring-1 ring-slate-100">
        <div className="flex flex-col gap-4 text-center">
          <h2 className="text-2xl font-semibold text-slate-900">Please log in to continue</h2>
          <p className="text-sm text-slate-600">Sign in to share your detailed review and help others.</p>
          <div className="flex justify-center gap-3">
            <Link href="/login" className="rounded-full bg-brand-600 px-4 py-2 text-sm font-semibold text-white shadow-md transition hover:bg-brand-700">
              Go to login
            </Link>
            <Link href="/" className="rounded-full border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-700 transition hover:border-brand-200 hover:text-brand-800">
              Back home
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmitReview} className="rounded-3xl bg-white p-8 shadow-2xl ring-1 ring-slate-100">
      <div className="mb-8 space-y-2 text-center">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-600">Write your review</p>
        <h2 className="text-3xl font-bold text-slate-900">Your honest feedback helps others</h2>
        <p className="text-sm text-slate-600">Rate the product, highlight what you love, and tell us what could be better.</p>
      </div>

      <div className="space-y-8">
        <section className="space-y-3">
          <p className="text-sm font-semibold text-slate-800">Q1. Rate your experience</p>
          <div className="flex items-center gap-2">
            {starScale.map((value) => (
              <button
                key={value}
                type="button"
                onClick={() => setRating(value)}
                className={`flex h-12 w-12 items-center justify-center rounded-full border transition ${
                  value <= rating ? 'border-brand-200 bg-gradient-to-b from-brand-50 to-white text-amber-500' : 'border-slate-200 bg-white text-slate-300'
                } hover:border-brand-300`}
                aria-label={`Rate ${value} star`}
              >
                <span className="text-2xl">★</span>
              </button>
            ))}
            <span className="text-sm font-medium text-brand-700">{rating} / 5</span>
          </div>
        </section>

        <section className="space-y-3">
          <div className="flex flex-wrap items-center gap-2">
            <p className="text-sm font-semibold text-slate-800">Q2. What do you like the most?</p>
            <span className="text-xs text-slate-500">(Choose up to 3)</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {highlights.map((item) => {
              const active = selectedHighlights.includes(item);
              return (
                <button
                  key={item}
                  type="button"
                  onClick={() => toggleHighlight(item, selectedHighlights, setSelectedHighlights, 3)}
                  className={`rounded-full border px-4 py-2 text-sm font-medium transition ${
                    active ? 'border-brand-200 bg-brand-50 text-brand-800 shadow-sm' : 'border-slate-200 bg-white text-slate-700 hover:border-brand-200'
                  }`}
                >
                  {item}
                </button>
              );
            })}
          </div>
        </section>

        <section className="space-y-3">
          <p className="text-sm font-semibold text-slate-800">Q3. What disappointed you?</p>
          <div className="flex flex-wrap gap-2">
            {painPoints.map((item) => {
              const active = selectedPainPoints.includes(item);
              return (
                <button
                  key={item}
                  type="button"
                  onClick={() => toggleHighlight(item, selectedPainPoints, setSelectedPainPoints)}
                  className={`rounded-full border px-4 py-2 text-sm font-medium transition ${
                    active ? 'border-rose-200 bg-rose-50 text-rose-700 shadow-sm' : 'border-slate-200 bg-white text-slate-700 hover:border-rose-200'
                  }`}
                >
                  {item}
                </button>
              );
            })}
          </div>
        </section>

        <section className="space-y-3">
          <p className="text-sm font-semibold text-slate-800">Q4. Tell us more</p>
          <textarea
            value={reviewText}
            onChange={(event) => setReviewText(event.target.value)}
            rows={4}
            required
            placeholder="Write your review..."
            className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-800 shadow-inner focus:border-brand-300 focus:ring-2 focus:ring-brand-200"
          />
        </section>

        <section className="grid gap-6 md:grid-cols-2">
          <div className="space-y-3 rounded-2xl border border-slate-100 bg-slate-50/70 p-4">
            <p className="text-sm font-semibold text-slate-800">Where is this review from?</p>
            <div className="flex flex-col gap-2 text-sm text-slate-700">
              <label className="flex items-center gap-2">
                <input type="radio" name="source" value="purchased" checked={purchaseSource === 'purchased'} onChange={() => setPurchaseSource('purchased')} />
                I bought this product
              </label>
              <label className="flex items-center gap-2">
                <input type="radio" name="source" value="other" checked={purchaseSource === 'other'} onChange={() => setPurchaseSource('other')} />
                I tried it elsewhere / demo
              </label>
            </div>
          </div>

          <div className="space-y-3 rounded-2xl border border-slate-100 bg-slate-50/70 p-4">
            <p className="text-sm font-semibold text-slate-800">How do you feel about the brand?</p>
            <div className="flex items-center gap-3">
              <input
                type="range"
                min={1}
                max={5}
                value={brandRating}
                onChange={(event) => setBrandRating(Number(event.target.value))}
                className="w-full accent-brand-600"
              />
              <span className="w-12 text-center text-sm font-semibold text-brand-700">{brandRating}/5</span>
            </div>
            <p className="text-xs text-slate-500">Slide to rate overall brand satisfaction.</p>
          </div>
        </section>

        <section className="space-y-3">
          <p className="text-sm font-semibold text-slate-800">Would you recommend this product?</p>
          <div className="flex flex-wrap gap-3 text-sm text-slate-700">
            {['yes', 'maybe', 'no'].map((option) => (
              <label key={option} className={`flex items-center gap-2 rounded-full border px-4 py-2 transition ${
                recommendation === option ? 'border-brand-200 bg-brand-50 text-brand-800 shadow-sm' : 'border-slate-200 bg-white hover:border-brand-200'
              }`}>
                <input type="radio" name="recommend" value={option} checked={recommendation === option} onChange={() => setRecommendation(option as typeof recommendation)} />
                {option === 'yes' ? 'Yes, definitely' : option === 'maybe' ? 'Maybe' : 'No'}
              </label>
            ))}
          </div>
        </section>

        <section className="space-y-2 rounded-2xl border border-slate-100 bg-slate-50/70 p-4">
          <label className="flex items-start gap-3 text-sm text-slate-700">
            <input type="checkbox" checked={updatesOptIn} onChange={(event) => setUpdatesOptIn(event.target.checked)} className="mt-1" />
            <span>
              Keep me posted about new updates and responses.
              <span className="block text-xs text-slate-500">We respect your privacy and never share your email.</span>
            </span>
          </label>
        </section>

        {error && <p className="text-sm text-red-600">{error}</p>}

        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <button
            type="submit"
            disabled={loading}
            className="flex w-full items-center justify-center gap-2 rounded-full bg-brand-600 px-6 py-3 text-sm font-semibold text-white shadow-lg transition hover:bg-brand-700 disabled:opacity-60 lg:w-auto"
          >
            Submit your review
          </button>

          <div className="flex flex-wrap justify-center gap-3 text-sm font-semibold text-slate-700 lg:justify-end">
            {channels.map((channel) => (
              <button
                key={channel}
                type="button"
                className="flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 shadow-sm transition hover:border-brand-200 hover:text-brand-800"
              >
                <span className="h-6 w-6 rounded-full bg-slate-100" aria-hidden />
                {channel}
              </button>
            ))}
          </div>
        </div>
      </div>
    </form>
  );
}
