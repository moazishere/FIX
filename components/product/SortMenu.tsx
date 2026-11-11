'use client';

import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { filterHref, SORTS, type Filters, type Sort } from '@/lib/filters';
import { Dropdown } from '@/components/ui/Dropdown';
import { Icon } from '@/components/ui/Icon';

const LABEL: Record<Sort, string> = {
  popular: 'popular',
  rating: 'rating',
  new: 'new',
  'price-asc': 'priceAsc',
  'price-desc': 'priceDesc',
};

export function SortMenu({ filters }: { filters: Filters }) {
  const t = useTranslations('grid');
  return (
    <div className="sort">
      <span className="caption">{t('sortBy')}</span>
      <Dropdown
        triggerClassName="sort-trigger"
        alignEnd
        role="listbox"
        trigger={
          <>
            <span>{t(LABEL[filters.sort])}</span>
            <Icon name="chevron-down" />
          </>
        }
      >
        {SORTS.map((s) => (
          <Link
            key={s}
            className={`dd-option${s === filters.sort ? ' is-selected' : ''}`}
            href={filterHref({ ...filters, sort: s, page: 1 })}
            role="option"
            aria-selected={s === filters.sort}
            scroll={false}
          >
            {t(LABEL[s])}
          </Link>
        ))}
      </Dropdown>
    </div>
  );
}
