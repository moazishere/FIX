import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { filterHref } from '@/lib/filters';

export default function NotFound() {
  const t = useTranslations('notFound');
  return (
    <div className="container section">
      <div className="empty">
        <p className="h2">{t('title')}</p>
        <p className="body">{t('body')}</p>
        <Link className="btn btn-primary" href={filterHref()}>{t('cta')}</Link>
      </div>
    </div>
  );
}
