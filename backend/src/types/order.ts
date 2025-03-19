import { Order as PrismaOrder } from '@prisma/client';

export type Order = PrismaOrder;

export interface OrderServiceType {
  id: string;
  name: string;
  description?: string | null;
  price: number;
  imageUrl?: string | null;
  createdAt: Date;
  updatedAt: Date;
}

export interface OrderWithServiceType extends Order {
  serviceType?: OrderServiceType | null;
}

export interface CreateOrderData {
  serviceTypeId?: string;
  amount: number;
  paymentMethod: 'ALIPAY' | 'WECHAT' | 'CREDIT_CARD';
}

export interface OrderListParams {
  page?: number;
  limit?: number;
  status?: 'PENDING' | 'PROCESSING' | 'COMPLETED' | 'CANCELLED';
}

export interface OrderResponse {
  id: string;
  status: 'PENDING' | 'PROCESSING' | 'COMPLETED' | 'CANCELLED';
  amount: number;
  paymentStatus: 'PENDING' | 'PAID' | 'FAILED' | 'REFUNDED';
  createdAt: string;
  serviceName?: string;
} 