import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { hasLocale } from 'next-intl';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { routing } from '@/i18n/routing';
import { parseFilters } from '@/lib/filters';
import { ProductListing } from '@/components/product/ProductListing';
import { RecentlyViewed } from '@/components/home/RecentlyViewed';

type Props = {
  params: Promise<{ locale: string }>;
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

export async function generateMetadata({ params, searchParams }: Props): Promise<Metadata> {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) return {};
  const [t, tg] = await Promise.all([
    getTranslations({ locale, namespace: 'shop' }),
    getTranslations({ locale, namespace: 'grid' }),
  ]);
  const { q } = parseFilters(await searchParams);
  return {
    title: tg('allProducts'),
    description: t('description'),
    // Every filter/sort/page combination is a different view of the same catalogue: index the plain
    // listing, and keep free-text searches out of search engines.
    alternates: { canonical: `/${locale}/products`, languages: Object.fromEntries(routing.locales.map((l) => [l, `/${l}/products`])) },
    robots: q ? { index: false, follow: true } : undefined,
  };
}

export default async function ProductsPage({ params, searchParams }: Props) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();
  setRequestLocale(locale);
  const filters = parseFilters(await searchParams);

  return (
    <>
      <div className="container shop">
        <ProductListing filters={filters} />
      </div>
      <RecentlyViewed />
    </>
  );
}
