
import { Apple } from "lucide-react";
import CategoryPage from "../components/CategoryPage";

export default function Grocery() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-yellow-50 dark:from-zinc-900 dark:via-zinc-800 dark:to-yellow-950">
      {/* Grocery Banner */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-2">
        <div className="flex items-center gap-4 bg-gradient-to-r from-green-400 via-yellow-300 to-pink-400 dark:from-green-900 dark:via-yellow-800 dark:to-pink-900 rounded-xl shadow-lg p-6 mb-6">
          <Apple size={48} className="text-white drop-shadow-lg" />
          <div>
            <h1 className="text-4xl font-extrabold text-white mb-1">Grocery</h1>
            <p className="text-white/90 text-lg">Fresh and organic groceries delivered to your door. Shop healthy and delicious options!</p>
          </div>
        </div>
      </div>
      {/* CategoryPage for Grocery */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-8">
        <CategoryPage
          category="Grocery"
          title="Grocery"
          description="Browse, search, and add grocery items. Eat well, live well!"
        />
      </div>
    </div>
  );
}