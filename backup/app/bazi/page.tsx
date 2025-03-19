"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const formSchema = z.object({
  name: z.string().min(1, "姓名不能为空"),
  gender: z.enum(["MALE", "FEMALE"], {
    required_error: "请选择性别",
  }),
  birthDate: z.string().min(1, "出生日期不能为空"),
  birthTime: z.string().min(1, "出生时间不能为空"),
  birthPlace: z.string().min(1, "出生地点不能为空"),
});

export default function BaziPage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("basic");

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      gender: "MALE",
      birthDate: "",
      birthTime: "",
      birthPlace: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      // 这里可以添加提交表单的逻辑
      console.log(values);
      
      // 模拟提交后跳转到结果页面
      // 实际项目中应该是调用API后跳转
      router.push(`/bazi/result?name=${values.name}`);
    } catch (error) {
      console.error("提交表单时出错:", error);
    }
  }

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-3xl font-bold text-center mb-8 text-fortune-red">八字命理分析</h1>
      
      <div className="max-w-3xl mx-auto">
        <Tabs defaultValue="basic" value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="basic">基础分析</TabsTrigger>
            <TabsTrigger value="advanced">高级分析</TabsTrigger>
          </TabsList>
          
          <TabsContent value="basic">
            <Card>
              <CardHeader>
                <CardTitle>基础八字分析</CardTitle>
                <CardDescription>
                  通过您的出生信息，分析您的命格、五行属性、吉凶方位等基础信息。
                </CardDescription>
              </CardHeader>
              <CardContent>
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
                            请输入您的真实姓名，以获得更准确的分析结果
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
                          <FormControl>
                            <RadioGroup
                              onValueChange={field.onChange}
                              defaultValue={field.value}
                              className="flex flex-row space-x-4"
                            >
                              <FormItem className="flex items-center space-x-2 space-y-0">
                                <FormControl>
                                  <RadioGroupItem value="MALE" />
                                </FormControl>
                                <FormLabel className="font-normal">
                                  男
                                </FormLabel>
                              </FormItem>
                              <FormItem className="flex items-center space-x-2 space-y-0">
                                <FormControl>
                                  <RadioGroupItem value="FEMALE" />
                                </FormControl>
                                <FormLabel className="font-normal">
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
                      name="birthDate"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>出生日期</FormLabel>
                          <FormControl>
                            <Input type="date" {...field} />
                          </FormControl>
                          <FormDescription>
                            请选择您的公历出生日期
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="birthTime"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>出生时间</FormLabel>
                          <FormControl>
                            <Input type="time" {...field} />
                          </FormControl>
                          <FormDescription>
                            请尽量准确填写出生时间，时间越准确分析结果越精确
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="birthPlace"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>出生地点</FormLabel>
                          <FormControl>
                            <Input placeholder="例如：北京市朝阳区" {...field} />
                          </FormControl>
                          <FormDescription>
                            请填写详细的出生地点，包括省市区县
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <Button type="submit" className="w-full" variant="fortune">
                      开始分析
                    </Button>
                  </form>
                </Form>
              </CardContent>
              <CardFooter className="flex justify-between">
                <p className="text-sm text-gray-500">
                  基础分析为免费服务，分析结果仅供参考
                </p>
              </CardFooter>
            </Card>
          </TabsContent>
          
          <TabsContent value="advanced">
            <Card>
              <CardHeader>
                <CardTitle>高级八字分析</CardTitle>
                <CardDescription>
                  深入分析您的八字命盘，包括大运、流年、事业财运、婚姻、健康等多方面内容。
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="rounded-lg border p-4">
                    <h3 className="font-medium">VIP专业分析</h3>
                    <p className="text-sm text-gray-500 mt-2">
                      由专业命理师进行详细分析，包括八字命盘、大运流年、事业财运、婚姻健康等全方位内容。
                    </p>
                    <div className="mt-4 flex items-center justify-between">
                      <span className="text-fortune-red font-bold">¥199.00</span>
                      <Button variant="fortune" onClick={() => router.push("/dashboard")}>
                        立即购买
                      </Button>
                    </div>
                  </div>
                  
                  <div className="rounded-lg border p-4">
                    <h3 className="font-medium">AI智能分析</h3>
                    <p className="text-sm text-gray-500 mt-2">
                      使用先进AI技术，结合传统命理学，为您提供快速准确的八字分析报告。
                    </p>
                    <div className="mt-4 flex items-center justify-between">
                      <span className="text-fortune-red font-bold">¥99.00</span>
                      <Button variant="outline" onClick={() => setActiveTab("basic")}>
                        填写信息
                      </Button>
                    </div>
                  </div>
                  
                  <div className="rounded-lg border p-4">
                    <h3 className="font-medium">年度运势预测</h3>
                    <p className="text-sm text-gray-500 mt-2">
                      详细分析未来一年的流年运势，包括每月吉凶、财运、事业、感情等方面的变化。
                    </p>
                    <div className="mt-4 flex items-center justify-between">
                      <span className="text-fortune-red font-bold">¥149.00</span>
                      <Button variant="outline" onClick={() => setActiveTab("basic")}>
                        填写信息
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <p className="text-sm text-gray-500">
                  高级分析服务需要支付相应费用，分析结果将在24小时内发送到您的账户
                </p>
              </CardFooter>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
} 