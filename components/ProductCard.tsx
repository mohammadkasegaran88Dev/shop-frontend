import { Product } from "@/types";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import Image from "next/image";
import Link from "next/link";
import { Button } from "./ui/button";
import { useCart } from "@/hooks/useCart";

export function ProductCard({ product }: { product: Product }) {
  // const addItem = useCartStore((state) => state.addItem);
  const { addItem, isLoading } = useCart();

  const handleAddToCart = () => {
    addItem(product.id, 1);
  };

  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow duration-300">
      <div className="relative h-24 w-auto bg-gray-100 ">
        <Image
          src={product.images?.[0]?.path || "/images/placeholder.png"}
          alt={product.name}
          fill
          className="object-cover p-2 rounded-xl"
        />
      </div>
      <CardHeader>
        <CardTitle className="line-clamp-2">{product.name}</CardTitle>
        <CardDescription className="line-clamp-2">
          {product.description}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center justify-between">
          <span className="text-2xl font-bold">${product.price}</span>
          <span className="text-sm text-gray-500">
            {product.stock > 0 ? `${product.stock} in stock` : "Out of stock"}
          </span>
        </div>
        <div className="flex gap-2">
          <Link className="flex-1" href={`/products/${product.id}`}>
            <Button variant="outline" className="w-full">
              View Details
            </Button>
          </Link>
          <Button
            className="flex-1 w-full"
            onClick={handleAddToCart}
            disabled={product.stock === 0 || isLoading}
          >
            {isLoading ? "Adding..." : "Add to Cart"}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
