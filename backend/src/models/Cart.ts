import mongoose, { Document, Schema, Types } from "mongoose";
import { ICart, ICartItem } from "../interfaces/cart.interface";

const cartItemSchema = new mongoose.Schema<ICartItem>({
  book: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Book",
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
    min: 1,
  },
  price: {
    type: Number,
    required: true,
  },
});

const cartSchema = new mongoose.Schema<ICart>(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    items: [cartItemSchema],
    totalAmount: {
      type: Number,
      required: true,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);
export const Cart = mongoose.model("Cart", cartSchema);

const CartModel =
  (mongoose.models.Cart as mongoose.Model<ICart>) ||
  mongoose.model<ICart>("Cart", cartSchema);

export default CartModel;
