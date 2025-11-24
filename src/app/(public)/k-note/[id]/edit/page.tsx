'use client';

import { FormEvent, useEffect, useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';

interface NoteResponse {
  id: string;
  title: string;
  content: string;
  coverUrl?: string | null;
  tags?: string[] | null;
}

interface PageProps {
  params: { id: string };
}

type ToastState = { type: 'success' | 'error'; message: string } | null;

type FormState = {
  title: string;
  content: string;
  coverUrl: string;
  tags: string;
};

export default function EditNotePage({ params }: PageProps) {
  const router = useRouter();
  const [formState, setFormState] = useState<FormState>({ title: '', content: '', coverUrl: '', tags: '' });
  const [initialData, setInitialData] = useState<FormState | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [notFound, setNotFound] = useState(false);
  const [toast, setToast] = useState<ToastState>(null);

  useEffect(() => {
    let isMounted = true;

    const fetchNote = async () => {
      setIsLoading(true);
      setNotFound(false);

      try {
        const response = await fetch(`/api/notes/${params.id}`, { cache: 'no-store' });

        if (!isMounted) return;

        if (response.status === 404) {
          setNotFound(true);
          setInitialData(null);
          return;
        }

        if (!response.ok) {
          throw new Error('Failed to fetch note');
        }

        const note = (await response.json()) as NoteResponse;
        const tags = Array.isArray(note.tags) ? note.tags.join(', ') : '';

        setFormState({
          title: note.title ?? '',
          content: note.content ?? '',
          coverUrl: note.coverUrl ?? '',
          tags,
        });
        setInitialData({
          title: note.title ?? '',
          content: note.content ?? '',
          coverUrl: note.coverUrl ?? '',
          tags,
        });
      } catch (error) {
        console.error('Failed to load note', error);
        setToast({ type: 'error', message: 'Unable to load note.' });
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    fetchNote();

    return () => {
      isMounted = false;
    };
  }, [params.id]);

  useEffect(() => {
    if (!toast) return;

    const timeout = setTimeout(() => setToast(null), 4000);
    return () => clearTimeout(timeout);
  }, [toast]);

  const changedPayload = useMemo(() => {
    if (!initialData) return {};

    const payload: Partial<NoteResponse> = {};

    if (formState.title !== initialData.title) payload.title = formState.title;
    if (formState.content !== initialData.content) payload.content = formState.content;
    if (formState.coverUrl !== initialData.coverUrl) payload.coverUrl = formState.coverUrl || null;

    const currentTags = formState.tags
      .split(',')
      .map((tag) => tag.trim())
      .filter(Boolean);
    const initialTags = initialData.tags
      .split(',')
      .map((tag) => tag.trim())
      .filter(Boolean);

    const tagsChanged = currentTags.length !== initialTags.length || currentTags.some((tag, index) => tag !== initialTags[index]);

    if (tagsChanged) payload.tags = currentTags;

    return payload;
  }, [formState, initialData]);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!initialData) return;

    if (Object.keys(changedPayload).length === 0) {
      setToast({ type: 'success', message: 'No changes to save.' });
      return;
    }

    setIsSaving(true);
    setToast(null);

    try {
      const response = await fetch(`/api/notes/${params.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(changedPayload),
      });

      if (!response.ok) {
        throw new Error('Failed to update note');
      }

      setToast({ type: 'success', message: 'Note updated successfully.' });
      router.push(`/k-note/${params.id}`);
    } catch (error) {
      console.error('Failed to save note', error);
      setToast({ type: 'error', message: 'Unable to update note. Please try again.' });
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-slate-50 px-4 py-10">
        <div className="mx-auto max-w-2xl space-y-4">
          <div className="h-10 w-48 animate-pulse rounded-lg bg-slate-200" />
          <div className="space-y-3 rounded-2xl bg-white p-6 shadow">
            <div className="h-10 animate-pulse rounded-lg bg-slate-200" />
            <div className="h-32 animate-pulse rounded-lg bg-slate-200" />
            <div className="h-10 animate-pulse rounded-lg bg-slate-200" />
            <div className="h-10 animate-pulse rounded-lg bg-slate-200" />
          </div>
        </div>
      </div>
    );
  }

  if (notFound || !initialData) {
    return (
      <div className="min-h-screen bg-slate-50 px-4 py-10">
        <div className="mx-auto max-w-2xl rounded-2xl bg-white p-8 text-center shadow">
          <h1 className="text-2xl font-semibold text-slate-900">Note Not Found</h1>
          <p className="mt-2 text-sm text-slate-600">We couldn&apos;t find the note you&apos;re looking for.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 px-4 py-10">
      <div className="mx-auto max-w-3xl space-y-6">
        {toast ? (
          <div
            className={`rounded-xl border px-4 py-3 text-sm ${
              toast.type === 'success'
                ? 'border-green-200 bg-green-50 text-green-800'
                : 'border-red-200 bg-red-50 text-red-800'
            }`}
          >
            {toast.message}
          </div>
        ) : null}

        <div className="space-y-2">
          <h1 className="text-2xl font-semibold text-slate-900">Edit Note</h1>
          <p className="text-sm text-slate-600">Update your note details and save your changes.</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5 rounded-2xl bg-white p-6 shadow">
          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-800" htmlFor="title">
              Title
            </label>
            <input
              id="title"
              className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm focus:border-purple-500 focus:outline-none"
              value={formState.title}
              required
              onChange={(event) => setFormState((prev) => ({ ...prev, title: event.target.value }))}
              placeholder="Enter a clear title"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-800" htmlFor="content">
              Content
            </label>
            <textarea
              id="content"
              className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm focus:border-purple-500 focus:outline-none"
              rows={6}
              value={formState.content}
              required
              onChange={(event) => setFormState((prev) => ({ ...prev, content: event.target.value }))}
              placeholder="Write your note content"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-800" htmlFor="coverUrl">
              Cover URL (optional)
            </label>
            <input
              id="coverUrl"
              className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm focus:border-purple-500 focus:outline-none"
              value={formState.coverUrl}
              onChange={(event) => setFormState((prev) => ({ ...prev, coverUrl: event.target.value }))}
              placeholder="https://example.com/cover.jpg"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-800" htmlFor="tags">
              Tags (optional)
            </label>
            <input
              id="tags"
              className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm focus:border-purple-500 focus:outline-none"
              value={formState.tags}
              onChange={(event) => setFormState((prev) => ({ ...prev, tags: event.target.value }))}
              placeholder="Comma-separated tags"
            />
          </div>

          <div className="flex justify-end gap-3">
            <button
              type="button"
              className="rounded-lg border border-slate-200 px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50"
              onClick={() => setFormState(initialData)}
              disabled={isSaving}
            >
              Reset
            </button>
            <button
              type="submit"
              className="rounded-lg bg-purple-600 px-4 py-2 text-sm font-semibold text-white shadow hover:bg-purple-700 disabled:opacity-70"
              disabled={isSaving}
            >
              {isSaving ? 'Saving...' : 'Save Changes'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
