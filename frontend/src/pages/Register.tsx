import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { motion } from "framer-motion";
import { FcGoogle } from "react-icons/fc";
import { FaFacebook } from "react-icons/fa";
import { useAuth } from "@/contexts/AuthContext";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

export default function Register() {
  const { register } = useAuth();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.email || !formData.password || !formData.confirmPassword) {
      toast.error("Please fill in all fields");
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    if (formData.password.length < 6) {
      toast.error("Password must be at least 6 characters");
      return;
    }

    setLoading(true);
    
    try {
      const success = await register(formData.name, formData.email, formData.password);
      if (success) {
        toast.success("Registration successful!");
        navigate('/');
      } else {
        toast.error("Registration failed");
      }
    } catch (error) {
      toast.error("Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-zinc-50 to-zinc-200 dark:from-zinc-900 dark:to-zinc-800">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="w-full max-w-sm"
      >
        <div className="relative">
          <Card
            title="Register"
            description="Create a new account."
            className="backdrop-blur-lg bg-white/70 dark:bg-zinc-900/80 border border-zinc-200 dark:border-zinc-800 shadow-2xl"
          >
            <div className="flex flex-col items-center gap-2 mb-4">
              <img src="/image.png" alt="Logo" className="w-14 h-14 rounded-full shadow-lg mb-2" />
              <h2 className="text-2xl font-bold text-zinc-900 dark:text-white tracking-tight">Create Account</h2>
              <p className="text-sm text-zinc-700 dark:text-zinc-300">Join our e-commerce platform</p>
            </div>
            <div className="grid gap-4 p-2">
              <form onSubmit={handleSubmit}>
                <div className="grid gap-2">
                  <Label htmlFor="name" className="text-zinc-800 dark:text-zinc-200">Full Name</Label>
                  <Input 
                    id="name" 
                    name="name"
                    type="text" 
                    placeholder="John Doe" 
                    required 
                    value={formData.name}
                    onChange={handleChange}
                    className="focus:ring-2 focus:ring-primary/60 transition-all text-zinc-900 dark:text-white bg-zinc-100 dark:bg-zinc-800 placeholder-zinc-400 dark:placeholder-zinc-500" 
                  />
                </div>
                <div className="grid gap-2 mt-4">
                  <Label htmlFor="email" className="text-zinc-800 dark:text-zinc-200">Email</Label>
                  <Input 
                    id="email" 
                    name="email"
                    type="email" 
                    placeholder="john@example.com" 
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
                    placeholder="At least 6 characters"
                    required 
                    value={formData.password}
                    onChange={handleChange}
                    className="focus:ring-2 focus:ring-primary/60 transition-all text-zinc-900 dark:text-white bg-zinc-100 dark:bg-zinc-800 placeholder-zinc-400 dark:placeholder-zinc-500" 
                  />
                </div>
                <div className="grid gap-2 mt-4">
                  <Label htmlFor="confirmPassword" className="text-zinc-800 dark:text-zinc-200">Confirm Password</Label>
                  <Input 
                    id="confirmPassword" 
                    name="confirmPassword"
                    type="password" 
                    placeholder="Confirm your password"
                    required 
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    className="focus:ring-2 focus:ring-primary/60 transition-all text-zinc-900 dark:text-white bg-zinc-100 dark:bg-zinc-800 placeholder-zinc-400 dark:placeholder-zinc-500" 
                  />
                </div>
                <Button 
                  type="submit"
                  disabled={loading}
                  className="w-full mt-6 bg-blue-600 text-white dark:bg-blue-500 dark:text-white font-semibold py-2 rounded-lg shadow-md hover:bg-blue-700 dark:hover:bg-blue-600 hover:scale-[1.03] transition-all disabled:opacity-50"
                >
                  {loading ? "Creating Account..." : "Create Account"}
                </Button>
              </form>
              <div className="flex items-center my-2">
                <span className="flex-1 h-px bg-zinc-300 dark:bg-zinc-600" />
                <span className="px-2 text-xs text-zinc-700 dark:text-zinc-300">or</span>
                <span className="flex-1 h-px bg-zinc-300 dark:bg-zinc-600" />
              </div>
              <div className="grid gap-2">
                <Button variant="outline" className="w-full flex items-center gap-2 border-zinc-300 dark:border-zinc-700 hover:bg-zinc-100 dark:hover:bg-zinc-800">
                  <FcGoogle className="text-xl" /> <span className="font-medium text-zinc-700 dark:text-zinc-200">Sign up with Google</span>
                </Button>
                <Button variant="outline" className="w-full flex items-center gap-2 border-zinc-300 dark:border-zinc-700 hover:bg-blue-50 dark:hover:bg-blue-900">
                  <FaFacebook className="text-xl" /> <span className="font-medium text-blue-700 dark:text-blue-300">Sign up with Facebook</span>
                </Button>
              </div>
              <div className="text-center mt-4">
                <p className="text-sm text-zinc-600 dark:text-zinc-400">
                  Already have an account?{" "}
                  <a href="/login" className="text-primary dark:text-blue-400 hover:underline">
                    Sign in
                  </a>
                </p>
              </div>
            </div>
          </Card>
        </div>
      </motion.div>
    </div>
  );
}