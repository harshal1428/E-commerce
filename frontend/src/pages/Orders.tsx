import { Box } from "lucide-react";
import { useEffect, useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

export default function Orders() {
  const { isAuthenticated } = useAuth();
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      setLoading(true);
      try {
        const token = localStorage.getItem('token');
        const response = await fetch('http://localhost:5006/api/orders', {
          headers: {
            'x-auth-token': token || ''
          }
        });
        const data = await response.json();
        if (response.ok) {
          setOrders(data);
        } else {
          toast.error(data.msg || 'Failed to fetch orders');
        }
      } catch (error) {
        toast.error('Error fetching orders');
      } finally {
        setLoading(false);
      }
    };
    if (isAuthenticated) fetchOrders();
  }, [isAuthenticated]);

  return (
    <div className="min-h-screen w-full bg-white dark:bg-zinc-900">
      <div className="max-w-3xl mx-auto px-4 py-8">
        <div className="flex items-center gap-3 mb-6">
          <Box size={32} className="text-blue-600" />
          <h1 className="text-3xl font-bold text-zinc-900 dark:text-white">Your Orders</h1>
        </div>
        <div className="bg-white dark:bg-gray-900 rounded-xl shadow p-6">
          {loading ? (
            <div className="flex justify-center items-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            </div>
          ) : orders.length === 0 ? (
            <>
              <p className="text-lg text-gray-700 dark:text-gray-300 mb-4">You have no orders yet. Place an order to see it here!</p>
              <Button className="bg-gradient-to-r from-blue-500 to-purple-500 text-white px-6 py-2 rounded-lg font-semibold shadow hover:from-blue-600 hover:to-purple-600 transition-colors" onClick={() => window.location.href = '/'}>
                Shop Now
              </Button>
            </>
          ) : (
            <ul className="divide-y divide-gray-200 dark:divide-gray-800 mb-4">
              {orders.map(order => (
                <li key={order._id} className="py-4">
                  <div className="flex justify-between items-center">
                    <span className="font-semibold text-lg text-gray-900 dark:text-white">Order #{order._id.slice(-6)}</span>
                    <span className="text-sm px-3 py-1 rounded-full bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300">{order.status}</span>
                  </div>
                  <div className="mt-2">
                    <ul className="ml-4">
                      {order.items.map((item: any) => (
                        <li key={item.product?._id || item.product} className="flex items-center gap-2 mb-1">
                          <img src={item.product?.image || 'https://via.placeholder.com/40x40'} alt={item.product?.name} className="w-10 h-10 object-cover rounded" />
                          <span className="text-gray-800 dark:text-gray-200">{item.product?.name || 'Product'}</span>
                          <span className="text-gray-500 text-sm">x{item.quantity}</span>
                          <span className="text-blue-600 font-semibold ml-auto">₹{item.product?.price}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="flex justify-between items-center mt-2">
                    <span className="text-sm text-gray-500">Placed: {new Date(order.createdAt).toLocaleString()}</span>
                    <span className="text-lg font-bold text-blue-600">Total: ₹{order.total.toFixed(2)}</span>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}
