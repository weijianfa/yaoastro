'use client';

import { useRef, useEffect } from 'react';

/**
 * 自定义 Hook，用于跟踪值的前一个状态
 * @param value 当前值
 * @returns 前一个值
 */
export function usePrevious<T>(value: T): T | undefined {
  // 使用 ref 存储前一个值
  const ref = useRef<T>();

  // 在每次渲染后更新 ref 的值
  useEffect(() => {
    ref.current = value;
  }, [value]);

  // 返回前一个值（渲染前的值）
  return ref.current;
}

/**
 * 自定义 Hook，用于比较当前值和前一个值
 * @param value 当前值
 * @returns 包含当前值、前一个值和比较结果的对象
 */
export function useValueComparison<T>(value: T) {
  const previousValue = usePrevious(value);
  
  // 判断值是否改变
  const hasChanged = previousValue !== value;
  
  // 如果是数字，计算变化量
  const delta = typeof value === 'number' && typeof previousValue === 'number'
    ? value - previousValue
    : undefined;
  
  // 如果是数字，判断是否增加或减少
  const isIncrease = typeof delta === 'number' ? delta > 0 : undefined;
  const isDecrease = typeof delta === 'number' ? delta < 0 : undefined;
  
  return {
    current: value,
    previous: previousValue,
    hasChanged,
    delta,
    isIncrease,
    isDecrease,
  };
} 