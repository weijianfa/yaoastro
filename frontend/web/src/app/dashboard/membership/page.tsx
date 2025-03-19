"use client";

import React, { useState } from "react";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { 
  Award, 
  Calendar, 
  CreditCard, 
  Gift, 
  History, 
  Star, 
  Ticket, 
  TrendingUp, 
  Users 
} from "lucide-react";

// 模拟会员数据
const mockMembershipData = {
  level: "黄金会员",
  points: 2580,
  nextLevel: "铂金会员",
  pointsToNextLevel: 920,
  expiryDate: "2024-12-31",
  joinDate: "2023-01-15",
  referrals: 3,
  transactions: [
    { id: 1, date: "2023-12-10", description: "八字命理分析", points: 199 },
    { id: 2, date: "2023-11-25", description: "会员续费", points: 500 },
    { id: 3, date: "2023-11-05", description: "推荐好友奖励", points: 100 },
    { id: 4, date: "2023-10-20", description: "塔罗牌占卜", points: 99 },
    { id: 5, date: "2023-10-01", description: "每日签到", points: 10 }
  ],
  benefits: [
    { id: 1, name: "专属折扣", description: "所有服务享受9折优惠", available: true },
    { id: 2, name: "生日礼遇", description: "生日当月获赠一次免费服务", available: true },
    { id: 3, name: "专属客服", description: "优先客服响应和处理", available: true },
    { id: 4, name: "高级内容", description: "解锁高级命理内容和教程", available: true },
    { id: 5, name: "免费咨询", description: "每月一次免费在线咨询", available: false }
  ],
  availableCoupons: [
    { id: 1, name: "生日优惠券", discount: "满300减50", expiry: "2024-05-15" },
    { id: 2, name: "会员专享券", discount: "八字分析8折", expiry: "2024-04-30" }
  ]
};

// 会员等级信息
const membershipLevels = [
  { 
    name: "普通会员", 
    pointsRequired: 0,
    benefits: ["基础服务折扣", "积分兑换", "每日签到奖励"]
  },
  { 
    name: "白银会员", 
    pointsRequired: 1000,
    benefits: ["9.5折优惠", "生日礼遇", "专属活动邀请"]
  },
  { 
    name: "黄金会员", 
    pointsRequired: 2000,
    benefits: ["9折优惠", "专属客服", "高级内容解锁", "每月赠送积分"]
  },
  { 
    name: "铂金会员", 
    pointsRequired: 3500,
    benefits: ["8.5折优惠", "每月免费咨询", "专属定制服务", "积分加速"]
  },
  { 
    name: "钻石会员", 
    pointsRequired: 5000,
    benefits: ["8折优惠", "无限客服支持", "专家一对一指导", "生日双倍积分", "专属礼品"]
  }
];

export default function MembershipPage() {
  const [membershipData, setMembershipData] = useState(mockMembershipData);
  
  // 计算到下一等级的进度百分比
  const progressPercentage = () => {
    const currentLevelIndex = membershipLevels.findIndex(level => level.name === membershipData.level);
    const currentLevelPoints = membershipLevels[currentLevelIndex].pointsRequired;
    const nextLevelPoints = membershipLevels[currentLevelIndex + 1].pointsRequired;
    const totalPointsNeeded = nextLevelPoints - currentLevelPoints;
    const pointsEarned = membershipData.points - currentLevelPoints;
    return Math.round((pointsEarned / totalPointsNeeded) * 100);
  };
  
  // 签到获取积分
  const handleCheckIn = () => {
    setMembershipData(prev => ({
      ...prev,
      points: prev.points + 10,
      transactions: [
        { 
          id: prev.transactions.length + 1, 
          date: new Date().toISOString().split('T')[0], 
          description: "每日签到", 
          points: 10 
        },
        ...prev.transactions
      ]
    }));
    alert("签到成功！获得10积分");
  };
  
  // 兑换优惠券
  const handleRedeemCoupon = () => {
    alert("优惠券兑换功能即将上线，敬请期待！");
  };
  
  // 邀请好友
  const handleInviteFriend = () => {
    alert("邀请链接已复制到剪贴板，分享给好友即可获得奖励！");
  };
  
  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-6">会员中心</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {/* 会员信息卡片 */}
        <Card className="md:col-span-2">
          <CardHeader className="pb-2">
            <div className="flex justify-between items-start">
              <div>
                <CardTitle className="text-2xl">
                  <Award className="h-6 w-6 inline-block mr-2 text-yellow-500" />
                  {membershipData.level}
                </CardTitle>
                <CardDescription>
                  会员有效期至: {membershipData.expiryDate}
                </CardDescription>
              </div>
              <Badge variant="outline" className="text-yellow-500 border-yellow-500">
                {membershipData.points} 积分
              </Badge>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span>距离 {membershipData.nextLevel} 还需 {membershipData.pointsToNextLevel} 积分</span>
                  <span>{progressPercentage()}%</span>
                </div>
                <Progress value={progressPercentage()} className="h-2" />
              </div>
              
              <div className="grid grid-cols-3 gap-4 pt-4">
                <div className="text-center">
                  <Calendar className="h-6 w-6 mx-auto mb-1 text-muted-foreground" />
                  <p className="text-sm font-medium">加入时间</p>
                  <p className="text-sm text-muted-foreground">{membershipData.joinDate}</p>
                </div>
                <div className="text-center">
                  <Users className="h-6 w-6 mx-auto mb-1 text-muted-foreground" />
                  <p className="text-sm font-medium">已邀请好友</p>
                  <p className="text-sm text-muted-foreground">{membershipData.referrals} 人</p>
                </div>
                <div className="text-center">
                  <TrendingUp className="h-6 w-6 mx-auto mb-1 text-muted-foreground" />
                  <p className="text-sm font-medium">本月积分</p>
                  <p className="text-sm text-muted-foreground">+{membershipData.transactions.slice(0, 3).reduce((sum, tx) => sum + tx.points, 0)}</p>
                </div>
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button variant="outline" onClick={handleCheckIn}>
              <Star className="h-4 w-4 mr-2" />
              每日签到
            </Button>
            <Button variant="outline" onClick={handleInviteFriend}>
              <Users className="h-4 w-4 mr-2" />
              邀请好友
            </Button>
            <Button variant="outline" onClick={handleRedeemCoupon}>
              <Ticket className="h-4 w-4 mr-2" />
              积分兑换
            </Button>
          </CardFooter>
        </Card>
        
        {/* 可用优惠券 */}
        <Card>
          <CardHeader>
            <CardTitle>
              <Gift className="h-5 w-5 inline-block mr-2" />
              可用优惠券
            </CardTitle>
            <CardDescription>
              您当前拥有 {membershipData.availableCoupons.length} 张优惠券
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {membershipData.availableCoupons.length > 0 ? (
                membershipData.availableCoupons.map(coupon => (
                  <div 
                    key={coupon.id} 
                    className="border rounded-md p-4 relative overflow-hidden"
                  >
                    <div className="absolute top-0 right-0 w-16 h-16 bg-primary/10 rounded-full -mt-8 -mr-8"></div>
                    <h3 className="font-medium">{coupon.name}</h3>
                    <p className="text-lg font-bold text-primary mt-1">{coupon.discount}</p>
                    <p className="text-xs text-muted-foreground mt-2">
                      有效期至: {coupon.expiry}
                    </p>
                  </div>
                ))
              ) : (
                <p className="text-center text-muted-foreground py-6">
                  暂无可用优惠券
                </p>
              )}
            </div>
          </CardContent>
          <CardFooter>
            <Button variant="outline" className="w-full">
              <CreditCard className="h-4 w-4 mr-2" />
              查看更多优惠
            </Button>
          </CardFooter>
        </Card>
      </div>
      
      <Tabs defaultValue="benefits" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="benefits">会员权益</TabsTrigger>
          <TabsTrigger value="levels">等级说明</TabsTrigger>
          <TabsTrigger value="history">积分记录</TabsTrigger>
        </TabsList>
        
        {/* 会员权益 */}
        <TabsContent value="benefits">
          <Card>
            <CardHeader>
              <CardTitle>我的会员权益</CardTitle>
              <CardDescription>
                {membershipData.level} 专属权益
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {membershipData.benefits.map(benefit => (
                  <div 
                    key={benefit.id} 
                    className={`flex items-start p-4 border rounded-md ${!benefit.available ? 'opacity-50' : ''}`}
                  >
                    <div className="mr-4 mt-0.5">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center ${benefit.available ? 'bg-primary/10 text-primary' : 'bg-muted text-muted-foreground'}`}>
                        <Award className="h-4 w-4" />
                      </div>
                    </div>
                    <div>
                      <h3 className="font-medium">{benefit.name}</h3>
                      <p className="text-sm text-muted-foreground">
                        {benefit.description}
                      </p>
                      {!benefit.available && (
                        <Badge variant="outline" className="mt-2">
                          下一等级解锁
                        </Badge>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        {/* 等级说明 */}
        <TabsContent value="levels">
          <Card>
            <CardHeader>
              <CardTitle>会员等级说明</CardTitle>
              <CardDescription>
                了解不同等级会员的权益和要求
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {membershipLevels.map((level, index) => (
                  <div key={index}>
                    <div className="flex items-center mb-2">
                      <h3 className="text-lg font-medium">{level.name}</h3>
                      <Badge className="ml-2" variant={level.name === membershipData.level ? "default" : "outline"}>
                        {level.pointsRequired} 积分
                      </Badge>
                      {level.name === membershipData.level && (
                        <Badge className="ml-2 bg-green-500">当前等级</Badge>
                      )}
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2 ml-4">
                      {level.benefits.map((benefit, i) => (
                        <div key={i} className="flex items-center">
                          <Star className="h-4 w-4 mr-2 text-yellow-500" />
                          <span className="text-sm">{benefit}</span>
                        </div>
                      ))}
                    </div>
                    {index < membershipLevels.length - 1 && <Separator className="my-4" />}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        {/* 积分记录 */}
        <TabsContent value="history">
          <Card>
            <CardHeader>
              <CardTitle>积分记录</CardTitle>
              <CardDescription>
                查看您的积分获取和使用记录
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {membershipData.transactions.map(transaction => (
                  <div 
                    key={transaction.id} 
                    className="flex justify-between items-center border-b pb-3"
                  >
                    <div className="flex items-start">
                      <div className="mr-4">
                        <History className="h-5 w-5 text-muted-foreground" />
                      </div>
                      <div>
                        <p className="font-medium">{transaction.description}</p>
                        <p className="text-sm text-muted-foreground">
                          {transaction.date}
                        </p>
                      </div>
                    </div>
                    <Badge variant="outline" className="text-green-600">
                      +{transaction.points}
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full">
                查看更多记录
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
} 