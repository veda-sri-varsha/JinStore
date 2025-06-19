import { createBrowserRouter } from "react-router";
import MainLayout from "../components/Layout/MainLayout";
import HomePage from "../pages/HomePage";
import LoginPage from "../pages/LoginPage";
import RegisterPage from "../pages/RegisterPage";
import { Cart } from "../components/customs/Cart";
import { Contact } from "../components/customs/Contact";
import { CheckoutPage } from "../components/customs/CheckoutPage";
import ProductDetails from "../components/customs/ProductDetails";
import  WishlistPage from "../pages/WishlistPage";
import FilterProductPage from "../pages/FilterProductPage";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      { index: true, element: <HomePage /> },
      { path: "login", element: <LoginPage /> },
      { path: "register", element: <RegisterPage /> },
      { path: "cart", element: <Cart /> },
      { path: "Contact", element: <Contact /> },
      { path: "checkout", element: <CheckoutPage /> },
      { path: "wishlist", element: <WishlistPage /> },
      {path:"filters",element:<FilterProductPage />},
      { path: "/product/:id", element: <ProductDetails /> },
      
    ],
  },
]);
