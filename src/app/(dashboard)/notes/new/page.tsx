'use client';

import { FormEvent, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import Link from 'next/link';

import NoteForm from '@/components/dashboard/NoteForm';
import NoteSidebar from '@/components/dashboard/NoteSidebar';

export default function NewNotePage() {
  const router = useRouter();
  const { data: session } = useSession();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [coverUrl, setCoverUrl] = useState('');
  const [tags, setTags] = useState('');
  const [coverPreview, setCoverPreview] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  if (!session?.user) {
    return (
      <div className="min-h-screen bg-slate-100 px-4 py-10">
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

  const handleCoverFileChange = (file: File | null) => {
    if (file) {
      const previewUrl = URL.createObjectURL(file);
      setCoverPreview(previewUrl);
    } else {
      setCoverPreview(null);
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 px-4 py-10">
      <div className="mx-auto max-w-6xl">
        <div className="grid gap-6 lg:grid-cols-[260px,1fr]">
          <NoteSidebar />
          <NoteForm
            title={title}
            content={content}
            coverUrl={coverUrl}
            tags={tags}
            error={error}
            loading={loading}
            coverPreview={coverPreview}
            onTitleChange={setTitle}
            onContentChange={setContent}
            onCoverUrlChange={setCoverUrl}
            onTagsChange={setTags}
            onSubmit={onSubmit}
            onCoverFileChange={handleCoverFileChange}
          />
        </div>
      </div>
    </div>
  );
}
