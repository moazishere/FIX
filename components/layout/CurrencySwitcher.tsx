'use client';

import { useTranslations } from 'next-intl';
import { CURRENCY_CODES } from '@/lib/money';
import { useShop } from '@/lib/store';
import { Dropdown } from '@/components/ui/Dropdown';
import { Icon } from '@/components/ui/Icon';

export function CurrencySwitcher() {
  const t = useTranslations('utility');
  const currency = useShop((s) => s.currency);
  const setCurrency = useShop((s) => s.setCurrency);

  return (
    <Dropdown
      alignEnd
      role="listbox"
      triggerLabel={t('currency')}
      trigger={
        <>
          <span>{currency}</span>
          <Icon name="chevron-down" />
        </>
      }
    >
      {CURRENCY_CODES.map((code) => (
        <button
          key={code}
          type="button"
          role="option"
          aria-selected={code === currency}
          className={`dd-option${code === currency ? ' is-selected' : ''}`}
          onClick={() => setCurrency(code)}
        >
          {t(code.toLowerCase() as 'usd' | 'eur' | 'gbp').replace(' ', '  ')}
        </button>
      ))}
    </Dropdown>
  );
}
