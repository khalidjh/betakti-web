import type { Metadata } from 'next';
import { Cairo, Inter } from 'next/font/google';
import { NextIntlClientProvider } from 'next-intl';
import { getLocale, getMessages } from 'next-intl/server';
import { localeDir, type Locale } from '@/i18n/config';
import { Providers } from '@/components/providers';
import './globals.css';

const cairo = Cairo({
  variable: '--font-cairo',
  subsets: ['arabic', 'latin'],
  display: 'swap',
});

const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Betakti — بطاقتي',
  description: 'Arabic-first design & greeting card editor.',
};

export default async function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const locale = (await getLocale()) as Locale;
  const messages = await getMessages();
  const dir = localeDir[locale] ?? 'rtl';

  return (
    <html
      lang={locale}
      dir={dir}
      className={`${cairo.variable} ${inter.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-background text-foreground">
        <NextIntlClientProvider locale={locale} messages={messages}>
          <Providers dir={dir}>{children}</Providers>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
