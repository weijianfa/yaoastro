import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

export default function HomePage() {
  return (
    <div className="flex min-h-screen flex-col">
      {/* 导航栏 */}
      <header className="sticky top-0 z-40 border-b bg-background">
        <div className="container flex h-16 items-center justify-between py-4">
          <div className="flex items-center gap-2">
            <Link href="/" className="font-bold text-2xl text-fortune-red">
              爻星阁
            </Link>
          </div>
          <nav className="hidden md:flex items-center gap-6">
            <Link href="/bazi" className="text-sm font-medium hover:text-fortune-red">
              八字命理
            </Link>
            <Link href="/tarot" className="text-sm font-medium hover:text-fortune-red">
              塔罗占卜
            </Link>
            <Link href="/face-analysis" className="text-sm font-medium hover:text-fortune-red">
              AI面相手相
            </Link>
            <Link href="/psychology-test" className="text-sm font-medium hover:text-fortune-red">
              心理测试
            </Link>
            <Link href="/blessing" className="text-sm font-medium hover:text-fortune-red">
              祈福许愿
            </Link>
          </nav>
          <div className="flex items-center gap-2">
            <Link href="/login">
              <Button variant="outline" size="sm">
                登录
              </Button>
            </Link>
            <Link href="/register">
              <Button variant="fortune" size="sm">
                注册
              </Button>
            </Link>
          </div>
        </div>
      </header>

      <main className="flex-1">
        {/* 英雄区域 */}
        <section className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-b from-white to-gray-100">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none text-fortune-red">
                  探索命运的奥秘，掌握人生的方向
                </h1>
                <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl">
                  爻星阁，集命理测算、塔罗占卜、心理测试、祈福许愿于一体的综合性命理应用
                </p>
              </div>
              <div className="flex flex-col gap-2 min-[400px]:flex-row">
                <Link href="/register">
                  <Button variant="fortune" size="lg">
                    立即体验
                  </Button>
                </Link>
                <Link href="#features">
                  <Button variant="outline" size="lg">
                    了解更多
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* 特色服务 */}
        <section id="features" className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="mb-12 text-center">
              <h2 className="text-3xl font-bold tracking-tight text-fortune-red">特色服务</h2>
              <p className="mt-4 text-lg text-gray-500">
                我们提供多种专业命理服务，满足您不同的需求
              </p>
            </div>
            <div className="grid gap-6 lg:grid-cols-3 lg:gap-12">
              <div className="flex flex-col items-center justify-center space-y-4 text-center">
                <div className="h-16 w-16 rounded-full bg-fortune-red flex items-center justify-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-white"
                  >
                    <circle cx="12" cy="12" r="10" />
                    <path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20" />
                    <path d="M2 12h20" />
                  </svg>
                </div>
                <div className="space-y-2">
                  <h3 className="text-xl font-bold">八字命理</h3>
                  <p className="text-sm text-gray-500">
                    基于出生年月日时，分析您的命格、大运、流年运势
                  </p>
                </div>
              </div>
              <div className="flex flex-col items-center justify-center space-y-4 text-center">
                <div className="h-16 w-16 rounded-full bg-fortune-purple flex items-center justify-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-white"
                  >
                    <path d="m21.64 3.64-1.28-1.28a1.21 1.21 0 0 0-1.72 0L2.36 18.64a1.21 1.21 0 0 0 0 1.72l1.28 1.28a1.2 1.2 0 0 0 1.72 0L21.64 5.36a1.2 1.2 0 0 0 0-1.72Z" />
                    <path d="m14 7 3 3" />
                    <path d="M5 6v4" />
                    <path d="M19 14v4" />
                    <path d="M10 2v2" />
                    <path d="M7 8H3" />
                    <path d="M21 16h-4" />
                    <path d="M11 3H9" />
                  </svg>
                </div>
                <div className="space-y-2">
                  <h3 className="text-xl font-bold">塔罗占卜</h3>
                  <p className="text-sm text-gray-500">
                    通过塔罗牌的神秘力量，解读您的情感、事业、财运等问题
                  </p>
                </div>
              </div>
              <div className="flex flex-col items-center justify-center space-y-4 text-center">
                <div className="h-16 w-16 rounded-full bg-fortune-blue flex items-center justify-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-white"
                  >
                    <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
                  </svg>
                </div>
                <div className="space-y-2">
                  <h3 className="text-xl font-bold">AI面相手相</h3>
                  <p className="text-sm text-gray-500">
                    利用先进的AI技术，分析您的面相和手相特征，揭示性格和命运
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 用户评价 */}
        <section className="w-full py-12 md:py-24 lg:py-32 bg-gray-50">
          <div className="container px-4 md:px-6">
            <div className="mb-12 text-center">
              <h2 className="text-3xl font-bold tracking-tight text-fortune-red">用户评价</h2>
              <p className="mt-4 text-lg text-gray-500">
                看看其他用户对我们服务的评价
              </p>
            </div>
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              <Card>
                <CardHeader>
                  <div className="flex items-center gap-4">
                    <div className="h-12 w-12 rounded-full bg-gray-200"></div>
                    <div>
                      <CardTitle className="text-lg">张先生</CardTitle>
                      <CardDescription>北京</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">
                    "八字分析非常准确，对我的职业发展提供了很好的指导。推荐给所有想了解自己命运的朋友！"
                  </p>
                </CardContent>
                <CardFooter>
                  <div className="flex text-yellow-400">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      stroke="none"
                    >
                      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                    </svg>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      stroke="none"
                    >
                      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                    </svg>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      stroke="none"
                    >
                      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                    </svg>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      stroke="none"
                    >
                      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                    </svg>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      stroke="none"
                    >
                      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                    </svg>
                  </div>
                </CardFooter>
              </Card>
              <Card>
                <CardHeader>
                  <div className="flex items-center gap-4">
                    <div className="h-12 w-12 rounded-full bg-gray-200"></div>
                    <div>
                      <CardTitle className="text-lg">李女士</CardTitle>
                      <CardDescription>上海</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">
                    "塔罗占卜服务非常专业，解读详细且有深度。通过占卜我对自己的感情问题有了更清晰的认识。"
                  </p>
                </CardContent>
                <CardFooter>
                  <div className="flex text-yellow-400">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      stroke="none"
                    >
                      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                    </svg>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      stroke="none"
                    >
                      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                    </svg>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      stroke="none"
                    >
                      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                    </svg>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      stroke="none"
                    >
                      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                    </svg>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      stroke="none"
                    >
                      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                    </svg>
                  </div>
                </CardFooter>
              </Card>
              <Card>
                <CardHeader>
                  <div className="flex items-center gap-4">
                    <div className="h-12 w-12 rounded-full bg-gray-200"></div>
                    <div>
                      <CardTitle className="text-lg">王先生</CardTitle>
                      <CardDescription>广州</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">
                    "AI面相分析太神奇了！分析结果与我的性格特点高度吻合，让我对自己有了更深入的了解。"
                  </p>
                </CardContent>
                <CardFooter>
                  <div className="flex text-yellow-400">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      stroke="none"
                    >
                      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                    </svg>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      stroke="none"
                    >
                      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                    </svg>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      stroke="none"
                    >
                      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                    </svg>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      stroke="none"
                    >
                      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                    </svg>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      stroke="none"
                    >
                      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                    </svg>
                  </div>
                </CardFooter>
              </Card>
            </div>
          </div>
        </section>

        {/* 会员计划 */}
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="mb-12 text-center">
              <h2 className="text-3xl font-bold tracking-tight text-fortune-red">会员计划</h2>
              <p className="mt-4 text-lg text-gray-500">
                选择适合您的会员计划，享受更多专业服务
              </p>
            </div>
            <div className="grid gap-6 md:grid-cols-3">
              <Card className="border-2 border-gray-200">
                <CardHeader>
                  <CardTitle className="text-xl">免费会员</CardTitle>
                  <CardDescription>
                    <span className="text-3xl font-bold">¥0</span> / 永久
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <ul className="space-y-2">
                    <li className="flex items-center">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="mr-2 text-green-500"
                      >
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                      基础八字命盘查询
                    </li>
                    <li className="flex items-center">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="mr-2 text-green-500"
                      >
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                      每日3次塔罗单牌占卜
                    </li>
                    <li className="flex items-center">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="mr-2 text-green-500"
                      >
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                      1次免费心理测试
                    </li>
                  </ul>
                </CardContent>
                <CardFooter>
                  <Link href="/register" className="w-full">
                    <Button variant="outline" className="w-full">
                      立即注册
                    </Button>
                  </Link>
                </CardFooter>
              </Card>
              <Card className="border-2 border-fortune-red relative">
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-fortune-red text-white px-4 py-1 rounded-full text-sm font-medium">
                  最受欢迎
                </div>
                <CardHeader>
                  <CardTitle className="text-xl">黄金会员</CardTitle>
                  <CardDescription>
                    <span className="text-3xl font-bold">¥99</span> / 月
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <ul className="space-y-2">
                    <li className="flex items-center">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="mr-2 text-green-500"
                      >
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                      详细八字命盘分析
                    </li>
                    <li className="flex items-center">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="mr-2 text-green-500"
                      >
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                      无限塔罗牌占卜
                    </li>
                    <li className="flex items-center">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="mr-2 text-green-500"
                      >
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                      所有心理测试
                    </li>
                    <li className="flex items-center">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="mr-2 text-green-500"
                      >
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                      每月10次AI面相分析
                    </li>
                    <li className="flex items-center">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="mr-2 text-green-500"
                      >
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                      优先客服支持
                    </li>
                  </ul>
                </CardContent>
                <CardFooter>
                  <Link href="/register?plan=gold" className="w-full">
                    <Button variant="fortune" className="w-full">
                      立即加入
                    </Button>
                  </Link>
                </CardFooter>
              </Card>
              <Card className="border-2 border-gray-200">
                <CardHeader>
                  <CardTitle className="text-xl">白金会员</CardTitle>
                  <CardDescription>
                    <span className="text-3xl font-bold">¥199</span> / 月
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <ul className="space-y-2">
                    <li className="flex items-center">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="mr-2 text-green-500"
                      >
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                      专业八字命理全套分析
                    </li>
                    <li className="flex items-center">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="mr-2 text-green-500"
                      >
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                      无限塔罗牌占卜
                    </li>
                    <li className="flex items-center">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="mr-2 text-green-500"
                      >
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                      所有高级心理测试
                    </li>
                    <li className="flex items-center">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="mr-2 text-green-500"
                      >
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                      无限AI面相和手相分析
                    </li>
                    <li className="flex items-center">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="mr-2 text-green-500"
                      >
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                      专属命理师一对一咨询
                    </li>
                    <li className="flex items-center">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="mr-2 text-green-500"
                      >
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                      7x24小时VIP客服
                    </li>
                  </ul>
                </CardContent>
                <CardFooter>
                  <Link href="/register?plan=platinum" className="w-full">
                    <Button variant="outline" className="w-full">
                      立即加入
                    </Button>
                  </Link>
                </CardFooter>
              </Card>
            </div>
          </div>
        </section>

        {/* 常见问题 */}
        <section className="w-full py-12 md:py-24 lg:py-32 bg-gray-50">
          <div className="container px-4 md:px-6">
            <div className="mb-12 text-center">
              <h2 className="text-3xl font-bold tracking-tight text-fortune-red">常见问题</h2>
              <p className="mt-4 text-lg text-gray-500">
                关于我们服务的一些常见问题解答
              </p>
            </div>
            <div className="grid gap-6 md:grid-cols-2 lg:gap-12">
              <div className="space-y-4">
                <h3 className="text-xl font-bold">八字命理分析准确吗？</h3>
                <p className="text-gray-600">
                  八字命理分析基于中国传统命理学，通过您的出生年月日时计算命盘。我们的分析结合了传统理论和现代解读，提供参考性的人生指导，但不应作为唯一决策依据。
                </p>
              </div>
              <div className="space-y-4">
                <h3 className="text-xl font-bold">如何保护我的个人信息？</h3>
                <p className="text-gray-600">
                  我们严格遵守隐私保护政策，所有用户信息均采用加密存储。您的个人资料和测算结果仅供您个人查看，不会泄露给任何第三方。
                </p>
              </div>
              <div className="space-y-4">
                <h3 className="text-xl font-bold">会员可以退订吗？</h3>
                <p className="text-gray-600">
                  是的，您可以随时在个人中心取消会员订阅。取消后，您可以继续使用会员服务直到当前计费周期结束，之后将自动转为免费会员。
                </p>
              </div>
              <div className="space-y-4">
                <h3 className="text-xl font-bold">AI面相分析使用什么技术？</h3>
                <p className="text-gray-600">
                  我们的AI面相分析使用先进的计算机视觉和深度学习技术，结合传统面相学理论，分析面部特征与性格、命运的关联。该技术不断学习和优化，提供越来越准确的分析结果。
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* 注册引导 */}
        <section className="w-full py-12 md:py-24 lg:py-32 bg-fortune-red text-white">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tight">开启您的命理之旅</h2>
                <p className="mx-auto max-w-[700px] text-gray-100 md:text-xl">
                  立即注册，探索命运的奥秘，掌握人生的方向
                </p>
              </div>
              <div className="flex flex-col gap-2 min-[400px]:flex-row">
                <Link href="/register">
                  <Button variant="outline" size="lg" className="bg-white text-fortune-red hover:bg-gray-100">
                    免费注册
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t py-6 md:py-0">
        <div className="container flex flex-col items-center justify-between gap-4 md:h-24 md:flex-row">
          <p className="text-sm text-gray-500">
            &copy; {new Date().getFullYear()} 爻星阁. 保留所有权利.
          </p>
          <div className="flex gap-4">
            <Link href="/terms" className="text-sm text-gray-500 hover:underline">
              使用条款
            </Link>
            <Link href="/privacy" className="text-sm text-gray-500 hover:underline">
              隐私政策
            </Link>
            <Link href="/contact" className="text-sm text-gray-500 hover:underline">
              联系我们
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
