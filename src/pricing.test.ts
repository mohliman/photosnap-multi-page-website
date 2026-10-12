import { describe, expect, it } from 'vitest';
import { getPrice, toggleBilling } from './pricing';
import { plans } from './data';

describe('billing', () => {
  it('uses each supplied monthly price', () => {
    expect(plans.map(plan => getPrice(plan.monthlyPrice, 'monthly'))).toEqual([19, 39, 99]);
  });
  it('charges for ten months with annual billing', () => {
    expect(plans.map(plan => getPrice(plan.monthlyPrice, 'yearly'))).toEqual([190, 390, 990]);
  });
  it('returns to the original period after two toggles', () => {
    expect(toggleBilling('monthly')).toBe('yearly');
    expect(toggleBilling(toggleBilling('monthly'))).toBe('monthly');
  });
});
