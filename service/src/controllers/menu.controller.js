"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MenuController = void 0;
const menu_service_1 = require("../services/menu.service");
const types_1 = require("../types");
class MenuController {
    menuService;
    constructor() {
        this.menuService = new menu_service_1.MenuService();
    }
    getMenu = (req, res) => {
        try {
            const menus = this.menuService.getMenu();
            const isValid = menus.every((v) => Object.values(types_1.MenuItem).includes(v.name));
            if (!isValid) {
                return res.status(500).send({ error: "Invalid menu data" });
            }
            return res.status(200).send(menus);
        }
        catch (err) {
            console.log(`error: ${err}`);
            return res.status(500).send({ error: "Internal server error" });
        }
    };
    calculate = (req, res) => {
        try {
            const body = req.body;
            const isValid = body.items.every((v) => Object.values(types_1.MenuItem).includes(v));
            if (!body.items || !Array.isArray(body.items) || !isValid) {
                return res
                    .status(400)
                    .send({ error: "items must be array and type of MenuItem" });
            }
            const result = this.menuService.calculate(body);
            return res.status(200).send(result);
        }
        catch (err) {
            console.log(`error: ${err}`);
            return res.status(500).send({ error: "Internal server error" });
        }
    };
}
exports.MenuController = MenuController;
//# sourceMappingURL=menu.controller.js.map