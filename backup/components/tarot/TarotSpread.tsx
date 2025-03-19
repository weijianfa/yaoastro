'use client';

import React from 'react';
import { motion } from 'framer-motion';
import TarotCard from './TarotCard';
import { cn } from '@/lib/utils';

interface TarotCardData {
  id: string;
  name: string;
  position: string;
  image?: string;
  isReversed: boolean;
  meaning: string;
}

interface TarotSpreadProps {
  cards: TarotCardData[];
  type: 'past-present-future' | 'celtic-cross';
  className?: string;
}

export function TarotSpread({ cards, type, className }: TarotSpreadProps) {
  if (!cards.length) return null;

  // 三卡阵布局
  if (type === 'past-present-future') {
    return (
      <div className={cn("grid grid-cols-1 sm:grid-cols-3 gap-8 justify-items-center", className)}>
        {cards.map((card, index) => (
          <motion.div 
            key={index}
            className="w-full max-w-[200px]"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.2 }}
          >
            <div className="aspect-[2/3] mb-2">
              <TarotCard
                name={card.name}
                position={card.position}
                image={card.image || `/images/tarot/${card.id}.jpg`}
                isReversed={card.isReversed}
                meaning={card.meaning}
                showDetails={true}
              />
            </div>
            <div className="text-center">
              <p className="font-medium">{card.position}</p>
              <p className="text-sm text-muted-foreground">{card.name} {card.isReversed ? '(逆位)' : '(正位)'}</p>
            </div>
          </motion.div>
        ))}
      </div>
    );
  }

  // 凯尔特十字牌阵布局
  return (
    <div className={cn("relative w-full max-w-4xl mx-auto h-[600px] sm:h-[700px]", className)}>
      {/* 中心十字 */}
      <motion.div 
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        <TarotCard
          name={cards[0].name}
          position={cards[0].position}
          image={cards[0].image || `/images/tarot/${cards[0].id}.jpg`}
          isReversed={cards[0].isReversed}
          meaning={cards[0].meaning}
          size="md"
        />
      </motion.div>

      {/* 横跨的牌 */}
      <motion.div 
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rotate-90"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
      >
        <TarotCard
          name={cards[1].name}
          position={cards[1].position}
          image={cards[1].image || `/images/tarot/${cards[1].id}.jpg`}
          isReversed={cards[1].isReversed}
          meaning={cards[1].meaning}
          size="md"
        />
      </motion.div>

      {/* 底部牌 */}
      <motion.div 
        className="absolute left-1/2 bottom-[15%] -translate-x-1/2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
      >
        <TarotCard
          name={cards[2].name}
          position={cards[2].position}
          image={cards[2].image || `/images/tarot/${cards[2].id}.jpg`}
          isReversed={cards[2].isReversed}
          meaning={cards[2].meaning}
          size="md"
        />
      </motion.div>

      {/* 顶部牌 */}
      <motion.div 
        className="absolute left-1/2 top-[15%] -translate-x-1/2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
      >
        <TarotCard
          name={cards[3].name}
          position={cards[3].position}
          image={cards[3].image || `/images/tarot/${cards[3].id}.jpg`}
          isReversed={cards[3].isReversed}
          meaning={cards[3].meaning}
          size="md"
        />
      </motion.div>

      {/* 右侧牌 */}
      <motion.div 
        className="absolute right-[15%] top-1/2 -translate-y-1/2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.0 }}
      >
        <TarotCard
          name={cards[4].name}
          position={cards[4].position}
          image={cards[4].image || `/images/tarot/${cards[4].id}.jpg`}
          isReversed={cards[4].isReversed}
          meaning={cards[4].meaning}
          size="md"
        />
      </motion.div>

      {/* 右侧列 */}
      <div className="absolute right-[5%] top-1/2 -translate-y-1/2 flex flex-col gap-4">
        {cards.slice(5, 10).map((card, index) => (
          <motion.div 
            key={index + 5}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 1.2 + index * 0.2 }}
          >
            <TarotCard
              name={card.name}
              position={card.position}
              image={card.image || `/images/tarot/${card.id}.jpg`}
              isReversed={card.isReversed}
              meaning={card.meaning}
              size="sm"
            />
          </motion.div>
        ))}
      </div>

      {/* 位置说明 */}
      <div className="absolute bottom-0 left-0 right-0 flex justify-center gap-2 flex-wrap">
        {cards.map((card, index) => (
          <div key={index} className="text-xs bg-background/80 px-2 py-1 rounded-md">
            {index + 1}: {card.position}
          </div>
        ))}
      </div>
    </div>
  );
} 