import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { getAllProducts, onePerLine } from '@/lib/catalog';
import { filterHref } from '@/lib/filters';
import { Icon } from '@/components/ui/Icon';
import { RankItem } from '@/components/product/RankItem';

export function Trending() {
  const t = useTranslations('trending');
  // Top four by rating × review volume, one finish per product line.
  const top = onePerLine(
    [...getAllProducts()].sort((a, b) => b.rating * Math.log(b.reviews) - a.rating * Math.log(a.reviews)),
  ).slice(0, 4);

  return (
    <section className="container section trending" aria-labelledby="trending-title">
      <aside className="side-promo">
        <h3 className="h3">{t('sideTitle')}</h3>
        <p className="body">{t('sideBody')}</p>
        <Link className="btn btn-primary" href={filterHref({ category: 'wearables' })}>{t('sideCta')}</Link>
        <div className="side-promo-art">
          <Image src="/images/watch-1.jpg" alt={t('sideAlt')} width={800} height={1000} sizes="(max-width: 768px) 60vw, 280px" />
        </div>
      </aside>
      <div className="trending-main">
        <div className="section-head">
          <h2 className="h2" id="trending-title">{t('title')}</h2>
          <Link className="view-all" href={filterHref({ sort: 'rating' })}>
            {t('viewAll')}
            <Icon name="arrow-long" className="i-arrow" />
          </Link>
        </div>
        <ol className="rank-list">
          {top.map((p, i) => <RankItem key={p.id} product={p} rank={i + 1} />)}
        </ol>
      </div>
    </section>
  );
}
