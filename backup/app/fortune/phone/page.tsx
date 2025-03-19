import { Metadata } from "next";

export const metadata: Metadata = {
  title: "手机号测吉凶 | 爻星阁",
  description: "通过数理分析，测算手机号码的吉凶，了解号码能量与运势影响",
};

export default function FortunePhonePage() {
  return (
    <div className="flex justify-center bg-gray-100 min-h-screen">
      <div className="w-full max-w-md flex flex-col min-h-screen bg-white pb-20 relative shadow-md">
        {/* 页面标题 */}
        <div className="bg-blue-600 text-white py-4 px-4">
          <h1 className="text-xl font-bold text-center">手机号测吉凶</h1>
        </div>
        
        {/* 页面内容 */}
        <div className="p-4">
          <div className="bg-blue-50 rounded-lg p-4 mb-6">
            <h2 className="text-lg font-bold mb-2">手机号码能量解析</h2>
            <p className="text-gray-700">
              手机号码是我们日常使用最频繁的数字组合，其蕴含的数理能量会对我们的运势产生潜移默化的影响。
            </p>
          </div>
          
          {/* 输入区域 */}
          <div className="mb-6">
            <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
              输入您的手机号码
            </label>
            <div className="mt-1 flex rounded-md shadow-sm">
              <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500">
                +86
              </span>
              <input
                type="tel"
                name="phone"
                id="phone"
                className="focus:ring-blue-500 focus:border-blue-500 flex-1 block w-full rounded-none rounded-r-md sm:text-sm border-gray-300 p-2 border"
                placeholder="请输入11位手机号码"
                maxLength={11}
              />
            </div>
          </div>
          
          {/* 分析说明 */}
          <div className="space-y-4 mb-6">
            <h3 className="font-bold text-lg">我们的分析包括：</h3>
            
            <div className="flex items-start space-x-3">
              <div className="bg-blue-100 p-2 rounded-full">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                </svg>
              </div>
              <div>
                <h4 className="font-medium">数理能量分析</h4>
                <p className="text-sm text-gray-600">分析号码中各数字的能量属性及组合效应</p>
              </div>
            </div>
            
            <div className="flex items-start space-x-3">
              <div className="bg-blue-100 p-2 rounded-full">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                </svg>
              </div>
              <div>
                <h4 className="font-medium">运势影响评估</h4>
                <p className="text-sm text-gray-600">评估号码对事业、财运、感情等方面的影响</p>
              </div>
            </div>
            
            <div className="flex items-start space-x-3">
              <div className="bg-blue-100 p-2 rounded-full">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div>
                <h4 className="font-medium">吉凶指数评定</h4>
                <p className="text-sm text-gray-600">综合评定号码的吉凶指数，提供直观参考</p>
              </div>
            </div>
            
            <div className="flex items-start space-x-3">
              <div className="bg-blue-100 p-2 rounded-full">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div>
                <h4 className="font-medium">改善建议</h4>
                <p className="text-sm text-gray-600">如果号码存在不利因素，提供改善或化解建议</p>
              </div>
            </div>
          </div>
          
          {/* 示例结果 */}
          <div className="border rounded-lg p-4 mb-6 bg-gray-50">
            <h3 className="font-bold mb-2">示例分析结果</h3>
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm">吉凶指数</span>
              <div className="w-2/3 bg-gray-200 rounded-full h-2.5">
                <div className="bg-green-600 h-2.5 rounded-full" style={{ width: '85%' }}></div>
              </div>
              <span className="text-sm font-medium text-green-600">85分</span>
            </div>
            <p className="text-sm text-gray-600 italic">
              "此号码五行属水，数理和谐，对财运和人际关系有积极影响，适合从事商业、销售等行业..."
            </p>
          </div>
          
          <div className="mt-6 text-center">
            <button className="bg-blue-600 text-white py-3 px-6 rounded-lg font-medium">
              开始测算
            </button>
            <p className="text-xs text-gray-500 mt-2">
              分析结果将立即生成，并可保存至您的账户
            </p>
          </div>
        </div>
      </div>
    </div>
  );
} 