'use server';

import { revalidatePath } from 'next/cache';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { z } from 'zod';
import { getBaZi, getZodiac, getZodiacSign, getWuXing } from '@/lib/utils';
import { BaziAnalysisContent } from '@/types/analysis';
import { SessionUser } from '@/types/user';
import { createOrder } from '@/services/order';
import { createAnalysis, getUserAnalyses, getAnalysisById } from '@/services/analysis';
import { getUserById } from '@/services/user';
import { getServiceTypeByType } from '@/services/serviceType';

// 八字分析的验证模式
const baziAnalysisSchema = z.object({
  year: z.string().regex(/^\d{4}$/, '请输入有效的年份'),
  month: z.string().regex(/^(0?[1-9]|1[0-2])$/, '请输入有效的月份'),
  day: z.string().regex(/^(0?[1-9]|[12][0-9]|3[01])$/, '请输入有效的日期'),
  hour: z.string().regex(/^([01]?[0-9]|2[0-3])$/, '请输入有效的小时'),
  gender: z.enum(['MALE', 'FEMALE']),
  question: z.string().min(1, '请输入您的问题').max(500, '问题不能超过500个字符'),
});

// 创建八字分析
export async function createBaziAnalysis(formData: FormData) {
  try {
    // 获取当前用户会话
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return { error: '用户未登录' };
    }

    // 验证表单数据
    const validatedFields = baziAnalysisSchema.safeParse({
      year: formData.get('year'),
      month: formData.get('month'),
      day: formData.get('day'),
      hour: formData.get('hour'),
      gender: formData.get('gender'),
      question: formData.get('question'),
    });

    if (!validatedFields.success) {
      return { error: '表单数据无效', fieldErrors: validatedFields.error.flatten().fieldErrors };
    }

    const { year, month, day, hour, gender, question } = validatedFields.data;

    // 获取用户信息
    const user = await getUserById(session.user.id);

    if (!user) {
      return { error: '用户不存在' };
    }

    // 获取服务类型
    const serviceType = await getServiceTypeByType('BAZI');
    const servicePrice = serviceType?.price || 99;

    // 计算八字
    const yearNum = parseInt(year);
    const monthNum = parseInt(month);
    const dayNum = parseInt(day);
    const hourNum = parseInt(hour);
    
    const bazi = getBaZi(yearNum, monthNum, dayNum, hourNum);
    const zodiac = getZodiac(yearNum);
    const zodiacSign = getZodiacSign(monthNum, dayNum);
    
    // 分析五行
    const yearWuxing = getWuXing(bazi.year[0]);
    const monthWuxing = getWuXing(bazi.month[0]);
    const dayWuxing = getWuXing(bazi.day[0]);
    const hourWuxing = getWuXing(bazi.hour[0]);
    
    // 生成分析结果（这里是模拟的分析结果，实际应用中应该使用更复杂的算法）
    const analysisText = `
      您的八字：${bazi.year} ${bazi.month} ${bazi.day} ${bazi.hour}
      生肖：${zodiac}
      星座：${zodiacSign}
      五行：${yearWuxing} ${monthWuxing} ${dayWuxing} ${hourWuxing}
      
      根据您的八字分析，您的命盘显示：
      
      1. 性格特点：您天生具有${dayWuxing}的特质，性格${dayWuxing === '火' ? '热情开朗' : dayWuxing === '水' ? '聪明灵活' : dayWuxing === '木' ? '正直有爱心' : dayWuxing === '金' ? '坚毅果断' : '稳重踏实'}。
      
      2. 事业发展：您的事业宫位于${monthWuxing}位，显示您在${monthWuxing === '火' ? '创意和表演' : monthWuxing === '水' ? '沟通和销售' : monthWuxing === '木' ? '教育和医疗' : monthWuxing === '金' ? '金融和法律' : '房地产和农业'}领域有较大发展空间。
      
      3. 财运分析：您的财运受${hourWuxing}影响，财运${hourWuxing === '火' || hourWuxing === '木' ? '较为旺盛' : '需要稳步积累'}。
      
      4. 感情状况：您的感情宫受${yearWuxing}影响，在感情中您${yearWuxing === '火' ? '热情主动' : yearWuxing === '水' ? '敏感体贴' : yearWuxing === '木' ? '真诚守信' : yearWuxing === '金' ? '专一忠诚' : '踏实可靠'}。
      
      5. 健康提示：您需要注意${dayWuxing === '火' ? '心脏和血压' : dayWuxing === '水' ? '肾脏和泌尿系统' : dayWuxing === '木' ? '肝脏和眼睛' : dayWuxing === '金' ? '肺部和呼吸系统' : '脾胃和消化系统'}的健康。
      
      针对您的问题"${question}"，建议您：
      ${generateAdvice(question, bazi, gender)}
    `;
    
    // 生成建议
    const recommendations = [
      `加强${getWeakestElement(yearWuxing, monthWuxing, dayWuxing, hourWuxing)}属性的事物接触`,
      `避免${getStrongestElement(yearWuxing, monthWuxing, dayWuxing, hourWuxing)}过旺带来的不良影响`,
      `在${getAuspiciousDirection(dayWuxing)}方向发展会有贵人相助`,
      `${getAuspiciousMonths(dayWuxing)}月份是您的吉利月份`,
      `佩戴${getAuspiciousColor(dayWuxing)}色调的饰品有助于运势提升`,
    ];

    // 创建订单
    const order = await createOrder({
      userId: user.id,
      serviceTypeId: serviceType?.id,
      amount: servicePrice,
      paymentMethod: 'WECHAT',
      paymentStatus: 'PAID',
      orderType: 'SERVICE',
      completedAt: new Date(),
      paymentId: `payment_${Date.now()}`,
    });

    // 创建分析结果
    const analysisResult = await createAnalysis({
      userId: user.id,
      type: 'BAZI',
      question,
      result: analysisText,
      recommendations: recommendations.join('\n'),
      orderId: order.id,
      metadata: {
        year: parseInt(year),
        month: parseInt(month),
        day: parseInt(day),
        hour: parseInt(hour),
        gender,
        baziChart: {
          year: {
            heavenlyStem: bazi.year[0],
            earthlyBranch: bazi.year[1],
            element: yearWuxing
          },
          month: {
            heavenlyStem: bazi.month[0],
            earthlyBranch: bazi.month[1],
            element: monthWuxing
          },
          day: {
            heavenlyStem: bazi.day[0],
            earthlyBranch: bazi.day[1],
            element: dayWuxing
          },
          hour: {
            heavenlyStem: bazi.hour[0],
            earthlyBranch: bazi.hour[1],
            element: hourWuxing
          }
        },
        fiveElements: {
          wood: yearWuxing === '木' || monthWuxing === '木' || dayWuxing === '木' || hourWuxing === '木' ? 1 : 0,
          fire: yearWuxing === '火' || monthWuxing === '火' || dayWuxing === '火' || hourWuxing === '火' ? 1 : 0,
          earth: yearWuxing === '土' || monthWuxing === '土' || dayWuxing === '土' || hourWuxing === '土' ? 1 : 0,
          metal: yearWuxing === '金' || monthWuxing === '金' || dayWuxing === '金' || hourWuxing === '金' ? 1 : 0,
          water: yearWuxing === '水' || monthWuxing === '水' || dayWuxing === '水' || hourWuxing === '水' ? 1 : 0
        },
        luckyElements: [getWeakestElement(yearWuxing, monthWuxing, dayWuxing, hourWuxing)],
        unluckyElements: [getStrongestElement(yearWuxing, monthWuxing, dayWuxing, hourWuxing)]
      }
    });

    // 刷新八字分析页面
    revalidatePath('/dashboard/bazi');

    return { success: true, analysisId: analysisResult.id };
  } catch (error) {
    console.error('创建八字分析失败:', error);
    return { error: '创建八字分析失败，请稍后再试' };
  }
}

// 获取用户的八字分析历史
export async function getBaziAnalysisHistory() {
  try {
    // 获取当前用户会话
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return { error: '用户未登录' };
    }

    // 获取用户信息
    const user = await getUserById(session.user.id);

    if (!user) {
      return { error: '用户不存在' };
    }

    // 获取用户的八字分析历史
    const result = await getUserAnalyses(user.id, 'BAZI');

    return { analyses: result.analyses };
  } catch (error) {
    console.error('获取八字分析历史失败:', error);
    return { error: '获取八字分析历史失败，请稍后再试' };
  }
}

// 获取八字分析详情
export async function getBaziAnalysisDetails(analysisId: string) {
  try {
    // 获取当前用户会话
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return { error: '用户未登录' };
    }

    // 获取用户信息
    const user = await getUserById(session.user.id);

    if (!user) {
      return { error: '用户不存在' };
    }

    // 获取分析详情
    const analysis = await getAnalysisById(analysisId);

    if (!analysis) {
      return { error: '分析结果不存在' };
    }

    // 验证分析结果所有者
    const sessionUser = session.user as SessionUser;
    if (analysis.userId !== user.id && sessionUser.role !== 'ADMIN') {
      return { error: '无权访问此分析结果' };
    }

    return { analysis };
  } catch (error) {
    console.error('获取八字分析详情失败:', error);
    return { error: '获取八字分析详情失败，请稍后再试' };
  }
}

// 辅助函数：生成建议
function generateAdvice(question: string, bazi: any, gender: string) {
  // 根据问题类型生成不同的建议
  if (question.includes('事业') || question.includes('工作') || question.includes('职业')) {
    return `
      在事业方面，您的八字显示您适合在${bazi.day[0] === '甲' || bazi.day[0] === '乙' ? '创意和设计' : 
      bazi.day[0] === '丙' || bazi.day[0] === '丁' ? '销售和市场' : 
      bazi.day[0] === '戊' || bazi.day[0] === '己' ? '教育和服务' : 
      bazi.day[0] === '庚' || bazi.day[0] === '辛' ? '金融和法律' : '研究和分析'}领域发展。
      建议您充分发挥自己的${getWuXing(bazi.day[0])}属性优势，同时注意与${getWuXing(bazi.month[0])}相关的贵人。
      近期事业运势${isAuspicious(bazi) ? '较为顺利' : '有一定阻碍'}，建议${isAuspicious(bazi) ? '把握机会大胆前进' : '稳扎稳打，避免冒进'}。
    `;
  } else if (question.includes('感情') || question.includes('婚姻') || question.includes('爱情')) {
    return `
      在感情方面，您的八字显示您${gender === 'MALE' ? '适合找一位' + (getWuXing(bazi.day[0]) === '火' ? '水' : getWuXing(bazi.day[0]) === '水' ? '土' : getWuXing(bazi.day[0]) === '木' ? '金' : getWuXing(bazi.day[0]) === '金' ? '火' : '木') + '属性的伴侣' : 
      '适合找一位' + (getWuXing(bazi.day[0]) === '火' ? '金' : getWuXing(bazi.day[0]) === '水' ? '木' : getWuXing(bazi.day[0]) === '木' ? '水' : getWuXing(bazi.day[0]) === '金' ? '土' : '火') + '属性的伴侣'}。
      您在感情中${bazi.day[0] === '甲' || bazi.day[0] === '庚' ? '较为主动' : 
      bazi.day[0] === '乙' || bazi.day[0] === '辛' ? '较为被动' : 
      bazi.day[0] === '丙' || bazi.day[0] === '壬' ? '热情奔放' : 
      bazi.day[0] === '丁' || bazi.day[0] === '癸' ? '温柔体贴' : '稳重踏实'}。
      近期感情运势${isAuspicious(bazi) ? '有上升趋势' : '需要更多耐心'}，建议${isAuspicious(bazi) ? '把握机会表达心意' : '先专注自我提升，缘分自会到来'}。
    `;
  } else if (question.includes('财运') || question.includes('钱') || question.includes('投资')) {
    return `
      在财运方面，您的八字显示您${bazi.hour[0] === '甲' || bazi.hour[0] === '乙' ? '适合长期投资' : 
      bazi.hour[0] === '丙' || bazi.hour[0] === '丁' ? '适合短期投机' : 
      bazi.hour[0] === '戊' || bazi.hour[0] === '己' ? '适合稳健理财' : 
      bazi.hour[0] === '庚' || bazi.hour[0] === '辛' ? '适合固定收益' : '适合多元化投资'}。
      您的财运与${getWuXing(bazi.hour[0])}属性关联最大，可以通过加强这方面的事物来提升财运。
      近期财运${isAuspicious(bazi) ? '较为顺畅' : '有一定波动'}，建议${isAuspicious(bazi) ? '适当把握投资机会' : '保持谨慎，避免大额支出'}。
    `;
  } else if (question.includes('健康') || question.includes('身体')) {
    return `
      在健康方面，您的八字显示您需要特别注意${getWuXing(bazi.day[0]) === '火' ? '心脏和血压' : 
      getWuXing(bazi.day[0]) === '水' ? '肾脏和泌尿系统' : 
      getWuXing(bazi.day[0]) === '木' ? '肝脏和眼睛' : 
      getWuXing(bazi.day[0]) === '金' ? '肺部和呼吸系统' : '脾胃和消化系统'}的健康。
      建议您多进行${getWuXing(bazi.day[0]) === '火' ? '舒缓性运动如瑜伽' : 
      getWuXing(bazi.day[0]) === '水' ? '有氧运动如游泳' : 
      getWuXing(bazi.day[0]) === '木' ? '伸展运动如太极' : 
      getWuXing(bazi.day[0]) === '金' ? '呼吸训练如慢跑' : '平衡性运动如散步'}。
      饮食上应${getWuXing(bazi.day[0]) === '火' ? '避免辛辣刺激' : 
      getWuXing(bazi.day[0]) === '水' ? '减少寒凉食物' : 
      getWuXing(bazi.day[0]) === '木' ? '控制酸性食物' : 
      getWuXing(bazi.day[0]) === '金' ? '增加润肺食物' : '注意消化系统保养'}。
    `;
  } else {
    // 通用建议
    return `
      根据您的八字分析，近期运势${isAuspicious(bazi) ? '较为顺利' : '有一定挑战'}。
      建议您充分发挥${getWuXing(bazi.day[0])}的特质，同时注意与${getWuXing(bazi.month[0])}相关的机遇。
      在人际关系中，与${getWuXing(bazi.year[0])}属性的人合作会有意想不到的收获。
      整体来说，保持积极乐观的心态，顺应天时地利人和，您的运势将会不断提升。
    `;
  }
}

// 辅助函数：判断是否吉利
function isAuspicious(bazi: any) {
  // 简化判断，实际应用中应该使用更复杂的算法
  const luckyGan = ['甲', '丙', '戊', '庚', '壬'];
  const luckyZhi = ['寅', '午', '戌', '申', '子'];
  
  let score = 0;
  
  if (luckyGan.includes(bazi.day[0])) score++;
  if (luckyZhi.includes(bazi.day[1])) score++;
  if (luckyGan.includes(bazi.month[0])) score++;
  if (luckyZhi.includes(bazi.month[1])) score++;
  
  return score >= 2;
}

// 辅助函数：获取最弱的五行
function getWeakestElement(year: string, month: string, day: string, hour: string) {
  const elements = [year, month, day, hour];
  const counts: Record<string, number> = {
    '木': 0,
    '火': 0,
    '土': 0,
    '金': 0,
    '水': 0,
  };
  
  elements.forEach(element => {
    if (counts[element] !== undefined) {
      counts[element]++;
    }
  });
  
  let weakestElement = '木';
  let minCount = Infinity;
  
  for (const [element, count] of Object.entries(counts)) {
    if (count < minCount) {
      minCount = count;
      weakestElement = element;
    }
  }
  
  return weakestElement;
}

// 辅助函数：获取最强的五行
function getStrongestElement(year: string, month: string, day: string, hour: string) {
  const elements = [year, month, day, hour];
  const counts: Record<string, number> = {
    '木': 0,
    '火': 0,
    '土': 0,
    '金': 0,
    '水': 0,
  };
  
  elements.forEach(element => {
    if (counts[element] !== undefined) {
      counts[element]++;
    }
  });
  
  let strongestElement = '木';
  let maxCount = 0;
  
  for (const [element, count] of Object.entries(counts)) {
    if (count > maxCount) {
      maxCount = count;
      strongestElement = element;
    }
  }
  
  return strongestElement;
}

// 辅助函数：获取吉利方向
function getAuspiciousDirection(dayWuxing: string) {
  switch (dayWuxing) {
    case '木': return '东方';
    case '火': return '南方';
    case '土': return '中央';
    case '金': return '西方';
    case '水': return '北方';
    default: return '东南';
  }
}

// 辅助函数：获取吉利月份
function getAuspiciousMonths(dayWuxing: string) {
  switch (dayWuxing) {
    case '木': return '1, 2, 3, 4';
    case '火': return '5, 6, 7';
    case '土': return '2, 5, 8, 11';
    case '金': return '8, 9, 10';
    case '水': return '11, 12, 1';
    default: return '3, 7, 9';
  }
}

// 辅助函数：获取吉利颜色
function getAuspiciousColor(dayWuxing: string) {
  switch (dayWuxing) {
    case '木': return '绿色';
    case '火': return '红色';
    case '土': return '黄色';
    case '金': return '白色';
    case '水': return '蓝色';
    default: return '紫色';
  }
} 