'use client';

import { useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { updateGeneralSettings } from '@/app/actions/user';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from '@/components/ui/use-toast';
import { Loader2 } from 'lucide-react';
import { Separator } from '@/components/ui/separator';

interface GeneralSettingsProps {
  user: any;
  settings: any;
}

const formSchema = z.object({
  language: z.string(),
  timezone: z.string(),
  dateFormat: z.string(),
  timeFormat: z.string(),
});

export default function GeneralSettings({ user, settings }: GeneralSettingsProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      language: settings?.language || 'zh-CN',
      timezone: settings?.timezone || 'Asia/Shanghai',
      dateFormat: settings?.dateFormat || 'YYYY-MM-DD',
      timeFormat: settings?.timeFormat || '24h',
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSubmitting(true);

    try {
      const result = await updateGeneralSettings(values);

      if (result.error) {
        toast({
          title: '更新失败',
          description: result.error,
          variant: 'destructive',
        });
      } else {
        toast({
          title: '更新成功',
          description: '您的设置已更新',
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
        <h3 className="text-lg font-medium">基本设置</h3>
        <p className="text-sm text-muted-foreground">
          管理您的基本账号设置和偏好。
        </p>
      </div>

      <Separator />

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="language"
            render={({ field }) => (
              <FormItem>
                <FormLabel>语言</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="选择语言" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="zh-CN">简体中文</SelectItem>
                    <SelectItem value="zh-TW">繁体中文</SelectItem>
                    <SelectItem value="en-US">English (US)</SelectItem>
                    <SelectItem value="ja-JP">日本語</SelectItem>
                    <SelectItem value="ko-KR">한국어</SelectItem>
                  </SelectContent>
                </Select>
                <FormDescription>
                  选择您偏好的语言。
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="timezone"
            render={({ field }) => (
              <FormItem>
                <FormLabel>时区</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="选择时区" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="Asia/Shanghai">中国标准时间 (GMT+8)</SelectItem>
                    <SelectItem value="Asia/Hong_Kong">香港时间 (GMT+8)</SelectItem>
                    <SelectItem value="Asia/Taipei">台北时间 (GMT+8)</SelectItem>
                    <SelectItem value="Asia/Tokyo">东京时间 (GMT+9)</SelectItem>
                    <SelectItem value="America/New_York">纽约时间 (GMT-5)</SelectItem>
                    <SelectItem value="Europe/London">伦敦时间 (GMT+0)</SelectItem>
                  </SelectContent>
                </Select>
                <FormDescription>
                  选择您所在的时区。
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormField
              control={form.control}
              name="dateFormat"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>日期格式</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="选择日期格式" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="YYYY-MM-DD">YYYY-MM-DD</SelectItem>
                      <SelectItem value="MM/DD/YYYY">MM/DD/YYYY</SelectItem>
                      <SelectItem value="DD/MM/YYYY">DD/MM/YYYY</SelectItem>
                      <SelectItem value="YYYY年MM月DD日">YYYY年MM月DD日</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="timeFormat"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>时间格式</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="选择时间格式" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="12h">12小时制 (AM/PM)</SelectItem>
                      <SelectItem value="24h">24小时制</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

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
        </form>
      </Form>
    </div>
  );
} 