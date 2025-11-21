'use client';

import Image from 'next/image';
import { useMemo, useState } from 'react';

import { KNoteDetailModal, type KNote } from '@/components/k-note/KNoteDetailModal';

const individualTabs = [
  'For you',
  'Smartphones',
  'Cars',
  'Computer/Tablet',
  'Smart wearables',
  'Sports Shoes',
  'Baby Product',
  'Beauty & Skincare',
  'Travel',
  'K-Report',
  'K-Insight',
];

const businessTabs = ['For you', 'Hiring', 'For Investors', 'For Business Partners', 'Company Exhibition'];

const mockNotes: KNote[] = [
  {
    id: '1',
    title: "What's wrong with iPhones?",
    image: 'https://images.unsplash.com/photo-1510557880182-3d4d3cba35a5?auto=format&fit=crop&w=900&q=80',
    author: 'Christmas Rabbit',
    avatar: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=200&q=80',
    likes: 149,
    comments: 75,
  },
  {
    id: '2',
    title: 'Beautiful campus view',
    image: 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=900&q=80',
    author: 'Alex Lee',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=200&q=80',
    likes: 201,
    comments: 80,
  },
  {
    id: '3',
    title: 'City skyline at dusk',
    image: 'https://images.unsplash.com/photo-1467269204594-9661b134dd2b?auto=format&fit=crop&w=900&q=80',
    author: 'Urban Explorer',
    avatar: 'https://images.unsplash.com/photo-1544723795-3fb6469f5b39?auto=format&fit=crop&w=200&q=80',
    likes: 98,
    comments: 40,
  },
  {
    id: '4',
    title: 'Scenic castle',
    image: 'https://images.unsplash.com/photo-1505761671935-60b3a7427bad?auto=format&fit=crop&w=900&q=80',
    author: 'Volkswagen CC',
    avatar: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=200&q=80',
    likes: 321,
    comments: 120,
  },
  {
    id: '5',
    title: 'Sunny beach vibes',
    image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=900&q=80',
    author: 'Summer Lover',
    avatar: 'https://images.unsplash.com/photo-1527980965255-d3b416303d12?auto=format&fit=crop&w=200&q=80',
    likes: 412,
    comments: 180,
  },
  {
    id: '6',
    title: 'Forest adventures',
    image: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&w=900&q=80',
    author: 'Explorer',
    avatar: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=200&q=80',
    likes: 230,
    comments: 95,
  },
];

export default function KNotePage() {
  const [mode, setMode] = useState<'individuals' | 'businesses'>('individuals');
  const [selectedTab, setSelectedTab] = useState('For you');
  const [selectedNote, setSelectedNote] = useState<KNote | null>(null);
  const [modalOpen, setModalOpen] = useState(false);

  const tabs = useMemo(() => (mode === 'individuals' ? individualTabs : businessTabs), [mode]);

  const handleCardClick = (note: KNote) => {
    setSelectedNote(note);
    setModalOpen(true);
  };

  return (
    <section className="space-y-6 pb-16">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex-1">
          <input
            type="search"
            placeholder="Search comments"
            className="w-full rounded-full border border-gray-200 px-4 py-2 text-sm shadow-sm focus:border-purple-400 focus:outline-none md:max-w-md"
          />
        </div>
        <div className="flex items-center rounded-full bg-gray-100 p-1 text-sm font-semibold">
          <button
            onClick={() => setMode('individuals')}
            className={`rounded-full px-4 py-2 transition ${
              mode === 'individuals' ? 'bg-white text-purple-700 shadow' : 'text-gray-600 hover:text-purple-700'
            }`}
          >
            Individuals
          </button>
          <button
            onClick={() => setMode('businesses')}
            className={`rounded-full px-4 py-2 transition ${
              mode === 'businesses' ? 'bg-white text-purple-700 shadow' : 'text-gray-600 hover:text-purple-700'
            }`}
          >
            Businesses
          </button>
        </div>
      </div>

      <div className="flex flex-wrap gap-3">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setSelectedTab(tab)}
            className={`rounded-full px-4 py-2 text-sm font-medium transition ${
              selectedTab === tab
                ? 'bg-purple-600 text-white'
                : 'border border-purple-200 bg-white text-gray-700 hover:border-purple-400'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      <div className="space-y-4 text-center">
        <h1 className="text-3xl font-bold uppercase tracking-tight text-gray-900">Speak a little truth, leave a small trace.</h1>
        <p className="text-sm text-gray-600">
          A share in this moment might be the light for someone else&apos;s decision. Start recording your K-Note
        </p>
      </div>

      <div className="columns-1 gap-4 sm:columns-2 lg:columns-3">
        {mockNotes.map((note) => (
          <article
            key={note.id}
            className="mb-4 break-inside-avoid overflow-hidden rounded-3xl bg-white shadow transition hover:-translate-y-1"
            onClick={() => handleCardClick(note)}
          >
            <div className="relative h-64 w-full">
              <Image src={note.image} alt={note.title} fill className="object-cover" sizes="(min-width: 1024px) 33vw, 100vw" />
            </div>
            <div className="space-y-2 p-4">
              <p className="text-sm font-semibold text-gray-900">{note.title}</p>
              <div className="flex items-center gap-3 text-sm text-gray-600">
                <Image src={note.avatar} alt={note.author} width={32} height={32} className="h-8 w-8 rounded-full object-cover" />
                <div className="flex flex-1 items-center justify-between">
                  <span className="font-medium text-gray-900">{note.author}</span>
                  <div className="flex items-center gap-3 text-xs text-gray-500">
                    <span>❤️ {note.likes}</span>
                    <span>💬 {note.comments}</span>
                  </div>
                </div>
              </div>
            </div>
          </article>
        ))}
      </div>

      <KNoteDetailModal open={modalOpen} onClose={() => setModalOpen(false)} note={selectedNote} />
    </section>
  );
}
