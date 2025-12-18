export enum MenuItem {
  RED = "RED",
  GREEN = "GREEN",
  BLUE = "BLUE",
  YELLOW = "YELLOW",
  PINK = "PINK",
  PURPLE = "PURPLE",
  ORANGE = "ORANGE",
}

export type CalPriceInput = {
  items: MenuItem[];
  hasMember?: boolean;
};

export type CalResult = {
  subtotal: number;
  discount: number;
  total: number;
};
