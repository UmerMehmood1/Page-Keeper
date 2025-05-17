import { Types } from "mongoose";
import { User } from "./user.interface";

export interface ICartItem {
  book: Types.ObjectId;
  quantity: number;
  price: number;
}

export interface ICart {
  user: User;
  items: ICartItem[];
  totalAmount: number;
  createdAt: Date;
  updatedAt: Date;
}
