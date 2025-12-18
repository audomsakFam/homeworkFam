import { Request, Response } from "express";
import { MenuService } from "../services/menu.service";
import { CalPriceInput, MenuItem } from "../types";

export class MenuController {
  private menuService: MenuService;

  constructor() {
    this.menuService = new MenuService();
  }

  getMenu = (req: Request, res: Response) => {
    try {
      const menus = this.menuService.getMenu();
      const isValid = menus.every((v) =>
        Object.values(MenuItem).includes(v.name as MenuItem)
      );

      if (!isValid) {
        return res.status(500).send({ error: "Invalid menu data" });
      }

      return res.status(200).send(menus);
    } catch (err) {
      console.log(`error: ${err}`);
      return res.status(500).send({ error: "Internal server error" });
    }
  };

  calculate = (req: Request, res: Response) => {
    try {
      const body = req.body as CalPriceInput;

      const isValid = body.items.every((v) =>
        Object.values(MenuItem).includes(v)
      );

      if (!body.items || !Array.isArray(body.items) || !isValid) {
        return res
          .status(400)
          .send({ error: "items must be array and type of MenuItem" });
      }

      const result = this.menuService.calculate(body);

      return res.status(200).send(result);
    } catch (err) {
      console.log(`error: ${err}`);
      return res.status(500).send({ error: "Internal server error" });
    }
  };
}
