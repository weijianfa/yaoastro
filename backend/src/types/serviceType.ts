/**
 * 服务类型接口
 */
export interface ServiceType {
  id: string;
  name: string;
  type: string;
  description: string;
  price: number;
  discountPrice: number | null;
  isActive: boolean;
  order: number;
  icon: string;
  features: string[];
  createdAt: Date;
  updatedAt: Date;
}

/**
 * 创建服务类型的输入数据
 */
export interface ServiceTypeCreateInput {
  name: string;
  type: string;
  description: string;
  price: number;
  discountPrice?: number | null;
  isActive?: boolean;
  order?: number;
  icon?: string;
  features?: string[];
}

/**
 * 更新服务类型的输入数据
 */
export type ServiceTypeUpdateInput = Partial<Omit<ServiceType, 'id' | 'createdAt' | 'updatedAt'>>;

/**
 * 服务类型列表参数
 */
export interface ServiceTypeListParams {
  includeDisabled?: boolean;
}

/**
 * 服务类型查询结果
 */
export interface ServiceTypeQueryResult {
  serviceTypes: ServiceType[];
  total: number;
} 