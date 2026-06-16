"use client";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/hooks/useAuth";
import { LoginFormData, loginSchema } from "@/lib/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { email } from "zod";

export default function LoginPage() {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState("");
  const router = useRouter();
  const { login } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginFormData) => {
    setError("");
    const result = await login(data.email, data.password);
    if (result?.success) {
      console.log("result?.success", result?.success);
      router.push("/");
    } else {
      console.log("result", result);
      setError("ایمیل یا رمز عبور اشتباه است");
    }
  };

  return (
    <Card className="w-lg">
      <CardHeader className="space-y-2">
        <CardTitle className="text-2xl">ورود</CardTitle>
        <CardDescription>وارد حساب خود شوید</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {error && (
            <Alert variant={"destructive"}>
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
          <div className="space-y-2">
            <Label htmlFor="email">ایمیل</Label>
            <Input
              id="email"
              type="email"
              placeholder="example@email.com"
              {...register("email")}
              disabled={isSubmitting}
            />
            {errors?.email && (
              <p className="text-sm text-red-500">{errors?.email?.message}</p>
            )}
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">رمز عبور</Label>
            <Input
              id="password"
              type="password"
              placeholder="••••••••"
              {...register("password")}
              disabled={isSubmitting}
            />
            {errors?.password && (
              <p className="text-sm text-red-500">
                {errors?.password?.message}
              </p>
            )}
          </div>
          <Button type="submit" className="w-full " disabled={isSubmitting}>
            {isSubmitting ? "...در حال ورود" : "ورود"}
          </Button>
        </form>
        <div className="mt-4 text-center text-sm">
          حساب کاربری ندارید.
          <Link href="/register" className="text-blue-600 hover:underline">
            ثبت نام کنید
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}
