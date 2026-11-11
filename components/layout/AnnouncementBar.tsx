'use client';

import { useSyncExternalStore } from 'react';
import { useTranslations } from 'next-intl';
import { FREE_SHIPPING_USD } from '@/lib/money';
import { Icon } from '@/components/ui/Icon';
import { Money } from '@/components/ui/Money';

const KEY = 'fix-announce';
const EVENT = 'fix-announce-change';

function subscribe(cb: () => void) {
  window.addEventListener('storage', cb);
  window.addEventListener(EVENT, cb);
  return () => {
    window.removeEventListener('storage', cb);
    window.removeEventListener(EVENT, cb);
  };
}
const read = () => {
  try { return localStorage.getItem(KEY) === 'off'; } catch { return false; }
};

export function AnnouncementBar() {
  const t = useTranslations('announce');
  // Server render + hydration use `false` (bar shown); the saved choice applies right after.
  const dismissed = useSyncExternalStore(subscribe, read, () => false);
  if (dismissed) return null;

  return (
    <div className="announce">
      <div className="container announce-inner">
        <p>{t.rich('text', { amount: () => <Money usd={FREE_SHIPPING_USD} whole /> })}</p>
        <button
          type="button"
          className="announce-close"
          aria-label={t('dismiss')}
          onClick={() => {
            try { localStorage.setItem(KEY, 'off'); } catch { /* storage unavailable: hide for this view only */ }
            window.dispatchEvent(new Event(EVENT));
          }}
        >
          <Icon name="x" />
        </button>
      </div>
    </div>
  );
}
