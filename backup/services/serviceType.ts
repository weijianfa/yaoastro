import { prisma } from '@/lib/db/prisma';
import { ServiceType } from '@/types/serviceType';

/**
 * 获取所有服务类型
 * @param includeDisabled 是否包含禁用的服务类型
 * @returns 服务类型列表
 */
export async function getServiceTypes(includeDisabled = false) {
  return prisma.serviceType.findMany({
    where: includeDisabled ? {} : { imageUrl: { not: null } }, // 使用imageUrl作为isActive的替代
    orderBy: {
      price: 'asc', // 使用price作为order的替代
    },
  });
}

/**
 * 根据ID获取服务类型
 * @param id 服务类型ID
 * @returns 服务类型
 */
export async function getServiceTypeById(id: string) {
  return prisma.serviceType.findUnique({
    where: { id },
  });
}

/**
 * 根据类型获取服务类型
 * @param type 服务类型
 * @returns 服务类型
 */
export async function getServiceTypeByType(type: string) {
  return prisma.serviceType.findFirst({
    where: { 
      name: type, // 使用name作为type的替代
      imageUrl: { not: null } // 使用imageUrl作为isActive的替代
    },
  });
}

/**
 * 创建服务类型
 * @param data 服务类型数据
 * @returns 创建的服务类型
 */
export async function createServiceType(data: {
  name: string;
  type?: string;
  description: string;
  price: number;
  discountPrice?: number | null;
  isActive?: boolean;
  order?: number;
  icon?: string;
  features?: string[];
}) {
  return prisma.serviceType.create({
    data: {
      name: data.name,
      description: data.description || '',
      price: data.price,
      imageUrl: data.icon || data.isActive ? 'active.png' : null, // 使用imageUrl存储icon和isActive信息
    },
  });
}

/**
 * 更新服务类型
 * @param id 服务类型ID
 * @param data 更新数据
 * @returns 更新后的服务类型
 */
export async function updateServiceType(
  id: string,
  data: Partial<Omit<ServiceType, 'id' | 'createdAt' | 'updatedAt'>>
) {
  const updateData: any = {};
  
  if (data.name) updateData.name = data.name;
  if (data.description) updateData.description = data.description;
  if (data.price) updateData.price = data.price;
  if (data.icon || data.isActive !== undefined) {
    updateData.imageUrl = data.icon || (data.isActive ? 'active.png' : null);
  }
  
  return prisma.serviceType.update({
    where: { id },
    data: updateData,
  });
}

/**
 * 启用/禁用服务类型
 * @param id 服务类型ID
 * @param isActive 是否启用
 * @returns 更新后的服务类型
 */
export async function toggleServiceTypeStatus(id: string, isActive: boolean) {
  return prisma.serviceType.update({
    where: { id },
    data: { 
      imageUrl: isActive ? 'active.png' : null // 使用imageUrl作为isActive的替代
    },
  });
}

/**
 * 删除服务类型
 * @param id 服务类型ID
 * @returns 删除结果
 */
export async function deleteServiceType(id: string) {
  return prisma.serviceType.delete({
    where: { id },
  });
}

// 获取所有服务类型
export async function getAllServiceTypes() {
  try {
    return await prisma.serviceType.findMany({
      orderBy: {
        name: 'asc',
      },
    });
  } catch (error) {
    console.error('获取所有服务类型失败:', error);
    throw error;
  }
} 