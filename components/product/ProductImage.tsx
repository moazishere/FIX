import Image from 'next/image';
import { useTranslations } from 'next-intl';
import type { Product } from '@/lib/catalog';

/** The product photo. Sizing/cropping is done by the surrounding container's CSS (object-fit: cover). */
export function ProductImage({
  product,
  sizes,
  priority = false,
}: {
  product: Product;
  /** Tell the browser how wide the image renders so it downloads the right size. */
  sizes: string;
  priority?: boolean;
}) {
  const t = useTranslations('alt');
  return <Image src={product.image} alt={t(product.type)} width={800} height={800} sizes={sizes} priority={priority} />;
}
