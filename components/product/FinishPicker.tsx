import { useTranslations } from 'next-intl';
import { getFinishes, type Product } from '@/lib/catalog';
import { Link } from '@/i18n/navigation';

const SWATCH = { graphite: '#2E2F35', silver: '#CDCFD5', sand: '#D8D1C3' } as const;

/** The three finishes of a product line as colour swatches. Each is a link to that finish's page. */
export function FinishPicker({ product }: { product: Product }) {
  const t = useTranslations('finish');
  return (
    <fieldset className="finish">
      <legend>
        {t('label')} <strong>{t(product.finish)}</strong>
      </legend>
      <div className="swatches">
        {getFinishes(product.line).map((v) => (
          <Link
            key={v.id}
            replace
            scroll={false}
            href={`/product/${v.slug}`}
            className={`swatch${v.id === product.id ? ' is-on' : ''}`}
            aria-label={t(v.finish)}
            aria-current={v.id === product.id ? 'true' : undefined}
            style={{ '--sw': SWATCH[v.finish] } as React.CSSProperties}
          />
        ))}
      </div>
    </fieldset>
  );
}
