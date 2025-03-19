'use client';

import { useRouter, usePathname, useSearchParams } from 'next/navigation';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel } from '@/components/ui/form';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card } from '@/components/ui/card';

interface OrderFilterProps {
  currentStatus: string;
  currentType: string;
}

const formSchema = z.object({
  status: z.string(),
  type: z.string(),
});

export default function OrderFilter({ currentStatus, currentType }: OrderFilterProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      status: currentStatus,
      type: currentType,
    },
  });
  
  function onSubmit(values: z.infer<typeof formSchema>) {
    const params = new URLSearchParams(searchParams.toString());
    params.set('status', values.status);
    params.set('type', values.type);
    params.set('page', '1'); // 重置页码
    router.push(`${pathname}?${params.toString()}`);
  }
  
  return (
    <Card className="p-4 mb-6">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 md:space-y-0 md:flex md:items-end md:space-x-4">
          <FormField
            control={form.control}
            name="status"
            render={({ field }) => (
              <FormItem className="flex-1">
                <FormLabel>订单状态</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="选择订单状态" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="ALL">全部状态</SelectItem>
                    <SelectItem value="PENDING">待处理</SelectItem>
                    <SelectItem value="PROCESSING">处理中</SelectItem>
                    <SelectItem value="COMPLETED">已完成</SelectItem>
                    <SelectItem value="CANCELLED">已取消</SelectItem>
                  </SelectContent>
                </Select>
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="type"
            render={({ field }) => (
              <FormItem className="flex-1">
                <FormLabel>订单类型</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="选择订单类型" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="ALL">全部类型</SelectItem>
                    <SelectItem value="SERVICE">服务订单</SelectItem>
                    <SelectItem value="MEMBERSHIP">会员订单</SelectItem>
                  </SelectContent>
                </Select>
              </FormItem>
            )}
          />
          
          <Button type="submit" className="w-full md:w-auto">
            筛选
          </Button>
        </form>
      </Form>
    </Card>
  );
} 