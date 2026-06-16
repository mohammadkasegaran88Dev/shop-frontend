import path from "path";
import z, { email } from "zod";

export const loginSchema = z.object({
  email: z.string().min(1, "ایمیل الزامی است").email("ایمیل نامعتبر است"),
  password: z
    .string()
    .min(1, "رمز عبور الزانی است")
    .min(6, "رمز عبور بایستی حداقل 6 کاراکتر باشد"),
});

export const registerSchema = z
  .object({
    name: z
      .string()
      .min(1, "نام الزامی است")
      .min(3, "نام باید حداقل 3 کاراکتر باشد"),
    email: z.string().min(1, "ایمیل الزامی است").min(6, "ایمیل نامعتبر است"),

    password: z
      .string()
      .min(1, "پسورد الزامی است")
      .min(6, "رمز عبور باید حداقل 6 کاراکتر باشد"),
    password_confirmation: z.string().min(1, "تایید رمز عبور الزامی است"),
  })
  .refine((data) => data.password === data.password_confirmation, {
    message: "رمز عبور و تایید آن یکسان نیست",
    path: ["password_confirmation"],
  });

export type LoginFormData = z.infer<typeof loginSchema>;
export type RegisterFormData = z.infer<typeof registerSchema>;
