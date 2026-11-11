import { useLocale, useTranslations } from 'next-intl';
import type { Locale } from '@/lib/catalog';
import { getContent, specText } from '@/lib/product-content';

export function SpecsTable({ line }: { line: number }) {
  const t = useTranslations('specs');
  const locale = useLocale() as Locale;
  const { specs } = getContent(line);

  return (
    <dl className="specs">
      {specs.map(([key, value]) => (
        <div className="spec-row" key={key}>
          <dt>{t(key)}</dt>
          {/* <bdi> keeps Latin model names and numbers tidy inside Arabic text */}
          <dd><bdi>{specText(value, locale)}</bdi></dd>
        </div>
      ))}
    </dl>
  );
}
