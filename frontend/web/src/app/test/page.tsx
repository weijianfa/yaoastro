'use client';

import React, { useState } from 'react';

export default function TestPage() {
  const [apiMethod, setApiMethod] = useState('GET');
  const [apiPath, setApiPath] = useState('');
  const [apiResponse, setApiResponse] = useState(`// 响应结果将显示在这里
{
  "status": "success",
  "data": {
    "message": "API测试成功"
  }
}`);
  const [isLoading, setIsLoading] = useState(false);

  // 处理API请求
  const handleApiRequest = async () => {
    if (!apiPath.trim()) return;
    
    setIsLoading(true);
    setApiResponse('// 正在发送请求...');
    
    try {
      // 模拟API调用延迟
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // 这里应该是实际的API调用，目前使用模拟响应
      const mockResponse = {
        status: 'success',
        timestamp: new Date().toISOString(),
        method: apiMethod,
        path: apiPath,
        data: {
          message: '请求成功',
          details: '这是一个模拟的API响应'
        }
      };
      
      setApiResponse(JSON.stringify(mockResponse, null, 2));
    } catch (error) {
      console.error('API请求失败:', error);
      setApiResponse(JSON.stringify({
        status: 'error',
        message: '请求失败',
        error: '发生了未知错误'
      }, null, 2));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-6">测试页面</h1>
      
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-3">组件测试</h2>
          <p className="text-gray-600 mb-4">
            这是一个用于测试各种组件和功能的页面。您可以在这里查看和测试系统中的各种UI组件。
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
            <div className="border rounded-lg p-4 bg-gray-50">
              <h3 className="font-medium mb-2">按钮组件</h3>
              <div className="flex flex-wrap gap-2">
                <button 
                  className="bg-primary text-white px-4 py-2 rounded-md hover:bg-primary/90"
                  onClick={() => alert('点击了主要按钮')}
                >
                  主要按钮
                </button>
                <button 
                  className="bg-secondary text-white px-4 py-2 rounded-md hover:bg-secondary/80"
                  onClick={() => alert('点击了次要按钮')}
                >
                  次要按钮
                </button>
                <button 
                  className="border border-gray-300 px-4 py-2 rounded-md hover:bg-gray-100"
                  onClick={() => alert('点击了默认按钮')}
                >
                  默认按钮
                </button>
              </div>
            </div>
            
            <div className="border rounded-lg p-4 bg-gray-50">
              <h3 className="font-medium mb-2">输入组件</h3>
              <div className="space-y-2">
                <input
                  type="text"
                  placeholder="文本输入"
                  className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                  onChange={(e) => console.log('输入值:', e.target.value)}
                />
                <select 
                  className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                  onChange={(e) => console.log('选择值:', e.target.value)}
                >
                  <option>选项1</option>
                  <option>选项2</option>
                  <option>选项3</option>
                </select>
              </div>
            </div>
            
            <div className="border rounded-lg p-4 bg-gray-50">
              <h3 className="font-medium mb-2">卡片组件</h3>
              <div className="bg-white border rounded-lg p-3 shadow-sm hover:shadow-md transition-shadow cursor-pointer">
                <h4 className="font-medium text-sm mb-1">卡片标题</h4>
                <p className="text-xs text-gray-500">这是一个示例卡片，用于展示卡片组件的样式和布局。</p>
              </div>
            </div>
          </div>
        </div>
        
        <div className="mt-8">
          <h2 className="text-xl font-semibold mb-3">API测试</h2>
          <p className="text-gray-600 mb-4">
            您可以在这里测试系统的各种API接口。
          </p>
          
          <div className="border rounded-lg p-4 bg-gray-50">
            <div className="flex items-center space-x-2 mb-4">
              <select 
                value={apiMethod}
                onChange={(e) => setApiMethod(e.target.value)}
                className="p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
              >
                <option>GET</option>
                <option>POST</option>
                <option>PUT</option>
                <option>DELETE</option>
              </select>
              <input
                type="text"
                value={apiPath}
                onChange={(e) => setApiPath(e.target.value)}
                placeholder="API路径"
                className="flex-1 p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
              />
              <button 
                onClick={handleApiRequest}
                disabled={isLoading || !apiPath.trim()}
                className={`px-4 py-2 rounded-md ${
                  isLoading || !apiPath.trim() 
                    ? 'bg-gray-300 cursor-not-allowed' 
                    : 'bg-primary text-white hover:bg-primary/90'
                }`}
              >
                {isLoading ? '发送中...' : '发送请求'}
              </button>
            </div>
            
            <div className="bg-gray-900 text-gray-100 p-4 rounded-md font-mono text-sm overflow-x-auto">
              <pre>{apiResponse}</pre>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 