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

  // Emit categorySelect event to trigger ProductList filtering
  useEffect(() => {
    const event = new CustomEvent("categorySelect", {
      detail: selectedCategory,
    });
    window.dispatchEvent(event);
  }, [selectedCategory]);

  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      <h1 className="text-2xl font-bold mb-6 text-center">
        Grocery store with different treasures
      </h1>

      <div className="flex flex-col md:flex-row gap-6">
        {/* Sidebar */}
        <aside className="w-full md:w-64 border rounded-lg p-4 shadow">
          <h2 className="font-semibold text-lg mb-4">Filter by Category</h2>
          <ul className="space-y-2">
            {categories.map((cat) => (
              <li key={cat.label}>
                <button
                  onClick={() => setSelectedCategory(cat.value)}
                  className={`w-full text-left px-3 py-2 rounded ${
                    selectedCategory === cat.value
                      ? "bg-purple-100 text-purple-700 font-semibold"
                      : "hover:bg-gray-100"
                  }`}
                >
                  {cat.label}
                </button>
              </li>
            ))}
          </ul>
        </aside>

        {/* Products Section */}
        <main className="flex-1">
          <ProductList />
        </main>
      </div>
    </div>
  );
}
