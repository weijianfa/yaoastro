import { Metadata } from "next";

export const metadata: Metadata = {
  title: "姓名配对 | 爻星阁",
  description: "通过姓名五行分析，测算两人姓名的契合度，了解感情、婚姻、事业合作的相容性",
};

export default function NameMatchPage() {
  return (
    <div className="flex justify-center bg-gray-100 min-h-screen">
      <div className="w-full max-w-md flex flex-col min-h-screen bg-white pb-20 relative shadow-md">
        {/* 页面标题 */}
        <div className="bg-pink-600 text-white py-4 px-4">
          <h1 className="text-xl font-bold text-center">姓名配对</h1>
        </div>
        
        {/* 页面内容 */}
        <div className="p-4">
          <div className="bg-pink-50 rounded-lg p-4 mb-6">
            <h2 className="text-lg font-bold mb-2">姓名相合度分析</h2>
            <p className="text-gray-700">
              姓名蕴含的五行能量会影响两个人之间的相处模式与关系发展。通过姓名配对分析，了解你们的相容性。
            </p>
          </div>
          
          {/* 输入区域 */}
          <div className="space-y-4 mb-6">
            <div>
              <label htmlFor="name1" className="block text-sm font-medium text-gray-700 mb-1">
                您的姓名
              </label>
              <input
                type="text"
                name="name1"
                id="name1"
                className="focus:ring-pink-500 focus:border-pink-500 block w-full rounded-md sm:text-sm border-gray-300 p-2 border"
                placeholder="请输入您的姓名"
              />
            </div>
            
            <div className="flex justify-center">
              <div className="w-8 h-8 rounded-full bg-pink-100 flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-pink-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
              </div>
            </div>
            
            <div>
              <label htmlFor="name2" className="block text-sm font-medium text-gray-700 mb-1">
                对方姓名
              </label>
              <input
                type="text"
                name="name2"
                id="name2"
                className="focus:ring-pink-500 focus:border-pink-500 block w-full rounded-md sm:text-sm border-gray-300 p-2 border"
                placeholder="请输入对方姓名"
              />
            </div>
          </div>
          
          {/* 配对类型选择 */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              配对类型
            </label>
            <div className="grid grid-cols-3 gap-2">
              <div className="border rounded-lg p-2 text-center bg-pink-50 border-pink-200 cursor-pointer">
                <p className="text-sm font-medium">恋爱配对</p>
              </div>
              <div className="border rounded-lg p-2 text-center hover:bg-pink-50 cursor-pointer">
                <p className="text-sm font-medium">婚姻配对</p>
              </div>
              <div className="border rounded-lg p-2 text-center hover:bg-pink-50 cursor-pointer">
                <p className="text-sm font-medium">事业配对</p>
              </div>
            </div>
          </div>
          
          {/* 分析说明 */}
          <div className="space-y-4 mb-6">
            <h3 className="font-bold text-lg">配对分析包括：</h3>
            
            <div className="flex items-start space-x-3">
              <div className="bg-pink-100 p-2 rounded-full">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-pink-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </div>
              <div>
                <h4 className="font-medium">情感相容性</h4>
                <p className="text-sm text-gray-600">分析两人在情感层面的契合度与相处模式</p>
              </div>
            </div>
            
            <div className="flex items-start space-x-3">
              <div className="bg-pink-100 p-2 rounded-full">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-pink-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
                </svg>
              </div>
              <div>
                <h4 className="font-medium">性格互补性</h4>
                <p className="text-sm text-gray-600">评估两人性格特点的互补与冲突情况</p>
              </div>
            </div>
            
            <div className="flex items-start space-x-3">
              <div className="bg-pink-100 p-2 rounded-full">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-pink-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <div>
                <h4 className="font-medium">关系稳定性</h4>
                <p className="text-sm text-gray-600">预测关系的长期稳定性与可能面临的挑战</p>
              </div>
            </div>
            
            <div className="flex items-start space-x-3">
              <div className="bg-pink-100 p-2 rounded-full">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-pink-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <div>
                <h4 className="font-medium">相处建议</h4>
                <p className="text-sm text-gray-600">根据分析结果，提供改善关系的实用建议</p>
              </div>
            </div>
          </div>
          
          {/* 示例结果 */}
          <div className="border rounded-lg p-4 mb-6 bg-gray-50">
            <h3 className="font-bold mb-2">示例分析结果</h3>
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm">契合指数</span>
              <div className="w-2/3 bg-gray-200 rounded-full h-2.5">
                <div className="bg-pink-600 h-2.5 rounded-full" style={{ width: '78%' }}></div>
              </div>
              <span className="text-sm font-medium text-pink-600">78分</span>
            </div>
            <p className="text-sm text-gray-600 italic">
              "你们的姓名五行相生相助，在情感上有较高的契合度。你的木性格能滋养对方的火性格，形成良好的互补关系..."
            </p>
          </div>
          
          <div className="mt-6 text-center">
            <button className="bg-pink-600 text-white py-3 px-6 rounded-lg font-medium">
              开始配对分析
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