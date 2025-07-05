import { useNavigate } from "react-router";
import { TopBar } from "./TopBar";
import { Menu, X } from "lucide-react";
import { useState } from "react";

interface MenuItem {
  label: string;
  path: string;
}

const menuItems: MenuItem[] = [
  { label: "Home", path: "/" },
  { label: "Shop", path: "/filters" },
  { label: "Fruits & Vegetables", path: "/filters" },
  { label: "Contact", path: "/contact" },
];

const categoryPaths: Record<string, string> = {
  Shop: "groceries",
  "Fruits & Vegetables": "groceries",
};

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleMenuClick = (label: string, path: string) => {
    const backendCategory = categoryPaths[label];

    if (backendCategory) {
      window.dispatchEvent(
        new CustomEvent("categorySelect", { detail: backendCategory })
      );
      navigate("/filters");
    } else {
      navigate(path);
    }

    setMenuOpen(false);
  };

  return (
    <>
      <TopBar />

      <div className="px-4 sm:px-8 py-2 border-b border-blue-100 font-sans">
        <div className="flex items-center justify-between md:justify-between">
          <div className="flex items-center gap-4">
            <button
              className="md:hidden text-gray-700"
              onClick={() => setMenuOpen(!menuOpen)}
            >
              {menuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>

            <div className="hidden md:flex items-center space-x-6 text-sm font-medium text-black">
              {menuItems.map(({ label, path }) => (
                <div
                  key={label}
                  onClick={() => handleMenuClick(label, path)}
                  className="cursor-pointer hover:text-[var(--color-primary)]"
                >
                  {label}
                </div>
              ))}
            </div>
          </div>

          <div className="hidden md:flex items-center space-x-4 text-sm font-medium text-gray-800">
            <div
              className="cursor-pointer hover:text-[var(--color-primary)]"
              onClick={() => navigate("/orders")}
            >
              Order Tracking
            </div>
          </div>
        </div>

        {menuOpen && (
          <div className="md:hidden mt-4 space-y-2">
            {menuItems.map(({ label, path }) => (
              <div
                key={label}
                onClick={() => handleMenuClick(label, path)}
                className="block text-sm font-medium text-gray-800 px-2 py-2 rounded hover:bg-gray-100 cursor-pointer"
              >
                {label}
              </div>
            ))}

            <div
              onClick={() => {
                navigate("/orders");
                setMenuOpen(false);
              }}
              className="block text-sm font-medium text-gray-800 px-2 py-2 rounded hover:bg-gray-100 cursor-pointer"
            >
              Order Tracking
            </div>
          </div>
        )}
      </div>
    </>
  );
}
