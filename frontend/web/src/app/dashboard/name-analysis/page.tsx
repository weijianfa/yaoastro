'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ArrowLeft, User, Calendar, Loader2, Info, Sparkles, FileText } from 'lucide-react';

// 姓名分析结果接口
interface NameAnalysisResult {
  overview: string;
  personality: string;
  career: string;
  relationships: string;
  fortune: string;
  numerology: {
    destinyNumber: number;
    destinyMeaning: string;
    expressionNumber: number;
    expressionMeaning: string;
  };
  characters: Array<{
    character: string;
    meaning: string;
  }>;
}

export default function NameAnalysisPage() {
  const router = useRouter();
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [gender, setGender] = useState<'male' | 'female'>('male');
  const [birthdate, setBirthdate] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<NameAnalysisResult | null>(null);
  const [activeTab, setActiveTab] = useState<'input' | 'result' | 'naming'>('input');

  // 处理姓名分析请求
  const handleAnalyzeName = async () => {
    if (!firstName || !lastName) return;
    
    setIsAnalyzing(true);
    
    // 模拟API调用延迟
    setTimeout(() => {
      // 模拟分析结果
      const mockResult: NameAnalysisResult = {
        overview: "您的姓名彰显出稳重、智慧与创造力的特质，五行属性平衡，有利于事业发展和人际关系。",
        personality: "您天生具有领导才能和创新思维，做事认真负责，善于分析问题并找到解决方案。同时，您也具有艺术气质和审美能力，对美好事物有独特的感知力。",
        career: "您适合从事需要创造力和分析能力的工作，如管理、设计、研究、教育或咨询领域。您的名字暗示您在职业生涯中会获得稳定发展，并有机会在35-40岁时迎来事业高峰。",
        relationships: "在人际关系方面，您通常受人尊重，能够建立长久的友谊和合作关系。在感情上，您渴望稳定和理解，与性格互补的伴侣最能获得幸福。",
        fortune: "您的姓名暗示财运稳定，中年后财富会有显著增长。事业和财运相辅相成，通过自身努力和才能积累财富的可能性较大。",
        numerology: {
          destinyNumber: 7,
          destinyMeaning: "命运数7代表智慧、分析和内省。您天生具有探索未知和追求真理的能力，适合从事研究、分析或需要深度思考的工作。",
          expressionNumber: 4,
          expressionMeaning: "表达数4代表稳定、实用和可靠。您做事有条理，注重细节，能够通过踏实的努力实现目标。"
        },
        characters: [
          {
            character: lastName[0] || "李",
            meaning: "代表家族传承和根基，暗示坚韧和责任感。"
          },
          {
            character: firstName[0] || "明",
            meaning: "象征光明和智慧，暗示思维清晰，有远见卓识。"
          },
          {
            character: firstName.length > 1 ? firstName[1] : "华",
            meaning: "代表繁荣和美好，暗示生活丰富多彩，事业有成。"
          }
        ]
      };
      
      setAnalysisResult(mockResult);
      setIsAnalyzing(false);
      setActiveTab('result');
    }, 2000);
  };

  // 清空输入
  const handleClear = () => {
    setFirstName('');
    setLastName('');
    setBirthdate('');
    setAnalysisResult(null);
    setActiveTab('input');
  };

  // 渲染姓名输入表单
  const renderNameForm = () => (
    <Card>
      <CardHeader>
        <CardTitle>姓名分析</CardTitle>
        <CardDescription>
          输入您的姓名，我们将为您提供详细的姓名学分析
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="lastName">姓氏</Label>
              <Input
                id="lastName"
                placeholder="例如：张"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="firstName">名字</Label>
              <Input
                id="firstName"
                placeholder="例如：明华"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              />
            </div>
          </div>
          
          <div>
            <Label>性别</Label>
            <RadioGroup
              value={gender}
              onValueChange={(value) => setGender(value as 'male' | 'female')}
              className="flex space-x-4 mt-2"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="male" id="male" />
                <Label htmlFor="male" className="font-normal">男</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="female" id="female" />
                <Label htmlFor="female" className="font-normal">女</Label>
              </div>
            </RadioGroup>
          </div>
          
          <div>
            <Label htmlFor="birthdate">出生日期（选填）</Label>
            <Input
              id="birthdate"
              type="date"
              value={birthdate}
              onChange={(e) => setBirthdate(e.target.value)}
            />
            <p className="text-xs text-gray-500 mt-1">
              提供出生日期可获得更准确的分析结果
            </p>
          </div>
          
          <div className="bg-blue-50 p-4 rounded-lg">
            <div className="flex items-start">
              <Info className="h-5 w-5 text-blue-500 mr-2 flex-shrink-0 mt-0.5" />
              <div className="text-sm text-blue-700">
                <p>姓名分析基于传统姓名学理论，结合字形、字音、五行属性和数理能量进行综合分析，可帮助您了解姓名对性格、事业和人际关系的潜在影响。</p>
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
          onClick={handleAnalyzeName}
          disabled={!firstName || !lastName || isAnalyzing}
        >
          {isAnalyzing ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              分析中...
            </>
          ) : '开始分析'}
        </Button>
      </CardFooter>
    </Card>
  );

  // 渲染分析结果
  const renderAnalysisResult = () => {
    if (!analysisResult) return null;
    
    return (
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <div>
              <CardTitle>姓名分析结果</CardTitle>
              <CardDescription>
                {lastName}{firstName} ({gender === 'male' ? '男' : '女'})
                {birthdate && ` · ${birthdate}`}
              </CardDescription>
            </div>
            <Button variant="outline" size="sm" onClick={() => setActiveTab('input')}>
              重新分析
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-medium mb-2">总体评价</h3>
              <p className="text-gray-700">{analysisResult.overview}</p>
            </div>
            
            <Tabs defaultValue="personality" className="w-full">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="personality">性格特质</TabsTrigger>
                <TabsTrigger value="career">事业发展</TabsTrigger>
                <TabsTrigger value="relationships">人际关系</TabsTrigger>
                <TabsTrigger value="fortune">财富运势</TabsTrigger>
              </TabsList>
              
              <TabsContent value="personality" className="pt-4">
                <p className="text-gray-700">{analysisResult.personality}</p>
              </TabsContent>
              
              <TabsContent value="career" className="pt-4">
                <p className="text-gray-700">{analysisResult.career}</p>
              </TabsContent>
              
              <TabsContent value="relationships" className="pt-4">
                <p className="text-gray-700">{analysisResult.relationships}</p>
              </TabsContent>
              
              <TabsContent value="fortune" className="pt-4">
                <p className="text-gray-700">{analysisResult.fortune}</p>
              </TabsContent>
            </Tabs>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-purple-50 p-4 rounded-lg">
                <h3 className="font-medium text-purple-800 mb-2">命运数: {analysisResult.numerology.destinyNumber}</h3>
                <p className="text-purple-700 text-sm">{analysisResult.numerology.destinyMeaning}</p>
              </div>
              
              <div className="bg-indigo-50 p-4 rounded-lg">
                <h3 className="font-medium text-indigo-800 mb-2">表达数: {analysisResult.numerology.expressionNumber}</h3>
                <p className="text-indigo-700 text-sm">{analysisResult.numerology.expressionMeaning}</p>
              </div>
            </div>
            
            <div>
              <h3 className="text-lg font-medium mb-3">字符分析</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {analysisResult.characters.map((item, index) => (
                  <div key={index} className="border p-4 rounded-lg text-center">
                    <div className="text-3xl font-bold mb-2">{item.character}</div>
                    <p className="text-sm text-gray-600">{item.meaning}</p>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="bg-amber-50 p-4 rounded-lg flex items-start">
              <Sparkles className="h-5 w-5 text-amber-500 mr-2 flex-shrink-0 mt-0.5" />
              <div className="text-sm text-amber-700">
                <p className="font-medium mb-1">温馨提示：</p>
                <p>姓名分析仅供参考，真正的人生由自己的选择和努力决定。如需更专业的分析和建议，可预约我们的专业命理师进行一对一咨询。</p>
              </div>
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <Button className="w-full">
            保存分析报告
          </Button>
        </CardFooter>
      </Card>
    );
  };

  // 渲染起名服务
  const renderNamingService = () => (
    <Card>
      <CardHeader>
        <CardTitle>智能起名服务</CardTitle>
        <CardDescription>
          为新生儿、企业或产品提供专业的命名服务
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card className="border-2 hover:border-blue-200 transition-colors cursor-pointer">
              <CardHeader className="pb-2">
                <CardTitle className="text-center text-lg">宝宝起名</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <User className="h-12 w-12 mx-auto text-blue-500 mb-2" />
                <p className="text-sm text-gray-600">
                  结合生辰八字、五行属性和家族传承，为宝宝取一个吉祥如意的好名字
                </p>
              </CardContent>
              <CardFooter>
                <Button className="w-full">立即咨询</Button>
              </CardFooter>
            </Card>
            
            <Card className="border-2 hover:border-blue-200 transition-colors cursor-pointer">
              <CardHeader className="pb-2">
                <CardTitle className="text-center text-lg">公司起名</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <FileText className="h-12 w-12 mx-auto text-blue-500 mb-2" />
                <p className="text-sm text-gray-600">
                  根据行业特点、创始人信息和企业愿景，打造富有内涵且易于传播的企业名称
                </p>
              </CardContent>
              <CardFooter>
                <Button className="w-full">立即咨询</Button>
              </CardFooter>
            </Card>
            
            <Card className="border-2 hover:border-blue-200 transition-colors cursor-pointer">
              <CardHeader className="pb-2">
                <CardTitle className="text-center text-lg">改名咨询</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <Calendar className="h-12 w-12 mx-auto text-blue-500 mb-2" />
                <p className="text-sm text-gray-600">
                  分析当前姓名存在的问题，提供专业的改名建议，助您开启人生新篇章
                </p>
              </CardContent>
              <CardFooter>
                <Button className="w-full">立即咨询</Button>
              </CardFooter>
            </Card>
          </div>
          
          <div className="bg-green-50 p-4 rounded-lg">
            <h3 className="font-medium text-green-800 mb-2">我们的优势</h3>
            <ul className="space-y-2 text-sm text-green-700">
              <li className="flex items-start">
                <span className="inline-block h-5 w-5 rounded-full bg-green-100 text-green-600 flex-shrink-0 mr-2 flex items-center justify-center text-xs">✓</span>
                <span>专业命理师团队，平均从业经验10年以上</span>
              </li>
              <li className="flex items-start">
                <span className="inline-block h-5 w-5 rounded-full bg-green-100 text-green-600 flex-shrink-0 mr-2 flex items-center justify-center text-xs">✓</span>
                <span>结合传统命理学和现代语言学，科学分析名字能量</span>
              </li>
              <li className="flex items-start">
                <span className="inline-block h-5 w-5 rounded-full bg-green-100 text-green-600 flex-shrink-0 mr-2 flex items-center justify-center text-xs">✓</span>
                <span>提供多个备选名字及详细解析，满足个性化需求</span>
              </li>
              <li className="flex items-start">
                <span className="inline-block h-5 w-5 rounded-full bg-green-100 text-green-600 flex-shrink-0 mr-2 flex items-center justify-center text-xs">✓</span>
                <span>一对一专属服务，保证满意为止</span>
              </li>
            </ul>
          </div>
          
          <div className="text-center">
            <p className="text-gray-500 mb-4">专业起名服务，助您开启美好未来</p>
            <Button size="lg">
              预约专业命理师
            </Button>
          </div>
        </div>
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
        <h1 className="text-2xl font-bold">姓名学分析</h1>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab as any} className="w-full">
        <TabsList className="grid w-full grid-cols-2 mb-8">
          <TabsTrigger value="input">姓名分析</TabsTrigger>
          <TabsTrigger value="naming">智能起名</TabsTrigger>
        </TabsList>
        
        <TabsContent value="input" className="space-y-6">
          {activeTab === 'input' && renderNameForm()}
          {activeTab === 'result' && renderAnalysisResult()}
        </TabsContent>
        
        <TabsContent value="naming">
          {renderNamingService()}
        </TabsContent>
      </Tabs>
    </div>
  );
} 