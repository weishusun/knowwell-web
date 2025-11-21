'use client';

import Image from 'next/image';
import { useState } from 'react';

const tabs = [
  { label: 'Comments and @', badge: 0 },
  { label: 'Praise and Collection', badge: 2 },
  { label: 'Add attention', badge: 1 },
];

const messages = [
  {
    id: 1,
    name: 'Little sweet potato E67540',
    avatar: 'https://images.unsplash.com/photo-1544723795-3fb6469f5b39?auto=format&fit=crop&w=200&q=80',
    snippet: 'Your comment has been deleted',
    date: 'Jan 14',
    preview:
      'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=400&q=80',
  },
  {
    id: 2,
    name: 'Chunyuwan Shop',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=200&q=80',
    snippet: 'Nice sharing!',
    date: 'Jan 12',
    preview: 'https://images.unsplash.com/photo-1503602642458-232111445657?auto=format&fit=crop&w=400&q=80',
  },
];

export default function KNoteMessagesPage() {
  const [activeTab, setActiveTab] = useState(tabs[0].label);

  return (
    <section className="space-y-6 pb-16">
      <div className="flex flex-wrap gap-3">
        {tabs.map((tab) => (
          <button
            key={tab.label}
            onClick={() => setActiveTab(tab.label)}
            className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
              activeTab === tab.label
                ? 'bg-purple-600 text-white'
                : 'border border-purple-200 bg-white text-gray-700 hover:border-purple-400'
            }`}
          >
            {tab.label}
            {tab.badge > 0 && <span className="ml-2 rounded-full bg-red-500 px-2 py-0.5 text-xs text-white">{tab.badge}</span>}
          </button>
        ))}
      </div>

      <div className="space-y-4">
        {messages.map((message) => (
          <div key={message.id} className="flex items-center gap-4 rounded-3xl bg-white p-4 shadow">
            <Image src={message.avatar} alt={message.name} width={56} height={56} className="h-14 w-14 rounded-full object-cover" />
            <div className="flex-1">
              <p className="text-sm font-semibold text-gray-900">{message.name}</p>
              <p className="text-sm text-gray-600">{message.snippet}</p>
              <p className="text-xs text-gray-400">This comment has been deleted</p>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-sm text-gray-500">{message.date}</span>
              <div className="relative h-16 w-16 overflow-hidden rounded-xl">
                <Image src={message.preview} alt="Preview" fill className="object-cover" />
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="text-center text-sm font-semibold text-purple-700">View more historical messages</div>
    </section>
  );
}
