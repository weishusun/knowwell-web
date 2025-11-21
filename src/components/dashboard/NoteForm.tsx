import { ChangeEvent, FormEvent } from 'react';

interface NoteFormProps {
  title: string;
  content: string;
  coverUrl: string;
  tags: string;
  error: string | null;
  loading: boolean;
  coverPreview: string | null;
  onTitleChange: (value: string) => void;
  onContentChange: (value: string) => void;
  onCoverUrlChange: (value: string) => void;
  onTagsChange: (value: string) => void;
  onSubmit: (event: FormEvent<HTMLFormElement>) => void;
  onCoverFileChange: (file: File | null) => void;
}

const topics = ['Apple 17', 'Sales Strategy', 'Operational Excellence', 'Artificial Intelligence'];

export function NoteForm({
  title,
  content,
  coverUrl,
  tags,
  error,
  loading,
  coverPreview,
  onTitleChange,
  onContentChange,
  onCoverUrlChange,
  onTagsChange,
  onSubmit,
  onCoverFileChange
}: NoteFormProps) {
  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] ?? null;
    onCoverFileChange(file);
  };

  return (
    <div className="rounded-3xl bg-white shadow-sm ring-1 ring-slate-200">
      <div className="border-b border-slate-200 px-6 py-5">
        <h1 className="text-2xl font-bold text-slate-900">Create K-Note</h1>
        <p className="text-sm text-slate-500">Share your visuals and insights in one place.</p>
      </div>

      <form onSubmit={onSubmit} className="space-y-6 px-6 py-8">
        <div className="grid gap-4 md:grid-cols-[1fr,1.2fr]">
          <div className="flex h-52 items-center justify-center rounded-2xl border-2 border-dashed border-slate-200 bg-slate-50">
            <label className="flex cursor-pointer flex-col items-center justify-center gap-3 text-sm font-medium text-slate-600">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white shadow-sm ring-1 ring-slate-200">
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="text-[#6d5ae6]"
                >
                  <path d="M10 4v12M4 10h12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                </svg>
              </div>
              <span className="text-[#6d5ae6]">Add image</span>
              <input type="file" accept="image/*" onChange={handleFileChange} className="hidden" />
            </label>
          </div>
          <div className="space-y-3">
            {coverPreview ? (
              <div className="overflow-hidden rounded-xl border border-slate-200">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={coverPreview} alt="Preview" className="h-52 w-full object-cover" />
              </div>
            ) : (
              <div className="flex h-52 items-center justify-center rounded-xl border border-dashed border-slate-200 text-sm text-slate-400">
                Image preview will appear here
              </div>
            )}
            <div className="space-y-2 text-sm">
              <label className="block font-medium text-slate-700" htmlFor="coverUrl">
                Cover image URL
              </label>
              <input
                id="coverUrl"
                value={coverUrl}
                onChange={(e) => onCoverUrlChange(e.target.value)}
                placeholder="https://images.unsplash.com/..."
                className="w-full rounded-xl border border-slate-200 px-4 py-2.5 text-sm shadow-sm focus:border-[#6d5ae6] focus:outline-none"
              />
              <p className="text-xs text-slate-500">Paste an image URL or upload above.</p>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-700" htmlFor="title">
              Title
            </label>
            <input
              id="title"
              value={title}
              required
              placeholder="Fill in the title..."
              onChange={(e) => onTitleChange(e.target.value)}
              className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm shadow-sm focus:border-[#6d5ae6] focus:outline-none"
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-700" htmlFor="content">
              Content
            </label>
            <textarea
              id="content"
              value={content}
              required
              rows={6}
              placeholder="Write your text content here..."
              onChange={(e) => onContentChange(e.target.value)}
              className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm shadow-sm focus:border-[#6d5ae6] focus:outline-none"
            />
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          <div className="space-y-3 rounded-2xl border border-slate-200 p-4 shadow-sm">
            <div className="flex items-center justify-between text-sm font-semibold text-slate-800">
              <span>Subject topic</span>
              <button type="button" className="text-xs font-medium text-[#6d5ae6]">Add</button>
            </div>
            <div className="flex flex-wrap gap-2">
              {topics.map((topic) => (
                <button
                  key={topic}
                  type="button"
                  className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-700"
                >
                  #{topic}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-3 rounded-2xl border border-slate-200 p-4 shadow-sm text-sm text-slate-700">
            <div className="flex items-center justify-between font-semibold text-slate-800">
              <span>Tag users or locations</span>
              <button
                type="button"
                className="inline-flex items-center gap-2 rounded-full bg-white px-3 py-1.5 text-xs font-semibold text-[#6d5ae6] shadow-sm ring-1 ring-[#dcd6ff]"
              >
                <span className="text-base">＋</span> Add tags
              </button>
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              <label className="space-y-1 text-xs font-medium text-slate-600">
                Location
                <div className="flex items-center gap-2 rounded-xl border border-slate-200 px-3 py-2 shadow-sm">
                  <span aria-hidden className="text-slate-400">📍</span>
                  <input
                    type="text"
                    placeholder="Mainland China"
                    className="w-full bg-transparent text-sm focus:outline-none"
                  />
                </div>
              </label>
              <label className="space-y-1 text-xs font-medium text-slate-600">
                Collection
                <select className="w-full rounded-xl border border-slate-200 px-3 py-2 text-sm shadow-sm focus:border-[#6d5ae6] focus:outline-none">
                  <option>Default</option>
                  <option>Marketing</option>
                  <option>Product</option>
                </select>
              </label>
              <label className="space-y-1 text-xs font-medium text-slate-600">
                Group chat
                <select className="w-full rounded-xl border border-slate-200 px-3 py-2 text-sm shadow-sm focus:border-[#6d5ae6] focus:outline-none">
                  <option>General</option>
                  <option>Team A</option>
                  <option>Team B</option>
                </select>
              </label>
              <label className="space-y-1 text-xs font-medium text-slate-600">
                Tags
                <input
                  id="tags"
                  value={tags}
                  placeholder="design, productivity, research"
                  onChange={(e) => onTagsChange(e.target.value)}
                  className="w-full rounded-xl border border-slate-200 px-3 py-2 text-sm shadow-sm focus:border-[#6d5ae6] focus:outline-none"
                />
                <span className="text-[11px] text-slate-500">Comma separated.</span>
              </label>
            </div>
          </div>
        </div>

        <div className="space-y-4 rounded-2xl border border-slate-200 p-4 shadow-sm">
          <div className="flex items-center justify-between text-sm font-semibold text-slate-800">
            <span>More settings</span>
            <button type="button" className="text-xs font-medium text-[#6d5ae6]">Manage</button>
          </div>
          <div className="grid gap-4 sm:grid-cols-3">
            <div className="space-y-2 text-sm">
              <p className="font-medium text-slate-700">Self-Declaration</p>
              <select className="w-full rounded-xl border border-slate-200 px-3 py-2 text-sm shadow-sm focus:border-[#6d5ae6] focus:outline-none">
                <option>Enterprise self-built</option>
                <option>Personal</option>
              </select>
            </div>
            <div className="space-y-2 text-sm">
              <p className="font-medium text-slate-700">Visibility</p>
              <select className="w-full rounded-xl border border-slate-200 px-3 py-2 text-sm shadow-sm focus:border-[#6d5ae6] focus:outline-none">
                <option>Public</option>
                <option>Private</option>
                <option>Team only</option>
              </select>
            </div>
            <div className="space-y-2 text-sm">
              <p className="font-medium text-slate-700">Release time</p>
              <div className="flex gap-3">
                <button
                  type="button"
                  className="flex-1 rounded-xl border border-[#6d5ae6] bg-[#f4f1ff] px-3 py-2 text-sm font-semibold text-[#6d5ae6]"
                >
                  Publish now
                </button>
                <button
                  type="button"
                  className="flex-1 rounded-xl border border-slate-200 px-3 py-2 text-sm font-semibold text-slate-700"
                >
                  Schedule
                </button>
              </div>
            </div>
          </div>
        </div>

        {error && <p className="text-sm text-red-600">{error}</p>}

        <div className="flex flex-wrap items-center justify-between gap-3 border-t border-slate-200 pt-4">
          <div className="text-xs text-slate-500">Drafts save automatically</div>
          <button
            type="submit"
            className="inline-flex items-center gap-2 rounded-full bg-[#6d5ae6] px-6 py-3 text-sm font-semibold text-white shadow-md transition hover:bg-[#5a48d6]"
            disabled={loading}
          >
            {loading ? 'Publishing...' : (
              <>
                <span className="text-base">＋</span> Publish note
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}

export default NoteForm;
