import { Menu } from "../models/Menu.model";
import { CalPriceInput, CalResult, MenuItem } from "../types";

export class MenuService {
  getMenu() {
    const menu = Menu;
    const result = Object.entries(menu).map(([name, detail]) => ({
      name: name,
      price: detail.price,
    }));
    return result;
  }

  calculate(input: CalPriceInput): CalResult {
    const { items, hasMember = false } = input;

    const subtotal = this.calSubtotal(items);
    const discount = this.calDiscount(items, subtotal, hasMember);

    return {
      subtotal,
      discount,
      total: subtotal - discount,
    };
  }

  private calSubtotal(items: MenuItem[]): number {
    return items.reduce((sum, item) => {
      return sum + Menu[item].price;
    }, 0);
  }

  private calDiscount(
    items: MenuItem[],
    subtotal: number,
    hasMember: boolean
  ): number {
    let currentTotal = subtotal;
    let totalDiscount = 0;
    let setDiscount = 0;

    const itemCounts = items.reduce((acc, name) => {
      acc[name] = (acc[name] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    const discountItems = [MenuItem.ORANGE, MenuItem.PINK, MenuItem.GREEN];

    Object.entries(itemCounts).forEach(([itemName, count]) => {
      if (discountItems.includes(itemName as MenuItem)) {
        const sets = Math.floor(count / 2);
        if (sets > 0) {
          const priceToDiscount = sets * 2 * Menu[itemName as MenuItem].price;
          setDiscount += priceToDiscount * 0.05;
        }
      }
    });

    totalDiscount += setDiscount;
    currentTotal -= setDiscount;

    if (hasMember) {
      const memberDiscount = currentTotal * 0.1;
      totalDiscount += memberDiscount;
    }

    return totalDiscount;
  }
}
