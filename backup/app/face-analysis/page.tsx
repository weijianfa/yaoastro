import { Metadata } from "next";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Link from "next/link";

export const metadata: Metadata = {
  title: "AI面相手相分析 | 爻星阁",
  description: "使用先进的AI技术分析面相和手相，揭示性格特点、潜在天赋和人生走向",
};

const features = [
  {
    title: "先进AI技术",
    description: "采用最新的人工智能和计算机视觉技术，精准分析面部特征和手相纹路",
    icon: "🤖",
  },
  {
    title: "全面特征分析",
    description: "分析面部五官、轮廓、气色以及手相纹路、手形等多维度特征",
    icon: "👁️",
  },
  {
    title: "性格特质解读",
    description: "揭示您的性格特点、思维方式、情感表达和人际关系模式",
    icon: "🧠",
  },
  {
    title: "潜能天赋发现",
    description: "识别您的潜在天赋、适合的职业方向和发展优势",
    icon: "✨",
  },
  {
    title: "运势趋势预测",
    description: "分析您的运势走向、机遇与挑战，提供参考建议",
    icon: "📈",
  },
  {
    title: "隐私安全保障",
    description: "所有上传的照片严格保密，分析完成后自动删除",
    icon: "🔒",
  },
];

const analysisTypes = [
  {
    id: "face",
    title: "面相分析",
    description: "通过分析面部特征，揭示性格特点和人生走向",
    price: 39.9,
    features: [
      "面部五官详细分析",
      "性格特质解读",
      "事业发展方向",
      "人际关系模式",
      "运势趋势预测",
    ],
    popular: false,
  },
  {
    id: "hand",
    title: "手相分析",
    description: "通过分析手相纹路，揭示天赋潜能和命运轨迹",
    price: 39.9,
    features: [
      "手相纹路详细分析",
      "天赋潜能解读",
      "事业财运分析",
      "情感关系解析",
      "健康状况参考",
    ],
    popular: false,
  },
  {
    id: "comprehensive",
    title: "综合分析",
    description: "结合面相和手相，提供全面深入的分析",
    price: 69.9,
    features: [
      "面相与手相综合分析",
      "性格与潜能全面解读",
      "事业财运深度分析",
      "情感关系详细解析",
      "健康状况全面参考",
      "运势趋势精准预测",
      "专业顾问一对一解答",
    ],
    popular: true,
  },
];

export default function FaceAnalysisPage() {
  return (
    <div className="flex justify-center bg-gray-100 min-h-screen">
      <div className="w-full max-w-md flex flex-col min-h-screen bg-white pb-20 relative shadow-md">
        {/* 页面标题 */}
        <div className="bg-indigo-600 text-white py-4 px-4">
          <h1 className="text-xl font-bold text-center">AI面相手相分析</h1>
        </div>
        
        {/* 页面内容 */}
        <div className="p-4">
          <div className="bg-indigo-50 rounded-lg p-4 mb-6">
            <h2 className="text-lg font-bold mb-2">AI智能解读面相手相</h2>
            <p className="text-gray-700">
              通过先进的AI技术分析面相和手相，揭示您的性格特点、潜在天赋和人生走向。
            </p>
          </div>
          
          {/* 特点列表 */}
          <div className="space-y-4 mb-6">
            <h3 className="font-bold text-lg">我们的特点</h3>
            
            {features.map((feature, index) => (
              <div key={index} className="flex items-start space-x-3">
                <div className="bg-indigo-100 p-2 rounded-full">
                  <span className="text-xl">{feature.icon}</span>
                </div>
                <div>
                  <h4 className="font-medium">{feature.title}</h4>
                  <p className="text-sm text-gray-600">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
          
          {/* 上传区域 */}
          <div className="mb-6 border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
            <div className="space-y-2">
              <svg xmlns="http://www.w3.org/2000/svg" className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
              </svg>
              <p className="text-sm text-gray-600">
                点击上传或拖拽照片
              </p>
              <p className="text-xs text-gray-500">
                支持JPG、PNG格式，文件大小不超过5MB
              </p>
              <button className="mt-2 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                选择图片
              </button>
            </div>
          </div>
          
          {/* 服务套餐 */}
          <div className="border-t border-b py-4 my-6">
            <h3 className="font-bold text-center mb-3">选择分析套餐</h3>
            <div className="space-y-3">
              {analysisTypes.map((type) => (
                <div 
                  key={type.id} 
                  className={`border rounded-lg p-3 ${type.popular ? 'bg-indigo-50 border-indigo-300' : 'hover:bg-indigo-50'} cursor-pointer`}
                >
                  <div className="flex justify-between items-center">
                    <p className="font-medium">{type.title}</p>
                    <p className="text-indigo-600 font-bold">¥{type.price}</p>
                  </div>
                  <ul className="text-xs text-gray-500 mt-1 space-y-1">
                    {type.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center">
                        <svg className="h-3 w-3 text-indigo-500 mr-1" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                        {feature}
                      </li>
                    ))}
                  </ul>
                  {type.popular && (
                    <span className="text-xs bg-indigo-500 text-white px-2 py-0.5 rounded-full">推荐</span>
                  )}
                </div>
              ))}
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