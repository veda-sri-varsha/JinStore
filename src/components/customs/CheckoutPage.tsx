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

export function CheckoutPage() {
  const { cart } = useCart();
  const [agreed, setAgreed] = useState<boolean>(false);
  const [orderSuccess, setOrderSuccess] = useState<boolean>(false);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false); 

  useEffect(() => {
    const loginStatus = localStorage.getItem("isLoggedIn") === "true";
    setIsLoggedIn(loginStatus);
  }, []);

  const subtotal = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const shipping = subtotal > 200 ? 0 : 15;
  const total = subtotal + shipping;

  const handlePlaceOrder = () => {
    if (!agreed) return;
    setOrderSuccess(true);

    setTimeout(() => {
      setOrderSuccess(false);
    }, 4000);
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
            <Input id="firstName" name="firstName" required />
          </div>
          <div>
            <Label htmlFor="lastName">Last Name</Label>
            <Input id="lastName" name="lastName" required />
          </div>
          <div className="sm:col-span-2">
            <Label htmlFor="companyName">Company Name (Optional)</Label>
            <Input id="companyName" name="companyName" />
          </div>
          <div>
            <Label htmlFor="country">Country / Region</Label>
            <Select defaultValue="United States (US)">
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="United States (US)">
                  United States (US)
                </SelectItem>
                <SelectItem value="India">India</SelectItem>
                <SelectItem value="Canada">Canada</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="sm:col-span-2">
            <Label htmlFor="street">Street Address</Label>
            <Input id="street" name="street" required />
          </div>
          <div className="sm:col-span-2">
            <Label htmlFor="apartment">
              Apartment, suite, unit, etc. (Optional)
            </Label>
            <Input id="apartment" name="apartment" />
          </div>
          <div>
            <Label htmlFor="city">Town / City</Label>
            <Input id="city" name="city" required />
          </div>
          <div>
            <Label htmlFor="state">State</Label>
            <Input id="state" name="state" required />
          </div>
          <div>
            <Label htmlFor="zip">ZIP Code</Label>
            <Input id="zip" name="zip" required />
          </div>
          <div>
            <Label htmlFor="phone">Phone</Label>
            <Input id="phone" name="phone" type="tel" required />
          </div>
          <div className="sm:col-span-2">
            <Label htmlFor="email">Email address</Label>
            <Input id="email" name="email" type="email" required />
          </div>
        </div>

        <div className="mt-4">
          <Label htmlFor="orderNotes">Order Notes (optional)</Label>
          <textarea
            id="orderNotes"
            className="w-full mt-1 rounded border border-gray-300 px-3 py-2 text-sm"
            rows={4}
            placeholder="Notes about your order, e.g. special notes for delivery."
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
              <span>${(item.price * item.quantity).toFixed(2)}</span>
            </li>
          ))}
        </ul>

        <div className="border-t pt-4 text-sm space-y-2">
          <div className="flex justify-between">
            <span>Subtotal</span>
            <span>${subtotal.toFixed(2)}</span>
          </div>
          <div className="flex justify-between">
            <span>Shipping</span>
            <span>${shipping.toFixed(2)}</span>
          </div>
          <div className="flex justify-between font-bold">
            <span>Total</span>
            <span>${total.toFixed(2)}</span>
          </div>
        </div>

        <div className="pt-4 space-y-2 text-sm">
          <Label>
            <input
              type="radio"
              name="payment"
              defaultChecked
              className="mr-2"
              id="bank-transfer"
            />
            Direct Bank Transfer
          </Label>
          <Label>
            <input
              type="radio"
              name="payment"
              className="mr-2"
              id="check-payments"
            />
            Check Payments
          </Label>
          <Label>
            <input
              type="radio"
              name="payment"
              className="mr-2"
              id="cash-delivery"
            />
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
          <div className="text-green-600 text-sm text-center font-medium pt-2">
            Order placed successfully! Your items will be delivered soon.
          </div>
        )}

        <Button
          className="w-full mt-4"
          disabled={!agreed}
          onClick={handlePlaceOrder}
        >
          Place Order
        </Button>
      </div>
    </div>
  );
}
