import { useState, useEffect } from "react";
import { Link } from "react-router";
import {
  FaSearch,
  FaUser,
  FaHeart,
  FaShoppingCart,
  // FaMapPin,
  FaChevronDown,
  FaSignOutAlt,
} from "react-icons/fa";
import { HiX as X, HiMenu as Menu } from "react-icons/hi";
import Logo from "../../assets/logo.png";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useCart } from "../../context/CartContext";

export const TopBar = () => {
  const [timeLeft] = useState({
    days: 63,
    hours: 15,
    minutes: 51,
    seconds: 7,
  });

  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [username, setUsername] = useState<string>("User");
  const [showMenu, setShowMenu] = useState(false);
  const { getTotalQuantity } = useCart();
  const total = getTotalQuantity();

  // Check login status and username from localStorage on component mount
  useEffect(() => {
    const loginStatus = localStorage.getItem("isLoggedIn") === "true";
    const storedUsername = localStorage.getItem("username") || "User";
    
    setIsLoggedIn(loginStatus);
    setUsername(storedUsername);
  }, []);

  // Handle logout
  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("username");
    setIsLoggedIn(false);
    setUsername("User");
  };

  return (
    <div>
      <div className=" hidden md:block bg-primary text-white py-2 px-4">
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
              <div className="flex items-center gap-1 whitespace-nowrap">
                <span>USD</span>
                <FaChevronDown size={14} className="mt-[1px]" />
              </div>

              {isLoggedIn && (
                <button
                  onClick={handleLogout}
                  className="flex items-center gap-2 px-3 py-1 bg-primary text-white text-xs rounded hover:bg-purple-900 transition-colors whitespace-nowrap"
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
              <div className="flex items-center">
                <Link to="/" className="flex items-center gap-2 cursor-pointer">
                  <div className="w-10 h-10 flex items-center justify-center">
                    <img
                      src={Logo}
                      alt="Logo"
                      className="w-10 h-10 object-contain"
                    />
                  </div>
                  <span className="text-xl font-bold text-gray-800">
                    JinStore
                  </span>
                </Link>
              </div>
              <div className="hidden md:flex items-start gap-1 text-sm text-gray-700 ml-4">
                {/* <FaMapPin className="w-5 h-5 mt-1" /> */}
                <svg
                  width="20"
                  height="24"
                  viewBox="0 0 20 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M9.70216 0.4042C7.98616 0.4042 6.39149 0.837534 4.91816 1.7042C3.47949 2.5362 2.33549 3.67153 1.48616 5.1102C0.602156 6.60087 0.160156 8.21287 0.160156 9.9462C0.160156 11.8009 0.792823 13.7682 2.05816 15.8482C3.01149 17.4255 4.28549 19.0202 5.88016 20.6322C6.74682 21.4989 7.73482 22.4002 8.84416 23.3362L9.15616 23.5962C9.20816 23.6482 9.28616 23.6959 9.39016 23.7392C9.49416 23.7825 9.60249 23.8042 9.71516 23.8042C9.82782 23.8042 9.92316 23.7912 10.0012 23.7652C10.0792 23.7392 10.1615 23.6829 10.2482 23.5962L10.5602 23.3362C11.6695 22.4002 12.6575 21.4989 13.5242 20.6322C15.1188 19.0202 16.3928 17.4255 17.3462 15.8482C18.6115 13.7682 19.2442 11.8009 19.2442 9.9462C19.2442 8.21287 18.8022 6.60087 17.9182 5.1102C17.0688 3.67153 15.9248 2.5362 14.4862 1.7042C13.0128 0.837534 11.4182 0.4042 9.70216 0.4042ZM9.70216 21.7502C8.78349 21.0049 7.84749 20.1469 6.89416 19.1762C5.49016 17.7029 4.37216 16.2642 3.54016 14.8602C2.44816 13.0402 1.90216 11.3675 1.90216 9.8422C1.90216 8.42087 2.25749 7.10353 2.96816 5.8902C3.64416 4.71153 4.57149 3.7842 5.75016 3.1082C6.96349 2.39753 8.28082 2.0422 9.70216 2.0422C11.1235 2.0422 12.4408 2.4062 13.6542 3.1342C14.8328 3.82753 15.7688 4.7722 16.4622 5.9682C17.1555 7.1642 17.5022 8.45553 17.5022 9.8422C17.5022 11.4195 16.9562 13.1182 15.8642 14.9382C15.0322 16.3249 13.9142 17.7462 12.5102 19.2022C11.5915 20.1382 10.6555 20.9875 9.70216 21.7502ZM9.70216 5.8122C8.95682 5.8122 8.27216 5.99853 7.64816 6.3712C7.02416 6.74387 6.52582 7.24653 6.15316 7.8792C5.78049 8.51187 5.59416 9.20087 5.59416 9.9462C5.59416 10.6915 5.78049 11.3805 6.15316 12.0132C6.52582 12.6459 7.02416 13.1442 7.64816 13.5082C8.27216 13.8722 8.95682 14.0542 9.70216 14.0542C10.4475 14.0542 11.1365 13.8679 11.7692 13.4952C12.4018 13.1225 12.9002 12.6242 13.2642 12.0002C13.6282 11.3762 13.8102 10.6915 13.8102 9.9462C13.8102 9.20087 13.6282 8.51187 13.2642 7.8792C12.9002 7.24653 12.4018 6.74387 11.7692 6.3712C11.1365 5.99853 10.4475 5.8122 9.70216 5.8122ZM9.70216 12.3122C9.04349 12.3122 8.48016 12.0782 8.01216 11.6102C7.54416 11.1422 7.31016 10.5875 7.31016 9.9462C7.31016 9.51287 7.41849 9.1142 7.63516 8.7502C7.85182 8.3862 8.14216 8.09587 8.50616 7.8792C8.87016 7.66253 9.26882 7.5542 9.70216 7.5542C10.1355 7.5542 10.5342 7.66253 10.8982 7.8792C11.2622 8.09587 11.5525 8.3862 11.7692 8.7502C11.9858 9.1142 12.0942 9.51287 12.0942 9.9462C12.0942 10.5875 11.8602 11.1422 11.3922 11.6102C10.9242 12.0782 10.3608 12.3122 9.70216 12.3122Z"
                    fill="#030712"
                  />
                </svg>

                <div className="flex flex-col leading-tight">
                  <span>Deliver to</span>
                  <span className="font-semibold">all</span>
                </div>
              </div>
            </div>

            <div className="flex-1 mx-6 hidden md:block">
              <div className="relative">
                <Input
                  type="text"
                  placeholder="Search for products, categories or brands..."
                  className="w-full px-4 py-2 pr-12 rounded-md bg-gray-100 text-sm text-gray-800 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-600 transition-all"
                />
                <button
                  type="button"
                  aria-label="Search"
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
                placeholder="Search products..."
                className="w-full px-4 py-2 pr-12 rounded-lg bg-gray-100"
              />
              <button
                type="button"
                aria-label="Search"
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