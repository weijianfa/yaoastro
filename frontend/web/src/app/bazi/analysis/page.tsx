import { Metadata } from "next";

export const metadata: Metadata = {
  title: "八字分析 | 爻星阁",
  description: "专业八字命盘分析，揭示您的性格特点、人生走向、事业财运与感情运势",
};

export default function BaziAnalysisPage() {
  return (
    <div className="flex justify-center bg-gray-100 min-h-screen">
      <div className="w-full max-w-md flex flex-col min-h-screen bg-white pb-20 relative shadow-md">
        {/* 页面标题 */}
        <div className="bg-blue-700 text-white py-4 px-4">
          <h1 className="text-xl font-bold text-center">八字分析</h1>
        </div>
        
        {/* 页面内容 */}
        <div className="p-4">
          <div className="bg-blue-50 rounded-lg p-4 mb-6">
            <h2 className="text-lg font-bold mb-2">专业八字命盘分析</h2>
            <p className="text-gray-700">
              通过分析您的出生年月日时所形成的八字命盘，揭示您的性格特点、人生走向、事业财运与感情运势。
            </p>
          </div>
          
          {/* 输入区域 */}
          <div className="border rounded-lg p-4 mb-6">
            <h3 className="font-bold text-center mb-3">个人信息</h3>
            <div className="space-y-3">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                  姓名
                </label>
                <input
                  type="text"
                  name="name"
                  id="name"
                  className="focus:ring-blue-500 focus:border-blue-500 block w-full rounded-md sm:text-sm border-gray-300 p-2 border"
                  placeholder="请输入您的姓名"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  性别
                </label>
                <div className="grid grid-cols-2 gap-3">
                  <div className="border rounded-lg p-2 text-center bg-blue-50 border-blue-200 cursor-pointer">
                    <p className="text-sm font-medium">男</p>
                  </div>
                  <div className="border rounded-lg p-2 text-center hover:bg-blue-50 cursor-pointer">
                    <p className="text-sm font-medium">女</p>
                  </div>
                </div>
              </div>
              
              <div>
                <label htmlFor="birthdate" className="block text-sm font-medium text-gray-700 mb-1">
                  出生日期
                </label>
                <input
                  type="date"
                  name="birthdate"
                  id="birthdate"
                  className="focus:ring-blue-500 focus:border-blue-500 block w-full rounded-md sm:text-sm border-gray-300 p-2 border"
                />
              </div>
              
              <div>
                <label htmlFor="birthtime" className="block text-sm font-medium text-gray-700 mb-1">
                  出生时间
                </label>
                <input
                  type="time"
                  name="birthtime"
                  id="birthtime"
                  className="focus:ring-blue-500 focus:border-blue-500 block w-full rounded-md sm:text-sm border-gray-300 p-2 border"
                />
              </div>
              
              <div>
                <label htmlFor="birthplace" className="block text-sm font-medium text-gray-700 mb-1">
                  出生地点
                </label>
                <input
                  type="text"
                  name="birthplace"
                  id="birthplace"
                  className="focus:ring-blue-500 focus:border-blue-500 block w-full rounded-md sm:text-sm border-gray-300 p-2 border"
                  placeholder="请输入出生地点"
                />
              </div>
            </div>
          </div>
          
          {/* 分析内容 */}
          <div className="space-y-4 mb-6">
            <h3 className="font-bold text-lg">八字分析内容</h3>
            
            <div className="flex items-start space-x-3">
              <div className="bg-blue-100 p-2 rounded-full">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
              <div>
                <h4 className="font-medium">性格特质分析</h4>
                <p className="text-sm text-gray-600">解读您的性格特点、思维方式与情感倾向</p>
              </div>
            </div>
            
            <div className="flex items-start space-x-3">
              <div className="bg-blue-100 p-2 rounded-full">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <div>
                <h4 className="font-medium">事业财运分析</h4>
                <p className="text-sm text-gray-600">分析您的事业发展方向、财运高低与适合行业</p>
              </div>
            </div>
            
            <div className="flex items-start space-x-3">
              <div className="bg-blue-100 p-2 rounded-full">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </div>
              <div>
                <h4 className="font-medium">感情婚姻分析</h4>
                <p className="text-sm text-gray-600">解读您的感情态度、婚姻质量与理想伴侣类型</p>
              </div>
            </div>
            
            <div className="flex items-start space-x-3">
              <div className="bg-blue-100 p-2 rounded-full">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <div>
                <h4 className="font-medium">健康状况分析</h4>
                <p className="text-sm text-gray-600">评估您的体质特点与需要注意的健康问题</p>
              </div>
            </div>
            
            <div className="flex items-start space-x-3">
              <div className="bg-blue-100 p-2 rounded-full">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <div>
                <h4 className="font-medium">人生转折点预测</h4>
                <p className="text-sm text-gray-600">预测您人生中的重要转折点与机遇挑战</p>
              </div>
            </div>
          </div>
          
          {/* 服务套餐 */}
          <div className="border-t border-b py-4 my-6">
            <h3 className="font-bold text-center mb-3">选择服务套餐</h3>
            <div className="space-y-3">
              <div className="border rounded-lg p-3 hover:bg-blue-50 cursor-pointer">
                <div className="flex justify-between items-center">
                  <p className="font-medium">基础分析</p>
                  <p className="text-blue-600 font-bold">¥88</p>
                </div>
                <p className="text-xs text-gray-500">包含性格特质与事业财运分析</p>
              </div>
              
              <div className="border rounded-lg p-3 bg-blue-50 border-blue-300 cursor-pointer">
                <div className="flex justify-between items-center">
                  <p className="font-medium">全面分析</p>
                  <p className="text-blue-600 font-bold">¥168</p>
                </div>
                <p className="text-xs text-gray-500">包含全部五项分析内容，附赠个人发展建议</p>
                <span className="text-xs bg-blue-500 text-white px-2 py-0.5 rounded-full">推荐</span>
              </div>
              
              <div className="border rounded-lg p-3 hover:bg-blue-50 cursor-pointer">
                <div className="flex justify-between items-center">
                  <p className="font-medium">专家解读</p>
                  <p className="text-blue-600 font-bold">¥328</p>
                </div>
                <p className="text-xs text-gray-500">全面分析+专家在线1对1解读，提供个性化指导</p>
              </div>
            </div>
          </div>
          
          <div className="mt-6 text-center">
            <button className="bg-blue-700 text-white py-3 px-6 rounded-lg font-medium">
              开始八字分析
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