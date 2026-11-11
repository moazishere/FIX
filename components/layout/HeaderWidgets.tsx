'use client';

import { useEffect, useRef } from 'react';
import { useTranslations } from 'next-intl';
import { gsap } from 'gsap';
import { cartCount, cartTotal, useShop } from '@/lib/store';
import { formatMoney } from '@/lib/money';
import { useUi } from '@/lib/ui';
import { prefersReducedMotion } from '@/lib/motion';
import { Icon } from '@/components/ui/Icon';
import { useToast } from '@/components/ui/Toast';

function Dot({ count, id }: { count: number; id?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const previous = useRef(count);

  // Small pop whenever the number goes up (never on first paint, never with reduced motion).
  useEffect(() => {
    if (count > previous.current && ref.current && !prefersReducedMotion()) {
      gsap.fromTo(ref.current, { scale: 1 }, { scale: 1.35, duration: 0.14, ease: 'power2.out', yoyo: true, repeat: 1, overwrite: true });
    }
    previous.current = count;
  }, [count]);

  return (
    <span ref={ref} id={id} className="cart-dot" hidden={count === 0}>
      {count > 99 ? '99+' : count}
    </span>
  );
}

export function HeaderWidgets() {
  const t = useTranslations();
  const toast = useToast();
  const openSheet = useUi((s) => s.openSheet);
  const cart = useShop((s) => s.cart);
  const wishCount = useShop((s) => s.wishlist.length);
  const currency = useShop((s) => s.currency);

  return (
    <div className="widgets">
      <button type="button" className="widget widget--icon" aria-label={t('header.saved')} onClick={() => openSheet('saved')}>
        <span className="widget-icon">
          <Icon name="heart" />
          <Dot count={wishCount} />
        </span>
      </button>
      <button type="button" className="widget" aria-label={t('header.openCart')} onClick={() => openSheet('cart')}>
        <span className="widget-icon" data-cart-target>
          <Icon name="cart" />
          <Dot count={cartCount(cart)} id="cart-dot" />
        </span>
        <span className="widget-label">
          <small>{t('header.yourCart')}</small>
          <strong className="num">{formatMoney(cartTotal(cart), currency)}</strong>
        </span>
      </button>
      <button type="button" className="widget" aria-label={t('header.account')} onClick={() => toast(t('toast.signIn'))}>
        <span className="widget-icon"><Icon name="user" /></span>
        <span className="widget-label">
          <small>{t('header.hello')}</small>
          <strong>{t('header.signIn')}</strong>
        </span>
      </button>
    </div>
  );
}
