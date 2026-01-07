import { Router } from "express";
import { MenuController } from "../controllers/menu.controller";
import { MenuService } from "../services/menu.service";

const menuRoutes = Router();
const menuService = new MenuService();
const menuController = new MenuController(menuService);

menuRoutes.get("/menus", menuController.getMenu);
menuRoutes.post("/calculate", menuController.calculate);

export default menuRoutes;
