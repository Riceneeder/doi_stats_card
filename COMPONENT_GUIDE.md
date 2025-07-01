# DoiCard React 组件使用指南

## 概述

已成功创建了一个完整的 React 组件 `<DoiCard>`，用于显示 DOI 文献信息。组件支持：

- 接收完整的 DOI 链接或 DOI 码
- 支持中英文文献信息获取
- 自动检测和处理错误状态
- 美观的加载动画
- 响应式设计
- 自定义样式支持

## 使用方法

### 基本用法

```jsx
import DoiCard from './components/DoiCard';

function App() {
  return (
    <div>
      {/* 英文文献（默认） */}
      <DoiCard doi="https://doi.org/10.1000/182" />
      
      {/* 中文文献 */}
      <DoiCard doi="https://doi.org/10.1000/182" lang="zh" />
      
      {/* 纯DOI码 */}
      <DoiCard doi="10.1000/182" />
    </div>
  );
}
```

### 支持的DOI格式

```jsx
// 完整HTTPS链接
<DoiCard doi="https://doi.org/10.1000/182" />

// 完整HTTP链接
<DoiCard doi="http://doi.org/10.1000/182" />

// doi: 前缀
<DoiCard doi="doi:10.1000/182" />

// 纯DOI码
<DoiCard doi="10.1000/182" />
```

### 自定义样式

```jsx
<DoiCard 
  doi="https://doi.org/10.1000/182"
  className="my-custom-card"
  style={{ 
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
    borderRadius: '12px'
  }}
/>
```

## Props 参数

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `doi` | `string` | 必需 | 完整的DOI链接或DOI码 |
| `lang` | `'en' \| 'zh' \| 'cn'` | `'en'` | 语言设置，en=英文，zh/cn=中文 |
| `className` | `string` | `''` | 自定义CSS类名 |
| `style` | `React.CSSProperties` | `{}` | 自定义样式对象 |

## 项目结构

```
├── components/
│   ├── DoiCard.jsx           # 主组件
│   ├── DoiCard.d.ts         # TypeScript类型定义
│   ├── DoiCardExample.jsx   # 使用示例
│   ├── README.md            # 组件详细文档
│   └── index.js             # 统一导出
├── hooks/
│   └── useDoiData.js        # 数据获取Hook
└── app/
    ├── page.js              # 主页面（展示组件）
    ├── components/page.js   # 组件演示页面
    └── api/doi-card/route.js # API端点
```

## 运行项目

1. 安装依赖（如果还没有安装）：
```bash
npm install
```

2. 启动开发服务器：
```bash
npm run dev
```

3. 访问以下页面：
   - 主页：http://localhost:3000
   - 组件演示：http://localhost:3000/components

## API 端点

组件内部使用了 `/api/doi-card` API 端点，你也可以直接使用：

```
GET /api/doi-card?doi=10.1000/182&lang=en
GET /api/doi-card?doi=10.1000/182&lang=zh
```

## 特性

### 自动语言检测
- 组件会根据 DOI 前缀自动判断可能的语言类型
- 支持常见的中文DOI前缀识别

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
