import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { getUserById } from '@/services/user';
import { tarotMeanings } from '@/data/tarotMeanings';
import { chatCompletion, ChatMessage } from '@/lib/ai';
import { TAROT_READING_PROMPT } from '@/lib/ai/prompts';

export async function POST(request: NextRequest) {
  try {
    // 验证用户会话
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return NextResponse.json({ error: '未授权访问' }, { status: 401 });
    }

    // 解析请求数据
    const requestData = await request.json();
    const { userId, question, spread, cards, additionalContext } = requestData;

    // 验证用户ID
    if (session.user.id !== userId) {
      return NextResponse.json({ error: '无权访问此资源' }, { status: 403 });
    }

    // 获取用户信息
    const user = await getUserById(userId);
    if (!user) {
      return NextResponse.json({ error: '用户不存在' }, { status: 404 });
    }

    // 准备塔罗牌详细信息
    const cardsWithDetails = cards.map((card: any) => {
      const cardInfo = tarotMeanings[card.name];
      if (!cardInfo) return card;

      return {
        ...card,
        fullMeaning: card.isReversed ? cardInfo.reversed : cardInfo.upright,
        description: cardInfo.description,
        keywords: card.isReversed ? cardInfo.keywords.reversed : cardInfo.keywords.upright,
        element: cardInfo.element,
        astrology: cardInfo.astrology
      };
    });

    // 构建用户提示
    const userPrompt = `
用户问题：${question}

牌阵类型：${spread}

抽取的塔罗牌：
${cardsWithDetails.map((card: any, index: number) => `
${index + 1}. ${card.position}位置：${card.name} ${card.isReversed ? '(逆位)' : '(正位)'}
   - 含义：${card.fullMeaning || card.meaning}
   - 描述：${card.description || '无详细描述'}
   - 关键词：${card.keywords ? card.keywords.join('、') : '无关键词'}
   - 元素：${card.element || '无元素属性'}
   - 星象：${card.astrology || '无星象关联'}
`).join('')}

${additionalContext ? `用户补充信息：${additionalContext}` : ''}

请提供一份详细的个性化解读，包括：
1. 整体牌阵分析：分析牌阵中各张牌之间的关系和整体能量。
2. 针对用户问题的具体解读：根据用户的问题和补充信息，提供针对性的解读。
3. 关键洞察：指出塔罗牌揭示的关键洞察和潜在机会。
4. 实用建议：提供具体的、可行动的建议，帮助用户应对当前情况。
`;

    // 构建消息数组
    const messages: ChatMessage[] = [
      { role: 'system', content: TAROT_READING_PROMPT },
      { role: 'user', content: userPrompt }
    ];

    // 调用AI生成塔罗牌解读
    const interpretation = await chatCompletion(messages, {
      temperature: 0.7,
      max_tokens: 2000,
    });

    // 返回结果
    return NextResponse.json({ interpretation });
  } catch (error) {
    console.error('AI解读生成失败:', error);
    return NextResponse.json({ error: '生成AI解读失败，请稍后再试' }, { status: 500 });
  }
} 