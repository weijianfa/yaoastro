import React from 'react';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'AI助手 | 紫微斗数',
  description: '智能AI助手，为您提供紫微斗数解读和分析',
};

export default function AILayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
} 