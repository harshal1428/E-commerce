import CategoryPage from "../components/CategoryPage";

import { Shirt } from "lucide-react";

export default function Clothing() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-blue-50 dark:from-zinc-900 dark:via-zinc-800 dark:to-blue-950">
      {/* Clothing Banner */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-2">
        <div className="flex items-center gap-4 bg-gradient-to-r from-pink-400 via-blue-300 to-yellow-400 dark:from-pink-900 dark:via-blue-800 dark:to-yellow-900 rounded-xl shadow-lg p-6 mb-6">
          <Shirt size={48} className="text-white drop-shadow-lg" />
          <div>
            <h1 className="text-4xl font-extrabold text-white mb-1">Clothing</h1>
            <p className="text-white/90 text-lg">Shop the latest fashion, styles, and clothing. Find your perfect look for every occasion!</p>
          </div>
        </div>
      </div>
      {/* CategoryPage for Clothing */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-8">
        <CategoryPage
          category="Clothing"
          title="Clothing"
          description="Browse, search, and add clothing items. Dress to impress!"
        />
      </div>
    </div>
  );
}