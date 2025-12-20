import { MenuService } from "../services/menu.service";
import { MenuItem } from "../types";

describe("MenuService", () => {
  const service = new MenuService();

  it("result should have valid keys and number prices", () => {
    const result = service.getMenu();

    result.forEach((item) => {
      expect(Object.values(MenuItem)).toContain(item.name);
      expect(typeof item.price).toBe("number");
    });
  });

  it("should calculate price without any discount", () => {
    const result = service.calculate({
      items: [MenuItem.RED, MenuItem.GREEN],
      hasMember: false,
    });

    expect(result).toEqual({
      subtotal: 90,
      discount: 0,
      total: 90,
    });
  });

  it("should apply member discount (10%)", () => {
    const result = service.calculate({
      items: [MenuItem.RED, MenuItem.GREEN],
      hasMember: true,
    });

    expect(result).toEqual({
      subtotal: 90,
      discount: 9,
      total: 81,
    });
  });

  it("should apply 5% discount for every pair of the same color (Orange, Pink, Green)", () => {
    const result = service.calculate({
      items: [
        MenuItem.GREEN,
        MenuItem.GREEN,
        MenuItem.ORANGE,
        MenuItem.ORANGE,
        MenuItem.PINK,
        MenuItem.PINK,
        MenuItem.GREEN,
      ],
      hasMember: false,
    });

    expect(result).toEqual({
      subtotal: 520,
      discount: 24,
      total: 496,
    });
  });

  it("should apply compound discount 5% for item pairs first, then 10% member discount on the remaining amount", () => {
    const result = service.calculate({
      items: [
        MenuItem.GREEN,
        MenuItem.GREEN,
        MenuItem.ORANGE,
        MenuItem.ORANGE,
        MenuItem.PINK,
        MenuItem.PINK,
        MenuItem.GREEN,
      ],
      hasMember: true,
    });

    expect(result).toEqual({
      subtotal: 520,
      discount: 73.6,
      total: 446.4,
    });
  });
});
