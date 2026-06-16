"use client";

import { useCartStore } from "@/lib/store";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import Link from "next/link";
import Image from "next/image";
import { useEffect } from "react";

export default function CartPage() {
  const {
    items,
    total,
    removeItem,
    updateQuantity,
    clearCart,
    calculateTotal,
  } = useCartStore();

  useEffect(() => {
    calculateTotal();
  }, [items]);

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-3xl font-bold mb-4">سبد خرید خالی است</h1>
          <Link href="/">
            <Button>به خرید بروید</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold mb-8">سبد خرید</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-4">
            {items.map((item) => (
              <Card key={item.id} className="p-4">
                <div className="flex gap-4">
                  <div className="relative w-24 h-24">
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      className="object-cover rounded"
                    />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-bold text-lg">{item.name}</h3>
                    <p className="text-gray-600">${item.price}</p>
                    <div className="flex items-center gap-2 mt-2">
                      <input
                        type="number"
                        min="1"
                        value={item.quantity}
                        onChange={(e) =>
                          updateQuantity(
                            item.id,
                            Math.max(1, parseInt(e.target.value) || 1),
                          )
                        }
                        className="border rounded px-2 py-1 w-16"
                      />
                      <Button
                        variant="destructive"
                        size="sm"
                        onClick={() => removeItem(item.id)}
                      >
                        حذف
                      </Button>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-bold">${item.price * item.quantity}</p>
                  </div>
                </div>
              </Card>
            ))}
          </div>

          <Card className="p-6 h-fit">
            <h2 className="text-xl font-bold mb-4">خلاصه سفارش</h2>
            <div className="space-y-2 mb-4 border-b pb-4">
              <div className="flex justify-between">
                <span>تعداد محصول:</span>
                <span>{items.length}</span>
              </div>
              <div className="flex justify-between text-lg font-bold">
                <span>مجموع:</span>
                <span>${total.toFixed(2)}</span>
              </div>
            </div>
            <Button className="w-full mb-2">نهایی کردن سفارش</Button>
            <Button variant="outline" className="w-full" onClick={clearCart}>
              خالی کردن سبد
            </Button>
          </Card>
        </div>
      </div>
    </div>
  );
}
