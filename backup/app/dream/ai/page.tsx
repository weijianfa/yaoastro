'use client';

import Link from "next/link";

export default function AIDreamPage() {
  return (
    <div className="flex justify-center bg-gray-100">
      <div className="w-full max-w-md bg-white min-h-screen">
        {/* 顶部导航 */}
        <div className="bg-purple-700 text-white p-4 flex items-center">
          <Link href="/dream" className="mr-2">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
            </svg>
          </Link>
          <h1 className="text-xl font-bold">AI智能解梦</h1>
        </div>

        {/* 主要内容 */}
        <div className="p-4">
          <div className="bg-blue-50 rounded-lg p-4 mb-6 border border-blue-200">
            <h2 className="text-lg font-bold text-blue-800 mb-2">AI解梦技术</h2>
            <p className="text-gray-700 text-sm">
              我们的AI解梦系统基于大数据和深度学习技术，通过分析数百万条梦境案例，能够快速准确地解读您的梦境含义。AI解梦不受时间地点限制，随时随地为您提供专业的梦境分析服务。
            </p>
          </div>

          {/* 表单区域 */}
          <div className="bg-white rounded-lg shadow-md p-4 mb-6">
            <h3 className="text-center text-lg font-bold text-blue-800 mb-4">AI智能解梦</h3>
            
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">您的性别</label>
              <div className="flex space-x-2">
                <button className="flex-1 py-2 border border-blue-300 rounded-md bg-blue-50 text-blue-800 font-medium hover:bg-blue-100 transition duration-300">
                  男性
                </button>
                <button className="flex-1 py-2 border border-gray-300 rounded-md text-gray-700 font-medium hover:bg-gray-50 transition duration-300">
                  女性
                </button>
              </div>
            </div>
            
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">您的年龄</label>
              <input 
                type="number" 
                placeholder="请输入您的年龄" 
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">梦境日期</label>
              <input 
                type="date" 
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">梦境内容</label>
              <textarea 
                className="w-full p-2 border border-gray-300 rounded-md h-32 focus:outline-none focus:ring-2 focus:ring-blue-500" 
                placeholder="请详细描述您的梦境内容，越详细AI分析越准确..."
              ></textarea>
            </div>
            
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">分析维度</label>
              <div className="grid grid-cols-2 gap-2">
                <div className="flex items-center">
                  <input type="checkbox" id="psychological" className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded" defaultChecked />
                  <label htmlFor="psychological" className="ml-2 text-sm text-gray-700">心理分析</label>
                </div>
                <div className="flex items-center">
                  <input type="checkbox" id="symbolic" className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded" defaultChecked />
                  <label htmlFor="symbolic" className="ml-2 text-sm text-gray-700">象征意义</label>
                </div>
                <div className="flex items-center">
                  <input type="checkbox" id="fortune" className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded" defaultChecked />
                  <label htmlFor="fortune" className="ml-2 text-sm text-gray-700">运势预测</label>
                </div>
                <div className="flex items-center">
                  <input type="checkbox" id="guidance" className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded" defaultChecked />
                  <label htmlFor="guidance" className="ml-2 text-sm text-gray-700">行动指导</label>
                </div>
              </div>
            </div>
            
            <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-md transition duration-300">
              开始AI解梦
            </button>
          </div>

          {/* AI解梦优势 */}
          <div className="bg-blue-50 rounded-lg p-4 mb-6">
            <h3 className="font-bold text-blue-800 mb-2">AI解梦优势</h3>
            <ul className="text-sm text-gray-700 space-y-2">
              <li className="flex items-start">
                <span className="text-blue-600 mr-2">•</span>
                <span>秒级响应，即时获取解梦结果</span>
              </li>
              <li className="flex items-start">
                <span className="text-blue-600 mr-2">•</span>
                <span>多维度分析，全方位解读梦境</span>
              </li>
              <li className="flex items-start">
                <span className="text-blue-600 mr-2">•</span>
                <span>持续学习进化，解读精度不断提升</span>
              </li>
              <li className="flex items-start">
                <span className="text-blue-600 mr-2">•</span>
                <span>个性化解读，针对您的具体情况</span>
              </li>
            </ul>
          </div>

          {/* 用户评价 */}
          <div className="mb-6">
            <h3 className="font-bold text-blue-800 mb-2">用户好评</h3>
            <div className="bg-white rounded-lg shadow-sm p-3 mb-3 border border-gray-100">
              <div className="flex justify-between mb-1">
                <span className="font-medium">王先生</span>
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 text-yellow-500">
                      <path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z" clipRule="evenodd" />
                    </svg>
                  ))}
                </div>
              </div>
              <p className="text-sm text-gray-600">AI解梦太神奇了！我梦见了一条蛇，AI分析说这与我近期的工作压力有关，并给出了缓解方法，非常准确！</p>
            </div>
            <div className="bg-white rounded-lg shadow-sm p-3 border border-gray-100">
              <div className="flex justify-between mb-1">
                <span className="font-medium">陈女士</span>
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 text-yellow-500">
                      <path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z" clipRule="evenodd" />
                    </svg>
                  ))}
                </div>
              </div>
              <p className="text-sm text-gray-600">比传统解梦快多了，而且分析很全面。我梦见自己飞翔，AI不仅解释了象征意义，还分析了我的潜意识想法，很有启发。</p>
            </div>
          </div>

          {/* 热门解梦 */}
          <div className="mb-6">
            <h3 className="font-bold text-blue-800 mb-2">热门AI解梦</h3>
            <div className="bg-white rounded-lg shadow-sm p-3 border border-gray-100">
              <ul className="text-sm text-gray-700 divide-y divide-gray-100">
                <li className="py-2 flex justify-between">
                  <span>梦见考试</span>
                  <span className="text-gray-500">2,341次</span>
                </li>
                <li className="py-2 flex justify-between">
                  <span>梦见死亡</span>
                  <span className="text-gray-500">1,982次</span>
                </li>
                <li className="py-2 flex justify-between">
                  <span>梦见前任</span>
                  <span className="text-gray-500">1,756次</span>
                </li>
                <li className="py-2 flex justify-between">
                  <span>梦见蛇</span>
                  <span className="text-gray-500">1,543次</span>
                </li>
                <li className="py-2 flex justify-between">
                  <span>梦见怀孕</span>
                  <span className="text-gray-500">1,289次</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 