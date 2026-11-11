'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { useLocale, useTranslations } from 'next-intl';
import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';
import { Link } from '@/i18n/navigation';
import { filterHref } from '@/lib/filters';
import { HANDBACK, prefersReducedMotion } from '@/lib/motion';
import { Icon } from '@/components/ui/Icon';

gsap.registerPlugin(useGSAP);

const SLIDES = [
  { n: 1, image: '/images/hero-1.jpg', href: filterHref({ sale: true }) },
  { n: 2, image: '/images/hero-2.jpg', href: filterHref({ category: 'computers' }) },
  { n: 3, image: '/images/hero-3.jpg', href: filterHref({ category: 'cameras' }) },
] as const;

const INTERVAL_MS = 6000;

export function HeroCarousel() {
  const t = useTranslations('hero');
  const rtl = useLocale() === 'ar';
  const root = useRef<HTMLElement>(null);
  const [current, setCurrent] = useState(0);
  const [paused, setPaused] = useState(false);
  const firstRender = useRef(true);
  const touchX = useRef<number | null>(null);

  const go = (n: number) => setCurrent((n + SLIDES.length) % SLIDES.length);

  // Autoplay: pauses while hovered/focused, and never starts with reduced motion.
  useEffect(() => {
    if (paused || prefersReducedMotion()) return;
    const id = setInterval(() => setCurrent((c) => (c + 1) % SLIDES.length), INTERVAL_MS);
    return () => clearInterval(id);
  }, [paused, current]);

  // The page's one orchestrated entrance: image eases in, copy staggers up.
  // Skipped on first paint so the server-rendered slide is simply there.
  useGSAP(
    () => {
      if (firstRender.current) {
        firstRender.current = false;
        return;
      }
      if (prefersReducedMotion()) return;
      const slide = root.current?.querySelector('.slide.is-active');
      if (!slide) return;
      const img = slide.querySelector('.slide-visual img');
      const copy = slide.querySelectorAll('.slide-copy > *');
      gsap
        .timeline({ defaults: { ease: 'power3.out', overwrite: 'auto' } })
        .fromTo(img, { scale: 1.06, autoAlpha: 0, transition: 'none' }, { scale: 1, autoAlpha: 1, duration: 0.9, clearProps: HANDBACK }, 0)
        .fromTo(copy, { y: 18, autoAlpha: 0, transition: 'none' }, { y: 0, autoAlpha: 1, duration: 0.6, stagger: 0.08, clearProps: HANDBACK }, 0.12);
    },
    { dependencies: [current], scope: root },
  );

  return (
    <section
      ref={root}
      className="hero"
      aria-roledescription={t('carousel')}
      aria-label={t('label')}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
      onTouchStart={(e) => { touchX.current = e.touches[0].clientX; }}
      onTouchEnd={(e) => {
        if (touchX.current === null) return;
        const dx = e.changedTouches[0].clientX - touchX.current;
        touchX.current = null;
        if (Math.abs(dx) <= 40) return;
        // Swiping against the reading direction reveals the next slide.
        const forward = rtl ? dx > 0 : dx < 0;
        go(current + (forward ? 1 : -1));
      }}
    >
      <div className="container hero-wrap">
        <div className="hero-stage">
          {SLIDES.map((s, i) => {
            const Heading = i === 0 ? 'h1' : 'h2';
            return (
              <article
                key={s.n}
                className={`slide${i === current ? ' is-active' : ''}`}
                aria-roledescription={t('slide')}
                aria-label={t('position', { n: s.n, total: SLIDES.length })}
                inert={i !== current}
              >
                <div className="slide-copy">
                  <Heading className="display">{t(`s${s.n}Title`)}</Heading>
                  <p className="body">{t(`s${s.n}Body`)}</p>
                  <Link className="btn btn-primary" href={s.href}>{t(`s${s.n}Cta`)}</Link>
                </div>
                <div className="slide-visual">
                  <Image
                    src={s.image}
                    alt={t(`s${s.n}Alt`)}
                    width={1400}
                    height={933}
                    sizes="(max-width: 768px) 100vw, 60vw"
                    priority={i === 0}
                  />
                </div>
              </article>
            );
          })}
        </div>
        <button type="button" className="carousel-arrow carousel-arrow--prev" aria-label={t('prev')} onClick={() => go(current - 1)}>
          <Icon name="chevron-left" />
        </button>
        <button type="button" className="carousel-arrow carousel-arrow--next" aria-label={t('next')} onClick={() => go(current + 1)}>
          <Icon name="chevron-right" />
        </button>
        <div className="hero-dots" role="group" aria-label={t('choose')}>
          {SLIDES.map((s, i) => (
            <button
              key={s.n}
              type="button"
              className={i === current ? 'is-active' : undefined}
              aria-label={t('show', { n: s.n })}
              aria-current={i === current}
              onClick={() => go(i)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
