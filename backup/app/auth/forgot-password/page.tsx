"use client";

import { useState } from "react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

const forgotPasswordSchema = z.object({
  email: z.string().email({ message: "请输入有效的邮箱地址" }),
});

type ForgotPasswordFormValues = z.infer<typeof forgotPasswordSchema>;

export default function ForgotPasswordPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ForgotPasswordFormValues>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = async (data: ForgotPasswordFormValues) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/auth/forgot-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: data.email,
        }),
      });

      const responseData = await response.json();

      if (!response.ok) {
        throw new Error(responseData.message || "重置密码请求失败");
      }

      setIsSubmitted(true);
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError("发送重置密码邮件过程中发生错误，请稍后再试");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4 py-12 sm:px-6 lg:px-8">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold text-center text-fortune-red">重置密码</CardTitle>
          <CardDescription className="text-center">
            输入您的邮箱，我们将发送重置密码链接
          </CardDescription>
        </CardHeader>
        <CardContent>
          {isSubmitted ? (
            <div className="space-y-4 text-center">
              <div className="h-16 w-16 rounded-full bg-green-100 mx-auto flex items-center justify-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-green-600"
                >
                  <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                  <polyline points="22 4 12 14.01 9 11.01" />
                </svg>
              </div>
              <h3 className="text-lg font-medium text-gray-900">邮件已发送</h3>
              <p className="text-sm text-gray-500">
                我们已向您的邮箱发送了重置密码链接，请查收邮件并按照指示操作。
              </p>
              <p className="text-sm text-gray-500">
                如果您没有收到邮件，请检查垃圾邮件文件夹或稍后再试。
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div className="space-y-2">
                <label htmlFor="email" className="text-sm font-medium">
                  邮箱
                </label>
                <input
                  id="email"
                  type="email"
                  {...register("email")}
                  className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-fortune-red"
                  placeholder="your@email.com"
                  disabled={isLoading}
                />
                {errors.email && (
                  <p className="text-xs text-red-500">{errors.email.message}</p>
                )}
              </div>
              {error && <p className="text-sm text-red-500">{error}</p>}
              <Button
                type="submit"
                className="w-full bg-fortune-red hover:bg-fortune-red/90 text-white"
                disabled={isLoading}
              >
                {isLoading ? "发送中..." : "发送重置链接"}
              </Button>
            </form>
          )}
        </CardContent>
        <CardFooter>
          <p className="text-center text-sm text-gray-600 w-full">
            记起密码了?{" "}
            <Link href="/login" className="text-fortune-red hover:underline">
              返回登录
            </Link>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
} 