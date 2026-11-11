import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { filterHref, type Filters } from '@/lib/filters';
import { Icon } from '@/components/ui/Icon';

function pageList(cur: number, total: number): (number | '…')[] {
  if (total <= 5) return Array.from({ length: total }, (_, i) => i + 1);
  const set = new Set([1, total, cur - 1, cur, cur + 1]);
  if (cur <= 3) { set.add(2); set.add(3); }
  if (cur >= total - 2) { set.add(total - 1); set.add(total - 2); }
  const arr = [...set].filter((n) => n >= 1 && n <= total).sort((a, b) => a - b);
  const out: (number | '…')[] = [];
  arr.forEach((n, i) => {
    if (i && n - arr[i - 1] > 1) out.push('…');
    out.push(n);
  });
  return out;
}

export function Pagination({ filters, pages }: { filters: Filters; pages: number }) {
  const t = useTranslations('grid');
  if (pages <= 1) return null;
  const cur = filters.page;
  const href = (page: number) => filterHref({ ...filters, page });

  return (
    <nav className="pagination" aria-label={t('pages')}>
      {cur === 1 ? (
        <span className="page" aria-disabled="true" aria-label={t('prevPage')}><Icon name="chevron-left" /></span>
      ) : (
        <Link className="page" href={href(cur - 1)} aria-label={t('prevPage')}><Icon name="chevron-left" /></Link>
      )}
      {pageList(cur, pages).map((n, i) =>
        n === '…' ? (
          <span key={`gap-${i}`} className="page-ellipsis" aria-hidden="true">…</span>
        ) : (
          <Link key={n} className={`page${n === cur ? ' is-active' : ''}`} href={href(n)} aria-current={n === cur ? 'page' : undefined}>
            {n}
          </Link>
        ),
      )}
      {cur === pages ? (
        <span className="page" aria-disabled="true" aria-label={t('nextPage')}><Icon name="chevron-right" /></span>
      ) : (
        <Link className="page" href={href(cur + 1)} aria-label={t('nextPage')}><Icon name="chevron-right" /></Link>
      )}
    </nav>
  );
}
