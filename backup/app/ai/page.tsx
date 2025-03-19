'use client';

import React, { useState, useRef, useEffect } from 'react';

interface Message {
  content: string;
  isUser: boolean;
  timestamp: Date;
}

export default function AIPage() {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<Message[]>([
    {
      content: '您好！我是紫微斗数AI助手，有什么可以帮助您的吗？',
      isUser: false,
      timestamp: new Date(),
    },
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // 自动滚动到最新消息
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // 处理发送消息
  const handleSendMessage = async () => {
    if (!input.trim()) return;

    // 添加用户消息到聊天
    const userMessage: Message = {
      content: input,
      isUser: true,
      timestamp: new Date(),
    };
    
    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      // 模拟API调用延迟
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // 这里应该是实际的API调用，目前使用模拟响应
      const aiResponse: Message = {
        content: getAIResponse(input),
        isUser: false,
        timestamp: new Date(),
      };
      
      setMessages((prev) => [...prev, aiResponse]);
    } catch (error) {
      console.error('发送消息失败:', error);
      // 添加错误消息
      setMessages((prev) => [
        ...prev,
        {
          content: '抱歉，发生了错误，请稍后再试。',
          isUser: false,
          timestamp: new Date(),
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  // 处理按键事件（按Enter发送消息）
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  // 模拟AI响应（实际项目中应该调用后端API）
  const getAIResponse = (userInput: string): string => {
    const input = userInput.toLowerCase();
    
    if (input.includes('你好') || input.includes('hi') || input.includes('hello')) {
      return '您好！很高兴为您服务。请问有什么紫微斗数相关的问题需要解答吗？';
    }
    
    if (input.includes('紫微斗数') || input.includes('命盘')) {
      return '紫微斗数是中国传统命理学的一种，通过出生年、月、日、时来排盘分析命运。我可以帮您解读命盘，分析各宫位的吉凶。您需要提供准确的出生信息才能进行分析。';
    }
    
    if (input.includes('运势') || input.includes('财运') || input.includes('事业')) {
      return '要分析您的具体运势，需要根据您的完整命盘进行。不同的命盘组合会有不同的运势表现。您可以提供您的出生年月日时，我可以为您进行更详细的分析。';
    }
    
    return '感谢您的提问。要提供更准确的解答，我需要更多信息。您可以详细描述您的问题，或者提供您的出生年月日时，我可以为您进行紫微斗数命盘分析。';
  };

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-6">AI助手</h1>
      
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-3">智能AI助手</h2>
          <p className="text-gray-600">
            我们的AI助手可以帮助您解读紫微斗数命盘，提供个性化的分析和建议。
            只需输入您的问题，AI将为您提供专业的解答。
          </p>
        </div>
        
        <div className="border rounded-lg p-4 bg-gray-50">
          <div className="flex flex-col space-y-4">
            <div className="flex-1 overflow-y-auto max-h-[400px] p-4 bg-white rounded border">
              <div className="space-y-4">
                {messages.map((message, index) => (
                  <div key={index} className={`flex items-start ${message.isUser ? 'justify-end' : ''}`}>
                    <div 
                      className={`rounded-lg p-3 max-w-[80%] ${
                        message.isUser 
                          ? 'bg-primary text-white' 
                          : 'bg-primary/10'
                      }`}
                    >
                      <p className="text-sm">{message.content}</p>
                      <p className="text-xs mt-1 opacity-70">
                        {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </p>
                    </div>
                  </div>
                ))}
                {isLoading && (
                  <div className="flex items-start">
                    <div className="bg-primary/10 rounded-lg p-3">
                      <p className="text-sm">正在思考...</p>
                    </div>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>
            </div>
            
            <div className="flex items-center space-x-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="输入您的问题..."
                className="flex-1 p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                disabled={isLoading}
              />
              <button 
                onClick={handleSendMessage}
                disabled={isLoading || !input.trim()}
                className={`px-4 py-2 rounded-md ${
                  isLoading || !input.trim() 
                    ? 'bg-gray-300 cursor-not-allowed' 
                    : 'bg-primary text-white hover:bg-primary/90'
                }`}
              >
                发送
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 