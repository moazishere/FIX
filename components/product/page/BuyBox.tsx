'use client';

import { useState, type ReactNode } from 'react';
import { useTranslations } from 'next-intl';
import type { Product } from '@/lib/catalog';
import { formatMoney } from '@/lib/money';
import { useShop } from '@/lib/store';
import { AddToCart } from '@/components/product/AddToCart';
import { WishButton } from '@/components/product/WishButton';
import { ShareButton } from '@/components/product/ShareButton';

const MAX_QTY = 10;

/**
 * Price, finish picker (passed in, server-rendered), quantity and the buy buttons.
 * The wrapper around the buttons carries id="buy-cta": the sticky buy bar watches it.
 */
export function BuyBox({ product, finishPicker }: { product: Product; finishPicker: ReactNode }) {
  const t = useTranslations('pdp');
  const currency = useShop((s) => s.currency);
  const [qty, setQty] = useState(1);
  const saving = product.was ? product.was - product.price : 0;

  return (
    <>
      <div className="pdp-price">
        <span className={`price${product.was ? ' is-sale' : ''}`}>{formatMoney(product.price, currency)}</span>
        {product.was ? <span className="price-old">{formatMoney(product.was, currency)}</span> : null}
        {saving ? (
          <span className="pdp-save">
            {t.rich('youSave', { amount: () => <span className="price-inline">{formatMoney(saving, currency)}</span> })}
          </span>
        ) : null}
      </div>

      {finishPicker}

      <div className="pdp-qty">
        <span className="pdp-qty-label" id="qty-label">{t('quantity')}</span>
        <div className="qty qty--lg" role="group" aria-labelledby="qty-label">
          <button type="button" aria-label={t('decrease')} disabled={qty <= 1} onClick={() => setQty((q) => Math.max(1, q - 1))}>&minus;</button>
          <span className="num" aria-live="polite">{qty}</span>
          <button type="button" aria-label={t('increase')} disabled={qty >= MAX_QTY} onClick={() => setQty((q) => Math.min(MAX_QTY, q + 1))}>+</button>
        </div>
      </div>

      <div className="pdp-buyrow" id="buy-cta">
        <AddToCart product={product} variant="detail" quantity={qty} />
        <WishButton product={product} />
        <ShareButton product={product} />
      </div>
    </>
  );
}
