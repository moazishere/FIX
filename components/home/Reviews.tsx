import { useTranslations } from 'next-intl';
import { Icon } from '@/components/ui/Icon';

/**
 * SAMPLE CONTENT — these three reviews are placeholders written for the demo. Replace them with
 * real customer reviews (with permission) before launch; fabricated reviews are illegal in many markets.
 */
const REVIEWS = [
  { key: 'r1', rating: 5 },
  { key: 'r2', rating: 5 },
  { key: 'r3', rating: 4 },
] as const;

export function Reviews() {
  const t = useTranslations('reviews');
  return (
    <section className="container section" aria-labelledby="reviews-title">
      <div className="section-head">
        <h2 className="h2" id="reviews-title">{t('title')}</h2>
      </div>
      <div className="reviews">
        {REVIEWS.map(({ key, rating }) => (
          <figure className="review" key={key}>
            <span className="stars" aria-hidden="true">
              {[1, 2, 3, 4, 5].map((i) => <Icon key={i} name="star" className={i <= rating ? undefined : 'is-off'} />)}
            </span>
            <span className="sr-only">{t('rated', { rating })}</span>
            <blockquote>{t(key)}</blockquote>
            <figcaption>
              <strong>{t(`${key}by`)}</strong>
              {t(`${key}item`)}
            </figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}
