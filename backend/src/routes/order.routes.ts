import { Router } from "express";
import { authMiddleware } from "../middleware/auth.middleware";
import {
  createOrder,
  getOrderById,
  getUserOrders,
  removeOrder,
  updateOrderStatus,
  updatePaymentStatus,
} from "../controller/order.controller";

const router = Router();

router.post("/create-order", authMiddleware, createOrder);
router.get("/get-user-orders", authMiddleware, getUserOrders);
router.get("/get-order-by-id/:id", authMiddleware, getOrderById);
router.put("/update-order/:id", authMiddleware, updateOrderStatus);
router.put("/update-payment-status/:id", authMiddleware, updatePaymentStatus);
router.delete("/remove-order/:id", authMiddleware, removeOrder);
export default router;
