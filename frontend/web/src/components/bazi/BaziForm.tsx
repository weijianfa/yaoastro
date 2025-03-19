'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { createBaziAnalysis } from '@/app/actions/bazi';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Textarea } from '@/components/ui/textarea';
import { toast } from '@/components/ui/use-toast';
import { Loader2 } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

// 生成年份选项（1900-当前年份）
const generateYearOptions = () => {
  const currentYear = new Date().getFullYear();
  const years = [];
  for (let year = 1900; year <= currentYear; year++) {
    years.push(year);
  }
  return years;
};

// 生成月份选项（1-12）
const generateMonthOptions = () => {
  return Array.from({ length: 12 }, (_, i) => i + 1);
};

// 生成日期选项（1-31）
const generateDayOptions = () => {
  return Array.from({ length: 31 }, (_, i) => i + 1);
};

// 生成时辰选项
const generateHourOptions = () => {
  return [
    { value: '子时', label: '子时 (23:00-01:00)' },
    { value: '丑时', label: '丑时 (01:00-03:00)' },
    { value: '寅时', label: '寅时 (03:00-05:00)' },
    { value: '卯时', label: '卯时 (05:00-07:00)' },
    { value: '辰时', label: '辰时 (07:00-09:00)' },
    { value: '巳时', label: '巳时 (09:00-11:00)' },
    { value: '午时', label: '午时 (11:00-13:00)' },
    { value: '未时', label: '未时 (13:00-15:00)' },
    { value: '申时', label: '申时 (15:00-17:00)' },
    { value: '酉时', label: '酉时 (17:00-19:00)' },
    { value: '戌时', label: '戌时 (19:00-21:00)' },
    { value: '亥时', label: '亥时 (21:00-23:00)' },
  ];
};

const formSchema = z.object({
  year: z.string().min(1, '请选择出生年份'),
  month: z.string().min(1, '请选择出生月份'),
  day: z.string().min(1, '请选择出生日期'),
  hour: z.string().min(1, '请选择出生时辰'),
  gender: z.enum(['MALE', 'FEMALE'], {
    required_error: '请选择性别',
  }),
  question: z.string().max(500, '问题不能超过500个字符').optional(),
});

export default function BaziForm() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      year: '',
      month: '',
      day: '',
      hour: '',
      gender: 'MALE',
      question: '',
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSubmitting(true);

    try {
      const formData = new FormData();
      formData.append('year', values.year);
      formData.append('month', values.month);
      formData.append('day', values.day);
      formData.append('hour', values.hour);
      formData.append('gender', values.gender);
      if (values.question) {
        formData.append('question', values.question);
      }

      const result = await createBaziAnalysis(formData);

      if (result.error) {
        toast({
          title: '提交失败',
          description: result.error,
          variant: 'destructive',
        });
      } else if (result.success && result.analysisId) {
        toast({
          title: '八字命理分析完成',
          description: '您的八字命理分析结果已生成',
        });
        router.push(`/dashboard/bazi/${result.analysisId}`);
      }
    } catch (error) {
      toast({
        title: '提交失败',
        description: '发生错误，请稍后再试',
        variant: 'destructive',
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <CardContent className="pt-6">
              <div className="space-y-4">
                <h3 className="text-lg font-medium">出生信息</h3>
                
                <FormField
                  control={form.control}
                  name="year"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>出生年份</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="选择年份" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {generateYearOptions().map((year) => (
                            <SelectItem key={year} value={year.toString()}>
                              {year}年
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="month"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>出生月份</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="选择月份" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {generateMonthOptions().map((month) => (
                            <SelectItem key={month} value={month.toString()}>
                              {month}月
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="day"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>出生日期</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="选择日期" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {generateDayOptions().map((day) => (
                            <SelectItem key={day} value={day.toString()}>
                              {day}日
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="hour"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>出生时辰</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="选择时辰" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {generateHourOptions().map((hour) => (
                            <SelectItem key={hour.value} value={hour.value}>
                              {hour.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="space-y-4">
                <h3 className="text-lg font-medium">个人信息</h3>
                
                <FormField
                  control={form.control}
                  name="gender"
                  render={({ field }) => (
                    <FormItem className="space-y-3">
                      <FormLabel>性别</FormLabel>
                      <FormControl>
                        <RadioGroup
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                          className="flex space-x-4"
                        >
                          <FormItem className="flex items-center space-x-2">
                            <FormControl>
                              <RadioGroupItem value="MALE" />
                            </FormControl>
                            <FormLabel className="font-normal cursor-pointer">
                              男
                            </FormLabel>
                          </FormItem>
                          <FormItem className="flex items-center space-x-2">
                            <FormControl>
                              <RadioGroupItem value="FEMALE" />
                            </FormControl>
                            <FormLabel className="font-normal cursor-pointer">
                              女
                            </FormLabel>
                          </FormItem>
                        </RadioGroup>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="question"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>您想了解的问题（可选）</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="例如：事业发展、婚姻状况、财运等"
                          className="min-h-[120px]"
                          {...field}
                        />
                      </FormControl>
                      <FormDescription>
                        您可以提出具体的问题，我们将在分析中重点关注这些方面。
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </CardContent>
          </Card>
        </div>

        <Button type="submit" className="w-full" disabled={isSubmitting}>
          {isSubmitting ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              分析中...
            </>
          ) : (
            '开始分析'
          )}
        </Button>
      </form>
    </Form>
  );
} 