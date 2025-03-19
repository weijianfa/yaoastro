import Link from "next/link";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-40 border-b bg-background">
        <div className="container flex h-16 items-center justify-between py-4">
          <div className="flex items-center gap-2">
            <Link href="/" className="font-bold text-2xl text-fortune-red">
              爻星阁
            </Link>
          </div>
        </div>
      </header>

      <main className="flex-1">
        {children}
      </main>

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
