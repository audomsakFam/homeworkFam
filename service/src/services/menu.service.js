"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MenuService = void 0;
const Menu_model_1 = require("../models/Menu.model");
const types_1 = require("../types");
class MenuService {
    getMenu() {
        const menu = Menu_model_1.Menu;
        const result = Object.entries(menu).map(([name, detail]) => ({
            name: name,
            price: detail.price,
        }));
        return result;
    }
    calculate(input) {
        const { items, hasMember = false } = input;
        const subtotal = this.calSubtotal(items);
        const discount = this.calDiscount(items, subtotal, hasMember);
        return {
            subtotal,
            discount,
            total: subtotal - discount,
        };
    }
    calSubtotal(items) {
        return items.reduce((sum, item) => {
            return sum + Menu_model_1.Menu[item].price;
        }, 0);
    }
    calDiscount(items, subtotal, hasMember) {
        let currentTotal = subtotal;
        let totalDiscount = 0;
        let setDiscount = 0;
        const itemCounts = items.reduce((acc, name) => {
            acc[name] = (acc[name] || 0) + 1;
            return acc;
        }, {});
        const discountItems = [types_1.MenuItem.ORANGE, types_1.MenuItem.PINK, types_1.MenuItem.GREEN];
        Object.entries(itemCounts).forEach(([itemName, count]) => {
            if (discountItems.includes(itemName)) {
                const sets = Math.floor(count / 2);
                if (sets > 0) {
                    const priceToDiscount = sets * 2 * Menu_model_1.Menu[itemName].price;
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
exports.MenuService = MenuService;
//# sourceMappingURL=menu.service.js.map