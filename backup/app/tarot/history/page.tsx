'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Card } from '@/components/ui/card';
import { ArrowLeft, ChevronLeft, ChevronRight } from 'lucide-react';

export default function TarotHistoryPage() {
  const [currentPage, setCurrentPage] = useState(0);
  
  const cards = [
    {
      id: 1,
      title: "神秘的起源",
      image: "/images/history/tarot-origin.jpg",
      alt: "塔罗牌起源",
      content: "塔罗牌的确切起源至今仍是一个谜。有些学者认为它起源于古埃及，而另一些则认为它源自中世纪欧洲的纸牌游戏。"
    },
    {
      id: 2,
      title: "从游戏到占卜",
      image: "/images/history/tarot-evolution.jpg",
      alt: "塔罗牌演变",
      content: "最初，塔罗牌被用作纸牌游戏，而非占卜工具。直到18世纪，它才开始与神秘学和占卜联系起来。"
    },
    {
      id: 3,
      title: "现代塔罗",
      image: "/images/history/tarot-modern.jpg",
      alt: "现代塔罗牌",
      content: "今天，塔罗牌已成为流行的自我反思和个人成长工具，超越了传统占卜的范畴，成为心理学和精神探索的一部分。"
    }
  ];
  
  const nextPage = () => {
    setCurrentPage((prev) => (prev === cards.length - 1 ? 0 : prev + 1));
  };
  
  const prevPage = () => {
    setCurrentPage((prev) => (prev === 0 ? cards.length - 1 : prev - 1));
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      {/* 顶部导航 */}
      <div className="bg-purple-700 text-white p-4 flex items-center w-full">
        <Link href="/tarot" className="mr-2">
          <ArrowLeft className="h-6 w-6" />
        </Link>
        <h1 className="text-xl font-bold">塔罗牌的历史</h1>
      </div>
      
      <div className="w-full px-4 py-6 flex-grow">
        {/* 卡片展示区 - 竖向排列 */}
        <div className="mb-8 flex flex-col items-center">
          {/* 卡片列表 */}
          <div className="w-full max-w-md space-y-4">
            {/* 神秘的起源 */}
            <div className="overflow-hidden rounded-lg border border-gray-200 bg-white">
              <div className="relative">
                <div className="relative h-48 bg-gray-100">
                  <Image 
                    src="/images/history/tarot-origin.jpg" 
                    alt="塔罗牌起源" 
                    fill 
                    className="object-cover"
                  />
                </div>
                <div className="bg-purple-100 p-3">
                  <h3 className="text-lg font-bold text-purple-800 text-center">神秘的起源</h3>
                  <p className="text-sm text-purple-900">
                    塔罗牌的确切起源至今仍是一个谜。有些学者认为它起源于古埃及，而另一些则认为它源自中世纪欧洲的纸牌游戏。
                  </p>
                </div>
              </div>
            </div>
            
            {/* 从游戏到占卜 */}
            <div className="overflow-hidden rounded-lg border border-gray-200 bg-white">
              <div className="relative">
                <div className="relative h-48 bg-gray-100">
                  <Image 
                    src="/images/history/tarot-evolution.jpg" 
                    alt="塔罗牌演变" 
                    fill 
                    className="object-cover"
                  />
                </div>
                <div className="bg-purple-100 p-3">
                  <h3 className="text-lg font-bold text-purple-800 text-center">从游戏到占卜</h3>
                  <p className="text-sm text-purple-900">
                    最初，塔罗牌被用作纸牌游戏，而非占卜工具。直到18世纪，它才开始与神秘学和占卜联系起来。
                  </p>
                </div>
              </div>
            </div>
            
            {/* 现代塔罗 */}
            <div className="overflow-hidden rounded-lg border border-gray-200 bg-white">
              <div className="relative">
                <div className="relative h-48 bg-gray-100">
                  <Image 
                    src="/images/history/tarot-modern.jpg" 
                    alt="现代塔罗牌" 
                    fill 
                    className="object-cover"
                  />
                </div>
                <div className="bg-purple-100 p-3">
                  <h3 className="text-lg font-bold text-purple-800 text-center">现代塔罗</h3>
                  <p className="text-sm text-purple-900">
                    今天，塔罗牌已成为流行的自我反思和个人成长工具，超越了传统占卜的范畴，成为心理学和精神探索的一部分。
                  </p>
                </div>
              </div>
            </div>
          </div>
          
          {/* 分页指示器 */}
          <div className="flex justify-between items-center mt-4 w-full max-w-md px-4">
            <button 
              onClick={prevPage}
              className="text-purple-700"
              aria-label="上一页"
            >
              <ChevronLeft className="h-6 w-6" />
            </button>
            
            <div className="h-2 bg-gray-300 rounded-full flex-grow mx-2 relative">
              <div 
                className="absolute top-0 left-0 h-2 bg-purple-600 rounded-full" 
                style={{ width: `${(currentPage / (cards.length - 1)) * 100}%` }}
              ></div>
            </div>
            
            <button 
              onClick={nextPage}
              className="text-purple-700"
              aria-label="下一页"
            >
              <ChevronRight className="h-6 w-6" />
            </button>
          </div>
        </div>
        
        {/* 文章内容 */}
        <div className="bg-white p-6 rounded-lg shadow-sm border border-purple-100 mb-6">
          <h2 className="text-2xl font-bold text-purple-800 mb-4">塔罗牌的起源</h2>
          <p className="text-gray-700 mb-4">
            塔罗牌的历史可以追溯到15世纪的意大利，最初是作为一种纸牌游戏而存在的。最早的塔罗牌套牌是为意大利贵族家庭创作的，如米兰的维斯孔蒂-斯福尔扎家族。这些早期的牌组被称为"trionfi"（胜利），后来演变为"tarocchi"，最终成为我们今天所知的"tarot"（塔罗）。
          </p>
          
          <p className="text-gray-700 mb-6">
            尽管有传言称塔罗牌起源于古埃及或其他古代文明，但历史学家普遍认为这些说法缺乏实质性证据。塔罗牌与神秘学和占卜的联系实际上是在18世纪才开始形成的。
          </p>
          
          <h2 className="text-2xl font-bold text-purple-800 mb-4">从游戏到占卜工具</h2>
          <p className="text-gray-700 mb-4">
            在几个世纪的时间里，塔罗牌主要用于游戏，类似于现代的桥牌。直到18世纪末，法国神秘学家安托万·库尔特·德·盖贝林（Antoine Court de Gébelin）才首次将塔罗牌与埃及神秘学联系起来，声称它们包含了古埃及祭司的秘密智慧。
          </p>
          
          <p className="text-gray-700 mb-6">
            随后，法国占卜师让-巴蒂斯特·阿利埃特（Jean-Baptiste Alliette，笔名Etteilla）创建了第一副专门用于占卜的塔罗牌，并出版了关于如何使用塔罗牌进行占卜的指南。
          </p>
          
          <h2 className="text-2xl font-bold text-purple-800 mb-4">19世纪：神秘学复兴</h2>
          <p className="text-gray-700 mb-4">
            19世纪见证了对神秘学和秘传传统的广泛兴趣复兴。在这一时期，埃利法斯·莱维（Eliphas Lévi）等神秘学家进一步发展了塔罗牌的神秘学解释，将其与卡巴拉、占星术和炼金术等其他神秘传统联系起来。
          </p>
          
          <p className="text-gray-700 mb-6">
            这一时期最重要的发展之一是黄金黎明教团（Hermetic Order of the Golden Dawn）的成立，这是一个影响深远的神秘学组织，其成员包括亚瑟·爱德华·韦特（Arthur Edward Waite）和艾莉斯特·克劳利（Aleister Crowley）。这两位人物后来都创作了自己的塔罗牌套牌，这些套牌至今仍广泛使用。
          </p>
          
          <h2 className="text-2xl font-bold text-purple-800 mb-4">莱德-韦特塔罗牌</h2>
          <p className="text-gray-700 mb-4">
            1909年，A.E.韦特与艺术家帕梅拉·科尔曼·史密斯（Pamela Colman Smith）合作创作了莱德-韦特塔罗牌（Rider-Waite Tarot Deck），这可能是历史上最具影响力的塔罗牌套牌。这副牌的创新之处在于，它不仅在大阿卡纳牌中包含了象征性的图像，小阿卡纳牌也包含了场景插图，而不仅仅是简单的数字和符号。
          </p>
          
          <p className="text-gray-700 mb-6">
            莱德-韦特塔罗牌的普及使得塔罗牌对更广泛的受众变得可访问，并为现代塔罗牌的解读奠定了基础。
          </p>
          
          <h2 className="text-2xl font-bold text-purple-800 mb-4">20世纪至今：心理学解读与流行文化</h2>
          <p className="text-gray-700 mb-4">
            20世纪，随着心理学的发展，特别是荣格分析心理学的兴起，塔罗牌开始被视为探索集体无意识和原型的工具。卡尔·荣格（Carl Jung）的理论为塔罗牌提供了一个心理学框架，使其超越了传统占卜的范畴。
          </p>
          
          <p className="text-gray-700 mb-4">
            今天，塔罗牌已经成为流行文化的一部分，被用于自我反思、个人成长、创意灵感和心理探索。数以千计的塔罗牌套牌已经被创作出来，反映了不同的艺术风格、文化传统和哲学观点。
          </p>
          
          <p className="text-gray-700">
            尽管塔罗牌的历史充满了神话和误解，但它作为一种文化现象的持久魅力是不可否认的。无论是作为一种游戏、占卜工具还是心理探索的媒介，塔罗牌继续吸引着那些寻求智慧和洞察力的人们。
          </p>
        </div>
      </div>
    </div>
  );
} 