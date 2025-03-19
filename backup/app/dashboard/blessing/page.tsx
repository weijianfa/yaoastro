'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ArrowLeft, Heart, Star, Sparkles, Moon, Sun, Flame } from 'lucide-react';

// 祈福类型
type BlessingType = 'love' | 'career' | 'health' | 'wealth' | 'family';

// 祈福场景
interface BlessingScene {
  id: BlessingType;
  title: string;
  description: string;
  icon: React.ReactNode;
  color: string;
  bgGradient: string;
}

// 祈福场景数据
const blessingScenes: BlessingScene[] = [
  {
    id: 'love',
    title: '姻缘祈福',
    description: '祈求美满姻缘，寻找真爱，或增进现有感情',
    icon: <Heart className="h-6 w-6" />,
    color: 'text-pink-500',
    bgGradient: 'from-pink-50 to-pink-100'
  },
  {
    id: 'career',
    title: '事业祈福',
    description: '祈求事业顺利，工作进步，学业有成',
    icon: <Star className="h-6 w-6" />,
    color: 'text-blue-500',
    bgGradient: 'from-blue-50 to-blue-100'
  },
  {
    id: 'health',
    title: '健康祈福',
    description: '祈求身体健康，心灵平静，远离疾病',
    icon: <Sparkles className="h-6 w-6" />,
    color: 'text-green-500',
    bgGradient: 'from-green-50 to-green-100'
  },
  {
    id: 'wealth',
    title: '财富祈福',
    description: '祈求财运亨通，生活富足，投资顺利',
    icon: <Flame className="h-6 w-6" />,
    color: 'text-amber-500',
    bgGradient: 'from-amber-50 to-amber-100'
  },
  {
    id: 'family',
    title: '家庭祈福',
    description: '祈求家庭和睦，亲情美满，子女成长',
    icon: <Moon className="h-6 w-6" />,
    color: 'text-purple-500',
    bgGradient: 'from-purple-50 to-purple-100'
  }
];

export default function BlessingPage() {
  const router = useRouter();
  const [step, setStep] = useState<'selection' | 'form' | 'animation' | 'complete'>('selection');
  const [selectedType, setSelectedType] = useState<BlessingType | null>(null);
  const [wishText, setWishText] = useState('');
  const [name, setName] = useState('');
  const [birthdate, setBirthdate] = useState('');
  const [particles, setParticles] = useState<Array<{id: number, x: number, y: number, size: number, color: string, speed: number}>>([]);
  const [completionMessage, setCompletionMessage] = useState('');

  // 选择祈福类型
  const handleSelectType = (type: BlessingType) => {
    setSelectedType(type);
    setStep('form');
  };

  // 提交祈福
  const handleSubmitWish = () => {
    if (!wishText || !name) return;
    
    setStep('animation');
    
    // 创建粒子效果
    const newParticles = [];
    for (let i = 0; i < 50; i++) {
      newParticles.push({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 10 + 5,
        color: getRandomColor(),
        speed: Math.random() * 2 + 1
      });
    }
    setParticles(newParticles);
    
    // 3秒后显示完成页面
    setTimeout(() => {
      setStep('complete');
      generateCompletionMessage();
    }, 5000);
  };

  // 生成随机颜色
  const getRandomColor = () => {
    const colors = ['#FF9999', '#99CCFF', '#99FF99', '#FFFF99', '#CC99FF'];
    return colors[Math.floor(Math.random() * colors.length)];
  };

  // 生成完成信息
  const generateCompletionMessage = () => {
    if (!selectedType) return;
    
    const messages = {
      love: [
        '您的姻缘祈福已送达，愿真爱之光照亮您的前路。',
        '缘分的种子已种下，请以平和的心态等待爱情的花开。',
        '月老已记录您的心愿，良缘将在适当的时机降临。'
      ],
      career: [
        '您的事业祈福已送达，前方将有新的机遇与挑战。',
        '事业之路已得到指引，请保持勤奋与专注，成功将不期而至。',
        '职场顺利的能量已环绕您，请以积极的态度迎接每一天。'
      ],
      health: [
        '您的健康祈福已送达，愿平安与活力常伴左右。',
        '健康的能量已注入您的生命，请保持良好的生活习惯。',
        '身心和谐的祝福已送达，愿您远离疾病，充满活力。'
      ],
      wealth: [
        '您的财富祈福已送达，财运之门即将为您打开。',
        '财富的种子已种下，请以智慧和勤劳浇灌它。',
        '财运亨通的祝福已环绕您，请保持积极的理财态度。'
      ],
      family: [
        '您的家庭祈福已送达，愿家人和睦，幸福常在。',
        '家庭和谐的能量已环绕您的家，请以爱心经营每一天。',
        '家人平安的祝福已送达，愿您的家庭充满欢笑与温暖。'
      ]
    };
    
    const typeMessages = messages[selectedType];
    setCompletionMessage(typeMessages[Math.floor(Math.random() * typeMessages.length)]);
  };

  // 重新开始
  const handleRestart = () => {
    setStep('selection');
    setSelectedType(null);
    setWishText('');
    setName('');
    setBirthdate('');
    setParticles([]);
    setCompletionMessage('');
  };

  // 更新粒子位置
  useEffect(() => {
    if (step !== 'animation') return;
    
    const interval = setInterval(() => {
      setParticles(prevParticles => 
        prevParticles.map(p => ({
          ...p,
          y: p.y - p.speed,
          x: p.x + (Math.random() - 0.5) * 2
        }))
      );
    }, 50);
    
    return () => clearInterval(interval);
  }, [step]);

  // 获取当前选中的祈福场景
  const selectedScene = selectedType ? blessingScenes.find(scene => scene.id === selectedType) : null;

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
        <h1 className="text-2xl font-bold">祈福许愿</h1>
      </div>

      {step === 'selection' && (
        <>
          <div className="mb-8">
            <h2 className="text-xl font-semibold mb-2">选择祈福类型</h2>
            <p className="text-gray-600">
              选择您想要祈福的类型，我们将为您送出最真挚的祝福
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {blessingScenes.map((scene) => (
              <Card 
                key={scene.id}
                className="hover:shadow-md transition-shadow cursor-pointer"
                onClick={() => handleSelectType(scene.id)}
              >
                <CardHeader className={`bg-gradient-to-b ${scene.bgGradient} rounded-t-lg`}>
                  <div className="flex justify-center">
                    <div className={`w-16 h-16 rounded-full bg-white flex items-center justify-center ${scene.color}`}>
                      {scene.icon}
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="pt-4">
                  <h3 className={`text-center text-lg font-medium ${scene.color} mb-2`}>{scene.title}</h3>
                  <p className="text-center text-gray-600 text-sm">{scene.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </>
      )}

      {step === 'form' && selectedScene && (
        <Card className="max-w-2xl mx-auto">
          <CardHeader className={`bg-gradient-to-r ${selectedScene.bgGradient}`}>
            <div className="flex items-center gap-3">
              <div className={`w-10 h-10 rounded-full bg-white flex items-center justify-center ${selectedScene.color}`}>
                {selectedScene.icon}
              </div>
              <div>
                <CardTitle>{selectedScene.title}</CardTitle>
                <CardDescription className="text-gray-700">
                  {selectedScene.description}
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="space-y-4">
              <div>
                <Label htmlFor="name">您的姓名</Label>
                <Input 
                  id="name" 
                  value={name} 
                  onChange={(e) => setName(e.target.value)} 
                  placeholder="请输入您的姓名"
                />
              </div>
              
              <div>
                <Label htmlFor="birthdate">出生日期（选填）</Label>
                <Input 
                  id="birthdate" 
                  type="date" 
                  value={birthdate} 
                  onChange={(e) => setBirthdate(e.target.value)} 
                />
              </div>
              
              <div>
                <Label htmlFor="wish">您的愿望</Label>
                <Textarea 
                  id="wish" 
                  value={wishText} 
                  onChange={(e) => setWishText(e.target.value)} 
                  placeholder="请输入您想要祈福的愿望..."
                  className="min-h-[120px]"
                />
              </div>
              
              <div className="bg-amber-50 p-4 rounded-lg">
                <p className="text-amber-800 text-sm">
                  <span className="font-medium">祈福提示：</span> 请以真诚的心表达您的愿望，祈福将在每日吉时由我们的专业师傅进行。祈福结果将在24小时内通过邮件通知您。
                </p>
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button variant="outline" onClick={() => setStep('selection')}>
              返回
            </Button>
            <Button 
              onClick={handleSubmitWish}
              disabled={!wishText || !name}
            >
              开始祈福
            </Button>
          </CardFooter>
        </Card>
      )}

      {step === 'animation' && (
        <div className="max-w-2xl mx-auto">
          <div className="relative h-[500px] bg-gradient-to-b from-indigo-900 to-purple-900 rounded-lg overflow-hidden">
            <div className="absolute inset-0">
              {particles.map((particle) => (
                <div 
                  key={particle.id}
                  className="absolute rounded-full"
                  style={{
                    left: `${particle.x}%`,
                    top: `${particle.y}%`,
                    width: `${particle.size}px`,
                    height: `${particle.size}px`,
                    backgroundColor: particle.color,
                    opacity: 0.7,
                    boxShadow: `0 0 ${particle.size * 2}px ${particle.color}`
                  }}
                />
              ))}
            </div>
            
            <div className="absolute inset-0 flex flex-col items-center justify-center text-white text-center p-6">
              <Sparkles className="h-16 w-16 text-yellow-300 mb-4 animate-pulse" />
              <h2 className="text-2xl font-bold mb-2">祈福中...</h2>
              <p className="max-w-md">
                您的愿望正在被宇宙能量接收，请保持平静的心态，让祝福的力量传递
              </p>
            </div>
          </div>
        </div>
      )}

      {step === 'complete' && (
        <Card className="max-w-2xl mx-auto">
          <CardHeader className="text-center">
            <div className="flex justify-center mb-4">
              <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center text-green-500">
                <Sun className="h-8 w-8" />
              </div>
            </div>
            <CardTitle className="text-2xl">祈福完成</CardTitle>
            <CardDescription>
              您的祈福已成功送出
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div className="bg-green-50 p-6 rounded-lg text-center">
                <p className="text-green-800 text-lg font-medium mb-2">
                  {completionMessage}
                </p>
                <p className="text-green-700">
                  祈福编号：{Math.floor(Math.random() * 1000000).toString().padStart(6, '0')}
                </p>
              </div>
              
              <div className="border rounded-lg p-4">
                <h3 className="font-medium mb-2">祈福信息</h3>
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div className="text-gray-500">祈福类型</div>
                  <div>{selectedScene?.title}</div>
                  <div className="text-gray-500">姓名</div>
                  <div>{name}</div>
                  {birthdate && (
                    <>
                      <div className="text-gray-500">出生日期</div>
                      <div>{birthdate}</div>
                    </>
                  )}
                  <div className="text-gray-500">祈福时间</div>
                  <div>{new Date().toLocaleString()}</div>
                </div>
              </div>
              
              <div className="bg-blue-50 p-4 rounded-lg">
                <p className="text-blue-800 text-sm">
                  <span className="font-medium">温馨提示：</span> 祈福后请保持平和的心态，多行善事，积累福报。您可以在"我的祈福"中查看历史祈福记录和状态。
                </p>
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button variant="outline" onClick={handleRestart}>
              再次祈福
            </Button>
            <Button onClick={() => router.push('/dashboard')}>
              返回首页
            </Button>
          </CardFooter>
        </Card>
      )}
    </div>
  );
} 