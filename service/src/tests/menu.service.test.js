"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const menu_service_1 = require("../services/menu.service");
const types_1 = require("../types");
describe("MenuService", () => {
    const service = new menu_service_1.MenuService();
    it("result should have valid keys and number prices", () => {
        const result = service.getMenu();
        Object.entries(result).forEach(([k, v]) => {
            expect(Object.values(types_1.MenuItem)).toContain(k);
            expect(typeof v.price).toBe("number");
        });
    });
    it("should calculate price without any discount", () => {
        const result = service.calculate({
            items: [types_1.MenuItem.RED, types_1.MenuItem.GREEN],
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
            items: [types_1.MenuItem.RED, types_1.MenuItem.GREEN],
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
                types_1.MenuItem.GREEN,
                types_1.MenuItem.GREEN,
                types_1.MenuItem.ORANGE,
                types_1.MenuItem.ORANGE,
                types_1.MenuItem.PINK,
                types_1.MenuItem.PINK,
                types_1.MenuItem.GREEN,
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
                types_1.MenuItem.GREEN,
                types_1.MenuItem.GREEN,
                types_1.MenuItem.ORANGE,
                types_1.MenuItem.ORANGE,
                types_1.MenuItem.PINK,
                types_1.MenuItem.PINK,
                types_1.MenuItem.GREEN,
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
//# sourceMappingURL=menu.service.test.js.map