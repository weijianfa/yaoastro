import { PrismaClient } from '@prisma/client';
import { hash } from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  // 创建管理员用户
  const adminPassword = await hash('admin123', 10);
  const admin = await prisma.user.upsert({
    where: { email: 'admin@joyfortune.com' },
    update: {},
    create: {
      email: 'admin@joyfortune.com',
      name: '管理员',
      hashedPassword: adminPassword,
      role: 'ADMIN',
      profile: {
        create: {
          bio: '爻星阁平台管理员',
          phone: '13800000000',
          birthDate: new Date('1990-01-01'),
          gender: 'MALE',
          location: '北京市',
        },
      },
    },
  });
  console.log(`创建管理员用户: ${admin.email}`);

  // 创建测试用户
  const userPassword = await hash('user123', 10);
  const user = await prisma.user.upsert({
    where: { email: 'user@example.com' },
    update: {},
    create: {
      email: 'user@example.com',
      name: '测试用户',
      hashedPassword: userPassword,
      role: 'USER',
      profile: {
        create: {
          bio: '爻星阁平台测试用户',
          phone: '13900000000',
          birthDate: new Date('1995-05-05'),
          gender: 'FEMALE',
          location: '上海市',
        },
      },
    },
  });
  console.log(`创建测试用户: ${user.email}`);

  // 创建会员等级
  const membershipLevels = [
    {
      name: '普通会员',
      price: 0,
      description: '基础功能访问',
      features: ['基础八字分析', '基础塔罗牌解读', '每日运势'],
      durationDays: 0,
    },
    {
      name: '高级会员',
      price: 99,
      description: '高级功能访问',
      features: ['详细八字分析', '详细塔罗牌解读', '面相分析', '每周运势预测'],
      durationDays: 30,
    },
    {
      name: 'VIP会员',
      price: 299,
      description: '全部功能无限制访问',
      features: ['专业八字分析', '专业塔罗牌解读', '面相分析', '姓名分析', '每日运势预测', '一对一咨询'],
      durationDays: 90,
    },
  ];

  for (const level of membershipLevels) {
    const membershipLevel = await prisma.membershipLevel.upsert({
      where: { name: level.name },
      update: {},
      create: {
        name: level.name,
        price: level.price,
        description: level.description,
        features: level.features,
        durationDays: level.durationDays,
      },
    });
    console.log(`创建会员等级: ${membershipLevel.name}`);
  }

  // 创建服务类型
  const serviceTypes = [
    {
      name: '八字命理',
      description: '通过八字分析命运走向',
      price: 99,
      imageUrl: '/images/services/bazi.jpg',
    },
    {
      name: '塔罗牌占卜',
      description: '通过塔罗牌预测未来',
      price: 79,
      imageUrl: '/images/services/tarot.jpg',
    },
    {
      name: '面相分析',
      description: '通过面相分析性格和命运',
      price: 89,
      imageUrl: '/images/services/face.jpg',
    },
    {
      name: '心理测试',
      description: '专业心理测试解读性格特点',
      price: 59,
      imageUrl: '/images/services/psychology.jpg',
    },
    {
      name: '祈福许愿',
      description: '线上祈福许愿服务',
      price: 49,
      imageUrl: '/images/services/blessing.jpg',
    },
    {
      name: '解梦',
      description: '专业解梦服务',
      price: 69,
      imageUrl: '/images/services/dream.jpg',
    },
    {
      name: '姓名分析',
      description: '分析姓名对命运的影响',
      price: 59,
      imageUrl: '/images/services/name.jpg',
    },
    {
      name: 'AI智能咨询',
      description: '人工智能提供的命理咨询',
      price: 129,
      imageUrl: '/images/services/ai.jpg',
    },
  ];

  for (const service of serviceTypes) {
    const serviceType = await prisma.serviceType.upsert({
      where: { name: service.name },
      update: {},
      create: {
        name: service.name,
        description: service.description,
        price: service.price,
        imageUrl: service.imageUrl,
      },
    });
    console.log(`创建服务类型: ${serviceType.name}`);
  }

  // 创建示例订单
  const order = await prisma.order.create({
    data: {
      userId: user.id,
      serviceTypeId: (await prisma.serviceType.findFirst({ where: { name: '八字命理' } }))?.id || '',
      status: 'COMPLETED',
      amount: 99,
      paymentMethod: 'WECHAT',
      paymentStatus: 'PAID',
      paymentId: 'mock_payment_id_123',
      completedAt: new Date(),
    },
  });
  console.log(`创建示例订单: ${order.id}`);

  // 创建示例分析结果
  const analysis = await prisma.analysis.create({
    data: {
      userId: user.id,
      orderId: order.id,
      type: 'BAZI',
      content: {
        year: '1995',
        month: '5',
        day: '5',
        hour: '12',
        gender: 'FEMALE',
        analysis: '这是一个示例八字分析结果，包含命主的五行分析、吉凶预测等内容。',
        recommendations: ['注意健康', '事业有贵人相助', '感情需要主动'],
      },
    },
  });
  console.log(`创建示例分析结果: ${analysis.id}`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  }); 