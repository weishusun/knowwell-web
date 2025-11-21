import type { Metadata } from 'next';
import { CategoryPageTemplate } from '@/components/k-ranking/CategoryPageTemplate';
import { LatestRankingItem } from '@/components/k-ranking/LatestRankings';
import { PopularRankingItem } from '@/components/k-ranking/PopularRanking';

export const metadata: Metadata = {
  title: 'K-Ranking - Technology'
};

const latest: LatestRankingItem[] = [
  {
    title: 'This is the latest mobile Technology',
    description: 'Smartphones, tablets, and gadgets reshaping the way we work and play.',
    image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=1600&q=80',
    tag: 'Technology',
    time: '09:35 PM'
  },
  {
    title: 'This is the latest mobile Technology',
    description: 'Powerful laptops and sleek devices tuned for hybrid lifestyles.',
    image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1600&q=80',
    tag: 'Technology',
    time: '09:35 PM'
  },
  {
    title: 'This is the latest mobile Technology',
    description: 'Accessories and wearables making everyday tasks easier.',
    image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=1600&q=80',
    tag: 'Technology',
    time: '09:35 PM'
  },
  {
    title: 'This is the latest mobile Technology',
    description: 'Community-approved picks for performance and reliability.',
    image: 'https://images.unsplash.com/photo-1551033541-2075d8363c14?auto=format&fit=crop&w=1600&q=80',
    tag: 'Technology',
    time: '09:35 PM'
  }
];

const popular: PopularRankingItem[] = [
  {
    title: 'This is the latest mobile Technology',
    description: 'Top phones with premium displays and pro-level cameras.',
    image: 'https://images.unsplash.com/photo-1481277542470-605612bd2d61?auto=format&fit=crop&w=900&q=80',
    tag: 'Technology'
  },
  {
    title: 'This is the latest mobile Technology',
    description: 'Minimal setups and productivity gear getting rave reviews.',
    image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=900&q=80',
    tag: 'Technology'
  },
  {
    title: 'This is the latest mobile Technology',
    description: 'Laptops that balance portability with long battery life.',
    image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=900&q=80',
    tag: 'Technology'
  },
  {
    title: 'This is the latest mobile Technology',
    description: 'Desk accessories and audio gear elevating every workspace.',
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=900&q=80',
    tag: 'Technology'
  },
  {
    title: 'This is the latest mobile Technology',
    description: 'Hybrid work companions built for travel and comfort.',
    image: 'https://images.unsplash.com/photo-1472220625704-91e1462799b2?auto=format&fit=crop&w=900&q=80',
    tag: 'Technology'
  }
];

export default function TechnologyPage() {
  return (
    <CategoryPageTemplate
      slug="technology"
      title="Technology"
      subtitle="Smartphones, Tablets, Gadgets"
      heroImage="https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1920&q=80"
      latest={latest}
      popular={popular}
    />
  );
}
