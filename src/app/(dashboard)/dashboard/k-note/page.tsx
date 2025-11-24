'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';

import { type KNoteCardData } from '@/components/k-note/KNoteCard';

export default function MyKNotesPage() {
  const router = useRouter();
  const { data: session } = useSession();
  const [kNotes, setKNotes] = useState<KNoteCardData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchKNotes = async () => {
      if (!session?.user?.id) return;
      setLoading(true);
      setError(null);

      const response = await fetch(`/api/k-notes?authorId=${session.user.id}`, { cache: 'no-store' });

      if (!response.ok) {
        const data = await response.json().catch(() => ({}));
        setError(data.error ?? 'Failed to load your K-Notes.');
        setLoading(false);
        return;
      }

      const notes = await response.json();
      setKNotes(notes);
      setLoading(false);
    };

    fetchKNotes();
  }, [session?.user?.id]);

  const handleDelete = async (id: string) => {
    const confirmed = window.confirm('Are you sure you want to delete this K-Note?');
    if (!confirmed) return;

    const response = await fetch(`/api/k-notes/${id}`, { method: 'DELETE' });
    if (!response.ok) {
      const data = await response.json().catch(() => ({}));
      setError(data.error ?? 'Unable to delete K-Note.');
      return;
    }

    setKNotes((prev) => prev.filter((note) => note.id !== id));
  };

  if (!session?.user) {
    return (
      <div className="min-h-screen bg-slate-100 px-4 py-10">
        <div className="container-page max-w-2xl">
          <div className="card space-y-4">
            <h1 className="text-2xl font-semibold text-slate-900">My K-Notes</h1>
            <p className="text-sm text-slate-600">Log in to manage your K-Notes.</p>
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

  return (
    <div className="min-h-screen bg-slate-100 px-4 py-10">
      <div className="container-page space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-semibold text-slate-900">My K-Notes</h1>
            <p className="text-sm text-slate-600">Manage your drafts and published posts.</p>
          </div>
          <Link href="/dashboard/k-note/new" className="btn-primary">
            New K-Note
          </Link>
        </div>

        {error ? <div className="rounded-md bg-red-50 px-4 py-3 text-sm text-red-700">{error}</div> : null}

        {loading ? (
          <div className="rounded-lg bg-white p-6 text-sm text-slate-600 shadow">Loading your K-Notes...</div>
        ) : kNotes.length === 0 ? (
          <div className="rounded-lg bg-white p-6 text-sm text-slate-600 shadow">You have not created any K-Notes yet.</div>
        ) : (
          <div className="overflow-hidden rounded-lg bg-white shadow">
            <table className="min-w-full divide-y divide-slate-200">
              <thead className="bg-slate-50 text-left text-sm font-semibold text-slate-700">
                <tr>
                  <th className="px-4 py-3">Title</th>
                  <th className="px-4 py-3">Category</th>
                  <th className="px-4 py-3">Status</th>
                  <th className="px-4 py-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-sm">
                {kNotes.map((note) => (
                  <tr key={note.id} className="hover:bg-slate-50">
                    <td className="px-4 py-3 font-medium text-slate-900">{note.title}</td>
                    <td className="px-4 py-3 text-slate-600">{note.category ?? 'Uncategorized'}</td>
                    <td className="px-4 py-3 text-slate-600">{note.isPublished ? 'Published' : 'Draft'}</td>
                    <td className="px-4 py-3 text-right">
                      <div className="flex justify-end gap-2">
                        <button
                          onClick={() => router.push(`/k-note/${note.id}`)}
                          className="rounded-md border border-slate-200 px-3 py-1 text-xs font-semibold text-slate-700 hover:bg-slate-50"
                        >
                          View
                        </button>
                        <button
                          onClick={() => handleDelete(note.id)}
                          className="rounded-md border border-red-200 px-3 py-1 text-xs font-semibold text-red-700 hover:bg-red-50"
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
