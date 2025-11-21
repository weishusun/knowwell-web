'use client';

import { useState } from 'react';

const tabs = ['All', 'Published', 'In review', 'Failed'];

export default function KNoteManagePage() {
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

      <div className="flex flex-col items-center justify-center gap-3 rounded-3xl bg-white p-12 text-center shadow">
        <div className="flex h-20 w-20 items-center justify-center rounded-full bg-purple-50 text-purple-600">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="h-10 w-10" fill="currentColor">
            <path d="M10 12a5 5 0 0 1 5-5 5.006 5.006 0 0 1 5 5v6H10Zm-7 3h5v-3a3 3 0 0 1 3-3h1a7 7 0 0 0-7 7Z" />
          </svg>
        </div>
        <p className="text-lg font-semibold text-gray-900">No relevant notes found</p>
      </div>
    </section>
  );
}
