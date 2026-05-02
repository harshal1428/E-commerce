import { useState, useEffect } from "react";
import { toast } from "sonner";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Star, ShoppingCart, Heart } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { API_ENDPOINTS } from '../config/api';

interface Product {
  _id: string;
  name: string;
  price: number;
  description: string;
  image: string;
  category: string;
  brand?: string;
  stock: number;
  rating: {
    average: number;
    count: number;
  };
  createdBy: {
    name?: string;
    email?: string;
  } | string;
  features?: string[];
  dimensions?: {
    length: number;
    width: number;
    height: number;
    weight: number;
  };
}

export default function ProductPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [inWishlist, setInWishlist] = useState(false);

  useEffect(() => {
    const fetchProduct = async () => {
      if (!id) return;
      try {
        const response = await fetch(API_ENDPOINTS.PRODUCTS.BY_ID(id));
        const data = await response.json();
        if (response.ok) {
          setProduct(data);
        } else {
          setError(data.message || "Product not found");
        }
      } catch (error) {
        console.error('Error fetching product:', error);
        setError("Failed to load product");
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
    // Fetch wishlist status
    const fetchWishlistStatus = async () => {
      if (!isAuthenticated || !id) return setInWishlist(false);
      const token = localStorage.getItem('token');
      try {
        const res = await fetch(API_ENDPOINTS.WISHLIST.GET, {
          headers: { 'x-auth-token': token || '' }
        });
        if (res.ok) {
          const data = await res.json();
          setInWishlist(data.products?.some((p: any) => p._id === id));
        }
      } catch { setInWishlist(false); }
    };
    fetchWishlistStatus();
  }, [id, isAuthenticated]);
  const handleWishlistToggle = async () => {
    if (!isAuthenticated || !product) {
      navigate('/login', { state: { from: location.pathname } });
      return;
    }
    const token = localStorage.getItem('token');
    try {
      const url = inWishlist
        ? API_ENDPOINTS.WISHLIST.REMOVE
        : API_ENDPOINTS.WISHLIST.ADD;
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-auth-token': token || ''
        },
        body: JSON.stringify({ productId: product._id })
      });
      const data = await response.json();
      if (response.ok) {
        setInWishlist(!inWishlist);
        toast.success(inWishlist ? 'Removed from wishlist!' : 'Added to wishlist!');
      } else {
        toast.error(data.msg || 'Failed to update wishlist');
      }
    } catch (error) {
      toast.error('Error updating wishlist');
    }
  };

  const handleAddToCart = async () => {
    if (!isAuthenticated) {
      toast.error("Please login to add items to cart");
      navigate('/login');
      return;
    }
    if (!product) return;
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(API_ENDPOINTS.CART.ADD, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-auth-token': token || ''
        },
        body: JSON.stringify({ productId: product._id, quantity: 1 })
      });
      const data = await response.json();
      if (response.ok) {
        toast.success('Added to cart!');
      } else {
        toast.error(data.msg || 'Failed to add to cart');
      }
    } catch (error) {
      toast.error('Error adding to cart');
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-8">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Product Not Found</h2>
          <p className="text-gray-600 mb-6">{error}</p>
          <Button onClick={() => navigate('/')} className="bg-blue-600 hover:bg-blue-700">
            <ArrowLeft className="h-5 w-5 mr-2" />
            Back to Products
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <Button 
        onClick={() => navigate('/')} 
        variant="outline" 
        className="mb-6 text-gray-900 dark:text-white border-gray-300 dark:border-zinc-700 bg-white dark:bg-zinc-900"
      >
        <ArrowLeft className="h-5 w-5 mr-2 text-gray-900 dark:text-white" />
        Back to Products
      </Button>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Product Image */}
        <div className="aspect-square bg-gray-100 dark:text-white rounded-lg overflow-hidden">
          <img
            src={product.image || "https://via.placeholder.com/600x600"}
            alt={product.name}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Product Details */}
        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">{product.name}</h1>
            {product.brand && (
              <p className="text-lg text-gray-600 dark:text-gray-300 mt-1">by {product.brand}</p>
            )}
          </div>

          <div className="flex items-center space-x-4">
            <div className="flex items-center">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`h-5 w-5 ${
                    i < Math.floor(product.rating.average)
                      ? "text-yellow-400 fill-current"
                      : "text-gray-300 dark:text-gray-700"
                  }`}
                />
              ))}
              <span className="ml-2 text-sm text-gray-600 dark:text-gray-300">
                {product.rating.average.toFixed(1)} ({product.rating.count} reviews)
              </span>
            </div>
          </div>

          <div className="text-3xl font-bold text-blue-600 dark:text-blue-400">
            ₹{product.price}
          </div>

          <div className="space-y-2">
            <span className="text-sm font-medium text-gray-900 dark:text-white">Category:</span>
            <span className="ml-2 px-3 py-1 bg-gray-100 dark:bg-zinc-800 text-gray-800 dark:text-gray-200 rounded-full text-sm">
              {product.category}
            </span>
          </div>

          <div className="space-y-2">
            <span className="text-sm font-medium text-gray-900 dark:text-white">Availability:</span>
            <span className={`ml-2 text-sm ${product.stock > 0 ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
              {product.stock > 0 ? `${product.stock} in stock` : 'Out of stock'}
            </span>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Description</h3>
            <p className="text-gray-600 dark:text-gray-300 leading-relaxed">{product.description}</p>
          </div>

          {product.features && product.features.length > 0 && (
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Features</h3>
              <ul className="list-disc list-inside space-y-2 text-gray-600 dark:text-gray-300">
                {product.features.map((feature, index) => (
                  <li key={index}>{feature}</li>
                ))}
              </ul>
            </div>
          )}

          {product.dimensions && (
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Dimensions</h3>
              <div className="grid grid-cols-2 gap-4 text-sm text-gray-600 dark:text-gray-300">
                <div>Length: {product.dimensions.length} cm</div>
                <div>Width: {product.dimensions.width} cm</div>
                <div>Height: {product.dimensions.height} cm</div>
                <div>Weight: {product.dimensions.weight} kg</div>
              </div>
            </div>
          )}

          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Seller Information</h3>
            <div className="bg-gray-50 dark:bg-zinc-800 p-4 rounded-lg">
              <p className="text-sm text-gray-600 dark:text-gray-300">
                <span className="font-medium">Seller:</span>{" "}
                {typeof product.createdBy === 'object' && product.createdBy.name 
                  ? product.createdBy.name 
                  : 'Unknown Seller'
                }
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                <span className="font-medium">Contact:</span>{" "}
                {typeof product.createdBy === 'object' && product.createdBy.email 
                  ? product.createdBy.email 
                  : 'Contact not available'
                }
              </p>
            </div>
          </div>

          <div className="flex space-x-4 pt-6">
            <Button 
              onClick={handleAddToCart}
              disabled={product.stock === 0}
              className="flex-1 bg-blue-600 dark:bg-blue-700 hover:bg-blue-700 disabled:bg-gray-400 dark:disabled:bg-gray-700"
            >
              <ShoppingCart className="h-5 w-5 mr-2" />
              {product.stock === 0 ? 'Out of Stock' : 'Add to Cart'}
            </Button>
            <Button 
              variant="outline" 
              className={`p-3 ${inWishlist ? 'bg-pink-100 dark:bg-pink-900' : ''}`}
              aria-label={inWishlist ? 'Remove from wishlist' : 'Add to wishlist'}
              onClick={handleWishlistToggle}
            >
              <Heart className={`h-5 w-5 ${inWishlist ? 'text-pink-500 fill-current' : 'text-gray-600 dark:text-gray-300 hover:text-red-500'}`} />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}