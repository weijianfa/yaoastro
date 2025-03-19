import { Metadata } from 'next';
import { getTarotAnalysisHistory } from '@/app/actions/tarot';
import TarotForm from '@/components/tarot/TarotForm';
import TarotHistory from '@/components/tarot/TarotHistory';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';

export const metadata: Metadata = {
  title: '塔罗牌占卜 | 爻星阁',
  description: '通过塔罗牌占卜，探索您的过去、现在和未来，获得生活、爱情、事业等方面的指引。',
};

export default async function TarotPage() {
  const { analyses, error } = await getTarotAnalysisHistory();

  return (
    <div className="container mx-auto py-6 space-y-6">
      <div className="flex flex-col space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">塔罗牌占卜</h1>
        <p className="text-muted-foreground">
          通过塔罗牌占卜，探索您的过去、现在和未来，获得生活、爱情、事业等方面的指引。
        </p>
      </div>

      <Separator />

      <Tabs defaultValue="new" className="w-full">
        <TabsList className="grid w-full md:w-[400px] grid-cols-2">
          <TabsTrigger value="new">新的占卜</TabsTrigger>
          <TabsTrigger value="history">历史记录</TabsTrigger>
        </TabsList>
        
        <TabsContent value="new" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>开始新的塔罗牌占卜</CardTitle>
              <CardDescription>
                请选择牌阵并提出您的问题，系统将为您抽取塔罗牌并进行解读。
              </CardDescription>
            </CardHeader>
            <CardContent>
              <TarotForm />
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="history" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>占卜历史记录</CardTitle>
              <CardDescription>
                查看您之前的塔罗牌占卜结果和解读。
              </CardDescription>
            </CardHeader>
            <CardContent>
              {error ? (
                <p className="text-destructive">{error}</p>
              ) : analyses && analyses.length > 0 ? (
                <TarotHistory analyses={analyses} />
              ) : (
                <p className="text-muted-foreground">您还没有进行过塔罗牌占卜。</p>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
} 