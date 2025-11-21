import type { Metadata } from 'next';
import { CategoryPageTemplate } from '@/components/k-ranking/CategoryPageTemplate';
import { LatestRankingItem } from '@/components/k-ranking/LatestRankings';
import { PopularRankingItem } from '@/components/k-ranking/PopularRanking';

export const metadata: Metadata = {
  title: 'K-Ranking - Family & Kids'
};

const latest: LatestRankingItem[] = [
  {
    title: 'This is the latest mobile Family & Kids',
    description: 'Baby gear, toddler essentials, and parenting picks parents trust.',
    image: 'https://images.unsplash.com/photo-1511895426328-dc8714191300?auto=format&fit=crop&w=1600&q=80',
    tag: 'Family & Kids',
    time: '09:35 PM'
  },
  {
    title: 'This is the latest mobile Family & Kids',
    description: 'Playful activities and learning tools for curious kids.',
    image: 'https://images.unsplash.com/photo-1511895426328-dc8714191300?auto=format&fit=crop&w=1600&q=80',
    tag: 'Family & Kids',
    time: '09:35 PM'
  },
  {
    title: 'This is the latest mobile Family & Kids',
    description: 'Travel helpers that make family trips smooth and fun.',
    image: 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1600&q=80',
    tag: 'Family & Kids',
    time: '09:35 PM'
  },
  {
    title: 'This is the latest mobile Family & Kids',
    description: 'Comfortable apparel and cozy picks for every season.',
    image: 'https://images.unsplash.com/photo-1511895426328-dc8714191300?auto=format&fit=crop&w=1600&q=80',
    tag: 'Family & Kids',
    time: '09:35 PM'
  }
];

const popular: PopularRankingItem[] = [
  {
    title: 'This is the latest mobile Family & Kids',
    description: 'Strollers, carriers, and everyday helpers.',
    image: 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=900&q=80',
    tag: 'Family & Kids'
  },
  {
    title: 'This is the latest mobile Family & Kids',
    description: 'Learning toys and books that inspire creativity.',
    image: 'https://images.unsplash.com/photo-1511895426328-dc8714191300?auto=format&fit=crop&w=900&q=80',
    tag: 'Family & Kids'
  },
  {
    title: 'This is the latest mobile Family & Kids',
    description: 'Cozy bedding, decor, and essentials for kids\' rooms.',
    image: 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=900&q=80',
    tag: 'Family & Kids'
  },
  {
    title: 'This is the latest mobile Family & Kids',
    description: 'On-the-go snack solutions and lunch gear.',
    image: 'https://images.unsplash.com/photo-1458071103672-6e5b1f301f9c?auto=format&fit=crop&w=900&q=80',
    tag: 'Family & Kids'
  },
  {
    title: 'This is the latest mobile Family & Kids',
    description: 'Outdoor toys and weekend adventures for the whole family.',
    image: 'https://images.unsplash.com/photo-1521056787327-165dc2a32817?auto=format&fit=crop&w=900&q=80',
    tag: 'Family & Kids'
  }
];

export default function FamilyKidsPage() {
  return (
    <CategoryPageTemplate
      slug="family-kids"
      title="Family & Kids"
      subtitle="Family, Kids"
      heroImage="https://images.unsplash.com/photo-1511895426328-dc8714191300?auto=format&fit=crop&w=1920&q=80"
      latest={latest}
      popular={popular}
    />
  );
}
