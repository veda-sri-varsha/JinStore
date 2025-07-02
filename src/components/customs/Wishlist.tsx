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
    const stored = JSON.parse(localStorage.getItem("wishlistItems") || "[]");
    setWishlistItems(stored);
  }, []);

  const removeFromWishlist = (id: number) => {
    const updated = wishlistItems.filter((item) => item.id !== id);
    setWishlistItems(updated);
    localStorage.setItem("wishlistItems", JSON.stringify(updated));
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold mb-6 text-center text-purple-800">
        🧡 My Wishlist
      </h1>

      {wishlistItems.length === 0 ? (
        <p className="text-gray-600 text-center">
          Your wishlist is empty. Start adding your favorite items!
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {wishlistItems.map((item) => (
            <div
              key={item.id}
              className="border border-gray-200 p-4 rounded-lg shadow-sm hover:shadow-md transition bg-white"
            >
              <img
                src={item.thumbnail || "/placeholder-image.jpg"}
                alt={item.title}
                className="w-full h-40 object-contain mb-2 rounded"
                onError={(e) =>
                  ((e.target as HTMLImageElement).src = "/placeholder-image.jpg")
                }
              />

              <h2 className="text-lg font-semibold line-clamp-1">{item.title}</h2>
              <p className="text-green-700 font-bold mt-1">₹{item.price}</p>
              <p className="text-sm text-gray-600 mt-1 line-clamp-2">
                {item.description}
              </p>

              <div className="mt-4 flex justify-between gap-2">
                <Link to={`/product/${item.id}`}>
                  <Button size="sm" variant="outline" className="w-full">
                    View
                  </Button>
                </Link>
                <Button
                  size="sm"
                  variant="destructive"
                  className="w-full"
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
