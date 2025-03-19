import { prisma } from '@/lib/db';
import { OrderListParams } from '@/types/order';

/**
 * 创建订单
 * @param data 订单数据
 * @returns 创建的订单
 */
export async function createOrder(data: {
  userId: string;
  serviceTypeId?: string | null;
  amount: number;
  paymentMethod: 'ALIPAY' | 'WECHAT' | 'CREDIT_CARD';
  status?: 'PENDING' | 'PROCESSING' | 'COMPLETED' | 'CANCELLED';
  paymentStatus?: 'PENDING' | 'PAID' | 'FAILED' | 'REFUNDED';
  orderType?: 'SERVICE' | 'MEMBERSHIP';
  completedAt?: Date | null;
  paymentId?: string | null;
}) {
  return prisma.order.create({
    data: {
      userId: data.userId,
      serviceTypeId: data.serviceTypeId,
      amount: data.amount,
      paymentMethod: data.paymentMethod,
      status: data.status || 'PENDING',
      paymentStatus: data.paymentStatus || 'PENDING',
      orderType: data.orderType || 'SERVICE',
      completedAt: data.completedAt,
      paymentId: data.paymentId,
    },
  });
}

/**
 * 获取用户订单列表
 * @param userId 用户ID
 * @param params 分页参数
 * @returns 订单列表和总数
 */
export async function getUserOrders(userId: string, params?: OrderListParams) {
  const { page = 1, limit = 10, status } = params || {};
  const skip = (page - 1) * limit;

  const where = {
    userId,
    ...(status ? { status } : {}),
  };

  const [orders, total] = await Promise.all([
    prisma.order.findMany({
      where,
      skip,
      take: limit,
      orderBy: {
        createdAt: 'desc',
      },
      include: {
        serviceType: true,
      },
    }),
    prisma.order.count({ where }),
  ]);

  return {
    orders,
    total,
    page,
    limit,
    totalPages: Math.ceil(total / limit),
  };
}

/**
 * 获取订单详情
 * @param orderId 订单ID
 * @returns 订单详情
 */
export async function getOrderById(orderId: string) {
  return prisma.order.findUnique({
    where: { id: orderId },
    include: {
      serviceType: true,
      analyses: true,
    },
  });
}

/**
 * 更新订单状态
 * @param orderId 订单ID
 * @param status 订单状态
 * @returns 更新后的订单
 */
export async function updateOrderStatus(
  orderId: string,
  status: 'PENDING' | 'PROCESSING' | 'COMPLETED' | 'CANCELLED'
) {
  return prisma.order.update({
    where: { id: orderId },
    data: { status },
  });
}

/**
 * 更新订单支付状态
 * @param orderId 订单ID
 * @param paymentStatus 支付状态
 * @param paymentId 支付ID
 * @returns 更新后的订单
 */
export async function updateOrderPaymentStatus(
  orderId: string,
  paymentStatus: 'PENDING' | 'PAID' | 'FAILED' | 'REFUNDED',
  paymentId?: string
) {
  return prisma.order.update({
    where: { id: orderId },
    data: {
      paymentStatus,
      ...(paymentId ? { paymentId } : {}),
      ...(paymentStatus === 'PAID' ? { status: 'COMPLETED', completedAt: new Date() } : {}),
    },
  });
}

/**
 * 取消订单
 * @param orderId 订单ID
 * @returns 取消后的订单
 */
export async function cancelOrder(orderId: string) {
  return prisma.order.update({
    where: { id: orderId },
    data: {
      status: 'CANCELLED',
    },
  });
} 