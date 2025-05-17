import { Router } from "express";
import {
  createBook,
  getAllBooks,
  getBookById,
  updateBook,
  deleteBook,
  getUserBooks,
  searchBooks,
  getRelatedBooks,
  getBestSellingBooks,
  getTrendingBooks,
  getRecentlySoldBooks,
  getBooksByGenre,
} from "../controller/book.controller";
import { authMiddleware } from "../middleware/auth.middleware";

const router = Router();

router.post("/create", authMiddleware, createBook);
router.get("/get-all-books", getAllBooks);
router.get("/get-user-books/:page", authMiddleware, getUserBooks);
router.get("/get-book-by-id/:id", getBookById);
router.put("/update-book/:id", authMiddleware, updateBook);
router.delete("/delete-book/:id", authMiddleware, deleteBook);
router.get("/get-related-books/:id", getRelatedBooks);
router.get("/get-best-selling-books", getBestSellingBooks);
router.get("/get-trending-books", getTrendingBooks);
router.get("/recently-ordered-books", getRecentlySoldBooks);
router.get("/get-books-by-genre", getBooksByGenre);
router.get("/search", searchBooks);

export default router;
