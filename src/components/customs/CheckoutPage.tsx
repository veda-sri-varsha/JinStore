import { useCart } from "../../context/CartContext";
import { useState, useEffect } from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Label } from "../ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../components/ui/select";
import { useNavigate } from "react-router";

export function CheckoutPage() {
  const { cart, clearCart } = useCart();
  const [agreed, setAgreed] = useState<boolean>(false);
  const [orderSuccess, setOrderSuccess] = useState<boolean>(false);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [countries, setCountries] = useState<string[]>([]);

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    companyName: "",
    country: "India",
    street: "",
    apartment: "",
    city: "",
    state: "",
    zip: "",
    phone: "",
    email: "",
    orderNotes: "",
  });

  interface CountryData {
    country: string;
    cities: string[];
  }

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await fetch(
          "https://countriesnow.space/api/v0.1/countries"
        );
        const result = await response.json();
        const countryNames = result.data.map(
          (item: CountryData) => item.country
        );
        setCountries(countryNames);
      } catch (error) {
        console.error("Error fetching countries:", error);
      }
    };

    fetchCountries();
    setIsLoggedIn(localStorage.getItem("isLoggedIn") === "true");
  }, []);

  const subtotal = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const shipping = subtotal > 200 ? 0 : 15;
  const total = subtotal + shipping;

  const handlePlaceOrder = () => {
    if (!isLoggedIn) {
      alert("Please log in to place an order.");
      return;
    }

    if (!agreed) {
      alert("Please agree to the terms and conditions.");
      return;
    }

    const requiredFields = [
      "firstName",
      "lastName",
      "street",
      "city",
      "state",
      "zip",
      "phone",
      "email",
    ];

    const allFilled = requiredFields.every(
      (key) => formData[key as keyof typeof formData].trim() !== ""
    );

    if (!allFilled) {
      alert("Please fill in all required billing details.");
      return;
    }

    setOrderSuccess(true);

    setTimeout(() => {
      localStorage.removeItem("cartItems");
      if (clearCart) clearCart();
      setOrderSuccess(false);
      navigate("/");
    }, 2000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="lg:col-span-2 bg-white rounded-2xl p-6 shadow-sm border">
        {!isLoggedIn && (
          <div className="bg-yellow-100 border border-yellow-300 text-yellow-700 text-sm p-4 rounded-md mb-6">
            You are not logged in. Please{" "}
            <a href="/login" className="underline font-semibold text-blue-600">
              Login
            </a>{" "}
            or{" "}
            <a
              href="/register"
              className="underline font-semibold text-blue-600"
            >
              Register
            </a>{" "}
            to save your address and track orders.
          </div>
        )}

        <h2 className="text-xl font-semibold mb-4">Billing Details</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="firstName">First Name</Label>
            <Input
              id="firstName"
              value={formData.firstName}
              onChange={(e) =>
                setFormData({ ...formData, firstName: e.target.value })
              }
              required
            />
          </div>
          <div>
            <Label htmlFor="lastName">Last Name</Label>
            <Input
              id="lastName"
              value={formData.lastName}
              onChange={(e) =>
                setFormData({ ...formData, lastName: e.target.value })
              }
              required
            />
          </div>
          <div className="sm:col-span-2">
            <Label htmlFor="companyName">Company Name (Optional)</Label>
            <Input
              id="companyName"
              value={formData.companyName}
              onChange={(e) =>
                setFormData({ ...formData, companyName: e.target.value })
              }
            />
          </div>
          <div>
            <Label htmlFor="country">Country / Region</Label>
            <Select
              value={formData.country}
              onValueChange={(value) =>
                setFormData({ ...formData, country: value })
              }
            >
              <SelectTrigger className="text-gray-800 font-semibold">
                <SelectValue placeholder="Select country" />
              </SelectTrigger>
              <SelectContent className="max-h-60 overflow-y-auto z-50 bg-white shadow-lg border border-gray-200">
                {countries.map((country) => (
                  <SelectItem
                    key={country}
                    value={country}
                    className="text-sm cursor-pointer hover:bg-gray-100 focus:bg-gray-100"
                  >
                    {country}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="sm:col-span-2">
            <Label htmlFor="street">Street Address</Label>
            <Input
              id="street"
              value={formData.street}
              onChange={(e) =>
                setFormData({ ...formData, street: e.target.value })
              }
              required
            />
          </div>
          <div className="sm:col-span-2">
            <Label htmlFor="apartment">
              Apartment, suite, unit, etc. (Optional)
            </Label>
            <Input
              id="apartment"
              value={formData.apartment}
              onChange={(e) =>
                setFormData({ ...formData, apartment: e.target.value })
              }
            />
          </div>
          <div>
            <Label htmlFor="city">Town / City</Label>
            <Input
              id="city"
              value={formData.city}
              onChange={(e) =>
                setFormData({ ...formData, city: e.target.value })
              }
              required
            />
          </div>
          <div>
            <Label htmlFor="state">State</Label>
            <Input
              id="state"
              value={formData.state}
              onChange={(e) =>
                setFormData({ ...formData, state: e.target.value })
              }
              required
            />
          </div>
          <div>
            <Label htmlFor="zip">ZIP Code</Label>
            <Input
              id="zip"
              value={formData.zip}
              onChange={(e) =>
                setFormData({ ...formData, zip: e.target.value })
              }
              required
            />
          </div>
          <div>
            <Label htmlFor="phone">Phone</Label>
            <Input
              id="phone"
              value={formData.phone}
              onChange={(e) =>
                setFormData({ ...formData, phone: e.target.value })
              }
              type="tel"
              required
            />
          </div>
          <div className="sm:col-span-2">
            <Label htmlFor="email">Email address</Label>
            <Input
              id="email"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              type="email"
              required
            />
          </div>
        </div>

        <div className="mt-4">
          <Label htmlFor="orderNotes">Order Notes (optional)</Label>
          <textarea
            id="orderNotes"
            className="w-full mt-1 rounded border border-gray-300 px-3 py-2 text-sm"
            rows={4}
            placeholder="Notes about your order, e.g. special notes for delivery."
            value={formData.orderNotes}
            onChange={(e) =>
              setFormData({ ...formData, orderNotes: e.target.value })
            }
          />
        </div>
      </div>

      <div className="bg-white rounded-2xl p-6 shadow-sm border space-y-4">
        <h2 className="text-xl font-semibold">Your Order</h2>

        <ul className="divide-y text-sm">
          {cart.map((item) => (
            <li key={item.id} className="flex justify-between py-2">
              <span>
                {item.title} × {item.quantity}
              </span>
              <span>₹{(item.price * item.quantity).toFixed(2)}</span>
            </li>
          ))}
        </ul>

        <div className="border-t pt-4 text-sm space-y-2">
          <div className="flex justify-between">
            <span>Subtotal</span>
            <span>₹{subtotal.toFixed(2)}</span>
          </div>
          <div className="flex justify-between">
            <span>Shipping</span>
            <span>₹{shipping.toFixed(2)}</span>
          </div>
          <div className="flex justify-between font-bold">
            <span>Total</span>
            <span>₹{total.toFixed(2)}</span>
          </div>
        </div>

        <div className="pt-4 space-y-2 text-sm">
          <Label>
            <input
              type="radio"
              name="payment"
              defaultChecked
              className="mr-2"
            />
            Direct Bank Transfer
          </Label>
          <Label>
            <input type="radio" name="payment" className="mr-2" />
            Check Payments
          </Label>
          <Label>
            <input type="radio" name="payment" className="mr-2" />
            Cash on Delivery
          </Label>
        </div>

        <div className="flex items-start mt-4">
          <input
            type="checkbox"
            id="terms"
            className="mt-1 mr-2"
            onChange={(e) => setAgreed(e.target.checked)}
          />
          <Label htmlFor="terms" className="text-sm leading-snug">
            I have read and agree to the website terms and conditions.
          </Label>
        </div>

        {orderSuccess && (
          <div className="bg-green-100 text-green-600 text-sm text-center font-medium pt-2">
            Order placed successfully! Your items will be delivered soon.
          </div>
        )}

        <Button
          className="w-full mt-4"
          disabled={!isLoggedIn || !agreed}
          onClick={handlePlaceOrder}
        >
          Place Order
        </Button>
      </div>
    </div>
  );
}
