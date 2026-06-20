import { useAuthStore, useCartStore } from "@/lib/store";
import { useEffect } from "react";

export function useCart() {
  const store = useCartStore();
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  useEffect(() => {
    if (isAuthenticated) {
      store.fetchCart();
    }
  }, [isAuthenticated]);

  return store;
}
