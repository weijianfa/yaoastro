import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { getUserById } from '@/services/user';
import { chatCompletion, ChatMessage } from '@/lib/ai';
import { DREAM_INTERPRETATION_PROMPT } from '@/lib/ai/prompts';

export async function POST(request: NextRequest) {
  try {
    // 验证用户会话
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return NextResponse.json({ error: '未授权访问' }, { status: 401 });
    }

    // 解析请求数据
    const requestData = await request.json();
    const { userId, dreamContent, additionalContext } = requestData;

    // 验证用户ID
    if (session.user.id !== userId) {
      return NextResponse.json({ error: '无权访问此资源' }, { status: 403 });
    }

    // 获取用户信息
    const user = await getUserById(userId);
    if (!user) {
      return NextResponse.json({ error: '用户不存在' }, { status: 404 });
    }

    // 验证梦境内容
    if (!dreamContent || dreamContent.trim().length < 10) {
      return NextResponse.json({ error: '请提供详细的梦境描述' }, { status: 400 });
    }

    // 构建提示词
    const messages: ChatMessage[] = [
      {
        role: 'system',
        content: DREAM_INTERPRETATION_PROMPT
      },
      {
        role: 'user',
        content: `
我的梦境内容如下：
${dreamContent}

${additionalContext ? `补充信息：${additionalContext}` : ''}

请帮我解析这个梦境的含义。
`
      }
    ];

    // 调用AI生成梦境解析
    const interpretation = await chatCompletion(messages, {
      temperature: 0.7,
      max_tokens: 1500,
    });

    // 返回结果
    return NextResponse.json({ interpretation });
  } catch (error) {
    console.error('梦境解析生成失败:', error);
    return NextResponse.json({ error: '生成梦境解析失败，请稍后再试' }, { status: 500 });
  }
} 