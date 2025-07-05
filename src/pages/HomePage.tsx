import { useState } from "react";
import HeroSlider from "../components/customs/HeroSlider";
import { ProductList } from "../components/customs/ProductsList";

export default function HomePage() {
  const [selectedCategory] = useState<string | null>(null);

  return (
    <>
      <HeroSlider />
      <ProductList selectedCategory={selectedCategory} />
    </>
  );
}
