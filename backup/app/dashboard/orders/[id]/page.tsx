import { Metadata } from 'next';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { redirect } from 'next/navigation';
import { getOrderDetail, cancelOrder, payOrder } from '@/app/actions/order';
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CalendarIcon, CreditCardIcon, ClockIcon, CheckCircleIcon, XCircleIcon, AlertCircleIcon, ArrowLeftIcon } from 'lucide-react';
import Link from 'next/link';
import { toast } from '@/components/ui/use-toast';

export const metadata: Metadata = {
  title: '订单详情 | 命理分析平台',
  description: '查看订单的详细信息',
};

// 订单状态映射
const orderStatusMap = {
  PENDING: { label: '待处理', color: 'bg-yellow-500', icon: ClockIcon },
  PROCESSING: { label: '处理中', color: 'bg-blue-500', icon: ClockIcon },
  COMPLETED: { label: '已完成', color: 'bg-green-500', icon: CheckCircleIcon },
  CANCELLED: { label: '已取消', color: 'bg-red-500', icon: XCircleIcon },
};

// 支付状态映射
const paymentStatusMap = {
  PENDING: { label: '待支付', color: 'bg-yellow-500', icon: ClockIcon },
  PAID: { label: '已支付', color: 'bg-green-500', icon: CheckCircleIcon },
  FAILED: { label: '支付失败', color: 'bg-red-500', icon: XCircleIcon },
  REFUNDED: { label: '已退款', color: 'bg-gray-500', icon: AlertCircleIcon },
};

// 支付方式映射
const paymentMethodMap = {
  ALIPAY: '支付宝',
  WECHAT: '微信支付',
  CREDIT_CARD: '信用卡',
};

// 包装函数，处理取消订单的返回值
async function handleCancelOrder(orderId: string, formData: FormData) {
  const result = await cancelOrder(orderId);
  if (result.error) {
    toast({
      title: '取消失败',
      description: result.error,
      variant: 'destructive',
    });
  } else {
    toast({
      title: '取消成功',
      description: '订单已成功取消',
    });
  }
}

// 包装函数，处理支付订单的返回值
async function handlePayOrder(orderId: string, formData: FormData) {
  const result = await payOrder(orderId);
  if (result.error) {
    toast({
      title: '支付失败',
      description: result.error,
      variant: 'destructive',
    });
  } else {
    toast({
      title: '支付成功',
      description: '订单已成功支付',
    });
  }
}

interface OrderDetailPageProps {
  params: {
    id: string;
  };
}

export default async function OrderDetailPage({ params }: OrderDetailPageProps) {
  const session = await getServerSession(authOptions);
  
  if (!session || !session.user) {
    redirect('/login');
  }
  
  const { order, error } = await getOrderDetail(params.id);
  
  if (error || !order) {
    return (
      <div className="container mx-auto py-10">
        <div className="flex flex-col items-center justify-center min-h-[60vh]">
          <h1 className="text-2xl font-bold">获取订单详情失败</h1>
          <p className="text-muted-foreground">{error}</p>
          <Button asChild className="mt-4">
            <Link href="/dashboard/orders">返回订单列表</Link>
          </Button>
        </div>
      </div>
    );
  }
  
  // 获取状态对应的图标组件
  const PaymentStatusIcon = paymentStatusMap[order.paymentStatus].icon;
  
  return (
    <div className="container mx-auto py-10">
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <Button variant="outline" size="icon" asChild>
              <Link href="/dashboard/orders">
                <ArrowLeftIcon className="h-4 w-4" />
              </Link>
            </Button>
            <h2 className="text-3xl font-bold tracking-tight">订单详情</h2>
          </div>
          <Badge className={orderStatusMap[order.status].color}>
            {orderStatusMap[order.status].label}
          </Badge>
        </div>
        
        <Separator />
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* 订单基本信息 */}
          <Card className="md:col-span-2">
            <CardHeader>
              <CardTitle>订单信息</CardTitle>
              <CardDescription>订单号: {order.id}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <div className="text-sm text-muted-foreground">服务类型</div>
                  <div className="font-medium">{order.serviceType?.name || '未知服务'}</div>
                </div>
                <div className="space-y-2">
                  <div className="text-sm text-muted-foreground">订单金额</div>
                  <div className="font-medium">¥{order.amount.toFixed(2)}</div>
                </div>
                <div className="space-y-2">
                  <div className="text-sm text-muted-foreground">支付方式</div>
                  <div className="font-medium">{paymentMethodMap[order.paymentMethod] || order.paymentMethod}</div>
                </div>
                <div className="space-y-2">
                  <div className="text-sm text-muted-foreground">支付状态</div>
                  <div className="flex items-center space-x-2">
                    <PaymentStatusIcon className="h-4 w-4" />
                    <span>{paymentStatusMap[order.paymentStatus].label}</span>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="text-sm text-muted-foreground">创建时间</div>
                  <div className="font-medium">{new Date(order.createdAt).toLocaleString('zh-CN')}</div>
                </div>
                {order.completedAt && (
                  <div className="space-y-2">
                    <div className="text-sm text-muted-foreground">完成时间</div>
                    <div className="font-medium">{new Date(order.completedAt).toLocaleString('zh-CN')}</div>
                  </div>
                )}
              </div>
              
              {order.serviceType?.description && (
                <div className="pt-4 border-t">
                  <div className="text-sm text-muted-foreground mb-2">服务描述</div>
                  <p>{order.serviceType.description}</p>
                </div>
              )}
            </CardContent>
            <CardFooter className="flex justify-end space-x-2">
              {order.status === 'PENDING' && (
                <>
                  <form action={handleCancelOrder.bind(null, order.id)}>
                    <Button variant="outline" type="submit">取消订单</Button>
                  </form>
                  {order.paymentStatus === 'PENDING' && (
                    <form action={handlePayOrder.bind(null, order.id)}>
                      <Button type="submit">立即支付</Button>
                    </form>
                  )}
                </>
              )}
            </CardFooter>
          </Card>
          
          {/* 分析报告列表 */}
          <Card>
            <CardHeader>
              <CardTitle>分析报告</CardTitle>
              <CardDescription>订单相关的分析报告</CardDescription>
            </CardHeader>
            <CardContent>
              {order.analyses && order.analyses.length > 0 ? (
                <div className="space-y-4">
                  {order.analyses.map((analysis) => (
                    <div key={analysis.id} className="border rounded-md p-4">
                      <div className="flex justify-between items-center">
                        <div className="font-medium">{analysis.type}</div>
                        <Badge variant="outline">分析报告</Badge>
                      </div>
                      <div className="text-sm text-muted-foreground mt-2">
                        创建时间: {new Date(analysis.createdAt).toLocaleDateString('zh-CN')}
                      </div>
                      <Button variant="outline" size="sm" className="mt-4" asChild>
                        <Link href={`/dashboard/${analysis.type.toLowerCase()}/${analysis.id}`}>
                          查看报告
                        </Link>
                      </Button>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8 text-muted-foreground">
                  暂无分析报告
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
} 