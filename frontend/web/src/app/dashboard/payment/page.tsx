"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { 
  CreditCard, 
  Wallet, 
  AlertCircle, 
  CheckCircle2, 
  ChevronLeft, 
  Gift, 
  ShieldCheck 
} from "lucide-react";

// 模拟订单数据
const mockOrder = {
  id: "ORD-2023-0006",
  service: "八字命理分析",
  price: 199,
  discount: 0,
  couponDiscount: 0,
  total: 199,
  date: new Date().toISOString().split('T')[0]
};

export default function PaymentPage() {
  const router = useRouter();
  
  // 状态
  const [order, setOrder] = useState(mockOrder);
  const [paymentMethod, setPaymentMethod] = useState("wechat");
  const [couponCode, setCouponCode] = useState("");
  const [couponApplied, setCouponApplied] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  
  // 应用优惠券
  const applyCoupon = () => {
    if (couponCode.toLowerCase() === "first10") {
      setOrder(prev => ({
        ...prev,
        couponDiscount: 10,
        total: prev.price - prev.discount - 10
      }));
      setCouponApplied(true);
    } else {
      alert("无效的优惠券代码");
    }
  };
  
  // 处理支付
  const handlePayment = () => {
    setIsProcessing(true);
    
    // 模拟支付处理
    setTimeout(() => {
      setIsProcessing(false);
      setPaymentSuccess(true);
      
      // 支付成功后3秒跳转到订单页面
      setTimeout(() => {
        router.push("/orders");
      }, 3000);
    }, 2000);
  };
  
  // 返回上一步
  const handleBack = () => {
    router.back();
  };
  
  return (
    <div className="container mx-auto py-8">
      <Button 
        variant="ghost" 
        className="mb-6 pl-0" 
        onClick={handleBack}
      >
        <ChevronLeft className="mr-2 h-4 w-4" />
        返回
      </Button>
      
      <h1 className="text-3xl font-bold mb-6">支付订单</h1>
      
      {!paymentSuccess ? (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* 订单信息 */}
          <div className="md:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>订单信息</CardTitle>
                <CardDescription>
                  订单号: {order.id}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="font-medium">{order.service}</h3>
                    <p className="text-sm text-muted-foreground">
                      下单日期: {order.date}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">¥{order.price}</p>
                  </div>
                </div>
                
                <Separator />
                
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>服务价格</span>
                    <span>¥{order.price}</span>
                  </div>
                  {order.discount > 0 && (
                    <div className="flex justify-between text-sm">
                      <span>活动折扣</span>
                      <span className="text-green-600">-¥{order.discount}</span>
                    </div>
                  )}
                  {order.couponDiscount > 0 && (
                    <div className="flex justify-between text-sm">
                      <span>优惠券</span>
                      <span className="text-green-600">-¥{order.couponDiscount}</span>
                    </div>
                  )}
                  <div className="flex justify-between font-medium pt-2">
                    <span>应付金额</span>
                    <span className="text-xl">¥{order.total}</span>
                  </div>
                </div>
                
                <Separator />
                
                <div className="space-y-4">
                  <h3 className="font-medium">使用优惠券</h3>
                  
                  {couponApplied ? (
                    <div className="flex items-center text-green-600">
                      <CheckCircle2 className="h-5 w-5 mr-2" />
                      <span>优惠券已应用，已减免 ¥{order.couponDiscount}</span>
                    </div>
                  ) : (
                    <div className="flex gap-2">
                      <Input 
                        placeholder="输入优惠券代码" 
                        value={couponCode}
                        onChange={(e) => setCouponCode(e.target.value)}
                      />
                      <Button 
                        variant="outline" 
                        onClick={applyCoupon}
                        disabled={!couponCode}
                      >
                        应用
                      </Button>
                    </div>
                  )}
                  
                  <div className="text-sm text-muted-foreground">
                    <Gift className="h-4 w-4 inline-block mr-1" />
                    提示: 使用优惠码 "FIRST10" 可获得¥10优惠
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
          
          {/* 支付方式 */}
          <div>
            <Card>
              <CardHeader>
                <CardTitle>选择支付方式</CardTitle>
                <CardDescription>
                  请选择您偏好的支付方式
                </CardDescription>
              </CardHeader>
              <CardContent>
                <RadioGroup 
                  value={paymentMethod} 
                  onValueChange={setPaymentMethod}
                  className="space-y-4"
                >
                  <div className="flex items-center space-x-2 border rounded-md p-3 cursor-pointer hover:bg-muted">
                    <RadioGroupItem value="wechat" id="wechat" />
                    <Label htmlFor="wechat" className="flex-1 cursor-pointer">
                      <div className="flex items-center">
                        <div className="w-8 h-8 bg-green-500 rounded-md flex items-center justify-center text-white mr-3">
                          W
                        </div>
                        <div>
                          <p className="font-medium">微信支付</p>
                          <p className="text-sm text-muted-foreground">使用微信扫码支付</p>
                        </div>
                      </div>
                    </Label>
                  </div>
                  
                  <div className="flex items-center space-x-2 border rounded-md p-3 cursor-pointer hover:bg-muted">
                    <RadioGroupItem value="alipay" id="alipay" />
                    <Label htmlFor="alipay" className="flex-1 cursor-pointer">
                      <div className="flex items-center">
                        <div className="w-8 h-8 bg-blue-500 rounded-md flex items-center justify-center text-white mr-3">
                          A
                        </div>
                        <div>
                          <p className="font-medium">支付宝</p>
                          <p className="text-sm text-muted-foreground">使用支付宝扫码支付</p>
                        </div>
                      </div>
                    </Label>
                  </div>
                  
                  <div className="flex items-center space-x-2 border rounded-md p-3 cursor-pointer hover:bg-muted">
                    <RadioGroupItem value="card" id="card" />
                    <Label htmlFor="card" className="flex-1 cursor-pointer">
                      <div className="flex items-center">
                        <div className="w-8 h-8 bg-gray-500 rounded-md flex items-center justify-center text-white mr-3">
                          <CreditCard className="h-4 w-4" />
                        </div>
                        <div>
                          <p className="font-medium">银行卡</p>
                          <p className="text-sm text-muted-foreground">使用银行卡支付</p>
                        </div>
                      </div>
                    </Label>
                  </div>
                </RadioGroup>
                
                <div className="mt-6 text-sm text-muted-foreground">
                  <ShieldCheck className="h-4 w-4 inline-block mr-1" />
                  所有支付信息均经过加密处理，确保您的支付安全
                </div>
              </CardContent>
              <CardFooter>
                <Button 
                  className="w-full" 
                  onClick={handlePayment}
                  disabled={isProcessing}
                >
                  {isProcessing ? (
                    <>
                      <div className="animate-spin mr-2 h-4 w-4 border-2 border-current border-t-transparent rounded-full" />
                      处理中...
                    </>
                  ) : (
                    <>
                      <Wallet className="mr-2 h-4 w-4" />
                      立即支付 ¥{order.total}
                    </>
                  )}
                </Button>
              </CardFooter>
            </Card>
          </div>
        </div>
      ) : (
        <Card className="max-w-md mx-auto">
          <CardContent className="pt-6 text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle2 className="h-8 w-8 text-green-600" />
            </div>
            <h2 className="text-2xl font-bold mb-2">支付成功</h2>
            <p className="text-muted-foreground mb-6">
              您的订单 {order.id} 已支付成功，我们将立即为您提供服务。
            </p>
            <div className="space-y-4">
              <div className="flex justify-between">
                <span>订单金额:</span>
                <span>¥{order.total}</span>
              </div>
              <div className="flex justify-between">
                <span>支付方式:</span>
                <span>
                  {paymentMethod === "wechat" && "微信支付"}
                  {paymentMethod === "alipay" && "支付宝"}
                  {paymentMethod === "card" && "银行卡"}
                </span>
              </div>
              <div className="flex justify-between">
                <span>交易时间:</span>
                <span>{new Date().toLocaleString()}</span>
              </div>
            </div>
            <p className="text-sm text-muted-foreground mt-6">
              正在跳转到订单页面...
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
} 