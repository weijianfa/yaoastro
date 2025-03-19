'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import { 
  User, 
  ArrowLeft, 
  Save, 
  Loader2,
  AlertTriangle
} from 'lucide-react';
import { formatDate } from '@/lib/utils';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle, 
  CardFooter 
} from '@/components/ui/card';

// 用户类型定义
type UserRole = '管理员' | '会员' | '普通用户';
type UserStatus = '活跃' | '禁用' | '未验证';

interface UserData {
  id: string;
  name: string;
  email: string;
  phone?: string;
  role: UserRole;
  status: UserStatus;
  createdAt: string;
  lastLogin?: string;
  avatar?: string;
  membershipLevel?: string;
  address?: string;
  city?: string;
  country?: string;
  totalOrders?: number;
  totalSpent?: number;
  notes?: string;
  favoriteServices?: string[];
  loginCount?: number;
  lastIp?: string;
  password?: string;
}

// 模拟用户详情数据
const mockUserDetails: Record<string, UserData> = {
  'USER-001': {
    id: 'USER-001',
    name: '张三',
    email: 'zhangsan@example.com',
    phone: '13812345678',
    role: '会员',
    status: '活跃',
    createdAt: '2023-01-15T08:30:00Z',
    lastLogin: '2023-03-18T14:25:00Z',
    membershipLevel: '钻石会员',
    address: '中关村南大街5号',
    city: '北京',
    country: '中国',
    totalOrders: 24,
    totalSpent: 9850,
    notes: '重要客户，经常购买高级服务',
    favoriteServices: ['八字命理', '塔罗牌占卜', '面相分析'],
    loginCount: 48,
    lastIp: '202.96.134.133'
  },
  'USER-002': {
    id: 'USER-002',
    name: '李四',
    email: 'lisi@example.com',
    phone: '13987654321',
    role: '普通用户',
    status: '活跃',
    createdAt: '2023-02-20T10:15:00Z',
    lastLogin: '2023-03-17T09:12:00Z',
    address: '天河路385号',
    city: '广州',
    country: '中国',
    totalOrders: 5,
    totalSpent: 450,
    favoriteServices: ['梦境解析'],
    loginCount: 12,
    lastIp: '113.68.142.33'
  },
  'USER-003': {
    id: 'USER-003',
    name: '王五',
    email: 'wangwu@example.com',
    role: '管理员',
    status: '活跃',
    createdAt: '2022-11-10T15:45:00Z',
    lastLogin: '2023-03-18T16:30:00Z',
    address: '软件园二期8栋',
    city: '深圳',
    country: '中国',
    loginCount: 156,
    lastIp: '119.129.114.55'
  }
};

export default function UserEditPage() {
  const params = useParams();
  const router = useRouter();
  const userId = params.id as string;
  
  const [user, setUser] = useState<UserData | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [formData, setFormData] = useState<Partial<UserData>>({});
  const [errors, setErrors] = useState<Record<string, string>>({});

  // 模拟从API获取用户数据
  useEffect(() => {
    // 模拟API调用延迟
    const timer = setTimeout(() => {
      // 尝试从模拟数据中获取用户
      const foundUser = mockUserDetails[userId] || null;
      setUser(foundUser);
      
      if (foundUser) {
        // 初始化表单数据
        setFormData({
          name: foundUser.name,
          email: foundUser.email,
          phone: foundUser.phone || '',
          role: foundUser.role,
          status: foundUser.status,
          membershipLevel: foundUser.membershipLevel || '',
          address: foundUser.address || '',
          city: foundUser.city || '',
          country: foundUser.country || '',
          notes: foundUser.notes || ''
        });
      }
      
      setLoading(false);
    }, 500);

    return () => clearTimeout(timer);
  }, [userId]);

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
      
      // 模拟保存成功
      console.log('保存的用户数据:', formData);
      
      // 保存成功后跳转到用户详情页
      router.push(`/admin/users/${userId}`);
    } catch (error) {
      console.error('保存失败:', error);
      // 在实际应用中应该显示错误消息
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="space-y-6">
        <div className="flex items-center">
          <Link 
            href="/admin/users" 
            className="flex items-center text-gray-500 hover:text-indigo-600"
          >
            <ArrowLeft className="w-4 h-4 mr-1" />
            返回用户列表
          </Link>
        </div>
        
        <Card>
          <CardContent className="flex flex-col items-center justify-center h-64">
            <AlertTriangle className="w-16 h-16 text-yellow-500 mb-4" />
            <h2 className="text-2xl font-bold text-gray-700">用户不存在</h2>
            <p className="text-gray-500 mt-2">无法找到ID为 {userId} 的用户</p>
            <Link 
              href="/admin/users" 
              className="mt-4 px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
            >
              返回用户列表
            </Link>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* 头部导航 */}
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <Link 
            href={`/admin/users/${userId}`}
            className="flex items-center text-gray-500 hover:text-indigo-600"
          >
            <ArrowLeft className="w-4 h-4 mr-1" />
            返回用户详情
          </Link>
        </div>
        
        <h1 className="text-2xl font-bold">编辑用户</h1>
      </div>
      
      {/* 编辑表单 */}
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* 基本信息卡片 */}
          <Card>
            <CardHeader>
              <CardTitle>基本信息</CardTitle>
              <CardDescription>
                编辑用户的基本个人信息
              </CardDescription>
            </CardHeader>
            
            <CardContent className="space-y-4">
              {/* 用户头像 */}
              <div className="flex flex-col items-center mb-6">
                <div className="w-24 h-24 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden mb-4">
                  {user.avatar ? (
                    <img src={user.avatar} alt={user.name} className="w-full h-full object-cover" />
                  ) : (
                    <User className="w-12 h-12 text-gray-400" />
                  )}
                </div>
                <button
                  type="button"
                  className="text-sm text-indigo-600 hover:text-indigo-800"
                >
                  更改头像
                </button>
              </div>
              
              {/* 用户ID */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  用户ID
                </label>
                <input
                  type="text"
                  value={user.id}
                  disabled
                  className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-100 text-gray-500"
                />
                <p className="mt-1 text-xs text-gray-500">
                  用户ID不可修改
                </p>
              </div>
              
              {/* 用户名 */}
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                  用户名 <span className="text-red-500">*</span>
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  value={formData.name || ''}
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
                  value={formData.email || ''}
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
                  value={formData.phone || ''}
                  onChange={handleInputChange}
                  className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
                    errors.phone ? 'border-red-500' : 'border-gray-300'
                  }`}
                />
                {errors.phone && (
                  <p className="mt-1 text-xs text-red-500">{errors.phone}</p>
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
                  value={formData.role || ''}
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
                    value={formData.membershipLevel || ''}
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
                  value={formData.status || ''}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                >
                  <option value="活跃">活跃</option>
                  <option value="禁用">禁用</option>
                  <option value="未验证">未验证</option>
                </select>
              </div>
              
              {/* 密码重置 */}
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                  密码
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  value={formData.password || ''}
                  onChange={handleInputChange}
                  placeholder="输入新密码以重置"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
                <p className="mt-1 text-xs text-gray-500">
                  留空表示不修改密码
                </p>
              </div>
            </CardContent>
          </Card>
          
          {/* 联系信息卡片 */}
          <Card>
            <CardHeader>
              <CardTitle>联系信息</CardTitle>
              <CardDescription>
                编辑用户的联系方式和地址信息
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
                  value={formData.address || ''}
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
                  value={formData.city || ''}
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
                  value={formData.country || ''}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>
              
              {/* 注册和登录信息 */}
              <div className="pt-4 border-t border-gray-200">
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    注册日期
                  </label>
                  <input
                    type="text"
                    value={formatDate(user.createdAt)}
                    disabled
                    className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-100 text-gray-500"
                  />
                </div>
                
                {user.lastLogin && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      最后登录
                    </label>
                    <input
                      type="text"
                      value={formatDate(user.lastLogin, { hour: '2-digit', minute: '2-digit' })}
                      disabled
                      className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-100 text-gray-500"
                    />
                  </div>
                )}
              </div>
              
              {/* 备注 */}
              <div className="pt-4">
                <label htmlFor="notes" className="block text-sm font-medium text-gray-700 mb-1">
                  备注
                </label>
                <textarea
                  id="notes"
                  name="notes"
                  value={formData.notes || ''}
                  onChange={handleInputChange}
                  rows={4}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  placeholder="添加关于此用户的备注..."
                />
              </div>
            </CardContent>
          </Card>
        </div>
        
        {/* 操作按钮 */}
        <div className="mt-6 flex justify-end gap-3">
          <Link
            href={`/admin/users/${userId}`}
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
                保存中...
              </>
            ) : (
              <>
                <Save className="w-4 h-4 mr-2" />
                保存修改
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
} 