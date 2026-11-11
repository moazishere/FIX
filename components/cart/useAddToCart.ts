'use client';

import { useCallback } from 'react';
import { useLocale, useTranslations } from 'next-intl';
import { gsap } from 'gsap';
import type { Locale, Product } from '@/lib/catalog';
import { useShop } from '@/lib/store';
import { useToast } from '@/components/ui/Toast';
import { prefersReducedMotion } from '@/lib/motion';

/** Sends a copy of the product photo flying into the header cart icon. */
function flyToCart(source: HTMLElement | null) {
  if (prefersReducedMotion() || !source) return;
  // Fly the photo from the card / buy box this button belongs to (or the page's main photo).
  const img = source.closest('[data-product]')?.querySelector('img') ?? document.querySelector('[data-fly-source] img');
  const target = document.querySelector('[data-cart-target]');
  if (!img || !target) return;
  const a = img.getBoundingClientRect();
  const b = target.getBoundingClientRect();
  if (!a.width || b.bottom < 0) return;

  const ghost = img.cloneNode() as HTMLImageElement;
  ghost.removeAttribute('loading');
  ghost.removeAttribute('srcset');
  ghost.alt = '';
  ghost.className = 'fly-ghost';
  Object.assign(ghost.style, { left: `${a.left}px`, top: `${a.top}px`, width: `${a.width}px`, height: `${a.height}px` });
  document.body.appendChild(ghost);
  gsap.to(ghost, {
    x: b.left + b.width / 2 - (a.left + a.width / 2),
    y: b.top + b.height / 2 - (a.top + a.height / 2),
    scale: 0.12,
    autoAlpha: 0.35,
    duration: 0.6,
    ease: 'power2.in',
    onComplete: () => ghost.remove(),
  });
}

export function useAddToCart() {
  const locale = useLocale() as Locale;
  const t = useTranslations();
  const toast = useToast();
  const addToCart = useShop((s) => s.addToCart);

  return useCallback(
    (product: Product, source?: HTMLElement | null, quantity = 1) => {
      addToCart(product.id, quantity);
      toast(t('toast.added', { name: product.short[locale], finish: t(`finish.${product.finish}`) }));
      flyToCart(source ?? null);
    },
    [addToCart, locale, t, toast],
  );
}
