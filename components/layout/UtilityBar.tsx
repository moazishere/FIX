import { useTranslations } from 'next-intl';
import { PHONE } from '@/lib/site';
import { Icon, type IconName } from '@/components/ui/Icon';
import { NoteLink } from '@/components/ui/NoteLink';
import { CurrencySwitcher } from './CurrencySwitcher';
import { LanguageSwitcher } from './LanguageSwitcher';

const SOCIALS: { icon: IconName; key: 'photo' | 'chat' | 'deals' | 'video' }[] = [
  { icon: 'camera', key: 'photo' },
  { icon: 'chat', key: 'chat' },
  { icon: 'send', key: 'deals' },
  { icon: 'video', key: 'video' },
];

export function UtilityBar() {
  const t = useTranslations();
  return (
    <div className="utility">
      <div className="container utility-inner">
        <div className="utility-group">
          <span className="utility-item"><Icon name="pin" />{t('utility.address')}</span>
          <span className="utility-item">
            <Icon name="phone" />
            <bdi dir="ltr">{PHONE}</bdi>
          </span>
        </div>
        <div className="utility-group">
          <CurrencySwitcher />
          <LanguageSwitcher />
          <div className="socials">
            {SOCIALS.map(({ icon, key }) => (
              <NoteLink key={key} note={t('footer.soon')} ariaLabel={t(`social.${key}`)}>
                <Icon name={icon} />
              </NoteLink>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
