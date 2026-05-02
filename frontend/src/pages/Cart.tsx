import { ShoppingCart } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { API_ENDPOINTS } from '../config/api';

export default function Cart() {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const [cart, setCart] = useState<{ items: any[] }>({ items: [] });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCart = async () => {
      setLoading(true);
      try {
        const token = localStorage.getItem('token');
        const response = await fetch(API_ENDPOINTS.CART.GET, {
          headers: {
            'x-auth-token': token || ''
          }
        });
        const data = await response.json();
        if (response.ok) {
          setCart(data);
        } else {
          toast.error(data.msg || 'Failed to fetch cart');
        }
      } catch (error) {
        toast.error('Error fetching cart');
      } finally {
        setLoading(false);
      }
    };
    if (isAuthenticated) fetchCart();
  }, [isAuthenticated]);

  const getTotal = () => {
    return cart.items.reduce((sum, item) => sum + (item.product?.price || 0) * item.quantity, 0);
  };

  return (
    <div className="min-h-screen w-full bg-white dark:bg-zinc-900">
      <div className="max-w-3xl mx-auto px-4 py-8">
        <div className="flex items-center gap-3 mb-6">
          <ShoppingCart size={32} className="text-blue-600" />
          <h1 className="text-3xl font-bold text-zinc-900 dark:text-white">Your Cart</h1>
        </div>
        <div className="bg-white dark:bg-gray-900 rounded-xl shadow p-6">
          {loading ? (
            <div className="flex justify-center items-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            </div>
          ) : cart.items.length === 0 ? (
            <>
              <p className="text-lg text-gray-700 dark:text-gray-300 mb-4">Your cart is empty. Add products to see them here!</p>
              <Button
                className="bg-gradient-to-r from-blue-500 to-purple-500 text-white px-6 py-2 rounded-lg font-semibold shadow hover:from-blue-600 hover:to-purple-600 transition-colors"
                onClick={() => navigate("/")}
              >
                Go Shopping
              </Button>
            </>
          ) : (
            <>
              <ul className="divide-y divide-gray-200 dark:divide-gray-800 mb-4">
                {cart.items.map((item) => (
                  <li key={item.product?._id || item._id} className="py-4 flex items-center gap-4">
                    <img src={item.product?.image || 'https://via.placeholder.com/80x80'} alt={item.product?.name} className="w-20 h-20 object-cover rounded-lg" />
                    <div className="flex-1">
                      <h3 className="font-semibold text-lg text-gray-900 dark:text-white">{item.product?.name}</h3>
                      <p className="text-gray-600 dark:text-gray-300 text-sm">{item.product?.description}</p>
                      <span className="text-sm text-gray-500">Qty: {item.quantity}</span>
                    </div>
                    <div className="text-xl font-bold text-blue-600">₹{item.product?.price}</div>
                  </li>
                ))}
              </ul>
              <div className="flex justify-between items-center mt-6">
                <span className="text-lg font-semibold text-gray-900 dark:text-white">Total:</span>
                <span className="text-2xl font-bold text-blue-600">₹{getTotal().toFixed(2)}</span>
              </div>
              <Button
                className="w-full mt-6 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-lg shadow-md"
                onClick={async () => {
                  try {
                    const token = localStorage.getItem('token');
                    const response = await fetch(API_ENDPOINTS.ORDERS.PLACE, {
                      method: 'POST',
                      headers: {
                        'Content-Type': 'application/json',
                        'x-auth-token': token || ''
                      }
                    });
                    const data = await response.json();
                    if (response.ok) {
                      toast.success('Order placed successfully!');
                      navigate('/orders');
                    } else {
                      toast.error(data.msg || 'Failed to place order');
                    }
                  } catch (error) {
                    toast.error('Error placing order');
                  }
                }}
              >
                Checkout
              </Button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
