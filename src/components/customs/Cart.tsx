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
// import BestSellers from "./BestSellers";

export function Cart() {
  return (
    <><Card className="w-full max-w-sm">
      <CardHeader className="border-b">
        <CardTitle>Fresh Organic Apples</CardTitle>
        <CardDescription>1kg Pack - Farm Fresh</CardDescription>
        <CardAction>
          <span className="text-sm text-red-500 font-semibold">50% OFF</span>
        </CardAction>
      </CardHeader>

      <CardContent className="flex flex-col gap-4">
        <img
          src="https://source.unsplash.com/featured/?apples"
          alt="Apples"
          className="rounded-lg h-40 object-cover w-full" />
        <div className="text-gray-700 text-sm">
          A pack of fresh organic apples sourced directly from certified farms. No chemicals, 100% natural.
        </div>
        <div className="flex items-center justify-between">
          <span className="text-lg font-bold text-green-600">$2.99</span>
          <span className="line-through text-sm text-muted-foreground">$5.99</span>
        </div>
      </CardContent>

      <CardFooter>
        <Button className="w-full" variant="default">
          Add to Cart
        </Button>
      </CardFooter>
    </Card></>
  );
}
