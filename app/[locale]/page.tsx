import { setRequestLocale } from 'next-intl/server';
import { HeroCarousel } from '@/components/home/HeroCarousel';
import { BenefitsStrip } from '@/components/home/BenefitsStrip';
import { CategoryTiles } from '@/components/home/CategoryTiles';
import { BrandStrip } from '@/components/home/BrandStrip';
import { PromoBento } from '@/components/home/PromoBento';
import { DealsSection } from '@/components/home/DealsSection';
import { BestSellers } from '@/components/home/BestSellers';
import { NewArrivals } from '@/components/home/NewArrivals';
import { Trending } from '@/components/home/Trending';
import { RecentlyViewed } from '@/components/home/RecentlyViewed';
import { Reviews } from '@/components/home/Reviews';
import { BuyingGuides } from '@/components/home/BuyingGuides';

type Props = { params: Promise<{ locale: string }> };

export default async function HomePage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <HeroCarousel />
      <BenefitsStrip />
      <CategoryTiles />
      <BrandStrip />
      <PromoBento />
      <DealsSection />
      <BestSellers />
      <NewArrivals />
      <Trending />
      <RecentlyViewed />
      <Reviews />
      <BuyingGuides />
    </>
  );
}
