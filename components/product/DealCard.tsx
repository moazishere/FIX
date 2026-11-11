import { useLocale } from 'next-intl';
import { discount, type Locale, type Product } from '@/lib/catalog';
import { Link } from '@/i18n/navigation';
import { ProductImage } from './ProductImage';
import { PriceRow } from './PriceRow';
import { AddToCart } from './AddToCart';

export function DealCard({ product }: { product: Product }) {
  const locale = useLocale() as Locale;
  const href = `/product/${product.slug}`;
  return (
    <article className="deal" data-product={product.id}>
      <Link className="deal-media" href={href} tabIndex={-1} aria-hidden="true">
        <ProductImage product={product} sizes="(max-width: 768px) 45vw, 18vw" />
        <span className="deal-off">-{discount(product)}%</span>
      </Link>
      <h3 className="deal-title">
        <Link href={href}>{product.short[locale]}</Link>
      </h3>
      <PriceRow product={product} />
      <AddToCart product={product} variant="button" />
    </article>
  );
}
