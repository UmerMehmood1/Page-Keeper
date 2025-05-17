import { Book } from "@/types/Book";
import { useContext, useEffect, useState } from "react";
import { Skeleton } from "../ui/skeleton";
import { Card, CardContent } from "../ui/card";
import BookCard from "../Cards/Book";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { CartContext } from "@/context/CartContext";
import Loading from "../Loading";

const TrendingBooks = () => {
  const cartContext = useContext(CartContext);

  if (!cartContext) {
    throw new Error("UpdateUserComponent must be used within a UserProvider");
  }

  const { addToCart } = cartContext;
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${
            import.meta.env.VITE_API_URI
          }/api/books/get-trending-books?page=1&limit=4`,
          {
            withCredentials: true,
          }
        );
        console.log(response.data.data);
        setBooks(response.data.data.trendingBooks);
      } catch (err) {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);
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

  if (error) {
    return (
      <div className="text-center text-red-500 p-4">
        Error loading books: {error}
      </div>
    );
  }
  if (loading) {
    return <Loading />;
  }
  return (
    <div className="my-16 space-y-12">
      <div className="flex justify-between items-center max-w-7xl  mx-auto">
        <h1 className="text-3xl font-bold">
          Trending books
          <span role="img" aria-label="fire" className="ml-2">
            🔥
          </span>
        </h1>
        <a
          href="/books/trending-books?page=1"
          className="text-primary hover:underline inline-flex items-center"
        >
          View All
          <span className="ml-1">→</span>
        </a>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-12  max-w-7xl  mx-auto">
        {loading
          ? books?.map((_, i) => (
              <Card key={i} className="overflow-hidden">
                <CardContent className="p-0">
                  <Skeleton className="h-[300px] w-full" />
                  <div className="p-4">
                    <Skeleton className="h-4 w-3/4 mb-2" />
                    <Skeleton className="h-4 w-1/2" />
                  </div>
                </CardContent>
              </Card>
            ))
          : books?.map((book: Book) => (
              <BookCard
                key={book._id}
                book={book}
                onAddToCart={handleAddToCart}
                onCardClick={() => handleNavigateToBook(book._id)}
              />
            ))}
      </div>
    </div>
  );
};

export default TrendingBooks;
