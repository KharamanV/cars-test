import { DiscountService } from './discount.service';

describe('Discount Service', () => {
  it('should be defined', () => {
    expect(DiscountService.getDiscount).toBeDefined();
  });

  it('should return 20% discount', async () => {
    const yearAgoDate = new Date();

    yearAgoDate.setFullYear(yearAgoDate.getFullYear() - 1);

    expect(DiscountService.getDiscount(yearAgoDate)).toBe(0.2);
  });

  it('should return null for fresh date', () => {
    const today = new Date();

    expect(DiscountService.getDiscount(today)).toBeNull();
  });
});
