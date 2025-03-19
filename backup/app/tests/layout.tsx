import React from 'react';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: '心理测试 | 紫微斗数',
  description: '紫微斗数系统提供的各种心理测试和性格分析',
};

export default function TestsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
} 