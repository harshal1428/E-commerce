import { Button } from "@/components/ui/button";
import { GoogleOAuthProvider } from '@react-oauth/google';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { motion } from "framer-motion";
import { FcGoogle } from "react-icons/fc";
import { FaFacebook } from "react-icons/fa";
import { Card } from "@/components/ui/card";
import { useAuth } from "@/contexts/AuthContext";
import { useState, useEffect } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { toast } from "sonner";

export default function Login() {
    const { login } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();
    const [formData, setFormData] = useState({
      email: '',
      password: ''
    });
    const [loading, setLoading] = useState(false);

    // Get the redirect path from state, default to home
    const from = location.state?.from || '/';

    // Handle Google login callback
    useEffect(() => {
      const params = new URLSearchParams(window.location.search);
      const token = params.get('token');
      if (token) {
        localStorage.setItem('token', token);
        toast.success('Google sign-in successful!');
        // Redirect to home or intended page
        navigate(from || '/', { replace: true });
      }
    }, [navigate, from]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setFormData({
        ...formData,
        [e.target.name]: e.target.value
      });
    };

    const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault();
      if (!formData.email || !formData.password) {
        toast.error("Please fill in all fields");
        return;
      }
      
      // Email validation
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(formData.email)) {
        toast.error("Please enter a valid email address");
        return;
      }
      
      if (formData.password.length < 6) {
        toast.error("Password must be at least 6 characters");
        return;
      }
      setLoading(true);
      try {
        const success = await login(formData.email, formData.password);
        if (success) {
          toast.success("Login successful!");
          navigate(from, { replace: true });
        } else {
          toast.error("Invalid credentials");
        }
      } catch (error) {
        toast.error("Login failed");
      } finally {
        setLoading(false);
      }
    };

    const handleGoogleLogin = () => {
      window.location.href = 'http://localhost:5006/api/auth/google';
    };

    return (
      <GoogleOAuthProvider clientId="925463381496-40vk0tds875qjsgep7uai5cenfmjtlvj.apps.googleusercontent.com">
        <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-zinc-50 to-zinc-200 dark:from-zinc-900 dark:to-zinc-800">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="w-full max-w-sm"
          >
            <div className="relative">
              <Card
                title="Login"
                description="Enter your email below to login to your account."
                className="backdrop-blur-lg bg-white/70 dark:bg-zinc-900/80 border border-zinc-200 dark:border-zinc-800 shadow-2xl"
              >
                <div className="flex flex-col items-center gap-2 mb-4">
                  <img src="/image.png" alt="Logo" className="w-14 h-14 rounded-full shadow-lg mb-2" />
                  <h2 className="text-2xl font-bold text-zinc-900 dark:text-white tracking-tight">Welcome Back</h2>
                  <p className="text-sm text-zinc-600 dark:text-zinc-300">Sign in to your account</p>
                </div>
                <div className="grid gap-4 p-2">
                  <form onSubmit={handleSubmit}>
                    <div className="grid gap-2">
                      <Label htmlFor="email" className="text-zinc-800 dark:text-zinc-200">Email</Label>
                      <Input 
                        id="email" 
                        name="email"
                        type="email" 
                        placeholder="m@example.com" 
                        required 
                        value={formData.email}
                        onChange={handleChange}
                        className="focus:ring-2 focus:ring-primary/60 transition-all text-zinc-900 dark:text-white bg-zinc-100 dark:bg-zinc-800 placeholder-zinc-400 dark:placeholder-zinc-500" 
                      />
                    </div>
                    <div className="grid gap-2 mt-4">
                      <Label htmlFor="password" className="text-zinc-800 dark:text-zinc-200">Password</Label>
                      <Input 
                        id="password" 
                        name="password"
                        type="password" 
                        required 
                        value={formData.password}
                        onChange={handleChange}
                        className="focus:ring-2 focus:ring-primary/60 transition-all text-zinc-900 dark:text-white bg-zinc-100 dark:bg-zinc-800 placeholder-zinc-400 dark:placeholder-zinc-500" 
                      />
                    </div>
                    <div className="flex justify-between items-center mt-2">
                      <Link to="/forgot-password" className="text-xs text-primary dark:text-blue-400 hover:underline">Forgot password?</Link>
                    </div>
                    <Button 
                      type="submit"
                      disabled={loading}
                      className="w-full mt-2 bg-blue-600 text-white dark:bg-blue-500 dark:text-white font-semibold py-2 rounded-lg shadow-md hover:bg-blue-700 dark:hover:bg-blue-600 hover:scale-[1.03] transition-all disabled:opacity-50"
                    >
                      {loading ? "Signing in..." : "Sign in"}
                    </Button>
                  </form>
                  <div className="flex items-center my-2">
                    <span className="flex-1 h-px bg-zinc-300 dark:bg-zinc-600" />
                    <span className="px-2 text-xs text-zinc-700 dark:text-zinc-300">or</span>
                    <span className="flex-1 h-px bg-zinc-300 dark:bg-zinc-600" />
                  </div>
                  <div className="grid gap-2">
                    <Button
                      type="button"
                      className="w-full flex items-center justify-center gap-2 bg-white border border-gray-300 text-gray-700 shadow-sm hover:bg-gray-50 mt-4"
                      onClick={handleGoogleLogin}
                    >
                      <FcGoogle className="h-5 w-5" /> Sign in with Google
                    </Button>
                    <Button variant="outline" className="w-full flex items-center gap-2 border-zinc-300 dark:border-zinc-700 hover:bg-blue-50 dark:hover:bg-blue-900">
                      <FaFacebook className="text-xl" /> <span className="font-medium text-blue-700 dark:text-blue-300">Sign in with Facebook</span>
                    </Button>
                  </div>
                  <div className="text-center mt-4">
                    <p className="text-sm text-zinc-600 dark:text-zinc-400">
                      Don't have an account?{" "}
                      <Link to="/register" className="text-primary dark:text-blue-400 hover:underline">
                        Sign up
                      </Link>
                    </p>
                  </div>
                </div>
              </Card>
            </div>
          </motion.div>
        </div>
      </GoogleOAuthProvider>
    );
  }
