import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "测算服务 | 爻星阁",
  description: "提供八字分析、姓名测算、塔罗牌占卜等多种命理测算服务，帮助您了解自己的命运走向。",
};

export default function CalculationsPage() {
  return (
    <>
      {/* 页面标题 */}
      <div className="bg-fortune-red text-white py-4 px-4">
        <h1 className="text-xl font-bold text-center">测算服务</h1>
      </div>
      
      {/* 页面内容 */}
      <div className="p-4">
        <div className="bg-red-50 rounded-lg p-4 mb-6">
          <h2 className="text-lg font-bold mb-2">探索您的命运</h2>
          <p className="text-gray-700">
            选择您感兴趣的测算服务，开启命运探索之旅。
          </p>
        </div>
        
        {/* 测算服务列表 */}
        <div className="space-y-4">
          <Link href="/bazi/analysis" className="block">
            <div className="border rounded-lg p-4 hover:bg-gray-50 transition flex items-center">
              <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mr-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-fortune-red" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <div>
                <h3 className="font-bold text-gray-800">八字分析</h3>
                <p className="text-sm text-gray-600">全面解读您的八字命盘，揭示人生轨迹</p>
              </div>
            </div>
          </Link>
          
          <Link href="/name/baby" className="block">
            <div className="border rounded-lg p-4 hover:bg-gray-50 transition flex items-center">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mr-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
              <div>
                <h3 className="font-bold text-gray-800">宝宝起名</h3>
                <p className="text-sm text-gray-600">为宝宝甄选吉祥如意的好名字</p>
              </div>
            </div>
          </Link>
          
          <Link href="/tarot" className="block">
            <div className="border rounded-lg p-4 hover:bg-gray-50 transition flex items-center">
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mr-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-purple-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <div>
                <h3 className="font-bold text-gray-800">塔罗占卜</h3>
                <p className="text-sm text-gray-600">通过神秘的塔罗牌，洞察未来的可能性</p>
              </div>
            </div>
          </Link>
          
          <Link href="/destiny/match" className="block">
            <div className="border rounded-lg p-4 hover:bg-gray-50 transition flex items-center">
              <div className="w-12 h-12 bg-pink-100 rounded-full flex items-center justify-center mr-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-pink-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </div>
              <div>
                <h3 className="font-bold text-gray-800">缘分配对</h3>
                <p className="text-sm text-gray-600">测试您与TA的缘分指数，探索爱情密码</p>
              </div>
            </div>
          </Link>
          
          <Link href="/palm-analysis" className="block">
            <div className="border rounded-lg p-4 hover:bg-gray-50 transition flex items-center">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mr-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 11.5V14m0-2.5v-6a1.5 1.5 0 113 0m-3 6a1.5 1.5 0 00-3 0v2a7.5 7.5 0 0015 0v-5a1.5 1.5 0 00-3 0m-6-3V11m0-5.5v-1a1.5 1.5 0 013 0v1m0 0V11m0-5.5a1.5 1.5 0 013 0v3m0 0V11" />
                </svg>
              </div>
              <div>
                <h3 className="font-bold text-gray-800">AI手相分析</h3>
                <p className="text-sm text-gray-600">上传手掌照片，AI智能解读您的手相</p>
              </div>
            </div>
          </Link>
          
          <Link href="/face-analysis" className="block">
            <div className="border rounded-lg p-4 hover:bg-gray-50 transition flex items-center">
              <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center mr-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-yellow-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div>
                <h3 className="font-bold text-gray-800">AI面相分析</h3>
                <p className="text-sm text-gray-600">上传面部照片，AI智能解读您的面相</p>
              </div>
            </div>
          </Link>
        </div>
      </div>
    </>
  );
} 