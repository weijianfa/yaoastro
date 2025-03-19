import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getBaziAnalysisDetails } from '@/app/actions/bazi';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { formatDate } from '@/lib/utils';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export const metadata: Metadata = {
  title: '八字命理分析结果 | 爻星阁',
  description: '查看您的八字命理分析结果和详细解读。',
};

interface BaziDetailsPageProps {
  params: {
    id: string;
  };
}

export default async function BaziDetailsPage({ params }: BaziDetailsPageProps) {
  const { analysis, error } = await getBaziAnalysisDetails(params.id);

  if (error || !analysis) {
    notFound();
  }

  const content = analysis.content as any;

  return (
    <div className="container mx-auto py-6 space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="outline" size="icon" asChild>
          <Link href="/dashboard/bazi">
            <ArrowLeft className="h-4 w-4" />
          </Link>
        </Button>
        <div>
          <h1 className="text-3xl font-bold tracking-tight">八字命理分析结果</h1>
          <p className="text-muted-foreground">
            创建于 {formatDate(analysis.createdAt)}
          </p>
        </div>
      </div>

      <Separator />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-1 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>基本信息</CardTitle>
              <CardDescription>您的出生信息</CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="flex justify-between">
                <span className="text-muted-foreground">出生日期：</span>
                <span className="font-medium">{content.birthYear}年{content.birthMonth}月{content.birthDay}日</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">出生时辰：</span>
                <span className="font-medium">{content.birthHour}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">性别：</span>
                <span className="font-medium">{content.gender === 'MALE' ? '男' : '女'}</span>
              </div>
              {content.question && (
                <div className="pt-2">
                  <span className="text-muted-foreground">咨询问题：</span>
                  <p className="mt-1">{content.question}</p>
                </div>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>八字命盘</CardTitle>
              <CardDescription>您的八字命盘信息</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-4 gap-2 text-center">
                <div className="bg-muted p-2 rounded-md">
                  <div className="text-xs text-muted-foreground">年柱</div>
                  <div className="font-medium">{content.baziChart.yearPillar.heavenlyStem}</div>
                  <div className="font-medium">{content.baziChart.yearPillar.earthlyBranch}</div>
                </div>
                <div className="bg-muted p-2 rounded-md">
                  <div className="text-xs text-muted-foreground">月柱</div>
                  <div className="font-medium">{content.baziChart.monthPillar.heavenlyStem}</div>
                  <div className="font-medium">{content.baziChart.monthPillar.earthlyBranch}</div>
                </div>
                <div className="bg-muted p-2 rounded-md">
                  <div className="text-xs text-muted-foreground">日柱</div>
                  <div className="font-medium">{content.baziChart.dayPillar.heavenlyStem}</div>
                  <div className="font-medium">{content.baziChart.dayPillar.earthlyBranch}</div>
                </div>
                <div className="bg-muted p-2 rounded-md">
                  <div className="text-xs text-muted-foreground">时柱</div>
                  <div className="font-medium">{content.baziChart.hourPillar.heavenlyStem}</div>
                  <div className="font-medium">{content.baziChart.hourPillar.earthlyBranch}</div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>五行分析</CardTitle>
              <CardDescription>您的五行属性分析</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div>
                  <div className="text-sm font-medium mb-1">日主五行：{content.elementAnalysis.dayMasterElement}</div>
                  <div className="h-2 bg-muted rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-primary" 
                      style={{ width: '100%' }}
                    ></div>
                  </div>
                </div>
                {Object.entries(content.elementAnalysis.elementDistribution).map(([element, value]: [string, any]) => (
                  <div key={element}>
                    <div className="text-sm font-medium mb-1">
                      {element}：{value.count} ({value.percentage}%)
                    </div>
                    <div className="h-2 bg-muted rounded-full overflow-hidden">
                      <div 
                        className={`h-full ${getElementColor(element)}`} 
                        style={{ width: `${value.percentage}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="md:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>命盘解读</CardTitle>
              <CardDescription>您的八字命盘详细解读</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="prose prose-sm max-w-none dark:prose-invert">
                <h3>总体分析</h3>
                <p>{content.analysis.overview}</p>
                
                <h3>性格特点</h3>
                <p>{content.analysis.personality}</p>
                
                <h3>事业分析</h3>
                <p>{content.analysis.career}</p>
                
                <h3>财运分析</h3>
                <p>{content.analysis.wealth}</p>
                
                <h3>健康分析</h3>
                <p>{content.analysis.health}</p>
                
                {content.analysis.relationships && (
                  <>
                    <h3>人际关系</h3>
                    <p>{content.analysis.relationships}</p>
                  </>
                )}
                
                {content.analysis.marriage && (
                  <>
                    <h3>婚姻分析</h3>
                    <p>{content.analysis.marriage}</p>
                  </>
                )}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>运势预测</CardTitle>
              <CardDescription>未来运势预测和建议</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="prose prose-sm max-w-none dark:prose-invert">
                <h3>大运分析</h3>
                <p>{content.predictions.majorFortune}</p>
                
                <h3>流年运势</h3>
                <p>{content.predictions.annualFortune}</p>
                
                <h3>吉凶神煞</h3>
                <ul>
                  {content.predictions.luckyStar.map((star: string, index: number) => (
                    <li key={`lucky-${index}`}>吉：{star}</li>
                  ))}
                  {content.predictions.unluckyStar.map((star: string, index: number) => (
                    <li key={`unlucky-${index}`}>凶：{star}</li>
                  ))}
                </ul>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>建议</CardTitle>
              <CardDescription>根据您的八字命盘提供的建议</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="prose prose-sm max-w-none dark:prose-invert">
                <p>{content.recommendations}</p>
                
                <h3>宜忌</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h4>宜</h4>
                    <ul>
                      {content.doAndDont.do.map((item: string, index: number) => (
                        <li key={`do-${index}`}>{item}</li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h4>忌</h4>
                    <ul>
                      {content.doAndDont.dont.map((item: string, index: number) => (
                        <li key={`dont-${index}`}>{item}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button asChild className="w-full">
                <Link href="/dashboard/bazi">
                  返回八字命理
                </Link>
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
}

// 根据五行属性获取颜色
function getElementColor(element: string): string {
  const colors: Record<string, string> = {
    '金': 'bg-yellow-400',
    '木': 'bg-green-500',
    '水': 'bg-blue-500',
    '火': 'bg-red-500',
    '土': 'bg-amber-600',
  };
  
  return colors[element] || 'bg-primary';
} 