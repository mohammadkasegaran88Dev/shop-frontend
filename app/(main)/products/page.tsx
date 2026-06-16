"use client";

import { ProductGrid } from "@/components/ProductGrid";
import { Button } from "@/components/ui/button";
import { useProducts } from "@/hooks/useProducts";
import Link from "next/link";

export default function ProductsPage() {
  const { data: products, isLoading, error } = useProducts();

  return (
    <div className="min-h-screen py-12 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-4xl font-bold">Products</h1>
          <Link href="/cart">
            <Button>View Cart</Button>
          </Link>
        </div>

        {error && (
          <p className="bg-red-100 text-red-700 p-4 rounded-lg mb-8">
            Failed to load products.
          </p>
        )}
        <ProductGrid products={products} isLoading={isLoading} />
      </div>
    </div>
  );
}
