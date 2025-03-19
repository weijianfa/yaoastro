'use client';

import { useState, useEffect } from 'react';

/**
 * 自定义媒体查询 Hook，用于响应式设计
 * @param query 媒体查询字符串
 * @returns 是否匹配查询
 */
export function useMediaQuery(query: string): boolean {
  // 初始状态设置为 false，避免 SSR 水合不匹配
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    // 确保在客户端环境
    if (typeof window !== 'undefined') {
      // 创建媒体查询列表
      const media = window.matchMedia(query);
      
      // 设置初始值
      setMatches(media.matches);

      // 定义回调函数
      const listener = (event: MediaQueryListEvent) => {
        setMatches(event.matches);
      };

      // 添加监听器
      media.addEventListener('change', listener);

      // 清除监听器
      return () => {
        media.removeEventListener('change', listener);
      };
    }
  }, [query]);

  return matches;
}

/**
 * 预定义的断点
 */
export const breakpoints = {
  sm: '(min-width: 640px)',
  md: '(min-width: 768px)',
  lg: '(min-width: 1024px)',
  xl: '(min-width: 1280px)',
  '2xl': '(min-width: 1536px)',
};

/**
 * 使用预定义断点的媒体查询 Hook
 */
export function useBreakpoint() {
  const sm = useMediaQuery(breakpoints.sm);
  const md = useMediaQuery(breakpoints.md);
  const lg = useMediaQuery(breakpoints.lg);
  const xl = useMediaQuery(breakpoints.xl);
  const xxl = useMediaQuery(breakpoints['2xl']);

  return {
    sm,
    md,
    lg,
    xl,
    xxl,
    // 当前最小的断点
    current: xxl ? '2xl' : xl ? 'xl' : lg ? 'lg' : md ? 'md' : sm ? 'sm' : 'xs',
    // 是否是移动设备
    isMobile: !md,
    // 是否是平板设备
    isTablet: md && !lg,
    // 是否是桌面设备
    isDesktop: lg,
  };
} 