// 定义Prisma中的枚举类型
export enum Role {
  USER = 'USER',
  ADMIN = 'ADMIN'
}

export enum Gender {
  MALE = 'MALE',
  FEMALE = 'FEMALE',
  OTHER = 'OTHER'
}

export enum OrderStatus {
  PENDING = 'PENDING',
  PROCESSING = 'PROCESSING',
  COMPLETED = 'COMPLETED',
  CANCELLED = 'CANCELLED'
}

export enum PaymentStatus {
  PENDING = 'PENDING',
  PAID = 'PAID',
  FAILED = 'FAILED',
  REFUNDED = 'REFUNDED'
}

export enum PaymentMethod {
  ALIPAY = 'ALIPAY',
  WECHAT = 'WECHAT',
  CREDIT_CARD = 'CREDIT_CARD'
}

export enum OrderType {
  SERVICE = 'SERVICE',
  MEMBERSHIP = 'MEMBERSHIP'
}

export enum AnalysisType {
  BAZI = 'BAZI',
  TAROT = 'TAROT',
  FACE = 'FACE',
  PALM = 'PALM',
  DREAM = 'DREAM',
  NAME = 'NAME',
  PSYCHOLOGY = 'PSYCHOLOGY'
} 