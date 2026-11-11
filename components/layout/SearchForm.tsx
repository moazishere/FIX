'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { useRouter } from '@/i18n/navigation';
import { CATEGORY_IDS, type CategoryId } from '@/lib/catalog';
import { filterHref } from '@/lib/filters';
import { Dropdown } from '@/components/ui/Dropdown';
import { Icon } from '@/components/ui/Icon';

export function SearchForm() {
  const t = useTranslations();
  const router = useRouter();
  const [category, setCategory] = useState<CategoryId | undefined>(undefined);
  const [q, setQ] = useState('');

  const label = (c: CategoryId | undefined) => t(c ? `categories.${c === 'phones' ? 'phonesShort' : c}` : 'categories.all');

  return (
    <form
      className="search"
      role="search"
      onSubmit={(e) => {
        e.preventDefault();
        router.push(filterHref({ category, q: q.trim() }));
      }}
    >
      <Dropdown
        triggerClassName="search-cat"
        role="listbox"
        triggerLabel={t('header.searchCategory')}
        trigger={
          <>
            <span>{label(category)}</span>
            <Icon name="chevron-down" />
          </>
        }
      >
        <button type="button" role="option" aria-selected={!category} className={`dd-option${!category ? ' is-selected' : ''}`} onClick={() => setCategory(undefined)}>
          {t('categories.all')}
        </button>
        {CATEGORY_IDS.map((c) => (
          <button key={c} type="button" role="option" aria-selected={c === category} className={`dd-option${c === category ? ' is-selected' : ''}`} onClick={() => setCategory(c)}>
            {t(`categories.${c}`)}
          </button>
        ))}
      </Dropdown>
      <span className="search-divider" aria-hidden="true" />
      <label className="sr-only" htmlFor="search-input">{t('header.searchLabel')}</label>
      <input
        id="search-input"
        type="search"
        value={q}
        onChange={(e) => setQ(e.target.value)}
        placeholder={t('header.searchPlaceholder')}
        autoComplete="off"
      />
      <button className="search-submit" type="submit" aria-label={t('header.search')}>
        <Icon name="search" />
      </button>
    </form>
  );
}
