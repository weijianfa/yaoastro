'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { ArrowLeft } from 'lucide-react';

interface SpreadInfo {
  id: string;
  name: string;
  description: string;
  positions: { position: number; meaning: string }[];
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  purpose: string[];
}

const tarotSpreads: SpreadInfo[] = [
  {
    id: 'single-card',
    name: '单卡阵',
    description: '最简单的塔罗牌阵，抽取一张牌来回答一个具体问题或获取每日指引。适合初学者和需要快速回答的场合。',
    positions: [
      { position: 1, meaning: '当前情况或问题的答案' }
    ],
    difficulty: 'beginner',
    purpose: ['日常指引', '简单问题', '冥想焦点']
  },
  {
    id: 'past-present-future',
    name: '过去-现在-未来',
    description: '三卡阵是最受欢迎的塔罗牌阵之一，它提供了问题的时间线视角，展示过去的影响、当前的状况和可能的未来发展。',
    positions: [
      { position: 1, meaning: '过去：影响当前情况的过去事件或能量' },
      { position: 2, meaning: '现在：当前面临的情况或能量' },
      { position: 3, meaning: '未来：如果继续当前路径可能的结果' }
    ],
    difficulty: 'beginner',
    purpose: ['时间线分析', '情况发展', '简单决策']
  },
  {
    id: 'celtic-cross',
    name: '凯尔特十字牌阵',
    description: '凯尔特十字牌阵是最全面的塔罗牌阵之一，提供了问题的深入分析。它包含十个位置，涵盖了问题的各个方面，从当前情况到潜在结果。',
    positions: [
      { position: 1, meaning: '当前状况：代表咨询者目前的处境' },
      { position: 2, meaning: '挑战：当前面临的主要挑战或障碍' },
      { position: 3, meaning: '过去：近期影响当前情况的事件' },
      { position: 4, meaning: '未来：即将到来的影响或事件' },
      { position: 5, meaning: '意识：咨询者的目标或期望' },
      { position: 6, meaning: '潜意识：隐藏的因素或未意识到的影响' },
      { position: 7, meaning: '自我认知：咨询者对自己在情况中的看法' },
      { position: 8, meaning: '外部影响：他人或环境的影响' },
      { position: 9, meaning: '希望或恐惧：咨询者的希望或恐惧' },
      { position: 10, meaning: '最终结果：如果当前路径继续，可能的结果' }
    ],
    difficulty: 'advanced',
    purpose: ['深入分析', '复杂问题', '全面视角']
  },
  {
    id: 'relationship',
    name: '关系牌阵',
    description: '这个牌阵专门用于分析两个人之间的关系，无论是浪漫关系、友谊还是工作关系。它提供了双方视角和关系动态的洞察。',
    positions: [
      { position: 1, meaning: '咨询者在关系中的角色或态度' },
      { position: 2, meaning: '伴侣/对方在关系中的角色或态度' },
      { position: 3, meaning: '关系的基础或过去' },
      { position: 4, meaning: '关系的现状' },
      { position: 5, meaning: '关系的挑战或障碍' },
      { position: 6, meaning: '关系的潜力或可能的发展' }
    ],
    difficulty: 'intermediate',
    purpose: ['关系分析', '伴侣互动', '冲突解决']
  },
  {
    id: 'career-path',
    name: '职业路径牌阵',
    description: '这个牌阵帮助分析职业相关的问题，包括当前工作环境、挑战、机会和可能的发展方向。',
    positions: [
      { position: 1, meaning: '当前职业状况' },
      { position: 2, meaning: '职业目标或愿望' },
      { position: 3, meaning: '职业优势或技能' },
      { position: 4, meaning: '职业挑战或弱点' },
      { position: 5, meaning: '需要采取的行动' },
      { position: 6, meaning: '可能的结果或机会' }
    ],
    difficulty: 'intermediate',
    purpose: ['职业发展', '工作决策', '技能评估']
  }
];

export default function TarotSpreadsPage() {
  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      {/* 顶部导航 */}
      <div className="bg-purple-700 text-white p-4 flex items-center w-full">
        <Link href="/tarot" className="mr-2">
          <ArrowLeft className="h-6 w-6" />
        </Link>
        <h1 className="text-xl font-bold">塔罗牌阵介绍</h1>
      </div>
      
      <div className="w-full px-4 py-6 flex-grow">
        <p className="text-center text-muted-foreground mb-6 max-w-3xl mx-auto">
          塔罗牌阵是指塔罗牌的特定排列方式，每个位置都有特定的含义。
          不同的牌阵适用于不同类型的问题和解读深度。
        </p>
        
        <Tabs defaultValue="all" className="w-full">
          <TabsList className="w-full max-w-full mx-auto grid grid-cols-3 mb-6 bg-purple-100">
            <TabsTrigger value="all" className="data-[state=active]:bg-purple-600 data-[state=active]:text-white">全部</TabsTrigger>
            <TabsTrigger value="beginner" className="data-[state=active]:bg-purple-600 data-[state=active]:text-white">初学者</TabsTrigger>
            <TabsTrigger value="advanced" className="data-[state=active]:bg-purple-600 data-[state=active]:text-white">进阶</TabsTrigger>
          </TabsList>
          
          <TabsContent value="all" className="mt-4">
            <div className="flex flex-col gap-4 w-full">
              {tarotSpreads.map((spread, index) => (
                <SpreadCard key={spread.id} spread={spread} index={index} />
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="beginner" className="mt-4">
            <div className="flex flex-col gap-4 w-full">
              {tarotSpreads
                .filter(spread => spread.difficulty === 'beginner')
                .map((spread, index) => (
                  <SpreadCard key={spread.id} spread={spread} index={index} />
                ))}
            </div>
          </TabsContent>
          
          <TabsContent value="advanced" className="mt-4">
            <div className="flex flex-col gap-4 w-full">
              {tarotSpreads
                .filter(spread => spread.difficulty === 'advanced' || spread.difficulty === 'intermediate')
                .map((spread, index) => (
                  <SpreadCard key={spread.id} spread={spread} index={index} />
                ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}

function SpreadCard({ spread, index }: { spread: SpreadInfo; index: number }) {
  // 根据牌阵类型生成占位图的颜色
  const getPlaceholderColor = () => {
    switch(spread.id) {
      case 'single-card': return 'bg-blue-100';
      case 'past-present-future': return 'bg-green-100';
      case 'celtic-cross': return 'bg-purple-100';
      case 'relationship': return 'bg-pink-100';
      case 'career-path': return 'bg-yellow-100';
      default: return 'bg-gray-100';
    }
  };
  
  // 生成牌阵位置的可视化表示
  const renderSpreadVisual = () => {
    switch(spread.id) {
      case 'single-card':
        return (
          <div className="flex items-center justify-center h-full">
            <div className="w-16 h-24 bg-blue-200 border border-blue-300 rounded-lg shadow-md flex items-center justify-center transform hover:scale-105 transition-transform">
              <span className="text-blue-800 font-bold">1</span>
            </div>
          </div>
        );
      case 'past-present-future':
        return (
          <div className="flex items-center justify-center h-full gap-2">
            <div className="w-12 h-20 bg-green-200 border border-green-300 rounded-lg shadow-md flex items-center justify-center transform hover:scale-105 transition-transform">
              <span className="text-green-800 font-bold">1</span>
            </div>
            <div className="w-12 h-20 bg-green-200 border border-green-300 rounded-lg shadow-md flex items-center justify-center transform hover:scale-105 transition-transform">
              <span className="text-green-800 font-bold">2</span>
            </div>
            <div className="w-12 h-20 bg-green-200 border border-green-300 rounded-lg shadow-md flex items-center justify-center transform hover:scale-105 transition-transform">
              <span className="text-green-800 font-bold">3</span>
            </div>
          </div>
        );
      case 'celtic-cross':
        return (
          <div className="flex flex-col items-center justify-center h-full">
            <div className="flex items-center mb-2">
              <div className="w-8 h-12 bg-purple-200 border border-purple-300 rounded-lg shadow-sm flex items-center justify-center">
                <span className="text-purple-800 font-bold text-xs">3</span>
              </div>
              <div className="w-8 h-12 bg-purple-200 border border-purple-300 rounded-lg shadow-sm flex items-center justify-center">
                <span className="text-purple-800 font-bold text-xs">1</span>
              </div>
              <div className="w-8 h-12 bg-purple-200 border border-purple-300 rounded-lg shadow-sm flex items-center justify-center">
                <span className="text-purple-800 font-bold text-xs">4</span>
              </div>
            </div>
            <div className="flex items-center">
              <div className="w-8 h-12 bg-purple-200 border border-purple-300 rounded-lg shadow-sm flex items-center justify-center">
                <span className="text-purple-800 font-bold text-xs">5</span>
              </div>
              <div className="w-8 h-12 bg-purple-200 border border-purple-300 rounded-lg shadow-sm flex items-center justify-center relative">
                <span className="text-purple-800 font-bold text-xs">2</span>
                <div className="absolute w-8 h-12 bg-purple-200 border border-purple-300 rounded-lg shadow-sm flex items-center justify-center rotate-90">
                  <span className="text-purple-800 font-bold text-xs">6</span>
                </div>
              </div>
              <div className="w-8 h-12 bg-purple-200 border border-purple-300 rounded-lg shadow-sm flex items-center justify-center">
                <span className="text-purple-800 font-bold text-xs">7</span>
              </div>
            </div>
            <div className="flex items-center mt-2">
              <div className="w-8 h-12 bg-purple-200 border border-purple-300 rounded-lg shadow-sm flex items-center justify-center">
                <span className="text-purple-800 font-bold text-xs">10</span>
              </div>
              <div className="w-8 h-12 bg-purple-200 border border-purple-300 rounded-lg shadow-sm flex items-center justify-center">
                <span className="text-purple-800 font-bold text-xs">9</span>
              </div>
              <div className="w-8 h-12 bg-purple-200 border border-purple-300 rounded-lg shadow-sm flex items-center justify-center">
                <span className="text-purple-800 font-bold text-xs">8</span>
              </div>
            </div>
          </div>
        );
      case 'relationship':
        return (
          <div className="flex flex-col items-center justify-center h-full">
            <div className="flex items-center justify-center gap-4 mb-2">
              <div className="w-10 h-16 bg-pink-200 border border-pink-300 rounded-lg shadow-sm flex items-center justify-center">
                <span className="text-pink-800 font-bold">1</span>
              </div>
              <div className="w-10 h-16 bg-pink-200 border border-pink-300 rounded-lg shadow-sm flex items-center justify-center">
                <span className="text-pink-800 font-bold">2</span>
              </div>
            </div>
            <div className="flex items-center justify-center gap-2">
              <div className="w-10 h-16 bg-pink-200 border border-pink-300 rounded-lg shadow-sm flex items-center justify-center">
                <span className="text-pink-800 font-bold">3</span>
              </div>
              <div className="w-10 h-16 bg-pink-200 border border-pink-300 rounded-lg shadow-sm flex items-center justify-center">
                <span className="text-pink-800 font-bold">4</span>
              </div>
              <div className="w-10 h-16 bg-pink-200 border border-pink-300 rounded-lg shadow-sm flex items-center justify-center">
                <span className="text-pink-800 font-bold">5</span>
              </div>
              <div className="w-10 h-16 bg-pink-200 border border-pink-300 rounded-lg shadow-sm flex items-center justify-center">
                <span className="text-pink-800 font-bold">6</span>
              </div>
            </div>
          </div>
        );
      case 'career-path':
        return (
          <div className="flex flex-wrap items-center justify-center h-full gap-2">
            <div className="w-10 h-16 bg-yellow-200 border border-yellow-300 rounded-lg shadow-sm flex items-center justify-center">
              <span className="text-yellow-800 font-bold">1</span>
            </div>
            <div className="w-10 h-16 bg-yellow-200 border border-yellow-300 rounded-lg shadow-sm flex items-center justify-center">
              <span className="text-yellow-800 font-bold">2</span>
            </div>
            <div className="w-10 h-16 bg-yellow-200 border border-yellow-300 rounded-lg shadow-sm flex items-center justify-center">
              <span className="text-yellow-800 font-bold">3</span>
            </div>
            <div className="w-10 h-16 bg-yellow-200 border border-yellow-300 rounded-lg shadow-sm flex items-center justify-center">
              <span className="text-yellow-800 font-bold">4</span>
            </div>
            <div className="w-10 h-16 bg-yellow-200 border border-yellow-300 rounded-lg shadow-sm flex items-center justify-center">
              <span className="text-yellow-800 font-bold">5</span>
            </div>
            <div className="w-10 h-16 bg-yellow-200 border border-yellow-300 rounded-lg shadow-sm flex items-center justify-center">
              <span className="text-yellow-800 font-bold">6</span>
            </div>
          </div>
        );
      default:
        return (
          <div className="flex items-center justify-center h-full">
            <span className="text-gray-500">暂无图片</span>
          </div>
        );
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      className="w-full"
    >
      <Card className="flex flex-row overflow-hidden border-purple-100 hover:border-purple-300 transition-colors shadow-sm hover:shadow-md w-full">
        <div className={`relative w-1/4 ${getPlaceholderColor()} border-r border-purple-100`}>
          {renderSpreadVisual()}
        </div>
        <div className="w-3/4 flex flex-col">
          <CardHeader className="bg-gradient-to-r from-purple-50 to-purple-100 pb-3">
            <CardTitle className="text-purple-800">{spread.name}</CardTitle>
            <CardDescription>
              <span className="flex items-center gap-2 mt-1">
                <span className={cn(
                  "text-xs px-2 py-1 rounded-full",
                  spread.difficulty === 'beginner' ? "bg-green-100 text-green-800" :
                  spread.difficulty === 'intermediate' ? "bg-yellow-100 text-yellow-800" :
                  "bg-red-100 text-red-800"
                )}>
                  {spread.difficulty === 'beginner' ? '初学者' : 
                   spread.difficulty === 'intermediate' ? '中级' : '高级'}
                </span>
                <span className="text-xs text-muted-foreground">
                  {spread.positions.length} 张牌
                </span>
              </span>
            </CardDescription>
          </CardHeader>
          <CardContent className="flex-grow flex flex-col pt-4">
            <p className="text-sm mb-4 text-gray-700">{spread.description}</p>
            
            <div className="mt-auto">
              <h4 className="text-sm font-medium mb-2 text-purple-700">适用于：</h4>
              <div className="flex flex-wrap gap-1">
                {spread.purpose.map(purpose => (
                  <span key={purpose} className="text-xs bg-purple-50 text-purple-700 px-2 py-1 rounded-md border border-purple-100">
                    {purpose}
                  </span>
                ))}
              </div>
            </div>
          </CardContent>
        </div>
      </Card>
    </motion.div>
  );
} 