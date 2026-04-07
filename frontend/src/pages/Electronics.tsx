
import CategoryPage from "../components/CategoryPage";
import { Monitor } from "lucide-react";

export default function Electronics() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 dark:from-zinc-900 dark:via-zinc-800 dark:to-indigo-950">
      {/* Electronics Banner */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-2">
        <div className="flex items-center gap-4 bg-gradient-to-r from-blue-500 via-indigo-400 to-green-400 dark:from-blue-900 dark:via-indigo-800 dark:to-green-900 rounded-xl shadow-lg p-6 mb-6">
          <Monitor size={48} className="text-white drop-shadow-lg" />
          <div>
            <h1 className="text-4xl font-extrabold text-white mb-1">Electronics</h1>
            <p className="text-white/90 text-lg">Find the latest gadgets, devices, and electronics. Shop top brands and cutting-edge tech.</p>
          </div>
        </div>
      </div>
      {/* CategoryPage for Electronics */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-8">
        <CategoryPage
          category="Electronics"
          title="Electronics"
          description="Browse, search, and add electronics. Upgrade your tech today!"
        />
      </div>
    </div>
  );
}