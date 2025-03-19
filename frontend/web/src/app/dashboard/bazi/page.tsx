import { Metadata } from 'next';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import BaziForm from '@/components/bazi/BaziForm';
import BaziHistory from '@/components/bazi/BaziHistory';

export const metadata: Metadata = {
  title: '八字命理分析 | 爻星阁',
  description: '基于您的出生年月日时，分析您的八字命盘，了解命运走向和人生规划。',
};

export default async function BaziPage() {
  return (
    <div className="container mx-auto py-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">八字命理分析</h1>
        <p className="text-muted-foreground">
          基于您的出生年月日时，分析您的八字命盘，了解命运走向和人生规划。
        </p>
      </div>

      <Tabs defaultValue="new" className="w-full">
        <TabsList className="grid w-full max-w-md grid-cols-2">
          <TabsTrigger value="new">新的分析</TabsTrigger>
          <TabsTrigger value="history">历史记录</TabsTrigger>
        </TabsList>
        
        <TabsContent value="new" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>八字命理分析</CardTitle>
              <CardDescription>
                请填写您的出生信息，我们将为您提供详细的八字命理分析。
              </CardDescription>
            </CardHeader>
            <CardContent>
              <BaziForm />
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="history" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>历史分析记录</CardTitle>
              <CardDescription>
                查看您之前的八字命理分析结果。
              </CardDescription>
            </CardHeader>
            <CardContent>
              <BaziHistory />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
} 