import { useTranslations } from 'next-intl';
import { getAllProducts, onePerLine } from '@/lib/catalog';
import { filterHref } from '@/lib/filters';
import { Link } from '@/i18n/navigation';
import { Icon } from '@/components/ui/Icon';
import { ProductCard } from '@/components/product/ProductCard';

/** The ten most-reviewed products (one finish each) as a preview; the full catalogue is at /products. */
export function BestSellers() {
  const t = useTranslations();
  const top = onePerLine([...getAllProducts()].sort((a, b) => b.reviews - a.reviews)).slice(0, 10);

  return (
    <section className="container section" aria-labelledby="best-title">
      <div className="section-head">
        <h2 className="h2" id="best-title">{t('grid.bestSellers')}</h2>
        <Link className="view-all" href={filterHref()}>
          {t('shop.viewAll')}
          <Icon name="arrow-long" className="i-arrow" />
        </Link>
      </div>
      <div className="product-grid">
        {top.map((p) => <ProductCard key={p.id} product={p} />)}
      </div>
    </section>
  );
}
