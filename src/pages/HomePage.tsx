import HeroSlider from "../components/customs/HeroSlider";
import { ProductList } from "../components/customs/ProductsList";

export default function HomePage() {
  return <>
  <HeroSlider/>
  <ProductList selectedCategory={null}/>
  </>;
}
