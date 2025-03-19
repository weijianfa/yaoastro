import { OpenAIResponse, ChatMessage, AIConfig, DivinationRequest, DivinationResponse } from './types';
import { DEFAULT_AI_CONFIG } from './config';

/**
 * OpenAI API 客户端配置
 */
const DEFAULT_CONFIG: AIConfig = {
  model: 'gpt-4-turbo',
  temperature: 0.7,
  max_tokens: 2000,
  top_p: 1,
  frequency_penalty: 0,
  presence_penalty: 0,
};

/**
 * 调用 AI API 进行聊天对话
 * @param messages 聊天消息数组
 * @param config 配置选项
 * @returns 响应内容
 */
export async function chatCompletion(
  messages: ChatMessage[],
  config: Partial<AIConfig> = {}
): Promise<string> {
  try {
    // 获取 API 密钥，优先使用 DeepSeek API 密钥
    const apiKey = process.env.DEEPSEEK_API_KEY || process.env.OPENAI_API_KEY;
    
    if (!apiKey) {
      throw new Error('AI API 密钥未配置');
    }
    
    const mergedConfig = { ...DEFAULT_AI_CONFIG, ...config };
    
    // 确定 API 端点，DeepSeek 和 OpenAI 使用相同的接口格式
    const apiEndpoint = process.env.DEEPSEEK_API_ENDPOINT || 'https://api.deepseek.com/v1/chat/completions';
    
    const response = await fetch(apiEndpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: mergedConfig.model,
        messages,
        temperature: mergedConfig.temperature,
        max_tokens: mergedConfig.max_tokens,
        top_p: mergedConfig.top_p,
        frequency_penalty: mergedConfig.frequency_penalty,
        presence_penalty: mergedConfig.presence_penalty,
      }),
    });
    
    if (!response.ok) {
      const error = await response.json();
      throw new Error(`AI API 错误: ${error.error?.message || '未知错误'}`);
    }
    
    const data = await response.json() as OpenAIResponse;
    return data.choices[0].message.content;
  } catch (error) {
    console.error('AI API 调用失败:', error);
    throw error;
  }
}

/**
 * 生成占卜解读
 * @param request 占卜请求
 * @returns 占卜解读结果
 */
export async function generateDivination(request: DivinationRequest): Promise<DivinationResponse> {
  const { question, type, cards, birthData } = request;
  
  let systemPrompt = '你是一位精通占卜和预测的专家，擅长解读各种占卜结果并给出有用的建议。';
  let userPrompt = '';
  
  switch (type) {
    case 'tarot':
      systemPrompt += '你精通塔罗牌的象征意义和解读方法。';
      userPrompt = `请解读以下塔罗牌组合，回答问题："${question}"。牌组：${cards?.join(', ')}`;
      break;
    case 'bazi':
      systemPrompt += '你精通八字命理和五行相生相克的规律。';
      userPrompt = `请根据以下八字信息，回答问题："${question}"。出生年月日时：${birthData?.year}年${birthData?.month}月${birthData?.day}日${birthData?.hour}时`;
      break;
    case 'zhouyi':
      systemPrompt += '你精通周易卦象和爻辞的解读。';
      userPrompt = `请解读以下卦象，回答问题："${question}"。卦象：${cards?.[0]}`;
      break;
    default:
      throw new Error('不支持的占卜类型');
  }
  
  const messages: ChatMessage[] = [
    { role: 'system', content: systemPrompt },
    { role: 'user', content: userPrompt },
  ];
  
  const responseContent = await chatCompletion(messages, {
    temperature: 0.8,
    max_tokens: 1500,
  });
  
  // 简单解析响应内容
  const interpretation = responseContent.split('建议:')[0] || responseContent;
  const advice = responseContent.includes('建议:') 
    ? responseContent.split('建议:')[1] 
    : '请根据解读自行判断最佳行动方案。';
  
  return {
    interpretation: interpretation.trim(),
    advice: advice.trim(),
    elements: cards?.map(card => ({ name: card, meaning: '' })),
  };
}

/**
 * 生成命理分析
 * @param birthYear 出生年
 * @param birthMonth 出生月
 * @param birthDay 出生日
 * @param birthHour 出生时
 * @returns 命理分析结果
 */
export async function generateFortuneTelling(
  birthYear: number,
  birthMonth: number,
  birthDay: number,
  birthHour: number
): Promise<string> {
  const messages: ChatMessage[] = [
    {
      role: 'system',
      content: '你是一位精通中国传统命理学的专家，擅长八字分析、五行分析和人生运势预测。请根据提供的出生信息，给出详细的命理分析。'
    },
    {
      role: 'user',
      content: `请根据以下出生信息进行命理分析：出生时间 ${birthYear}年${birthMonth}月${birthDay}日${birthHour}时`
    }
  ];
  
  return await chatCompletion(messages, {
    temperature: 0.7,
    max_tokens: 2000,
  });
}

/**
 * 生成周易解读
 * @param hexagram 卦象名称
 * @param question 问题
 * @returns 周易解读结果
 */
export async function generateYiJingReading(hexagram: string, question: string): Promise<string> {
  const messages: ChatMessage[] = [
    {
      role: 'system',
      content: '你是一位精通周易的专家，擅长解读卦象和爻辞，并将古代智慧应用于现代问题。'
    },
    {
      role: 'user',
      content: `我得到了"${hexagram}"卦，请解读这个卦象来回答我的问题："${question}"`
    }
  ];
  
  return await chatCompletion(messages, {
    temperature: 0.7,
    max_tokens: 1500,
  });
} 