// Production API Configuration
export const API_BASE_URL = 'https://e-commerce-wqvc.onrender.com';

export const API_ENDPOINTS = {
  // Auth endpoints
  AUTH: {
    LOGIN: `${API_BASE_URL}/api/auth/login`,
    REGISTER: `${API_BASE_URL}/api/auth/register`,
    ME: `${API_BASE_URL}/api/auth/me`,
    GOOGLE: `${API_BASE_URL}/api/auth/google`,
  },
  
  // Product endpoints
  PRODUCTS: {
    ALL: `${API_BASE_URL}/api/products`,
    FEATURED: `${API_BASE_URL}/api/products/featured`,
    BY_ID: (id: string) => `${API_BASE_URL}/api/products/${id}`,
    BY_CATEGORY: (category: string) => `${API_BASE_URL}/api/products/category/${category}`,
    SEARCH: (query: string) => `${API_BASE_URL}/api/products/search?q=${query}`,
    CREATE: `${API_BASE_URL}/api/products`,
  },
  
  // Cart endpoints
  CART: {
    ADD: `${API_BASE_URL}/api/cart/add`,
    REMOVE: `${API_BASE_URL}/api/cart/remove`,
    GET: `${API_BASE_URL}/api/cart`,
  },
  
  // Order endpoints
  ORDERS: {
    PLACE: `${API_BASE_URL}/api/orders/place`,
    GET: `${API_BASE_URL}/api/orders`,
  },
  
  // Wishlist endpoints
  WISHLIST: {
    ADD: `${API_BASE_URL}/api/wishlist/add`,
    REMOVE: `${API_BASE_URL}/api/wishlist/remove`,
    GET: `${API_BASE_URL}/api/wishlist`,
  },
};
