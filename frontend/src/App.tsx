import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Layout from "./components/layout/Layout";
import HomePage from "./components/pages/HomePage";
import UserPage from "./components/pages/UserPage";
import AuthenticationLayout from "./components/layout/AuthenticationLayout";
import { LoginPage } from "./components/pages/LoginPage";
import { UserProvider } from "./context/UserContext";
import BooksPage from "./components/pages/BooksPage";
import BookDetailsPage from "./components/pages/BookDetailsPage";
import { CartProvider } from "./context/CartContext";
import OrderPage from "./components/pages/OrderPage";
import YourOrders from "./components/pages/YourOrders";
import SearchResultsPage from "./components/pages/SearchResultsPage";
import SignupPage from "./components/pages/SignUpPage";
import ProtectedRoute from "./components/ProtectedRoute";
import TrendingBooksPage from "./components/pages/TrendingBooksPage";
import RecentlySoldBooksPage from "./components/pages/RecentlySoldBooksPage";
import BooksByGenre from "./components/pages/BooksByGenre";
import CartPage from "./components/pages/CartPage";
import ProtectedDashboardRoute from "./components/ProtectedDashboardRoute";
import Dashboard from "./components/pages/Dashboard";
import DashboardLayout from "./components/layout/DashboardLayout";
import DashBookPage from "./components/dashboard/DashBookPage";
import BestSellingBooksPage from "./components/pages/BestSellingBooksPage";

function App() {
  return (
    <Router>
      <UserProvider>
        <CartProvider>
          <Routes>
            {/* Routes with Layout */}
            <Route
              path="/"
              element={
                <Layout>
                  <HomePage />
                </Layout>
              }
            />
            {/* Routes with Layout */}
            <Route
              path="/books/trending-books"
              element={
                <Layout>
                  <TrendingBooksPage />
                </Layout>
              }
            />
            <Route
              path="/books/best-selling-books"
              element={
                <Layout>
                  <BestSellingBooksPage />
                </Layout>
              }
            />
            <Route
              path="/books/recently-sold-books"
              element={
                <Layout>
                  <RecentlySoldBooksPage />
                </Layout>
              }
            />
            <Route
              path="/books/genres"
              element={
                <Layout>
                  <BooksByGenre />
                </Layout>
              }
            />
            <Route
              path="/cart"
              element={
                <Layout>
                  <CartPage />
                </Layout>
              }
            />
            <Route
              path="/user"
              element={
                <ProtectedRoute>
                  <Layout>
                    <UserPage />
                  </Layout>
                </ProtectedRoute>
              }
            />

            <Route
              path="/books/all-books"
              element={
                <Layout>
                  <BooksPage />
                </Layout>
              }
            />

            <Route
              path="/books/:bookId"
              element={
                <Layout>
                  <BookDetailsPage />
                </Layout>
              }
            />
            <Route
              path="/your-orders"
              element={
                <ProtectedRoute>
                  <Layout>
                    <YourOrders />
                  </Layout>
                </ProtectedRoute>
              }
            />
            <Route
              path="/order-now"
              element={
                <ProtectedRoute>
                  <Layout>
                    <OrderPage />
                  </Layout>
                </ProtectedRoute>
              }
            />
            {/* Add the SearchResultsPage route */}
            <Route
              path="/search"
              element={
                <Layout>
                  <SearchResultsPage />
                </Layout>
              }
            />
            {/* Dashboard Routes */}
            <Route
              path="/dashboard"
              element={
                <ProtectedDashboardRoute>
                  <DashboardLayout>
                    <Dashboard />
                  </DashboardLayout>
                </ProtectedDashboardRoute>
              }
            />
            <Route
              path="/dashboard/books"
              element={
                <ProtectedDashboardRoute>
                  <DashboardLayout>
                    <DashBookPage />
                  </DashboardLayout>
                </ProtectedDashboardRoute>
              }
            />
            {/* Routes with AuthenticationLayout */}
            <Route
              path="/login"
              element={
                <AuthenticationLayout>
                  <LoginPage />
                </AuthenticationLayout>
              }
            />
            <Route
              path="/signup"
              element={
                <AuthenticationLayout>
                  <SignupPage />
                </AuthenticationLayout>
              }
            />
          </Routes>
        </CartProvider>
      </UserProvider>
    </Router>
  );
}

export default App;
