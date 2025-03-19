'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  UserPlus, 
  CreditCard, 
  ShoppingCart, 
  Activity,
  TrendingUp,
  TrendingDown
} from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { PieChart, Pie, Cell, Legend } from 'recharts';

// 模拟仪表盘数据
const dashboardData = {
  newUsers: {
    today: 12,
    week: 87,
    month: 342,
    change: 8.2
  },
  revenue: {
    today: 2584.00,
    week: 15680.50,
    month: 54320.75,
    change: 12.5
  },
  orders: {
    today: 24,
    week: 164,
    month: 658,
    change: -3.8
  },
  activeUsers: {
    today: 346,
    week: 1254,
    month: 4587,
    change: 5.4
  }
};

// 订单状态数据
const orderStatusData = [
  { name: '待处理', value: 25, color: '#facc15' },
  { name: '处理中', value: 40, color: '#3b82f6' },
  { name: '已完成', value: 30, color: '#10b981' },
  { name: '已取消', value: 5, color: '#ef4444' },
];

// 收入趋势数据
const revenueData = [
  { name: '1月', 会员: 4000, 服务: 2400 },
  { name: '2月', 会员: 3000, 服务: 1398 },
  { name: '3月', 会员: 2000, 服务: 9800 },
  { name: '4月', 会员: 2780, 服务: 3908 },
  { name: '5月', 会员: 1890, 服务: 4800 },
  { name: '6月', 会员: 2390, 服务: 3800 },
  { name: '7月', 会员: 3490, 服务: 4300 },
];

// 最近订单数据
const recentOrders = [
  { id: 'ORD-001', user: '张三', service: '八字分析', amount: 199, status: '已完成', date: '2025-03-18' },
  { id: 'ORD-002', user: '李四', service: '塔罗牌占卜', amount: 99, status: '处理中', date: '2025-03-18' },
  { id: 'ORD-003', user: '王五', service: '面相分析', amount: 159, status: '待处理', date: '2025-03-17' },
  { id: 'ORD-004', user: '赵六', service: '会员升级', amount: 365, status: '已完成', date: '2025-03-17' },
  { id: 'ORD-005', user: '钱七', service: '梦境解析', amount: 129, status: '已完成', date: '2025-03-16' },
];

// 热门服务数据
const topServices = [
  { name: '八字命理分析', orders: 158, revenue: 31442, growth: 12.4 },
  { name: '塔罗牌占卜', orders: 143, revenue: 14157, growth: 8.7 },
  { name: '面相分析', orders: 97, revenue: 15423, growth: -2.3 },
  { name: '梦境解析', orders: 65, revenue: 8385, growth: 15.8 },
  { name: '姓名分析', orders: 42, revenue: 4158, growth: 5.2 },
];

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

export default function AdminDashboard() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">仪表盘</h1>
        <div className="text-sm text-gray-500">
          {new Date().toLocaleDateString('zh-CN', { 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
          })}
        </div>
      </div>

      {/* 统计卡片 */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard 
          title="今日新增用户" 
          value={dashboardData.newUsers.today}
          icon={<UserPlus className="h-6 w-6" />}
          change={dashboardData.newUsers.change}
        />
        <StatCard 
          title="今日收入" 
          value={`¥${dashboardData.revenue.today.toLocaleString()}`}
          icon={<CreditCard className="h-6 w-6" />}
          change={dashboardData.revenue.change}
        />
        <StatCard 
          title="今日订单" 
          value={dashboardData.orders.today}
          icon={<ShoppingCart className="h-6 w-6" />}
          change={dashboardData.orders.change}
        />
        <StatCard 
          title="活跃用户" 
          value={dashboardData.activeUsers.today}
          icon={<Activity className="h-6 w-6" />}
          change={dashboardData.activeUsers.change}
        />
      </div>

      {/* 图表区域 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* 收入趋势图 */}
        <Card>
          <CardHeader>
            <CardTitle>收入趋势</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={revenueData}
                  margin={{
                    top: 20,
                    right: 30,
                    left: 20,
                    bottom: 5,
                  }}
                >
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="会员" stackId="a" fill="#8884d8" />
                  <Bar dataKey="服务" stackId="a" fill="#82ca9d" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* 订单状态饼图 */}
        <Card>
          <CardHeader>
            <CardTitle>订单状态分布</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={orderStatusData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                    label={({ name, percent }: { name: string; percent: number }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  >
                    {orderStatusData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Legend />
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* 最近订单表格 */}
      <Card>
        <CardHeader>
          <CardTitle>最近订单</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-2 font-medium">订单编号</th>
                  <th className="text-left py-2 font-medium">用户</th>
                  <th className="text-left py-2 font-medium">服务</th>
                  <th className="text-left py-2 font-medium">金额</th>
                  <th className="text-left py-2 font-medium">状态</th>
                  <th className="text-left py-2 font-medium">日期</th>
                </tr>
              </thead>
              <tbody>
                {recentOrders.map((order) => (
                  <tr key={order.id} className="border-b hover:bg-gray-50">
                    <td className="py-2">{order.id}</td>
                    <td className="py-2">{order.user}</td>
                    <td className="py-2">{order.service}</td>
                    <td className="py-2">¥{order.amount}</td>
                    <td className="py-2">
                      <span className={`px-2 py-1 rounded-full text-xs ${
                        order.status === '已完成' ? 'bg-green-100 text-green-800' : 
                        order.status === '处理中' ? 'bg-blue-100 text-blue-800' : 
                        order.status === '待处理' ? 'bg-yellow-100 text-yellow-800' : 
                        'bg-red-100 text-red-800'
                      }`}>
                        {order.status}
                      </span>
                    </td>
                    <td className="py-2">{order.date}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* 热门服务排行 */}
      <Card>
        <CardHeader>
          <CardTitle>热门服务排行</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-2 font-medium">服务名称</th>
                  <th className="text-left py-2 font-medium">订单数</th>
                  <th className="text-left py-2 font-medium">收入</th>
                  <th className="text-left py-2 font-medium">环比增长</th>
                </tr>
              </thead>
              <tbody>
                {topServices.map((service, index) => (
                  <tr key={index} className="border-b hover:bg-gray-50">
                    <td className="py-2">{service.name}</td>
                    <td className="py-2">{service.orders}</td>
                    <td className="py-2">¥{service.revenue}</td>
                    <td className="py-2">
                      <span className={`flex items-center ${service.growth >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                        {service.growth >= 0 ? <TrendingUp className="w-3 h-3 mr-1" /> : <TrendingDown className="w-3 h-3 mr-1" />}
                        {Math.abs(service.growth)}%
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
} 