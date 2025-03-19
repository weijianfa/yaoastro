'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { toast } from '@/components/ui/use-toast';
import { 
  Share2, 
  Download, 
  Copy, 
  QrCode, 
  Image as ImageIcon,
  MessageCircle,
  MessageSquare
} from 'lucide-react';
import QRCode from 'react-qr-code';
import html2canvas from 'html2canvas';

interface TarotShareButtonProps {
  analysisId: string;
  resultRef: React.RefObject<HTMLDivElement>;
}

export default function TarotShareButton({ analysisId, resultRef }: TarotShareButtonProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isGeneratingImage, setIsGeneratingImage] = useState(false);
  const [shareImage, setShareImage] = useState<string | null>(null);
  
  const baseUrl = typeof window !== 'undefined' ? window.location.origin : '';
  const shareUrl = `${baseUrl}/dashboard/tarot/${analysisId}`;
  
  // 复制链接到剪贴板
  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      toast({
        title: '链接已复制',
        description: '您可以将链接分享给他人',
      });
    } catch (err) {
      toast({
        title: '复制失败',
        description: '无法复制链接，请手动复制',
        variant: 'destructive',
      });
    }
  };
  
  // 生成分享图片
  const generateImage = async () => {
    if (!resultRef.current) return;
    
    setIsGeneratingImage(true);
    
    try {
      const canvas = await html2canvas(resultRef.current, {
        scale: 2,
        useCORS: true,
        allowTaint: true,
        backgroundColor: '#ffffff',
      });
      
      const imageUrl = canvas.toDataURL('image/png');
      setShareImage(imageUrl);
      
      toast({
        title: '图片已生成',
        description: '您可以保存或分享此图片',
      });
    } catch (err) {
      console.error('生成图片失败:', err);
      toast({
        title: '生成图片失败',
        description: '无法生成分享图片，请稍后再试',
        variant: 'destructive',
      });
    } finally {
      setIsGeneratingImage(false);
    }
  };
  
  // 下载分享图片
  const downloadImage = () => {
    if (!shareImage) return;
    
    const link = document.createElement('a');
    link.href = shareImage;
    link.download = `塔罗牌解读_${new Date().toISOString().split('T')[0]}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };
  
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm" onClick={() => setIsOpen(true)}>
          <Share2 className="h-4 w-4 mr-2" />
          分享
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>分享塔罗牌解读</DialogTitle>
          <DialogDescription>
            您可以通过多种方式分享您的塔罗牌解读结果
          </DialogDescription>
        </DialogHeader>
        
        <Tabs defaultValue="link" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="link">链接</TabsTrigger>
            <TabsTrigger value="qrcode">二维码</TabsTrigger>
            <TabsTrigger value="image">图片</TabsTrigger>
          </TabsList>
          
          <TabsContent value="link" className="space-y-4">
            <div className="flex items-center space-x-2">
              <Input 
                value={shareUrl} 
                readOnly 
                className="flex-1"
              />
              <Button size="sm" onClick={copyToClipboard}>
                <Copy className="h-4 w-4" />
              </Button>
            </div>
            
            <div className="flex flex-wrap gap-2">
              <Button variant="outline" size="sm" className="flex items-center">
                <MessageCircle className="h-4 w-4 mr-2" />
                微信
              </Button>
              <Button variant="outline" size="sm" className="flex items-center">
                <MessageSquare className="h-4 w-4 mr-2" />
                微博
              </Button>
              <Button variant="outline" size="sm" className="flex items-center">
                <MessageSquare className="h-4 w-4 mr-2" />
                QQ
              </Button>
            </div>
          </TabsContent>
          
          <TabsContent value="qrcode" className="flex flex-col items-center space-y-4">
            <div className="p-4 bg-white rounded-lg">
              <QRCode value={shareUrl} size={200} />
            </div>
            <p className="text-sm text-center text-muted-foreground">
              扫描上方二维码查看塔罗牌解读结果
            </p>
          </TabsContent>
          
          <TabsContent value="image" className="space-y-4">
            {!shareImage ? (
              <Button 
                onClick={generateImage} 
                disabled={isGeneratingImage}
                className="w-full"
              >
                {isGeneratingImage ? '生成中...' : '生成分享图片'}
              </Button>
            ) : (
              <div className="space-y-4">
                <div className="relative aspect-[4/3] w-full overflow-hidden rounded-lg border">
                  <img 
                    src={shareImage} 
                    alt="塔罗牌解读分享图" 
                    className="object-contain w-full h-full"
                  />
                </div>
                <div className="flex justify-center space-x-2">
                  <Button size="sm" onClick={downloadImage}>
                    <Download className="h-4 w-4 mr-2" />
                    保存图片
                  </Button>
                  <Button size="sm" variant="outline" onClick={() => setShareImage(null)}>
                    重新生成
                  </Button>
                </div>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
} 