'use server';

import { revalidatePath } from 'next/cache';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import prisma from '@/lib/db/prisma';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { z } from 'zod';
import { hash, compare } from 'bcrypt';

// 更新用户资料的验证模式
const updateProfileSchema = z.object({
  name: z.string().min(2, '姓名至少需要2个字符').optional(),
  phone: z.string().regex(/^1[3-9]\d{9}$/, '请输入有效的手机号码').optional(),
  birthDate: z.string().optional(),
  gender: z.enum(['MALE', 'FEMALE', 'OTHER']).optional(),
  location: z.string().optional(),
  bio: z.string().max(200, '个人简介不能超过200个字符').optional(),
});

// 更新用户资料
export async function updateUserProfile(formData: any) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session || !session.user) {
      return { error: '未登录' };
    }
    
    // 更新用户名
    await prisma.user.update({
      where: { id: session.user.id },
      data: {
        name: formData.name,
      },
    });
    
    // 更新或创建用户资料
    await prisma.profile.upsert({
      where: { userId: session.user.id },
      update: {
        bio: formData.bio,
        phone: formData.phone,
        location: formData.location,
        birthDate: formData.birthDate ? new Date(formData.birthDate) : null,
        gender: formData.gender,
      },
      create: {
        userId: session.user.id,
        bio: formData.bio,
        phone: formData.phone,
        location: formData.location,
        birthDate: formData.birthDate ? new Date(formData.birthDate) : null,
        gender: formData.gender,
      },
    });
    
    revalidatePath('/dashboard/profile');
    return { success: true };
  } catch (error) {
    console.error('更新用户资料失败:', error);
    return { error: '更新用户资料失败' };
  }
}

// 更改密码的验证模式
const changePasswordSchema = z.object({
  currentPassword: z.string().min(6, '当前密码至少需要6个字符'),
  newPassword: z.string().min(6, '新密码至少需要6个字符'),
  confirmPassword: z.string().min(6, '确认密码至少需要6个字符'),
}).refine((data) => data.newPassword === data.confirmPassword, {
  message: '新密码和确认密码不匹配',
  path: ['confirmPassword'],
});

// 更改密码
export async function updateUserPassword({ currentPassword, newPassword }: { currentPassword: string; newPassword: string }) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session || !session.user) {
      return { error: '未登录' };
    }
    
    // 验证当前密码
    const user = await prisma.user.findUnique({
      where: { id: session.user.id },
      select: { hashedPassword: true },
    });
    
    if (!user) {
      return { error: '用户不存在' };
    }
    
    // 验证当前密码
    if (user.hashedPassword) {
      const isPasswordValid = await compare(currentPassword, user.hashedPassword);
      if (!isPasswordValid) {
        return { error: '当前密码不正确' };
      }
    }
    
    // 哈希新密码
    const hashedPassword = await hash(newPassword, 10);
    
    // 更新密码
    await prisma.user.update({
      where: { id: session.user.id },
      data: {
        hashedPassword,
      },
    });
    
    return { success: true };
  } catch (error) {
    console.error('更新密码失败:', error);
    return { error: '更新密码失败' };
  }
}

// 获取用户资料
export async function getUserProfile() {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session || !session.user) {
      return { error: '未登录' };
    }
    
    const user = await prisma.user.findUnique({
      where: { id: session.user.id },
      include: {
        profile: true,
      },
    });
    
    if (!user) {
      return { error: '用户不存在' };
    }
    
    return { user, profile: user.profile };
  } catch (error) {
    console.error('获取用户资料失败:', error);
    return { error: '获取用户资料失败' };
  }
}

// 获取用户设置
export async function getUserSettings() {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session || !session.user) {
      return { error: '未登录' };
    }
    
    const user = await prisma.user.findUnique({
      where: { id: session.user.id },
    });
    
    if (!user) {
      return { error: '用户不存在' };
    }
    
    // 模拟用户设置
    const settings = {
      language: 'zh-CN',
      timezone: 'Asia/Shanghai',
      dateFormat: 'YYYY-MM-DD',
      timeFormat: 'HH:mm',
      notifications: {
        emailNotifications: true,
        marketingEmails: false,
        serviceUpdates: true,
        securityAlerts: true,
        orderUpdates: true,
        promotions: false,
      },
      privacy: {
        profileVisibility: 'PUBLIC',
        dataCollection: true,
        activityTracking: true,
        twoFactorAuth: false,
      },
      appearance: {
        theme: 'SYSTEM',
        fontSize: 'MEDIUM',
        colorScheme: 'DEFAULT',
        reducedMotion: false,
      },
    };
    
    return { user, settings };
  } catch (error) {
    console.error('获取用户设置失败:', error);
    return { error: '获取用户设置失败' };
  }
}

// 更新通用设置
export async function updateGeneralSettings(formData: any) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session || !session.user) {
      return { error: '未登录' };
    }
    
    // 模拟更新用户设置
    console.log('更新通用设置:', formData);
    
    revalidatePath('/dashboard/settings');
    return { success: true };
  } catch (error) {
    console.error('更新通用设置失败:', error);
    return { error: '更新通用设置失败' };
  }
}

// 更新通知设置
export async function updateNotificationSettings(formData: any) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session || !session.user) {
      return { error: '未登录' };
    }
    
    // 模拟更新通知设置
    console.log('更新通知设置:', formData);
    
    revalidatePath('/dashboard/settings');
    return { success: true };
  } catch (error) {
    console.error('更新通知设置失败:', error);
    return { error: '更新通知设置失败' };
  }
}

// 更新隐私设置
export async function updatePrivacySettings(formData: any) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session || !session.user) {
      return { error: '未登录' };
    }
    
    // 模拟更新隐私设置
    console.log('更新隐私设置:', formData);
    
    revalidatePath('/dashboard/settings');
    return { success: true };
  } catch (error) {
    console.error('更新隐私设置失败:', error);
    return { error: '更新隐私设置失败' };
  }
}

// 更新外观设置
export async function updateAppearanceSettings(formData: any) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session || !session.user) {
      return { error: '未登录' };
    }
    
    // 模拟更新外观设置
    console.log('更新外观设置:', formData);
    
    revalidatePath('/dashboard/settings');
    return { success: true };
  } catch (error) {
    console.error('更新外观设置失败:', error);
    return { error: '更新外观设置失败' };
  }
} 