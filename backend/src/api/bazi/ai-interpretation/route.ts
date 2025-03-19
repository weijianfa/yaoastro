import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { getUserById } from '@/services/user';
import { generateFortuneTelling } from '@/lib/ai';

export async function POST(request: NextRequest) {
  try {
    // 验证用户会话
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return NextResponse.json({ error: '未授权访问' }, { status: 401 });
    }

    // 解析请求数据
    const requestData = await request.json();
    const { userId, birthYear, birthMonth, birthDay, birthHour, question, additionalContext } = requestData;

    // 验证用户ID
    if (session.user.id !== userId) {
      return NextResponse.json({ error: '无权访问此资源' }, { status: 403 });
    }

    // 获取用户信息
    const user = await getUserById(userId);
    if (!user) {
      return NextResponse.json({ error: '用户不存在' }, { status: 404 });
    }

    // 验证出生信息
    if (!birthYear || !birthMonth || !birthDay) {
      return NextResponse.json({ error: '出生信息不完整' }, { status: 400 });
    }

    // 构建提示词
    const prompt = `
用户问题：${question || '请分析我的八字命盘'}

出生信息：${birthYear}年${birthMonth}月${birthDay}日${birthHour || 0}时

${additionalContext ? `用户补充信息：${additionalContext}` : ''}
`;

    // 调用AI生成八字解读
    const interpretation = await generateFortuneTelling(
      birthYear,
      birthMonth,
      birthDay,
      birthHour || 0
    );

    // 返回结果
    return NextResponse.json({ interpretation });
  } catch (error) {
    console.error('八字AI解读生成失败:', error);
    return NextResponse.json({ error: '生成八字AI解读失败，请稍后再试' }, { status: 500 });
  }
} 