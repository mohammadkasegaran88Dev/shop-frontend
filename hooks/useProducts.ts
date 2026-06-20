import api from "@/lib/api";
import { PaginatedProducts, Product } from "@/types";
import { useQuery } from "@tanstack/react-query";

export function useProducts() {
  return useQuery({
    queryKey: ["products"],
    queryFn: async () => {
      // const response = await api.get<Product[]>("/products");
      const response = await api.get<PaginatedProducts>("/products");
      return response.data;
    },
  });
}

export function useProduct(productId: number) {
  return useQuery({
    queryKey: ["product", productId],
    queryFn: async () => {
      const response = await api.get<Product>(`/products/${productId}`);
      return response.data.data;
    },
    enabled: !!productId,
  });
}
