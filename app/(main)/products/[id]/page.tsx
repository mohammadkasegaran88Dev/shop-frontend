"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { useProduct } from "@/hooks/useProducts";
import { useCartStore } from "@/lib/store";

import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useState } from "react";

export default function ProductPage() {
  const params = useParams();

  const id = Number(params.id);
  const { data: product, isLoading } = useProduct(id);
  const addItem = useCartStore((state) => state.addItem);
  const [quantity, setQuantity] = useState(1);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Skeleton className="h-96 w-full" />
            <div className="space-y-4">
              <Skeleton className="h-8 w-3/4" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-full" />
            </div>
          </div>
        </div>
      </div>
    );
  }
  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center ">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Product Not Found</h1>
          <Link href="/">
            <Button>Back to Products</Button>
          </Link>
        </div>
      </div>
    );
  }

  const handleAddToCart = async () => {
    if (product) {
      console.log("product.id", product.id);
      await addItem(product.id, quantity);
    }
  };
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        <Link href="/" className="text-blue-600 hover:underline mb-8">
          ← بازگشت
        </Link>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="relative w-full h-96 bg-white rounded-lg overflow-hidden">
            <Image
              src={product?.images?.[0]?.path}
              alt={product?.name}
              fill
              className="object-cover"
            />
          </div>

          <Card className="p-8">
            <h1 className="text-3xl font-bold mb-4">{product?.name}</h1>
            <p className="text-gray-600 mb-6">{product?.description}</p>

            <div className="space-y-4 mb-6">
              <div className="flex items-center justify-between">
                <span className="text-xl font-semibold">قیمت:</span>
                <span className="text-3xl font-bold text-blue-600">
                  ${product?.price}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-xl font-semibold">موجودی:</span>
                <span
                  className={`text-lg ${
                    product?.stock > 0 ? "text-green-600" : "text-red-600"
                  }`}
                >
                  {product?.stock > 0 ? `${product?.stock} عدد` : "تمام شد"}
                </span>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <label className="text-lg font-semibold">تعداد:</label>
                <input
                  type="number"
                  min="1"
                  max={product.stock}
                  value={quantity}
                  onChange={(e) =>
                    setQuantity(Math.max(1, parseInt(e.target.value) || 1))
                  }
                  className="border rounded px-4 py-2 w-20"
                />
              </div>

              <Button
                onClick={handleAddToCart}
                disabled={product.stock === 0}
                className="w-full py-6 text-lg"
              >
                افزودن به سبد خرید
              </Button>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
