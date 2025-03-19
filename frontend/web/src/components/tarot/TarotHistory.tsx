'use client';

import Link from 'next/link';
import { formatDate } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Eye } from 'lucide-react';

interface TarotHistoryProps {
  analyses: any[];
}

export default function TarotHistory({ analyses }: TarotHistoryProps) {
  return (
    <div className="space-y-4">
      {analyses.map((analysis) => {
        const content = analysis.content as any;
        return (
          <Card key={analysis.id} className="overflow-hidden">
            <CardHeader className="pb-3">
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="text-lg">
                    {content.question.length > 50
                      ? `${content.question.substring(0, 50)}...`
                      : content.question}
                  </CardTitle>
                  <CardDescription>
                    {formatDate(analysis.createdAt)}
                  </CardDescription>
                </div>
                <div className="px-2 py-1 bg-primary/10 text-primary rounded-md text-xs font-medium">
                  {content.spread}
                </div>
              </div>
            </CardHeader>
            <CardContent className="pb-3">
              <div className="flex flex-wrap gap-2">
                {content.cards && content.cards.slice(0, 3).map((card: any, index: number) => (
                  <div key={index} className="flex items-center gap-1 text-sm">
                    <span className="font-medium">{card.position}:</span>
                    <span>{card.name}{card.isReversed ? ' (逆位)' : ' (正位)'}</span>
                  </div>
                ))}
                {content.cards && content.cards.length > 3 && (
                  <span className="text-sm text-muted-foreground">...</span>
                )}
              </div>
            </CardContent>
            <CardFooter>
              <Button asChild variant="outline" size="sm" className="w-full">
                <Link href={`/dashboard/tarot/${analysis.id}`}>
                  <Eye className="mr-2 h-4 w-4" />
                  查看详情
                </Link>
              </Button>
            </CardFooter>
          </Card>
        );
      })}
    </div>
  );
} 