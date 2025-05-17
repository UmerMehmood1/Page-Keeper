import mongoose, { Document, Schema } from "mongoose";
import { Book } from "../interfaces/book.interface";

const bookSchema = new Schema<Book>(
  {
    title: {
      type: String,
      required: [true, "Book title is required"],
      trim: true,
    },
    coverImage: {
      type: String,
      required: [true, "Cover Image is required"],
      trim: true,
    },
    author: {
      type: String,
      required: [true, "Author name is required"],
      trim: true,
    },
    description: {
      type: String,
      required: false,
      trim: true,
    },
    publicationDate: {
      type: Date,
      required: [true, "Publication date is required"],
    },
    genre: {
      type: String,
      required: [true, "Genre is required"],
      enum: [
        "Fiction",
        "Non-fiction",
        "Science Fiction",
        "Mystery",
        "Romance",
        "Thriller",
        "Biography",
        "History",
        "Self-help",
        "Other",
      ],
    },
    publisher: {
      type: String,
      required: false,
      trim: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    inStock: {
      type: Number,
      required: [true, "Stock quantity is required"],
      min: [0, "Stock quantity cannot be negative"],
    },
    rating: {
      type: Number,
      required: [true, "Rating is required"],
      min: [0, "Rating cannot be negative"],
    },
    price: {
      type: Number,
      required: [true, "Price is required"],
      min: [0, "Price cannot be negative"],
    },
    quantity: {
      type: Number,
      required: [true, "Price is required"],
      min: [0, "Price cannot be negative"],
    },
    views: {
      type: Number,
      default: 0,
    },
    lastViewed: {
      type: Date,
      default: Date.now,
    },
    lastSoldAt: {
      type: Date,
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

// Add index for better query performance
bookSchema.index({ genre: 1, rating: -1 });
bookSchema.index({ views: -1, lastViewed: -1 });
bookSchema.index({ lastSoldAt: -1 });

const BookModel =
  (mongoose.models.Book as mongoose.Model<Book>) ||
  mongoose.model<Book>("Book", bookSchema);

export default BookModel;
