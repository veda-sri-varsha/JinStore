import { useEffect, useState } from "react";
import { Card } from "../ui/card";
import { Button } from "../ui/button";
import { useCart } from "../hooks/useCart";
import { useSearch } from "../../context/SearchContext";
import { Link } from "react-router";
import { ref, onValue, off } from "firebase/database";
import { rtdb } from "../../config/firebase";

interface Product {
  id: string;
  title: string;
  description: string;
  price: number;
  image: string;
  category: string;
  rating: number;
  stock: number;
  brand?: string;
}

interface ProductListProps {
  selectedCategory: string | null;
}

export function ProductList({ selectedCategory }: ProductListProps) {
  const [products, setProducts] = useState<Product[]>([]);
  const [visibleCount, setVisibleCount] = useState(10);
  const { addToCart } = useCart();
  const { searchTerm } = useSearch();

  useEffect(() => {
    const productsRef = ref(rtdb, "products/fruits");

    const unsubscribe = onValue(productsRef, (snapshot) => {
      const data = snapshot.val();
      const allProducts: Product[] = [];

      if (data) {
        for (const groupKey in data) {
          const productArray = data[groupKey];
          if (Array.isArray(productArray)) {
            for (const item of productArray) {
              if (item?.name) {
                allProducts.push({
                  id: item.id?.toString() || `${groupKey}_${item.name}`,
                  title: item.name,
                  description: item.description || "",
                  price: parseFloat(item.price),
                  image: item.imageUrl || "/placeholder-image.jpg",
                  category: item.category?.toLowerCase() || "uncategorized",
                  stock: item.stock || 0,
                  rating: item.rating || 0,
                  brand: item.tags?.join(", ") || "",
                });
              }
            }
          }
        }
      }

      setProducts(allProducts);
    });

    return () => off(productsRef, "value", unsubscribe);
  }, []);

  const filteredProducts = products.filter((product) => {
    const matchesCategory =
      !selectedCategory ||
      product.category.toLowerCase() === selectedCategory.toLowerCase();
    const matchesSearch =
      product.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const visibleProducts = filteredProducts.slice(0, visibleCount);

  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + window.scrollY >= document.body.offsetHeight - 300 &&
        visibleCount < filteredProducts.length
      ) {
        setVisibleCount((prev) => prev + 10);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [visibleCount, filteredProducts.length]);

  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {visibleProducts.map((product) => (
        <Card key={product.id} className="p-4 shadow">
          <Link to={`/product/${product.id}`}>
            <img
              src={product.image}
              alt={product.title}
              className="w-full h-40 object-cover rounded"
              onError={(e) => ((e.target as HTMLImageElement).src = "/placeholder-image.jpg")}
            />
          </Link>
          <h3 className="mt-2 font-semibold">{product.title}</h3>
          <p className="text-sm text-gray-600">{product.description}</p>
          <div className="mt-2 flex justify-between items-center">
            <span className="font-bold text-green-600">₹{product.price.toFixed(2)}</span>
            <span className="text-xs text-gray-400">{product.brand}</span>
          </div>
          <Button
            className="mt-3 w-full"
            disabled={product.stock <= 0}
            onClick={() => addToCart({ ...product, quantity: 1 })}
          >
            {product.stock <= 0 ? "Out of Stock" : "Add to Cart"}
          </Button>
        </Card>
      ))}
    </div>
  );
}
