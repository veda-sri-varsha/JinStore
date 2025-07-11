import { createBrowserRouter } from "react-router";
import MainLayout from "../components/Layout/MainLayout";
import HomePage from "../pages/HomePage";
import LoginPage from "../pages/LoginPage";
import RegisterPage from "../pages/RegisterPage";
import { Cart } from "../components/customs/Cart";
import { Contact } from "../components/customs/Contact";
import { CheckoutPage } from "../components/customs/CheckoutPage";
import ProductDetails from "../components/customs/ProductDetails";
import  {Wishlist} from "../components/customs/Wishlist";
import FilterProductPage from "../pages/FilterProductPage";
import {AboutUs} from "../components/customs/AboutUs";
import { OrderTracking } from "../components/customs/OrderTracking";

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
      { path: "about", element: <AboutUs /> },
      { path: "checkout", element: <CheckoutPage /> },
      { path: "wishlist", element: <Wishlist /> },
      {path:"filters",element:<FilterProductPage />},
      {path:"orders",element:<OrderTracking/>},
      { path: "/product/:id", element: <ProductDetails /> },
      
    ],
  },
]);
