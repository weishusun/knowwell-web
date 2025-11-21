import type { Metadata } from 'next';
import { CategoryPageTemplate } from '@/components/k-ranking/CategoryPageTemplate';
import { LatestRankingItem } from '@/components/k-ranking/LatestRankings';
import { PopularRankingItem } from '@/components/k-ranking/PopularRanking';

export const metadata: Metadata = {
  title: 'K-Ranking - Fashion'
};

const latest: LatestRankingItem[] = [
  {
    title: 'This is the latest mobile Fashion',
    description: 'Runway-inspired looks and street-ready outfits everyone is wearing.',
    image: 'https://images.unsplash.com/photo-1445205170230-053b83016050?auto=format&fit=crop&w=1600&q=80',
    tag: 'Fashion',
    time: '09:35 PM'
  },
  {
    title: 'This is the latest mobile Fashion',
    description: 'Sneakers, accessories, and statement pieces topping the charts.',
    image: 'https://images.unsplash.com/photo-1542293779-8b5631d929d0?auto=format&fit=crop&w=1600&q=80',
    tag: 'Fashion',
    time: '09:35 PM'
  },
  {
    title: 'This is the latest mobile Fashion',
    description: 'Timeless essentials paired with emerging designer drops.',
    image: 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=1600&q=80',
    tag: 'Fashion',
    time: '09:35 PM'
  },
  {
    title: 'This is the latest mobile Fashion',
    description: 'Bold colors, modern tailoring, and versatile layers.',
    image: 'https://images.unsplash.com/photo-1503342296413-28a6ec3763e6?auto=format&fit=crop&w=1600&q=80',
    tag: 'Fashion',
    time: '09:35 PM'
  }
];

const popular: PopularRankingItem[] = [
  {
    title: 'This is the latest mobile Fashion',
    description: 'Streetwear staples defining the season.',
    image: 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=900&q=80',
    tag: 'Fashion'
  },
  {
    title: 'This is the latest mobile Fashion',
    description: 'Curated edits of accessories to elevate every look.',
    image: 'https://images.unsplash.com/photo-1445205170230-053b83016050?auto=format&fit=crop&w=900&q=80',
    tag: 'Fashion'
  },
  {
    title: 'This is the latest mobile Fashion',
    description: 'Designer highlights and standout silhouettes.',
    image: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=900&q=80',
    tag: 'Fashion'
  },
  {
    title: 'This is the latest mobile Fashion',
    description: 'Wardrobe basics built to last across seasons.',
    image: 'https://images.unsplash.com/photo-1445205170230-053b83016050?auto=format&fit=crop&w=900&q=80',
    tag: 'Fashion'
  },
  {
    title: 'This is the latest mobile Fashion',
    description: 'Fresh drops the community can\'t stop talking about.',
    image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=900&q=80',
    tag: 'Fashion'
  }
];

export default function FashionPage() {
  return (
    <CategoryPageTemplate
      slug="fashion"
      title="Fashion"
      subtitle="Clothing, Sneakers, Accessories"
      heroImage="https://images.unsplash.com/photo-1445205170230-053b83016050?auto=format&fit=crop&w=1920&q=80"
      latest={latest}
      popular={popular}
    />
  );
}
