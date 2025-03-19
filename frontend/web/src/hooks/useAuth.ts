'use client';

import { useSession, signIn, signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useState, useCallback } from 'react';

/**
 * 自定义认证 Hook，提供用户认证状态和方法
 * @returns 用户认证状态和方法
 */
export function useAuth() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  // 用户是否已认证
  const isAuthenticated = status === 'authenticated';
  // 用户信息
  const user = session?.user;

  /**
   * 登录方法
   * @param email 邮箱
   * @param password 密码
   * @param redirectUrl 登录成功后重定向的URL
   */
  const login = useCallback(
    async (email: string, password: string, redirectUrl: string = '/dashboard') => {
      setIsLoading(true);
      setError(null);

      try {
        const result = await signIn('credentials', {
          redirect: false,
          email,
          password,
        });

        if (result?.error) {
          setError('邮箱或密码不正确');
          setIsLoading(false);
          return false;
        }

        router.push(redirectUrl);
        router.refresh();
        return true;
      } catch (err) {
        setError('登录过程中发生错误，请稍后再试');
        setIsLoading(false);
        return false;
      }
    },
    [router]
  );

  /**
   * 注册方法
   * @param name 用户名
   * @param email 邮箱
   * @param password 密码
   */
  const register = useCallback(
    async (name: string, email: string, password: string) => {
      setIsLoading(true);
      setError(null);

      try {
        const response = await fetch('/api/auth/register', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ name, email, password }),
        });

        const data = await response.json();

        if (!response.ok) {
          setError(data.message || '注册失败，请稍后再试');
          setIsLoading(false);
          return false;
        }

        // 注册成功后自动登录
        return login(email, password);
      } catch (err) {
        setError('注册过程中发生错误，请稍后再试');
        setIsLoading(false);
        return false;
      }
    },
    [login]
  );

  /**
   * 登出方法
   */
  const logout = useCallback(async () => {
    await signOut({ redirect: false });
    router.push('/');
    router.refresh();
  }, [router]);

  /**
   * 重置密码方法
   * @param email 邮箱
   */
  const resetPassword = useCallback(async (email: string) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/auth/forgot-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.message || '重置密码请求失败，请稍后再试');
        setIsLoading(false);
        return false;
      }

      setIsLoading(false);
      return true;
    } catch (err) {
      setError('重置密码过程中发生错误，请稍后再试');
      setIsLoading(false);
      return false;
    }
  }, []);

  return {
    user,
    isAuthenticated,
    isLoading,
    error,
    login,
    register,
    logout,
    resetPassword,
    status,
  };
} 