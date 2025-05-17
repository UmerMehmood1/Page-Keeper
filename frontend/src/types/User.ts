import { Book } from "./Book";

export interface User {
  username: string;
  role?: string;
  email: string;
  password: string;
  books?: Book[];
  cart: Book[];
}
