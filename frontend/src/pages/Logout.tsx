import { LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

export default function Logout() {
  const navigate = useNavigate();
  useEffect(() => {
    // In a real app, clear auth tokens and user state here
    setTimeout(() => {
      navigate("/login");
    }, 1200);
  }, [navigate]);

  return (
    <div className="min-h-screen w-full bg-white dark:bg-zinc-900 flex items-center justify-center">
      <div className="max-w-md mx-auto px-4 py-16 flex flex-col items-center justify-center">
        <LogOut size={48} className="text-red-500 mb-4" />
        <h1 className="text-2xl font-bold text-zinc-900 dark:text-white mb-2">Logging out...</h1>
        <p className="text-gray-700 dark:text-gray-300 mb-4">You are being securely logged out. Redirecting to login page.</p>
      </div>
    </div>
  );
}
