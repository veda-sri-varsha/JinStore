import { useEffect, useState } from "react";
import {
  Card,
  CardHeader,
  CardFooter,
  CardTitle,
  CardAction,
  CardDescription,
  CardContent,
} from "../ui/card";
import { Button } from "../ui/button";
import { useCart } from "../../context/CartContext";
import { Link } from "react-router";

export interface RawProduct {
  id: number;
  title: string;
  description: string;
  price: number;
  discountPercentage: number;
  thumbnail: string;
}

export interface deals {
  id: string;
  title: string;
  image: string;
  price: number;
  description: string;
}

export function ProductList() {
  const [products, setProducts] = useState<deals[]>([]);
  const { addToCart } = useCart();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(
          "https://dummyjson.com/products/category/groceries"
        );
        const data = await response.json();

        const transformed: deals[] = data.products.map((item: RawProduct) => ({
          id: item.id.toString(),
          title: item.title,
          description: item.description,
          price: item.price,
          image: item.thumbnail,
        }));

        setProducts(transformed);
      } catch (error) {
        console.error("Error fetching product list:", error);
      }
    };

    fetchProducts();
  }, []);

  if (products.length === 0)
    return <div className="text-center py-6">Loading...</div>;

  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 px-4 py-8 max-w-7xl mx-auto">
      {products.map((product) => (
        <Card
          key={product.id}
          className="w-full max-w-sm mx-auto shadow-lg hover:shadow-xl transition"
        >
          <CardHeader className="border-b">
            <CardTitle>
              <Link
                to={`/product/${product.id}`}
                className="hover:underline text-black"
              >
                {product.title}
              </Link>
            </CardTitle>
            <CardDescription className="line-clamp-2">
              {product.description}
            </CardDescription>
            <CardAction>
              <span className="text-sm text-red-500 font-semibold">
                Hot Deal
              </span>
            </CardAction>
          </CardHeader>

          <CardContent className="flex flex-col gap-4">
            <Link to={`/product/${product.id}`}>
              <img
                src={product.image}
                alt={product.title}
                className="rounded-lg h-40 object-cover w-full"
              />
            </Link>
            <div className="text-gray-700 text-sm line-clamp-2">
              {product.description}
            </div>
            <div className="flex items-center justify-between">
              <span className="text-lg font-bold text-green-600">
                ₹{product.price}
              </span>
            </div>
          </CardContent>

          <CardFooter>
            <Button
              className="w-full cursor-pointer"
              variant="default"
              onClick={() => {
                const dealProductWithQty = {
                  ...product,
                  quantity: 1,
                };

                addToCart(dealProductWithQty);

                const existingItems = JSON.parse(
                  localStorage.getItem("cartItems") || "[]"
                );

                const updatedItems = [...existingItems, dealProductWithQty];

                localStorage.setItem("cartItems", JSON.stringify(updatedItems));
              }}
            >
              Add to Cart
            </Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
}
