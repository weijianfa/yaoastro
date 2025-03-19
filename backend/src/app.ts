import express, { Express, Request, Response, NextFunction } from 'express';
import cors from 'cors';
import morgan from 'morgan';
import dotenv from 'dotenv';
import { PrismaClient } from '@prisma/client';

// 导入路由
import authRoutes from './routes/auth.routes';
import userRoutes from './routes/user.routes';
import serviceRoutes from './routes/service.routes';
import orderRoutes from './routes/order.routes';

// 加载环境变量
dotenv.config();

// 初始化Express应用
const app: Express = express();
const port = process.env.PORT || 3001;

// 初始化Prisma客户端
export const prisma = new PrismaClient();

// 中间件
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

// 基础路由
app.get('/', (req: Request, res: Response) => {
  res.json({ message: '欢迎使用爻星阁 API 服务' });
});

// API 路由
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/services', serviceRoutes);
app.use('/api/orders', orderRoutes);

// 404 处理
app.use((req: Request, res: Response) => {
  res.status(404).json({ error: '未找到请求的资源' });
});

// 错误处理中间件
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack);
  res.status(500).json({ error: '服务器内部错误', message: err.message });
});

// 启动服务器
app.listen(port, () => {
  console.log(`服务器运行在: http://localhost:${port}`);
});

// 处理未捕获的异常
process.on('uncaughtException', (error: Error) => {
  console.error('未捕获的异常:', error);
  process.exit(1);
});

// 处理未处理的Promise拒绝
process.on('unhandledRejection', (reason: any, promise: Promise<any>) => {
  console.error('未处理的Promise拒绝:', reason);
});

// 优雅关闭
process.on('SIGTERM', async () => {
  console.log('接收到SIGTERM信号，正在优雅关闭...');
  await prisma.$disconnect();
  process.exit(0);
});

export default app; 