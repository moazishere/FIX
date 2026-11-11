'use client';

import { useEffect, useRef, useState } from 'react';
import { useRouter as useNextRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { gsap } from 'gsap';
import { msUntilNextDeals } from '@/lib/deals';
import { prefersReducedMotion } from '@/lib/motion';

function Digit({ ch, animate }: { ch: string; animate: boolean }) {
  const ref = useRef<HTMLSpanElement>(null);
  const previous = useRef(ch);

  useEffect(() => {
    if (previous.current !== ch && animate && ref.current && !prefersReducedMotion()) {
      gsap.fromTo(ref.current, { yPercent: -60, autoAlpha: 0 }, { yPercent: 0, autoAlpha: 1, duration: 0.3, ease: 'power2.out', overwrite: true });
    }
    previous.current = ch;
  }, [ch, animate]);

  return <span ref={ref} className="cd-digit">{ch}</span>;
}

/**
 * Time left until the deals rotate. Starts at 00:00:00 on the server and first render (the real clock
 * only exists in the browser), then ticks each second. Digits roll only while on screen.
 */
export function Countdown() {
  const t = useTranslations('deals');
  const router = useNextRouter();
  const root = useRef<HTMLDivElement>(null);
  const [seconds, setSeconds] = useState<number | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const tick = () => setSeconds(Math.max(0, Math.floor(msUntilNextDeals() / 1000)));
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    if (!root.current || !('IntersectionObserver' in window)) return;
    const io = new IntersectionObserver(([e]) => setVisible(e.isIntersecting));
    io.observe(root.current);
    return () => io.disconnect();
  }, []);

  // The moment the day rolls over, fetch the new set of deals.
  useEffect(() => {
    if (seconds === 0) router.refresh();
  }, [seconds, router]);

  const s = seconds ?? 0;
  const units = [
    { label: t('hours'), value: Math.floor(s / 3600) },
    { label: t('minutes'), value: Math.floor((s % 3600) / 60) },
    { label: t('seconds'), value: s % 60 },
  ];

  return (
    <>
      <div ref={root} className="countdown" aria-hidden="true">
        {units.map((u, i) => (
          <span key={u.label} style={{ display: 'contents' }}>
            {i > 0 ? <span className="cd-sep">:</span> : null}
            <span className="cd-unit">
              <span className="cd-num">
                {String(u.value).padStart(2, '0').split('').map((ch, k) => (
                  <Digit key={k} ch={ch} animate={visible} />
                ))}
              </span>
              <small>{u.label}</small>
            </span>
          </span>
        ))}
      </div>
      <p className="sr-only">{t('endsAt')}</p>
    </>
  );
}
