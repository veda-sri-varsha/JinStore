import { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { Link } from "react-router";

interface WishlistProduct {
  id: number;
  title: string;
  price: number;
  thumbnail: string;
  description: string;
}

export function Wishlist() {
  const [wishlistItems, setWishlistItems] = useState<WishlistProduct[]>([]);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("wishlist") || "[]");
    setWishlistItems(stored);
  }, []);

  const removeFromWishlist = (id: number) => {
    const updated = wishlistItems.filter((item) => item.id !== id);
    setWishlistItems(updated);
    localStorage.setItem("wishlist", JSON.stringify(updated));
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-10">
      <h1 className="text-2xl font-bold mb-6">🧡 My Wishlist</h1>
      {wishlistItems.length === 0 ? (
        <p className="text-gray-600">Your wishlist is empty.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {wishlistItems.map((item) => (
            <div
              key={item.id}
              className="border p-4 rounded-lg shadow-sm hover:shadow-md transition"
            >
              <img
                src={item.thumbnail}
                alt={item.title}
                className="w-full h-40 object-contain mb-2"
              />
              <h2 className="text-lg font-semibold">{item.title}</h2>
              <p className="text-green-700 font-bold">₹{item.price}</p>
              <p className="text-sm text-gray-600">
                {item.description.slice(0, 60)}...
              </p>
              <div className="mt-3 flex justify-between">
                <Link to={`/product/${item.id}`}>
                  <Button size="sm" variant="outline">
                    View
                  </Button>
                </Link>
                <Button
                  size="sm"
                  variant="destructive"
                  onClick={() => removeFromWishlist(item.id)}
                >
                  Remove
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
