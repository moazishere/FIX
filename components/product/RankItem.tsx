import { useLocale, useTranslations } from 'next-intl';
import { localName, type Locale, type Product } from '@/lib/catalog';
import { Link } from '@/i18n/navigation';
import { ProductImage } from './ProductImage';
import { Rating } from './Rating';
import { PriceRow } from './PriceRow';
import { WishButton } from './WishButton';
import { ShareButton } from './ShareButton';
import { AddToCart } from './AddToCart';
import { shortCategoryKey } from './ProductCard';

export function RankItem({ product, rank }: { product: Product; rank: number }) {
  const locale = useLocale() as Locale;
  const t = useTranslations();
  const href = `/product/${product.slug}`;
  return (
    <li className="rank-item" data-product={product.id}>
      <span className="rank-badge" aria-label={t('product.rank', { n: rank })}>
        {String(rank).padStart(2, '0')}
      </span>
      <Link className="rank-media" href={href} tabIndex={-1} aria-hidden="true">
        <ProductImage product={product} sizes="120px" />
      </Link>
      <div className="rank-details">
        <span className="overline">{t(`categories.${shortCategoryKey(product.category)}`)}</span>
        <h3 className="card-title">
          <Link href={href}>{localName(product, locale, t(`finish.${product.finish}`))}</Link>
        </h3>
        <Rating product={product} />
        <PriceRow product={product} />
      </div>
      <div className="rank-actions">
        <AddToCart product={product} variant="icon" />
        <WishButton product={product} />
        <ShareButton product={product} />
      </div>
    </li>
  );
}
