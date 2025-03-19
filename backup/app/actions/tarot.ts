'use server';

import { revalidatePath } from 'next/cache';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { z } from 'zod';
import { TarotAnalysisContent } from '@/types/analysis';
import { SessionUser } from '@/types/user';
import { createOrder } from '@/services/order';
import { createAnalysis, getUserAnalyses, getAnalysisById } from '@/services/analysis';
import { getUserById } from '@/services/user';
import { getServiceTypeByType } from '@/services/serviceType';
import { tarotMeanings } from '@/data/tarotMeanings';

// 塔罗牌牌组
const TAROT_CARDS = [
  { name: '愚者', image: '/images/tarot/fool.jpg' },
  { name: '魔术师', image: '/images/tarot/magician.jpg' },
  { name: '女祭司', image: '/images/tarot/priestess.jpg' },
  { name: '女皇', image: '/images/tarot/empress.jpg' },
  { name: '皇帝', image: '/images/tarot/emperor.jpg' },
  { name: '教皇', image: '/images/tarot/hierophant.jpg' },
  { name: '恋人', image: '/images/tarot/major/lovers.jpg' },
  { name: '战车', image: '/images/tarot/chariot.jpg' },
  { name: '力量', image: '/images/tarot/strength.jpg' },
  { name: '隐士', image: '/images/tarot/hermit.jpg' },
  { name: '命运之轮', image: '/images/tarot/wheel.jpg' },
  { name: '正义', image: '/images/tarot/justice.jpg' },
  { name: '倒吊人', image: '/images/tarot/hanged.jpg' },
  { name: '死神', image: '/images/tarot/death.jpg' },
  { name: '节制', image: '/images/tarot/temperance.jpg' },
  { name: '恶魔', image: '/images/tarot/devil.jpg' },
  { name: '塔', image: '/images/tarot/tower.jpg' },
  { name: '星星', image: '/images/tarot/star.jpg' },
  { name: '月亮', image: '/images/tarot/moon.jpg' },
  { name: '太阳', image: '/images/tarot/sun.jpg' },
  { name: '审判', image: '/images/tarot/judgement.jpg' },
  { name: '世界', image: '/images/tarot/world.jpg' },
];

// 塔罗牌牌阵
const TAROT_SPREADS = [
  { 
    name: '三张牌阵', 
    positions: ['过去', '现在', '未来'],
    description: '最基础的牌阵，适合简单明了的问题。第一张牌代表过去的影响，第二张牌代表当前状况，第三张牌代表未来的发展。',
    layout: 'linear'
  },
  { 
    name: '凯尔特十字牌阵', 
    positions: ['当前状况', '挑战', '过去', '未来', '意识', '潜意识', '自我认知', '外界影响', '希望或恐惧', '最终结果'],
    description: '最全面的牌阵之一，适合深入分析复杂问题。十张牌从不同角度揭示问题的各个方面。',
    layout: 'celtic-cross'
  },
  { 
    name: '关系牌阵', 
    positions: ['你自己', '对方', '关系现状', '关系基础', '过去影响', '未来发展'],
    description: '专为分析人际关系设计的牌阵，帮助理解双方的状态和关系的发展方向。',
    layout: 'relationship'
  },
  { 
    name: '五卡牌阵', 
    positions: ['当前状况', '障碍', '建议', '态度', '结果'],
    description: '平衡而全面的牌阵，适合需要具体建议的问题。五张牌提供问题的概览和解决方案。',
    layout: 'five-card'
  },
  { 
    name: '生命之树牌阵', 
    positions: ['灵性目标', '智慧', '理解', '仁慈', '严厉', '和谐', '胜利', '荣耀', '基础', '物质世界'],
    description: '基于卡巴拉生命之树的牌阵，适合深度灵性探索和自我发展的问题。',
    layout: 'tree-of-life'
  },
  { 
    name: '一年展望牌阵', 
    positions: ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月'],
    description: '为未来一年提供月度指引的牌阵，帮助规划和了解每个月的能量和挑战。',
    layout: 'year-ahead'
  }
];

// 塔罗牌分析的验证模式
const tarotAnalysisSchema = z.object({
  question: z.string().min(1, '请输入您的问题').max(500, '问题不能超过500个字符'),
  spread: z.string().min(1, '请选择牌阵'),
});

// 创建塔罗牌分析
export async function createTarotAnalysis(formData: FormData) {
  try {
    // 获取当前用户会话
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return { error: '用户未登录' };
    }

    // 验证表单数据
    const validatedFields = tarotAnalysisSchema.safeParse({
      question: formData.get('question'),
      spread: formData.get('spread'),
    });

    if (!validatedFields.success) {
      return { error: '表单数据无效', fieldErrors: validatedFields.error.flatten().fieldErrors };
    }

    const { question, spread } = validatedFields.data;

    // 获取用户信息
    const user = await getUserById(session.user.id);

    if (!user) {
      return { error: '用户不存在' };
    }

    // 获取服务类型
    const serviceType = await getServiceTypeByType('TAROT');
    const servicePrice = serviceType?.price || 99;

    // 获取牌阵信息
    const selectedSpread = TAROT_SPREADS.find(s => s.name === spread);
    if (!selectedSpread) {
      return { error: '无效的牌阵' };
    }

    // 随机抽取塔罗牌
    const shuffledCards = [...TAROT_CARDS].sort(() => Math.random() - 0.5);
    const selectedCards = shuffledCards.slice(0, selectedSpread.positions.length);

    // 生成牌位解读
    const cardReadings = selectedCards.map((card, index) => {
      const position = selectedSpread.positions[index];
      const isReversed = Math.random() > 0.5;
      
      return {
        name: card.name,
        position,
        image: card.image,
        isReversed,
        meaning: generateCardMeaning(card.name, position, isReversed),
      };
    });

    // 生成整体解读
    const interpretation = generateInterpretation(question, cardReadings);
    
    // 生成建议
    const advice = generateAdvice(question, cardReadings);

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
    const content: TarotAnalysisContent = {
      question,
      spread: selectedSpread.name,
      cards: cardReadings,
      interpretation,
      advice,
      result: interpretation,
      recommendations: advice,
      metadata: {
        spread: selectedSpread.name,
        cards: cardReadings
      }
    };

    const analysisResult = await createAnalysis({
      userId: user.id,
      type: 'TAROT',
      question,
      result: interpretation,
      recommendations: advice,
      orderId: order.id,
      metadata: content,
    });

    // 刷新塔罗牌分析页面
    revalidatePath('/dashboard/tarot');

    return { success: true, analysisId: analysisResult.id };
  } catch (error) {
    console.error('创建塔罗牌分析失败:', error);
    return { error: '创建塔罗牌分析失败，请稍后再试' };
  }
}

// 获取用户的塔罗牌分析历史
export async function getTarotAnalysisHistory() {
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

    // 获取用户的塔罗牌分析历史
    const result = await getUserAnalyses(user.id, 'TAROT');

    return { analyses: result.analyses };
  } catch (error) {
    console.error('获取塔罗牌分析历史失败:', error);
    return { error: '获取塔罗牌分析历史失败，请稍后再试' };
  }
}

// 获取塔罗牌分析详情
export async function getTarotAnalysisDetails(analysisId: string) {
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
    console.error('获取塔罗牌分析详情失败:', error);
    return { error: '获取塔罗牌分析详情失败，请稍后再试' };
  }
}

// 辅助函数：生成牌义解读
function generateCardMeaning(cardName: string, position: string, isReversed: boolean) {
  // 使用tarotMeanings数据库获取牌义
  const cardInfo = tarotMeanings[cardName];
  
  if (cardInfo) {
    const meaning = isReversed ? cardInfo.reversedMeaning : cardInfo.meaning;
    const keywords = cardInfo.keywords ? 
      (isReversed ? cardInfo.keywords.slice(0, 3).join('、') : cardInfo.keywords.slice(0, 3).join('、')) : 
      '';
    
    return `在${position}位置上，${isReversed ? '逆位' : '正位'}的${cardName}表示：${meaning}。关键词：${keywords}。${cardInfo.description || ''}`;
  }
  
  // 如果在数据库中找不到该牌的信息，则返回通用解读
  return isReversed
    ? `在${position}位置上，逆位的${cardName}表示您可能面临一些挑战或阻碍。`
    : `在${position}位置上，正位的${cardName}带来积极的能量和机会。`;
}

// 辅助函数：生成整体解读
function generateInterpretation(question: string, cardReadings: any[]) {
  // 根据问题类型和牌阵生成整体解读
  let interpretation = `关于您的问题"${question}"，塔罗牌给出了以下启示：\n\n`;

  // 添加每张牌的简要解读
  cardReadings.forEach(card => {
    interpretation += `${card.position}位置的${card.name}${card.isReversed ? '（逆位）' : '（正位）'}显示：${card.meaning}\n\n`;
  });

  // 添加整体分析
  interpretation += `整体来看，这个牌阵显示`;

  if (question.includes('爱情') || question.includes('感情') || question.includes('婚姻')) {
    interpretation += `您的感情状况正处于${getOverallTone(cardReadings)}阶段。`;
    interpretation += `您需要${getRelationshipAdvice(cardReadings)}`;
  } else if (question.includes('事业') || question.includes('工作') || question.includes('职业')) {
    interpretation += `您的职业发展正面临${getOverallTone(cardReadings)}的局面。`;
    interpretation += `建议您${getCareerAdvice(cardReadings)}`;
  } else if (question.includes('财运') || question.includes('金钱') || question.includes('投资')) {
    interpretation += `您的财务状况显示${getOverallTone(cardReadings)}的趋势。`;
    interpretation += `在财务方面，您应该${getFinancialAdvice(cardReadings)}`;
  } else {
    interpretation += `您目前的整体状况处于${getOverallTone(cardReadings)}的阶段。`;
    interpretation += `塔罗牌建议您${getGeneralAdvice(cardReadings)}`;
  }

  return interpretation;
}

// 辅助函数：生成建议
function generateAdvice(question: string, cardReadings: any[]) {
  // 根据问题和牌阵生成具体建议
  if (question.includes('爱情') || question.includes('感情') || question.includes('婚姻')) {
    return getRelationshipAdvice(cardReadings);
  } else if (question.includes('事业') || question.includes('工作') || question.includes('职业')) {
    return getCareerAdvice(cardReadings);
  } else if (question.includes('财运') || question.includes('金钱') || question.includes('投资')) {
    return getFinancialAdvice(cardReadings);
  } else {
    return getGeneralAdvice(cardReadings);
  }
}

// 辅助函数：获取整体基调
function getOverallTone(cardReadings: any[]) {
  // 计算正逆位牌的比例来确定整体基调
  const reversedCount = cardReadings.filter(card => card.isReversed).length;
  const totalCards = cardReadings.length;
  const reversedRatio = reversedCount / totalCards;

  if (reversedRatio > 0.7) {
    return '充满挑战和阻碍';
  } else if (reversedRatio > 0.4) {
    return '有一定波动和变化';
  } else {
    return '相对积极和顺利';
  }
}

// 辅助函数：获取感情建议
function getRelationshipAdvice(cardReadings: any[]) {
  const hasLoverCard = cardReadings.some(card => card.name === '恋人');
  const hasEmperorCard = cardReadings.some(card => card.name === '皇帝');
  const hasEmpressCard = cardReadings.some(card => card.name === '女皇');
  const hasTowerCard = cardReadings.some(card => card.name === '塔');
  const hasDeathCard = cardReadings.some(card => card.name === '死神');

  if (hasLoverCard) {
    return '更加关注感情中的沟通和理解，保持开放的心态面对关系中的选择。';
  } else if (hasEmperorCard && hasEmpressCard) {
    return '在关系中找到平衡，既要有主动性也要有包容性，相互尊重彼此的特质。';
  } else if (hasTowerCard || hasDeathCard) {
    return '准备好迎接关系中的重大变化，这可能是一个结束，也是新开始的机会。';
  } else {
    return '关注自己的情感需求，同时尊重对方的感受，保持真诚和耐心。';
  }
}

// 辅助函数：获取事业建议
function getCareerAdvice(cardReadings: any[]) {
  const hasChariotCard = cardReadings.some(card => card.name === '战车');
  const hasEmperorCard = cardReadings.some(card => card.name === '皇帝');
  const hasMagicianCard = cardReadings.some(card => card.name === '魔术师');
  const hasHermitCard = cardReadings.some(card => card.name === '隐士');

  if (hasChariotCard) {
    return '坚定自己的职业目标，保持专注和决心，克服前进道路上的障碍。';
  } else if (hasEmperorCard) {
    return '发挥领导才能，建立稳固的职业结构，注重长期规划和稳健发展。';
  } else if (hasMagicianCard) {
    return '充分利用自己的技能和创造力，寻找新的机会展示自己的才华。';
  } else if (hasHermitCard) {
    return '花时间反思自己的职业道路，寻找真正的职业使命，可能需要独立思考。';
  } else {
    return '保持职业上的灵活性，不断学习新技能，适应工作环境的变化。';
  }
}

// 辅助函数：获取财务建议
function getFinancialAdvice(cardReadings: any[]) {
  const hasPentacleCards = cardReadings.some(card => 
    card.name.includes('星币') || card.name === '命运之轮' || card.name === '皇帝');
  const hasDevilCard = cardReadings.some(card => card.name === '恶魔');
  const hasTemperanceCard = cardReadings.some(card => card.name === '节制');

  if (hasPentacleCards) {
    return '关注实际的财务规划，建立稳定的收入来源，注重长期投资。';
  } else if (hasDevilCard) {
    return '警惕过度消费和物质依赖，避免陷入债务陷阱，保持财务自由。';
  } else if (hasTemperanceCard) {
    return '平衡收入和支出，适度消费，建立应急基金，保持财务健康。';
  } else {
    return '多元化投资，不要把所有鸡蛋放在一个篮子里，同时提高财务知识。';
  }
}

// 辅助函数：获取通用建议
function getGeneralAdvice(cardReadings: any[]) {
  const hasFoolCard = cardReadings.some(card => card.name === '愚者');
  const hasStrengthCard = cardReadings.some(card => card.name === '力量');
  const hasStarCard = cardReadings.some(card => card.name === '星星');
  const hasMoonCard = cardReadings.some(card => card.name === '月亮');
  const hasSunCard = cardReadings.some(card => card.name === '太阳');

  if (hasFoolCard) {
    return '保持开放的心态，勇于尝试新事物，但也要注意脚下的路。';
  } else if (hasStrengthCard) {
    return '相信自己的内在力量，用温和而坚定的方式面对挑战。';
  } else if (hasStarCard) {
    return '保持希望和信心，相信美好的事物正在前方等待着您。';
  } else if (hasMoonCard) {
    return '倾听自己的直觉，面对内心的恐惧，寻找隐藏的真相。';
  } else if (hasSunCard) {
    return '拥抱生活的喜悦，展现真实的自我，享受成功的果实。';
  } else {
    return '保持平衡的生活态度，关注身心健康，与他人建立真诚的联系。';
  }
} 