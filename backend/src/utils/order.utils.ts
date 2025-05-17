import { IOrderItem } from "../interfaces/order.interface";
import BookModel from "../models/Book";
import { ApiError } from "./ApiError";

export const validateOrderItems = async (
  items: IOrderItem[]
): Promise<boolean> => {
  for (const item of items) {
    const book = await BookModel.findById(item.book);
    if (!book || book.quantity < item.quantity) {
      return false;
    }
  }
  return true;
};

export const calculateOrderTotal = (items: IOrderItem[]): number => {
  return items.reduce((total, item) => total + item.price, 0);
};

export const updateBookStockAndTrackSales = async (
  items: Array<{ book: any; quantity: number }>
) => {
  for (const item of items) {
    const book = await BookModel.findById(item.book);
    if (!book) {
      throw new ApiError(404, `Book with ID ${item.book} not found`);
    }

    if (book.inStock < item.quantity) {
      throw new ApiError(400, `Insufficient stock for book: ${book.title}`);
    }

    // Update stock and mark as sold
    await BookModel.findByIdAndUpdate(
      item.book,
      {
        $inc: { inStock: -item.quantity },
        lastSoldAt: new Date(),
      },
      { new: true }
    );
  }
};

export const restoreBookStock = async (items: IOrderItem[]): Promise<void> => {
  for (const item of items) {
    const book = await BookModel.findById(item.book);
    if (book) {
      book.quantity += item.quantity;
      await book.save();
    }
  }
};
