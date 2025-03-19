'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function DreamPage() {
  const [dreamContent, setDreamContent] = useState('');
  const [gender, setGender] = useState('男');
  const [age, setAge] = useState('');
  const [zodiac, setZodiac] = useState('');
  const [dreamTime, setDreamTime] = useState('');
  const [dreamDate, setDreamDate] = useState('');
  
  const zodiacOptions = ['鼠', '牛', '虎', '兔', '龙', '蛇', '马', '羊', '猴', '鸡', '狗', '猪'];
  const timeOptions = ['子时', '丑时', '寅时', '卯时', '辰时', '巳时', '午时', '未时', '申时', '酉时', '戌时', '亥时'];
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // 提交表单逻辑
    console.log('提交解梦请求');
  };
  
  return (
    <div className="flex justify-center bg-gray-100">
      <div className="w-full max-w-md bg-white min-h-screen">
        {/* 顶部导航 */}
        <div className="bg-purple-700 text-white p-4">
          <h1 className="text-xl font-bold text-center">大师解梦</h1>
        </div>

        {/* 主要内容 */}
        <div className="p-4">
          {/* 解梦表单 */}
          <div className="bg-white rounded-lg shadow-md p-4 mb-6">
            <h2 className="text-center text-lg font-bold text-purple-800 mb-4">智能解梦分析大师</h2>
            
            <div className="grid grid-cols-2 gap-3 mb-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">性别</label>
                <div className="flex space-x-2">
                  <button className="flex-1 py-2 border border-purple-300 rounded-md bg-purple-50 text-purple-800 font-medium hover:bg-purple-100 transition duration-300 text-sm">
                    男
                  </button>
                  <button className="flex-1 py-2 border border-gray-300 rounded-md text-gray-700 font-medium hover:bg-gray-50 transition duration-300 text-sm">
                    女
                  </button>
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">年龄</label>
                <input 
                  type="number" 
                  placeholder="请输入年龄" 
                  className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 text-sm"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">生肖</label>
                <select className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 text-sm">
                  <option value="">请选择</option>
                  <option value="鼠">鼠</option>
                  <option value="牛">牛</option>
                  <option value="虎">虎</option>
                  <option value="兔">兔</option>
                  <option value="龙">龙</option>
                  <option value="蛇">蛇</option>
                  <option value="马">马</option>
                  <option value="羊">羊</option>
                  <option value="猴">猴</option>
                  <option value="鸡">鸡</option>
                  <option value="狗">狗</option>
                  <option value="猪">猪</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">梦境时间</label>
                <select className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 text-sm">
                  <option value="">请选择</option>
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
              
              <div className="col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">日期</label>
                <input 
                  type="date" 
                  className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 text-sm"
                />
              </div>
            </div>
            
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">梦境内容</label>
              <textarea 
                className="w-full p-2 border border-gray-300 rounded-md h-32 focus:outline-none focus:ring-2 focus:ring-purple-500" 
                placeholder="请详细描述您的梦境内容..."
              ></textarea>
            </div>
            
            <button className="w-full bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-3 px-4 rounded-md transition duration-300">
              开始解梦
            </button>
          </div>

          {/* 解梦说明 */}
          <div className="bg-purple-50 rounded-lg p-4 mb-6 border border-purple-200">
            <h3 className="font-bold text-purple-800 mb-2">解梦说明</h3>
            <p className="text-sm text-gray-700">
              梦境是人类潜意识的表达，通过专业解梦可以揭示梦境背后隐藏的信息和预兆。请尽可能详细地描述您的梦境内容，包括梦中的人物、场景、情感和事件，这将有助于我们提供更准确的解梦结果。
            </p>
          </div>

          {/* 解梦分类 */}
          <h3 className="font-bold text-purple-800 mb-3">解梦方式</h3>
          <div className="grid grid-cols-2 gap-3 mb-6">
            <Link href="/dream/bazi" className="block">
              <div className="bg-gradient-to-br from-red-500 to-red-600 rounded-lg p-4 text-white h-full">
                <div className="flex items-center justify-center mb-2">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 14.25v2.25m3-4.5v4.5m3-6.75v6.75m3-9v9M6 20.25h12A2.25 2.25 0 0020.25 18V6A2.25 2.25 0 0018 3.75H6A2.25 2.25 0 003.75 6v12A2.25 2.25 0 006 20.25z" />
                  </svg>
                </div>
                <h4 className="font-bold text-center mb-1">八字解梦</h4>
                <p className="text-xs text-white text-opacity-90 text-center">
                  结合八字命理，分析梦境与命运关系
                </p>
              </div>
            </Link>
            
            <Link href="/dream/psychology" className="block">
              <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-lg p-4 text-white h-full">
                <div className="flex items-center justify-center mb-2">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 12.75c1.148 0 2.278.08 3.383.237 1.037.146 1.866.966 1.866 2.013 0 3.728-2.35 6.75-5.25 6.75S6.75 18.728 6.75 15c0-1.046.83-1.867 1.866-2.013A24.204 24.204 0 0112 12.75zm0 0c2.883 0 5.647.508 8.207 1.44a23.91 23.91 0 01-1.152 6.06M12 12.75c-2.883 0-5.647.508-8.208 1.44.125 2.104.52 4.136 1.153 6.06M12 12.75a2.25 2.25 0 002.248-2.354M12 12.75a2.25 2.25 0 01-2.248-2.354M12 8.25c.995 0 1.971-.08 2.922-.236.403-.066.74-.358.795-.762a3.778 3.778 0 00-.399-2.25M12 8.25c-.995 0-1.97-.08-2.922-.236-.402-.066-.74-.358-.795-.762a3.734 3.734 0 01.4-2.253M12 8.25a2.25 2.25 0 00-2.248 2.146M12 8.25a2.25 2.25 0 012.248 2.146M8.683 5a6.032 6.032 0 01-1.155-1.002c.07-.63.27-1.222.574-1.747m.581 2.749A3.75 3.75 0 0115.318 5m0 0c.427-.283.815-.62 1.155-.999a4.471 4.471 0 00-.575-1.752M4.921 6a24.048 24.048 0 00-.392 3.314c1.668.546 3.416.914 5.223 1.082M19.08 6c.205 1.08.337 2.187.392 3.314a23.882 23.882 0 01-5.223 1.082" />
                  </svg>
                </div>
                <h4 className="font-bold text-center mb-1">心理解梦</h4>
                <p className="text-xs text-white text-opacity-90 text-center">
                  基于心理学理论，解析潜意识信息
                </p>
              </div>
            </Link>
            
            <Link href="/dream/ai" className="block">
              <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg p-4 text-white h-full">
                <div className="flex items-center justify-center mb-2">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456zM16.894 20.567L16.5 21.75l-.394-1.183a2.25 2.25 0 00-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 001.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 001.423 1.423l1.183.394-1.183.394a2.25 2.25 0 00-1.423 1.423z" />
                  </svg>
                </div>
                <h4 className="font-bold text-center mb-1">AI智能解梦</h4>
                <p className="text-xs text-white text-opacity-90 text-center">
                  运用AI技术，快速解析梦境含义
                </p>
              </div>
            </Link>
            
            <Link href="/dream/2025" className="block">
              <div className="bg-gradient-to-br from-orange-500 to-orange-600 rounded-lg p-4 text-white h-full">
                <div className="flex items-center justify-center mb-2">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" />
                  </svg>
                </div>
                <h4 className="font-bold text-center mb-1">2025运势解梦</h4>
                <p className="text-xs text-white text-opacity-90 text-center">
                  预测2025年运势，提供未来指引
                </p>
              </div>
            </Link>
          </div>

          {/* 用户好评 */}
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
              <p className="text-sm text-gray-600">梦见自己在高处坠落，解梦分析说这与我最近的事业变动有关，建议我稳健发展，果然近期遇到了职位调整的机会。</p>
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
              <p className="text-sm text-gray-600">通过解梦分析了我频繁梦见水的含义，原来与我的财运相关。按照建议调整了投资方向，效果很明显。</p>
            </div>
          </div>

          {/* 热门解梦 */}
          <div className="mb-6">
            <h3 className="font-bold text-purple-800 mb-2">热门解梦</h3>
            <div className="bg-white rounded-lg shadow-sm p-3 border border-gray-100">
              <ul className="text-sm text-gray-700 divide-y divide-gray-100">
                <li className="py-2 flex justify-between">
                  <span>梦见蛇是什么意思？</span>
                  <span className="text-gray-500">2小时前</span>
                </li>
                <li className="py-2 flex justify-between">
                  <span>梦见死去的亲人还活着</span>
                  <span className="text-gray-500">4小时前</span>
                </li>
                <li className="py-2 flex justify-between">
                  <span>梦见自己怀孕了预示什么</span>
                  <span className="text-gray-500">昨天</span>
                </li>
                <li className="py-2 flex justify-between">
                  <span>梦见考试没考好是什么征兆</span>
                  <span className="text-gray-500">昨天</span>
                </li>
                <li className="py-2 flex justify-between">
                  <span>梦见掉牙齿是什么预兆</span>
                  <span className="text-gray-500">前天</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 