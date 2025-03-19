'use client';

import { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ArrowLeft, Send, Sparkles, User, Bot, Clock, ThumbsUp, ThumbsDown, MoreHorizontal, Paperclip, Mic } from 'lucide-react';

// 消息类型
type MessageRole = 'user' | 'assistant' | 'system';

interface Message {
  id: string;
  role: MessageRole;
  content: string;
  timestamp: Date;
}

// AI角色
interface AiRole {
  id: string;
  name: string;
  avatar: string;
  description: string;
  specialty: string;
  greeting: string;
}

// AI角色数据
const aiRoles: AiRole[] = [
  {
    id: 'fortune-teller',
    name: '玄机大师',
    avatar: '/images/fortune-teller.jpg',
    description: '精通八字命理、紫微斗数和风水学的资深命理师',
    specialty: '命理分析、运势预测',
    greeting: '欢迎来到玄机世界，我是玄机大师。请告诉我您的出生年月日时，我可以为您分析命盘和运势。'
  },
  {
    id: 'tarot-reader',
    name: '塔罗占卜师',
    avatar: '/images/tarot-reader.jpg',
    description: '专业塔罗牌解读者，擅长情感、事业和人生方向的指引',
    specialty: '塔罗占卜、情感咨询',
    greeting: '你好，我是塔罗占卜师。请在心中默想一个问题，我将为你抽取塔罗牌，揭示隐藏的真相和可能的未来。'
  },
  {
    id: 'life-coach',
    name: '心灵导师',
    avatar: '/images/life-coach.jpg',
    description: '结合心理学和东方智慧的生活顾问，帮助你找到内心平静',
    specialty: '心理疏导、生活建议',
    greeting: '很高兴与你相遇。我是心灵导师，愿意倾听你的困惑，并提供一些建议和思考角度，帮助你找到内心的答案。'
  }
];

// 预设问题
const suggestedQuestions = [
  "我最近事业不顺，有什么建议吗？",
  "我和伴侣经常争吵，如何改善关系？",
  "我该如何提升自己的财运？",
  "最近总是做噩梦，有什么含义吗？",
  "我适合什么样的职业发展方向？"
];

// 生成唯一ID
const generateId = () => Math.random().toString(36).substring(2, 9);

export default function AiChatPage() {
  const router = useRouter();
  const [selectedRole, setSelectedRole] = useState<AiRole>(aiRoles[0]);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  // 初始化对话
  useEffect(() => {
    // 添加系统欢迎消息
    const initialMessage: Message = {
      id: generateId(),
      role: 'assistant',
      content: selectedRole.greeting,
      timestamp: new Date()
    };
    
    setMessages([initialMessage]);
  }, [selectedRole]);
  
  // 自动滚动到最新消息
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);
  
  // 切换AI角色
  const handleRoleChange = (roleId: string) => {
    const newRole = aiRoles.find(role => role.id === roleId);
    if (newRole && newRole.id !== selectedRole.id) {
      setSelectedRole(newRole);
      setMessages([]);
    }
  };
  
  // 发送消息
  const handleSendMessage = () => {
    if (!inputMessage.trim()) return;
    
    // 添加用户消息
    const userMessage: Message = {
      id: generateId(),
      role: 'user',
      content: inputMessage,
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsTyping(true);
    
    // 模拟AI回复
    setTimeout(() => {
      const aiResponses = {
        'fortune-teller': [
          "根据您的描述，我看到您的命盘中木星正在财运宫位，这是一个非常吉利的征兆。未来三个月内，您可能会有意外之财或投资回报。",
          "您的八字显示近期有贵人相助的迹象，建议多参加社交活动，扩展人脉。同时，西南方向对您近期运势有利。",
          "从紫微斗数来看，您目前处于事业上升期，但需要注意健康，特别是肝胆方面。建议保持规律作息，避免过度劳累。"
        ],
        'tarot-reader': [
          "我为您抽到了「命运之轮」正位，这表示您的生活即将迎来转机和新的机遇。命运正在转动，带来积极的变化。",
          "「恋人」牌出现在您的感情位置，表示您的感情生活将面临重要选择。倾听内心的声音，做出真实的决定。",
          "「星星」牌暗示您应该保持希望和信心。即使当前面临挑战，未来依然光明。这是一个治愈和恢复的时期。"
        ],
        'life-coach': [
          "您所经历的困难是成长的一部分。尝试将注意力从问题本身转移到可能的解决方案上，每天记录三件感恩的事情，这会帮助您保持积极的心态。",
          "人际关系中的冲突往往源于沟通不畅。尝试使用「我感受」的表达方式，而非指责对方。例如说「当...发生时，我感到...」",
          "工作压力大是现代人的常态，建议您尝试正念冥想，每天只需10分钟，就能有效减轻压力，提高专注力和工作效率。"
        ]
      };
      
      // 随机选择一个回复
      const responses = aiResponses[selectedRole.id as keyof typeof aiResponses];
      const randomResponse = responses[Math.floor(Math.random() * responses.length)];
      
      const assistantMessage: Message = {
        id: generateId(),
        role: 'assistant',
        content: randomResponse,
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, assistantMessage]);
      setIsTyping(false);
    }, 1500);
  };
  
  // 使用预设问题
  const handleUseSuggestedQuestion = (question: string) => {
    setInputMessage(question);
  };
  
  // 渲染消息气泡
  const renderMessage = (message: Message) => {
    const isUser = message.role === 'user';
    
    return (
      <div 
        key={message.id} 
        className={`flex ${isUser ? 'justify-end' : 'justify-start'} mb-4`}
      >
        {!isUser && (
          <div className="w-8 h-8 rounded-full overflow-hidden flex-shrink-0 mr-2">
            <div className="bg-primary text-white w-full h-full flex items-center justify-center">
              <Bot className="h-5 w-5" />
            </div>
          </div>
        )}
        
        <div className={`max-w-[80%] ${isUser ? 'bg-primary text-primary-foreground' : 'bg-muted'} rounded-lg px-4 py-2`}>
          <div className="text-sm">{message.content}</div>
          <div className="flex items-center justify-end mt-1 space-x-2">
            <span className="text-xs opacity-70">
              {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
            </span>
            
            {!isUser && (
              <div className="flex space-x-1">
                <button className="text-xs opacity-70 hover:opacity-100">
                  <ThumbsUp className="h-3 w-3" />
                </button>
                <button className="text-xs opacity-70 hover:opacity-100">
                  <ThumbsDown className="h-3 w-3" />
                </button>
              </div>
            )}
          </div>
        </div>
        
        {isUser && (
          <div className="w-8 h-8 rounded-full overflow-hidden flex-shrink-0 ml-2">
            <div className="bg-blue-500 text-white w-full h-full flex items-center justify-center">
              <User className="h-5 w-5" />
            </div>
          </div>
        )}
      </div>
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
        <h1 className="text-2xl font-bold">智能对话</h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {/* 侧边栏 */}
        <div className="md:col-span-1">
          <Card>
            <CardContent className="p-4">
              <div className="space-y-4">
                <h2 className="font-medium text-lg">选择对话助手</h2>
                
                <div className="space-y-2">
                  {aiRoles.map((role) => (
                    <div 
                      key={role.id}
                      className={`flex items-center p-2 rounded-lg cursor-pointer transition-colors ${selectedRole.id === role.id ? 'bg-primary/10' : 'hover:bg-muted'}`}
                      onClick={() => handleRoleChange(role.id)}
                    >
                      <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center mr-3">
                        <Bot className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-medium">{role.name}</h3>
                        <p className="text-xs text-gray-500">{role.specialty}</p>
                      </div>
                    </div>
                  ))}
                </div>
                
                <div className="pt-4 border-t">
                  <h3 className="font-medium mb-2">当前助手信息</h3>
                  <p className="text-sm text-gray-600 mb-2">{selectedRole.description}</p>
                  <div className="flex items-center text-xs text-gray-500">
                    <Clock className="h-3 w-3 mr-1" />
                    <span>24小时在线服务</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        
        {/* 主聊天区域 */}
        <div className="md:col-span-3">
          <Card className="flex flex-col h-[600px]">
            {/* 聊天头部 */}
            <div className="border-b p-4">
              <div className="flex items-center">
                <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center mr-3">
                  <Bot className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h2 className="font-medium">{selectedRole.name}</h2>
                  <p className="text-xs text-gray-500">{selectedRole.specialty}</p>
                </div>
              </div>
            </div>
            
            {/* 消息区域 */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map(renderMessage)}
              
              {isTyping && (
                <div className="flex justify-start mb-4">
                  <div className="w-8 h-8 rounded-full overflow-hidden flex-shrink-0 mr-2">
                    <div className="bg-primary text-white w-full h-full flex items-center justify-center">
                      <Bot className="h-5 w-5" />
                    </div>
                  </div>
                  <div className="bg-muted rounded-lg px-4 py-2">
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: '0ms' }}></div>
                      <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: '300ms' }}></div>
                      <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: '600ms' }}></div>
                    </div>
                  </div>
                </div>
              )}
              
              <div ref={messagesEndRef} />
            </div>
            
            {/* 输入区域 */}
            <div className="border-t p-4">
              {messages.length === 1 && (
                <div className="mb-4">
                  <h3 className="text-sm font-medium mb-2">你可以这样问我：</h3>
                  <div className="flex flex-wrap gap-2">
                    {suggestedQuestions.map((question, index) => (
                      <Button
                        key={index}
                        variant="outline"
                        size="sm"
                        onClick={() => handleUseSuggestedQuestion(question)}
                        className="text-xs"
                      >
                        {question}
                      </Button>
                    ))}
                  </div>
                </div>
              )}
              
              <div className="flex items-center space-x-2">
                <Button variant="outline" size="icon" className="rounded-full">
                  <Paperclip className="h-4 w-4" />
                </Button>
                <Input
                  placeholder={`向${selectedRole.name}发送消息...`}
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                  className="flex-1"
                />
                <Button variant="outline" size="icon" className="rounded-full">
                  <Mic className="h-4 w-4" />
                </Button>
                <Button size="icon" className="rounded-full" onClick={handleSendMessage} disabled={!inputMessage.trim()}>
                  <Send className="h-4 w-4" />
                </Button>
              </div>
              
              <div className="mt-2 text-xs text-center text-gray-500">
                <Sparkles className="h-3 w-3 inline-block mr-1" />
                AI回复仅供参考，重要决策请咨询专业人士
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
} 