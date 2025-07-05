import { useEffect, useState } from "react";
import { Card } from "../ui/card";
import { Button } from "../ui/button";
import { useCart } from "../hooks/useCart";
import { useSearch } from "../../context/SearchContext";
import { Link } from "react-router";
import { ref, onValue, off } from "firebase/database";
import { rtdb, auth } from "../../config/firebase";
import { onAuthStateChanged, type User } from "firebase/auth";
// import BestSellers from "../customs/BestSellers";

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
  isBestSelling?: boolean;
  isNewArrival?: boolean;
  isFeatured?: boolean;
}

interface ProductListProps {
  selectedCategory: string | null;
}

export function ProductList({ selectedCategory }: ProductListProps) {
  const [products, setProducts] = useState<Product[]>([]);
  const [visibleCount, setVisibleCount] = useState(10);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [showLoginMessage, setShowLoginMessage] = useState(false);

  const { addToCart } = useCart();
  const { searchTerm } = useSearch();

  const addProductBadges = (product: Product, index: number): Product => {
    const badges = {
      isBestSelling: false,
      isNewArrival: false,
      isFeatured: false,
    };

    if (product.rating >= 4.5 || product.price > 100 || index % 7 === 0) {
      badges.isBestSelling = true;
    }
    
    if (index % 11 === 0 || product.title.toLowerCase().includes('fresh')) {
      badges.isNewArrival = true;
    }
    
    if (product.rating >= 4.8 || index % 13 === 0) {
      badges.isFeatured = true;
    }

    return { ...product, ...badges };
  };

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

      const productsWithBadges = allProducts.map((product, index) => 
        addProductBadges(product, index)
      );

      setProducts(productsWithBadges);
    });

    return () => off(productsRef, "value", unsubscribe);
  }, []);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
    });
    return () => unsubscribe();
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

  const getBadgeStyle = (type: 'bestSelling' | 'newArrival' | 'featured') => {
    const baseClasses = "absolute top-2 left-2 px-2 py-1 text-xs font-bold rounded-full z-10";
    switch (type) {
      case 'bestSelling':
        return `${baseClasses} bg-green-700 text-white`;
      case 'newArrival':
        return `${baseClasses} bg-blue-500 text-white`;
      case 'featured':
        return `${baseClasses} bg-purple-500 text-white`;
      default:
        return baseClasses;
    }
  };

  return (
    <>
    {/* <BestSellers/>
    <br/> */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {visibleProducts.map((product) => (
          <Card key={product.id} className="p-4 shadow relative">
            {product.isBestSelling && (
              <div className={getBadgeStyle('bestSelling')}>
                🔥 Best Selling
              </div>
            )}
            {product.isNewArrival && !product.isBestSelling && (
              <div className={getBadgeStyle('newArrival')}>
                ✨ New
              </div>
            )}
            {product.isFeatured && !product.isBestSelling && !product.isNewArrival && (
              <div className={getBadgeStyle('featured')}>
                ⭐ Featured
              </div>
            )}
            
            <Link to={`/product/${product.id}`}>
              <img
                src={product.image}
                alt={product.title}
                className="w-full h-40 object-cover rounded"
                onError={(e) =>
                  ((e.target as HTMLImageElement).src = "/placeholder-image.jpg")
                }
              />
            </Link>
            <h3 className="mt-2 font-semibold">{product.title}</h3>
            <p className="text-sm text-gray-600">{product.description}</p>
            <div className="mt-2 flex justify-between items-center">
              <span className="font-bold text-green-600">
                ₹{product.price.toFixed(2)}
              </span>
              <span className="text-xs text-gray-400">{product.brand}</span>
            </div>
            
            {product.rating > 0 && (
              <div className="mt-1 flex items-center">
                <span className="text-yellow-400 text-sm">
                  {'★'.repeat(Math.floor(product.rating))}
                  {'☆'.repeat(5 - Math.floor(product.rating))}
                </span>
                <span className="ml-1 text-xs text-gray-500">
                  ({product.rating.toFixed(1)})
                </span>
              </div>
            )}
            
            <Button
              className="mt-3 w-full cursor-pointer"
              disabled={product.stock <= 0}
              onClick={() => {
                if (!currentUser) {
                  setShowLoginMessage(true);
                  setTimeout(() => setShowLoginMessage(false), 2500);
                  return;
                }
                addToCart({ ...product, quantity: 1 });
              }}
            >
              {product.stock <= 0 ? "Out of Stock" : "Add to Cart"}
            </Button>
          </Card>
        ))}
      </div>

      {showLoginMessage && (
        <div className="fixed top-1/7 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-green-200 text-green-700 text-sm px-6 py-3 rounded-md shadow-lg z-50 transition-opacity duration-300">
          Please login to add items to your cart.
        </div>
      )}
    </>
  );
}