import { useContext } from "react";
import { UserContext } from "@/context/UserContext";
import { Navigate } from "react-router-dom";
import Navbar from "./layout/NavBar";
import Footer from "./layout/Footer";

const ProtectedDashboardRoute = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const context = useContext(UserContext);

  if (!context) return null;

  const { user, loading } = context;

  if (loading)
    return (
      <div className="flex flex-col min-h-screen justify-center">
        <Navbar />
        <main className="flex-1 text-center mt-4">...Loading</main>
        <Footer />
      </div>
    ); // Prevent premature redirects

  return user?.role === "admin" ? children : <Navigate to="/" />;
};

export default ProtectedDashboardRoute;
