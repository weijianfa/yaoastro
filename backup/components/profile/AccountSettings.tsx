'use client';

import { useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { updateUserPassword } from '@/app/actions/user';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { toast } from '@/components/ui/use-toast';
import { Loader2 } from 'lucide-react';
import { Switch } from '@/components/ui/switch';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';

interface AccountSettingsProps {
  user: any;
}

const passwordFormSchema = z.object({
  currentPassword: z.string().min(1, '请输入当前密码'),
  newPassword: z.string().min(8, '新密码至少需要8个字符'),
  confirmPassword: z.string().min(1, '请确认新密码'),
}).refine((data) => data.newPassword === data.confirmPassword, {
  message: '两次输入的密码不一致',
  path: ['confirmPassword'],
});

export default function AccountSettings({ user }: AccountSettingsProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [marketingEmails, setMarketingEmails] = useState(false);

  const form = useForm<z.infer<typeof passwordFormSchema>>({
    resolver: zodResolver(passwordFormSchema),
    defaultValues: {
      currentPassword: '',
      newPassword: '',
      confirmPassword: '',
    },
  });

  async function onSubmit(values: z.infer<typeof passwordFormSchema>) {
    setIsSubmitting(true);

    try {
      const result = await updateUserPassword({
        currentPassword: values.currentPassword,
        newPassword: values.newPassword,
      });

      if (result.error) {
        toast({
          title: '更新失败',
          description: result.error,
          variant: 'destructive',
        });
      } else {
        toast({
          title: '更新成功',
          description: '您的密码已更新',
        });
        form.reset();
      }
    } catch (error) {
      toast({
        title: '更新失败',
        description: '发生错误，请稍后再试',
        variant: 'destructive',
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>修改密码</CardTitle>
          <CardDescription>
            更新您的账号密码。
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="currentPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>当前密码</FormLabel>
                    <FormControl>
                      <Input type="password" placeholder="请输入当前密码" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="newPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>新密码</FormLabel>
                    <FormControl>
                      <Input type="password" placeholder="请输入新密码" {...field} />
                    </FormControl>
                    <FormDescription>
                      密码至少需要8个字符。
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="confirmPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>确认新密码</FormLabel>
                    <FormControl>
                      <Input type="password" placeholder="请再次输入新密码" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    更新中...
                  </>
                ) : (
                  '更新密码'
                )}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>通知设置</CardTitle>
          <CardDescription>
            管理您的通知偏好。
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <h3 className="text-base font-medium">电子邮件通知</h3>
              <p className="text-sm text-muted-foreground">
                接收关于您的账号和订单的电子邮件通知。
              </p>
            </div>
            <Switch
              checked={emailNotifications}
              onCheckedChange={setEmailNotifications}
            />
          </div>
          
          <Separator />
          
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <h3 className="text-base font-medium">营销邮件</h3>
              <p className="text-sm text-muted-foreground">
                接收关于新功能、优惠和活动的电子邮件。
              </p>
            </div>
            <Switch
              checked={marketingEmails}
              onCheckedChange={setMarketingEmails}
            />
          </div>
        </CardContent>
        <CardFooter>
          <Button variant="outline" className="w-full">
            保存通知设置
          </Button>
        </CardFooter>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>账号安全</CardTitle>
          <CardDescription>
            管理您的账号安全选项。
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <h3 className="text-base font-medium">两步验证</h3>
              <p className="text-sm text-muted-foreground">
                启用两步验证以增强账号安全性。
              </p>
            </div>
            <Button variant="outline">设置</Button>
          </div>
          
          <Separator />
          
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <h3 className="text-base font-medium">登录设备</h3>
              <p className="text-sm text-muted-foreground">
                管理您的登录设备和会话。
              </p>
            </div>
            <Button variant="outline">查看</Button>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-destructive">危险区域</CardTitle>
          <CardDescription>
            这些操作不可逆，请谨慎操作。
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <h3 className="text-base font-medium">删除账号</h3>
              <p className="text-sm text-muted-foreground">
                永久删除您的账号和所有相关数据。
              </p>
            </div>
            <Button variant="destructive">删除账号</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
} 