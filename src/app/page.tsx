import Link from 'next/link';
import { getTranslations } from 'next-intl/server';

export default async function LandingPage() {
  const t = await getTranslations();

  return (
    <main className="flex-1 flex flex-col items-center justify-center px-6 py-20 text-center">
      <h1 className="text-5xl md:text-7xl font-bold tracking-tight">{t('app.name')}</h1>
      <p className="mt-6 text-lg md:text-xl text-[color:var(--muted-foreground)] max-w-2xl">
        {t('app.tagline')}
      </p>
      <div className="mt-10 flex gap-4">
        <Link
          href="/app/home"
          className="rounded-full bg-[color:var(--primary)] text-[color:var(--primary-foreground)] px-8 py-3 font-medium"
        >
          {t('home.startNewDesign')}
        </Link>
        <Link
          href="/auth/login"
          className="rounded-full border border-[color:var(--border)] px-8 py-3 font-medium"
        >
          {t('nav.login')}
        </Link>
      </div>
    </main>
  );
}
