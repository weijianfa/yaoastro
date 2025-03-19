import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";

export const metadata = {
  title: "关于我们 | 爻星阁",
  description: "了解爻星阁的背景、团队和使命",
};

export default function AboutPage() {
  return (
    <div className="container py-12 md:py-16 lg:py-24">
      <div className="mx-auto max-w-4xl space-y-12">
        <div className="space-y-4 text-center">
          <h1 className="text-3xl font-bold tracking-tight text-fortune-red sm:text-4xl md:text-5xl">关于爻星阁</h1>
          <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl">
            探索命运的奥秘，掌握人生的方向
          </p>
        </div>

        <div className="space-y-8">
          <h2 className="text-2xl font-bold tracking-tight">我们的故事</h2>
          <p className="text-gray-600 leading-relaxed">
            爻星阁创立于2023年，由一群热爱中国传统文化和现代科技的专业人士共同创建。我们的创始团队包括资深命理师、心理学家、数据科学家和软件工程师，致力于将传统命理学与现代科技相结合，为用户提供科学、准确、易懂的命理分析和生活指导。
          </p>
          <p className="text-gray-600 leading-relaxed">
            我们的名字"喜乐"取自《周易》中的"善者因之，其次改之"和"大人虎变，其文炳也"，寓意善于把握命运规律，发现生活中的奇妙变化，从而引导人们走向更美好的未来。
          </p>
        </div>

        <div className="space-y-8">
          <h2 className="text-2xl font-bold tracking-tight">我们的使命</h2>
          <p className="text-gray-600 leading-relaxed">
            爻星阁的使命是通过科学解读传统命理学，帮助人们更好地了解自己，认识命运规律，从而在人生道路上做出更明智的选择。我们相信，命理不是决定论，而是提供一种可能性和参考，真正的命运掌握在每个人自己手中。
          </p>
          <div className="grid gap-6 md:grid-cols-3">
            <Card>
              <CardContent className="p-6 space-y-2">
                <div className="h-12 w-12 rounded-full bg-fortune-red/10 flex items-center justify-center text-fortune-red">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10" />
                  </svg>
                </div>
                <h3 className="font-bold">专业可靠</h3>
                <p className="text-sm text-gray-500">
                  我们的分析基于严谨的命理理论和大数据支持，确保专业性和可靠性。
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6 space-y-2">
                <div className="h-12 w-12 rounded-full bg-fortune-purple/10 flex items-center justify-center text-fortune-purple">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M20.42 4.58a5.4 5.4 0 0 0-7.65 0l-.77.78-.77-.78a5.4 5.4 0 0 0-7.65 0C1.46 6.7 1.33 10.28 4 13l8 8 8-8c2.67-2.72 2.54-6.3.42-8.42z" />
                  </svg>
                </div>
                <h3 className="font-bold">用心服务</h3>
                <p className="text-sm text-gray-500">
                  我们用心倾听每位用户的需求，提供贴心、个性化的命理服务。
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6 space-y-2">
                <div className="h-12 w-12 rounded-full bg-fortune-blue/10 flex items-center justify-center text-fortune-blue">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M18 3a3 3 0 0 0-3 3v12a3 3 0 0 0 3 3 3 3 0 0 0 3-3 3 3 0 0 0-3-3H6a3 3 0 0 0-3 3 3 3 0 0 0 3 3 3 3 0 0 0 3-3V6a3 3 0 0 0-3-3 3 3 0 0 0-3 3 3 3 0 0 0 3 3h12a3 3 0 0 0 3-3 3 3 0 0 0-3-3z" />
                  </svg>
                </div>
                <h3 className="font-bold">创新发展</h3>
                <p className="text-sm text-gray-500">
                  我们不断创新，将传统命理与现代科技结合，开创命理服务新模式。
                </p>
              </CardContent>
            </Card>
          </div>
        </div>

        <div className="space-y-8">
          <h2 className="text-2xl font-bold tracking-tight">我们的团队</h2>
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            <div className="flex flex-col items-center text-center space-y-3">
              <div className="h-32 w-32 rounded-full bg-gray-200 overflow-hidden">
                {/* <Image src="/images/team/founder.jpg" alt="创始人" width={128} height={128} className="object-cover" /> */}
              </div>
              <div>
                <h3 className="font-bold">张明远</h3>
                <p className="text-sm text-gray-500">创始人 / 首席命理师</p>
              </div>
              <p className="text-sm text-gray-600">
                拥有20年命理研究经验，精通八字、紫微斗数、奇门遁甲等多种命理体系。
              </p>
            </div>
            <div className="flex flex-col items-center text-center space-y-3">
              <div className="h-32 w-32 rounded-full bg-gray-200 overflow-hidden">
                {/* <Image src="/images/team/tech-lead.jpg" alt="技术负责人" width={128} height={128} className="object-cover" /> */}
              </div>
              <div>
                <h3 className="font-bold">李思远</h3>
                <p className="text-sm text-gray-500">技术负责人</p>
              </div>
              <p className="text-sm text-gray-600">
                前BAT高级工程师，人工智能专家，致力于将AI技术应用于传统命理学。
              </p>
            </div>
            <div className="flex flex-col items-center text-center space-y-3">
              <div className="h-32 w-32 rounded-full bg-gray-200 overflow-hidden">
                {/* <Image src="/images/team/psychology.jpg" alt="心理学顾问" width={128} height={128} className="object-cover" /> */}
              </div>
              <div>
                <h3 className="font-bold">王静怡</h3>
                <p className="text-sm text-gray-500">心理学顾问</p>
              </div>
              <p className="text-sm text-gray-600">
                资深心理咨询师，将现代心理学与传统命理学相结合，提供全面的心理指导。
              </p>
            </div>
          </div>
        </div>

        <div className="space-y-8">
          <h2 className="text-2xl font-bold tracking-tight">联系我们</h2>
          <p className="text-gray-600 leading-relaxed">
            如果您对我们的服务有任何疑问或建议，欢迎随时联系我们。我们的客服团队将在24小时内回复您的咨询。
          </p>
          <div className="grid gap-4 md:grid-cols-2">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-full bg-fortune-red/10 flex items-center justify-center text-fortune-red">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                </svg>
              </div>
              <div>
                <p className="font-medium">电话</p>
                <p className="text-sm text-gray-500">400-123-4567</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-full bg-fortune-red/10 flex items-center justify-center text-fortune-red">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                  <polyline points="22,6 12,13 2,6" />
                </svg>
              </div>
              <div>
                <p className="font-medium">邮箱</p>
                <p className="text-sm text-gray-500">contact@joy-fortune.com</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 