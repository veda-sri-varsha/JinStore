import { Link } from "react-router";
import { TopBar } from "./TopBar";
import { FaChevronDown } from "react-icons/fa";
import { Menu, X } from "lucide-react";
import { useState } from "react";

interface MenuItem {
  label: string;
  path: string;
}

const menuItems: MenuItem[] = [
  { label: "Home", path: "/" },
  { label: "Shop", path: "/shop" },
  // Add more menu items as needed
];

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
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
                <Link
                  to={path}
                  key={label}
                  className="flex items-center gap-1 cursor-pointer hover:text-[var(--color-primary)]"
                >
                  <span>{label}</span>
                  {(label === "Home" || label === "Shop") && (
                    <FaChevronDown size={14} className="mt-[1px]" />
                  )}
                </Link>
              ))}
            </div>
          </div>

          <div className="hidden md:flex items-center space-x-4 text-sm font-medium text-gray-800">
            <div className="flex items-center gap-1 cursor-pointer hover:text-[var(--color-primary)]">
              <span>Trending Products</span>
              <FaChevronDown size={14} className="mt-[1px]" />
            </div>
            <div className="flex items-center space-x-1">
              <span className="text-red-600 font-semibold cursor-pointer hover:text-red-400">
                Almost Finished
              </span>
              <span className="bg-red-500 text-white text-[10px] font-bold px-1.5 py-[1px] rounded-sm">
                SALE
              </span>
              <FaChevronDown size={14} className="mt-[1px]" />
            </div>
          </div>
        </div>

        {menuOpen && (
          <div className="md:hidden mt-3 space-y-2 text-sm font-medium text-black">
            {menuItems.map(({ label, path }) => (
              <Link
                to={path}
                key={label}
                className="block px-2 py-1 hover:text-[var(--color-primary)]"
              >
                {label}
              </Link>
            ))}
            <div className="border-t border-gray-200 pt-2 space-y-1">
              <div className="flex items-center gap-1">
                <span>Trending Products</span>
                <FaChevronDown size={14} className="mt-[1px]" />
              </div>
              <div className="flex items-center gap-1">
                <span className="text-red-600 font-semibold">
                  Almost Finished
                </span>
                <span className="bg-red-500 text-white text-[10px] font-bold px-1.5 py-[1px] rounded-sm">
                  SALE
                </span>
                <FaChevronDown size={14} className="mt-[1px]" />
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
