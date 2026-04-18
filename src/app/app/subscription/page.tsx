'use client';

import Script from 'next/script';
import { useEffect, useRef, useState } from 'react';
import { useLocale, useTranslations } from 'next-intl';
import { Check } from 'lucide-react';
import { useAuth } from '@/lib/auth/context';
import { PLANS, type PlanInfo } from '@/lib/moyasar/plans';
import { cn } from '@/lib/utils';
import type { SubscriptionPlan } from '@/lib/types/subscription';

declare global {
  interface Window {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    Moyasar?: any;
  }
}

const BENEFITS_AR = [
  'قوالب مميزة',
  'جميع الخطوط (60+)',
  'ملصقات مميزة',
  'تصدير عالي الدقة (2x, 3x)',
  'تصدير PDF و GIF',
  'إزالة العلامة المائية',
];
const BENEFITS_EN = [
  'Premium templates',
  'All 60+ fonts',
  'Premium stickers',
  'HD export (2x, 3x)',
  'PDF & GIF export',
  'No watermark',
];

export default function SubscriptionPage() {
  const t = useTranslations();
  const locale = useLocale();
  const { user } = useAuth();
  const [plan, setPlan] = useState<SubscriptionPlan>('yearly');
  const [scriptReady, setScriptReady] = useState(false);
  const formRef = useRef<HTMLDivElement>(null);

  const selected = PLANS.find((p) => p.id === plan) ?? PLANS[1];

  useEffect(() => {
    if (!scriptReady || !user || !formRef.current || !window.Moyasar) return;
    formRef.current.innerHTML = '';
    const publishableKey = process.env.NEXT_PUBLIC_MOYASAR_PUBLISHABLE_KEY;
    window.Moyasar.init({
      element: formRef.current,
      amount: selected.priceHalalas,
      currency: selected.currency,
      description: `Betakti Pro - ${selected.labelEn}`,
      publishable_api_key: publishableKey,
      callback_url: `${window.location.origin}/api/moyasar/callback?plan=${selected.id}&uid=${user.uid}`,
      methods: ['creditcard', 'applepay', 'stcpay'],
      metadata: { userId: user.uid, plan: selected.id },
    });
  }, [scriptReady, plan, user, selected]);

  return (
    <>
      <Script
        src="https://cdn.moyasar.com/mpf/1.15.0/moyasar.js"
        onReady={() => setScriptReady(true)}
      />
      <link rel="stylesheet" href="https://cdn.moyasar.com/mpf/1.15.0/moyasar.css" />

      <div className="p-6 md:p-10 max-w-4xl mx-auto space-y-8">
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-bold">{t('subscription.upgrade')}</h1>
        </div>

        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 max-w-xl mx-auto">
          {(locale === 'ar' ? BENEFITS_AR : BENEFITS_EN).map((b) => (
            <li key={b} className="flex items-center gap-2 text-sm">
              <Check size={16} className="text-[color:var(--primary)]" />
              {b}
            </li>
          ))}
        </ul>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {PLANS.map((p: PlanInfo) => (
            <button
              key={p.id}
              onClick={() => setPlan(p.id)}
              className={cn(
                'p-5 rounded-xl border text-start transition',
                plan === p.id
                  ? 'border-[color:var(--primary)] bg-[color:var(--muted)]'
                  : 'border-[color:var(--border)]',
              )}
            >
              <div className="flex items-center justify-between">
                <span className="font-semibold">
                  {locale === 'ar' ? p.labelAr : p.labelEn}
                </span>
                {p.id === 'yearly' && (
                  <span className="text-[10px] bg-[color:var(--primary)] text-[color:var(--primary-foreground)] rounded px-1.5 py-0.5">
                    {t('subscription.recommended')}
                  </span>
                )}
              </div>
              <p className="text-sm text-[color:var(--muted-foreground)] mt-1">
                {locale === 'ar' ? p.billedAr : p.billedEn}
              </p>
            </button>
          ))}
        </div>

        {!user ? (
          <p className="text-center text-sm text-[color:var(--muted-foreground)]">
            {locale === 'ar' ? 'سجل الدخول للمتابعة' : 'Log in to continue'}
          </p>
        ) : (
          <div ref={formRef} className="mysr-form max-w-xl mx-auto" />
        )}
      </div>
    </>
  );
}
