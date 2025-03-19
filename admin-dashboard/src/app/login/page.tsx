'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Eye, EyeOff } from 'lucide-react';

// 模拟管理员账号
const ADMIN_USERNAME = 'admin';
const ADMIN_PASSWORD = 'admin123';

export default function AdminLoginPage() {
  const router = useRouter();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    // 模拟登录请求
    setTimeout(() => {
      if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
        // 登录成功，将登录状态存储到sessionStorage
        sessionStorage.setItem('adminLoggedIn', 'true');
        // 跳转到管理后台首页
        router.push('/admin');
      } else {
        setError('用户名或密码错误');
        setLoading(false);
      }
    }, 800);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#5e42d2]">
      <div className="w-full max-w-md bg-white rounded-lg shadow-xl">
        <div className="p-8">
          <div className="flex flex-col items-center mb-8">
            <div className="w-20 h-20 bg-[#5e42d2] rounded-full flex items-center justify-center mb-4">
              <span className="text-white font-bold text-3xl">Z</span>
            </div>
            <h1 className="text-2xl font-bold text-gray-800">管理员登录</h1>
            <p className="text-gray-500 mt-2">请输入您的账号和密码</p>
          </div>

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-4 text-sm">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-1">
                用户名
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg className="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                  </svg>
                </div>
                <input
                  id="username"
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full pl-10 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#5e42d2] focus:border-transparent"
                  placeholder="请输入管理员账号"
                  required
                />
              </div>
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                密码
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg className="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#5e42d2] focus:border-transparent"
                  placeholder="请输入密码"
                  required
                />
                <button
                  type="button"
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember"
                  type="checkbox"
                  checked={rememberMe}
                  onChange={() => setRememberMe(!rememberMe)}
                  className="h-4 w-4 text-[#5e42d2] border-gray-300 rounded focus:ring-[#5e42d2]"
                />
                <label htmlFor="remember" className="ml-2 block text-sm text-gray-700">
                  记住我
                </label>
              </div>

              <div className="text-sm">
                <Link href="#" className="text-[#5e42d2] hover:text-[#4e35ad]">
                  忘记密码?
                </Link>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className={`w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-[#5e42d2] hover:bg-[#4e35ad] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#5e42d2] transition-colors ${
                loading ? 'opacity-70 cursor-not-allowed' : ''
              }`}
            >
              {loading ? '登录中...' : '登录系统'}
            </button>
          </form>

          <p className="mt-8 text-center text-sm text-gray-500">
            © {new Date().getFullYear()} 爻星阁 版权所有
          </p>
          <p className="mt-1 text-center text-xs text-gray-400">
            v2.1.0
          </p>
        </div>
      </div>
    </div>
  );
} 