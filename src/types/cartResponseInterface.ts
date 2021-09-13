import { Cart } from "../models/cart";

export interface CartResponseInterface {
  carts: Cart[];
  totalQuantity: number;
}
