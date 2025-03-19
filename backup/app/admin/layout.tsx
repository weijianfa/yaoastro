'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { 
  LayoutDashboard, 
  Users, 
  ShoppingCart, 
  CreditCard, 
  Bell, 
  Settings, 
  HelpCircle, 
  LogOut,
  ChevronDown,
  Menu,
  X
} from 'lucide-react';
import { useState, useEffect } from 'react';
import ClientOnly from '@/components/ClientOnly';

// 导航链接数据
const navigationItems = [
  { name: '仪表盘', href: '/admin', icon: LayoutDashboard },
  { name: '用户管理', href: '/admin/users', icon: Users },
  { name: '订单管理', href: '/admin/orders', icon: ShoppingCart },
  { name: '服务管理', href: '/admin/services', icon: CreditCard },
  { name: '系统设置', href: '/admin/settings', icon: Settings },
  { name: '通知管理', href: '/admin/notifications', icon: Bell },
  { name: '帮助中心', href: '/admin/help', icon: HelpCircle },
];

// 侧边栏导航链接
const NavLink = ({ href, icon: Icon, children, isActive }: { 
  href: string; 
  icon: React.ElementType; 
  children: React.ReactNode;
  isActive: boolean;
}) => {
  return (
    <Link
      href={href}
      className={`flex items-center px-4 py-3 rounded-md text-sm ${
        isActive 
          ? 'bg-indigo-50 text-indigo-700 font-medium'
          : 'text-gray-600 hover:bg-gray-100'
      }`}
    >
      <Icon className={`h-5 w-5 mr-3 ${isActive ? 'text-indigo-700' : 'text-gray-500'}`} />
      {children}
    </Link>
  );
};

// 检查是否是移动设备
const isMobileDevice = () => {
  if (typeof window === 'undefined') return false;
  return window.innerWidth < 768;
};

// 移动端限制访问组件
function MobileRestriction() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="bg-white p-6 rounded-lg shadow-md max-w-md text-center">
        <div className="rounded-lg w-16 h-16 bg-yellow-100 flex items-center justify-center mx-auto mb-4">
          <X className="h-8 w-8 text-yellow-600" />
        </div>
        <h1 className="text-xl font-bold text-gray-800 mb-2">仅支持PC端访问</h1>
        <p className="text-gray-600 mb-6">
          管理后台仅支持在电脑端访问，请使用电脑或平板电脑横屏模式打开此页面。
        </p>
        <Link
          href="/"
          className="inline-block px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
        >
          返回前台首页
        </Link>
      </div>
    </div>
  );
}

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [currentDate, setCurrentDate] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const [mounted, setMounted] = useState(false);

  // 初始化当前日期和检查登录状态
  useEffect(() => {
    setMounted(true);
    
    const date = new Date();
    setCurrentDate(date.toLocaleDateString('zh-CN', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      weekday: 'long'
    }));

    // 检查设备类型
    const checkDevice = () => {
      setIsMobile(isMobileDevice());
    };
    
    checkDevice();
    window.addEventListener('resize', checkDevice);

    // 检查登录状态
    const checkLogin = () => {
      const loggedIn = sessionStorage.getItem('adminLoggedIn') === 'true';
      setIsLoggedIn(loggedIn);
      setIsLoading(false);

      // 如果未登录且不在登录页面，重定向到登录页
      if (!loggedIn && pathname !== '/admin/login') {
        router.push('/admin/login');
      }
    };

    checkLogin();

    return () => window.removeEventListener('resize', checkDevice);
  }, [pathname, router]);

  // 处理登出
  const handleLogout = () => {
    sessionStorage.removeItem('adminLoggedIn');
    router.push('/admin/login');
  };

  // 未挂载时不渲染任何内容
  if (!mounted) {
    return null;
  }

  // 在登录页使用不同的布局
  if (pathname === '/admin/login') {
    return isMobile ? <MobileRestriction /> : children;
  }

  // 如果正在加载或未登录，显示空内容
  if (isLoading || !isLoggedIn) {
    return null;
  }

  // 如果是移动设备，显示PC限制页面
  if (isMobile) {
    return <MobileRestriction />;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* 顶部导航栏 */}
      <header className="bg-white shadow-sm fixed top-0 left-0 right-0 z-10">
        <div className="flex items-center justify-between h-16 px-4">
          {/* Logo */}
          <div className="flex items-center">
            <Link href="/admin" className="flex items-center">
              <div className="rounded-lg w-9 h-9 bg-indigo-600 flex items-center justify-center">
                <span className="text-white font-bold text-xl">Astro</span>
              </div>
              <span className="ml-2 text-xl font-semibold hidden sm:inline-block">爻星阁管理系统</span>
            </Link>
          </div>

          {/* 用户信息和下拉菜单 */}
          <div className="flex items-center">
            <span className="text-sm text-gray-500 mr-4 hidden sm:inline-block">{currentDate}</span>
            <div className="relative ml-3 group">
              <div className="flex items-center gap-2 cursor-pointer">
                <div className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center">
                  <span className="text-indigo-600 font-semibold">A</span>
                </div>
                <div className="hidden md:block text-sm">
                  <div className="font-medium">管理员</div>
                </div>
                <ChevronDown className="h-4 w-4 text-gray-500" />
              </div>
              
              {/* 下拉菜单 */}
              <div className="absolute right-0 mt-2 w-48 py-1 bg-white rounded-md shadow-lg hidden group-hover:block">
                <Link href="/admin/settings" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                  个人设置
                </Link>
                <button 
                  onClick={handleLogout} 
                  className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                >
                  退出登录
                </button>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* 侧边导航栏和主内容区域 */}
      <div className="flex pt-16 h-screen">
        {/* 桌面端侧边栏 */}
        <aside className="w-64 border-r bg-white flex-shrink-0 h-[calc(100vh-4rem)] overflow-y-auto fixed">
          <nav className="mt-6 px-4 space-y-1">
            {navigationItems.map((item) => (
              <NavLink
                key={item.name}
                href={item.href}
                icon={item.icon}
                isActive={pathname === item.href || pathname.startsWith(`${item.href}/`)}
              >
                {item.name}
              </NavLink>
            ))}
          </nav>
          <div className="absolute bottom-0 w-full border-t p-4">
            <button
              className="flex w-full items-center px-4 py-3 text-sm text-red-600 hover:bg-red-50 rounded-md"
              onClick={handleLogout}
            >
              <LogOut className="h-5 w-5 mr-3" />
              退出系统
            </button>
          </div>
        </aside>

        {/* 主内容区域 */}
        <main className="flex-1 ml-64 p-6 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
} 