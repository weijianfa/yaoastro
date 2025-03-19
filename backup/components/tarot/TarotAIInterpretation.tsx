'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { toast } from '@/components/ui/use-toast';
import { Loader2, Sparkles } from 'lucide-react';
import { TarotAnalysisContent } from '@/types/analysis';

interface TarotAIInterpretationProps {
  result: TarotAnalysisContent;
  userId: string;
}

export default function TarotAIInterpretation({ result, userId }: TarotAIInterpretationProps) {
  const [isGenerating, setIsGenerating] = useState(false);
  const [aiInterpretation, setAiInterpretation] = useState<string | null>(null);
  const [additionalContext, setAdditionalContext] = useState('');
  
  // 生成AI增强解读
  const generateAIInterpretation = async () => {
    setIsGenerating(true);
    
    try {
      // 构建请求数据
      const requestData = {
        userId,
        question: result.question,
        spread: result.spread,
        cards: result.cards,
        additionalContext: additionalContext.trim(),
      };
      
      // 发送请求到AI解读API
      const response = await fetch('/api/tarot/ai-interpretation', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestData),
      });
      
      if (!response.ok) {
        throw new Error('生成AI解读失败');
      }
      
      const data = await response.json();
      
      if (data.error) {
        throw new Error(data.error);
      }
      
      setAiInterpretation(data.interpretation);
      
      toast({
        title: 'AI解读已生成',
        description: '您的个性化塔罗牌解读已生成',
      });
    } catch (error) {
      console.error('生成AI解读失败:', error);
      toast({
        title: '生成失败',
        description: '无法生成AI解读，请稍后再试',
        variant: 'destructive',
      });
    } finally {
      setIsGenerating(false);
    }
  };
  
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <Sparkles className="h-5 w-5 mr-2 text-yellow-500" />
          AI增强解读
        </CardTitle>
        <CardDescription>
          获取由AI提供的个性化塔罗牌解读，根据您的具体情况提供更深入的分析
        </CardDescription>
      </CardHeader>
      
      <CardContent className="space-y-4">
        {!aiInterpretation ? (
          <>
            <p className="text-sm text-muted-foreground">
              您可以提供更多关于您自身情况的信息，以获得更准确的个性化解读。
              例如：您的年龄、职业、当前面临的具体问题或困扰等。
            </p>
            
            <Textarea
              placeholder="请输入更多背景信息（可选）..."
              className="min-h-[100px]"
              value={additionalContext}
              onChange={(e) => setAdditionalContext(e.target.value)}
            />
          </>
        ) : (
          <div className="prose prose-sm max-w-none dark:prose-invert">
            <p className="whitespace-pre-line">{aiInterpretation}</p>
          </div>
        )}
      </CardContent>
      
      <CardFooter>
        {!aiInterpretation ? (
          <Button 
            onClick={generateAIInterpretation} 
            disabled={isGenerating}
            className="w-full"
          >
            {isGenerating ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                生成中...
              </>
            ) : (
              <>
                <Sparkles className="mr-2 h-4 w-4" />
                生成AI增强解读
              </>
            )}
          </Button>
        ) : (
          <Button 
            variant="outline" 
            onClick={() => setAiInterpretation(null)}
            className="w-full"
          >
            重新生成
          </Button>
        )}
      </CardFooter>
    </Card>
  );
} 