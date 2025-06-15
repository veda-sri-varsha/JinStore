import { useParams } from "react-router";
import { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "../ui/card";
import { useCart } from "../../context/CartContext";

export interface RawProduct {
  id: number;
  title: string;
  description: string;
  price: number;
  discountPercentage: number;
  thumbnail: string;
  images: string[];
  rating: number;
  stock: number;
  brand: string;
  category: string;
}

export default function ProductDetails() {
  const { id } = useParams();
  const { addToCart } = useCart();
  const [product, setProduct] = useState<RawProduct | null>(null);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    const fetchProduct = async () => {
      const res = await fetch(`https://dummyjson.com/products/${id}`);
      const data = await res.json();
      setProduct(data);
    };
    fetchProduct();
  }, [id]);

  if (!product) return <div className="text-center">Loading product...</div>;

  return (
    <div className="max-w-6xl mx-auto px-6 py-10">
      {/* Product Detail Main Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        <div className="space-y-4">
          <img
            src={product.thumbnail}
            alt={product.title}
            className="w-full h-80 object-contain rounded-lg shadow"
          />
          <div className="flex gap-2">
            {product.images.slice(0, 4).map((img, i) => (
              <img
                key={i}
                src={img}
                alt="variant"
                className="h-16 w-16 rounded border"
              />
            ))}
          </div>
        </div>

        <div className="space-y-4">
          <h1 className="text-2xl font-bold">{product.title}</h1>
          <div className="flex items-center space-x-4">
            <span className="text-xl font-bold text-green-600">₹{product.price}</span>
            <span className="line-through text-gray-400 text-sm">
              ₹{(product.price / (1 - product.discountPercentage / 100)).toFixed(2)}
            </span>
            <span className="text-sm bg-red-100 text-red-600 px-2 py-1 rounded">
              {product.discountPercentage}% off
            </span>
          </div>

          <div>
            <Label htmlFor="quantity">Quantity</Label>
            <Input
              id="quantity"
              type="number"
              min={1}
              value={quantity}
              onChange={(e) => setQuantity(Number(e.target.value))}
              className="w-24 mt-1"
            />
          </div>

          <div className="flex gap-4">
            <Button
              onClick={() => {
                const dealProduct = {
                  id: product.id.toString(),
                  title: product.title,
                  image: product.thumbnail,
                  price: product.price,
                  description: product.description
                };
                addToCart(dealProduct);
                const existingItems = JSON.parse(localStorage.getItem("cartItems") || "[]");
                const updatedItems = [...existingItems, dealProduct];
                localStorage.setItem("cartItems", JSON.stringify(updatedItems));
              }}
            >
              Add to Cart
            </Button>
            <Button variant="outline" onClick={() => window.location.href = '/wishlist'}>
              Wishlist
            </Button>
          </div>

          <div className="text-sm text-gray-600">{product.description}</div>
        </div>
      </div>

      {/* Related Section */}
      <div className="mt-12">
        <h2 className="text-xl font-semibold mb-4">Related Products</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {product.images.slice(0, 4).map((img, i) => (
            <Card key={i}>
              <CardHeader>
                <CardTitle className="text-sm truncate">{product.title}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <img src={img} alt="related" className="w-full h-24 object-contain" />
                <div className="text-green-600 font-semibold text-sm">₹{product.price}</div>
                <Button size="sm" variant="outline">
                  View
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
