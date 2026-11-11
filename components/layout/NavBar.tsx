import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { CATEGORY_IDS } from '@/lib/catalog';
import { filterHref } from '@/lib/filters';
import { Dropdown } from '@/components/ui/Dropdown';
import { Icon } from '@/components/ui/Icon';
import { NoteLink } from '@/components/ui/NoteLink';

export function NavBar() {
  const t = useTranslations();
  const item = 'dd-option';

  return (
    <nav className="navbar" aria-label={t('header.mainNav')}>
      <div className="container navbar-inner">
        <div className="nav-left">
          <Dropdown
            triggerClassName="all-cats"
            trigger={
              <>
                <Icon name="menu" />
                {t('nav.allCategories')}
                <Icon name="chevron-down" />
              </>
            }
          >
            <Link className={item} href={filterHref()}>{t('categories.allProducts')}</Link>
            {CATEGORY_IDS.map((c) => (
              <Link key={c} className={item} href={filterHref({ category: c })}>{t(`categories.${c}`)}</Link>
            ))}
          </Dropdown>

          <ul className="nav-links">
            <li><Link className="nav-link" href="/">{t('nav.home')}</Link></li>
            <li>
              <Dropdown triggerClassName="nav-link" trigger={<>{t('nav.shop')}<Icon name="chevron-down" /></>}>
                <Link className={item} href={filterHref()}>{t('nav.bestSellers')}</Link>
                <Link className={item} href={filterHref({ sort: 'new' })}>{t('nav.newArrivals')}</Link>
                <Link className={item} href={filterHref({ sort: 'rating' })}>{t('nav.topRated')}</Link>
                <Link className={item} href={filterHref({ sale: true })}>{t('nav.onSale')}</Link>
              </Dropdown>
            </li>
            <li><Link className="nav-link" href="/#deals">{t('nav.deals')}</Link></li>
            <li><Link className="nav-link" href={filterHref({ category: 'computers' })}>{t('nav.laptops')}</Link></li>
            <li>
              <Dropdown triggerClassName="nav-link" trigger={<>{t('nav.audio')}<Icon name="chevron-down" /></>}>
                <Link className={item} href={filterHref({ q: 'headphones' })}>{t('nav.headphones')}</Link>
                <Link className={item} href={filterHref({ q: 'earbuds' })}>{t('nav.earbuds')}</Link>
                <Link className={item} href={filterHref({ q: 'speaker' })}>{t('nav.speakers')}</Link>
              </Dropdown>
            </li>
            <li><Link className="nav-link" href={filterHref({ category: 'wearables' })}>{t('nav.wearables')}</Link></li>
            <li><Link className="nav-link" href={filterHref({ category: 'cameras' })}>{t('nav.cameras')}</Link></li>
          </ul>
        </div>
        <div className="nav-promo">
          <NoteLink className="nav-link" note={t('nav.giftCardsNote')}>{t('nav.giftCards')}</NoteLink>
          <NoteLink className="nav-link" note={t('nav.trackOrderNote')}>{t('nav.trackOrder')}</NoteLink>
          <Link className="nav-link nav-link--upper" href={filterHref({ sale: true })}>{t('nav.blackFriday')}</Link>
        </div>
      </div>
    </nav>
  );
}
