import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { CATEGORY_IDS } from '@/lib/catalog';
import { filterHref } from '@/lib/filters';
import { PHONE } from '@/lib/site';
import { Icon } from '@/components/ui/Icon';
import { NoteLink } from '@/components/ui/NoteLink';
import { NewsletterBand } from './NewsletterBand';

const PAYMENTS = ['Visa', 'Mastercard', 'PayPal', 'Apple Pay', 'Google Pay'];

export function Footer() {
  const t = useTranslations();
  const soon = t('footer.soon');

  const SOCIALS = [
    { icon: 'camera', key: 'photo' },
    { icon: 'chat', key: 'chat' },
    { icon: 'send', key: 'deals' },
    { icon: 'video', key: 'video' },
  ] as const;

  return (
    <footer className="site-footer">
      <NewsletterBand />
      <div className="footer-main">
        <div className="container footer-grid">
          <div className="footer-brand">
            <Link className="logo logo--dark" href="/" aria-label={t('header.home')}>
              <span className="logo-mark"><Icon name="bolt" /></span>FIX
            </Link>
            <p className="body">{t('footer.about')}</p>
            <p className="caption">
              {t('utility.address')}
              <br />
              <bdi dir="ltr">{PHONE}</bdi>
            </p>
            <div className="footer-socials">
              {SOCIALS.map(({ icon, key }) => (
                <NoteLink key={key} note={soon} ariaLabel={t(`social.${key}`)}>
                  <Icon name={icon} />
                </NoteLink>
              ))}
            </div>
          </div>

          <div className="footer-col">
            <h2 className="footer-h">{t('footer.shop')}</h2>
            <ul>
              {CATEGORY_IDS.filter((c) => c !== 'wearables').map((c) => (
                <li key={c}><Link href={filterHref({ category: c })}>{t(`categories.${c}`)}</Link></li>
              ))}
            </ul>
          </div>

          <div className="footer-col">
            <h2 className="footer-h">{t('footer.support')}</h2>
            <ul>
              {(['helpCenter', 'trackOrder', 'returns', 'warranty'] as const).map((k) => (
                <li key={k}><NoteLink note={soon}>{t(`footer.${k}`)}</NoteLink></li>
              ))}
            </ul>
          </div>

          <div className="footer-col">
            <h2 className="footer-h">{t('footer.company')}</h2>
            <ul>
              {(['aboutUs', 'stores', 'careers', 'press'] as const).map((k) => (
                <li key={k}><NoteLink note={soon}>{t(`footer.${k}`)}</NoteLink></li>
              ))}
            </ul>
          </div>

          <div className="footer-col">
            <h2 className="footer-h">{t('footer.legal')}</h2>
            <ul>
              {(['privacy', 'terms', 'cookies', 'shipping'] as const).map((k) => (
                <li key={k}><NoteLink note={t(`footer.${k}Note`)}>{t(`footer.${k}`)}</NoteLink></li>
              ))}
            </ul>
          </div>
        </div>
      </div>
      <div className="container footer-bottom">
        <span>{t('footer.copyright')}</span>
        <ul className="pay" aria-label={t('footer.payments')}>
          {PAYMENTS.map((p) => <li key={p}>{p}</li>)}
        </ul>
      </div>
    </footer>
  );
}
