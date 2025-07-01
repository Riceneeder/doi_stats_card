# React DOI Card

一个完全独立的 React 组件库，用于显示 DOI 文献信息卡片。**组件直接调用外部 DOI 服务获取数据，无需依赖本地 API**。

[![npm version](https://badge.fury.io/js/react-doi-card.svg)](https://badge.fury.io/js/react-doi-card)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![TypeScript](https://img.shields.io/badge/%3C%2F%3E-TypeScript-%230074c1.svg)](http://www.typescriptlang.org/)

## 🚀 特性

- 🌐 **完全独立**: 不依赖本地 API，直接调用外部 DOI 服务
- ✅ **双语支持**: 英文文献 (CrossRef API) 和中文文献 (中国DOI解析)
- ✅ **TypeScript**: 完整的 TypeScript 支持和类型定义
- ✅ **自动换行**: 所有文本内容支持长文本自动换行
- ✅ **现代设计**: 基于 Fluent Design 的美观界面
- ✅ **智能解析**: 自动处理完整 DOI 链接或纯 DOI 码
- ✅ **状态管理**: 内置加载、错误、成功状态处理
- ✅ **自定义样式**: 支持 CSS 类名和内联样式
- ✅ **轻量级**: 零额外依赖，仅依赖 React

## 📦 安装

```bash
# 使用 npm
npm install react-doi-card

# 使用 yarn
yarn add react-doi-card

# 使用 bun
bun add react-doi-card
```

## 🎯 快速开始

```tsx
import { DoiCard } from 'react-doi-card';

function App() {
  return (
    <div>
      {/* 英文文献 */}
      <DoiCard doi="10.1038/nature12373" lang="en" />
      
      {/* 中文文献 */}
      <DoiCard doi="10.11821/dlxb202001001" lang="zh" />
      
      {/* 纯DOI码 */}
      <DoiCard doi="10.1000/182" />
      
      {/* 自定义样式 */}
      <DoiCard 
        doi="10.1038/nature12373"
        className="my-custom-card"
        style={{ 
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
          borderRadius: '12px'
        }}
      />
    </div>
  );
}
```

**查看详细使用方法：**
- 📖 [React 组件使用指南](./src/README.md)

---

## 🌍 本地开发环境（API 服务）

除了 React 组件库外，本项目还包含一个 Next.js API 服务，用于本地开发和演示。

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

访问 http://localhost:3000 查看演示页面。

### 构建和部署

```bash
# 构建组件库
bun run build-lib

# 构建 Next.js 应用
bun run build

# 启动生产服务器
bun run start
```

### 一键部署到 Vercel

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/yourusername/react-doi-card)

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

## 🔗 相关链接

- [GitHub 仓库](https://github.com/yourusername/react-doi-card)
- [npm 包](https://www.npmjs.com/package/react-doi-card)
- [在线演示](https://react-doi-card-demo.vercel.app)
- [问题反馈](https://github.com/yourusername/react-doi-card/issues)

## 📄 许可证

MIT License

## 🤝 贡献

欢迎提交 Issue 和 Pull Request！

### 开发指南

1. Fork 本仓库
2. 创建功能分支: `git checkout -b feature/amazing-feature`
3. 提交更改: `git commit -m 'Add amazing feature'`
4. 推送到分支: `git push origin feature/amazing-feature`
5. 提交 Pull Request

## 📋 更新日志

### v1.0.0 (2025-07-01)
- 🎉 首次发布
- ✅ 支持中英文 DOI 解析
- ✅ 完整的 TypeScript 支持
- ✅ 现代化 Fluent Design UI
- ✅ 完整的错误处理和状态管理
- ✅ 零依赖，轻量级实现
- ✅ 支持自定义样式和主题

## 🙏 致谢

- [CrossRef API](https://www.crossref.org/documentation/retrieve-metadata/rest-api/) - 提供英文文献元数据
- [中国DOI](http://www.chndoi.org/) - 提供中文文献解析服务
- [Microsoft Fluent UI](https://developer.microsoft.com/en-us/fluentui/) - 设计系统灵感来源

生成DOI统计卡片的SVG图像。

**参数：**
- `doi`: DOI标识符（必需）
- `lang`: 语言设置（可选，`en`为英文，`zh`为中文）

## 示例效果

以下是生成的DOI卡片示例：

<!-- 这里可以在部署后替换为实际的DOI -->
```markdown
![DOI Card Example](https://your-project.vercel.app/api/doi-card?doi=10.1038/nature12373)
```

![我的文章](https://doicard.gankun.cn.ma/api/doi-card?doi=10.1016/j.ijbiomac.2024.133614)

> 📝 **提示**: 部署完成后，将上述URL中的 `your-project.vercel.app` 替换为您的实际域名，即可看到卡片效果。

## 配置文件

- `vercel.json`: Vercel部署配置，包含重写规则和函数配置
- `next.config.mjs`: Next.js配置，设置重定向规则

## 部署到Vercel

### 方法一：一键部署（推荐）

点击上方的"Deploy with Vercel"按钮，Vercel会自动：
1. Fork此仓库到您的GitHub账户
2. 创建新的Vercel项目
3. 自动部署并提供域名

### 方法二：手动部署

1. Fork或克隆此仓库到您的GitHub账户
2. 在Vercel中连接您的GitHub仓库
3. 部署完成后，API将在 `https://your-project.vercel.app/api/doi-card` 可用

### 自定义域名

部署后，您可以在Vercel项目设置中添加自定义域名，然后将上述示例中的 `your-project.vercel.app` 替换为您的域名。

### 基本用法

在您的Markdown文档中，可以使用以下方式引用DOI卡片：

```markdown
![DOI Card](https://your-project.vercel.app/api/doi-card?doi=10.1000/example)
```

### 高级用法

您可以添加语言参数来自定义卡片语言：

```markdown
<!-- 基本DOI卡片 -->
![DOI: 10.1000/example](https://your-project.vercel.app/api/doi-card?doi=10.1000/example)

<!-- 英文文献卡片 -->
![DOI Card](https://your-project.vercel.app/api/doi-card?doi=10.1000/example&lang=en)

<!-- 中文文献卡片 -->
![DOI Card](https://your-project.vercel.app/api/doi-card?doi=10.1000/example&lang=zh)

<!-- 在表格中使用 -->
| Paper | DOI Card |
|-------|----------|
| 示例论文 | ![DOI](https://your-project.vercel.app/api/doi-card?doi=10.1000/example) |
```

### GitHub README中的使用

在GitHub README中，您可以这样使用：

```markdown
## 我的论文

以下是我发表的一些论文：

### Paper 1
![DOI Card](https://your-project.vercel.app/api/doi-card?doi=10.1000/example1)

### Paper 2
![DOI Card](https://your-project.vercel.app/api/doi-card?doi=10.1000/example2)
```

### HTML方式引用

如果您需要更多控制权，也可以使用HTML标签：

```html
<img src="https://your-project.vercel.app/api/doi-card?doi=10.1000/example" 
     alt="DOI Card" 
     width="495" 
     height="auto">
```

### 参数说明

可用的URL参数包括：
- `doi`: DOI标识符（必需）
- `lang`: 语言设置（可选）
  - `en`: 英文（默认）
  - `zh`: 中文

### 缓存说明

为了提高性能，建议在生产环境中使用CDN或缓存服务。Vercel会自动为静态内容提供缓存。

### 更多示例

查看 [EXAMPLES.md](EXAMPLES.md) 文件获取更多详细的使用示例和最佳实践。

## 贡献

欢迎贡献代码！请遵循以下步骤：

1. Fork 此仓库
2. 创建您的功能分支 (`git checkout -b feature/AmazingFeature`)
3. 提交您的更改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 打开一个 Pull Request

## 技术栈

- **Framework**: Next.js 15
- **Runtime**: Node.js
- **Deployment**: Vercel
- **Dependencies**: 
  - `cheerio`: HTML解析
  - `node-fetch`: HTTP请求

## 许可证

本项目采用 MIT 许可证 - 查看 [LICENSE](LICENSE) 文件了解详情。

## 支持

如果您遇到问题或有建议，请：

1. 查看 [Issues](https://github.com/Riceneeder/doi_stats_card/issues) 页面
2. 创建新的 Issue 描述您的问题
3. 或者直接提交 Pull Request

---

⭐ 如果这个项目对您有帮助，请考虑给它一个星标！
