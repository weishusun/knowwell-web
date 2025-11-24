'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';

type NoteActionsProps = {
  noteId: string;
};

type ToastState = { type: 'success' | 'error'; message: string } | null;

export default function NoteActions({ noteId }: NoteActionsProps) {
  const router = useRouter();
  const [toast, setToast] = useState<ToastState>(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);

  useEffect(() => {
    if (!toast) return;

    const timeout = setTimeout(() => setToast(null), 3500);
    return () => clearTimeout(timeout);
  }, [toast]);

  const handleDelete = async () => {
    setIsDeleting(true);
    setToast(null);

    try {
      const response = await fetch(`/api/k-notes/${noteId}`, { method: 'DELETE' });

      if (!response.ok) {
        const data = await response.json().catch(() => ({}));
        throw new Error(data.error ?? 'Unable to delete this K-Note.');
      }

      setToast({ type: 'success', message: 'K-Note deleted successfully.' });
      setDialogOpen(false);
      setTimeout(() => {
        router.push('/dashboard/k-note');
        router.refresh();
      }, 300);
    } catch (error) {
      console.error(error);
      setToast({ type: 'error', message: error instanceof Error ? error.message : 'Failed to delete K-Note.' });
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div className="flex flex-col items-start justify-end gap-3 text-sm sm:flex-row sm:items-center">
      {toast ? (
        <div
          className={`w-full rounded-lg border px-3 py-2 text-xs sm:w-auto ${
            toast.type === 'success'
              ? 'border-green-200 bg-green-50 text-green-800'
              : 'border-red-200 bg-red-50 text-red-800'
          }`}
        >
          {toast.message}
        </div>
      ) : null}

      <div className="flex items-center gap-2">
        <Link
          href={`/k-note/${noteId}/edit`}
          className="rounded-md border border-slate-200 px-3 py-1 text-xs font-semibold text-slate-700 hover:bg-slate-50"
        >
          Edit
        </Link>

        <AlertDialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <AlertDialogTrigger asChild>
            <button className="rounded-md border border-red-200 px-3 py-1 text-xs font-semibold text-red-700 hover:bg-red-50">
              Delete
            </button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Delete this K-Note?</AlertDialogTitle>
              <AlertDialogDescription>
                This action cannot be undone. This will permanently delete your K-Note and remove its data from our servers.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel disabled={isDeleting}>Cancel</AlertDialogCancel>
              <AlertDialogAction onClick={handleDelete} disabled={isDeleting}>
                {isDeleting ? 'Deleting...' : 'Yes, delete'}
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </div>
  );
}
