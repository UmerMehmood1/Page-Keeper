import { Link } from "react-router-dom";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <aside className="w-64 bg-[#4B3A76] text-white p-4 space-y-6">
        <h2 className="text-xl font-semibold">Dashboard</h2>
        <nav className="space-y-4">
          <Link
            to="/dashboard"
            className="block px-4 py-2 rounded-md hover:bg-[#98F9B3]/30"
          >
            Home
          </Link>
          <Link
            to="/dashboard/books"
            className="block px-4 py-2 rounded-md hover:bg-[#98F9B3]/30"
          >
            Books
          </Link>
          <Link
            to="/dashboard/users"
            className="block px-4 py-2 rounded-md hover:bg-[#98F9B3]/30"
          >
            Users
          </Link>
          <Link
            to="/dashboard/orders"
            className="block px-4 py-2 rounded-md hover:bg-[#98F9B3]/30"
          >
            Orders
          </Link>
          <Link
            to="/dashboard/settings"
            className="block px-4 py-2 rounded-md hover:bg-[#98F9B3]/30"
          >
            Settings
          </Link>
        </nav>
      </aside>
      {/* Main Content */}
      <main className="flex-1 p-6 bg-gray-100">{children}</main>
    </div>
  );
};

export default DashboardLayout;
