export type BillingPeriod = 'monthly' | 'yearly';

// Annual billing includes two months free, as specified in the starter.
export function getPrice(monthlyPrice: number, period: BillingPeriod): number {
  return monthlyPrice * (period === 'yearly' ? 10 : 1);
}

export function toggleBilling(period: BillingPeriod): BillingPeriod {
  return period === 'monthly' ? 'yearly' : 'monthly';
}
