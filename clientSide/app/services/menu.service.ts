import { apiRequest } from "../lib/api-client";
import { MenuItem, ReqCalPrice, ResCalPrice } from "../types";

export const menuService = {
  async getMenu() {
    const res = await apiRequest<MenuItem[]>(
      "http://localhost:9000/api/menu/menus"
    );

    return res;
  },

  async calculate(req: ReqCalPrice) {
    const res = await apiRequest<ResCalPrice>(
      "http://localhost:9000/api/menu/calculate",
      {
        method: "POST",
        body: JSON.stringify(req),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    return res;
  },
};
