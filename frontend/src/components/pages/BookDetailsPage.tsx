import axios from "axios";
import BookDetails from "../layout/BookDetails";
import { Book } from "@/types/Book";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Loading from "@/components/Loading"; // Import the Loading component

export default function BookDetailsPage() {
  const { bookId } = useParams();
  const [book, setBook] = useState<Book>();
  const [loading, setLoading] = useState<boolean>(true); // Add loading state

  useEffect(() => {
    const getBook = async (id: string | undefined) => {
      setLoading(true); // Start loading
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_API_URI}/api/books/get-book-by-id/${id}`,
          {
            withCredentials: true,
          }
        );

        if (res.status === 200) {
          setBook(res.data.data.book);
        }
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false); // End loading
      }
    };

    getBook(bookId);
  }, [bookId]);

  if (loading) {
    return <Loading />; // Show loading spinner while fetching data
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {book ? <BookDetails book={book} /> : <p>Book not found.</p>}{" "}
      {/* Handle empty book */}
    </div>
  );
}
