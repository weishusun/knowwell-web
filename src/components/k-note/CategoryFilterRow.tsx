'use client';

import { useMemo } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

const categories = [
  'All',
  'Technology',
  'Education',
  'Travel',
  'Fashion',
  'Lifestyle',
  'Beauty',
  'Automobile',
  'Family & Kids'
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

    if (category === 'All') {
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
        const isActive = category === (selectedCategory || 'All');

        return (
          <button
            key={category}
            onClick={() => handleClick(category)}
            className={`rounded-full border px-4 py-2 text-sm font-semibold transition ${
              isActive
                ? 'border-brand-600 bg-brand-600 text-white shadow-card'
                : 'border-slate-200 bg-white text-slate-700 hover:border-brand-400 hover:text-brand-700'
            }`}
          >
            {category}
          </button>
        );
      })}
    </div>
  );
}
