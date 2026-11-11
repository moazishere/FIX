import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { todaysDeals } from '@/lib/deals';
import { filterHref } from '@/lib/filters';
import { DealCard } from '@/components/product/DealCard';
import { Countdown } from './Countdown';
import { ScrollReveal } from './ScrollReveal';

/** The page's one loud moment: a dark band with today's four deals and a countdown. */
export function DealsSection() {
  const t = useTranslations('deals');
  const deals = todaysDeals();

  return (
    <ScrollReveal id="deals" className="deals" labelledBy="deals-title" targets=".deals-intro > *, .deal">
      <div className="container deals-inner">
        <div className="deals-intro">
          <h2 className="h2" id="deals-title">{t('title')}</h2>
          <p className="body">{t('body')}</p>
          <Countdown />
          <Link className="btn btn-primary" href={filterHref({ sale: true })}>{t('cta')}</Link>
        </div>
        <div className="deal-list">
          {deals.map((p) => <DealCard key={p.id} product={p} />)}
        </div>
      </div>
    </ScrollReveal>
  );
}
