'use client';

import BottomNav from "@/components/BottomNav";

export default function FrontendLayout({
  children,
}: {
  children: React.ReactNode;
}) {
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