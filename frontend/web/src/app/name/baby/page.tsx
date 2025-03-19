import { Metadata } from "next";

export const metadata: Metadata = {
  title: "宝宝起名 | 爻星阁",
  description: "专业宝宝起名服务，结合八字命理与现代命名学，为宝宝取一个吉祥如意、寓意深远的好名字",
};

export default function BabyNamePage() {
  return (
    <div className="flex justify-center bg-gray-100 min-h-screen">
      <div className="w-full max-w-md flex flex-col min-h-screen bg-white pb-20 relative shadow-md">
        {/* 页面标题 */}
        <div className="bg-blue-500 text-white py-4 px-4">
          <h1 className="text-xl font-bold text-center">宝宝起名</h1>
        </div>
        
        {/* 页面内容 */}
        <div className="p-4">
          <div className="bg-blue-50 rounded-lg p-4 mb-6">
            <h2 className="text-lg font-bold mb-2">为宝宝取一个好名字</h2>
            <p className="text-gray-700">
              名字伴随宝宝一生，影响其性格发展与人生道路。我们结合传统命理与现代命名学，为宝宝量身定制吉祥美好的名字。
            </p>
          </div>
          
          {/* 输入区域 */}
          <div className="space-y-4 mb-6 border rounded-lg p-4">
            <h3 className="font-bold text-center mb-3">宝宝基本信息</h3>
            
            <div>
              <label htmlFor="lastname" className="block text-sm font-medium text-gray-700 mb-1">
                宝宝姓氏
              </label>
              <input
                type="text"
                name="lastname"
                id="lastname"
                className="focus:ring-blue-500 focus:border-blue-500 block w-full rounded-md sm:text-sm border-gray-300 p-2 border"
                placeholder="请输入宝宝姓氏"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                宝宝性别
              </label>
              <div className="grid grid-cols-2 gap-3">
                <div className="border rounded-lg p-2 text-center bg-blue-50 border-blue-200 cursor-pointer">
                  <p className="text-sm font-medium">男宝宝</p>
                </div>
                <div className="border rounded-lg p-2 text-center hover:bg-blue-50 cursor-pointer">
                  <p className="text-sm font-medium">女宝宝</p>
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
          </div>
          
          {/* 起名特点 */}
          <div className="space-y-4 mb-6">
            <h3 className="font-bold text-lg">我们的起名特点：</h3>
            
            <div className="flex items-start space-x-3">
              <div className="bg-blue-100 p-2 rounded-full">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div>
                <h4 className="font-medium">八字五行分析</h4>
                <p className="text-sm text-gray-600">根据宝宝八字命盘，分析五行喜忌，选取有利字形</p>
              </div>
            </div>
            
            <div className="flex items-start space-x-3">
              <div className="bg-blue-100 p-2 rounded-full">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
                </svg>
              </div>
              <div>
                <h4 className="font-medium">字义深远考究</h4>
                <p className="text-sm text-gray-600">精选寓意美好、内涵丰富的汉字，避免生僻字和不良含义</p>
              </div>
            </div>
            
            <div className="flex items-start space-x-3">
              <div className="bg-blue-100 p-2 rounded-full">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <div>
                <h4 className="font-medium">音律和谐优美</h4>
                <p className="text-sm text-gray-600">注重名字读音的和谐与韵律，便于呼唤与记忆</p>
              </div>
            </div>
            
            <div className="flex items-start space-x-3">
              <div className="bg-blue-100 p-2 rounded-full">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 21v-4m0 0V5a2 2 0 012-2h6.5l1 1H21l-3 6 3 6h-8.5l-1-1H5a2 2 0 00-2 2zm9-13.5V9" />
                </svg>
              </div>
              <div>
                <h4 className="font-medium">文化底蕴丰富</h4>
                <p className="text-sm text-gray-600">融入诗词典籍与文化内涵，彰显文化修养与品位</p>
              </div>
            </div>
          </div>
          
          {/* 服务套餐 */}
          <div className="border-t border-b py-4 my-6">
            <h3 className="font-bold text-center mb-3">选择服务套餐</h3>
            <div className="space-y-3">
              <div className="border rounded-lg p-3 hover:bg-blue-50 cursor-pointer">
                <div className="flex justify-between items-center">
                  <p className="font-medium">基础起名</p>
                  <p className="text-blue-600 font-bold">¥98</p>
                </div>
                <p className="text-xs text-gray-500">提供3个精选名字，含基础八字分析</p>
              </div>
              
              <div className="border rounded-lg p-3 bg-blue-50 border-blue-300 cursor-pointer">
                <div className="flex justify-between items-center">
                  <p className="font-medium">高级起名</p>
                  <p className="text-blue-600 font-bold">¥198</p>
                </div>
                <p className="text-xs text-gray-500">提供5个精选名字，含详细八字分析与名字解析</p>
                <span className="text-xs bg-blue-500 text-white px-2 py-0.5 rounded-full">推荐</span>
              </div>
              
              <div className="border rounded-lg p-3 hover:bg-blue-50 cursor-pointer">
                <div className="flex justify-between items-center">
                  <p className="font-medium">尊享起名</p>
                  <p className="text-blue-600 font-bold">¥398</p>
                </div>
                <p className="text-xs text-gray-500">提供8个精选名字，含全面八字分析、名字解析与未来发展预测</p>
              </div>
            </div>
          </div>
          
          <div className="mt-6 text-center">
            <button className="bg-blue-500 text-white py-3 px-6 rounded-lg font-medium">
              开始起名
            </button>
            <p className="text-xs text-gray-500 mt-2">
              起名结果将在24小时内发送至您的账户
            </p>
          </div>
        </div>
      </div>
    </div>
  );
} 