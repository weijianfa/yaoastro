import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * 合并className，解决Tailwind CSS类名冲突问题
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * 格式化日期字符串
 * @param dateString - ISO格式的日期字符串
 * @param options - 日期格式化选项
 * @returns 格式化后的日期字符串
 */
export function formatDate(
  dateString: string,
  options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit"
  }
): string {
  if (!dateString) return "未知";
  
  try {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat("zh-CN", options).format(date);
  } catch (error) {
    console.error("日期格式化错误:", error);
    return "无效日期";
  }
}

/**
 * 格式化货币
 * @param amount - 金额数值
 * @param currency - 货币类型，默认为CNY（人民币）
 * @returns 格式化后的货币字符串
 */
export function formatCurrency(
  amount: number,
  currency: string = "CNY"
): string {
  if (amount === undefined || amount === null) return "¥0.00";
  
  try {
    return new Intl.NumberFormat("zh-CN", {
      style: "currency",
      currency: currency,
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(amount);
  } catch (error) {
    console.error("货币格式化错误:", error);
    return `¥${amount.toFixed(2)}`;
  }
}

/**
 * 从对象数组中选择指定属性并创建新的数组
 * @param array 原数组
 * @param key 要提取的属性键
 */
export function pluck<T, K extends keyof T>(array: T[], key: K): T[K][] {
  return array.map(item => item[key]);
}

/**
 * 防抖函数
 * @param fn 要执行的函数
 * @param ms 延迟毫秒数
 */
export function debounce<T extends (...args: any[]) => any>(fn: T, ms = 300) {
  let timeoutId: ReturnType<typeof setTimeout>;
  return function(...args: Parameters<T>) {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => fn(...args), ms);
  };
}

/**
 * 节流函数
 * @param fn 要执行的函数
 * @param ms 执行间隔毫秒数
 */
export function throttle<T extends (...args: any[]) => any>(fn: T, ms = 300) {
  let lastTime = 0;
  return function(...args: Parameters<T>) {
    const now = Date.now();
    if (now - lastTime >= ms) {
      fn(...args);
      lastTime = now;
    }
  };
}

/**
 * 获取随机ID
 * @param length ID长度
 */
export function getRandomId(length = 8) {
  return Math.random().toString(36).substring(2, 2 + length);
}

/**
 * 将对象转换为查询字符串
 * @param params 参数对象
 */
export function toQueryString(params: Record<string, any>) {
  return Object.entries(params)
    .filter(([_, value]) => value !== undefined && value !== null && value !== '')
    .map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(String(value))}`)
    .join('&');
}

/**
 * 从查询字符串解析参数
 * @param queryString 查询字符串
 */
export function parseQueryString(queryString: string) {
  const params: Record<string, string> = {};
  const urlSearchParams = new URLSearchParams(queryString);
  
  urlSearchParams.forEach((value, key) => {
    params[key] = value;
  });
  
  return params;
}

/**
 * 深度复制对象
 * @param obj 要复制的对象
 */
export function deepClone<T>(obj: T): T {
  if (obj === null || typeof obj !== 'object') {
    return obj;
  }
  
  if (Array.isArray(obj)) {
    return obj.map(item => deepClone(item)) as unknown as T;
  }
  
  return Object.fromEntries(
    Object.entries(obj).map(([key, value]) => [key, deepClone(value)])
  ) as T;
}

/**
 * 移除对象中的空值属性（null, undefined, ''）
 * @param obj 要处理的对象
 */
export function removeEmptyValues<T extends Record<string, any>>(obj: T): Partial<T> {
  return Object.fromEntries(
    Object.entries(obj).filter(([_, value]) => {
      return value !== null && value !== undefined && value !== '';
    })
  ) as Partial<T>;
}

/**
 * 截断文本，超出长度的部分用省略号替代
 * @param text - 要截断的文本
 * @param maxLength - 最大长度，默认为50
 * @returns 截断后的文本
 */
export function truncateText(text: string, maxLength: number = 50): string {
  if (!text) return "";
  return text.length > maxLength ? `${text.substring(0, maxLength)}...` : text;
}

/**
 * 获取相对时间（如：3小时前，2天前）
 * @param dateString - ISO格式的日期字符串
 * @returns 相对时间字符串
 */
export function getRelativeTimeFromNow(dateString: string): string {
  if (!dateString) return "未知时间";
  
  try {
    const date = new Date(dateString);
    const now = new Date();
    const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);
    
    if (diffInSeconds < 60) return `${diffInSeconds}秒前`;
    if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)}分钟前`;
    if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)}小时前`;
    if (diffInSeconds < 2592000) return `${Math.floor(diffInSeconds / 86400)}天前`;
    if (diffInSeconds < 31536000) return `${Math.floor(diffInSeconds / 2592000)}个月前`;
    
    return `${Math.floor(diffInSeconds / 31536000)}年前`;
  } catch (error) {
    console.error("相对时间计算错误:", error);
    return "无效日期";
  }
}

// 天干
const HEAVENLY_STEMS = ['甲', '乙', '丙', '丁', '戊', '己', '庚', '辛', '壬', '癸'];
// 地支
const EARTHLY_BRANCHES = ['子', '丑', '寅', '卯', '辰', '巳', '午', '未', '申', '酉', '戌', '亥'];
// 生肖
const ZODIAC_ANIMALS = ['鼠', '牛', '虎', '兔', '龙', '蛇', '马', '羊', '猴', '鸡', '狗', '猪'];
// 星座
const ZODIAC_SIGNS = [
  { name: '水瓶座', startMonth: 1, startDay: 20, endMonth: 2, endDay: 18 },
  { name: '双鱼座', startMonth: 2, startDay: 19, endMonth: 3, endDay: 20 },
  { name: '白羊座', startMonth: 3, startDay: 21, endMonth: 4, endDay: 19 },
  { name: '金牛座', startMonth: 4, startDay: 20, endMonth: 5, endDay: 20 },
  { name: '双子座', startMonth: 5, startDay: 21, endMonth: 6, endDay: 21 },
  { name: '巨蟹座', startMonth: 6, startDay: 22, endMonth: 7, endDay: 22 },
  { name: '狮子座', startMonth: 7, startDay: 23, endMonth: 8, endDay: 22 },
  { name: '处女座', startMonth: 8, startDay: 23, endMonth: 9, endDay: 22 },
  { name: '天秤座', startMonth: 9, startDay: 23, endMonth: 10, endDay: 23 },
  { name: '天蝎座', startMonth: 10, startDay: 24, endMonth: 11, endDay: 22 },
  { name: '射手座', startMonth: 11, startDay: 23, endMonth: 12, endDay: 21 },
  { name: '摩羯座', startMonth: 12, startDay: 22, endMonth: 1, endDay: 19 }
];
// 五行
const WUXING_MAP: Record<string, string> = {
  '甲': '木', '乙': '木',
  '丙': '火', '丁': '火',
  '戊': '土', '己': '土',
  '庚': '金', '辛': '金',
  '壬': '水', '癸': '水',
  '寅': '木', '卯': '木',
  '巳': '火', '午': '火',
  '辰': '土', '丑': '土', '未': '土', '戌': '土',
  '申': '金', '酉': '金',
  '亥': '水', '子': '水'
};

/**
 * 计算八字
 * @param year 年
 * @param month 月
 * @param day 日
 * @param hour 时
 * @returns 八字
 */
export function getBaZi(year: number, month: number, day: number, hour: number): { year: string, month: string, day: string, hour: string } {
  // 简化计算，实际应用中应该使用更复杂的算法
  const yearIndex = (year - 4) % 60;
  const yearStem = HEAVENLY_STEMS[yearIndex % 10];
  const yearBranch = EARTHLY_BRANCHES[yearIndex % 12];
  
  const monthStem = HEAVENLY_STEMS[(yearIndex % 5 * 2 + month - 1) % 10];
  const monthBranch = EARTHLY_BRANCHES[(month + 1) % 12];
  
  // 简化日柱计算
  const baseDate = new Date(1900, 0, 31); // 1900年1月31日为甲辰日
  const targetDate = new Date(year, month - 1, day);
  const dayDiff = Math.floor((targetDate.getTime() - baseDate.getTime()) / (24 * 60 * 60 * 1000));
  const dayStem = HEAVENLY_STEMS[dayDiff % 10];
  const dayBranch = EARTHLY_BRANCHES[dayDiff % 12];
  
  // 时柱计算
  const hourIndex = Math.floor(hour / 2) % 12;
  const hourStem = HEAVENLY_STEMS[(dayDiff % 5 * 2 + hourIndex) % 10];
  const hourBranch = EARTHLY_BRANCHES[hourIndex];
  
  return {
    year: yearStem + yearBranch,
    month: monthStem + monthBranch,
    day: dayStem + dayBranch,
    hour: hourStem + hourBranch
  };
}

/**
 * 获取生肖
 * @param year 年份
 * @returns 生肖
 */
export function getZodiac(year: number): string {
  return ZODIAC_ANIMALS[(year - 4) % 12];
}

/**
 * 获取星座
 * @param month 月份
 * @param day 日期
 * @returns 星座
 */
export function getZodiacSign(month: number, day: number): string {
  for (const sign of ZODIAC_SIGNS) {
    if (
      (month === sign.startMonth && day >= sign.startDay) ||
      (month === sign.endMonth && day <= sign.endDay)
    ) {
      return sign.name;
    }
  }
  
  // 默认返回摩羯座
  return '摩羯座';
}

/**
 * 获取五行属性
 * @param element 天干或地支
 * @returns 五行属性
 */
export function getWuXing(element: string): string {
  return WUXING_MAP[element] || '未知';
} 