import type { Metadata } from 'next';
import { CategoryPageTemplate } from '@/components/k-ranking/CategoryPageTemplate';
import { LatestRankingItem } from '@/components/k-ranking/LatestRankings';
import { PopularRankingItem } from '@/components/k-ranking/PopularRanking';

export const metadata: Metadata = {
  title: 'K-Ranking - Travel'
};

const latest: LatestRankingItem[] = [
  {
    title: 'This is the latest mobile Travel',
    description: 'Sunny getaways, scenic drives, and city escapes people love.',
    image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1600&q=80',
    tag: 'Travel',
    time: '09:35 PM'
  },
  {
    title: 'This is the latest mobile Travel',
    description: 'Coastal journeys and road trips tailor-made for adventure.',
    image: 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1600&q=80',
    tag: 'Travel',
    time: '09:35 PM'
  },
  {
    title: 'This is the latest mobile Travel',
    description: 'Favorite city breaks packed with food, arts, and nightlife.',
    image: 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1600&q=80',
    tag: 'Travel',
    time: '09:35 PM'
  },
  {
    title: 'This is the latest mobile Travel',
    description: 'Family-ready itineraries with memorable stops along the way.',
    image: 'https://images.unsplash.com/photo-1504439904031-93ded9f93e3c?auto=format&fit=crop&w=1600&q=80',
    tag: 'Travel',
    time: '09:35 PM'
  }
];

const popular: PopularRankingItem[] = [
  {
    title: 'This is the latest mobile Travel',
    description: 'Seaside retreats and beach escapes trending right now.',
    image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=900&q=80',
    tag: 'Travel'
  },
  {
    title: 'This is the latest mobile Travel',
    description: 'Iconic skylines and downtown adventures to bookmark.',
    image: 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=900&q=80',
    tag: 'Travel'
  },
  {
    title: 'This is the latest mobile Travel',
    description: 'Lakeside drives and mountainside hikes for nature lovers.',
    image: 'https://images.unsplash.com/photo-1433838552652-f9a46b332c40?auto=format&fit=crop&w=900&q=80',
    tag: 'Travel'
  },
  {
    title: 'This is the latest mobile Travel',
    description: 'City-to-coast journeys perfect for long weekends.',
    image: 'https://images.unsplash.com/photo-1526057565006-20beab8f84bb?auto=format&fit=crop&w=900&q=80',
    tag: 'Travel'
  },
  {
    title: 'This is the latest mobile Travel',
    description: 'Destinations pairing culture, food, and unforgettable views.',
    image: 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&w=900&q=80',
    tag: 'Travel'
  }
];

export default function TravelPage() {
  return (
    <CategoryPageTemplate
      slug="travel"
      title="Travel"
      subtitle="Destinations, Hotels, Attractions"
      heroImage="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1920&q=80"
      latest={latest}
      popular={popular}
    />
  );
}
