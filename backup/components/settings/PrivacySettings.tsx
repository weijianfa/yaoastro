'use client';

import { useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { updatePrivacySettings } from '@/app/actions/user';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Switch } from '@/components/ui/switch';
import { toast } from '@/components/ui/use-toast';
import { Loader2, Shield, Lock, Eye } from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';

interface PrivacySettingsProps {
  user: any;
  settings: any;
}

const formSchema = z.object({
  profileVisibility: z.enum(['PUBLIC', 'PRIVATE', 'FRIENDS']),
  dataCollection: z.boolean(),
  activityTracking: z.boolean(),
  twoFactorAuth: z.boolean(),
});

export default function PrivacySettings({ user, settings }: PrivacySettingsProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      profileVisibility: settings?.privacy?.profileVisibility || 'PRIVATE',
      dataCollection: settings?.privacy?.dataCollection ?? false,
      activityTracking: settings?.privacy?.activityTracking ?? true,
      twoFactorAuth: settings?.privacy?.twoFactorAuth ?? false,
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSubmitting(true);

    try {
      const result = await updatePrivacySettings(values);

      if (result.error) {
        toast({
          title: '更新失败',
          description: result.error,
          variant: 'destructive',
        });
      } else {
        toast({
          title: '更新成功',
          description: '您的隐私设置已更新',
        });
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
      <div>
        <h3 className="text-lg font-medium">隐私与安全</h3>
        <p className="text-sm text-muted-foreground">
          管理您的隐私设置和账号安全选项。
        </p>
      </div>

      <Separator />

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Eye className="h-5 w-5" />
                  隐私设置
                </CardTitle>
                <CardDescription>
                  管理您的个人资料隐私和数据收集选项
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <FormField
                  control={form.control}
                  name="profileVisibility"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>个人资料可见性</FormLabel>
                      <div className="space-y-2">
                        <FormControl>
                          <div className="flex items-center space-x-2">
                            <input
                              type="radio"
                              id="public"
                              value="PUBLIC"
                              checked={field.value === 'PUBLIC'}
                              onChange={() => field.onChange('PUBLIC')}
                              className="h-4 w-4"
                            />
                            <label htmlFor="public" className="text-sm font-medium">
                              公开 - 所有人可见
                            </label>
                          </div>
                        </FormControl>
                        <FormControl>
                          <div className="flex items-center space-x-2">
                            <input
                              type="radio"
                              id="friends"
                              value="FRIENDS"
                              checked={field.value === 'FRIENDS'}
                              onChange={() => field.onChange('FRIENDS')}
                              className="h-4 w-4"
                            />
                            <label htmlFor="friends" className="text-sm font-medium">
                              好友 - 仅好友可见
                            </label>
                          </div>
                        </FormControl>
                        <FormControl>
                          <div className="flex items-center space-x-2">
                            <input
                              type="radio"
                              id="private"
                              value="PRIVATE"
                              checked={field.value === 'PRIVATE'}
                              onChange={() => field.onChange('PRIVATE')}
                              className="h-4 w-4"
                            />
                            <label htmlFor="private" className="text-sm font-medium">
                              私密 - 仅自己可见
                            </label>
                          </div>
                        </FormControl>
                      </div>
                      <FormDescription>
                        控制谁可以查看您的个人资料信息
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="dataCollection"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                      <div className="space-y-0.5">
                        <FormLabel className="text-base">数据收集</FormLabel>
                        <FormDescription>
                          允许收集使用数据以改进服务
                        </FormDescription>
                      </div>
                      <FormControl>
                        <Switch
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="activityTracking"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                      <div className="space-y-0.5">
                        <FormLabel className="text-base">活动追踪</FormLabel>
                        <FormDescription>
                          允许追踪您的活动以提供个性化体验
                        </FormDescription>
                      </div>
                      <FormControl>
                        <Switch
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="h-5 w-5" />
                  安全设置
                </CardTitle>
                <CardDescription>
                  管理您的账号安全选项
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <FormField
                  control={form.control}
                  name="twoFactorAuth"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                      <div className="space-y-0.5">
                        <FormLabel className="text-base">两步验证</FormLabel>
                        <FormDescription>
                          启用两步验证以增强账号安全性
                        </FormDescription>
                      </div>
                      <FormControl>
                        <Switch
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />

                <div className="space-y-2">
                  <h4 className="text-sm font-medium">登录设备</h4>
                  <p className="text-sm text-muted-foreground">
                    管理您的登录设备和会话
                  </p>
                  <Button variant="outline" size="sm" className="mt-2">
                    查看登录设备
                  </Button>
                </div>

                <div className="space-y-2">
                  <h4 className="text-sm font-medium">密码安全</h4>
                  <p className="text-sm text-muted-foreground">
                    定期更新您的密码以保护账号安全
                  </p>
                  <Button variant="outline" size="sm" className="mt-2">
                    更改密码
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="flex justify-end">
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  保存中...
                </>
              ) : (
                '保存设置'
              )}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
} 