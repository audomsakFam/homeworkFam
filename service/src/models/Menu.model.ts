import { MenuItem } from "../types";

export const Menu: Record<MenuItem, { price: number }> = {
  [MenuItem.RED]: {
    price: 50,
  },

  [MenuItem.GREEN]: {
    price: 40,
  },

  [MenuItem.BLUE]: {
    price: 30,
  },

  [MenuItem.YELLOW]: {
    price: 50,
  },

  [MenuItem.PINK]: {
    price: 80,
  },

  [MenuItem.PURPLE]: {
    price: 90,
  },

  [MenuItem.ORANGE]: {
    price: 120,
  },
};
