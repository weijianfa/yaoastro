import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function MarketingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen flex-col">
      {/* 导航栏 */}
      <header className="sticky top-0 z-40 border-b bg-background">
        <div className="container flex h-16 items-center justify-between py-4">
          <div className="flex items-center gap-2">
            <Link href="/" className="font-bold text-2xl text-fortune-red">
              爻星阁
            </Link>
          </div>
          <nav className="hidden md:flex items-center gap-6">
            <Link href="/bazi" className="text-sm font-medium hover:text-fortune-red">
              八字命理
            </Link>
            <Link href="/tarot" className="text-sm font-medium hover:text-fortune-red">
              塔罗占卜
            </Link>
            <Link href="/face-analysis" className="text-sm font-medium hover:text-fortune-red">
              AI面相手相
            </Link>
            <Link href="/psychology-test" className="text-sm font-medium hover:text-fortune-red">
              心理测试
            </Link>
            <Link href="/blessing" className="text-sm font-medium hover:text-fortune-red">
              祈福许愿
            </Link>
            <Link href="/about" className="text-sm font-medium hover:text-fortune-red">
              关于我们
            </Link>
            <Link href="/contact" className="text-sm font-medium hover:text-fortune-red">
              联系我们
            </Link>
          </nav>
          <div className="flex items-center gap-2">
            <Link href="/login">
              <Button variant="outline" size="sm">
                登录
              </Button>
            </Link>
            <Link href="/register">
              <Button variant="fortune" size="sm">
                注册
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {children}

      <footer className="border-t py-6 md:py-0">
        <div className="container flex flex-col items-center justify-between gap-4 md:h-24 md:flex-row">
          <p className="text-sm text-gray-500">
            &copy; {new Date().getFullYear()} 爻星阁. 保留所有权利.
          </p>
          <div className="flex gap-4">
            <Link href="/terms" className="text-sm text-gray-500 hover:underline">
              使用条款
            </Link>
            <Link href="/privacy" className="text-sm text-gray-500 hover:underline">
              隐私政策
            </Link>
            <Link href="/contact" className="text-sm text-gray-500 hover:underline">
              联系我们
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
