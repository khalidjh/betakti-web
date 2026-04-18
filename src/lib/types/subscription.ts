export type SubscriptionTier = 'free' | 'pro';
export type SubscriptionPlan = 'monthly' | 'yearly' | 'lifetime';

export interface SubscriptionStatus {
  tier: SubscriptionTier;
  isActive: boolean;
  plan?: SubscriptionPlan;
  isLifetime: boolean;
  expirationDate?: number;
  productId?: string;
}

export const DEFAULT_SUBSCRIPTION: SubscriptionStatus = {
  tier: 'free',
  isActive: true,
  isLifetime: false,
};

export interface SubscriptionRecord {
  id: string;
  userId: string;
  moyasarPaymentId: string;
  moyasarToken?: string;
  plan: SubscriptionPlan;
  amount: number;
  currency: string;
  status: 'paid' | 'failed' | 'refunded' | 'canceled';
  startDate: number;
  endDate?: number;
  autoRenew: boolean;
}
