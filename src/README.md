# React DOI Card 组件

React DOI Card 是一个用于显示学术文献 DOI 信息的 React 组件库。

## 快速开始

```bash
npm install react-doi-card
```

```tsx
import { DoiCard } from 'react-doi-card';

<DoiCard doi="10.1038/nature12373" />
```

## 基本使用

### 英文文献

```tsx
<DoiCard doi="10.1038/nature12373"/>
```

### 中文文献

```tsx
<DoiCard doi="10.11821/dlxb202001001" lang="zh" />
```

### 自定义样式

```tsx
<DoiCard 
  doi="10.1038/nature12373"
  className="custom-card"
  style={{ borderRadius: '12px' }}
/>
```
## 组件 API

### Props

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `doi` | `string` | 必需 | DOI 码或完整链接 |
| `lang` | `'en' \| 'zh' | `'en'` | 语言设置 |
| `className` | `string` | - | 自定义 CSS 类名 |
| `style` | `CSSProperties` | - | 自定义样式 |

### 支持的 DOI 格式

```tsx
// 完整链接
<DoiCard doi="https://doi.org/10.1000/182" />

// 纯 DOI 码
<DoiCard doi="10.1000/182" />

// doi: 前缀
<DoiCard doi="doi:10.1000/182" />
```

## 高级用法

### 使用数据 Hook

```tsx
import { useDoiData } from 'react-doi-card';

function CustomDoiDisplay({ doi }: { doi: string }) {
  const { data, loading, error } = useDoiData(doi, 'en');

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  
  return (
    <div>
      <h3>{data?.title}</h3>
      <p>{data?.authors}</p>
      <p>{data?.journal}</p>
    </div>
  );
}
```

### TypeScript 类型

```tsx
import { DoiCardProps, DoiData } from 'react-doi-card';

const props: DoiCardProps = {
  doi: '10.1000/182',
  lang: 'zh'
};
```

## 许可证

MIT License
