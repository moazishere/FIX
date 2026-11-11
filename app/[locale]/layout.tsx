import type { Metadata, Viewport } from 'next';
import type { ReactNode } from 'react';
import { notFound } from 'next/navigation';
import { IBM_Plex_Sans_Arabic, Poppins } from 'next/font/google';
import { hasLocale, NextIntlClientProvider } from 'next-intl';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { isRtl, routing } from '@/i18n/routing';
import { IconSprite } from '@/components/ui/Icon';
import { StoreHydrator } from '@/components/ui/StoreHydrator';
import { ToastProvider } from '@/components/ui/Toast';
import { AnnouncementBar } from '@/components/layout/AnnouncementBar';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { MobileDrawer } from '@/components/layout/MobileDrawer';
import { CartSheet } from '@/components/cart/CartSheet';
import '../globals.css';

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-poppins',
  display: 'swap',
});

// Arabic glyphs only download when Arabic text is on the page (unicode-range subsetting).
const plexArabic = IBM_Plex_Sans_Arabic({
  subsets: ['arabic'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-arabic',
  display: 'swap',
});

// Colours the mobile browser chrome to match the header (--header in globals.css).
export const viewport: Viewport = { themeColor: '#3F3A34' };

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'meta' });
  return {
    metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000'),
    title: { default: t('title'), template: `%s | ${t('title')}` },
    description: t('description'),
    alternates: {
      languages: Object.fromEntries(routing.locales.map((l) => [l, `/${l}`])),
    },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();
  setRequestLocale(locale);
  const t = await getTranslations('a11y');

  return (
    // data-scroll-behavior tells Next that CSS smooth scrolling is on, so route changes jump to the top
    // instantly instead of gliding up through the whole page.
    <html lang={locale} dir={isRtl(locale) ? 'rtl' : 'ltr'} data-scroll-behavior="smooth" className={`${poppins.variable} ${plexArabic.variable}`}>
      <body id="top">
        <NextIntlClientProvider>
          <ToastProvider>
            <StoreHydrator />
            <IconSprite />
            <a className="skip-link" href="#main">{t('skip')}</a>
            <AnnouncementBar />
            <Header />
            <main id="main">{children}</main>
            <Footer />
            <MobileDrawer />
            <CartSheet />
          </ToastProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
