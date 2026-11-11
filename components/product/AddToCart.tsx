'use client';

import { useLocale, useTranslations } from 'next-intl';
import type { Locale, Product } from '@/lib/catalog';
import { Icon } from '@/components/ui/Icon';
import { useAddToCart } from '@/components/cart/useAddToCart';

type Variant = 'bar' | 'button' | 'icon' | 'detail';

/** One add-to-cart control in the four shapes the storefront needs. */
export function AddToCart({ product, variant, quantity = 1 }: { product: Product; variant: Variant; quantity?: number }) {
  const locale = useLocale() as Locale;
  const t = useTranslations('product');
  const add = useAddToCart();
  const onClick = (e: React.MouseEvent<HTMLButtonElement>) => add(product, e.currentTarget, quantity);

  switch (variant) {
    case 'bar':
      return (
        <button type="button" className="add-bar" onClick={onClick}>
          <Icon name="cart" />
          {t('addToCart')}
        </button>
      );
    case 'icon':
      return (
        <button type="button" className="icon-btn" aria-label={t('addNamed', { name: product.short[locale] })} onClick={onClick}>
          <Icon name="cart" />
        </button>
      );
    case 'detail':
      return (
        <button type="button" className="btn btn-primary" onClick={onClick}>
          <Icon name="cart" />
          {t('addToCart')}
        </button>
      );
    default:
      return (
        <button type="button" className="btn btn-primary" onClick={onClick}>
          {t('addToCart')}
        </button>
      );
  }
}
