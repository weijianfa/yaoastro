import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center text-center p-4">
      <div className="space-y-6 max-w-md">
        <div className="space-y-2">
          <h1 className="text-4xl font-bold tracking-tight text-fortune-red sm:text-5xl">404</h1>
          <h2 className="text-2xl font-semibold">页面未找到</h2>
          <p className="text-gray-500">
            很抱歉，您要查找的页面不存在或已被移动。
          </p>
        </div>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Link href="/">
            <Button className="bg-fortune-red text-white hover:bg-fortune-red/90">
              返回首页
            </Button>
          </Link>
          <Link href="/contact">
            <Button variant="outline">
              联系我们
            </Button>
          </Link>
        </div>
        <div className="pt-6">
          <p className="text-sm text-gray-500">
            您可能想要查看我们的
            <Link href="/bazi" className="text-fortune-red hover:underline mx-1">
              八字命理
            </Link>
            或
            <Link href="/tarot" className="text-fortune-red hover:underline mx-1">
              塔罗占卜
            </Link>
            服务。
          </p>
        </div>
      </div>
    </div>
  );
} 