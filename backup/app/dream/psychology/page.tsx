'use client';

import Link from "next/link";

export default function PsychologyDreamPage() {
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
          <h1 className="text-xl font-bold">心理解梦</h1>
        </div>

        {/* 主要内容 */}
        <div className="p-4">
          <div className="bg-green-50 rounded-lg p-4 mb-6 border border-green-200">
            <h2 className="text-lg font-bold text-green-800 mb-2">心理解梦原理</h2>
            <p className="text-gray-700 text-sm">
              心理解梦基于弗洛伊德、荣格等心理学家的理论，认为梦境是潜意识的表达。通过分析梦境中的象征和情感，我们可以揭示您内心深处的想法、欲望和冲突，帮助您更好地理解自己，促进心理健康。
            </p>
          </div>

          {/* 表单区域 */}
          <div className="bg-white rounded-lg shadow-md p-4 mb-6">
            <h3 className="text-center text-lg font-bold text-green-800 mb-4">心理解梦分析</h3>
            
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">您的性别</label>
              <div className="flex space-x-2">
                <button className="flex-1 py-2 border border-green-300 rounded-md bg-green-50 text-green-800 font-medium hover:bg-green-100 transition duration-300">
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
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>
            
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">近期心情</label>
              <select className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500">
                <option value="">请选择您近期的心情状态</option>
                <option value="happy">愉快/开心</option>
                <option value="anxious">焦虑/担忧</option>
                <option value="sad">悲伤/沮丧</option>
                <option value="angry">愤怒/烦躁</option>
                <option value="confused">困惑/迷茫</option>
                <option value="stressed">压力大/疲惫</option>
                <option value="neutral">平静/一般</option>
              </select>
            </div>
            
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">梦境内容</label>
              <textarea 
                className="w-full p-2 border border-gray-300 rounded-md h-32 focus:outline-none focus:ring-2 focus:ring-green-500" 
                placeholder="请详细描述您的梦境内容，包括梦中的情感、人物、场景和事件..."
              ></textarea>
            </div>
            
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">梦境情绪</label>
              <div className="grid grid-cols-3 gap-2">
                <div className="flex items-center">
                  <input type="checkbox" id="fear" className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded" />
                  <label htmlFor="fear" className="ml-2 text-sm text-gray-700">恐惧</label>
                </div>
                <div className="flex items-center">
                  <input type="checkbox" id="joy" className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded" />
                  <label htmlFor="joy" className="ml-2 text-sm text-gray-700">喜悦</label>
                </div>
                <div className="flex items-center">
                  <input type="checkbox" id="sadness" className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded" />
                  <label htmlFor="sadness" className="ml-2 text-sm text-gray-700">悲伤</label>
                </div>
                <div className="flex items-center">
                  <input type="checkbox" id="anger" className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded" />
                  <label htmlFor="anger" className="ml-2 text-sm text-gray-700">愤怒</label>
                </div>
                <div className="flex items-center">
                  <input type="checkbox" id="confusion" className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded" />
                  <label htmlFor="confusion" className="ml-2 text-sm text-gray-700">困惑</label>
                </div>
                <div className="flex items-center">
                  <input type="checkbox" id="peace" className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded" />
                  <label htmlFor="peace" className="ml-2 text-sm text-gray-700">平静</label>
                </div>
              </div>
            </div>
            
            <button className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-4 rounded-md transition duration-300">
              开始心理解梦
            </button>
          </div>

          {/* 心理解梦特点 */}
          <div className="bg-green-50 rounded-lg p-4 mb-6">
            <h3 className="font-bold text-green-800 mb-2">心理解梦特点</h3>
            <ul className="text-sm text-gray-700 space-y-2">
              <li className="flex items-start">
                <span className="text-green-600 mr-2">•</span>
                <span>揭示潜意识中的情感和欲望</span>
              </li>
              <li className="flex items-start">
                <span className="text-green-600 mr-2">•</span>
                <span>分析梦境象征与个人经历的关联</span>
              </li>
              <li className="flex items-start">
                <span className="text-green-600 mr-2">•</span>
                <span>提供心理调适和自我认知的建议</span>
              </li>
              <li className="flex items-start">
                <span className="text-green-600 mr-2">•</span>
                <span>帮助解决内心冲突和情感困扰</span>
              </li>
            </ul>
          </div>

          {/* 常见梦境解析 */}
          <div className="mb-6">
            <h3 className="font-bold text-green-800 mb-2">常见梦境心理解析</h3>
            <div className="bg-white rounded-lg shadow-sm p-3 border border-gray-100">
              <div className="space-y-3">
                <div className="border-b border-gray-100 pb-2">
                  <h4 className="font-medium text-green-700 mb-1">梦见追逐</h4>
                  <p className="text-sm text-gray-600">可能表示您在现实生活中正在逃避某些问题或压力，建议面对并解决这些问题。</p>
                </div>
                <div className="border-b border-gray-100 pb-2">
                  <h4 className="font-medium text-green-700 mb-1">梦见飞翔</h4>
                  <p className="text-sm text-gray-600">通常象征自由感和超越限制的渴望，可能反映您希望摆脱现实约束的心理需求。</p>
                </div>
                <div className="border-b border-gray-100 pb-2">
                  <h4 className="font-medium text-green-700 mb-1">梦见考试</h4>
                  <p className="text-sm text-gray-600">反映对评价和失败的焦虑，可能与工作或生活中面临的挑战和压力有关。</p>
                </div>
                <div>
                  <h4 className="font-medium text-green-700 mb-1">梦见亲人离世</h4>
                  <p className="text-sm text-gray-600">可能表示对关系变化的恐惧或对亲人的关心，也可能象征生活中某个阶段的结束。</p>
                </div>
              </div>
            </div>
          </div>

          {/* 用户评价 */}
          <div className="mb-6">
            <h3 className="font-bold text-green-800 mb-2">用户好评</h3>
            <div className="bg-white rounded-lg shadow-sm p-3 mb-3 border border-gray-100">
              <div className="flex justify-between mb-1">
                <span className="font-medium">赵女士</span>
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 text-yellow-500">
                      <path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z" clipRule="evenodd" />
                    </svg>
                  ))}
                </div>
              </div>
              <p className="text-sm text-gray-600">心理解梦帮我理解了反复梦见前任的原因，原来是我内心还有未解决的情感问题。解梦师的建议很有帮助。</p>
            </div>
            <div className="bg-white rounded-lg shadow-sm p-3 border border-gray-100">
              <div className="flex justify-between mb-1">
                <span className="font-medium">吴先生</span>
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 text-yellow-500">
                      <path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z" clipRule="evenodd" />
                    </svg>
                  ))}
                </div>
              </div>
              <p className="text-sm text-gray-600">我经常做噩梦，通过心理解梦分析后，了解到这与我的工作压力有关。按照建议调整后，睡眠质量明显改善。</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 