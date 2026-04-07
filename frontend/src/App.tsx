import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import { Toaster } from "sonner";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ProductForm from "./pages/ProductForm";
import ProductPage from "./pages/ProductPage";
import Electronics from "./pages/Electronics";
import Clothing from "./pages/Clothing";
import Grocery from "./pages/Grocery";
import Sports from "./pages/Sports";
import Books from "./pages/Books";
import Cart from "./pages/Cart";
import Orders from "./pages/Orders";
import Other from "./pages/Other";
import Help from "./pages/Help";
import Logout from "./pages/Logout";
import Profile from "./pages/Profile";
import { useState, useEffect } from "react";
import { AuthProvider } from "./contexts/AuthContext";

const AnimatedRoutes = () => {
  const location = useLocation();
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={location.pathname}
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.98 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
      >
        <Routes location={location}>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/product-form" element={<ProductForm />} />
          <Route path="/product/:id" element={<ProductPage />} />
          <Route path="/electronics" element={<Electronics />} />
          <Route path="/clothing" element={<Clothing />} />
          <Route path="/grocery" element={<Grocery />} />
          <Route path="/sports" element={<Sports />} />
          <Route path="/books" element={<Books />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/orders" element={<Orders />} />
          <Route path="/other" element={<Other />} />
          <Route path="/help" element={<Help />} />
          <Route path="/logout" element={<Logout />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </motion.div>
    </AnimatePresence>
  );
};

const App = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(() => {
    const stored = localStorage.getItem("darkMode");
    return stored === "true";
  });

  // Set document class on mount and when darkMode changes
  useEffect(() => {
    document.documentElement.classList.toggle("dark", darkMode);
    localStorage.setItem("darkMode", darkMode.toString());
  }, [darkMode]);

  const handleSidebarToggle = () => setSidebarOpen((prev) => !prev);
  const handleDarkModeToggle = () => {
    setDarkMode((prev) => !prev);
  };

  return (
    <AuthProvider>
      <div className="min-h-screen w-full relative overflow-hidden flex">
        {/* Modern animated blurred color blobs background */}
        <div className="fixed inset-0 -z-10 pointer-events-none">
          {/* Dark overlay for dark mode */}
          <div className="absolute inset-0 bg-white dark:bg-zinc-900 transition-colors duration-500" />
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="w-full h-full"
          >
            <motion.div
              className="absolute top-10 left-10 w-72 h-72 rounded-full blur-3xl"
              style={{ background: "linear-gradient(135deg, #60a5fa 0%, #818cf8 100%)" }}
              animate={{ y: [0, 30, -30, 0], opacity: [0.2, 0.3, 0.2, 0.25] }}
              transition={{ repeat: Infinity, duration: 10 }}
            />
            <motion.div
              className="absolute bottom-16 right-16 w-80 h-80 rounded-full blur-3xl"
              style={{ background: "linear-gradient(135deg, #f472b6 0%, #facc15 100%)" }}
              animate={{ y: [0, -20, 20, 0], opacity: [0.15, 0.25, 0.15, 0.2] }}
              transition={{ repeat: Infinity, duration: 12 }}
            />
            <motion.div
              className="absolute top-1/2 left-1/2 w-96 h-96 rounded-full blur-3xl dark:opacity-30 opacity-20"
              style={{ background: "linear-gradient(135deg, #34d399 0%, #06b6d4 100%)" }}
              animate={{ y: [0, 40, -40, 0], opacity: [0.1, 0.2, 0.1, 0.15] }}
              transition={{ repeat: Infinity, duration: 14 }}
            />
          </motion.div>
        </div>
        <Router>
          <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />
          <div className={`flex-1 transition-all duration-300 ${sidebarOpen ? 'ml-56' : 'ml-0'}`}>
            <Navbar
              onSidebarToggle={handleSidebarToggle}
              darkMode={darkMode}
              onDarkModeToggle={handleDarkModeToggle}
            />
            <AnimatedRoutes />
            <Toaster richColors position="top-right" />
          </div>
        </Router>
      </div>
    </AuthProvider>
  );
};

export default App;