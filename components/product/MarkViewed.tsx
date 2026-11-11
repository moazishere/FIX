'use client';

import { useEffect } from 'react';
import { useShop } from '@/lib/store';

/** Adds the product to the visitor's "recently viewed" list (after the saved list has loaded). */
export function MarkViewed({ id }: { id: number }) {
  const markViewed = useShop((s) => s.markViewed);
  useEffect(() => {
    // Wait a tick so StoreHydrator's rehydrate runs first and doesn't overwrite this entry.
    const timer = setTimeout(() => markViewed(id), 0);
    return () => clearTimeout(timer);
  }, [id, markViewed]);
  return null;
}
