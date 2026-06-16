import api from "@/lib/api";
import { useAuthStore } from "@/lib/store";
import { LoginResponse } from "@/types";
import { useCallback } from "react";

export function useAuth() {
  const { user, token, isAuthenticated, setUser, setToken, logout } =
    useAuthStore();
  const login = useCallback(
    async (email: string, password: string) => {
      try {
        const response = await api.post<LoginResponse>("auth/login", {
          email,
          password,
        });
        const { token, user } = response.data;
        setToken(token);
        setUser(user);
        if (typeof window !== "undefined") {
          localStorage.setItem("auth_token", token);
        }
        return { success: true, user };
      } catch (error) {
        return { success: false, error };
      }
    },
    [setToken, setUser],
  );

  const register = useCallback(
    async (name: string, email: string, password: string) => {
      try {
        const response = await api.post<LoginResponse>("/auth/register", {
          name,
          email,
          password,
        });
        const { token, user } = response.data;
        setToken(token);
        setUser(user);
        if (typeof window !== "undefined") {
          localStorage.setItem("auth_token", token);
        }
        return { success: true, user };
      } catch (error) {
        return { success: false, error };
      }
    },
    [setToken, setUser],
  );

  const logoutUser = useCallback(() => {
    logout();
  }, [logout]);

  return { user, token, isAuthenticated, login, register, logout: logoutUser };
}
