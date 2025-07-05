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
  const stored = JSON.parse(localStorage.getItem("wishlist") || "[]") as string[];
  console.log("Stored Wishlist IDs:", stored);

  setWishlist(stored);

  if (stored.length === 0) {
    setProducts([]);
    setLoading(false);
    return;
  }

  const productsRef = ref(rtdb, "products/fruits");

  const unsubscribe = onValue(productsRef, (snapshot) => {
    const data = snapshot.val();
    console.log("Fetched Firebase Data:", data);

    if (!data) {
      console.log("No data found under 'products/fruits'");
      setProducts([]);
      setLoading(false);
      return;
    }

    const loaded: FirebaseProduct[] = [];

    for (const groupKey in data) {
      const productArray = data[groupKey];

      if (Array.isArray(productArray)) {
        for (const item of productArray) {
          const itemId = item.id?.toString() || `${groupKey}_${item.name}`;
          console.log("Checking item:", itemId);

          if (stored.includes(itemId)) {
            loaded.push({
              id: itemId,
              name: item.name,
              description: item.description || "",
              price: Number(item.price) || 0,
              imageUrl: item.imageUrl || "/placeholder-image.jpg",
              category: item.category || "",
              rating: item.rating || 0,
              stock: item.stock || 0,
              tags: item.tags || [],
            });
          }
        }
      }
    }

    console.log("Matched Wishlist Products:", loaded);

    setProducts(loaded);
    setLoading(false);
  });

  return () => unsubscribe();
}, []);


  const removeFromWishlist = (productId: string) => {
    const updated = wishlist.filter((id) => id !== productId);
    setWishlist(updated);
    localStorage.setItem("wishlist", JSON.stringify(updated));
    setProducts((prev) => prev.filter((p) => p.id !== productId));
  };

  if (loading) {
    return <div className="text-center py-10">Loading wishlist...</div>;
  }

  if (products.length === 0) {
    return <div className="text-center py-10 text-gray-600">No items in wishlist.</div>;
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <h1 className="text-2xl font-bold mb-6 text-center">Your Wishlist ❤️</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {products.map((product) => (
          <div key={product.id} className="border rounded-lg p-4 shadow-sm flex flex-col items-center">
            <img
              src={product.imageUrl}
              alt={product.name}
              className="w-32 h-32 object-contain mb-4"
            />
            <h2 className="text-lg font-semibold text-center">{product.name}</h2>
            <p className="text-green-700 font-bold text-lg mt-1">₹{product.price.toFixed(2)}</p>
            <p className="text-sm text-gray-500 mt-1">⭐ {product.rating}</p>

            <div className="mt-4 flex gap-2">
              <Link to={`/product/${product.id}`}>
                <Button variant="default" className="bg-blue-600 hover:bg-blue-700">View</Button>
              </Link>
              <Button
                variant="outline"
                className="border-pink-500 text-pink-600"
                onClick={() => removeFromWishlist(product.id)}
              >
                Remove
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
