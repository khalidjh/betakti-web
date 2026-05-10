import type { PageServerLoad } from './$types';
import { env } from '$env/dynamic/public';

export interface Plan {
  id: 'monthly' | 'yearly' | 'lifetime';
  amount: number; // in SAR halalas (x100) as Moyasar expects
  displayAmount: number; // SAR
  periodKey: 'sub_plan_monthly' | 'sub_plan_yearly' | 'sub_plan_lifetime';
  highlighted: boolean;
}

const PLANS: Plan[] = [
  { id: 'monthly', amount: 1900, displayAmount: 19, periodKey: 'sub_plan_monthly', highlighted: false },
  { id: 'yearly', amount: 13900, displayAmount: 139, periodKey: 'sub_plan_yearly', highlighted: true },
  { id: 'lifetime', amount: 29900, displayAmount: 299, periodKey: 'sub_plan_lifetime', highlighted: false }
];

export const load: PageServerLoad = async ({ locals, url, parent }) => {
  await parent();
  return {
    plans: PLANS,
    status: url.searchParams.get('status'),
    moyasarKey: env.PUBLIC_MOYASAR_PUBLISHABLE_KEY ?? '',
    isPro: locals.user!.subscription === 'pro',
    userId: locals.user!.uid
  };
};
