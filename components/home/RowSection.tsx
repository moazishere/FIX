'use client';

import { useCallback, useEffect, useRef, useState, type ReactNode } from 'react';
import { useLocale } from 'next-intl';
import { prefersReducedMotion } from '@/lib/motion';
import { Icon } from '@/components/ui/Icon';

interface RowSectionProps {
  id: string;
  title: string;
  backLabel: string;
  forwardLabel: string;
  /** Extra control shown before the arrows (e.g. "Clear history"). */
  extra?: ReactNode;
  children: ReactNode;
}

/** A titled, scroll-snapping horizontal row of cards with back / forward buttons. Works in LTR and RTL. */
export function RowSection({ id, title, backLabel, forwardLabel, extra, children }: RowSectionProps) {
  const rtl = useLocale() === 'ar';
  const track = useRef<HTMLDivElement>(null);
  const [edge, setEdge] = useState({ start: true, end: false });

  const update = useCallback(() => {
    const el = track.current;
    if (!el) return;
    // In right-to-left pages scrollLeft runs from 0 towards negative values.
    const pos = Math.abs(el.scrollLeft);
    setEdge({ start: pos <= 2, end: pos >= el.scrollWidth - el.clientWidth - 2 });
  }, []);

  useEffect(() => {
    const el = track.current;
    if (!el) return;
    update();
    el.addEventListener('scroll', update, { passive: true });
    const ro = new ResizeObserver(update);
    ro.observe(el);
    return () => {
      el.removeEventListener('scroll', update);
      ro.disconnect();
    };
  }, [update, children]);

  const scroll = (dir: 1 | -1) => {
    const el = track.current;
    if (!el) return;
    // "Forward" always moves towards the inline end, in either direction.
    el.scrollBy({ left: dir * el.clientWidth * 0.85 * (rtl ? -1 : 1), behavior: prefersReducedMotion() ? 'auto' : 'smooth' });
  };

  return (
    <section className="container section" aria-labelledby={`${id}-title`}>
      <div className="section-head">
        <h2 className="h2" id={`${id}-title`}>{title}</h2>
        <div className="row-nav">
          {extra}
          <button type="button" className="icon-btn" aria-label={backLabel} disabled={edge.start} onClick={() => scroll(-1)}>
            <Icon name="chevron-left" />
          </button>
          <button type="button" className="icon-btn" aria-label={forwardLabel} disabled={edge.end} onClick={() => scroll(1)}>
            <Icon name="chevron-right" />
          </button>
        </div>
      </div>
      <div className="hrow" id={id} ref={track}>
        {children}
      </div>
    </section>
  );
}
