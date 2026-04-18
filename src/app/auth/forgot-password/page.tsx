'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useAuth } from '@/lib/auth/context';

export default function ForgotPasswordPage() {
  const t = useTranslations();
  const { resetPassword } = useAuth();
  const [email, setEmail] = useState('');
  const [sent, setSent] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    try {
      await resetPassword(email);
      setSent(true);
    } catch (err) {
      toast.error((err as Error).message);
    }
  }

  return (
    <>
      <h1 className="text-2xl font-bold text-center">{t('auth.forgotPassword')}</h1>
      {sent ? (
        <p className="text-center">✓</p>
      ) : (
        <form onSubmit={onSubmit} className="space-y-4">
          <Input
            type="email"
            placeholder={t('auth.email')}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <Button type="submit" className="w-full">
            {t('auth.forgotPassword')}
          </Button>
        </form>
      )}
      <p className="text-sm text-center">
        <Link href="/auth/login" className="text-[color:var(--primary)]">
          {t('nav.login')}
        </Link>
      </p>
    </>
  );
}
