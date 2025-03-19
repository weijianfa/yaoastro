import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { getUserById } from '@/services/user';
import { generateDivination, DivinationRequest } from '@/lib/ai';

export async function POST(request: NextRequest) {
  try {
    // 验证用户会话
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return NextResponse.json({ error: '未授权访问' }, { status: 401 });
    }

    // 解析请求数据
    const requestData = await request.json();
    const { userId, question, type, cards, birthData } = requestData;

    // 验证用户ID
    if (session.user.id !== userId) {
      return NextResponse.json({ error: '无权访问此资源' }, { status: 403 });
    }

    // 获取用户信息
    const user = await getUserById(userId);
    if (!user) {
      return NextResponse.json({ error: '用户不存在' }, { status: 404 });
    }

    // 验证必要信息
    if (!question) {
      return NextResponse.json({ error: '请提供问题' }, { status: 400 });
    }

    if (!type || !['tarot', 'bazi', 'zhouyi'].includes(type)) {
      return NextResponse.json({ error: '不支持的占卜类型' }, { status: 400 });
    }

    // 根据类型验证必要数据
    if (type === 'tarot' && (!cards || cards.length === 0)) {
      return NextResponse.json({ error: '请提供塔罗牌信息' }, { status: 400 });
    }

    if (type === 'bazi' && (!birthData || !birthData.year || !birthData.month || !birthData.day)) {
      return NextResponse.json({ error: '请提供完整的出生信息' }, { status: 400 });
    }

    if (type === 'zhouyi' && (!cards || cards.length === 0)) {
      return NextResponse.json({ error: '请提供卦象信息' }, { status: 400 });
    }

    // 构建占卜请求
    const divinationRequest: DivinationRequest = {
      question,
      type,
      cards,
      birthData
    };

    // 调用AI生成占卜解读
    const result = await generateDivination(divinationRequest);

    // 返回结果
    return NextResponse.json(result);
  } catch (error) {
    console.error('占卜AI解读生成失败:', error);
    return NextResponse.json({ error: '生成占卜AI解读失败，请稍后再试' }, { status: 500 });
  }
} 