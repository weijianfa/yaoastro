'use client';

import { useState } from 'react';
import Link from 'next/link';
import { 
  User, Search, Filter, MoreHorizontal, 
  UserPlus, Download, Trash2, Edit, Eye 
} from 'lucide-react';
import { formatDate } from '@/lib/utils';
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
}

// 模拟用户数据
const mockUsers: UserData[] = Array.from({ length: 50 }).map((_, index) => {
  const roles: UserRole[] = ['管理员', '会员', '普通用户'];
  const statuses: UserStatus[] = ['活跃', '禁用', '未验证'];
  const membershipLevels = [undefined, '普通会员', '黄金会员', '白金会员', '钻石会员'];

  const role = roles[Math.floor(Math.random() * roles.length)];
  const membershipLevel = role === '会员' 
    ? membershipLevels[Math.floor(Math.random() * (membershipLevels.length - 1)) + 1] 
    : undefined;

  return {
    id: `USER-${(index + 1).toString().padStart(3, '0')}`,
    name: ['张三', '李四', '王五', '赵六', '钱七', '孙八', '周九', '吴十'][Math.floor(Math.random() * 8)],
    email: `user${index + 1}@example.com`,
    phone: Math.random() > 0.3 ? `1${Math.floor(Math.random() * 9)}${Math.random().toString().slice(2, 11)}` : undefined,
    role,
    status: statuses[Math.floor(Math.random() * statuses.length)],
    createdAt: new Date(Date.now() - Math.floor(Math.random() * 31536000000)).toISOString(),
    lastLogin: Math.random() > 0.2 
      ? new Date(Date.now() - Math.floor(Math.random() * 2592000000)).toISOString() 
      : undefined,
    membershipLevel
  };
});

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

export default function UsersPage() {
  const [users, setUsers] = useState<UserData[]>(mockUsers);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedRole, setSelectedRole] = useState<UserRole | '全部'>('全部');
  const [selectedStatus, setSelectedStatus] = useState<UserStatus | '全部'>('全部');
  const [sortBy, setSortBy] = useState<keyof UserData | null>(null);
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');

  const usersPerPage = 10;

  // 处理搜索
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1);
  };

  // 处理排序
  const handleSort = (column: keyof UserData) => {
    if (sortBy === column) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(column);
      setSortDirection('asc');
    }
  };

  // 处理角色过滤
  const handleRoleFilter = (role: UserRole | '全部') => {
    setSelectedRole(role);
    setCurrentPage(1);
  };

  // 处理状态过滤
  const handleStatusFilter = (status: UserStatus | '全部') => {
    setSelectedStatus(status);
    setCurrentPage(1);
  };

  // 过滤和排序用户
  const filteredUsers = users.filter(user => {
    const matchesSearch = 
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (user.phone && user.phone.includes(searchTerm)) ||
      user.id.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesRole = selectedRole === '全部' || user.role === selectedRole;
    const matchesStatus = selectedStatus === '全部' || user.status === selectedStatus;
    
    return matchesSearch && matchesRole && matchesStatus;
  });

  // 排序用户
  const sortedUsers = [...filteredUsers].sort((a, b) => {
    if (!sortBy) return 0;
    
    let aValue = a[sortBy];
    let bValue = b[sortBy];
    
    // 处理可能为空的值
    if (aValue === undefined) return sortDirection === 'asc' ? -1 : 1;
    if (bValue === undefined) return sortDirection === 'asc' ? 1 : -1;
    
    // 字符串比较
    if (typeof aValue === 'string' && typeof bValue === 'string') {
      return sortDirection === 'asc' 
        ? aValue.localeCompare(bValue)
        : bValue.localeCompare(aValue);
    }
    
    // 日期比较
    if (sortBy === 'createdAt' || sortBy === 'lastLogin') {
      const dateA = new Date(aValue as string).getTime();
      const dateB = new Date(bValue as string).getTime();
      return sortDirection === 'asc' ? dateA - dateB : dateB - dateA;
    }
    
    return 0;
  });

  // 分页
  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = sortedUsers.slice(indexOfFirstUser, indexOfLastUser);
  const totalPages = Math.ceil(sortedUsers.length / usersPerPage);

  // 生成分页按钮
  const pageNumbers = [];
  const maxPageButtons = 5;
  
  let startPage = Math.max(1, currentPage - Math.floor(maxPageButtons / 2));
  let endPage = Math.min(totalPages, startPage + maxPageButtons - 1);
  
  if (endPage - startPage + 1 < maxPageButtons) {
    startPage = Math.max(1, endPage - maxPageButtons + 1);
  }
  
  for (let i = startPage; i <= endPage; i++) {
    pageNumbers.push(i);
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">用户管理</h1>
        <Link 
          href="/admin/users/new" 
          className="flex items-center px-4 py-2 rounded-md bg-indigo-600 text-white hover:bg-indigo-700"
        >
          <UserPlus className="w-4 h-4 mr-2" />
          新增用户
        </Link>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>用户列表</CardTitle>
          <CardDescription>
            管理所有注册用户，包括管理员、会员和普通用户。
          </CardDescription>
          
          <div className="mt-4 flex flex-col sm:flex-row gap-4">
            {/* 搜索栏 */}
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <input
                type="text"
                placeholder="搜索用户名、邮箱、电话或ID..."
                className="w-full pl-10 pr-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                value={searchTerm}
                onChange={handleSearch}
              />
            </div>
            
            {/* 过滤按钮 */}
            <div className="flex items-center gap-2">
              <div className="relative">
                <select 
                  className="appearance-none border rounded-md px-4 py-2 pr-8 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  value={selectedRole}
                  onChange={(e) => handleRoleFilter(e.target.value as UserRole | '全部')}
                >
                  <option value="全部">所有角色</option>
                  <option value="管理员">管理员</option>
                  <option value="会员">会员</option>
                  <option value="普通用户">普通用户</option>
                </select>
                <Filter className="pointer-events-none absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              </div>
              
              <div className="relative">
                <select 
                  className="appearance-none border rounded-md px-4 py-2 pr-8 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  value={selectedStatus}
                  onChange={(e) => handleStatusFilter(e.target.value as UserStatus | '全部')}
                >
                  <option value="全部">所有状态</option>
                  <option value="活跃">活跃</option>
                  <option value="禁用">禁用</option>
                  <option value="未验证">未验证</option>
                </select>
                <Filter className="pointer-events-none absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              </div>
              
              <button 
                className="flex items-center px-4 py-2 rounded-md bg-gray-100 hover:bg-gray-200"
                onClick={() => {
                  // 导出用户数据功能
                  console.log('导出用户数据');
                }}
              >
                <Download className="w-4 h-4 mr-2" />
                导出
              </button>
            </div>
          </div>
        </CardHeader>
        
        <CardContent>
          {/* 用户统计信息 */}
          <div className="mb-4 text-sm text-gray-500">
            共 {filteredUsers.length} 个用户
            {selectedRole !== '全部' && ` | ${selectedRole}: ${filteredUsers.filter(u => u.role === selectedRole).length}`}
            {selectedStatus !== '全部' && ` | ${selectedStatus}: ${filteredUsers.filter(u => u.status === selectedStatus).length}`}
          </div>
          
          {/* 用户表格 */}
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3 font-medium cursor-pointer hover:bg-gray-50" onClick={() => handleSort('id')}>
                    <div className="flex items-center">
                      ID
                      {sortBy === 'id' && (
                        <span className="ml-1">{sortDirection === 'asc' ? '↑' : '↓'}</span>
                      )}
                    </div>
                  </th>
                  <th className="text-left py-3 font-medium cursor-pointer hover:bg-gray-50" onClick={() => handleSort('name')}>
                    <div className="flex items-center">
                      用户名
                      {sortBy === 'name' && (
                        <span className="ml-1">{sortDirection === 'asc' ? '↑' : '↓'}</span>
                      )}
                    </div>
                  </th>
                  <th className="text-left py-3 font-medium cursor-pointer hover:bg-gray-50" onClick={() => handleSort('email')}>
                    <div className="flex items-center">
                      邮箱
                      {sortBy === 'email' && (
                        <span className="ml-1">{sortDirection === 'asc' ? '↑' : '↓'}</span>
                      )}
                    </div>
                  </th>
                  <th className="text-left py-3 font-medium cursor-pointer hover:bg-gray-50" onClick={() => handleSort('role')}>
                    <div className="flex items-center">
                      角色
                      {sortBy === 'role' && (
                        <span className="ml-1">{sortDirection === 'asc' ? '↑' : '↓'}</span>
                      )}
                    </div>
                  </th>
                  <th className="text-left py-3 font-medium cursor-pointer hover:bg-gray-50" onClick={() => handleSort('status')}>
                    <div className="flex items-center">
                      状态
                      {sortBy === 'status' && (
                        <span className="ml-1">{sortDirection === 'asc' ? '↑' : '↓'}</span>
                      )}
                    </div>
                  </th>
                  <th className="text-left py-3 font-medium cursor-pointer hover:bg-gray-50" onClick={() => handleSort('createdAt')}>
                    <div className="flex items-center">
                      注册日期
                      {sortBy === 'createdAt' && (
                        <span className="ml-1">{sortDirection === 'asc' ? '↑' : '↓'}</span>
                      )}
                    </div>
                  </th>
                  <th className="text-left py-3 font-medium cursor-pointer hover:bg-gray-50" onClick={() => handleSort('lastLogin')}>
                    <div className="flex items-center">
                      最后登录
                      {sortBy === 'lastLogin' && (
                        <span className="ml-1">{sortDirection === 'asc' ? '↑' : '↓'}</span>
                      )}
                    </div>
                  </th>
                  <th className="text-right py-3 font-medium">操作</th>
                </tr>
              </thead>
              <tbody>
                {currentUsers.map((user) => (
                  <tr key={user.id} className="border-b hover:bg-gray-50">
                    <td className="py-3">{user.id}</td>
                    <td className="py-3 flex items-center">
                      <div className="w-8 h-8 mr-2 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden">
                        {user.avatar ? (
                          <img src={user.avatar} alt={user.name} className="w-full h-full object-cover" />
                        ) : (
                          <User className="w-4 h-4 text-gray-500" />
                        )}
                      </div>
                      {user.name}
                    </td>
                    <td className="py-3">{user.email}</td>
                    <td className="py-3">
                      <span className={`px-2 py-1 rounded-full text-xs ${roleColorMap[user.role].bg} ${roleColorMap[user.role].text}`}>
                        {user.role}
                      </span>
                      {user.membershipLevel && (
                        <span className="ml-2 text-xs text-gray-500">
                          ({user.membershipLevel})
                        </span>
                      )}
                    </td>
                    <td className="py-3">
                      <span className={`px-2 py-1 rounded-full text-xs ${statusColorMap[user.status].bg} ${statusColorMap[user.status].text}`}>
                        {user.status}
                      </span>
                    </td>
                    <td className="py-3">{formatDate(user.createdAt)}</td>
                    <td className="py-3">{user.lastLogin ? formatDate(user.lastLogin) : '-'}</td>
                    <td className="py-3 text-right">
                      <div className="flex items-center justify-end space-x-2">
                        <Link 
                          href={`/admin/users/${user.id}`}
                          className="p-1 text-gray-500 hover:text-indigo-600 hover:bg-indigo-50 rounded-full"
                          title="查看详情"
                        >
                          <Eye className="w-4 h-4" />
                        </Link>
                        <Link 
                          href={`/admin/users/${user.id}/edit`}
                          className="p-1 text-gray-500 hover:text-indigo-600 hover:bg-indigo-50 rounded-full"
                          title="编辑用户"
                        >
                          <Edit className="w-4 h-4" />
                        </Link>
                        <button 
                          className="p-1 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-full"
                          title="删除用户"
                          onClick={() => {
                            if (confirm(`确定要删除用户 ${user.name} 吗？`)) {
                              // 删除用户逻辑
                              console.log(`删除用户 ${user.id}`);
                            }
                          }}
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
                
                {currentUsers.length === 0 && (
                  <tr>
                    <td colSpan={8} className="py-8 text-center text-gray-500">
                      没有找到匹配的用户
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
          
          {/* 分页控件 */}
          {totalPages > 1 && (
            <div className="mt-6 flex justify-between items-center">
              <div className="text-sm text-gray-500">
                显示 {indexOfFirstUser + 1}-{Math.min(indexOfLastUser, filteredUsers.length)} 共 {filteredUsers.length} 用户
              </div>
              <div className="flex items-center space-x-1">
                <button 
                  className={`px-3 py-1 rounded-md ${
                    currentPage === 1 
                      ? 'text-gray-400 cursor-not-allowed' 
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                  onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                  disabled={currentPage === 1}
                >
                  上一页
                </button>
                
                {pageNumbers.map(number => (
                  <button
                    key={number}
                    className={`px-3 py-1 rounded-md ${
                      currentPage === number
                        ? 'bg-indigo-600 text-white'
                        : 'text-gray-700 hover:bg-gray-100'
                    }`}
                    onClick={() => setCurrentPage(number)}
                  >
                    {number}
                  </button>
                ))}
                
                <button 
                  className={`px-3 py-1 rounded-md ${
                    currentPage === totalPages 
                      ? 'text-gray-400 cursor-not-allowed' 
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                  onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                  disabled={currentPage === totalPages}
                >
                  下一页
                </button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
} 