import { discount, getAllProducts, onePerLine, type Product } from './catalog';

const MS_PER_DAY = 86_400_000;

/**
 * Deals rotate at UTC midnight so the server render and every visitor agree.
 * (To rotate at a store-local midnight instead, offset `now` by the store's UTC offset here
 * and in `msUntilNextDeals`.)
 */
export const dayNumber = (now = Date.now()) => Math.floor(now / MS_PER_DAY);

/** Four deals for the day: biggest discounts first, one finish per product line, rotating daily. */
export function todaysDeals(now = Date.now()): Product[] {
  const pool = onePerLine(
    getAllProducts()
      .filter((p) => p.was)
      .sort((a, b) => discount(b) - discount(a)),
  );
  const start = (dayNumber(now) * 4) % pool.length;
  return Array.from({ length: Math.min(4, pool.length) }, (_, i) => pool[(start + i) % pool.length]);
}

export const msUntilNextDeals = (now = Date.now()) => (dayNumber(now) + 1) * MS_PER_DAY - now;
