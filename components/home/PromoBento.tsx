'use client';

import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { filterHref } from '@/lib/filters';
import { FREE_SHIPPING_USD } from '@/lib/money';
import { Money } from '@/components/ui/Money';
import { useToast } from '@/components/ui/Toast';

const PROMO_CODE = 'HELLO10';

/** Client component only because of the two buttons that copy a code / show a note. */
export function PromoBento() {
  const t = useTranslations('bento');
  const tt = useTranslations('toast');
  const toast = useToast();

  async function copyCode() {
    try {
      await navigator.clipboard.writeText(PROMO_CODE);
      toast(tt('codeCopied', { code: PROMO_CODE }));
    } catch {
      toast(tt('codeShown', { code: PROMO_CODE }));
    }
  }

  return (
    <section className="container bento" aria-label={t('label')}>
      <article className="promo promo--large">
        <div className="promo-copy">
          <h2 className="h2">{t('studioTitle')}</h2>
          <p className="body">{t('studioBody')}</p>
          <Link className="btn btn-primary" href={filterHref({ q: 'headphones' })}>{t('studioCta')}</Link>
        </div>
        <div className="promo-art">
          <Image src="/images/promo-headphones.jpg" alt={t('studioAlt')} width={1000} height={1250} sizes="(max-width: 768px) 100vw, 40vw" />
        </div>
      </article>

      <article className="promo promo--small">
        <div className="promo-copy">
          <h3 className="h3">{t('shipTitle')}</h3>
          <p className="body">{t.rich('shipBody', { amount: () => <Money usd={FREE_SHIPPING_USD} whole /> })}</p>
          <button type="button" className="btn btn-primary" onClick={() => toast(t('shipNote'))}>{t('shipCta')}</button>
        </div>
        <div className="promo-art">
          <Image src="/images/speaker.jpg" alt={t('shipAlt')} width={800} height={1000} sizes="(max-width: 768px) 40vw, 20vw" />
        </div>
      </article>

      <article className="promo promo--small">
        <div className="promo-copy">
          <h3 className="h3">{t('codeTitle')}</h3>
          <p className="body">{t.rich('codeBody', { code: (chunks) => <strong className="code">{chunks}</strong> })}</p>
          <button type="button" className="btn btn-primary" onClick={copyCode}>{t('codeCta')}</button>
        </div>
        <div className="promo-art">
          <Image src="/images/controller-1.jpg" alt={t('codeAlt')} width={800} height={533} sizes="(max-width: 768px) 40vw, 20vw" />
        </div>
      </article>
    </section>
  );
}
