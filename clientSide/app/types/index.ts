export type MenuItem = {
  name: string;
  price: number;
};

export type ReqCalPrice = {
  items: string[];
  hasMember: boolean;
};

export type ResCalPrice = {
  subtotal: number;
  discount: number;
  total: number;
};
