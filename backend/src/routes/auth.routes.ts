import { Router } from "express";
import {
  AuthenticatedUser,
  Login,
  Logout,
  Register,
} from "../controller/auth.controller";
import { authMiddleware } from "../middleware/auth.middleware";

const router = Router();

router.post("/register", Register);
router.post("/login", Login);
router.get("/me", authMiddleware, AuthenticatedUser);
router.post("/logout", Logout);

export default router;
