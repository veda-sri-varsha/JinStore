import { useEffect, useState } from "react";
import { Link } from "react-router";
import { ref, onValue } from "firebase/database";
import { rtdb } from "../../config/firebase";
import { Button } from "../ui/button";

interface FirebaseProduct {
  id: string;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  category: string;
  rating: number;
  stock: number;
  tags?: string[];
}

export function Wishlist() {
  const [wishlist, setWishlist] = useState<string[]>([]);
  const [products, setProducts] = useState<FirebaseProduct[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const stored = JSON.parse(
      localStorage.getItem("wishlist") || "[]"
    ) as string[];
    setWishlist(stored);

    if (stored.length === 0) {
      setProducts([]);
      setLoading(false);
      return;
    }

    const loaded: FirebaseProduct[] = [];

    const fruitsRef = ref(rtdb, "products/fruits");
    onValue(
      fruitsRef,
      (snapshot) => {
        const data = snapshot.val();
        if (!data) {
          setLoading(false);
          return;
        }

        for (const groupKey in data) {
          const group = data[groupKey];
          if (Array.isArray(group)) {
            group.forEach((item) => {
              const itemId =
                item.id?.toString().trim() ||
                `${groupKey}_${item.name?.toString().trim()}`;
              if (stored.includes(itemId)) {
                loaded.push({
                  id: itemId,
                  name: item.name || "No name",
                  description: item.description || "No description",
                  price: parseFloat(item.price || "0"),
                  imageUrl: item.imageUrl || "/placeholder.jpg",
                  category: item.category || "Uncategorized",
                  rating: item.rating || 4.5,
                  stock: item.stock || 0,
                  tags: item.tags || [],
                });
              }
            });
          }
        }

        setProducts(loaded);
        setLoading(false);
      },
      { onlyOnce: true }
    );
  }, []);

  const removeFromWishlist = (productId: string) => {
    const updated = wishlist.filter((id) => id !== productId);
    setWishlist(updated);
    setProducts((prev) => prev.filter((p) => p.id !== productId));
    localStorage.setItem("wishlist", JSON.stringify(updated));
    window.dispatchEvent(new Event("wishlistUpdated"));
  };

  if (loading) {
    return (
      <div className="text-center py-20 text-gray-500">
        Loading your wishlist...
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div className="text-center py-20 text-gray-500 text-lg">
        Your wishlist is empty 💔
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <h1 className="text-3xl font-bold text-center text-gray-800 mb-10">
        Your Wishlist ❤️
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {products.map((product) => (
          <div
            key={product.id}
            className="bg-white shadow-md rounded-2xl overflow-hidden flex flex-col justify-between transition transform hover:scale-[1.01] duration-200"
          >
            <img
              src={product.imageUrl}
              alt={product.name}
              className="w-full h-48 object-cover sm:h-56"
            />
            <div className="p-4 flex flex-col gap-2">
              <h2 className="text-lg font-semibold text-gray-800 text-center">
                {product.name}
              </h2>
              <p className="text-center text-green-600 text-lg font-bold">
                ₹{product.price.toFixed(2)}
              </p>
              <p className="text-center text-sm text-gray-500">
                ⭐ {product.rating}
              </p>
              <div className="flex flex-col sm:flex-row justify-center items-center mt-4 gap-3 w-full">
                <Link
                  to={`/product/${product.id}`}
                  className="w-full sm:w-auto"
                >
                  <Button className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white text-sm px-5 py-2 rounded-xl transition duration-200">
                    View
                  </Button>
                </Link>
                <Button
                  variant="outline"
                  className="w-full sm:w-auto border-red-500 text-red-600 hover:bg-red-50 text-sm px-5 py-2 rounded-xl transition duration-200"
                  onClick={() => removeFromWishlist(product.id)}
                >
                  Remove
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
