'use client';

import { useTranslations } from 'next-intl';
import { getProductById } from '@/lib/catalog';
import { useShop } from '@/lib/store';
import { ProductCard } from '@/components/product/ProductCard';
import { useToast } from '@/components/ui/Toast';
import { RowSection } from './RowSection';

/** Appears only after the visitor has opened at least one product. Lives in localStorage. */
export function RecentlyViewed() {
  const t = useTranslations('rows');
  const toast = useToast();
  const viewed = useShop((s) => s.viewed);
  const clearViewed = useShop((s) => s.clearViewed);

  const products = viewed.map(getProductById).filter((p) => !!p);
  if (!products.length) return null;

  return (
    <RowSection
      id="viewed-row"
      title={t('viewedTitle')}
      backLabel={t('viewedBack')}
      forwardLabel={t('viewedForward')}
      extra={
        <button
          type="button"
          className="view-all"
          onClick={() => {
            clearViewed();
            toast(t('cleared'));
          }}
        >
          {t('clear')}
        </button>
      }
    >
      {products.map((p) => <ProductCard key={p.id} product={p} />)}
    </RowSection>
  );
}
