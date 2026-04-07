import { motion } from "framer-motion";
import { ShoppingCart } from "lucide-react";

interface ProductCardProps {
  title: string;
  image: string;
  price: string;
  description: string;
  rating: number;
  reviews: number;
  category: string;
}

export default function ProductCard({ title, image, price, description, rating, reviews, category }: ProductCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="bg-gradient-to-br from-gray-900/80 to-blue-900/80 rounded-2xl shadow-lg border border-zinc-800 overflow-hidden flex flex-col hover:scale-[1.03] hover:shadow-xl transition-transform duration-200 w-full max-w-xs mx-auto"
    >
      <div className="relative">
        <img src={image} alt={title} className="w-full h-40 object-cover rounded-t-2xl" />
        <button className="absolute top-4 right-4 bg-white/80 dark:bg-gray-900/80 rounded-full p-2 shadow hover:bg-pink-100 dark:hover:bg-pink-900 transition-colors">
          <span role="img" aria-label="favorite">❤️</span>
        </button>
      </div>
      <div className="p-4 flex-1 flex flex-col justify-between">
        <div className="mb-2">
          <span className="inline-block bg-blue-600 text-white text-xs px-3 py-1 rounded-full mb-2">{category}</span>
          <h3 className="text-lg font-semibold mb-1 text-white">{title}</h3>
          <p className="text-sm text-gray-300 mb-2">{description}</p>
        </div>
        <div className="flex items-center gap-2 mb-2">
          <span className="text-yellow-400 text-lg">{'★'.repeat(rating)}{'☆'.repeat(5-rating)}</span>
          <span className="text-xs text-gray-400">({reviews})</span>
        </div>
        <div className="flex items-center justify-between mt-auto">
          <span className="text-xl font-bold text-white">₹{price}</span>
          <button className="bg-gradient-to-r from-blue-500 to-purple-500 text-white px-4 py-2 rounded-lg font-semibold shadow hover:from-blue-600 hover:to-purple-600 transition-colors flex items-center gap-2">
            Add to Cart <ShoppingCart size={18} />
          </button>
        </div>
      </div>
    </motion.div>
  );
}
