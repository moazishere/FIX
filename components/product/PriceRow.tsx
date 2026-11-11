'use client';

import type { Product } from '@/lib/catalog';
import { useShop } from '@/lib/store';
import { formatMoney } from '@/lib/money';

export function PriceRow({ product }: { product: Product }) {
  const currency = useShop((s) => s.currency);
  return (
    <div className="price-row">
      <span className={`price${product.was ? ' is-sale' : ''}`}>{formatMoney(product.price, currency)}</span>
      {product.was ? <span className="price-old">{formatMoney(product.was, currency)}</span> : null}
    </div>
  );
}
