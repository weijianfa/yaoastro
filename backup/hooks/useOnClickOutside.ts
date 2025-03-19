'use client';

import { RefObject, useEffect } from 'react';

type Handler = (event: MouseEvent | TouchEvent) => void;

/**
 * 自定义 Hook，用于检测点击元素外部的事件
 * @param ref 元素的引用
 * @param handler 处理函数
 * @param mouseEvent 鼠标事件类型
 * @param touchEvent 触摸事件类型
 */
export function useOnClickOutside<T extends HTMLElement = HTMLElement>(
  ref: RefObject<T>,
  handler: Handler,
  mouseEvent: 'mousedown' | 'mouseup' = 'mousedown',
  touchEvent: 'touchstart' | 'touchend' = 'touchstart'
): void {
  useEffect(() => {
    // 确保在客户端环境
    if (typeof window === 'undefined') {
      return;
    }

    const listener = (event: MouseEvent | TouchEvent) => {
      // 如果元素不存在或者点击的是元素内部，不执行处理函数
      const el = ref?.current;
      if (!el || el.contains((event.target as Node) || null)) {
        return;
      }

      handler(event);
    };

    // 添加事件监听器
    document.addEventListener(mouseEvent, listener);
    document.addEventListener(touchEvent, listener);

    // 清除事件监听器
    return () => {
      document.removeEventListener(mouseEvent, listener);
      document.removeEventListener(touchEvent, listener);
    };
  }, [ref, handler, mouseEvent, touchEvent]);
}

/**
 * 自定义 Hook，用于检测点击多个元素外部的事件
 * @param refs 元素引用数组
 * @param handler 处理函数
 * @param mouseEvent 鼠标事件类型
 * @param touchEvent 触摸事件类型
 */
export function useOnClickOutsideMultiple<T extends HTMLElement = HTMLElement>(
  refs: RefObject<T>[],
  handler: Handler,
  mouseEvent: 'mousedown' | 'mouseup' = 'mousedown',
  touchEvent: 'touchstart' | 'touchend' = 'touchstart'
): void {
  useEffect(() => {
    // 确保在客户端环境
    if (typeof window === 'undefined') {
      return;
    }

    const listener = (event: MouseEvent | TouchEvent) => {
      // 检查点击是否在任何一个元素内部
      const isInside = refs.some(ref => {
        const el = ref?.current;
        return el && el.contains((event.target as Node) || null);
      });

      // 如果点击在任何一个元素内部，不执行处理函数
      if (isInside) {
        return;
      }

      handler(event);
    };

    // 添加事件监听器
    document.addEventListener(mouseEvent, listener);
    document.addEventListener(touchEvent, listener);

    // 清除事件监听器
    return () => {
      document.removeEventListener(mouseEvent, listener);
      document.removeEventListener(touchEvent, listener);
    };
  }, [refs, handler, mouseEvent, touchEvent]);
} 