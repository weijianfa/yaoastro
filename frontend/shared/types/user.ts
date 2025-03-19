import { User as PrismaUser, Profile as PrismaProfile } from '@prisma/client';

export type User = PrismaUser;
export type Profile = PrismaProfile;

export interface UserWithProfile extends User {
  profile?: Profile | null;
}

export interface SessionUser {
  id: string;
  name?: string | null;
  email: string;
  role: 'USER' | 'ADMIN';
  image?: string | null;
}

export interface UpdateProfileData {
  name?: string;
  phone?: string;
  birthDate?: string;
  gender?: 'MALE' | 'FEMALE' | 'OTHER';
  location?: string;
  bio?: string;
}

export interface ChangePasswordData {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
} 