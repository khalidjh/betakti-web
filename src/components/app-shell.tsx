'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useLocale, useTranslations } from 'next-intl';
import {
  Home as HomeIcon,
  LayoutGrid,
  FolderClosed,
  Settings as SettingsIcon,
  LogIn,
  LogOut,
  Languages,
  Users,
  Wand2,
  Gift,
} from 'lucide-react';
import type { ReactNode } from 'react';
import { cn } from '@/lib/utils';
import { useAuth } from '@/lib/auth/context';
import { Button } from './ui/button';

const NAV = [
  { href: '/app/home', icon: HomeIcon, key: 'nav.home' as const, label: null },
  { href: '/app/templates', icon: LayoutGrid, key: 'nav.templates' as const, label: null },
  { href: '/app/community', icon: Users, key: null, label: { ar: 'المجتمع', en: 'Community' } },
  { href: '/app/projects', icon: FolderClosed, key: 'nav.projects' as const, label: null },
  {
    href: '/app/tools/ai-style',
    icon: Wand2,
    key: null,
    label: { ar: 'تحويل الستايل', en: 'AI Style' },
  },
  { href: '/app/referrals', icon: Gift, key: null, label: { ar: 'الإحالة', en: 'Referrals' } },
  { href: '/app/settings', icon: SettingsIcon, key: 'nav.settings' as const, label: null },
];

export function AppShell({ children }: { children: ReactNode }) {
  const t = useTranslations();
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();
  const { user, logout } = useAuth();

  async function toggleLocale() {
    const next = locale === 'ar' ? 'en' : 'ar';
    await fetch('/api/locale', {
      method: 'POST',
      body: JSON.stringify({ locale: next }),
    });
    router.refresh();
  }

  return (
    <div className="flex-1 grid grid-cols-[240px_1fr] min-h-screen">
      <aside className="border-e border-[color:var(--border)] flex flex-col p-4 gap-2">
        <Link href="/" className="text-xl font-bold mb-4 px-2">
          {t('app.name')}
        </Link>
        <nav className="flex-1 flex flex-col gap-1">
          {NAV.map((item) => {
            const active = pathname.startsWith(item.href);
            const Icon = item.icon;
            const text = item.key
              ? t(item.key)
              : locale === 'ar'
                ? item.label?.ar
                : item.label?.en;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  'flex items-center gap-3 px-3 py-2 rounded-lg text-sm',
                  active
                    ? 'bg-[color:var(--muted)] text-[color:var(--foreground)]'
                    : 'text-[color:var(--muted-foreground)] hover:bg-[color:var(--muted)]',
                )}
              >
                <Icon size={18} />
                {text}
              </Link>
            );
          })}
        </nav>

        <div className="flex flex-col gap-2 border-t border-[color:var(--border)] pt-3">
          <Button variant="ghost" size="sm" onClick={toggleLocale}>
            <Languages size={16} />
            {locale === 'ar' ? 'English' : 'عربي'}
          </Button>
          {user ? (
            <Button variant="ghost" size="sm" onClick={() => logout()}>
              <LogOut size={16} />
              {t('nav.logout')}
            </Button>
          ) : (
            <Button variant="ghost" size="sm" onClick={() => router.push('/auth/login')}>
              <LogIn size={16} />
              {t('nav.login')}
            </Button>
          )}
        </div>
      </aside>

      <main className="overflow-auto">{children}</main>
    </div>
  );
}
