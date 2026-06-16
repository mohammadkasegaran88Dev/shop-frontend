import { PaginatedProducts } from "@/types";
import { Skeleton } from "./ui/skeleton";
import { ProductCard } from "./ProductCard";

interface ProductGridProps {
  products?: PaginatedProducts;
  isLoading: boolean;
}
export function ProductGrid({ products, isLoading }: ProductGridProps) {
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {[...Array(8)].map((_, index) => (
          <div key={index} className="space-y-4">
            <Skeleton className="h-48 w-full  rounded" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-3/4" />
          </div>
        ))}
      </div>
    );
  }
  return (
    <div className="grid grid-cols-1 md:grid-cols-2  lg:grid-cols-4 gap-4">
      {products?.data?.map((product) => (
        <ProductCard key={product?.id} product={product} />
      ))}
    </div>
  );
}
