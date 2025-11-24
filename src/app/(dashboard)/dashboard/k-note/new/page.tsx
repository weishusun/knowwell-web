'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { useState } from 'react';

import KNoteForm, { type KNoteFormValues } from '@/components/k-note/KNoteForm';

export default function NewKNotePage() {
  const router = useRouter();
  const { data: session } = useSession();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (!session?.user) {
    return (
      <div className="min-h-screen bg-slate-100 px-4 py-10">
        <div className="container-page max-w-2xl">
          <div className="card space-y-4">
            <h1 className="text-2xl font-semibold text-slate-900">Create a K-Note</h1>
            <p className="text-sm text-slate-600">You need an account to publish K-Notes.</p>
            <div className="flex gap-3">
              <Link href="/login" className="btn-primary">
                Log in
              </Link>
              <Link href="/register" className="btn-secondary">
                Register
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const handleSubmit = async (values: KNoteFormValues) => {
    setLoading(true);
    setError(null);

    const response = await fetch('/api/k-notes', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        ...values,
        tags: values.tags
          .split(',')
          .map((tag) => tag.trim())
          .filter(Boolean)
      })
    });

    setLoading(false);

    if (!response.ok) {
      const data = await response.json();
      setError(data.error ?? 'Unable to create K-Note.');
      return;
    }

    const kNote = await response.json();
    router.push(`/k-note/${kNote.id}`);
  };

  return (
    <div className="min-h-screen bg-slate-100 px-4 py-10">
      <div className="mx-auto max-w-4xl">
        <KNoteForm onSubmit={handleSubmit} loading={loading} error={error} />
      </div>
    </div>
  );
}
