'use client';

import { useEffect, useState } from 'react';
import { useLocale } from 'next-intl';
import { toast } from 'sonner';
import { Copy } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/lib/auth/context';
import { getReferralStats, type ReferralStats } from '@/lib/data/referrals';

export default function ReferralsPage() {
  const locale = useLocale();
  const { user } = useAuth();
  const [stats, setStats] = useState<ReferralStats | null>(null);
  const [claiming, setClaiming] = useState(false);

  useEffect(() => {
    if (user) getReferralStats(user.uid).then(setStats);
  }, [user]);

  async function claim() {
    if (!user) return;
    setClaiming(true);
    try {
      const idToken = await user.getIdToken();
      const res = await fetch('/api/referrals/claim', {
        method: 'POST',
        body: JSON.stringify({ idToken }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? 'failed');
      if (data.grantDays) {
        toast.success(
          locale === 'ar'
            ? `تمت إضافة ${data.grantDays} يوماً من برو`
            : `Pro extended by ${data.grantDays} days`,
        );
      } else {
        toast.info(locale === 'ar' ? 'لا توجد مكافآت جاهزة' : 'No rewards ready yet');
      }
      setStats(await getReferralStats(user.uid));
    } catch (e) {
      toast.error((e as Error).message);
    } finally {
      setClaiming(false);
    }
  }

  if (!user) return <div className="p-10">—</div>;

  const link = stats
    ? `${typeof window !== 'undefined' ? window.location.origin : ''}/?ref=${stats.code}`
    : '';

  function copy() {
    navigator.clipboard.writeText(link);
    toast.success(locale === 'ar' ? 'تم النسخ' : 'Copied');
  }

  return (
    <div className="p-6 md:p-10 max-w-xl mx-auto space-y-6">
      <h1 className="text-2xl font-bold">
        {locale === 'ar' ? 'برنامج الإحالة' : 'Referrals'}
      </h1>
      <p className="text-sm text-[color:var(--muted-foreground)]">
        {locale === 'ar'
          ? 'شارك رابطك واحصل على مزايا عند تسجيل أصدقائك.'
          : 'Share your link and earn perks when friends sign up.'}
      </p>

      {stats && (
        <>
          <div className="rounded-xl border border-[color:var(--border)] p-4 space-y-3">
            <p className="text-xs text-[color:var(--muted-foreground)]">
              {locale === 'ar' ? 'رابطك' : 'Your link'}
            </p>
            <div className="flex gap-2">
              <input
                readOnly
                value={link}
                className="flex-1 h-10 rounded-lg border border-[color:var(--border)] bg-transparent px-3 text-sm"
              />
              <Button onClick={copy}>
                <Copy size={14} />
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="rounded-xl border border-[color:var(--border)] p-4">
              <p className="text-xs text-[color:var(--muted-foreground)]">
                {locale === 'ar' ? 'الإحالات' : 'Referrals'}
              </p>
              <p className="text-2xl font-bold">{stats.referralCount}</p>
            </div>
            <div className="rounded-xl border border-[color:var(--border)] p-4">
              <p className="text-xs text-[color:var(--muted-foreground)]">
                {locale === 'ar' ? 'المكافآت' : 'Rewards'}
              </p>
              <p className="text-2xl font-bold">{stats.rewardedCount}</p>
            </div>
          </div>

          <div className="rounded-xl border border-[color:var(--border)] p-4 space-y-3">
            <p className="text-sm">
              {locale === 'ar'
                ? '٣ إحالات = ٣٠ يوماً برو · ١٠ إحالات = سنة كاملة'
                : '3 referrals = 30 days Pro · 10 referrals = 1 year'}
            </p>
            <Button onClick={claim} disabled={claiming}>
              {claiming
                ? '…'
                : locale === 'ar'
                  ? 'استلم المكافأة'
                  : 'Claim reward'}
            </Button>
          </div>
        </>
      )}
    </div>
  );
}
