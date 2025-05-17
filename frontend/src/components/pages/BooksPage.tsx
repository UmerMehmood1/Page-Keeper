import { useContext, useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { Book } from "@/types/Book";
import BookCard from "../Cards/Book";
import { CartContext } from "@/context/CartContext";
import Loading from "@/components/Loading"; // Import the Loading component

export default function BooksPage() {
  const [books, setBooks] = useState<Book[]>([]);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState<boolean>(true); // Add loading state

  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const page = Number(searchParams.get("page")) || 1; // Get page from URL or default to 1

  const cartContext = useContext(CartContext);
  if (!cartContext) {
    throw new Error("TrendingBooksPage must be used within a CartProvider");
  }

  const { addToCart } = cartContext;

  const handleAddToCart = async (book: Book) => {
    try {
      await addToCart(book._id, 1);
    } catch (error) {
      console.error("Failed to add item to cart:", error);
    }
  };

  useEffect(() => {
    const fetchTrendingBooks = async () => {
      setLoading(true); // Start loading
      try {
        const res = await axios.get(
          `${
            import.meta.env.VITE_API_URI
          }/api/books/get-all-books?page=${page}&limit=2`,
          {
            withCredentials: true,
          }
        );

        setBooks(res.data.data.books);
        setTotalPages(res.data.data.pagination.totalPages);
      } catch (error) {
        console.error("Error fetching trending books:", error);
      } finally {
        setLoading(false); // End loading
      }
    };

    fetchTrendingBooks();
  }, [page]);

  const handlePageChange = (newPage: number) => {
    navigate(`/books/all-books?page=${newPage}`);
  };

  if (loading) {
    return <Loading />; // Show the Loading component while data is being fetched
  }

  return (
    <div className="container mx-auto  px-4 py-12 md:px-6 lg:px-8 xl:px-0 max-w-7xl">
      <h2 className="text-2xl font-bold mb-4 mt-12">All Books</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {books?.map((book) => (
          <BookCard key={book._id} book={book} onAddToCart={handleAddToCart} />
        ))}
      </div>

      {/* Pagination Controls */}
      <div className="flex justify-center items-center gap-4 mt-6">
        <Button
          variant="outline"
          disabled={page === 1}
          onClick={() => handlePageChange(page - 1)}
        >
          Previous
        </Button>
        <span className="text-lg font-semibold">
          Page {page} of {totalPages === 0 ? 1 : totalPages}
        </span>
        <Button
          variant="outline"
          disabled={page === totalPages || books.length === 0}
          onClick={() => handlePageChange(page + 1)}
        >
          Next
        </Button>
      </div>
    </div>
  );
}
