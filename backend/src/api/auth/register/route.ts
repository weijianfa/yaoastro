import { NextResponse } from "next/server";
import { hash } from "bcrypt";
import { z } from "zod";

import prisma from "@/lib/db/prisma";

const registerSchema = z.object({
  name: z.string().min(2, { message: "姓名至少需要2个字符" }),
  email: z.string().email({ message: "请输入有效的邮箱地址" }),
  password: z.string().min(6, { message: "密码至少需要6个字符" }),
});

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, email, password } = registerSchema.parse(body);

    // 检查邮箱是否已被注册
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return NextResponse.json(
        { message: "该邮箱已被注册" },
        { status: 409 }
      );
    }

    // 密码加密
    const hashedPassword = await hash(password, 10);

    // 创建用户
    const user = await prisma.user.create({
      data: {
        name,
        email,
        hashedPassword,
      },
    });

    // 创建用户资料
    await prisma.profile.create({
      data: {
        userId: user.id,
      },
    });

    return NextResponse.json(
      { message: "用户注册成功", userId: user.id },
      { status: 201 }
    );
  } catch (error) {
    console.error("注册错误:", error);
    
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { message: "输入验证失败", errors: error.errors },
        { status: 400 }
      );
    }
    
    return NextResponse.json(
      { message: "注册过程中发生错误" },
      { status: 500 }
    );
  }
} 