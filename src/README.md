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

## 🎯 基本使用

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

## 📖 API 参考

### DoiCard Props

| 属性 | 类型 | 默认值 | 必需 | 说明 |
|------|------|--------|------|------|
| `doi` | `string` | - | ✅ | DOI码或完整DOI链接 |
| `lang` | `'en' \| 'zh' \| 'cn'` | `'en'` | ❌ | 语言设置 |
| `className` | `string` | `''` | ❌ | 自定义CSS类名 |
| `style` | `CSSProperties` | `{}` | ❌ | 自定义样式对象 |

### 支持的DOI格式

```tsx
// 完整HTTPS链接
<DoiCard doi="https://doi.org/10.1000/182" />

// 完整HTTP链接
<DoiCard doi="http://doi.org/10.1000/182" />

// doi: 前缀
<DoiCard doi="doi:10.1000/182" />

// 纯DOI码
<DoiCard doi="10.1000/182" />
```

## 🎨 自定义样式

组件支持通过 `className` 和 `style` props 进行样式自定义：

```tsx
// 使用CSS类
<DoiCard 
  doi="10.1000/182"
  className="shadow-lg rounded-lg"
/>

// 使用内联样式
<DoiCard 
  doi="10.1000/182"
  style={{
    boxShadow: '0 8px 16px rgba(0,0,0,0.1)',
    borderRadius: '16px',
    transform: 'scale(0.9)'
  }}
/>
```

## 🔧 高级用法

### 使用 Hook

如果需要更细粒度的控制，可以直接使用 `useDoiData` Hook：

```tsx
import { useDoiData } from 'react-doi-card';

function CustomDoiDisplay({ doi }: { doi: string }) {
  const { data, loading, error } = useDoiData(doi, 'en');

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!data) return <div>No data</div>;

  return (
    <div>
      <h3>{data.title}</h3>
      <p>Authors: {data.authors}</p>
      <p>Journal: {data.journal}</p>
      <a href={data.url} target="_blank" rel="noopener noreferrer">
        {data.doi}
      </a>
    </div>
  );
}
```

### TypeScript 支持

组件包含完整的 TypeScript 类型定义：

```tsx
import { DoiCardProps, DoiData, UseDoiDataReturn } from 'react-doi-card';

// 组件 Props 类型
const props: DoiCardProps = {
  doi: '10.1000/182',
  lang: 'zh',
  className: 'custom-card'
};

// Hook 返回类型
const { data, loading, error }: UseDoiDataReturn = useDoiData('10.1000/182');

// 数据类型
const doiData: DoiData = {
  title: 'Paper Title',
  authors: 'Author Names',
  journal: 'Journal Name',
  doi: '10.1000/182',
  url: 'https://doi.org/10.1000/182'
};
```

## 🌐 数据源

- **英文文献**: CrossRef API (api.crossref.org)
- **中文文献**: 中国DOI解析服务 (www.chndoi.org)
- **自动检测**: 基于DOI前缀智能识别语言类型

## 🎛️ 状态处理

组件内置三种状态的处理：

1. **加载状态**: 显示优雅的加载动画
2. **错误状态**: 显示详细的错误信息和重试提示
3. **成功状态**: 显示完整的文献信息卡片

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
