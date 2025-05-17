import React, { useEffect, useState } from "react";
import axios from "axios";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Book } from "@/types/Book";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

const API_URL = `${import.meta.env.VITE_API_URI}/api/books`;

const genres = [
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

const DashBookPage = () => {
  const [books, setBooks] = useState<Book[]>([]);
  const [form, setForm] = useState<Partial<Book>>({
    title: "",
    author: "",
    description: "",
    publicationDate: new Date(),
    genre: "Fiction",
    publisher: "",
    inStock: 0,
    price: 0,
    quantity: 0,
    rating: 0,
    coverImage: "",
    views: 0,
    lastViewedAt: null,
    lastSoldAt: null,
  });
  const [open, setOpen] = useState(false);

  useEffect(() => {
    fetchBooks();
  }, []);

  const fetchBooks = async () => {
    try {
      const response = await axios.get(API_URL + "/get-all-books");
      setBooks(response.data.data.books);
    } catch (error) {
      console.error("Error fetching books:", error);
    }
  };

  const handleCreateOrUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (form._id) {
        console.log(form);
        await axios.put(`${API_URL}/update-book/${form._id}`, form, {
          withCredentials: true,
        });
      } else {
        await axios.post(API_URL + "/create", form, {
          withCredentials: true,
        });
      }
      fetchBooks();
      setOpen(false);
    } catch (error) {
      console.error("Error saving book:", error);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await axios.delete(`${API_URL}/delete-book/${id}`, {
        withCredentials: true,
      });
      fetchBooks();
    } catch (error) {
      console.error("Error deleting book:", error);
    }
  };

  const openDialog = (book?: Book) => {
    setForm(
      book || {
        title: "",
        author: "",
        description: "",
        publicationDate: new Date(),
        genre: "Fiction",
        publisher: "",
        inStock: 0,
        price: 0,
        quantity: 0,
        rating: 0,
        coverImage: "",
        views: 0,
      }
    );
    setOpen(true);
  };

  return (
    <div className="p-6">
      <div className="flex justify-between mb-4">
        <h1 className="text-xl font-bold">Books Management</h1>
        <Button onClick={() => openDialog()}>Add Book</Button>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Cover</TableHead>
            <TableHead>Title</TableHead>
            <TableHead>Author</TableHead>
            <TableHead>Genre</TableHead>
            <TableHead>Price</TableHead>
            <TableHead>In Stock</TableHead>
            <TableHead>Rating</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {books.map((book) => (
            <TableRow key={book._id}>
              <TableCell>
                <img
                  src={book.coverImage || "/placeholder.svg"}
                  alt={book.title}
                  className="w-16 h-24 object-cover"
                />
              </TableCell>
              <TableCell>{book.title}</TableCell>
              <TableCell>{book.author}</TableCell>
              <TableCell>{book.genre}</TableCell>
              <TableCell>${book.price}</TableCell>
              <TableCell>{book.inStock}</TableCell>
              <TableCell>{book.rating}</TableCell>
              <TableCell>
                <Button onClick={() => openDialog(book)} className="mr-2">
                  Edit
                </Button>
                <Button
                  variant="destructive"
                  onClick={() => handleDelete(book._id)}
                >
                  Delete
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild></DialogTrigger>
        <DialogContent>
          <form onSubmit={handleCreateOrUpdate} className="space-y-4">
            <Input
              placeholder="Title"
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
              required
            />
            <Input
              placeholder="Author"
              value={form.author}
              onChange={(e) => setForm({ ...form, author: e.target.value })}
              required
            />
            <Textarea
              placeholder="Description"
              value={form.description}
              onChange={(e) =>
                setForm({ ...form, description: e.target.value })
              }
            />
            <Input
              type="date"
              value={
                form.publicationDate
                  ? new Date(form.publicationDate).toISOString().split("T")[0]
                  : ""
              }
              onChange={(e) =>
                setForm({ ...form, publicationDate: new Date(e.target.value) })
              }
              required
            />
            <Select
              value={form.genre}
              onValueChange={(value) =>
                setForm({ ...form, genre: value as Book["genre"] })
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="Select genre" />
              </SelectTrigger>
              <SelectContent>
                {genres.map((genre) => (
                  <SelectItem key={genre} value={genre}>
                    {genre}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Input
              placeholder="Publisher"
              value={form.publisher}
              onChange={(e) => setForm({ ...form, publisher: e.target.value })}
            />
            <Input
              type="number"
              placeholder="In Stock"
              value={form.inStock}
              onChange={(e) =>
                setForm({ ...form, inStock: parseInt(e.target.value) })
              }
              required
            />
            <Input
              type="number"
              placeholder="Price"
              value={form.price}
              onChange={(e) =>
                setForm({ ...form, price: parseFloat(e.target.value) })
              }
              required
            />
            <Input
              type="number"
              placeholder="Quantity"
              value={form.quantity}
              onChange={(e) =>
                setForm({ ...form, quantity: parseInt(e.target.value) })
              }
              required
            />
            <Input
              type="number"
              placeholder="Rating"
              value={form.rating}
              onChange={(e) =>
                setForm({ ...form, rating: parseFloat(e.target.value) })
              }
              required
              min="0"
              max="5"
              step="0.1"
            />
            <Input
              placeholder="Cover Image URL"
              value={form.coverImage}
              onChange={(e) => setForm({ ...form, coverImage: e.target.value })}
              required
            />
            <Button type="submit">{form._id ? "Update" : "Create"} Book</Button>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default DashBookPage;
