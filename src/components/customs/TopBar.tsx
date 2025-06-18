import { useState, useEffect } from "react";
import { Link } from "react-router";
import {
  FaSearch,
  FaUser,
  FaHeart,
  FaShoppingCart,
  FaChevronDown,
  FaSignOutAlt,
} from "react-icons/fa";
import { HiX as X, HiMenu as Menu } from "react-icons/hi";
import Logo from "../../assets/logo.png";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useCart } from "../../context/CartContext";
import { auth } from "../../config/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { useSearch } from "../../context/SearchContext";

export const TopBar = () => {
  const [timeLeft] = useState({
    days: 63,
    hours: 15,
    minutes: 51,
    seconds: 7,
  });

  const [input, setInput] = useState<string>("");
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [username, setUsername] = useState<string>("User");
  const [showMenu, setShowMenu] = useState<boolean>(false);
  const { getTotalQuantity } = useCart();
  const total = getTotalQuantity();
  const { searchTerm, setSearchTerm } = useSearch();

  const handleSearch = () => {
    console.log("Search value:", searchTerm);
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setIsLoggedIn(true);
        const storedUsername =
          localStorage.getItem("username") ||
          user.email?.split("@")[0] ||
          "User";
        setUsername(storedUsername);
      } else {
        setIsLoggedIn(false);
        setUsername("User");
      }
    });

    const loggedIn = localStorage.getItem("isLoggedIn") === "true";
    const storedUsername = localStorage.getItem("username") || "User";

    setIsLoggedIn(loggedIn);
    setUsername(storedUsername);

    return () => unsubscribe();
  }, []);

  const handleLogout = () => {
    auth.signOut();
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("username");
    setIsLoggedIn(false);
    setUsername("User");
  };

  return (
    <div>
      <div className="hidden md:block bg-primary text-white py-2 px-4">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-center gap-6 md:gap-30 text-sm text-center">
          <span className="block md:inline">
            FREE delivery & 15% Discount for best 3 orders! Place your 1st order
            in
          </span>
          <div className="flex flex-col md:flex-row items-center md:gap-4 font-normal mt-2 md:mt-0">
            <span>Until the end of the sale:</span>
            <div className="flex items-center gap-1.5">
              <div>{timeLeft.days.toString().padStart(2, "0")}</div>
              <span>days</span>
              <div>{timeLeft.hours.toString().padStart(2, "0")}</div>
              <span>hours</span>
              <div>{timeLeft.minutes.toString().padStart(2, "0")}</div>
              <span>minutes</span>
              <div className="flex items-center gap-[2px]">
                <div>{timeLeft.seconds.toString().padStart(2, "0")}</div>
                <span>Sec</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <header className="bg-white shadow-sm text-xs text-gray-500 font-sans border border-grey-200 cursor-pointer">
        <div className="max-w-7xl mx-auto px-4 py-2 flex flex-row flex-wrap justify-between items-center gap-4">
          <div className="sm:flex flex-row flex-wrap items-center w-full text-xs">
            <div className="flex items-center gap-4 flex-wrap">
              <Button
                variant="ghost"
                size="icon"
                className="md:hidden"
                onClick={() => setShowMenu(!showMenu)}
              >
                {showMenu ? <X size={24} /> : <Menu size={24} />}
              </Button>

              <div
                className={`${
                  showMenu ? "flex" : "hidden"
                } flex-col sm:flex sm:flex-row sm:items-center gap-4`}
              >
                <Link to="/about" className="hover:text-primary">
                  About Us
                </Link>
                <Link to="/login" className="hover:text-primary">
                  My Account
                </Link>
                <Link to="/wishlist" className="hover:text-primary">
                  Wishlist
                </Link>
              </div>

              <span className="text-sm whitespace-nowrap ml-4">
                We deliver every day from{" "}
                <span className="text-orange-500 font-bold">7:00 to 23:00</span>
              </span>
            </div>

            <div className="flex items-center gap-4 ml-auto mt-2 sm:mt-0">
              <div className="flex items-center gap-1 whitespace-nowrap">
                <span>English</span>
                <FaChevronDown size={14} className="mt-[1px]" />
              </div>
              <div className="relative flex items-center gap-1 whitespace-nowrap group">
                <span>IND</span>
                <FaChevronDown size={14} className="mt-[1px]" />
                <div className="absolute top-full right-0 hidden group-hover:block bg-white border border-gray-200 rounded shadow-lg mt-1">
                  <div className="py-1">
                    <button className="block w-full px-4 py-1 text-left hover:bg-gray-100">
                      USD
                    </button>
                    <button className="block w-full px-4 py-1 text-left hover:bg-gray-100">
                      IND
                    </button>
                  </div>
                </div>
              </div>

              {isLoggedIn && (
                <button
                  onClick={handleLogout}
                  className="flex items-center gap-2 px-3 py-1 bg-primary text-white text-xs rounded hover:bg-purple-900 transition-colors whitespace-nowrap cursor-pointer"
                >
                  <FaSignOutAlt className="w-4 h-4" />
                  Logout
                </button>
              )}
            </div>
          </div>
        </div>
      </header>

      <header className="bg-white shadow-sm cursor-pointer">
        <div className="max-w-7xl mx-auto px-3 py-2.5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link to="/" className="flex items-center gap-2 cursor-pointer">
                <img
                  src={Logo}
                  alt="Logo"
                  className="w-10 h-10 object-contain"
                />
                <span className="text-xl font-bold text-gray-800">
                  JinStore
                </span>
              </Link>
            </div>

            <div className="flex-1 mx-6 hidden md:block">
              <div className="relative">
                <Input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search for products, categories or brands..."
                  className="w-full px-4 py-2 pr-12 rounded-md bg-gray-100 text-sm text-gray-800 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-600 transition-all"
                />
                <button
                  type="button"
                  aria-label="Search"
                  onClick={handleSearch}
                  className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500 hover:text-purple-600"
                >
                  <FaSearch size={20} />
                </button>
              </div>
            </div>

            <div className="flex items-center gap-5">
              {isLoggedIn ? (
                <div className="flex items-center space-x-2 text-gray-600 hover:text-purple-600 text-sm">
                  <FaUser size={20} />
                  <div className="flex flex-col">
                    <span className="text-sm">Hello,</span>
                    <span className="text-xs font-semibold">{username}</span>
                  </div>
                </div>
              ) : (
                <Link
                  to="/login"
                  className="flex items-center space-x-2 text-gray-600 hover:text-purple-600 text-sm"
                >
                  <FaUser size={20} />
                  <div className="flex flex-col">
                    <span className="text-sm">Sign In</span>
                    <span className="text-xs font-semibold">Account</span>
                  </div>
                </Link>
              )}

              <button className="relative text-gray-600 hover:text-purple-600 cursor-pointer">
                <FaHeart size={20} />
                <span className="absolute -top-2 left-4 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  0
                </span>
              </button>
              <Link
                to="/cart"
                className="relative text-gray-600 hover:text-purple-600 cursor-pointer"
              >
                <FaShoppingCart size={20} />
                <span className="absolute -top-2.5 -right-3 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {total}
                </span>
              </Link>
            </div>
          </div>

          <div className="mt-4 md:hidden">
            <div className="relative">
              <Input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Search products..."
                className="w-full px-4 py-2 pr-12 rounded-lg bg-gray-100"
              />
              <button
                type="button"
                aria-label="Search"
                onClick={handleSearch}
                className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500 hover:text-purple-600"
              >
                <FaSearch size={20} />
              </button>
            </div>
          </div>
        </div>
      </header>
    </div>
  );
};
