import Footer from "./Footer";
import Navbar from "./NavBar";

export default function AuthenticationLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col min-h-screen justify-center">
      <Navbar />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
}
