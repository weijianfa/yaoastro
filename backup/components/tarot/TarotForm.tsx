'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { createTarotAnalysis } from '@/app/actions/tarot';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { toast } from '@/components/ui/use-toast';
import { Loader2 } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import Image from 'next/image';

// 塔罗牌牌阵
const TAROT_SPREADS = [
  { 
    name: '三张牌阵', 
    positions: ['过去', '现在', '未来'],
    description: '最基础的牌阵，适合简单明了的问题。第一张牌代表过去的影响，第二张牌代表当前状况，第三张牌代表未来的发展。',
    layout: 'linear',
    image: '/images/tarot/spreads/three-card.png'
  },
  { 
    name: '凯尔特十字牌阵', 
    positions: ['当前状况', '挑战', '过去', '未来', '意识', '潜意识', '自我认知', '外界影响', '希望或恐惧', '最终结果'],
    description: '最全面的牌阵之一，适合深入分析复杂问题。十张牌从不同角度揭示问题的各个方面。',
    layout: 'celtic-cross',
    image: '/images/tarot/spreads/celtic-cross.png'
  },
  { 
    name: '关系牌阵', 
    positions: ['你自己', '对方', '关系现状', '关系基础', '过去影响', '未来发展'],
    description: '专为分析人际关系设计的牌阵，帮助理解双方的状态和关系的发展方向。',
    layout: 'relationship',
    image: '/images/tarot/spreads/relationship.png'
  },
  { 
    name: '五卡牌阵', 
    positions: ['当前状况', '障碍', '建议', '态度', '结果'],
    description: '平衡而全面的牌阵，适合需要具体建议的问题。五张牌提供问题的概览和解决方案。',
    layout: 'five-card',
    image: '/images/tarot/spreads/five-card.png'
  },
  { 
    name: '生命之树牌阵', 
    positions: ['灵性目标', '智慧', '理解', '仁慈', '严厉', '和谐', '胜利', '荣耀', '基础', '物质世界'],
    description: '基于卡巴拉生命之树的牌阵，适合深度灵性探索和自我发展的问题。',
    layout: 'tree-of-life',
    image: '/images/tarot/spreads/tree-of-life.png'
  },
  { 
    name: '一年展望牌阵', 
    positions: ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月'],
    description: '为未来一年提供月度指引的牌阵，帮助规划和了解每个月的能量和挑战。',
    layout: 'year-ahead',
    image: '/images/tarot/spreads/year-ahead.png'
  }
];

const formSchema = z.object({
  question: z.string().min(1, '请输入您的问题').max(500, '问题不能超过500个字符'),
  spread: z.string().min(1, '请选择牌阵'),
});

export default function TarotForm() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedSpread, setSelectedSpread] = useState<typeof TAROT_SPREADS[0] | null>(null);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      question: '',
      spread: '',
    },
  });

  // 当牌阵选择变化时更新selectedSpread
  useEffect(() => {
    const spreadValue = form.watch('spread');
    if (spreadValue) {
      const spread = TAROT_SPREADS.find(s => s.name === spreadValue);
      setSelectedSpread(spread || null);
    } else {
      setSelectedSpread(null);
    }
  }, [form.watch('spread')]);

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSubmitting(true);

    try {
      const formData = new FormData();
      formData.append('question', values.question);
      formData.append('spread', values.spread);

      const result = await createTarotAnalysis(formData);

      if (result.error) {
        toast({
          title: '提交失败',
          description: result.error,
          variant: 'destructive',
        });
      } else if (result.success && result.analysisId) {
        toast({
          title: '塔罗牌占卜完成',
          description: '您的塔罗牌占卜结果已生成',
        });
        router.push(`/dashboard/tarot/${result.analysisId}`);
      }
    } catch (error) {
      toast({
        title: '提交失败',
        description: '发生错误，请稍后再试',
        variant: 'destructive',
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="spread"
          render={({ field }) => (
            <FormItem>
              <FormLabel>选择牌阵</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="选择牌阵" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {TAROT_SPREADS.map((spread) => (
                    <SelectItem key={spread.name} value={spread.name}>
                      {spread.name} ({spread.positions.length}张牌)
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              
              {selectedSpread ? (
                <Card className="mt-4">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">{selectedSpread.name}</CardTitle>
                    <CardDescription>
                      {selectedSpread.positions.length}张牌 · {selectedSpread.positions.join('、')}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <div className="flex flex-col md:flex-row gap-4 items-center">
                      <div className="relative w-full md:w-1/3 h-40">
                        <Image
                          src={selectedSpread.image || '/images/tarot/spreads/default.png'}
                          alt={selectedSpread.name}
                          fill
                          className="object-contain"
                        />
                      </div>
                      <div className="md:w-2/3">
                        <p className="text-sm text-muted-foreground">{selectedSpread.description}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ) : (
                <FormDescription>
                  请选择一种牌阵，不同的牌阵适用于不同类型的问题。
                </FormDescription>
              )}
              
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="question"
          render={({ field }) => (
            <FormItem>
              <FormLabel>您的问题</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="例如：我的事业发展方向如何？我的感情将会有什么变化？"
                  className="min-h-[120px]"
                  {...field}
                />
              </FormControl>
              <FormDescription>
                请清晰描述您想要了解的问题，这将帮助塔罗牌给出更准确的指引。
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" className="w-full" disabled={isSubmitting}>
          {isSubmitting ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              正在占卜...
            </>
          ) : (
            '开始占卜'
          )}
        </Button>
      </form>
    </Form>
  );
} 