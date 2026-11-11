'use client';

import { useEffect } from 'react';

const TOP_ZONE = 80;   // near the top of the page the full header is always shown
const THRESHOLD = 6;   // ignore tiny scroll jitters (px)

/**
 * Drives the phone header: it is sticky (CSS), and this folds the search row away while the visitor
 * scrolls down and brings it back on any upward scroll, near the top, or while they are using it.
 * It only toggles `data-compact` on the header; the visual change is CSS and applies on phones only.
 */
export function HeaderScroll() {
  useEffect(() => {
    const header = document.querySelector<HTMLElement>('.site-header');
    if (!header) return;

    let last = window.scrollY;
    let frame = 0;

    const update = () => {
      frame = 0;
      const y = Math.max(0, window.scrollY);
      const delta = y - last;
      const interacting = header.contains(document.activeElement);

      if (y < TOP_ZONE || interacting || delta < -THRESHOLD) header.removeAttribute('data-compact');
      else if (delta > THRESHOLD) header.setAttribute('data-compact', '');

      last = y;
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    // Typing in the search box (or focusing it) must keep the row open.
    const onFocus = () => header.removeAttribute('data-compact');

    window.addEventListener('scroll', onScroll, { passive: true });
    header.addEventListener('focusin', onFocus);
    return () => {
      window.removeEventListener('scroll', onScroll);
      header.removeEventListener('focusin', onFocus);
      if (frame) cancelAnimationFrame(frame);
      header.removeAttribute('data-compact');
    };
  }, []);

  return null;
}
