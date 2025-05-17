import { Router } from "express";
import authRoutes from "./auth.routes";
import bookRoutes from "./book.routes";
import cartRoutes from "./cart.routes";
import orderRoutes from "./order.routes";

export const routes = (router: Router): void => {
  router.use("/api/auth", authRoutes);
  router.use("/api/books", bookRoutes);
  router.use("/api/cart", cartRoutes);
  router.use("/api/orders", orderRoutes);
};
