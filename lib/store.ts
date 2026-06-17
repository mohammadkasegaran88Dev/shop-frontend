import { create } from "zustand";
import api from "./api";

interface User {
  id: number;
  name: string;
  email: string;
  role: "user" | "admin";
}
interface AuthStore {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  setUser: (user: User | null) => void;
  setToken: (token: string | null) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthStore>((set) => ({
  user: null,
  token: null,
  isAuthenticated: false,
  setUser: (user) => set({ user, isAuthenticated: !!user }),
  setToken: (token) => set({ token }),
  logout: () => {
    set({ user: null, token: null, isAuthenticated: false });
    if (typeof window !== "undefined") {
      localStorage.removeItem("auth_token");
    }
  },
}));
interface CartItem {
  id: number;
  productId: number;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

interface CartStore {
  items: CartItem[];
  total: number;
  isLoading: boolean;
  error: string | null;
  fetchCart: () => Promise<void>;
  addItem: (productId: number, quantity: number) => Promise<void>;
  updateQuantity: (itemId: number, quantity: number) => Promise<void>;
  removeItem: (itemId: number) => Promise<void>;
  clearCart: () => Promise<void>;
  calculateTotal: () => void;
}
export const useCartStore = create<CartStore>((set, get) => ({
  items: [],
  total: 0,
  isLoading: false,
  error: null,

  fetchCart: async () => {
    set({ isLoading: true, error: null });

    try {
      const response = await api.get("/cart");
      const cartData = response.data;

      const items =
        cartData.data?.items?.map((item: any) => ({
          id: item?.id,
          productId: item?.product_id,
          name: item?.product?.name || "",
          price: item?.product?.price || 0,
          quantity: item?.quantity,
          image: item?.product?.images?.[0]?.path || "",
        })) || [];
      set({ items, isLoading: false });
      get().calculateTotal();
    } catch (error: any) {
      set({
        error: error?.response?.data?.message || "خطا در دریافت سبد خرید",
        isLoading: false,
      });
    }
  },

  addItem: async (productId: number, quantity: number) => {
    set({ isLoading: true, error: null });
    try {
      await api.post("/cart/items", {
        product_id: productId,
        quantity,
      });
      await get().fetchCart();
    } catch (error: any) {
      set({
        error: error.response?.data?.message || "خطا در اضافه کردن محصول",
        isLoading: false,
      });
    }
  },

  updateQuantity: async (itemId: number, quantity: number) => {
    set({ isLoading: true, error: null });

    try {
      await api.patch(`/cart/itemId/${itemId}`, {
        quantity,
      });
      await get().fetchCart();
    } catch (error: any) {
      set({
        error: error?.response?.data?.message || "خطا در بروز رسانی تعداد",
        isLoading: false,
      });
    }
  },

  removeItem: async (itemId: number) => {
    set({ isLoading: true, error: null });
    try {
      await api.delete(`/cart/item/${itemId}`);
      await get().fetchCart();
    } catch (error: any) {
      set({
        error: error?.response?.data?.message || "خطا در حذف محصول",
        isLoading: false,
      });
    }
  },

  clearCart: async () => {
    set({ isLoading: true, error: null });
    try {
      await api.delete("/cart");
      set({ items: [], total: 0, isLoading: false });
    } catch (error: any) {
      set({
        error: error?.resopnse?.data?.message || "خطا در پاکر کردن سبد خرید",
        isLoading: false,
      });
    }
  },

  calculateTotal: () => {
    const { items } = get();
    const total = items.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0,
    );
    set({ total });
  },
}));
