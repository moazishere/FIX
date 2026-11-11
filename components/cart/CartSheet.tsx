'use client';

import { useEffect, useRef } from 'react';
import { useLocale, useTranslations } from 'next-intl';
import { Link, usePathname } from '@/i18n/navigation';
import { getProductById, type Locale, type Product } from '@/lib/catalog';
import { filterHref } from '@/lib/filters';
import { FREE_SHIPPING_USD, formatMoney } from '@/lib/money';
import { cartCount, cartTotal, useShop } from '@/lib/store';
import { useUi } from '@/lib/ui';
import { Icon } from '@/components/ui/Icon';
import { Money } from '@/components/ui/Money';
import { useToast } from '@/components/ui/Toast';
import { ProductImage } from '@/components/product/ProductImage';

type Row = { product: Product; qty: number };

export function CartSheet() {
  const t = useTranslations();
  const locale = useLocale() as Locale;
  const toast = useToast();
  const pathname = usePathname();

  const open = useUi((s) => s.sheetOpen);
  const view = useUi((s) => s.sheetView);
  const close = useUi((s) => s.closeSheet);
  const setView = useUi((s) => s.setSheetView);

  const cart = useShop((s) => s.cart);
  const wishlist = useShop((s) => s.wishlist);
  const currency = useShop((s) => s.currency);
  const setQuantity = useShop((s) => s.setQuantity);
  const removeWish = useShop((s) => s.removeWish);
  const moveToCart = useShop((s) => s.moveToCart);

  const closeBtn = useRef<HTMLButtonElement>(null);
  const opener = useRef<Element | null>(null);

  // Focus: into the panel when it opens, back to the opener when it closes. Escape closes. Page doesn't scroll behind.
  useEffect(() => {
    if (!open) return;
    opener.current = document.activeElement;
    closeBtn.current?.focus();
    document.documentElement.classList.add('no-scroll');
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && close();
    document.addEventListener('keydown', onKey);
    return () => {
      document.documentElement.classList.remove('no-scroll');
      document.removeEventListener('keydown', onKey);
      (opener.current as HTMLElement | null)?.focus?.();
    };
  }, [open, close]);

  // Navigating to another page closes the sheet.
  useEffect(() => close(), [pathname, close]);

  const rows: Row[] = Object.entries(cart)
    .map(([id, qty]) => ({ product: getProductById(Number(id))!, qty }))
    .filter((r) => r.product);
  const saved = wishlist.map((id) => getProductById(id)).filter((p): p is Product => !!p);
  const total = cartTotal(cart);
  const left = FREE_SHIPPING_USD - total;

  const nameOf = (p: Product) => p.short[locale];

  // Plain render functions (not nested components) so React keeps the DOM between renders.
  const line = (p: Product, end: React.ReactNode, children?: React.ReactNode) => (
    <li className="line" key={p.id} data-product={p.id}>
      <Link className="line-media" href={`/product/${p.slug}`} tabIndex={-1} aria-hidden="true">
        <ProductImage product={p} sizes="72px" />
      </Link>
      <div className="line-info">
        <Link className="line-title" href={`/product/${p.slug}`}>{nameOf(p)}</Link>
        <span className="caption">{t(`finish.${p.finish}`)}</span>
        {children}
      </div>
      <div className="line-end">{end}</div>
    </li>
  );

  const empty = (title: string, body: string) => (
    <div className="sheet-empty">
      <p className="h3">{title}</p>
      <p className="body">{body}</p>
      <Link className="btn btn-primary" href={filterHref()}>{t('cart.browse')}</Link>
    </div>
  );

  return (
    <div className={`sheet${open ? ' is-open' : ''}`} aria-hidden={!open}>
      <div className="sheet-scrim" onClick={close} />
      <div className="sheet-panel" role="dialog" aria-modal="true" aria-label={t('cart.label')}>
        <div className="sheet-head">
          <div className="sheet-tabs" role="tablist" aria-label={t('cart.label')}>
            {(['cart', 'saved'] as const).map((v) => (
              <button
                key={v}
                type="button"
                role="tab"
                aria-selected={view === v}
                className={`sheet-tab${view === v ? ' is-active' : ''}`}
                onClick={() => setView(v)}
              >
                {t(v === 'cart' ? 'cart.cartTab' : 'cart.savedTab')} <span>{v === 'cart' ? cartCount(cart) : wishlist.length}</span>
              </button>
            ))}
          </div>
          <button ref={closeBtn} type="button" className="sheet-close" aria-label={t('cart.close')} onClick={close}>
            <Icon name="x" />
          </button>
        </div>

        <div className="sheet-body">
          {view === 'cart' ? (
            rows.length ? (
              <>
                <div className="ship-meter">
                  <p>
                    {left > 0
                      ? t.rich('cart.moreForFree', { amount: () => <Money usd={left} /> })
                      : t('cart.freeShipping')}
                  </p>
                  <div className="meter"><span style={{ transform: `scaleX(${Math.min(1, total / FREE_SHIPPING_USD).toFixed(3)})` }} /></div>
                </div>
                <ul className="lines">
                  {rows.map(({ product: p, qty }) =>
                    line(
                      p,
                      <>
                        <span className="price">{formatMoney(p.price * qty, currency)}</span>
                        <button
                          type="button"
                          className="line-link"
                          onClick={() => { setQuantity(p.id, 0); toast(t('toast.removed', { name: nameOf(p) })); }}
                        >
                          {t('cart.remove')}
                        </button>
                      </>,
                      <div className="qty" role="group" aria-label={t('cart.quantity', { name: nameOf(p) })}>
                        <button type="button" aria-label={t('cart.removeOne')} onClick={() => setQuantity(p.id, qty - 1)}>&minus;</button>
                        <span className="num">{qty}</span>
                        <button type="button" aria-label={t('cart.addOne')} onClick={() => setQuantity(p.id, qty + 1)}>+</button>
                      </div>,
                    ),
                  )}
                </ul>
              </>
            ) : (
              empty(t('cart.emptyTitle'), t('cart.emptyBody'))
            )
          ) : saved.length ? (
            <ul className="lines">
              {saved.map((p) =>
                line(
                  p,
                  <>
                    <span className="price">{formatMoney(p.price, currency)}</span>
                    <button
                      type="button"
                      className="line-link line-link--strong"
                      onClick={() => { moveToCart(p.id); toast(t('toast.moved', { name: nameOf(p) })); }}
                    >
                      {t('cart.move')}
                    </button>
                    <button
                      type="button"
                      className="line-link"
                      onClick={() => { removeWish(p.id); toast(t('toast.unsaved', { name: nameOf(p) })); }}
                    >
                      {t('cart.remove')}
                    </button>
                  </>,
                ),
              )}
            </ul>
          ) : (
            empty(t('cart.savedEmptyTitle'), t('cart.savedEmptyBody'))
          )}
        </div>

        {view === 'cart' && rows.length ? (
          <div className="sheet-foot">
            <div className="sum-row">
              <span>{t('cart.subtotal')}</span>
              <span className="price">{formatMoney(total, currency)}</span>
            </div>
            <p className="caption">{t('cart.vat')}</p>
            <button type="button" className="btn btn-primary" onClick={() => toast(t('cart.checkoutNote'))}>
              {t('cart.checkout')}
            </button>
          </div>
        ) : null}
      </div>
    </div>
  );
}
