import { AIConfig } from './types';

/**
 * 模型配置
 */
export const AI_MODELS = {
  // OpenAI 模型
  OPENAI_GPT4_TURBO: 'gpt-4-turbo',
  OPENAI_GPT4: 'gpt-4',
  OPENAI_GPT3_TURBO: 'gpt-3.5-turbo',
  
  // DeepSeek 模型
  DEEPSEEK_CHAT: 'deepseek-chat',
  DEEPSEEK_CODER: 'deepseek-coder',
  DEEPSEEK_LITE: 'deepseek-lite',
};

/**
 * 默认 AI 配置
 */
export const DEFAULT_AI_CONFIG: AIConfig = {
  model: AI_MODELS.DEEPSEEK_CHAT, // 默认使用 DeepSeek Chat 模型
  temperature: 0.7,
  max_tokens: 2000,
  top_p: 1,
  frequency_penalty: 0,
  presence_penalty: 0,
};

/**
 * 创意型 AI 配置 - 更高的创造性
 */
export const CREATIVE_AI_CONFIG: AIConfig = {
  ...DEFAULT_AI_CONFIG,
  temperature: 0.9,
  frequency_penalty: 0.2,
};

/**
 * 精确型 AI 配置 - 更精确的回答
 */
export const PRECISE_AI_CONFIG: AIConfig = {
  ...DEFAULT_AI_CONFIG,
  temperature: 0.3,
  top_p: 0.8,
};

/**
 * 占卜解读 AI 配置
 */
export const DIVINATION_AI_CONFIG: AIConfig = {
  ...DEFAULT_AI_CONFIG,
  temperature: 0.8,
  max_tokens: 1500,
};

/**
 * 命理分析 AI 配置
 */
export const FORTUNE_TELLING_AI_CONFIG: AIConfig = {
  ...DEFAULT_AI_CONFIG,
  temperature: 0.7,
  max_tokens: 2000,
}; 