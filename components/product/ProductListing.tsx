import { getTranslations } from 'next-intl/server';
import { applyFilters, PER_PAGE, filterHref, type Filters } from '@/lib/filters';
import { Link } from '@/i18n/navigation';
import { ProductCard } from './ProductCard';
import { CategoryChips } from './CategoryChips';
import { SortMenu } from './SortMenu';
import { Pagination } from './Pagination';

/** The All Products page body: heading, category chips, sort, grid and pagination — all driven by the URL. */
export async function ProductListing({ filters }: { filters: Filters }) {
  const t = await getTranslations();

  const all = applyFilters(filters);
  const pages = Math.max(1, Math.ceil(all.length / PER_PAGE));
  const page = Math.min(filters.page, pages);
  const start = (page - 1) * PER_PAGE;
  const slice = all.slice(start, start + PER_PAGE);
  const current = { ...filters, page };

  const title = filters.sale
    ? t('grid.blackFridayDeals')
    : filters.q
      ? t('grid.results', { q: filters.q })
      : filters.category
        ? t(`categories.${filters.category}`)
        : t('grid.allProducts');

  return (
    <>
      <nav className="crumbs" aria-label={t('product.breadcrumb')}>
        <Link href="/">{t('nav.home')}</Link>
        <span aria-hidden="true">/</span>
        {filters.category || filters.q || filters.sale ? (
          <>
            <Link href={filterHref()}>{t('grid.allProducts')}</Link>
            <span aria-hidden="true">/</span>
            <span aria-current="page">{title}</span>
          </>
        ) : (
          <span aria-current="page">{t('grid.allProducts')}</span>
        )}
      </nav>

      <div className="section-head">
        <div className="section-head-left">
          <h1 className="h2" id="shop-title">{title}</h1>
          <p className="caption" aria-live="polite">
            {all.length
              ? t('grid.showing', { from: start + 1, to: start + slice.length, total: all.length })
              : t('grid.none')}
          </p>
        </div>
        <SortMenu filters={current} />
      </div>

      <CategoryChips filters={current} />

      <div className="product-grid">
        {slice.length ? (
          slice.map((p, i) => <ProductCard key={p.id} product={p} priority={i < 5 && page === 1} />)
        ) : (
          <div className="empty">
            <p className="h3">
              {t('grid.emptyTitle')}
              {filters.q ? ` “${filters.q}”` : ''}
            </p>
            <p className="body">{t('grid.emptyBody')}</p>
            <Link className="btn btn-primary" href={filterHref()}>{t('grid.showAll')}</Link>
          </div>
        )}
      </div>

      <Pagination filters={current} pages={pages} />
    </>
  );
}
