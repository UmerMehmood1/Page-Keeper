import mongoose, { Document, Schema } from "mongoose";
import { User } from "../interfaces/user.interface";

const UserSchema: Schema<User> = new Schema({
  username: {
    type: String,
    required: [true, "Username is required"],
    trim: true,
    unique: true,
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    match: [/.+\@.+\..+/, "Please use a valid email address"],
    unique: true,
  },
  role: {
    type: String,
    default: "customer",
  },

  password: {
    type: String,
    required: [true, "Password is required"],
    unique: true,
  },
  books: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: "Book",
  },
  cart: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: "Cart",
  },
  orders: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: "Order",
  },
});

const UserModel =
  (mongoose.models.User as mongoose.Model<User>) ||
  mongoose.model<User>("User", UserSchema);

export default UserModel;
