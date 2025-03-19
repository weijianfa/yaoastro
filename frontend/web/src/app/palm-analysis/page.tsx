import { Metadata } from "next";

export const metadata: Metadata = {
  title: "AI手相分析 | 爻星阁",
  description: "通过先进AI技术分析手相，揭示性格特点、潜在天赋与人生走向，提供专业的手相解读",
};

export default function PalmAnalysisPage() {
  return (
    <div className="flex justify-center bg-gray-100 min-h-screen">
      <div className="w-full max-w-md flex flex-col min-h-screen bg-white pb-20 relative shadow-md">
        {/* 页面标题 */}
        <div className="bg-indigo-600 text-white py-4 px-4">
          <h1 className="text-xl font-bold text-center">AI手相分析</h1>
        </div>
        
        {/* 页面内容 */}
        <div className="p-4">
          <div className="bg-indigo-50 rounded-lg p-4 mb-6">
            <h2 className="text-lg font-bold mb-2">手相蕴含的人生密码</h2>
            <p className="text-gray-700">
              手相是人体最具个人特色的生物特征之一，蕴含着丰富的信息。通过AI技术精准分析手相纹路，揭示您的性格特点、潜在天赋与人生走向。
            </p>
          </div>
          
          {/* 上传区域 */}
          <div className="mb-6 border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
            <div className="space-y-2">
              <svg xmlns="http://www.w3.org/2000/svg" className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
              </svg>
              <p className="text-sm text-gray-600">
                点击上传或拖拽手掌照片
              </p>
              <p className="text-xs text-gray-500">
                支持JPG、PNG格式，文件大小不超过5MB
              </p>
              <button className="mt-2 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                选择图片
              </button>
            </div>
          </div>
          
          {/* 拍摄指南 */}
          <div className="mb-6">
            <h3 className="font-bold text-lg mb-3">手掌拍摄指南</h3>
            <div className="bg-gray-50 rounded-lg p-4">
              <ul className="space-y-2 text-sm text-gray-600">
                <li className="flex items-start">
                  <span className="text-indigo-500 mr-2">•</span>
                  在自然光下拍摄，避免强光或阴影
                </li>
                <li className="flex items-start">
                  <span className="text-indigo-500 mr-2">•</span>
                  手掌完全展开，手指自然分开
                </li>
                <li className="flex items-start">
                  <span className="text-indigo-500 mr-2">•</span>
                  确保手掌纹路清晰可见，无遮挡
                </li>
                <li className="flex items-start">
                  <span className="text-indigo-500 mr-2">•</span>
                  优先拍摄主手（惯用手）
                </li>
              </ul>
            </div>
          </div>
          
          {/* 分析内容 */}
          <div className="space-y-4 mb-6">
            <h3 className="font-bold text-lg">AI手相分析内容</h3>
            
            <div className="flex items-start space-x-3">
              <div className="bg-indigo-100 p-2 rounded-full">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
              <div>
                <h4 className="font-medium">性格特质分析</h4>
                <p className="text-sm text-gray-600">解读手相中反映的性格特点、思维方式与情感倾向</p>
              </div>
            </div>
            
            <div className="flex items-start space-x-3">
              <div className="bg-indigo-100 p-2 rounded-full">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
              </div>
              <div>
                <h4 className="font-medium">潜在天赋揭示</h4>
                <p className="text-sm text-gray-600">发掘手相中隐藏的天赋潜能与适合发展的领域</p>
              </div>
            </div>
            
            <div className="flex items-start space-x-3">
              <div className="bg-indigo-100 p-2 rounded-full">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                </svg>
              </div>
              <div>
                <h4 className="font-medium">事业发展预测</h4>
                <p className="text-sm text-gray-600">分析事业线与成就线，预测职业发展方向与机遇</p>
              </div>
            </div>
            
            <div className="flex items-start space-x-3">
              <div className="bg-indigo-100 p-2 rounded-full">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </div>
              <div>
                <h4 className="font-medium">感情运势解读</h4>
                <p className="text-sm text-gray-600">解读感情线特征，揭示情感态度与关系倾向</p>
              </div>
            </div>
            
            <div className="flex items-start space-x-3">
              <div className="bg-indigo-100 p-2 rounded-full">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <div>
                <h4 className="font-medium">人生转折点预警</h4>
                <p className="text-sm text-gray-600">识别命运线上的变化，预测可能的人生转折点</p>
              </div>
            </div>
          </div>
          
          {/* 服务套餐 */}
          <div className="border-t border-b py-4 my-6">
            <h3 className="font-bold text-center mb-3">选择分析套餐</h3>
            <div className="space-y-3">
              <div className="border rounded-lg p-3 hover:bg-indigo-50 cursor-pointer">
                <div className="flex justify-between items-center">
                  <p className="font-medium">基础分析</p>
                  <p className="text-indigo-600 font-bold">¥68</p>
                </div>
                <p className="text-xs text-gray-500">包含性格特质与潜在天赋分析</p>
              </div>
              
              <div className="border rounded-lg p-3 bg-indigo-50 border-indigo-300 cursor-pointer">
                <div className="flex justify-between items-center">
                  <p className="font-medium">全面分析</p>
                  <p className="text-indigo-600 font-bold">¥128</p>
                </div>
                <p className="text-xs text-gray-500">包含全部五项分析内容，附赠个人发展建议</p>
                <span className="text-xs bg-indigo-500 text-white px-2 py-0.5 rounded-full">推荐</span>
              </div>
              
              <div className="border rounded-lg p-3 hover:bg-indigo-50 cursor-pointer">
                <div className="flex justify-between items-center">
                  <p className="font-medium">专家解读</p>
                  <p className="text-indigo-600 font-bold">¥298</p>
                </div>
                <p className="text-xs text-gray-500">AI分析+专家在线1对1解读，提供个性化指导</p>
              </div>
            </div>
          </div>
          
          <div className="mt-6 text-center">
            <button className="bg-indigo-600 text-white py-3 px-6 rounded-lg font-medium">
              开始分析
            </button>
            <p className="text-xs text-gray-500 mt-2">
              分析结果将在10分钟内生成，并发送至您的账户
            </p>
          </div>
        </div>
      </div>
    </div>
  );
} 