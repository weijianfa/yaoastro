'use client';

import { useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { updateUserProfile } from '@/app/actions/user';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from '@/components/ui/use-toast';
import { Loader2 } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

interface ProfileFormProps {
  user: any;
  profile: any;
}

const formSchema = z.object({
  name: z.string().min(2, '姓名至少需要2个字符').optional(),
  phone: z.string().regex(/^1[3-9]\d{9}$/, '请输入有效的手机号码').optional(),
  birthDate: z.string().optional(),
  gender: z.enum(['MALE', 'FEMALE', 'OTHER']).optional(),
  location: z.string().optional(),
  bio: z.string().max(200, '个人简介不能超过200个字符').optional(),
});

export default function ProfileForm({ user, profile }: ProfileFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: user?.name || '',
      phone: profile?.phone || '',
      birthDate: profile?.birthDate ? new Date(profile.birthDate).toISOString().split('T')[0] : '',
      gender: profile?.gender || undefined,
      location: profile?.location || '',
      bio: profile?.bio || '',
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSubmitting(true);

    try {
      const result = await updateUserProfile(values);

      if (result.error) {
        toast({
          title: '更新失败',
          description: result.error,
          variant: 'destructive',
        });
      } else {
        toast({
          title: '更新成功',
          description: '您的个人资料已更新',
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
      <div className="flex items-center gap-6">
        <Avatar className="h-20 w-20">
          <AvatarImage src={user?.image || ''} alt={user?.name || '用户'} />
          <AvatarFallback>{user?.name?.charAt(0) || '用'}</AvatarFallback>
        </Avatar>
        <div>
          <h3 className="text-lg font-medium">{user?.name || '用户'}</h3>
          <p className="text-sm text-muted-foreground">{user?.email}</p>
        </div>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>姓名</FormLabel>
                <FormControl>
                  <Input placeholder="请输入您的姓名" {...field} />
                </FormControl>
                <FormDescription>
                  这是您的公开显示名称。
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem>
                <FormLabel>手机号码</FormLabel>
                <FormControl>
                  <Input placeholder="请输入您的手机号码" {...field} />
                </FormControl>
                <FormDescription>
                  用于接收通知和验证。
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="birthDate"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>出生日期</FormLabel>
                  <FormControl>
                    <Input type="date" {...field} />
                  </FormControl>
                  <FormDescription>
                    用于命理分析。
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="gender"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>性别</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="请选择性别" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="MALE">男</SelectItem>
                      <SelectItem value="FEMALE">女</SelectItem>
                      <SelectItem value="OTHER">其他</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormDescription>
                    用于个性化服务。
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name="location"
            render={({ field }) => (
              <FormItem>
                <FormLabel>所在地区</FormLabel>
                <FormControl>
                  <Input placeholder="请输入您的所在地区" {...field} />
                </FormControl>
                <FormDescription>
                  例如：北京市、上海市等。
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="bio"
            render={({ field }) => (
              <FormItem>
                <FormLabel>个人简介</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="请简单介绍一下自己"
                    className="resize-none"
                    {...field}
                  />
                </FormControl>
                <FormDescription>
                  最多200个字符。
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                保存中...
              </>
            ) : (
              '保存资料'
            )}
          </Button>
        </form>
      </Form>
    </div>
  );
} 