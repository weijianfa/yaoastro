'use client';

import { useState, useEffect } from 'react';

/**
 * 自定义防抖 Hook，延迟更新值
 * @param value 需要防抖的值
 * @param delay 延迟时间（毫秒）
 * @returns 防抖后的值
 */
export function useDebounce<T>(value: T, delay: number = 500): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    // 设置定时器，延迟更新值
    const timer = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    // 清除定时器
    return () => {
      clearTimeout(timer);
    };
  }, [value, delay]);

  return debouncedValue;
}

/**
 * 自定义防抖函数 Hook，延迟执行函数
 * @param fn 需要防抖的函数
 * @param delay 延迟时间（毫秒）
 * @returns 防抖后的函数
 */
export function useDebounceFn<T extends (...args: any[]) => any>(
  fn: T,
  delay: number = 500
): (...args: Parameters<T>) => void {
  const [timer, setTimer] = useState<NodeJS.Timeout | null>(null);

  const debouncedFn = (...args: Parameters<T>) => {
    // 清除之前的定时器
    if (timer) {
      clearTimeout(timer);
    }

    // 设置新的定时器
    const newTimer = setTimeout(() => {
      fn(...args);
    }, delay);

    setTimer(newTimer);
  };

  // 组件卸载时清除定时器
  useEffect(() => {
    return () => {
      if (timer) {
        clearTimeout(timer);
      }
    };
  }, [timer]);

  return debouncedFn;
} 