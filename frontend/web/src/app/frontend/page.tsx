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
    id: "face-analysis",
    title: "AI面相分析",
    image: "/tarot-placeholder.jpg",
    href: "/face-analysis",
  },
  {
    id: "palm-analysis",
    title: "AI手相分析",
    image: "/tarot-placeholder.jpg",
    href: "/palm-analysis",
  },
  {
    id: "name-analysis",
    title: "姓名测算",
    image: "/tarot-placeholder.jpg",
    href: "/name/analysis",
  },
];

// 热门测算
const hotCalculations = [
  {
    id: "love-future",
    title: "爱情未来",
    subtitle: "塔罗揭示爱情走向",
    image: "/tarot-placeholder.jpg",
    href: "/tarot/love",
  },
  {
    id: "career-2025",
    title: "事业运2025",
    subtitle: "八字分析事业发展",
    image: "/tarot-placeholder.jpg",
    href: "/bazi/career",
  },
  {
    id: "wealth-future",
    title: "财运预测",
    subtitle: "未来财富走向分析",
    image: "/tarot-placeholder.jpg",
    href: "/fortune/wealth",
  },
  {
    id: "face-wealth",
    title: "面相财富纹",
    subtitle: "AI识别财富面相",
    image: "/tarot-placeholder.jpg",
    href: "/face-analysis/wealth",
  },
];

// 精品测算
const premiumCalculations = [
  {
    id: "lifetime-fate",
    title: "一生运势全解析",
    price: 39.9,
    originalPrice: 99,
    sales: 1289,
    rating: 4.9,
    image: "/tarot-placeholder.jpg",
    href: "/calculations/lifetime",
  },
  {
    id: "marriage-match",
    title: "八字合婚详解",
    price: 29.9,
    originalPrice: 69,
    sales: 956,
    rating: 4.8,
    image: "/tarot-placeholder.jpg",
    href: "/bazi/marriage-detail",
  },
  {
    id: "personal-tarot",
    title: "个人塔罗全牌阵",
    price: 49.9,
    originalPrice: 129,
    sales: 782,
    rating: 4.9,
    image: "/tarot-placeholder.jpg",
    href: "/tarot/personal",
  },
  {
    id: "premium-face",
    title: "AI面相高级解析",
    price: 59.9,
    originalPrice: 159,
    sales: 673,
    rating: 4.7,
    image: "/tarot-placeholder.jpg",
    href: "/face-analysis/premium",
  },
];

// 大师简介
const masters = [
  {
    id: "master-zhang",
    name: "张明道",
    title: "算命大师",
    specialty: "八字命理",
    experience: "20年经验",
    image: "/tarot-placeholder.jpg",
    intro: "精通八字命理、六爻预测、姓名学和风水学，有丰富实战经验",
  },
  {
    id: "master-li",
    name: "李玄机",
    title: "塔罗导师",
    specialty: "塔罗牌占卜",
    experience: "15年经验",
    image: "/tarot-placeholder.jpg",
    intro: "西方塔罗牌占卜专家，曾在欧洲学习深造，擅长解读情感问题",
  },
  {
    id: "master-wang",
    name: "王心理",
    title: "心理咨询师",
    specialty: "命理心理学",
    experience: "12年经验",
    image: "/tarot-placeholder.jpg",
    intro: "国家认证心理咨询师，将现代心理学与传统命理学相结合",
  },
];

// 用户评价
const testimonials = [
  {
    id: "testimonal-1",
    name: "刘小姐",
    age: 28,
    content: "八字分析非常准确，尤其是对我职业选择的建议，让我找到了适合自己的发展方向！",
    avatar: "/tarot-placeholder.jpg",
    service: "八字分析",
  },
  {
    id: "testimonal-2",
    name: "张先生",
    age: 32,
    content: "通过面相分析了解到自己的性格特点，分析师还给了我很多实用的建议，服务很满意。",
    avatar: "/tarot-placeholder.jpg",
    service: "面相分析",
  },
  {
    id: "testimonal-3",
    name: "王女士",
    age: 26,
    content: "塔罗牌预测很神奇，预言的事情大部分都发生了，会一直关注这个平台的~",
    avatar: "/tarot-placeholder.jpg",
    service: "塔罗牌占卜",
  },
];

export default function HomePage() {
  return (
    <div className="flex flex-col gap-8 py-4">
      {/* 顶部横幅轮播 */}
      <section className="px-4">
        <div className="relative h-44 rounded-xl overflow-hidden">
          <Image
            src="/tarot-placeholder.jpg"
            alt={bannerServices[0].title}
            className="object-cover"
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-purple-900/70 to-transparent flex flex-col justify-center p-6">
            <h2 className="text-white text-2xl font-bold">{bannerServices[0].title}</h2>
            <p className="text-white/90 text-sm mt-1 mb-3">{bannerServices[0].subtitle}</p>
            <Link href={bannerServices[0].href}>
              <Button
                className="bg-white text-purple-900 hover:bg-purple-50"
                size="sm"
              >
                立即测算
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* 主要服务图标 */}
      <section className="px-4">
        <div className="grid grid-cols-4 gap-3">
          {mainServices.slice(0, 8).map((service) => (
            <Link key={service.id} href={service.href} className="flex flex-col items-center gap-1">
              <div className="w-14 h-14 rounded-full bg-purple-100 flex items-center justify-center overflow-hidden">
                <Image
                  src={service.image}
                  alt={service.title}
                  width={48}
                  height={48}
                  className="w-8 h-8 object-cover"
                />
              </div>
              <span className="text-xs text-center">{service.title}</span>
            </Link>
          ))}
        </div>
      </section>

      {/* 热门测算 */}
      <section className="px-4">
        <h2 className="text-lg font-bold mb-3">热门测算</h2>
        <div className="grid grid-cols-2 gap-3">
          {hotCalculations.map((calc) => (
            <Link key={calc.id} href={calc.href}>
              <Card className="overflow-hidden h-32 relative">
                <Image
                  src={calc.image}
                  alt={calc.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 50vw, 25vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex flex-col justify-end p-3">
                  <h3 className="text-white font-semibold text-sm">{calc.title}</h3>
                  <p className="text-white/80 text-xs">{calc.subtitle}</p>
                </div>
              </Card>
            </Link>
          ))}
        </div>
      </section>

      {/* 精品测算 */}
      <section className="px-4">
        <div className="flex justify-between items-center mb-3">
          <h2 className="text-lg font-bold">精品测算</h2>
          <Link href="/calculations" className="text-xs text-gray-500">
            查看全部 &gt;
          </Link>
        </div>
        <div className="space-y-3">
          {premiumCalculations.map((calc) => (
            <Link key={calc.id} href={calc.href}>
              <Card className="flex overflow-hidden h-24">
                <div className="w-24 h-24 relative flex-shrink-0">
                  <Image
                    src={calc.image}
                    alt={calc.title}
                    fill
                    className="object-cover"
                    sizes="96px"
                  />
                </div>
                <div className="flex flex-col justify-between p-2 flex-1">
                  <h3 className="font-medium text-sm">{calc.title}</h3>
                  <div className="flex items-center justify-between">
                    <div className="flex items-baseline">
                      <span className="text-red-500 font-bold">¥{calc.price}</span>
                      <span className="text-gray-400 text-xs line-through ml-1">
                        ¥{calc.originalPrice}
                      </span>
                    </div>
                    <div className="flex items-center text-xs text-gray-500">
                      <span className="mr-2">{calc.rating}分</span>
                      <span>{calc.sales}人测</span>
                    </div>
                  </div>
                </div>
              </Card>
            </Link>
          ))}
        </div>
      </section>

      {/* 大师简介 */}
      <section className="px-4">
        <h2 className="text-lg font-bold mb-3">专业命理大师</h2>
        <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
          {masters.map((master) => (
            <Card key={master.id} className="min-w-[200px] p-3 flex flex-col items-center">
              <div className="w-16 h-16 rounded-full overflow-hidden relative">
                <Image
                  src={master.image}
                  alt={master.name}
                  fill
                  className="object-cover"
                  sizes="64px"
                />
              </div>
              <h3 className="font-bold mt-2">{master.name}</h3>
              <p className="text-purple-600 text-xs">{master.title}</p>
              <div className="flex gap-1 mt-1">
                <span className="bg-purple-100 text-purple-800 text-xs px-2 py-0.5 rounded-full">
                  {master.specialty}
                </span>
                <span className="bg-gray-100 text-gray-800 text-xs px-2 py-0.5 rounded-full">
                  {master.experience}
                </span>
              </div>
              <p className="text-xs text-gray-500 mt-2 text-center">{master.intro}</p>
            </Card>
          ))}
        </div>
      </section>

      {/* 用户评价 */}
      <section className="px-4 pb-6">
        <h2 className="text-lg font-bold mb-3">用户评价</h2>
        <div className="space-y-3">
          {testimonials.map((testimonial) => (
            <Card key={testimonial.id} className="p-3">
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 rounded-full overflow-hidden relative flex-shrink-0">
                  <Image
                    src={testimonial.avatar}
                    alt={testimonial.name}
                    fill
                    className="object-cover"
                    sizes="40px"
                  />
                </div>
                <div>
                  <h3 className="font-medium text-sm">
                    {testimonial.name}
                    <span className="text-gray-500 font-normal ml-1">{testimonial.age}岁</span>
                  </h3>
                  <p className="text-xs text-gray-500">{testimonial.service}</p>
                </div>
              </div>
              <p className="text-sm mt-2">{testimonial.content}</p>
            </Card>
          ))}
        </div>
      </section>
    </div>
  );
} 