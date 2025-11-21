import type { Metadata } from 'next';
import { CategoryPageTemplate } from '@/components/k-ranking/CategoryPageTemplate';
import { LatestRankingItem } from '@/components/k-ranking/LatestRankings';
import { PopularRankingItem } from '@/components/k-ranking/PopularRanking';

export const metadata: Metadata = {
  title: 'K-Ranking - Beauty & Skincare'
};

const latest: LatestRankingItem[] = [
  {
    title: 'This is the latest mobile Beauty & Skincare',
    description: 'Serums, creams, and treatments delivering glow-worthy results.',
    image: 'https://images.unsplash.com/photo-1506617420156-8e4536971650?auto=format&fit=crop&w=1600&q=80',
    tag: 'Beauty & Skincare',
    time: '09:35 PM'
  },
  {
    title: 'This is the latest mobile Beauty & Skincare',
    description: 'Clean formulations and essentials made for every routine.',
    image: 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=1600&q=80',
    tag: 'Beauty & Skincare',
    time: '09:35 PM'
  },
  {
    title: 'This is the latest mobile Beauty & Skincare',
    description: 'Body care and wellness products that pamper from head to toe.',
    image: 'https://images.unsplash.com/photo-1523419400524-fd0e4a58a6ca?auto=format&fit=crop&w=1600&q=80',
    tag: 'Beauty & Skincare',
    time: '09:35 PM'
  },
  {
    title: 'This is the latest mobile Beauty & Skincare',
    description: 'Community-approved picks for healthy hair and radiant skin.',
    image: 'https://images.unsplash.com/photo-1612810432611-160752237575?auto=format&fit=crop&w=1600&q=80',
    tag: 'Beauty & Skincare',
    time: '09:35 PM'
  }
];

const popular: PopularRankingItem[] = [
  {
    title: 'This is the latest mobile Beauty & Skincare',
    description: 'Hydrating heroes and brightening serums loved by all skin types.',
    image: 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=900&q=80',
    tag: 'Beauty & Skincare'
  },
  {
    title: 'This is the latest mobile Beauty & Skincare',
    description: 'Luxurious bath and body picks for spa-like moments at home.',
    image: 'https://images.unsplash.com/photo-1506617420156-8e4536971650?auto=format&fit=crop&w=900&q=80',
    tag: 'Beauty & Skincare'
  },
  {
    title: 'This is the latest mobile Beauty & Skincare',
    description: 'Makeup must-haves and complexion perfectors.',
    image: 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=900&q=80',
    tag: 'Beauty & Skincare'
  },
  {
    title: 'This is the latest mobile Beauty & Skincare',
    description: 'Gentle cleansers and daily essentials for every routine.',
    image: 'https://images.unsplash.com/photo-1506617420156-8e4536971650?auto=format&fit=crop&w=900&q=80',
    tag: 'Beauty & Skincare'
  },
  {
    title: 'This is the latest mobile Beauty & Skincare',
    description: 'Glow kits and targeted treatments people keep repurchasing.',
    image: 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=900&q=80',
    tag: 'Beauty & Skincare'
  }
];

export default function BeautyPage() {
  return (
    <CategoryPageTemplate
      slug="beauty"
      title="Beauty & Skincare"
      subtitle="Cosmetics, Personal Care"
      heroImage="https://images.unsplash.com/photo-1506617420156-8e4536971650?auto=format&fit=crop&w=1920&q=80"
      latest={latest}
      popular={popular}
    />
  );
}
