'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { useEffect, useMemo, useState } from 'react';

type Note = {
  id: string;
  title: string;
  createdAt: string | Date;
  updatedAt?: string | Date;
  status?: 'draft' | 'published';
  isPublished?: boolean;
};

type NotesResponse = {
  items: Note[];
  meta?: {
    page?: number;
    pageSize?: number;
    totalItems?: number;
    totalPages?: number;
  };
};

const PAGE_SIZE = 10;

const SORT_OPTIONS = [
  { label: 'Created (newest)', sort: 'createdAt', order: 'desc' as const },
  { label: 'Created (oldest)', sort: 'createdAt', order: 'asc' as const },
  { label: 'Updated (newest)', sort: 'updatedAt', order: 'desc' as const },
  { label: 'Updated (oldest)', sort: 'updatedAt', order: 'asc' as const },
];

type SortOption = (typeof SORT_OPTIONS)[number];

export default function MyKNotesPage() {
  const router = useRouter();
  const { data: session } = useSession();

  const [notes, setNotes] = useState<Note[]>([]);
  const [statusFilter, setStatusFilter] = useState<'all' | 'draft' | 'published'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortOption, setSortOption] = useState<SortOption>(SORT_OPTIONS[0]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [supportsStatus, setSupportsStatus] = useState<boolean>(false);

  useEffect(() => {
    if (!session?.user?.id) return;

    const controller = new AbortController();

    const fetchNotes = async () => {
      setLoading(true);
      setError(null);

      try {
        const params = new URLSearchParams({
          page: page.toString(),
          pageSize: PAGE_SIZE.toString(),
          sort: sortOption.sort,
          order: sortOption.order,
        });

        if (supportsStatus && statusFilter !== 'all') {
          params.set('status', statusFilter);
        }

        if (searchQuery.trim()) {
          params.set('q', searchQuery.trim());
        }

        const response = await fetch(`/api/notes?${params.toString()}`, {
          cache: 'no-store',
          signal: controller.signal,
        });

        if (!response.ok) {
          const data = await response.json().catch(() => ({}));
          setError(data.error ?? 'Failed to load your K-Notes.');
          setNotes([]);
          setLoading(false);
          return;
        }

        const data: NotesResponse = await response.json();
        const items = Array.isArray(data.items) ? data.items : [];
        const meta = data.meta ?? {};

        const hasStatusField = items.some((item) => typeof item.status === 'string');
        const nextSupportsStatus = supportsStatus || hasStatusField;
        setSupportsStatus(nextSupportsStatus);

        if (!nextSupportsStatus && statusFilter !== 'all') {
          setStatusFilter('all');
        }

        setNotes(items);
        setPage(Math.max(1, meta.page ?? page));
        setTotalPages(Math.max(1, meta.totalPages ?? 1));
      } catch (fetchError) {
        if (controller.signal.aborted) return;
        console.error('[NOTES_FETCH]', fetchError);
        setError('Unable to load your K-Notes.');
        setNotes([]);
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      }
    };

    fetchNotes();

    return () => controller.abort();
  }, [session?.user?.id, page, searchQuery, sortOption, statusFilter, supportsStatus]);

  const statusOptions = useMemo(() => {
    if (!supportsStatus) return ['all'] as const;
    return ['all', 'draft', 'published'] as const;
  }, [supportsStatus]);

  const handleDelete = async (id: string) => {
    const confirmed = window.confirm('Are you sure you want to delete this K-Note?');
    if (!confirmed) return;

    const response = await fetch(`/api/notes/${id}`, { method: 'DELETE' });
    if (!response.ok) {
      const data = await response.json().catch(() => ({}));
      setError(data.error ?? 'Unable to delete K-Note.');
      return;
    }

    setNotes((prev) => prev.filter((note) => note.id !== id));
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
        <div className="flex flex-col gap-4 rounded-lg bg-white p-4 shadow">
          <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
            <div>
              <h1 className="text-2xl font-semibold text-slate-900">My K-Notes</h1>
              <p className="text-sm text-slate-600">Manage your drafts and published posts.</p>
            </div>
            <Link href="/notes/new" className="btn-primary self-start md:self-auto">
              New K-Note
            </Link>
          </div>

          <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
            <div className="flex flex-wrap gap-2">
              {statusOptions.map((option) => (
                <button
                  key={option}
                  onClick={() => {
                    setStatusFilter(option);
                    setPage(1);
                  }}
                  className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
                    statusFilter === option
                      ? 'bg-brand-600 text-white shadow'
                      : 'border border-slate-200 bg-white text-slate-700 hover:border-brand-200 hover:text-brand-700'
                  }`}
                >
                  {option === 'all' ? 'All' : option === 'draft' ? 'Draft' : 'Published'}
                </button>
              ))}
            </div>

            <div className="flex flex-col gap-2 md:flex-row md:items-center md:gap-3">
              <div className="relative md:w-64">
                <input
                  type="search"
                  value={searchQuery}
                  onChange={(event) => {
                    setSearchQuery(event.target.value);
                    setPage(1);
                  }}
                  placeholder="Search by title or tags…"
                  className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm shadow-sm focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-100"
                />
              </div>

              <div className="flex items-center gap-2">
                <label htmlFor="sort" className="text-sm font-medium text-slate-700">
                  Sort by
                </label>
                <select
                  id="sort"
                  value={`${sortOption.sort}:${sortOption.order}`}
                  onChange={(event) => {
                    const next = SORT_OPTIONS.find(
                      (option) => `${option.sort}:${option.order}` === event.target.value
                    );
                    if (next) {
                      setSortOption(next);
                      setPage(1);
                    }
                  }}
                  className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm shadow-sm focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-100"
                >
                  {SORT_OPTIONS.map((option) => (
                    <option key={`${option.sort}:${option.order}`} value={`${option.sort}:${option.order}`}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </div>

        {error ? <div className="rounded-md bg-red-50 px-4 py-3 text-sm text-red-700">{error}</div> : null}

        <div className="overflow-hidden rounded-lg bg-white shadow">
          <table className="min-w-full divide-y divide-slate-200">
            <thead className="bg-slate-50 text-left text-sm font-semibold text-slate-700">
              <tr>
                <th className="px-4 py-3">Title</th>
                {supportsStatus ? <th className="px-4 py-3">Status</th> : null}
                <th className="px-4 py-3">Created</th>
                <th className="px-4 py-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-sm">
              {loading
                ? Array.from({ length: 5 }).map((_, index) => (
                    <tr key={`skeleton-${index}`} className="animate-pulse">
                      <td className="px-4 py-3">
                        <div className="h-4 w-48 rounded bg-slate-200" />
                      </td>
                      {supportsStatus ? (
                        <td className="px-4 py-3">
                          <div className="h-4 w-20 rounded bg-slate-200" />
                        </td>
                      ) : null}
                      <td className="px-4 py-3">
                        <div className="h-4 w-24 rounded bg-slate-200" />
                      </td>
                      <td className="px-4 py-3">
                        <div className="ml-auto h-8 w-32 rounded bg-slate-200" />
                      </td>
                    </tr>
                  ))
                : notes.length === 0
                  ? (
                    <tr>
                      <td
                        colSpan={supportsStatus ? 4 : 3}
                        className="px-4 py-8 text-center text-sm text-slate-500"
                      >
                        You have not created any K-Notes yet.
                      </td>
                    </tr>
                    )
                  : notes.map((note) => {
                      const createdLabel = new Date(note.createdAt).toLocaleDateString();
                      const normalizedStatus = note.status ?? (note.isPublished ? 'published' : undefined);
                      const statusLabel = normalizedStatus
                        ? normalizedStatus === 'draft'
                          ? 'Draft'
                          : 'Published'
                        : '—';

                      return (
                        <tr key={note.id} className="hover:bg-slate-50">
                          <td className="px-4 py-3 font-medium text-slate-900">{note.title}</td>
                          {supportsStatus ? (
                            <td className="px-4 py-3 text-slate-600">{statusLabel}</td>
                          ) : null}
                          <td className="px-4 py-3 text-slate-600">{createdLabel}</td>
                          <td className="px-4 py-3 text-right">
                            <div className="flex justify-end gap-2">
                              <button
                                onClick={() => router.push(`/notes/${note.id}`)}
                                className="rounded-md border border-slate-200 px-3 py-1 text-xs font-semibold text-slate-700 hover:bg-slate-50"
                              >
                                View
                              </button>
                              <Link
                                href={`/notes/${note.id}/edit`}
                                className="rounded-md border border-slate-200 px-3 py-1 text-xs font-semibold text-slate-700 hover:bg-slate-50"
                              >
                                Edit
                              </Link>
                              <button
                                onClick={() => handleDelete(note.id)}
                                className="rounded-md border border-red-200 px-3 py-1 text-xs font-semibold text-red-700 hover:bg-red-50"
                              >
                                Delete
                              </button>
                            </div>
                          </td>
                        </tr>
                      );
                    })}
            </tbody>
          </table>
        </div>

        <div className="flex items-center justify-between rounded-lg bg-white px-4 py-3 text-sm text-slate-700 shadow">
          <button
            onClick={() => setPage((prev) => Math.max(1, prev - 1))}
            disabled={page <= 1 || loading}
            className="rounded-md border border-slate-200 px-3 py-2 font-semibold disabled:cursor-not-allowed disabled:opacity-50"
          >
            Prev
          </button>
          <span>
            Page {page} of {Math.max(totalPages, 1)}
          </span>
          <button
            onClick={() => setPage((prev) => (totalPages ? Math.min(totalPages, prev + 1) : prev + 1))}
            disabled={loading || page >= totalPages}
            className="rounded-md border border-slate-200 px-3 py-2 font-semibold disabled:cursor-not-allowed disabled:opacity-50"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}
