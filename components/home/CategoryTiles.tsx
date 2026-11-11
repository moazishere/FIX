import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { CATEGORY_IDS, countInCategory, type CategoryId } from '@/lib/catalog';
import { filterHref } from '@/lib/filters';

const TILE: Record<CategoryId, { image: string; w: number; h: number }> = {
  audio: { image: 'headphones', w: 800, h: 1000 },
  computers: { image: 'laptop-2', w: 800, h: 533 },
  phones: { image: 'phonefront', w: 800, h: 1000 },
  wearables: { image: 'watch-2', w: 800, h: 1000 },
  cameras: { image: 'camera-2', w: 800, h: 533 },
  gaming: { image: 'controller-2', w: 800, h: 533 },
};

export function CategoryTiles() {
  const t = useTranslations();
  return (
    <section className="container section" aria-labelledby="cats-title">
      <div className="section-head">
        <h2 className="h2" id="cats-title">{t('shopByCategory.title')}</h2>
      </div>
      <ul className="cats">
        {CATEGORY_IDS.map((c) => (
          <li key={c}>
            <Link className="cat" href={filterHref({ category: c })}>
              <span className="cat-media">
                <Image src={`/images/${TILE[c].image}.jpg`} alt="" width={TILE[c].w} height={TILE[c].h} sizes="(max-width: 768px) 30vw, 16vw" />
              </span>
              <span className="cat-name">{t(`categories.${c}`)}</span>
              <span className="cat-count">{t('categories.count', { n: countInCategory(c) })}</span>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
