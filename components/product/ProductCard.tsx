import { useLocale, useTranslations } from 'next-intl';
import { discount, localName, type Locale, type Product } from '@/lib/catalog';
import { Link } from '@/i18n/navigation';
import { ProductImage } from './ProductImage';
import { Rating } from './Rating';
import { PriceRow } from './PriceRow';
import { WishButton } from './WishButton';
import { ShareButton } from './ShareButton';
import { AddToCart } from './AddToCart';

/** Short category label ("Phones" instead of "Phones & Tablets"). */
export const shortCategoryKey = (c: Product['category']) => (c === 'phones' ? 'phonesShort' : c);

export function ProductCard({ product, priority = false }: { product: Product; priority?: boolean }) {
  const locale = useLocale() as Locale;
  const t = useTranslations();
  const off = discount(product);
  const name = localName(product, locale, t(`finish.${product.finish}`));
  const href = `/product/${product.slug}`;

  return (
    <article className="card" data-product={product.id}>
      <div className="card-media">
        <Link className="card-media-link" href={href} tabIndex={-1} aria-hidden="true">
          <ProductImage product={product} sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 20vw" priority={priority} />
        </Link>
        {off ? <span className="badge">-{off}%</span> : null}
        <div className="card-actions">
          <WishButton product={product} />
          <ShareButton product={product} />
        </div>
        <AddToCart product={product} variant="bar" />
      </div>
      <span className="overline">{t(`categories.${shortCategoryKey(product.category)}`)}</span>
      <h3 className="card-title">
        <Link href={href} title={name}>
          {name}
        </Link>
      </h3>
      <Rating product={product} />
      <PriceRow product={product} />
    </article>
  );
}
