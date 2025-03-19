'use client';

import { useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { tarotMeanings } from '@/data/tarotMeanings';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface TarotCardProps {
  name: string;
  position: string;
  image: string;
  isReversed: boolean;
  meaning: string;
  size?: 'sm' | 'md' | 'lg';
  showDetails?: boolean;
  className?: string;
}

export default function TarotCard({
  name,
  position,
  image,
  isReversed,
  meaning,
  size = 'md',
  showDetails = true,
  className,
}: TarotCardProps) {
  const [isFlipped, setIsFlipped] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  // 获取牌义详细信息
  const getCardDetails = () => {
    // 根据名称查找对应的牌
    const cardId = Object.keys(tarotMeanings).find(
      key => tarotMeanings[key].name === name
    );
    
    if (!cardId) return null;
    
    const cardInfo = tarotMeanings[cardId];
    if (!cardInfo) return null;
    
    return {
      meaning: isReversed ? cardInfo.reversedMeaning : cardInfo.meaning,
      description: cardInfo.description || '',
      keywords: cardInfo.keywords || [],
      element: cardInfo.element || '',
      astrology: cardInfo.astrology || ''
    };
  };

  const cardDetails = getCardDetails();

  // 根据尺寸确定卡片大小
  const getCardSize = () => {
    switch (size) {
      case 'sm':
        return 'w-24 h-40';
      case 'lg':
        return 'w-48 h-80';
      case 'md':
      default:
        return 'w-36 h-60';
    }
  };

  return (
    <>
      <motion.div
        className={cn(
          "relative cursor-pointer perspective-1000",
          getCardSize(),
          className
        )}
        onClick={() => showDetails ? setIsDialogOpen(true) : setIsFlipped(!isFlipped)}
        whileHover={{ scale: 1.05 }}
        transition={{ type: 'spring', stiffness: 300, damping: 10 }}
      >
        <motion.div
          className="relative w-full h-full preserve-3d transition-transform duration-500"
          animate={{ rotateY: isFlipped ? 180 : 0 }}
        >
          {/* 卡片正面 */}
          <div className={cn(
            "absolute w-full h-full backface-hidden rounded-lg shadow-lg overflow-hidden border-2 border-primary/20",
            isFlipped ? "invisible" : "visible"
          )}>
            <div className="relative w-full h-full">
              <Image
                src={image || '/tarot-placeholder.jpg'}
                alt={name}
                fill
                className={cn(
                  "object-cover",
                  isReversed ? "rotate-180" : ""
                )}
              />
              {position && (
                <div className="absolute bottom-0 left-0 right-0 bg-black/60 text-white text-center py-1 text-xs">
                  {position}
                </div>
              )}
            </div>
          </div>
          
          {/* 卡片背面 */}
          <div className={cn(
            "absolute w-full h-full backface-hidden rounded-lg shadow-lg overflow-hidden border-2 border-primary/20 bg-card p-2 rotate-y-180",
            isFlipped ? "visible" : "invisible"
          )}>
            <div className="h-full flex flex-col">
              <h3 className="text-center font-semibold text-sm mb-1">{name} {isReversed ? '(逆位)' : '(正位)'}</h3>
              <p className="text-xs overflow-y-auto flex-grow">{cardDetails?.meaning || meaning}</p>
            </div>
          </div>
        </motion.div>
      </motion.div>

      {showDetails && (
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>{name} {isReversed ? '(逆位)' : '(正位)'}</DialogTitle>
              <DialogDescription>
                {position && `位置：${position}`}
              </DialogDescription>
            </DialogHeader>
            
            <div className="flex flex-col md:flex-row gap-4">
              <div className="relative w-32 h-52 mx-auto md:mx-0">
                <Image
                  src={image || '/tarot-placeholder.jpg'}
                  alt={name}
                  fill
                  className={cn(
                    "object-cover rounded-md border-2 border-primary/20",
                    isReversed ? "rotate-180" : ""
                  )}
                />
              </div>
              
              <div className="flex-1">
                <Tabs defaultValue="meaning" className="w-full">
                  <TabsList className="grid w-full grid-cols-3">
                    <TabsTrigger value="meaning">牌义</TabsTrigger>
                    <TabsTrigger value="description">描述</TabsTrigger>
                    <TabsTrigger value="details">详情</TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="meaning" className="text-sm">
                    <p>{cardDetails?.meaning || meaning}</p>
                  </TabsContent>
                  
                  <TabsContent value="description" className="text-sm">
                    <p>{cardDetails?.description || "暂无详细描述"}</p>
                  </TabsContent>
                  
                  <TabsContent value="details" className="text-sm">
                    {cardDetails ? (
                      <div className="space-y-2">
                        <div>
                          <span className="font-semibold">关键词：</span>
                          <div className="flex flex-wrap gap-1 mt-1">
                            {cardDetails.keywords.map((keyword: string, i: number) => (
                              <Badge key={i} variant="outline">{keyword}</Badge>
                            ))}
                          </div>
                        </div>
                        {cardDetails.element && (
                          <p><span className="font-semibold">元素：</span> {cardDetails.element}</p>
                        )}
                        {cardDetails.astrology && (
                          <p><span className="font-semibold">星象：</span> {cardDetails.astrology}</p>
                        )}
                      </div>
                    ) : (
                      <p>暂无详细信息</p>
                    )}
                  </TabsContent>
                </Tabs>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </>
  );
} 