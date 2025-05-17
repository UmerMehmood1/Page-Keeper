import { NextFunction, Request, Response } from "express";
import { asyncHandler } from "../utils/asyncHanlder";
import { ApiError } from "../utils/ApiError";
import UserModel from "../models/User";
import jwt from "jsonwebtoken";

export const authMiddleware = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      console.log(req);
      const token = req.cookies.jwt;

      if (!token) {
        throw new ApiError(401, "Authentication required");
      }

      const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as {
        id: string;
      };
      const user = await UserModel.findById(decoded.id).select("-password");

      req["user"] = user;

      next();
    } catch (error) {
      throw new ApiError(401, error?.message || "Invalid access token");
    }
  }
);
