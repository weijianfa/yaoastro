'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { 
  User, Edit, ArrowLeft, CreditCard, Calendar, AtSign, 
  Phone, Clock, Shield, Tag, MapPin, Activity, Hexagon
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
}

// 状态颜色映射
const statusColorMap: Record<UserStatus, { bg: string; text: string }> = {
  '活跃': { bg: 'bg-green-100', text: 'text-green-800' },
  '禁用': { bg: 'bg-red-100', text: 'text-red-800' },
  '未验证': { bg: 'bg-yellow-100', text: 'text-yellow-800' }
};

// 角色颜色映射
const roleColorMap: Record<UserRole, { bg: string; text: string }> = {
  '管理员': { bg: 'bg-purple-100', text: 'text-purple-800' },
  '会员': { bg: 'bg-blue-100', text: 'text-blue-800' },
  '普通用户': { bg: 'bg-gray-100', text: 'text-gray-800' }
};

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

// 模拟用户最近订单数据
const mockRecentOrders = [
  { id: 'ORD-0012', service: '八字分析', amount: 199, date: '2023-03-15T12:30:00Z', status: '已完成' },
  { id: 'ORD-0008', service: '塔罗牌占卜', amount: 99, date: '2023-03-01T15:45:00Z', status: '已完成' },
  { id: 'ORD-0005', service: '面相分析进阶版', amount: 299, date: '2023-02-20T09:15:00Z', status: '已完成' }
];

// 模拟用户登录历史数据
const mockLoginHistory = [
  { date: '2023-03-18T14:25:00Z', ip: '202.96.134.133', device: 'iPhone 14 Pro - iOS 16.0', location: '北京' },
  { date: '2023-03-16T08:12:00Z', ip: '202.96.134.133', device: 'Chrome 111 - Windows 11', location: '北京' },
  { date: '2023-03-12T20:05:00Z', ip: '202.96.135.140', device: 'Safari - macOS', location: '北京' },
  { date: '2023-03-05T16:32:00Z', ip: '220.248.136.55', device: 'Chrome 110 - Windows 11', location: '上海' }
];

export default function UserDetailPage() {
  const params = useParams();
  const userId = params.id as string;
  
  const [user, setUser] = useState<UserData | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'概览' | '订单' | '登录历史'>('概览');

  // 模拟从API获取用户数据
  useEffect(() => {
    // 模拟API调用延迟
    const timer = setTimeout(() => {
      // 尝试从模拟数据中获取用户
      const foundUser = mockUserDetails[userId] || null;
      setUser(foundUser);
      setLoading(false);
    }, 500);

    return () => clearTimeout(timer);
  }, [userId]);

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
            <User className="w-16 h-16 text-gray-300 mb-4" />
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
            href="/admin/users" 
            className="flex items-center text-gray-500 hover:text-indigo-600"
          >
            <ArrowLeft className="w-4 h-4 mr-1" />
            返回用户列表
          </Link>
        </div>
        
        <div className="flex gap-2">
          <Link 
            href={`/admin/users/${user.id}/edit`}
            className="flex items-center px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
          >
            <Edit className="w-4 h-4 mr-2" />
            编辑用户
          </Link>
        </div>
      </div>
      
      {/* 用户信息卡片 */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* 用户基本信息 */}
        <Card className="lg:col-span-1">
          <CardHeader className="pb-0">
            <CardTitle>用户信息</CardTitle>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="flex flex-col items-center mb-6">
              <div className="w-24 h-24 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden mb-4">
                {user.avatar ? (
                  <img src={user.avatar} alt={user.name} className="w-full h-full object-cover" />
                ) : (
                  <User className="w-12 h-12 text-gray-400" />
                )}
              </div>
              <h2 className="text-xl font-bold">{user.name}</h2>
              <div className="flex mt-2 space-x-2">
                <span className={`px-2 py-1 rounded-full text-xs ${roleColorMap[user.role].bg} ${roleColorMap[user.role].text}`}>
                  {user.role}
                </span>
                <span className={`px-2 py-1 rounded-full text-xs ${statusColorMap[user.status].bg} ${statusColorMap[user.status].text}`}>
                  {user.status}
                </span>
              </div>
              {user.membershipLevel && (
                <span className="mt-2 px-3 py-1 bg-indigo-50 text-indigo-600 rounded-full text-xs">
                  {user.membershipLevel}
                </span>
              )}
            </div>
            
            <div className="space-y-4">
              <div className="flex items-start">
                <AtSign className="w-5 h-5 text-gray-400 mr-3 mt-0.5" />
                <div>
                  <div className="text-sm text-gray-500">邮箱</div>
                  <div>{user.email}</div>
                </div>
              </div>
              
              {user.phone && (
                <div className="flex items-start">
                  <Phone className="w-5 h-5 text-gray-400 mr-3 mt-0.5" />
                  <div>
                    <div className="text-sm text-gray-500">电话</div>
                    <div>{user.phone}</div>
                  </div>
                </div>
              )}
              
              {(user.address || user.city || user.country) && (
                <div className="flex items-start">
                  <MapPin className="w-5 h-5 text-gray-400 mr-3 mt-0.5" />
                  <div>
                    <div className="text-sm text-gray-500">地址</div>
                    <div>
                      {user.address && <span>{user.address}, </span>}
                      {user.city && <span>{user.city}, </span>}
                      {user.country && <span>{user.country}</span>}
                    </div>
                  </div>
                </div>
              )}
              
              <div className="flex items-start">
                <Calendar className="w-5 h-5 text-gray-400 mr-3 mt-0.5" />
                <div>
                  <div className="text-sm text-gray-500">注册日期</div>
                  <div>{formatDate(user.createdAt)}</div>
                </div>
              </div>
              
              {user.lastLogin && (
                <div className="flex items-start">
                  <Clock className="w-5 h-5 text-gray-400 mr-3 mt-0.5" />
                  <div>
                    <div className="text-sm text-gray-500">最后登录</div>
                    <div>{formatDate(user.lastLogin)}</div>
                  </div>
                </div>
              )}
              
              {user.lastIp && (
                <div className="flex items-start">
                  <Activity className="w-5 h-5 text-gray-400 mr-3 mt-0.5" />
                  <div>
                    <div className="text-sm text-gray-500">最后IP</div>
                    <div>{user.lastIp}</div>
                  </div>
                </div>
              )}
            </div>
          </CardContent>
          {user.notes && (
            <CardFooter className="border-t pt-6">
              <div className="w-full">
                <div className="text-sm text-gray-500 mb-2">备注</div>
                <p className="text-gray-700">{user.notes}</p>
              </div>
            </CardFooter>
          )}
        </Card>
        
        {/* 详细内容区域 */}
        <Card className="lg:col-span-2">
          <CardHeader className="pb-2">
            <div className="flex border-b">
              <button 
                className={`px-4 py-2 font-medium ${activeTab === '概览' ? 'text-indigo-600 border-b-2 border-indigo-600' : 'text-gray-500 hover:text-gray-700'}`}
                onClick={() => setActiveTab('概览')}
              >
                概览
              </button>
              <button 
                className={`px-4 py-2 font-medium ${activeTab === '订单' ? 'text-indigo-600 border-b-2 border-indigo-600' : 'text-gray-500 hover:text-gray-700'}`}
                onClick={() => setActiveTab('订单')}
              >
                订单记录
              </button>
              <button 
                className={`px-4 py-2 font-medium ${activeTab === '登录历史' ? 'text-indigo-600 border-b-2 border-indigo-600' : 'text-gray-500 hover:text-gray-700'}`}
                onClick={() => setActiveTab('登录历史')}
              >
                登录历史
              </button>
            </div>
          </CardHeader>
          
          <CardContent className="pt-6">
            {/* 概览选项卡 */}
            {activeTab === '概览' && (
              <div className="space-y-6">
                {/* 统计卡片 */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="bg-white p-4 rounded-lg border shadow-sm">
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="text-sm text-gray-500">总订单数</p>
                        <p className="text-2xl font-bold">{user.totalOrders || 0}</p>
                      </div>
                      <div className="p-2 bg-indigo-50 rounded-lg">
                        <Hexagon className="w-6 h-6 text-indigo-500" />
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-white p-4 rounded-lg border shadow-sm">
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="text-sm text-gray-500">消费金额</p>
                        <p className="text-2xl font-bold">¥{user.totalSpent?.toLocaleString() || 0}</p>
                      </div>
                      <div className="p-2 bg-green-50 rounded-lg">
                        <CreditCard className="w-6 h-6 text-green-500" />
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-white p-4 rounded-lg border shadow-sm">
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="text-sm text-gray-500">登录次数</p>
                        <p className="text-2xl font-bold">{user.loginCount || 0}</p>
                      </div>
                      <div className="p-2 bg-blue-50 rounded-lg">
                        <Shield className="w-6 h-6 text-blue-500" />
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* 最近订单 */}
                {user.totalOrders && user.totalOrders > 0 && (
                  <div>
                    <h3 className="text-lg font-medium mb-4">最近订单</h3>
                    <div className="overflow-x-auto">
                      <table className="w-full text-sm">
                        <thead>
                          <tr className="border-b">
                            <th className="text-left py-2 font-medium">订单编号</th>
                            <th className="text-left py-2 font-medium">服务</th>
                            <th className="text-left py-2 font-medium">金额</th>
                            <th className="text-left py-2 font-medium">日期</th>
                            <th className="text-left py-2 font-medium">状态</th>
                          </tr>
                        </thead>
                        <tbody>
                          {mockRecentOrders.map((order) => (
                            <tr key={order.id} className="border-b hover:bg-gray-50">
                              <td className="py-2">{order.id}</td>
                              <td className="py-2">{order.service}</td>
                              <td className="py-2">¥{order.amount}</td>
                              <td className="py-2">{formatDate(order.date)}</td>
                              <td className="py-2">
                                <span className="px-2 py-1 rounded-full text-xs bg-green-100 text-green-800">
                                  {order.status}
                                </span>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}
                
                {/* 喜爱的服务 */}
                {user.favoriteServices && user.favoriteServices.length > 0 && (
                  <div>
                    <h3 className="text-lg font-medium mb-4">喜爱的服务</h3>
                    <div className="flex flex-wrap gap-2">
                      {user.favoriteServices.map((service, index) => (
                        <span 
                          key={index} 
                          className="px-3 py-1 bg-indigo-50 text-indigo-700 rounded-full text-sm flex items-center"
                        >
                          <Tag className="w-3 h-3 mr-1" />
                          {service}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}
            
            {/* 订单选项卡 */}
            {activeTab === '订单' && (
              <div>
                {user.totalOrders && user.totalOrders > 0 ? (
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b">
                          <th className="text-left py-2 font-medium">订单编号</th>
                          <th className="text-left py-2 font-medium">服务</th>
                          <th className="text-left py-2 font-medium">金额</th>
                          <th className="text-left py-2 font-medium">日期</th>
                          <th className="text-left py-2 font-medium">状态</th>
                          <th className="text-left py-2 font-medium">操作</th>
                        </tr>
                      </thead>
                      <tbody>
                        {mockRecentOrders.map((order) => (
                          <tr key={order.id} className="border-b hover:bg-gray-50">
                            <td className="py-2">{order.id}</td>
                            <td className="py-2">{order.service}</td>
                            <td className="py-2">¥{order.amount}</td>
                            <td className="py-2">{formatDate(order.date)}</td>
                            <td className="py-2">
                              <span className="px-2 py-1 rounded-full text-xs bg-green-100 text-green-800">
                                {order.status}
                              </span>
                            </td>
                            <td className="py-2">
                              <Link 
                                href={`/admin/orders/${order.id}`}
                                className="text-indigo-600 hover:text-indigo-800"
                              >
                                查看详情
                              </Link>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                ) : (
                  <div className="text-center py-8 text-gray-500">
                    该用户尚未有任何订单
                  </div>
                )}
              </div>
            )}
            
            {/* 登录历史选项卡 */}
            {activeTab === '登录历史' && (
              <div>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left py-2 font-medium">时间</th>
                        <th className="text-left py-2 font-medium">IP地址</th>
                        <th className="text-left py-2 font-medium">设备</th>
                        <th className="text-left py-2 font-medium">位置</th>
                      </tr>
                    </thead>
                    <tbody>
                      {mockLoginHistory.map((login, index) => (
                        <tr key={index} className="border-b hover:bg-gray-50">
                          <td className="py-2">{formatDate(login.date, { hour: '2-digit', minute: '2-digit' })}</td>
                          <td className="py-2">{login.ip}</td>
                          <td className="py-2">{login.device}</td>
                          <td className="py-2">{login.location}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
} 