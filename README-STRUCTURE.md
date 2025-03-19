# 爻星阁项目重构目录结构

本项目已重构为以下目录结构，将代码按照功能和平台分离：

## 目录结构

```
爻星阁项目
├── backend/             # 后端 API 服务
│   ├── prisma/          # 数据库模型和迁移
│   ├── src/             # 后端源代码
│   │   ├── api/         # API 路由和处理器
│   │   ├── lib/         # 通用库和工具函数
│   │   └── services/    # 服务层
│   └── ...              # 其他后端配置文件
│
├── frontend/            # 前端应用
│   ├── web/             # Web 前端
│   │   ├── public/      # 静态资源
│   │   ├── src/         # 源代码
│   │   │   ├── app/     # Next.js 应用路由和页面
│   │   │   ├── components/ # React 组件
│   │   │   └── hooks/   # 自定义钩子
│   │   └── ...          # 配置文件
│   │
│   ├── android/         # Android 应用
│   │   ├── src/         # 源代码
│   │   │   ├── components/ # React Native 组件
│   │   │   ├── screens/    # 应用页面
│   │   │   ├── navigation/ # 导航配置
│   │   │   ├── services/   # API 服务
│   │   │   └── assets/     # 资源文件
│   │   └── ...          # 配置文件
│   │
│   └── ios/             # iOS 应用
│       ├── src/         # 源代码
│       │   ├── components/ # React Native 组件
│       │   ├── screens/    # 应用页面
│       │   ├── navigation/ # 导航配置
│       │   ├── services/   # API 服务
│       │   └── assets/     # 资源文件
│       └── ...          # 配置文件
│
└── admin-dashboard/     # 管理后台
    ├── public/          # 静态资源
    ├── src/             # 源代码
    │   ├── app/         # Next.js 应用路由和页面
    │   └── components/  # React 组件
    └── ...              # 配置文件
```

## 文件迁移说明

- 所有后端相关的代码已移至 `backend` 目录
- Web 前端代码已移至 `frontend/web` 目录
- 管理后台代码已移至 `admin-dashboard` 目录
- 为移动应用准备了 `frontend/android` 和 `frontend/ios` 目录结构

## 后续开发建议

1. 后端开发应当在 `backend` 目录中进行
2. Web 前端开发应当在 `frontend/web` 目录中进行
3. 管理后台开发应当在 `admin-dashboard` 目录中进行
4. Android 和 iOS 应用开发应当分别在 `frontend/android` 和 `frontend/ios` 目录中进行
5. 可考虑在 `frontend` 目录下增加一个 `shared` 目录，用于存放跨平台共享的代码

## 注意事项

在重构过程中，所有文件都被复制到了新的目录结构中，原有的文件结构仍然保留。
在确认新的目录结构能够正常工作后，可以考虑删除原有的冗余文件。 