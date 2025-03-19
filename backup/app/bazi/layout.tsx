import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "八字命理分析 - 爻星阁",
  description: "通过八字命理分析您的命格、五行属性、事业财运、婚姻健康等方面的运势",
};

export default function BaziLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <section className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      {children}
    </section>
  );
} 