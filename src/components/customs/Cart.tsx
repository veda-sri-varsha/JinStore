import { useCart } from "../../context/CartContext";
import { Button } from "../ui/button";
import { useNavigate } from "react-router";
import { Trash2, Minus, Plus } from "lucide-react";

export function Cart() {
  const { cart, increaseQty, decreaseQty, removeFromCart } = useCart();
  const navigate = useNavigate();

  const totalPrice = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
<div className="flex flex-col items-center justify-center min-h-[80vh] px-2 sm:px-4 py-6 text-center">
      {cart.length === 0 ? (
    <div className="flex flex-col items-center gap-6 max-w-md w-full">
          <svg
            width="160"
            height="161"
            viewBox="0 0 160 161"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M1.14453 79.2472C2.28739 76.6757 4.5731 75.8186 7.43024 75.8186C22.8588 75.8186 38.2874 75.8186 54.0017 75.8186C56.2874 75.8186 58.0017 76.39 59.716 78.1043C66.0017 84.6757 72.5731 90.9615 78.8588 97.5329C79.1445 97.8186 79.4303 98.39 80.0017 98.9615C80.5731 98.39 81.1445 97.8186 81.4303 97.5329C88.0017 90.9615 94.5731 84.6757 100.859 78.1043C102.287 76.6757 104.002 76.1043 106.002 76.1043C122.002 76.1043 137.716 76.1043 153.716 76.1043C156.002 76.1043 158.002 76.6757 158.859 78.9615C159.716 81.2472 158.859 82.9615 157.145 84.6757C150.002 91.8186 142.859 98.9615 135.43 106.104C134.573 106.961 134.287 107.819 134.287 108.961C134.287 123.819 134.287 138.676 134.287 153.533C134.287 156.39 133.43 158.39 130.573 159.533C96.8588 159.533 63.1445 159.533 29.4302 159.533C26.5731 158.39 25.716 156.39 25.716 153.533C25.716 138.676 25.716 123.819 25.716 108.676C25.716 107.533 25.4302 106.676 24.5731 106.104C17.716 99.2472 10.8588 92.39 4.00167 85.5329C2.85882 84.39 2.00167 83.2472 1.14453 81.8186C1.14453 80.6757 1.14453 80.1043 1.14453 79.2472ZM35.1445 109.819C35.1445 123.247 35.1445 136.676 35.1445 149.819C48.5731 149.819 62.0017 149.819 75.1445 149.819C75.1445 136.39 75.1445 122.961 75.1445 109.819C62.0017 109.819 48.5731 109.819 35.1445 109.819ZM124.859 109.819C111.43 109.819 98.0017 109.819 84.8588 109.819C84.8588 123.247 84.8588 136.676 84.8588 149.819C98.2874 149.819 111.716 149.819 124.859 149.819C124.859 136.39 124.859 123.247 124.859 109.819ZM68.8588 100.39C63.716 95.2472 58.8588 90.39 53.716 85.5329C53.4302 85.2472 52.5731 84.9615 52.0017 84.9615C40.8588 84.9615 29.4302 84.9615 18.2874 84.9615C18.0017 84.9615 17.4302 84.9615 16.8588 84.9615C21.716 89.8186 26.5731 94.6757 31.1445 99.2472C32.0017 100.104 32.5731 100.39 33.716 100.39C44.5731 100.39 55.716 100.39 66.5731 100.39C67.4302 100.39 68.0017 100.39 68.8588 100.39ZM91.4303 100.39C92.0017 100.39 92.2874 100.39 92.5731 100.39C104.002 100.39 115.43 100.39 126.859 100.39C127.43 100.39 128.002 100.104 128.573 99.5329C133.145 94.9615 137.716 90.39 142.287 85.8186C142.573 85.5329 142.859 85.2472 143.145 84.9615C142.859 84.9615 142.859 84.9615 142.573 84.9615C130.859 84.9615 119.43 84.9615 107.716 84.9615C107.145 84.9615 106.573 85.2472 106.287 85.5329C101.145 90.39 96.2874 95.2472 91.4303 100.39Z"
              fill="black"
            />
            <path
              d="M84.572 71.5329C84.572 72.6757 84.572 73.8186 84.572 74.6757C84.572 77.5329 82.8577 79.8186 80.0006 79.8186C77.4291 79.8186 75.4291 77.8186 75.1434 74.9614C74.8577 66.9614 74.0006 58.9614 72.0006 51.2471C70.572 44.9614 68.2863 38.9614 64.572 33.5329C60.2863 27.8186 54.8577 24.6757 47.7149 25.5329C42.8577 26.1043 39.1434 28.1043 37.7149 32.9614C36.2863 37.8186 38.0006 41.8186 41.7149 45.2471C45.7149 48.6757 50.572 50.1043 55.4291 50.6757C56.8577 50.9614 58.2863 50.9614 60.0006 50.9614C62.572 50.9614 64.2863 52.9614 64.572 55.2472C64.8577 57.5329 62.8577 60.1043 60.572 60.1043C49.7149 60.1043 39.7149 57.8186 32.572 48.9614C27.7149 42.6757 26.572 35.8186 29.7149 28.39C32.8577 21.2471 38.8577 17.5329 46.572 16.6757C57.7149 15.2471 66.2863 19.8186 72.572 28.9614C77.4291 35.8186 80.0006 43.5329 81.7149 51.5329C83.1434 58.1043 84.0006 64.9614 84.572 71.5329Z"
              fill="black"
            />
            <path
              d="M97.7176 60.39C96.8605 60.39 96.0033 60.39 95.1462 60.39C92.2891 60.39 90.2891 58.39 90.2891 55.8186C90.2891 53.2471 92.2891 51.2471 95.1462 51.2471C100.575 51.2471 106.003 50.6757 111.146 48.6757C114.575 47.2471 117.432 45.5329 120.003 42.9614C128.86 33.8186 126.003 21.5329 113.718 17.8186C110.86 16.9614 108.003 16.6757 105.146 16.39C102.289 16.1043 100.003 14.1043 100.289 11.5329C100.289 8.96143 102.575 6.96143 105.432 6.96143C111.432 6.96143 117.432 8.10428 122.575 11.5329C135.718 19.5329 138.289 36.6757 128.003 48.1043C122.289 54.39 115.146 57.8186 106.86 59.5329C103.718 59.8186 100.86 60.1043 97.7176 60.39Z"
              fill="black"
            />
            <path
              d="M84.8594 4.67573C85.7165 3.81858 86.2879 3.24715 87.1451 2.67573C89.1451 1.24715 91.4308 1.24715 93.1451 2.96144C94.8594 4.67573 95.1451 7.24715 93.7165 8.96144C92.0022 10.9614 90.0022 12.9614 88.0022 14.9614C86.2879 16.39 83.7165 16.1043 82.2879 14.6757C80.5737 12.9614 78.8594 11.2472 77.1451 9.53287C75.4308 7.53287 75.4308 4.96144 77.1451 3.24715C78.8594 1.53287 81.4308 1.24715 83.4308 2.96144C83.7165 3.24715 84.2879 3.81858 84.8594 4.67573Z"
              fill="black"
            />
          </svg>

          <p className="text-red-600 font-semibold text-sm uppercase">
            Your cart is currently empty.
          </p>
          <Button
            onClick={() => navigate("/")}
            variant="default"
        className="bg-black hover:bg-black text-white w-full sm:w-auto"
          >
            Return to shop
          </Button>
        </div>
      ) : (
        <div className="flex flex-col items-center gap-6 w-full max-w-3xl">
      <h2 className="text-xl sm:text-2xl font-bold">Your Cart</h2>

      <ul className="w-full space-y-4">
        {cart.map((item) => (
          <li
            key={item.id}
            className="flex flex-col sm:flex-row gap-4 border p-4 rounded-lg shadow-sm bg-white"
          >
            <div className="flex-shrink-0">
              <img
                src={item.image && item.image.trim() !== "" ? item.image : "/placeholder.jpg"}
                alt={item.title}
                className="w-20 h-20 sm:w-24 sm:h-24 object-cover rounded-md border mx-auto sm:mx-0"
              />
            </div>

            <div className="flex flex-col justify-between flex-grow w-full">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center">
                <div>
                  <h3 className="font-semibold text-base sm:text-lg">{item.title}</h3>
                  <p className="text-sm text-gray-600 line-clamp-2">
                    {item.description}
                  </p>
                </div>
                <button
                  onClick={() => removeFromCart(item.id)}
                  className="text-red-600 hover:text-red-800 mt-2 sm:mt-0"
                  title="Remove item"
                  aria-label="Remove item"
                >
                  <Trash2 size={18} />
                </button>
              </div>

              <div className="flex flex-col sm:flex-row justify-between items-center mt-4 gap-3 sm:gap-0">
                <div className="flex items-center gap-2">
                  <Button size="sm" variant="outline" onClick={() => decreaseQty(item.id)}>
                    <Minus size={16} />
                  </Button>
                  <span className="px-2">{item.quantity}</span>
                  <Button size="sm" variant="outline" onClick={() => increaseQty(item.id)}>
                    <Plus size={16} />
                  </Button>
                </div>
                <span className="text-green-600 font-semibold text-base sm:text-lg">
                  ₹{item.price * item.quantity}
                </span>
              </div>
            </div>
          </li>
        ))}
      </ul>

      <div className="flex flex-col sm:flex-row justify-between items-center w-full pt-4 border-t mt-4 gap-4">
        <p className="text-base sm:text-lg font-semibold">
          Total: ₹{totalPrice}
        </p>
        <Button
          onClick={() => navigate("/checkout")}
          className="bg-black text-white px-6 py-2 rounded-md hover:bg-black w-full sm:w-auto"
        >
          Proceed to Checkout
        </Button>
      </div>
    </div>
  )}
</div>
  );
}
