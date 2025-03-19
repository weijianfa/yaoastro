'use client';

import { useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { updateAppearanceSettings } from '@/app/actions/user';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { toast } from '@/components/ui/use-toast';
import { Loader2, Moon, Sun, Monitor } from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import { Card, CardContent } from '@/components/ui/card';

interface AppearanceSettingsProps {
  user: any;
  settings: any;
}

const formSchema = z.object({
  theme: z.enum(['LIGHT', 'DARK', 'SYSTEM']),
  fontSize: z.enum(['SMALL', 'MEDIUM', 'LARGE']),
  colorScheme: z.enum(['DEFAULT', 'PURPLE', 'BLUE', 'GREEN', 'ORANGE']),
  reducedMotion: z.boolean(),
});

export default function AppearanceSettings({ user, settings }: AppearanceSettingsProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      theme: settings?.appearance?.theme || 'SYSTEM',
      fontSize: settings?.appearance?.fontSize || 'MEDIUM',
      colorScheme: settings?.appearance?.colorScheme || 'DEFAULT',
      reducedMotion: settings?.appearance?.reducedMotion ?? false,
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSubmitting(true);

    try {
      const result = await updateAppearanceSettings(values);

      if (result.error) {
        toast({
          title: '更新失败',
          description: result.error,
          variant: 'destructive',
        });
      } else {
        toast({
          title: '更新成功',
          description: '您的外观设置已更新',
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
        <h3 className="text-lg font-medium">外观设置</h3>
        <p className="text-sm text-muted-foreground">
          自定义应用的外观和主题。
        </p>
      </div>

      <Separator />

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="theme"
            render={({ field }) => (
              <FormItem className="space-y-4">
                <FormLabel>主题</FormLabel>
                <FormControl>
                  <RadioGroup
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    className="grid grid-cols-1 md:grid-cols-3 gap-4"
                  >
                    <Card className={`cursor-pointer border-2 ${field.value === 'LIGHT' ? 'border-primary' : 'border-muted'}`}>
                      <CardContent className="p-4 flex flex-col items-center justify-center space-y-2">
                        <Sun className="h-6 w-6" />
                        <FormLabel className="cursor-pointer">
                          <RadioGroupItem value="LIGHT" className="sr-only" />
                          浅色模式
                        </FormLabel>
                      </CardContent>
                    </Card>
                    <Card className={`cursor-pointer border-2 ${field.value === 'DARK' ? 'border-primary' : 'border-muted'}`}>
                      <CardContent className="p-4 flex flex-col items-center justify-center space-y-2">
                        <Moon className="h-6 w-6" />
                        <FormLabel className="cursor-pointer">
                          <RadioGroupItem value="DARK" className="sr-only" />
                          深色模式
                        </FormLabel>
                      </CardContent>
                    </Card>
                    <Card className={`cursor-pointer border-2 ${field.value === 'SYSTEM' ? 'border-primary' : 'border-muted'}`}>
                      <CardContent className="p-4 flex flex-col items-center justify-center space-y-2">
                        <Monitor className="h-6 w-6" />
                        <FormLabel className="cursor-pointer">
                          <RadioGroupItem value="SYSTEM" className="sr-only" />
                          跟随系统
                        </FormLabel>
                      </CardContent>
                    </Card>
                  </RadioGroup>
                </FormControl>
                <FormDescription>
                  选择您偏好的主题模式。
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="fontSize"
            render={({ field }) => (
              <FormItem>
                <FormLabel>字体大小</FormLabel>
                <FormControl>
                  <RadioGroup
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    className="flex space-x-4"
                  >
                    <FormItem className="flex items-center space-x-2">
                      <FormControl>
                        <RadioGroupItem value="SMALL" />
                      </FormControl>
                      <FormLabel className="font-normal cursor-pointer text-sm">
                        小
                      </FormLabel>
                    </FormItem>
                    <FormItem className="flex items-center space-x-2">
                      <FormControl>
                        <RadioGroupItem value="MEDIUM" />
                      </FormControl>
                      <FormLabel className="font-normal cursor-pointer">
                        中
                      </FormLabel>
                    </FormItem>
                    <FormItem className="flex items-center space-x-2">
                      <FormControl>
                        <RadioGroupItem value="LARGE" />
                      </FormControl>
                      <FormLabel className="font-normal cursor-pointer text-lg">
                        大
                      </FormLabel>
                    </FormItem>
                  </RadioGroup>
                </FormControl>
                <FormDescription>
                  调整应用的字体大小。
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="colorScheme"
            render={({ field }) => (
              <FormItem>
                <FormLabel>颜色方案</FormLabel>
                <FormControl>
                  <RadioGroup
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    className="grid grid-cols-2 md:grid-cols-5 gap-4"
                  >
                    <FormItem className="flex flex-col items-center space-y-2">
                      <FormControl>
                        <div className={`h-10 w-10 rounded-full bg-primary ${field.value === 'DEFAULT' ? 'ring-2 ring-offset-2 ring-primary' : ''}`}>
                          <RadioGroupItem value="DEFAULT" className="sr-only" />
                        </div>
                      </FormControl>
                      <FormLabel className="font-normal cursor-pointer text-xs">
                        默认
                      </FormLabel>
                    </FormItem>
                    <FormItem className="flex flex-col items-center space-y-2">
                      <FormControl>
                        <div className={`h-10 w-10 rounded-full bg-purple-500 ${field.value === 'PURPLE' ? 'ring-2 ring-offset-2 ring-purple-500' : ''}`}>
                          <RadioGroupItem value="PURPLE" className="sr-only" />
                        </div>
                      </FormControl>
                      <FormLabel className="font-normal cursor-pointer text-xs">
                        紫色
                      </FormLabel>
                    </FormItem>
                    <FormItem className="flex flex-col items-center space-y-2">
                      <FormControl>
                        <div className={`h-10 w-10 rounded-full bg-blue-500 ${field.value === 'BLUE' ? 'ring-2 ring-offset-2 ring-blue-500' : ''}`}>
                          <RadioGroupItem value="BLUE" className="sr-only" />
                        </div>
                      </FormControl>
                      <FormLabel className="font-normal cursor-pointer text-xs">
                        蓝色
                      </FormLabel>
                    </FormItem>
                    <FormItem className="flex flex-col items-center space-y-2">
                      <FormControl>
                        <div className={`h-10 w-10 rounded-full bg-green-500 ${field.value === 'GREEN' ? 'ring-2 ring-offset-2 ring-green-500' : ''}`}>
                          <RadioGroupItem value="GREEN" className="sr-only" />
                        </div>
                      </FormControl>
                      <FormLabel className="font-normal cursor-pointer text-xs">
                        绿色
                      </FormLabel>
                    </FormItem>
                    <FormItem className="flex flex-col items-center space-y-2">
                      <FormControl>
                        <div className={`h-10 w-10 rounded-full bg-orange-500 ${field.value === 'ORANGE' ? 'ring-2 ring-offset-2 ring-orange-500' : ''}`}>
                          <RadioGroupItem value="ORANGE" className="sr-only" />
                        </div>
                      </FormControl>
                      <FormLabel className="font-normal cursor-pointer text-xs">
                        橙色
                      </FormLabel>
                    </FormItem>
                  </RadioGroup>
                </FormControl>
                <FormDescription>
                  选择应用的主色调。
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="reducedMotion"
            render={({ field }) => (
              <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                <FormControl>
                  <div className="flex h-5 items-center">
                    <input
                      type="checkbox"
                      checked={field.value}
                      onChange={field.onChange}
                      className="h-4 w-4"
                    />
                  </div>
                </FormControl>
                <div className="space-y-1 leading-none">
                  <FormLabel>
                    减少动画
                  </FormLabel>
                  <FormDescription>
                    减少界面动画效果，提高可访问性。
                  </FormDescription>
                </div>
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
              '保存设置'
            )}
          </Button>
        </form>
      </Form>
    </div>
  );
} 