'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

// 测试类型定义
interface Test {
  id: string;
  title: string;
  description: string;
  questions: Question[];
}

// 问题类型定义
interface Question {
  id: number;
  text: string;
  options: Option[];
}

// 选项类型定义
interface Option {
  id: string;
  text: string;
  score: number;
}

// 用户回答类型定义
interface Answer {
  questionId: number;
  optionId: string;
}

// 模拟测试数据
const testData: Record<string, Test> = {
  'mbti': {
    id: 'mbti',
    title: 'MBTI性格测试',
    description: '基于荣格理论的16种人格类型测试，帮助您了解自己的性格特点和行为模式。',
    questions: [
      {
        id: 1,
        text: '在社交场合中，您通常会：',
        options: [
          { id: '1a', text: '认识新朋友，扩大社交圈', score: 2 },
          { id: '1b', text: '与已认识的朋友交流', score: 1 },
          { id: '1c', text: '更喜欢独处或与少数几个亲密朋友在一起', score: 0 },
          { id: '1d', text: '观察他人，很少主动参与对话', score: -1 },
        ]
      },
      {
        id: 2,
        text: '当面对一个复杂问题时，您倾向于：',
        options: [
          { id: '2a', text: '依靠直觉和灵感寻找解决方案', score: 2 },
          { id: '2b', text: '分析问题的各个方面，寻找逻辑解决方案', score: 1 },
          { id: '2c', text: '参考过去的经验和已知事实', score: 0 },
          { id: '2d', text: '咨询他人的意见和建议', score: -1 },
        ]
      },
      {
        id: 3,
        text: '在做决定时，您更看重：',
        options: [
          { id: '3a', text: '决定对人的影响和情感因素', score: 2 },
          { id: '3b', text: '逻辑和客观分析', score: 1 },
          { id: '3c', text: '个人价值观和信念', score: 0 },
          { id: '3d', text: '实际结果和效率', score: -1 },
        ]
      },
      {
        id: 4,
        text: '您更喜欢的工作环境是：',
        options: [
          { id: '4a', text: '有明确的规则和期望', score: 2 },
          { id: '4b', text: '灵活多变，可以随时调整', score: 1 },
          { id: '4c', text: '有创意空间但有基本框架', score: 0 },
          { id: '4d', text: '完全自由，可以按自己的方式工作', score: -1 },
        ]
      },
      {
        id: 5,
        text: '在压力下，您通常会：',
        options: [
          { id: '5a', text: '寻求他人的支持和建议', score: 2 },
          { id: '5b', text: '独自思考和解决问题', score: 1 },
          { id: '5c', text: '通过活动或运动释放压力', score: 0 },
          { id: '5d', text: '分析情况并制定详细计划', score: -1 },
        ]
      }
    ]
  },
  'big-five': {
    id: 'big-five',
    title: '大五人格测试',
    description: '测量开放性、尽责性、外向性、宜人性和神经质五个维度的人格特质。',
    questions: [
      {
        id: 1,
        text: '我认为自己是一个充满创意的人。',
        options: [
          { id: '1a', text: '非常同意', score: 5 },
          { id: '1b', text: '同意', score: 4 },
          { id: '1c', text: '中立', score: 3 },
          { id: '1d', text: '不同意', score: 2 },
          { id: '1e', text: '非常不同意', score: 1 },
        ]
      },
      {
        id: 2,
        text: '我是一个可靠且自律的人。',
        options: [
          { id: '2a', text: '非常同意', score: 5 },
          { id: '2b', text: '同意', score: 4 },
          { id: '2c', text: '中立', score: 3 },
          { id: '2d', text: '不同意', score: 2 },
          { id: '2e', text: '非常不同意', score: 1 },
        ]
      },
      {
        id: 3,
        text: '我喜欢与人交往并充满活力。',
        options: [
          { id: '3a', text: '非常同意', score: 5 },
          { id: '3b', text: '同意', score: 4 },
          { id: '3c', text: '中立', score: 3 },
          { id: '3d', text: '不同意', score: 2 },
          { id: '3e', text: '非常不同意', score: 1 },
        ]
      },
      {
        id: 4,
        text: '我是一个富有同情心和合作精神的人。',
        options: [
          { id: '4a', text: '非常同意', score: 5 },
          { id: '4b', text: '同意', score: 4 },
          { id: '4c', text: '中立', score: 3 },
          { id: '4d', text: '不同意', score: 2 },
          { id: '4e', text: '非常不同意', score: 1 },
        ]
      },
      {
        id: 5,
        text: '我经常感到焦虑或容易紧张。',
        options: [
          { id: '5a', text: '非常同意', score: 5 },
          { id: '5b', text: '同意', score: 4 },
          { id: '5c', text: '中立', score: 3 },
          { id: '5d', text: '不同意', score: 2 },
          { id: '5e', text: '非常不同意', score: 1 },
        ]
      }
    ]
  }
};

// 为其他测试添加占位数据
['enneagram', 'love-language', 'career', 'emotional-intelligence'].forEach(id => {
  testData[id] = {
    id,
    title: `${id.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')} 测试`,
    description: '这是一个示例测试，实际项目中应该有完整的测试内容。',
    questions: [
      {
        id: 1,
        text: '这是一个示例问题，实际测试中会有更多相关问题。',
        options: [
          { id: '1a', text: '选项 A', score: 3 },
          { id: '1b', text: '选项 B', score: 2 },
          { id: '1c', text: '选项 C', score: 1 },
          { id: '1d', text: '选项 D', score: 0 },
        ]
      }
    ]
  };
});

export default function TestPage({ params }: { params: { testId: string } }) {
  const router = useRouter();
  const { testId } = params;
  const [currentTest, setCurrentTest] = useState<Test | null>(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Answer[]>([]);
  const [showResults, setShowResults] = useState(false);
  const [testScore, setTestScore] = useState(0);
  
  useEffect(() => {
    // 获取测试数据
    const test = testData[testId];
    if (test) {
      setCurrentTest(test);
    } else {
      // 如果测试不存在，重定向到测试列表页
      router.push('/tests');
    }
  }, [testId, router]);
  
  if (!currentTest) {
    return (
      <div className="container mx-auto py-8 text-center">
        <p>加载中...</p>
      </div>
    );
  }
  
  const currentQuestion = currentTest.questions[currentQuestionIndex];
  
  // 处理选项选择
  const handleOptionSelect = (questionId: number, optionId: string, score: number) => {
    // 更新答案
    const newAnswers = [...answers];
    const existingAnswerIndex = newAnswers.findIndex(a => a.questionId === questionId);
    
    if (existingAnswerIndex >= 0) {
      newAnswers[existingAnswerIndex] = { questionId, optionId };
    } else {
      newAnswers.push({ questionId, optionId });
    }
    
    setAnswers(newAnswers);
    
    // 如果是最后一个问题，显示结果
    if (currentQuestionIndex === currentTest.questions.length - 1) {
      // 计算得分
      const totalScore = newAnswers.reduce((total, answer) => {
        const question = currentTest.questions.find(q => q.id === answer.questionId);
        const option = question?.options.find(o => o.id === answer.optionId);
        return total + (option?.score || 0);
      }, 0);
      
      setTestScore(totalScore);
      setShowResults(true);
    } else {
      // 否则，前进到下一个问题
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };
  
  // 重新开始测试
  const restartTest = () => {
    setCurrentQuestionIndex(0);
    setAnswers([]);
    setShowResults(false);
    setTestScore(0);
  };
  
  // 渲染测试结果
  const renderResults = () => {
    // 这里应该根据不同的测试类型和得分提供不同的结果解释
    // 这只是一个简单的示例
    let resultText = '';
    let resultDescription = '';
    
    if (testId === 'mbti') {
      if (testScore >= 8) {
        resultText = 'ENFJ - 主人公型';
        resultDescription = '您是一个充满魅力和热情的领导者，善于激励他人，关注人际关系和团队和谐。';
      } else if (testScore >= 4) {
        resultText = 'INFJ - 提倡者型';
        resultDescription = '您是一个有远见和创意的理想主义者，注重深度和真实性，追求对他人产生积极影响。';
      } else if (testScore >= 0) {
        resultText = 'INTJ - 建筑师型';
        resultDescription = '您是一个有战略思维的规划者，独立且决断，追求知识和效率，不断寻求改进。';
      } else {
        resultText = 'ISTP - 鉴赏家型';
        resultDescription = '您是一个灵活且冷静的问题解决者，喜欢观察和分析，享受动手实践和探索如何运作。';
      }
    } else if (testId === 'big-five') {
      if (testScore >= 20) {
        resultText = '高开放性、高尽责性、高外向性';
        resultDescription = '您思想开放，富有创造力，同时也很负责任和外向。';
      } else if (testScore >= 15) {
        resultText = '中等开放性、高尽责性、中等外向性';
        resultDescription = '您在思想上比较开放，非常负责任，社交能力适中。';
      } else {
        resultText = '中等开放性、中等尽责性、低外向性';
        resultDescription = '您在思想上比较开放，责任感适中，倾向于内向。';
      }
    } else {
      resultText = '测试结果';
      resultDescription = '这是一个示例测试结果，实际项目中应该根据测试类型和得分提供详细的解释。';
    }
    
    return (
      <div className="text-center">
        <h2 className="text-2xl font-bold mb-4">{resultText}</h2>
        <p className="text-gray-600 mb-6">{resultDescription}</p>
        <div className="flex justify-center gap-4">
          <button
            onClick={restartTest}
            className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary/90"
          >
            重新测试
          </button>
          <Link
            href="/tests"
            className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300"
          >
            返回测试列表
          </Link>
        </div>
      </div>
    );
  };
  
  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-2">{currentTest.title}</h1>
      <p className="text-gray-600 mb-8">{currentTest.description}</p>
      
      <div className="bg-white rounded-lg shadow-md p-6">
        {!showResults ? (
          <>
            {/* 进度条 */}
            <div className="mb-6">
              <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-primary"
                  style={{ width: `${((currentQuestionIndex + 1) / currentTest.questions.length) * 100}%` }}
                ></div>
              </div>
              <div className="text-sm text-gray-500 mt-2">
                问题 {currentQuestionIndex + 1} / {currentTest.questions.length}
              </div>
            </div>
            
            {/* 当前问题 */}
            <div className="mb-8">
              <h2 className="text-xl font-semibold mb-4">{currentQuestion.text}</h2>
              <div className="space-y-3">
                {currentQuestion.options.map(option => (
                  <button
                    key={option.id}
                    onClick={() => handleOptionSelect(currentQuestion.id, option.id, option.score)}
                    className="w-full text-left p-3 border rounded-md hover:bg-gray-50 transition-colors"
                  >
                    {option.text}
                  </button>
                ))}
              </div>
            </div>
          </>
        ) : (
          renderResults()
        )}
      </div>
    </div>
  );
} 