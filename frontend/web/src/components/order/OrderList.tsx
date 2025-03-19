'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter, usePathname, useSearchParams } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from '@/components/ui/pagination';
import { formatDate, formatCurrency } from '@/lib/utils';
import { Eye } from 'lucide-react';

interface OrderListProps {
  orders: any[];
  currentPage: number;
  totalPages: number;
  totalOrders: number;
}

export default function OrderList({ orders, currentPage, totalPages, totalOrders }: OrderListProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  
  // 构建分页链接
  const createPageURL = (pageNumber: number) => {
    const params = new URLSearchParams(searchParams);
    params.set('page', pageNumber.toString());
    return `${pathname}?${params.toString()}`;
  };
  
  // 获取订单状态的样式
  const getOrderStatusBadge = (status: string) => {
    switch (status) {
      case 'PENDING':
        return <Badge variant="outline" className="bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300">待处理</Badge>;
      case 'PROCESSING':
        return <Badge variant="outline" className="bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300">处理中</Badge>;
      case 'COMPLETED':
        return <Badge variant="outline" className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300">已完成</Badge>;
      case 'CANCELLED':
        return <Badge variant="outline" className="bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300">已取消</Badge>;
      default:
        return <Badge variant="outline">未知</Badge>;
    }
  };
  
  // 获取支付状态的样式
  const getPaymentStatusBadge = (status: string) => {
    switch (status) {
      case 'PENDING':
        return <Badge variant="outline" className="bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300">待支付</Badge>;
      case 'PAID':
        return <Badge variant="outline" className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300">已支付</Badge>;
      case 'FAILED':
        return <Badge variant="outline" className="bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300">支付失败</Badge>;
      case 'REFUNDED':
        return <Badge variant="outline" className="bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300">已退款</Badge>;
      default:
        return <Badge variant="outline">未知</Badge>;
    }
  };
  
  // 获取订单类型的显示文本
  const getOrderTypeText = (type: string) => {
    switch (type) {
      case 'SERVICE':
        return '服务';
      case 'MEMBERSHIP':
        return '会员';
      default:
        return '未知';
    }
  };
  
  if (orders.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground mb-4">暂无订单记录</p>
      </div>
    );
  }
  
  return (
    <div className="space-y-4">
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>订单编号</TableHead>
              <TableHead>服务类型</TableHead>
              <TableHead>金额</TableHead>
              <TableHead>订单状态</TableHead>
              <TableHead>支付状态</TableHead>
              <TableHead>创建时间</TableHead>
              <TableHead className="text-right">操作</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {orders.map((order) => (
              <TableRow key={order.id}>
                <TableCell className="font-medium">{order.id.substring(0, 8)}</TableCell>
                <TableCell>{order.serviceType?.name || getOrderTypeText(order.orderType)}</TableCell>
                <TableCell>{formatCurrency(order.amount)}</TableCell>
                <TableCell>{getOrderStatusBadge(order.status)}</TableCell>
                <TableCell>{getPaymentStatusBadge(order.paymentStatus)}</TableCell>
                <TableCell>{formatDate(order.createdAt)}</TableCell>
                <TableCell className="text-right">
                  <Button variant="ghost" size="icon" asChild>
                    <Link href={`/dashboard/orders/${order.id}`}>
                      <Eye className="h-4 w-4" />
                    </Link>
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      
      {totalPages > 1 && (
        <div className="flex items-center justify-between">
          <p className="text-sm text-muted-foreground">
            共 {totalOrders} 条记录，第 {currentPage} / {totalPages} 页
          </p>
          <Pagination>
            <PaginationContent>
              {currentPage > 1 && (
                <PaginationItem>
                  <PaginationPrevious href={createPageURL(currentPage - 1)} />
                </PaginationItem>
              )}
              
              {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                let pageNumber;
                if (totalPages <= 5) {
                  pageNumber = i + 1;
                } else if (currentPage <= 3) {
                  pageNumber = i + 1;
                } else if (currentPage >= totalPages - 2) {
                  pageNumber = totalPages - 4 + i;
                } else {
                  pageNumber = currentPage - 2 + i;
                }
                
                return (
                  <PaginationItem key={pageNumber}>
                    <PaginationLink 
                      href={createPageURL(pageNumber)}
                      isActive={currentPage === pageNumber}
                    >
                      {pageNumber}
                    </PaginationLink>
                  </PaginationItem>
                );
              })}
              
              {currentPage < totalPages && (
                <PaginationItem>
                  <PaginationNext href={createPageURL(currentPage + 1)} />
                </PaginationItem>
              )}
            </PaginationContent>
          </Pagination>
        </div>
      )}
    </div>
  );
} 