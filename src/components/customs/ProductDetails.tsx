import { useParams } from "react-router";
import { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { useCart } from "../../context/CartContext";

export interface RawProduct {
  id: number;
  title: string;
  description: string;
  price: number;
  discountPercentage: number;
  thumbnail: string;
  images: string[];
  rating: number;
  stock: number;
  brand: string;
  category: string;
}

export default function ProductDetails() {
  const { id } = useParams();
  const { addToCart } = useCart();
  const [product, setProduct] = useState<RawProduct | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [wishlist, setWishlist] = useState<string[]>([]);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("wishlist") || "[]");
    setWishlist(stored);
  }, []);

  const toggleWishlist = (productId: string) => {
    const updated = wishlist.includes(productId)
      ? wishlist.filter((id) => id !== productId)
      : [...wishlist, productId];

    setWishlist(updated);
    localStorage.setItem("wishlist", JSON.stringify(updated));
  };

  const isInWishlist = wishlist.includes(product?.id.toString() || "");

  useEffect(() => {
    const fetchProduct = async () => {
      const res = await fetch(`https://dummyjson.com/products/${id}`);
      const data = await res.json();
      setProduct(data);
    };
    fetchProduct();
  }, [id]);

  if (!product)
    return <div className="text-center py-10">Loading product...</div>;

  const discountedPrice = (
    product.price *
    (1 - product.discountPercentage / 100)
  ).toFixed(2);

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-start">
        <div>
          <img
            src={product.thumbnail}
            alt={product.title}
            className="w-full h-96 object-contain border rounded-lg shadow"
          />
          <div className="flex gap-2 mt-4">
            {product.images.slice(0, 4).map((img, i) => (
              <img
                key={i}
                src={img}
                alt="variant"
                className="h-16 w-16 object-cover border rounded hover:scale-105 transition"
              />
            ))}
          </div>
        </div>

        {/* Right: Details */}
        <div className="space-y-4">
          <h1 className="text-2xl font-bold">{product.title}</h1>
          <div className="text-yellow-500 text-sm">
            ⭐ {product.rating} | {product.stock} in stock
          </div>

          <div className="flex items-center space-x-4">
            <span className="text-2xl font-bold text-green-700">
              ₹{discountedPrice}
            </span>
            <span className="line-through text-gray-500 text-md">
              ₹{product.price}
            </span>
            <span className="text-sm bg-red-100 text-red-700 px-2 py-1 rounded">
              {product.discountPercentage}% off
            </span>
          </div>

          <div className="bg-orange-100 text-orange-800 px-4 py-2 rounded text-sm font-medium w-fit">
            🎉 Special Offer! Limited Time Only
          </div>

          <div className="space-y-2">
            <label className="font-medium">Quantity</label>
            <div className="flex items-center space-x-3">
              <Button
                variant="outline"
                size="icon"
                onClick={() => setQuantity((prev) => Math.max(1, prev - 1))}
              >
                −
              </Button>
              <span className="text-lg font-semibold w-8 text-center">
                {quantity}
              </span>
              <Button
                variant="outline"
                size="icon"
                onClick={() => setQuantity((prev) => prev + 1)}
              >
                +
              </Button>
            </div>
          </div>

          <div className="flex gap-4 mt-4">
            <Button
              className="w-40 bg-green-600 font-bold hover:bg-green-700"
              onClick={() => {
                const dealProduct = {
                  id: product.id.toString(),
                  title: product.title,
                  image: product.thumbnail,
                  price: parseFloat(discountedPrice),
                  description: product.description,
                };
                addToCart(dealProduct);
                const existingItems = JSON.parse(
                  localStorage.getItem("cartItems") || "[]"
                );
                const updatedItems = [...existingItems, dealProduct];
                localStorage.setItem("cartItems", JSON.stringify(updatedItems));
              }}
            >
              <svg
                width="15"
                height="15"
                viewBox="0 0 15 15"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g clip-path="url(#clip0_6314_7063)">
                  <path
                    d="M8.12286 1.74208C7.70286 1.74208 7.3132 1.84708 6.95386 2.05708C6.59453 2.26708 6.30986 2.55174 6.09986 2.91108C5.88986 3.27041 5.78486 3.66008 5.78486 4.08008H4.59486C4.59486 3.44541 4.7512 2.85974 5.06386 2.32308C5.37653 1.78641 5.8012 1.36174 6.33786 1.04908C6.87453 0.736411 7.4602 0.580078 8.09486 0.580078C8.72953 0.580078 9.3152 0.736411 9.85186 1.04908C10.3885 1.36174 10.8132 1.78641 11.1259 2.32308C11.4385 2.85974 11.5949 3.44541 11.5949 4.08008H13.8909C14.2269 4.08008 14.5115 4.19908 14.7449 4.43708C14.9782 4.67508 15.0949 4.96674 15.0949 5.31208C15.0949 5.38674 15.0902 5.45674 15.0809 5.52208L13.7789 13.0541C13.7042 13.4927 13.4989 13.8567 13.1629 14.1461C12.8269 14.4354 12.4395 14.5801 12.0009 14.5801H4.18886C3.7502 14.5801 3.36286 14.4354 3.02686 14.1461C2.69086 13.8567 2.48553 13.4927 2.41086 13.0541L1.10886 5.53608C1.05286 5.20008 1.12053 4.89208 1.31186 4.61208C1.5032 4.33208 1.7622 4.15941 2.08886 4.09408C2.1542 4.08474 2.2242 4.08008 2.29886 4.08008H10.4609C10.4609 3.66008 10.3559 3.27041 10.1459 2.91108C9.93586 2.55174 9.6512 2.26708 9.29186 2.05708C8.93253 1.84708 8.54286 1.74208 8.12286 1.74208ZM13.8909 5.24208H2.29886C2.28953 5.24208 2.27553 5.26074 2.25686 5.29808V5.32608L3.55886 12.8581C3.58686 13.0074 3.6522 13.1334 3.75486 13.2361C3.85753 13.3387 3.97886 13.3947 4.11886 13.4041L4.18886 13.4181H12.0009C12.1409 13.4181 12.2692 13.3737 12.3859 13.2851C12.5025 13.1964 12.5795 13.0774 12.6169 12.9281L13.9329 5.31208C13.9329 5.27474 13.9235 5.25608 13.9049 5.25608L13.8909 5.24208Z"
                    fill="white"
                  />
                </g>
                <defs>
                  <clipPath id="clip0_6314_7063">
                    <rect
                      width="14"
                      height="14"
                      fill="white"
                      transform="matrix(1 0 0 -1 0.96875 14.5801)"
                    />
                  </clipPath>
                </defs>
              </svg>
              Add to Cart
            </Button>
            <Button
              variant="outline"
              className="w-40 bg-black hover:bg-zinc-800 text-white hover:text-white font-bold"
              onClick={() => (window.location.href = "/checkout")}
            >
              <svg
                width="15"
                height="15"
                viewBox="0 0 15 15"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g clip-path="url(#clip0_6314_7063)">
                  <path
                    d="M8.12286 1.74208C7.70286 1.74208 7.3132 1.84708 6.95386 2.05708C6.59453 2.26708 6.30986 2.55174 6.09986 2.91108C5.88986 3.27041 5.78486 3.66008 5.78486 4.08008H4.59486C4.59486 3.44541 4.7512 2.85974 5.06386 2.32308C5.37653 1.78641 5.8012 1.36174 6.33786 1.04908C6.87453 0.736411 7.4602 0.580078 8.09486 0.580078C8.72953 0.580078 9.3152 0.736411 9.85186 1.04908C10.3885 1.36174 10.8132 1.78641 11.1259 2.32308C11.4385 2.85974 11.5949 3.44541 11.5949 4.08008H13.8909C14.2269 4.08008 14.5115 4.19908 14.7449 4.43708C14.9782 4.67508 15.0949 4.96674 15.0949 5.31208C15.0949 5.38674 15.0902 5.45674 15.0809 5.52208L13.7789 13.0541C13.7042 13.4927 13.4989 13.8567 13.1629 14.1461C12.8269 14.4354 12.4395 14.5801 12.0009 14.5801H4.18886C3.7502 14.5801 3.36286 14.4354 3.02686 14.1461C2.69086 13.8567 2.48553 13.4927 2.41086 13.0541L1.10886 5.53608C1.05286 5.20008 1.12053 4.89208 1.31186 4.61208C1.5032 4.33208 1.7622 4.15941 2.08886 4.09408C2.1542 4.08474 2.2242 4.08008 2.29886 4.08008H10.4609C10.4609 3.66008 10.3559 3.27041 10.1459 2.91108C9.93586 2.55174 9.6512 2.26708 9.29186 2.05708C8.93253 1.84708 8.54286 1.74208 8.12286 1.74208ZM13.8909 5.24208H2.29886C2.28953 5.24208 2.27553 5.26074 2.25686 5.29808V5.32608L3.55886 12.8581C3.58686 13.0074 3.6522 13.1334 3.75486 13.2361C3.85753 13.3387 3.97886 13.3947 4.11886 13.4041L4.18886 13.4181H12.0009C12.1409 13.4181 12.2692 13.3737 12.3859 13.2851C12.5025 13.1964 12.5795 13.0774 12.6169 12.9281L13.9329 5.31208C13.9329 5.27474 13.9235 5.25608 13.9049 5.25608L13.8909 5.24208Z"
                    fill="white"
                  />
                </g>
                <defs>
                  <clipPath id="clip0_6314_7063">
                    <rect
                      width="14"
                      height="14"
                      fill="white"
                      transform="matrix(1 0 0 -1 0.96875 14.5801)"
                    />
                  </clipPath>
                </defs>
              </svg>
              Buy Now
            </Button>
          </div>
          <Button
            variant="ghost"
            className={`w-40 border ${
              isInWishlist ? "border-pink-500 text-pink-600" : "text-gray-500"
            }`}
            onClick={() => toggleWishlist(product.id.toString())}
          >
            {isInWishlist ? "❤️ Wishlisted" : "🤍 Add to Wishlist"}
          </Button>

          <p className="text-gray-600 text-sm mt-6">{product.description}</p>
        </div>
      </div>

      <div className="mt-12 border-t pt-6">
        <h2 className="text-xl font-semibold mb-2">Product Description</h2>
        <p className="text-sm text-gray-700 leading-relaxed">
          {product.description}
        </p>
      </div>
    </div>
  );
}
