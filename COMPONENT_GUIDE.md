# 组件开发指南

## 项目概述

React DOI Card 是一个 TypeScript React 组件库，用于显示学术文献 DOI 信息卡片。

## 核心组件

### DoiCard 组件

主要展示组件，支持：
- 英文/中文文献显示
- 自动错误处理
- 自定义样式
- 响应式设计

### useDoiData Hook

数据获取逻辑：
- 异步获取 DOI 数据
- 状态管理（loading/error/success）
- 自动重试机制

## 项目结构

```
src/
├── components/DoiCard.tsx    # 主组件
├── hooks/useDoiData.ts       # 数据 Hook
├── types/index.ts            # 类型定义
└── index.ts                  # 入口文件
```

## 开发环境

```bash
bun install        # 安装依赖
bun run dev        # 开发模式
bun run build-lib  # 构建组件库
bun run type-check # 类型检查
```

## 自定义开发

### 添加新 Props

1. 在 `src/types/index.ts` 中定义类型
2. 在 `DoiCard.tsx` 中实现功能
3. 更新文档

### 修改样式

组件使用内联样式，支持：
- TypeScript 类型安全
- 用户自定义覆盖
- 响应式设计

### 扩展数据源

在 `useDoiData.ts` 中添加新的 API 调用逻辑。

## 特性

### 错误处理
- 网络错误处理
- DOI格式验证
- 友好的错误提示界面

### 加载状态
- 美观的加载动画
- 流畅的状态转换

### 样式系统
- 基于 Fluent Design 设计语言
- 支持自定义样式覆盖
- 响应式布局

## 技术实现

### 数据获取
- **英文文献**：使用 CrossRef API
- **中文文献**：使用中国DOI解析服务
- **超时控制**：10秒请求超时
- **错误重试**：支持手动重试机制

### 架构设计
- **组件化**：职责分离，易于维护
- **Hook封装**：数据逻辑复用
- **TypeScript支持**：完整的类型定义
- **样式隔离**：使用 styled-jsx

## 贡献

如需扩展功能或修复问题，请参考：
1. `components/README.md` - 详细的组件文档
2. `hooks/useDoiData.js` - 数据获取逻辑
3. `app/api/doi-card/route.js` - 后端API实现

## 许可

此项目基于现有的 DOI Stats Card 项目扩展，遵循相同的许可协议。
