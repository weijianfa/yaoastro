/**
 * OpenAI API 响应类型
 */
export interface OpenAIResponse {
  id: string;
  object: string;
  created: number;
  model: string;
  choices: {
    index: number;
    message: {
      role: 'system' | 'user' | 'assistant';
      content: string;
    };
    finish_reason: string;
  }[];
  usage: {
    prompt_tokens: number;
    completion_tokens: number;
    total_tokens: number;
  };
}

/**
 * 聊天消息类型
 */
export interface ChatMessage {
  role: 'system' | 'user' | 'assistant';
  content: string;
}

/**
 * AI 配置选项
 */
export interface AIConfig {
  model: string;
  temperature?: number;
  max_tokens?: number;
  top_p?: number;
  frequency_penalty?: number;
  presence_penalty?: number;
}

/**
 * 占卜请求类型
 */
export interface DivinationRequest {
  question: string;
  type: 'tarot' | 'bazi' | 'zhouyi';
  cards?: string[];
  birthData?: {
    year: number;
    month: number;
    day: number;
    hour: number;
  };
}

/**
 * 占卜响应类型
 */
export interface DivinationResponse {
  interpretation: string;
  advice: string;
  elements?: {
    name: string;
    meaning: string;
    position?: string;
  }[];
} 