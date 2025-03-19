# 爻星阁项目

一个提供命理、塔罗牌、面相分析等服务的综合平台。本项目包含后端API服务、前端Web应用、管理后台以及移动应用（Android和iOS）。

## 目录结构

```
爻星阁项目
├── backend/             # 后端 API 服务
│   ├── prisma/          # 数据库模型和迁移
│   ├── src/             # 后端源代码
│   │   ├── api/         # API 路由和处理器
│   │   ├── config/      # 配置文件
│   │   ├── lib/         # 通用库和工具函数
│   │   ├── services/    # 服务层
│   │   └── types/       # 类型定义
│   └── scripts/         # 后端脚本
│
├── frontend/            # 前端应用
│   ├── web/             # Web 前端
│   │   ├── public/      # 静态资源
│   │   ├── scripts/     # 脚本文件
│   │   └── src/         # 源代码
│   │       ├── app/     # Next.js 应用路由和页面
│   │       ├── components/ # React 组件
│   │       ├── config/  # 配置文件
│   │       ├── data/    # 数据文件
│   │       └── hooks/   # 自定义钩子
│   │
│   ├── android/         # Android 应用
│   │   └── src/         # 源代码
│   │       ├── components/ # React Native 组件
│   │       ├── screens/    # 应用页面
│   │       ├── navigation/ # 导航配置
│   │       ├── services/   # API 服务
│   │       └── assets/     # 资源文件
│   │
│   ├── ios/             # iOS 应用
│   │   └── src/         # 源代码
│   │       ├── components/ # React Native 组件
│   │       ├── screens/    # 应用页面
│   │       ├── navigation/ # 导航配置
│   │       ├── services/   # API 服务
│   │       └── assets/     # 资源文件
│   │
│   └── shared/          # 前端共享代码
│       ├── api/         # API 客户端
│       ├── types/       # 类型定义
│       └── utils/       # 工具函数
│
└── admin-dashboard/     # 管理后台
    ├── public/          # 静态资源
    ├── scripts/         # 脚本文件
    └── src/             # 源代码
        ├── app/         # Next.js 应用路由和页面
        ├── components/  # React 组件
        └── types/       # 类型定义
```

## 安装与运行

### 安装依赖

```bash
# 安装所有项目依赖
npm run install:all

# 或者单独安装各个项目依赖
npm run install:web        # 安装 Web 前端依赖
npm run install:admin      # 安装管理后台依赖
npm run install:backend    # 安装后端依赖
npm run install:shared     # 安装共享代码依赖
npm run install:android    # 安装 Android 应用依赖
npm run install:ios        # 安装 iOS 应用依赖
```

### 数据库设置

```bash
# 生成 Prisma 客户端
npm run prisma:generate

# 运行数据库迁移
npm run prisma:migrate

# 填充初始数据
npm run db:seed

# 启动 Prisma Studio 查看数据库
npm run prisma:studio
```

### 开发环境

```bash
# 启动 Web 前端开发服务器
npm run dev:web

# 启动管理后台开发服务器
npm run dev:admin

# 启动后端开发服务器
npm run dev:backend

# 启动 Android 开发服务器
npm run android:start

# 运行 Android 应用
npm run android:run

# 启动 iOS 开发服务器
npm run ios:start

# 运行 iOS 应用
npm run ios:run
```

### 构建项目

```bash
# 构建 Web 前端
npm run build:web

# 构建管理后台
npm run build:admin

# 构建后端
npm run build:backend
```

## 技术栈

- **后端**: Node.js, Express, TypeScript, Prisma, PostgreSQL
- **前端 Web**: React, Next.js, TypeScript, TailwindCSS
- **管理后台**: React, Next.js, TypeScript, TailwindCSS
- **移动应用**: React Native, TypeScript
- **共享代码**: TypeScript

## 开发指南

- 后端开发应当在 `backend` 目录中进行
- Web 前端开发应当在 `frontend/web` 目录中进行
- 管理后台开发应当在 `admin-dashboard` 目录中进行
- Android 和 iOS 应用开发应当分别在 `frontend/android` 和 `frontend/ios` 目录中进行
- 共享代码开发应当在 `frontend/shared` 目录中进行
