const MONTH_MS = 1000 * 60 * 60 * 24 * 30;
const YEAR_MS = MONTH_MS * 12;
const CAR_DISCOUNT = 0.2;

export class DiscountService {
  static getDiscount(firstRegistrationDate: Date): number | null {
    const timeFromRegistrationDate =
      Date.now() - new Date(firstRegistrationDate).getTime();

    return timeFromRegistrationDate >= YEAR_MS &&
      timeFromRegistrationDate <= MONTH_MS * 18
      ? CAR_DISCOUNT
      : null;
  }
}
