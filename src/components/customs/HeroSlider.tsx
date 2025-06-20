import { useEffect, useState } from "react";
import { Button } from "../ui/button";
import img1 from "../../assets/Hero-1.jpg";
import img2 from "../../assets/Hero-2.jpg";
import img3 from "../../assets/Hero-3.jpg";
import FrVeg from "../../assets/Fruits-1.png";
import Dresses from "../../assets/dress.png";
import Shirts from "../../assets/Shrits.png";
import Watches from "../../assets/watches.png";


const slides = [
  {
    image: img1,
    label: "Weekend Discount",
    heading: "Shopping with us for\nbetter quality and the best price",
    description:
      "We have prepared special discounts for you on grocery products.\nDon’t miss these opportunities...",
    price: " ₹21.67",
    oldPrice: " ₹26.87",
    buttonText: "Shop Now",
  },
  {
    image: img2,
    label: "Weekend Discount",
    heading: "Get the best quality products at the lowest prices",
    description:
      "Get organic and healthy veggies at a much lower price. Limited period offer.",
    price: " ₹9.99",
    oldPrice: " ₹15.00",
    buttonText: "Explore",
  },
  {
    image: img3,
    label: "Weekend Discount",
    heading: "Up to 70% off\non kitchen essentials",
    description:
      "Upgrade your kitchen with branded tools & appliances. Don’t miss out.",
    price: " ₹39.99",
    oldPrice: " ₹89.99",
    buttonText: "Grab Deal",
  },
];

const categories = [
  { image: FrVeg, name: "Groceries", backend: "groceries" },
  { image: Dresses, name: "Womens-Dress", backend: "womens-dresses" },
  { image: Shirts, name: "Mens-Shirts", backend: "mens-shirts" },
  { image: Watches, name: "Watches", backend: "womens-watches" },
  
];

export default function HeroSlider() {
  const [current, setCurrent] = useState<number>(0);
  const length = slides.length;

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev === length - 1 ? 0 : prev + 1));
    }, 3000);
    return () => clearInterval(interval);
  }, [length]);

  const handleCategoryClick = (backendCategory: string) => {
    window.dispatchEvent(
      new CustomEvent("categorySelect", { detail: backendCategory })
    );
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
              <div className="inline-block mb-2 px-3 py-1 rounded text-sm font-bold text-green-800 bg-gradient-to-r from-green-400/50 via-green-200/10 to-white">
                {slide.label}
              </div>

              <h2 className="text-3xl font-extrabold leading-snug text-purple-900 whitespace-pre-line">
                {slide.heading}
              </h2>

              <p className="text-sm text-gray-700 mt-2 whitespace-pre-line">
                {slide.description}
              </p>

              <div className="flex items-center mt-4 gap-4">
                <Button className="bg-primary hover:bg-violet-950 text-white w-32 h-10 text-sm font-semibold rounded">
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

      <div className="w-full bg-white py-6 px-4">
        <div className="max-w-5xl mx-auto flex flex-wrap justify-center gap-6 sm:gap-4">
          {categories.map((category) => (
            <div
              key={category.name}
              className="flex flex-col items-center space-y-2 text-center min-w-[80px] transition-all duration-300 hover:scale-105 hover:bg-gray-50 rounded-xl cursor-pointer"
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
    </>
  );
}
