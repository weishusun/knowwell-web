'use client';

import { FormEvent, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import Link from 'next/link';

export default function NewNotePage() {
  const router = useRouter();
  const { data: session } = useSession();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [coverUrl, setCoverUrl] = useState('');
  const [tags, setTags] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  if (!session?.user) {
    return (
      <div className="container-page max-w-2xl">
        <div className="card space-y-4">
          <h1 className="text-2xl font-semibold text-slate-900">Create a K-Note</h1>
          <p className="text-sm text-slate-600">You need an account to publish notes.</p>
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
    );
  }

  const onSubmit = async (event: FormEvent) => {
    event.preventDefault();
    setLoading(true);
    setError(null);

    const res = await fetch('/api/notes', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        title,
        content,
        coverUrl: coverUrl || null,
        tags: tags
          .split(',')
          .map((tag) => tag.trim())
          .filter(Boolean)
      })
    });

    setLoading(false);

    if (!res.ok) {
      const data = await res.json();
      setError(data.error ?? 'Unable to create note.');
      return;
    }

    const note = await res.json();
    router.push(`/notes/${note.id}`);
  };

  return (
    <div className="container-page max-w-3xl">
      <div className="card space-y-6">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.15em] text-brand-600">Publish</p>
          <h1 className="text-3xl font-bold text-slate-900">Create a K-Note</h1>
          <p className="text-sm text-slate-600">Combine imagery and storytelling to make your insight memorable.</p>
        </div>

        <form onSubmit={onSubmit} className="space-y-5">
          <div className="space-y-2">
            <label htmlFor="title">Title</label>
            <input
              id="title"
              value={title}
              required
              placeholder="A descriptive headline"
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <label htmlFor="content">Content</label>
            <textarea
              id="content"
              value={content}
              required
              rows={6}
              placeholder="Share the story behind your insight, add bullet points or highlights."
              onChange={(e) => setContent(e.target.value)}
            />
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <label htmlFor="coverUrl">Cover image URL</label>
              <input
                id="coverUrl"
                value={coverUrl}
                placeholder="https://images.unsplash.com/..."
                onChange={(e) => setCoverUrl(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="tags">Tags</label>
              <input
                id="tags"
                value={tags}
                placeholder="design, productivity, research"
                onChange={(e) => setTags(e.target.value)}
              />
              <p className="text-xs text-slate-500">Comma separated list.</p>
            </div>
          </div>
          {error && <p className="text-sm text-red-600">{error}</p>}
          <button type="submit" className="btn-primary" disabled={loading}>
            {loading ? 'Publishing...' : 'Publish note'}
          </button>
        </form>
      </div>
    </div>
  );
}
