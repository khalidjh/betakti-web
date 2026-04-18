'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useLocale, useTranslations } from 'next-intl';
import { useAuth } from '@/lib/auth/context';
import { getUserDoc, type UserDoc } from '@/lib/data/users';

export default function SettingsPage() {
  const t = useTranslations();
  const locale = useLocale();
  const { user } = useAuth();
  const [userDoc, setUserDoc] = useState<UserDoc | null>(null);

  useEffect(() => {
    if (user) getUserDoc(user.uid).then(setUserDoc);
  }, [user]);

  if (!user) {
    return (
      <div className="p-10">
        <Link href="/auth/login" className="text-[color:var(--primary)]">
          {t('nav.login')}
        </Link>
      </div>
    );
  }

  const sub = userDoc?.subscription;

  return (
    <div className="p-6 md:p-10 max-w-2xl mx-auto space-y-8">
      <h1 className="text-2xl font-bold">{t('nav.settings')}</h1>

      <section className="space-y-2">
        <h2 className="text-sm font-semibold text-[color:var(--muted-foreground)]">
          {locale === 'ar' ? 'الحساب' : 'Account'}
        </h2>
        <div className="rounded-xl border border-[color:var(--border)] p-4 space-y-1">
          <p className="text-sm">{user.email}</p>
          {user.displayName && <p className="text-sm">{user.displayName}</p>}
        </div>
      </section>

      <section className="space-y-2">
        <h2 className="text-sm font-semibold text-[color:var(--muted-foreground)]">
          {locale === 'ar' ? 'الاشتراك' : 'Subscription'}
        </h2>
        <div className="rounded-xl border border-[color:var(--border)] p-4 flex items-center justify-between">
          <div>
            <p className="font-medium">{sub?.tier === 'pro' ? 'Pro' : 'Free'}</p>
            {sub?.expirationDate && (
              <p className="text-xs text-[color:var(--muted-foreground)]">
                {new Date(sub.expirationDate).toLocaleDateString()}
              </p>
            )}
          </div>
          {sub?.tier !== 'pro' && (
            <Link
              href="/app/subscription"
              className="text-sm text-[color:var(--primary)]"
            >
              {t('subscription.upgrade')}
            </Link>
          )}
        </div>
      </section>

      <section className="space-y-2">
        <h2 className="text-sm font-semibold text-[color:var(--muted-foreground)]">
          {locale === 'ar' ? 'روابط' : 'Links'}
        </h2>
        <div className="rounded-xl border border-[color:var(--border)] p-4 flex flex-col gap-2 text-sm">
          <a href="mailto:support@betakti.com">
            {locale === 'ar' ? 'الدعم' : 'Support'}
          </a>
          <a href="https://twitter.com/khalidjsah" target="_blank" rel="noreferrer">
            Twitter @khalidjsah
          </a>
          <a href="https://instagram.com/khalidjh" target="_blank" rel="noreferrer">
            Instagram @khalidjh
          </a>
        </div>
      </section>
    </div>
  );
}
