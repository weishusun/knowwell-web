'use client';

import Image from 'next/image';
import { useState } from 'react';

const tabs = ['note', 'favourite', 'likes'];

export default function KNoteMePage() {
  const [activeTab, setActiveTab] = useState(tabs[0]);
  const user = {
    name: 'Yana Fang',
    id: 'YanaFang2745254831',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=300&q=80',
    tags: ['23', 'USA', 'Designer'],
    stats: {
      following: 33,
      followers: 5,
      likes: 52,
    },
  };

  return (
    <section className="space-y-8 pb-16">
      <div className="rounded-3xl bg-white p-8 shadow">
        <div className="flex flex-col items-center gap-4 text-center">
          <div className="relative h-24 w-24 overflow-hidden rounded-full">
            <Image src={user.avatar} alt={user.name} fill className="object-cover" />
          </div>
          <div>
            <p className="text-xl font-semibold text-gray-900">{user.name}</p>
            <p className="text-sm text-gray-500">{user.id}</p>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-2 text-xs text-gray-700">
            {user.tags.map((tag) => (
              <span key={tag} className="rounded-full bg-gray-100 px-3 py-1">
                {tag}
              </span>
            ))}
          </div>
          <div className="flex items-center gap-6 text-sm font-semibold text-gray-900">
            <span>
              <strong className="mr-1 text-purple-700">{user.stats.following}</strong>
              Following
            </span>
            <span>
              <strong className="mr-1 text-purple-700">{user.stats.followers}</strong>
              Followers
            </span>
            <span>
              <strong className="mr-1 text-purple-700">{user.stats.likes}</strong>
              Likes & favourite
            </span>
          </div>
        </div>

        <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`rounded-full px-4 py-2 text-sm font-semibold capitalize transition ${
                activeTab === tab
                  ? 'bg-purple-600 text-white'
                  : 'border border-purple-200 bg-white text-gray-700 hover:border-purple-400'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      <div className="flex flex-col items-center justify-center gap-4 rounded-3xl bg-white p-12 text-center shadow">
        <div className="flex h-24 w-24 items-center justify-center rounded-full bg-purple-50 text-purple-600">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="h-12 w-12" fill="currentColor">
            <path d="M12 12a5 5 0 1 1 5-5 5.006 5.006 0 0 1-5 5Zm0-8a3 3 0 1 0 3 3 3 3 0 0 0-3-3Zm4 9a1 1 0 0 0-1 1 3 3 0 1 1-6 0 1 1 0 0 0-2 0 5 5 0 1 0 10 0 1 1 0 0 0-1-1Z" />
          </svg>
        </div>
        <p className="text-lg font-semibold text-gray-900">You haven&apos;t posted any content yet</p>
        <p className="text-sm text-gray-600">Start recording your K-Note</p>
      </div>
    </section>
  );
}
