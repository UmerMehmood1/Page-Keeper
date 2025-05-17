import { Document, Types } from "mongoose";
import { Book } from "./book.interface";
import { IOrder, IOrderItem } from "./order.interface";

export interface User {
  username: string;
  role: "admin" | "customer";
  email: string;
  password: string;
  books?: Book[];
  cart: Book[];
  orders: Types.ObjectId[];
}
