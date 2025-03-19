import { Metadata } from 'next';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { redirect } from 'next/navigation';
import { getUserProfile } from '@/app/actions/user';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { CalendarIcon, CreditCardIcon, UserIcon, MailIcon, PhoneIcon, MapPinIcon } from 'lucide-react';
import ProfileForm from '@/components/profile/ProfileForm';
import PasswordForm from '@/components/profile/PasswordForm';

export const metadata: Metadata = {
  title: '个人中心 | 命理分析平台',
  description: '管理您的个人资料和账户信息',
};

export default async function ProfilePage() {
  const session = await getServerSession(authOptions);
  
  if (!session || !session.user) {
    redirect('/login');
  }
  
  const { user, profile, error } = await getUserProfile();
  
  if (error || !user) {
    return (
      <div className="container mx-auto py-10">
        <div className="flex flex-col items-center justify-center min-h-[60vh]">
          <h1 className="text-2xl font-bold">获取用户资料失败</h1>
          <p className="text-muted-foreground">{error}</p>
        </div>
      </div>
    );
  }
  
  return (
    <div className="container mx-auto py-10">
      <div className="space-y-6">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">个人中心</h2>
          <p className="text-muted-foreground">
            管理您的个人资料和账户信息。
          </p>
        </div>
        
        <Separator />
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* 用户信息卡片 */}
          <Card className="md:col-span-1">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-lg font-medium">个人信息</CardTitle>
              <Button variant="outline" size="sm">编辑</Button>
            </CardHeader>
            <CardContent className="pt-4">
              <div className="flex flex-col items-center space-y-4">
                <Avatar className="h-24 w-24">
                  <AvatarImage src={user.image || ''} alt={user.name || '用户'} />
                  <AvatarFallback>{user.name?.charAt(0) || user.email.charAt(0).toUpperCase()}</AvatarFallback>
                </Avatar>
                <div className="space-y-1 text-center">
                  <h3 className="text-xl font-semibold">{user.name || '未设置姓名'}</h3>
                  <p className="text-sm text-muted-foreground">{user.email}</p>
                </div>
              </div>
              
              <Separator className="my-4" />
              
              <div className="space-y-3">
                <div className="flex items-center">
                  <UserIcon className="mr-2 h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">角色: {user.role === 'ADMIN' ? '管理员' : '普通用户'}</span>
                </div>
                <div className="flex items-center">
                  <MailIcon className="mr-2 h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">邮箱: {user.email}</span>
                </div>
                <div className="flex items-center">
                  <PhoneIcon className="mr-2 h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">电话: {profile?.phone || '未设置'}</span>
                </div>
                <div className="flex items-center">
                  <MapPinIcon className="mr-2 h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">地区: {profile?.location || '未设置'}</span>
                </div>
                <div className="flex items-center">
                  <CalendarIcon className="mr-2 h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">
                    注册时间: {new Date(user.createdAt).toLocaleDateString('zh-CN')}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
          
          {/* 用户统计卡片 */}
          <div className="md:col-span-2 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">订单总数</CardTitle>
                  <CreditCardIcon className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">0</div>
                  <p className="text-xs text-muted-foreground">
                    +0% 较上月
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">分析报告</CardTitle>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    className="h-4 w-4 text-muted-foreground"
                  >
                    <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                    <circle cx="9" cy="7" r="4" />
                    <path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
                  </svg>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">0</div>
                  <p className="text-xs text-muted-foreground">
                    +0% 较上月
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">会员状态</CardTitle>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    className="h-4 w-4 text-muted-foreground"
                  >
                    <rect width="20" height="14" x="2" y="5" rx="2" />
                    <path d="M2 10h20" />
                  </svg>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">免费用户</div>
                  <p className="text-xs text-muted-foreground">
                    升级获取更多功能
                  </p>
                </CardContent>
              </Card>
            </div>
            
            <Tabs defaultValue="profile" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="profile">个人资料</TabsTrigger>
                <TabsTrigger value="password">修改密码</TabsTrigger>
              </TabsList>
              <TabsContent value="profile" className="mt-6">
                <Card>
                  <CardHeader>
                    <CardTitle>个人资料</CardTitle>
                    <CardDescription>
                      更新您的个人资料信息。
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ProfileForm user={user} profile={profile} />
                  </CardContent>
                </Card>
              </TabsContent>
              <TabsContent value="password" className="mt-6">
                <Card>
                  <CardHeader>
                    <CardTitle>修改密码</CardTitle>
                    <CardDescription>
                      更改您的账户密码。
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <PasswordForm />
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  );
} 