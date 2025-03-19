import { Metadata } from "next";
import Link from "next/link";
import { User, History, CreditCard, Settings, HelpCircle, LogOut } from "lucide-react";

export const metadata: Metadata = {
  title: "个人中心 | 爻星阁",
  description: "管理您的个人信息、查看测算记录、充值余额等功能。",
};

export default function MyPage() {
  return (
    <div className="flex justify-center bg-gray-100 min-h-screen">
      <div className="w-full max-w-md flex flex-col min-h-screen bg-white relative shadow-md">
        {/* 页面标题 */}
        <div className="bg-fortune-red text-white py-4 px-4">
          <h1 className="text-xl font-bold text-center">个人中心</h1>
        </div>
        
        {/* 用户信息 */}
        <div className="bg-fortune-red text-white p-4 pb-8">
          <div className="flex items-center">
            <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mr-4">
              <User className="h-8 w-8 text-fortune-red" />
            </div>
            <div>
              <p className="font-bold text-lg">游客用户</p>
              <Link href="/login" className="text-sm bg-white text-fortune-red px-3 py-1 rounded-full inline-block mt-1">
                登录/注册
              </Link>
            </div>
          </div>
        </div>
        
        {/* 余额信息 */}
        <div className="bg-white rounded-lg shadow-md mx-4 p-4 -mt-4 flex justify-between">
          <div className="text-center">
            <p className="text-gray-500 text-sm">余额</p>
            <p className="font-bold text-lg">¥0.00</p>
          </div>
          <div className="text-center">
            <p className="text-gray-500 text-sm">优惠券</p>
            <p className="font-bold text-lg">0</p>
          </div>
          <div className="text-center">
            <p className="text-gray-500 text-sm">积分</p>
            <p className="font-bold text-lg">0</p>
          </div>
        </div>
        
        {/* 功能列表 */}
        <div className="p-4 mt-4">
          <div className="space-y-4">
            <Link href="/my/history" className="block">
              <div className="border rounded-lg p-4 hover:bg-gray-50 transition flex items-center justify-between">
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center mr-4">
                    <History className="h-5 w-5 text-blue-500" />
                  </div>
                  <span className="font-medium">测算记录</span>
                </div>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </Link>
            
            <Link href="/my/recharge" className="block">
              <div className="border rounded-lg p-4 hover:bg-gray-50 transition flex items-center justify-between">
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center mr-4">
                    <CreditCard className="h-5 w-5 text-green-500" />
                  </div>
                  <span className="font-medium">充值余额</span>
                </div>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </Link>
            
            <Link href="/my/settings" className="block">
              <div className="border rounded-lg p-4 hover:bg-gray-50 transition flex items-center justify-between">
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center mr-4">
                    <Settings className="h-5 w-5 text-gray-500" />
                  </div>
                  <span className="font-medium">账号设置</span>
                </div>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </Link>
          </div>
        </div>
        
        {/* 其他链接 */}
        <div className="p-4 mt-2">
          <div className="space-y-4">
            <Link href="/contact" className="block">
              <div className="p-4 hover:bg-gray-50 transition flex items-center justify-between">
                <div className="flex items-center">
                  <HelpCircle className="h-5 w-5 text-gray-400 mr-3" />
                  <span className="text-gray-600">联系客服</span>
                </div>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </Link>
            
            <Link href="/about" className="block">
              <div className="p-4 hover:bg-gray-50 transition flex items-center justify-between">
                <div className="flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span className="text-gray-600">关于我们</span>
                </div>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </Link>
            
            <div className="p-4 hover:bg-gray-50 transition flex items-center justify-between cursor-pointer">
              <div className="flex items-center">
                <LogOut className="h-5 w-5 text-gray-400 mr-3" />
                <span className="text-gray-600">退出登录</span>
              </div>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 