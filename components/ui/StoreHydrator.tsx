'use client';

import { useEffect } from 'react';
import { useShop } from '@/lib/store';

/** Restores the saved cart / wishlist / recently viewed / currency once the page is interactive. */
export function StoreHydrator() {
  useEffect(() => {
    void useShop.persist.rehydrate();
  }, []);
  return null;
}
