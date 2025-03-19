'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function Fortune2025DreamPage() {
  const [dreamContent, setDreamContent] = useState('');
  const [birthDate, setBirthDate] = useState('');
  const [birthTime, setBirthTime] = useState('');
  const [focusArea, setFocusArea] = useState('career');
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // 提交表单逻辑
    console.log('提交2025运势预测请求');
  };
  
  return (
    <div className="flex justify-center bg-gray-100">
      <div className="w-full max-w-md bg-white min-h-screen">
        {/* 顶部导航 */}
        <div className="bg-orange-600 text-white p-4">
          <h1 className="text-xl font-bold text-center">2025运势解梦</h1>
        </div>

        {/* 主要内容 */}
        <div className="p-4">
          {/* 解梦表单 */}
          <div className="bg-white rounded-lg shadow-md p-4 mb-6">
            <h2 className="text-center text-lg font-bold text-orange-700 mb-4">2025年运势预测</h2>
            
            <div className="mb-4">
              <p className="text-sm text-gray-700 mb-4">
                通过分析您的出生信息和梦境内容，预测2025年的运势走向，为您提供未来一年的发展指引。
              </p>
              
              <div className="grid grid-cols-2 gap-3 mb-4">
                <div className="col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">出生日期</label>
                  <input 
                    type="date" 
                    className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 text-sm"
                  />
                </div>
                
                <div className="col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">出生时间</label>
                  <select className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 text-sm">
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
                  <label className="block text-sm font-medium text-gray-700 mb-1">关注领域</label>
                  <div className="grid grid-cols-2 gap-2">
                    <button 
                      className="py-2 border border-orange-300 rounded-md bg-orange-50 text-orange-700 font-medium hover:bg-orange-100 transition duration-300 text-sm"
                    >
                      事业运势
                    </button>
                    <button 
                      className="py-2 border border-gray-300 rounded-md text-gray-700 font-medium hover:bg-gray-50 transition duration-300 text-sm"
                    >
                      财富运势
                    </button>
                    <button 
                      className="py-2 border border-gray-300 rounded-md text-gray-700 font-medium hover:bg-gray-50 transition duration-300 text-sm"
                    >
                      感情运势
                    </button>
                    <button 
                      className="py-2 border border-gray-300 rounded-md text-gray-700 font-medium hover:bg-gray-50 transition duration-300 text-sm"
                    >
                      健康运势
                    </button>
                  </div>
                </div>
              </div>
              
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">梦境内容</label>
                <textarea 
                  className="w-full p-2 border border-gray-300 rounded-md h-32 focus:outline-none focus:ring-2 focus:ring-orange-500" 
                  placeholder="请详细描述您最近的梦境内容，这将有助于我们分析2025年的运势..."
                ></textarea>
              </div>
              
              <button className="w-full bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 px-4 rounded-md transition duration-300">
                预测2025运势
              </button>
            </div>
          </div>

          {/* 2025运势概述 */}
          <div className="bg-orange-50 rounded-lg p-4 mb-6 border border-orange-200">
            <h3 className="font-bold text-orange-800 mb-2">2025运势概述</h3>
            <p className="text-sm text-gray-700 mb-3">
              2025年是龙年，整体运势呈现上升趋势。根据古代梦境学与现代心理学相结合的分析方法，通过解析您的梦境内容，可以预测未来一年的运势走向。
            </p>
            <div className="grid grid-cols-2 gap-2 text-sm">
              <div className="bg-white p-2 rounded border border-orange-100">
                <h4 className="font-medium text-orange-700">事业运势</h4>
                <p className="text-xs text-gray-600">稳步上升，有望获得晋升</p>
              </div>
              <div className="bg-white p-2 rounded border border-orange-100">
                <h4 className="font-medium text-orange-700">财富运势</h4>
                <p className="text-xs text-gray-600">财源广进，投资有回报</p>
              </div>
              <div className="bg-white p-2 rounded border border-orange-100">
                <h4 className="font-medium text-orange-700">感情运势</h4>
                <p className="text-xs text-gray-600">桃花运旺，有望遇到良缘</p>
              </div>
              <div className="bg-white p-2 rounded border border-orange-100">
                <h4 className="font-medium text-orange-700">健康运势</h4>
                <p className="text-xs text-gray-600">注意休息，避免过度劳累</p>
              </div>
            </div>
          </div>

          {/* 用户好评 */}
          <div className="mb-6">
            <h3 className="font-bold text-orange-800 mb-2">用户好评</h3>
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
              <p className="text-sm text-gray-600">去年预测我2024年事业有变动，果然在3月份获得了晋升机会。今年继续预测2025年运势，期待好结果！</p>
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
              <p className="text-sm text-gray-600">预测的2024年感情运势非常准确，按照建议调整了社交圈，现在已经有了稳定的恋情。</p>
            </div>
          </div>

          {/* 2025年吉凶月份预测 */}
          <div className="mb-6">
            <h3 className="font-bold text-orange-800 mb-2">2025年吉凶月份预测</h3>
            <div className="bg-white rounded-lg shadow-sm p-3 border border-gray-100">
              <div className="grid grid-cols-2 gap-2 text-sm">
                <div>
                  <h4 className="font-medium text-green-600 mb-1">吉月</h4>
                  <ul className="text-xs text-gray-700 space-y-1">
                    <li className="flex items-center">
                      <span className="w-4 h-4 bg-green-100 rounded-full flex items-center justify-center text-green-600 mr-1">1</span>
                      <span>一月：财运亨通</span>
                    </li>
                    <li className="flex items-center">
                      <span className="w-4 h-4 bg-green-100 rounded-full flex items-center justify-center text-green-600 mr-1">4</span>
                      <span>四月：贵人相助</span>
                    </li>
                    <li className="flex items-center">
                      <span className="w-4 h-4 bg-green-100 rounded-full flex items-center justify-center text-green-600 mr-1">7</span>
                      <span>七月：事业有成</span>
                    </li>
                    <li className="flex items-center">
                      <span className="w-4 h-4 bg-green-100 rounded-full flex items-center justify-center text-green-600 mr-1">10</span>
                      <span>十月：桃花盛开</span>
                    </li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-medium text-red-600 mb-1">凶月</h4>
                  <ul className="text-xs text-gray-700 space-y-1">
                    <li className="flex items-center">
                      <span className="w-4 h-4 bg-red-100 rounded-full flex items-center justify-center text-red-600 mr-1">3</span>
                      <span>三月：健康需注意</span>
                    </li>
                    <li className="flex items-center">
                      <span className="w-4 h-4 bg-red-100 rounded-full flex items-center justify-center text-red-600 mr-1">6</span>
                      <span>六月：财务有损</span>
                    </li>
                    <li className="flex items-center">
                      <span className="w-4 h-4 bg-red-100 rounded-full flex items-center justify-center text-red-600 mr-1">9</span>
                      <span>九月：人际关系紧张</span>
                    </li>
                    <li className="flex items-center">
                      <span className="w-4 h-4 bg-red-100 rounded-full flex items-center justify-center text-red-600 mr-1">12</span>
                      <span>十二月：出行不利</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 