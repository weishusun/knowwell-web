import type { Metadata } from 'next';
import { CategoryPageTemplate } from '@/components/k-ranking/CategoryPageTemplate';
import { LatestRankingItem } from '@/components/k-ranking/LatestRankings';
import { PopularRankingItem } from '@/components/k-ranking/PopularRanking';

export const metadata: Metadata = {
  title: 'K-Ranking - Education'
};

const latest: LatestRankingItem[] = [
  {
    title: "China's modern landscape, Beijing blends imperial heritage with modern innovation.",
    description: 'Historic temples, bustling hutongs, and cutting-edge districts show the city\'s dual spirit.',
    image: 'https://images.unsplash.com/photo-1505764706515-aa95265c5abc?auto=format&fit=crop&w=1600&q=80',
    tag: 'Education',
    time: '09:35 PM'
  },
  {
    title: 'PKU is both a historical landmark and a living legacy of thought leadership.',
    description: 'PKU fosters interdisciplinary collaboration, guided by its Global Excellence Strategy.',
    image: 'https://images.unsplash.com/photo-1523580846011-d3a5bc25702b?auto=format&fit=crop&w=1600&q=80',
    tag: 'Education',
    time: '09:35 PM'
  },
  {
    title: 'The Global Commerce University chain spans the globe.',
    description: 'With campuses that feel like innovation ecosystems, students build cross-border expertise.',
    image: 'https://images.unsplash.com/photo-1489515217757-5fd1be406fef?auto=format&fit=crop&w=1600&q=80',
    tag: 'Education',
    time: '09:35 PM'
  },
  {
    title: 'Nanyang Technological University is Smart Campus vision.',
    description: 'NTU redefines what a modern campus can look like and delivers hands-on learning.',
    image: 'https://images.unsplash.com/photo-1489515217757-5fd1be406fef?auto=format&fit=crop&w=1600&q=80',
    tag: 'Education',
    time: '09:35 PM'
  }
];

const popular: PopularRankingItem[] = [
  {
    title: 'The University of Science & Technology of China',
    description: 'Renowned for research breakthroughs and collaborative labs.',
    image: 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&w=900&q=80',
    tag: 'Education'
  },
  {
    title: 'The University of Hong Kong (HKU)',
    description: 'A global perspective rooted in academic rigor and community.',
    image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=900&q=80',
    tag: 'Education'
  },
  {
    title: 'Fudan University',
    description: 'Historic campus with strong liberal arts and sciences programs.',
    image: 'https://images.unsplash.com/photo-1523580846011-d3a5bc25702b?auto=format&fit=crop&w=900&q=80',
    tag: 'Education'
  },
  {
    title: 'The Chinese University of Hong Kong (CUHK)',
    description: 'Picturesque grounds paired with top-tier faculty.',
    image: 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=900&q=80',
    tag: 'Education'
  },
  {
    title: 'The University of Hong Kong (HKU)',
    description: 'Leading programs and international partnerships on a vibrant campus.',
    image: 'https://images.unsplash.com/photo-1523580846011-d3a5bc25702b?auto=format&fit=crop&w=900&q=80',
    tag: 'Education'
  }
];

export default function EducationPage() {
  return (
    <CategoryPageTemplate
      slug="education"
      title="Education"
      subtitle="Schools, Universities, Programs"
      heroImage="https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&w=1920&q=80"
      latest={latest}
      popular={popular}
    />
  );
}
