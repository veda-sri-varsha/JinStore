import { useEffect, useState } from "react";
import { ProductList } from "../customs/ProductsList";
import { ref, onValue, off } from "firebase/database";
import { rtdb } from "../../config/firebase";

interface CategoryOption {
  label: string;
  value: string | null;
}

export default function FilterProduct() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [categories, setCategories] = useState<CategoryOption[]>([
    { label: "All", value: null },
  ]);

  useEffect(() => {
    const productsRef = ref(rtdb, "products/fruits");
    const unsubscribe = onValue(productsRef, (snapshot) => {
      const data = snapshot.val();
      const categorySet = new Set<string>();

      if (data) {
        for (const groupKey in data) {
          const productArray = data[groupKey];
          if (Array.isArray(productArray)) {
            for (const product of productArray) {
              if (product?.category) {
                categorySet.add(product.category.trim().toLowerCase());
              }
            }
          }
        }
      }

      const generatedCategories: CategoryOption[] = Array.from(categorySet).map((cat) => ({
        label: formatLabel(cat),
        value: cat,
      }));

      setCategories([{ label: "All", value: null }, ...generatedCategories]);
    });

    return () => off(productsRef, "value", unsubscribe);
  }, []);

  const formatLabel = (text: string) => {
    switch (text.toLowerCase()) {
      case "citrus":
        return "Citrus Fruits";
      case "berry":
        return "Fresh Berries";
      case "tropical":
        return "Tropical Fruits";
      case "melon":
        return "Fresh Melons";
      case "juice":
        return "Fresh Juices";
      case "stone fruit":
        return "Stone Fruits";
      default:
        return text.charAt(0).toUpperCase() + text.slice(1);
    }
  };

  return (
    <div className="max-w-[1200px] mx-auto px-4 py-6">
      <h1 className="text-3xl font-bold mb-4 text-center text-gray-800">
        Grocery store with different treasures
      </h1>

      <div className="flex flex-col md:flex-row gap-6">
        <aside className="w-full md:w-[230px] bg-white border border-gray-200 rounded-md shadow-sm p-4 text-sm">
          <h2 className="font-semibold text-gray-800 text-base mb-3">
            Filter by Category
          </h2>
          <ul className="space-y-1">
            {categories.map((cat) => (
              <li key={cat.label}>
                <button
                  onClick={() => setSelectedCategory(cat.value)}
                  className={`w-full text-left px-3 py-[6px] rounded transition duration-200 ${
                    selectedCategory === cat.value
                      ? "bg-purple-100 text-purple-700 font-semibold"
                      : "hover:bg-gray-100 text-gray-700"
                  }`}
                >
                  {cat.label}
                </button>
              </li>
            ))}
          </ul>
        </aside>

        <main className="flex-1 bg-white rounded-md p-4 shadow-sm">
          <ProductList selectedCategory={selectedCategory} />
        </main>
      </div>
    </div>
  );
}
