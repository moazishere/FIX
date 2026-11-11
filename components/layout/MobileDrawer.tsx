'use client';

import { useEffect, useRef } from 'react';
import { useTranslations } from 'next-intl';
import { Link, usePathname } from '@/i18n/navigation';
import { CATEGORY_IDS } from '@/lib/catalog';
import { filterHref } from '@/lib/filters';
import { PHONE } from '@/lib/site';
import { useUi } from '@/lib/ui';
import { Icon } from '@/components/ui/Icon';
import { LogoMark } from '@/components/ui/LogoMark';

export function MobileDrawer() {
  const t = useTranslations();
  const open = useUi((s) => s.drawerOpen);
  const close = useUi((s) => s.closeDrawer);
  const pathname = usePathname();
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;
    closeRef.current?.focus();
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && close();
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [open, close]);

  // Any navigation closes the drawer.
  useEffect(() => close(), [pathname, close]);

  return (
    <div className={`drawer${open ? ' is-open' : ''}`} aria-hidden={!open}>
      <div className="drawer-scrim" onClick={close} />
      <div className="drawer-panel" role="dialog" aria-modal="true" aria-label={t('drawer.label')}>
        <div className="drawer-head">
          <span className="logo logo--dark"><LogoMark size={44} /><span className="sr-only">FIX</span></span>
          <button ref={closeRef} type="button" className="drawer-close" aria-label={t('drawer.close')} onClick={close}>
            <Icon name="x" />
          </button>
        </div>
        <p className="overline">{t('drawer.categories')}</p>
        <ul className="drawer-list" onClick={close}>
          <li><Link className="drawer-link" href={filterHref()}>{t('categories.allProducts')}</Link></li>
          {CATEGORY_IDS.map((c) => (
            <li key={c}><Link className="drawer-link" href={filterHref({ category: c })}>{t(`categories.${c}`)}</Link></li>
          ))}
        </ul>
        <p className="overline">{t('drawer.offers')}</p>
        <ul className="drawer-list" onClick={close}>
          <li><Link className="drawer-link" href="/#deals">{t('nav.deals')}</Link></li>
          <li><Link className="drawer-link" href={filterHref({ sale: true })}>{t('grid.blackFridayDeals')}</Link></li>
          <li><Link className="drawer-link" href={filterHref({ sort: 'new' })}>{t('nav.newArrivals')}</Link></li>
          <li><Link className="drawer-link" href={filterHref({ sort: 'rating' })}>{t('nav.topRated')}</Link></li>
        </ul>
        <p className="caption drawer-contact">
          {t('utility.address')}
          <br />
          <bdi dir="ltr">{PHONE}</bdi>
        </p>
      </div>
    </div>
  );
}
