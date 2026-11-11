import { getTranslations } from 'next-intl/server';
import { applyFilters, PER_PAGE, filterHref, type Filters } from '@/lib/filters';
import { Link } from '@/i18n/navigation';
import { ProductCard } from './ProductCard';
import { SortMenu } from './SortMenu';
import { Pagination } from './Pagination';

/** Heading + sort + grid + pagination. Everything is rendered on the server from the URL's filters. */
export async function ProductsSection({ filters }: { filters: Filters }) {
  const t = await getTranslations('grid');
  const tc = await getTranslations('categories');

  const all = applyFilters(filters);
  const pages = Math.max(1, Math.ceil(all.length / PER_PAGE));
  const page = Math.min(filters.page, pages);
  const start = (page - 1) * PER_PAGE;
  const slice = all.slice(start, start + PER_PAGE);
  const current = { ...filters, page };

  const title = filters.sale
    ? t('blackFridayDeals')
    : filters.q
      ? t('results', { q: filters.q })
      : filters.category
        ? tc(filters.category)
        : t(({ popular: 'bestSellers', rating: 'topRated', new: 'newArrivals' } as const)[filters.sort as 'popular' | 'rating' | 'new'] ?? 'allProducts');

  return (
    <section className="container section" id="products" aria-labelledby="grid-title">
      <div className="section-head">
        <div className="section-head-left">
          <h2 className="h2" id="grid-title">{title}</h2>
          <p className="caption">
            {all.length ? t('showing', { from: start + 1, to: start + slice.length, total: all.length }) : t('none')}
          </p>
        </div>
        <SortMenu filters={current} />
      </div>

      <div className="product-grid" aria-live="polite">
        {slice.length ? (
          slice.map((p, i) => <ProductCard key={p.id} product={p} priority={i < 5 && page === 1} />)
        ) : (
          <div className="empty">
            <p className="h3">
              {t('emptyTitle')}
              {filters.q ? ` “${filters.q}”` : ''}
            </p>
            <p className="body">{t('emptyBody')}</p>
            <Link className="btn btn-primary" href={filterHref()}>{t('showAll')}</Link>
          </div>
        )}
      </div>

      <Pagination filters={current} pages={pages} />
    </section>
  );
}
