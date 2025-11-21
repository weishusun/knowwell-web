import type { Metadata } from 'next';
import { CategoryPageTemplate } from '@/components/k-ranking/CategoryPageTemplate';
import { LatestRankingItem } from '@/components/k-ranking/LatestRankings';
import { PopularRankingItem } from '@/components/k-ranking/PopularRanking';

export const metadata: Metadata = {
  title: 'K-Ranking - Automobile'
};

const latest: LatestRankingItem[] = [
  {
    title: 'This is the latest mobile Automobile',
    description: 'Electric sedans, SUVs, and concept cars redefining the road experience.',
    image: 'https://images.unsplash.com/photo-1503736334956-4c8f8e92946d?auto=format&fit=crop&w=1600&q=80',
    tag: 'Automobile',
    time: '09:35 PM'
  },
  {
    title: 'This is the latest mobile Automobile',
    description: 'Sleek interiors and high-tech dashboards winning over drivers.',
    image: 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&w=1600&q=80',
    tag: 'Automobile',
    time: '09:35 PM'
  },
  {
    title: 'This is the latest mobile Automobile',
    description: 'EV favorites and hybrid picks the community is loving right now.',
    image: 'https://images.unsplash.com/photo-1503736334956-4c8f8e92946d?auto=format&fit=crop&w=1600&q=80',
    tag: 'Automobile',
    time: '09:35 PM'
  },
  {
    title: 'This is the latest mobile Automobile',
    description: 'Head-turning coupes and crossovers built for modern city life.',
    image: 'https://images.unsplash.com/photo-1525609004556-c46c7d6cf023?auto=format&fit=crop&w=1600&q=80',
    tag: 'Automobile',
    time: '09:35 PM'
  }
];

const popular: PopularRankingItem[] = [
  {
    title: 'This is the latest mobile Automobile',
    description: 'Smart EVs with futuristic cabins and quick charging support.',
    image: 'https://images.unsplash.com/photo-1503736334956-4c8f8e92946d?auto=format&fit=crop&w=900&q=80',
    tag: 'Automobile'
  },
  {
    title: 'This is the latest mobile Automobile',
    description: 'Luxury rides combining performance, comfort, and bold design.',
    image: 'https://images.unsplash.com/photo-1503736334956-4c8f8e92946d?auto=format&fit=crop&w=1200&q=80',
    tag: 'Automobile'
  },
  {
    title: 'This is the latest mobile Automobile',
    description: 'Daily drivers and family cars praised for reliability.',
    image: 'https://images.unsplash.com/photo-1493238792000-8113da705763?auto=format&fit=crop&w=900&q=80',
    tag: 'Automobile'
  },
  {
    title: 'This is the latest mobile Automobile',
    description: 'Crossover and SUV picks that balance space with style.',
    image: 'https://images.unsplash.com/photo-1503736334956-4c8f8e92946d?auto=format&fit=crop&w=800&q=80',
    tag: 'Automobile'
  },
  {
    title: 'This is the latest mobile Automobile',
    description: 'Sporty silhouettes and smooth rides for weekend escapes.',
    image: 'https://images.unsplash.com/photo-1489515217757-5fd1be406fef?auto=format&fit=crop&w=900&q=80',
    tag: 'Automobile'
  }
];

export default function AutomobilePage() {
  return (
    <CategoryPageTemplate
      slug="automobile"
      title="Automobile"
      subtitle="Cars, EVs, smart mobility"
      heroImage="https://images.unsplash.com/photo-1503736334956-4c8f8e92946d?auto=format&fit=crop&w=1920&q=80"
      latest={latest}
      popular={popular}
    />
  );
}
