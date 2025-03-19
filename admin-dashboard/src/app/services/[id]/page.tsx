'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import {
  ArrowLeft,
  Calendar,
  Edit,
  Tag,
  BarChart2,
  ShoppingCart,
  Users,
  Star,
  Clock,
  CheckCircle,
  XCircle,
  AlertTriangle,
  Trash2,
  DollarSign,
  BarChart4,
  CheckCircle2,
  Info,
  ShoppingBag,
  ChevronRight,
  PlusCircle
} from 'lucide-react';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle, 
  CardFooter
} from '@/components/ui/card';
import { 
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger 
} from '@/components/ui/tabs';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';

// 服务类型
type ServiceCategory = '八字分析' | '塔罗占卜' | '面相分析' | '梦境解析' | '姓名分析' | '会员服务';

// 服务状态
type ServiceStatus = '上线中' | '已下线' | '草稿';

// 评价类型
type ReviewRating = 1 | 2 | 3 | 4 | 5;

// 服务数据类型
interface ServiceData {
  id: string;
  name: string;
  category: ServiceCategory;
  price: number;
  discountPrice?: number;
  status: ServiceStatus;
  salesCount: number;
  createdAt: string;
  updatedAt: string;
  description: string;
  detailedDescription?: string;
  imageUrl: string;
  featured: boolean;
  tags: string[];
  totalRevenue: number;
  avgRating: number;
  ratingCount: number;
  content?: string;
  duration?: number;
  saleStartDate?: string;
  saleEndDate?: string;
  faqs?: Array<{question: string; answer: string}>;
  totalReviews?: number;
  averageRating?: number;
  buyerProfiles?: {
    ageGroup: string;
    percentage: number;
  }[];
  feedbackRating?: number;
  serviceItems?: {
    name: string;
    included: boolean;
  }[];
}

// 评价数据
interface ReviewData {
  id: string;
  userId: string;
  userName: string;
  rating: ReviewRating;
  content: string;
  createdAt: string;
}

// 每月销售数据
interface MonthlySalesData {
  month: string;
  orders: number;
  revenue: number;
}

// 状态颜色映射
const statusColorMap: Record<ServiceStatus, { bg: string; text: string; icon: React.ReactNode }> = {
  '上线中': { bg: 'bg-green-100', text: 'text-green-800', icon: <CheckCircle2 className="h-4 w-4 mr-1" /> },
  '已下线': { bg: 'bg-gray-100', text: 'text-gray-800', icon: <XCircle className="h-4 w-4 mr-1" /> },
  '草稿': { bg: 'bg-yellow-100', text: 'text-yellow-800', icon: <Clock className="h-4 w-4 mr-1" /> }
};

// 模拟服务数据
const mockServiceDetails: Record<string, ServiceData> = {
  'SRV-00001': {
    id: 'SRV-00001',
    name: '八字命盘精细解析',
    category: '八字分析',
    price: 199,
    discountPrice: 159,
    status: '上线中',
    salesCount: 384,
    createdAt: '2024-12-15T08:00:00Z',
    updatedAt: '2025-02-01T10:30:00Z',
    description: '通过八字命盘分析您的五行属性、事业财运、健康状况和未来运势',
    detailedDescription: `# 八字命盘精细解析

## 服务描述
通过分析您的出生年、月、日、时所形成的八个天干地支，即"八字"，我们能够详细解读您的命理特点、人生走向和发展机遇。

## 服务包含内容
1. **个人八字命盘分析**：根据您的出生时间绘制完整八字命盘
2. **五行属性分析**：分析五行旺衰、喜忌神煞
3. **事业分析**：职业适应性、事业发展方向、成功机遇
4. **财运分析**：财富积累能力、理财建议
5. **健康状况**：体质特点、易患疾病、养生建议
6. **人际关系**：家庭、社交和爱情关系解读
7. **未来运势**：近期和长期运势预测，关键时间点提示

## 服务流程
1. 提供准确的出生年月日时信息
2. 专业命理师绘制八字命盘并进行分析
3. 在24小时内提供详细的分析报告
4. 一次免费追问服务（限7天内）`,
    imageUrl: '/tarot-placeholder.jpg',
    featured: true,
    tags: ['热销', '精品'],
    totalRevenue: 61056,
    avgRating: 4.7,
    ratingCount: 256,
    content: '# 八字命盘精细解析\n\n## 服务介绍\n\n八字命盘精细解析是爻星阁的特色服务，通过分析您的出生年、月、日、时所形成的八字命盘，深入解读您的命理特点、性格优势、事业方向、财富运势、健康状况以及人际关系等方面的信息。\n\n## 服务内容\n\n1. **五行分析**：详细解读您的五行属性，分析先天命局的强弱\n2. **事业财运**：根据八字特点，推荐适合的职业方向和财富获取路径\n3. **健康预测**：分析命盘中的健康信息，提供养生建议\n4. **人际关系**：解读您在家庭、朋友、爱情中的表现特点\n5. **运势预测**：预测未来五年的运势变化，提供规避风险的方法\n\n## 服务流程\n\n1. 提供您的出生年月日时（阳历）\n2. 大师根据信息绘制您的八字命盘\n3. 进行命盘解析和运势预测\n4. 在3-5个工作日内提供详细的解析报告\n5. 一次免费追问服务（有效期15天）',
    duration: 5,
    saleStartDate: '2024-12-15T00:00:00Z',
    saleEndDate: '2025-12-31T23:59:59Z',
    faqs: [
      {
        question: '需要提供哪些个人信息？',
        answer: '您需要提供准确的出生年月日时（农历或阳历），以及出生地点。时辰越准确，分析结果越精确。'
      },
      {
        question: '多久能收到分析结果？',
        answer: '正常情况下，我们会在您下单后24小时内完成分析并发送报告。如遇特殊情况，会提前与您沟通。'
      },
      {
        question: '分析结果的准确性如何？',
        answer: '八字分析基于传统命理学理论，提供的是参考性信息，不应作为唯一决策依据。我们的命理师都有多年经验，力求提供专业、客观的分析结果。'
      }
    ],
    totalReviews: 156,
    averageRating: 4.8,
    buyerProfiles: [
      { ageGroup: '18-25岁', percentage: 15 },
      { ageGroup: '26-35岁', percentage: 45 },
      { ageGroup: '36-45岁', percentage: 25 },
      { ageGroup: '46岁以上', percentage: 15 }
    ],
    feedbackRating: 4.8,
    serviceItems: [
      { name: '八字命盘构建', included: true },
      { name: '五行属性分析', included: true },
      { name: '事业方向建议', included: true },
      { name: '财运预测', included: true },
      { name: '感情运势', included: true },
      { name: '大运流年预测', included: true },
      { name: '视频讲解', included: false },
      { name: '一对一咨询', included: false }
    ]
  },
  'SRV-00002': {
    id: 'SRV-00002',
    name: '塔罗爱情全牌阵',
    category: '塔罗占卜',
    price: 99,
    discountPrice: 79,
    status: '上线中',
    salesCount: 256,
    createdAt: '2025-01-05T09:15:00Z',
    updatedAt: '2025-02-10T11:45:00Z',
    description: '使用全牌阵解析您目前的感情状况、潜在问题和未来发展',
    imageUrl: '/tarot-placeholder.jpg',
    featured: true,
    tags: ['热销'],
    totalRevenue: 20224,
    avgRating: 4.5,
    ratingCount: 178,
    content: '# 塔罗爱情全牌阵\n\n## 服务介绍\n\n塔罗爱情全牌阵是爻星阁专为解析爱情问题设计的塔罗服务，通过大十字牌阵或凯尔特十字牌阵，全面解读您当前的感情状况、潜在问题、对方想法以及未来发展。\n\n## 服务内容\n\n1. **现状分析**：解读您当前感情状况的特点和关键影响\n2. **潜在障碍**：揭示感情中存在但您可能未察觉的问题\n3. **对方想法**：探索对方内心的真实想法和感受\n4. **关系发展**：预测关系的可能发展方向和结果\n5. **建议指引**：提供改善关系或做出决定的具体建议\n\n## 服务流程\n\n1. 提供您的姓名和出生日期，以及您希望了解的爱情问题\n2. 占卜师为您选择最适合的牌阵进行占卜\n3. 详细解读每张牌的含义及其组合意义\n4. 在24小时内提供完整的占卜报告\n5. 一次免费追问服务（有效期7天）',
    duration: 1,
    saleStartDate: '2025-01-05T00:00:00Z',
    saleEndDate: '2025-12-31T23:59:59Z',
    faqs: [
      {
        question: '塔罗牌准确率有多高？',
        answer: '塔罗牌是一种心理学工具，其准确性取决于解读者的经验和当事人的状态。我们的塔罗师经验丰富，但结果仍应作为参考，而非绝对预言。'
      },
      {
        question: '如果我没有特定的对象，可以占卜吗？',
        answer: '可以的。对于单身人士，我们会调整牌阵，重点分析您的感情模式和未来可能遇到的对象类型。'
      }
    ],
    totalReviews: 98,
    averageRating: 4.6,
    buyerProfiles: [
      { ageGroup: '18-25岁', percentage: 35 },
      { ageGroup: '26-35岁', percentage: 40 },
      { ageGroup: '36-45岁', percentage: 20 },
      { ageGroup: '46岁以上', percentage: 5 }
    ],
    feedbackRating: 4.7,
    serviceItems: [
      { name: '全牌阵展开', included: true },
      { name: '感情状态分析', included: true },
      { name: '问题障碍揭示', included: true },
      { name: '发展趋势预测', included: true },
      { name: '情感建议指导', included: true },
      { name: '牌阵照片保存', included: true },
      { name: '追加提问', included: false },
      { name: '语音讲解', included: false }
    ]
  }
};

// 模拟评价数据
const mockReviews: ReviewData[] = [
  {
    id: 'REV-001',
    userId: 'USER-001',
    userName: '张先生',
    rating: 5,
    content: '分析非常详细，对我的职业选择提供了很大帮助。老师的耐心解答也让我很满意，强烈推荐！',
    createdAt: '2025-03-01T14:30:00Z'
  },
  {
    id: 'REV-002',
    userId: 'USER-045',
    userName: '李女士',
    rating: 4,
    content: '整体分析还是挺准的，特别是对我性格的描述几乎完全命中。不过有些建议比较笼统，希望能更具体一些。',
    createdAt: '2025-02-25T10:15:00Z'
  },
  {
    id: 'REV-003',
    userId: 'USER-078',
    userName: '王先生',
    rating: 5,
    content: '第二次购买了，前一次的预测竟然在近期全部应验了！这次更详细的解析让我对未来更有信心了。',
    createdAt: '2025-02-20T16:45:00Z'
  },
  {
    id: 'REV-004',
    userId: 'USER-103',
    userName: '刘女士',
    rating: 3,
    content: '服务还行，但是感觉内容有点模板化，希望能针对个人情况有更深入的分析。',
    createdAt: '2025-02-15T09:20:00Z'
  },
  {
    id: 'REV-005',
    userId: 'USER-156',
    userName: '赵先生',
    rating: 5,
    content: '非常专业的分析，给了我很多启发和指导。尤其是对我未来几年的预测，感觉很有参考价值。',
    createdAt: '2025-02-10T11:30:00Z'
  }
];

// 模拟月度销售数据
const mockMonthlySales: MonthlySalesData[] = [
  { month: '2024-09', orders: 15, revenue: 2385 },
  { month: '2024-10', orders: 28, revenue: 4452 },
  { month: '2024-11', orders: 42, revenue: 6678 },
  { month: '2024-12', orders: 78, revenue: 12402 },
  { month: '2025-01', orders: 103, revenue: 16377 },
  { month: '2025-02', orders: 118, revenue: 18762 }
];

// 格式化日期
function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString('zh-CN', { 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
}

// 格式化星级
function formatRating(rating: ReviewRating): JSX.Element {
  return (
    <div className="flex">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star 
          key={i} 
          className={`h-4 w-4 ${i < rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`} 
        />
      ))}
    </div>
  );
}

// 格式化价格
function formatPrice(price: number, discountPrice?: number): JSX.Element {
  if (discountPrice) {
    return (
      <div className="flex items-baseline gap-1">
        <span className="font-medium text-red-600">¥{discountPrice}</span>
        <span className="text-xs text-gray-400 line-through">¥{price}</span>
      </div>
    );
  }
  return <span className="font-medium">¥{price}</span>;
}

// 确认删除对话框组件
function DeleteConfirmDialog({ 
  isOpen, 
  onClose, 
  onConfirm, 
  serviceName 
}: { 
  isOpen: boolean; 
  onClose: () => void; 
  onConfirm: () => void; 
  serviceName: string;
}) {
  if (!isOpen) return null;
  
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg max-w-md w-full p-6 shadow-xl">
        <h3 className="text-lg font-medium text-gray-900 mb-4">确认删除</h3>
        <p className="text-sm text-gray-500 mb-4">
          您确定要删除服务 <span className="font-medium text-gray-700">"{serviceName}"</span> 吗？此操作无法撤销。
        </p>
        <div className="flex justify-end space-x-4">
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-md"
          >
            取消
          </button>
          <button
            onClick={onConfirm}
            className="px-4 py-2 text-sm font-medium text-white bg-red-600 hover:bg-red-700 rounded-md"
          >
            确认删除
          </button>
        </div>
      </div>
    </div>
  );
}

export default function ServiceDetailPage() {
  const params = useParams();
  const router = useRouter();
  const [service, setService] = useState<ServiceData | null>(null);
  const [reviews, setReviews] = useState<ReviewData[]>([]);
  const [monthlySales, setMonthlySales] = useState<MonthlySalesData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [deleteConfirm, setDeleteConfirm] = useState(false);

  // 模拟获取服务数据
  useEffect(() => {
    const fetchData = async () => {
      // 模拟API调用延迟
      await new Promise(resolve => setTimeout(resolve, 500));
      
      const id = Array.isArray(params.id) ? params.id[0] : params.id;
      const serviceData = mockServiceDetails[id];
      
      if (serviceData) {
        setService(serviceData);
        setReviews(mockReviews);
        setMonthlySales(mockMonthlySales);
      }
      
      setIsLoading(false);
    };

    fetchData();
  }, [params.id]);

  const handleDelete = () => {
    if (!deleteConfirm) {
      setDeleteConfirm(true);
      return;
    }
    
    // 模拟删除请求
    console.log('删除服务:', service?.id);
    router.push('/admin/services');
  };

  if (isLoading) {
    return (
      <div className="h-48 flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  if (!service) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">服务不存在</h2>
        <p className="text-gray-600 mb-8">无法找到ID为 {params.id} 的服务信息</p>
        <Link 
          href="/admin/services" 
          className="inline-flex items-center px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          返回服务列表
        </Link>
      </div>
    );
  }

  const StatusIcon = statusColorMap[service.status].icon;

  return (
    <div className="space-y-6">
      {/* 顶部导航和操作按钮 */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <Link 
            href="/admin/services" 
            className="inline-flex items-center text-sm text-gray-500 hover:text-gray-700"
          >
            <ArrowLeft className="h-4 w-4 mr-1" />
            返回服务列表
          </Link>
          <h1 className="text-2xl font-bold mt-2">{service.name}</h1>
        </div>
        
        <div className="flex items-center gap-2">
          <Link 
            href={`/admin/services/${service.id}/edit`} 
            className="inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-gray-700 rounded-md hover:bg-gray-50"
          >
            <Edit className="h-4 w-4 mr-2" />
            编辑服务
          </Link>
          <button
            onClick={() => setDeleteConfirm(true)}
            className={`inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white ${
              deleteConfirm ? 'bg-red-600 hover:bg-red-700' : 'bg-red-500 hover:bg-red-600'
            }`}
          >
            <Trash2 className="h-4 w-4 mr-2" />
            {deleteConfirm ? '确认删除' : '删除'}
          </button>
        </div>
      </div>

      {/* 服务基本信息卡片 */}
      <Card>
        <CardHeader>
          <CardTitle>服务基本信息</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="space-y-2">
              <div className="text-sm font-medium text-gray-500">服务ID</div>
              <div>{service.id}</div>
            </div>
            
            <div className="space-y-2">
              <div className="text-sm font-medium text-gray-500">分类</div>
              <div>{service.category}</div>
            </div>
            
            <div className="space-y-2">
              <div className="text-sm font-medium text-gray-500">状态</div>
              <div className="flex items-center">
                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${statusColorMap[service.status].bg} ${statusColorMap[service.status].text}`}>
                  {StatusIcon}
                  <span className="ml-1">{service.status}</span>
                </span>
              </div>
            </div>
            
            <div className="space-y-2">
              <div className="text-sm font-medium text-gray-500">价格</div>
              <div>
                {formatPrice(service.price, service.discountPrice)}
              </div>
            </div>
            
            <div className="space-y-2">
              <div className="text-sm font-medium text-gray-500">服务时长</div>
              <div>{service.duration || '-'} 天</div>
            </div>
            
            <div className="space-y-2">
              <div className="text-sm font-medium text-gray-500">创建时间</div>
              <div className="flex items-center">
                <Calendar className="h-4 w-4 text-gray-400 mr-1" />
                {formatDate(service.createdAt)}
              </div>
            </div>
            
            <div className="space-y-2">
              <div className="text-sm font-medium text-gray-500">最后更新</div>
              <div className="flex items-center">
                <Clock className="h-4 w-4 text-gray-400 mr-1" />
                {formatDate(service.updatedAt)}
              </div>
            </div>
            
            <div className="space-y-2">
              <div className="text-sm font-medium text-gray-500">上架时间</div>
              <div className="flex items-center">
                <Calendar className="h-4 w-4 text-gray-400 mr-1" />
                {service.saleStartDate ? formatDate(service.saleStartDate) : '-'}
              </div>
            </div>
            
            <div className="space-y-2">
              <div className="text-sm font-medium text-gray-500">下架时间</div>
              <div className="flex items-center">
                <Calendar className="h-4 w-4 text-gray-400 mr-1" />
                {service.saleEndDate ? formatDate(service.saleEndDate) : '-'}
              </div>
            </div>
            
            <div className="space-y-2">
              <div className="text-sm font-medium text-gray-500">服务标签</div>
              <div className="flex flex-wrap gap-2">
                {service.featured && (
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800">
                    <Star className="h-3 w-3 mr-1 fill-indigo-500 text-indigo-500" />
                    精选服务
                  </span>
                )}
                {service.tags.map((tag, index) => (
                  <span key={index} className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                    <Tag className="h-3 w-3 mr-1" />
                    {tag}
                  </span>
                ))}
                {service.tags.length === 0 && !service.featured && (
                  <span className="text-gray-500 text-sm">无标签</span>
                )}
              </div>
            </div>
            
            <div className="space-y-2 col-span-1 md:col-span-2 lg:col-span-3">
              <div className="text-sm font-medium text-gray-500">服务描述</div>
              <div className="bg-gray-50 p-4 rounded-md text-gray-700">
                {service.description}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* 服务数据统计和分析 */}
      <Card>
        <CardHeader>
          <CardTitle>服务数据统计</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-green-50 p-4 rounded-md flex items-center">
              <div className="rounded-full bg-green-100 p-3 mr-4">
                <ShoppingCart className="h-6 w-6 text-green-600" />
              </div>
              <div>
                <div className="text-sm font-medium text-gray-500">总销量</div>
                <div className="text-2xl font-bold">{service.salesCount}</div>
              </div>
            </div>
            
            <div className="bg-blue-50 p-4 rounded-md flex items-center">
              <div className="rounded-full bg-blue-100 p-3 mr-4">
                <BarChart2 className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <div className="text-sm font-medium text-gray-500">总收入</div>
                <div className="text-2xl font-bold">¥{service.totalRevenue.toLocaleString()}</div>
              </div>
            </div>
            
            <div className="bg-yellow-50 p-4 rounded-md flex items-center">
              <div className="rounded-full bg-yellow-100 p-3 mr-4">
                <Star className="h-6 w-6 text-yellow-600" />
              </div>
              <div>
                <div className="text-sm font-medium text-gray-500">平均评分</div>
                <div className="flex items-baseline">
                  <span className="text-2xl font-bold mr-2">{service.avgRating.toFixed(1)}</span>
                  <span className="text-gray-500 text-sm">({service.ratingCount} 条评价)</span>
                </div>
              </div>
            </div>
          </div>
          
          <div className="mt-6">
            <h3 className="text-lg font-medium mb-4">月度销售趋势</h3>
            <div className="h-72">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  data={monthlySales}
                  margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                >
                  <XAxis dataKey="month" />
                  <YAxis yAxisId="left" orientation="left" stroke="#8884d8" />
                  <YAxis yAxisId="right" orientation="right" stroke="#82ca9d" />
                  <Tooltip />
                  <Line yAxisId="left" type="monotone" dataKey="orders" stroke="#8884d8" name="订单数" />
                  <Line yAxisId="right" type="monotone" dataKey="revenue" stroke="#82ca9d" name="收入(¥)" />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* 服务详细内容 */}
      {service.content && (
        <Card>
          <CardHeader>
            <CardTitle>服务详细内容</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="prose max-w-none">
              <div className="whitespace-pre-line">{service.content}</div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* 服务详情和评价选项卡 */}
      <Tabs defaultValue="details">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="details">服务详情</TabsTrigger>
          <TabsTrigger value="reviews">用户评价</TabsTrigger>
        </TabsList>
        
        <TabsContent value="details" className="mt-6">
          <Card>
            <CardContent className="p-6">
              {service.content ? (
                <div className="prose max-w-none">
                  <div className="whitespace-pre-line">{service.content}</div>
                </div>
              ) : (
                <div className="text-center py-8 text-gray-500">
                  暂无详细描述
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="reviews" className="mt-6">
          <Card>
            <CardContent className="p-6">
              {reviews.length > 0 ? (
                <div className="space-y-6">
                  {reviews.map((review) => (
                    <div key={review.id} className="border-b border-gray-200 pb-6 last:border-0 last:pb-0">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <div className="bg-indigo-100 w-10 h-10 rounded-full flex items-center justify-center text-indigo-600 font-bold">
                            {review.userName.charAt(0)}
                          </div>
                          <div className="ml-3">
                            <div className="font-medium">{review.userName}</div>
                            <div className="text-sm text-gray-500">{formatDate(review.createdAt)}</div>
                          </div>
                        </div>
                        {formatRating(review.rating)}
                      </div>
                      <div className="mt-3 text-gray-700">{review.content}</div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8 text-gray-500">
                  暂无用户评价
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* 删除确认对话框 */}
      <DeleteConfirmDialog 
        isOpen={deleteConfirm}
        onClose={() => setDeleteConfirm(false)}
        onConfirm={handleDelete}
        serviceName={service.name}
      />
    </div>
  );
} 