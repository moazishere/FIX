import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { Icon } from '@/components/ui/Icon';
import { UtilityBar } from './UtilityBar';
import { MenuButton } from './MenuButton';
import { SearchForm } from './SearchForm';
import { HeaderWidgets } from './HeaderWidgets';
import { NavBar } from './NavBar';

export function Header() {
  const t = useTranslations('header');
  return (
    <header className="site-header">
      <UtilityBar />
      <div className="container mainbar">
        <MenuButton />
        <Link className="logo" href="/" aria-label={t('home')}>
          <span className="logo-mark"><Icon name="bolt" /></span>FIX
        </Link>
        <SearchForm />
        <HeaderWidgets />
      </div>
      <NavBar />
    </header>
  );
}
