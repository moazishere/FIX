'use client';

import { useLocale, useTranslations } from 'next-intl';
import type { Locale, Product } from '@/lib/catalog';
import { useShop } from '@/lib/store';
import { Icon } from '@/components/ui/Icon';
import { useToast } from '@/components/ui/Toast';

export function WishButton({ product }: { product: Product }) {
  const locale = useLocale() as Locale;
  const t = useTranslations();
  const toast = useToast();
  const on = useShop((s) => s.wishlist.includes(product.id));
  const toggleWish = useShop((s) => s.toggleWish);
  const name = product.short[locale];

  return (
    <button
      type="button"
      className={`icon-btn${on ? ' is-on' : ''}`}
      aria-pressed={on}
      aria-label={t('product.save', { name })}
      onClick={() => toast(t(toggleWish(product.id) ? 'toast.saved' : 'toast.unsaved', { name }))}
    >
      <Icon name="heart" />
    </button>
  );
}
