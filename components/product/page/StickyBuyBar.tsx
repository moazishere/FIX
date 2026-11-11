'use client';

import { useEffect, useState } from 'react';
import { useLocale, useTranslations } from 'next-intl';
import type { Locale, Product } from '@/lib/catalog';
import { AddToCart } from '@/components/product/AddToCart';
import { PriceRow } from '@/components/product/PriceRow';
import { ProductImage } from '@/components/product/ProductImage';

/**
 * Slides up once the main buy buttons have scrolled out of view above the viewport,
 * so the visitor can add to cart from anywhere down the page.
 */
export function StickyBuyBar({ product }: { product: Product }) {
  const t = useTranslations('pdp');
  const locale = useLocale() as Locale;
  const [show, setShow] = useState(false);
  const name = product.short[locale];

  useEffect(() => {
    const target = document.getElementById('buy-cta');
    if (!target || !('IntersectionObserver' in window)) return;
    const io = new IntersectionObserver(([entry]) => {
      // Only after the buttons have gone off the top (not while they're still below the fold).
      setShow(!entry.isIntersecting && entry.boundingClientRect.top < 0);
    });
    io.observe(target);
    return () => io.disconnect();
  }, [product.id]);

  return (
    <div className={`sticky-buy${show ? ' is-visible' : ''}`} role="region" aria-label={t('stickyAria', { name })} inert={!show}>
      <div className="container sticky-buy-inner">
        <div className="sticky-buy-media"><ProductImage product={product} sizes="48px" /></div>
        <div className="sticky-buy-text">
          <strong>{name}</strong>
          <PriceRow product={product} />
        </div>
        <AddToCart product={product} variant="button" />
      </div>
    </div>
  );
}
