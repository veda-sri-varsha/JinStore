import { useParams } from "react-router";
import { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { useCart } from "../../context/CartContext";
import { ref, onValue } from "firebase/database";
import { rtdb } from "../../config/firebase";
import {
  FaHeart,
  FaRegHeart,
  FaShoppingCart,
  FaStar,
  FaRegStar,
  FaTruck,
  FaUndo,
} from "react-icons/fa";

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

export default function ProductDetails() {
  const { id } = useParams();
  const { addToCart } = useCart();
  const [product, setProduct] = useState<FirebaseProduct | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [wishlist, setWishlist] = useState<string[]>([]);
  const [selectedImage, setSelectedImage] = useState(0);
  const [productImages, setProductImages] = useState<string[]>([]);
  const [activeTab, setActiveTab] = useState("description");
  const [showLoginMessage, setShowLoginMessage] = useState(false);
  const isLoggedIn = Boolean(localStorage.getItem("user"));

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("wishlist") || "[]");
    setWishlist(stored);
  }, []);

  const toggleWishlist = (productId: string) => {
    const updated = wishlist.includes(productId)
      ? wishlist.filter((pid) => pid !== productId)
      : [...wishlist, productId];

    setWishlist(updated);
    localStorage.setItem("wishlist", JSON.stringify(updated));
  };

  const isInWishlist = wishlist.includes(id || "");

  useEffect(() => {
    if (!id) return;

    const productsRef = ref(rtdb, "products/fruits");
    onValue(productsRef, (snapshot) => {
      const data = snapshot.val();
      if (!data) return;

      for (const groupKey in data) {
        const productArray = data[groupKey];
        if (Array.isArray(productArray)) {
          for (const item of productArray) {
            const itemId =
              item.id?.toString().trim() ||
              `${groupKey}_${item.name?.toString().trim()}`;

            if (itemId === id) {
              const images = item.images || [item.imageUrl];
              setProduct({
                id: itemId,
                name: item.name || "Unknown Product",
                description: item.description || "No description available.",
                price: parseFloat(item.price || "0"),
                imageUrl: item.imageUrl || "/placeholder-image.jpg",
                category: item.category || "Uncategorized",
                rating: item.rating || 4.5,
                stock: item.stock || 0,
                tags: item.tags || [],
              });
              setProductImages(images);
              return;
            }
          }
        }
      }
    });
  }, [id]);

  const renderStars = (rating: number) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        i <= rating ? (
          <FaStar key={i} className="text-yellow-400" />
        ) : (
          <FaRegStar key={i} className="text-gray-300" />
        )
      );
    }
    return stars;
  };

  const handleAddToCart = () => {
    if (!isLoggedIn) {
      setShowLoginMessage(true);
      setTimeout(() => setShowLoginMessage(false), 3000);
      return;
    }
    if (!product) return;

    const dealProduct = {
      id: product.id,
      title: product.name,
      image: product.imageUrl,
      price: product.price,
      description: product.description,
      category: product.category,
      quantity,
    };

    addToCart(dealProduct);
    const existingItems = JSON.parse(localStorage.getItem("cartItems") || "[]");
    const updatedItems = [...existingItems, dealProduct];
    localStorage.setItem("cartItems", JSON.stringify(updatedItems));
  };

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-gray-600">Loading product...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
       <nav className="text-sm text-gray-500 mb-4">
          <span>Home</span> / <span>Shop</span> /{" "}
          <span>Fruits & Vegetables</span> /
          <span className="text-gray-900 font-medium"> {product.name}</span>
        </nav>
      <div className="max-w-6xl mx-auto bg-white rounded-lg shadow-sm p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <img
              src={productImages[selectedImage] || product.imageUrl}
              alt={product.name}
              className="w-full h-96 object-contain rounded-lg"
            />

            <div className="flex gap-2 overflow-x-auto pb-2 mt-4">
              {productImages.map((img, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`flex-shrink-0 w-16 h-16 rounded-lg border-2 overflow-hidden ${
                    selectedImage === index
                      ? "border-primary"
                      : "border-gray-200"
                  }`}
                >
                  <img
                    src={img}
                    alt={`${product.name} ${index + 1}`}
                    className="w-full h-full object-contain bg-gray-50"
                  />
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-gray-800">{product.name}</h2>
            <div className="flex items-center gap-2">
              {renderStars(product.rating)}
              <span className="text-sm text-gray-600">({product.rating})</span>
            </div>
            <div className="text-3xl font-bold text-green-600">
              ₹{product.price.toFixed(2)}
            </div>
            <p className="text-sm text-gray-600">{product.description}</p>

            <div className="flex items-center gap-4">
              <Button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="w-10 h-10 bg-white text-black border border-gray-300 rounded-full hover:bg-gray-100 transition"
                aria-label="Decrease quantity"
              >
                −
              </Button>

              <span className="text-lg font-medium min-w-[24px] text-center">
                {quantity}
              </span>

              <Button
                onClick={() => setQuantity(quantity + 1)}
                className="w-10 h-10 bg-white text-black border border-gray-300 rounded-full hover:bg-gray-100 transition"
                aria-label="Increase quantity"
              >
                +
              </Button>
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <Button
                onClick={handleAddToCart}
                className="flex-1 bg-primary text-white py-3 rounded-lg"
              >
                <FaShoppingCart className="mr-2" /> Add to Cart
              </Button>
              <Button
                onClick={() => (window.location.href = "/checkout")}
                className="flex-1 bg-black text-white py-3 rounded-lg"
              >
                Buy Now
              </Button>
            </div>

            {showLoginMessage && (
              <div className="bg-green-200 text-green-800 text-sm px-4 py-2 mt-2 rounded shadow">
                Please login to add items to your cart.
              </div>
            )}

            <Button
              variant="outline"
              onClick={() => toggleWishlist(product.id)}
              className={`w-full mt-3 border-2 py-3 rounded-lg transition-colors ${
                isInWishlist
                  ? "border-red-500 text-red-500 bg-red-50"
                  : "border-gray-300 text-gray-600 hover:border-red-500 hover:text-red-500"
              }`}
            >
              {isInWishlist ? <FaHeart /> : <FaRegHeart />} Add to Wishlist
            </Button>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-6 border-t">
              <div className="flex flex-col items-center text-center gap-2">
                     <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 18"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                  >
                    <path
                      d="M20.5182 0.23403H3.20216C2.66482 0.23403 2.16216 0.364031 1.69416 0.624031C1.22616 0.884029 0.85349 1.23936 0.576156 1.69003C0.298823 2.1407 0.160156 2.6347 0.160156 3.17203V13.988C0.160156 14.5254 0.29449 15.028 0.563156 15.496C0.831823 15.964 1.19582 16.3367 1.65516 16.614C2.11449 16.8914 2.63016 17.03 3.20216 17.03H20.5182C21.0555 17.03 21.5582 16.8957 22.0262 16.627C22.4942 16.3584 22.8668 15.9944 23.1442 15.535C23.4215 15.0757 23.5602 14.56 23.5602 13.988V3.17203C23.5602 2.6347 23.4215 2.1407 23.1442 1.69003C22.8668 1.23936 22.4942 0.884029 22.0262 0.624031C21.5582 0.364031 21.0555 0.23403 20.5182 0.23403ZM3.20216 1.87203H20.5182C20.8995 1.87203 21.2115 2.00203 21.4542 2.26203C21.6968 2.52203 21.8182 2.82536 21.8182 3.17203V5.53803H1.90216V3.17203C1.90216 2.7907 2.02349 2.4787 2.26616 2.23603C2.50882 1.99336 2.82082 1.87203 3.20216 1.87203ZM20.5182 15.392H3.20216C2.83816 15.392 2.53049 15.2577 2.27916 14.989C2.02782 14.7204 1.90216 14.4214 1.90216 14.092V7.38403H21.9482V13.988C21.8788 14.3867 21.7185 14.7204 21.4672 14.989C21.2158 15.2577 20.8995 15.392 20.5182 15.392Z"
                      fill="green"
                    />
                  </svg>
                <p className="text-xs text-gray-600">Secure Payment</p>
              </div>
              <div className="flex flex-col items-center text-center gap-2">
                <FaTruck className="text-blue-600 h-6 w-6" />
                <p className="text-xs text-gray-600">Fast Delivery</p>
              </div>
              <div className="flex flex-col items-center text-center gap-2">
                <FaUndo className="text-purple-600 h-6 w-6" />
                <p className="text-xs text-gray-600">Easy Returns</p>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t mt-10">
          <div className="flex border-b">
            <button
              onClick={() => setActiveTab("description")}
              className={`px-6 py-4 text-sm font-medium transition-colors ${
                activeTab === "description"
                  ? "text-primary border-b-2 border-primary"
                  : "text-gray-600 hover:text-gray-900"
              }`}
            >
              Description
            </button>
            <button
              onClick={() => setActiveTab("reviews")}
              className={`px-6 py-4 text-sm font-medium transition-colors ${
                activeTab === "reviews"
                  ? "text-primary border-b-2 border-primary"
                  : "text-gray-600 hover:text-gray-900"
              }`}
            >
              Reviews (2)
            </button>
          </div>

          <div className="p-6">
            {activeTab === "description" && (
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Product Description</h3>
                <p className="text-gray-600 leading-relaxed">
                  {product.description}
                </p>
                <div className="mt-6">
                  <h4 className="font-medium mb-2">Key Features:</h4>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• Fresh and organic produce</li>
                    <li>• Carefully selected for quality</li>
                    <li>• Rich in vitamins and minerals</li>
                    <li>• Perfect for healthy lifestyle</li>
                  </ul>
                </div>
              </div>
            )}

            {activeTab === "reviews" && (
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Customer Reviews</h3>
                <div className="space-y-4">
                  <div className="border rounded-lg p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="flex">{renderStars(5)}</div>
                      <span className="text-sm font-medium">John Doe</span>
                      <span className="text-xs text-gray-500">2 days ago</span>
                    </div>
                    <p className="text-sm text-gray-600">
                      Excellent quality! Fresh and delivered on time. Highly recommended.
                    </p>
                  </div>

                  <div className="border rounded-lg p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="flex">{renderStars(4)}</div>
                      <span className="text-sm font-medium">Sarah Smith</span>
                      <span className="text-xs text-gray-500">1 week ago</span>
                    </div>
                    <p className="text-sm text-gray-600">
                      Good product, but packaging could be improved. Overall satisfied.
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
