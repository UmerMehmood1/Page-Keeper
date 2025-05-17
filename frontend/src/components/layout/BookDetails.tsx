import { useContext, useState } from "react";
import { format } from "date-fns";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Minus, Plus, ShoppingCart, Star } from "lucide-react";
import { Book } from "@/types/Book";
import { CartContext } from "@/context/CartContext";
import RelatedBooks from "./RelatedBooks";

export default function BookDetails({ book }: { book: Book }) {
  const [quantity, setQuantity] = useState(1);
  const [intervalId, setIntervalId] = useState<NodeJS.Timeout | null>(null);
  const [timeoutId, setTimeoutId] = useState<NodeJS.Timeout | null>(null);

  const cartContext = useContext(CartContext);

  if (!cartContext) {
    throw new Error("UpdateUserComponent must be used within a UserProvider");
  }

  const { addToCart } = cartContext;

  const handleQuantityChange = (newQuantity: number) => {
    if (newQuantity >= 1 && newQuantity <= book.inStock) {
      setQuantity(newQuantity);
    }
  };

  const startContinuousChange = (increment: number) => {
    // Update once immediately
    handleQuantityChange(quantity + increment);

    // Start a timeout to trigger continuous change after 1 second
    const timeout = setTimeout(() => {
      const id = setInterval(() => {
        setQuantity((prevQuantity) => {
          const newQuantity = prevQuantity + increment;
          return newQuantity >= 1 && newQuantity <= book.inStock
            ? newQuantity
            : prevQuantity;
        });
      }, 100); // Adjust the interval speed as needed
      setIntervalId(id);
    }, 100); // 1-second delay before starting continuous action

    setTimeoutId(timeout);
  };

  const handleAddToCart = async (book: Book) => {
    try {
      await addToCart(book._id, quantity);
      setQuantity(1);
    } catch (error) {
      console.error("Failed to add item to cart:", error);
    }
  };
  const stopContinuousChange = () => {
    // Clear the timeout if the button is released before 1 second
    if (timeoutId) {
      clearTimeout(timeoutId);
      setTimeoutId(null);
    }
    // Clear the interval if it's running
    if (intervalId) {
      clearInterval(intervalId);
      setIntervalId(null);
    }
  };

  return (
    <div className="w-full max-w-7xl mx-auto py-16 flex flex-col gap-12">
      <div className="flex gap-8">
        <div>
          <img
            src={book.coverImage}
            alt={book.title}
            className="h-[300px] object-fit rounded-md shadow-md"
          />
        </div>
        <div className="space-y-4">
          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-3xl mb-2">{book.title}</h1>
              <p>by {book.author}</p>
            </div>
            <Badge>{book.genre}</Badge>
          </div>
          <p>{book.description}</p>
          <p>
            <strong>Publisher:</strong> {book.publisher}
          </p>
          <p>
            <strong>Publication Date:</strong>{" "}
            {format(book.publicationDate, "yyyy-MM-dd")}
          </p>
          <p>
            <strong>In Stock:</strong> {book.inStock}
          </p>
          <div className="flex items-center">
            <strong className="mr-2">Rating:</strong>
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`w-5 h-5 ${
                  i < Math.floor(book.rating)
                    ? "text-yellow-400 fill-current"
                    : "text-gray-300"
                }`}
              />
            ))}
            <span className="ml-2">{book.rating}</span>
          </div>
          <div className="flex items-center">
            <div className="text-2xl font-bold">${book.price}</div>
            <div className="flex items-center mt-2">
              <Button
                size="sm"
                variant="outline"
                onMouseDown={() => startContinuousChange(-1)}
                onMouseUp={stopContinuousChange}
                onMouseLeave={stopContinuousChange}
                aria-label={`Decrease quantity of ${book.title}`}
                disabled={quantity <= 1}
              >
                <Minus className="h-4 w-4" />
              </Button>
              <Input
                type="number"
                min="1"
                max={book.inStock}
                value={quantity}
                onChange={(e) =>
                  handleQuantityChange(parseInt(e.target.value, 10))
                }
                className="w-16 mx-2 text-center [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                aria-label={`Quantity of ${book.title}`}
              />
              <Button
                size="sm"
                variant="outline"
                onMouseDown={() => startContinuousChange(1)}
                onMouseUp={stopContinuousChange}
                onMouseLeave={stopContinuousChange}
                aria-label={`Increase quantity of ${book.title}`}
              >
                <Plus className="h-4 w-4" />
              </Button>
            </div>
          </div>
          <Button
            onClick={(e) => {
              e.stopPropagation();
              handleAddToCart(book);
            }}
            className="w-full bg-[#5D4B8C] text-white"
            variant="outline"
          >
            <ShoppingCart /> Add To Cart
          </Button>
        </div>
      </div>
      <RelatedBooks id={book._id}></RelatedBooks>
    </div>
  );
}
