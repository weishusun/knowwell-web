'use client';

import { FormEvent, useMemo, useState } from 'react';

export type KNoteFormData = {
  title: string;
  summary: string;
  category: string;
  tags: string[];
  coverImageUrl: string;
  content: string;
  isPublished: boolean;
};

interface KNoteFormProps {
  onSubmit: (data: KNoteFormData) => Promise<void> | void;
  isSubmitting?: boolean;
  errorMessage?: string | null;
}

const categories = ['Technology', 'Travel', 'Finance', 'Health', 'Lifestyle', 'Education', 'Business', 'Sports'];

export default function KNoteForm({ onSubmit, isSubmitting = false, errorMessage }: KNoteFormProps) {
  const [title, setTitle] = useState('');
  const [summary, setSummary] = useState('');
  const [category, setCategory] = useState('');
  const [tagsInput, setTagsInput] = useState('');
  const [coverImageUrl, setCoverImageUrl] = useState('');
  const [content, setContent] = useState('');
  const [isPublished, setIsPublished] = useState(true);

  const tags = useMemo(
    () =>
      tagsInput
        .split(',')
        .map((tag) => tag.trim())
        .filter(Boolean),
    [tagsInput]
  );

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    await onSubmit({ title, summary, category, tags, coverImageUrl, content, isPublished });
  };

  const resetForm = () => {
    setTitle('');
    setSummary('');
    setCategory('');
    setTagsInput('');
    setCoverImageUrl('');
    setContent('');
    setIsPublished(true);
  };

  return (
    <form onSubmit={handleSubmit} className="card space-y-4">
      <div className="flex items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold text-slate-900">Create a K-Note</h1>
          <p className="text-sm text-slate-600">Share your insight with the community.</p>
        </div>
        <label className="inline-flex cursor-pointer items-center gap-2 text-sm font-medium text-slate-700">
          <input
            type="checkbox"
            className="h-4 w-4 rounded border-slate-300 text-purple-600 focus:ring-purple-500"
            checked={isPublished}
            onChange={(e) => setIsPublished(e.target.checked)}
          />
          Published
        </label>
      </div>

      {errorMessage ? <div className="rounded-md bg-red-50 px-4 py-3 text-sm text-red-700">{errorMessage}</div> : null}

      <div className="grid gap-4 md:grid-cols-2">
        <div className="space-y-2">
          <label className="block text-sm font-medium text-slate-800">Title *</label>
          <input
            type="text"
            required
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm focus:border-purple-400 focus:outline-none"
            placeholder="Give your K-Note a clear title"
          />
        </div>
        <div className="space-y-2">
          <label className="block text-sm font-medium text-slate-800">Category</label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm focus:border-purple-400 focus:outline-none"
          >
            <option value="">Select a category</option>
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="space-y-2">
        <label className="block text-sm font-medium text-slate-800">Summary</label>
        <textarea
          value={summary}
          onChange={(e) => setSummary(e.target.value)}
          className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm focus:border-purple-400 focus:outline-none"
          placeholder="Briefly describe what this K-Note covers"
          rows={3}
        />
      </div>

      <div className="space-y-2">
        <label className="block text-sm font-medium text-slate-800">Content</label>
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm focus:border-purple-400 focus:outline-none"
          placeholder="Write your insights here"
          rows={8}
        />
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <div className="space-y-2">
          <label className="block text-sm font-medium text-slate-800">Tags</label>
          <input
            type="text"
            value={tagsInput}
            onChange={(e) => setTagsInput(e.target.value)}
            className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm focus:border-purple-400 focus:outline-none"
            placeholder="Comma-separated tags"
          />
        </div>
        <div className="space-y-2 md:col-span-2">
          <label className="block text-sm font-medium text-slate-800">Cover Image URL</label>
          <input
            type="url"
            value={coverImageUrl}
            onChange={(e) => setCoverImageUrl(e.target.value)}
            className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm focus:border-purple-400 focus:outline-none"
            placeholder="https://example.com/cover.jpg"
          />
        </div>
      </div>

      <div className="flex justify-end gap-3">
        <button type="button" className="btn-secondary" onClick={resetForm}>
          Reset
        </button>
        <button type="submit" className="btn-primary" disabled={isSubmitting}>
          {isSubmitting ? 'Saving...' : 'Publish K-Note'}
        </button>
      </div>
    </form>
  );
}
