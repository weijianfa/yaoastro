'use client';

import { useState, useEffect, useCallback } from 'react';

interface FetchState<T> {
  data: T | null;
  isLoading: boolean;
  error: Error | null;
}

interface FetchOptions extends RequestInit {
  autoFetch?: boolean;
}

/**
 * 自定义 Hook，用于数据获取
 * @param url 请求 URL
 * @param options 请求选项
 * @returns 包含数据、加载状态、错误和重新获取方法的对象
 */
export function useFetch<T = any>(url: string, options: FetchOptions = {}) {
  const { autoFetch = true, ...fetchOptions } = options;
  
  // 状态
  const [state, setState] = useState<FetchState<T>>({
    data: null,
    isLoading: false,
    error: null,
  });

  // 获取数据的方法
  const fetchData = useCallback(async () => {
    setState(prev => ({ ...prev, isLoading: true }));

    try {
      const response = await fetch(url, fetchOptions);
      
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      
      const data = await response.json();
      setState({ data, isLoading: false, error: null });
      return data;
    } catch (error) {
      setState({ data: null, isLoading: false, error: error as Error });
      throw error;
    }
  }, [url, fetchOptions]);

  // 自动获取数据
  useEffect(() => {
    if (autoFetch) {
      fetchData().catch(console.error);
    }
  }, [fetchData, autoFetch]);

  return {
    ...state,
    refetch: fetchData,
  };
}

/**
 * 自定义 Hook，用于提交数据
 * @param url 请求 URL
 * @param method 请求方法
 * @param options 请求选项
 * @returns 包含提交方法、加载状态和错误的对象
 */
export function useSubmit<T = any, D = any>(
  url: string,
  method: 'POST' | 'PUT' | 'PATCH' | 'DELETE' = 'POST',
  options: Omit<RequestInit, 'method' | 'body'> = {}
) {
  // 状态
  const [state, setState] = useState<{
    data: T | null;
    isLoading: boolean;
    error: Error | null;
  }>({
    data: null,
    isLoading: false,
    error: null,
  });

  // 提交数据的方法
  const submit = useCallback(
    async (data?: D) => {
      setState(prev => ({ ...prev, isLoading: true }));

      try {
        const response = await fetch(url, {
          method,
          headers: {
            'Content-Type': 'application/json',
            ...options.headers,
          },
          body: data ? JSON.stringify(data) : undefined,
          ...options,
        });

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const responseData = await response.json();
        setState({ data: responseData, isLoading: false, error: null });
        return responseData;
      } catch (error) {
        setState({ data: null, isLoading: false, error: error as Error });
        throw error;
      }
    },
    [url, method, options]
  );

  return {
    submit,
    data: state.data,
    isLoading: state.isLoading,
    error: state.error,
  };
} 