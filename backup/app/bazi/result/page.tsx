"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function BaziResultPage() {
  const searchParams = useSearchParams();
  const name = searchParams.get("name") || "用户";
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // 模拟加载数据
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <div className="container mx-auto py-20 flex flex-col items-center justify-center">
        <div className="w-16 h-16 border-4 border-fortune-red border-t-transparent rounded-full animate-spin"></div>
        <p className="mt-4 text-lg">正在分析您的八字命盘，请稍候...</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-3xl font-bold text-center mb-2 text-fortune-red">八字命理分析结果</h1>
      <p className="text-center text-gray-500 mb-8">
        {name}，以下是您的八字命理分析结果
      </p>

      <div className="max-w-4xl mx-auto">
        <Tabs defaultValue="overview">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">命盘概览</TabsTrigger>
            <TabsTrigger value="personality">性格分析</TabsTrigger>
            <TabsTrigger value="fortune">运势分析</TabsTrigger>
            <TabsTrigger value="advice">命理建议</TabsTrigger>
          </TabsList>

          <TabsContent value="overview">
            <Card>
              <CardHeader>
                <CardTitle>命盘概览</CardTitle>
                <CardDescription>
                  您的八字命盘基本信息和五行分析
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="rounded-lg border p-4">
                      <h3 className="font-medium text-fortune-red">八字命盘</h3>
                      <div className="mt-2 grid grid-cols-4 gap-2 text-center">
                        <div className="p-2 border rounded-md">
                          <div className="font-bold">甲</div>
                          <div className="text-sm text-gray-500">年柱</div>
                        </div>
                        <div className="p-2 border rounded-md">
                          <div className="font-bold">丙</div>
                          <div className="text-sm text-gray-500">月柱</div>
                        </div>
                        <div className="p-2 border rounded-md">
                          <div className="font-bold">戊</div>
                          <div className="text-sm text-gray-500">日柱</div>
                        </div>
                        <div className="p-2 border rounded-md">
                          <div className="font-bold">庚</div>
                          <div className="text-sm text-gray-500">时柱</div>
                        </div>
                        <div className="p-2 border rounded-md">
                          <div className="font-bold">寅</div>
                          <div className="text-sm text-gray-500">年支</div>
                        </div>
                        <div className="p-2 border rounded-md">
                          <div className="font-bold">午</div>
                          <div className="text-sm text-gray-500">月支</div>
                        </div>
                        <div className="p-2 border rounded-md">
                          <div className="font-bold">申</div>
                          <div className="text-sm text-gray-500">日支</div>
                        </div>
                        <div className="p-2 border rounded-md">
                          <div className="font-bold">子</div>
                          <div className="text-sm text-gray-500">时支</div>
                        </div>
                      </div>
                    </div>

                    <div className="rounded-lg border p-4">
                      <h3 className="font-medium text-fortune-red">五行分析</h3>
                      <div className="mt-2 space-y-2">
                        <div className="flex justify-between items-center">
                          <span>金</span>
                          <div className="w-2/3 bg-gray-200 rounded-full h-2.5">
                            <div className="bg-yellow-500 h-2.5 rounded-full" style={{ width: "30%" }}></div>
                          </div>
                          <span>30%</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span>木</span>
                          <div className="w-2/3 bg-gray-200 rounded-full h-2.5">
                            <div className="bg-green-500 h-2.5 rounded-full" style={{ width: "15%" }}></div>
                          </div>
                          <span>15%</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span>水</span>
                          <div className="w-2/3 bg-gray-200 rounded-full h-2.5">
                            <div className="bg-blue-500 h-2.5 rounded-full" style={{ width: "20%" }}></div>
                          </div>
                          <span>20%</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span>火</span>
                          <div className="w-2/3 bg-gray-200 rounded-full h-2.5">
                            <div className="bg-red-500 h-2.5 rounded-full" style={{ width: "25%" }}></div>
                          </div>
                          <span>25%</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span>土</span>
                          <div className="w-2/3 bg-gray-200 rounded-full h-2.5">
                            <div className="bg-amber-700 h-2.5 rounded-full" style={{ width: "10%" }}></div>
                          </div>
                          <span>10%</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="rounded-lg border p-4">
                    <h3 className="font-medium text-fortune-red">命主信息</h3>
                    <div className="mt-2 grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm text-gray-500">日主五行</p>
                        <p className="font-medium">戊土</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">命局喜用神</p>
                        <p className="font-medium">金、水</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">命局忌神</p>
                        <p className="font-medium">火、土</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">十神</p>
                        <p className="font-medium">正官、偏财、七杀、正印</p>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="personality">
            <Card>
              <CardHeader>
                <CardTitle>性格分析</CardTitle>
                <CardDescription>
                  基于您的八字命盘分析您的性格特点
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="rounded-lg border p-4">
                    <h3 className="font-medium text-fortune-red">性格特点</h3>
                    <p className="mt-2 text-gray-700">
                      您的八字命盘显示您天生具有领导才能，性格坚毅果断，做事有计划性和条理性。您注重实际，善于处理复杂问题，但有时可能显得过于严肃。您重视家庭和传统价值观，对朋友忠诚可靠。
                    </p>
                    <p className="mt-2 text-gray-700">
                      在人际关系中，您通常表现得稳重可靠，但有时可能不善于表达情感。您需要学会更好地沟通自己的感受，以建立更深层次的人际关系。
                    </p>
                  </div>

                  <div className="rounded-lg border p-4">
                    <h3 className="font-medium text-fortune-red">优势与挑战</h3>
                    <div className="mt-2 grid grid-cols-2 gap-4">
                      <div>
                        <h4 className="font-medium text-green-600">优势</h4>
                        <ul className="mt-1 list-disc list-inside text-gray-700">
                          <li>责任感强，做事可靠</li>
                          <li>思维缜密，善于分析</li>
                          <li>意志坚定，不易放弃</li>
                          <li>注重实际，脚踏实地</li>
                          <li>处事公正，原则性强</li>
                        </ul>
                      </div>
                      <div>
                        <h4 className="font-medium text-red-600">挑战</h4>
                        <ul className="mt-1 list-disc list-inside text-gray-700">
                          <li>有时过于固执己见</li>
                          <li>情感表达不够丰富</li>
                          <li>对自己要求过高</li>
                          <li>可能过于保守谨慎</li>
                          <li>适应变化的能力需要提升</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="fortune">
            <Card>
              <CardHeader>
                <CardTitle>运势分析</CardTitle>
                <CardDescription>
                  您的事业、财运、感情等方面的运势分析
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="rounded-lg border p-4">
                    <h3 className="font-medium text-fortune-red">事业运势</h3>
                    <p className="mt-2 text-gray-700">
                      您的八字命盘显示您在事业上具有较强的发展潜力。您适合从事需要细致分析和规划的工作，如金融、管理、工程等领域。您的职业生涯可能会经历一些波折，但总体呈上升趋势。
                    </p>
                    <p className="mt-2 text-gray-700">
                      近期事业运势较为平稳，建议保持稳健的工作态度，不要轻易冒险。2025年下半年可能会有较好的职业发展机会，可以适当把握。
                    </p>
                  </div>

                  <div className="rounded-lg border p-4">
                    <h3 className="font-medium text-fortune-red">财运分析</h3>
                    <p className="mt-2 text-gray-700">
                      您的财运总体稳定，收入来源主要依靠自己的努力工作。您理财能力较强，善于规划和储蓄，但投资方面可能较为保守。
                    </p>
                    <p className="mt-2 text-gray-700">
                      近期财运一般，不宜进行大额投资或冒险。建议稳健理财，适当增加金融知识，为未来做好准备。2025年中期财运有所好转，可能会有意外收获。
                    </p>
                  </div>

                  <div className="rounded-lg border p-4">
                    <h3 className="font-medium text-fortune-red">感情运势</h3>
                    <p className="mt-2 text-gray-700">
                      您在感情方面较为理性，不易被情绪左右。您寻找的伴侣通常是稳重可靠、有共同价值观的人。您的感情生活可能起步较晚，但一旦确立关系，通常比较稳定持久。
                    </p>
                    <p className="mt-2 text-gray-700">
                      近期感情运势平平，单身者可能需要更主动地扩展社交圈。已有伴侣的人需要注意沟通和情感表达，避免因工作忙碌而忽略感情。
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="advice">
            <Card>
              <CardHeader>
                <CardTitle>命理建议</CardTitle>
                <CardDescription>
                  根据您的八字命盘提供的个性化建议
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="rounded-lg border p-4">
                    <h3 className="font-medium text-fortune-red">吉祥物品</h3>
                    <div className="mt-2 grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm text-gray-500">吉祥颜色</p>
                        <p className="font-medium">白色、金色、蓝色</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">吉祥数字</p>
                        <p className="font-medium">1、6、9</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">幸运方位</p>
                        <p className="font-medium">西北、西方</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">适宜佩戴</p>
                        <p className="font-medium">白玉、水晶、银饰</p>
                      </div>
                    </div>
                  </div>

                  <div className="rounded-lg border p-4">
                    <h3 className="font-medium text-fortune-red">事业建议</h3>
                    <p className="mt-2 text-gray-700">
                      您适合从事需要细致分析和规划的工作，如金融、管理、工程等领域。建议您在职业发展中注重专业技能的提升，同时培养团队协作能力。
                    </p>
                    <p className="mt-2 text-gray-700">
                      在工作中，您应该保持稳健的态度，不要急于求成。定期反思和调整自己的职业规划，寻找适合自己的发展路径。
                    </p>
                  </div>

                  <div className="rounded-lg border p-4">
                    <h3 className="font-medium text-fortune-red">健康建议</h3>
                    <p className="mt-2 text-gray-700">
                      您的八字命盘显示您需要特别注意消化系统和呼吸系统的健康。建议保持规律的作息，避免过度劳累和压力。
                    </p>
                    <p className="mt-2 text-gray-700">
                      适合您的运动包括慢跑、游泳、太极等有氧运动。饮食上应注意清淡均衡，避免过于辛辣和油腻的食物。
                    </p>
                  </div>

                  <div className="rounded-lg border p-4">
                    <h3 className="font-medium text-fortune-red">人际关系建议</h3>
                    <p className="mt-2 text-gray-700">
                      您在人际交往中应该学会更好地表达自己的情感和想法，避免过于封闭。尝试参加一些社交活动，扩展自己的社交圈。
                    </p>
                    <p className="mt-2 text-gray-700">
                      在家庭关系中，您应该多花时间陪伴家人，增进感情。在朋友关系中，您可以适当展示自己的真实一面，建立更深层次的友谊。
                    </p>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <p className="text-sm text-gray-500">
                  以上分析结果仅供参考，具体情况还需结合个人实际情况
                </p>
                <Link href="/bazi">
                  <Button variant="outline">返回</Button>
                </Link>
              </CardFooter>
            </Card>
          </TabsContent>
        </Tabs>

        <div className="mt-8 text-center">
          <p className="text-gray-500 mb-4">想要获取更详细的八字命理分析？</p>
          <div className="flex justify-center gap-4">
            <Link href="/dashboard">
              <Button variant="fortune">升级为VIP会员</Button>
            </Link>
            <Link href="/tarot">
              <Button variant="outline">查看塔罗牌占卜</Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
} 