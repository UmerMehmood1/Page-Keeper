import { Router } from "express";

import { authMiddleware } from "../middleware/auth.middleware";
import {
  addToCart,
  clearCart,
  getCart,
  removeFromCart,
  updateCart,
} from "../controller/cart.controller";

const router = Router();

router.post("/add-to-cart/:id", authMiddleware, addToCart);
router.get("/get-cart", authMiddleware, getCart);
router.delete("/delete/:id", authMiddleware, removeFromCart);
router.put("/update-cart/:id", authMiddleware, updateCart);
router.delete("/remove-book/:id", authMiddleware, removeFromCart);
router.delete("/clear-cart/:id", authMiddleware, clearCart);
export default router;
