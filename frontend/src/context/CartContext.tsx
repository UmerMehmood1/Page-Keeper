import { createContext, useState, useEffect, ReactNode } from "react";
import axios from "axios";
import { Cart } from "@/types/Cart";
import { useToast } from "@/hooks/use-toast";

interface CartContextType {
  cart: Cart | null;
  fetchCart: () => Promise<void>;
  updateQuantity: (bookId: string, quantity: number) => Promise<void>;
  removeFromCart: (bookId: string) => Promise<void>;
  addToCart: (bookId: string, quantity?: number) => Promise<void>;
}

const CartContext = createContext<CartContextType | null>(null);

function CartProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<Cart | null>(null);
  const { toast } = useToast();
  const fetchCart = async () => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_API_URI}/api/cart/get-cart`,
        {
          withCredentials: true,
        }
      );
      if (res.status === 200) {
        setCart(res.data.data.cart);
      }
      console.log(res.data.data);
    } catch (error) {
      console.error("Error fetching cart:", error);
    }
  };

  const removeFromCart = async (bookId: string) => {
    try {
      const res = await axios.delete(
        `${import.meta.env.VITE_API_URI}/api/cart/remove-book/${bookId}`,
        { withCredentials: true }
      );
      if (res.status === 200) {
        fetchCart();
        toast({ title: "Successfully Removed From cart !" });
      } else {
        throw new Error("Failed to Removed From  cart");
      }
    } catch (error) {
      console.error("Error Removing cart:", error);
    }
  };
  const updateQuantity = async (bookId: string, quantity: number) => {
    try {
      const res = await axios.put(
        `${import.meta.env.VITE_API_URI}/api/cart/update-cart/${bookId}`,
        { quantity },
        { withCredentials: true }
      );
      if (res.status === 200) {
        fetchCart();
        toast({ title: "Updated cart successfully!" });
      } else {
        throw new Error("Failed to update cart");
      }
    } catch (error) {
      console.error("Error updating cart:", error);
    }
  };

  useEffect(() => {
    fetchCart();
  }, []);

  const addToCart = async (bookId: string, quantity: number = 1) => {
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API_URI}/api/cart/add-to-cart/${bookId}`,
        { quantity },
        {
          withCredentials: true,
        }
      );
      if (res.status === 200) {
        await fetchCart();
        toast({ title: "Added to cart successfully!" });
      } else {
        throw new Error("Failed to add item to cart");
      }
    } catch (error) {
      console.error("Error adding to cart:", error);
      toast({
        title: "Error adding to cart",
        description: "Please try again.",
      });
    }
  };
  return (
    <CartContext.Provider
      value={{ cart, removeFromCart, fetchCart, updateQuantity, addToCart }}
    >
      {children}
    </CartContext.Provider>
  );
}
export { CartProvider, CartContext };
