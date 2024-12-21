import axios from "axios";
import Cookies from "js-cookie";
import { Course } from "./courses.service";

export interface CartItem {
  course: Course;
  quantity: number;
  _id: string;
}

export interface Cart {
  _id: string;
  user: string;
  courses: CartItem[];
  totalAmount: number;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface CartResponse {
  message: string;
  cart: Cart;
}

class CartService {
  private readonly API_URL = "http://localhost:3001";

  private getConfig() {
    const token = Cookies.get("token");
    return {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
  }

  private getUserId(): string {
    const user = JSON.parse(localStorage.getItem("user") || "{}");
    return user._id || "";
  }

  async addToCart(courseId: string): Promise<CartResponse> {
    const { data } = await axios.post(
      `${this.API_URL}/shoppingCart/course/${courseId}`, 
      { courseId }, 
      this.getConfig()
    );
    return data;
  }

  async updateCart(courses: CartItem[]): Promise<CartResponse> {
    const userId = this.getUserId();
    const { data } = await axios.put(
      `${this.API_URL}/shoppingCart/user/${userId}`, 
      { courses }, 
      this.getConfig()
    );
    return data;
  }

  async removeFromCart(courseId: string): Promise<CartResponse> {
    const { data } = await axios.delete(
      `${this.API_URL}/shoppingCart/course/${courseId}`, 
      this.getConfig()
    );
    return data;
  }

  async clearCart(): Promise<CartResponse> {
    const userId = this.getUserId();
    const { data } = await axios.delete(
      `${this.API_URL}/shoppingCart/${userId}`, 
      this.getConfig()
    );
    return data;
  }

  async getCart(): Promise<Cart> {
    const userId = this.getUserId();
    const { data } = await axios.get(
      `${this.API_URL}/shoppingCart/user/${userId}`, 
      this.getConfig()
    );
    return data;
  }
}

export const cartService = new CartService(); 