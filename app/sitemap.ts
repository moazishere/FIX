import type { MetadataRoute } from 'next';
import { routing } from '@/i18n/routing';
import { getAllProducts } from '@/lib/catalog';

const SITE = process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000';

export default function sitemap(): MetadataRoute.Sitemap {
  const paths = ['', ...getAllProducts().map((p) => `/product/${p.slug}`)];
  return paths.flatMap((path) =>
    routing.locales.map((locale) => ({
      url: `${SITE}/${locale}${path}`,
      alternates: {
        languages: Object.fromEntries(routing.locales.map((l) => [l, `${SITE}/${l}${path}`])),
      },
    })),
  );
}
