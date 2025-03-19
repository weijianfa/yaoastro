/**
 * 获取八字天干地支
 * @param year 年份
 * @param month 月份
 * @param day 日期
 * @param hour 小时
 * @returns 八字天干地支
 */
export function getBaZi(year: number, month: number, day: number, hour: number) {
  // 这里是简化的八字计算，实际应用中应该使用更复杂的算法
  const tianGan = ['甲', '乙', '丙', '丁', '戊', '己', '庚', '辛', '壬', '癸'];
  const diZhi = ['子', '丑', '寅', '卯', '辰', '巳', '午', '未', '申', '酉', '戌', '亥'];
  
  // 简化计算，仅作示例
  const yearGan = tianGan[(year - 4) % 10];
  const yearZhi = diZhi[(year - 4) % 12];
  
  const monthGan = tianGan[(year * 2 + month) % 10];
  const monthZhi = diZhi[(month + 2) % 12];
  
  const dayGan = tianGan[(year * 5 + day) % 10];
  const dayZhi = diZhi[(day + 6) % 12];
  
  const hourGan = tianGan[(day * 2 + hour / 2) % 10];
  const hourZhi = diZhi[Math.floor(hour / 2) % 12];
  
  return {
    year: `${yearGan}${yearZhi}`,
    month: `${monthGan}${monthZhi}`,
    day: `${dayGan}${dayZhi}`,
    hour: `${hourGan}${hourZhi}`,
  };
}

/**
 * 获取生肖
 * @param year 年份
 * @returns 生肖
 */
export function getZodiac(year: number) {
  const zodiacs = ['鼠', '牛', '虎', '兔', '龙', '蛇', '马', '羊', '猴', '鸡', '狗', '猪'];
  return zodiacs[(year - 4) % 12];
}

/**
 * 获取星座
 * @param month 月份
 * @param day 日期
 * @returns 星座
 */
export function getZodiacSign(month: number, day: number) {
  const signs = ['摩羯座', '水瓶座', '双鱼座', '白羊座', '金牛座', '双子座', '巨蟹座', '狮子座', '处女座', '天秤座', '天蝎座', '射手座'];
  const dates = [20, 19, 21, 20, 21, 22, 23, 23, 23, 24, 23, 22];
  return signs[day < dates[month - 1] ? (month + 10) % 12 : (month + 11) % 12];
}

/**
 * 获取五行属性
 * @param element 天干或地支
 * @returns 五行属性
 */
export function getWuXing(element: string) {
  const wuXingMap: Record<string, string> = {
    '甲': '木', '乙': '木',
    '丙': '火', '丁': '火',
    '戊': '土', '己': '土',
    '庚': '金', '辛': '金',
    '壬': '水', '癸': '水',
    '寅': '木', '卯': '木',
    '巳': '火', '午': '火',
    '辰': '土', '丑': '土', '未': '土', '戌': '土',
    '申': '金', '酉': '金',
    '亥': '水', '子': '水',
  };
  
  return wuXingMap[element] || '未知';
} 