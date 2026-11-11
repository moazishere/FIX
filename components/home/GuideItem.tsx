'use client';

import { useRef, type ReactNode } from 'react';
import { gsap } from 'gsap';
import { HANDBACK, prefersReducedMotion } from '@/lib/motion';

/** A native <details> disclosure; the tips ease in when it opens (user-triggered motion). */
export function GuideItem({ summary, children }: { summary: ReactNode; children: ReactNode }) {
  const ref = useRef<HTMLDetailsElement>(null);

  return (
    <details
      ref={ref}
      className="guide"
      onToggle={() => {
        const el = ref.current;
        if (!el?.open || prefersReducedMotion()) return;
        gsap.fromTo(
          el.querySelectorAll('.guide-tips li, .guide-tips .btn'),
          { y: 8, autoAlpha: 0, transition: 'none' },
          { y: 0, autoAlpha: 1, duration: 0.28, stagger: 0.04, ease: 'power2.out', clearProps: HANDBACK },
        );
      }}
    >
      <summary>{summary}</summary>
      <div className="guide-tips">{children}</div>
    </details>
  );
}
