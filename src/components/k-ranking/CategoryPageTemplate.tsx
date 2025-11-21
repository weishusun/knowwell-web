import { HeroSection } from './HeroSection';
import { CategoryNav } from './CategoryNav';
import { LatestRankingItem, LatestRankings } from './LatestRankings';
import { PopularRanking, PopularRankingItem } from './PopularRanking';

interface CategoryPageTemplateProps {
  slug: string;
  title: string;
  subtitle: string;
  heroImage: string;
  latest: LatestRankingItem[];
  popular: PopularRankingItem[];
}

export function CategoryPageTemplate({ slug, title, subtitle, heroImage, latest, popular }: CategoryPageTemplateProps) {
  return (
    <div className="min-h-screen bg-white text-slate-900">
      <HeroSection title={title} subtitle={subtitle} image={heroImage} />
      <CategoryNav activeSlug={slug} />
      <LatestRankings items={latest} categoryLabel={title} />
      <PopularRanking items={popular} categoryLabel={title} />
    </div>
  );
}
