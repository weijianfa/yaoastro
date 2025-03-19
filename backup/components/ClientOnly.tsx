'use client';

import { useEffect, useState } from 'react';

// ClientOnly组件确保其子组件仅在客户端渲染
// 这对于访问window或document等仅客户端可用的API很有用
export default function ClientOnly({
  children,
}: {
  children: React.ReactNode;
}) {
  const [hasMounted, setHasMounted] = useState(false);

  // 在组件挂载后设置hasMounted为true
  useEffect(() => {
    setHasMounted(true);
  }, []);

  // 在服务器端渲染期间或客户端首次渲染前返回null
  if (!hasMounted) {
    return null;
  }

  // 客户端渲染后显示子组件
  return <>{children}</>;
} 