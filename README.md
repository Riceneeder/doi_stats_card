# DOI Stats Card API

这是一个用于生成DOI统计卡片的API服务，专门设计用于Vercel部署。

## 一键部署

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/Riceneeder/doi_stats_card)

## API端点

### `/api/doi-card`

生成DOI统计卡片的SVG图像。

**参数：**
- `doi`: DOI标识符（必需）
- `lang`: 语言设置（可选，`en`为英文，`zh`或`cn`为中文）

## 示例效果

以下是生成的DOI卡片示例：

<!-- 这里可以在部署后替换为实际的DOI -->
```markdown
![DOI Card Example](https://your-project.vercel.app/api/doi-card?doi=10.1038/nature12373)
```

![我的文章](https://doicard.gankun.cn.ma/api/doi-card?doi=10.1016/j.ijbiomac.2024.133614)

> 📝 **提示**: 部署完成后，将上述URL中的 `your-project.vercel.app` 替换为您的实际域名，即可看到卡片效果。

## 部署配置

此项目配置为在Vercel上部署，具有以下特性：

1. **API路由保留**: `/api/*` 路径将正常访问API功能
2. **自动重定向**: 所有其他路径将重定向到GitHub页面
3. **最小化部署**: 只包含必要的API文件，去除了前端资源

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
