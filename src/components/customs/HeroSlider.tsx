import { useEffect, useState } from "react";
import { Button } from "../ui/button";
import img1 from "../../assets/Hero-1.jpg";
import img2 from "../../assets/Hero-2.jpg";
import img3 from "../../assets/Hero-3.jpg";
import CitrusIcon from "../../assets/CitrusIcon.png";
import BerryIcon from "../../assets/Berry.png";
import TropicalIcon from "../../assets/Tropical.png";
import StoneFruitIcon from "../../assets/StoneFruit.png";
import MelonIcon from "../../assets/Melon.png";
import JuiceIcon from "../../assets/Juice.png";


const slides = [
  {
  image: img1,
  label: "Fresh & Featured",
  heading: "Premium Citrus Fruits\nfor Healthy Living",
  description:
    "Discover our collection of fresh oranges, lemons, and grapefruits.\nRich in Vitamin C and bursting with natural flavor.",
  price: "₹4.82",
  oldPrice: "₹6.50",
  buttonText: "Shop Fresh",
},
{
  image: img2,
  label: "Berry Special",
  heading: "Antioxidant-Rich Berries\nat Amazing Prices",
  description:
    "Premium strawberries, blueberries, and more exotic berries.\nPacked with nutrients and naturally sweet.",
  price: "₹4.05",
  oldPrice: "₹5.99",
  buttonText: "Pick Berries",
},
{
  image: img3,
  label: "Tropical Paradise",
  heading: "Exotic Tropical Fruits\nFlat 30% Off",
  description:
    "From sweet pineapples to creamy mangoes—bring tropical flavors to your table.",
  price: "₹4.55",
  oldPrice: "₹6.50",
  buttonText: "Go Tropical",
},

];

const categories = [
  { image: CitrusIcon, name: "Citrus Fruits", backend: "citrus", description: "Oranges, Lemons, Limes" },
  { image: BerryIcon, name: "Fresh Berries", backend: "berry", description: "Strawberries, Blueberries" },
  { image: TropicalIcon, name: "Tropical Fruits", backend: "tropical", description: "Pineapple, Mango, Papaya" },
  { image: StoneFruitIcon, name: "Stone Fruits", backend: "stone fruit", description: "Peaches, Plums, Cherries" },
  { image: MelonIcon, name: "Fresh Melons", backend: "melon", description: "Watermelon, Cantaloupe" },
  { image: JuiceIcon, name: "Fresh Juices", backend: "juice", description: "100% Natural Juices" },
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
                <Button
                  className="bg-primary hover:bg-violet-950 text-white w-32 h-10 text-sm font-semibold rounded cursor-pointer transition-colors"
                  onClick={() => window.location.href = "/filters"}
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
