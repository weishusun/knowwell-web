'use client';

import { useMemo } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

const categories = [
  { key: 'Technology', icon: '💻' },
  { key: 'Travel', icon: '✈️' },
  { key: 'Finance', icon: '💰' },
  { key: 'Health', icon: '🩺' },
  { key: 'Lifestyle', icon: '🌿' },
  { key: 'Education', icon: '🎓' },
  { key: 'Business', icon: '🏢' },
  { key: 'Sports', icon: '🏅' }
];

interface CategoryFilterRowProps {
  selectedCategory?: string;
}

export default function CategoryFilterRow({ selectedCategory }: CategoryFilterRowProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const currentParams = useMemo(() => new URLSearchParams(searchParams.toString()), [searchParams]);

  const handleClick = (category: string) => {
    const params = new URLSearchParams(currentParams);

    if (category === selectedCategory) {
      params.delete('category');
    } else {
      params.set('category', category);
    }

    const queryString = params.toString();
    router.push(queryString ? `${pathname}?${queryString}` : pathname);
  };

  return (
    <div className="flex flex-wrap gap-3">
      {categories.map((category) => {
        const isActive = selectedCategory === category.key;
        return (
          <button
            key={category.key}
            onClick={() => handleClick(category.key)}
            className={`flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold transition ${
              isActive
                ? 'bg-purple-600 text-white shadow'
                : 'border border-purple-200 bg-white text-slate-700 hover:border-purple-400'
            }`}
          >
            <span>{category.icon}</span>
            <span>{category.key}</span>
          </button>
        );
      })}
    </div>
  );
}
