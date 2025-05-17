import { useNavigate, useSearchParams } from "react-router-dom";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

export type BookCategory =
  | "Fiction"
  | "Non-fiction"
  | "Science Fiction"
  | "Mystery"
  | "Romance"
  | "Thriller"
  | "Biography"
  | "History"
  | "Self-help"
  | "Other";

export default function Category() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  // Get the current selected genre from the URL
  const selectedCategory = searchParams.get("genre") as BookCategory | null;

  // Define book categories inside the component
  const categories: BookCategory[] = [
    "Fiction",
    "Non-fiction",
    "Science Fiction",
    "Mystery",
    "Romance",
    "Thriller",
    "Biography",
    "History",
    "Self-help",
    "Other",
  ];

  const handleCategoryClick = (category: BookCategory) => {
    // If the clicked category is already selected, remove it (toggle off)
    if (selectedCategory === category) {
      navigate(`/books/genres?page=1&limit=10`);
    } else {
      navigate(
        `/books/genres?genre=${encodeURIComponent(category)}&page=1&limit=10`
      );
    }
  };

  return (
    <div className="my-16 space-y-12 mx-auto  max-w-7xl">
      <div className="flex justify-between items-center mx-auto">
        <h1 className="text-3xl font-bold">Categories</h1>
        <a
          href="/books/genres"
          className="text-primary hover:underline inline-flex items-center"
        >
          View All
          <span className="ml-1">→</span>
        </a>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 max-w-7xl mx-auto">
        {categories.map((category) => (
          <Button
            key={category}
            variant="outline"
            className={cn(
              "h-auto rounded-full px-6 py-4 text-lg font-semibold w-full",
              selectedCategory === category
                ? "bg-[#E6E4F1] hover:bg-[#E6E4F1] text-black border-[#E6E4F1]"
                : "bg-white hover:bg-gray-50"
            )}
            onClick={() => handleCategoryClick(category)}
          >
            {category}
          </Button>
        ))}
      </div>
    </div>
  );
}
