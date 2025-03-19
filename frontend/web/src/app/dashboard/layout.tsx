"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut, useSession } from "next-auth/react";
import { dashboardNavItems } from "@/config/navigation";
import { Button } from "@/components/ui/button";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const { data: session } = useSession();

  return (
    <div className="flex min-h-screen flex-col">
      {/* 导航栏 */}
      <header className="sticky top-0 z-40 border-b bg-background">
        <div className="container flex h-16 items-center justify-between py-4">
          <div className="flex items-center gap-2">
            <Link href="/dashboard" className="font-bold text-2xl text-fortune-red">
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
          </nav>
          <div className="flex items-center gap-4">
            <Link href="/profile">
              <Button variant="ghost" size="sm" className="flex items-center gap-2">
                <div className="h-6 w-6 rounded-full bg-gray-200"></div>
                <span>{session?.user?.name || "用户"}</span>
              </Button>
            </Link>
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => signOut({ callbackUrl: "/" })}
            >
              退出
            </Button>
          </div>
        </div>
      </header>

      <div className="container flex-1 items-start md:grid md:grid-cols-[220px_1fr] md:gap-6 lg:grid-cols-[240px_1fr] lg:gap-10">
        {/* 侧边栏 */}
        <aside className="fixed top-14 z-30 -ml-2 hidden h-[calc(100vh-3.5rem)] w-full shrink-0 md:sticky md:block">
          <div className="h-full py-6 pr-6 lg:py-8">
            <nav className="flex flex-col space-y-2">
              {dashboardNavItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium ${
                    pathname === item.href
                      ? "bg-accent text-accent-foreground"
                      : "hover:bg-accent hover:text-accent-foreground"
                  }`}
                >
                  <span>{item.title}</span>
                </Link>
              ))}
            </nav>
          </div>
        </aside>

        {/* 主内容 */}
        <main className="flex w-full flex-col overflow-hidden py-6">
          {children}
        </main>
      </div>

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
