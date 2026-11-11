import { useTranslations } from 'next-intl';
import { CATEGORY_IDS } from '@/lib/catalog';
import { applyFilters, filterHref, type Filters } from '@/lib/filters';
import { Link } from '@/i18n/navigation';

/**
 * Category filter chips plus an "On sale" toggle. Each chip is a plain link, so filtering works
 * without JavaScript and every combination is a shareable URL. Counts respect the search and sale filters.
 */
export function CategoryChips({ filters }: { filters: Filters }) {
  const t = useTranslations();
  const count = (over: Partial<Filters>) => applyFilters({ ...filters, ...over, page: 1 }).length;
  const reset = { page: 1 };

  return (
    <div className="chips" role="group" aria-label={t('shop.filterLabel')}>
      <Link
        className={`chip${!filters.category ? ' is-active' : ''}`}
        href={filterHref({ ...filters, ...reset, category: undefined })}
        aria-current={!filters.category ? 'true' : undefined}
      >
        {t('categories.all')} <span className="chip-n num">{count({ category: undefined })}</span>
      </Link>
      {CATEGORY_IDS.map((c) => (
        <Link
          key={c}
          className={`chip${filters.category === c ? ' is-active' : ''}`}
          href={filterHref({ ...filters, ...reset, category: c })}
          aria-current={filters.category === c ? 'true' : undefined}
        >
          {t(`categories.${c}`)} <span className="chip-n num">{count({ category: c })}</span>
        </Link>
      ))}
      <Link
        className={`chip chip--toggle${filters.sale ? ' is-active' : ''}`}
        href={filterHref({ ...filters, ...reset, sale: !filters.sale })}
        aria-current={filters.sale ? 'true' : undefined}
      >
        {t('shop.onSale')}
      </Link>
    </div>
  );
}
