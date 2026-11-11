/** True when the visitor asked the OS/browser for reduced motion. Client-only. */
export const prefersReducedMotion = () =>
  typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/**
 * `.btn` (and a few other elements) have `transition: all` in CSS. While GSAP drives transform and
 * opacity, those transitions must be paused, then the inline styles handed back to CSS so hover
 * effects keep working. Use with explicit `fromTo()` start/end values.
 */
export const HANDBACK = 'transition,transform,opacity,visibility';
