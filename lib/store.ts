'use client';

import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { getProductById } from './catalog';
import type { CurrencyCode } from './money';

interface ShopState {
  /** product id → quantity */
  cart: Record<number, number>;
  wishlist: number[];
  viewed: number[];
  currency: CurrencyCode;

  addToCart: (id: number, qty?: number) => void;
  setQuantity: (id: number, qty: number) => void;
  toggleWish: (id: number) => boolean;
  removeWish: (id: number) => void;
  moveToCart: (id: number) => void;
  markViewed: (id: number) => void;
  clearViewed: () => void;
  setCurrency: (c: CurrencyCode) => void;
}

/**
 * Cart, saved items, recently viewed and currency. Persisted to localStorage, but
 * `skipHydration` keeps the first client render identical to the server's empty render;
 * <StoreHydrator /> restores the saved data right after mount, so there is no hydration mismatch.
 */
export const useShop = create<ShopState>()(
  persist(
    (set, get) => ({
      cart: {},
      wishlist: [],
      viewed: [],
      currency: 'USD',

      addToCart: (id, qty = 1) => set((s) => ({ cart: { ...s.cart, [id]: (s.cart[id] ?? 0) + Math.max(1, qty) } })),
      setQuantity: (id, qty) =>
        set((s) => {
          const cart = { ...s.cart };
          if (qty <= 0) delete cart[id];
          else cart[id] = qty;
          return { cart };
        }),
      toggleWish: (id) => {
        const on = !get().wishlist.includes(id);
        set((s) => ({ wishlist: on ? [...s.wishlist, id] : s.wishlist.filter((w) => w !== id) }));
        return on;
      },
      removeWish: (id) => set((s) => ({ wishlist: s.wishlist.filter((w) => w !== id) })),
      moveToCart: (id) =>
        set((s) => ({
          wishlist: s.wishlist.filter((w) => w !== id),
          cart: { ...s.cart, [id]: (s.cart[id] ?? 0) + 1 },
        })),
      markViewed: (id) => set((s) => ({ viewed: [id, ...s.viewed.filter((v) => v !== id)].slice(0, 10) })),
      clearViewed: () => set({ viewed: [] }),
      setCurrency: (currency) => set({ currency }),
    }),
    {
      name: 'fix-shop',
      version: 1,
      storage: createJSONStorage(() => localStorage),
      skipHydration: true,
      // Drop anything that no longer exists in the catalogue.
      merge: (persisted, current) => {
        const p = (persisted ?? {}) as Partial<ShopState>;
        const cart = Object.fromEntries(
          Object.entries(p.cart ?? {}).filter(([id, q]) => getProductById(Number(id)) && Number(q) > 0),
        );
        return {
          ...current,
          cart,
          wishlist: (p.wishlist ?? []).filter((id) => getProductById(id)),
          viewed: (p.viewed ?? []).filter((id) => getProductById(id)),
          currency: p.currency === 'EUR' || p.currency === 'GBP' ? p.currency : 'USD',
        };
      },
    },
  ),
);

export const cartCount = (cart: Record<number, number>) => Object.values(cart).reduce((a, b) => a + b, 0);
export const cartTotal = (cart: Record<number, number>) =>
  Object.entries(cart).reduce((sum, [id, q]) => sum + (getProductById(Number(id))?.price ?? 0) * q, 0);
