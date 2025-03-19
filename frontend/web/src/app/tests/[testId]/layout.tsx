import React from 'react';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: '心理测试详情 | 紫微斗数',
  description: '参与紫微斗数系统提供的心理测试，了解自己的性格特点和潜能',
};

export default function TestDetailLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
} 