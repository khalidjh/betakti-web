'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useAuth } from '@/lib/auth/context';

export default function LoginPage() {
  const t = useTranslations();
  const router = useRouter();
  const { loginWithEmail, loginWithGoogle, loginWithApple } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    try {
      await loginWithEmail(email, password);
      router.push('/app/home');
    } catch (err) {
      toast.error((err as Error).message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <h1 className="text-3xl font-bold text-center">{t('nav.login')}</h1>
      <form onSubmit={onSubmit} className="space-y-4">
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
        />
        <Button type="submit" disabled={loading} className="w-full">
          {t('nav.login')}
        </Button>
      </form>

      <div className="flex items-center gap-3 text-xs text-[color:var(--muted-foreground)]">
        <div className="flex-1 h-px bg-[color:var(--border)]" />
        <span>—</span>
        <div className="flex-1 h-px bg-[color:var(--border)]" />
      </div>

      <div className="space-y-2">
        <Button
          variant="outline"
          className="w-full"
          onClick={async () => {
            try {
              await loginWithGoogle();
              router.push('/app/home');
            } catch (err) {
              toast.error((err as Error).message);
            }
          }}
        >
          {t('auth.continueWithGoogle')}
        </Button>
        <Button
          variant="outline"
          className="w-full"
          onClick={async () => {
            try {
              await loginWithApple();
              router.push('/app/home');
            } catch (err) {
              toast.error((err as Error).message);
            }
          }}
        >
          {t('auth.continueWithApple')}
        </Button>
      </div>

      <div className="flex justify-between text-sm">
        <Link href="/auth/forgot-password" className="text-[color:var(--primary)]">
          {t('auth.forgotPassword')}
        </Link>
        <Link href="/auth/register" className="text-[color:var(--primary)]">
          {t('nav.register')}
        </Link>
      </div>
    </>
  );
}
