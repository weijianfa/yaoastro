'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { 
  ArrowLeft, 
  FileText, 
  User, 
  Calendar, 
  Clock, 
  CreditCard, 
  CheckCircle, 
  XCircle, 
  AlertCircle, 
  Edit, 
  Printer, 
  CornerDownLeft,
  RefreshCw
} from 'lucide-react';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { formatDate, formatCurrency, getRelativeTimeFromNow } from '@/lib/utils';

// 订单状态类型
type OrderStatus = '待处理' | '处理中' | '已完成' | '已取消' | '已退款';

// 支付方式类型
type PaymentMethod = '支付宝' | '微信支付' | '银联' | '余额支付' | '积分兑换';

// 服务类型
type ServiceType = '八字分析' | '塔罗牌占卜' | '面相分析' | '梦境解析' | '姓名分析' | '会员升级';

// 状态更新类型
interface StatusUpdate {
  status: OrderStatus;
  timestamp: string;
  operator: string;
  note?: string;
}

// 订单数据类型
interface OrderData {
  id: string;
  userId: string;
  userName: string;
  userEmail?: string;
  userPhone?: string;
  serviceType: ServiceType;
  serviceName: string;
  serviceDetails?: string;
  amount: number;
  status: OrderStatus;
  paymentMethod: PaymentMethod;
  transactionId?: string;
  createdAt: string;
  updatedAt: string;
  completedAt?: string;
  refundedAt?: string;
  cancelledAt?: string;
  notes?: string;
  statusHistory: StatusUpdate[];
}

// 状态颜色映射
const statusColorMap: Record<OrderStatus, { bg: string; text: string }> = {
  '待处理': { bg: 'bg-yellow-100', text: 'text-yellow-800' },
  '处理中': { bg: 'bg-blue-100', text: 'text-blue-800' },
  '已完成': { bg: 'bg-green-100', text: 'text-green-800' },
  '已取消': { bg: 'bg-gray-100', text: 'text-gray-800' },
  '已退款': { bg: 'bg-red-100', text: 'text-red-800' }
};

// 模拟订单数据
const mockOrderDetails: Record<string, OrderData> = {
  'ORD-00001': {
    id: 'ORD-00001',
    userId: 'USER-001',
    userName: '张三',
    userEmail: 'zhangsan@example.com',
    userPhone: '13812345678',
    serviceType: '八字分析',
    serviceName: '八字分析 高级版',
    serviceDetails: '包含详细的八字命盘分析、五行属性、事业财运分析以及未来五年的运势预测',
    amount: 299,
    status: '已完成',
    paymentMethod: '微信支付',
    transactionId: 'WX123456789',
    createdAt: '2025-03-15T08:24:00Z',
    updatedAt: '2025-03-15T09:30:00Z',
    completedAt: '2025-03-16T14:15:00Z',
    notes: '用户要求仔细分析事业发展方向，重点关注2025年下半年运势',
    statusHistory: [
      { status: '待处理', timestamp: '2025-03-15T08:24:00Z', operator: '系统' },
      { status: '处理中', timestamp: '2025-03-15T09:30:00Z', operator: '李老师', note: '已开始分析，预计需要一天时间' },
      { status: '已完成', timestamp: '2025-03-16T14:15:00Z', operator: '李老师', note: '分析已完成并发送给用户' }
    ]
  },
  'ORD-00002': {
    id: 'ORD-00002',
    userId: 'USER-042',
    userName: '李四',
    userEmail: 'lisi@example.com',
    userPhone: '13987654321',
    serviceType: '塔罗牌占卜',
    serviceName: '塔罗牌爱情运势解析',
    serviceDetails: '22张大阿卡纳牌面解析，关注爱情关系发展、潜在问题和未来走向',
    amount: 99,
    status: '处理中',
    paymentMethod: '支付宝',
    transactionId: 'ZFB987654321',
    createdAt: '2025-03-17T10:45:00Z',
    updatedAt: '2025-03-17T11:20:00Z',
    notes: '用户想了解感情方面的发展，下周会见重要的人',
    statusHistory: [
      { status: '待处理', timestamp: '2025-03-17T10:45:00Z', operator: '系统' },
      { status: '处理中', timestamp: '2025-03-17T11:20:00Z', operator: '王老师', note: '已安排在今天下午进行占卜' }
    ]
  },
  'ORD-00003': {
    id: 'ORD-00003',
    userId: 'USER-108',
    userName: '王五',
    userEmail: 'wangwu@example.com',
    userPhone: '13665432198',
    serviceType: '面相分析',
    serviceName: '面相全面解析',
    serviceDetails: '五官、面部轮廓、气色综合分析，包括性格特点、事业财运、健康状况评估',
    amount: 159,
    status: '待处理',
    paymentMethod: '银联',
    transactionId: 'YL567891234',
    createdAt: '2025-03-18T09:12:00Z',
    updatedAt: '2025-03-18T09:12:00Z',
    notes: '用户上传了三张不同角度的照片，希望能尽快分析',
    statusHistory: [
      { status: '待处理', timestamp: '2025-03-18T09:12:00Z', operator: '系统' }
    ]
  }
};

export default function OrderDetailPage() {
  const params = useParams();
  const router = useRouter();
  const [order, setOrder] = useState<OrderData | null>(null);
  const [loading, setLoading] = useState(true);
  const [processingOrder, setProcessingOrder] = useState(false);
  const [newStatusNote, setNewStatusNote] = useState('');
  const [newStatus, setNewStatus] = useState<OrderStatus | ''>('');
  const [activeTab, setActiveTab] = useState<'details' | 'history'>('details');

  // 模拟API调用获取订单详情
  useEffect(() => {
    const orderId = params.id as string;
    setLoading(true);
    
    // 模拟API请求延迟
    const timer = setTimeout(() => {
      const orderData = mockOrderDetails[orderId];
      setOrder(orderData || null);
      setLoading(false);
    }, 500);
    
    return () => clearTimeout(timer);
  }, [params.id]);

  // 处理订单状态更新
  const handleUpdateStatus = () => {
    if (!order || !newStatus) return;
    
    setProcessingOrder(true);
    
    // 模拟API请求延迟
    setTimeout(() => {
      const updatedOrder = { ...order };
      const now = new Date().toISOString();
      
      // 添加新的状态历史记录
      updatedOrder.statusHistory = [
        ...updatedOrder.statusHistory,
        {
          status: newStatus,
          timestamp: now,
          operator: '当前管理员',
          note: newStatusNote || undefined
        }
      ];
      
      // 更新订单状态和相关时间戳
      updatedOrder.status = newStatus;
      updatedOrder.updatedAt = now;
      
      if (newStatus === '已完成') {
        updatedOrder.completedAt = now;
      } else if (newStatus === '已取消') {
        updatedOrder.cancelledAt = now;
      } else if (newStatus === '已退款') {
        updatedOrder.refundedAt = now;
      }
      
      // 更新状态
      setOrder(updatedOrder);
      setProcessingOrder(false);
      setNewStatus('');
      setNewStatusNote('');
      
      // 更新模拟数据
      mockOrderDetails[updatedOrder.id] = updatedOrder;
      
      console.log('订单状态已更新:', updatedOrder);
    }, 800);
  };

  // 处理打印订单
  const handlePrintOrder = () => {
    window.print();
  };

  // 渲染订单状态标签
  const renderStatusBadge = (status: OrderStatus) => (
    <div className={`inline-flex items-center px-3 py-1 rounded-full text-sm ${statusColorMap[status].bg} ${statusColorMap[status].text}`}>
      {status === '待处理' && <Clock className="w-4 h-4 mr-1" />}
      {status === '处理中' && <RefreshCw className="w-4 h-4 mr-1" />}
      {status === '已完成' && <CheckCircle className="w-4 h-4 mr-1" />}
      {status === '已取消' && <XCircle className="w-4 h-4 mr-1" />}
      {status === '已退款' && <AlertCircle className="w-4 h-4 mr-1" />}
      {status}
    </div>
  );

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
      </div>
    );
  }

  if (!order) {
    return (
      <div className="space-y-8">
        <div className="flex items-center gap-4">
          <Link href="/admin/orders" className="p-2 hover:bg-gray-100 rounded-full">
            <ArrowLeft className="h-5 w-5" />
          </Link>
          <h1 className="text-2xl font-bold">订单详情</h1>
        </div>
        
        <Card>
          <CardContent className="pt-6 text-center">
            <div className="mb-4">
              <XCircle className="h-16 w-16 text-red-500 mx-auto" />
            </div>
            <h2 className="text-xl font-semibold mb-2">未找到订单</h2>
            <p className="text-gray-500 mb-6">找不到ID为 {params.id} 的订单记录</p>
            <Link 
              href="/admin/orders"
              className="inline-flex items-center px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              返回订单列表
            </Link>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link href="/admin/orders" className="p-2 hover:bg-gray-100 rounded-full">
            <ArrowLeft className="h-5 w-5" />
          </Link>
          <h1 className="text-2xl font-bold">订单详情</h1>
          {renderStatusBadge(order.status)}
        </div>
        
        <div className="flex gap-2">
          <button 
            className="flex items-center px-3 py-2 bg-gray-100 hover:bg-gray-200 rounded-md"
            onClick={handlePrintOrder}
          >
            <Printer className="h-4 w-4 mr-2" />
            打印订单
          </button>
        </div>
      </div>

      {/* 订单基本信息 */}
      <Card>
        <CardHeader className="pb-2">
          <div className="flex items-center justify-between">
            <CardTitle>订单信息</CardTitle>
            <div className="text-sm text-gray-500">
              {formatDate(order.createdAt)}
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* 订单详情 */}
            <div className="space-y-4">
              <div>
                <h3 className="text-sm font-medium text-gray-500 mb-1">订单编号</h3>
                <p className="font-medium">{order.id}</p>
              </div>
              
              <div>
                <h3 className="text-sm font-medium text-gray-500 mb-1">服务类型</h3>
                <p className="font-medium">{order.serviceName}</p>
                {order.serviceDetails && (
                  <p className="text-sm text-gray-500 mt-1">{order.serviceDetails}</p>
                )}
              </div>
              
              <div>
                <h3 className="text-sm font-medium text-gray-500 mb-1">订单金额</h3>
                <p className="text-lg font-bold text-indigo-600">{formatCurrency(order.amount)}</p>
              </div>
              
              <div>
                <h3 className="text-sm font-medium text-gray-500 mb-1">支付方式</h3>
                <p className="font-medium">{order.paymentMethod}</p>
                {order.transactionId && (
                  <p className="text-sm text-gray-500 mt-1">交易号: {order.transactionId}</p>
                )}
              </div>
              
              {order.notes && (
                <div>
                  <h3 className="text-sm font-medium text-gray-500 mb-1">备注</h3>
                  <p className="text-sm bg-gray-50 p-3 rounded-md border border-gray-100">
                    {order.notes}
                  </p>
                </div>
              )}
            </div>
            
            {/* 用户信息 */}
            <div className="space-y-4">
              <div>
                <h3 className="text-sm font-medium text-gray-500 mb-1">用户信息</h3>
                <div className="flex items-center">
                  <div className="bg-indigo-100 rounded-full p-2 mr-3">
                    <User className="h-5 w-5 text-indigo-600" />
                  </div>
                  <div>
                    <p className="font-medium">{order.userName}</p>
                    <p className="text-sm text-gray-500">ID: {order.userId}</p>
                  </div>
                </div>
              </div>
              
              <div>
                <h3 className="text-sm font-medium text-gray-500 mb-1">联系方式</h3>
                <div className="space-y-1">
                  {order.userEmail && <p className="text-sm">{order.userEmail}</p>}
                  {order.userPhone && <p className="text-sm">{order.userPhone}</p>}
                </div>
              </div>
              
              <div>
                <h3 className="text-sm font-medium text-gray-500 mb-1">订单时间</h3>
                <div className="space-y-2">
                  <div className="flex items-center text-sm">
                    <Calendar className="h-4 w-4 mr-2 text-gray-400" />
                    <span className="text-gray-500 mr-2">创建时间:</span>
                    <span>{formatDate(order.createdAt)}</span>
                  </div>
                  
                  {order.completedAt && (
                    <div className="flex items-center text-sm">
                      <CheckCircle className="h-4 w-4 mr-2 text-green-500" />
                      <span className="text-gray-500 mr-2">完成时间:</span>
                      <span>{formatDate(order.completedAt)}</span>
                    </div>
                  )}
                  
                  {order.cancelledAt && (
                    <div className="flex items-center text-sm">
                      <XCircle className="h-4 w-4 mr-2 text-gray-500" />
                      <span className="text-gray-500 mr-2">取消时间:</span>
                      <span>{formatDate(order.cancelledAt)}</span>
                    </div>
                  )}
                  
                  {order.refundedAt && (
                    <div className="flex items-center text-sm">
                      <CornerDownLeft className="h-4 w-4 mr-2 text-red-500" />
                      <span className="text-gray-500 mr-2">退款时间:</span>
                      <span>{formatDate(order.refundedAt)}</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* 状态更新和历史记录 */}
      <Card>
        <CardHeader className="pb-2">
          <div className="flex justify-between items-center">
            <div className="flex space-x-4">
              <button
                className={`pb-2 border-b-2 ${activeTab === 'details' ? 'border-indigo-600 text-indigo-600' : 'border-transparent text-gray-500'}`}
                onClick={() => setActiveTab('details')}
              >
                订单状态
              </button>
              <button
                className={`pb-2 border-b-2 ${activeTab === 'history' ? 'border-indigo-600 text-indigo-600' : 'border-transparent text-gray-500'}`}
                onClick={() => setActiveTab('history')}
              >
                状态历史
              </button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {activeTab === 'details' && (
            <div className="space-y-4">
              <div className="flex flex-wrap items-center gap-4 mb-4">
                <div className="font-medium">更新订单状态:</div>
                <div className="flex flex-wrap gap-2">
                  {(['待处理', '处理中', '已完成', '已取消', '已退款'] as OrderStatus[]).map((status) => (
                    <button
                      key={status}
                      className={`px-3 py-1.5 rounded-md ${
                        newStatus === status 
                          ? `${statusColorMap[status].bg} ${statusColorMap[status].text} font-medium`
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      } ${order.status === status ? 'cursor-not-allowed opacity-50' : ''}`}
                      onClick={() => setNewStatus(status)}
                      disabled={order.status === status}
                    >
                      {status}
                    </button>
                  ))}
                </div>
              </div>
              
              {newStatus && (
                <div className="border rounded-md p-4 bg-gray-50">
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-1">状态备注 (可选)</label>
                    <textarea
                      rows={3}
                      className="w-full px-3 py-2 border rounded-md resize-none focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      placeholder="输入状态更新的相关说明..."
                      value={newStatusNote}
                      onChange={(e) => setNewStatusNote(e.target.value)}
                    />
                  </div>
                  
                  <div className="flex justify-end gap-3">
                    <button
                      className="px-3 py-1.5 border rounded-md hover:bg-gray-100"
                      onClick={() => {
                        setNewStatus('');
                        setNewStatusNote('');
                      }}
                    >
                      取消
                    </button>
                    <button
                      className="px-3 py-1.5 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 flex items-center"
                      onClick={handleUpdateStatus}
                      disabled={processingOrder}
                    >
                      {processingOrder && <RefreshCw className="animate-spin h-4 w-4 mr-2" />}
                      更新状态
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}
          
          {activeTab === 'history' && (
            <div className="space-y-4">
              <div className="relative">
                <div className="absolute top-0 bottom-0 left-3 w-0.5 bg-gray-200"></div>
                
                {order.statusHistory.map((update, index) => (
                  <div key={index} className="relative pl-10 pb-8">
                    <div className="absolute left-0 top-1 w-6 h-6 rounded-full border-2 border-white bg-indigo-100 flex items-center justify-center">
                      {update.status === '待处理' && <Clock className="h-3 w-3 text-indigo-600" />}
                      {update.status === '处理中' && <RefreshCw className="h-3 w-3 text-indigo-600" />}
                      {update.status === '已完成' && <CheckCircle className="h-3 w-3 text-indigo-600" />}
                      {update.status === '已取消' && <XCircle className="h-3 w-3 text-indigo-600" />}
                      {update.status === '已退款' && <AlertCircle className="h-3 w-3 text-indigo-600" />}
                    </div>
                    
                    <div className="mb-1">
                      <div className="flex items-center gap-2">
                        <span className={`px-2 py-0.5 rounded-full text-xs ${statusColorMap[update.status].bg} ${statusColorMap[update.status].text}`}>
                          {update.status}
                        </span>
                        <span className="text-sm text-gray-500">
                          {formatDate(update.timestamp)}
                          <span className="ml-2 text-xs">({getRelativeTimeFromNow(update.timestamp)})</span>
                        </span>
                      </div>
                    </div>
                    
                    <div className="flex items-center text-sm text-gray-500">
                      <User className="h-4 w-4 mr-1" />
                      <span>操作人: {update.operator}</span>
                    </div>
                    
                    {update.note && (
                      <div className="mt-2 text-sm bg-gray-50 p-3 rounded-md border border-gray-100">
                        {update.note}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
} 