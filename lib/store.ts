import { create } from "zustand";

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
  setToken: (token) => ({ token }),
  logout: () => {
    set({ user: null, token: null, isAuthenticated: false });
    if (typeof window !== "undefined") {
      localStorage.removeItem("auth_token");
    }
  },
}));
interface CartItem{
    id:number;
    productId:number;
    name:string;
    price:number;
    quantity:number;
    image:string
}

// interface CartStore{
//     items:CartItem
// }




