'use client';

import { useState, useEffect } from 'react';

/**
 * 自定义本地存储 Hook，提供本地存储状态和方法
 * @param key 存储键名
 * @param initialValue 初始值
 * @returns 存储值和设置方法
 */
export function useLocalStorage<T>(key: string, initialValue: T): [T, (value: T | ((val: T) => T)) => void] {
  // 获取存储值的状态函数
  const getStoredValue = (): T => {
    if (typeof window === 'undefined') {
      return initialValue;
    }

    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error(`Error reading localStorage key "${key}":`, error);
      return initialValue;
    }
  };

  // 存储值状态
  const [storedValue, setStoredValue] = useState<T>(getStoredValue);

  // 设置存储值的方法
  const setValue = (value: T | ((val: T) => T)) => {
    try {
      // 允许值是一个函数，类似于 useState
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      
      // 保存到 state
      setStoredValue(valueToStore);
      
      // 保存到 localStorage
      if (typeof window !== 'undefined') {
        window.localStorage.setItem(key, JSON.stringify(valueToStore));
        
        // 触发自定义事件，以便其他组件可以监听到变化
        window.dispatchEvent(new Event('local-storage'));
      }
    } catch (error) {
      console.error(`Error setting localStorage key "${key}":`, error);
    }
  };

  // 监听其他组件对同一个 key 的更改
  useEffect(() => {
    const handleStorageChange = () => {
      setStoredValue(getStoredValue());
    };
    
    // 监听自定义事件
    window.addEventListener('local-storage', handleStorageChange);
    
    // 监听原生 storage 事件（在其他标签页中更改时触发）
    window.addEventListener('storage', handleStorageChange);
    
    return () => {
      window.removeEventListener('local-storage', handleStorageChange);
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  return [storedValue, setValue];
} 