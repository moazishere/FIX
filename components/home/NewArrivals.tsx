import { useTranslations } from 'next-intl';
import { getAllProducts, onePerLine } from '@/lib/catalog';
import { ProductCard } from '@/components/product/ProductCard';
import { RowSection } from './RowSection';

export function NewArrivals() {
  const t = useTranslations('rows');
  const list = onePerLine([...getAllProducts()].sort((a, b) => b.added - a.added)).slice(0, 10);
  return (
    <RowSection id="new-row" title={t('newTitle')} backLabel={t('newBack')} forwardLabel={t('newForward')}>
      {list.map((p) => <ProductCard key={p.id} product={p} />)}
    </RowSection>
  );
}
