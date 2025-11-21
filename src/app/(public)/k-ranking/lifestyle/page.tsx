import type { Metadata } from 'next';
import { CategoryPageTemplate } from '@/components/k-ranking/CategoryPageTemplate';
import { LatestRankingItem } from '@/components/k-ranking/LatestRankings';
import { PopularRankingItem } from '@/components/k-ranking/PopularRanking';

export const metadata: Metadata = {
  title: 'K-Ranking - Lifestyle'
};

const latest: LatestRankingItem[] = [
  {
    title: 'This is the latest mobile Lifestyle',
    description: 'Fitness routines, wellness picks, and mindful habits trending now.',
    image: 'https://images.unsplash.com/photo-1518611012118-696072aa579a?auto=format&fit=crop&w=1600&q=80',
    tag: 'Lifestyle',
    time: '09:35 PM'
  },
  {
    title: 'This is the latest mobile Lifestyle',
    description: 'Healthy recipes, functional foods, and meal-prep favorites.',
    image: 'https://images.unsplash.com/photo-1467003909585-2f8a72700288?auto=format&fit=crop&w=1600&q=80',
    tag: 'Lifestyle',
    time: '09:35 PM'
  },
  {
    title: 'This is the latest mobile Lifestyle',
    description: 'Community-approved gear for workouts and recovery.',
    image: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=1600&q=80',
    tag: 'Lifestyle',
    time: '09:35 PM'
  },
  {
    title: 'This is the latest mobile Lifestyle',
    description: 'Simple rituals for balance at home, on-the-go, and at work.',
    image: 'https://images.unsplash.com/photo-1458642849426-cfb724f15ef7?auto=format&fit=crop&w=1600&q=80',
    tag: 'Lifestyle',
    time: '09:35 PM'
  }
];

const popular: PopularRankingItem[] = [
  {
    title: 'This is the latest mobile Lifestyle',
    description: 'Smoothies, snacks, and supplements people reach for daily.',
    image: 'https://images.unsplash.com/photo-1458642849426-cfb724f15ef7?auto=format&fit=crop&w=900&q=80',
    tag: 'Lifestyle'
  },
  {
    title: 'This is the latest mobile Lifestyle',
    description: 'Gym bags, trackers, and supportive footwear for every workout.',
    image: 'https://images.unsplash.com/photo-1518611012118-696072aa579a?auto=format&fit=crop&w=900&q=80',
    tag: 'Lifestyle'
  },
  {
    title: 'This is the latest mobile Lifestyle',
    description: 'At-home wellness essentials to create a calming space.',
    image: 'https://images.unsplash.com/photo-1519710164239-da123dc03ef4?auto=format&fit=crop&w=900&q=80',
    tag: 'Lifestyle'
  },
  {
    title: 'This is the latest mobile Lifestyle',
    description: 'Outdoor adventures, sports, and weekend activities to try.',
    image: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=900&q=80',
    tag: 'Lifestyle'
  },
  {
    title: 'This is the latest mobile Lifestyle',
    description: 'Functional drinkware, mats, and mindful living picks.',
    image: 'https://images.unsplash.com/photo-1458642849426-cfb724f15ef7?auto=format&fit=crop&w=900&q=80',
    tag: 'Lifestyle'
  }
];

export default function LifestylePage() {
  return (
    <CategoryPageTemplate
      slug="lifestyle"
      title="Lifestyle"
      subtitle="Food, Fitness, Wellness"
      heroImage="https://images.unsplash.com/photo-1518611012118-696072aa579a?auto=format&fit=crop&w=1920&q=80"
      latest={latest}
      popular={popular}
    />
  );
}
