import { Link, useLocation } from "react-router-dom";
import { Sun, Moon, ShoppingCart, User, PlusCircle, Home as HomeIcon, Menu, LogOut } from "lucide-react";
import { motion, useAnimation } from "framer-motion";
import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";

interface NavbarProps {
  onSidebarToggle?: () => void;
  darkMode: boolean;
  onDarkModeToggle: () => void;
}

export default function Navbar({ onSidebarToggle, darkMode, onDarkModeToggle }: NavbarProps) {
  const location = useLocation();
  const controls = useAnimation();
  const [cartCount] = useState(2); // Demo badge
  const { user, logout, isAuthenticated } = useAuth();

  const handleLogout = () => {
    logout();
    // Navigate to home page after logout
    window.location.href = '/';
  };

  const navLinks = [
    { to: "/", label: "Home", icon: <HomeIcon size={18} /> },
    ...(isAuthenticated 
      ? [
          { to: "/product-form", label: "Add Product", icon: <PlusCircle size={18} /> },
          { to: "/profile", label: user?.name || "Profile", icon: <User size={18} /> },
          { to: "#logout", label: "Logout", icon: <LogOut size={18} />, onClick: handleLogout },
        ]
      : [
          { to: "/login", label: "Login", icon: <User size={18} /> },
          { to: "/register", label: "Register", icon: <User size={18} /> },
        ]
    ),
  ];

  const handleCartHover = () => {
    controls.start({ rotate: [0, 20, -20, 0], scale: [1, 1.2, 1], transition: { duration: 0.7, ease: "easeInOut" } });
  };

  return (
    <nav className={`sticky top-0 z-50 ${darkMode ? 'bg-gray-900/95' : 'bg-white/95'} backdrop-blur-md shadow-lg border-b border-zinc-200 dark:border-zinc-800 px-4 py-2 flex items-center justify-between`} style={{ WebkitBackdropFilter: "blur(12px)", backdropFilter: "blur(12px)" }}>
      <div className="flex items-center gap-2">
        <button
          className={`p-2 rounded-lg ${darkMode ? 'text-gray-300 hover:text-white' : 'text-gray-700 hover:text-gray-900'}`}
          aria-label="Open sidebar"
          onClick={onSidebarToggle}
        >
          <Menu size={28} />
        </button>
        <motion.span
          whileHover={{ scale: 1.2, rotate: 20 }}
          animate={controls}
          onMouseEnter={handleCartHover}
          className="relative"
        >
          <ShoppingCart size={28} className="text-blue-500 cursor-pointer" />
          {/* Notification badge */}
          {cartCount > 0 && (
            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full px-1.5 py-0.5 shadow font-bold">{cartCount}</span>
          )}
        </motion.span>
        <span className={`font-bold text-lg ${darkMode ? 'text-white' : 'text-gray-900'} drop-shadow`}>Mini E-Commerce</span>
      </div>
      <div className="flex items-center gap-2">
        {navLinks.map((link) => (
          link.label === "Logout" ? (
            <button
              key={link.label}
              onClick={link.onClick}
              className={`flex items-center gap-1 px-3 py-2 rounded-lg font-medium text-red-600 hover:bg-red-50 dark:hover:bg-gray-800`}
            >
              {link.icon}
              <span>{link.label}</span>
            </button>
          ) : (
            <Link
              key={link.to}
              to={link.to}
              className={`flex items-center gap-1 px-3 py-2 rounded-lg font-medium ${location.pathname === link.to ? 'bg-blue-600 text-white' : darkMode ? 'text-gray-300 hover:text-white' : 'text-gray-700 hover:text-gray-900 hover:bg-gray-100'}`}
            >
              {link.icon}
              <span>{link.label}</span>
            </Link>
          )
        ))}
      </div>
      <div className="flex items-center gap-2">
        <button onClick={onDarkModeToggle} className={`p-2 rounded-lg transition-colors ${darkMode ? 'bg-gray-800 text-yellow-400 hover:bg-gray-700' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}>
          {darkMode ? <Sun size={20} /> : <Moon size={20} />}
        </button>
      </div>
    </nav>
  );
}