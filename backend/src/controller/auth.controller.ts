import { Request, Response } from "express";
import { RegisterValidation } from "../validation/register.validation";
import UserModel from "../models/User";
import { ApiError } from "../utils/ApiError";
import bcrypt from "bcryptjs";
import { LoginValidation } from "../validation/login.validation";
import { ApiResponse } from "../utils/ApiResponse";
import { asyncHandler } from "../utils/asyncHanlder";
import jwt from "jsonwebtoken";

const salt = 10;

export const Register = asyncHandler(async (req: Request, res: Response) => {
  const body = req.body;
  const { error } = RegisterValidation.validate(body);
  if (error) {
    throw new ApiError(
      400,
      "Validation failed",
      error.details.map((detail) => detail.message)
    );
  }
  const { username, email, password, passwordConfirm } = body;

  if (password !== passwordConfirm) {
    throw new ApiError(400, "Passwords doesn't match");
  }

  const existingUser = await UserModel.findOne({ email });
  if (existingUser) {
    throw new ApiError(409, "User with this email already exists");
  }

  const hashedPassword = await bcrypt.hash(password, salt);
  const user = await UserModel.create({
    username,
    email,
    role: "customer",
    password: hashedPassword,
  });
  user.save();

  const createdUser = await UserModel.findById(user._id).select("-password");
  return res
    .status(201)
    .json(ApiResponse(200, createdUser, "User registered Successfully"));
});

// login
export const Login = asyncHandler(async (req: Request, res: Response) => {
  const body = req.body;
  const { error } = LoginValidation.validate(body);
  if (error) {
    res.status(400).send({ message: error.details });
    return;
  }
  console.log(body);
  const { email, password } = body;
  const foundUser = await UserModel.findOne({ email });
  if (!foundUser) {
    throw new ApiError(404, "User does not exist");
  }

  const isPasswordCorrect = await bcrypt.compare(password, foundUser.password);
  if (!isPasswordCorrect) {
    throw new ApiError(401, "Invalid credentials");
  }

  const payload = {
    id: foundUser.id,
  };
  const options = {
    sameSite: "none" as const,
    httpOnly: true,
    secure: true,
    maxAge: 24 * 60 * 60 * 1000,
  };
  const token = jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: "1d",
  });
  // remove password from foundUser and send it to the resppnse
  const { password: _, ...userWithoutPassword } = foundUser.toObject();
  res.cookie("jwt", token, options);
  console.log("Set-Cookie header:", res.getHeader("Set-Cookie"));
  return res
    .status(200)
    .json(
      ApiResponse(200, { userWithoutPassword }, "User logged in Successfully")
    );
});

// GET AUTHENTICATED USER
export const AuthenticatedUser = asyncHandler(
  async (req: Request, res: Response) => {
    console.log(req.cookies);
    const token = req.cookies.jwt;
    if (!token) {
      throw new ApiError(401, "Not authenticated");
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as {
      id: string;
    };
    if (!decoded) {
      throw new ApiError(401, "Unauthenticated User");
    }
    const user = await UserModel.findById(decoded.id).select("-password");

    if (!user) {
      throw new ApiError(404, "User not found");
    }

    const response = ApiResponse(
      200,
      { user, accessToken: token },
      "User authenticated successfully"
    );
    return res.status(response.statusCode).json(response);
  }
);

// LOGOUT
export const Logout = asyncHandler(async (req: Request, res: Response) => {
  console.log("object");
  res.cookie("jwt", "", {
    sameSite: "none" as const,
    httpOnly: true,
    secure: true,
    maxAge: 0,
  });

  const response = ApiResponse(200, null, "User logged out successfully");
  return res.status(response.statusCode).json(response);
});
