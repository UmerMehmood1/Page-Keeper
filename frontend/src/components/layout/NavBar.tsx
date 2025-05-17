import { Link, useLocation } from "react-router-dom";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Loader2, Menu } from "lucide-react";
import { UserContext } from "@/context/UserContext";
import { useContext, useState } from "react";
import axios from "axios";
import { Button } from "../ui/button";
import { useToast } from "@/hooks/use-toast";

interface MenuItems {
  to: string;
  label: string;
}
const menuItems: MenuItems[] = [
  { to: "/", label: "Home" },
  { to: "/your-orders", label: " Orders" },
  { to: "/books/all-books", label: " Books" },
  { to: "/cart", label: "Your Cart" },
];

export default function Navbar() {
  const [loading, setLoading] = useState<boolean>(false);
  const location = useLocation();
  const userContext = useContext(UserContext);
  const { toast } = useToast();

  if (!userContext) {
    throw new Error("Navbar must be used within a UserProvider");
  }

  const { user, setUser } = userContext;

  const handleLogout = async () => {
    setLoading(true);
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URI}/api/auth/logout`,
        {},
        {
          withCredentials: true,
        }
      );
      if (response.status === 200) {
        toast({ title: "User Logged Out Successfully" });
        setUser(null);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {user?.role === "admin" ? (
        <div>
          <div className=" w-full bg-[#4B3A76]  text-white px-4 py-3 shadow-md flex justify-between items-center  fixed top-0 left-0  z-50">
            <span className="font-semibold text-lg">Admin Panel</span>
            <Link
              to="/dashboard"
              className="bg-[#98F9B3] text-black rounded-md hover:bg-[#98F9B3]/90"
            >
              Go to Dashboard
            </Link>
          </div>
        </div>
      ) : null}

      <nav
        className={`${
          user?.role === "admin" ? "mt-12" : "mt-0"
        }  w-full bg-[#5D4B8C] px-4 py-8 md:px-6 lg:px-8 fixed top-0 left-0 z-20`}
      >
        {/* FOR SMALL SCREENS  */}
        <div className="md:hidden mx-auto flex max-w-7xl items-center justify-between">
          <div className="flex items-center gap-2 md:hidden">
            <Sheet>
              <SheetTrigger asChild>
                <Menu color="#98F9B3" size={20} className="cursor-pointer" />
              </SheetTrigger>
              <SheetContent
                side="left"
                className="bg-[#5D4B8C] text-white w-64"
              >
                <SheetHeader>
                  <h2 className="text-xl font-semibold">Menu</h2>
                </SheetHeader>
                <div className="mt-4 flex flex-col space-y-4">
                  {menuItems.map((item) => (
                    <Link
                      key={item.to}
                      to={item.to}
                      className={`block rounded px-4 py-2 transition-colors ${
                        location.pathname === item.to
                          ? "bg-[#98F9B3] text-black"
                          : "text-white hover:bg-[#98F9B3]/20"
                      }`}
                    >
                      {item.label}
                    </Link>
                  ))}
                </div>
              </SheetContent>
            </Sheet>
            <Link to="/" className="flex items-center text-xl font-semibold">
              <span className="text-[#98F9B3]">Page</span>
              <span className="text-white">Keeper</span>
            </Link>
          </div>
          {user ? (
            <Button
              onClick={handleLogout}
              className="rounded-full bg-[#98F9B3] px-4 py-2 text-black hover:bg-[#98F9B3]/90"
              disabled={loading}
            >
              {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Sign Out
            </Button>
          ) : (
            <Link
              to="/login"
              className="rounded-full bg-[#98F9B3] px-4 py-2 text-black hover:bg-[#98F9B3]/90"
            >
              Sign In
            </Link>
          )}
        </div>

        {/* Navigation Links for Larger Screens */}
        <div
          className="hidden md:flex mx-auto max-w-7xl items-center justify-between 
         "
        >
          <Link to="/" className="flex items-center text-2xl font-semibold">
            <span className="text-[#98F9B3]">Page</span>
            <span className="text-white">Keeper</span>
          </Link>
          <div className="hidden md:flex items-center justify-between text-xl space-x-8 font-semibold tracking-wide">
            {menuItems.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                className={`transition-colors hover:text-white/80 ${
                  location.pathname === item.to
                    ? "text-[#98F9B3]"
                    : "text-white"
                }`}
              >
                {item.label}
              </Link>
            ))}
          </div>
          {user ? (
            <Button
              onClick={handleLogout}
              className="rounded-full bg-[#98F9B3] px-4 py-2 text-black hover:bg-[#98F9B3]/90"
              disabled={loading}
            >
              {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Sign Out
            </Button>
          ) : (
            <Link
              to="/login"
              className="rounded-full bg-[#98F9B3] px-4 py-2 text-black hover:bg-[#98F9B3]/90"
            >
              Sign In
            </Link>
          )}
        </div>
      </nav>
    </>
  );
}
