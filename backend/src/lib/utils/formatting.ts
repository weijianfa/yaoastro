import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * 合并类名工具函数
 * 结合 clsx 和 tailwind-merge 实现高效的类名合并
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * 格式化日期
 * @param date 日期对象或日期字符串
 * @param options 格式化选项
 * @returns 格式化后的日期字符串
 */
export function formatDate(date: Date | string, options: Intl.DateTimeFormatOptions = {}) {
  const defaultOptions: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "long",
    day: "numeric",
    ...options,
  };
  
  return new Date(date).toLocaleDateString("zh-CN", defaultOptions);
}

/**
 * 格式化货币
 * @param amount 金额
 * @param currency 货币代码
 * @returns 格式化后的货币字符串
 */
export function formatCurrency(amount: number, currency = "CNY") {
  return new Intl.NumberFormat("zh-CN", {
    style: "currency",
    currency,
  }).format(amount);
}

/**
 * 截断文本
 * @param text 文本
 * @param length 最大长度
 * @returns 截断后的文本
 */
export function truncateText(text: string, length = 100) {
  if (text.length <= length) return text;
  return text.slice(0, length) + "...";
} 