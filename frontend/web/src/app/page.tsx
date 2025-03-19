import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "爻星阁 - 专业命理分析与预测",
  description: "提供八字命理、塔罗占卜、AI面相手相分析、心理测试、姻缘配对等专业命理服务",
};

// 首页顶部轮播图服务
const bannerServices = [
  {
    id: "destiny-match",
    title: "命中注定的另一半",
    subtitle: "揭秘另一半，让你爱上对的人",
    image: "/tarot-placeholder.jpg",
    href: "/destiny/match",
  },
];

// 主要服务图标
const mainServices = [
  {
    id: "bazi-marriage",
    title: "八字合婚",
    image: "/tarot-placeholder.jpg",
    href: "/bazi/marriage",
  },
  {
    id: "fortune-2025",
    title: "2025运势",
    image: "/tarot-placeholder.jpg",
    href: "/fortune/2025",
  },
  {
    id: "tarot",
    title: "塔罗占卜",
    image: "/tarot-placeholder.jpg",
    href: "/tarot",
  },
  {
    id: "name-match",
    title: "姓名配对",
    image: "/tarot-placeholder.jpg",
    href: "/name/match",
  },
  {
    id: "destiny-match",
    title: "命中注定",
    image: "/tarot-placeholder.jpg",
    href: "/destiny/match",
  },
  {
    id: "ai-face",
    title: "AI面相",
    image: "/tarot-placeholder.jpg",
    href: "/face-analysis",
  },
  {
    id: "bazi-analysis",
    title: "八字精批",
    image: "/tarot-placeholder.jpg",
    href: "/bazi/analysis",
  },
  {
    id: "ai-palm",
    title: "AI手相",
    image: "/tarot-placeholder.jpg",
    href: "/palm-analysis",
  },
];

// 专题服务
const specialServices = [
  {
    id: "baby-name",
    title: "宝宝起名",
    subtitle: "取吉祥好名",
    image: "/tarot-placeholder.jpg",
    href: "/name/baby",
  },
  {
    id: "name-match",
    title: "姓名配对",
    subtitle: "你们真的合适吗？",
    image: "/tarot-placeholder.jpg",
    href: "/name/match",
  },
  {
    id: "bazi-marriage",
    title: "八字合婚",
    subtitle: "避免失败的婚姻",
    image: "/tarot-placeholder.jpg",
    href: "/bazi/marriage",
  },
  {
    id: "fortune",
    title: "算财运",
    subtitle: "财富命盘 偏财运",
    image: "/tarot-placeholder.jpg",
    href: "/fortune/wealth",
  },
  {
    id: "phone-fortune",
    title: "手机号测吉凶",
    subtitle: "解读数字能量",
    image: "/tarot-placeholder.jpg",
    href: "/fortune/phone",
  },
  {
    id: "blessing",
    title: "祈福点灯",
    subtitle: "点明灯 招好运",
    image: "/tarot-placeholder.jpg",
    href: "/blessing",
  },
];

// 塔罗爱情占卜问题
const tarotLoveQuestions = [
  {
    id: "breakup",
    title: "3个月内你会脱单吗？",
    color: "bg-purple-600",
    href: "/tarot/love/breakup",
  },
  {
    id: "confession",
    title: "我该跟暗恋的TA表白吗？",
    color: "bg-purple-600",
    href: "/tarot/love/confession",
  },
  {
    id: "happiness",
    title: "我们在一起会幸福吗？",
    color: "bg-pink-500",
    href: "/tarot/love/happiness",
  },
  {
    id: "breakup-decision",
    title: "我该和恋人分手吗？",
    color: "bg-amber-500",
    href: "/tarot/love/breakup-decision",
  },
  {
    id: "reconciliation",
    title: "你和TA有复合机会吗？",
    color: "bg-purple-600",
    href: "/tarot/love/reconciliation",
  },
  {
    id: "true-love",
    title: "A和B谁是真爱？",
    color: "bg-purple-600",
    href: "/tarot/love/true-love",
  },
];

// 心理测试
const psychTests = [
  {
    id: "depression",
    title: "抑郁测试",
    subtitle: "你的情绪\"感冒\"了吗？",
    image: "/tarot-placeholder.jpg",
    href: "/psych/depression",
  },
  {
    id: "love",
    title: "爱情测试",
    subtitle: "什么样的异性最适合你？",
    image: "/tarot-placeholder.jpg",
    href: "/psych/love",
  },
  {
    id: "eq",
    title: "情商测试",
    subtitle: "高情商，你有吗？",
    image: "/tarot-placeholder.jpg",
    href: "/psych/eq",
  },
  {
    id: "career",
    title: "职业测试",
    subtitle: "发现你，成就你",
    image: "/tarot-placeholder.jpg",
    href: "/psych/career",
  },
];

// 热门测算
const popularCalculations = [
  {
    id: "name-match",
    title: "姓名配对",
    subtitle: "你们是命中注定的正缘吗？",
    image: "/tarot-placeholder.jpg",
    stats: "525226测试",
    rating: "99.2%好评",
    href: "/name/match",
  },
  {
    id: "destiny-match",
    title: "命中注定另一半",
    subtitle: "为你揭秘另一半，让你爱上对的人",
    image: "/tarot-placeholder.jpg",
    stats: "105946测试",
    rating: "97.8%好评",
    href: "/destiny/match",
  },
  {
    id: "bazi-analysis",
    title: "八字精批",
    subtitle: "揭秘各方运势 详批一生发展",
    image: "/tarot-placeholder.jpg",
    stats: "97698测试",
    rating: "98.9%好评",
    href: "/bazi/analysis",
  },
  {
    id: "bazi-marriage",
    title: "八字合婚",
    subtitle: "婚前选择正确对象，婚后才能幸福美满",
    image: "/tarot-placeholder.jpg",
    stats: "84376测试",
    rating: "98.8%好评",
    href: "/bazi/marriage",
  },
  {
    id: "fortune-2025",
    title: "紫微流年运势2025",
    subtitle: "2025各项运势详批，新的一年，新的机遇！",
    image: "/tarot-placeholder.jpg",
    stats: "69917测试",
    rating: "97.9%好评",
    href: "/fortune/2025",
  },
  {
    id: "ai-face",
    title: "AI人工智能看面相",
    subtitle: "AI面相研究，让你更了解自己！",
    image: "/tarot-placeholder.jpg",
    stats: "123931测试",
    rating: "98.9%好评",
    href: "/face-analysis",
  },
  {
    id: "ai-palm",
    title: "AI人工智能看手相",
    subtitle: "AI手相研究，让你更了解自己！",
    image: "/tarot-placeholder.jpg",
    stats: "100574测试",
    rating: "99.1%好评",
    href: "/ai/palm",
  },
  {
    id: "past-life",
    title: "七世情缘",
    subtitle: "前世缘深几许？今生情能白头？",
    image: "/tarot-placeholder.jpg",
    stats: "90295测试",
    rating: "97.5%好评",
    href: "/past-life",
  },
  {
    id: "dream",
    title: "你的梦代表了什么？",
    subtitle: "梦是一扇观察心灵的窗户，通过梦揭示你真实的内心活动。",
    image: "/tarot-placeholder.jpg",
    stats: "323154测试",
    rating: "99.9%好评",
    href: "/dream",
  },
  {
    id: "blessing",
    title: "祈福点灯",
    subtitle: "祈福招好运，点灯保平安。",
    image: "/tarot-placeholder.jpg",
    stats: "626292测试",
    rating: "99%好评",
    href: "/blessing",
  },
  {
    id: "yueyao",
    title: "月老姻缘簿",
    subtitle: "你会与谁结合？谁才是你的命中注定？月老来揭秘。",
    image: "/tarot-placeholder.jpg",
    stats: "278858测试",
    rating: "98.6%好评",
    href: "/yueyao",
  },
  {
    id: "tarot-love",
    title: "我们在一起会幸福吗？",
    subtitle: "塔罗牌-你们的感情能走到最后吗？TA会一直对你好吗？",
    image: "/tarot-placeholder.jpg",
    stats: "136259测试",
    rating: "99.6%好评",
    href: "/tarot/love/happiness",
  },
  {
    id: "bazi-career",
    title: "八字测事业运",
    subtitle: "解读你的事业天赋，把握当下不利困局",
    image: "/tarot-placeholder.jpg",
    stats: "74517测试",
    rating: "97.9%好评",
    href: "/bazi/career",
  },
  {
    id: "love-peach",
    title: "八字恋爱桃花运",
    subtitle: "不可不知的桃花命盘，精准剖析你一生的桃花命数",
    image: "/tarot-placeholder.jpg",
    stats: "546323测试",
    rating: "98.8%好评",
    href: "/love/peach",
  },
  {
    id: "tarot-love-general",
    title: "塔罗牌爱情占卜",
    subtitle: "塔罗牌-爱情是场赌注，幸福的是人间天堂，不幸的是炼狱。你们能一直幸福下去？",
    image: "/tarot-placeholder.jpg",
    stats: "505012测试",
    rating: "98%好评",
    href: "/tarot/love",
  },
  {
    id: "tarot-confession",
    title: "我该跟暗恋的TA表白吗？",
    subtitle: "塔罗牌-TA是否真的适合你？你的表白能成功吗？",
    image: "/tarot-placeholder.jpg",
    stats: "141886测试",
    rating: "97.8%好评",
    href: "/tarot/love/confession",
  },
  {
    id: "baby-name",
    title: "宝宝起名",
    subtitle: "正宗周易八字在线起名，好名字助运一生！",
    image: "/tarot-placeholder.jpg",
    stats: "332722测试",
    rating: "99.8%好评",
    href: "/name/baby",
  },
  {
    id: "marriage-fortune",
    title: "我的结婚运",
    subtitle: "缔结良缘·白首成约",
    image: "/tarot-placeholder.jpg",
    stats: "84376测试",
    rating: "98.8%好评",
    href: "/marriage/fortune",
  },
  {
    id: "love-fortune-2025",
    title: "2025年爱情运势",
    subtitle: "掌握爱情运势的吉凶变化",
    image: "/tarot-placeholder.jpg",
    stats: "107525测试",
    rating: "97.9%好评",
    href: "/love/fortune/2025",
  },
  {
    id: "car-number",
    title: "车牌号码测吉凶",
    subtitle: "详解数字能量，精准破译你的个人运势！",
    image: "/tarot-placeholder.jpg",
    stats: "18947测试",
    rating: "97.9%好评",
    href: "/fortune/car-number",
  },
  {
    id: "sexual-orientation",
    title: "性取向评估",
    subtitle: "心理测试-你是绝对的异性恋吗？如何明确你的情感归属？",
    image: "/tarot-placeholder.jpg",
    stats: "102769测试",
    rating: "98.6%好评",
    href: "/psych/sexual-orientation",
  },
  {
    id: "phone-fortune",
    title: "手机号码测吉凶",
    subtitle: "解读数字能量，精准破译你的个人运势。",
    image: "/tarot-placeholder.jpg",
    stats: "215458测试",
    rating: "97.9%好评",
    href: "/fortune/phone",
  },
  {
    id: "sleep-quality",
    title: "睡眠质量自评量表",
    subtitle: "心理测试-你有睡眠障碍吗？你的睡眠还好吗？",
    image: "/tarot-placeholder.jpg",
    stats: "154036测试",
    rating: "98.7%好评",
    href: "/psych/sleep-quality",
  },
  {
    id: "love-detector",
    title: "真爱识别器",
    subtitle: "心理测试-你是喜欢TA还是爱TA？",
    image: "/tarot-placeholder.jpg",
    stats: "324797测试",
    rating: "98.8%好评",
    href: "/psych/love-detector",
  },
  {
    id: "sexual-knowledge",
    title: "从性了解你真实的内心",
    subtitle: "心理测试-你是哪种性爱类型？如何提升性福指数？",
    image: "/tarot-placeholder.jpg",
    stats: "100584测试",
    rating: "99.6%好评",
    href: "/psych/sexual-knowledge",
  },
];

export default function Home() {
  return (
    <div className="flex justify-center bg-gray-50 min-h-screen">
      {/* 移动端布局容器 - 限制最大宽度并居中 */}
      <div className="w-full max-w-md flex flex-col min-h-screen bg-white pb-20 relative shadow-md">
        {/* 顶部红色背景区域 - 命中注定的另一半 */}
        <div className="bg-red-500 text-white py-6 px-4 relative">
          {/* Logo和标题 */}
          <div className="flex justify-center items-center">
            <div className="w-6 h-0.5 bg-white opacity-70"></div>
            <h1 className="text-xl font-bold mx-3">爻星阁</h1>
            <div className="w-6 h-0.5 bg-white opacity-70"></div>
          </div>
          
          {/* 主标语 */}
          <div className="mt-6">
            <h2 className="text-4xl font-bold">命中注定的另一半</h2>
            <p className="text-base mt-1">揭秘另一半，让你爱上对的人</p>
          </div>
          
          {/* 情侣插图 - 使用占位图 */}
          <div className="absolute right-0 bottom-0">
            <div className="w-40 h-40 relative">
              <div className="w-40 h-40 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
                <span className="text-white">情侣图片</span>
              </div>
            </div>
          </div>
        </div>
        
        {/* 服务图标网格 */}
        <div className="grid grid-cols-4 bg-white py-4">
          {mainServices.map((service) => (
            <Link 
              key={service.id} 
              href={service.href} 
              className="flex flex-col items-center justify-center"
            >
              <div className="w-14 h-14 rounded-full bg-gray-100 flex items-center justify-center mb-1">
                <span className="text-xs text-gray-500">{service.title.substring(0, 2)}</span>
              </div>
              <span className="text-xs text-center">{service.title}</span>
            </Link>
          ))}
        </div>
        
        {/* 专题服务 */}
        <div className="grid grid-cols-2 gap-4 p-4 bg-white">
          {specialServices.slice(0, 6).map((service) => (
            <Link key={service.id} href={service.href} className="block">
              <div className="border border-gray-200 rounded-lg overflow-hidden flex items-center p-4">
                <div className="mr-3 w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center">
                  <span className="text-xs text-gray-500">{service.title.substring(0, 2)}</span>
                </div>
                <div>
                  <h4 className="font-medium text-base">{service.title}</h4>
                  <p className="text-xs text-gray-500">{service.subtitle}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
        
        {/* 塔罗爱情占卜 */}
        <div className="p-4 bg-white mt-2">
          <div className="flex items-center justify-center mb-4">
            <div className="h-px bg-gray-300 flex-grow"></div>
            <h3 className="text-lg font-bold px-4">塔罗爱情占卜</h3>
            <div className="h-px bg-gray-300 flex-grow"></div>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            {tarotLoveQuestions.map((question) => (
              <Link key={question.id} href={question.href} className="block">
                <div className={`${question.color} text-white p-4 rounded-lg`}>
                  <div className="flex items-center">
                    <div className="flex-grow">
                      <p className="text-base font-medium">{question.title}</p>
                      <div className="flex items-center mt-2">
                        <span className="text-xs bg-white bg-opacity-20 px-2 py-1 rounded">塔罗牌占卜</span>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4 ml-1">
                          <path fillRule="evenodd" d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z" clipRule="evenodd" />
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
        
        {/* 心理测试 */}
        <div className="p-4 bg-white mt-2">
          <div className="flex items-center justify-center mb-4">
            <div className="h-px bg-gray-300 flex-grow"></div>
            <h3 className="text-lg font-bold px-4">心理测试</h3>
            <div className="h-px bg-gray-300 flex-grow"></div>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            {psychTests.map((test) => (
              <Link key={test.id} href={test.href} className="block">
                <div className="border border-gray-200 rounded-lg overflow-hidden">
                  <div className="relative h-32 bg-gray-100 flex items-center justify-center">
                    <span className="text-gray-500">{test.title}</span>
                  </div>
                  <div className="p-3">
                    <h4 className="font-medium text-base">{test.title}</h4>
                    <p className="text-xs text-gray-500">{test.subtitle}</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
        
        {/* 热门测算 */}
        <div className="p-4 bg-white mt-2">
          <div className="flex items-center mb-4 overflow-x-auto whitespace-nowrap pb-2">
            <div className="flex items-center">
              <span className="text-red-500 font-bold">全部测算</span>
              <span className="text-gray-400 mx-4">2025运势</span>
              <span className="text-gray-400">恋爱情感</span>
              <span className="text-gray-400 mx-4">命格大运</span>
              <span className="text-gray-400">财富</span>
            </div>
          </div>
          
          <div className="space-y-4">
            {popularCalculations.slice(0, 10).map((calc) => (
              <Link key={calc.id} href={calc.href} className="block">
                <div className="border border-gray-200 rounded-lg overflow-hidden">
                  <div className="relative h-32 bg-gray-100 flex items-center justify-center">
                    <span className="text-gray-500">{calc.title}</span>
                  </div>
                  <div className="p-3">
                    <h4 className="font-medium text-lg">{calc.title}</h4>
                    <p className="text-sm text-gray-700 mb-2">{calc.subtitle}</p>
                    <div className="flex items-center text-gray-400 text-xs">
                      <span>{calc.stats}</span>
                      <span className="mx-2">|</span>
                      <span className="text-yellow-500">{calc.rating}</span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
        
        {/* 底部导航栏 */}
        <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 py-2 px-4 max-w-md mx-auto">
          <div className="flex justify-around items-center">
            <Link href="/" className="flex flex-col items-center">
              <div className="w-6 h-6 mb-1 text-red-500">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M11.47 3.84a.75.75 0 011.06 0l8.69 8.69a.75.75 0 101.06-1.06l-8.689-8.69a2.25 2.25 0 00-3.182 0l-8.69 8.69a.75.75 0 001.061 1.06l8.69-8.69z" />
                  <path d="M12 5.432l8.159 8.159c.03.03.06.058.091.086v6.198c0 1.035-.84 1.875-1.875 1.875H15a.75.75 0 01-.75-.75v-4.5a.75.75 0 00-.75-.75h-3a.75.75 0 00-.75.75V21a.75.75 0 01-.75.75H5.625a1.875 1.875 0 01-1.875-1.875v-6.198c.03-.028.061-.056.091-.086L12 5.43z" />
                </svg>
              </div>
              <span className="text-xs text-red-500 font-medium">首页</span>
            </Link>
            
            <Link href="/categories" className="flex flex-col items-center">
              <div className="w-6 h-6 mb-1 text-gray-500">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                  <path fillRule="evenodd" d="M3 6a3 3 0 013-3h2.25a3 3 0 013 3v2.25a3 3 0 01-3 3H6a3 3 0 01-3-3V6zm9.75 0a3 3 0 013-3H18a3 3 0 013 3v2.25a3 3 0 01-3 3h-2.25a3 3 0 01-3-3V6zM3 15.75a3 3 0 013-3h2.25a3 3 0 013 3V18a3 3 0 01-3 3H6a3 3 0 01-3-3v-2.25zm9.75 0a3 3 0 013-3H18a3 3 0 013 3V18a3 3 0 01-3 3h-2.25a3 3 0 01-3-3v-2.25z" clipRule="evenodd" />
                </svg>
              </div>
              <span className="text-xs text-gray-500">分类</span>
            </Link>
            
            <Link href="/my-calculations" className="flex flex-col items-center">
              <div className="w-6 h-6 mb-1 text-gray-500">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                  <path fillRule="evenodd" d="M7.5 6a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM3.751 20.105a8.25 8.25 0 0116.498 0 .75.75 0 01-.437.695A18.683 18.683 0 0112 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 01-.437-.695z" clipRule="evenodd" />
                </svg>
              </div>
              <span className="text-xs text-gray-500">我的测算</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
} 