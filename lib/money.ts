export const CURRENCIES = {
  USD: { symbol: '$', rate: 1 },
  EUR: { symbol: '€', rate: 0.92 },
  GBP: { symbol: '£', rate: 0.79 },
} as const;

export type CurrencyCode = keyof typeof CURRENCIES;
export const CURRENCY_CODES = Object.keys(CURRENCIES) as CurrencyCode[];

/** Free-delivery threshold, in USD. */
export const FREE_SHIPPING_USD = 99;

/**
 * Format a USD amount in the chosen currency. Digits stay Western (en-US) in both
 * languages so prices read the same everywhere; the UI wraps them in an LTR isolate.
 */
export function formatMoney(usd: number, currency: CurrencyCode = 'USD', whole = false): string {
  const { symbol, rate } = CURRENCIES[currency];
  return (
    symbol +
    (usd * rate).toLocaleString('en-US', {
      minimumFractionDigits: whole ? 0 : 2,
      maximumFractionDigits: whole ? 0 : 2,
    })
  );
}
