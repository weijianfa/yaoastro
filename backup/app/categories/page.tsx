'use client';

import Link from "next/link";
import { useState } from "react";

const categories = [
  {
    id: "all",
    title: "全部",
    href: "#",
    color: "bg-white",
  },
  {
    id: "fortune-2025",
    title: "2025运势",
    href: "#",
    color: "bg-white",
  },
  {
    id: "love",
    title: "恋爱情感",
    href: "#",
    color: "bg-white",
  },
  {
    id: "destiny",
    title: "命格大运",
    href: "#",
    color: "bg-white",
  },
  {
    id: "wealth",
    title: "财富事业",
    href: "#",
    color: "bg-white",
  },
  {
    id: "tarot",
    title: "塔罗占卜",
    href: "#",
    color: "bg-white",
  },
  {
    id: "blessing",
    title: "祈福许愿",
    href: "#",
    color: "bg-white",
  },
  {
    id: "baby-name",
    title: "宝宝起名",
    href: "#",
    color: "bg-white",
  },
  {
    id: "psychology",
    title: "心理测试",
    href: "#",
    color: "bg-white",
  },
  {
    id: "dream",
    title: "大师解梦",
    href: "#",
    color: "bg-white",
  },
  {
    id: "qa",
    title: "大师解签",
    href: "#",
    color: "bg-white",
  },
];

// 定义服务项类型
interface ServiceItem {
  id: string;
  title: string;
  description: string;
  image: string;
  originalPrice: string;
  price: string;
  popularity: string;
  href: string;
  category?: string;
}

// 所有服务列表
const allServices: Record<string, ServiceItem[]> = {
  "all": [
    {
      id: "name-match",
      title: "姓名配对",
      description: "你们的配对指数高吗？",
      image: "/images/name-match.png",
      originalPrice: "¥139",
      price: "¥52",
      popularity: "52.5W人测",
      href: "/destiny/match",
      category: "love"
    },
    {
      id: "destiny-match",
      title: "命中注定的另一半",
      description: "命定情人是谁？ta在哪儿？ta会对你好吗？",
      image: "/images/destiny-match.png",
      originalPrice: "¥128",
      price: "¥52",
      popularity: "10.6W人测",
      href: "/destiny/match",
      category: "love"
    },
    {
      id: "bazi-marriage",
      title: "八字合婚",
      description: "合八字，换庚帖，测姻缘。给你一份完整的合婚报告",
      image: "/images/bazi-marriage.png",
      originalPrice: "¥199",
      price: "¥88",
      popularity: "25.1W人测",
      href: "/bazi/marriage",
      category: "love"
    },
    {
      id: "bazi-analysis",
      title: "新版八字精批",
      description: "详批你一生运势！",
      image: "/images/bazi-analysis.png",
      originalPrice: "¥139",
      price: "¥68",
      popularity: "9.8W人测",
      href: "/bazi/analysis",
      category: "destiny"
    },
    {
      id: "fortune-2025",
      title: "紫微流年运势",
      description: "2025各项运势详批，新的一年，新的机遇！",
      image: "/images/fortune-2025.png",
      originalPrice: "¥138",
      price: "¥52",
      popularity: "7W人测",
      href: "/fortune/2025",
      category: "fortune-2025"
    },
    {
      id: "yearly-fortune",
      title: "2025年生肖运程",
      description: "把握机遇，收获良缘，财富暴涨！",
      image: "/images/zodiac-fortune.png",
      originalPrice: "¥48",
      price: "¥18",
      popularity: "7.8W人测",
      href: "/fortune/zodiac",
      category: "fortune-2025"
    },
    {
      id: "tarot-reading",
      title: "塔罗牌占卜",
      description: "探索命运的奥秘，洞察未来的可能性",
      image: "/images/tarot.png",
      originalPrice: "¥99",
      price: "¥39",
      popularity: "15.3W人测",
      href: "/tarot",
      category: "tarot"
    },
    {
      id: "palm-analysis",
      title: "AI手相分析",
      description: "上传手掌照片，AI智能解读您的手相",
      image: "/images/palm.png",
      originalPrice: "¥128",
      price: "¥68",
      popularity: "8.2W人测",
      href: "/palm-analysis",
      category: "destiny"
    },
    {
      id: "face-analysis",
      title: "AI面相分析",
      description: "上传面部照片，AI智能解读您的面相",
      image: "/images/face.png",
      originalPrice: "¥128",
      price: "¥68",
      popularity: "9.1W人测",
      href: "/face-analysis",
      category: "destiny"
    },
    {
      id: "baby-name",
      title: "宝宝起名",
      description: "为宝宝甄选吉祥如意的好名字",
      image: "/images/baby-name.png",
      originalPrice: "¥198",
      price: "¥98",
      popularity: "28.2W人测",
      href: "/name/baby",
      category: "baby-name"
    },
    {
      id: "blessing",
      title: "祈福许愿",
      description: "在线祈福，心愿成真",
      image: "/images/blessing.png",
      originalPrice: "¥88",
      price: "¥38",
      popularity: "12.5W人测",
      href: "/blessing",
      category: "blessing"
    }
  ],
  "fortune-2025": [
    {
      id: "fortune-2025",
      title: "紫微流年运势",
      description: "2025各项运势详批，新的一年，新的机遇！",
      image: "/images/fortune-2025.png",
      originalPrice: "¥138",
      price: "¥52",
      popularity: "7W人测",
      href: "/fortune/2025",
      category: "fortune-2025"
    },
    {
      id: "yearly-fortune",
      title: "2025年生肖运程",
      description: "把握机遇，收获良缘，财富暴涨！",
      image: "/images/zodiac-fortune.png",
      originalPrice: "¥48",
      price: "¥18",
      popularity: "7.8W人测",
      href: "/fortune/zodiac",
      category: "fortune-2025"
    }
  ],
  "love": [
    {
      id: "name-match",
      title: "姓名配对",
      description: "你们的配对指数高吗？",
      image: "/images/name-match.png",
      originalPrice: "¥139",
      price: "¥52",
      popularity: "52.5W人测",
      href: "/destiny/match",
      category: "love"
    },
    {
      id: "destiny-match",
      title: "命中注定的另一半",
      description: "命定情人是谁？ta在哪儿？ta会对你好吗？",
      image: "/images/destiny-match.png",
      originalPrice: "¥128",
      price: "¥52",
      popularity: "10.6W人测",
      href: "/destiny/match",
      category: "love"
    },
    {
      id: "bazi-marriage",
      title: "八字合婚",
      description: "合八字，换庚帖，测姻缘。给你一份完整的合婚报告",
      image: "/images/bazi-marriage.png",
      originalPrice: "¥199",
      price: "¥88",
      popularity: "25.1W人测",
      href: "/bazi/marriage",
      category: "love"
    }
  ],
  "destiny": [
    {
      id: "bazi-analysis",
      title: "新版八字精批",
      description: "详批你一生运势！",
      image: "/images/bazi-analysis.png",
      originalPrice: "¥139",
      price: "¥68",
      popularity: "9.8W人测",
      href: "/bazi/analysis",
      category: "destiny"
    },
    {
      id: "palm-analysis",
      title: "AI手相分析",
      description: "上传手掌照片，AI智能解读您的手相",
      image: "/images/palm.png",
      originalPrice: "¥128",
      price: "¥68",
      popularity: "8.2W人测",
      href: "/palm-analysis",
      category: "destiny"
    },
    {
      id: "face-analysis",
      title: "AI面相分析",
      description: "上传面部照片，AI智能解读您的面相",
      image: "/images/face.png",
      originalPrice: "¥128",
      price: "¥68",
      popularity: "9.1W人测",
      href: "/face-analysis",
      category: "destiny"
    }
  ],
  "wealth": [
    {
      id: "wealth-analysis",
      title: "财富运势分析",
      description: "解读您的财富密码，把握财运机遇",
      image: "/images/wealth.png",
      originalPrice: "¥128",
      price: "¥58",
      popularity: "6.5W人测",
      href: "/fortune/wealth",
      category: "wealth"
    }
  ],
  "tarot": [
    {
      id: "tarot-reading",
      title: "塔罗牌占卜",
      description: "探索命运的奥秘，洞察未来的可能性",
      image: "/images/tarot.png",
      originalPrice: "¥99",
      price: "¥39",
      popularity: "15.3W人测",
      href: "/tarot",
      category: "tarot"
    }
  ],
  "blessing": [
    {
      id: "blessing",
      title: "祈福许愿",
      description: "在线祈福，心愿成真",
      image: "/images/blessing.png",
      originalPrice: "¥88",
      price: "¥38",
      popularity: "12.5W人测",
      href: "/blessing",
      category: "blessing"
    }
  ],
  "baby-name": [
    {
      id: "baby-name",
      title: "宝宝起名",
      description: "为宝宝甄选吉祥如意的好名字",
      image: "/images/baby-name.png",
      originalPrice: "¥198",
      price: "¥98",
      popularity: "28.2W人测",
      href: "/name/baby",
      category: "baby-name"
    }
  ],
  "psychology": [
    {
      id: "psychology-test",
      title: "心理测试",
      description: "了解自己的内心世界",
      image: "/images/psychology.png",
      originalPrice: "¥68",
      price: "¥28",
      popularity: "5.3W人测",
      href: "/psychology-test",
      category: "psychology"
    }
  ],
  "dream": [
    {
      id: "dream-analysis",
      title: "大师解梦",
      description: "揭示梦境背后的奥秘",
      image: "/images/dream.png",
      originalPrice: "¥58",
      price: "¥18",
      popularity: "4.2W人测",
      href: "/dream-analysis",
      category: "dream"
    }
  ],
  "qa": [
    {
      id: "fortune-qa",
      title: "大师解签",
      description: "解读您的运势签文",
      image: "/images/qa.png",
      originalPrice: "¥48",
      price: "¥18",
      popularity: "3.8W人测",
      href: "/fortune/qa",
      category: "qa"
    }
  ]
};

export default function CategoriesPage() {
  const [activeCategory, setActiveCategory] = useState("all");
  const [services, setServices] = useState<ServiceItem[]>(allServices["all"]);

  const handleCategoryClick = (categoryId: string) => {
    setActiveCategory(categoryId);
    setServices(allServices[categoryId] || []);
  };

  return (
    <div className="flex justify-center bg-gray-100 min-h-screen">
      {/* 移动端布局容器 - 限制最大宽度并居中 */}
      <div className="w-full max-w-md flex flex-col min-h-screen bg-gray-50 relative shadow-md">
        {/* 顶部标题 */}
        <div className="bg-fortune-red text-white py-4 px-4">
          <h1 className="text-xl font-bold text-center">服务分类</h1>
        </div>
        
        {/* 排序选项 */}
        <div className="bg-white p-4 flex justify-end items-center border-b">
          <div className="text-gray-500">排序：</div>
          <div className="text-gray-700 font-medium flex items-center">
            综合
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1 text-red-500" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </div>
        </div>
        
        {/* 主内容区 - 左右布局 */}
        <div className="flex flex-1">
          {/* 左侧分类列表 */}
          <div className="w-1/4 bg-white border-r">
            <div className="overflow-y-auto">
              {categories.map((category) => (
                <div 
                  key={category.id} 
                  className={`block p-4 text-center border-b cursor-pointer ${activeCategory === category.id ? 'bg-pink-50 text-gray-800' : 'text-gray-600 hover:bg-gray-50'}`}
                  onClick={() => handleCategoryClick(category.id)}
                >
                  {category.title}
                </div>
              ))}
            </div>
          </div>
          
          {/* 右侧服务列表 */}
          <div className="w-3/4 overflow-y-auto">
            {services.map((service) => (
              <Link key={service.id} href={service.href} className="block">
                <div className="p-4 bg-white mb-2 flex border-b">
                  <div className="w-24 h-24 flex-shrink-0 mr-4 bg-gray-100 rounded-md overflow-hidden">
                    <div className="w-full h-full bg-contain bg-no-repeat bg-center" style={{ backgroundImage: `url('${service.image}')` }}></div>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-bold mb-1">{service.title}</h3>
                    <p className="text-gray-500 text-sm mb-4">{service.description}</p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <span className="text-red-500 font-bold text-lg">{service.price}</span>
                        <span className="text-gray-400 line-through text-sm ml-1">{service.originalPrice}</span>
                      </div>
                      <div className="text-gray-400 text-sm">{service.popularity}</div>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
} 