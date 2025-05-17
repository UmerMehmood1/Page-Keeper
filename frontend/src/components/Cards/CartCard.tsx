import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Minus, Plus, Trash2 } from "lucide-react";
import { CartItem } from "@/types/Cart";

interface CartCardProps {
  item: CartItem;
  onUpdateQuantity: (bookId: string, newQuantity: number) => void;
  handleRemove: (bookId: string) => void;
  onSelect: (item: CartItem) => void;
  isSelected: boolean;
}

export function CartCard({
  item,
  onUpdateQuantity,
  handleRemove,
  onSelect,
  isSelected,
}: CartCardProps) {
  const [quantity, setQuantity] = useState(item.quantity);

  const handleQuantityChange = (newQuantity: number) => {
    if (newQuantity >= 1) {
      setQuantity(newQuantity);
      onUpdateQuantity(item.book._id, newQuantity);
    }
  };
  console.log(isSelected);
  return (
    <Card key={item.book._id} className="relative flex items-center p-4">
      <img
        src={item.book.coverImage}
        alt={item.book.title}
        className="w-20 h-28 object-cover rounded-md"
      />
      <CardContent className="flex flex-1 flex-col ml-4 space-y-2">
        <h2 className="text-lg font-semibold">{item.book.title}</h2>
        <p className="text-sm text-gray-500">{item.book.author}</p>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              size="icon"
              onClick={() => handleQuantityChange(quantity - 1)}
            >
              <Minus className="w-4 h-4" />
            </Button>
            <span className="text-lg">{quantity}</span>
            <Button
              variant="outline"
              size="icon"
              onClick={() => handleQuantityChange(quantity + 1)}
            >
              <Plus className="w-4 h-4" />
            </Button>
          </div>
          <p className="text-lg font-semibold">
            ${(item.book.price * quantity).toFixed(2)}
          </p>
        </div>
      </CardContent>
      <Button
        variant="destructive"
        size="icon"
        onClick={() => handleRemove(item.book._id)}
      >
        <Trash2 className="w-5 h-5" />
      </Button>
      <Button
        size="sm"
        variant="outline"
        onClick={() => onSelect(item)}
        className={`absolute top-2 right-2 transition-colors ${
          isSelected ? "!bg-[#98F9B3] !text-black" : "!bg-gray-200"
        }`}
        aria-label={`Select ${item.book.title}`}
      >
        {isSelected ? "Selected" : "Select"}
      </Button>
    </Card>
  );
}
