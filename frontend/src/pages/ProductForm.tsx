import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { motion } from "framer-motion";
import { useAuth } from "@/contexts/AuthContext";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { API_ENDPOINTS } from '../config/api';

const categories = [
  'Electronics',
  'Clothing', 
  'Grocery',
  'Books',
  'Sports',
  'Home',
  'Other'
];

export default function ProductForm() {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    description: '',
    image: '',
    category: 'Electronics',
    brand: '',
    stock: ''
  });

  // Redirect if not authenticated
  if (!isAuthenticated) {
    navigate('/login');
    return null;
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.price || !formData.description || !formData.image) {
      toast.error("Please fill in all required fields");
      return;
    }

    if (Number(formData.price) <= 0) {
      toast.error("Price must be greater than 0");
      return;
    }

    setLoading(true);
    
    try {
      const token = localStorage.getItem('token');
      const productData = {
        ...formData,
        price: Number(formData.price),
        stock: formData.stock ? Number(formData.stock) : 0
      };

      const response = await fetch(API_ENDPOINTS.PRODUCTS.CREATE, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-auth-token': token || ''
        },
        body: JSON.stringify(productData)
      });

      const data = await response.json();

      if (response.ok) {
        toast.success("Product created successfully!");
        navigate('/');
      } else {
        toast.error(data.msg || "Failed to create product");
      }
    } catch (error) {
      console.error('Error creating product:', error);
      toast.error("Failed to create product");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white dark:bg-zinc-900 transition-colors duration-500 p-6">
      <div className="max-w-lg mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          <Card
            title="Add New Product"
            description="Create a new product listing"
            className="backdrop-blur-lg bg-white/70 dark:bg-zinc-900/80 border border-zinc-200 dark:border-zinc-800 shadow-2xl"
          >
            <div className="p-6">
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid gap-2">
                  <Label htmlFor="name" className="text-zinc-800 dark:text-zinc-200">Product Name *</Label>
                  <Input
                    id="name"
                    name="name"
                    type="text"
                    placeholder="Enter product name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    className="text-zinc-900 dark:text-white bg-zinc-100 dark:bg-zinc-800"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="price" className="text-zinc-800 dark:text-zinc-200">Price (₹) *</Label>
                    <Input
                      id="price"
                      name="price"
                      type="number"
                      step="0.01"
                      min="0"
                      placeholder="0.00"
                      required
                      value={formData.price}
                      onChange={handleChange}
                      className="text-zinc-900 dark:text-white bg-zinc-100 dark:bg-zinc-800"
                    />
                  </div>
                  
                  <div className="grid gap-2">
                    <Label htmlFor="stock" className="text-zinc-800 dark:text-zinc-200">Stock Quantity</Label>
                    <Input
                      id="stock"
                      name="stock"
                      type="number"
                      min="0"
                      placeholder="0"
                      value={formData.stock}
                      onChange={handleChange}
                      className="text-zinc-900 dark:text-white bg-zinc-100 dark:bg-zinc-800"
                    />
                  </div>
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="description" className="text-zinc-800 dark:text-zinc-200">Description *</Label>
                  <textarea
                    id="description"
                    name="description"
                    placeholder="Enter product description"
                    required
                    value={formData.description}
                    onChange={handleChange}
                    rows={3}
                    className="flex min-h-[60px] w-full rounded-md border border-input bg-zinc-100 dark:bg-zinc-800 px-3 py-2 text-sm text-zinc-900 dark:text-white placeholder:text-zinc-400 dark:placeholder:text-zinc-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                  />
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="image" className="text-zinc-800 dark:text-zinc-200">Image URL *</Label>
                  <Input
                    id="image"
                    name="image"
                    type="url"
                    placeholder="https://example.com/image.jpg"
                    required
                    value={formData.image}
                    onChange={handleChange}
                    className="text-zinc-900 dark:text-white bg-zinc-100 dark:bg-zinc-800"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="category" className="text-zinc-800 dark:text-zinc-200">Category *</Label>
                    <select
                      id="category"
                      name="category"
                      required
                      value={formData.category}
                      onChange={handleChange}
                      className="flex h-10 w-full rounded-md border border-input bg-zinc-100 dark:bg-zinc-800 px-3 py-2 text-sm text-zinc-900 dark:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                    >
                      {categories.map(cat => (
                        <option key={cat} value={cat}>{cat}</option>
                      ))}
                    </select>
                  </div>
                  
                  <div className="grid gap-2">
                    <Label htmlFor="brand" className="text-zinc-800 dark:text-zinc-200">Brand</Label>
                    <Input
                      id="brand"
                      name="brand"
                      type="text"
                      placeholder="Brand name"
                      value={formData.brand}
                      onChange={handleChange}
                      className="text-zinc-900 dark:text-white bg-zinc-100 dark:bg-zinc-800"
                    />
                  </div>
                </div>

                <Button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-blue-600 text-white dark:bg-blue-500 dark:text-white font-semibold py-2 rounded-lg shadow-md hover:bg-blue-700 dark:hover:bg-blue-600 hover:scale-[1.02] transition-all disabled:opacity-50"
                >
                  {loading ? "Creating Product..." : "Create Product"}
                </Button>
              </form>
            </div>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}