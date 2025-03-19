/**
 * 生成随机ID
 * @param length ID长度
 * @returns 随机ID
 */
export function generateId(length = 8) {
  return Math.random().toString(36).substring(2, 2 + length);
}

/**
 * 检查值是否为对象
 * @param item 要检查的值
 * @returns 是否为对象
 */
function isObject(item: any): boolean {
  return item && typeof item === "object" && !Array.isArray(item);
}

/**
 * 深度合并对象
 * @param target 目标对象
 * @param source 源对象
 * @returns 合并后的对象
 */
export function deepMerge<T extends Record<string, any>>(target: T, source: Partial<T>): T {
  const output = { ...target };
  
  if (isObject(target) && isObject(source)) {
    Object.keys(source).forEach((key) => {
      const sourceValue = source[key as keyof typeof source];
      if (isObject(sourceValue)) {
        if (!(key in target)) {
          Object.assign(output, { [key]: sourceValue });
        } else {
          const targetValue = target[key as keyof T];
          output[key as keyof T] = deepMerge(
            targetValue,
            sourceValue as any
          ) as any;
        }
      } else {
        Object.assign(output, { [key]: sourceValue });
      }
    });
  }
  
  return output;
}

/**
 * 延迟函数
 * @param ms 延迟毫秒数
 * @returns Promise
 */
export function delay(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
} 