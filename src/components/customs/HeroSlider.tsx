import { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { ref, onValue } from "firebase/database";
import { rtdb } from "../../config/firebase";

import img1 from "../../assets/Hero-1.jpg";
import img2 from "../../assets/Hero-2.jpg";
import img3 from "../../assets/Hero-3.jpg";

import CitrusIcon from "../../assets/CitrusIcon.png";
import BerryIcon from "../../assets/Berry.png";
import TropicalIcon from "../../assets/Tropical.png";
import StoneFruitIcon from "../../assets/StoneFruit.png";
import MelonIcon from "../../assets/Melon.png";
import JuiceIcon from "../../assets/Juice.png";

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  category: string;
}

const slides = [
  {
    image: img1,
    label: "JinStore Picks",
    heading: "Fresh Citrus Fruits\nStraight from the Farm",
    description:
      "Enjoy naturally sweet oranges, tangy lemons, and juicy mosambis.\nHandpicked daily for maximum freshness and Vitamin C boost.",
    price: "₹120/kg",
    oldPrice: "₹160/kg",
    buttonText: "Order Citrus",
    backend: "citrus",
  },
  {
    image: img2,
    label: "Berry Delight",
    heading: "Juicy Berries\nfor Your Sweet Cravings",
    description:
      "Stock up on antioxidant-rich strawberries, blueberries, and jamuns.\nPerfect for desserts, smoothies, or healthy snacking.",
    price: "₹150",
    oldPrice: "₹210",
    buttonText: "Buy Berries",
    backend: "berry",
  },
  {
    image: img3,
    label: "Tropical Treats",
    heading: "Mangoes, Pineapples & More\nDelivered Fresh",
    description:
      "Tropical fruits full of flavor and freshness.\nPerfectly ripe and delivered to your doorstep from trusted local farms.",
    price: "₹99/kg",
    oldPrice: "₹140/kg",
    buttonText: "Explore Now",
    backend: "tropical",
  },
];

const categories = [
  { image: CitrusIcon, name: "Citrus Fruits", backend: "citrus" },
  { image: BerryIcon, name: "Fresh Berries", backend: "berry" },
  { image: TropicalIcon, name: "Tropical Fruits", backend: "tropical" },
  { image: StoneFruitIcon, name: "Stone Fruits", backend: "stone fruit" },
  { image: MelonIcon, name: "Fresh Melons", backend: "melon" },
  { image: JuiceIcon, name: "Fresh Juices", backend: "juice" },
];

export default function HeroSlider() {
  const [current, setCurrent] = useState<number>(0);
  const [allProducts, setAllProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const productsRef = ref(rtdb, "products/fruits");
    onValue(productsRef, (snapshot) => {
      const data = snapshot.val();
      const loaded: Product[] = [];

      for (const groupKey in data) {
        const group = data[groupKey];
        if (Array.isArray(group)) {
          for (const product of group) {
            if (product?.name && product?.category) {
              loaded.push(product);
            }
          }
        }
      }

      setAllProducts(loaded);
    });
  }, []);

  useEffect(() => {
    if (!selectedCategory) {
      setFilteredProducts([]);
      return;
    }

    const filtered = allProducts.filter(
      (p) => p.category.toLowerCase().trim() === selectedCategory
    );
    setFilteredProducts(filtered);
  }, [selectedCategory, allProducts]);

  const handleCategoryClick = (backendCategory: string) => {
    setSelectedCategory(backendCategory);
  };

  return (
    <>
      <div className="relative w-full h-[500px] overflow-hidden">
        {slides.map((slide, index) => (
          <div
            key={index}
            className={`absolute top-0 left-0 w-full h-full transition-opacity duration-1000 ${
              index === current ? "opacity-100 z-10" : "opacity-0 z-0"
            }`}
          >
            <img
              src={slide.image}
              alt={`Slide ${index}`}
              className="w-full h-full object-cover"
            />
            <div className="absolute top-1/4 left-8 max-w-md text-black p-6">
              <div className="inline-block mb-2 px-3 py-1  text-sm font-bold text-green-800 bg-gradient-to-r from-green-400/50 via-green-200/10 to-white">
                {slide.label}
              </div>

              <h2 className="text-xl sm:text-3xl font-extrabold leading-snug text-purple-900 whitespace-pre-line">
                {slide.heading}
              </h2>

              <p className="hidden sm:block text-sm text-gray-700 mt-2 whitespace-pre-line">
                {slide.description}
              </p>

              <div className="flex items-center mt-4 gap-4">
                <Button
                  className="bg-primary hover:bg-violet-950 text-white w-32 h-10 text-sm font-semibold rounded"
                  onClick={() => handleCategoryClick(slide.backend)}
                >
                  {slide.buttonText}
                </Button>
                <div className="text-red-600 text-lg font-bold">
                  {slide.price}
                </div>
                <div className="text-gray-500 line-through text-sm">
                  {slide.oldPrice}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="w-full mt-4 flex justify-center gap-2">
        {slides.map((_, idx) => (
          <button
            key={idx}
            title={`Go to slide ${idx + 1}`}
            className={`w-3 h-3 rounded-full transition-colors ${
              idx === current ? "bg-gray-800" : "bg-gray-400"
            }`}
            onClick={() => setCurrent(idx)}
          />
        ))}
      </div>

      <div className="w-full bg-white py-6 px-4 hidden sm:block">
        <div className="max-w-5xl mx-auto flex flex-wrap justify-center gap-6 sm:gap-4">
          {categories.map((category) => (
            <div
              key={category.name}
              className={`flex flex-col items-center space-y-2 text-center min-w-[80px] transition-all duration-300 hover:scale-105 hover:bg-gray-50 rounded-xl cursor-pointer ${
                selectedCategory === category.backend
                  ? "ring-2 ring-purple-100"
                  : ""
              }`}
              onClick={() => handleCategoryClick(category.backend)}
            >
              <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center overflow-hidden">
                <img
                  src={category.image}
                  alt={category.name}
                  className="object-contain w-full h-full"
                />
              </div>
              <span className="text-xs font-medium text-gray-800">
                {category.name}
              </span>
            </div>
          ))}
        </div>
      </div>

      {selectedCategory && (
        <div className="max-w-6xl mx-auto px-4 pb-8">
          <h2 className="text-xl font-semibold mb-4 text-purple-800">
            Showing: {selectedCategory}
          </h2>
          {filteredProducts.length === 0 ? (
            <p className="text-gray-500">No products found.</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {filteredProducts.map((product) => (
                <div
                  key={product.id}
                  className="border rounded-md p-4 shadow-sm bg-white"
                >
                  <img
                    src={product.imageUrl}
                    alt={product.name}
                    className="w-full h-40 object-cover rounded"
                  />
                  <h3 className="text-lg font-semibold mt-2 text-gray-800">
                    {product.name}
                  </h3>
                  <p className="text-sm text-gray-600 mt-1">
                    {product.description}
                  </p>
                  <p className="text-purple-600 font-bold mt-2">
                    ₹{product.price}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </>
  );
}
