"use client";

import { useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // 可以在这里记录错误到错误报告服务
    console.error(error);
  }, [error]);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center text-center p-4">
      <div className="space-y-6 max-w-md">
        <div className="space-y-2">
          <h1 className="text-4xl font-bold tracking-tight text-fortune-red sm:text-5xl">出错了</h1>
          <h2 className="text-2xl font-semibold">很抱歉，发生了一些错误</h2>
          <p className="text-gray-500">
            我们的团队已经收到这个问题的通知，并正在努力修复它。
          </p>
        </div>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Button
            onClick={reset}
            className="bg-fortune-red text-white hover:bg-fortune-red/90"
          >
            重试
          </Button>
          <Link href="/">
            <Button className="border border-gray-300 bg-white text-gray-700 hover:bg-gray-50">
              返回首页
            </Button>
          </Link>
        </div>
        <div className="pt-6">
          <p className="text-sm text-gray-500">
            如果问题持续存在，请
            <Link href="/contact" className="text-fortune-red hover:underline mx-1">
              联系我们
            </Link>
            获取帮助。
          </p>
        </div>
      </div>
    </div>
  );
} 