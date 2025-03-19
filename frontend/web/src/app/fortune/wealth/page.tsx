import { Metadata } from "next";

export const metadata: Metadata = {
  title: "财运分析 | 爻星阁",
  description: "专业财运分析，了解财富机遇与挑战，获取个性化理财建议",
};

export default function FortuneWealthPage() {
  return (
    <div className="flex justify-center bg-gray-100 min-h-screen">
      <div className="w-full max-w-md flex flex-col min-h-screen bg-white pb-20 relative shadow-md">
        {/* 页面标题 */}
        <div className="bg-yellow-600 text-white py-4 px-4">
          <h1 className="text-xl font-bold text-center">财运分析</h1>
        </div>
        
        {/* 页面内容 */}
        <div className="p-4">
          <div className="bg-yellow-50 rounded-lg p-4 mb-6">
            <h2 className="text-lg font-bold mb-2">财运全面解析</h2>
            <p className="text-gray-700">
              通过八字命理与现代财富管理理念相结合，为您提供全面的财运分析与指导。
            </p>
          </div>
          
          <div className="space-y-4 mb-6">
            <h3 className="font-bold text-lg">我们的财运分析包括：</h3>
            
            <div className="flex items-start space-x-3">
              <div className="bg-yellow-100 p-2 rounded-full">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-yellow-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div>
                <h4 className="font-medium">财运周期分析</h4>
                <p className="text-sm text-gray-600">了解您的财富高峰期与低谷期，把握最佳投资时机</p>
              </div>
            </div>
            
            <div className="flex items-start space-x-3">
              <div className="bg-yellow-100 p-2 rounded-full">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-yellow-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <div>
                <h4 className="font-medium">财富来源分析</h4>
                <p className="text-sm text-gray-600">揭示您最适合的财富积累方式与行业</p>
              </div>
            </div>
            
            <div className="flex items-start space-x-3">
              <div className="bg-yellow-100 p-2 rounded-full">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-yellow-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div>
                <h4 className="font-medium">财运风险预警</h4>
                <p className="text-sm text-gray-600">预测潜在财务风险，提供规避建议</p>
              </div>
            </div>
            
            <div className="flex items-start space-x-3">
              <div className="bg-yellow-100 p-2 rounded-full">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-yellow-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                </svg>
              </div>
              <div>
                <h4 className="font-medium">财富增长策略</h4>
                <p className="text-sm text-gray-600">根据您的八字特点，提供个性化的财富增长建议</p>
              </div>
            </div>
          </div>
          
          <div className="border-t border-b py-4 my-6">
            <h3 className="font-bold text-center mb-3">选择分析类型</h3>
            <div className="grid grid-cols-2 gap-3">
              <div className="border rounded-lg p-3 text-center hover:bg-yellow-50 cursor-pointer">
                <p className="font-medium">基础财运分析</p>
                <p className="text-yellow-600 font-bold">¥68</p>
              </div>
              <div className="border rounded-lg p-3 text-center bg-yellow-50 border-yellow-400 cursor-pointer">
                <p className="font-medium">高级财运分析</p>
                <p className="text-yellow-600 font-bold">¥168</p>
                <span className="text-xs bg-yellow-500 text-white px-2 py-0.5 rounded-full">推荐</span>
              </div>
            </div>
          </div>
          
          <div className="mt-6 text-center">
            <button className="bg-yellow-600 text-white py-3 px-6 rounded-lg font-medium">
              开始财运分析
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