"use client";

import { useProducts } from "@/hooks/useProducts";
import { ProductGrid } from "@/components/ProductGrid";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function ProductsPage() {
  const { data: products, isLoading, error } = useProducts();

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-4xl font-bold">محصولات</h1>
          <Link href="/cart">
            <Button>سبد خرید</Button>
          </Link>
        </div>

        {error && (
          <div className="bg-red-100 text-red-700 p-4 rounded-lg mb-8">
            خطا در بارگذاری محصولات
          </div>
        )}

        <ProductGrid products={products} isLoading={isLoading} />
      </div>
    </div>
  );
}
