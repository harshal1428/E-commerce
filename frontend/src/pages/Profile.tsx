import React, { useEffect, useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { Card } from "../components/ui/card";
import { Label } from "../components/ui/label";
import { Input } from "../components/ui/input";
import { toast } from "sonner";
import { API_ENDPOINTS } from '../config/api';

const Profile: React.FC = () => {
  const { loading: authLoading } = useAuth();
  const [profile, setProfile] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [wishlist, setWishlist] = useState<any[]>([]);
  const [wishlistOpen, setWishlistOpen] = useState(false);

  useEffect(() => {
    async function fetchProfile() {
      const token = localStorage.getItem("token");
      if (!token) {
        setLoading(false);
        return;
      }
      try {
        const res = await fetch(API_ENDPOINTS.AUTH.ME, {
          headers: { "x-auth-token": token },
        });
        if (!res.ok) throw new Error("Failed to fetch profile");
        const data = await res.json();
        setProfile(data);
        // Fetch wishlist
        const wishlistRes = await fetch(API_ENDPOINTS.WISHLIST.GET, {
          headers: { "x-auth-token": token },
        });
        if (wishlistRes.ok) {
          const wishlistData = await wishlistRes.json();
          setWishlist(wishlistData.products || []);
        }
      } catch (err) {
        toast.error("Could not load profile");
      } finally {
        setLoading(false);
      }
    }
    fetchProfile();
  }, []);

  if (authLoading || loading) return <div className="p-8">Loading profile...</div>;
  if (!profile) return <div className="p-8">No profile data found.</div>;

  return (
  <div className="flex justify-center items-center min-h-[70vh] relative">
      {/* Animated gradient background for profile card */}
      <div className="absolute inset-0 -z-10 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 w-96 h-96 rounded-full blur-3xl opacity-30 dark:opacity-40" style={{ background: "linear-gradient(135deg, #818cf8 0%, #34d399 100%)" }} />
        <div className="absolute top-24 right-24 w-72 h-72 rounded-full blur-3xl opacity-20 dark:opacity-30" style={{ background: "linear-gradient(135deg, #f472b6 0%, #facc15 100%)" }} />
      </div>
  <Card title="Profile" className="max-w-md w-full p-10 shadow-2xl rounded-2xl bg-white/80 dark:bg-zinc-900/80 border border-zinc-200 dark:border-zinc-800 backdrop-blur-lg">
  <div className="flex flex-col items-center mb-8">
          {/* Avatar circle with initials */}
          <div className="w-20 h-20 rounded-full bg-gradient-to-tr from-blue-400 to-green-400 dark:from-indigo-500 dark:to-teal-500 flex items-center justify-center text-3xl font-bold text-white shadow-lg mb-4">
            {profile.name ? profile.name[0].toUpperCase() : "U"}
          </div>
          <h2 className="text-3xl font-extrabold text-zinc-900 dark:text-white tracking-tight mb-1">{profile.name}</h2>
          <span className="text-zinc-500 dark:text-zinc-300 text-sm">{profile.email}</span>
        </div>
  <div className="space-y-6">
          <div>
            <Label className="text-zinc-700 dark:text-zinc-200">Name</Label>
            <Input value={profile.name || ""} disabled className="mt-1 bg-zinc-100 dark:bg-zinc-800 text-zinc-900 dark:text-white" />
          </div>
          <div>
            <Label className="text-zinc-700 dark:text-zinc-200">Email</Label>
            <Input value={profile.email || ""} disabled className="mt-1 bg-zinc-100 dark:bg-zinc-800 text-zinc-900 dark:text-white" />
          </div>
          {/* Example: Show user role if available */}
          {profile.role && (
            <div>
              <Label className="text-zinc-700 dark:text-zinc-200">Role</Label>
              <Input value={profile.role} disabled className="mt-1 bg-zinc-100 dark:bg-zinc-800 text-zinc-900 dark:text-white" />
            </div>
          )}
        </div>
        {/* Wishlist dialog trigger */}
        <div className="mt-8 flex justify-center">
          <button
            className="px-4 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700"
            onClick={() => setWishlistOpen(true)}
          >
            View Wishlist ({wishlist.length})
          </button>
        </div>
        {/* Wishlist dialog */}
        {wishlistOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
            <div className="bg-white dark:bg-zinc-900 rounded-xl shadow-2xl p-6 max-w-lg w-full relative">
              <button
                className="absolute top-2 right-2 text-gray-400 hover:text-gray-900 dark:hover:text-white text-xl font-bold"
                onClick={() => setWishlistOpen(false)}
                aria-label="Close"
              >×</button>
              <h3 className="text-xl font-bold mb-4 text-blue-600">Wishlist Products</h3>
              {wishlist.length > 0 ? (
                <ul className="space-y-3">
                  {wishlist.map((product: any) => (
                    <li key={product._id} className="flex items-center gap-3 border-b pb-2">
                      <img src={product.image || 'https://via.placeholder.com/40x40'} alt={product.name} className="w-10 h-10 rounded object-cover" />
                      <span className="font-medium text-gray-900 dark:text-white">{product.name}</span>
                      <span className="ml-auto text-blue-600 font-semibold">₹{product.price}</span>
                    </li>
                  ))}
                </ul>
              ) : (
                <div className="text-gray-500">No products in wishlist.</div>
              )}
            </div>
          </div>
        )}
      </Card>
    </div>
  );
};

export default Profile;
