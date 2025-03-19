# 爻星阁项目架构设计

## 1. 项目概述

爻星阁是一个提供命理、塔罗牌、面相分析等服务的综合平台，包含以下几个主要组件：

- 后端 API 服务（独立部署）
- 管理后台（Web）
- 用户前端
  - Web 端
  - Android 端
  - iOS 端

## 2. 技术栈

### 后端
- Node.js + Express/NestJS
- TypeScript
- PostgreSQL 数据库
- Prisma ORM
- JWT 认证
- RESTful API

### 管理后台
- React + Next.js
- TypeScript
- TailwindCSS
- SWR/React-Query 数据获取
- 组件库: shadcn/ui

### Web 前端
- React + Next.js
- TypeScript
- TailwindCSS
- SWR/React-Query
- 渐进式 Web 应用 (PWA) 功能

### 移动端
- React Native（同时支持 Android 和 iOS）
- TypeScript
- Native Base UI 组件库
- Redux/Context API 状态管理

## 3. 目录结构

整个项目将被分为三个主要仓库：

```
爻星阁项目
├── backend/             # 后端 API 服务
├── manager/             # 管理后台
└── frontend/            # 前端应用（Web、Android、iOS）
```

### 3.1 后端 (backend)

```
backend/
├── prisma/               # Prisma 模型和迁移
│   ├── schema.prisma     # 数据库模式定义
│   └── migrations/       # 数据库迁移脚本
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
├── .env                  # 环境变量
├── .env.example          # 环境变量示例
├── package.json          # npm 配置
├── tsconfig.json         # TypeScript 配置
└── README.md             # 项目说明
```

### 3.2 管理后台 (manager)

```
manager/
├── public/               # 静态资源
├── src/
│   ├── app/              # Next.js App Router
│   ├── components/       # React 组件
│   │   ├── ui/           # UI 组件
│   │   └── modules/      # 业务组件
│   ├── hooks/            # 自定义钩子
│   ├── lib/              # 工具库
│   ├── services/         # API 服务
│   └── types/            # TypeScript 类型定义
├── .env                  # 环境变量
├── .env.example          # 环境变量示例
├── package.json          # npm 配置
├── tsconfig.json         # TypeScript 配置
└── README.md             # 项目说明
```

### 3.3 前端 (frontend)

```
frontend/
├── web/                  # Web 端
│   ├── public/           # 静态资源
│   ├── src/
│   │   ├── app/          # Next.js App Router
│   │   ├── components/   # React 组件
│   │   ├── hooks/        # 自定义钩子
│   │   ├── lib/          # 工具库
│   │   ├── services/     # API 服务
│   │   └── types/        # TypeScript 类型定义
│   ├── .env              # 环境变量
│   └── package.json      # npm 配置
│
├── mobile/               # 移动端 (React Native)
│   ├── android/          # Android 原生代码
│   ├── ios/              # iOS 原生代码
│   ├── src/
│   │   ├── assets/       # 资源文件
│   │   ├── components/   # React 组件
│   │   ├── hooks/        # 自定义钩子
│   │   ├── navigation/   # 导航配置
│   │   ├── screens/      # 屏幕组件
│   │   ├── services/     # API 服务
│   │   ├── store/        # 状态管理
│   │   ├── theme/        # 主题配置
│   │   ├── utils/        # 工具函数
│   │   └── App.tsx       # 应用入口点
│   ├── .env              # 环境变量
│   └── package.json      # npm 配置
│
└── shared/               # 共享代码
    ├── api/              # API 客户端
    ├── types/            # 类型定义
    ├── utils/            # 通用工具函数
    └── package.json      # npm 配置
```

## 4. API 设计

后端 API 将采用 RESTful 设计风格，主要模块包括：

1. **认证 API**
   - 用户注册、登录、刷新令牌、重置密码

2. **用户 API**
   - 用户信息管理、权限和角色

3. **服务 API**
   - 各类命理服务的信息、价格等

4. **订单 API**
   - 订单创建、支付、查询、取消

5. **内容 API**
   - 博客、文章、帮助文档等内容管理

6. **分析 API**
   - 用户行为分析和数据统计

## 5. 认证与授权

系统采用 JWT (JSON Web Token) 进行身份验证：

- 用户登录后获取访问令牌 (Access Token) 和刷新令牌 (Refresh Token)
- 访问令牌有效期短（例如 15 分钟），刷新令牌有效期长（例如 7 天）
- 当访问令牌过期时，使用刷新令牌获取新的访问令牌
- 基于角色的访问控制 (RBAC) 管理不同用户的权限

## 6. 数据流

![数据流图](https://placeholder-for-dataflow-diagram.com)

1. 前端通过 RESTful API 与后端通信
2. 后端处理请求，与数据库交互
3. 后端返回数据给前端
4. 前端根据返回的数据更新 UI

## 7. 部署策略

### 后端部署
- 使用 Docker 容器化
- 可部署在云服务提供商如 AWS、Alibaba Cloud、Tencent Cloud 等
- 支持水平扩展以处理增长的流量

### 管理后台部署
- 静态生成，部署在 CDN 上
- 或部署在支持 Node.js 的服务器上

### Web 前端部署
- 静态生成，部署在 CDN 上
- 或部署在支持 Node.js 的服务器上
- 实现 PWA 功能，支持离线访问

### 移动端部署
- Android：Google Play 和国内各应用市场
- iOS：App Store

## 8. 持续集成/持续部署 (CI/CD)

使用 GitHub Actions 或 GitLab CI 构建自动化部署流程：

1. 代码推送触发自动测试
2. 测试通过后构建应用
3. 自动部署到测试环境
4. 人工确认后部署到生产环境

## 9. 监控与日志

- 使用 ELK Stack (Elasticsearch, Logstash, Kibana) 或 Loki 进行日志管理
- 使用 Prometheus + Grafana 监控系统健康状况
- 设置通知机制，快速响应系统异常

## 10. 安全措施

- HTTPS 加密
- 输入验证与参数过滤
- 防止 SQL 注入、XSS 和 CSRF 攻击
- 速率限制以防止暴力攻击
- 数据备份和灾难恢复策略 