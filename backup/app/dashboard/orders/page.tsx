import { Metadata } from 'next';
import { getUserOrders } from '@/app/actions/order';
import OrderList from '@/components/order/OrderList';
import OrderFilter from '@/components/order/OrderFilter';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export const metadata: Metadata = {
  title: '订单管理 | 爻星阁',
  description: '查看和管理您的订单记录。',
};

interface OrdersPageProps {
  searchParams: {
    status?: string;
    type?: string;
    page?: string;
    limit?: string;
  };
}

export default async function OrdersPage({ searchParams }: OrdersPageProps) {
  const status = searchParams.status || 'ALL';
  const type = searchParams.type || 'ALL';
  const page = parseInt(searchParams.page || '1');
  const limit = parseInt(searchParams.limit || '10');

  const { orders, totalOrders, totalPages, error } = await getUserOrders({
    status: status !== 'ALL' ? status : undefined,
    type: type !== 'ALL' ? type : undefined,
    page,
    limit,
  });

  return (
    <div className="container mx-auto py-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">订单管理</h1>
        <p className="text-muted-foreground">
          查看和管理您的订单记录。
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>订单列表</CardTitle>
          <CardDescription>
            您的所有订单记录
          </CardDescription>
        </CardHeader>
        <CardContent>
          <OrderFilter 
            currentStatus={status} 
            currentType={type} 
          />
          
          {error ? (
            <div className="text-center py-8">
              <p className="text-destructive">{error}</p>
            </div>
          ) : (
            <OrderList 
              orders={orders || []} 
              currentPage={page} 
              totalPages={totalPages || 1} 
              totalOrders={totalOrders || 0}
            />
          )}
        </CardContent>
      </Card>
    </div>
  );
} 