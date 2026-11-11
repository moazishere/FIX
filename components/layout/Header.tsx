import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { LogoMark } from '@/components/ui/LogoMark';
import { UtilityBar } from './UtilityBar';
import { MenuButton } from './MenuButton';
import { SearchForm } from './SearchForm';
import { HeaderWidgets } from './HeaderWidgets';
import { NavBar } from './NavBar';
import { HeaderScroll } from './HeaderScroll';

export function Header() {
  const t = useTranslations('header');
  return (
    <header className="site-header">
      <UtilityBar />
      <div className="container mainbar">
        <MenuButton />
        <Link className="logo" href="/" aria-label={t('home')}>
          <LogoMark size={48} priority />
        </Link>
        <SearchForm />
        <HeaderWidgets />
      </div>
      <NavBar />
      <HeaderScroll />
    </header>
  );
}
