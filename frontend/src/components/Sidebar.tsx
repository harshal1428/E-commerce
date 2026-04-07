import { motion } from "framer-motion";
import { useLocation } from "react-router-dom";
import { ShoppingCart, HelpCircle, Shirt, Monitor, Apple, Trophy, Book, Home as HomeIcon, Box } from "lucide-react";

const categoryLinks = [
  { to: "/electronics", label: "Electronics", icon: <Monitor size={20} /> },
  { to: "/clothing", label: "Clothing", icon: <Shirt size={20} /> },
  { to: "/grocery", label: "Grocery", icon: <Apple size={20} /> },
  { to: "/sports", label: "Sports", icon: <Trophy size={20} /> },
  { to: "/books", label: "Books", icon: <Book size={20} /> },
  // Home tab will be rendered separately as a featured section
  { to: "/other", label: "Other", icon: <Box size={20} /> },
];

const featureLinks = [
  { to: "/cart", label: "Cart", icon: <ShoppingCart size={20} /> },
  { to: "/orders", label: "Orders", icon: <Box size={20} /> },
  { to: "/help", label: "Help", icon: <HelpCircle size={20} /> },
];

type SidebarProps = {
  open?: boolean;
  onClose?: () => void;
};

export default function Sidebar({ open = true, onClose }: SidebarProps) {
  const location = useLocation();

  return (
    <motion.aside
      initial={{ x: -300 }}
      animate={{ x: open ? 0 : -300 }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
      className={`fixed left-0 top-0 h-full w-64 bg-white dark:bg-gray-900 shadow-2xl z-50`}
      style={{ pointerEvents: open ? 'auto' : 'none' }}
    >
      <div className="p-6">
        <div className="flex items-center justify-between mb-8">
          <h2 className={`text-xl font-bold dark:text-white text-gray-900`}>Menu</h2>
          {onClose && (
            <button onClick={onClose} className="text-gray-400 hover:text-gray-900 dark:hover:text-white text-xl font-bold">×</button>
          )}
        </div>
        <nav className="space-y-2">
          {/* Featured Home Section */}
          <div className="mb-4">
            <div className={`relative rounded-xl overflow-hidden mb-4 shadow-lg bg-gradient-to-tr from-blue-500 via-indigo-500 to-green-400 dark:from-indigo-700 dark:via-blue-800 dark:to-teal-700 p-4 flex items-center gap-4 cursor-pointer transition-all duration-300 hover:scale-[1.03]`} onClick={() => window.location.href = "/"}>
              <HomeIcon size={32} className="text-white drop-shadow-lg" />
              <div>
                <h3 className="text-lg font-bold text-white mb-1">Welcome Home!</h3>
                <p className="text-xs text-white/80">Discover featured deals, new arrivals, and top picks.</p>
              </div>
            </div>
            {/* Quick links/highlights */}
            {/* Removed all quick links to avoid duplication with category tabs */}
          </div>
          <div className="mb-4 text-xs font-semibold uppercase text-gray-500 dark:text-gray-400">Categories</div>
          {categoryLinks.map((link) => (
            <button 
              key={link.to}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all font-medium ${location.pathname === link.to ? 'bg-blue-600 text-white' : 'dark:text-gray-300 text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800'}`}
              onClick={() => window.location.href = link.to}
            >
              {link.icon}
              <span>{link.label}</span>
            </button>
          ))}
          <div className="mt-6 mb-2 text-xs font-semibold uppercase text-gray-500 dark:text-gray-400">Features</div>
          {featureLinks.map((link) => (
            <button 
              key={link.to}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all font-medium ${location.pathname === link.to ? 'bg-blue-600 text-white' : 'dark:text-gray-300 text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800'}`}
              onClick={() => window.location.href = link.to}
            >
              {link.icon}
              <span>{link.label}</span>
            </button>
          ))}
          {/* Wishlist and Rating summary */}
          {/* Wishlist and Rating summary removed as per new requirements */}
        </nav>
      </div>
    </motion.aside>
  );
}


