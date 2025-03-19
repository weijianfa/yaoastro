'use client';

import React, { useState } from 'react';
import Link from 'next/link';

// 测试类型定义
interface Test {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  questions: number;
  timeMinutes: number;
  category: string;
}

// 测试数据
const tests: Test[] = [
  {
    id: 'mbti',
    title: 'MBTI性格测试',
    description: '基于荣格理论的16种人格类型测试，帮助您了解自己的性格特点和行为模式。',
    imageUrl: '/images/tests/mbti.jpg',
    questions: 60,
    timeMinutes: 15,
    category: '性格'
  },
  {
    id: 'big-five',
    title: '大五人格测试',
    description: '测量开放性、尽责性、外向性、宜人性和神经质五个维度的人格特质。',
    imageUrl: '/images/tests/big-five.jpg',
    questions: 50,
    timeMinutes: 10,
    category: '性格'
  },
  {
    id: 'enneagram',
    title: '九型人格测试',
    description: '探索您的核心动机和恐惧，了解您属于九种人格类型中的哪一种。',
    imageUrl: '/images/tests/enneagram.jpg',
    questions: 45,
    timeMinutes: 12,
    category: '性格'
  },
  {
    id: 'love-language',
    title: '爱之语测试',
    description: '发现您表达和接收爱的首选方式，改善您的人际关系。',
    imageUrl: '/images/tests/love-language.jpg',
    questions: 30,
    timeMinutes: 8,
    category: '关系'
  },
  {
    id: 'career',
    title: '职业倾向测试',
    description: '基于您的兴趣和能力，找出最适合您的职业方向。',
    imageUrl: '/images/tests/career.jpg',
    questions: 40,
    timeMinutes: 10,
    category: '职业'
  },
  {
    id: 'emotional-intelligence',
    title: '情商测试',
    description: '评估您识别、理解和管理情绪的能力。',
    imageUrl: '/images/tests/eq.jpg',
    questions: 35,
    timeMinutes: 9,
    category: '情绪'
  }
];

// 分类列表
const categories = ['全部', '性格', '关系', '职业', '情绪'];

export default function TestsPage() {
  const [selectedCategory, setSelectedCategory] = useState('全部');
  const [searchQuery, setSearchQuery] = useState('');
  
  // 根据分类和搜索过滤测试
  const filteredTests = tests.filter(test => {
    const matchesCategory = selectedCategory === '全部' || test.category === selectedCategory;
    const matchesSearch = test.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          test.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-6">心理测试</h1>
      
      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-3">探索您的内在世界</h2>
          <p className="text-gray-600">
            我们提供多种专业心理测试，帮助您更好地了解自己的性格、情绪和行为模式。
            这些测试基于心理学研究，可以为您提供有价值的自我认知和个人成长的见解。
          </p>
        </div>
        
        {/* 搜索和筛选 */}
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="flex-1">
            <input
              type="text"
              placeholder="搜索测试..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
          <div className="flex flex-wrap gap-2">
            {categories.map(category => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-md ${
                  selectedCategory === category
                    ? 'bg-primary text-white'
                    : 'bg-gray-100 hover:bg-gray-200'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
        
        {/* 测试列表 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTests.length > 0 ? (
            filteredTests.map(test => (
              <div key={test.id} className="border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                <div className="h-40 bg-gray-200 relative">
                  {/* 实际项目中应该使用next/image组件 */}
                  <div className="absolute inset-0 flex items-center justify-center text-gray-500">
                    {test.title} 图片
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="font-semibold text-lg mb-2">{test.title}</h3>
                  <p className="text-gray-600 text-sm mb-3">{test.description}</p>
                  <div className="flex justify-between text-xs text-gray-500 mb-4">
                    <span>{test.questions} 个问题</span>
                    <span>约 {test.timeMinutes} 分钟</span>
                  </div>
                  <Link 
                    href={`/tests/${test.id}`}
                    className="block w-full text-center bg-primary text-white py-2 rounded-md hover:bg-primary/90"
                  >
                    开始测试
                  </Link>
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-full text-center py-8 text-gray-500">
              没有找到匹配的测试，请尝试其他搜索条件。
            </div>
          )}
        </div>
      </div>
      
      {/* 测试说明 */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-semibold mb-4">关于我们的测试</h2>
        <div className="space-y-4">
          <p className="text-gray-600">
            所有测试均基于心理学研究和理论，但结果仅供参考，不应被视为专业诊断或医疗建议。
          </p>
          <p className="text-gray-600">
            测试结果会根据您的回答生成，并提供个性化的解读和建议。您可以随时重新测试，或尝试不同类型的测试来获取更全面的自我认知。
          </p>
          <p className="text-gray-600">
            我们重视您的隐私，所有测试数据都会被安全存储，未经您的许可不会与第三方共享。
          </p>
        </div>
      </div>
    </div>
  );
} 