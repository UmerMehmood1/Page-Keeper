import { Request, Response } from "express";
import { ApiError } from "../utils/ApiError";

import { asyncHandler } from "../utils/asyncHanlder";
import { ApiResponse } from "../utils/ApiResponse";
import BookModel from "../models/Book";
import { BookValidation } from "../validation/book.validation";
import UserModel from "../models/User";
import mongoose from "mongoose";

// CREATE BOOK

export const createBook = asyncHandler(async (req: Request, res: Response) => {
  const body = req.body;
  console.log(body);
  const { error } = BookValidation.validate(body);
  const user = req["user"];

  if (error) {
    throw new ApiError(
      400,
      "Validation failed",
      error.details.map((detail) => detail.message)
    );
  }
  const {
    title,
    author,
    description,
    publicationDate,
    coverImage,
    rating,
    genre,
    publisher,
    inStock,
    price,
    quantity,
  } = body;
  const book = await BookModel.create({
    title,
    author,
    coverImage,
    description,
    publicationDate,
    genre,
    publisher,
    inStock,
    price,
    rating,
    quantity,
    user: user._id,
  });
  user.books.push(book._id);
  user.save();
  book.save();
  const response = ApiResponse(200, { book }, "Book created successfully");
  res.status(response.statusCode).json(response);
});

// GET ALL BOOKS

export const getAllBooks = asyncHandler(async (req: Request, res: Response) => {
  const page = parseInt((req.query.page as string) || "1", 10);
  const limit = parseInt((req.query.limit as string) || "10", 10);
  const skip = (page - 1) * limit;
  const totalBooks = await BookModel.countDocuments();
  const books = await BookModel.find().skip(skip).limit(limit);
  const response = ApiResponse(
    200,
    {
      books,
      pagination: {
        totalBooks,
        currentPage: page,
        totalPages: Math.ceil(totalBooks / limit),
      },
    },
    "Books retrieved successfully"
  );
  res.status(response.statusCode).json(response);
});

// GET USER BOOKS
export const getUserBooks = asyncHandler(
  async (req: Request, res: Response) => {
    const user = req["user"];
    console.log(user);
    const page = parseInt(req.params.page || "1", 10); // Default to page 1 if not provided
    const limit = 10;
    const skip = (page - 1) * limit;

    const totalBooks = await BookModel.countDocuments();
    const books = await BookModel.find({ user: user._id })
      .skip(skip)
      .limit(limit);
    const response = ApiResponse(
      200,
      {
        books,
        pagination: {
          totalBooks,
          currentPage: page,
          totalPages: Math.ceil(totalBooks / limit),
        },
      },
      "Books retrieved successfully"
    );
    res.status(response.statusCode).json(response);
  }
);

// GET A SINGLE BOOK
export const getBookById = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw new ApiError(400, "Invalid book ID");
  }

  const book = await BookModel.findByIdAndUpdate(
    id,
    {
      $inc: { views: 1 },
      lastViewed: new Date(),
    },
    { new: true }
  );

  if (!book) {
    throw new ApiError(404, "Book not found");
  }

  const response = ApiResponse(200, { book }, "Book retrieved successfully");
  res.status(response.statusCode).json(response);
});

// UPDATE BOOK
export const updateBook = asyncHandler(async (req: Request, res: Response) => {
  const body = req.body;
  const { error } = BookValidation.validate(body);
  const user = req["user"];
  if (error) {
    console.log(body);
    throw new ApiError(
      400,
      "Validation failed",
      error.details.map((detail) => detail.message)
    );
  }

  const book = await BookModel.findOneAndUpdate(
    { _id: req.params.id, user },
    body,
    {
      new: true,
      runValidators: true,
    }
  );

  if (!book) {
    throw new ApiError(404, "Book not found");
  }

  const updatedBook = await book.save();
  const response = ApiResponse(
    200,
    { updatedBook },
    "Book updated successfully"
  );
  res.status(response.statusCode).json(response);
});

// SEARCH BOOKS
export const searchBooks = asyncHandler(async (req: Request, res: Response) => {
  const { query } = req.query;

  if (!query) {
    throw new ApiError(400, "Search query is required");
  }
  const page = parseInt((req.query.page as string) || "1", 10);
  const limit = 8;
  const skip = (page - 1) * limit;
  const searchQuery = {
    $or: [
      { title: { $regex: query, $options: "i" } },
      { author: { $regex: query, $options: "i" } },
      { genre: { $regex: query, $options: "i" } },
    ],
  };

  const totalBooks = await BookModel.countDocuments(searchQuery);
  const books = await BookModel.find(searchQuery).skip(skip).limit(limit);

  const response = ApiResponse(
    200,
    {
      books,
      pagination: {
        totalBooks,
        currentPage: page,
        totalPages: Math.ceil(totalBooks / limit),
      },
    },
    "Books retrieved successfully"
  );

  res.status(response.statusCode).json(response);
});
// DELETE BOOK
export const deleteBook = asyncHandler(async (req: Request, res: Response) => {
  const user = req["user"];
  console.log("object");
  const book = await BookModel.findOneAndDelete({
    _id: req.params.id,
    user,
  });
  if (!book) {
    throw new ApiError(404, "Book not found");
  }
  await UserModel.findByIdAndUpdate(user._id, {
    $pull: { books: book._id },
  });
  const response = ApiResponse(200, null, "Book deleted successfully");
  res.status(response.statusCode).json(response);
});

// GET TRENDING BOOKS
export const getTrendingBooks = asyncHandler(
  async (req: Request, res: Response) => {
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;
    const skip = (page - 1) * limit;

    const totalBooks = await BookModel.countDocuments({
      lastViewed: { $gte: thirtyDaysAgo },
    });

    const trendingBooks = await BookModel.find({
      lastViewed: { $gte: thirtyDaysAgo },
    })
      .sort({ views: -1, rating: -1 })
      .skip(skip)
      .limit(limit);
    console.log(trendingBooks);
    const response = ApiResponse(
      200,
      {
        trendingBooks,
        currentPage: page,
        totalPages: Math.ceil(totalBooks / limit),
        totalBooks,
      },
      "Trending books retrieved successfully"
    );

    res.status(response.statusCode).json(response);
  }
);

// GET RELATED BOOKS
export const getRelatedBooks = asyncHandler(
  async (req: Request, res: Response) => {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw new ApiError(400, "Invalid book ID");
    }

    console.log(id);

    const book = await BookModel.findById(id);
    console.log(book);

    if (!book) {
      throw new ApiError(404, "Book not found");
    }

    const relatedBooks = await BookModel.find({
      _id: { $ne: id },
      genre: book.genre,
    })
      .sort({ rating: -1 })
      .limit(6);

    const response = ApiResponse(
      200,
      { relatedBooks },
      "Related books retrieved successfully"
    );
    res.status(response.statusCode).json(response);
  }
);

// GET BEST SELLING BOOKS
export const getBestSellingBooks = asyncHandler(
  async (req: Request, res: Response) => {
    const page = parseInt((req.query.page as string) || "1", 10);
    const limit = parseInt((req.query.limit as string) || "10", 10);
    const skip = (page - 1) * limit;

    const totalBooks = await BookModel.countDocuments();

    // Find books with highest sales (lowest inStock compared to initial quantity)
    const bestSellingBooks = await BookModel.aggregate([
      {
        $addFields: {
          soldQuantity: { $subtract: ["$quantity", "$inStock"] },
        },
      },
      {
        $sort: {
          soldQuantity: -1,
          rating: -1, // Secondary sort by rating
        },
      },
      {
        $skip: skip,
      },
      {
        $limit: limit,
      },
    ]);

    const response = ApiResponse(
      200,
      {
        bestSellingBooks,
        pagination: {
          currentPage: page,
          totalPages: Math.ceil(totalBooks / limit),
          totalBooks,
          limit,
        },
      },
      "Best selling books retrieved successfully"
    );
    res.status(response.statusCode).json(response);
  }
);

// GET RECENTLY SOLD BOOKS
export const getRecentlySoldBooks = asyncHandler(
  async (req: Request, res: Response) => {
    const page = parseInt((req.query.page as string) || "1", 10);
    const limit = parseInt((req.query.limit as string) || "10", 10);
    const skip = (page - 1) * limit;

    // Get books sold in the last 7 days
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 30);

    const query = {
      lastSoldAt: { $gte: sevenDaysAgo, $ne: null },
    };

    const totalBooks = await BookModel.countDocuments(query);

    const recentlySoldBooks = await BookModel.find(query)
      .sort({ lastSoldAt: -1 })
      .skip(skip)
      .limit(limit);

    const response = ApiResponse(
      200,
      {
        recentlySoldBooks,
        pagination: {
          currentPage: page,
          totalPages: Math.ceil(totalBooks / limit),
          totalBooks,
          limit,
        },
      },
      "Recently sold books retrieved successfully"
    );
    res.status(response.statusCode).json(response);
  }
);

// GET BOOKS BY GENRE
export const getBooksByGenre = asyncHandler(
  async (req: Request, res: Response) => {
    const { genre } = req.query;
    const page = parseInt((req.query.page as string) || "1", 10);
    const limit = parseInt((req.query.limit as string) || "10", 10);
    const skip = (page - 1) * limit;

    if (!genre) {
      throw new ApiError(400, "Genre query parameter is required");
    }

    const totalBooks = await BookModel.countDocuments({ genre });

    const books = await BookModel.find({ genre }).skip(skip).limit(limit);

    const response = ApiResponse(
      200,
      {
        books,
        pagination: {
          totalBooks,
          currentPage: page,
          totalPages: Math.ceil(totalBooks / limit),
        },
      },
      "Books retrieved successfully by genre"
    );

    res.status(response.statusCode).json(response);
  }
);
