import CategoryPage from "../components/CategoryPage";
import { BookOpen } from "lucide-react";

export default function Books() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 via-white to-blue-50 dark:from-zinc-900 dark:via-zinc-800 dark:to-blue-950">
      {/* Books Banner */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-2">
        <div className="flex items-center gap-4 bg-gradient-to-r from-yellow-400 via-pink-300 to-blue-400 dark:from-yellow-700 dark:via-pink-900 dark:to-blue-900 rounded-xl shadow-lg p-6 mb-6">
          <BookOpen size={48} className="text-white drop-shadow-lg" />
          <div>
            <h1 className="text-4xl font-extrabold text-white mb-1">Books</h1>
            <p className="text-white/90 text-lg">Discover new releases, bestsellers, and timeless classics. Search, add, and explore a wide range of books and literature.</p>
          </div>
        </div>
      </div>
      {/* CategoryPage for Books */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-8">
        <CategoryPage
          category="Books"
          title="Books"
          description="Browse, search, and add books. Find your next favorite read!"
        />
      </div>
    </div>
  );
}