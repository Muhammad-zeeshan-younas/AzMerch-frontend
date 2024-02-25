import { TProductInterface } from "./ProductType";

export type TCartItemType = {
  items: TProductInterface;
  image: string;
  quantity: number;
  totalPrice: number;
};
