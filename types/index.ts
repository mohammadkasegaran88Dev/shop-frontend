export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  sku: string;
  slug: string;
  status: string;
  image: string;
  category: string;
  stock: number;
  createAt: string;
  updateAt: string;
}

export interface User {
  id: number;
  name: string;
  email: string;
  role: "user" | "admin";
  createAt: string;
  updateAt: string;
}
export interface LoginResponse {
  token: string;
  user: User;
}

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  message?: string;
  errors?: Record<string, string[]>;
}
