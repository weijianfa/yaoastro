'use client';

import Link from "next/link";

export default function BaziDreamPage() {
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
          <h1 className="text-xl font-bold">八字解梦</h1>
        </div>

        {/* 主要内容 */}
        <div className="p-4">
          <div className="bg-purple-50 rounded-lg p-4 mb-6 border border-purple-200">
            <h2 className="text-lg font-bold text-purple-800 mb-2">八字解梦原理</h2>
            <p className="text-gray-700 text-sm">
              八字解梦是基于中国传统命理学的解梦方法，通过分析您的出生八字与梦境发生时的天干地支关系，揭示梦境背后的命运信息。八字解梦能够从命理角度解读梦境预示的吉凶祸福，为您提供更全面的人生指引。
            </p>
          </div>

          {/* 表单区域 */}
          <div className="bg-white rounded-lg shadow-md p-4 mb-6">
            <h3 className="text-center text-lg font-bold text-purple-800 mb-4">八字解梦分析</h3>
            
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">出生日期</label>
              <input 
                type="date" 
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>
            
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">出生时间</label>
              <select className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500">
                <option value="">请选择时辰</option>
                <option value="子时">子时 (23:00-01:00)</option>
                <option value="丑时">丑时 (01:00-03:00)</option>
                <option value="寅时">寅时 (03:00-05:00)</option>
                <option value="卯时">卯时 (05:00-07:00)</option>
                <option value="辰时">辰时 (07:00-09:00)</option>
                <option value="巳时">巳时 (09:00-11:00)</option>
                <option value="午时">午时 (11:00-13:00)</option>
                <option value="未时">未时 (13:00-15:00)</option>
                <option value="申时">申时 (15:00-17:00)</option>
                <option value="酉时">酉时 (17:00-19:00)</option>
                <option value="戌时">戌时 (19:00-21:00)</option>
                <option value="亥时">亥时 (21:00-23:00)</option>
              </select>
            </div>
            
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">梦境日期</label>
              <input 
                type="date" 
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>
            
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">梦境时间</label>
              <select className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500">
                <option value="">请选择时辰</option>
                <option value="子时">子时 (23:00-01:00)</option>
                <option value="丑时">丑时 (01:00-03:00)</option>
                <option value="寅时">寅时 (03:00-05:00)</option>
                <option value="卯时">卯时 (05:00-07:00)</option>
                <option value="辰时">辰时 (07:00-09:00)</option>
                <option value="巳时">巳时 (09:00-11:00)</option>
                <option value="午时">午时 (11:00-13:00)</option>
                <option value="未时">未时 (13:00-15:00)</option>
                <option value="申时">申时 (15:00-17:00)</option>
                <option value="酉时">酉时 (17:00-19:00)</option>
                <option value="戌时">戌时 (19:00-21:00)</option>
                <option value="亥时">亥时 (21:00-23:00)</option>
              </select>
            </div>
            
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">梦境内容</label>
              <textarea 
                className="w-full p-2 border border-gray-300 rounded-md h-32 focus:outline-none focus:ring-2 focus:ring-purple-500" 
                placeholder="请详细描述您的梦境内容..."
              ></textarea>
            </div>
            
            <button className="w-full bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-3 px-4 rounded-md transition duration-300">
              开始八字解梦
            </button>
          </div>

          {/* 服务说明 */}
          <div className="bg-purple-50 rounded-lg p-4 mb-6">
            <h3 className="font-bold text-purple-800 mb-2">八字解梦服务说明</h3>
            <ul className="text-sm text-gray-700 space-y-2">
              <li className="flex items-start">
                <span className="text-purple-600 mr-2">•</span>
                <span>详细分析您的八字与梦境的关联</span>
              </li>
              <li className="flex items-start">
                <span className="text-purple-600 mr-2">•</span>
                <span>解读梦境中的吉凶预兆</span>
              </li>
              <li className="flex items-start">
                <span className="text-purple-600 mr-2">•</span>
                <span>提供化解不良梦境的方法</span>
              </li>
              <li className="flex items-start">
                <span className="text-purple-600 mr-2">•</span>
                <span>分析梦境与近期运势的关系</span>
              </li>
            </ul>
          </div>

          {/* 用户评价 */}
          <div className="mb-6">
            <h3 className="font-bold text-purple-800 mb-2">用户好评</h3>
            <div className="bg-white rounded-lg shadow-sm p-3 mb-3 border border-gray-100">
              <div className="flex justify-between mb-1">
                <span className="font-medium">张先生</span>
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 text-yellow-500">
                      <path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z" clipRule="evenodd" />
                    </svg>
                  ))}
                </div>
              </div>
              <p className="text-sm text-gray-600">梦见自己在高处坠落，八字解梦分析说这与我最近的事业变动有关，建议我稳健发展，果然近期遇到了职位调整的机会。</p>
            </div>
            <div className="bg-white rounded-lg shadow-sm p-3 border border-gray-100">
              <div className="flex justify-between mb-1">
                <span className="font-medium">李女士</span>
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 text-yellow-500">
                      <path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z" clipRule="evenodd" />
                    </svg>
                  ))}
                </div>
              </div>
              <p className="text-sm text-gray-600">通过八字解梦分析了我频繁梦见水的含义，原来与我的财运相关。按照建议调整了投资方向，效果很明显。</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 