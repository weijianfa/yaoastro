'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { 
  User, 
  ArrowLeft, 
  Save, 
  Loader2
} from 'lucide-react';
import { getRandomId } from '@/lib/utils';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';

// 用户类型定义
type UserRole = '管理员' | '会员' | '普通用户';
type UserStatus = '活跃' | '禁用' | '未验证';

interface NewUserData {
  name: string;
  email: string;
  phone?: string;
  password: string;
  confirmPassword: string;
  role: UserRole;
  status: UserStatus;
  membershipLevel?: string;
  address?: string;
  city?: string;
  country?: string;
  notes?: string;
}

export default function NewUserPage() {
  const router = useRouter();
  
  const [saving, setSaving] = useState(false);
  const [formData, setFormData] = useState<NewUserData>({
    name: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    role: '普通用户',
    status: '活跃',
    membershipLevel: '',
    address: '',
    city: '',
    country: '',
    notes: ''
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  // 处理表单输入变化
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // 清除对应字段的错误
    if (errors[name]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  // 验证表单
  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.name?.trim()) {
      newErrors.name = '用户名不能为空';
    }
    
    if (!formData.email?.trim()) {
      newErrors.email = '邮箱不能为空';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = '邮箱格式不正确';
    }
    
    if (formData.phone && !/^1[3-9]\d{9}$/.test(formData.phone)) {
      newErrors.phone = '手机号格式不正确';
    }
    
    if (!formData.password) {
      newErrors.password = '密码不能为空';
    } else if (formData.password.length < 6) {
      newErrors.password = '密码长度不能少于6位';
    }
    
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = '请确认密码';
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = '两次输入的密码不一致';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // 处理表单提交
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setSaving(true);
    
    try {
      // 模拟API保存延迟
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // 生成一个随机的用户ID
      const userId = `USER-${getRandomId(3).toUpperCase()}`;
      
      // 准备要保存的用户数据
      const userData = {
        id: userId,
        name: formData.name,
        email: formData.email,
        phone: formData.phone || undefined,
        role: formData.role,
        status: formData.status,
        createdAt: new Date().toISOString(),
        membershipLevel: formData.role === '会员' ? formData.membershipLevel : undefined,
        address: formData.address || undefined,
        city: formData.city || undefined,
        country: formData.country || undefined,
        notes: formData.notes || undefined
      };
      
      // 模拟保存成功
      console.log('保存的新用户数据:', userData);
      
      // 保存成功后跳转到用户列表页
      router.push('/admin/users');
    } catch (error) {
      console.error('保存失败:', error);
      // 在实际应用中应该显示错误消息
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* 头部导航 */}
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <Link 
            href="/admin/users" 
            className="flex items-center text-gray-500 hover:text-indigo-600"
          >
            <ArrowLeft className="w-4 h-4 mr-1" />
            返回用户列表
          </Link>
        </div>
        
        <h1 className="text-2xl font-bold">新增用户</h1>
      </div>
      
      {/* 编辑表单 */}
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* 基本信息卡片 */}
          <Card>
            <CardHeader>
              <CardTitle>基本信息</CardTitle>
              <CardDescription>
                输入新用户的基本个人信息
              </CardDescription>
            </CardHeader>
            
            <CardContent className="space-y-4">
              {/* 用户名 */}
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                  用户名 <span className="text-red-500">*</span>
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  value={formData.name}
                  onChange={handleInputChange}
                  className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
                    errors.name ? 'border-red-500' : 'border-gray-300'
                  }`}
                />
                {errors.name && (
                  <p className="mt-1 text-xs text-red-500">{errors.name}</p>
                )}
              </div>
              
              {/* 邮箱 */}
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                  邮箱 <span className="text-red-500">*</span>
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
                    errors.email ? 'border-red-500' : 'border-gray-300'
                  }`}
                />
                {errors.email && (
                  <p className="mt-1 text-xs text-red-500">{errors.email}</p>
                )}
              </div>
              
              {/* 手机 */}
              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                  手机号
                </label>
                <input
                  id="phone"
                  name="phone"
                  type="text"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
                    errors.phone ? 'border-red-500' : 'border-gray-300'
                  }`}
                />
                {errors.phone && (
                  <p className="mt-1 text-xs text-red-500">{errors.phone}</p>
                )}
              </div>
              
              {/* 密码 */}
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                  密码 <span className="text-red-500">*</span>
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
                    errors.password ? 'border-red-500' : 'border-gray-300'
                  }`}
                />
                {errors.password && (
                  <p className="mt-1 text-xs text-red-500">{errors.password}</p>
                )}
              </div>
              
              {/* 确认密码 */}
              <div>
                <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1">
                  确认密码 <span className="text-red-500">*</span>
                </label>
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
                    errors.confirmPassword ? 'border-red-500' : 'border-gray-300'
                  }`}
                />
                {errors.confirmPassword && (
                  <p className="mt-1 text-xs text-red-500">{errors.confirmPassword}</p>
                )}
              </div>
              
              {/* 角色 */}
              <div>
                <label htmlFor="role" className="block text-sm font-medium text-gray-700 mb-1">
                  角色 <span className="text-red-500">*</span>
                </label>
                <select
                  id="role"
                  name="role"
                  value={formData.role}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                >
                  <option value="管理员">管理员</option>
                  <option value="会员">会员</option>
                  <option value="普通用户">普通用户</option>
                </select>
              </div>
              
              {/* 会员等级 */}
              {formData.role === '会员' && (
                <div>
                  <label htmlFor="membershipLevel" className="block text-sm font-medium text-gray-700 mb-1">
                    会员等级
                  </label>
                  <select
                    id="membershipLevel"
                    name="membershipLevel"
                    value={formData.membershipLevel}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  >
                    <option value="">无会员等级</option>
                    <option value="普通会员">普通会员</option>
                    <option value="黄金会员">黄金会员</option>
                    <option value="白金会员">白金会员</option>
                    <option value="钻石会员">钻石会员</option>
                  </select>
                </div>
              )}
              
              {/* 状态 */}
              <div>
                <label htmlFor="status" className="block text-sm font-medium text-gray-700 mb-1">
                  状态 <span className="text-red-500">*</span>
                </label>
                <select
                  id="status"
                  name="status"
                  value={formData.status}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                >
                  <option value="活跃">活跃</option>
                  <option value="禁用">禁用</option>
                  <option value="未验证">未验证</option>
                </select>
              </div>
            </CardContent>
          </Card>
          
          {/* 联系信息卡片 */}
          <Card>
            <CardHeader>
              <CardTitle>联系信息</CardTitle>
              <CardDescription>
                输入新用户的联系方式和地址信息
              </CardDescription>
            </CardHeader>
            
            <CardContent className="space-y-4">
              {/* 地址 */}
              <div>
                <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-1">
                  详细地址
                </label>
                <input
                  id="address"
                  name="address"
                  type="text"
                  value={formData.address}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>
              
              {/* 城市 */}
              <div>
                <label htmlFor="city" className="block text-sm font-medium text-gray-700 mb-1">
                  城市
                </label>
                <input
                  id="city"
                  name="city"
                  type="text"
                  value={formData.city}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>
              
              {/* 国家 */}
              <div>
                <label htmlFor="country" className="block text-sm font-medium text-gray-700 mb-1">
                  国家
                </label>
                <input
                  id="country"
                  name="country"
                  type="text"
                  value={formData.country}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>
              
              {/* 备注 */}
              <div className="pt-4">
                <label htmlFor="notes" className="block text-sm font-medium text-gray-700 mb-1">
                  备注
                </label>
                <textarea
                  id="notes"
                  name="notes"
                  value={formData.notes}
                  onChange={handleInputChange}
                  rows={4}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  placeholder="添加关于此用户的备注..."
                />
              </div>
              
              {/* 用户头像上传 */}
              <div className="pt-4 border-t border-gray-200">
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  用户头像
                </label>
                <div className="flex items-center space-x-4">
                  <div className="w-16 h-16 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden">
                    <User className="w-8 h-8 text-gray-400" />
                  </div>
                  <button
                    type="button"
                    className="px-4 py-2 bg-gray-100 rounded-md text-gray-700 hover:bg-gray-200"
                  >
                    上传头像
                  </button>
                </div>
                <p className="mt-2 text-xs text-gray-500">
                  建议上传正方形图片，支持 JPG、PNG 格式，大小不超过 2MB
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
        
        {/* 操作按钮 */}
        <div className="mt-6 flex justify-end gap-3">
          <Link
            href="/admin/users"
            className="px-4 py-2 bg-gray-100 rounded-md text-gray-700 hover:bg-gray-200"
          >
            取消
          </Link>
          
          <button
            type="submit"
            disabled={saving}
            className="flex items-center px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {saving ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                创建中...
              </>
            ) : (
              <>
                <Save className="w-4 h-4 mr-2" />
                创建用户
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
} 