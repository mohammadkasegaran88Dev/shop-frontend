"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useAuth } from "@/hooks/useAuth";
import { registerSchema, type RegisterFormData } from "@/lib/schemas";
import Link from "next/link";

export default function RegisterPage() {
  const [error, setError] = useState("");
  const router = useRouter();
  const { register: registerUser } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = async (data: RegisterFormData) => {
    setError("");
    const result = await registerUser(
      data.name,
      data.email,
      data.password,
      data.password_confirmation,
    );

    if (result.success) {
      router.push("/");
    } else {
      setError("خطا در ثبت نام. لطفاً دوباره سعی کنید");
    }
  };

  return (
    <Card>
      <CardHeader className="space-y-2">
        <CardTitle className="text-2xl">ثبت نام</CardTitle>
        <CardDescription>حساب کاربری جدید ایجاد کنید</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {error && (
            <Alert variant="destructive">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          <div className="space-y-2">
            <Label htmlFor="name">نام کامل</Label>
            <Input
              id="name"
              type="text"
              placeholder="نام خود را وارد کنید"
              {...register("name")}
              disabled={isSubmitting}
            />
            {errors.name && (
              <p className="text-sm text-red-500">{errors.name.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">ایمیل</Label>
            <Input
              id="email"
              type="email"
              placeholder="example@email.com"
              {...register("email")}
              disabled={isSubmitting}
            />
            {errors.email && (
              <p className="text-sm text-red-500">{errors.email.message}</p>
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
            {errors.password && (
              <p className="text-sm text-red-500">{errors.password.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="confirmPassword">تأیید رمز عبور</Label>
            <Input
              id="confirmPassword"
              type="password"
              placeholder="••••••••"
              {...register("password_confirmation")}
              disabled={isSubmitting}
            />
            {errors.password_confirmation && (
              <p className="text-sm text-red-500">
                {errors.password_confirmation.message}
              </p>
            )}
          </div>

          <Button type="submit" className="w-full" disabled={isSubmitting}>
            {isSubmitting ? "در حال ثبت نام..." : "ثبت نام"}
          </Button>
        </form>

        <div className="mt-4 text-center text-sm">
          قبلاً ثبت نام کردید؟{" "}
          <Link href="/login" className="text-blue-600 hover:underline">
            وارد شوید
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}
