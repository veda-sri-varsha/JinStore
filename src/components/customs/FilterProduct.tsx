import { useEffect, useState } from "react";
import { ProductList } from "../customs/ProductsList";

export default function FilterProduct() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const categories = [
    { label: "All", value: null },
    { label: "Groceries", value: "groceries" },
    { label: "Women's Watches", value: "womens-watches" },
    { label: "Women's Dresses", value: "womens-dresses" },
    { label: "Men's Shirts", value: "mens-shirts" },
  ];

  // Emit categorySelect event to filter products
  useEffect(() => {
    const event = new CustomEvent("categorySelect", {
      detail: selectedCategory,
    });
    window.dispatchEvent(event);
  }, [selectedCategory]);

  return (
    <div className="max-w-[1200px] mx-auto px-4 py-6">
      {/* Title */}
      <h1 className="text-3xl font-bold mb-4 text-center text-gray-800">
        Grocery store with different treasures
      </h1>

      {/* Sidebar + Products Layout */}
      <div className="flex flex-col md:flex-row gap-6">
        {/* Sidebar */}
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

        {/* Products Section */}
        <main className="flex-1 bg-white rounded-md p-4 shadow-sm">
          <ProductList />
        </main>
      </div>
    </div>
  );
}
