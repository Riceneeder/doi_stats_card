# React DOI Card

完全独立的 React 组件库，用于显示 DOI 文献信息卡片。直接调用外部 DOI 服务，无需本地 API。

[![npm version](https://badge.fury.io/js/react-doi-card.svg)](https://badge.fury.io/js/react-doi-card)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![TypeScript](https://img.shields.io/badge/%3C%2F%3E-TypeScript-%230074c1.svg)](http://www.typescriptlang.org/)

## 特性

- 🌐 **独立运行** - 直接调用外部 DOI 服务
- 🌍 **双语支持** - 英文（CrossRef）和中文（中国DOI）文献
- 📝 **TypeScript** - 完整类型支持
- 🎨 **现代设计** - 美观的卡片界面
- ⚡ **轻量级** - 零额外依赖

[组件演示](https://doicard.gankun.cn.ma/)

## 安装

```bash
npm install react-doi-card
# 或
bun add react-doi-card
```

## 使用

```tsx
import { DoiCard } from 'react-doi-card';

// 英文文献
<DoiCard doi="10.1038/nature12373" />

// 中文文献
<DoiCard doi="10.11821/dlxb202001001" lang="zh" />

// 自定义样式
<DoiCard 
  doi="10.1038/nature12373"
  style={{ borderRadius: '12px' }}
/>
```
## Props
| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `doi` | `string` | 必需 | DOI 码或完整链接 |
| `lang` | `en` \| `cn` | `en` | 语言设置 |
| `className` | `string` | - | 自定义 CSS 类名 |
| `style` | `CSSProperties` | - | 自定义样式 |


---

## 🌍 本地开发环境（API 服务）

除了 React 组件库外，本项目还包含一个 Next.js API 服务，用于本地开发或生产部署

## API 端点

### `/api/doi-card`

生成 DOI 文献信息卡片的 API 端点。

**请求参数:**

| 参数 | 类型 | 必需 | 说明 |
|------|------|------|------|
| `doi` | string | ✅ | DOI码或完整DOI链接 |
| `lang` | string | ❌ | 语言设置 ('en' 或 'zh')，默认 'en' |

**示例请求:**

```bash
# 英文文献
curl "https://your-domain.vercel.app/api/doi-card?doi=10.1038/nature12373&lang=en"

# 中文文献
curl "https://your-domain.vercel.app/api/doi-card?doi=10.11821/dlxb202001001&lang=zh"
```

### 一键部署API服务到Vercel

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/yourusername/react-doi-card)

### 启动开发服务器

```bash
# 克隆仓库
git clone https://github.com/yourusername/react-doi-card.git
cd react-doi-card

# 安装依赖
bun install

# 启动开发服务器
bun run dev
```

访问 http://localhost:3000 进行调试

## 构建与发布

```bash
# 构建组件库
bun run build-lib

# 发布到 NPM
npm publish
```

## 相关文档

- [组件使用指南](./src/README.md) - 详细使用说明
- [发布指南](./PUBLISH_GUIDE.md) - NPM 发布流程

## 许可证

MIT License
