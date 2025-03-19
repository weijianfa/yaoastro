'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ArrowLeft, Moon, Search, Clock, BookOpen, Sparkles, Loader2 } from 'lucide-react';

// 梦境解析结果接口
interface DreamInterpretation {
  summary: string;
  symbols: Array<{
    symbol: string;
    meaning: string;
  }>;
  guidance: string;
  prediction: string;
}

// 热门梦境关键词
const popularDreamKeywords = [
  '飞翔', '坠落', '追逐', '考试', '迷路', 
  '死亡', '水', '蛇', '牙齿掉落', '裸体',
  '前任', '怀孕', '钱', '鬼', '亲人'
];

// 最近解梦历史
const recentDreamHistory = [
  {
    id: 1,
    title: '梦见在高空飞翔',
    date: '2023-11-15',
    preview: '梦见在高空飞翔，表示你渴望自由和突破...'
  },
  {
    id: 2,
    title: '梦见考试迟到',
    date: '2023-11-10',
    preview: '梦见考试迟到，可能反映你对某项任务或责任感到压力...'
  },
  {
    id: 3,
    title: '梦见与故人相见',
    date: '2023-11-05',
    preview: '梦见与故人相见，表示你内心深处对过去的怀念...'
  }
];

export default function DreamPage() {
  const router = useRouter();
  const [dreamText, setDreamText] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [interpretation, setInterpretation] = useState<DreamInterpretation | null>(null);
  const [activeTab, setActiveTab] = useState('new');
  const [searchQuery, setSearchQuery] = useState('');

  // 处理解梦请求
  const handleInterpretDream = async () => {
    if (!dreamText.trim()) return;
    
    setIsAnalyzing(true);
    
    // 模拟API调用延迟
    setTimeout(() => {
      // 模拟解梦结果
      const mockInterpretation: DreamInterpretation = {
        summary: "您的梦境反映了内心对未知的探索和对自我成长的渴望。梦中的场景和情绪暗示您正在经历一段转变期，可能面临新的机遇和挑战。",
        symbols: [
          {
            symbol: "飞翔",
            meaning: "象征自由、超越限制和对成功的渴望。在梦中飞翔通常表示您希望摆脱现实约束，追求更高的目标。"
          },
          {
            symbol: "水",
            meaning: "代表情感和潜意识。清澈的水表示情绪平静，浑浊或汹涌的水则可能暗示情感上的不安或变化。"
          },
          {
            symbol: "迷路",
            meaning: "反映生活中的迷茫或对方向的不确定。这可能是提醒您需要重新评估目标或寻求指导。"
          }
        ],
        guidance: "这个梦境建议您信任自己的直觉，勇敢面对变化。尝试记录日常情绪变化，可能会发现潜意识传递的重要信息。同时，给自己一些空间和时间来适应新环境或新角色。",
        prediction: "近期您可能会遇到需要做出重要决定的情况，保持开放的心态将有助于发现新的可能性。人际关系方面可能会有积极的发展，尤其是与理解和支持您的人之间的联系。"
      };
      
      setInterpretation(mockInterpretation);
      setIsAnalyzing(false);
    }, 2000);
  };

  // 处理关键词点击
  const handleKeywordClick = (keyword: string) => {
    setDreamText(prev => prev ? `${prev} ${keyword}` : keyword);
  };

  // 清空输入
  const handleClear = () => {
    setDreamText('');
    setInterpretation(null);
  };

  // 渲染解梦表单
  const renderDreamForm = () => (
    <Card>
      <CardHeader>
        <CardTitle>描述您的梦境</CardTitle>
        <CardDescription>
          详细描述您的梦境内容，包括场景、人物、情绪和印象深刻的细节
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <Textarea
            placeholder="例如：我梦见自己在一片广阔的海洋上飞翔，感到非常自由和平静..."
            className="min-h-[200px]"
            value={dreamText}
            onChange={(e) => setDreamText(e.target.value)}
          />
          
          <div>
            <Label className="text-sm text-gray-500 mb-2 block">热门梦境关键词</Label>
            <div className="flex flex-wrap gap-2">
              {popularDreamKeywords.map((keyword, index) => (
                <Button
                  key={index}
                  variant="outline"
                  size="sm"
                  onClick={() => handleKeywordClick(keyword)}
                  className="text-xs"
                >
                  {keyword}
                </Button>
              ))}
            </div>
          </div>
          
          <div className="bg-blue-50 p-4 rounded-lg">
            <div className="flex items-start">
              <Moon className="h-5 w-5 text-blue-500 mr-2 flex-shrink-0 mt-0.5" />
              <div className="text-sm text-blue-700">
                <p className="font-medium mb-1">解梦小贴士：</p>
                <ul className="list-disc list-inside space-y-1">
                  <li>尽可能详细描述梦境中的场景、人物和情绪</li>
                  <li>记录梦中特别突出或反复出现的符号和元素</li>
                  <li>提及梦境给您留下的整体感受和醒来后的情绪</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline" onClick={handleClear}>
          清空
        </Button>
        <Button 
          onClick={handleInterpretDream} 
          disabled={!dreamText.trim() || isAnalyzing}
        >
          {isAnalyzing ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              解析中...
            </>
          ) : '解析梦境'}
        </Button>
      </CardFooter>
    </Card>
  );

  // 渲染解梦结果
  const renderInterpretation = () => {
    if (!interpretation) return null;
    
    return (
      <Card>
        <CardHeader>
          <CardTitle>梦境解析结果</CardTitle>
          <CardDescription>
            基于您描述的梦境内容，AI已完成分析
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-medium mb-2">总体解析</h3>
              <p className="text-gray-700">{interpretation.summary}</p>
            </div>
            
            <div>
              <h3 className="text-lg font-medium mb-3">梦境符号解析</h3>
              <div className="space-y-3">
                {interpretation.symbols.map((item, index) => (
                  <div key={index} className="bg-gray-50 p-3 rounded-lg">
                    <h4 className="font-medium text-indigo-700">{item.symbol}</h4>
                    <p className="text-gray-600 text-sm mt-1">{item.meaning}</p>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="bg-green-50 p-4 rounded-lg">
              <h3 className="font-medium text-green-800 mb-2">指导建议</h3>
              <p className="text-green-700">{interpretation.guidance}</p>
            </div>
            
            <div className="bg-purple-50 p-4 rounded-lg">
              <h3 className="font-medium text-purple-800 mb-2">未来预示</h3>
              <p className="text-purple-700">{interpretation.prediction}</p>
            </div>
            
            <div className="bg-amber-50 p-4 rounded-lg flex items-start">
              <Sparkles className="h-5 w-5 text-amber-500 mr-2 flex-shrink-0 mt-0.5" />
              <div className="text-sm text-amber-700">
                <p className="font-medium mb-1">温馨提示：</p>
                <p>梦境解析仅供参考，真正的意义需要结合您的个人经历和情感。如需更深入的解析，可预约我们的专业解梦师进行一对一咨询。</p>
              </div>
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <Button onClick={handleClear} className="w-full">
            解析新梦境
          </Button>
        </CardFooter>
      </Card>
    );
  };

  // 渲染梦境词典
  const renderDreamDictionary = () => (
    <Card>
      <CardHeader>
        <CardTitle>梦境符号词典</CardTitle>
        <CardDescription>
          搜索常见梦境符号的含义和解析
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <div className="relative">
            <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
            <Input
              placeholder="搜索梦境符号..."
              className="pl-10"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="border rounded-lg p-4">
              <h3 className="font-medium mb-2 text-blue-600">水</h3>
              <p className="text-sm text-gray-600">
                水在梦中通常象征情感和潜意识。清澈的水代表情绪平静和心灵纯净，浑浊的水则可能表示情感困扰或内心混乱。
              </p>
            </div>
            
            <div className="border rounded-lg p-4">
              <h3 className="font-medium mb-2 text-blue-600">飞翔</h3>
              <p className="text-sm text-gray-600">
                梦见飞翔通常象征自由、超越限制和对成功的渴望。这可能表示您希望摆脱现实约束，追求更高的目标。
              </p>
            </div>
            
            <div className="border rounded-lg p-4">
              <h3 className="font-medium mb-2 text-blue-600">坠落</h3>
              <p className="text-sm text-gray-600">
                梦见坠落可能反映失控感、焦虑或对失败的恐惧。这通常与生活中的不安全感或重大变化有关。
              </p>
            </div>
            
            <div className="border rounded-lg p-4">
              <h3 className="font-medium mb-2 text-blue-600">牙齿掉落</h3>
              <p className="text-sm text-gray-600">
                梦见牙齿掉落常与沟通问题、自信心下降或对衰老的恐惧有关。也可能表示对某种损失的担忧。
              </p>
            </div>
          </div>
          
          <div className="text-center">
            <Button variant="outline">
              查看更多符号
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );

  // 渲染历史记录
  const renderHistory = () => (
    <Card>
      <CardHeader>
        <CardTitle>解梦历史</CardTitle>
        <CardDescription>
          查看您之前的梦境解析记录
        </CardDescription>
      </CardHeader>
      <CardContent>
        {recentDreamHistory.length > 0 ? (
          <div className="space-y-4">
            {recentDreamHistory.map((dream) => (
              <div key={dream.id} className="border rounded-lg p-4 hover:bg-gray-50 cursor-pointer">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-medium">{dream.title}</h3>
                  <div className="flex items-center text-xs text-gray-500">
                    <Clock className="h-3 w-3 mr-1" />
                    {dream.date}
                  </div>
                </div>
                <p className="text-sm text-gray-600">{dream.preview}</p>
              </div>
            ))}
            
            <div className="text-center">
              <Button variant="outline">
                查看全部历史
              </Button>
            </div>
          </div>
        ) : (
          <div className="text-center py-8">
            <BookOpen className="h-12 w-12 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-500 mb-2">暂无解梦历史</h3>
            <p className="text-gray-500 mb-4">您还没有进行过梦境解析</p>
            <Button onClick={() => setActiveTab('new')}>
              开始解梦
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );

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
        <h1 className="text-2xl font-bold">解梦系统</h1>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-3 mb-8">
          <TabsTrigger value="new">解析梦境</TabsTrigger>
          <TabsTrigger value="dictionary">梦境词典</TabsTrigger>
          <TabsTrigger value="history">历史记录</TabsTrigger>
        </TabsList>
        
        <TabsContent value="new" className="space-y-6">
          {!interpretation && renderDreamForm()}
          {interpretation && renderInterpretation()}
        </TabsContent>
        
        <TabsContent value="dictionary">
          {renderDreamDictionary()}
        </TabsContent>
        
        <TabsContent value="history">
          {renderHistory()}
        </TabsContent>
      </Tabs>
    </div>
  );
} 