import { Metadata } from "next";

export const metadata: Metadata = {
  title: "服务分类 | 爻星阁",
  description: "浏览爻星阁提供的各种命理服务分类，包括八字命理、塔罗占卜、AI面相手相等",
};

export default function CategoriesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
} 