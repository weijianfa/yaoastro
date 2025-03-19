export interface MembershipLevel {
  id: string;
  name: string;
  price: number;
  description: string | null;
  features: string[];
  durationDays: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface UserMembership {
  id: string;
  userId: string;
  membershipLevelId: string;
  startDate: Date;
  expiresAt: Date | null;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
  membershipLevel?: MembershipLevel;
}

export interface PurchaseMembershipData {
  membershipLevelId: string;
  paymentMethod: 'ALIPAY' | 'WECHAT' | 'CREDIT_CARD';
}

export interface MembershipResponse {
  id: string;
  name: string;
  price: number;
  description: string | null;
  features: string[];
  durationDays: number;
  isActive?: boolean;
  expiresAt?: string | null;
} 