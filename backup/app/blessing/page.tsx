import { Metadata } from "next";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";

export const metadata: Metadata = {
  title: "祈福许愿 | 爻星阁",
  description: "在爻星阁平台上进行祈福许愿，祈求平安、健康、幸福和成功",
};

const blessingTypes = [
  {
    id: "health",
    title: "健康平安",
    description: "祈求身体健康、平安顺遂",
    icon: "🧬",
    color: "bg-green-50 text-green-700 border-green-200",
  },
  {
    id: "wealth",
    title: "财富丰盈",
    description: "祈求财运亨通、事业有成",
    icon: "💰",
    color: "bg-yellow-50 text-yellow-700 border-yellow-200",
  },
  {
    id: "love",
    title: "姻缘美满",
    description: "祈求爱情甜蜜、婚姻幸福",
    icon: "❤️",
    color: "bg-pink-50 text-pink-700 border-pink-200",
  },
  {
    id: "career",
    title: "事业成功",
    description: "祈求事业顺利、升职加薪",
    icon: "🚀",
    color: "bg-blue-50 text-blue-700 border-blue-200",
  },
  {
    id: "study",
    title: "学业进步",
    description: "祈求学习顺利、考试成功",
    icon: "📚",
    color: "bg-purple-50 text-purple-700 border-purple-200",
  },
  {
    id: "family",
    title: "家庭和睦",
    description: "祈求家庭和睦、亲情美满",
    icon: "👨‍👩‍👧‍👦",
    color: "bg-orange-50 text-orange-700 border-orange-200",
  },
];

export default function BlessingPage() {
  return (
    <div className="flex justify-center bg-gray-100 min-h-screen">
      <div className="w-full max-w-md flex flex-col min-h-screen bg-white pb-20 relative shadow-md">
        {/* 页面标题 */}
        <div className="bg-red-600 text-white py-4 px-4">
          <h1 className="text-xl font-bold text-center">祈福许愿</h1>
        </div>
        
        {/* 页面内容 */}
        <div className="p-4">
          <div className="bg-red-50 rounded-lg p-4 mb-6">
            <h2 className="text-lg font-bold mb-2">心愿祈福</h2>
            <p className="text-gray-700">
              在爻星阁平台，您可以进行线上祈福许愿，祈求平安、健康、幸福和成功。
              我们会为您的心愿进行专业的祈福仪式，帮助您实现美好愿望。
            </p>
          </div>
          
          {/* 祈福类型 */}
          <div className="space-y-4 mb-6">
            <h3 className="font-bold text-lg">选择祈福类型</h3>
            
            <div className="grid grid-cols-2 gap-3">
              {blessingTypes.map((type) => (
                <div 
                  key={type.id} 
                  className={`border rounded-lg p-3 ${type.color} cursor-pointer`}
                >
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-xl">{type.icon}</span>
                    <h4 className="font-medium">{type.title}</h4>
                  </div>
                  <p className="text-xs">{type.description}</p>
                </div>
              ))}
            </div>
          </div>
          
          {/* 祈福内容 */}
          <div className="mb-6">
            <h3 className="font-bold text-lg mb-3">填写祈福内容</h3>
            <div className="space-y-3">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                  您的姓名
                </label>
                <input
                  type="text"
                  name="name"
                  id="name"
                  className="focus:ring-red-500 focus:border-red-500 block w-full rounded-md sm:text-sm border-gray-300 p-2 border"
                  placeholder="请输入您的姓名"
                />
              </div>
              
              <div>
                <label htmlFor="birthdate" className="block text-sm font-medium text-gray-700 mb-1">
                  出生日期
                </label>
                <input
                  type="date"
                  name="birthdate"
                  id="birthdate"
                  className="focus:ring-red-500 focus:border-red-500 block w-full rounded-md sm:text-sm border-gray-300 p-2 border"
                />
              </div>
              
              <div>
                <label htmlFor="wish" className="block text-sm font-medium text-gray-700 mb-1">
                  祈福愿望
                </label>
                <textarea
                  name="wish"
                  id="wish"
                  rows={4}
                  className="focus:ring-red-500 focus:border-red-500 block w-full rounded-md sm:text-sm border-gray-300 p-2 border"
                  placeholder="请详细描述您的祈福愿望..."
                ></textarea>
              </div>
            </div>
          </div>
          
          {/* 服务套餐 */}
          <div className="border-t border-b py-4 my-6">
            <h3 className="font-bold text-center mb-3">选择祈福套餐</h3>
            <div className="space-y-3">
              <div className="border rounded-lg p-3 hover:bg-red-50 cursor-pointer">
                <div className="flex justify-between items-center">
                  <p className="font-medium">基础祈福</p>
                  <p className="text-red-600 font-bold">¥68</p>
                </div>
                <p className="text-xs text-gray-500">线上祈福仪式，为您的愿望祈福</p>
              </div>
              
              <div className="border rounded-lg p-3 bg-red-50 border-red-300 cursor-pointer">
                <div className="flex justify-between items-center">
                  <p className="font-medium">高级祈福</p>
                  <p className="text-red-600 font-bold">¥168</p>
                </div>
                <p className="text-xs text-gray-500">线上祈福仪式 + 专属祈福符咒</p>
                <span className="text-xs bg-red-500 text-white px-2 py-0.5 rounded-full">推荐</span>
              </div>
              
              <div className="border rounded-lg p-3 hover:bg-red-50 cursor-pointer">
                <div className="flex justify-between items-center">
                  <p className="font-medium">尊享祈福</p>
                  <p className="text-red-600 font-bold">¥398</p>
                </div>
                <p className="text-xs text-gray-500">线上祈福仪式 + 专属祈福符咒 + 大师一对一开运指导</p>
              </div>
            </div>
          </div>
          
          <div className="mt-6 text-center">
            <button className="bg-red-600 text-white py-3 px-6 rounded-lg font-medium">
              提交祈福
            </button>
            <p className="text-xs text-gray-500 mt-2">
              我们将在24小时内为您进行祈福仪式，并将结果发送至您的账户
            </p>
          </div>
        </div>
      </div>
    </div>
  );
} 