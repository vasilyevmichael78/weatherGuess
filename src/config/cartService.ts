import axios from "axios";
import { Cart } from "../models/cart";
import { baseUrl } from "./config";
import { CartResponseInterface } from "../types/cartResponseInterface";

class CartService {
  constructor() {}

  async getAll() {
    try {
      const data = (await axios.get<Cart[]>(`${baseUrl}/carts`)).data;
      return data;
    } catch (e) {
      return new Error("bad request");
    }
  }
}

export default new CartService();
