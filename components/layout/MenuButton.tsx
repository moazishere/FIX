'use client';

import { useTranslations } from 'next-intl';
import { useUi } from '@/lib/ui';
import { Icon } from '@/components/ui/Icon';

export function MenuButton() {
  const t = useTranslations('header');
  const openDrawer = useUi((s) => s.openDrawer);
  return (
    <button type="button" className="menu-btn" aria-label={t('openMenu')} onClick={openDrawer}>
      <Icon name="menu" />
    </button>
  );
}
