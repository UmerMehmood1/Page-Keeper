import { useContext, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import BookCard from "../Cards/Book";
import { Book } from "@/types/Book";
import { CartContext } from "@/context/CartContext";
import axios from "axios";
import Loading from "../Loading";

export default function SearchResultsPage() {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const query = queryParams.get("query");
  const navigate = useNavigate();
  const cartContext = useContext(CartContext);
  if (!cartContext) {
    throw new Error("UpdateUserComponent must be used within a UserProvider");
  }

  const { addToCart } = cartContext;
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (query) {
      const fetchSearchResults = async () => {
        try {
          // Fetch search results from your API
          const response = await axios.get(
            `${
              import.meta.env.VITE_API_URI
            }/api/books/search?query=${encodeURIComponent(query)}`
          );
          const data = response.data.data.books;
          setBooks(data);
        } catch (error) {
          console.error("Error fetching search results:", error);
        } finally {
          setLoading(false);
        }
      };

      fetchSearchResults();
    }
  }, [query]);

  const handleNavigateToBook = (id: string) => {
    navigate(`/books/${id}`);
  };
  const handleAddToCart = async (book: Book) => {
    try {
      await addToCart(book._id, 1);
    } catch (error) {
      console.error("Failed to add item to cart:", error);
    }
  };
  if (loading) {
    return <Loading />;
  }
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-4">Search Results for "{query}"</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {books?.length > 0 ? (
          books.map((book) => (
            <BookCard
              key={book._id}
              book={book}
              onAddToCart={handleAddToCart}
              onCardClick={() => handleNavigateToBook(book._id)}
            />
          ))
        ) : (
          <p>No books found.</p>
        )}
      </div>
    </div>
  );
}
