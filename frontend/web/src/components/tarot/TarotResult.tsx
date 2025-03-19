'use client';

import { TarotAnalysisContent } from '@/types/analysis';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import TarotCard from '@/components/tarot/TarotCard';

interface TarotResultProps {
  result: TarotAnalysisContent;
}

export default function TarotResult({ result }: TarotResultProps) {
  const { cards, spread } = result;

  // 根据牌阵类型确定布局
  const getLayoutClassName = () => {
    switch (spread) {
      case '三张牌阵':
        return 'grid grid-cols-1 md:grid-cols-3 gap-4';
      case '五卡牌阵':
        return 'grid grid-cols-1 md:grid-cols-5 gap-4';
      case '凯尔特十字牌阵':
        return 'grid grid-cols-1 md:grid-cols-3 md:grid-rows-4 gap-4 md:gap-2 md:w-[90%] md:mx-auto';
      case '关系牌阵':
        return 'grid grid-cols-1 md:grid-cols-3 md:grid-rows-2 gap-4';
      case '生命之树牌阵':
        return 'grid grid-cols-1 md:grid-cols-4 md:grid-rows-4 gap-4 md:gap-2 md:w-[90%] md:mx-auto';
      case '一年展望牌阵':
        return 'grid grid-cols-1 md:grid-cols-4 md:grid-rows-3 gap-4 md:gap-2';
      default:
        return 'flex flex-wrap gap-4';
    }
  };

  // 获取卡片样式
  const getCardStyle = (card: any, index: number) => {
    const isReversed = card.isReversed;
    
    // 基础样式
    const baseStyle = "flex justify-center items-center";
    
    // 根据牌阵和位置添加特殊样式
    if (spread === '凯尔特十字牌阵') {
      // 凯尔特十字牌阵的特殊位置样式
      if (index === 0) return cn(baseStyle, "md:col-span-1 md:row-span-1 md:col-start-2 md:row-start-2"); // 当前状况
      if (index === 1) return cn(baseStyle, "md:col-span-1 md:row-span-1 md:col-start-2 md:row-start-3"); // 挑战
      if (index === 2) return cn(baseStyle, "md:col-span-1 md:row-span-1 md:col-start-1 md:row-start-2"); // 过去
      if (index === 3) return cn(baseStyle, "md:col-span-1 md:row-span-1 md:col-start-3 md:row-start-2"); // 未来
      if (index === 4) return cn(baseStyle, "md:col-span-1 md:row-span-1 md:col-start-2 md:row-start-1"); // 意识
      if (index === 5) return cn(baseStyle, "md:col-span-1 md:row-span-1 md:col-start-2 md:row-start-4"); // 潜意识
      if (index === 6) return cn(baseStyle, "md:col-span-1 md:row-span-1 md:col-start-3 md:row-start-4"); // 自我认知
      if (index === 7) return cn(baseStyle, "md:col-span-1 md:row-span-1 md:col-start-3 md:row-start-3"); // 外界影响
      if (index === 8) return cn(baseStyle, "md:col-span-1 md:row-span-1 md:col-start-3 md:row-start-1"); // 希望或恐惧
      if (index === 9) return cn(baseStyle, "md:col-span-1 md:row-span-1 md:col-start-1 md:row-start-1"); // 最终结果
    } else if (spread === '关系牌阵') {
      // 关系牌阵的特殊位置样式
      if (index === 0) return cn(baseStyle, "md:col-span-1 md:row-span-1 md:col-start-1 md:row-start-1"); // 你自己
      if (index === 1) return cn(baseStyle, "md:col-span-1 md:row-span-1 md:col-start-3 md:row-start-1"); // 对方
      if (index === 2) return cn(baseStyle, "md:col-span-1 md:row-span-1 md:col-start-2 md:row-start-1"); // 关系现状
      if (index === 3) return cn(baseStyle, "md:col-span-1 md:row-span-1 md:col-start-2 md:row-start-2"); // 关系基础
      if (index === 4) return cn(baseStyle, "md:col-span-1 md:row-span-1 md:col-start-1 md:row-start-2"); // 过去影响
      if (index === 5) return cn(baseStyle, "md:col-span-1 md:row-span-1 md:col-start-3 md:row-start-2"); // 未来发展
    } else if (spread === '生命之树牌阵') {
      // 生命之树牌阵的特殊位置样式
      if (index === 0) return cn(baseStyle, "md:col-span-1 md:row-span-1 md:col-start-2 md:row-start-1"); // 灵性目标
      if (index === 1) return cn(baseStyle, "md:col-span-1 md:row-span-1 md:col-start-1 md:row-start-2"); // 智慧
      if (index === 2) return cn(baseStyle, "md:col-span-1 md:row-span-1 md:col-start-3 md:row-start-2"); // 理解
      if (index === 3) return cn(baseStyle, "md:col-span-1 md:row-span-1 md:col-start-1 md:row-start-3"); // 仁慈
      if (index === 4) return cn(baseStyle, "md:col-span-1 md:row-span-1 md:col-start-3 md:row-start-3"); // 严厉
      if (index === 5) return cn(baseStyle, "md:col-span-1 md:row-span-1 md:col-start-2 md:row-start-3"); // 和谐
      if (index === 6) return cn(baseStyle, "md:col-span-1 md:row-span-1 md:col-start-1 md:row-start-4"); // 胜利
      if (index === 7) return cn(baseStyle, "md:col-span-1 md:row-span-1 md:col-start-3 md:row-start-4"); // 荣耀
      if (index === 8) return cn(baseStyle, "md:col-span-1 md:row-span-1 md:col-start-2 md:row-start-4"); // 基础
      if (index === 9) return cn(baseStyle, "md:col-span-1 md:row-span-1 md:col-start-2 md:row-start-2"); // 物质世界
    } else if (spread === '一年展望牌阵') {
      // 一年展望牌阵的特殊位置样式 (4x3 网格)
      const row = Math.floor(index / 4) + 1;
      const col = (index % 4) + 1;
      return cn(baseStyle, `md:col-span-1 md:row-span-1 md:col-start-${col} md:row-start-${row}`);
    }
    
    return baseStyle;
  };

  return (
    <div className="space-y-8">
      <div className={getLayoutClassName()}>
        {cards.map((card, index) => (
          <div key={index} className={getCardStyle(card, index)}>
            <TarotCard
              name={card.name}
              position={card.position}
              image={card.image}
              isReversed={card.isReversed}
              meaning={card.meaning}
              size="md"
            />
          </div>
        ))}
      </div>
      
      <div className="space-y-4 mt-8">
        <Card>
          <CardHeader>
            <CardTitle>整体解读</CardTitle>
          </CardHeader>
          <CardContent>
            <p>{result.interpretation}</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>建议</CardTitle>
          </CardHeader>
          <CardContent>
            <p>{result.advice}</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
} 