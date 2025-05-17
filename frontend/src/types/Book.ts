import { User } from "./User";

export interface Book {
  _id: string;
  coverImage: string;
  user: User;
  title: string;
  author: string;
  description?: string;
  publicationDate: Date;
  genre:
    | "Fiction"
    | "Non-fiction"
    | "Science Fiction"
    | "Mystery"
    | "Romance"
    | "Thriller"
    | "Biography"
    | "History"
    | "Self-help"
    | "Other";
  publisher?: string;
  inStock: number;
  price: number;
  quantity: number;
  rating: number;
  views: number;
  lastViewedAt: Date | null;
  lastSoldAt: Date | null;
  updatedAt: Date | null;
  createdAt: Date | null;
}
