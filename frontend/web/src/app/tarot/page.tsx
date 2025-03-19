'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Shuffle } from 'lucide-react';

import TarotCard from '@/components/tarot/TarotCard';
import { TarotSpread } from '@/components/tarot/TarotSpread';
import { Button } from '@/components/ui/button';
import { tarotMeanings } from '@/data/tarotMeanings';
import { cn } from '@/lib/utils';

// 获取所有塔罗牌的ID
const allTarotIds = Object.keys(tarotMeanings);

export default function TarotReadingPage() {
  const [selectedCards, setSelectedCards] = useState<Array<{
    id: string;
    name: string;
    position: string;
    image?: string;
    isReversed: boolean;
    meaning: string;
  }>>([]);
  const [isShuffling, setIsShuffling] = useState(false);
  const [readingType, setReadingType] = useState<'past-present-future' | 'celtic-cross'>('past-present-future');

  // 洗牌并选择卡片
  const shuffleAndDraw = () => {
    setIsShuffling(true);
    setTimeout(() => {
      const shuffled = [...allTarotIds].sort(() => Math.random() - 0.5);
      
      let newSelectedCards: Array<{
        id: string;
        name: string;
        position: string;
        image?: string;
        isReversed: boolean;
        meaning: string;
      }> = [];
      
      if (readingType === 'past-present-future') {
        newSelectedCards = [
          { 
            id: shuffled[0], 
            name: tarotMeanings[shuffled[0]].name,
            position: '过去', 
            image: tarotMeanings[shuffled[0]].image,
            isReversed: Math.random() > 0.5,
            meaning: Math.random() > 0.5 ? tarotMeanings[shuffled[0]].reversedMeaning : tarotMeanings[shuffled[0]].meaning
          },
          { 
            id: shuffled[1], 
            name: tarotMeanings[shuffled[1]].name,
            position: '现在', 
            image: tarotMeanings[shuffled[1]].image,
            isReversed: Math.random() > 0.5,
            meaning: Math.random() > 0.5 ? tarotMeanings[shuffled[1]].reversedMeaning : tarotMeanings[shuffled[1]].meaning
          },
          { 
            id: shuffled[2], 
            name: tarotMeanings[shuffled[2]].name,
            position: '未来', 
            image: tarotMeanings[shuffled[2]].image,
            isReversed: Math.random() > 0.5,
            meaning: Math.random() > 0.5 ? tarotMeanings[shuffled[2]].reversedMeaning : tarotMeanings[shuffled[2]].meaning
          },
        ];
      } else {
        // 凯尔特十字牌阵
        const positions = [
          '当前状况', '挑战', '过去', '未来', 
          '意识', '潜意识', '自我认知', '外部影响', 
          '希望或恐惧', '最终结果'
        ];
        
        newSelectedCards = positions.map((position, index) => {
          const isRev = Math.random() > 0.5;
          return {
            id: shuffled[index],
            name: tarotMeanings[shuffled[index]].name,
            position,
            image: tarotMeanings[shuffled[index]].image,
            isReversed: isRev,
            meaning: isRev ? tarotMeanings[shuffled[index]].reversedMeaning : tarotMeanings[shuffled[index]].meaning
          };
        });
      }
      
      setSelectedCards(newSelectedCards);
      setIsShuffling(false);
    }, 1500);
  };

  return (
    <>
      {/* 页面标题 */}
      <div className="bg-purple-700 text-white py-4 px-4">
        <h1 className="text-xl font-bold text-center">塔罗牌占卜</h1>
      </div>
      
      {/* 页面内容 */}
      <div className="p-4">
        <div className="bg-purple-50 rounded-lg p-4 mb-6">
          <h2 className="text-lg font-bold mb-2">探索命运的奥秘</h2>
          <p className="text-gray-700">
            塔罗牌通过神秘的符号和图像，揭示潜意识中的智慧，为您的问题提供指引和启示。
          </p>
        </div>
        
        {/* 牌阵选择 */}
        <div className="mb-6">
          <h3 className="font-bold text-lg mb-3">选择牌阵</h3>
          <div className="grid grid-cols-2 gap-3">
            <div 
              className={cn(
                "border rounded-lg p-3 text-center cursor-pointer",
                readingType === 'past-present-future' ? "bg-purple-50 border-purple-300" : "hover:bg-purple-50"
              )}
              onClick={() => setReadingType('past-present-future')}
            >
              <p className="font-medium">过去-现在-未来</p>
              <p className="text-xs text-gray-500">三张牌简单解读</p>
            </div>
            <div 
              className={cn(
                "border rounded-lg p-3 text-center cursor-pointer",
                readingType === 'celtic-cross' ? "bg-purple-50 border-purple-300" : "hover:bg-purple-50"
              )}
              onClick={() => setReadingType('celtic-cross')}
            >
              <p className="font-medium">凯尔特十字</p>
              <p className="text-xs text-gray-500">十张牌深度解读</p>
            </div>
          </div>
        </div>
        
        {/* 洗牌区域 */}
        <div className="text-center mb-6">
          <Button 
            onClick={shuffleAndDraw}
            disabled={isShuffling}
            className="bg-purple-600 hover:bg-purple-700 text-white py-2 px-4 rounded-lg flex items-center justify-center space-x-2"
          >
            <Shuffle className="h-5 w-5" />
            <span>{isShuffling ? '洗牌中...' : '洗牌并抽取'}</span>
          </Button>
        </div>
        
        {/* 卡片展示区域 */}
        {isShuffling && (
          <div className="flex justify-center py-12">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
            >
              <Shuffle className="h-12 w-12 text-purple-600" />
            </motion.div>
          </div>
        )}
        
        {!isShuffling && selectedCards.length > 0 && (
          <div className="mt-6 space-y-6">
            <h3 className="font-bold text-lg text-center">您的塔罗解读</h3>
            <div className="overflow-x-auto">
              <div className="flex flex-wrap justify-center gap-4 p-2">
                {selectedCards.map((card, index) => (
                  <div key={index} className="w-full max-w-[150px]">
                    <div className="text-center mb-2 text-sm font-medium">{card.position}</div>
                    <div className={`border rounded-lg p-2 ${card.isReversed ? 'bg-red-50' : 'bg-green-50'}`}>
                      <div className="text-center mb-1 font-bold">{card.name}</div>
                      <div className="text-xs text-gray-600">{card.meaning}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
        
        {!isShuffling && selectedCards.length === 0 && (
          <div className="text-center text-gray-500 py-10">
            <p>点击上方按钮开始塔罗牌占卜</p>
          </div>
        )}
      </div>
    </>
  );
} 