import { Book } from "./Book";
import { User } from "./User";

export interface CartItem {
  book: Book;
  quantity: number;
  price: number;
}

export interface Cart {
  _id: string;
  user: User;
  items: CartItem[];
  totalAmount: number;
  createdAt: Date;
  updatedAt: Date;
}
