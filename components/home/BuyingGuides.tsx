import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { filterHref } from '@/lib/filters';
import type { CategoryId } from '@/lib/catalog';
import { Icon } from '@/components/ui/Icon';
import { GuideItem } from './GuideItem';

const GUIDES: { n: 1 | 2 | 3; image: string; w: number; h: number; category: CategoryId }[] = [
  { n: 1, image: 'hero-1', w: 1400, h: 933, category: 'audio' },
  { n: 2, image: 'laptop-2', w: 800, h: 533, category: 'computers' },
  { n: 3, image: 'camera-1', w: 800, h: 533, category: 'cameras' },
];

export function BuyingGuides() {
  const t = useTranslations('guides');
  return (
    <section className="container section" aria-labelledby="guides-title">
      <div className="section-head">
        <h2 className="h2" id="guides-title">{t('title')}</h2>
      </div>
      <div className="guides">
        {GUIDES.map((g) => (
          <GuideItem
            key={g.n}
            summary={
              <>
                <span className="guide-media">
                  <Image src={`/images/${g.image}.jpg`} alt="" width={g.w} height={g.h} sizes="(max-width: 768px) 100vw, 33vw" />
                </span>
                <span className="guide-text">
                  <span className="h3">{t(`g${g.n}Title`)}</span>
                  <span className="body">{t(`g${g.n}Body`)}</span>
                  <span className="guide-toggle">
                    <span className="when-closed">{t('open')}</span>
                    <span className="when-open">{t('close')}</span>
                    <Icon name="chevron-down" />
                  </span>
                </span>
              </>
            }
          >
            <ul>
              {([1, 2, 3, 4] as const).map((i) => <li key={i}>{t(`g${g.n}t${i}`)}</li>)}
            </ul>
            <Link className="btn btn-primary" href={filterHref({ category: g.category })}>{t(`g${g.n}Cta`)}</Link>
          </GuideItem>
        ))}
      </div>
    </section>
  );
}
