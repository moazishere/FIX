import { setRequestLocale } from 'next-intl/server';
import { parseFilters } from '@/lib/filters';
import { HeroCarousel } from '@/components/home/HeroCarousel';
import { BenefitsStrip } from '@/components/home/BenefitsStrip';
import { CategoryTiles } from '@/components/home/CategoryTiles';
import { BrandStrip } from '@/components/home/BrandStrip';
import { PromoBento } from '@/components/home/PromoBento';
import { DealsSection } from '@/components/home/DealsSection';
import { NewArrivals } from '@/components/home/NewArrivals';
import { Trending } from '@/components/home/Trending';
import { RecentlyViewed } from '@/components/home/RecentlyViewed';
import { Reviews } from '@/components/home/Reviews';
import { BuyingGuides } from '@/components/home/BuyingGuides';
import { ProductsSection } from '@/components/product/ProductsSection';

type Props = {
  params: Promise<{ locale: string }>;
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

export default async function HomePage({ params, searchParams }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  // Filters, sort and page live in the URL, so every shop view is a shareable, server-rendered link.
  const filters = parseFilters(await searchParams);

  return (
    <>
      <HeroCarousel />
      <BenefitsStrip />
      <CategoryTiles />
      <BrandStrip />
      <PromoBento />
      <DealsSection />
      <ProductsSection filters={filters} />
      <NewArrivals />
      <Trending />
      <RecentlyViewed />
      <Reviews />
      <BuyingGuides />
    </>
  );
}
