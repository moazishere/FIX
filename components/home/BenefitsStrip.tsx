import { useTranslations } from 'next-intl';
import { FREE_SHIPPING_USD } from '@/lib/money';
import { Icon, type IconName } from '@/components/ui/Icon';
import { Money } from '@/components/ui/Money';

const ITEMS: { icon: IconName; key: 'shipping' | 'warranty' | 'returns' | 'support' }[] = [
  { icon: 'truck', key: 'shipping' },
  { icon: 'shield', key: 'warranty' },
  { icon: 'return', key: 'returns' },
  { icon: 'headset', key: 'support' },
];

export function BenefitsStrip() {
  const t = useTranslations('benefits');
  return (
    <section className="container services" aria-label={t('label')}>
      {ITEMS.map(({ icon, key }) => (
        <div className="service" key={key}>
          <Icon name={icon} />
          <div>
            <strong>{t(`${key}Title`)}</strong>
            <span>
              {key === 'shipping'
                ? t.rich('shippingBody', { amount: () => <Money usd={FREE_SHIPPING_USD} whole /> })
                : t(`${key}Body`)}
            </span>
          </div>
        </div>
      ))}
    </section>
  );
}
