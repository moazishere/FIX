import { useTranslations } from 'next-intl';

/** Partner wordmarks (placeholder artwork — replace with real, licensed logos). */
export function BrandStrip() {
  const t = useTranslations('brands');
  return (
    <section className="container logos" aria-label={t('label')}>
      <svg className="brand" viewBox="0 0 120 32" role="img" aria-label="Voltra">
        <path d="M3 7l9 18 9-18" fill="none" stroke="currentColor" strokeWidth="3.5" strokeLinejoin="round" />
        <text x="28" y="23" fontSize="20" fontWeight="700">voltra</text>
      </svg>
      <svg className="brand" viewBox="0 0 140 32" role="img" aria-label="Nordex">
        <rect x="5" y="8" width="16" height="16" transform="rotate(45 13 16)" fill="none" stroke="currentColor" strokeWidth="3" />
        <text x="32" y="22" fontSize="15" fontWeight="600" letterSpacing="3">NORDEX</text>
      </svg>
      <svg className="brand" viewBox="0 0 124 32" role="img" aria-label="Auralis">
        <circle cx="13" cy="16" r="11" fill="none" stroke="currentColor" strokeWidth="2.5" />
        <circle cx="13" cy="16" r="5" fill="currentColor" />
        <text x="31" y="23" fontSize="20" fontWeight="500">auralis</text>
      </svg>
      <svg className="brand" viewBox="0 0 124 32" role="img" aria-label="Kinetiq">
        <rect x="2" y="7" width="18" height="6" rx="1.5" fill="currentColor" />
        <rect x="8" y="19" width="18" height="6" rx="1.5" fill="currentColor" />
        <text x="33" y="23" fontSize="19" fontWeight="700" fontStyle="italic">Kinetiq</text>
      </svg>
      <svg className="brand" viewBox="0 0 140 32" role="img" aria-label="Pixelon">
        <rect x="2" y="6" width="9" height="9" fill="currentColor" />
        <rect x="13" y="6" width="9" height="9" fill="none" stroke="currentColor" strokeWidth="2" />
        <rect x="2" y="17" width="9" height="9" fill="none" stroke="currentColor" strokeWidth="2" />
        <rect x="13" y="17" width="9" height="9" fill="currentColor" />
        <text x="31" y="22" fontSize="15" fontWeight="600" letterSpacing="2">PIXELON</text>
      </svg>
    </section>
  );
}
