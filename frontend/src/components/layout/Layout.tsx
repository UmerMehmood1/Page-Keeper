import NavBar from "./NavBar";
import Footer from "./Footer";
import { Toaster } from "../ui/toaster";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col min-h-screen justify-center">
      <NavBar />
      <main className="flex-1 mt-24">{children}</main>
      <Toaster />
      <Footer />
    </div>
  );
}
