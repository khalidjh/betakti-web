'use client';

import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useAuth } from '@/lib/auth/context';
import { auth } from '@/lib/firebase/client';
import { recordReferralSignup } from '@/lib/data/referrals';

export default function RegisterPage() {
  const t = useTranslations();
  const router = useRouter();
  const params = useSearchParams();
  const ref = params.get('ref');
  useEffect(() => {
    if (ref) sessionStorage.setItem('betakti_ref', ref);
  }, [ref]);
  const { registerWithEmail } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    try {
      await registerWithEmail(email, password, name);
      const code = sessionStorage.getItem('betakti_ref');
      const uid = auth.currentUser?.uid;
      if (code && uid) {
        sessionStorage.removeItem('betakti_ref');
        recordReferralSignup(code, uid).catch(() => {});
      }
      router.push('/app/home');
    } catch (err) {
      toast.error((err as Error).message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <h1 className="text-3xl font-bold text-center">{t('nav.register')}</h1>
      <form onSubmit={onSubmit} className="space-y-4">
        <Input
          placeholder="الاسم / Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <Input
          type="email"
          placeholder={t('auth.email')}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <Input
          type="password"
          placeholder={t('auth.password')}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          minLength={6}
        />
        <Button type="submit" disabled={loading} className="w-full">
          {t('nav.register')}
        </Button>
      </form>
      <p className="text-sm text-center">
        <Link href="/auth/login" className="text-[color:var(--primary)]">
          {t('nav.login')}
        </Link>
      </p>
    </>
  );
}
