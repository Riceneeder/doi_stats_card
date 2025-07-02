# 使用示例

React DOI Card 的各种使用场景和示例。

## 基础用法

### 单个文献引用

```tsx
import { DoiCard } from 'react-doi-card';

<DoiCard doi="10.1038/nature12373" />
```

### 多篇论文展示

```tsx
<div>
  <h2>相关研究</h2>
  <DoiCard doi="10.1038/nature12373" />
  <DoiCard doi="10.1126/science.1260419" />
  <DoiCard doi="10.1016/j.cell.2023.01.043" />
</div>
```

## 高级用法

### 中文文献

```tsx
<DoiCard 
  doi="10.11821/dlxb202001001" 
  lang="zh"
  chineseDoiAuth={{
    username: "your_username",
    password: "your_password"
  }}
/>
```

### 自定义样式

```tsx
<DoiCard 
  doi="10.1038/nature12373"
  className="shadow-lg"
  style={{ 
    borderRadius: '16px',
    maxWidth: '600px'
  }}
/>
```

### 响应式布局

```tsx
<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
  <DoiCard doi="10.1038/nature12373" />
  <DoiCard doi="10.1126/science.1260419" />
</div>
```

## 在不同框架中使用

### Next.js

```tsx
'use client';
import { DoiCard } from 'react-doi-card';

export default function PaperPage() {
  return <DoiCard doi="10.1038/nature12373" />;
}
```

### Vite React

```tsx
import { DoiCard } from 'react-doi-card';

function App() {
  return (
    <main>
      <DoiCard doi="10.1038/nature12373" />
    </main>
  );
}
```

## 常见 DOI 示例

### 英文期刊
- Nature: `10.1038/nature12373`
- Science: `10.1126/science.1260419`
- Cell: `10.1016/j.cell.2023.01.043`

### 中文期刊
- 地理学报: `10.11821/dlxb202001001`
- 北京大学学报: `10.13209/j.0479-8023.2021.002`

## 最佳实践

1. **性能优化**: 为避免重复请求，可以使用 React.memo
2. **错误处理**: 组件内置错误处理，无需额外处理
3. **样式一致性**: 使用统一的 className 或 style props
4. **无障碍**: 组件已包含基本的无障碍支持

### 在项目README中展示成果

```markdown
# 我的研究项目

## 项目简介
这个项目专注于...

## 相关发表论文

本项目的研究成果已发表在以下期刊：

![Main Paper](https://doicard.gankun.cn.ma/api/doi-card?doi=10.1038/s41586-023-06404-3)

![Follow-up Study](https://doicard.gankun.cn.ma/api/doi-card?doi=10.1126/science.abm6609)

## 引用本工作

如果您在研究中使用了本项目，请引用：

![This Work](https://doicard.gankun.cn.ma/api/doi-card?doi=10.1000/your-doi-here)
```

## 学术主页示例

```markdown
# Dr. 张三的学术主页

## 个人简介
我是...的研究员，主要研究方向包括...

## 代表性论文

### 顶级期刊论文

![Nature 2023](https://doicard.gankun.cn.ma/api/doi-card?doi=10.1038/s41586-023-06404-3)

![Science 2022](https://doicard.gankun.cn.ma/api/doi-card?doi=10.1126/science.abm6609)

### 会议论文

![NIPS 2023](https://doicard.gankun.cn.ma/api/doi-card?doi=10.1000/conference-paper)

## 研究项目

### 项目一：人工智能应用
相关论文：
![AI Paper](https://doicard.gankun.cn.ma/api/doi-card?doi=10.1038/s41586-023-06404-3)

### 项目二：数据科学方法
相关论文：
![Data Science Paper](https://doicard.gankun.cn.ma/api/doi-card?doi=10.1126/science.abm6609)
```

## 博客文章中的使用

```markdown
# 解读最新Nature论文：突破性发现

今天我想和大家分享一篇刚刚发表在Nature上的重要论文：

![Featured Paper](https://doicard.gankun.cn.ma/api/doi-card?doi=10.1038/s41586-023-06404-3)

这篇论文的主要贡献包括：

1. 提出了新的理论框架
2. 实验验证了方法的有效性
3. 为未来研究指明了方向

## 相关工作

这项研究建立在以下重要工作的基础上：

![Previous Work 1](https://doicard.gankun.cn.ma/api/doi-card?doi=10.1038/nature12373)

![Previous Work 2](https://doicard.gankun.cn.ma/api/doi-card?doi=10.1126/science.abm6609)

...
```

## 实用技巧

### 1. 批量生成
如果您需要为多篇论文生成卡片，可以创建一个简单的脚本：

```python
dois = [
    "10.1038/s41586-023-06404-3",
    "10.1126/science.abm6609",
    "10.1016/j.cell.2022.03.030"
]

base_url = "https://doicard.gankun.cn.ma/api/doi-card?doi="

for doi in dois:
    # 基本卡片
    markdown = f"![DOI Card]({base_url}{doi})"
    print(markdown)
    
    # 带语言参数的卡片
    markdown_en = f"![DOI Card]({base_url}{doi}&lang=en)"
    print(markdown_en)
```

### 2. 自定义样式
您可以使用可用的参数来自定义卡片：

- 使用HTML标签控制显示大小
- 使用`lang`参数指定语言
- 使用Markdown的图片标题功能

```html
<!-- 英文卡片 -->
<img src="https://doicard.gankun.cn.ma/api/doi-card?doi=10.1038/nature12373&lang=en" 
     alt="DOI Card" 
     style="max-width: 100%; height: auto; border: 1px solid #ddd; border-radius: 8px;">

<!-- 中文卡片 -->
<img src="https://doicard.gankun.cn.ma/api/doi-card?doi=10.1038/nature12373&lang=zh" 
     alt="DOI Card" 
     style="max-width: 100%; height: auto; border: 1px solid #ddd; border-radius: 8px;">
```

### 3. 缓存优化
为了提高页面加载速度，DOI卡片会被CDN缓存。如果您更新了论文信息，可能需要等待缓存刷新。

---

**注意**: 请将示例中的 `doicard.gankun.cn.ma` 替换为您实际部署的域名。
