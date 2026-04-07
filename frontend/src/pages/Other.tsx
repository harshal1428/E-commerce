
import { Box } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

export default function Other() {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-gray-50 to-gray-200 dark:from-zinc-900 dark:to-zinc-800">
      <div className="max-w-3xl mx-auto px-4 py-8">
        <div className="flex items-center gap-3 mb-6">
          <Box size={32} className="text-purple-600" />
          <h1 className="text-3xl font-bold text-zinc-900 dark:text-white">Other & Miscellaneous</h1>
        </div>
        <div className="bg-white dark:bg-gray-900 rounded-xl shadow p-6">
          <p className="text-lg text-gray-700 dark:text-gray-300 mb-4">
            Discover unique, quirky, and useful products that don't fit into traditional categories. From gadgets to gifts, explore something new!
          </p>
          <ul className="list-disc pl-6 mb-4 text-gray-700 dark:text-gray-300">
            <li>Gadgets & Tech Accessories</li>
            <li>Home Decor & Art</li>
            <li>Gift Ideas</li>
            <li>Stationery & Office Supplies</li>
            <li>Hobbies & DIY Kits</li>
            <li>Travel Essentials</li>
            <li>Eco-friendly Products</li>
          </ul>
          <Button
            className="bg-gradient-to-r from-purple-500 to-blue-500 text-white px-6 py-2 rounded-lg font-semibold shadow hover:from-purple-600 hover:to-blue-600 transition-colors"
            onClick={() => navigate("/")}
          >
            Shop All Products
          </Button>
        </div>
      </div>
    </div>
  );
}