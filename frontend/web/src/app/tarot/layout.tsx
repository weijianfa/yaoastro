'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';

interface TarotLayoutProps {
  children: React.ReactNode;
}

export default function TarotLayout({ children }: TarotLayoutProps) {
  const pathname = usePathname();
  
  const navItems = [
    { href: '/tarot', label: '塔罗牌阅读' },
    { href: '/tarot/cards', label: '塔罗牌库' },
    { href: '/tarot/spreads', label: '牌阵介绍' },
    { href: '/tarot/history', label: '塔罗历史' },
  ];

  return (
    <div className="container mx-auto py-6">
      <h1 className="text-4xl font-bold text-center mb-6">塔罗牌</h1>
      
      <div className="flex overflow-x-auto mb-8 pb-2">
        <nav className="flex space-x-1 mx-auto bg-muted p-1 rounded-lg">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "px-4 py-2 text-sm font-medium rounded-md transition-colors",
                pathname === item.href
                  ? "bg-background text-foreground shadow-sm"
                  : "text-muted-foreground hover:text-foreground hover:bg-muted-foreground/10"
              )}
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
      
      {children}
    </div>
  );
} 