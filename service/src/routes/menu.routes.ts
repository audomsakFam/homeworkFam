import { Router } from "express";
import { MenuController } from "../controllers/menu.controller";

const menuRoutes = Router();
const controller = new MenuController();

menuRoutes.get("/menus", controller.getMenu);
menuRoutes.post("/calculate", controller.calculate);

export default menuRoutes;
