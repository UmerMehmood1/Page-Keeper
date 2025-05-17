import { Document } from "mongoose";
import { User } from "./user.interface";

export interface Book extends Document {
  user: User;
  title: string;
  author: string;
  description?: string;
  coverImage: string;
  publicationDate: Date;
  rating: number;
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
  views: number;
  lastViewed: Date;
  lastSoldAt: Date | null;
}
