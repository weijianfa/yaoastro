'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Textarea } from '@/components/ui/textarea';
import { Upload, Camera, Info, ArrowLeft, Loader2 } from 'lucide-react';

export default function FaceAnalysisPage() {
  const router = useRouter();
  const [step, setStep] = useState<'upload' | 'analyzing' | 'result'>('upload');
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [analysisResult, setAnalysisResult] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('face');

  // 模拟上传图片
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const reader = new FileReader();
      
      reader.onload = (event) => {
        if (event.target) {
          setImageUrl(event.target.result as string);
        }
      };
      
      reader.readAsDataURL(file);
    }
  };

  // 模拟拍照功能
  const handleCapture = () => {
    // 在实际应用中，这里会调用摄像头API
    alert('摄像头功能将在实际应用中实现');
  };

  // 模拟分析过程
  const handleAnalyze = async () => {
    if (!imageUrl) return;
    
    setIsLoading(true);
    setStep('analyzing');
    
    // 模拟API调用延迟
    setTimeout(() => {
      // 模拟分析结果
      const mockResult = {
        face: {
          overall: "您的面相显示出聪明、善良的特质，面部轮廓协调，五官分布均匀。",
          forehead: "额头宽广饱满，表示思维开阔，具有良好的思考能力和创造力。",
          eyes: "眼睛明亮有神，眼距适中，表示观察力敏锐，判断力强。",
          nose: "鼻梁挺直，鼻头圆润，显示出坚强的意志力和良好的财运。",
          mouth: "嘴唇形状匀称，色泽红润，表示口才好，人缘佳。",
          chin: "下巴圆润有力，显示出坚韧的性格和良好的耐力。",
          fortune: "整体面相显示您的事业运势良好，人际关系和谐，财运稳定上升。"
        },
        palm: {
          overall: "您的手相显示出丰富的想象力和创造力，适合从事创意工作。",
          lifeLines: "生命线长而清晰，表示健康状况良好，生命力旺盛。",
          heartLines: "感情线弯曲上扬，表示感情丰富，对爱情专一。",
          headLines: "智慧线长而深，表示思维敏捷，分析能力强。",
          fateLines: "命运线清晰可见，表示事业发展稳定，有明确的人生方向。",
          fortune: "手相整体显示您在35岁后事业将有重大突破，财运和桃花运也将随之提升。"
        }
      };
      
      setAnalysisResult(mockResult);
      setIsLoading(false);
      setStep('result');
    }, 3000);
  };

  // 返回上传步骤
  const handleBack = () => {
    setStep('upload');
    setImageUrl(null);
    setAnalysisResult(null);
  };

  return (
    <div className="container mx-auto py-8">
      <div className="flex items-center mb-6">
        <Button 
          variant="ghost" 
          className="mr-2" 
          onClick={() => router.push('/dashboard')}
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          返回
        </Button>
        <h1 className="text-2xl font-bold">AI面相手相分析</h1>
      </div>

      {step === 'upload' && (
        <Card className="w-full max-w-3xl mx-auto">
          <CardHeader>
            <CardTitle>上传照片进行分析</CardTitle>
            <CardDescription>
              请上传清晰的正面照片或手掌照片，我们的AI将为您提供专业分析
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-6">
              <div className="flex flex-col items-center justify-center p-8 border-2 border-dashed rounded-lg">
                {imageUrl ? (
                  <div className="relative w-full max-w-md h-64">
                    <Image
                      src={imageUrl}
                      alt="上传的图片"
                      fill
                      style={{ objectFit: 'contain' }}
                    />
                  </div>
                ) : (
                  <div className="flex flex-col items-center">
                    <Upload className="h-12 w-12 text-gray-400 mb-4" />
                    <p className="text-sm text-gray-500 mb-4">
                      点击上传或拖放图片到此处
                    </p>
                  </div>
                )}
                
                <div className="flex gap-4 mt-4">
                  <div>
                    <input
                      type="file"
                      id="file-upload"
                      className="hidden"
                      accept="image/*"
                      onChange={handleFileUpload}
                    />
                    <Button asChild>
                      <label htmlFor="file-upload" className="cursor-pointer">
                        <Upload className="h-4 w-4 mr-2" />
                        上传图片
                      </label>
                    </Button>
                  </div>
                  
                  <Button variant="outline" onClick={handleCapture}>
                    <Camera className="h-4 w-4 mr-2" />
                    拍照
                  </Button>
                </div>
              </div>
              
              <div className="bg-blue-50 p-4 rounded-lg flex items-start">
                <Info className="h-5 w-5 text-blue-500 mr-2 flex-shrink-0 mt-0.5" />
                <div className="text-sm text-blue-700">
                  <p className="font-medium mb-1">拍摄建议：</p>
                  <ul className="list-disc list-inside space-y-1">
                    <li>面相分析：请上传正面清晰照片，光线充足，五官清晰可见</li>
                    <li>手相分析：请上传手掌平摊的照片，确保掌纹清晰可见</li>
                    <li>照片仅用于分析，我们保证您的隐私安全</li>
                  </ul>
                </div>
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button 
              onClick={handleAnalyze} 
              disabled={!imageUrl}
              className="w-full"
            >
              开始分析
            </Button>
          </CardFooter>
        </Card>
      )}

      {step === 'analyzing' && (
        <Card className="w-full max-w-3xl mx-auto">
          <CardHeader>
            <CardTitle>正在分析中</CardTitle>
            <CardDescription>
              我们的AI正在分析您的照片，请稍候...
            </CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col items-center py-10">
            <Loader2 className="h-16 w-16 text-primary animate-spin mb-6" />
            <p className="text-center text-gray-600">
              AI正在识别特征并生成分析报告，这可能需要几秒钟时间
            </p>
          </CardContent>
        </Card>
      )}

      {step === 'result' && analysisResult && (
        <div className="w-full max-w-4xl mx-auto">
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>分析结果</CardTitle>
              <CardDescription>
                基于您上传的照片，AI已完成分析
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col md:flex-row gap-6">
                <div className="md:w-1/3">
                  {imageUrl && (
                    <div className="relative w-full h-64 rounded-lg overflow-hidden">
                      <Image
                        src={imageUrl}
                        alt="分析的图片"
                        fill
                        style={{ objectFit: 'contain' }}
                      />
                    </div>
                  )}
                </div>
                
                <div className="md:w-2/3">
                  <Tabs defaultValue="face" onValueChange={setActiveTab}>
                    <TabsList className="w-full">
                      <TabsTrigger value="face" className="flex-1">面相分析</TabsTrigger>
                      <TabsTrigger value="palm" className="flex-1">手相分析</TabsTrigger>
                    </TabsList>
                    
                    <TabsContent value="face" className="mt-4">
                      <div className="space-y-4">
                        <div>
                          <h3 className="font-medium text-lg">总体面相</h3>
                          <p className="text-gray-700">{analysisResult.face.overall}</p>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="bg-gray-50 p-3 rounded-lg">
                            <h4 className="font-medium">额头</h4>
                            <p className="text-sm text-gray-600">{analysisResult.face.forehead}</p>
                          </div>
                          <div className="bg-gray-50 p-3 rounded-lg">
                            <h4 className="font-medium">眼睛</h4>
                            <p className="text-sm text-gray-600">{analysisResult.face.eyes}</p>
                          </div>
                          <div className="bg-gray-50 p-3 rounded-lg">
                            <h4 className="font-medium">鼻子</h4>
                            <p className="text-sm text-gray-600">{analysisResult.face.nose}</p>
                          </div>
                          <div className="bg-gray-50 p-3 rounded-lg">
                            <h4 className="font-medium">嘴巴</h4>
                            <p className="text-sm text-gray-600">{analysisResult.face.mouth}</p>
                          </div>
                          <div className="bg-gray-50 p-3 rounded-lg">
                            <h4 className="font-medium">下巴</h4>
                            <p className="text-sm text-gray-600">{analysisResult.face.chin}</p>
                          </div>
                        </div>
                        
                        <div className="bg-blue-50 p-4 rounded-lg">
                          <h3 className="font-medium text-blue-800">运势分析</h3>
                          <p className="text-blue-700">{analysisResult.face.fortune}</p>
                        </div>
                      </div>
                    </TabsContent>
                    
                    <TabsContent value="palm" className="mt-4">
                      <div className="space-y-4">
                        <div>
                          <h3 className="font-medium text-lg">总体手相</h3>
                          <p className="text-gray-700">{analysisResult.palm.overall}</p>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="bg-gray-50 p-3 rounded-lg">
                            <h4 className="font-medium">生命线</h4>
                            <p className="text-sm text-gray-600">{analysisResult.palm.lifeLines}</p>
                          </div>
                          <div className="bg-gray-50 p-3 rounded-lg">
                            <h4 className="font-medium">感情线</h4>
                            <p className="text-sm text-gray-600">{analysisResult.palm.heartLines}</p>
                          </div>
                          <div className="bg-gray-50 p-3 rounded-lg">
                            <h4 className="font-medium">智慧线</h4>
                            <p className="text-sm text-gray-600">{analysisResult.palm.headLines}</p>
                          </div>
                          <div className="bg-gray-50 p-3 rounded-lg">
                            <h4 className="font-medium">命运线</h4>
                            <p className="text-sm text-gray-600">{analysisResult.palm.fateLines}</p>
                          </div>
                        </div>
                        
                        <div className="bg-blue-50 p-4 rounded-lg">
                          <h3 className="font-medium text-blue-800">运势分析</h3>
                          <p className="text-blue-700">{analysisResult.palm.fortune}</p>
                        </div>
                      </div>
                    </TabsContent>
                  </Tabs>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>个人咨询</CardTitle>
              <CardDescription>
                对分析结果有疑问？留下您的问题，我们的专业命理师将为您解答
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Textarea
                placeholder="请输入您的问题或疑惑..."
                className="min-h-[120px]"
              />
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline" onClick={handleBack}>
                重新上传
              </Button>
              <Button>
                提交咨询
              </Button>
            </CardFooter>
          </Card>
        </div>
      )}
    </div>
  );
} 