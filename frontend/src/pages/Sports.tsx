
import CategoryPage from "../components/CategoryPage";
import { Trophy } from "lucide-react";

export default function Sports() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-yellow-50 dark:from-zinc-900 dark:via-zinc-800 dark:to-yellow-950">
      {/* Sports Banner */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-2">
        <div className="flex items-center gap-4 bg-gradient-to-r from-pink-400 via-yellow-300 to-blue-400 dark:from-pink-900 dark:via-yellow-800 dark:to-blue-900 rounded-xl shadow-lg p-6 mb-6">
          <Trophy size={48} className="text-white drop-shadow-lg" />
          <div>
            <h1 className="text-4xl font-extrabold text-white mb-1">Sports</h1>
            <p className="text-white/90 text-lg">Gear up for your favorite sports and activities. Shop equipment, apparel, and more!</p>
          </div>
        </div>
      </div>
      {/* CategoryPage for Sports */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-8">
        <CategoryPage
          category="Sports"
          title="Sports"
          description="Browse, search, and add sports products. Get active, stay fit!"
        />
      </div>
    </div>
  );
}