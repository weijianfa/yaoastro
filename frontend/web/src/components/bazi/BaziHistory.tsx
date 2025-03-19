'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { getBaziAnalysisHistory } from '@/app/actions/bazi';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { formatDate } from '@/lib/utils';
import { CalendarIcon, ChevronRightIcon } from 'lucide-react';
import { toast } from '@/components/ui/use-toast';

// 定义API返回的分析数据类型
interface ApiAnalysis {
  id: string;
  createdAt: Date;
  content: {
    question: string;
    result: string;
  };
  order: {
    id: string;
    // 其他订单字段...
  };
}

// 组件内部使用的分析数据类型
interface BaziAnalysis {
  id: string;
  createdAt: string;
  question: string;
  result: string;
}

export default function BaziHistory() {
  const [analyses, setAnalyses] = useState<BaziAnalysis[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchHistory() {
      try {
        const result = await getBaziAnalysisHistory();
        
        if (result.error) {
          toast({
            title: '获取历史记录失败',
            description: result.error,
            variant: 'destructive',
          });
        } else if (result.analyses) {
          // 转换API返回的数据为组件内部使用的格式
          const formattedAnalyses = result.analyses.map((analysis: any) => ({
            id: analysis.id,
            createdAt: analysis.createdAt.toString(),
            question: analysis.content?.question || '',
            result: analysis.content?.result || ''
          }));
          setAnalyses(formattedAnalyses);
        }
      } catch (error) {
        toast({
          title: '获取历史记录失败',
          description: '发生错误，请稍后再试',
          variant: 'destructive',
        });
      } finally {
        setIsLoading(false);
      }
    }

    fetchHistory();
  }, []);

  if (isLoading) {
    return (
      <div className="space-y-4">
        {Array.from({ length: 3 }).map((_, index) => (
          <Card key={index}>
            <CardHeader>
              <Skeleton className="h-6 w-1/3" />
            </CardHeader>
            <CardContent>
              <Skeleton className="h-4 w-full mb-2" />
              <Skeleton className="h-4 w-2/3" />
            </CardContent>
            <CardFooter>
              <Skeleton className="h-10 w-24" />
            </CardFooter>
          </Card>
        ))}
      </div>
    );
  }

  if (analyses.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground mb-4">您还没有进行过八字命理分析</p>
        <Button asChild>
          <Link href="/dashboard/bazi?tab=new">开始第一次分析</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {analyses.map((analysis) => (
        <Card key={analysis.id}>
          <CardHeader>
            <CardTitle className="text-lg flex items-center">
              <CalendarIcon className="h-5 w-5 mr-2" />
              {formatDate(analysis.createdAt)}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground line-clamp-2">
              {analysis.question || '八字命理分析'}
            </p>
          </CardContent>
          <CardFooter>
            <Button variant="outline" size="sm" asChild>
              <Link href={`/dashboard/bazi/${analysis.id}`}>
                查看详情
                <ChevronRightIcon className="h-4 w-4 ml-1" />
              </Link>
            </Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
} 