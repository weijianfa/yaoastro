import React from 'react';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: '测试页面 | 紫微斗数',
  description: '紫微斗数系统测试页面',
};

export default function TestLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
} 