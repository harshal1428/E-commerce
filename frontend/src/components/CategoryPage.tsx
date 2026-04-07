import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, Filter, Plus, ShoppingCart, Heart, Star } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

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
}

interface ApiResponse {
  products: Product[];
  totalPages: number;
  currentPage: number;
  total: number;
  hasNext: boolean;
  hasPrev: boolean;
}

interface CategoryPageProps {
  category: string;
  title: string;
  description: string;
}

// Product Card Component with Authentication Check
const ProductCard = ({ product }: { product: Product }) => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [inWishlist, setInWishlist] = useState(false);
  useEffect(() => {
    const fetchWishlistStatus = async () => {
      if (!isAuthenticated) return setInWishlist(false);
      const token = localStorage.getItem('token');
      try {
        const res = await fetch('http://localhost:5006/api/wishlist', {
          headers: { 'x-auth-token': token || '' }
        });
        if (res.ok) {
          const data = await res.json();
          setInWishlist(data.products?.some((p: any) => p._id === product._id));
        }
      } catch { setInWishlist(false); }
    };
    fetchWishlistStatus();
  }, [isAuthenticated, product._id]);

  const handleProductClick = () => {
    if (!isAuthenticated) {
      navigate('/login', { state: { from: `/product/${product._id}` } });
    } else {
      navigate(`/product/${product._id}`);
    }
  };

  const handleAddToCart = async (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!isAuthenticated) {
      navigate('/login', { state: { from: location.pathname } });
      return;
    }
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('http://localhost:5006/api/cart/add', {
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

  const handleWishlistToggle = async (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!isAuthenticated) {
      navigate('/login', { state: { from: location.pathname } });
      return;
    }
    const token = localStorage.getItem('token');
    try {
      const url = inWishlist
        ? 'http://localhost:5006/api/wishlist/remove'
        : 'http://localhost:5006/api/wishlist/add';
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

  return (
    <div 
      className="bg-white dark:bg-zinc-900 rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-all duration-300 cursor-pointer group"
      onClick={handleProductClick}
    >
      <div className="relative">
        <img 
          src={product.image || "https://via.placeholder.com/300x200"} 
          alt={product.name}
          className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute top-2 right-2 flex gap-2">
          <button 
            onClick={handleWishlistToggle}
            className={`p-2 bg-white/80 dark:bg-zinc-800 rounded-full shadow-md transition-colors ${inWishlist ? 'bg-pink-100 dark:bg-pink-900' : ''}`}
            aria-label={inWishlist ? 'Remove from wishlist' : 'Add to wishlist'}
          >
            <Heart className={`h-4 w-4 ${inWishlist ? 'text-pink-500 fill-current' : 'text-gray-600 dark:text-gray-300 hover:text-red-500'}`} />
          </button>
        </div>
        {product.stock === 0 && (
          <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
            <span className="text-white font-semibold">Out of Stock</span>
          </div>
        )}
      </div>
      
      <div className="p-4">
        <h3 className="font-semibold text-lg text-gray-900 dark:text-white mb-2 line-clamp-1">{product.name}</h3>
        <p className="text-gray-600 dark:text-gray-300 text-sm mb-3 line-clamp-2">{product.description}</p>
        
        <div className="flex items-center mb-2">
          <div className="flex items-center">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`h-4 w-4 ${
                  i < Math.floor(product.rating.average)
                    ? "text-yellow-400 fill-current"
                    : "text-gray-300 dark:text-gray-700"
                }`}
              />
            ))}
            <span className="text-sm text-gray-600 dark:text-gray-300 ml-1">
              ({product.rating.count})
            </span>
          </div>
        </div>

        <div className="flex justify-between items-center mb-3">
          <span className="text-xl font-bold text-blue-600 dark:text-blue-400">₹{product.price}</span>
          {product.brand && (
            <span className="text-sm text-gray-500 dark:text-gray-400">{product.brand}</span>
          )}
        </div>

        <div className="flex justify-between items-center">
          <span className={`text-sm ${product.stock > 0 ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
            {product.stock > 0 ? `${product.stock} in stock` : 'Out of stock'}
          </span>
          
          <Button
            onClick={handleAddToCart}
            disabled={product.stock === 0}
            size="sm"
            className="bg-blue-600 dark:bg-blue-700 hover:bg-blue-700 disabled:bg-gray-400 dark:disabled:bg-gray-700"
          >
            <ShoppingCart className="h-4 w-4 mr-1" />
            Add to Cart
          </Button>
        </div>
      </div>
    </div>
  );
};

export default function CategoryPage({ category, title, description }: CategoryPageProps) {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const fetchProducts = async (page = 1, search = "") => {
    setLoading(true);
    try {
      const params = new URLSearchParams({
        page: page.toString(),
        limit: '12',
        category: category
      });
      
      if (search) params.append('search', search);
      
      const response = await fetch(`http://localhost:5006/api/products?${params}`);
      const data: ApiResponse = await response.json();
      
      if (response.ok) {
        setProducts(data.products);
        setTotalPages(data.totalPages);
        setCurrentPage(data.currentPage);
      } else {
        console.error("Failed to fetch products");
      }
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [category]);

  const handleSearch = () => {
    setCurrentPage(1);
    fetchProducts(1, searchTerm);
  };

  const handlePageChange = (page: number) => {
    fetchProducts(page, searchTerm);
  };

  const handleAddProduct = () => {
    if (!isAuthenticated) {
      navigate('/login', { state: { from: '/product-form' } });
      return;
    }
    navigate('/product-form');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">{title}</h1>
              <p className="text-gray-600 mt-1">{description}</p>
            </div>
            
            {isAuthenticated && (
              <Button onClick={handleAddProduct} className="bg-blue-600 hover:bg-blue-700">
                <Plus className="h-5 w-5 mr-2" />
                Add Product
              </Button>
            )}
          </div>
        </div>
      </div>

      {/* Search */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <Input
                  type="text"
                  placeholder={`Search ${category.toLowerCase()} products...`}
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                  onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                />
              </div>
            </div>
            <Button onClick={handleSearch} className="bg-blue-600 hover:bg-blue-700">
              Search
            </Button>
          </div>
        </div>

        {/* Authentication Notice for Non-logged Users */}
        {!isAuthenticated && (
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <Filter className="h-5 w-5 text-blue-400" />
              </div>
              <div className="ml-3">
                <p className="text-sm text-blue-700">
                  <strong>Sign in to unlock more features!</strong> Browse products as a guest, or{" "}
                  <button 
                    onClick={() => navigate('/login')}
                    className="underline hover:text-blue-800 font-medium"
                  >
                    login
                  </button>{" "}
                  to add to cart, rate products, and more.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Loading State */}
        {loading && (
          <div className="flex justify-center items-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          </div>
        )}

        {/* Products Grid */}
        {!loading && (
          <>
            {products.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {products.map((product) => (
                  <ProductCard key={product._id} product={product} />
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <div className="text-gray-500 text-lg">No {category.toLowerCase()} products found</div>
                <p className="text-gray-400 mt-2">Try adjusting your search or check back later</p>
                {isAuthenticated && (
                  <Button onClick={handleAddProduct} className="mt-4 bg-blue-600 hover:bg-blue-700">
                    <Plus className="h-5 w-5 mr-2" />
                    Add First {category} Product
                  </Button>
                )}
              </div>
            )}

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex justify-center items-center mt-8 space-x-2">
                <Button
                  variant="outline"
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                >
                  Previous
                </Button>
                
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                  <Button
                    key={page}
                    variant={currentPage === page ? "default" : "outline"}
                    onClick={() => handlePageChange(page)}
                    className={currentPage === page ? "bg-blue-600 hover:bg-blue-700" : ""}
                  >
                    {page}
                  </Button>
                ))}
                
                <Button
                  variant="outline"
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                >
                  Next
                </Button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}