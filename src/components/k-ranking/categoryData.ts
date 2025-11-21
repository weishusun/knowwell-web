export type KRankingCategory = {
  slug: string;
  label: string;
  path: string;
  icon: string;
  image: string;
};

export const kRankingCategories: KRankingCategory[] = [
  {
    slug: 'education',
    label: 'Education',
    path: '/k-ranking/education',
    icon: '🎓',
    image: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&w=600&q=80'
  },
  {
    slug: 'travel',
    label: 'Travel',
    path: '/k-ranking/travel',
    icon: '🧳',
    image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=600&q=80'
  },
  {
    slug: 'technology',
    label: 'Technology',
    path: '/k-ranking/technology',
    icon: '💻',
    image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=600&q=80'
  },
  {
    slug: 'fashion',
    label: 'Fashion',
    path: '/k-ranking/fashion',
    icon: '👗',
    image: 'https://images.unsplash.com/photo-1445205170230-053b83016050?auto=format&fit=crop&w=600&q=80'
  },
  {
    slug: 'lifestyle',
    label: 'Lifestyle',
    path: '/k-ranking/lifestyle',
    icon: '🏃',
    image: 'https://images.unsplash.com/photo-1518611012118-696072aa579a?auto=format&fit=crop&w=600&q=80'
  },
  {
    slug: 'beauty',
    label: 'Beauty & Skincare',
    path: '/k-ranking/beauty',
    icon: '💄',
    image: 'https://images.unsplash.com/photo-1506617420156-8e4536971650?auto=format&fit=crop&w=600&q=80'
  },
  {
    slug: 'automobile',
    label: 'Automobile',
    path: '/k-ranking/automobile',
    icon: '🚗',
    image: 'https://images.unsplash.com/photo-1503736334956-4c8f8e92946d?auto=format&fit=crop&w=600&q=80'
  },
  {
    slug: 'family-kids',
    label: 'Family & Kids',
    path: '/k-ranking/family-kids',
    icon: '👨‍👩‍👧',
    image: 'https://images.unsplash.com/photo-1511895426328-dc8714191300?auto=format&fit=crop&w=600&q=80'
  }
];
