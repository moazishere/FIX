import { getAllProducts, isCategory, type CategoryId, type Product } from './catalog';

export const SORTS = ['popular', 'rating', 'new', 'price-asc', 'price-desc'] as const;
export type Sort = (typeof SORTS)[number];

/** Products per page on /products (four rows of five on desktop). */
export const PER_PAGE = 20;

export interface Filters {
  category?: CategoryId;
  q: string;
  sale: boolean;
  sort: Sort;
  page: number;
}

type RawParams = Record<string, string | string[] | undefined>;
const first = (v: string | string[] | undefined) => (Array.isArray(v) ? v[0] : v);

/** URL search params → validated filters (anything unexpected falls back to the default). */
export function parseFilters(params: RawParams): Filters {
  const cat = first(params.cat);
  const sort = first(params.sort);
  const page = Number.parseInt(first(params.page) ?? '1', 10);
  return {
    category: isCategory(cat) ? cat : undefined,
    q: (first(params.q) ?? '').trim().slice(0, 80),
    sale: first(params.sale) === '1',
    sort: (SORTS as readonly string[]).includes(sort ?? '') ? (sort as Sort) : 'popular',
    page: Number.isFinite(page) && page > 0 ? page : 1,
  };
}

/** Build a link to the All Products page with these filters. Defaults are left out of the URL. */
export function filterHref(f: Partial<Filters> = {}): string {
  const sp = new URLSearchParams();
  if (f.category) sp.set('cat', f.category);
  if (f.q) sp.set('q', f.q);
  if (f.sale) sp.set('sale', '1');
  if (f.sort && f.sort !== 'popular') sp.set('sort', f.sort);
  if (f.page && f.page > 1) sp.set('page', String(f.page));
  const qs = sp.toString();
  return `/products${qs ? `?${qs}` : ''}`;
}

const SORTERS: Record<Sort, (a: Product, b: Product) => number> = {
  popular: (a, b) => b.reviews - a.reviews,
  rating: (a, b) => b.rating - a.rating || b.reviews - a.reviews,
  new: (a, b) => b.added - a.added,
  'price-asc': (a, b) => a.price - b.price || b.reviews - a.reviews,
  'price-desc': (a, b) => b.price - a.price || b.reviews - a.reviews,
};

/** Search matches English and Arabic names, whichever language is showing. */
export function applyFilters(f: Filters): Product[] {
  const terms = f.q.toLowerCase().split(/\s+/).filter(Boolean);
  return getAllProducts()
    .filter((p) => {
      if (f.category && p.category !== f.category) return false;
      if (f.sale && !p.was) return false;
      if (terms.length) {
        const hay = `${p.name.en} ${p.name.ar} ${p.category} ${p.type}`.toLowerCase();
        return terms.every((t) => hay.includes(t));
      }
      return true;
    })
    .sort(SORTERS[f.sort]);
}
