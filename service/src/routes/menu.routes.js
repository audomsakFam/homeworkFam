"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const menu_controller_1 = require("../controllers/menu.controller");
const menuRoutes = (0, express_1.Router)();
const controller = new menu_controller_1.MenuController();
menuRoutes.get("/menus", controller.getMenu);
menuRoutes.post("/calculate", controller.calculate);
exports.default = menuRoutes;
//# sourceMappingURL=menu.routes.js.map