'use client';

import { useShop } from '@/lib/store';
import { formatMoney } from '@/lib/money';

/** A USD amount shown in the visitor's chosen currency. Always an LTR isolate (see globals.css). */
export function Money({ usd, whole = false, className }: { usd: number; whole?: boolean; className?: string }) {
  const currency = useShop((s) => s.currency);
  return <span className={className ?? 'price-inline'}>{formatMoney(usd, currency, whole)}</span>;
}
