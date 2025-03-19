'use client';

import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Search } from 'lucide-react';

import TarotCard from '@/components/tarot/TarotCard';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { tarotMeanings } from '@/data/tarotMeanings';
import { cn } from '@/lib/utils';

export default function TarotCardsPage() {
  const [searchTerm, setSearchTerm] = useState('');
  
  // 将塔罗牌按类型分组
  const groupedCards = useMemo(() => {
    const majorArcana = Object.values(tarotMeanings).filter(card => card.arcana === 'major');
    const minorArcana = Object.values(tarotMeanings).filter(card => card.arcana === 'minor');
    
    // 按花色进一步分组小阿卡纳
    const suits: Record<string, typeof minorArcana> = {};
    minorArcana.forEach(card => {
      if (card.suit) {
        if (!suits[card.suit]) {
          suits[card.suit] = [];
        }
        suits[card.suit].push(card);
      }
    });
    
    return {
      major: majorArcana,
      minor: minorArcana,
      suits
    };
  }, []);
  
  // 根据搜索词过滤卡片
  const filteredCards = useMemo(() => {
    if (!searchTerm) return groupedCards;
    
    const term = searchTerm.toLowerCase();
    
    const filterFn = (card: typeof tarotMeanings[keyof typeof tarotMeanings]) => 
      card.name.toLowerCase().includes(term) || 
      card.meaning.toLowerCase().includes(term) || 
      card.reversedMeaning.toLowerCase().includes(term) ||
      (card.keywords?.some(k => k.toLowerCase().includes(term)) ?? false);
    
    return {
      major: groupedCards.major.filter(filterFn),
      minor: groupedCards.minor.filter(filterFn),
      suits: Object.fromEntries(
        Object.entries(groupedCards.suits).map(([suit, cards]) => [
          suit,
          cards.filter(filterFn)
        ])
      )
    };
  }, [searchTerm, groupedCards]);

  return (
    <div className="container mx-auto py-8">
      <div className="mb-8 max-w-md mx-auto">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            type="text"
            placeholder="搜索塔罗牌..."
            className="pl-10"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>
      
      <Tabs defaultValue="major" className="w-full">
        <TabsList className="w-full max-w-md mx-auto grid grid-cols-2">
          <TabsTrigger value="major">大阿卡纳牌</TabsTrigger>
          <TabsTrigger value="minor">小阿卡纳牌</TabsTrigger>
        </TabsList>
        
        <TabsContent value="major" className="mt-6">
          <h2 className="text-2xl font-bold mb-6 text-center">大阿卡纳牌</h2>
          
          {filteredCards.major.length === 0 ? (
            <p className="text-center text-muted-foreground py-12">没有找到匹配的塔罗牌</p>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6">
              {filteredCards.major.map((card, index) => (
                <motion.div 
                  key={card.id}
                  className="flex flex-col items-center"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <div className="mb-2">
                    <TarotCard
                      name={card.name}
                      position=""
                      image={card.image || `/tarot-placeholder.jpg`}
                      isReversed={false}
                      meaning={card.meaning}
                      size="sm"
                      showDetails={true}
                    />
                  </div>
                  <p className="text-sm font-medium text-center">{card.name}</p>
                  {card.number !== undefined && (
                    <p className="text-xs text-muted-foreground">#{card.number}</p>
                  )}
                </motion.div>
              ))}
            </div>
          )}
        </TabsContent>
        
        <TabsContent value="minor" className="mt-6">
          <h2 className="text-2xl font-bold mb-6 text-center">小阿卡纳牌</h2>
          
          {filteredCards.minor.length === 0 ? (
            <p className="text-center text-muted-foreground py-12">没有找到匹配的塔罗牌</p>
          ) : (
            <div className="space-y-10">
              {Object.entries(filteredCards.suits).map(([suit, cards]) => (
                <div key={suit} className="space-y-4">
                  <h3 className="text-xl font-semibold capitalize">
                    {suit === 'wands' && '权杖'}
                    {suit === 'cups' && '圣杯'}
                    {suit === 'swords' && '宝剑'}
                    {suit === 'pentacles' && '星币'}
                  </h3>
                  
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6">
                    {cards.map((card, index) => (
                      <motion.div 
                        key={card.id}
                        className="flex flex-col items-center"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.05 }}
                      >
                        <div className="mb-2">
                          <TarotCard
                            name={card.name}
                            position=""
                            image={card.image || `/tarot-placeholder.jpg`}
                            isReversed={false}
                            meaning={card.meaning}
                            size="sm"
                            showDetails={true}
                          />
                        </div>
                        <p className="text-sm font-medium text-center">{card.name}</p>
                      </motion.div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
} 