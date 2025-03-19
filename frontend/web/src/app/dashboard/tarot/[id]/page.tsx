import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getTarotAnalysisDetails } from '@/app/actions/tarot';
import TarotResult from '@/components/tarot/TarotResult';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { formatDate } from '@/lib/utils';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import TarotShareButtonWrapper from './share-button';
import TarotAIInterpretationWrapper from './ai-interpretation';

export const metadata: Metadata = {
  title: '塔罗牌占卜结果 | 爻星阁',
  description: '查看您的塔罗牌占卜结果和详细解读。',
};

interface TarotDetailsPageProps {
  params: {
    id: string;
  };
}

export default async function TarotDetailsPage({ params }: TarotDetailsPageProps) {
  const { analysis, error } = await getTarotAnalysisDetails(params.id);

  if (error || !analysis) {
    notFound();
  }

  const content = analysis.content as any;

  return (
    <div className="container mx-auto py-6 space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button variant="outline" size="icon" asChild>
            <Link href="/dashboard/tarot">
              <ArrowLeft className="h-4 w-4" />
            </Link>
          </Button>
          <div>
            <h1 className="text-3xl font-bold tracking-tight">塔罗牌占卜结果</h1>
            <p className="text-muted-foreground">
              创建于 {formatDate(analysis.createdAt)}
            </p>
          </div>
        </div>
        
        <TarotShareButtonWrapper analysisId={params.id} />
      </div>

      <Separator />

      <Card>
        <CardHeader>
          <CardTitle>问题</CardTitle>
          <CardDescription>您提出的问题</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-lg font-medium">{content.question}</p>
        </CardContent>
      </Card>

      <div id="tarot-result-container">
        <Card>
          <CardHeader>
            <CardTitle>牌阵: {content.spread}</CardTitle>
            <CardDescription>塔罗牌解读结果</CardDescription>
          </CardHeader>
          <CardContent>
            <TarotResult result={content} />
          </CardContent>
          <CardFooter className="flex flex-col items-start gap-4">
            <div>
              <h3 className="text-lg font-semibold mb-2">整体解读</h3>
              <p className="whitespace-pre-line">{content.interpretation}</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-2">建议</h3>
              <p>{content.advice}</p>
            </div>
          </CardFooter>
        </Card>
      </div>
      
      <TarotAIInterpretationWrapper 
        result={content} 
        userId={analysis.userId} 
      />
    </div>
  );
} 