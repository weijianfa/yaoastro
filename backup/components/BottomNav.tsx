'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, Grid, User } from 'lucide-react';

export default function BottomNav() {
  const pathname = usePathname();
  
  const isActive = (path: string) => {
    if (path === '/' && pathname === '/') return true;
    if (path !== '/' && pathname.startsWith(path)) return true;
    return false;
  };
  
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 py-2 flex justify-around items-center z-50 max-w-md mx-auto">
      <Link href="/" className="flex flex-col items-center w-1/3">
        <div className={`flex items-center justify-center ${isActive('/') ? 'text-fortune-red' : 'text-gray-500'}`}>
          <Home size={20} strokeWidth={isActive('/') ? 2 : 1.5} />
        </div>
        <span className={`text-xs mt-1 ${isActive('/') ? 'text-fortune-red' : 'text-gray-500'}`}>首页</span>
      </Link>
      
      <Link href="/categories" className="flex flex-col items-center w-1/3">
        <div className={`flex items-center justify-center ${isActive('/categories') ? 'text-fortune-red' : 'text-gray-500'}`}>
          <Grid size={20} strokeWidth={isActive('/categories') ? 2 : 1.5} />
        </div>
        <span className={`text-xs mt-1 ${isActive('/categories') ? 'text-fortune-red' : 'text-gray-500'}`}>分类</span>
      </Link>
      
      <Link href="/my-calculations" className="flex flex-col items-center w-1/3">
        <div className={`flex items-center justify-center ${isActive('/my-calculations') ? 'text-fortune-red' : 'text-gray-500'}`}>
          <User size={20} strokeWidth={isActive('/my-calculations') ? 2 : 1.5} />
        </div>
        <span className={`text-xs mt-1 ${isActive('/my-calculations') ? 'text-fortune-red' : 'text-gray-500'}`}>我的测算</span>
      </Link>
    </div>
  );
} 