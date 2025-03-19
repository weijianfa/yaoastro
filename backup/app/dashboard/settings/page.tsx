import { Metadata } from 'next';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { redirect } from 'next/navigation';
import { getUserSettings } from '@/app/actions/user';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import GeneralSettings from '@/components/settings/GeneralSettings';
import NotificationSettings from '@/components/settings/NotificationSettings';
import PrivacySettings from '@/components/settings/PrivacySettings';
import AppearanceSettings from '@/components/settings/AppearanceSettings';
import { Separator } from '@/components/ui/separator';

export const metadata: Metadata = {
  title: '设置 | 命理分析平台',
  description: '管理您的账户设置和偏好',
};

export default async function SettingsPage() {
  const session = await getServerSession(authOptions);
  
  if (!session || !session.user) {
    redirect('/login');
  }
  
  const { user, settings, error } = await getUserSettings();
  
  if (error) {
    return (
      <div className="container mx-auto py-10">
        <div className="flex flex-col items-center justify-center min-h-[60vh]">
          <h1 className="text-2xl font-bold">获取设置失败</h1>
          <p className="text-muted-foreground">{error}</p>
        </div>
      </div>
    );
  }
  
  return (
    <div className="container mx-auto py-10">
      <div className="space-y-6">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">设置</h2>
          <p className="text-muted-foreground">
            管理您的账户设置和偏好。
          </p>
        </div>
        
        <Separator />
        
        <Tabs defaultValue="general" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="general">通用</TabsTrigger>
            <TabsTrigger value="notifications">通知</TabsTrigger>
            <TabsTrigger value="privacy">隐私</TabsTrigger>
            <TabsTrigger value="appearance">外观</TabsTrigger>
          </TabsList>
          
          <TabsContent value="general" className="space-y-6">
            <GeneralSettings user={user} settings={settings} />
          </TabsContent>
          
          <TabsContent value="notifications" className="space-y-6">
            <NotificationSettings user={user} settings={settings} />
          </TabsContent>
          
          <TabsContent value="privacy" className="space-y-6">
            <PrivacySettings user={user} settings={settings} />
          </TabsContent>
          
          <TabsContent value="appearance" className="space-y-6">
            <AppearanceSettings user={user} settings={settings} />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
} 