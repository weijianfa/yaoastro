import { NextResponse } from "next/server";
import { z } from "zod";
import { randomBytes } from "crypto";

import prisma from "@/lib/db/prisma";

const forgotPasswordSchema = z.object({
  email: z.string().email({ message: "请输入有效的邮箱地址" }),
});

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { email } = forgotPasswordSchema.parse(body);

    // 检查邮箱是否存在
    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      // 为了安全，即使用户不存在也返回成功
      return NextResponse.json(
        { message: "如果该邮箱已注册，我们将发送重置密码链接" },
        { status: 200 }
      );
    }

    // 生成重置令牌
    const token = randomBytes(32).toString("hex");
    const expires = new Date(Date.now() + 3600000); // 1小时后过期

    // 存储重置令牌
    await prisma.verificationToken.create({
      data: {
        identifier: user.email,
        token,
        expires,
      },
    });

    // 在实际应用中，这里应该发送包含重置链接的邮件
    // 例如: await sendResetPasswordEmail(user.email, token);
    
    // 为了演示，我们只返回成功消息
    return NextResponse.json(
      { message: "如果该邮箱已注册，我们将发送重置密码链接" },
      { status: 200 }
    );
  } catch (error) {
    console.error("忘记密码错误:", error);
    
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { message: "输入验证失败", errors: error.errors },
        { status: 400 }
      );
    }
    
    return NextResponse.json(
      { message: "处理请求时发生错误" },
      { status: 500 }
    );
  }
} 