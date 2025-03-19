'use client';

import { usePathname } from "next/navigation";
import React from "react";
import BottomNav from "@/components/BottomNav";

// 前端布局组件
function FrontendLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <div className="flex justify-center min-h-screen bg-gray-100">
        <div className="w-full max-w-md flex flex-col min-h-screen bg-white relative shadow-md pb-20">
          {children}
        </div>
      </div>
      <BottomNav />
    </>
  );
}

// 客户端布局选择器组件
// 这个组件在客户端执行，可以安全地使用usePathname等客户端钩子
export default function ClientLayoutSelector({
  children
}: {
  children: React.ReactNode;
}) {
  // 使用usePathname钩子获取当前路径
  const pathname = usePathname();
  const isAdminPath = pathname?.startsWith('/admin') || false;
  
  // 根据路径选择显示管理后台布局或前端布局
  if (isAdminPath) {
    // 管理后台直接渲染子组件，不添加额外布局
    return <>{children}</>;
  } else {
    // 前端使用移动端布局
    return <FrontendLayout>{children}</FrontendLayout>;
  }
} 