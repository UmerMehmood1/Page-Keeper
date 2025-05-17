import { useEffect, useState } from "react";
import axios from "axios";
import Loading from "../Loading";

interface OrderItem {
  book: {
    title: string;
    author: string;
    coverImage: string;
  };
  quantity: number;
}

interface Order {
  _id: string;
  items: OrderItem[];
  totalAmount: number;
  status: string;
  createdAt: string;
}

const YourOrders = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          `${import.meta.env.VITE_API_URI}/api/orders/get-user-orders`,
          {
            withCredentials: true,
          }
        ); // Replace with your API endpoint
        console.log("response", response.data.data.orders);
        setOrders(response.data.data.orders);
      } catch (err) {
        console.log(err);
        setError("Failed to fetch orders. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  if (loading) {
    return (
      <div className="text-center mt-4">
        <Loading></Loading>
      </div>
    );
  }

  if (error) {
    return <div className="text-center mt-4 text-red-500">{error}</div>;
  }

  return (
    <div className="container mx-auto  px-4 py-12 md:px-6 lg:px-8 xl:px-0 max-w-7xl">
      <h1 className="text-2xl font-semibold text-gray-800 mb-6">Your Orders</h1>
      {orders?.length === 0 ? (
        <p className="text-center text-gray-600">You have no orders yet.</p>
      ) : (
        <div className="space-y-6">
          {orders?.map((order) => (
            <div
              key={order._id}
              className="p-4 bg-white shadow rounded-lg border border-gray-200"
            >
              <h2 className="text-lg font-bold text-gray-800">
                Order #{order._id}
              </h2>
              <p className="text-sm text-gray-500">
                Placed on: {new Date(order.createdAt).toLocaleDateString()}
              </p>
              <p className="text-sm text-gray-500">Status: {order.status}</p>
              <p className="text-lg font-semibold text-gray-800 mt-4">
                Total: ${order.totalAmount.toFixed(2)}
              </p>
              <div className="mt-4 space-y-3">
                {order.items.map((item, index) => (
                  <div
                    key={index}
                    className="flex items-center space-x-4 border-b pb-3"
                  >
                    <img
                      src={item.book.coverImage}
                      alt={item.book.title}
                      className="w-16 h-20 object-cover rounded-md"
                    />
                    <div>
                      <h3 className="text-sm font-semibold text-gray-800">
                        {item.book.title}
                      </h3>
                      <p className="text-sm text-gray-600">
                        Author: {item.book.author}
                      </p>
                      <p className="text-sm text-gray-600">
                        Quantity: {item.quantity}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default YourOrders;
