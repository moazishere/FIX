import { useTranslations } from 'next-intl';
import type { Product } from '@/lib/catalog';
import { Icon } from '@/components/ui/Icon';

export function Rating({ product }: { product: Product }) {
  const t = useTranslations('product');
  const full = Math.round(product.rating);
  return (
    <div className="rating">
      <span className="stars" aria-hidden="true">
        {[1, 2, 3, 4, 5].map((i) => (
          <Icon key={i} name="star" className={i <= full ? undefined : 'is-off'} />
        ))}
      </span>
      <span className="caption num">( {product.reviews.toLocaleString('en-US')} )</span>
      <span className="sr-only">{t('rated', { rating: product.rating, count: product.reviews })}</span>
    </div>
  );
}
