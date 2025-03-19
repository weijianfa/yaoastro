'use client';

import { useState } from 'react';
import Link from 'next/link';
import { 
  Search, 
  Filter, 
  PlusCircle, 
  Edit, 
  Trash2, 
  Eye,
  CheckCircle2, 
  XCircle,
  ArrowUpDown,
  MoreHorizontal
} from 'lucide-react';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';

// 服务类型
type ServiceCategory = '八字分析' | '塔罗占卜' | '面相分析' | '梦境解析' | '姓名分析' | '会员服务';

// 服务状态
type ServiceStatus = '上线中' | '已下线' | '草稿';

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
  imageUrl: string;
  featured: boolean;
  tags: string[];
}

// 状态颜色映射
const statusColorMap: Record<ServiceStatus, { bg: string; text: string }> = {
  '上线中': { bg: 'bg-green-100', text: 'text-green-800' },
  '已下线': { bg: 'bg-gray-100', text: 'text-gray-800' },
  '草稿': { bg: 'bg-yellow-100', text: 'text-yellow-800' }
};

// 模拟服务数据
const mockServices: ServiceData[] = [
  {
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
    imageUrl: '/tarot-placeholder.jpg',
    featured: true,
    tags: ['热销', '精品']
  },
  {
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
    tags: ['热销']
  },
  {
    id: 'SRV-00003',
    name: 'AI面相高级分析',
    category: '面相分析',
    price: 159,
    status: '上线中',
    salesCount: 142,
    createdAt: '2025-01-10T14:30:00Z',
    updatedAt: '2025-02-15T16:20:00Z',
    description: '利用AI技术分析面相特征，解读性格、事业和健康运势',
    imageUrl: '/tarot-placeholder.jpg',
    featured: false,
    tags: ['新品']
  },
  {
    id: 'SRV-00004',
    name: '梦境深度解析',
    category: '梦境解析',
    price: 129,
    discountPrice: 99,
    status: '上线中',
    salesCount: 87,
    createdAt: '2025-01-20T11:00:00Z',
    updatedAt: '2025-02-20T13:10:00Z',
    description: '专业解读梦境隐藏含义，揭示潜意识信息和心灵提示',
    imageUrl: '/tarot-placeholder.jpg',
    featured: false,
    tags: []
  },
  {
    id: 'SRV-00005',
    name: '姓名五行精准测算',
    category: '姓名分析',
    price: 69,
    status: '已下线',
    salesCount: 156,
    createdAt: '2024-11-25T10:45:00Z',
    updatedAt: '2025-01-15T09:30:00Z',
    description: '分析姓名的五行属性与个人八字配合度，提供改名建议',
    imageUrl: '/tarot-placeholder.jpg',
    featured: false,
    tags: []
  },
  {
    id: 'SRV-00006',
    name: '年度会员VIP服务',
    category: '会员服务',
    price: 365,
    status: '上线中',
    salesCount: 78,
    createdAt: '2025-01-01T00:00:00Z',
    updatedAt: '2025-02-05T15:40:00Z',
    description: '全年不限次数咨询，所有付费服务8折优惠，专属客服',
    imageUrl: '/tarot-placeholder.jpg',
    featured: true,
    tags: ['推荐']
  },
  {
    id: 'SRV-00007',
    name: '事业运势分析',
    category: '八字分析',
    price: 149,
    status: '草稿',
    salesCount: 0,
    createdAt: '2025-02-28T16:20:00Z',
    updatedAt: '2025-02-28T16:20:00Z',
    description: '专注分析职业发展、财运变化和事业转折点',
    imageUrl: '/tarot-placeholder.jpg',
    featured: false,
    tags: []
  }
];

// 格式化日期
function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString('zh-CN', { 
    year: 'numeric', 
    month: 'numeric', 
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
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

export default function ServicesPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<ServiceStatus | 'all'>('all');
  const [categoryFilter, setCategoryFilter] = useState<ServiceCategory | 'all'>('all');
  const [sortBy, setSortBy] = useState<'name' | 'price' | 'sales' | 'date'>('date');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc');

  // 处理排序点击
  const handleSortClick = (field: 'name' | 'price' | 'sales' | 'date') => {
    if (sortBy === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(field);
      setSortDirection('desc');
    }
  };

  // 过滤和排序服务
  const filteredAndSortedServices = mockServices
    .filter(service => 
      (statusFilter === 'all' || service.status === statusFilter) &&
      (categoryFilter === 'all' || service.category === categoryFilter) &&
      (service.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
       service.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
       service.id.toLowerCase().includes(searchTerm.toLowerCase()))
    )
    .sort((a, b) => {
      let comparison = 0;
      
      switch (sortBy) {
        case 'name':
          comparison = a.name.localeCompare(b.name);
          break;
        case 'price':
          const aPrice = a.discountPrice || a.price;
          const bPrice = b.discountPrice || b.price;
          comparison = aPrice - bPrice;
          break;
        case 'sales':
          comparison = a.salesCount - b.salesCount;
          break;
        case 'date':
        default:
          comparison = new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime();
          break;
      }
      
      return sortDirection === 'asc' ? comparison : -comparison;
    });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">服务管理</h1>
        <Link 
          href="/admin/services/new" 
          className="inline-flex items-center px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
        >
          <PlusCircle className="h-4 w-4 mr-2" />
          添加服务
        </Link>
      </div>

      {/* 搜索和过滤区域 */}
      <Card>
        <CardContent className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="col-span-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input 
                  type="text" 
                  placeholder="搜索服务名称、描述或ID" 
                  className="pl-10 w-full rounded-md border border-gray-300 py-2 px-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
            
            <div>
              <select
                className="w-full rounded-md border border-gray-300 py-2 px-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value as ServiceStatus | 'all')}
              >
                <option value="all">所有状态</option>
                <option value="上线中">上线中</option>
                <option value="已下线">已下线</option>
                <option value="草稿">草稿</option>
              </select>
            </div>
            
            <div>
              <select
                className="w-full rounded-md border border-gray-300 py-2 px-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value as ServiceCategory | 'all')}
              >
                <option value="all">所有分类</option>
                <option value="八字分析">八字分析</option>
                <option value="塔罗占卜">塔罗占卜</option>
                <option value="面相分析">面相分析</option>
                <option value="梦境解析">梦境解析</option>
                <option value="姓名分析">姓名分析</option>
                <option value="会员服务">会员服务</option>
              </select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* 服务列表 */}
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-lg">服务列表</CardTitle>
          <CardDescription>
            共 {filteredAndSortedServices.length} 个服务
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border overflow-hidden">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    <button 
                      className="flex items-center font-medium text-gray-500"
                      onClick={() => handleSortClick('name')}
                    >
                      服务信息
                      {sortBy === 'name' && (
                        <ArrowUpDown className="ml-1 h-4 w-4" />
                      )}
                    </button>
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    分类
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    <button 
                      className="flex items-center font-medium text-gray-500"
                      onClick={() => handleSortClick('price')}
                    >
                      价格
                      {sortBy === 'price' && (
                        <ArrowUpDown className="ml-1 h-4 w-4" />
                      )}
                    </button>
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    状态
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    <button 
                      className="flex items-center font-medium text-gray-500"
                      onClick={() => handleSortClick('sales')}
                    >
                      销量
                      {sortBy === 'sales' && (
                        <ArrowUpDown className="ml-1 h-4 w-4" />
                      )}
                    </button>
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    <button 
                      className="flex items-center font-medium text-gray-500"
                      onClick={() => handleSortClick('date')}
                    >
                      更新时间
                      {sortBy === 'date' && (
                        <ArrowUpDown className="ml-1 h-4 w-4" />
                      )}
                    </button>
                  </th>
                  <th scope="col" className="relative px-6 py-3">
                    <span className="sr-only">操作</span>
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredAndSortedServices.map((service) => (
                  <tr key={service.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-10 w-10 relative">
                          <div className="h-10 w-10 rounded-lg bg-indigo-100 flex items-center justify-center overflow-hidden">
                            {service.featured && (
                              <span className="absolute top-0 left-0 px-1 py-0.5 text-xs bg-indigo-600 text-white">
                                精选
                              </span>
                            )}
                            <span className="text-indigo-600 font-bold">{service.category.substring(0, 1)}</span>
                          </div>
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">
                            {service.name}
                          </div>
                          <div className="text-xs text-gray-500">
                            {service.id}
                          </div>
                          {service.tags.length > 0 && (
                            <div className="flex gap-1 mt-1">
                              {service.tags.map((tag, index) => (
                                <span key={index} className="px-2 py-0.5 text-xs rounded-full bg-indigo-50 text-indigo-700">
                                  {tag}
                                </span>
                              ))}
                            </div>
                          )}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{service.category}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {formatPrice(service.price, service.discountPrice)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${statusColorMap[service.status].bg} ${statusColorMap[service.status].text}`}>
                        {service.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {service.salesCount}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {formatDate(service.updatedAt)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <div className="flex items-center justify-end space-x-2">
                        <Link href={`/admin/services/${service.id}`} className="text-indigo-600 hover:text-indigo-900">
                          <Eye className="h-4 w-4" />
                        </Link>
                        <Link href={`/admin/services/${service.id}/edit`} className="text-blue-600 hover:text-blue-900">
                          <Edit className="h-4 w-4" />
                        </Link>
                        <button className="text-red-600 hover:text-red-900">
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
                {filteredAndSortedServices.length === 0 && (
                  <tr>
                    <td colSpan={7} className="px-6 py-10 text-center text-gray-500">
                      未找到符合条件的服务
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
} 