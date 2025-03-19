import { prisma } from '@/lib/db/prisma';
import { User, UserProfile, UserUpdateData } from '@/types/user';
import { hashPassword } from '@/lib/auth';
import { Role } from '@/types/prisma';

/**
 * 根据ID获取用户
 * @param id 用户ID
 * @returns 用户信息
 */
export async function getUserById(id: string) {
  try {
    const user = await prisma.user.findUnique({
      where: { id },
      include: {
        profile: true,
        membership: {
          include: {
            membershipLevel: true,
          },
        },
      },
    });

    return user;
  } catch (error) {
    console.error('获取用户信息失败:', error);
    throw new Error('获取用户信息失败');
  }
}

/**
 * 根据邮箱获取用户
 * @param email 用户邮箱
 * @returns 用户信息
 */
export async function getUserByEmail(email: string) {
  try {
    const user = await prisma.user.findUnique({
      where: { email },
      include: {
        profile: true,
        membership: {
          include: {
            membershipLevel: true,
          },
        },
      },
    });

    return user;
  } catch (error) {
    console.error('获取用户信息失败:', error);
    throw new Error('获取用户信息失败');
  }
}

/**
 * 创建用户
 * @param data 用户数据
 * @returns 创建的用户
 */
export async function createUser(data: {
  email: string;
  password: string;
  name?: string;
  role?: 'USER' | 'ADMIN';
}) {
  const hashedPassword = await hashPassword(data.password);
  
  return prisma.user.create({
    data: {
      email: data.email,
      password: hashedPassword,
      name: data.name || data.email.split('@')[0],
      role: data.role || 'USER',
      profile: {
        create: {
          bio: '',
          birthDate: null,
          gender: null,
          phoneNumber: '',
          address: '',
          avatarUrl: '',
        },
      },
    },
    include: {
      profile: true,
    },
  });
}

/**
 * 更新用户信息
 * @param id 用户ID
 * @param data 更新数据
 * @returns 更新后的用户
 */
export async function updateUser(
  id: string,
  data: {
    name?: string;
    email?: string;
    image?: string;
    role?: Role;
  }
) {
  try {
    const user = await prisma.user.update({
      where: { id },
      data,
    });

    return user;
  } catch (error) {
    console.error('更新用户信息失败:', error);
    throw new Error('更新用户信息失败');
  }
}

/**
 * 更新用户资料
 * @param userId 用户ID
 * @param data 资料数据
 * @returns 更新后的用户资料
 */
export async function updateUserProfile(
  userId: string,
  data: {
    bio?: string;
    phone?: string;
    birthDate?: Date;
    gender?: string;
    location?: string;
  }
) {
  try {
    // 检查用户资料是否存在
    const existingProfile = await prisma.profile.findUnique({
      where: { userId },
    });

    if (existingProfile) {
      // 更新现有资料
      const profile = await prisma.profile.update({
        where: { userId },
        data,
      });
      return profile;
    } else {
      // 创建新资料
      const profile = await prisma.profile.create({
        data: {
          userId,
          ...data,
        },
      });
      return profile;
    }
  } catch (error) {
    console.error('更新用户资料失败:', error);
    throw new Error('更新用户资料失败');
  }
}

/**
 * 获取用户列表
 * @param page 页码
 * @param limit 每页数量
 * @returns 用户列表和总数
 */
export async function getAllUsers(page = 1, limit = 10) {
  try {
    const skip = (page - 1) * limit;
    
    const [users, total] = await Promise.all([
      prisma.user.findMany({
        skip,
        take: limit,
        orderBy: {
          createdAt: 'desc',
        },
        include: {
          profile: true,
          membership: {
            include: {
              membershipLevel: true,
            },
          },
        },
      }),
      prisma.user.count(),
    ]);

    return {
      users,
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    };
  } catch (error) {
    console.error('获取用户列表失败:', error);
    throw new Error('获取用户列表失败');
  }
}

/**
 * 删除用户
 * @param id 用户ID
 * @returns 删除结果
 */
export async function deleteUser(id: string) {
  try {
    await prisma.user.delete({
      where: { id },
    });

    return { success: true };
  } catch (error) {
    console.error('删除用户失败:', error);
    throw new Error('删除用户失败');
  }
}

/**
 * 获取用户统计数据
 * @returns 用户统计数据
 */
export async function getUserStats() {
  try {
    const totalUsers = await prisma.user.count();
    
    const usersByRole = await prisma.user.groupBy({
      by: ['role'],
      _count: {
        role: true,
      },
    });
    
    const recentUsers = await prisma.user.findMany({
      take: 5,
      orderBy: {
        createdAt: 'desc',
      },
      select: {
        id: true,
        name: true,
        email: true,
        image: true,
        createdAt: true,
      },
    });

    return {
      totalUsers,
      usersByRole,
      recentUsers,
    };
  } catch (error) {
    console.error('获取用户统计数据失败:', error);
    throw new Error('获取用户统计数据失败');
  }
} 