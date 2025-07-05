import { useEffect, useState } from "react";
import { ref, onValue } from "firebase/database";
import { rtdb, auth } from "../../config/firebase";
import { onAuthStateChanged, type User } from "firebase/auth";
import { useNavigate } from "react-router";
import { Card } from "../ui/card";
import { Button } from "../ui/button";

interface OrderItem {
  id: string;
  title: string;
  quantity: number;
  price: number;
}

interface Order {
  orderId: string;
  items: OrderItem[];
  total: number;
  status: string;
  timestamp: number;
}

export function OrderTracking() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (authUser) => {
      if (!authUser) {
        navigate("/login");
      } else {
        setUser(authUser);
      }
    });

    return () => unsubscribe();
  }, [navigate]);

  useEffect(() => {
    if (!user) return;

    const ordersRef = ref(rtdb, `orders/${user.uid}`);

    const unsubscribe = onValue(ordersRef, (snapshot) => {
      const data = snapshot.val();
      const loadedOrders: Order[] = [];

      if (data) {
        for (const key in data) {
          const orderData = data[key];
          loadedOrders.push({
            orderId: key,
            items: orderData.items || [],
            total: orderData.total || 0,
            status: orderData.status || "Pending",
            timestamp: orderData.timestamp || Date.now(),
          });
        }
      }

      // Sort orders by newest
      loadedOrders.sort((a, b) => b.timestamp - a.timestamp);
      setOrders(loadedOrders);
      setLoading(false);
    });

    return () => unsubscribe();
  }, [user]);

  if (loading) {
    return <div className="text-center mt-10 text-gray-600">Loading orders...</div>;
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <h2 className="text-2xl font-bold mb-6">My Orders</h2>

      {orders.length === 0 ? (
        <div className="text-gray-600 text-center">
          No orders found. <br />
          <Button onClick={() => navigate("/")}>Shop Now</Button>
        </div>
      ) : (
        <div className="space-y-6">
          {orders.map((order) => (
            <Card key={order.orderId} className="p-6 shadow-md border">
              <div className="mb-4">
                <h3 className="text-lg font-semibold text-purple-600">
                  Order ID: {order.orderId}
                </h3>
                <p className="text-sm text-gray-500">
                  Date: {new Date(order.timestamp).toLocaleString()}
                </p>
                <p className="text-sm font-medium text-green-600">
                  Status: {order.status}
                </p>
              </div>

              <ul className="divide-y text-sm mb-4">
                {order.items.map((item) => (
                  <li key={item.id} className="flex justify-between py-2">
                    <span>
                      {item.title} × {item.quantity}
                    </span>
                    <span>₹{(item.price * item.quantity).toFixed(2)}</span>
                  </li>
                ))}
              </ul>

              <div className="flex justify-between font-bold text-sm">
                <span>Total:</span>
                <span>₹{order.total.toFixed(2)}</span>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
