'use client';

import { useLocale, useTranslations } from 'next-intl';
import { usePathname, useRouter } from '@/i18n/navigation';
import { routing, type AppLocale } from '@/i18n/routing';
import { Dropdown } from '@/components/ui/Dropdown';
import { Icon } from '@/components/ui/Icon';

function Flag({ locale }: { locale: AppLocale }) {
  if (locale === 'ar') {
    return <span className="flag flag--text" aria-hidden="true">ع</span>;
  }
  return (
    <span className="flag" aria-hidden="true">
      <svg viewBox="0 0 18 12">
        <rect width="18" height="12" fill="#fff" />
        <g fill="#B22234">
          <rect width="18" height="1.72" /><rect y="3.43" width="18" height="1.72" />
          <rect y="6.86" width="18" height="1.72" /><rect y="10.28" width="18" height="1.72" />
        </g>
        <rect width="8" height="6.86" fill="#3C3B6E" />
      </svg>
    </span>
  );
}

export function LanguageSwitcher() {
  const t = useTranslations();
  const locale = useLocale() as AppLocale;
  const pathname = usePathname();
  const router = useRouter();

  function switchTo(next: AppLocale) {
    if (next === locale) return;
    // Keep the same page, filters and section when changing language.
    const { search, hash } = window.location;
    router.replace(`${pathname}${search}${hash}`, { locale: next, scroll: false });
  }

  return (
    <Dropdown
      alignEnd
      role="listbox"
      triggerLabel={t('utility.language')}
      trigger={
        <>
          <Flag locale={locale} />
          <span>{t(`lang.${locale}`)}</span>
          <Icon name="chevron-down" />
        </>
      }
    >
      {routing.locales.map((l) => (
        <button
          key={l}
          type="button"
          role="option"
          lang={l}
          aria-selected={l === locale}
          className={`dd-option${l === locale ? ' is-selected' : ''}`}
          onClick={() => switchTo(l)}
        >
          <Flag locale={l} />
          {t(`lang.${l}`)}
        </button>
      ))}
    </Dropdown>
  );
}
