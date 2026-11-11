import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { hasLocale } from 'next-intl';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { routing } from '@/i18n/routing';
import { Link } from '@/i18n/navigation';
import { discount, getAllProducts, getProductBySlug, onePerLine, type Locale, type Product } from '@/lib/catalog';
import { getContent } from '@/lib/product-content';
import { filterHref } from '@/lib/filters';
import { FREE_SHIPPING_USD } from '@/lib/money';
import { Icon } from '@/components/ui/Icon';
import { Money } from '@/components/ui/Money';
import { MarkViewed } from '@/components/product/MarkViewed';
import { Rating } from '@/components/product/Rating';
import { FinishPicker } from '@/components/product/FinishPicker';
import { ProductCard } from '@/components/product/ProductCard';
import { ProductGallery } from '@/components/product/page/ProductGallery';
import { BuyBox } from '@/components/product/page/BuyBox';
import { SpecsTable } from '@/components/product/page/SpecsTable';
import { StickyBuyBar } from '@/components/product/page/StickyBuyBar';
import { RecentlyViewed } from '@/components/home/RecentlyViewed';

type Props = { params: Promise<{ locale: string; slug: string }> };

export function generateStaticParams() {
  return routing.locales.flatMap((locale) => getAllProducts().map((p) => ({ locale, slug: p.slug })));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, slug } = await params;
  const product = getProductBySlug(slug);
  if (!product || !hasLocale(routing.locales, locale)) return {};
  const t = await getTranslations({ locale, namespace: 'finish' });
  const loc = locale as Locale;
  const name = `${product.short[loc]} — ${t(product.finish)}`;
  const description = getContent(product.line).summary[loc];
  return {
    title: name,
    description,
    alternates: { languages: Object.fromEntries(routing.locales.map((l) => [l, `/${l}/product/${slug}`])) },
    openGraph: { title: name, description, images: [{ url: product.image, width: 800, height: 800 }] },
  };
}

export default async function ProductPage({ params }: Props) {
  const { locale, slug } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();
  setRequestLocale(locale);

  const product = getProductBySlug(slug);
  if (!product) notFound();

  const loc = locale as Locale;
  const t = await getTranslations();
  const { summary } = getContent(product.line);
  // Related products: the rest of this category first, then the most-reviewed products from other
  // categories so the section is never thin (a category can have as few as three product lines).
  const byPopularity = (a: Product, b: Product) => b.reviews - a.reviews;
  const sameCategory = onePerLine(
    getAllProducts().filter((p) => p.category === product.category && p.line !== product.line).sort(byPopularity),
  );
  const otherCategories = onePerLine(getAllProducts().filter((p) => p.category !== product.category).sort(byPopularity));
  const related = [...sameCategory, ...otherCategories].slice(0, 10);

  // Structured data for search engines. Deliberately has NO aggregateRating: the ratings in this demo
  // catalogue are placeholders, and publishing invented ratings to search engines breaks their guidelines.
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.name[loc],
    description: summary[loc],
    image: product.image,
    category: t(`categories.${product.category}`),
    color: t(`finish.${product.finish}`),
    offers: { '@type': 'Offer', price: product.price, priceCurrency: 'USD', availability: 'https://schema.org/InStock' },
  };

  const delivery = [
    { icon: 'truck', title: t('benefits.shippingTitle'), body: t.rich('benefits.shippingBody', { amount: () => <Money usd={FREE_SHIPPING_USD} whole /> }), extra: t('pdp.expressNote') },
    { icon: 'return', title: t('benefits.returnsTitle'), body: t('benefits.returnsBody') },
    { icon: 'shield', title: t('benefits.warrantyTitle'), body: t('benefits.warrantyBody') },
    { icon: 'headset', title: t('benefits.supportTitle'), body: t('benefits.supportBody') },
  ] as const;

  return (
    <>
      <div className="container pdp-page">
        <script
          type="application/ld+json"
          // Escape "<" so product text can never close the script tag.
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, '\\u003c') }}
        />
        <MarkViewed id={product.id} />

        <nav className="crumbs" aria-label={t('product.breadcrumb')}>
          <Link href="/">{t('nav.home')}</Link>
          <span aria-hidden="true">/</span>
          <Link href={filterHref({ category: product.category })}>{t(`categories.${product.category}`)}</Link>
          <span aria-hidden="true">/</span>
          <span aria-current="page">{product.short[loc]}</span>
        </nav>

        <div className="pdp-grid">
          <ProductGallery images={[product.image]} alt={t(`alt.${product.type}`)} badge={discount(product) || undefined} />

          <div className="pdp-info">
            <span className="overline">{t(`categories.${product.category}`)}</span>
            <h1 className="h2 pdp-title">{product.name[loc]}</h1>
            <Rating product={product} />
            <p className="pdp-lead">{summary[loc]}</p>
            <BuyBox product={product} finishPicker={<FinishPicker product={product} />} />
            <p className="caption pdp-vat">{t('pdp.vat')}</p>
          </div>
        </div>

        <div className="pdp-details">
          <section aria-labelledby="specs-title">
            <h2 className="h3" id="specs-title">{t('pdp.specs')}</h2>
            <SpecsTable line={product.line} />
          </section>
          <section aria-labelledby="delivery-title">
            <h2 className="h3" id="delivery-title">{t('pdp.delivery')}</h2>
            <ul className="delivery">
              {delivery.map((d) => (
                <li key={d.icon}>
                  <Icon name={d.icon} />
                  <div>
                    <strong>{d.title}</strong>
                    <span>{d.body}</span>
                    {'extra' in d ? <span>{d.extra}</span> : null}
                  </div>
                </li>
              ))}
            </ul>
          </section>
        </div>
      </div>

      <section className="container section pdp-related" aria-labelledby="related-title">
        <div className="section-head">
          <h2 className="h2" id="related-title">{t('pdp.related')}</h2>
        </div>
        <div className="product-grid">
          {related.map((p) => <ProductCard key={p.id} product={p} />)}
        </div>
      </section>

      <RecentlyViewed />
      <StickyBuyBar product={product} />
    </>
  );
}
