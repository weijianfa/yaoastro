# 爻星阁后端 API 服务

这是爻星阁项目的后端 API 服务，使用 Node.js, Express, TypeScript 和 Prisma 构建。

## 功能

- 用户认证与授权 (JWT)
- 用户管理
- 服务管理
- 订单管理
- 数据统计分析

## 目录结构

```
backend/
├── prisma/               # Prisma 模型和迁移
├── src/
│   ├── config/           # 配置文件
│   ├── controllers/      # 控制器
│   ├── services/         # 服务层
│   ├── middleware/       # 中间件
│   ├── utils/            # 工具函数
│   ├── types/            # TypeScript 类型定义
│   ├── routes/           # API 路由
│   └── app.ts            # 应用入口点
├── tests/                # 测试文件
└── ... 配置文件
```

## 开发环境设置

### 先决条件

- Node.js 18+
- PostgreSQL
- 包管理器 (npm, yarn 或 pnpm)

### 安装

1. 克隆仓库
```
git clone <repository-url>
cd backend
```

2. 安装依赖
```
npm install
```

3. 配置环境变量
```
cp .env.example .env
```
然后编辑 `.env` 文件，设置你的环境变量。

4. 设置数据库
```
npx prisma migrate dev --name init
```

5. 启动开发服务器
```
npm run dev
```

## API 文档

API 服务运行在 `http://localhost:3001` (默认)

### 主要端点

- `POST /api/auth/register` - 注册新用户
- `POST /api/auth/login` - 用户登录
- `GET /api/users` - 获取用户列表 (仅管理员)
- `GET /api/users/:id` - 获取特定用户
- `GET /api/services` - 获取服务列表
- `GET /api/services/:id` - 获取特定服务
- `POST /api/orders` - 创建新订单
- `GET /api/orders` - 获取订单列表

更多详细信息，请参考 API 文档。

## 生产环境部署

1. 构建项目
```
npm run build
```

2. 设置环境变量
确保所有必要的环境变量都已设置。

3. 启动应用
```
npm start
```

## 数据库迁移

```
# 创建新迁移
npx prisma migrate dev --name <migration-name>

# 应用迁移到生产环境
npx prisma migrate deploy
```

## 测试

```
# 运行所有测试
npm test

# 运行特定测试文件
npm test -- <test-file-path>
```

## 代码规范

```
# 运行 ESLint
npm run lint

# 格式化代码
npm run format
```

## 许可证

私有软件，未经授权禁止使用 