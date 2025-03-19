'use client';

import { useState } from 'react';
import Link from 'next/link';
import { 
  Search, Filter, Download, Eye, 
  CheckCircle, AlertCircle, Clock, XCircle, 
  RefreshCw, TrendingUp, TrendingDown
} from 'lucide-react';
import { formatDate, formatCurrency } from '@/lib/utils';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';

// 订单状态类型
type OrderStatus = '待处理' | '处理中' | '已完成' | '已取消' | '已退款';

// 支付方式类型
type PaymentMethod = '支付宝' | '微信支付' | '银联' | '余额支付' | '积分兑换';

// 服务类型
type ServiceType = '八字分析' | '塔罗牌占卜' | '面相分析' | '梦境解析' | '姓名分析' | '会员升级';

// 订单数据类型
interface OrderData {
  id: string;
  userId: string;
  userName: string;
  userEmail?: string;
  serviceType: ServiceType;
  serviceName: string;
  amount: number;
  status: OrderStatus;
  paymentMethod: PaymentMethod;
  createdAt: string;
  updatedAt: string;
  completedAt?: string;
  refundedAt?: string;
  cancelledAt?: string;
  notes?: string;
}

// 状态颜色映射
const statusColorMap: Record<OrderStatus, { bg: string; text: string }> = {
  '待处理': { bg: 'bg-yellow-100', text: 'text-yellow-800' },
  '处理中': { bg: 'bg-blue-100', text: 'text-blue-800' },
  '已完成': { bg: 'bg-green-100', text: 'text-green-800' },
  '已取消': { bg: 'bg-gray-100', text: 'text-gray-800' },
  '已退款': { bg: 'bg-red-100', text: 'text-red-800' }
};

// 状态图标映射
const statusIconMap: Record<OrderStatus, React.ReactNode> = {
  '待处理': <Clock className="w-4 h-4" />,
  '处理中': <RefreshCw className="w-4 h-4" />,
  '已完成': <CheckCircle className="w-4 h-4" />,
  '已取消': <XCircle className="w-4 h-4" />,
  '已退款': <AlertCircle className="w-4 h-4" />
};

// 模拟订单数据
const mockOrders: OrderData[] = Array.from({ length: 50 }).map((_, index) => {
  const statuses: OrderStatus[] = ['待处理', '处理中', '已完成', '已取消', '已退款'];
  const paymentMethods: PaymentMethod[] = ['支付宝', '微信支付', '银联', '余额支付', '积分兑换'];
  const serviceTypes: ServiceType[] = ['八字分析', '塔罗牌占卜', '面相分析', '梦境解析', '姓名分析', '会员升级'];
  
  const userNames = ['张三', '李四', '王五', '赵六', '钱七', '孙八', '周九', '吴十'];
  const status = statuses[Math.floor(Math.random() * statuses.length)];
  const serviceType = serviceTypes[Math.floor(Math.random() * serviceTypes.length)];
  
  // 为不同服务类型设置不同的价格范围
  let amount = 0;
  switch (serviceType) {
    case '八字分析':
      amount = Math.round(Math.random() * 300 + 100);
      break;
    case '塔罗牌占卜':
      amount = Math.round(Math.random() * 200 + 50);
      break;
    case '面相分析':
      amount = Math.round(Math.random() * 250 + 80);
      break;
    case '梦境解析':
      amount = Math.round(Math.random() * 150 + 30);
      break;
    case '姓名分析':
      amount = Math.round(Math.random() * 100 + 20);
      break;
    case '会员升级':
      amount = Math.round(Math.random() * 500 + 200);
      break;
  }
  
  // 创建基础日期
  const now = new Date();
  const createdAt = new Date(now.getTime() - Math.floor(Math.random() * 30 * 24 * 60 * 60 * 1000));
  const updatedAt = new Date(createdAt.getTime() + Math.floor(Math.random() * 24 * 60 * 60 * 1000));
  
  // 根据状态设置相应的日期
  let completedAt, refundedAt, cancelledAt;
  if (status === '已完成') {
    completedAt = new Date(updatedAt.getTime() + Math.floor(Math.random() * 5 * 24 * 60 * 60 * 1000));
  } else if (status === '已退款') {
    refundedAt = new Date(updatedAt.getTime() + Math.floor(Math.random() * 7 * 24 * 60 * 60 * 1000));
  } else if (status === '已取消') {
    cancelledAt = new Date(updatedAt.getTime() + Math.floor(Math.random() * 3 * 24 * 60 * 60 * 1000));
  }
  
  return {
    id: `ORD-${(index + 1).toString().padStart(5, '0')}`,
    userId: `USER-${Math.floor(Math.random() * 100).toString().padStart(3, '0')}`,
    userName: userNames[Math.floor(Math.random() * userNames.length)],
    userEmail: `user${Math.floor(Math.random() * 100)}@example.com`,
    serviceType,
    serviceName: serviceType + (Math.random() > 0.7 ? ' 高级版' : ''),
    amount,
    status,
    paymentMethod: paymentMethods[Math.floor(Math.random() * paymentMethods.length)],
    createdAt: createdAt.toISOString(),
    updatedAt: updatedAt.toISOString(),
    completedAt: completedAt?.toISOString(),
    refundedAt: refundedAt?.toISOString(),
    cancelledAt: cancelledAt?.toISOString(),
    notes: Math.random() > 0.7 ? '用户要求尽快处理' : undefined
  };
});

// 订单统计数据
const orderStats = {
  total: mockOrders.length,
  pending: mockOrders.filter(order => order.status === '待处理').length,
  processing: mockOrders.filter(order => order.status === '处理中').length,
  completed: mockOrders.filter(order => order.status === '已完成').length,
  cancelled: mockOrders.filter(order => order.status === '已取消').length,
  refunded: mockOrders.filter(order => order.status === '已退款').length,
  totalRevenue: mockOrders.reduce((sum, order) => sum + order.amount, 0),
  avgOrderValue: mockOrders.reduce((sum, order) => sum + order.amount, 0) / mockOrders.length
};

// 统计卡片组件
const StatCard = ({ title, value, icon, change }: { 
  title: string; 
  value: string | number; 
  icon: React.ReactNode;
  change?: number;
}) => {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-sm font-medium text-gray-500">{title}</CardTitle>
        <div className="h-8 w-8 rounded-lg bg-indigo-50 p-1 text-indigo-600">
          {icon}
        </div>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        {change !== undefined && (
          <p className={`text-xs flex items-center mt-1 ${change >= 0 ? 'text-green-500' : 'text-red-500'}`}>
            {change >= 0 ? <TrendingUp className="w-3 h-3 mr-1" /> : <TrendingDown className="w-3 h-3 mr-1" />}
            {Math.abs(change)}% {change >= 0 ? '增长' : '下降'}
          </p>
        )}
      </CardContent>
    </Card>
  );
};

export default function OrdersPage() {
  const [orders, setOrders] = useState<OrderData[]>(mockOrders);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedStatus, setSelectedStatus] = useState<OrderStatus | '全部'>('全部');
  const [selectedServiceType, setSelectedServiceType] = useState<ServiceType | '全部'>('全部');
  const [dateRange, setDateRange] = useState<{start?: string; end?: string}>({});
  const [sortBy, setSortBy] = useState<keyof OrderData | null>('createdAt');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc');

  const ordersPerPage = 10;

  // 处理搜索
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1);
  };

  // 处理排序
  const handleSort = (column: keyof OrderData) => {
    if (sortBy === column) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(column);
      setSortDirection('desc'); // 默认降序，最新的在前面
    }
  };

  // 处理状态过滤
  const handleStatusFilter = (status: OrderStatus | '全部') => {
    setSelectedStatus(status);
    setCurrentPage(1);
  };

  // 处理服务类型过滤
  const handleServiceTypeFilter = (type: ServiceType | '全部') => {
    setSelectedServiceType(type);
    setCurrentPage(1);
  };

  // 处理日期范围过滤
  const handleDateRangeChange = (e: React.ChangeEvent<HTMLInputElement>, type: 'start' | 'end') => {
    setDateRange(prev => ({
      ...prev,
      [type]: e.target.value
    }));
    setCurrentPage(1);
  };

  // 过滤和排序订单
  const filteredOrders = orders.filter(order => {
    // 搜索条件
    const matchesSearch = 
      order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.userName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.userEmail?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.userId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.serviceName.toLowerCase().includes(searchTerm.toLowerCase());
    
    // 状态过滤
    const matchesStatus = selectedStatus === '全部' || order.status === selectedStatus;
    
    // 服务类型过滤
    const matchesServiceType = selectedServiceType === '全部' || order.serviceType === selectedServiceType;
    
    // 日期范围过滤
    let matchesDateRange = true;
    if (dateRange.start) {
      matchesDateRange = matchesDateRange && new Date(order.createdAt) >= new Date(dateRange.start);
    }
    if (dateRange.end) {
      matchesDateRange = matchesDateRange && new Date(order.createdAt) <= new Date(dateRange.end);
    }
    
    return matchesSearch && matchesStatus && matchesServiceType && matchesDateRange;
  });

  // 排序订单
  const sortedOrders = [...filteredOrders].sort((a, b) => {
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
    
    // 数值比较
    if (typeof aValue === 'number' && typeof bValue === 'number') {
      return sortDirection === 'asc' ? aValue - bValue : bValue - aValue;
    }
    
    // 日期比较
    if ((sortBy === 'createdAt' || sortBy === 'updatedAt' || 
         sortBy === 'completedAt' || sortBy === 'refundedAt' || 
         sortBy === 'cancelledAt') && 
        typeof aValue === 'string' && typeof bValue === 'string') {
      const dateA = new Date(aValue).getTime();
      const dateB = new Date(bValue).getTime();
      return sortDirection === 'asc' ? dateA - dateB : dateB - dateA;
    }
    
    return 0;
  });

  // 分页
  const indexOfLastOrder = currentPage * ordersPerPage;
  const indexOfFirstOrder = indexOfLastOrder - ordersPerPage;
  const currentOrders = sortedOrders.slice(indexOfFirstOrder, indexOfLastOrder);
  const totalPages = Math.ceil(sortedOrders.length / ordersPerPage);

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
        <h1 className="text-2xl font-bold">订单管理</h1>
      </div>

      {/* 统计卡片 */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard 
          title="总订单数" 
          value={orderStats.total}
          icon={<RefreshCw className="h-6 w-6" />}
          change={5.2}
        />
        <StatCard 
          title="待处理订单" 
          value={orderStats.pending}
          icon={<Clock className="h-6 w-6" />}
        />
        <StatCard 
          title="总收入" 
          value={formatCurrency(orderStats.totalRevenue)}
          icon={<TrendingUp className="h-6 w-6" />}
          change={8.7}
        />
        <StatCard 
          title="平均订单金额" 
          value={formatCurrency(orderStats.avgOrderValue)}
          icon={<TrendingUp className="h-6 w-6" />}
          change={3.2}
        />
      </div>

      <Card>
        <CardHeader>
          <CardTitle>订单列表</CardTitle>
          <CardDescription>
            管理所有订单记录
          </CardDescription>
          
          <div className="mt-4 flex flex-col sm:flex-row gap-4">
            {/* 搜索栏 */}
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <input
                type="text"
                placeholder="搜索订单号、用户名、邮箱..."
                className="w-full pl-10 pr-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                value={searchTerm}
                onChange={handleSearch}
              />
            </div>
            
            {/* 过滤控件 */}
            <div className="flex flex-wrap items-center gap-2">
              {/* 状态过滤 */}
              <div className="relative">
                <select 
                  className="appearance-none border rounded-md px-4 py-2 pr-8 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  value={selectedStatus}
                  onChange={(e) => handleStatusFilter(e.target.value as OrderStatus | '全部')}
                >
                  <option value="全部">所有状态</option>
                  <option value="待处理">待处理</option>
                  <option value="处理中">处理中</option>
                  <option value="已完成">已完成</option>
                  <option value="已取消">已取消</option>
                  <option value="已退款">已退款</option>
                </select>
                <Filter className="pointer-events-none absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              </div>
              
              {/* 服务类型过滤 */}
              <div className="relative">
                <select 
                  className="appearance-none border rounded-md px-4 py-2 pr-8 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  value={selectedServiceType}
                  onChange={(e) => handleServiceTypeFilter(e.target.value as ServiceType | '全部')}
                >
                  <option value="全部">所有服务</option>
                  <option value="八字分析">八字分析</option>
                  <option value="塔罗牌占卜">塔罗牌占卜</option>
                  <option value="面相分析">面相分析</option>
                  <option value="梦境解析">梦境解析</option>
                  <option value="姓名分析">姓名分析</option>
                  <option value="会员升级">会员升级</option>
                </select>
                <Filter className="pointer-events-none absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              </div>
              
              {/* 导出订单按钮 */}
              <button 
                className="flex items-center px-4 py-2 rounded-md bg-gray-100 hover:bg-gray-200"
                onClick={() => {
                  // 导出订单数据功能
                  console.log('导出订单数据');
                }}
              >
                <Download className="w-4 h-4 mr-2" />
                导出
              </button>
            </div>
          </div>
          
          {/* 日期范围过滤 */}
          <div className="mt-4 flex flex-wrap gap-4">
            <div className="flex items-center gap-2">
              <label className="text-sm text-gray-500">开始日期:</label>
              <input
                type="date"
                className="border rounded-md px-3 py-1.5 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                value={dateRange.start || ''}
                onChange={(e) => handleDateRangeChange(e, 'start')}
              />
            </div>
            <div className="flex items-center gap-2">
              <label className="text-sm text-gray-500">结束日期:</label>
              <input
                type="date"
                className="border rounded-md px-3 py-1.5 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                value={dateRange.end || ''}
                onChange={(e) => handleDateRangeChange(e, 'end')}
              />
            </div>
          </div>
        </CardHeader>
        
        <CardContent>
          {/* 订单统计信息 */}
          <div className="mb-4 text-sm text-gray-500">
            共 {filteredOrders.length} 个订单
            {selectedStatus !== '全部' && ` | ${selectedStatus}: ${filteredOrders.filter(o => o.status === selectedStatus).length}`}
            {selectedServiceType !== '全部' && ` | ${selectedServiceType}: ${filteredOrders.filter(o => o.serviceType === selectedServiceType).length}`}
          </div>
          
          {/* 订单表格 */}
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3 font-medium cursor-pointer hover:bg-gray-50" onClick={() => handleSort('id')}>
                    <div className="flex items-center">
                      订单号
                      {sortBy === 'id' && (
                        <span className="ml-1">{sortDirection === 'asc' ? '↑' : '↓'}</span>
                      )}
                    </div>
                  </th>
                  <th className="text-left py-3 font-medium cursor-pointer hover:bg-gray-50" onClick={() => handleSort('userName')}>
                    <div className="flex items-center">
                      用户
                      {sortBy === 'userName' && (
                        <span className="ml-1">{sortDirection === 'asc' ? '↑' : '↓'}</span>
                      )}
                    </div>
                  </th>
                  <th className="text-left py-3 font-medium cursor-pointer hover:bg-gray-50" onClick={() => handleSort('serviceName')}>
                    <div className="flex items-center">
                      服务
                      {sortBy === 'serviceName' && (
                        <span className="ml-1">{sortDirection === 'asc' ? '↑' : '↓'}</span>
                      )}
                    </div>
                  </th>
                  <th className="text-left py-3 font-medium cursor-pointer hover:bg-gray-50" onClick={() => handleSort('amount')}>
                    <div className="flex items-center">
                      金额
                      {sortBy === 'amount' && (
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
                      创建时间
                      {sortBy === 'createdAt' && (
                        <span className="ml-1">{sortDirection === 'asc' ? '↑' : '↓'}</span>
                      )}
                    </div>
                  </th>
                  <th className="text-right py-3 font-medium">操作</th>
                </tr>
              </thead>
              <tbody>
                {currentOrders.map((order) => (
                  <tr key={order.id} className="border-b hover:bg-gray-50">
                    <td className="py-3">{order.id}</td>
                    <td className="py-3">
                      <div>
                        <div className="font-medium">{order.userName}</div>
                        <div className="text-xs text-gray-500">{order.userId}</div>
                      </div>
                    </td>
                    <td className="py-3">{order.serviceName}</td>
                    <td className="py-3">{formatCurrency(order.amount)}</td>
                    <td className="py-3">
                      <div className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs ${statusColorMap[order.status].bg} ${statusColorMap[order.status].text}`}>
                        <span className="mr-1">{statusIconMap[order.status]}</span>
                        {order.status}
                      </div>
                    </td>
                    <td className="py-3">{formatDate(order.createdAt)}</td>
                    <td className="py-3 text-right">
                      <div className="flex items-center justify-end space-x-2">
                        <Link 
                          href={`/admin/orders/${order.id}`}
                          className="p-1 text-gray-500 hover:text-indigo-600 hover:bg-indigo-50 rounded-full"
                          title="查看详情"
                        >
                          <Eye className="w-4 h-4" />
                        </Link>
                        {order.status === '待处理' && (
                          <button 
                            className="p-1 text-gray-500 hover:text-indigo-600 hover:bg-indigo-50 rounded-full"
                            title="处理订单"
                            onClick={() => {
                              // 处理订单逻辑
                              console.log(`处理订单 ${order.id}`);
                            }}
                          >
                            <RefreshCw className="w-4 h-4" />
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
                
                {currentOrders.length === 0 && (
                  <tr>
                    <td colSpan={7} className="py-8 text-center text-gray-500">
                      没有找到匹配的订单
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
                显示 {indexOfFirstOrder + 1}-{Math.min(indexOfLastOrder, filteredOrders.length)} 共 {filteredOrders.length} 订单
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