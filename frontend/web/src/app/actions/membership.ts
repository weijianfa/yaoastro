'use server';

import { revalidatePath } from 'next/cache';
import { PrismaClient } from '@prisma/client';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { z } from 'zod';

const prisma = new PrismaClient();

// 购买会员的验证模式
const purchaseMembershipSchema = z.object({
  membershipLevelId: z.string().min(1, '会员等级不能为空'),
  paymentMethod: z.enum(['ALIPAY', 'WECHAT', 'CREDIT_CARD']),
});

// 购买会员
export async function purchaseMembership(formData: FormData) {
  try {
    // 获取当前用户会话
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) {
      return { error: '用户未登录' };
    }

    // 验证表单数据
    const validatedFields = purchaseMembershipSchema.safeParse({
      membershipLevelId: formData.get('membershipLevelId'),
      paymentMethod: formData.get('paymentMethod'),
    });

    if (!validatedFields.success) {
      return { error: '表单数据无效', fieldErrors: validatedFields.error.flatten().fieldErrors };
    }

    const { membershipLevelId, paymentMethod } = validatedFields.data;

    // 获取用户信息
    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
    });

    if (!user) {
      return { error: '用户不存在' };
    }

    // 获取会员等级信息
    const membershipLevel = await prisma.membershipLevel.findUnique({
      where: { id: membershipLevelId },
    });

    if (!membershipLevel) {
      return { error: '会员等级不存在' };
    }

    // 计算会员有效期
    const now = new Date();
    const expiresAt = membershipLevel.durationDays > 0
      ? new Date(now.getTime() + membershipLevel.durationDays * 24 * 60 * 60 * 1000)
      : null;

    // 创建订单
    const order = await prisma.order.create({
      data: {
        userId: user.id,
        amount: membershipLevel.price,
        paymentMethod,
        paymentStatus: 'PENDING',
        status: 'PENDING',
        orderType: 'MEMBERSHIP',
      },
    });

    // 模拟支付处理
    // 在实际应用中，这里应该调用支付网关API
    const paymentId = `payment_${Date.now()}`;
    
    // 更新订单支付信息
    await prisma.order.update({
      where: { id: order.id },
      data: {
        paymentId,
        paymentStatus: 'PAID',
        status: 'COMPLETED',
        completedAt: new Date(),
      },
    });

    // 更新用户会员信息
    await prisma.userMembership.upsert({
      where: { userId: user.id },
      update: {
        membershipLevelId,
        startDate: now,
        expiresAt,
        isActive: true,
      },
      create: {
        userId: user.id,
        membershipLevelId,
        startDate: now,
        expiresAt,
        isActive: true,
      },
    });

    // 刷新会员页面
    revalidatePath('/dashboard/membership');

    return { success: true, orderId: order.id };
  } catch (error) {
    console.error('购买会员失败:', error);
    return { error: '购买会员失败，请稍后再试' };
  }
}

// 获取用户会员信息
export async function getUserMembership() {
  try {
    // 获取当前用户会话
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) {
      return { error: '用户未登录' };
    }

    // 获取用户信息
    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
    });

    if (!user) {
      return { error: '用户不存在' };
    }

    // 获取用户会员信息
    const userMembership = await prisma.userMembership.findUnique({
      where: { userId: user.id },
      include: {
        membershipLevel: true,
      },
    });

    // 获取所有会员等级
    const membershipLevels = await prisma.membershipLevel.findMany({
      orderBy: { price: 'asc' },
    });

    // 如果用户没有会员信息，返回普通会员
    if (!userMembership) {
      const defaultLevel = membershipLevels.find(level => level.price === 0) || membershipLevels[0];
      return {
        userMembership: {
          userId: user.id,
          membershipLevelId: defaultLevel.id,
          membershipLevel: defaultLevel,
          startDate: new Date(),
          expiresAt: null,
          isActive: true,
        },
        membershipLevels,
      };
    }

    // 检查会员是否过期
    if (userMembership.expiresAt && userMembership.expiresAt < new Date()) {
      // 会员已过期，更新状态
      await prisma.userMembership.update({
        where: { userId: user.id },
        data: { isActive: false },
      });
      userMembership.isActive = false;
    }

    return { userMembership, membershipLevels };
  } catch (error) {
    console.error('获取会员信息失败:', error);
    return { error: '获取会员信息失败，请稍后再试' };
  }
} 