import { prisma } from '@/lib/db';
import { Membership, MembershipPlan } from '@/types/membership';

/**
 * 获取所有会员计划
 * @returns 会员计划列表
 */
export async function getMembershipPlans() {
  return prisma.membershipPlan.findMany({
    orderBy: {
      price: 'asc',
    },
  });
}

/**
 * 根据ID获取会员计划
 * @param planId 计划ID
 * @returns 会员计划
 */
export async function getMembershipPlanById(planId: string) {
  return prisma.membershipPlan.findUnique({
    where: { id: planId },
  });
}

/**
 * 创建会员记录
 * @param data 会员数据
 * @returns 创建的会员记录
 */
export async function createMembership(data: {
  userId: string;
  planId: string;
  startDate: Date;
  endDate: Date;
  orderId?: string;
  status?: 'ACTIVE' | 'EXPIRED' | 'CANCELLED';
}): Promise<Membership> {
  return prisma.membership.create({
    data: {
      userId: data.userId,
      planId: data.planId,
      startDate: data.startDate,
      endDate: data.endDate,
      orderId: data.orderId,
      status: data.status || 'ACTIVE',
    },
    include: {
      plan: true,
    },
  });
}

/**
 * 获取用户会员信息
 * @param userId 用户ID
 * @returns 会员信息
 */
export async function getUserMembership(userId: string) {
  return prisma.membership.findFirst({
    where: {
      userId,
      status: 'ACTIVE',
      endDate: {
        gte: new Date(),
      },
    },
    include: {
      plan: true,
    },
    orderBy: {
      endDate: 'desc',
    },
  });
}

/**
 * 获取用户会员历史
 * @param userId 用户ID
 * @returns 会员历史记录
 */
export async function getUserMembershipHistory(userId: string) {
  return prisma.membership.findMany({
    where: {
      userId,
    },
    include: {
      plan: true,
      order: true,
    },
    orderBy: {
      createdAt: 'desc',
    },
  });
}

/**
 * 更新会员状态
 * @param membershipId 会员ID
 * @param status 状态
 * @returns 更新后的会员记录
 */
export async function updateMembershipStatus(
  membershipId: string,
  status: 'ACTIVE' | 'EXPIRED' | 'CANCELLED'
) {
  return prisma.membership.update({
    where: { id: membershipId },
    data: { status },
    include: {
      plan: true,
    },
  });
}

/**
 * 延长会员有效期
 * @param membershipId 会员ID
 * @param days 延长天数
 * @returns 更新后的会员记录
 */
export async function extendMembership(membershipId: string, days: number) {
  const membership = await prisma.membership.findUnique({
    where: { id: membershipId },
  });
  
  if (!membership) {
    throw new Error('会员记录不存在');
  }
  
  const newEndDate = new Date(membership.endDate);
  newEndDate.setDate(newEndDate.getDate() + days);
  
  return prisma.membership.update({
    where: { id: membershipId },
    data: {
      endDate: newEndDate,
      status: 'ACTIVE',
    },
    include: {
      plan: true,
    },
  });
}

/**
 * 检查并更新过期会员
 * @returns 更新的会员数量
 */
export async function checkAndUpdateExpiredMemberships() {
  const now = new Date();
  
  const expiredMemberships = await prisma.membership.updateMany({
    where: {
      status: 'ACTIVE',
      endDate: {
        lt: now,
      },
    },
    data: {
      status: 'EXPIRED',
    },
  });
  
  return expiredMemberships.count;
} 