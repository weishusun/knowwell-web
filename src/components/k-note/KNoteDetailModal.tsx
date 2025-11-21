'use client';

import Image from 'next/image';
import { useEffect } from 'react';

export type KNote = {
  id: string;
  title: string;
  image: string;
  author: string;
  avatar: string;
  likes: number;
  comments: number;
  description?: string;
};

const mockComments = [
  {
    id: '1',
    author: 'Eve',
    avatar: 'https://images.unsplash.com/photo-1502685104226-ee32379fefbe?auto=format&fit=crop&w=200&q=80',
    text: 'This is beautiful! The colors are amazing.',
    time: '1h ago',
  },
  {
    id: '2',
    author: 'Chris',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=200&q=80',
    text: 'Can you share more details about the location?',
    time: '2h ago',
  },
];

export function KNoteDetailModal({
  open,
  onClose,
  note,
}: {
  open: boolean;
  onClose: () => void;
  note: KNote | null;
}) {
  useEffect(() => {
    if (!open) return;
    const handler = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };
    document.addEventListener('keydown', handler);
    return () => document.removeEventListener('keydown', handler);
  }, [open, onClose]);

  if (!open || !note) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4"
      onClick={onClose}
      role="presentation"
    >
      <div
        className="relative grid max-h-[90vh] w-full max-w-5xl grid-cols-1 overflow-hidden rounded-3xl bg-white shadow-xl md:grid-cols-2"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          className="absolute left-4 top-4 z-10 rounded-full bg-white p-2 shadow hover:bg-gray-100"
          onClick={onClose}
          aria-label="Close"
        >
          <span className="sr-only">Close</span>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 6l12 12M18 6l-12 12" />
          </svg>
        </button>
        <div className="relative h-full min-h-[320px] bg-black">
          <Image
            src={note.image}
            alt={note.title}
            fill
            className="object-cover"
            sizes="(min-width: 1024px) 50vw, 100vw"
            priority
          />
        </div>
        <div className="flex flex-col gap-4 overflow-y-auto p-6">
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <Image src={note.avatar} alt={note.author} width={48} height={48} className="h-12 w-12 rounded-full object-cover" />
              <div>
                <p className="font-semibold text-gray-900">{note.author}</p>
                <p className="text-sm text-gray-500">Travel & Lifestyle</p>
              </div>
            </div>
            <button className="rounded-full border border-purple-200 px-4 py-2 text-sm font-semibold text-purple-700 transition hover:bg-purple-50">
              Follow
            </button>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-gray-900">{note.title}</h3>
            <p className="mt-2 text-sm text-gray-700">
              {note.description ??
                'Approach the most beautiful scenery and relax. Share your own story and impressions with the community.'}
            </p>
          </div>

          <div className="space-y-4">
            <h4 className="text-sm font-semibold text-gray-900">Comments</h4>
            <div className="space-y-4">
              {mockComments.map((comment) => (
                <div key={comment.id} className="flex gap-3 rounded-2xl bg-gray-50 p-3">
                  <Image
                    src={comment.avatar}
                    alt={comment.author}
                    width={40}
                    height={40}
                    className="h-10 w-10 rounded-full object-cover"
                  />
                  <div className="flex-1">
                    <div className="flex items-center justify-between text-sm">
                      <span className="font-semibold text-gray-900">{comment.author}</span>
                      <span className="text-gray-500">{comment.time}</span>
                    </div>
                    <p className="text-gray-700">{comment.text}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="space-y-3 rounded-2xl border border-gray-200 p-3">
              <textarea
                placeholder="Write your comment..."
                className="h-24 w-full resize-none rounded-xl border border-gray-200 px-3 py-2 text-sm focus:border-purple-400 focus:outline-none"
              />
              <div className="flex justify-end gap-3 text-sm font-medium">
                <button className="rounded-full border border-gray-200 px-4 py-2 text-gray-700 hover:bg-gray-50">Cancel</button>
                <button className="rounded-full bg-purple-600 px-4 py-2 text-white hover:bg-purple-700">Send</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
