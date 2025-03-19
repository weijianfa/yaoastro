'use server';

import { revalidatePath } from 'next/cache';
import { PrismaClient } from '@prisma/client';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { z } from 'zod';
import prisma from '@/lib/db/prisma';

const prismaClient = new PrismaClient();

// 创建订单的验证模式
const createOrderSchema = z.object({
  serviceTypeId: z.string().min(1, '服务类型不能为空'),
  paymentMethod: z.enum(['ALIPAY', 'WECHAT', 'CREDIT_CARD']),
});

// 获取用户订单列表
export async function getUserOrders(params?: {
  status?: string;
  type?: string;
  page?: number;
  limit?: number;
}) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session || !session.user) {
      return { error: '未登录' };
    }
    
    const page = params?.page || 1;
    const limit = params?.limit || 10;
    const skip = (page - 1) * limit;
    
    // 构建查询条件
    const where = {
      userId: session.user.id,
      ...(params?.status ? { status: params.status } : {}),
      ...(params?.type ? { orderType: params.type } : {}),
    };
    
    // 查询订单总数
    const totalOrders = await prismaClient.order.count({ where });
    
    // 计算总页数
    const totalPages = Math.ceil(totalOrders / limit);
    
    // 查询订单列表
    const orders = await prismaClient.order.findMany({
      where,
      include: {
        serviceType: true,
        analyses: {
          select: {
            id: true,
            type: true,
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
      skip,
      take: limit,
    });
    
    return {
      orders,
      totalOrders,
      totalPages,
    };
  } catch (error) {
    console.error('获取订单列表失败:', error);
    return { error: '获取订单列表失败' };
  }
}

// 获取订单详情
export async function getOrderDetail(orderId: string) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session || !session.user) {
      return { error: '未登录' };
    }
    
    const order = await prismaClient.order.findUnique({
      where: {
        id: orderId,
        userId: session.user.id,
      },
      include: {
        serviceType: true,
        analyses: {
          include: {
            user: {
              select: {
                id: true,
                name: true,
                email: true,
                image: true,
              },
            },
          },
        },
      },
    });
    
    if (!order) {
      return { error: '订单不存在' };
    }
    
    return { order };
  } catch (error) {
    console.error('获取订单详情失败:', error);
    return { error: '获取订单详情失败' };
  }
}

// 创建订单
export async function createOrder(data: {
  serviceTypeId: string;
  amount: number;
  paymentMethod: string;
}) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session || !session.user) {
      return { error: '未登录' };
    }
    
    const order = await prismaClient.order.create({
      data: {
        userId: session.user.id,
        serviceTypeId: data.serviceTypeId,
        amount: data.amount,
        paymentMethod: data.paymentMethod,
        status: 'PENDING',
        paymentStatus: 'PENDING',
        orderType: 'SERVICE',
      },
    });
    
    revalidatePath('/dashboard/orders');
    return { order };
  } catch (error) {
    console.error('创建订单失败:', error);
    return { error: '创建订单失败' };
  }
}

// 取消订单
export async function cancelOrder(orderId: string) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session || !session.user) {
      return { error: '未登录' };
    }
    
    const order = await prismaClient.order.findUnique({
      where: {
        id: orderId,
        userId: session.user.id,
      },
    });
    
    if (!order) {
      return { error: '订单不存在' };
    }
    
    if (order.status !== 'PENDING') {
      return { error: '只能取消待处理的订单' };
    }
    
    await prismaClient.order.update({
      where: { id: orderId },
      data: {
        status: 'CANCELLED',
      },
    });
    
    revalidatePath('/dashboard/orders');
    revalidatePath(`/dashboard/orders/${orderId}`);
    return { success: true };
  } catch (error) {
    console.error('取消订单失败:', error);
    return { error: '取消订单失败' };
  }
}

// 支付订单
export async function payOrder(orderId: string) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session || !session.user) {
      return { error: '未登录' };
    }
    
    const order = await prismaClient.order.findUnique({
      where: {
        id: orderId,
        userId: session.user.id,
      },
    });
    
    if (!order) {
      return { error: '订单不存在' };
    }
    
    if (order.paymentStatus !== 'PENDING') {
      return { error: '订单已支付或已取消' };
    }
    
    // 模拟支付过程
    await prismaClient.order.update({
      where: { id: orderId },
      data: {
        paymentStatus: 'PAID',
        status: 'PROCESSING',
        paymentId: `PAY_${Date.now()}`,
      },
    });
    
    revalidatePath('/dashboard/orders');
    revalidatePath(`/dashboard/orders/${orderId}`);
    return { success: true };
  } catch (error) {
    console.error('支付订单失败:', error);
    return { error: '支付订单失败' };
  }
} 