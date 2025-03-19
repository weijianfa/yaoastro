import { Metadata } from "next";

export const metadata: Metadata = {
  title: "八字合婚 | 爻星阁",
  description: "通过八字命盘分析两人的五行相生相克关系，预测婚姻幸福指数与相处模式",
};

export default function BaziMarriagePage() {
  return (
    <div className="flex justify-center bg-gray-100 min-h-screen">
      <div className="w-full max-w-md flex flex-col min-h-screen bg-white pb-20 relative shadow-md">
        {/* 页面标题 */}
        <div className="bg-red-600 text-white py-4 px-4">
          <h1 className="text-xl font-bold text-center">八字合婚</h1>
        </div>
        
        {/* 页面内容 */}
        <div className="p-4">
          <div className="bg-red-50 rounded-lg p-4 mb-6">
            <h2 className="text-lg font-bold mb-2">八字合婚分析</h2>
            <p className="text-gray-700">
              通过分析双方八字命盘的五行相生相克关系，预测婚姻幸福指数与相处模式，为您的婚姻提供参考。
            </p>
          </div>
          
          {/* 输入区域 */}
          <div className="space-y-6 mb-6">
            <div className="border rounded-lg p-4">
              <h3 className="font-bold text-center mb-3">男方信息</h3>
              <div className="space-y-3">
                <div>
                  <label htmlFor="male_name" className="block text-sm font-medium text-gray-700 mb-1">
                    姓名
                  </label>
                  <input
                    type="text"
                    name="male_name"
                    id="male_name"
                    className="focus:ring-red-500 focus:border-red-500 block w-full rounded-md sm:text-sm border-gray-300 p-2 border"
                    placeholder="请输入男方姓名"
                  />
                </div>
                
                <div>
                  <label htmlFor="male_birthdate" className="block text-sm font-medium text-gray-700 mb-1">
                    出生日期
                  </label>
                  <input
                    type="date"
                    name="male_birthdate"
                    id="male_birthdate"
                    className="focus:ring-red-500 focus:border-red-500 block w-full rounded-md sm:text-sm border-gray-300 p-2 border"
                  />
                </div>
                
                <div>
                  <label htmlFor="male_birthtime" className="block text-sm font-medium text-gray-700 mb-1">
                    出生时间
                  </label>
                  <input
                    type="time"
                    name="male_birthtime"
                    id="male_birthtime"
                    className="focus:ring-red-500 focus:border-red-500 block w-full rounded-md sm:text-sm border-gray-300 p-2 border"
                  />
                </div>
              </div>
            </div>
            
            <div className="flex justify-center">
              <div className="w-8 h-8 rounded-full bg-red-100 flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
              </div>
            </div>
            
            <div className="border rounded-lg p-4">
              <h3 className="font-bold text-center mb-3">女方信息</h3>
              <div className="space-y-3">
                <div>
                  <label htmlFor="female_name" className="block text-sm font-medium text-gray-700 mb-1">
                    姓名
                  </label>
                  <input
                    type="text"
                    name="female_name"
                    id="female_name"
                    className="focus:ring-red-500 focus:border-red-500 block w-full rounded-md sm:text-sm border-gray-300 p-2 border"
                    placeholder="请输入女方姓名"
                  />
                </div>
                
                <div>
                  <label htmlFor="female_birthdate" className="block text-sm font-medium text-gray-700 mb-1">
                    出生日期
                  </label>
                  <input
                    type="date"
                    name="female_birthdate"
                    id="female_birthdate"
                    className="focus:ring-red-500 focus:border-red-500 block w-full rounded-md sm:text-sm border-gray-300 p-2 border"
                  />
                </div>
                
                <div>
                  <label htmlFor="female_birthtime" className="block text-sm font-medium text-gray-700 mb-1">
                    出生时间
                  </label>
                  <input
                    type="time"
                    name="female_birthtime"
                    id="female_birthtime"
                    className="focus:ring-red-500 focus:border-red-500 block w-full rounded-md sm:text-sm border-gray-300 p-2 border"
                  />
                </div>
              </div>
            </div>
          </div>
          
          {/* 分析内容 */}
          <div className="space-y-4 mb-6">
            <h3 className="font-bold text-lg">合婚分析内容</h3>
            
            <div className="flex items-start space-x-3">
              <div className="bg-red-100 p-2 rounded-full">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </div>
              <div>
                <h4 className="font-medium">五行相生相克</h4>
                <p className="text-sm text-gray-600">分析双方八字五行的相生相克关系，评估基础相容性</p>
              </div>
            </div>
            
            <div className="flex items-start space-x-3">
              <div className="bg-red-100 p-2 rounded-full">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
                </svg>
              </div>
              <div>
                <h4 className="font-medium">性格互补性</h4>
                <p className="text-sm text-gray-600">评估双方性格特点的互补与冲突情况</p>
              </div>
            </div>
            
            <div className="flex items-start space-x-3">
              <div className="bg-red-100 p-2 rounded-full">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <div>
                <h4 className="font-medium">婚姻宫位分析</h4>
                <p className="text-sm text-gray-600">分析双方命盘中的婚姻宫位，预测婚姻质量</p>
              </div>
            </div>
            
            <div className="flex items-start space-x-3">
              <div className="bg-red-100 p-2 rounded-full">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <div>
                <h4 className="font-medium">相处模式建议</h4>
                <p className="text-sm text-gray-600">根据分析结果，提供改善关系的实用建议</p>
              </div>
            </div>
          </div>
          
          {/* 服务套餐 */}
          <div className="border-t border-b py-4 my-6">
            <h3 className="font-bold text-center mb-3">选择服务套餐</h3>
            <div className="space-y-3">
              <div className="border rounded-lg p-3 hover:bg-red-50 cursor-pointer">
                <div className="flex justify-between items-center">
                  <p className="font-medium">基础合婚</p>
                  <p className="text-red-600 font-bold">¥98</p>
                </div>
                <p className="text-xs text-gray-500">包含基础八字合婚分析与相处建议</p>
              </div>
              
              <div className="border rounded-lg p-3 bg-red-50 border-red-300 cursor-pointer">
                <div className="flex justify-between items-center">
                  <p className="font-medium">详细合婚</p>
                  <p className="text-red-600 font-bold">¥198</p>
                </div>
                <p className="text-xs text-gray-500">包含详细八字合婚分析、相处建议与婚后生活预测</p>
                <span className="text-xs bg-red-500 text-white px-2 py-0.5 rounded-full">推荐</span>
              </div>
              
              <div className="border rounded-lg p-3 hover:bg-red-50 cursor-pointer">
                <div className="flex justify-between items-center">
                  <p className="font-medium">专家合婚</p>
                  <p className="text-red-600 font-bold">¥398</p>
                </div>
                <p className="text-xs text-gray-500">包含全面八字合婚分析与专家一对一解读</p>
              </div>
            </div>
          </div>
          
          <div className="mt-6 text-center">
            <button className="bg-red-600 text-white py-3 px-6 rounded-lg font-medium">
              开始合婚分析
            </button>
            <p className="text-xs text-gray-500 mt-2">
              分析结果将在24小时内发送至您的账户
            </p>
          </div>
        </div>
      </div>
    </div>
  );
} 