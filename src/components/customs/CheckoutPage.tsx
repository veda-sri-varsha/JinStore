import { useCart } from "../../context/CartContext";
import { useState } from "react";
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
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router";

export function CheckoutPage() {
  const { cart } = useCart();
  const { user } = useAuth(); // ✅ Correct usage of user from context
  const navigate = useNavigate();
  const [agreed, setAgreed] = useState<boolean>(false);
  const [orderSuccess, setOrderSuccess] = useState<boolean>(false);

  const isLoggedIn = !!user;

  const subtotal = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const shipping = subtotal > 200 ? 0 : 15;
  const total = subtotal + shipping;

  const handlePlaceOrder = () => {
    if (!agreed || !isLoggedIn) return;

    setOrderSuccess(true);
    // TODO: clearCart(); or send API
    setTimeout(() => {
      setOrderSuccess(false);
    }, 4000);
  };

  if (!isLoggedIn) {
    return (
      <div className="max-w-md mx-auto mt-24 bg-yellow-50 border border-yellow-300 text-center p-6 rounded-xl shadow-md">
        <h2 className="text-2xl font-bold text-yellow-800 mb-2">
          🔒 Login Required
        </h2>
        <p className="text-sm text-yellow-700 mb-6">
          You must be logged in to place an order.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Button
            onClick={() => navigate("/login")}
            className="w-full sm:w-auto bg-purple-600 hover:bg-purple-700 text-white"
          >
            Login
          </Button>
          <Button
            onClick={() => navigate("/register")}
            variant="outline"
            className="w-full sm:w-auto"
          >
            Register
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Left Column - Billing Form */}
      <div className="lg:col-span-2 bg-white rounded-2xl p-6 shadow-sm border">
        <h2 className="text-xl font-semibold mb-4">Billing Details</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="firstName">First Name</Label>
            <Input id="firstName" required />
          </div>
          <div>
            <Label htmlFor="lastName">Last Name</Label>
            <Input id="lastName" required />
          </div>
          <div className="sm:col-span-2">
            <Label htmlFor="companyName">Company Name (Optional)</Label>
            <Input id="companyName" />
          </div>
          <div>
            <Label htmlFor="country">Country</Label>
            <Select defaultValue="India">
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="India">India</SelectItem>
                <SelectItem value="United States (US)">
                  United States (US)
                </SelectItem>
                <SelectItem value="Canada">Canada</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="sm:col-span-2">
            <Label htmlFor="street">Street Address</Label>
            <Input id="street" required />
          </div>
          <div className="sm:col-span-2">
            <Label htmlFor="apartment">Apartment (Optional)</Label>
            <Input id="apartment" />
          </div>
          <div>
            <Label htmlFor="city">City</Label>
            <Input id="city" required />
          </div>
          <div>
            <Label htmlFor="state">State</Label>
            <Input id="state" required />
          </div>
          <div>
            <Label htmlFor="zip">ZIP Code</Label>
            <Input id="zip" required />
          </div>
          <div>
            <Label htmlFor="phone">Phone</Label>
            <Input id="phone" type="tel" required />
          </div>
          <div className="sm:col-span-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              required
              defaultValue={user?.email || ""}
            />
          </div>
        </div>
        <div className="mt-4">
          <Label htmlFor="orderNotes">Order Notes (optional)</Label>
          <textarea
            id="orderNotes"
            className="w-full mt-1 border border-gray-300 px-3 py-2 rounded"
            rows={4}
          />
        </div>
      </div>

      {/* Right Column - Order Summary */}
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
          <Label htmlFor="terms" className="text-sm">
            I agree to the terms and conditions.
          </Label>
        </div>

        {orderSuccess && (
          <div className="text-green-600 text-sm text-center font-medium pt-2">
            ✅ Order placed successfully!
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
