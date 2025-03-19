import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { getUserById } from '@/services/user';
import { generateYiJingReading } from '@/lib/ai';

export async function POST(request: NextRequest) {
  try {
    // 验证用户会话
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return NextResponse.json({ error: '未授权访问' }, { status: 401 });
    }

    // 解析请求数据
    const requestData = await request.json();
    const { userId, hexagram, question, additionalContext } = requestData;

    // 验证用户ID
    if (session.user.id !== userId) {
      return NextResponse.json({ error: '无权访问此资源' }, { status: 403 });
    }

    // 获取用户信息
    const user = await getUserById(userId);
    if (!user) {
      return NextResponse.json({ error: '用户不存在' }, { status: 404 });
    }

    // 验证卦象信息
    if (!hexagram) {
      return NextResponse.json({ error: '卦象信息不完整' }, { status: 400 });
    }

    // 验证问题
    if (!question) {
      return NextResponse.json({ error: '请提供问题' }, { status: 400 });
    }

    // 调用AI生成周易解读
    const interpretation = await generateYiJingReading(
      hexagram,
      `${question}${additionalContext ? `\n\n补充信息：${additionalContext}` : ''}`
    );

    // 返回结果
    return NextResponse.json({ interpretation });
  } catch (error) {
    console.error('周易AI解读生成失败:', error);
    return NextResponse.json({ error: '生成周易AI解读失败，请稍后再试' }, { status: 500 });
  }
} 