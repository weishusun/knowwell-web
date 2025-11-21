'use client';

import Image from 'next/image';
import { useState } from 'react';

const tabs = ['All activities', 'My Collection'];

const activities = Array.from({ length: 6 }).map((_, idx) => ({
  id: idx + 1,
  title: 'Urban Talent Program',
  date: 'Dec 20-28, 2023',
  image: 'https://images.unsplash.com/photo-1467269204594-9661b134dd2b?auto=format&fit=crop&w=800&q=80',
}));

export default function KNoteActivityPage() {
  const [activeTab, setActiveTab] = useState(tabs[0]);

  return (
    <section className="space-y-6 pb-16">
      <div className="flex flex-wrap gap-3">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
              activeTab === tab
                ? 'bg-purple-600 text-white'
                : 'border border-purple-200 bg-white text-gray-700 hover:border-purple-400'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {activities.map((activity) => (
          <div key={activity.id} className="flex items-center gap-4 rounded-3xl bg-white p-4 shadow">
            <div className="relative h-24 w-36 overflow-hidden rounded-2xl">
              <Image src={activity.image} alt={activity.title} fill className="object-cover" />
            </div>
            <div className="flex-1 space-y-1">
              <p className="text-sm font-semibold text-gray-900">{activity.title}</p>
              <p className="text-xs text-gray-500">Supports comments on up to two pieces</p>
              <p className="text-xs text-gray-400">{activity.date}</p>
            </div>
            <div className="flex flex-col items-end gap-2 text-sm">
              <button className="rounded-full border border-gray-200 px-4 py-2 text-gray-700 hover:bg-gray-50">View details</button>
              <button className="text-yellow-500">★</button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
