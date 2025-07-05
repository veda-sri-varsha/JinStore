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
      <nav className="text-xs text-gray-500 mb-3">
        Home / Shop / Fruits & Vegetables /
        <span className="text-gray-900 font-semibold"> {product.name}</span>
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

            <div className="flex flex-col gap-3 sm:flex-row sm:gap-4">
              <Button
                onClick={handleAddToCart}
                className="flex items-center justify-center gap-2 w-full sm:flex-1 bg-primary text-white py-3 text-sm sm:text-base rounded-lg"
              >
                <FaShoppingCart className="text-base" />
                Add to Cart
              </Button>

              <Button
                onClick={() => (window.location.href = "/checkout")}
                className="flex items-center justify-center gap-2 w-full sm:w-65 bg-black hover:bg-gray-800 text-white py-3 px-6 text-sm sm:text-base rounded-lg"
              >
                <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
<g clip-path="url(#clip0_6314_7062)">
<path d="M8.12286 1.74208C7.70286 1.74208 7.3132 1.84708 6.95386 2.05708C6.59453 2.26708 6.30986 2.55174 6.09986 2.91108C5.88986 3.27041 5.78486 3.66008 5.78486 4.08008H4.59486C4.59486 3.44541 4.7512 2.85974 5.06386 2.32308C5.37653 1.78641 5.8012 1.36174 6.33786 1.04908C6.87453 0.736411 7.4602 0.580078 8.09486 0.580078C8.72953 0.580078 9.3152 0.736411 9.85186 1.04908C10.3885 1.36174 10.8132 1.78641 11.1259 2.32308C11.4385 2.85974 11.5949 3.44541 11.5949 4.08008H13.8909C14.2269 4.08008 14.5115 4.19908 14.7449 4.43708C14.9782 4.67508 15.0949 4.96674 15.0949 5.31208C15.0949 5.38674 15.0902 5.45674 15.0809 5.52208L13.7789 13.0541C13.7042 13.4927 13.4989 13.8567 13.1629 14.1461C12.8269 14.4354 12.4395 14.5801 12.0009 14.5801H4.18886C3.7502 14.5801 3.36286 14.4354 3.02686 14.1461C2.69086 13.8567 2.48553 13.4927 2.41086 13.0541L1.10886 5.53608C1.05286 5.20008 1.12053 4.89208 1.31186 4.61208C1.5032 4.33208 1.7622 4.15941 2.08886 4.09408C2.1542 4.08474 2.2242 4.08008 2.29886 4.08008H10.4609C10.4609 3.66008 10.3559 3.27041 10.1459 2.91108C9.93586 2.55174 9.6512 2.26708 9.29186 2.05708C8.93253 1.84708 8.54286 1.74208 8.12286 1.74208ZM13.8909 5.24208H2.29886C2.28953 5.24208 2.27553 5.26074 2.25686 5.29808V5.32608L3.55886 12.8581C3.58686 13.0074 3.6522 13.1334 3.75486 13.2361C3.85753 13.3387 3.97886 13.3947 4.11886 13.4041L4.18886 13.4181H12.0009C12.1409 13.4181 12.2692 13.3737 12.3859 13.2851C12.5025 13.1964 12.5795 13.0774 12.6169 12.9281L13.9329 5.31208C13.9329 5.27474 13.9235 5.25608 13.9049 5.25608L13.8909 5.24208Z" fill="white"/>
</g>
<defs>
<clipPath id="clip0_6314_7062">
<rect width="14" height="14" fill="white" transform="matrix(1 0 0 -1 0.96875 14.5801)"/>
</clipPath>
</defs>
</svg>

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

            <div className="hidden sm:grid grid-cols-1 sm:grid-cols-3 gap-6 pt-6 border-t">
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
                      Excellent quality! Fresh and delivered on time. Highly
                      recommended.
                    </p>
                  </div>

                  <div className="border rounded-lg p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="flex">{renderStars(4)}</div>
                      <span className="text-sm font-medium">Sarah Smith</span>
                      <span className="text-xs text-gray-500">1 week ago</span>
                    </div>
                    <p className="text-sm text-gray-600">
                      Good product, but packaging could be improved. Overall
                      satisfied.
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
