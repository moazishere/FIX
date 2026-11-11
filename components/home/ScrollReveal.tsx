'use client';

import { useRef, type ReactNode } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { HANDBACK } from '@/lib/motion';

gsap.registerPlugin(useGSAP, ScrollTrigger);

interface ScrollRevealProps {
  id?: string;
  className?: string;
  labelledBy?: string;
  /** CSS selector (scoped to this section) for the elements that rise in. */
  targets: string;
  children: ReactNode;
}

/**
 * The page's one scroll-triggered reveal: the matched elements rise in once, the first time
 * the section is reached. Skipped entirely for visitors who prefer reduced motion.
 * The content is server-rendered and fully visible without JavaScript.
 */
export function ScrollReveal({ id, className, labelledBy, targets, children }: ScrollRevealProps) {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add('(prefers-reduced-motion: no-preference)', () => {
        gsap.fromTo(
          targets,
          { y: 24, autoAlpha: 0, transition: 'none' },
          {
            y: 0,
            autoAlpha: 1,
            duration: 0.6,
            ease: 'power3.out',
            stagger: 0.07,
            clearProps: HANDBACK,
            scrollTrigger: { trigger: root.current, start: 'top 78%', once: true },
          },
        );
      });
      return () => mm.revert();
    },
    { scope: root },
  );

  return (
    <section ref={root} id={id} className={className} aria-labelledby={labelledBy}>
      {children}
    </section>
  );
}
