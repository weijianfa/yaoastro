'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { ArrowLeft, ArrowRight, Brain, Heart, Briefcase, Activity } from 'lucide-react';

// 测试类型定义
type TestType = 'personality' | 'emotion' | 'career' | 'health';

// 测试数据接口
interface Test {
  id: string;
  type: TestType;
  title: string;
  description: string;
  imageUrl: string;
  questions: Question[];
  resultInterpretation: Record<string, ResultInterpretation>;
}

interface Question {
  id: string;
  text: string;
  options: Option[];
}

interface Option {
  id: string;
  text: string;
  score: Record<string, number>;
}

interface ResultInterpretation {
  title: string;
  description: string;
  advice: string;
}

// 模拟测试数据
const mockTests: Test[] = [
  {
    id: 'mbti',
    type: 'personality',
    title: 'MBTI性格测试',
    description: '了解你的性格类型，发现你的优势和潜力',
    imageUrl: '/images/mbti.jpg',
    questions: [
      {
        id: 'q1',
        text: '在社交场合中，你通常会：',
        options: [
          { id: 'q1-a', text: '认识很多新朋友，成为人群中的焦点', score: { E: 2, I: 0 } },
          { id: 'q1-b', text: '与少数几个人进行深入交流', score: { E: 0, I: 2 } },
          { id: 'q1-c', text: '更喜欢观察他人，不太主动社交', score: { E: 0, I: 1 } },
          { id: 'q1-d', text: '视情况而定，有时活跃，有时安静', score: { E: 1, I: 1 } }
        ]
      },
      {
        id: 'q2',
        text: '当面对问题时，你倾向于：',
        options: [
          { id: 'q2-a', text: '依靠直觉和灵感寻找创新解决方案', score: { N: 2, S: 0 } },
          { id: 'q2-b', text: '收集具体事实和数据，按步骤解决', score: { N: 0, S: 2 } },
          { id: 'q2-c', text: '参考过去的经验和成功案例', score: { N: 0, S: 1 } },
          { id: 'q2-d', text: '结合实际情况和创新思维', score: { N: 1, S: 1 } }
        ]
      },
      {
        id: 'q3',
        text: '做决定时，你更看重：',
        options: [
          { id: 'q3-a', text: '决定对人的影响和情感因素', score: { F: 2, T: 0 } },
          { id: 'q3-b', text: '逻辑分析和客观事实', score: { F: 0, T: 2 } },
          { id: 'q3-c', text: '权衡利弊，但也考虑他人感受', score: { F: 1, T: 1 } },
          { id: 'q3-d', text: '根据具体情况灵活决定', score: { F: 1, T: 1 } }
        ]
      },
      {
        id: 'q4',
        text: '你更喜欢的生活方式是：',
        options: [
          { id: 'q4-a', text: '有计划、有条理，提前安排好一切', score: { J: 2, P: 0 } },
          { id: 'q4-b', text: '灵活自由，随机应变，保持开放性', score: { J: 0, P: 2 } },
          { id: 'q4-c', text: '大方向有规划，细节保持灵活', score: { J: 1, P: 1 } },
          { id: 'q4-d', text: '根据不同情况采取不同方式', score: { J: 1, P: 1 } }
        ]
      },
      {
        id: 'q5',
        text: '休闲时间，你更喜欢：',
        options: [
          { id: 'q5-a', text: '参加社交活动，与朋友聚会', score: { E: 2, I: 0 } },
          { id: 'q5-b', text: '独处，阅读或享受个人爱好', score: { E: 0, I: 2 } },
          { id: 'q5-c', text: '与少数亲密朋友共度时光', score: { E: 1, I: 1 } },
          { id: 'q5-d', text: '参加有意义的活动，不论是否社交', score: { E: 1, I: 1 } }
        ]
      }
    ],
    resultInterpretation: {
      'INTJ': {
        title: '建筑师型人格 (INTJ)',
        description: '你是一个具有战略思维的创新者，擅长制定复杂系统和理论。你独立、分析性强，追求持续改进和效率。',
        advice: '尝试更多地考虑他人的情感需求，培养耐心倾听的能力。在团队中，清晰地表达你的想法，并欣赏他人的贡献。'
      },
      'INFJ': {
        title: '提倡者型人格 (INFJ)',
        description: '你是一个有远见的理想主义者，致力于帮助他人实现潜力。你富有同情心、洞察力强，追求真实和意义。',
        advice: '设定明确的界限，避免过度承担他人的问题。定期进行自我关怀活动，保持内心平衡。学会在适当时候说"不"。'
      },
      'ISFJ': {
        title: '守卫者型人格 (ISFJ)',
        description: '你是一个忠诚、体贴的保护者，注重细节和传统。你可靠、实际，愿意默默付出，确保他人的需求得到满足。',
        advice: '学会更多地表达自己的需求和感受，不要总是把他人放在第一位。尝试新事物，拓展舒适区，培养应对变化的能力。'
      },
      'ISFP': {
        title: '探险家型人格 (ISFP)',
        description: '你是一个灵活、和谐的艺术家，享受当下的体验。你温和、敏感，重视个人自由和真实表达。',
        advice: '培养长期规划能力，设定可实现的目标。提高自信，更多地分享你的创意和见解。学习如何处理冲突，而不是回避它。'
      }
    }
  },
  {
    id: 'love-language',
    type: 'emotion',
    title: '爱情语言测试',
    description: '发现你表达和接收爱的方式，改善亲密关系',
    imageUrl: '/images/love.jpg',
    questions: [
      {
        id: 'q1',
        text: '以下哪种行为会让你感到最被爱？',
        options: [
          { id: 'q1-a', text: '伴侣送你一份精心准备的礼物', score: { gifts: 2, time: 0, words: 0, service: 0, touch: 0 } },
          { id: 'q1-b', text: '伴侣花时间陪你做你喜欢的事', score: { gifts: 0, time: 2, words: 0, service: 0, touch: 0 } },
          { id: 'q1-c', text: '伴侣告诉你他/她有多爱你', score: { gifts: 0, time: 0, words: 2, service: 0, touch: 0 } },
          { id: 'q1-d', text: '伴侣帮你做家务或解决问题', score: { gifts: 0, time: 0, words: 0, service: 2, touch: 0 } },
          { id: 'q1-e', text: '伴侣给你一个拥抱或按摩', score: { gifts: 0, time: 0, words: 0, service: 0, touch: 2 } }
        ]
      },
      {
        id: 'q2',
        text: '当你想表达爱意时，你最自然会：',
        options: [
          { id: 'q2-a', text: '购买或制作礼物送给对方', score: { gifts: 2, time: 0, words: 0, service: 0, touch: 0 } },
          { id: 'q2-b', text: '安排特别的约会或活动', score: { gifts: 0, time: 2, words: 0, service: 0, touch: 0 } },
          { id: 'q2-c', text: '写信或说出你的感受', score: { gifts: 0, time: 0, words: 2, service: 0, touch: 0 } },
          { id: 'q2-d', text: '做一些对方需要的事情', score: { gifts: 0, time: 0, words: 0, service: 2, touch: 0 } },
          { id: 'q2-e', text: '通过身体接触表达亲密', score: { gifts: 0, time: 0, words: 0, service: 0, touch: 2 } }
        ]
      },
      {
        id: 'q3',
        text: '在关系中，你最在意伴侣：',
        options: [
          { id: 'q3-a', text: '记得重要日子并送礼物', score: { gifts: 2, time: 0, words: 0, service: 0, touch: 0 } },
          { id: 'q3-b', text: '愿意放下手机专注陪伴你', score: { gifts: 0, time: 2, words: 0, service: 0, touch: 0 } },
          { id: 'q3-c', text: '经常赞美你、鼓励你', score: { gifts: 0, time: 0, words: 2, service: 0, touch: 0 } },
          { id: 'q3-d', text: '主动分担责任和工作', score: { gifts: 0, time: 0, words: 0, service: 2, touch: 0 } },
          { id: 'q3-e', text: '经常拥抱、牵手或亲吻', score: { gifts: 0, time: 0, words: 0, service: 0, touch: 2 } }
        ]
      }
    ],
    resultInterpretation: {
      'gifts': {
        title: '礼物',
        description: '你的主要爱情语言是接收礼物。对你来说，礼物是爱的象征和具体表达，无论大小，都代表着被记住和珍视。',
        advice: '告诉伴侣你喜欢的礼物类型，但也学会欣赏其他形式的爱的表达。记住，礼物的价值不在于金钱，而在于背后的心意。'
      },
      'time': {
        title: '高质量时间',
        description: '你的主要爱情语言是高质量时间。你重视伴侣的全神贯注和共同经历，这让你感到被爱和重视。',
        advice: '与伴侣明确表达你需要专注的时间，安排定期的约会和活动。同时，尊重伴侣的个人空间和时间需求。'
      },
      'words': {
        title: '肯定的言辞',
        description: '你的主要爱情语言是肯定的言辞。你通过言语的鼓励、赞美和爱的表达感受到最深的情感连接。',
        advice: '让伴侣知道哪些话语对你最有意义，同时学会欣赏非言语的爱的表达。记录伴侣的肯定言辞，在需要时回顾。'
      },
      'service': {
        title: '服务的行动',
        description: '你的主要爱情语言是服务的行动。当伴侣通过实际行动帮助你时，你感到被爱和支持。',
        advice: '明确告诉伴侣哪些行动对你最重要，同时学会接受帮助。记住互惠很重要，也要主动为伴侣提供服务。'
      },
      'touch': {
        title: '身体接触',
        description: '你的主要爱情语言是身体接触。拥抱、牵手、亲吻等物理接触对你来说是爱最直接的表达。',
        advice: '与伴侣沟通你喜欢的接触方式，尊重彼此的舒适区。在日常生活中创造更多自然接触的机会，如一起看电影时依偎。'
      }
    }
  }
];

export default function PsychologyTestPage() {
  const router = useRouter();
  const [selectedTest, setSelectedTest] = useState<Test | null>(null);
  const [currentStep, setCurrentStep] = useState<'selection' | 'questions' | 'result'>('selection');
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [testResult, setTestResult] = useState<string | null>(null);

  // 选择测试
  const handleSelectTest = (test: Test) => {
    setSelectedTest(test);
    setCurrentStep('questions');
    setCurrentQuestionIndex(0);
    setAnswers({});
  };

  // 选择答案
  const handleSelectAnswer = (questionId: string, optionId: string) => {
    setAnswers({
      ...answers,
      [questionId]: optionId
    });
  };

  // 下一题
  const handleNextQuestion = () => {
    if (!selectedTest) return;
    
    if (currentQuestionIndex < selectedTest.questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      calculateResult();
    }
  };

  // 上一题
  const handlePrevQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  // 计算测试结果
  const calculateResult = () => {
    if (!selectedTest) return;
    
    // 根据测试类型计算结果
    if (selectedTest.id === 'mbti') {
      // 计算MBTI得分
      const scores = { E: 0, I: 0, N: 0, S: 0, F: 0, T: 0, J: 0, P: 0 };
      
      Object.entries(answers).forEach(([questionId, optionId]) => {
        const question = selectedTest.questions.find(q => q.id === questionId);
        if (!question) return;
        
        const option = question.options.find(o => o.id === optionId);
        if (!option) return;
        
        Object.entries(option.score).forEach(([trait, score]) => {
          scores[trait as keyof typeof scores] += score;
        });
      });
      
      // 确定类型
      const type = [
        scores.E > scores.I ? 'E' : 'I',
        scores.N > scores.S ? 'N' : 'S',
        scores.F > scores.T ? 'F' : 'T',
        scores.J > scores.P ? 'J' : 'P'
      ].join('');
      
      // 如果没有这个类型的解释，使用默认类型
      setTestResult(selectedTest.resultInterpretation[type] ? type : 'ISFJ');
    } else if (selectedTest.id === 'love-language') {
      // 计算爱情语言得分
      const scores = { gifts: 0, time: 0, words: 0, service: 0, touch: 0 };
      
      Object.entries(answers).forEach(([questionId, optionId]) => {
        const question = selectedTest.questions.find(q => q.id === questionId);
        if (!question) return;
        
        const option = question.options.find(o => o.id === optionId);
        if (!option) return;
        
        Object.entries(option.score).forEach(([language, score]) => {
          scores[language as keyof typeof scores] += score;
        });
      });
      
      // 找出得分最高的爱情语言
      let highestLanguage = 'words';
      let highestScore = 0;
      
      Object.entries(scores).forEach(([language, score]) => {
        if (score > highestScore) {
          highestLanguage = language;
          highestScore = score;
        }
      });
      
      setTestResult(highestLanguage);
    }
    
    setCurrentStep('result');
  };

  // 重新开始
  const handleRestart = () => {
    setSelectedTest(null);
    setCurrentStep('selection');
    setCurrentQuestionIndex(0);
    setAnswers({});
    setTestResult(null);
  };

  // 获取当前问题
  const currentQuestion = selectedTest?.questions[currentQuestionIndex];

  // 计算进度
  const progress = selectedTest 
    ? Math.round(((currentQuestionIndex + 1) / selectedTest.questions.length) * 100) 
    : 0;

  // 渲染测试选择界面
  const renderTestSelection = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <Card className="hover:shadow-md transition-shadow cursor-pointer" onClick={() => handleSelectTest(mockTests[0])}>
        <CardHeader className="pb-2">
          <div className="flex items-center gap-2">
            <Brain className="h-5 w-5 text-purple-500" />
            <CardTitle>MBTI性格测试</CardTitle>
          </div>
          <CardDescription>了解你的性格类型，发现你的优势和潜力</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="relative h-40 w-full rounded-md overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-b from-purple-100 to-purple-200 flex items-center justify-center">
              <span className="text-purple-700 font-medium">探索你的性格类型</span>
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <Button className="w-full">开始测试</Button>
        </CardFooter>
      </Card>

      <Card className="hover:shadow-md transition-shadow cursor-pointer" onClick={() => handleSelectTest(mockTests[1])}>
        <CardHeader className="pb-2">
          <div className="flex items-center gap-2">
            <Heart className="h-5 w-5 text-pink-500" />
            <CardTitle>爱情语言测试</CardTitle>
          </div>
          <CardDescription>发现你表达和接收爱的方式，改善亲密关系</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="relative h-40 w-full rounded-md overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-b from-pink-100 to-pink-200 flex items-center justify-center">
              <span className="text-pink-700 font-medium">了解你的爱情语言</span>
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <Button className="w-full">开始测试</Button>
        </CardFooter>
      </Card>

      <Card className="hover:shadow-md transition-shadow cursor-pointer opacity-60">
        <CardHeader className="pb-2">
          <div className="flex items-center gap-2">
            <Briefcase className="h-5 w-5 text-blue-500" />
            <CardTitle>职业倾向测试</CardTitle>
          </div>
          <CardDescription>探索适合你的职业方向和工作环境</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="relative h-40 w-full rounded-md overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-b from-blue-100 to-blue-200 flex items-center justify-center">
              <span className="text-blue-700 font-medium">即将推出</span>
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <Button disabled className="w-full">敬请期待</Button>
        </CardFooter>
      </Card>

      <Card className="hover:shadow-md transition-shadow cursor-pointer opacity-60">
        <CardHeader className="pb-2">
          <div className="flex items-center gap-2">
            <Activity className="h-5 w-5 text-green-500" />
            <CardTitle>心理健康评估</CardTitle>
          </div>
          <CardDescription>评估你的心理健康状况，获取改善建议</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="relative h-40 w-full rounded-md overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-b from-green-100 to-green-200 flex items-center justify-center">
              <span className="text-green-700 font-medium">即将推出</span>
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <Button disabled className="w-full">敬请期待</Button>
        </CardFooter>
      </Card>
    </div>
  );

  // 渲染问题界面
  const renderQuestions = () => {
    if (!selectedTest || !currentQuestion) return null;

    return (
      <Card className="w-full">
        <CardHeader>
          <div className="flex justify-between items-center mb-2">
            <CardTitle>{selectedTest.title}</CardTitle>
            <span className="text-sm text-gray-500">
              问题 {currentQuestionIndex + 1}/{selectedTest.questions.length}
            </span>
          </div>
          <Progress value={progress} className="h-2" />
        </CardHeader>
        <CardContent>
          <div className="mb-6">
            <h3 className="text-lg font-medium mb-4">{currentQuestion.text}</h3>
            <RadioGroup 
              value={answers[currentQuestion.id] || ''} 
              onValueChange={(value) => handleSelectAnswer(currentQuestion.id, value)}
            >
              <div className="space-y-3">
                {currentQuestion.options.map((option) => (
                  <div key={option.id} className="flex items-start space-x-2">
                    <RadioGroupItem value={option.id} id={option.id} />
                    <Label htmlFor={option.id} className="font-normal">
                      {option.text}
                    </Label>
                  </div>
                ))}
              </div>
            </RadioGroup>
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button 
            onClick={handlePrevQuestion}
            disabled={currentQuestionIndex === 0}
            className="flex items-center gap-1"
          >
            <ArrowLeft className="h-4 w-4" />
            上一题
          </Button>
          <Button 
            onClick={handleNextQuestion}
            disabled={!answers[currentQuestion.id]}
            className="flex items-center gap-1"
          >
            {currentQuestionIndex < selectedTest.questions.length - 1 ? '下一题' : '完成'}
            {currentQuestionIndex < selectedTest.questions.length - 1 && <ArrowRight className="h-4 w-4" />}
          </Button>
        </CardFooter>
      </Card>
    );
  };

  // 渲染结果界面
  const renderResult = () => {
    if (!selectedTest || !testResult) return null;

    const result = selectedTest.resultInterpretation[testResult];
    if (!result) return null;

    return (
      <Card className="w-full">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl">{result.title}</CardTitle>
          <CardDescription>
            {selectedTest.title} 分析结果
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div className="bg-blue-50 p-4 rounded-lg">
              <h3 className="font-medium text-blue-800 mb-2">特点描述</h3>
              <p className="text-blue-700">{result.description}</p>
            </div>
            
            <div className="bg-green-50 p-4 rounded-lg">
              <h3 className="font-medium text-green-800 mb-2">建议</h3>
              <p className="text-green-700">{result.advice}</p>
            </div>
            
            <div className="bg-purple-50 p-4 rounded-lg">
              <h3 className="font-medium text-purple-800 mb-2">深度解析</h3>
              <p className="text-purple-700">
                想要获取更详细的个性化解析和专业建议，可以预约我们的心理咨询师进行一对一咨询。
              </p>
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button onClick={handleRestart}>
            重新测试
          </Button>
          <Button>
            分享结果
          </Button>
        </CardFooter>
      </Card>
    );
  };

  return (
    <div className="container mx-auto py-8">
      <div className="flex items-center mb-6">
        <Button 
          className="mr-2" 
          onClick={() => router.push('/dashboard')}
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          返回
        </Button>
        <h1 className="text-2xl font-bold">心理测试</h1>
      </div>

      {currentStep === 'selection' && (
        <>
          <div className="mb-8">
            <h2 className="text-xl font-semibold mb-2">选择测试类型</h2>
            <p className="text-gray-600">
              我们提供多种专业心理测试，帮助你更好地了解自己，发现潜能，改善人际关系
            </p>
          </div>
          {renderTestSelection()}
        </>
      )}

      {currentStep === 'questions' && renderQuestions()}
      
      {currentStep === 'result' && renderResult()}
    </div>
  );
} 