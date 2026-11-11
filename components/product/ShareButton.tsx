'use client';

import { useLocale, useTranslations } from 'next-intl';
import type { Locale, Product } from '@/lib/catalog';
import { formatMoney } from '@/lib/money';
import { useShop } from '@/lib/store';
import { Icon } from '@/components/ui/Icon';
import { useToast } from '@/components/ui/Toast';

export function ShareButton({ product }: { product: Product }) {
  const locale = useLocale() as Locale;
  const t = useTranslations();
  const toast = useToast();

  async function share() {
    const currency = useShop.getState().currency;
    const url = `${window.location.origin}/${locale}/product/${product.slug}`;
    const text = `${t('product.shareText', { name: product.name[locale], price: formatMoney(product.price, currency) })}\n${url}`;
    try {
      await navigator.clipboard.writeText(text);
      toast(t('toast.copiedProduct'));
    } catch {
      toast(t('toast.copyBlocked'));
    }
  }

  return (
    <button type="button" className="icon-btn" aria-label={t('product.share', { name: product.short[locale] })} onClick={share}>
      <Icon name="share" />
    </button>
  );
}
