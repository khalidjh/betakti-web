import type { SubscriptionPlan } from '@/lib/types/subscription';

export interface PlanInfo {
  id: SubscriptionPlan;
  priceHalalas: number; // SAR × 100
  currency: 'SAR';
  periodDays: number | null; // null = lifetime
  labelAr: string;
  labelEn: string;
  billedAr: string;
  billedEn: string;
}

export const PLANS: PlanInfo[] = [
  {
    id: 'monthly',
    priceHalalas: 1900,
    currency: 'SAR',
    periodDays: 30,
    labelAr: 'شهري',
    labelEn: 'Monthly',
    billedAr: '19 ر.س / شهرياً',
    billedEn: 'SAR 19 / month',
  },
  {
    id: 'yearly',
    priceHalalas: 14900,
    currency: 'SAR',
    periodDays: 365,
    labelAr: 'سنوي',
    labelEn: 'Yearly',
    billedAr: '149 ر.س / سنوياً',
    billedEn: 'SAR 149 / year',
  },
  {
    id: 'lifetime',
    priceHalalas: 49900,
    currency: 'SAR',
    periodDays: null,
    labelAr: 'مدى الحياة',
    labelEn: 'Lifetime',
    billedAr: '499 ر.س مرة واحدة',
    billedEn: 'SAR 499 once',
  },
];

export function getPlan(id: SubscriptionPlan): PlanInfo {
  const p = PLANS.find((x) => x.id === id);
  if (!p) throw new Error(`Unknown plan: ${id}`);
  return p;
}
