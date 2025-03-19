import { Metadata } from "next";

export const metadata: Metadata = {
  title: "命中注定 | 爻星阁",
  description: "探索命中注定的缘分与关系，通过八字合婚、星座匹配等多维度分析，了解你们的缘分深浅",
};

export default function DestinyMatchPage() {
  return (
    <div className="flex justify-center bg-gray-100 min-h-screen">
      <div className="w-full max-w-md flex flex-col min-h-screen bg-white pb-20 relative shadow-md">
        {/* 页面标题 */}
        <div className="bg-purple-600 text-white py-4 px-4">
          <h1 className="text-xl font-bold text-center">命中注定</h1>
        </div>
        
        {/* 页面内容 */}
        <div className="p-4">
          <div className="bg-purple-50 rounded-lg p-4 mb-6">
            <h2 className="text-lg font-bold mb-2">探索命中的缘分</h2>
            <p className="text-gray-700">
              每段关系都有其命定的因缘，通过多维度分析，揭示你们之间的缘分深浅与关系走向。
            </p>
          </div>
          
          {/* 输入区域 */}
          <div className="space-y-6 mb-6">
            <div className="border rounded-lg p-4">
              <h3 className="font-bold text-center mb-3">您的信息</h3>
              <div className="space-y-3">
                <div>
                  <label htmlFor="name1" className="block text-sm font-medium text-gray-700 mb-1">
                    姓名
                  </label>
                  <input
                    type="text"
                    name="name1"
                    id="name1"
                    className="focus:ring-purple-500 focus:border-purple-500 block w-full rounded-md sm:text-sm border-gray-300 p-2 border"
                    placeholder="请输入您的姓名"
                  />
                </div>
                
                <div>
                  <label htmlFor="birthdate1" className="block text-sm font-medium text-gray-700 mb-1">
                    出生日期
                  </label>
                  <input
                    type="date"
                    name="birthdate1"
                    id="birthdate1"
                    className="focus:ring-purple-500 focus:border-purple-500 block w-full rounded-md sm:text-sm border-gray-300 p-2 border"
                  />
                </div>
                
                <div>
                  <label htmlFor="birthtime1" className="block text-sm font-medium text-gray-700 mb-1">
                    出生时间
                  </label>
                  <input
                    type="time"
                    name="birthtime1"
                    id="birthtime1"
                    className="focus:ring-purple-500 focus:border-purple-500 block w-full rounded-md sm:text-sm border-gray-300 p-2 border"
                  />
                </div>
              </div>
            </div>
            
            <div className="flex justify-center">
              <div className="w-8 h-8 rounded-full bg-purple-100 flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
              </div>
            </div>
            
            <div className="border rounded-lg p-4">
              <h3 className="font-bold text-center mb-3">对方信息</h3>
              <div className="space-y-3">
                <div>
                  <label htmlFor="name2" className="block text-sm font-medium text-gray-700 mb-1">
                    姓名
                  </label>
                  <input
                    type="text"
                    name="name2"
                    id="name2"
                    className="focus:ring-purple-500 focus:border-purple-500 block w-full rounded-md sm:text-sm border-gray-300 p-2 border"
                    placeholder="请输入对方姓名"
                  />
                </div>
                
                <div>
                  <label htmlFor="birthdate2" className="block text-sm font-medium text-gray-700 mb-1">
                    出生日期
                  </label>
                  <input
                    type="date"
                    name="birthdate2"
                    id="birthdate2"
                    className="focus:ring-purple-500 focus:border-purple-500 block w-full rounded-md sm:text-sm border-gray-300 p-2 border"
                  />
                </div>
                
                <div>
                  <label htmlFor="birthtime2" className="block text-sm font-medium text-gray-700 mb-1">
                    出生时间
                  </label>
                  <input
                    type="time"
                    name="birthtime2"
                    id="birthtime2"
                    className="focus:ring-purple-500 focus:border-purple-500 block w-full rounded-md sm:text-sm border-gray-300 p-2 border"
                  />
                </div>
              </div>
            </div>
          </div>
          
          {/* 分析方式 */}
          <div className="mb-6">
            <h3 className="font-bold text-lg mb-3">多维度缘分分析</h3>
            
            <div className="space-y-3">
              <div className="flex items-start p-3 border rounded-lg">
                <input
                  id="bazi"
                  name="analysis_type"
                  type="checkbox"
                  className="h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-300 rounded mt-1"
                  defaultChecked
                />
                <label htmlFor="bazi" className="ml-3">
                  <span className="block text-sm font-medium text-gray-700">八字合婚分析</span>
                  <span className="block text-xs text-gray-500">通过八字命盘分析两人五行相生相克关系</span>
                </label>
              </div>
              
              <div className="flex items-start p-3 border rounded-lg">
                <input
                  id="zodiac"
                  name="analysis_type"
                  type="checkbox"
                  className="h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-300 rounded mt-1"
                  defaultChecked
                />
                <label htmlFor="zodiac" className="ml-3">
                  <span className="block text-sm font-medium text-gray-700">星座匹配分析</span>
                  <span className="block text-xs text-gray-500">基于西方占星学，分析星座间的相容性</span>
                </label>
              </div>
              
              <div className="flex items-start p-3 border rounded-lg">
                <input
                  id="name"
                  name="analysis_type"
                  type="checkbox"
                  className="h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-300 rounded mt-1"
                  defaultChecked
                />
                <label htmlFor="name" className="ml-3">
                  <span className="block text-sm font-medium text-gray-700">姓名能量匹配</span>
                  <span className="block text-xs text-gray-500">分析姓名数理能量的互补与冲突</span>
                </label>
              </div>
              
              <div className="flex items-start p-3 border rounded-lg">
                <input
                  id="life_path"
                  name="analysis_type"
                  type="checkbox"
                  className="h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-300 rounded mt-1"
                />
                <label htmlFor="life_path" className="ml-3">
                  <span className="block text-sm font-medium text-gray-700">生命轨迹分析</span>
                  <span className="block text-xs text-gray-500">探索两人生命轨迹的交汇与分离</span>
                </label>
              </div>
            </div>
          </div>
          
          {/* 示例结果 */}
          <div className="border rounded-lg p-4 mb-6 bg-gray-50">
            <h3 className="font-bold mb-3">缘分解析示例</h3>
            <div className="space-y-2">
              <div>
                <h4 className="text-sm font-medium">总体缘分指数</h4>
                <div className="flex items-center">
                  <div className="w-full bg-gray-200 rounded-full h-2.5 mr-2">
                    <div className="bg-purple-600 h-2.5 rounded-full" style={{ width: '82%' }}></div>
                  </div>
                  <span className="text-sm font-medium text-purple-600">82%</span>
                </div>
              </div>
              
              <p className="text-sm text-gray-600 italic">
                "你们的八字五行相生相助，形成良好的互补关系。命盘显示在事业上能互相促进，感情上有较深的缘分，但在生活习惯上可能存在一些小摩擦..."
              </p>
            </div>
          </div>
          
          <div className="mt-6 text-center">
            <button className="bg-purple-600 text-white py-3 px-6 rounded-lg font-medium">
              探索缘分
            </button>
            <p className="text-xs text-gray-500 mt-2">
              详细分析结果将在24小时内发送至您的账户
            </p>
          </div>
        </div>
      </div>
    </div>
  );
} 